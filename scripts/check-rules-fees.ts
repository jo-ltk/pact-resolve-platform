import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || "pact_mediation";

async function check() {
  if (!uri) throw new Error("MONGODB_URI is not set");
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    
    console.log("--- Mediation Rules ---");
    const rules = await db.collection("mediationRules").find().toArray();
    console.log(JSON.stringify(rules.map(r => ({ title: r.title, order: r.order })), null, 2));
    
    console.log("--- Mediation Fees ---");
    const fees = await db.collection("mediationFees").find().toArray();
    console.log(JSON.stringify(fees.map(f => ({ title: f.title, order: f.order })), null, 2));
    
  } finally {
    await client.close();
  }
}

check().catch(console.error);
