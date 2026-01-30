
import { MongoClient } from "mongodb";

const uri = "mongodb+srv://thepacttechnical_db_user:dXca7HszlCFJ48MP@cluster0.zxhd8cp.mongodb.net/?appName=Cluster0";
const dbName = "pact_mediation";

async function checkMciEvents() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection("mciEvents");
        const events = await collection.find({}).toArray();
        console.log("MCI Events found:", events.length);
        events.forEach(event => {
            console.log(`Year: ${event.year}, Active: ${event.isActive}, Gallery items: ${event.gallery ? event.gallery.length : 'none'}`);
        });
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

checkMciEvents();
