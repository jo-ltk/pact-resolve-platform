import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS, type PodcastSettings } from "@/lib/db/schemas";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';

function revalidatePodcast() {
  revalidatePath('/resources/podcast', 'page');
  revalidatePath('/admin/resources/podcast', 'page');
}

export async function GET(request: NextRequest) {
  try {
    const db = await getDb();
    const collection = db.collection<PodcastSettings>(COLLECTIONS.PODCAST_SETTINGS);
    
    // There should only be one settings document
    let settings = await collection.findOne({ isActive: true });
    
    if (!settings) {
      const defaultSettings: PodcastSettings = {
        currentSeason: "Season 2",
        seasons: ["Season 1", "Season 2"],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      await collection.insertOne(defaultSettings);
      settings = await collection.findOne({ isActive: true });
    }
    
    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    console.error("Error fetching podcast settings:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const db = await getDb();
    const collection = db.collection<PodcastSettings>(COLLECTIONS.PODCAST_SETTINGS);
    
    const { _id, createdAt, updatedAt, ...settingsData } = body;
    
    // We update the existing active document or insert if none
    await collection.updateOne(
      { isActive: true },
      { 
        $set: { ...settingsData, updatedAt: new Date() },
        $setOnInsert: { createdAt: new Date() }
      },
      { upsert: true }
    );

    const updatedSettings = await collection.findOne({ isActive: true });
    
    revalidatePodcast();
    
    return NextResponse.json({ success: true, data: updatedSettings, message: "Settings updated successfully" });
  } catch (error: any) {
    console.error("Error updating podcast settings:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to update settings" }, { status: 500 });
  }
}
