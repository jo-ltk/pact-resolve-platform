
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://thepacttechnical_db_user:dXca7HszlCFJ48MP@cluster0.zxhd8cp.mongodb.net/?appName=Cluster0";

async function test() {
  console.log("Testing connection to:", uri.substring(0, 50) + "...");
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 10000,
    tls: true,
    family: 4
  });
  
  try {
    await client.connect();
    console.log("SUCCESS: Connected to MongoDB Atlas");
    const db = client.db('pact_mediation');
    const colls = await db.listCollections().toArray();
    console.log("Collections Found:", colls.map(c => c.name));
  } catch (err) {
    console.error("FAILURE: Connection failed");
    console.error("Error Code:", err.code);
    console.error("Error Message:", err.message);
  } finally {
    await client.close();
  }
}

test();
