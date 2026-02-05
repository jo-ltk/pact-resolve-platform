import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS, type EcosystemPartner, type EcosystemPartnerCategory } from "@/lib/db/schemas";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const showAll = searchParams.get("all") === "true";
    const category = searchParams.get("category") as EcosystemPartnerCategory | null;
    const userRole = request.headers.get("x-user-role");
    const isAdmin = userRole === "admin";
    
    const db = await getDb();
    const collection = db.collection<EcosystemPartner>(COLLECTIONS.ECOSYSTEM_PARTNERS);
    
    const query: Record<string, unknown> = {};
    // Only admins can see inactive/all items
    if (!showAll || !isAdmin) query.isActive = true;
    if (category) query.category = category;
    
    const items = await collection.find(query).sort({ order: 1 }).toArray();
    
    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    console.error("Error fetching ecosystem partners:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch items" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const db = await getDb();
    const collection = db.collection<EcosystemPartner>(COLLECTIONS.ECOSYSTEM_PARTNERS);
    
    const newItem: Omit<EcosystemPartner, "_id"> = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await collection.insertOne(newItem as EcosystemPartner);
    
    revalidatePath('/ecosystem/collaborators');
    revalidatePath('/admin/ecosystem/collaborators');
    
    return NextResponse.json({ success: true, data: { _id: result.insertedId, ...newItem } }, { status: 201 });
  } catch (error) {
    console.error("Error creating ecosystem partner:", error);
    return NextResponse.json({ success: false, error: "Failed to create item" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { _id, ...updateData } = body;
    
    if (!_id) return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    
    const db = await getDb();
    const collection = db.collection<EcosystemPartner>(COLLECTIONS.ECOSYSTEM_PARTNERS);
    
    await collection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: { ...updateData, updatedAt: new Date() } }
    );
    
    revalidatePath('/ecosystem/collaborators');
    revalidatePath('/admin/ecosystem/collaborators');
    
    return NextResponse.json({ success: true, message: "Updated successfully" });
  } catch (error) {
    console.error("Error updating ecosystem partner:", error);
    return NextResponse.json({ success: false, error: "Failed to update item" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    
    const db = await getDb();
    const collection = db.collection<EcosystemPartner>(COLLECTIONS.ECOSYSTEM_PARTNERS);
    
    await collection.deleteOne({ _id: new ObjectId(id) });
    
    revalidatePath('/ecosystem/collaborators');
    revalidatePath('/admin/ecosystem/collaborators');
    
    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error("Error deleting ecosystem partner:", error);
    return NextResponse.json({ success: false, error: "Failed to delete item" }, { status: 500 });
  }
}
