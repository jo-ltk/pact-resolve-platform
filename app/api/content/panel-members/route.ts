import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS, type PanelMember } from "@/lib/db/schemas";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

/**
 * GET /api/content/panel-members
 * Fetch panel members. Admin can fetch all, public gets only active.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get("admin") === "true";
    
    const db = await getDb();
    const collection = db.collection<PanelMember>(COLLECTIONS.PANEL_MEMBERS);
    
    const query = isAdmin ? {} : { isActive: true };
    
    const members = await collection
      .find(query)
      .sort({ order: 1 })
      .toArray();
    
    return NextResponse.json({ 
      success: true, 
      data: members 
    });
  } catch (error) {
    console.error("Error fetching panel members:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch panel members" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/content/panel-members
 * Create a new panel member (Admin only)
 */
export async function POST(request: NextRequest) {
  try {
    // TODO: Add authentication middleware
    const body = await request.json();
    
    const db = await getDb();
    const collection = db.collection<PanelMember>(COLLECTIONS.PANEL_MEMBERS);
    
    const newMember: Omit<PanelMember, "_id"> = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await collection.insertOne(newMember as PanelMember);
    
    revalidatePath("/");
    revalidatePath("/admin/home-page/panel-members");
    revalidatePath("/mediation/mediator-panel");
    
    return NextResponse.json({ 
      success: true, 
      data: { _id: result.insertedId, ...newMember }
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating panel member:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create panel member" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/content/panel-members
 * Update a panel member (Admin only)
 */
export async function PUT(request: NextRequest) {
  try {
    // TODO: Add authentication middleware
    const body = await request.json();
    const { _id, ...updateData } = body;
    
    if (!_id) {
      return NextResponse.json(
        { success: false, error: "Member ID is required" },
        { status: 400 }
      );
    }
    
    const db = await getDb();
    const collection = db.collection<PanelMember>(COLLECTIONS.PANEL_MEMBERS);
    
    const result = await collection.updateOne(
      { _id: new ObjectId(_id) },
      { 
        $set: { 
          ...updateData, 
          updatedAt: new Date() 
        } 
      }
    );
    
    revalidatePath("/");
    revalidatePath("/admin/home-page/panel-members");
    revalidatePath("/mediation/mediator-panel");
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Member not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "Member updated successfully" 
    });
  } catch (error) {
    console.error("Error updating panel member:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update panel member" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/content/panel-members
 * Delete a panel member (Admin only)
 */
export async function DELETE(request: NextRequest) {
  try {
    // TODO: Add authentication middleware
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Member ID is required" },
        { status: 400 }
      );
    }
    
    const db = await getDb();
    const collection = db.collection<PanelMember>(COLLECTIONS.PANEL_MEMBERS);
    
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    
    revalidatePath("/");
    revalidatePath("/admin/home-page/panel-members");
    revalidatePath("/mediation/mediator-panel");
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Member not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "Member deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting panel member:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete panel member" },
      { status: 500 }
    );
  }
}
