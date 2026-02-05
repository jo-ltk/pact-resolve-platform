import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { COLLECTIONS } from "@/lib/db/schemas";

// Seed data based on existing frontend content

const mediationCourses = [
  {
    program: "mediation",
    courseType: "foundational",
    title: "Foundational Course in Mediation Advocacy",
    subtitle: "Become a skilled mediation advocate",
    mode: "Online (20 Videos)",
    liveSession: "One Live Session",
    assessment: "Quiz Based",
    certification: "PACT Resolve Certificate",
    feeAmount: 10000,
    feeCurrency: "INR",
    feeNote: "+ GST",
    ctaText: "Enrol Now",
    ctaLink: "mailto:academy@pactresolve.com?subject=Enrollment%20Inquiry%20-%20Foundational%20Course%20in%20Mediation%20Advocacy",
    benefits: [
      "Recognized certification in mediation advocacy",
      "Practical skills for real-world mediation scenarios",
      "Access to mentorship from experienced mediators"
    ],
    enrollmentStatus: "Open",
    order: 1,
    isActive: true
  },
  {
    program: "mediation",
    courseType: "advanced",
    title: "Certificate Course in Mediation Advocacy",
    subtitle: "Advanced training for mediation professionals",
    mode: "Online (40 Videos)",
    liveSession: "Multiple Live Sessions",
    assessment: "Case Study Based",
    certification: "Advanced PACT Certificate",
    feeAmount: 25000,
    feeCurrency: "INR",
    feeNote: "+ GST",
    ctaText: "Enrol Now",
    ctaLink: "mailto:academy@pactresolve.com?subject=Enrollment%20Inquiry%20-%20Certificate%20Course%20in%20Mediation%20Advocacy",
    benefits: [
      "In-depth understanding of complex mediation techniques",
      "Hands-on experience with simulated cases",
      "Networking opportunities with industry professionals"
    ],
    enrollmentStatus: "Open",
    order: 2,
    isActive: true
  }
];

const mediationModules = [
  // Foundational Course Modules
  {
    program: "mediation",
    courseType: "foundational",
    moduleNumber: 1,
    title: "Module 1: Mediation Advocacy Essentials",
    content: "What \"Advocacy\" Means in Mediation; The Mediation Process: From Referral to Resolution; Roles in Mediation: Mediator, Parties, Counsel; How Mediation Differs From Arbitration and Court; Core Skills for the Mediation Advocate",
    order: 1,
    isActive: true
  },
  {
    program: "mediation",
    courseType: "foundational",
    moduleNumber: 2,
    title: "Module 2: Understanding Client",
    content: "Identifying Client Goals and Interests; Distinguishing Positions from Interests; The Role of Emotions in Disputes; Preparing Clients for Mediation; Managing Expectations",
    order: 2,
    isActive: true
  },
  {
    program: "mediation",
    courseType: "foundational",
    moduleNumber: 3,
    title: "Module 3: Strategy Development",
    content: "Case Assessment for Mediation Suitability; Developing a Mediation Strategy; Understanding the Other Party's Perspective; BATNA, WATNA and ZOPA Analysis; Setting Realistic Goals",
    order: 3,
    isActive: true
  },
  {
    program: "mediation",
    courseType: "foundational",
    moduleNumber: 4,
    title: "Module 4: Opening Statement",
    content: "Crafting an Effective Opening Statement; The Art of Framing the Dispute; Setting the Tone for Negotiation; Common Mistakes to Avoid; Practice and Feedback",
    order: 4,
    isActive: true
  },
  {
    program: "mediation",
    courseType: "foundational",
    moduleNumber: 5,
    title: "Module 5: Negotiation Techniques",
    content: "Principled Negotiation in Mediation; Making and Responding to Offers; Creating Value Through Problem-Solving; Breaking Through Impasses; The Role of Concessions",
    order: 5,
    isActive: true
  },
  // Advanced Course Modules
  {
    program: "mediation",
    courseType: "advanced",
    moduleNumber: 1,
    title: "Module 1: Advanced Advocacy Strategies",
    content: "Complex Multi-party Mediation; Cross-cultural Considerations; Dealing with Power Imbalances; High-conflict Personalities; Advanced Negotiation Tactics",
    order: 1,
    isActive: true
  },
  {
    program: "mediation",
    courseType: "advanced",
    moduleNumber: 2,
    title: "Module 2: Specialized Areas",
    content: "Commercial Dispute Mediation; Family and Matrimonial Mediation; Workplace and Employment Disputes; Construction and Real Estate; Intellectual Property Disputes",
    order: 2,
    isActive: true
  },
  {
    program: "mediation",
    courseType: "advanced",
    moduleNumber: 3,
    title: "Module 3: Ethics and Best Practices",
    content: "Ethical Obligations of Mediation Advocates; Confidentiality and Privilege; Managing Conflicts of Interest; Professional Standards; Building a Mediation Practice",
    order: 3,
    isActive: true
  }
];

const arbitrationCourses = [
  {
    program: "arbitration",
    courseType: "foundational",
    title: "Foundation Course in Arbitration",
    subtitle: "Master the fundamentals of arbitration advocacy",
    mode: "Online (25 Videos)",
    liveSession: "Two Live Sessions",
    assessment: "Quiz Based",
    certification: "PACT Resolve Certificate",
    feeAmount: 12000,
    feeCurrency: "INR",
    feeNote: "+ GST",
    ctaText: "Enrol Now",
    ctaLink: "mailto:academy@pactresolve.com?subject=Enrollment%20Inquiry%20-%20Foundation%20Course%20in%20Arbitration",
    benefits: [
      "Comprehensive understanding of arbitration process",
      "Practical advocacy skills",
      "Industry-recognized certification"
    ],
    enrollmentStatus: "Open",
    order: 1,
    isActive: true
  },
  {
    program: "arbitration",
    courseType: "advanced",
    title: "Certificate Course in Arbitration Advocacy",
    subtitle: "Advanced techniques for arbitration professionals",
    mode: "Online (45 Videos)",
    liveSession: "Multiple Live Sessions",
    assessment: "Moot + Case Study",
    certification: "Advanced PACT Certificate",
    feeAmount: 30000,
    feeCurrency: "INR",
    feeNote: "+ GST",
    ctaText: "Enrol Now",
    ctaLink: "mailto:academy@pactresolve.com?subject=Enrollment%20Inquiry%20-%20Certificate%20Course%20in%20Arbitration%20Advocacy",
    benefits: [
      "Expert-level arbitration techniques",
      "International arbitration focus",
      "Moot court experience"
    ],
    enrollmentStatus: "Open",
    order: 2,
    isActive: true
  }
];

const arbitrationModules = [
  {
    program: "arbitration",
    courseType: "foundational",
    moduleNumber: 1,
    title: "Module 1: Introduction to Arbitration",
    content: "What is Arbitration?; Types of Arbitration; Arbitration vs Litigation; The Arbitration Agreement; Institutional vs Ad-hoc Arbitration",
    order: 1,
    isActive: true
  },
  {
    program: "arbitration",
    courseType: "foundational",
    moduleNumber: 2,
    title: "Module 2: The Arbitration Process",
    content: "Commencement of Arbitration; Appointment of Arbitrators; Preliminary Hearings; Document Production; Witness Statements",
    order: 2,
    isActive: true
  },
  {
    program: "arbitration",
    courseType: "foundational",
    moduleNumber: 3,
    title: "Module 3: Advocacy in Arbitration",
    content: "Written Submissions; Oral Advocacy; Cross-examination Techniques; Expert Evidence; Closing Arguments",
    order: 3,
    isActive: true
  },
  {
    program: "arbitration",
    courseType: "advanced",
    moduleNumber: 1,
    title: "Module 1: International Arbitration",
    content: "International Arbitration Framework; UNCITRAL Rules; ICC Arbitration; Investment Treaty Arbitration; Enforcement of Awards",
    order: 1,
    isActive: true
  },
  {
    program: "arbitration",
    courseType: "advanced",
    moduleNumber: 2,
    title: "Module 2: Complex Arbitration Issues",
    content: "Multi-party Arbitration; Joinder and Consolidation; Interim Measures; Emergency Arbitration; Third-party Funding",
    order: 2,
    isActive: true
  }
];

const negotiationCourses = [
  {
    program: "negotiation",
    courseType: "foundational",
    title: "Skilled Negotiator Course",
    subtitle: "Master the art and science of negotiation",
    mode: "Online (20 Videos)",
    liveSession: "One Live Session",
    assessment: "Role-play Based",
    certification: "PACT Resolve Certificate",
    feeAmount: 8000,
    feeCurrency: "INR",
    feeNote: "+ GST",
    ctaText: "Enrol Now",
    ctaLink: "mailto:academy@pactresolve.com?subject=Enrollment%20Inquiry%20-%20Skilled%20Negotiator%20Course",
    benefits: [
      "Practical negotiation frameworks",
      "Real-world case studies",
      "Personal coaching sessions"
    ],
    enrollmentStatus: "Open",
    order: 1,
    isActive: true
  },
  {
    program: "negotiation",
    courseType: "advanced",
    title: "Advanced Negotiation Mastery",
    subtitle: "Strategic negotiation for complex scenarios",
    mode: "Online (35 Videos)",
    liveSession: "Multiple Live Sessions",
    assessment: "Simulation Based",
    certification: "Advanced PACT Certificate",
    feeAmount: 20000,
    feeCurrency: "INR",
    feeNote: "+ GST",
    ctaText: "Enrol Now",
    ctaLink: "mailto:academy@pactresolve.com?subject=Enrollment%20Inquiry%20-%20Advanced%20Negotiation%20Mastery",
    benefits: [
      "Advanced influence techniques",
      "Multi-party negotiation strategies",
      "Executive-level skills"
    ],
    enrollmentStatus: "Open",
    order: 2,
    isActive: true
  }
];

const negotiationModules = [
  {
    program: "negotiation",
    courseType: "foundational",
    moduleNumber: 1,
    title: "Module 1: Negotiation Fundamentals",
    content: "The Art and Science of Negotiation; Types of Negotiation; Distributive vs Integrative; Preparation and Planning; Setting Objectives",
    order: 1,
    isActive: true
  },
  {
    program: "negotiation",
    courseType: "foundational",
    moduleNumber: 2,
    title: "Module 2: Communication Skills",
    content: "Active Listening; Asking Effective Questions; Non-verbal Communication; Building Rapport; Managing Emotions",
    order: 2,
    isActive: true
  },
  {
    program: "negotiation",
    courseType: "foundational",
    moduleNumber: 3,
    title: "Module 3: Strategy and Tactics",
    content: "BATNA Development; Making First Offers; Concession Strategies; Breaking Deadlocks; Closing the Deal",
    order: 3,
    isActive: true
  },
  {
    program: "negotiation",
    courseType: "advanced",
    moduleNumber: 1,
    title: "Module 1: Complex Negotiations",
    content: "Multi-party Negotiations; Coalition Building; Team Negotiations; Cross-cultural Negotiation; Virtual Negotiations",
    order: 1,
    isActive: true
  },
  {
    program: "negotiation",
    courseType: "advanced",
    moduleNumber: 2,
    title: "Module 2: Influence and Persuasion",
    content: "Psychology of Influence; Persuasion Techniques; Dealing with Difficult Negotiators; Power Dynamics; Ethical Considerations",
    order: 2,
    isActive: true
  }
];

const facultyMembers = [
  {
    programs: ["mediation", "arbitration", "negotiation"],
    courseTypes: ["foundational", "advanced"],
    name: "Justice ABC (Retd.)",
    role: "Lead Faculty",
    image: "",
    bio: "Former Judge with over 30 years of experience in dispute resolution. Expert in commercial and civil matters.",
    profileUrl: "",
    order: 1,
    isActive: true
  },
  {
    programs: ["mediation", "arbitration"],
    courseTypes: ["foundational", "advanced"],
    name: "Adv. XYZ",
    role: "Senior Faculty",
    image: "",
    bio: "Senior Advocate with extensive experience in arbitration and mediation. Accredited mediator with multiple institutions.",
    profileUrl: "",
    order: 2,
    isActive: true
  },
  {
    programs: ["negotiation"],
    courseTypes: ["foundational", "advanced"],
    name: "Dr. PQR",
    role: "Guest Faculty",
    image: "",
    bio: "PhD in Conflict Resolution. Internationally certified negotiation trainer with corporate experience.",
    profileUrl: "",
    order: 3,
    isActive: true
  }
];

const partners = [
  {
    programs: ["arbitration"],
    name: "Indian Institute of Arbitration & Mediation",
    logo: "",
    description: "Premier institution for ADR training in India",
    websiteUrl: "https://www.arbitrationindia.org",
    order: 1,
    isActive: true
  },
  {
    programs: ["negotiation"],
    name: "Harvard Negotiation Institute",
    logo: "",
    description: "World-renowned negotiation training partner",
    websiteUrl: "",
    order: 2,
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
    await db.collection(COLLECTIONS.ACADEMY_COURSES).deleteMany({});
    await db.collection(COLLECTIONS.ACADEMY_MODULES).deleteMany({});
    await db.collection(COLLECTIONS.ACADEMY_FACULTY).deleteMany({});
    await db.collection(COLLECTIONS.ACADEMY_PARTNERS).deleteMany({});

    // Seed courses
    const allCourses = [...mediationCourses, ...arbitrationCourses, ...negotiationCourses].map(addTimestamps);
    await db.collection(COLLECTIONS.ACADEMY_COURSES).insertMany(allCourses);

    // Seed modules
    const allModules = [...mediationModules, ...arbitrationModules, ...negotiationModules].map(addTimestamps);
    await db.collection(COLLECTIONS.ACADEMY_MODULES).insertMany(allModules);

    // Seed faculty
    const allFaculty = facultyMembers.map(addTimestamps);
    await db.collection(COLLECTIONS.ACADEMY_FACULTY).insertMany(allFaculty);

    // Seed partners
    const allPartners = partners.map(addTimestamps);
    await db.collection(COLLECTIONS.ACADEMY_PARTNERS).insertMany(allPartners);

    return NextResponse.json({
      success: true,
      message: "Academy data seeded successfully",
      data: {
        courses: allCourses.length,
        modules: allModules.length,
        faculty: allFaculty.length,
        partners: allPartners.length
      }
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to seed Academy data" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Use POST to seed Academy data. This will clear existing data and insert fresh content."
  });
}
