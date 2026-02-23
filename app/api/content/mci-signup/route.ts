import { NextRequest, NextResponse } from "next/server";
import { StorageProvider } from "@/lib/upload/storage";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract text data
    const name = formData.get("name");
    const university = formData.get("university");
    const yearOfStudy = formData.get("yearOfStudy");
    const resumeHistory = formData.get("resumeHistory");
    const linkedin = formData.get("linkedin");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const category = formData.get("category");

    // Extract files
    const resumeFile = formData.get("resumeFile") as File;
    const certificatesFile = formData.get("certificatesFile") as File;

    let resumeUrl = "No file provided";
    let certificatesUrl = "No file provided";

    // Upload files to Cloudinary if they exist
    if (resumeFile && resumeFile.size > 0) {
      const result = await StorageProvider.uploadFile(resumeFile);
      resumeUrl = result.url;
    }

    if (certificatesFile && certificatesFile.size > 0) {
      const result = await StorageProvider.uploadFile(certificatesFile);
      certificatesUrl = result.url;
    }
    
    /** 
     * DESTINATION: official@mediationchampionship.com / official@thepact.in
     */
    console.log("--- MCI CHALLENGER APPLICATION ---");
    console.log("Name:", name);
    console.log("University:", university);
    console.log("Year of Study:", yearOfStudy);
    console.log("Mediation Resume/History:", resumeHistory);
    console.log("LinkedIn:", linkedin);
    console.log("Email:", email);
    console.log("WhatsApp/Phone:", phone);
    console.log("Category:", category);
    console.log("Resume File URL:", resumeUrl);
    console.log("Certificates File URL:", certificatesUrl);
    console.log("-------------------------------------------");
    
    return NextResponse.json({ 
      success: true, 
      message: "Your application has been received. Our team will review your profile and get back to you shortly." 
    }, { status: 200 });
    
  } catch (error: any) {
    console.error("Error receiving MCI application:", error);
    return NextResponse.json({ 
      success: false, 
      error: "Failed to process application submission" 
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ success: true, message: "MCI Challenger API is active" });
}
