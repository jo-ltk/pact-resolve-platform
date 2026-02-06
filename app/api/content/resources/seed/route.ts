import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { COLLECTIONS, type ResourceItem } from "@/lib/db/schemas";

const pactBlogs: Partial<ResourceItem>[] = [
  {
    type: "blog",
    title: "Cold-Feet in Mediation",
    author: "Jonathan Rodrigues",
    subtitle: "IMI Mediation Blog", // Storage choice
    publication: "IMI Mediation Blog",
    url: "https://imimediation.org/2020/01/29/the-cold-feet-challenge/",
    order: 1,
    isActive: true
  },
  {
    type: "blog",
    title: "Safeguarding Mediation Principles",
    author: "Jonathan Rodrigues",
    subtitle: "Mediatedotcom",
    publication: "Mediatedotcom",
    url: "https://mediate.com/safeguarding-the-pillars-of-mediation-in-india/",
    order: 2,
    isActive: true
  },
  {
    type: "blog",
    title: "Negotiating in Blind Faith",
    author: "Jonathan Rodrigues",
    subtitle: "Kluwer Mediation Blog",
    publication: "Kluwer Mediation Blog",
    url: "https://legalblogs.wolterskluwer.com/mediation-blog/negotiating-in-blind-faith/",
    order: 3,
    isActive: true
  },
];

const recommendedReads: Partial<ResourceItem>[] = [
  {
    type: "publication",
    title: "State-Sponsored Mediation",
    author: "Jonathan Rodrigues",
    subtitle: "New York Dispute Resolution Lawyer",
    publication: "New York Dispute Resolution Lawyer",
    url: "#",
    order: 1,
    isActive: true
  },
  {
    type: "publication",
    title: "Transformative Mediation",
    author: "Jonathan Rodrigues",
    subtitle: "Asian Journal on Mediation",
    publication: "Asian Journal on Mediation",
    url: "#",
    order: 2,
    isActive: true
  },
  {
    type: "publication",
    title: "Mediation Moves in Scotland",
    author: "Jonathan Rodrigues",
    subtitle: "Wolfgang Metzner Verlag",
    publication: "Wolfgang Metzner Verlag",
    url: "#",
    order: 3,
    isActive: true
  },
  {
    type: "publication",
    title: "Our Purpose as Mediators",
    author: "Jonathan Rodrigues",
    subtitle: "IMI Blog",
    publication: "IMI Blog",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:6789161705499856896/",
    order: 4,
    isActive: true
  },
  {
    type: "publication",
    title: "Mediation, Mental Health and Mindfulness",
    author: "Jonathan Rodrigues",
    subtitle: "Kluwer Mediation Blog",
    publication: "Kluwer Mediation Blog",
    url: "https://legalblogs.wolterskluwer.com/mediation-blog/mediation-mental-health-and-the-age-old-jesuit-practice-of-mindfulness/",
    order: 5,
    isActive: true
  },
  {
    type: "publication",
    title: "Pressure-Cooker Mediation",
    author: "Jonathan Rodrigues",
    subtitle: "Mediatedotcom",
    publication: "Mediatedotcom",
    url: "https://mediate.com/pressure-cooker-mediation-stick-to-basics-to-make-a-difference/",
    order: 6,
    isActive: true
  },
];

const recommendedWatching: Partial<ResourceItem>[] = [
  {
    type: "video",
    title: "Role of a Lawyer",
    subtitle: "TEDx Talk", // storing Type/Context in subtitle
    author: "Jonathan Rodrigues", // speaker
    url: "https://www.youtube.com/watch?v=Cuc1OLtxb3E",
    order: 1,
    isActive: true
  },
  {
    type: "video",
    title: "Mediation Advocacy",
    subtitle: "Vidhi Utsav",
    author: "Jonathan Rodrigues",
    url: "https://www.youtube.com/watch?v=E8bgQpQ6dOE",
    order: 2,
    isActive: true
  },
  {
    type: "video",
    title: "Role of Mediation in International Disputes",
    subtitle: "BTIS Law School",
    author: "Jonathan Rodrigues",
    url: "https://www.youtube.com/watch?v=nQLB_E2Z3hg",
    order: 3,
    isActive: true
  },
];

const recommendedBooks: Partial<ResourceItem>[] = [
  {
    type: "book",
    title: "The Commercial Mediation Monograph",
    author: "Sriram Panchu",
    subtitle: "Sriram Panchu", // ensuring subtitle is populated
    image: "/books/commercial-mediation.jpg",
    url: "https://www.amazon.in/Commercial-Mediation-Monograph-Sriram-Panchu/dp/8193966937",
    order: 1,
    isActive: true
  },
  {
    type: "book",
    title: "Conciliation and Mediation in India",
    author: "Gracious Timothy Dunna",
    subtitle: "Gracious Timothy Dunna",
    image: "/books/conciliation-mediation-india.jpg",
    url: "https://www.amazon.in/Conciliation-Mediation-Global-Dispute-Resolution/dp/9403520159",
    order: 2,
    isActive: true
  },
  {
    type: "book",
    title: "Mediation Policy and Practice",
    author: "Chitra Narayan",
    subtitle: "Chitra Narayan",
    image: "/books/mediation-policy-practice.jpg",
    url: "https://www.amazon.in/Mediation-Policy-Practice-Chitra-Narayan-ebook/dp/B092W17JHH",
    order: 3,
    isActive: true
  },
  {
    type: "book",
    title: "The Mediation Process",
    author: "Christopher W. Moore",
    subtitle: "Christopher W. Moore",
    image: "/books/mediation-process.jpg",
    url: "https://www.amazon.in/Mediation-Process-Practical-Strategies-Resolving-ebook/dp/B00H7JE6U2",
    order: 4,
    isActive: true
  },
  {
    type: "book",
    title: "The Promise of Mediation",
    author: "Robert A. Baruch Bush & Joseph P. Folger",
    subtitle: "Robert A. Baruch Bush & Joseph P. Folger",
    image: "/books/promise-of-mediation.jpg",
    url: "https://www.amazon.in/Promise-Mediation-Transformative-Approach-Conflict-ebook/dp/B000PY4A16",
    order: 5,
    isActive: true
  },
  {
    type: "book",
    title: "Mediating Dangerously",
    author: "Kenneth Cloke",
    subtitle: "Kenneth Cloke",
    image: "/books/mediating-dangerously.jpg",
    url: "https://www.amazon.in/Mediating-Dangerously-Frontiers-Conflict-Resolution-ebook/dp/B000QF5EWS",
    order: 6,
    isActive: true
  },
  {
    type: "book",
    title: "The Mediator's Handbook",
    author: "Jennifer E. Beer & Caroline C. Packard",
    subtitle: "Jennifer E. Beer & Caroline C. Packard",
    image: "/books/mediators-handbook.jpg",
    url: "https://www.amazon.in/Mediators-Handbook-Revised-Expanded-fourth/dp/0865717222",
    order: 7,
    isActive: true
  },
  {
    type: "book",
    title: "The Mediator's Toolkit",
    author: "Gerry O'Sullivan",
    subtitle: "Gerry O'Sullivan",
    image: "/books/mediators-toolkit.jpg",
    url: "https://www.amazon.in/Mediators-Toolkit-Formulating-Questions-Successful/dp/1774060248",
    order: 8,
    isActive: true
  },
];

const newsFeatures: Partial<ResourceItem>[] = [
  {
    type: "news",
    title: "Challenges to the Mediation Profession (2020)",
    publication: "SCC Online Times",
    subtitle: "SCC Online Times",
    url: "https://www.scconline.com/blog/post/2020/10/31/in-conversation-with-jonathan-rodrigues-on-online-mediation-challenges-and-future-of-profession/",
    order: 1,
    isActive: true
  },
  {
    type: "news",
    title: "PACT as a start-up (2018)",
    publication: "Superlawyer",
    subtitle: "Superlawyer",
    url: "https://superlawyer.in/jonathan-rodrigues-co-founder-pact-challenges-start-up-online-mediation-career-adr/",
    order: 2,
    isActive: true
  },
];

const podcastEpisodes: Partial<ResourceItem>[] = [
  {
    type: "podcast",
    title: "Are Mediators Actually Mediating?",
    subtitle: "Bill Marsh & Chitra Narayan",
    author: "Jonathan Rodrigues",
    category: "Mediation Practice",
    description: "A candid discussion about what really happens behind closed mediation doors.",
    url: "https://www.youtube.com/live/2AFA_Jdv7mA",
    publication: "Mission Mediation Podcast",
    date: "2024",
    order: 1,
    isActive: true,
    isFeatured: true
  },
  {
    type: "podcast",
    title: "Are Lawyers Relevant in Mediation?",
    subtitle: "Ekta Bahl & Geoff Sharp",
    author: "Jonathan Rodrigues",
    category: "Lawyer's Role",
    description: "Exploring the role of lawyers in the mediation process.",
    url: "https://www.youtube.com/watch?v=yFby7ZLlkAg",
    publication: "Mission Mediation Podcast",
    date: "2024",
    order: 2,
    isActive: true,
    isFeatured: true
  },
  {
    type: "podcast",
    title: "Building Trust in Private Mediation",
    subtitle: "Jawad A J & Jonathan Lloyd-Jones",
    author: "Jonathan Rodrigues",
    category: "Trust Building",
    description: "Strategies for building trust in private mediation settings.",
    url: "https://www.youtube.com/watch?v=stg6rttI2kg",
    publication: "Mission Mediation Podcast",
    date: "2024",
    order: 3,
    isActive: true
  },
  {
    type: "podcast",
    title: "Commercial Mediation Works (Case Study)",
    subtitle: "Jeff Kichaven & Nisshant Laroia",
    author: "Jonathan Rodrigues",
    category: "Case Study",
    description: "Real-world case study demonstrating successful commercial mediation.",
    url: "https://www.youtube.com/watch?v=rYI4_PgBitE",
    publication: "Mission Mediation Podcast",
    date: "2024",
    order: 4,
    isActive: true
  },
  {
    type: "podcast",
    title: "Can you Mediate without Lawyers?",
    subtitle: "Jonathan Rodrigues & Laila Ollapally",
    author: "Jonathan Rodrigues",
    category: "Party Representation",
    description: "Discussion on party representation in mediation.",
    url: "https://www.youtube.com/watch?v=B8PZuN-f6n4",
    publication: "Mission Mediation Podcast",
    date: "2024",
    order: 5,
    isActive: true
  },
  {
    type: "podcast",
    title: "Private Mediation Essentials: Self-determination",
    subtitle: "Joel Lee & Jonathan Rodrigues",
    author: "Jonathan Rodrigues",
    category: "Core Principles",
    description: "Understanding self-determination as a core principle of mediation.",
    url: "https://www.youtube.com/watch?v=yvIci9WuZzc",
    publication: "Mission Mediation Podcast",
    date: "2024",
    order: 6,
    isActive: true
  },
  {
    type: "podcast",
    title: "Mediation in India",
    subtitle: "Attorney General for India R. Venkataramani & Soni Singh",
    author: "Jonathan Rodrigues",
    category: "Indian Context",
    description: "Exploring the state of mediation in India with key stakeholders.",
    url: "https://www.youtube.com/watch?v=eJZeUtoIBpQ",
    publication: "Mission Mediation Podcast",
    date: "2024",
    order: 7,
    isActive: true
  },
  {
    type: "podcast",
    title: "Mediation Essentials: Confidentiality",
    subtitle: "Sudhanshu Batra & Jonathan Rodrigues",
    author: "Jonathan Rodrigues",
    category: "Core Principles",
    description: "The importance of confidentiality in mediation practice.",
    url: "https://www.youtube.com/live/jiRvEzdDepM",
    publication: "Mission Mediation Podcast",
    date: "2024",
    order: 8,
    isActive: true
  },
];

const journalPublications: Partial<ResourceItem>[] = [
  {
    type: "journal",
    title: "The Future of Mediation in India",
    subtitle: "Volume 1, Issue 1",
    author: "Jonathan Rodrigues",
    publication: "National Mediation Review",
    description: "An in-depth analysis of the current state and future prospects of mediation in India.",
    url: "#",
    date: "2024",
    category: "Commercial Mediation",
    order: 1,
    isActive: true,
    isFeatured: true
  },
  {
    type: "journal",
    title: "Transformative Mediation: A New Paradigm",
    subtitle: "Volume 1, Issue 2",
    author: "Jonathan Rodrigues",
    publication: "National Mediation Review",
    description: "Exploring transformative mediation as an alternative approach to conflict resolution.",
    url: "#",
    date: "2024",
    category: "Mediation Theory",
    order: 2,
    isActive: true
  },
];

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    
    // Clear existing
    await db.collection(COLLECTIONS.RESOURCES).deleteMany({});
    
    const now = new Date();
    const withTime = (item: any) => ({ ...item, createdAt: now, updatedAt: now });

    const allItems = [
      ...pactBlogs,
      ...recommendedReads,
      ...recommendedWatching,
      ...recommendedBooks,
      ...newsFeatures,
      ...podcastEpisodes,
      ...journalPublications
    ].map(withTime);

    await db.collection(COLLECTIONS.RESOURCES).insertMany(allItems);

    return NextResponse.json({
      success: true,
      message: "Resources seeded successfully",
      count: allItems.length
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ success: false, error: "Failed to seed" }, { status: 500 });
  }
}
