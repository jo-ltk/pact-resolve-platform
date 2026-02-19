import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS, type Testimonial } from "@/lib/db/schemas";
import { revalidatePath } from "next/cache";

const SIMPLIFIED_DEFAULTS: Partial<Testimonial>[] = [
  {
    name: "Justice Kurian Joseph",
    title: "Former Judge",
    company: "Supreme Court of India",
    quote: "An exceptional resource that bridges theory and practice in mediation. Highly recommended for anyone seeking to understand the nuances of conflict resolution.",
    rating: 5,
    profileImage: { url: "/assets/img/testimonials/justice-kurian.png", alt: "Justice Kurian Joseph" },
    image: { url: "/assets/img/testimonials/corporate-boardroom.png", alt: "Mediation" },
    page: "simplified",
    order: 1,
    isActive: true,
  },
  {
    name: "Dr. Sriram Panchu",
    title: "Senior Advocate & Mediator",
    company: "Senior Advocate",
    quote: "Jonathan Rodrigues has created a masterpiece that demystifies mediation for the Indian context. The workbook format is innovative and engaging.",
    rating: 5,
    profileImage: { url: "/assets/img/testimonials/sriram-panchu.png", alt: "Dr. Sriram Panchu" },
    image: { url: "/assets/img/testimonials/arbitration-chamber.png", alt: "Mediation" },
    page: "simplified",
    order: 2,
    isActive: true,
  },
  {
    name: "Prof. Nadja Alexander",
    title: "Professor",
    company: "Singapore Management University",
    quote: "A groundbreaking contribution to mediation literature in Asia. The interactive elements make learning accessible and practical.",
    rating: 5,
    profileImage: { url: "/assets/img/testimonials/nadja-alexander.png", alt: "Prof. Nadja Alexander" },
    image: { url: "/assets/img/testimonials/corporate-boardroom.png", alt: "Mediation" },
    page: "simplified",
    order: 3,
    isActive: true,
  },
];

export async function POST(request: NextRequest) {
  try {
    const db = await getDb();
    const collection = db.collection<Testimonial>(COLLECTIONS.TESTIMONIALS);

    // Only seed if no 'simplified' testimonials exist, or if forced
    const { searchParams } = new URL(request.url);
    const force = searchParams.get("force") === "true";

    if (!force) {
      const count = await collection.countDocuments({ page: "simplified" });
      if (count > 0) {
        return NextResponse.json({ 
          success: false, 
          error: "Simplified testimonials already seeded. Use ?force=true to overwrite." 
        });
      }
    } else {
      // Clear existing simplified ones if force
      await collection.deleteMany({ page: "simplified" });
    }

    const now = new Date();
    const itemsToInsert = SIMPLIFIED_DEFAULTS.map(item => ({
      ...item,
      createdAt: now,
      updatedAt: now,
    })) as Testimonial[];

    await collection.insertMany(itemsToInsert);

    revalidatePath("/resources/mediation-simplified");
    revalidatePath("/admin/resources/simplified");

    return NextResponse.json({ 
      success: true, 
      message: "Testimonials seeded successfully", 
      count: itemsToInsert.length 
    });
  } catch (error) {
    console.error("Testimonials seed error:", error);
    return NextResponse.json({ success: false, error: "Failed to seed testimonials" }, { status: 500 });
  }
}
