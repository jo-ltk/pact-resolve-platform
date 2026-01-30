
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://thepacttechnical_db_user:dXca7HszlCFJ48MP@cluster0.zxhd8cp.mongodb.net/?appName=Cluster0&tls=true&tlsAllowInvalidCertificates=true";
const dbName = "pact_mediation";

async function seed() {
  const client = new MongoClient(uri, { family: 4 });
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('mciEvents');
    
    const sampleGallery = [
      {
        url: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&q=80",
        title: "Inaugural Ceremony",
        description: "Setting the stage for a weekend of elite mediation.",
        order: 1
      },
      {
        url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80",
        title: "Mentorship Sessions",
        description: "Connecting next-gen talent with industry veterans.",
        order: 2
      },
      {
        url: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?auto=format&fit=crop&q=80",
        title: "Final Rounds",
        description: "High-stakes mediation challenges in front of the grand jury.",
        order: 3
      }
    ];

    const result = await collection.updateOne(
      { year: 2026 },
      { 
        $set: { 
          title: ["Mediation", "Champions", "League"],
          subtitle: "India's Premier Mediation Competition",
          isActive: true,
          gallery: sampleGallery,
          updatedAt: new Date()
        },
        $setOnInsert: {
          createdAt: new Date(),
          year: 2026
        }
      },
      { upsert: true }
    );
    
    console.log("Seed successful:", result);
  } catch (err) {
    console.error("Seed error:", err.message);
  } finally {
    await client.close();
  }
}

seed();
