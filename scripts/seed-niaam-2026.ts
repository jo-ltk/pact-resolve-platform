
import { MongoClient } from "mongodb";

const uri = "mongodb+srv://thepacttechnical_db_user:dXca7HszlCFJ48MP@cluster0.zxhd8cp.mongodb.net/?appName=Cluster0";
const dbName = "pact_mediation";

async function seedNIAAM2026() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection("nationalImpactAwards");

        // Highlights/Gallery from the new uploads
        const gallery = [
            { 
                url: "/images/events/niaam/2026/NIAAM ML Mehta.JPG", 
                title: "Ceremonial Moment - Justice M.L. Mehta", 
                description: "Celebrating excellence at the National Impact Awards 2026." 
            },
            { 
                url: "/images/events/niaam/2026/NIAAM Tanu.JPG", 
                title: "Ceremonial Moment - Tanu Mehta", 
                description: "Honouring contributions to mediation advocacy." 
            },
            { 
                url: "/images/events/niaam/2026/NIAM Raj.JPG", 
                title: "Ceremonial Moment - Raj Panchmatia", 
                description: "Recognizing outstanding achievements in the field." 
            },
            { 
                url: "/images/events/niaam/2026/NIAM Veena.JPG", 
                title: "Ceremonial Moment - Veena Ralli", 
                description: "A tribute to dedication and impact in mediation." 
            }
        ];

        // Check if 2026 event exists
        const existing = await collection.findOne({ year: 2026 });

        if (existing) {
            console.log("Updating existing NIAAM 2026 event...");
            await collection.updateOne(
                { year: 2026 },
                { 
                    $set: { 
                        gallery: gallery,
                        updatedAt: new Date()
                    } 
                }
            );
        } else {
            console.log("Creating new NIAAM 2026 event...");
            // Use fallback data structure but with our gallery
            const newEvent = {
                year: 2026,
                isActive: true, 
                recipients: [
                    { name: "Adv Tanu Mehta", city: "Mumbai", category: "Mediation Education", year: "2026" },
                    { name: "Raj Panchmatia", city: "Mumbai", category: "Mediation Advocacy", year: "2026" },
                    { name: "Adv Veena Ralli", city: "New Delhi", category: "Mediation Practice", year: "2026" },
                    { name: "Justice Mohan Lal Mehta", city: "New Delhi", category: "Mediation Institution Building", year: "2026" }
                ],
                gallery: gallery,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            await collection.insertOne(newEvent);
        }

        console.log("Done.");

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

seedNIAAM2026();
