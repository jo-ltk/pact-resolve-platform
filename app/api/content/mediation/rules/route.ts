import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS, type MediationRule } from "@/lib/db/schemas";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const showAll = searchParams.get("all") === "true";
    
    const db = await getDb();
    const collection = db.collection<MediationRule>(COLLECTIONS.MEDIATION_RULES);
    
    const query: Record<string, unknown> = {};
    if (!showAll) query.isActive = true;
    
    const items = await collection.find(query).sort({ order: 1 }).toArray();
    
    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    console.error("Error fetching mediation rules:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch items" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const db = await getDb();
    const collection = db.collection<MediationRule>(COLLECTIONS.MEDIATION_RULES);
    
    const newItem: Omit<MediationRule, "_id"> = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await collection.insertOne(newItem as MediationRule);
    
    revalidatePath("/mediation/rules-fees");
    revalidatePath("/admin/mediation/rules");
    
    return NextResponse.json({ success: true, data: { _id: result.insertedId, ...newItem } }, { status: 201 });
  } catch (error) {
    console.error("Error creating mediation rule:", error);
    return NextResponse.json({ success: false, error: "Failed to create item" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { _id, ...updateData } = body;
    
    if (!_id) return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    
    const db = await getDb();
    const collection = db.collection<MediationRule>(COLLECTIONS.MEDIATION_RULES);
    
    await collection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: { ...updateData, updatedAt: new Date() } }
    );
    
    revalidatePath("/mediation/rules-fees");
    revalidatePath("/admin/mediation/rules");
    
    return NextResponse.json({ success: true, message: "Updated successfully" });
  } catch (error) {
    console.error("Error updating mediation rule:", error);
    return NextResponse.json({ success: false, error: "Failed to update item" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    
    const db = await getDb();
    const collection = db.collection<MediationRule>(COLLECTIONS.MEDIATION_RULES);
    
    await collection.deleteOne({ _id: new ObjectId(id) });
    
    revalidatePath("/mediation/rules-fees");
    revalidatePath("/admin/mediation/rules");
    
    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error("Error deleting mediation rule:", error);
    return NextResponse.json({ success: false, error: "Failed to delete item" }, { status: 500 });
  }
}
