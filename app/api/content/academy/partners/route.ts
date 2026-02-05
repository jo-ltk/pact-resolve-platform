import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS, type AcademyPartner, type AcademyProgram } from "@/lib/db/schemas";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const showAll = searchParams.get("all") === "true";
    const program = searchParams.get("program") as AcademyProgram | null;
    
    const db = await getDb();
    const collection = db.collection<AcademyPartner>(COLLECTIONS.ACADEMY_PARTNERS);
    
    const query: Record<string, unknown> = {};
    if (!showAll) query.isActive = true;
    if (program) query.programs = program;
    
    const items = await collection.find(query).sort({ order: 1 }).toArray();
    
    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    console.error("Error fetching academy partners:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch items" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const db = await getDb();
    const collection = db.collection<AcademyPartner>(COLLECTIONS.ACADEMY_PARTNERS);
    
    const newItem: Omit<AcademyPartner, "_id"> = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await collection.insertOne(newItem as AcademyPartner);
    
    for (const program of body.programs || []) {
      revalidatePath(`/academy/${program}`);
      revalidatePath(`/admin/academy/${program}`);
    }
    
    return NextResponse.json({ success: true, data: { _id: result.insertedId, ...newItem } }, { status: 201 });
  } catch (error) {
    console.error("Error creating academy partner:", error);
    return NextResponse.json({ success: false, error: "Failed to create item" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { _id, ...updateData } = body;
    
    if (!_id) return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    
    const db = await getDb();
    const collection = db.collection<AcademyPartner>(COLLECTIONS.ACADEMY_PARTNERS);
    
    await collection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: { ...updateData, updatedAt: new Date() } }
    );
    
    for (const program of updateData.programs || []) {
      revalidatePath(`/academy/${program}`);
      revalidatePath(`/admin/academy/${program}`);
    }
    
    return NextResponse.json({ success: true, message: "Updated successfully" });
  } catch (error) {
    console.error("Error updating academy partner:", error);
    return NextResponse.json({ success: false, error: "Failed to update item" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    
    const db = await getDb();
    const collection = db.collection<AcademyPartner>(COLLECTIONS.ACADEMY_PARTNERS);
    
    const item = await collection.findOne({ _id: new ObjectId(id) });
    await collection.deleteOne({ _id: new ObjectId(id) });
    
    if (item) {
      for (const program of item.programs || []) {
        revalidatePath(`/academy/${program}`);
        revalidatePath(`/admin/academy/${program}`);
      }
    }
    
    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error("Error deleting academy partner:", error);
    return NextResponse.json({ success: false, error: "Failed to delete item" }, { status: 500 });
  }
}
