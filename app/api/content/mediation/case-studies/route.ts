import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS, type MediationCaseStudy } from "@/lib/db/schemas";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { AuditRepository } from "@/lib/db/repositories/audit-repository";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const showAll = searchParams.get("all") === "true";
    
    const db = await getDb();
    const collection = db.collection<MediationCaseStudy>(COLLECTIONS.MEDIATION_CASE_STUDIES);
    
    const query: Record<string, unknown> = {};
    if (!showAll) query.isActive = true;
    
    const items = await collection.find(query).sort({ order: 1 }).toArray();
    
    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    console.error("Error fetching mediation case studies:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch items" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    const body = await request.json();
    const db = await getDb();
    const collection = db.collection<MediationCaseStudy>(COLLECTIONS.MEDIATION_CASE_STUDIES);
    
    const newItem: Omit<MediationCaseStudy, "_id"> = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await collection.insertOne(newItem as MediationCaseStudy);
    
    revalidatePath("/mediation/case-studies");
    revalidatePath("/admin/mediation/case-studies");

    // Audit Log
    if (userId) {
      AuditRepository.log({
        userId,
        action: "CREATE_MEDIATION_CASE_STUDY",
        resource: "mediation_case_studies",
        resourceId: result.insertedId.toString(),
        details: { title: body.title }
      });
    }
    
    return NextResponse.json({ success: true, data: { _id: result.insertedId, ...newItem } }, { status: 201 });
  } catch (error) {
    console.error("Error creating mediation case study:", error);
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
    const collection = db.collection<MediationCaseStudy>(COLLECTIONS.MEDIATION_CASE_STUDIES);
    
    await collection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: { ...updateData, updatedAt: new Date() } }
    );
    
    revalidatePath("/mediation/case-studies");
    revalidatePath("/admin/mediation/case-studies");

    // Audit Log
    if (userId) {
      AuditRepository.log({
        userId,
        action: "UPDATE_MEDIATION_CASE_STUDY",
        resource: "mediation_case_studies",
        resourceId: _id,
        details: { updatedFields: Object.keys(updateData) }
      });
    }
    
    return NextResponse.json({ success: true, message: "Updated successfully" });
  } catch (error) {
    console.error("Error updating mediation case study:", error);
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
    const collection = db.collection<MediationCaseStudy>(COLLECTIONS.MEDIATION_CASE_STUDIES);
    
    await collection.deleteOne({ _id: new ObjectId(id) });
    
    revalidatePath("/mediation/case-studies");
    revalidatePath("/admin/mediation/case-studies");

    // Audit Log
    if (userId) {
      AuditRepository.log({
        userId,
        action: "DELETE_MEDIATION_CASE_STUDY",
        resource: "mediation_case_studies",
        resourceId: id
      });
    }
    
    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error("Error deleting mediation case study:", error);
    return NextResponse.json({ success: false, error: "Failed to delete item" }, { status: 500 });
  }
}
