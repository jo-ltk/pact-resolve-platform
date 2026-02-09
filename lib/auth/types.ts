export type UserRole = "user" | "admin";

export interface User {
  _id?: string;
  name: string;
  email: string;
  hashedPassword?: string;
  role: UserRole;
  isActive: boolean;
  image?: string;
  createdAt: Date;
}

export interface JWTPayload {
  userId: string;
  role: UserRole;
  email: string;
}
