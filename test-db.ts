import { getDb } from "./lib/mongodb";
import { COLLECTIONS } from "./lib/db/schemas";

async function testDb() {
  try {
    const db = await getDb();
    const collection = db.collection(COLLECTIONS.CONCLAVE_EVENTS);
    const events = await collection.find({}).toArray();
    console.log("Conclave Events in DB:");
    console.log(JSON.stringify(events, null, 2));
    process.exit(0);
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
}

testDb();
