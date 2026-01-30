import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS, type ConclaveEvent } from "@/lib/db/schemas";
import { ObjectId } from "mongodb";

/**
 * GET /api/content/conclave-event
 * Fetch conclave events
 * Query params:
 *   - year: specific year to fetch (optional)
 *   - all: if true, returns all events (optional)
 *   - id: specific event ID to fetch (optional)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get("year");
    const all = searchParams.get("all") === "true" || searchParams.get("admin") === "true";
    const id = searchParams.get("id");
    
    const db = await getDb();
    const collection = db.collection<ConclaveEvent>(COLLECTIONS.CONCLAVE_EVENTS);
    
    // Get specific event by ID
    if (id) {
      if (!ObjectId.isValid(id)) {
        return NextResponse.json({ success: false, error: "Invalid ID format" }, { status: 400 });
      }
      const event = await collection.findOne({ _id: new ObjectId(id) });
      if (!event) {
        return NextResponse.json(
          { success: false, error: "Conclave event not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: event });
    }
    
    // Get all events
    if (all) {
      const events = await collection.find({}).sort({ year: -1 }).toArray();
      return NextResponse.json({ success: true, data: events });
    }
    
    // Get specific year
    if (year) {
      const event = await collection.findOne({ year: parseInt(year, 10) });
      if (!event) {
        return NextResponse.json(
          { success: false, error: "Conclave event not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: event });
    }
    
    // Get the active event (default)
    const event = await collection.findOne({ isActive: true });
    
    if (!event) {
      // Find the most recent one if no specifically active one is found
      const latest = await collection.find({}).sort({ year: -1 }).limit(1).toArray();
      
      // If absolutely no events exist, return null data so frontend can handle initialization
      if (latest.length === 0) {
         return NextResponse.json({ success: true, data: null });
      }
      
      return NextResponse.json({ success: true, data: latest[0] });
    }
    
    return NextResponse.json({ success: true, data: event });
  } catch (error) {
    console.error("Error fetching Conclave event:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to fetch Conclave event" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/content/conclave-event
 * Create a new Conclave event (Admin only)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("POST Conclave Event - Data:", JSON.stringify(body, null, 2));
    
    // Validate year
    if (!body.year) {
      return NextResponse.json({ success: false, error: "Year is required" }, { status: 400 });
    }
    
    const db = await getDb();
    const collection = db.collection<ConclaveEvent>(COLLECTIONS.CONCLAVE_EVENTS);
    
    // If this event is marked as active, deactivate others
    if (body.isActive) {
      console.log("POST Conclave Event - Setting as active, deactivating others");
      await collection.updateMany(
        { isActive: true },
        { $set: { isActive: false } }
      );
    }
    
    const newEvent: Omit<ConclaveEvent, "_id"> = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    console.log("POST Conclave Event - Inserting to DB...");
    const result = await collection.insertOne(newEvent as ConclaveEvent);
    console.log("POST Conclave Event - Insert result:", result.insertedId);
    
    return NextResponse.json({ 
      success: true, 
      data: { _id: result.insertedId, ...newEvent }
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating Conclave event:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to create Conclave event" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/content/conclave-event
 * Update a Conclave event (Admin only)
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { _id, createdAt, updatedAt, ...updateData } = body;
    
    console.log("PUT Conclave Event - ID:", _id);
    
    if (!_id) {
      return NextResponse.json(
        { success: false, error: "Event ID is required" },
        { status: 400 }
      );
    }

    if (!ObjectId.isValid(_id)) {
      return NextResponse.json({ success: false, error: "Invalid ID format" }, { status: 400 });
    }
    
    const db = await getDb();
    const collection = db.collection<ConclaveEvent>(COLLECTIONS.CONCLAVE_EVENTS);
    
    // If this event is being marked as active, deactivate others
    if (updateData.isActive) {
      console.log("PUT Conclave Event - Deactivating other active events");
      await collection.updateMany(
        { _id: { $ne: new ObjectId(_id) }, isActive: true },
        { $set: { isActive: false } }
      );
    }
    
    console.log("PUT Conclave Event - Updating DB...");
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
    
    console.log("PUT Conclave Event - Update success");
    return NextResponse.json({ 
      success: true, 
      message: "Event updated successfully" 
    });
  } catch (error) {
    console.error("Error updating Conclave event:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to update Conclave event" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/content/conclave-event
 * Delete a Conclave event (Admin only)
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
    const collection = db.collection<ConclaveEvent>(COLLECTIONS.CONCLAVE_EVENTS);
    
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Event not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "Conclave event deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting Conclave event:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete Conclave event" },
      { status: 500 }
    );
  }
}
