import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS, type Partner } from "@/lib/db/schemas";
import { ObjectId } from "mongodb";
import { AuditRepository } from "@/lib/db/repositories/audit-repository";

/**
 * GET /api/content/partners
 * Fetch all active partners, optionally filtered by category
 * Query params:
 *   - category: "strategic" | "collaborator" | "supporter" | "sponsor"
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const showAll = searchParams.get("all") === "true";
    
    const db = await getDb();
    const collection = db.collection<Partner>(COLLECTIONS.PARTNERS);
    
    const query: Record<string, unknown> = {};
    
    if (!showAll) {
      query.isActive = true;
    }
    
    if (category) {
      query.category = category;
    }
    
    const partners = await collection
      .find(query)
      .sort({ order: 1 })
      .toArray();
    
    return NextResponse.json({ 
      success: true, 
      data: partners 
    });
  } catch (error) {
    console.error("Error fetching partners:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch partners" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/content/partners
 * Create a new partner (Admin only)
 */
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    const body = await request.json();
    
    const db = await getDb();
    const collection = db.collection<Partner>(COLLECTIONS.PARTNERS);
    
    const newPartner: Omit<Partner, "_id"> = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await collection.insertOne(newPartner as Partner);
    
    // Audit Log
    if (userId) {
      AuditRepository.log({
        userId,
        action: "CREATE_PARTNER",
        resource: "partners",
        resourceId: result.insertedId.toString(),
        details: { name: body.name, category: body.category }
      });
    }
    
    return NextResponse.json({ 
      success: true, 
      data: { _id: result.insertedId, ...newPartner }
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating partner:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create partner" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/content/partners
 * Update a partner (Admin only)
 */
export async function PUT(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    const body = await request.json();
    const { _id, ...updateData } = body;
    
    if (!_id) {
      return NextResponse.json(
        { success: false, error: "Partner ID is required" },
        { status: 400 }
      );
    }
    
    const db = await getDb();
    const collection = db.collection<Partner>(COLLECTIONS.PARTNERS);
    
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
        { success: false, error: "Partner not found" },
        { status: 404 }
      );
    }

    // Audit Log
    if (userId) {
      AuditRepository.log({
        userId,
        action: "UPDATE_PARTNER",
        resource: "partners",
        resourceId: _id,
        details: { updatedFields: Object.keys(updateData) }
      });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "Partner updated successfully" 
    });
  } catch (error) {
    console.error("Error updating partner:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update partner" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/content/partners
 * Delete a partner (Admin only)
 */
export async function DELETE(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Partner ID is required" },
        { status: 400 }
      );
    }
    
    const db = await getDb();
    const collection = db.collection<Partner>(COLLECTIONS.PARTNERS);
    
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Partner not found" },
        { status: 404 }
      );
    }

    // Audit Log
    if (userId) {
      AuditRepository.log({
        userId,
        action: "DELETE_PARTNER",
        resource: "partners",
        resourceId: id
      });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "Partner deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting partner:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete partner" },
      { status: 500 }
    );
  }
}
