import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS, type LegalPage } from "@/lib/db/schemas";
import { ObjectId } from "mongodb";
import { AuditRepository } from "@/lib/db/repositories/audit-repository";

/**
 * GET /api/content/legal-pages
 * Fetch legal pages by slug or all
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    
    const db = await getDb();
    const collection = db.collection<LegalPage>(COLLECTIONS.LEGAL_PAGES);
    
    if (slug) {
      const page = await collection.findOne({ slug, isActive: true });
      return NextResponse.json({ success: true, data: page });
    }
    
    const pages = await collection.find({}).toArray();
    return NextResponse.json({ success: true, data: pages });
  } catch (error) {
    console.error("Error fetching legal pages:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch legal pages" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/content/legal-pages
 * Create or update a legal page
 */
export async function PUT(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    const body = await request.json();
    const { slug, ...updateData } = body;
    
    if (!slug) {
      return NextResponse.json(
        { success: false, error: "Slug is required" },
        { status: 400 }
      );
    }
    
    const db = await getDb();
    const collection = db.collection<LegalPage>(COLLECTIONS.LEGAL_PAGES);
    
    const result = await collection.updateOne(
      { slug },
      { 
        $set: { 
          ...updateData, 
          updatedAt: new Date() 
        },
        $setOnInsert: {
          createdAt: new Date()
        }
      },
      { upsert: true }
    );
    
    if (userId) {
      AuditRepository.log({
        userId,
        action: "UPDATE_LEGAL_PAGE",
        resource: "legal_pages",
        details: { slug }
      });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "Legal page updated successfully" 
    });
  } catch (error) {
    console.error("Error updating legal page:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update legal page" },
      { status: 500 }
    );
  }
}
