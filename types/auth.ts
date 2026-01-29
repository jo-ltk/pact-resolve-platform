export type UserRole = "user" | "admin";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
}

export interface AuthPayload {
  userId: string;
  role: UserRole;
}
