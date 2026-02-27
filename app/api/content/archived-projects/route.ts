import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS, type ArchivedProject } from "@/lib/db/schemas";
import { ObjectId } from "mongodb";
import { AuditRepository } from "@/lib/db/repositories/audit-repository";

/**
 * GET /api/content/archived-projects
 * Fetch all archived projects or a specific one by ID
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const all = searchParams.get("all");
    
    const db = await getDb();
    const collection = db.collection<ArchivedProject>(COLLECTIONS.ARCHIVED_PROJECTS);
    
    if (id) {
      if (!ObjectId.isValid(id)) return NextResponse.json({ success: false, error: "Invalid ID format" }, { status: 400 });
      const project = await collection.findOne({ _id: new ObjectId(id) });
      if (!project) {
        return NextResponse.json({ success: false, error: "Archived project not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: project });
    }
    
    if (all === "true") {
      // Get ALL projects for admin dashboard
      const projects = await collection.find({}).sort({ order: 1 }).toArray();
      return NextResponse.json({ success: true, data: projects });
    }
    
    // Get active projects by default
    const projects = await collection.find({ isActive: true }).sort({ order: 1 }).toArray();
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    console.error("Error fetching Archived Projects:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch Archived Projects" }, { status: 500 });
  }
}

/**
 * POST /api/content/archived-projects - Create new archived project
 */
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    const body = await request.json();
    
    const db = await getDb();
    const collection = db.collection<ArchivedProject>(COLLECTIONS.ARCHIVED_PROJECTS);
    
    const lastProject = await collection.findOne({}, { sort: { order: -1 } });
    const nextOrder = lastProject ? lastProject.order + 1 : 1;
    
    const newProject: Omit<ArchivedProject, "_id"> = {
      title: body.title,
      location: body.location,
      description: body.description,
      link: body.link,
      category: body.category,
      image: body.image,
      order: body.order || nextOrder,
      isActive: body.isActive ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await collection.insertOne(newProject as ArchivedProject);

    if (userId) {
      AuditRepository.log({
        userId,
        action: "CREATE_ARCHIVED_PROJECT",
        resource: "archived_projects",
        resourceId: result.insertedId.toString(),
        details: { title: body.title }
      });
    }
    
    return NextResponse.json({ success: true, data: { _id: result.insertedId, ...newProject } }, { status: 201 });
  } catch (error) {
    console.error("Error creating Archived Project:", error);
    return NextResponse.json({ success: false, error: "Failed to create Archived Project" }, { status: 500 });
  }
}

/**
 * PUT /api/content/archived-projects - Update archived project
 */
export async function PUT(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    const body = await request.json();
    const { _id, ...updateData } = body;
    
    if (!_id) {
      return NextResponse.json({ success: false, error: "Project ID is required" }, { status: 400 });
    }
    
    const db = await getDb();
    const collection = db.collection<ArchivedProject>(COLLECTIONS.ARCHIVED_PROJECTS);
    
    const result = await collection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: { ...updateData, updatedAt: new Date() } }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }

    if (userId) {
      AuditRepository.log({
        userId,
        action: "UPDATE_ARCHIVED_PROJECT",
        resource: "archived_projects",
        resourceId: _id,
        details: { updatedFields: Object.keys(updateData) }
      });
    }
    
    return NextResponse.json({ success: true, message: "Project updated successfully" });
  } catch (error) {
    console.error("Error updating Archived Project:", error);
    return NextResponse.json({ success: false, error: "Failed to update Archived Project" }, { status: 500 });
  }
}

/**
 * DELETE /api/content/archived-projects - Delete archived project
 */
export async function DELETE(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json({ success: false, error: "Project ID is required" }, { status: 400 });
    }
    
    const db = await getDb();
    const collection = db.collection<ArchivedProject>(COLLECTIONS.ARCHIVED_PROJECTS);
    
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }

    if (userId) {
      AuditRepository.log({
        userId,
        action: "DELETE_ARCHIVED_PROJECT",
        resource: "archived_projects",
        resourceId: id
      });
    }
    
    return NextResponse.json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting Archived Project:", error);
    return NextResponse.json({ success: false, error: "Failed to delete Archived Project" }, { status: 500 });
  }
}
