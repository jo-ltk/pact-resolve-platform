import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS, type WorkbookFeature } from "@/lib/db/schemas";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { AuditRepository } from "@/lib/db/repositories/audit-repository";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get("admin") === "true";
    
    const db = await getDb();
    const collection = db.collection<WorkbookFeature>(COLLECTIONS.WORKBOOK_FEATURES);
    
    const query: any = isAdmin ? {} : { isActive: true };
    const items = await collection.find(query).sort({ order: 1 }).toArray();
    
    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    console.error("Workbook features fetch error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch items" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    const body = await request.json();
    
    if (!body.text) {
      return NextResponse.json({ success: false, error: "Text is required" }, { status: 400 });
    }
    
    const db = await getDb();
    const collection = db.collection<WorkbookFeature>(COLLECTIONS.WORKBOOK_FEATURES);
    
    const newItem: Omit<WorkbookFeature, "_id"> = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await collection.insertOne(newItem as WorkbookFeature);
    
    revalidatePath("/resources/mediation-simplified");
    
    if (userId) {
      AuditRepository.log({
        userId,
        action: "CREATE_WORKBOOK_FEATURE",
        resource: "workbookFeatures",
        resourceId: result.insertedId.toString(),
        details: { text: body.text }
      });
    }
    
    return NextResponse.json({ success: true, data: { _id: result.insertedId, ...newItem } }, { status: 201 });
  } catch (error) {
    console.error("Workbook feature creation error:", error);
    return NextResponse.json({ success: false, error: "Failed to create item" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    const body = await request.json();
    const { _id, ...updateData } = body;
    
    if (!_id) return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    
    const db = await getDb();
    const collection = db.collection<WorkbookFeature>(COLLECTIONS.WORKBOOK_FEATURES);
    
    await collection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: { ...updateData, updatedAt: new Date() } }
    );
    
    revalidatePath("/resources/mediation-simplified");
    
    if (userId) {
      AuditRepository.log({
        userId,
        action: "UPDATE_WORKBOOK_FEATURE",
        resource: "workbookFeatures",
        resourceId: _id,
        details: { updatedFields: Object.keys(updateData) }
      });
    }
    
    return NextResponse.json({ success: true, message: "Updated successfully" });
  } catch (error) {
    console.error("Workbook feature update error:", error);
    return NextResponse.json({ success: false, error: "Failed to update item" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    
    const db = await getDb();
    const collection = db.collection<WorkbookFeature>(COLLECTIONS.WORKBOOK_FEATURES);
    
    await collection.deleteOne({ _id: new ObjectId(id) });
    
    revalidatePath("/resources/mediation-simplified");
    
    if (userId) {
      AuditRepository.log({
        userId,
        action: "DELETE_WORKBOOK_FEATURE",
        resource: "workbookFeatures",
        resourceId: id
      });
    }
    
    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error("Workbook feature deletion error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete item" }, { status: 500 });
  }
}
