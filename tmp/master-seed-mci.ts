import { MongoClient } from 'mongodb';

const MONGODB_URI = "mongodb+srv://thepacttechnical_db_user:dXca7HszlCFJ48MP@cluster0.zxhd8cp.mongodb.net/?appName=Cluster0";
const DB_NAME = "pact_mediation";

const partners = [
  { name: "ALMT Legal", logo: "/mentoring-partners/ALMT_LOGO_HIGH-RES (1).png" },
  { name: "Aarna Law", logo: "/mentoring-partners/Aarna Law Logo 2 - Blue.png" },
  { name: "Cyril Amarchand Mangaldas", logo: "/mentoring-partners/CAM_Logo_golden + purple-Main (1).png" },
  { name: "DSK Legal", logo: "/mentoring-partners/DSK Legal Logo PNG.png" },
  { name: "Dentons Link Legal", logo: "/mentoring-partners/Dentons Link Legal_PNG_Dentons-Link-Legal-PNG-Dentons-Purple-96.png" },
  { name: "JSA Law", logo: "/mentoring-partners/JSA Logo.png" },
  { name: "Khaitan & Co", logo: "/mentoring-partners/Nov 2021-Khaitan Logo@3x - Copy.png" },
  { name: "Shardul Amarchand Mangaldas", logo: "/mentoring-partners/SAM Logo.jpg" },
  { name: "Samvad Partners", logo: "/mentoring-partners/Samvad Partners Logo.png.png" },
  { name: "AKS Partners", logo: "/mentoring-partners/aks-partners-logo.png" },
  { name: "Phoenix Legal", logo: "/mentoring-partners/Firm logo.png" },
  { name: "Fox & Mandal", logo: "/mentoring-partners/unnamed (1).png" },
  { name: "Nishith Desai Associates", logo: "/mentoring-partners/logo.png" },
  { name: "AZB & Partners", logo: "/mentoring-partners/Logo-removebg-preview.png" },
  { name: "Trilegal", logo: "/mentoring-partners/Logo_Red_Tagline_2022 (1).jpg" },
  { name: "Luthra and Luthra", logo: "/mentoring-partners/Primary Logo Final V2.png" },
  { name: "IndusLaw", logo: "/mentoring-partners/Print.jpg" },
  { name: "S&R Associates", logo: "/mentoring-partners/Web.jpg" },
  { name: "Majmudar & Partners", logo: "/mentoring-partners/WhatsApp Image 2025-10-30 at 14.51.35.jpg" },
  { name: "Economic Laws Practice", logo: "/mentoring-partners/image001 (3).jpg" },
].map((p, i) => ({ ...p, order: i + 1, id: `p-${i}-${Date.now()}` }));

const gallery = [
    {
      url: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&q=80",
      title: "Inaugural Ceremony",
      description: "Setting the stage for a weekend of elite mediation.",
      order: 1,
      id: "g1"
    },
    {
      url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80",
      title: "Mentorship Sessions",
      description: "Connecting next-gen talent with industry veterans.",
      order: 2,
      id: "g2"
    },
    {
      url: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?auto=format&fit=crop&q=80",
      title: "Final Rounds",
      description: "High-stakes mediation challenges in front of the grand jury.",
      order: 3,
      id: "g3"
    },
    {
      url: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80",
      title: "Gala Dinner",
      description: "An evening of celebration and strategic networking.",
      order: 4,
      id: "g4"
    },
    {
      url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
      title: "Winners Circle",
      description: "Celebrating excellence in dispute resolution.",
      order: 5,
      id: "g5"
    },
    {
      url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80",
      title: "Collaborations",
      description: "Building lasting partnerships within the legal community.",
      order: 6,
      id: "g6"
    }
];

async function seed() {
  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db(DB_NAME);
  const collection = db.collection('mciEvents');

  console.log('Clearing existing MCI events...');
  await collection.deleteMany({});

  console.log('Creating new active MCI 2026 event...');
  const newEvent = {
    year: 2026,
    title: ["Mediation", "Champions", "League"],
    subtitle: "India's Premier Mediation Competition",
    isActive: true,
    gallery: gallery,
    mentoringPartners: partners,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const result = await collection.insertOne(newEvent);
  console.log('Seed successful. ID:', result.insertedId);

  await client.close();
}

seed().catch(console.error);
