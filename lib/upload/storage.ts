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

    // Upload to Cloudinary using a promise to handle the stream-like buffer
    const uploadResponse = await new Promise<UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "pact_mediation_uploads",
          resource_type: "auto", // Automatically detect if it's an image, video, or raw file
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
