import { NextRequest, NextResponse } from "next/server";
import { UserRepository } from "@/lib/db/repositories/user-repository";
import { verifyToken } from "@/lib/auth/jwt";
import { hashPassword } from "@/lib/auth/password";
import { z } from "zod";

const profileSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
  image: z.string().optional(),
});

export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token);

    if (!payload || !payload.userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const body = await request.json();
    const validation = profileSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid data format", details: validation.error.format() },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (validation.data.name) updateData.name = validation.data.name;
    if (validation.data.email) updateData.email = validation.data.email.toLowerCase();
    if (validation.data.image) updateData.image = validation.data.image;
    
    if (validation.data.password) {
      updateData.password = await hashPassword(validation.data.password);
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: "No data to update" }, { status: 400 });
    }

    const success = await UserRepository.update(payload.userId, updateData);

    if (!success) {
      return NextResponse.json({ error: "User not found or update failed" }, { status: 404 });
    }

    // Fetch updated user to return
    const updatedUser = await UserRepository.findById(payload.userId);

    return NextResponse.json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser?._id,
        name: updatedUser?.name,
        email: updatedUser?.email,
        role: updatedUser?.role,
        image: updatedUser?.image,
      }
    });
  } catch (error: any) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error?.message },
      { status: 500 }
    );
  }
}
