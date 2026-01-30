import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS, type MCIEvent } from "@/lib/db/schemas";
import { ObjectId } from "mongodb";

/**
 * GET /api/content/awards-event
 * Fetch Awards events
 * Query params:
 *   - year: specific year to fetch (optional)
 *   - all: if true, returns all events (optional)
 *   - id: specific event ID to fetch (optional)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get("year");
    const all = searchParams.get("all");
    const id = searchParams.get("id");
    
    const db = await getDb();
    const collection = db.collection<MCIEvent>(COLLECTIONS.NATIONAL_IMPACT_AWARDS);
    
    // Get specific event by ID
    if (id) {
      const event = await collection.findOne({ _id: new ObjectId(id) });
      if (!event) {
        return NextResponse.json(
          { success: false, error: "Awards event not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: event });
    }
    
    // Get all events
    if (all === "true") {
      const events = await collection.find({}).sort({ year: -1 }).toArray();
      return NextResponse.json({ success: true, data: events });
    }
    
    // Get specific year
    if (year) {
      const event = await collection.findOne({ year: parseInt(year, 10) });
      if (!event) {
        return NextResponse.json(
          { success: false, error: "Awards event not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: event });
    }
    
    // Get the active event (default)
    const event = await collection.findOne({ isActive: true });
    
    if (!event) {
      // Return empty array if no active event (don't error)
      return NextResponse.json({ success: true, data: [] });
    }
    
    return NextResponse.json({ success: true, data: event });
  } catch (error) {
    console.error("Error fetching Awards event:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch Awards event" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/content/awards-event
 * Create a new Awards event (Admin only)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const db = await getDb();
    const collection = db.collection<MCIEvent>(COLLECTIONS.NATIONAL_IMPACT_AWARDS);
    
    // If this event is marked as active, deactivate others
    if (body.isActive) {
      await collection.updateMany(
        { isActive: true },
        { $set: { isActive: false } }
      );
    }
    
    const newEvent: Omit<MCIEvent, "_id"> = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await collection.insertOne(newEvent as MCIEvent);
    
    return NextResponse.json({ 
      success: true, 
      data: { _id: result.insertedId, ...newEvent }
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating Awards event:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create Awards event" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/content/awards-event
 * Update an Awards event (Admin only)
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { _id, createdAt, ...updateData } = body;
    
    if (!_id) {
      return NextResponse.json(
        { success: false, error: "Event ID is required" },
        { status: 400 }
      );
    }
    
    const db = await getDb();
    const collection = db.collection<MCIEvent>(COLLECTIONS.NATIONAL_IMPACT_AWARDS);
    
    // If this event is being marked as active, deactivate others
    if (updateData.isActive) {
      await collection.updateMany(
        { _id: { $ne: new ObjectId(_id) }, isActive: true },
        { $set: { isActive: false } }
      );
    }
    
    const result = await collection.updateOne(
      { _id: new ObjectId(_id) },
      { 
        $set: { 
          ...updateData, 
          updatedAt: new Date() 
        } 
      }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Event not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "Event updated successfully" 
    });
  } catch (error) {
    console.error("Error updating Awards event:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update Awards event" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/content/awards-event
 * Delete an Awards event (Admin only)
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Event ID is required" },
        { status: 400 }
      );
    }
    
    const db = await getDb();
    const collection = db.collection<MCIEvent>(COLLECTIONS.NATIONAL_IMPACT_AWARDS);
    
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Event not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "Awards event deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting Awards event:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete Awards event" },
      { status: 500 }
    );
  }
}
