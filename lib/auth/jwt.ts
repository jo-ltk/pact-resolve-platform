import jwt from "jsonwebtoken";
import { AuthPayload } from "@/types/auth";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key-12345";
const JWT_EXPIRES_IN = "7d";

export function signToken(payload: AuthPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

export function verifyToken(token: string): AuthPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthPayload;
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return null;
  }
}
