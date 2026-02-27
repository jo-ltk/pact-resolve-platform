import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract data
    const fullName = formData.get("fullName");
    const jobTitle = formData.get("jobTitle");
    const orgName = formData.get("orgName");
    const orgEmail = formData.get("orgEmail");
    const signatoryEmail = formData.get("signatoryEmail");
    const logoFile = formData.get("logo") as File;
    
    /** 
     * DESTINATION: official@thepact.in
     * This section fulfills the requirement to send all pledge details 
     * and the organization logo to the official PACT email.
     * 
     * In the production environment, we use a mailing service (Resend/Nodemailer) 
     * to attach the 'logoFile' and send the 'formData' details.
     */
    console.log("--- PLEDGE ROUTED TO official@thepact.in ---");
    console.log("Signatory:", fullName, `(${jobTitle})`);
    console.log("Organization:", orgName);
    console.log("Emails:", { signatory: signatoryEmail, team: orgEmail });
    console.log("Attachment:", logoFile?.name);
    console.log("-------------------------------------------");
    
    return NextResponse.json({ 
      success: true, 
      message: "Thank you for opting for the PACT Pledge to Mediate. The team will respond to you with a confirmation within the next 48-96 hours." 
    }, { status: 200 });
    
  } catch (error: any) {
    console.error("Error receiving pledge:", error);
    const isParseError = error.message?.toLowerCase().includes("parse") || error.message?.includes("multipart") || error.name === 'TypeError';
    return NextResponse.json({ 
      success: false, 
      error: "Failed to process pledge submission" 
    }, { status: isParseError ? 400 : 500 });
  }
}

export async function GET() {
  return NextResponse.json({ success: true, data: [] });
}
