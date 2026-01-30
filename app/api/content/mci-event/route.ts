import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS, type MCIEvent } from "@/lib/db/schemas";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

/**
 * GET /api/content/mci-event
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get("year");
    const all = searchParams.get("all");
    const id = searchParams.get("id");
    
    const db = await getDb();
    const collection = db.collection<MCIEvent>(COLLECTIONS.MCI_EVENTS);
    
    if (id) {
      const event = await collection.findOne({ _id: new ObjectId(id) });
      if (!event) return NextResponse.json({ success: false, error: "MCI event not found" }, { status: 404 });
      return NextResponse.json({ success: true, data: event });
    }
    
    if (all === "true") {
      const events = await collection.find({}).sort({ year: -1 }).toArray();
      return NextResponse.json({ success: true, data: events });
    }
    
    if (year) {
      const event = await collection.findOne({ year: parseInt(year, 10) });
      if (!event) return NextResponse.json({ success: false, error: "MCI event not found" }, { status: 404 });
      return NextResponse.json({ success: true, data: event });
    }
    
    const event = await collection.findOne({ isActive: true });
    if (!event) return NextResponse.json({ success: true, data: [] });
    return NextResponse.json({ success: true, data: event });
  } catch (error: any) {
    let errorMessage = error.message || "Failed to fetch MCI event";
    if (error.message?.includes('alert number 80')) {
      errorMessage = "Database connection denied. Your IP might not be whitelisted in MongoDB Atlas.";
    }
    console.error("Error fetching MCI event:", errorMessage);
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

/**
 * POST /api/content/mci-event
 */
export async function POST(request: NextRequest) {
  const routeStart = Date.now();
  console.log(`[API] POST /api/content/mci-event - START`);
  try {
    const body = await request.json();
    console.log(`[API] Body parsed. Size: ${JSON.stringify(body).length} chars`);
    
    const db = await getDb();
    const collection = db.collection<MCIEvent>(COLLECTIONS.MCI_EVENTS);
    
    if (body.isActive) {
      await collection.updateMany({ isActive: true }, { $set: { isActive: false } });
    }
    
    const newEvent: Omit<MCIEvent, "_id"> = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await collection.insertOne(newEvent as MCIEvent);
    console.log(`[API] POST success in ${Date.now() - routeStart}ms`);
    
    // Purge cache for the event page
    revalidatePath("/events/mci");
    revalidatePath("/admin/events/mci");
    
    return NextResponse.json({ 
      success: true, 
      data: { _id: result.insertedId, ...newEvent }
    }, { status: 201 });
  } catch (error: any) {
    let errorMessage = error.message || "Failed to create MCI event";
    if (error.message?.includes('alert number 80')) {
      errorMessage = "Database connection denied. Your IP might not be whitelisted in MongoDB Atlas.";
    }
    console.error("MCI POST ERROR:", errorMessage);
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

/**
 * PUT /api/content/mci-event
 */
export async function PUT(request: NextRequest) {
  const routeStart = Date.now();
  console.log(`[API] PUT /api/content/mci-event - START`);
  try {
    const body = await request.json();
    const { _id, createdAt, ...updateData } = body;
    
    if (!_id) return NextResponse.json({ success: false, error: "Event ID is required" }, { status: 400 });
    
    const db = await getDb();
    const collection = db.collection<MCIEvent>(COLLECTIONS.MCI_EVENTS);
    
    if (updateData.isActive) {
      await collection.updateMany(
        { _id: { $ne: new ObjectId(_id) }, isActive: true },
        { $set: { isActive: false } }
      );
    }
    
    const result = await collection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: { ...updateData, updatedAt: new Date() } }
    );
    
    console.log(`[API] PUT success in ${Date.now() - routeStart}ms`);
    
    // Purge cache for the event page
    revalidatePath("/events/mci");
    revalidatePath("/admin/events/mci");
    
    if (result.matchedCount === 0) return NextResponse.json({ success: false, error: "Event not found" }, { status: 404 });
    
    return NextResponse.json({ success: true, message: "Event updated successfully" });
  } catch (error: any) {
    let errorMessage = error.message || "Failed to update MCI event";
    if (error.message?.includes('alert number 80')) {
      errorMessage = "Database connection denied. Your IP might not be whitelisted in MongoDB Atlas.";
    }
    console.error("MCI PUT ERROR:", errorMessage);
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

/**
 * DELETE /api/content/mci-event
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) return NextResponse.json({ success: false, error: "Event ID is required" }, { status: 400 });
    
    const db = await getDb();
    const collection = db.collection<MCIEvent>(COLLECTIONS.MCI_EVENTS);
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    
    // Purge cache for the event page
    revalidatePath("/events/mci");
    revalidatePath("/admin/events/mci");
    
    if (result.deletedCount === 0) return NextResponse.json({ success: false, error: "Event not found" }, { status: 404 });
    
    return NextResponse.json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting MCI event:", error);
    return NextResponse.json({ success: false, error: "Failed to delete MCI event" }, { status: 500 });
  }
}
