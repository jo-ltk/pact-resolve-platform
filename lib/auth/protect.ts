import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./jwt";
import { AuthPayload, UserRole } from "@/types/auth";

export interface AuthenticatedNextRequest extends NextRequest {
  user: AuthPayload;
}

type RouteHandler = (
  req: AuthenticatedNextRequest,
  params: any
) => Promise<NextResponse> | NextResponse;

export function requireAuth(handler: RouteHandler) {
  return async (req: NextRequest, params: any) => {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const authReq = req as AuthenticatedNextRequest;
    authReq.user = decoded;

    return handler(authReq, params);
  };
}

export function requireAdmin(handler: RouteHandler) {
  return requireAuth(async (req, params) => {
    if (req.user.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden: Admin access required" },
        { status: 403 }
      );
    }
    return handler(req, params);
  });
}

/**
 * Higher-order helper for CRUD operations based on roles
 * Admin: Full Access
 * User: Read-only (GET)
 */
export function withRoleCheck(handler: RouteHandler) {
  return async (req: NextRequest, params: any) => {
    const method = req.method;

    // GET requests: Any authenticated user can access
    if (method === "GET") {
      return requireAuth(handler)(req, params);
    }

    // mutations (POST, PUT, DELETE, PATCH): Admin only
    return requireAdmin(handler)(req, params);
  };
}
