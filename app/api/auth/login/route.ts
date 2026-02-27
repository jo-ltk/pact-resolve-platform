import { NextRequest, NextResponse } from "next/server";
import { UserRepository } from "@/lib/db/repositories/user-repository";
import { verifyPassword } from "@/lib/auth/password";
import { signToken } from "@/lib/auth/jwt";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function POST(request: NextRequest) {
  let step = "parsing-body";
  let body;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid JSON format in request body" },
      { status: 400 }
    );
  }
  
  try {
    step = "validating";
    
    // Pre-process email before validation
    const processedBody = { ...body };
    if (typeof processedBody.email === 'string') {
      processedBody.email = processedBody.email.toLowerCase().trim();
    }

    // Validation
    const validation = loginSchema.safeParse(processedBody);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid credentials format" },
        { status: 400 }
      );
    }

    const { email: rawEmail, password } = validation.data;
    const email = rawEmail.toLowerCase();
    step = "finding-user";

    // Find user
    console.log(`[AUTH] Searching for user: ${email}`);
    const user = await UserRepository.findByEmail(email);
    
    if (!user) {
      console.warn(`[AUTH] User not found: ${email}`);
      return NextResponse.json(
        { error: "Email address not registered" },
        { status: 401 }
      );
    }
    console.log(`[AUTH] User found: ${user.email} (ID: ${user._id})`);

    if (!user.password && !(user as any).hashedPassword) {
      return NextResponse.json(
        { error: "Account has no password set" },
        { status: 401 }
      );
    }

    step = "checking-active";
    // Verify status
    if (!user.isActive) {
      return NextResponse.json(
        { error: "Account is deactivated" },
        { status: 403 }
      );
    }

    step = "verifying-password";
    // Verify password
    const hashedPassword = user.password || (user as any).hashedPassword;
    const isPasswordMatch = await verifyPassword(password, hashedPassword);
    if (!isPasswordMatch) {
      console.warn(`[AUTH] Incorrect password for user: ${email}`);
      return NextResponse.json(
        { error: "Incorrect password. Please try again." },
        { status: 401 }
      );
    }

    step = "signing-token";
    // Sign JWT
    const token = signToken({
      userId: user._id.toString(),
      role: user.role,
    });

    return NextResponse.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
      }
    });
  } catch (error: any) {
    console.error(`Login error at step [${step}]:`, error);
    
    return NextResponse.json(
      { 
        error: "Internal server error",
        step: step,
        message: error?.message || "Unknown"
      },
      { status: 500 }
    );
  }
}

