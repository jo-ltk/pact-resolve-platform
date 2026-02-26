import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS, type WorkbookGalleryImage } from "@/lib/db/schemas";
import { revalidatePath } from "next/cache";

const GALLERY_DEFAULTS: Partial<WorkbookGalleryImage>[] = [
  {
    image: { url: "/assets/img/testimonials/corporate-boardroom.png", alt: "Workbook in action at a conference" },
    title: "Global Mediation Conference",
    caption: "Workbook in action at a global conference in Mumbai",
    order: 1,
    isActive: true,
  },
  {
    image: { url: "/assets/img/testimonials/arbitration-chamber.png", alt: "Practicing mediation techniques" },
    title: "Case Study Workshop",
    caption: "Practicing techniques from the Mediation Simplified workbook",
    order: 2,
    isActive: true,
  },
  {
    image: { url: "/assets/img/testimonials/corporate-boardroom.png", alt: "Workbook display" },
    title: "Corporate Training",
    caption: "Strategic resolution exercises with board members",
    order: 3,
    isActive: true,
  }
];

export async function POST(request: NextRequest) {
  try {
    const db = await getDb();
    const collection = db.collection<WorkbookGalleryImage>(COLLECTIONS.WORKBOOK_GALLERY);

    const { searchParams } = new URL(request.url);
    const force = searchParams.get("force") === "true";

    if (!force) {
      const count = await collection.countDocuments();
      if (count > 0) {
        return NextResponse.json({ 
          success: false, 
          error: "Gallery already seeded. Use ?force=true to overwrite." 
        });
      }
    } else {
      await collection.deleteMany({});
    }

    const now = new Date();
    const itemsToInsert = GALLERY_DEFAULTS.map(item => ({
      ...item,
      createdAt: now,
      updatedAt: now,
    })) as WorkbookGalleryImage[];

    await collection.insertMany(itemsToInsert);

    revalidatePath("/resources/mediation-simplified");
    revalidatePath("/admin/resources/simplified");

    return NextResponse.json({ 
      success: true, 
      message: "Gallery seeded successfully", 
      count: itemsToInsert.length 
    });
  } catch (error) {
    console.error("Gallery seed error:", error);
    return NextResponse.json({ success: false, error: "Failed to seed gallery" }, { status: 500 });
  }
}
