
import { MongoClient } from "mongodb";

const uri = "mongodb+srv://thepacttechnical_db_user:dXca7HszlCFJ48MP@cluster0.zxhd8cp.mongodb.net/?appName=Cluster0";
const dbName = "pact_mediation";

async function debugEvents() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db(dbName);
        
        console.log("--- Conclave Events (MMC) ---");
        const conclaveColl = db.collection("conclaveEvents");
        const conclaveEvents = await conclaveColl.find({}).toArray();
        console.log("Found:", conclaveEvents.length);
        conclaveEvents.forEach(e => {
            console.log(`Year: ${e.year}, Active: ${e.isActive}, Guests: ${e.guestsOfHonour?.length || 0}, Highlights: ${e.highlights?.length || 0}`);
        });

        console.log("\n--- National Impact Awards (NIAAM) ---");
        const awardsColl = db.collection("nationalImpactAwards");
        const awardsEvents = await awardsColl.find({}).toArray();
        console.log("Found:", awardsEvents.length);
        awardsEvents.forEach(e => {
            console.log(`Year: ${e.year}, Active: ${e.isActive}, Recipients: ${e.recipients?.length || 0}, Gallery: ${e.gallery?.length || 0}`);
        });

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

debugEvents();
