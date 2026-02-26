import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS, type Testimonial } from "@/lib/db/schemas";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { AuditRepository } from "@/lib/db/repositories/audit-repository";

/**
 * GET /api/content/testimonials
 * Fetch testimonials. Admin can fetch all, public gets only active.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");
    const isAdmin = searchParams.get("admin") === "true";

    const db = await getDb();
    const collection = db.collection<Testimonial>(COLLECTIONS.TESTIMONIALS);

    const query: any = isAdmin ? {} : { isActive: true };
    if (page === "homepage") {
      query.$or = [
        { page: "homepage" },
        { page: "both" },
        { page: { $exists: false } },
        { page: null },
        { page: "" },
      ];
    } else if (page === "simplified") {
      query.$or = [
        { page: "simplified" },
        { page: "both" },
      ];
    } else if (page) {
      query.page = page;
    }

    const testimonials = await collection
      .find(query)
      .sort({ order: 1 })
      .toArray();

    return NextResponse.json({ success: true, data: testimonials });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/content/testimonials
 * Create a new testimonial (Admin only)
 */
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    const body = await request.json();

    const db = await getDb();
    const collection = db.collection<Testimonial>(COLLECTIONS.TESTIMONIALS);

    const newItem: Omit<Testimonial, "_id"> = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(newItem as Testimonial);

    revalidatePath("/");
    revalidatePath("/admin/home-page/testimonials");
    if (body.page === "simplified") {
      revalidatePath("/resources/mediation-simplified");
    }
    revalidatePath("/admin/resources/simplified");

    if (userId) {
      AuditRepository.log({
        userId,
        action: "CREATE_TESTIMONIAL",
        resource: "testimonials",
        resourceId: result.insertedId.toString(),
        details: { name: body.name },
      });
    }

    return NextResponse.json(
      { success: true, data: { _id: result.insertedId, ...newItem } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create testimonial" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/content/testimonials
 * Update a testimonial (Admin only)
 */
export async function PUT(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    const body = await request.json();
    const { _id, ...updateData } = body;

    if (!_id) {
      return NextResponse.json(
        { success: false, error: "Testimonial ID is required" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const collection = db.collection<Testimonial>(COLLECTIONS.TESTIMONIALS);

    const result = await collection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: { ...updateData, updatedAt: new Date() } }
    );

    revalidatePath("/");
    revalidatePath("/admin/home-page/testimonials");
    if (updateData.page === "simplified") {
      revalidatePath("/resources/mediation-simplified");
    }
    revalidatePath("/admin/resources/simplified");

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Testimonial not found" },
        { status: 404 }
      );
    }

    if (userId) {
      AuditRepository.log({
        userId,
        action: "UPDATE_TESTIMONIAL",
        resource: "testimonials",
        resourceId: _id,
        details: { updatedFields: Object.keys(updateData) },
      });
    }

    return NextResponse.json({ success: true, message: "Testimonial updated successfully" });
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update testimonial" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/content/testimonials
 * Delete a testimonial (Admin only)
 */
export async function DELETE(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Testimonial ID is required" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const collection = db.collection<Testimonial>(COLLECTIONS.TESTIMONIALS);

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    revalidatePath("/");
    revalidatePath("/admin/home-page/testimonials");
    revalidatePath("/resources/mediation-simplified");
    revalidatePath("/admin/resources/simplified");

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Testimonial not found" },
        { status: 404 }
      );
    }

    if (userId) {
      AuditRepository.log({
        userId,
        action: "DELETE_TESTIMONIAL",
        resource: "testimonials",
        resourceId: id,
      });
    }

    return NextResponse.json({ success: true, message: "Testimonial deleted successfully" });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete testimonial" },
      { status: 500 }
    );
  }
}
