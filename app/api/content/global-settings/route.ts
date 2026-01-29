import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS, type GlobalSettings } from "@/lib/db/schemas";
import { globalSettingsSchema } from "@/lib/validation/schemas";
import { AuditRepository } from "@/lib/db/repositories/audit-repository";

/**
 * GET /api/content/global-settings
 * Fetch global settings
 */
export async function GET(request: NextRequest) {
  try {
    const db = await getDb();
    const collection = db.collection<GlobalSettings>(COLLECTIONS.GLOBAL_SETTINGS);
    
    const settings = await collection.findOne({});
    
    if (!settings) {
      return NextResponse.json(
        { success: false, error: "Global settings not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      data: settings 
    });
  } catch (error) {
    console.error("Error fetching global settings:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch global settings" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/content/global-settings
 * Update global settings (Admin only - enforced by middleware)
 */
export async function PUT(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    const role = request.headers.get("x-user-role");
    
    const body = await request.json();
    
    // 1. Validation
    const validation = globalSettingsSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: validation.error.format() },
        { status: 400 }
      );
    }

    const db = await getDb();
    const collection = db.collection<GlobalSettings>(COLLECTIONS.GLOBAL_SETTINGS);
    
    // 2. Database Update
    const result = await collection.updateOne(
      {}, 
      { 
        $set: { 
          ...validation.data, 
          updatedAt: new Date() 
        },
        $setOnInsert: {
          createdAt: new Date()
        }
      },
      { upsert: true }
    );
    
    // 3. Audit Logging (Async, no await to prevent latency)
    if (userId) {
      AuditRepository.log({
        userId,
        action: "UPDATE_GLOBAL_SETTINGS",
        resource: "global_settings",
        details: { changes: validation.data }
      });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "Global settings updated successfully",
    });
  } catch (error) {
    console.error("Error updating global settings:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update global settings" },
      { status: 500 }
    );
  }
}
