
import { MongoClient } from "mongodb";

const uri = "mongodb+srv://thepacttechnical_db_user:dXca7HszlCFJ48MP@cluster0.zxhd8cp.mongodb.net/?appName=Cluster0";
const dbName = "pact_mediation";

async function seedMMC2025() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection("conclaveEvents");

        // Highlights from the new uploads
        const highlights = [
            { 
                url: "/images/events/mmc/2025/Pic1.jpg", 
                title: "Event Poster 2025", 
                description: "Original Campaign Poster for the 2025 Mission Mediation Conclave." 
            },
            { 
                url: "/images/events/mmc/2025/Picture2.jpg", 
                title: "Audience Engagement", 
                description: "Mission Mediation Conclave 2025 was held on 9 November at India International Centre." 
            },
            { 
                url: "/images/events/mmc/2025/Picture3.jpg", 
                title: "Keynote Address", 
                description: "Headline sponsors Samvād: Partners and Dua Associates." 
            },
            { 
                url: "/images/events/mmc/2025/Picture4.jpg", 
                title: "Interactive Session", 
                description: "Engaging discussions between stakeholders and the audience." 
            }
        ];

        // Check if 2025 event exists
        const existing = await collection.findOne({ year: 2025 });

        if (existing) {
            console.log("Updating existing 2025 event...");
            await collection.updateOne(
                { year: 2025 },
                { 
                    $set: { 
                        highlights: highlights,
                        updatedAt: new Date()
                    } 
                }
            );
        } else {
            console.log("Creating new 2025 event...");
            // Use fallback data structure but with our images
            const newEvent = {
                year: 2025,
                isActive: true, // Make active for now so it shows up
                guestsOfHonour: [
                    { name: "R. Venkataramani", title: "Attorney General for India", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80" },
                    { name: "Hon. Justice A.K. Sikri", title: "Former Judge, Supreme Court of India", image: "https://images.unsplash.com/photo-1560250097-9b93dbd19728?auto=format&fit=crop&q=80" },
                    { name: "Sriram Panchu", title: "Senior Advocate & Mediator", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80" },
                    { name: "Hon'ble Guests", title: "Distinguished Panelists", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80" }
                ],
                highlights: highlights,
                coverage: [
                    {
                      source: "ET LEGAL WORLD",
                      headline: "India urged to lead global mediation with international headquarters",
                      link: "https://legal.economictimes.indiatimes.com/news/web-stories/india-urged-to-lead-global-mediation-with-international-headquarters/125224193"
                    },
                    {
                      source: "BW WORLD",
                      headline: "Attorney General R Venkataramani to grace the Mediation Championship India 2025",
                      link: "https://www.bwlegalworld.com/article/attorney-general-r-venkataramani-to-grace-the-mediation-championship-india-2025-hosted-by-the-pact-577838"
                    },
                    {
                      source: "BAR AND BENCH",
                      headline: "I am more gladiator than mediator - AG Venkataramani calls for mediation push",
                      link: "https://www.barandbench.com/news/i-am-more-gladiator-than-mediator-ag-venkataramani-calls-for-mediation-push"
                    }
                ],
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

seedMMC2025();
