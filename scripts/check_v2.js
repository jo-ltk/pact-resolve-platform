
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// Simple parser for .env.local
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
        env[match[1].trim()] = match[2].trim();
    }
});

const uri = env.MONGODB_URI;
const dbName = env.MONGODB_DB_NAME || "pact_mediation";

async function run() {
  console.log("Connecting to:", uri.substring(0, 50) + "...");
  const client = new MongoClient(uri, {
      tls: true,
      tlsAllowInvalidCertificates: true,
      family: 4
  });
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
