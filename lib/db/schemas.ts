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
} as const;

export type CollectionName = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];
