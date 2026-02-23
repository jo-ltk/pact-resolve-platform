import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS, type ProjectUpdate } from "@/lib/db/schemas";
import { ObjectId } from "mongodb";
import { AuditRepository } from "@/lib/db/repositories/audit-repository";

/**
 * GET /api/content/project-updates
 * Fetch all project updates or a specific one by ID
 * Query params:
 *   - id: specific update ID to fetch (optional)
 *   - all: if true, returns all updates (optional)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const all = searchParams.get("all");
    
    const db = await getDb();
    const collection = db.collection<ProjectUpdate>(COLLECTIONS.PROJECT_UPDATES);
    
    if (id) {
      // Get specific update by ID
      const update = await collection.findOne({ _id: new ObjectId(id) });
      if (!update) {
        return NextResponse.json(
          { success: false, error: "Project update not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ 
        success: true, 
        data: update 
      });
    }
    
    if (all === "true") {
      // Get ALL updates (including hidden) sorted by order - for admin dashboard
      const updates = await collection.find({}).sort({ order: 1 }).toArray();
      return NextResponse.json({ 
        success: true, 
        data: updates 
      });
    }
    
    // Get active updates by default
    const updates = await collection.find({ isActive: true }).sort({ order: 1 }).toArray();
    
    return NextResponse.json({ 
      success: true, 
      data: updates 
    });
  } catch (error) {
    console.error("Error fetching Project Updates:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch Project Updates" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/content/project-updates
 * Create a new Project Update (Admin only)
 */
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    const body = await request.json();
    
    const db = await getDb();
    const collection = db.collection<ProjectUpdate>(COLLECTIONS.PROJECT_UPDATES);
    
    // Get the next order number
    const lastUpdate = await collection.findOne({}, { sort: { order: -1 } });
    const nextOrder = lastUpdate ? lastUpdate.order + 1 : 1;
    
    const newUpdate: Omit<ProjectUpdate, "_id"> = {
      title: body.title,
      date: body.date,
      location: body.location,
      category: body.category,
      iconName: body.iconName || "Calendar",
      order: body.order || nextOrder,
      isActive: body.isActive ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await collection.insertOne(newUpdate as ProjectUpdate);

    // Audit Log
    if (userId) {
      AuditRepository.log({
        userId,
        action: "CREATE_PROJECT_UPDATE",
        resource: "project_updates",
        resourceId: result.insertedId.toString(),
        details: { title: body.title }
      });
    }
    
    return NextResponse.json({ 
      success: true, 
      data: { _id: result.insertedId, ...newUpdate }
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating Project Update:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create Project Update" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/content/project-updates
 * Update a Project Update (Admin only)
 */
export async function PUT(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    const body = await request.json();
    const { _id, ...updateData } = body;
    
    if (!_id) {
      return NextResponse.json(
        { success: false, error: "Update ID is required" },
        { status: 400 }
      );
    }
    
    const db = await getDb();
    const collection = db.collection<ProjectUpdate>(COLLECTIONS.PROJECT_UPDATES);
    
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
        { success: false, error: "Project Update not found" },
        { status: 404 }
      );
    }

    // Audit Log
    if (userId) {
      AuditRepository.log({
        userId,
        action: "UPDATE_PROJECT_UPDATE",
        resource: "project_updates",
        resourceId: _id,
        details: { updatedFields: Object.keys(updateData) }
      });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "Project Update updated successfully" 
    });
  } catch (error) {
    console.error("Error updating Project Update:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update Project Update" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/content/project-updates
 * Delete a Project Update (Admin only)
 */
export async function DELETE(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Update ID is required" },
        { status: 400 }
      );
    }
    
    const db = await getDb();
    const collection = db.collection<ProjectUpdate>(COLLECTIONS.PROJECT_UPDATES);
    
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Project Update not found" },
        { status: 404 }
      );
    }

    // Audit Log
    if (userId) {
      AuditRepository.log({
        userId,
        action: "DELETE_PROJECT_UPDATE",
        resource: "project_updates",
        resourceId: id
      });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "Project Update deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting Project Update:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete Project Update" },
      { status: 500 }
    );
  }
}
