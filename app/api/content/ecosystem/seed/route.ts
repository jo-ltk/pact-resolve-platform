import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { COLLECTIONS } from "@/lib/db/schemas";
import { AuditRepository } from "@/lib/db/repositories/audit-repository";

const ecosystemTeamMembers = [
  {
    name: "Jonathan Rodrigues",
    role: "Managing Partner",
    category: "managing-partner",
    bio: "Jonathan Rodrigues is an Accredited International Mediator...",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
    order: 1,
    isActive: true
  },
  {
    name: "Nisshant Laroia",
    role: "Managing Partner",
    category: "managing-partner",
    bio: "Nisshant Laroia is an Accredited Mediator...",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80",
    order: 2,
    isActive: true
  }
];

const ecosystemPartners = [
  // STRATEGIC
  ...[
    { name: "IMI – International Mediation Institute", category: "strategic", region: "Europe / International", logo: "/partners/imi-full.jpg", description: "PACT is recognised for its Quality Assessment Programme (QAP)..." },
    { name: "Mediate.com", category: "strategic", region: "United States / International", logo: "/partners/mediate-com-new.png", description: "PACT is partnering with arguably the world’s oldest mediation education institute..." },
    { name: "Maxwell Mediators", category: "strategic", region: "Singapore / Asia Pacific", logo: "/partners/maxwell.jpg", description: "PACT is partnering with Singapore’s premier boutique mediation firm..." },
    { name: "Wolters Kluwer", category: "strategic", region: "Global / Knowledge Partner", logo: "/partners/wolters-kluwer.jpg", description: "PACT collaborates with Wolters Kluwer to provide cutting-edge mediation research..." }
  ].map((p, i) => ({ ...p, order: i + 1, isActive: true })),

  // PRACTICE
  ...[
    { name: "Cyril Amarchand Mangaldas", category: "practice", region: "India", logo: "/partners/cyril-amarchand-new.png", description: "(India) PACT is working with India’s leading firm..." },
    { name: "Khaitan & Co.", category: "practice", region: "India", logo: "/partners/khaitan.png", description: "(India) PACT is working with India’s leading firm..." },
    { name: "Adani Group", category: "practice", region: "India", logo: "/partners/adani-group.png", description: "(India) PACT is working with India’s leading corporate..." }
  ].map((p, i) => ({ ...p, order: i + 1, isActive: true })),

  // ACADEMIC (CURRENT)
  ...[
    "Manipal Academy of Higher Education (MAHE)",
    "BITS School of Law, Mumbai",
    "SRM University School of Law, Sonepat",
    "Dhirubhai Ambani University School of Law, Gandhinagar"
  ].map((name, i) => ({ name, category: "academic", region: "India", logo: "", order: i + 1, isActive: true })),

  // OLDER ASSOCIATIONS
  ...[
    "Gujarat National Law University (GNLU)", "NLU Delhi", "NALSAR University of Law", "NLSIU Bengaluru",
    "MNLU Mumbai", "Jindal Global Law School", "Symbiosis Law School (SLS)", "Lloyd Law College",
    "NLU Odisha", "RGNUL Punjab", "CNLU Patna", "National University of Study and Research in Law (NUSRL)",
    "Damodaram Sanjivayya National Law University (DSNLU)", "Tamil Nadu National Law University (TNNLU)",
    "HPNLU Shimla", "DNLU Jabalpur", "BR Ambedkar National Law University", "Nirma University School of Law"
  ].map((name, i) => ({ name, category: "older", region: "India", logo: "", order: i + 1, isActive: true })),

  // MISSION (MENTORING)
  ...[
    { name: "Trilegal", logo: "/partners/trilegal.png" }, { name: "IndusLaw", logo: "/partners/induslaw.jpg" },
    { name: "Samvād: Partners", logo: "/partners/samvad.png" }, { name: "Shardul Amarchand Mangaldas", logo: "/partners/shardul-amarchand.jpg" },
    { name: "Svar-Niti Law Offices", logo: "/partners/svarniti.jpg" }, { name: "Bharucha & Partners", logo: "/partners/bharucha.jpg" },
    { name: "Obelisk Legal", logo: "/partners/obelisk.png" }, { name: "Khaitan & Co", logo: "/partners/khaitan.png" },
    { name: "Dua Associates", logo: "/partners/dua-associates.png" }, { name: "Fox & Mandal", logo: "/partners/fox-mandal.png" },
    { name: "Nishith Desai Associates", logo: "/partners/nishith-desai.jpg" }, { name: "JSA Advocates & Solicitors", logo: "/partners/jsa.png" },
    { name: "Poovayya & Co", logo: "/partners/poovayya.jpg" }, { name: "Phoenix Legal", logo: "/partners/phoenix-legal.png" },
    { name: "DSK Legal", logo: "/partners/dsk-legal.png" }, { name: "Dentons Link Legal", logo: "/partners/dentons-link-legal.png" },
    { name: "Aarna Law", logo: "/partners/aarna-law.png" }, { name: "AKS Partners", logo: "/partners/aks-partners.png" },
    { name: "Cyril Amarchand Mangaldas", logo: "/partners/cyril-amarchand-new.png" }, { name: "ALMT Legal", logo: "/partners/almt-legal.png" }
  ].map((p, i) => ({ ...p, category: "mission", region: "India", order: i + 1, isActive: true })),

  // SUPPORTER
  ...[
    { name: "SIMI", logo: "" }, { name: "SIAC", logo: "" }, { name: "ICC", logo: "" },
    { name: "MCIA", logo: "" }, { name: "ASCL", logo: "/partners/ascl.jpg" }, { name: "Society of Construction Law", logo: "" },
    { name: "Mediate Works", logo: "" }, { name: "Mediator Academy", logo: "" }, { name: "SCMA", logo: "/partners/scma.png" },
    { name: "Prem Tara Foundation", logo: "/partners/prem-tara-foundation.png" }, { name: "GIMAC", logo: "/partners/gimac.png" }
  ].map((p, i) => ({ ...p, category: "supporter", region: "International/India", order: i + 1, isActive: true }))
];

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    const { db } = await connectToDatabase();

    const now = new Date();
    const addTimestamps = (item: any) => ({
      ...item,
      createdAt: now,
      updatedAt: now
    });

    // Clear existing data (only for partners in this context, or all if preferred)
    await db.collection(COLLECTIONS.ECOSYSTEM_PARTNERS).deleteMany({});

    // Seed data
    await db.collection(COLLECTIONS.ECOSYSTEM_PARTNERS).insertMany(ecosystemPartners.map(addTimestamps));

    // Audit Log
    if (userId) {
      AuditRepository.log({
        userId,
        action: "SEED_ECOSYSTEM_PARTNERS",
        resource: "ecosystem_partners",
        details: { count: ecosystemPartners.length }
      });
    }

    return NextResponse.json({
      success: true,
      message: "Ecosystem partners seeded successfully",
      data: { partners: ecosystemPartners.length }
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to seed Ecosystem partners" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Use POST to seed Ecosystem partners data."
  });
}
