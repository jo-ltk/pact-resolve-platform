import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS, type WorkbookGalleryImage } from "@/lib/db/schemas";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { AuditRepository } from "@/lib/db/repositories/audit-repository";

/**
 * GET /api/content/workbook-gallery
 * Fetch images for the "Workbook in Action" gallery.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get("admin") === "true";

    const db = await getDb();
    const collection = db.collection<WorkbookGalleryImage>(COLLECTIONS.WORKBOOK_GALLERY);

    const query: any = isAdmin ? {} : { isActive: true };

    const images = await collection
      .find(query)
      .sort({ order: 1 })
      .toArray();

    return NextResponse.json({ success: true, data: images });
  } catch (error) {
    console.error("Error fetching workbook gallery:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch gallery images" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/content/workbook-gallery
 * Add a new image to the gallery.
 */
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    const body = await request.json();

    const db = await getDb();
    const collection = db.collection<WorkbookGalleryImage>(COLLECTIONS.WORKBOOK_GALLERY);

    const newItem: Omit<WorkbookGalleryImage, "_id"> = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(newItem as WorkbookGalleryImage);

    revalidatePath("/resources/mediation-simplified");
    revalidatePath("/admin/resources/simplified");

    if (userId) {
      AuditRepository.log({
        userId,
        action: "CREATE_GALLERY_IMAGE",
        resource: "workbookGallery",
        resourceId: result.insertedId.toString(),
        details: { caption: body.caption },
      });
    }

    return NextResponse.json(
      { success: true, data: { _id: result.insertedId, ...newItem } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating gallery image:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create gallery image" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/content/workbook-gallery
 * Update a gallery image.
 */
export async function PUT(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    const body = await request.json();
    const { _id, ...updateData } = body;

    if (!_id) {
      return NextResponse.json(
        { success: false, error: "Image ID is required" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const collection = db.collection<WorkbookGalleryImage>(COLLECTIONS.WORKBOOK_GALLERY);

    const result = await collection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: { ...updateData, updatedAt: new Date() } }
    );

    revalidatePath("/resources/mediation-simplified");
    revalidatePath("/admin/resources/simplified");

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Image not found" },
        { status: 404 }
      );
    }

    if (userId) {
      AuditRepository.log({
        userId,
        action: "UPDATE_GALLERY_IMAGE",
        resource: "workbookGallery",
        resourceId: _id,
        details: { updatedFields: Object.keys(updateData) },
      });
    }

    return NextResponse.json({ success: true, message: "Gallery image updated successfully" });
  } catch (error) {
    console.error("Error updating gallery image:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update gallery image" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/content/workbook-gallery
 * Remove an image from the gallery.
 */
export async function DELETE(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Image ID is required" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const collection = db.collection<WorkbookGalleryImage>(COLLECTIONS.WORKBOOK_GALLERY);

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    revalidatePath("/resources/mediation-simplified");
    revalidatePath("/admin/resources/simplified");

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Image not found" },
        { status: 404 }
      );
    }

    if (userId) {
      AuditRepository.log({
        userId,
        action: "DELETE_GALLERY_IMAGE",
        resource: "workbookGallery",
        resourceId: id,
      });
    }

    return NextResponse.json({ success: true, message: "Gallery image deleted successfully" });
  } catch (error) {
    console.error("Error deleting gallery image:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete gallery image" },
      { status: 500 }
    );
  }
}
