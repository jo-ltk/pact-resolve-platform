import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS, type NmrContent } from "@/lib/db/schemas";
import { revalidatePath } from "next/cache";

const NMR_DEFAULTS: Partial<NmrContent>[] = [
  {
    label: "Inaugural Edition Theme",
    value: "Coming Soon",
    order: 1,
    isActive: true,
  },
  {
    label: "Editors",
    value: "Coming Soon",
    order: 2,
    isActive: true,
  },
  {
    label: "Institutional Partners",
    value: "Coming Soon",
    order: 3,
    isActive: true,
  },
];

export async function POST(request: NextRequest) {
  try {
    const db = await getDb();
    const collection = db.collection<NmrContent>(COLLECTIONS.NMR_CONTENT);

    const { searchParams } = new URL(request.url);
    const force = searchParams.get("force") === "true";

    if (!force) {
      const count = await collection.countDocuments({});
      if (count > 0) {
        return NextResponse.json({ 
          success: false, 
          error: "NMR content already seeded. Use ?force=true to overwrite." 
        });
      }
    } else {
      await collection.deleteMany({});
    }

    const now = new Date();
    const itemsToInsert = NMR_DEFAULTS.map(item => ({
      ...item,
      createdAt: now,
      updatedAt: now,
    })) as NmrContent[];

    await collection.insertMany(itemsToInsert);
    revalidatePath("/resources/national-mediation-review");

    return NextResponse.json({ 
      success: true, 
      message: "NMR content seeded successfully", 
      count: itemsToInsert.length 
    });
  } catch (error) {
    console.error("NMR seed error:", error);
    return NextResponse.json({ success: false, error: "Failed to seed" }, { status: 500 });
  }
}
