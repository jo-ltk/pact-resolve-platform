import { NextRequest, NextResponse } from "next/server";
import { StorageProvider } from "@/lib/upload/storage";
import { AuditRepository } from "@/lib/db/repositories/audit-repository";

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    // Limit file size (10MB for PDFs, 5MB for images)
    const maxSize = file.type === "application/pdf" ? 10 * 1024 * 1024 : 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `File size exceeds ${file.type === "application/pdf" ? "10MB" : "5MB"} limit` },
        { status: 400 }
      );
    }

    // Restrict file types
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/svg+xml", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Unsupported file type. Allowed: JPG, PNG, WebP, SVG, PDF" },
        { status: 400 }
      );
    }

    // Process upload
    const result = await StorageProvider.uploadFile(file);

    // Audit Log
    if (userId) {
      AuditRepository.log({
        userId,
        action: "FILE_UPLOAD",
        resource: "media",
        details: { filename: result.filename, mimeType: result.mimeType }
      });
    }

    return NextResponse.json({
      success: true,
      message: "File uploaded successfully",
      data: result
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
