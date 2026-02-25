import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary explicitly for this route
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get("path");

    if (!path) {
      return NextResponse.json({ error: "No path provided" }, { status: 400 });
    }

    // For 'raw' resources like PDFs, the extension is part of the public_id itself
    // We shouldn't provide it again in the format parameter
    const signedUrl = cloudinary.utils.private_download_url(path, "", {
      resource_type: "raw",
      attachment: false,
    });
    
    // Fallback: If it's a public file, we can also use the secure_url directly
    // but we'll try the signed one first without the double extension.

    // Fetch the file from Cloudinary in the backend
    let response = await fetch(signedUrl);

    // If signed URL fails, try a direct secure URL (works for public assets)
    if (!response.ok) {
      const publicUrl = cloudinary.url(path, { resource_type: "raw", secure: true });
      response = await fetch(publicUrl);
    }

    if (!response.ok) {
      console.error(`Proxy fetch failed for path: ${path}. Status: ${response.status}`);
      return NextResponse.json({ error: "Failed to fetch file from storage" }, { status: response.status });
    }

    // Get the file content
    const blob = await response.blob();
    
    // Create the response with correct headers
    const resHeaders = new Headers();
    resHeaders.set("Content-Type", response.headers.get("Content-Type") || "application/pdf");
    resHeaders.set("Content-Disposition", "inline"); // Show in browser
    resHeaders.set("Cache-Control", "public, max-age=3600"); // Cache for 1 hour

    return new NextResponse(blob, {
      status: 200,
      headers: resHeaders,
    });
  } catch (error: any) {
    console.error("PDF Proxy error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
