
import { MongoClient } from "mongodb";
import path from "path";

const uri = process.env.MONGODB_URI || "";
const dbName = process.env.MONGODB_DB_NAME || "pact_mediation";

console.log(`Using URI starting with: [${uri.substring(0, 15)}]`);
console.log(`DB Name: [${dbName}]`);

if (!uri) {
  console.error("MONGODB_URI is not defined");
  process.exit(1);
}

const COLLECTIONS = [
  "users",
  "heroSlides",
  "news",
  "panelMembers",
  "partners",
  "footerSettings",
  "globalSettings",
  "mciEvents",
  "audit_logs"
];

async function reset() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);

    console.log(`Resetting database: ${dbName}`);

    for (const collectionName of COLLECTIONS) {
      try {
        await db.collection(collectionName).deleteMany({});
        console.log(`- Cleared collection: ${collectionName}`);
      } catch (e) {
        console.log(`- Collection ${collectionName} does not exist or error clearing:`, e);
      }
    }

    // Initialize indexes
    console.log("Initializing indexes...");
    await db.collection("users").createIndex({ email: 1 }, { unique: true });
    await db.collection("users").createIndex({ role: 1 });
    await db.collection("news").createIndex({ type: 1, isActive: 1 });
    await db.collection("news").createIndex({ order: 1 });
    await db.collection("audit_logs").createIndex({ userId: 1, timestamp: -1 });
    await db.collection("audit_logs").createIndex({ action: 1 });
    await db.collection("audit_logs").createIndex({ resource: 1, resourceId: 1 });
    
    console.log("Database reset and indexes initialized successfully.");
  } catch (error) {
    console.error("Reset failed:", error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

reset();
