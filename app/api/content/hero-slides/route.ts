import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS, type HeroSlide } from "@/lib/db/schemas";
import { ObjectId } from "mongodb";
import { AuditRepository } from "@/lib/db/repositories/audit-repository";

/**
 * GET /api/content/hero-slides
 * Fetch all active hero slides, ordered by display order
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const showAll = searchParams.get("all") === "true";
    
    const db = await getDb();
    const collection = db.collection<HeroSlide>(COLLECTIONS.HERO_SLIDES);
    
    const query = showAll ? {} : { isActive: true };
    
    const slides = await collection
      .find(query)
      .sort({ order: 1 })
      .toArray();
    
    return NextResponse.json({ 
      success: true, 
      data: slides 
    });
  } catch (error) {
    console.error("Error fetching hero slides:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch hero slides" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/content/hero-slides
 * Create a new hero slide (Admin only)
 */
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    const body = await request.json();
    
    const db = await getDb();
    const collection = db.collection<HeroSlide>(COLLECTIONS.HERO_SLIDES);
    
    const newSlide: Omit<HeroSlide, "_id"> = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await collection.insertOne(newSlide as HeroSlide);
    
    // Audit Log
    if (userId) {
      AuditRepository.log({
        userId,
        action: "CREATE_HERO_SLIDE",
        resource: "hero_slides",
        resourceId: result.insertedId.toString(),
        details: { title: body.title }
      });
    }
    
    return NextResponse.json({ 
      success: true, 
      data: { _id: result.insertedId, ...newSlide }
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating hero slide:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create hero slide" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/content/hero-slides
 * Update a hero slide (Admin only)
 */
export async function PUT(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    const body = await request.json();
    const { _id, ...updateData } = body;
    
    if (!_id) {
      return NextResponse.json(
        { success: false, error: "Slide ID is required" },
        { status: 400 }
      );
    }
    
    const db = await getDb();
    const collection = db.collection<HeroSlide>(COLLECTIONS.HERO_SLIDES);
    
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
        { success: false, error: "Slide not found" },
        { status: 404 }
      );
    }

    // Audit Log
    if (userId) {
      AuditRepository.log({
        userId,
        action: "UPDATE_HERO_SLIDE",
        resource: "hero_slides",
        resourceId: _id,
        details: { updatedFields: Object.keys(updateData) }
      });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "Slide updated successfully" 
    });
  } catch (error) {
    console.error("Error updating hero slide:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update hero slide" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/content/hero-slides
 * Delete a hero slide (Admin only)
 */
export async function DELETE(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Slide ID is required" },
        { status: 400 }
      );
    }
    
    const db = await getDb();
    const collection = db.collection<HeroSlide>(COLLECTIONS.HERO_SLIDES);
    
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Slide not found" },
        { status: 404 }
      );
    }

    // Audit Log
    if (userId) {
      AuditRepository.log({
        userId,
        action: "DELETE_HERO_SLIDE",
        resource: "hero_slides",
        resourceId: id
      });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "Slide deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting hero slide:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete hero slide" },
      { status: 500 }
    );
  }
}
