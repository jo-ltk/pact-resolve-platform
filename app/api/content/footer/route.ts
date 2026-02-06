import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS, type FooterSettings } from "@/lib/db/schemas";

/**
 * GET /api/content/footer
 * Fetch footer settings (singleton document)
 */
export async function GET() {
  try {
    const db = await getDb();
    const collection = db.collection<FooterSettings>(COLLECTIONS.FOOTER_SETTINGS);
    
    // Footer settings is a singleton - get the first (and only) document
    const settings = await collection.findOne({});
    
    if (!settings) {
      return NextResponse.json(
        { success: false, error: "Footer settings not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      data: settings 
    });
  } catch (error) {
    console.error("Error fetching footer settings:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch footer settings" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/content/footer
 * Update footer settings (Admin only)
 * This uses upsert to create if not exists
 */
export async function PUT(request: NextRequest) {
  try {
    // TODO: Add authentication middleware
    const body = await request.json();
    
    const db = await getDb();
    const collection = db.collection<FooterSettings>(COLLECTIONS.FOOTER_SETTINGS);
    
    // Upsert the singleton document (update if exists, create if not)
    const result = await collection.updateOne(
      {}, // Empty filter matches any document (we only have one)
      { 
        $set: { 
          ...body, 
          updatedAt: new Date() 
        },
        $setOnInsert: {
          createdAt: new Date()
        }
      },
      { upsert: true }
    );
    
    return NextResponse.json({ 
      success: true, 
      message: "Footer settings updated successfully",
      upserted: result.upsertedCount > 0
    });
  } catch (error) {
    console.error("Error updating footer settings:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update footer settings" },
      { status: 500 }
    );
  }
}
