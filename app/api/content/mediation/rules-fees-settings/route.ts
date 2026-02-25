import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS, type RulesFeesSettings } from "@/lib/db/schemas";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
  try {
    const db = await getDb();
    const collection = db.collection<RulesFeesSettings>(COLLECTIONS.MEDIATION_RULES_FEES_SETTINGS);
    
    let settings = await collection.findOne({ isActive: true }) as any;
    
    if (!settings) {
      // Create default settings if not found
      const defaultSettings: Omit<RulesFeesSettings, "_id"> = {
        rulesPdfUrl: "",
        feesPdfUrl: "",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const result = await collection.insertOne(defaultSettings as RulesFeesSettings);
      settings = { _id: result.insertedId, ...defaultSettings };
    }
    
    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    console.error("Error fetching rules-fees settings:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { _id, ...updateData } = body;
    
    const db = await getDb();
    const collection = db.collection<RulesFeesSettings>(COLLECTIONS.MEDIATION_RULES_FEES_SETTINGS);
    
    await collection.updateOne(
      { isActive: true },
      { 
        $set: { 
          ...updateData, 
          updatedAt: new Date() 
        } 
      },
      { upsert: true }
    );
    
    revalidatePath("/mediation/rules-fees");
    revalidatePath("/admin/mediation/rules-fees");
    
    return NextResponse.json({ success: true, message: "Settings updated successfully" });
  } catch (error) {
    console.error("Error updating rules-fees settings:", error);
    return NextResponse.json({ success: false, error: "Failed to update settings" }, { status: 500 });
  }
}
