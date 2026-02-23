
import { MongoClient } from "mongodb";

const uri = "mongodb+srv://thepacttechnical_db_user:dXca7HszlCFJ48MP@cluster0.zxhd8cp.mongodb.net/?appName=Cluster0";
const dbName = "pact_mediation";

async function seedMMC2025() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection("conclaveEvents");

        // 1. Highlights (YouTube based)
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
                youtubeUrl: "https://www.youtube.com/live/2AFA_Jdv7mA" 
            },
            { 
                thumbnailUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80", 
                sessionTitle: "Online Mediation Best Practices", 
                speakerName: "Tech Experts", 
                youtubeUrl: "https://www.youtube.com/live/2AFA_Jdv7mA" 
            },
            { 
                thumbnailUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80", 
                sessionTitle: "Conflict Coaching vs Mediation", 
                speakerName: "Dr. Melamed", 
                youtubeUrl: "https://www.youtube.com/live/2AFA_Jdv7mA" 
            }
        ];

        // 2. Coverage (Media & Press) with REAL LINKS
        const coverage = [
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
        ];

        // 3. Guests of Honour
        const guestsOfHonour = [
            { name: "R. Venkataramani", title: "Attorney General for India", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80" },
            { name: "Hon. Justice A.K. Sikri", title: "Former Judge, Supreme Court of India", image: "https://images.unsplash.com/photo-1560250097-9b93dbd19728?auto=format&fit=crop&q=80" },
            { name: "Sriram Panchu", title: "Senior Advocate & Mediator", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80" },
            { name: "Hon'ble Guests", title: "Distinguished Panelists", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80" }
        ];

        console.log("Seeding all Conclave 2025 content...");
        
        await collection.updateOne(
            { year: 2025 },
            { 
                $set: { 
                    isActive: true,
                    subtitle: "The Stakeholder Gathering",
                    titleLines: ["MISSION", "MEDIATION", "CONCLAVE"],
                    description: "The second edition of this unique gathering of mediation stakeholders will once again feature real case studies, practical insights and evidence-driven conversations on mediation as a practice and profession in India.",
                    heroImage: { url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80", alt: "Hero Image" },
                    
                    eventDetails: {
                        dates: "9 November 2025",
                        venue: "India International Centre, New Delhi",
                        hosts: "The PACT",
                        sponsors: "Samvād: Partners & Dua Associates"
                    },
                    
                    vision: {
                        subtitle: "The Concept",
                        title: "Mediation in Practice",
                        description: "The Mission Mediation Conclave is a gathering that is open to every stakeholder involved in the practice and profession of Mediation. It aims to bridge the gap between theory and real-world application through evidence-driven dialogue.",
                        image: { url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80", alt: "Vision image" },
                        badgeText: "Conclave"
                    },
                    
                    participation: {
                        subtitle: "Expand Your Network",
                        title: "Who Is Participating",
                        description: "A multi-disciplinary gathering bringing together the most influential voices in the mediation ecosystem, from C-Suite leaders to legal counsels and academia."
                    },
                    
                    highlights: highlights,
                    highlightsDescription: "Mission Mediation Conclave 2025 was held on 9 November at India International Centre, New Delhi, with Samvād: Partners and Dua Associates as Headline Sponsors.",
                    guestsOfHonour: guestsOfHonour,
                    coverage: coverage,
                    updatedAt: new Date()
                } 
            },
            { upsert: true }
        );

        console.log("Seeding completed successfully.");

    } catch (e) {
        console.error("Seeding failed:", e);
    } finally {
        await client.close();
    }
}

seedMMC2025();
