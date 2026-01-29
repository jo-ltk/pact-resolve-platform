import { MongoClient, Db } from "mongodb";

// Connection URI from environment variable
const uri = process.env.MONGODB_URI || "";
const dbName = process.env.MONGODB_DB_NAME || "pact_mediation";

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// Cache the MongoDB client connection
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

/**
 * Connect to MongoDB and return the database instance
 * Uses connection pooling for efficient reuse
 */
export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  // If we have a cached connection, return it
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // Create a new MongoClient
  const client = new MongoClient(uri, {
    maxPoolSize: 10, // Connection pool size
    serverSelectionTimeoutMS: 5000, // Timeout after 5s
    socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
  });

  // Connect the client
  console.log(`Connecting to MongoDB: ${uri.substring(0, 20)}... DB: ${dbName}`);
  await client.connect();

  // Get the database
  const db = client.db(dbName);

  // Cache the connection
  cachedClient = client;
  cachedDb = db;

  return { client, db };
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

  console.log("Database indexes initialized successfully");
}

/**
 * Close the MongoDB connection (useful for testing/cleanup)
 */
export async function closeConnection(): Promise<void> {
  if (cachedClient) {
    await cachedClient.close();
    cachedClient = null;
    cachedDb = null;
  }
}
