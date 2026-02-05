import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS, type AcademyModule, type AcademyProgram, type AcademyCourseType } from "@/lib/db/schemas";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const showAll = searchParams.get("all") === "true";
    const program = searchParams.get("program") as AcademyProgram | null;
    const courseType = searchParams.get("courseType") as AcademyCourseType | null;
    
    const db = await getDb();
    const collection = db.collection<AcademyModule>(COLLECTIONS.ACADEMY_MODULES);
    
    const query: Record<string, unknown> = {};
    if (!showAll) query.isActive = true;
    if (program) query.program = program;
    if (courseType) query.courseType = courseType;
    
    const items = await collection.find(query).sort({ order: 1 }).toArray();
    
    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    console.error("Error fetching academy modules:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch items" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const db = await getDb();
    const collection = db.collection<AcademyModule>(COLLECTIONS.ACADEMY_MODULES);
    
    const newItem: Omit<AcademyModule, "_id"> = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await collection.insertOne(newItem as AcademyModule);
    
    revalidatePath(`/academy/${body.program}`);
    revalidatePath(`/admin/academy/${body.program}`);
    
    return NextResponse.json({ success: true, data: { _id: result.insertedId, ...newItem } }, { status: 201 });
  } catch (error) {
    console.error("Error creating academy module:", error);
    return NextResponse.json({ success: false, error: "Failed to create item" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { _id, ...updateData } = body;
    
    if (!_id) return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    
    const db = await getDb();
    const collection = db.collection<AcademyModule>(COLLECTIONS.ACADEMY_MODULES);
    
    await collection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: { ...updateData, updatedAt: new Date() } }
    );
    
    revalidatePath(`/academy/${updateData.program}`);
    revalidatePath(`/admin/academy/${updateData.program}`);
    
    return NextResponse.json({ success: true, message: "Updated successfully" });
  } catch (error) {
    console.error("Error updating academy module:", error);
    return NextResponse.json({ success: false, error: "Failed to update item" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    
    const db = await getDb();
    const collection = db.collection<AcademyModule>(COLLECTIONS.ACADEMY_MODULES);
    
    const item = await collection.findOne({ _id: new ObjectId(id) });
    await collection.deleteOne({ _id: new ObjectId(id) });
    
    if (item) {
      revalidatePath(`/academy/${item.program}`);
      revalidatePath(`/admin/academy/${item.program}`);
    }
    
    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error("Error deleting academy module:", error);
    return NextResponse.json({ success: false, error: "Failed to delete item" }, { status: 500 });
  }
}
