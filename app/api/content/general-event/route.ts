import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS, type MCIEvent } from "@/lib/db/schemas";
import { ObjectId } from "mongodb";

/**
 * GET /api/content/general-event
 * Fetch all general events or a specific one by ID
 * Query params:
 *   - id: specific event ID to fetch (optional)
 *   - all: if true, returns all events (optional)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const all = searchParams.get("all");
    
    const db = await getDb();
    const collection = db.collection<MCIEvent>(COLLECTIONS.GENERAL_EVENTS);
    
    if (id) {
      // Get specific event by ID
      const event = await collection.findOne({ _id: new ObjectId(id) });
      if (!event) {
        return NextResponse.json(
          { success: false, error: "General event not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ 
        success: true, 
        data: event 
      });
    }
    
    if (all === "true") {
      // Get all events
      const events = await collection.find({}).sort({ year: -1 }).toArray();
      return NextResponse.json({ 
        success: true, 
        data: events 
      });
    }
    
    // Get the active event by default
    const event = await collection.findOne({ isActive: true });
    
    if (!event) {
      return NextResponse.json(
        { success: false, error: "General event not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      data: event 
    });
  } catch (error) {
    console.error("Error fetching General event:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch General event" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/content/general-event
 * Create a new General event (Admin only)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const db = await getDb();
    const collection = db.collection<MCIEvent>(COLLECTIONS.GENERAL_EVENTS);
    
    // Multiple general events can be active simultaneously
    // So we don't deactivate others
    
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
    console.error("Error creating General event:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create General event" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/content/general-event
 * Update a General event (Admin only)
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { _id, ...updateData } = body;
    
    if (!_id) {
      return NextResponse.json(
        { success: false, error: "Event ID is required" },
        { status: 400 }
      );
    }
    
    const db = await getDb();
    const collection = db.collection<MCIEvent>(COLLECTIONS.GENERAL_EVENTS);
    
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
    console.error("Error updating General event:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update General event" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/content/general-event
 * Delete a General event (Admin only)
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
    const collection = db.collection<MCIEvent>(COLLECTIONS.GENERAL_EVENTS);
    
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Event not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "General event deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting General event:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete General event" },
      { status: 500 }
    );
  }
}
