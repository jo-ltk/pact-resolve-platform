import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Navbar } from "@/components/navbar"
import { WhatsAppButton } from "@/components/whatsapp-button"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

import { getDb } from "@/lib/mongodb";
import { COLLECTIONS, type GlobalSettings } from "@/lib/db/schemas";

export async function generateMetadata(): Promise<Metadata> {
  const defaultMeta = {
    title: "PACT | Professional Mediation Platform for Dispute Resolution",
    description: "PACT is a neutral, professional mediation platform helping individuals, businesses, and institutions resolve conflicts faster, fairly, and confidentially.",
    keywords: "mediation, dispute resolution, conflict resolution, business mediation, family mediation, workplace mediation",
    favicon: "/images/pact-logo.png"
  };

  try {
    const db = await getDb();
    const settings = await db.collection<GlobalSettings>(COLLECTIONS.GLOBAL_SETTINGS).findOne({});
    
    if (!settings) return {
      title: defaultMeta.title,
      description: defaultMeta.description,
      keywords: defaultMeta.keywords,
      icons: { icon: defaultMeta.favicon, apple: defaultMeta.favicon },
    };

    const title = settings.seo?.title || defaultMeta.title;
    const description = settings.seo?.description || defaultMeta.description;
    const keywords = settings.seo?.keywords?.join(", ") || defaultMeta.keywords;
    const favicon = settings.favicon?.url || settings.logo?.url || defaultMeta.favicon;

    return {
      title,
      description,
      keywords,
      icons: {
        icon: favicon,
        apple: favicon,
      },
      openGraph: {
        title: title,
        description: description,
        url: "https://thepact.in",
        type: "website",
        images: settings.seo?.ogImage?.url ? [{ url: settings.seo.ogImage.url }] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: title,
        description: description,
      },
    };
  } catch (error) {
    return {
      title: defaultMeta.title,
      description: defaultMeta.description,
      icons: { icon: defaultMeta.favicon, apple: defaultMeta.favicon },
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#1e3a5f" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className={`font-sans antialiased text-foreground bg-background`}>
        <Navbar />
        {children}
        <WhatsAppButton floating />
        <Analytics />
      </body>
    </html>
  )
}
