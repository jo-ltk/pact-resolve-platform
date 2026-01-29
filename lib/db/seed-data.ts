/**
 * Seed Data for Phase 1 Collections
 * 
 * This file contains the initial seed data extracted from the current hardcoded content.
 * Use this to populate the database with existing content.
 */

import type {
  HeroSlide,
  NewsItem,
  PanelMember,
  Partner,
  FooterSettings,
  GlobalSettings,
  MCIEvent,
} from "./schemas";

// ============================================================================
// HERO SLIDES
// ============================================================================

export const heroSlidesSeed: Omit<HeroSlide, "_id" | "createdAt" | "updatedAt">[] = [
  {
    order: 1,
    title: ["PACT", "Mediation"],
    description: "A trendsetter in Mediation Process Design, PACT relies on bespoke case management, quality mediators and best practices for client satisfaction",
    buttonLabel: "Mediation Page",
    link: "/mediation",
    rightSlogan: "RESOLVE WITH PRECISION",
    image: {
      url: "/hero/hero_mediation.png",
      alt: "PACT Mediation",
    },
    isActive: true,
  },
  {
    order: 2,
    title: ["PACT", "Academy"],
    description: "A pioneer in Mediation Advocacy Training, PACT is upskilling lawyers and training professionals who have a significant seat at the mediation table",
    buttonLabel: "Academy Page",
    link: "/academy",
    rightSlogan: "MASTERY IN ADVOCACY",
    image: {
      url: "/hero/hero_academy.png",
      alt: "PACT Academy",
    },
    isActive: true,
  },
  {
    order: 3,
    title: ["Mission", "Mediation"],
    description: "Through podcasts, panels and the annual conclave, PACT is developing a market and generating case studies and educational content",
    buttonLabel: "Podcast Page",
    link: "/podcast",
    rightSlogan: "LEADING THE DIALOGUE",
    image: {
      url: "/hero/hero_mission.png",
      alt: "Mission Mediation",
    },
    isActive: true,
  },
  {
    order: 4,
    title: ["Mediation Champions", "League"],
    description: "Formerly known as Mediation Championship India, this event convenes a stellar group of next-gen professionals and current experts",
    buttonLabel: "Competition Page",
    link: "/competition",
    rightSlogan: "THE FUTURE OF ADR",
    image: {
      url: "/hero/hero_league.png",
      alt: "Mediation Champions League",
    },
    isActive: true,
  },
  {
    order: 5,
    title: ["PACT Mediation", "Pledge"],
    description: "The Pledge promotes early, constructive resolution, signalling your commitment to relationship-preservation and business ease.",
    buttonLabel: "PACT Pledge and Clauses",
    link: "/pledge",
    rightSlogan: "COMMIT TO EXCELLENCE",
    image: {
      url: "/hero/hero_pledge.png",
      alt: "PACT Mediation Pledge",
    },
    isActive: true,
  },
];

// ============================================================================
// NEWS ITEMS
// ============================================================================

export const newsItemsSeed: Omit<NewsItem, "_id" | "createdAt" | "updatedAt">[] = [
  {
    type: "Podcast",
    title: "Mediation in India | Attorney General R. Venkataramani, with Jonathan Rodrigues & Soni Singh",
    date: "Aug 24, 2025",
    image: {
      url: "/news/mediation-india-podcast.jpg",
      alt: "Mediation India Podcast",
    },
    link: "https://www.youtube.com/watch?v=eJZeUtoIBpQ",
    order: 1,
    isActive: true,
    isFeatured: true,
  },
  {
    type: "Article",
    title: "What is Our Purpose as Mediators? by Jonathan Rodrigues",
    date: "Apr 12, 2021",
    image: {
      url: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80",
      alt: "Purpose as Mediators",
    },
    link: "https://imimediation.org/2021/04/12/what-is-our-purpose-as-mediators/",
    order: 2,
    isActive: true,
    isFeatured: false,
  },
  {
    type: "Podcast",
    title: "Did your lawyer mention multi-door dispute resolution system? | Jonathan Rodrigues | TEDxPanaji",
    date: "Dec 10, 2025",
    image: {
      url: "/news/tedx-panaji.png",
      alt: "TEDx Panaji",
    },
    link: "https://www.youtube.com/watch?v=Cuc1OLtxb3E",
    order: 3,
    isActive: true,
    isFeatured: true,
  },
  {
    type: "Blog",
    title: "Commercial Mediation – How Do You Bill?",
    date: "Dec 16, 2024",
    image: {
      url: "/news/commercial-mediation-billing.jpg",
      alt: "Commercial Mediation Billing",
    },
    link: "https://www.barandbench.com/columns/commercial-mediation-how-do-you-bill",
    order: 4,
    isActive: true,
    isFeatured: false,
  },
  {
    type: "Article",
    title: "State-Sponsored Mediation Around the World: Does It Support the Parties' Interests?",
    date: "Jan 2024",
    image: {
      url: "/news/state-sponsored-mediation.png",
      alt: "State Sponsored Mediation",
    },
    link: "https://nysba.org/new-york-dispute-resolution-lawyer-vol-17-no-1/",
    order: 5,
    isActive: true,
    isFeatured: false,
  },
  {
    type: "Book",
    title: "Mediation Simplified – An Interactive Workbook by Nisshant Laroia & Jonathan Rodrigues",
    date: "2024",
    image: {
      url: "/news/mediation-simplified-book.jpg",
      alt: "Mediation Simplified Book",
    },
    link: "https://www.amazon.in/Mediation-Simplified-Interactive-Workbook-Nisshant/dp/9395764325",
    order: 6,
    isActive: true,
    isFeatured: true,
  },
];

// ============================================================================
// PANEL MEMBERS
// ============================================================================

export const panelMembersSeed: Omit<PanelMember, "_id" | "createdAt" | "updatedAt">[] = [
  {
    name: "Jonathan Rodrigues",
    role: "Lead Mediator & Founder",
    image: {
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
      alt: "Jonathan Rodrigues",
    },
    order: 1,
    isActive: true,
  },
  {
    name: "Kurian Joseph",
    role: "Retd. Judge, Supreme Court of India",
    image: {
      url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80",
      alt: "Kurian Joseph",
    },
    order: 2,
    isActive: true,
  },
  {
    name: "Gita Mittal",
    role: "Retd. Judge, Chief Justice (JKHC)",
    image: {
      url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
      alt: "Gita Mittal",
    },
    order: 3,
    isActive: true,
  },
  {
    name: "Ekta Bahl",
    role: "Senior Mediator",
    image: {
      url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80",
      alt: "Ekta Bahl",
    },
    order: 4,
    isActive: true,
  },
];

// ============================================================================
// PARTNERS
// ============================================================================

export const partnersSeed: Omit<Partner, "_id" | "createdAt" | "updatedAt">[] = [
  {
    name: "Maxwell Mediators",
    logo: { url: "/partners/maxwell-mediators.png", alt: "Maxwell Mediators" },
    category: "strategic",
    order: 1,
    isActive: true,
  },
  {
    name: "Mediate.com",
    logo: { url: "/partners/mediate-com.png", alt: "Mediate.com" },
    category: "strategic",
    order: 2,
    isActive: true,
  },
  {
    name: "Shardul Amarchand Mangaldas",
    logo: { url: "/partners/shardul-amarchand-mangaldas.png", alt: "Shardul Amarchand Mangaldas" },
    category: "strategic",
    order: 3,
    isActive: true,
  },
  {
    name: "International Mediation Institute",
    logo: { url: "/partners/international-mediation-institute.png", alt: "International Mediation Institute" },
    category: "strategic",
    order: 4,
    isActive: true,
  },
  {
    name: "Khaitan & Co.",
    logo: { url: "/partners/khaitan-and-co.png", alt: "Khaitan & Co." },
    category: "collaborator",
    order: 5,
    isActive: true,
  },
  {
    name: "Adani Group",
    logo: { url: "/partners/adani-group.png", alt: "Adani Group" },
    category: "sponsor",
    order: 6,
    isActive: true,
  },
  {
    name: "Cyril Amarchand Mangaldas",
    logo: { url: "/partners/cyril-amarchand-mangaldas.png", alt: "Cyril Amarchand Mangaldas" },
    category: "collaborator",
    order: 7,
    isActive: true,
  },
  {
    name: "Prem Tara Foundation",
    logo: { url: "/partners/prem-tara-foundation.png", alt: "Prem Tara Foundation" },
    category: "supporter",
    order: 8,
    isActive: true,
  },
];

// ============================================================================
// FOOTER SETTINGS
// ============================================================================

export const footerSettingsSeed: Omit<FooterSettings, "_id" | "createdAt" | "updatedAt"> = {
  tagline: "Professional Mediation Platform for International Dispute Resolution and Strategic Excellence.",
  socialLinks: [
    { platform: "facebook", url: "#", enabled: true },
    { platform: "linkedin", url: "#", enabled: true },
    { platform: "instagram", url: "#", enabled: true },
    { platform: "youtube", url: "#", enabled: true },
    { platform: "whatsapp", url: "#", enabled: true },
  ],
  quickLinks: [
    { label: "Privacy Policy", href: "/privacy", order: 1 },
    { label: "Terms of Service", href: "/terms", order: 2 },
    { label: "Resources", href: "/resources", order: 3 },
    { label: "Academy", href: "/academy", order: 4 },
  ],
  newsletter: {
    enabled: true,
    heading: "Subscribe to our Newsletter",
    description: "Stay updated with the latest in mediation and ADR.",
    buttonText: "Subscribe",
  },
  copyrightText: "© 2026 PACT. All Rights Reserved.",
};

// ============================================================================
// GLOBAL SETTINGS
// ============================================================================

export const globalSettingsSeed: Omit<GlobalSettings, "_id" | "createdAt" | "updatedAt"> = {
  email: "official@thepact.in",
  whatsapp: "+919123456789",
  contactPersons: [
    { name: "Nisshant", phone: "+91 91234 56789", role: "Co-founder" },
    { name: "Jonathan", phone: "+91 98765 43210", role: "Founder" },
  ],
  address: "Postal Address: PACT International Headquarters, ADR Tower, New Delhi, India.",
  companyName: "PACT",
};

// ============================================================================
// MCI EVENT
// ============================================================================

export const mciEventSeed: Omit<MCIEvent, "_id" | "createdAt" | "updatedAt"> = {
  year: 2026,
  isActive: true,
  subtitle: "India's Premier Mediation Event",
  title: ["MEDIATION", "CHAMPIONS", "LEAGUE"],
  heroDescription: [
    "The fourth edition of India's premier mediation event will convene the country's top next-generation dispute resolution talent to compete and collaborate on the biggest stage.",
    "The flagship event also serves as a great space for mentoring, networking and branding for mediation.",
  ],
  eventDetails: {
    dates: "September 2026",
    venue: "New Delhi",
    hosts: "Coming Soon",
    sponsors: "Coming Soon",
  },
  vision: {
    subtitle: "The Vision",
    title: "Globally Unique, Exceptionally Indian",
    description: [
      "Mediation Championship India – \"MCI\" – is a Mediation Champions League featuring skilled and smart young lawyers from across the country.",
      "Challengers showcase their wits and wisdom in tackling 7 immersive challenges from convening to concluding a typical Mediation, mentored by Law Firm partners, C-Suite Leaders, and members of the Judiciary.",
    ],
    experienceText: "7 Immersive Challenges",
    brochurePdfUrl: "#",
  },
  emails: {
    signUp: "official@mediationchampionship.com",
    sponsor: "official@thepact.in",
    general: "official@mediationchampionship.com",
  },
  champions: [
    {
      year: "2023",
      counselNames: "Anshul Kumar Sarma, Ananya Dewan, Kessav Navaladi Shankar",
      mediatorName: "Akshita Kothari",
    },
    {
      year: "2024",
      counselNames: "Arundhati Venkarachalam, Sankalp Varma",
      mediatorName: "Kashish Goel",
    },
    {
      year: "2025",
      counselNames: "Ayush Khanna, Kartikey Tripathi",
      mediatorName: "Navya Pandey",
    },
  ],
  pastEditions: [
    {
      year: "2025",
      date: "November 7-9",
      location: "New Delhi",
      venue: "Venue TBD",
      actions: [
        { label: "View Report", url: "#", icon: "report" },
        { label: "MRU Movie", url: "#", icon: "movie" },
        { label: "Watch MCI Movie", url: "#", icon: "movie" },
      ],
    },
    {
      year: "2024",
      date: "September 13-15",
      location: "Ahmedabad",
      venue: "Gujarat National Law University",
      actions: [
        { label: "MCI Movie 2024", url: "#", icon: "movie" },
        { label: "Mentors Frame", url: "#", icon: "mentors" },
        { label: "Students Frame", url: "#", icon: "students" },
      ],
    },
    {
      year: "2023",
      date: "September 8-10",
      location: "Ahmedabad",
      venue: "Adani Institute of Infrastructure",
      actions: [
        { label: "Mentors Frame", url: "#", icon: "mentors" },
        { label: "Partners Picture", url: "#", icon: "partners" },
        { label: "Participants", url: "#", icon: "participants" },
      ],
    },
  ],
  gallery: [
    {
      url: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&q=80",
      title: "Inaugural Ceremony",
      description: "Setting the stage for a weekend of elite mediation.",
      order: 1,
    },
    {
      url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80",
      title: "Mentorship Sessions",
      description: "Connecting next-gen talent with industry veterans.",
      order: 2,
    },
    {
      url: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?auto=format&fit=crop&q=80",
      title: "Final Rounds",
      description: "High-stakes mediation challenges in front of the grand jury.",
      order: 3,
    },
    {
      url: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80",
      title: "Gala Dinner",
      description: "An evening of celebration and strategic networking.",
      order: 4,
    },
    {
      url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
      title: "Winners Circle",
      description: "Celebrating excellence in dispute resolution.",
      order: 5,
    },
    {
      url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80",
      title: "Collaborations",
      description: "Building lasting partnerships within the legal community.",
      order: 6,
    },
  ],
  mediaCoverage: [
    { name: "Bar and Bench", fontStyle: "font-serif" },
    { name: "Live Law", fontStyle: "font-sans font-bold" },
    { name: "SCC Online", fontStyle: "font-serif italic" },
    { name: "Lawctopus", fontStyle: "font-sans font-black tracking-tighter" },
    { name: "Law Beat", fontStyle: "font-serif font-bold uppercase" },
    { name: "Bar Bulletin", fontStyle: "font-sans tracking-tight" },
    { name: "Law Bhoomi", fontStyle: "font-serif italic font-bold" },
    { name: "Law Chakra", fontStyle: "font-sans font-medium" },
  ],
  rewards: [
    { icon: "star", text: "INR 1,50,000", subtext: "Cash Prizes", colorClass: "bg-amber-50 text-amber-600", order: 1 },
    { icon: "graduation", text: "Course", subtext: "Online Mediation", colorClass: "bg-blue-50 text-blue-600", order: 2 },
    { icon: "book", text: "Literature", subtext: "Books & Resources", colorClass: "bg-emerald-50 text-emerald-600", order: 3 },
    { icon: "award", text: "Scholarship", subtext: "Training Programs", colorClass: "bg-purple-50 text-purple-600", order: 4 },
    { icon: "ticket", text: "Gala Dinner", subtext: "Black & Gold Night", colorClass: "bg-rose-50 text-rose-600", order: 5 },
    { icon: "users", text: "Networking", subtext: "Strategic Growth", colorClass: "bg-indigo-50 text-indigo-600", order: 6 },
    { icon: "zap", text: "Conclave", subtext: "Mission Mediation", colorClass: "bg-orange-50 text-orange-600", order: 7 },
    { icon: "briefcase", text: "Internships", subtext: "Tier-1 Law Firms", colorClass: "bg-cyan-50 text-cyan-600", order: 8 },
  ],
  heroImage: {
    url: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&q=80",
    alt: "MCI Hero",
  },
  visionImage: {
    url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
    alt: "MCI Mentoring",
  },
  competitionImage: {
    url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80",
    alt: "7 Rounds of MCI",
  },
};
