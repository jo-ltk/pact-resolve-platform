/**
 * Data Fetching Utilities for Phase 1 Content
 * 
 * These functions fetch data from the API endpoints.
 * They can be used in Server Components (recommended) or Client Components.
 */

import type {
  HeroSlide,
  NewsItem,
  PanelMember,
  Partner,
  FooterSettings,
  GlobalSettings,
  MCIEvent,
} from "@/lib/db/schemas";

// Base URL for API calls (works in both server and client)
const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // Client-side
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  return "http://localhost:3000"; // Default for development
};

/**
 * Generic fetch wrapper with error handling
 */
async function fetchData<T>(endpoint: string): Promise<T | null> {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}${endpoint}`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds (ISR)
    });

    if (!response.ok) {
      console.error(`Failed to fetch ${endpoint}: ${response.status}`);
      return null;
    }

    const data = await response.json();
    
    if (!data.success) {
      console.error(`API error for ${endpoint}:`, data.error);
      return null;
    }

    return data.data as T;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return null;
  }
}

// ============================================================================
// HERO SLIDES
// ============================================================================

export async function getHeroSlides(): Promise<HeroSlide[]> {
  const data = await fetchData<HeroSlide[]>("/api/content/hero-slides");
  return data || [];
}

// ============================================================================
// NEWS ITEMS
// ============================================================================

export interface NewsQueryOptions {
  featured?: boolean;
  limit?: number;
}

export async function getNews(options?: NewsQueryOptions): Promise<NewsItem[]> {
  const params = new URLSearchParams();
  if (options?.featured) params.set("featured", "true");
  if (options?.limit) params.set("limit", options.limit.toString());
  
  const queryString = params.toString();
  const endpoint = `/api/content/news${queryString ? `?${queryString}` : ""}`;
  
  const data = await fetchData<NewsItem[]>(endpoint);
  return data || [];
}

// ============================================================================
// PANEL MEMBERS
// ============================================================================

export async function getPanelMembers(): Promise<PanelMember[]> {
  const data = await fetchData<PanelMember[]>("/api/content/panel-members");
  return data || [];
}

// ============================================================================
// PARTNERS
// ============================================================================

export type PartnerCategory = "strategic" | "collaborator" | "supporter" | "sponsor";

export async function getPartners(category?: PartnerCategory): Promise<Partner[]> {
  const endpoint = category 
    ? `/api/content/partners?category=${category}` 
    : "/api/content/partners";
  
  const data = await fetchData<Partner[]>(endpoint);
  return data || [];
}

// ============================================================================
// FOOTER SETTINGS
// ============================================================================

export async function getFooterSettings(): Promise<FooterSettings | null> {
  return fetchData<FooterSettings>("/api/content/footer");
}

// ============================================================================
// GLOBAL SETTINGS
// ============================================================================

export async function getGlobalSettings(): Promise<GlobalSettings | null> {
  return fetchData<GlobalSettings>("/api/content/global-settings");
}

// ============================================================================
// MCI EVENT
// ============================================================================

export async function getMCIEvent(year?: number): Promise<MCIEvent | null> {
  const endpoint = year 
    ? `/api/content/mci-event?year=${year}` 
    : "/api/content/mci-event";
  
  return fetchData<MCIEvent>(endpoint);
}
