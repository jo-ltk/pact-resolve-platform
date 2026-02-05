import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { COLLECTIONS } from "@/lib/db/schemas";

const ecosystemTeamMembers = [
  {
    name: "Jonathan Rodrigues",
    role: "Managing Partner",
    category: "managing-partner",
    bio: "Jonathan Rodrigues is an Accredited International Mediator with an academic background in Psychology and Law and prior professional experience in journalism and education. He pursued an LL.M. in Mediation and Conflict Resolution in the UK and has served as a mediator in various capacities in Glasgow and London. Jonathan is certified as a civil, commercial, and workplace mediator by bodies including IIAM, IICA, TCM, PSMA, NALSA and IAM, and has delivered a TEDx talk on the Multi-Door Dispute Resolution System. He acts as a consultant at The TCM Group (London) Mediator Academy (London) and ICFML (Portugal/Brazil). He advises MediateIndia! and is the Regional Assistant Editor – South Asia for Kluwer Mediation Blog. Jonathan is the host of the Mission Mediation Podcast and Editor at Mediation Simplified.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
    order: 1,
    isActive: true
  },
  {
    name: "Nisshant Laroia",
    role: "Managing Partner",
    category: "managing-partner",
    bio: "Nisshant Laroia is an Accredited Mediator, trained and certified by IIAM, IICA, PSMA, and a certified Mediation Counsel by SIMI and SCMA. A graduate of Gujarat National Law University (GNLU), he has worked as in-house counsel at Yogic Naturals, a pioneering health and wellness brand. Nisshant is the author of Mediation Simplified and co-founder of the Global Academy for Advocacy in Dispute Resolution (GAADR). He has worked with 15,000+ law students, introducing them to mediation, and is also an associate-grade arbitrator with the Chartered Institute of Arbitrators (CIArb). He has served as a mediator at the Delhi Dispute Resolution Society mediation centre.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80",
    order: 2,
    isActive: true
  },
  {
    name: "New Partner Name",
    role: "Managing Partner",
    category: "managing-partner",
    bio: "This is a placeholder for a new Managing Partner. They will bring extensive experience in mediation and conflict resolution to the leadership team at PACT.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
    order: 3,
    isActive: true
  },
  { 
    name: "Justice Tejas Karia", 
    role: "Partner, Shardul Amarchand Mangaldas", 
    category: "mentor",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80",
    order: 1,
    isActive: true
  },
  { 
    name: "Justice Gita Mittal", 
    role: "Retd. Judge, Chief Justice (JKHC)", 
    category: "mentor",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80",
    order: 2,
    isActive: true
  },
  { 
    name: "Justice Kurian Joseph", 
    role: "Retd. Judge, Supreme Court of India", 
    category: "mentor",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
    order: 3,
    isActive: true
  },
  { 
    name: "Chitra Narayan", 
    role: "Advocate & Mediator", 
    category: "mentor",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80",
    order: 4,
    isActive: true
  },
  { 
    name: "Jonathan Rodrigues", 
    role: "International & Commercial", 
    category: "expert",
    niche: "International & Commercial", 
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
    order: 1,
    isActive: true
  },
  { 
    name: "Soni Singh", 
    role: "Civil & Commercial", 
    category: "expert",
    niche: "Civil & Commercial", 
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
    order: 2,
    isActive: true
  },
  { 
    name: "Ekta Bahl", 
    role: "Corporate & Law", 
    category: "expert",
    niche: "Corporate & Law", 
    image: "https://images.unsplash.com/photo-1567532939103-c053bb14b2b9?auto=format&fit=crop&q=80",
    order: 3,
    isActive: true
  },
  { 
    name: "Raj Panchmatia", 
    role: "Dispute Resolution", 
    category: "expert",
    niche: "Dispute Resolution", 
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80",
    order: 4,
    isActive: true
  },
  { 
    name: "Jatan Rodrigues", 
    role: "Staff",
    category: "staff",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80",
    order: 1,
    isActive: true
  },
  { 
    name: "Sandeep Bhalothia", 
    role: "Staff",
    category: "staff",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80",
    order: 2,
    isActive: true
  },
  { 
    name: "Juhi Gupta", 
    role: "Staff",
    category: "staff",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80",
    order: 3,
    isActive: true
  },
  { 
    name: "Gokul Narayan", 
    role: "Staff",
    category: "staff",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80",
    order: 4,
    isActive: true
  },
  { 
    name: "Sainishtha Gupta", 
    role: "Extern",
    category: "extern",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    order: 1,
    isActive: true
  },
  { 
    name: "Naman Grover", 
    role: "Extern",
    category: "extern",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80",
    order: 2,
    isActive: true
  }
];

const ecosystemAwards = [
  {
    recipientName: "Jonathan Rodrigues",
    awardTitle: "Award 1",
    description: "This award recognizes Jonathan Rodrigues for his exceptional leadership and core values in mediation.",
    image: "",
    order: 1,
    isActive: true
  },
  {
    recipientName: "Nisshant Laroia",
    awardTitle: "Award 2",
    description: "This award recognizes Nisshant Laroia for his significant contributions to the mediation profession.",
    image: "",
    order: 2,
    isActive: true
  }
];

const ecosystemPartners = [
  {
    name: "Strategic Partner 1",
    category: "strategic",
    logo: "/partners/maxwell-mediators.png",
    region: "Global",
    description: "Description for Strategic Partner 1",
    order: 1,
    isActive: true
  },
  {
    name: "Academic Associate 1",
    category: "academic",
    logo: "/partners/mediate-com.png",
    region: "India",
    description: "Description for Academic Associate 1",
    order: 1,
    isActive: true
  },
  {
    name: "Legal Alliance 1",
    category: "legal",
    logo: "/partners/khaitan-and-co.png",
    region: "Asia",
    description: "Description for Legal Alliance 1",
    order: 1,
    isActive: true
  }
];

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();

    const now = new Date();
    const addTimestamps = (item: any) => ({
      ...item,
      createdAt: now,
      updatedAt: now
    });

    // Clear existing data
    await db.collection(COLLECTIONS.ECOSYSTEM_TEAM).deleteMany({});
    await db.collection(COLLECTIONS.ECOSYSTEM_AWARDS).deleteMany({});
    await db.collection(COLLECTIONS.ECOSYSTEM_PARTNERS).deleteMany({});

    // Seed data
    await db.collection(COLLECTIONS.ECOSYSTEM_TEAM).insertMany(ecosystemTeamMembers.map(addTimestamps));
    await db.collection(COLLECTIONS.ECOSYSTEM_AWARDS).insertMany(ecosystemAwards.map(addTimestamps));
    await db.collection(COLLECTIONS.ECOSYSTEM_PARTNERS).insertMany(ecosystemPartners.map(addTimestamps));

    return NextResponse.json({
      success: true,
      message: "Ecosystem data seeded successfully",
      data: {
        team: ecosystemTeamMembers.length,
        awards: ecosystemAwards.length,
        partners: ecosystemPartners.length
      }
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to seed Ecosystem data" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Use POST to seed Ecosystem data. This will clear existing data and insert fresh content."
  });
}
