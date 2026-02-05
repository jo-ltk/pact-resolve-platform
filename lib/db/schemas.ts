/**
 * Phase 1 MongoDB Schemas
 * 
 * These TypeScript interfaces define the structure for all Phase 1 editable content.
 * They serve as the contract between the API, database, and frontend.
 */

import { ObjectId } from "mongodb";

// ============================================================================
// COMMON TYPES
// ============================================================================

/** Base document with common fields */
export interface BaseDocument {
  _id?: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

/** Image metadata - stores URL only, actual images stored in Cloudinary */
export interface ImageData {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

/** Social media link */
export interface SocialLink {
  platform: "facebook" | "linkedin" | "instagram" | "youtube" | "twitter" | "whatsapp";
  url: string;
  enabled: boolean;
}

// ============================================================================
// 1. HERO SLIDES (Homepage Hero Carousel)
// ============================================================================

export interface HeroSlide extends BaseDocument {
  /** Display order (1, 2, 3...) */
  order: number;
  /** Title split into lines for formatting, e.g., ["PACT", "Mediation"] */
  title: string[];
  /** Description text */
  description: string;
  /** Call-to-action button label */
  buttonLabel: string;
  /** Link/URL for the button */
  link: string;
  /** Right-side slogan text (desktop only) */
  rightSlogan: string;
  /** Background image for the slide */
  image: ImageData;
  /** Whether this slide is active/visible */
  isActive: boolean;
}

// ============================================================================
// 2. NEWS ITEMS (Homepage News Section)
// ============================================================================

export type NewsType = "Podcast" | "Article" | "Blog" | "Book" | "Press Release" | "Event";

export interface NewsItem extends BaseDocument {
  /** Type of news item */
  type: NewsType;
  /** Title of the news item */
  title: string;
  /** Publication date (display format, e.g., "Aug 24, 2025") */
  date: string;
  /** Featured image */
  image: ImageData;
  /** External link to the full content */
  link: string;
  /** Display order (lower = appears first) */
  order: number;
  /** Whether this item is visible */
  isActive: boolean;
  /** Featured items appear prominently */
  isFeatured: boolean;
}

// ============================================================================
// 3. PANEL MEMBERS (Panel of Neutrals / Team Members)
// ============================================================================

export interface PanelMember extends BaseDocument {
  /** Full name */
  name: string;
  /** Job title/role, e.g., "Lead Mediator & Founder" */
  role: string;
  /** Profile photo */
  image: ImageData;
  /** Optional bio/description */
  bio?: string;
  /** Optional LinkedIn or profile URL */
  profileUrl?: string;
  /** Display order */
  order: number;
  /** Whether this member is visible */
  isActive: boolean;
}

// ============================================================================
// 4. PARTNERS (Strategic Partners / Collaborators)
// ============================================================================

export interface Partner extends BaseDocument {
  /** Partner/organization name */
  name: string;
  /** Logo image */
  logo: ImageData;
  /** Optional website URL */
  websiteUrl?: string;
  /** Partner category for grouping */
  category: "strategic" | "collaborator" | "supporter" | "sponsor";
  /** Display order */
  order: number;
  /** Whether this partner is visible */
  isActive: boolean;
}

// ============================================================================
// 5. FOOTER SETTINGS
// ============================================================================

export interface FooterQuickLink {
  label: string;
  href: string;
  order: number;
}

export interface FooterSettings extends BaseDocument {
  /** Company tagline */
  tagline: string;
  /** Social media links */
  socialLinks: SocialLink[];
  /** Quick navigation links */
  quickLinks: FooterQuickLink[];
  /** Newsletter section settings */
  newsletter: {
    enabled: boolean;
    heading: string;
    description: string;
    buttonText: string;
  };
  /** Copyright text */
  copyrightText: string;
}

// ============================================================================
// 6. GLOBAL SETTINGS (Contact Info)
// ============================================================================

export interface ContactPerson {
  name: string;
  phone: string;
  role?: string;
}

export interface GlobalSettings extends BaseDocument {
  /** Primary email address */
  email: string;
  /** WhatsApp number (with country code) */
  whatsapp: string;
  /** Contact persons with their phone numbers */
  contactPersons: ContactPerson[];
  /** Postal address */
  address: string;
  /** Company name */
  companyName: string;
  /** Company logo */
  logo?: ImageData;
}

// ============================================================================
// 7. MCI EVENT (Mediation Championship India)
// ============================================================================

/** Champion entry for national champions section */
export interface MCIChampion {
  year: string;
  counselNames: string;
  mediatorName: string;
}

/** Past edition entry */
export interface MCIPastEdition {
  year: string;
  date: string;
  location: string;
  venue: string;
  actions: {
    label: string;
    url: string;
    icon: "report" | "movie" | "mentors" | "students" | "partners" | "participants";
  }[];
}

/** Gallery image for MCI memories */
export interface MCIGalleryImage {
  url: string;
  title: string;
  description: string;
  order: number;
}

/** Media coverage entry */
export interface MCIMediaCoverage {
  name: string;
  fontStyle: string;
  url?: string;
}

/** Reward/benefit entry */
export interface MCIReward {
  icon: "star" | "graduation" | "book" | "award" | "ticket" | "users" | "zap" | "briefcase";
  text: string;
  subtext: string;
  colorClass: string;
  order: number;
}

export interface MCIEvent extends BaseDocument {
  /** Event subtitle, e.g., "India's Premier Mediation Event" */
  subtitle: string;
  /** Main title lines */
  title: string[];
  /** Hero section description paragraphs */
  heroDescription: string[];
  /** Event details */
  eventDetails: {
    dates: string;
    venue: string;
    hosts: string;
    sponsors: string;
  };
  /** Vision section content */
  vision: {
    subtitle: string;
    title: string;
    description: string[];
    experienceText: string;
    brochurePdfUrl?: string;
  };
  /** Email addresses */
  emails: {
    signUp: string;
    sponsor: string;
    general: string;
  };
  /** National champions list */
  champions: MCIChampion[];
  /** Past editions history */
  pastEditions: MCIPastEdition[];
  /** Gallery images */
  gallery: MCIGalleryImage[];
  /** Media coverage logos */
  mediaCoverage: MCIMediaCoverage[];
  /** Rewards and benefits */
  rewards: MCIReward[];
  /** Strategic partners for Advocate Maximus */
  strategicPartners?: ConclaveHighlight[];
  /** Hero background image */
  heroImage: ImageData;
  /** Vision section image */
  visionImage: ImageData;
  /** Competition section image */
  competitionImage: ImageData;
  /** Event year for identification */
  year: number;
  /** Whether this is the active/current event */
  isActive: boolean;
}

// ============================================================================
// 8. CONCLAVE EVENT (MMC - Mission Mediation Conclave)
// ============================================================================

export interface ConclaveGuest {
  name: string;
  title: string;
  image: string;
}

export interface ConclaveHighlight {
  url: string;
  title?: string;
  description?: string;
}

export interface ConclaveCoverage {
  source: string;
  headline: string;
  link: string;
}

export interface ConclaveEvent extends BaseDocument {
  year: number;
  isActive: boolean;
  guestsOfHonour: ConclaveGuest[];
  highlights: ConclaveHighlight[];
  coverage: ConclaveCoverage[];
}

// ============================================================================
// 9. NATIONAL IMPACT AWARDS (NIAAM)
// ============================================================================

export interface AwardRecipient {
  name: string;
  city: string;
  category: string;
  year: string;
}

export interface NationalImpactAward extends BaseDocument {
  year: number;
  isActive: boolean;
  recipients: AwardRecipient[];
  gallery: ConclaveHighlight[];
}

// ============================================================================
// 10. MEDIATION CONTENT
// ============================================================================

export interface MediationCaseStudy extends BaseDocument {
  title: string;
  image: string;
  summary: string;
  challenge: string[];
  solution: string;
  costs: {
    hours: number;
    weeks: number;
    fees: string;
    value: string;
  };
  iconName: string;
  order: number;
  isActive: boolean;
}

export interface MediationWhyPoint extends BaseDocument {
  title: string;
  description: string;
  iconName: string;
  order: number;
  isActive: boolean;
}

export interface MediationResolutionStep extends BaseDocument {
  title: string;
  label: string;
  description: string;
  iconName: string;
  order: number;
  isActive: boolean;
}

export interface MediationRule extends BaseDocument {
  title: string;
  description: string;
  order: number;
  isActive: boolean;
}

export interface MediationFee extends BaseDocument {
  title: string;
  price: string;
  description: string;
  order: number;
  isActive: boolean;
}

// ============================================================================
// 11. ACADEMY CONTENT
// ============================================================================

/** Academy program types */
export type AcademyProgram = "mediation" | "arbitration" | "negotiation";

/** Academy course type (foundational or advanced) */
export type AcademyCourseType = "foundational" | "advanced";

/** Academy course metadata */
export interface AcademyCourse extends BaseDocument {
  /** Which program this course belongs to */
  program: AcademyProgram;
  /** Course type */
  courseType: AcademyCourseType;
  /** Course title */
  title: string;
  /** Course subtitle/short description */
  subtitle: string;
  /** Course mode (e.g., "Online (20 Videos)") */
  mode: string;
  /** Live session info */
  liveSession: string;
  /** Assessment type */
  assessment: string;
  /** Certification info */
  certification: string;
  /** Course fee amount (number) */
  feeAmount: number;
  /** Fee currency (e.g., "INR") */
  feeCurrency: string;
  /** Additional fee note (e.g., "+ GST") */
  feeNote: string;
  /** CTA button text */
  ctaText: string;
  /** CTA button link */
  ctaLink: string;
  /** Key benefits list (for display) */
  benefits: string[];
  /** Enrollment status text */
  enrollmentStatus: string;
  /** Display order */
  order: number;
  /** Whether this course is visible */
  isActive: boolean;
}

/** Academy training module (curriculum item) */
export interface AcademyModule extends BaseDocument {
  /** Which program this module belongs to */
  program: AcademyProgram;
  /** Which course type this module belongs to */
  courseType: AcademyCourseType;
  /** Module number (for display, e.g., 1, 2, 3) */
  moduleNumber: number;
  /** Module title */
  title: string;
  /** Module content/description */
  content: string;
  /** Display order */
  order: number;
  /** Whether this module is visible */
  isActive: boolean;
}

/** Academy faculty member */
export interface AcademyFaculty extends BaseDocument {
  /** Which program(s) this faculty belongs to */
  programs: AcademyProgram[];
  /** Which course type(s) this faculty teaches */
  courseTypes: AcademyCourseType[];
  /** Faculty name */
  name: string;
  /** Role/title */
  role: string;
  /** Profile image URL */
  image: string;
  /** Bio/description */
  bio?: string;
  /** LinkedIn or profile URL */
  profileUrl?: string;
  /** Display order */
  order: number;
  /** Whether this faculty is visible */
  isActive: boolean;
}

/** Academy strategic partner/collaborator */
export interface AcademyPartner extends BaseDocument {
  /** Which program(s) this partner belongs to */
  programs: AcademyProgram[];
  /** Partner name */
  name: string;
  /** Logo URL */
  logo: string;
  /** Description/tagline */
  description?: string;
  /** Website URL */
  websiteUrl?: string;
  /** Display order */
  order: number;
  /** Whether this partner is visible */
  isActive: boolean;
}

/** Academy page hero/intro settings */
export interface AcademyPageSettings extends BaseDocument {
  /** Which program this settings is for */
  program: AcademyProgram;
  /** Hero title */
  heroTitle: string;
  /** Hero subtitle/breadcrumb text */
  heroSubtitle: string;
  /** Hero description */
  heroDescription: string;
  /** Hero background image URL */
  heroImage: string;
  /** Contact email */
  contactEmail: string;
  /** Corporate training section title */
  trainingTitle: string;
  /** Corporate training description */
  trainingDescription: string;
  /** Corporate training image URL */
  trainingImage: string;
  /** Training features list */
  trainingFeatures: { title: string; description?: string }[];
  isActive: boolean;
}

// ============================================================================
// 12. ECOSYSTEM CONTENT
// ============================================================================

/** Ecosystem content categories for partners */
export type EcosystemPartnerCategory = 
  | "strategic" 
  | "practice" 
  | "academic" 
  | "legal" 
  | "mission" 
  | "supporter";

/** Ecosystem content categories for team members */
export type EcosystemTeamCategory = 
  | "managing-partner" 
  | "mentor" 
  | "expert" 
  | "staff" 
  | "extern";

/** Ecosystem Award (Recognition, Accolades & Awards) */
export interface EcosystemAward extends BaseDocument {
  /** Name of the person or entity awarded */
  recipientName: string;
  /** Title of the award */
  awardTitle: string;
  /** Detailed description/citation */
  description: string;
  /** Featured image */
  image: string;
  /** Display order */
  order: number;
  /** Whether this award is visible */
  isActive: boolean;
}

/** Ecosystem Partner (Collaborations) */
export interface EcosystemPartner extends BaseDocument {
  /** Partner name */
  name: string;
  /** Partner category for grouping */
  category: EcosystemPartnerCategory;
  /** Logo image URL */
  logo: string;
  /** Region or location (optional) */
  region?: string;
  /** Description or partnership details */
  description?: string;
  /** Website URL (optional) */
  websiteUrl?: string;
  /** Display order */
  order: number;
  /** Whether this partner is visible */
  isActive: boolean;
}

/** Ecosystem Team Member */
export interface EcosystemTeamMember extends BaseDocument {
  /** Full name */
  name: string;
  /** Job title/role */
  role: string;
  /** Category for grouping */
  category: EcosystemTeamCategory;
  /** Profile photo URL */
  image: string;
  /** Detailed bio/description */
  bio?: string;
  /** Niche/Expertise (for Featured Experts) */
  niche?: string;
  /** LinkedIn or profile URL */
  profileUrl?: string;
  /** Email (optional) */
  email?: string;
  /** Display order */
  order: number;
  /** Whether this member is visible */
  isActive: boolean;
}


// ============================================================================
// 13. RESOURCES CONTENT
// ============================================================================

export type ResourceType = 
  | "blog" 
  | "publication" 
  | "video" 
  | "book" 
  | "news" 
  | "podcast" 
  | "journal" 
  | "toolkit"
  | "simplified"; // For Mediation Simplified workbook

export interface ResourceItem extends BaseDocument {
  /** Type of resource */
  type: ResourceType;
  /** Main title */
  title: string;
  /** Subtitle (author, speaker, publication name, etc.) */
  subtitle?: string;
  /** Description or summary */
  description?: string;
  /** Cover image or thumbnail */
  image?: string;
  /** URL to the content (PDF, Link, Video) */
  url?: string;
  /** Specific author name (if separate from subtitle) */
  author?: string;
  /** Publication Name */
  publication?: string;
  /** Publication date */
  date?: string; // string for display flexibility
  /** Category or niche (optional) */
  category?: string;
  /** Display order */
  order: number;
  /** Whether this item is visible */
  isActive: boolean;
  /** Whether highlighted/featured */
  isFeatured?: boolean;
}

// ============================================================================
// COLLECTION NAMES
// ============================================================================

export const COLLECTIONS = {
  HERO_SLIDES: "heroSlides",
  NEWS: "news",
  PANEL_MEMBERS: "panelMembers",
  PARTNERS: "partners",
  FOOTER_SETTINGS: "footerSettings",
  GLOBAL_SETTINGS: "globalSettings",
  MCI_EVENTS: "mciEvents",
  NATIONAL_IMPACT_AWARDS: "nationalImpactAwards",
  CONCLAVE_EVENTS: "conclaveEvents",
  ADVOCATE_MAXIMUS_EVENTS: "advocateMaximusEvents",
  GENERAL_EVENTS: "generalEvents",
  MEDIATION_CASE_STUDIES: "mediationCaseStudies",
  MEDIATION_WHY_POINTS: "mediationWhyPoints",
  MEDIATION_RESOLUTION_STEPS: "mediationResolutionSteps",
  MEDIATION_RULES: "mediationRules",
  MEDIATION_FEES: "mediationFees",
  // Academy collections
  ACADEMY_COURSES: "academyCourses",
  ACADEMY_MODULES: "academyModules",
  ACADEMY_FACULTY: "academyFaculty",
  ACADEMY_PARTNERS: "academyPartners",
  ACADEMY_PAGE_SETTINGS: "academyPageSettings",
  // Ecosystem collections
  ECOSYSTEM_AWARDS: "ecosystemAwards",
  ECOSYSTEM_PARTNERS: "ecosystemPartners",
  ECOSYSTEM_TEAM: "ecosystemTeam",
  // Resources collections
  RESOURCES: "resources",
} as const;

export type CollectionName = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];
