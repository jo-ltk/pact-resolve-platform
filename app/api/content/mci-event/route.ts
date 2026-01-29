import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS, type MCIEvent } from "@/lib/db/schemas";
import { ObjectId } from "mongodb";

/**
 * GET /api/content/mci-event
 * Fetch the active MCI event or a specific year
 * Query params:
 *   - year: specific year to fetch (optional)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get("year");
    
    const db = await getDb();
    const collection = db.collection<MCIEvent>(COLLECTIONS.MCI_EVENTS);
    
    let event: MCIEvent | null;
    
    if (year) {
      // Get specific year
      event = await collection.findOne({ year: parseInt(year, 10) });
    } else {
      // Get the active event
      event = await collection.findOne({ isActive: true });
    }
    
    if (!event) {
      return NextResponse.json(
        { success: false, error: "MCI event not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      data: event 
    });
  } catch (error) {
    console.error("Error fetching MCI event:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch MCI event" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/content/mci-event
 * Create a new MCI event (Admin only)
 */
export async function POST(request: NextRequest) {
  try {
    // TODO: Add authentication middleware
    const body = await request.json();
    
    const db = await getDb();
    const collection = db.collection<MCIEvent>(COLLECTIONS.MCI_EVENTS);
    
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
    console.error("Error creating MCI event:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create MCI event" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/content/mci-event
 * Update an MCI event (Admin only)
 */
export async function PUT(request: NextRequest) {
  try {
    // TODO: Add authentication middleware
    const body = await request.json();
    const { _id, ...updateData } = body;
    
    if (!_id) {
      return NextResponse.json(
        { success: false, error: "Event ID is required" },
        { status: 400 }
      );
    }
    
    const db = await getDb();
    const collection = db.collection<MCIEvent>(COLLECTIONS.MCI_EVENTS);
    
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
    console.error("Error updating MCI event:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update MCI event" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/content/mci-event
 * Delete an MCI event (Admin only)
 */
export async function DELETE(request: NextRequest) {
  try {
    // TODO: Add authentication middleware
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Event ID is required" },
        { status: 400 }
      );
    }
    
    const db = await getDb();
    const collection = db.collection<MCIEvent>(COLLECTIONS.MCI_EVENTS);
    
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Event not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "Event deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting MCI event:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete MCI event" },
      { status: 500 }
    );
  }
}
