import { z } from "zod";

export const globalSettingsSchema = z.object({
  siteName: z.string().min(1).optional(),
  siteDescription: z.string().optional(),
  contactEmail: z.string().email().optional(),
  socialLinks: z.object({
    facebook: z.string().url().optional(),
    twitter: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    instagram: z.string().url().optional(),
  }).optional(),
  footerText: z.string().optional(),
});

export const contentSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  body: z.string(),
  excerpt: z.string().optional(),
  status: z.enum(["draft", "published", "archived"]),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  featuredImage: z.string().optional(),
  metadata: z.record(z.any()).optional(),
});

export const auditLogSchema = z.object({
  userId: z.string(),
  action: z.string(),
  resource: z.string(),
  resourceId: z.string().optional(),
  details: z.record(z.any()).optional(),
  timestamp: z.date().default(() => new Date()),
});
