# Phase 1 Backend System - Documentation

## Overview

This document outlines the Phase 1 backend implementation for the PACT Mediation website. The system enables admin-controlled content editing for critical sections while maintaining a clean separation between phases.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend                              │
│  (Server Components fetch from API → Render Content)         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     API Routes                               │
│  /api/content/hero-slides                                    │
│  /api/content/news                                           │
│  /api/content/panel-members                                  │
│  /api/content/partners                                       │
│  /api/content/footer                                         │
│  /api/content/global-settings                                │
│  /api/content/mci-event                                      │
│  /api/upload (Cloudinary)                                    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     MongoDB Atlas                            │
│  Collections: heroSlides, news, panelMembers,               │
│              partners, footerSettings, globalSettings,       │
│              mciEvents                                       │
└─────────────────────────────────────────────────────────────┘
```

## Phase 1 Collections

### 1. Hero Slides (`heroSlides`)

Homepage hero carousel slides with images, titles, and CTAs.

| Field       | Type      | Description                |
| ----------- | --------- | -------------------------- |
| order       | number    | Display order (1, 2, 3...) |
| title       | string[]  | Title lines for formatting |
| description | string    | Slide description          |
| buttonLabel | string    | CTA button text            |
| link        | string    | Button link URL            |
| rightSlogan | string    | Desktop slogan text        |
| image       | ImageData | Background image           |
| isActive    | boolean   | Visibility flag            |

### 2. News Items (`news`)

News section with articles, podcasts, blogs, and books.

| Field      | Type      | Description                                                    |
| ---------- | --------- | -------------------------------------------------------------- |
| type       | NewsType  | "Podcast", "Article", "Blog", "Book", "Press Release", "Event" |
| title      | string    | News title                                                     |
| date       | string    | Publication date                                               |
| image      | ImageData | Featured image                                                 |
| link       | string    | External link                                                  |
| order      | number    | Display order                                                  |
| isActive   | boolean   | Visibility flag                                                |
| isFeatured | boolean   | Featured flag                                                  |

### 3. Panel Members (`panelMembers`)

Team members for the "Panel of Neutrals" section.

| Field      | Type      | Description          |
| ---------- | --------- | -------------------- |
| name       | string    | Full name            |
| role       | string    | Job title/role       |
| image      | ImageData | Profile photo        |
| bio        | string?   | Optional biography   |
| profileUrl | string?   | LinkedIn/profile URL |
| order      | number    | Display order        |
| isActive   | boolean   | Visibility flag      |

### 4. Partners (`partners`)

Strategic partners, collaborators, supporters, and sponsors.

| Field      | Type      | Description                                         |
| ---------- | --------- | --------------------------------------------------- |
| name       | string    | Organization name                                   |
| logo       | ImageData | Logo image                                          |
| websiteUrl | string?   | Website URL                                         |
| category   | string    | "strategic", "collaborator", "supporter", "sponsor" |
| order      | number    | Display order                                       |
| isActive   | boolean   | Visibility flag                                     |

### 5. Footer Settings (`footerSettings`) - Singleton

Footer configuration including social links and quick links.

| Field         | Type              | Description               |
| ------------- | ----------------- | ------------------------- |
| tagline       | string            | Company tagline           |
| socialLinks   | SocialLink[]      | Social media links        |
| quickLinks    | FooterQuickLink[] | Navigation links          |
| newsletter    | object            | Newsletter section config |
| copyrightText | string            | Copyright text            |

### 6. Global Settings (`globalSettings`) - Singleton

Site-wide settings like contact information.

| Field          | Type            | Description                 |
| -------------- | --------------- | --------------------------- |
| email          | string          | Primary email               |
| whatsapp       | string          | WhatsApp number             |
| contactPersons | ContactPerson[] | Contact persons with phones |
| address        | string          | Postal address              |
| companyName    | string          | Company name                |
| logo           | ImageData?      | Company logo                |

### 7. MCI Events (`mciEvents`)

Mediation Championship India event data.

Complex schema with champions, past editions, gallery, media coverage, rewards, and more. See `lib/db/schemas.ts` for full details.

## API Endpoints

### Public (Read-Only)

- `GET /api/content/hero-slides` - Get all active slides
- `GET /api/content/news` - Get news items (supports `?featured=true&limit=N`)
- `GET /api/content/panel-members` - Get all active members
- `GET /api/content/partners` - Get partners (supports `?category=strategic`)
- `GET /api/content/footer` - Get footer settings
- `GET /api/content/global-settings` - Get global settings
- `GET /api/content/mci-event` - Get active MCI event (supports `?year=2026`)

### Admin (Requires Authentication)

> ⚠️ Authentication middleware to be added in Phase 2

- `POST /api/content/{collection}` - Create new item
- `PUT /api/content/{collection}` - Update existing item
- `DELETE /api/content/{collection}?id={id}` - Delete item

### Image Upload

- `POST /api/upload` - Upload image to Cloudinary
- `DELETE /api/upload?publicId={id}` - Delete image from Cloudinary

## Setup Instructions

### 1. Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in:

```env
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/pact_mediation
MONGODB_DB_NAME=pact_mediation

CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 2. Install Dependencies

```bash
npm install mongodb
```

### 3. Seed Database

Run the seeding script to populate initial data:

```bash
npx tsx scripts/seed-database.ts
```

### 4. Update Frontend Components

Replace hardcoded data in components with API calls:

```tsx
// Before (hardcoded)
const slides = [...]; // hardcoded array

// After (from API)
import { getHeroSlides } from "@/lib/api/content";

export async function HeroCarousel() {
  const slides = await getHeroSlides();
  // ...render slides
}
```

## File Structure

```
lib/
├── mongodb.ts              # MongoDB connection utility
├── db/
│   ├── schemas.ts          # TypeScript interfaces for all collections
│   └── seed-data.ts        # Initial seed data from existing content
└── api/
    └── content.ts          # Frontend data fetching utilities

app/api/
├── content/
│   ├── hero-slides/route.ts
│   ├── news/route.ts
│   ├── panel-members/route.ts
│   ├── partners/route.ts
│   ├── footer/route.ts
│   ├── global-settings/route.ts
│   └── mci-event/route.ts
└── upload/
    └── route.ts            # Cloudinary image upload

scripts/
└── seed-database.ts        # Database seeding script
```

## Security Considerations

1. **API Protection**: Admin endpoints (POST, PUT, DELETE) need authentication middleware (Phase 2)
2. **Environment Variables**: Never commit `.env.local` - use `.env.example` as template
3. **Image Uploads**: Cloudinary API secret is server-side only
4. **MongoDB Connection**: Uses connection pooling for efficiency

## Phase Roadmap

### Phase 1 ✅ (Current)

- [x] MongoDB schemas
- [x] CRUD API routes
- [x] Image upload support
- [x] Data fetching utilities
- [x] Seed data from existing content

### Phase 2 (Next)

- [ ] Admin authentication
- [ ] Basic admin UI for editing
- [ ] About PACT stats
- [ ] Why PACT features
- [ ] Testimonials
- [ ] Academy programs

### Phase 3 (Future)

- [ ] Resources section
- [ ] Ecosystem pages
- [ ] Why Mediate content
- [ ] Network logos

## Usage Examples

### Fetching Data in Server Components

```tsx
// app/page.tsx
import { getHeroSlides, getNews, getPanelMembers } from "@/lib/api/content";

export default async function Home() {
  const [slides, news, members] = await Promise.all([
    getHeroSlides(),
    getNews({ limit: 6 }),
    getPanelMembers(),
  ]);

  return (
    <main>
      <HeroCarousel slides={slides} />
      <NewsSection items={news} />
      <PanelNeutrals members={members} />
    </main>
  );
}
```

### Image Upload

```tsx
async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/upload?folder=hero", {
    method: "POST",
    body: formData,
  });

  const result = await response.json();
  return result.data.url; // Cloudinary URL
}
```
