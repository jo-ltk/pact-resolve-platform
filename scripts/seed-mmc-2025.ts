
import { MongoClient } from "mongodb";

const uri = "mongodb+srv://thepacttechnical_db_user:dXca7HszlCFJ48MP@cluster0.zxhd8cp.mongodb.net/?appName=Cluster0";
const dbName = "pact_mediation";

async function seedMMC2025() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection("conclaveEvents");

        // Highlights using the NEW schema
        const highlights = [
            { 
                thumbnailUrl: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&q=80", 
                sessionTitle: "Are Mediators Actually Mediating?", 
                speakerName: "Bill Marsh & Chitra Narayan", 
                youtubeUrl: "https://www.youtube.com/live/2AFA_Jdv7mA" 
            },
            { 
                thumbnailUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80", 
                sessionTitle: "Are Lawyers Relevant in Mediation?", 
                speakerName: "Ekta Bahl & Geoff Sharp", 
                youtubeUrl: "https://www.youtube.com/watch?v=yFby7ZLlkAg" 
            },
            { 
                thumbnailUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80", 
                sessionTitle: "Building Trust in Private Mediation", 
                speakerName: "Jawad A J & Jonathan Lloyd-Jones", 
                youtubeUrl: "https://www.youtube.com/watch?v=stg6rttI2kg" 
            },
            { 
                thumbnailUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80", 
                sessionTitle: "Commercial Mediation Works", 
                speakerName: "Jeff Kichaven & Nisshant Laroia", 
                youtubeUrl: "https://www.youtube.com/watch?v=rYI4_PgBitE" 
            },
            { 
                thumbnailUrl: "https://images.unsplash.com/photo-1515168816513-4896b9f0d1a9?auto=format&fit=crop&q=80", 
                sessionTitle: "Can you Mediate without Lawyers?", 
                speakerName: "Jonathan Rodrigues & Laila Ollapally", 
                youtubeUrl: "https://www.youtube.com/watch?v=B8PZuN-f6n4" 
            },
            { 
                thumbnailUrl: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&q=80", 
                sessionTitle: "Mediation in India", 
                speakerName: "Attorney General R. Venkataramani", 
                youtubeUrl: "https://www.youtube.com/watch?v=eJZeUtoIBpQ" 
            },
            { 
                thumbnailUrl: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?auto=format&fit=crop&q=80", 
                sessionTitle: "The Future of Dispute Resolution", 
                speakerName: "International Panel", 
                youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
            },
            { 
                thumbnailUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80", 
                sessionTitle: "Online Mediation Best Practices", 
                speakerName: "Tech Experts", 
                youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
            },
            { 
                thumbnailUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80", 
                sessionTitle: "Conflict Coaching vs Mediation", 
                speakerName: "Dr. Melamed", 
                youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
            }
        ];

        console.log("Updating existing 2025 event with new schema highlights...");
        await collection.updateOne(
            { year: 2025 },
            { 
                $set: { 
                    highlights: highlights,
                    updatedAt: new Date()
                } 
            }
        );

        console.log("Done.");

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

seedMMC2025();
