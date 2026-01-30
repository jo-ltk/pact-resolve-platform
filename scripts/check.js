
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://thepacttechnical_db_user:dXca7HszlCFJ48MP@cluster0.zxhd8cp.mongodb.net/?appName=Cluster0";
const dbName = "pact_mediation";

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("Connected successfully");
    const db = client.db(dbName);
    const collection = db.collection('mciEvents');
    const events = await collection.find({}).toArray();
    console.log("Events found:", events.length);
    events.forEach(e => {
        console.log(`Year: ${e.year}, Gallery items: ${e.gallery ? e.gallery.length : 0}`);
    });
  } catch (err) {
    console.error("Connection error:", err.message);
  } finally {
    await client.close();
  }
}

run();
