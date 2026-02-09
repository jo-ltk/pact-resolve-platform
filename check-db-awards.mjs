import { getDb } from "./lib/mongodb.js";
import { COLLECTIONS } from "./lib/db/schemas.js";

async function checkAwards() {
  try {
    const db = await getDb();
    const event = await db.collection(COLLECTIONS.NATIONAL_IMPACT_AWARDS).findOne({ isActive: true });
    
    if (!event) {
      console.log("No active awards event found.");
      return;
    }
    
    console.log(`Active Event ID: ${event._id}`);
    console.log(`Year: ${event.year}`);
    console.log("Recipients:");
    event.recipients.forEach((r, i) => {
      console.log(`${i}: ${r.name} (${r.city}) - ${r.category}`);
    });
  } catch (error) {
    console.error("Error:", error);
  } finally {
    process.exit();
  }
}

checkAwards();
