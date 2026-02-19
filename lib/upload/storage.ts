import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface UploadResult {
  url: string;
  filename: string;
  mimeType: string;
  size: number;
  publicId: string;
}

/**
 * Storage Provider
 * Implements Cloudinary for scalable image and file hosting
 */
export class StorageProvider {
  /**
   * Upload a file to Cloudinary
   * Supports both image and document uploads (auto-type detection)
   */
  static async uploadFile(file: File): Promise<UploadResult> {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // PDFs must use 'raw' resource type so Cloudinary serves them properly
    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    const resourceType = isPdf ? "raw" as const : "auto" as const;

    // Sanitize filename to avoid spaces and special characters which cause 401/signature issues
    const sanitizedName = file.name
      .replace(/[^\w.-]/g, '_') // Replace everything except letters, numbers, dots, and hyphens with _
      .replace(/_{2,}/g, '_'); // Collapse consecutive underscores

    // Upload to Cloudinary using a promise to handle the stream-like buffer
    const uploadResponse = await new Promise<UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "pact_mediation_uploads",
          resource_type: resourceType,
          // For raw files (PDFs), we MUST include the extension in the public_id 
          // so browsers recognize it as a document and open it correctly.
          public_id: isPdf ? `pact_${Date.now()}_${sanitizedName}` : undefined,
          use_filename: true,
          unique_filename: true,
          access_mode: 'public', // Force public access to avoid 401 Unauthorized errors
        },
        (error, result) => {
          if (error || !result) {
            return reject(error);
          }
          resolve(result);
        }
      );

      uploadStream.end(buffer);
    });

    return {
      url: uploadResponse.secure_url,
      filename: uploadResponse.original_filename || uploadResponse.public_id,
      mimeType: file.type,
      size: file.size,
      publicId: uploadResponse.public_id,
    };
  }

  /**
   * Delete a file from Cloudinary using its public ID
   */
  static async deleteFile(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error("Cloudinary deletion error:", error);
    }
  }
}
