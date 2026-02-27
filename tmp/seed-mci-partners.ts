import { MongoClient, ObjectId } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pact_mediation';
const DB_NAME = process.env.MONGODB_DB_NAME || 'pact_mediation';

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
  { name: "Strategic Partner", logo: "/mentoring-partners/Firm logo.png" },
  { name: "Legal Partner", logo: "/mentoring-partners/Logo-removebg-preview.png" },
  { name: "Resolution Partner", logo: "/mentoring-partners/Logo_Red_Tagline_2022 (1).jpg" },
  { name: "Mentoring Partner", logo: "/mentoring-partners/Primary Logo Final V2.png" },
  { name: "Support Network", logo: "/mentoring-partners/Print.jpg" },
  { name: "Industry Leader", logo: "/mentoring-partners/Web.jpg" },
  { name: "Regional Partner", logo: "/mentoring-partners/WhatsApp Image 2025-10-30 at 14.51.35.jpg" },
  { name: "Collaboration Partner", logo: "/mentoring-partners/image001 (3).jpg" },
  { name: "Legal Mentor", logo: "/mentoring-partners/logo.png" },
  { name: "Associate Partner", logo: "/mentoring-partners/unnamed (1).png" },
].map((p, i) => ({ ...p, order: i + 1 }));

async function seed() {
  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db(DB_NAME);
  const collection = db.collection('mciEvents'); // Fixed collection name

  // Find active event
  const activeEvent = await collection.findOne({ isActive: true });
  
  if (activeEvent) {
    console.log('Found active event:', activeEvent._id);
    const result = await collection.updateOne(
      { _id: activeEvent._id },
      { $set: { mentoringPartners: partners } }
    );
    console.log('Update result:', result);
  } else {
    console.log('No active MCI event found');
    // Try to find any event
    const anyEvent = await collection.findOne({});
    if (anyEvent) {
      console.log('Found an event (not active):', anyEvent._id);
      const result = await collection.updateOne(
        { _id: anyEvent._id },
        { $set: { mentoringPartners: partners, isActive: true } }
      );
      console.log('Update result:', result);
    }
  }

  await client.close();
}

seed().catch(console.error);
