import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS, type ResourceItem, type ResourceType } from "@/lib/db/schemas";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';

function revalidateResources() {
  revalidatePath('/resources');
  revalidatePath('/resources/blog');
  revalidatePath('/resources/podcast');
  revalidatePath('/resources/journal');
  revalidatePath('/resources/media');
  revalidatePath('/admin/resources');
  revalidatePath('/admin/resources/library');
  revalidatePath('/admin/resources/podcast');
  revalidatePath('/admin/resources/journal');
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const showAll = searchParams.get("all") === "true";
    const type = searchParams.get("type") as ResourceType | null;
    const limit = searchParams.get("limit");
    const featured = searchParams.get("featured") === "true";
    
    // Check permission for showing hidden items
    const userRole = request.headers.get("x-user-role");
    const isAdmin = userRole === "admin";
    
    const db = await getDb();
    const collection = db.collection<ResourceItem>(COLLECTIONS.RESOURCES);
    
    const query: Record<string, unknown> = {};
    if (!showAll || !isAdmin) query.isActive = true;
    if (type) query.type = type;
    if (featured) query.isFeatured = true;
    
    let cursor = collection.find(query).sort({ order: 1, createdAt: -1 });
    
    if (limit) {
      cursor = cursor.limit(parseInt(limit));
    }
    
    const items = await cursor.toArray();
    
    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    console.error("Error fetching resources:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch items" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.type) {
      return NextResponse.json({ success: false, error: "Title and type are required" }, { status: 400 });
    }
    
    const db = await getDb();
    const collection = db.collection<ResourceItem>(COLLECTIONS.RESOURCES);
    
    const newItem: Omit<ResourceItem, "_id"> = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await collection.insertOne(newItem as ResourceItem);
    
    revalidateResources();
    
    return NextResponse.json({ success: true, data: { _id: result.insertedId, ...newItem } }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating resource:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to create item" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { _id, ...updateData } = body;
    
    if (!_id) return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    
    const db = await getDb();
    const collection = db.collection<ResourceItem>(COLLECTIONS.RESOURCES);
    
    // Check if item exists
    const existing = await collection.findOne({ _id: new ObjectId(_id) });
    if (!existing) {
      return NextResponse.json({ success: false, error: "Resource not found" }, { status: 404 });
    }
    
    await collection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: { ...updateData, updatedAt: new Date() } }
    );
    
    revalidateResources();
    
    return NextResponse.json({ success: true, message: "Updated successfully" });
  } catch (error: any) {
    console.error("Error updating resource:", error);
    if (error.message?.includes("ObjectId")) {
      return NextResponse.json({ success: false, error: "Invalid resource ID" }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: error.message || "Failed to update item" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    
    const db = await getDb();
    const collection = db.collection<ResourceItem>(COLLECTIONS.RESOURCES);
    
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: "Resource not found" }, { status: 404 });
    }
    
    revalidateResources();
    
    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting resource:", error);
    if (error.message?.includes("ObjectId")) {
      return NextResponse.json({ success: false, error: "Invalid resource ID" }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: error.message || "Failed to delete item" }, { status: 500 });
  }
}
