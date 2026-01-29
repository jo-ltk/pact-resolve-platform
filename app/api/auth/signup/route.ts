import { NextRequest, NextResponse } from "next/server";
import { UserRepository } from "@/lib/db/repositories/user-repository";
import { hashPassword } from "@/lib/auth/password";
import { z } from "zod";

const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["user", "admin"]).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validation
    const validation = signupSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.format() },
        { status: 400 }
      );
    }

    const { name, email, password, role } = validation.data;

    // Check if user exists
    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists with this email" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const newUser = await UserRepository.create({
      name,
      email,
      password: hashedPassword,
      role: role ?? "user",
      isActive: true,
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json(
      { message: "User created successfully", user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
