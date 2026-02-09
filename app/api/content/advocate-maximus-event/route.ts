import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS, type MCIEvent } from "@/lib/db/schemas";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { AuditRepository } from "@/lib/db/repositories/audit-repository";

/**
 * GET /api/content/advocate-maximus-event
 * Fetch Advocate Maximus events
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
    const collection = db.collection<MCIEvent>(COLLECTIONS.ADVOCATE_MAXIMUS_EVENTS);
    
    // Get specific event by ID
    if (id) {
      const event = await collection.findOne({ _id: new ObjectId(id) });
      if (!event) {
        return NextResponse.json(
          { success: false, error: "Advocate Maximus event not found" },
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
          { success: false, error: "Advocate Maximus event not found" },
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
    console.error("Error fetching Advocate Maximus event:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch Advocate Maximus event" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/content/advocate-maximus-event
 * Create a new Advocate Maximus event (Admin only)
 */
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    const body = await request.json();
    
    const db = await getDb();
    const collection = db.collection<MCIEvent>(COLLECTIONS.ADVOCATE_MAXIMUS_EVENTS);
    
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
    
    revalidatePath("/events/advocate-maximus");
    revalidatePath("/admin/events/advocate-maximus");

    // Audit Log
    if (userId) {
      AuditRepository.log({
        userId,
        action: "CREATE_ADVOCATE_MAXIMUS_EVENT",
        resource: "advocate_maximus_events",
        resourceId: result.insertedId.toString(),
        details: { year: body.year, title: body.title }
      });
    }
    
    return NextResponse.json({ 
      success: true, 
      data: { _id: result.insertedId, ...newEvent }
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating Advocate Maximus event:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create Advocate Maximus event" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/content/advocate-maximus-event
 * Update an Advocate Maximus event (Admin only)
 */
export async function PUT(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    const body = await request.json();
    const { _id, createdAt, ...updateData } = body;
    
    if (!_id) {
      return NextResponse.json(
        { success: false, error: "Event ID is required" },
        { status: 400 }
      );
    }
    
    const db = await getDb();
    const collection = db.collection<MCIEvent>(COLLECTIONS.ADVOCATE_MAXIMUS_EVENTS);
    
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
    
    revalidatePath("/events/advocate-maximus");
    revalidatePath("/admin/events/advocate-maximus");

    // Audit Log
    if (userId) {
      AuditRepository.log({
        userId,
        action: "UPDATE_ADVOCATE_MAXIMUS_EVENT",
        resource: "advocate_maximus_events",
        resourceId: _id,
        details: { updatedFields: Object.keys(updateData) }
      });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "Event updated successfully" 
    });
  } catch (error) {
    console.error("Error updating Advocate Maximus event:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update Advocate Maximus event" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/content/advocate-maximus-event
 * Delete an Advocate Maximus event (Admin only)
 */
export async function DELETE(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Event ID is required" },
        { status: 400 }
      );
    }
    
    const db = await getDb();
    const collection = db.collection<MCIEvent>(COLLECTIONS.ADVOCATE_MAXIMUS_EVENTS);
    
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Event not found" },
        { status: 404 }
      );
    }
    
    revalidatePath("/events/advocate-maximus");
    revalidatePath("/admin/events/advocate-maximus");

    // Audit Log
    if (userId) {
      AuditRepository.log({
        userId,
        action: "DELETE_ADVOCATE_MAXIMUS_EVENT",
        resource: "advocate_maximus_events",
        resourceId: id
      });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "Advocate Maximus event deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting Advocate Maximus event:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete Advocate Maximus event" },
      { status: 500 }
    );
  }
}
