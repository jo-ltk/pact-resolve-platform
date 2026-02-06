import { MongoClient, Db, ServerApiVersion } from "mongodb";

// Cache the MongoDB client connection globally for HMR (Development)
// This prevents multiple connections during development hot reloads
interface GlobalWithMongo {
  _mongoClientRetry?: MongoClient; // Changed key to force refresh
  _mongoDbRetry?: Db;
}

const globalWithMongo = global as typeof globalThis & GlobalWithMongo;

/**
 * Get the MongoDB URI - validates at runtime, not build time
 */
function getMongoUri(): string {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }
  return uri;
}

/**
 * Get the database name from environment or use default
 */
function getDbName(): string {
  return process.env.MONGODB_DB_NAME || "pact_mediation";
}

/**
 * Connect to MongoDB and return the database instance
 * Uses connection pooling for efficient reuse
 */
export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  const uri = getMongoUri();
  const dbName = getDbName();

  // If we have a cached connection in global space, return it
  if (globalWithMongo._mongoClientRetry && globalWithMongo._mongoDbRetry) {
    return { client: globalWithMongo._mongoClientRetry, db: globalWithMongo._mongoDbRetry };
  }

  try {
    // Create a new MongoClient
    const client = new MongoClient(uri, {
      maxPoolSize: 10,
      minPoolSize: 1,
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 15000,
      tls: true,
      tlsAllowInvalidCertificates: true,
      retryWrites: true,
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    console.log(`[MongoDB] CONNECTING... URI: ${uri.substring(0, 40)}...`);
    const startTime = Date.now();
    
    // Retry logic for connection
    let attempt = 0;
    const maxRetries = 3;
    
    while (true) {
      try {
        attempt++;
        await client.connect();
        break;
      } catch (err: any) {
        if (attempt >= maxRetries) throw err;
        
        const isAuthError = err.message?.includes('Authentication failed');
        const isNetworkError = err.message?.includes('alert number 80') || err.message?.includes('timeout') || err.message?.includes('connection');
        
        if (isAuthError) throw err; // Don't retry auth errors
        
        console.warn(`[MongoDB] Connection attempt ${attempt} failed. Retrying in 1s... Error: ${err.message}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    console.log(`[MongoDB] CONNECTED in ${Date.now() - startTime}ms`);

    // Use specific DB name from env if provided, otherwise use the one from URI
    const db = process.env.MONGODB_DB_NAME ? client.db(process.env.MONGODB_DB_NAME) : client.db();
    
    // If we're using the default from URI (no name passed to client.db()), 
    // we should log it for debugging purposes
    console.log(`[MongoDB] Selected Database: ${db.databaseName || '(default from URI)'}`);

    // Cache the connection in global space
    globalWithMongo._mongoClientRetry = client;
    globalWithMongo._mongoDbRetry = db;

    return { client, db };
  } catch (error: any) {
    console.error("[MongoDB] FULL ERROR OBJECT:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
    
    if (error.message?.includes('alert number 80') || error.code === 'ERR_SSL_TLSV1_ALERT_INTERNAL_ERROR' || error.message?.includes('timeout')) {
      console.error("\n[HELP] DATABASE ACCESS BLOCKED:");
      console.error(" - Reason:", error.message?.includes('timeout') ? "Connection Timeout" : "Access Denied");
      try {
        const ipRes = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipRes.json();
        console.error(` - Your Public IP: ${ipData.ip}`);
      } catch (e) {}
    }
    throw error;
  }
}

/**
 * Get the database instance directly
 */
export async function getDb(): Promise<Db> {
  const { db } = await connectToDatabase();
  return db;
}

/**
 * Initialize database indexes
 */
export async function initDatabase(): Promise<void> {
  const db = await getDb();
  
  try {
    // Users collection indexes
    await db.collection("users").createIndex({ email: 1 }, { unique: true });
    await db.collection("users").createIndex({ role: 1 });

    // News collection indexes
    await db.collection("news").createIndex({ type: 1, isActive: 1 });
    await db.collection("news").createIndex({ order: 1 });
    
    // Audit logs indexes for performance
    await db.collection("audit_logs").createIndex({ userId: 1, timestamp: -1 });
    await db.collection("audit_logs").createIndex({ action: 1 });
    await db.collection("audit_logs").createIndex({ resource: 1, resourceId: 1 });

    console.log("[MongoDB] Database indexes initialized successfully");
  } catch (error) {
    console.error("[MongoDB] Index initialization failed:", error);
  }
}

/**
 * Close the MongoDB connection (useful for testing/cleanup)
 */
export async function closeConnection(): Promise<void> {
  if (globalWithMongo._mongoClientRetry) {
    await globalWithMongo._mongoClientRetry.close();
    delete globalWithMongo._mongoClientRetry;
    delete globalWithMongo._mongoDbRetry;
    console.log("[MongoDB] Connection closed.");
  }
}
