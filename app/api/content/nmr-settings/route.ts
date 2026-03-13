import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS } from "@/lib/db/schemas";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const db = await getDb();
    const settings = await db.collection(COLLECTIONS.NMR_SETTINGS).findOne({});
    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch NMR settings" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { _id, ...updateData } = body;

    const db = await getDb();
    
    // Add updatedAt
    updateData.updatedAt = new Date();

    let result;
    if (_id) {
        result = await db.collection(COLLECTIONS.NMR_SETTINGS).updateOne(
            { _id: new ObjectId(_id) },
            { $set: updateData }
        );
    } else {
        updateData.createdAt = new Date();
        result = await db.collection(COLLECTIONS.NMR_SETTINGS).insertOne(updateData);
    }

    revalidatePath("/resources/national-mediation-review");

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ success: false, error: "Failed to update NMR settings" }, { status: 500 });
  }
}
