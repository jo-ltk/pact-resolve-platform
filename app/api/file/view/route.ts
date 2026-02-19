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

    // Use the explicitly signed download URL from Cloudinary API
    // This is the most robust way to access restricted assets from the backend
    const signedUrl = cloudinary.utils.private_download_url(path, "pdf", {
      resource_type: "raw",
      attachment: false,
    });

    // Fetch the file from Cloudinary in the backend
    const response = await fetch(signedUrl);

    if (!response.ok) {
      console.error(`Proxy fetch failed: ${response.status} ${response.statusText}`);
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
