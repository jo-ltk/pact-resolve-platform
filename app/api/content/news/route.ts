import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS, type NewsItem } from "@/lib/db/schemas";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

/**
 * GET /api/content/news
 * Fetch all active news items, ordered by order field
 * Query params:
 *   - featured: "true" to get only featured items
 *   - limit: number of items to return
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured") === "true";
    const showAll = searchParams.get("all") === "true";
    const limit = parseInt(searchParams.get("limit") || "0", 10);
    
    const db = await getDb();
    const collection = db.collection<NewsItem>(COLLECTIONS.NEWS);
    
    const query: Record<string, unknown> = {};
    
    if (!showAll) {
      query.isActive = true;
    }
    
    if (featured) {
      query.isFeatured = true;
    }
    
    let cursor = collection.find(query).sort({ order: 1 });
    
    if (limit > 0) {
      cursor = cursor.limit(limit);
    }
    
    const news = await cursor.toArray();
    
    return NextResponse.json({ 
      success: true, 
      data: news 
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch news items" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/content/news
 * Create a new news item (Admin only)
 */
export async function POST(request: NextRequest) {
  try {
    // TODO: Add authentication middleware
    const body = await request.json();
    
    const db = await getDb();
    const collection = db.collection<NewsItem>(COLLECTIONS.NEWS);
    
    const newItem: Omit<NewsItem, "_id"> = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await collection.insertOne(newItem as NewsItem);
    
    revalidatePath("/");
    revalidatePath("/admin/home-page/news");
    
    return NextResponse.json({ 
      success: true, 
      data: { _id: result.insertedId, ...newItem }
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating news item:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create news item" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/content/news
 * Update a news item (Admin only)
 */
export async function PUT(request: NextRequest) {
  try {
    // TODO: Add authentication middleware
    const body = await request.json();
    const { _id, ...updateData } = body;
    
    if (!_id) {
      return NextResponse.json(
        { success: false, error: "News item ID is required" },
        { status: 400 }
      );
    }
    
    const db = await getDb();
    const collection = db.collection<NewsItem>(COLLECTIONS.NEWS);
    
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
    revalidatePath("/admin/home-page/news");
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: "News item not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "News item updated successfully" 
    });
  } catch (error) {
    console.error("Error updating news item:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update news item" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/content/news
 * Delete a news item (Admin only)
 */
export async function DELETE(request: NextRequest) {
  try {
    // TODO: Add authentication middleware
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: "News item ID is required" },
        { status: 400 }
      );
    }
    
    const db = await getDb();
    const collection = db.collection<NewsItem>(COLLECTIONS.NEWS);
    
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    
    revalidatePath("/");
    revalidatePath("/admin/news");
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "News item not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "News item deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting news item:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete news item" },
      { status: 500 }
    );
  }
}
