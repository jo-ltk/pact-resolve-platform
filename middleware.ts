import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key-12345";
const secret = new TextEncoder().encode(JWT_SECRET);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  // 1. Handle CORS Preflight (OPTIONS)
  if (method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, x-user-id, x-user-role",
        "Access-Control-Max-Age": "86400",
      },
    });
  }

  // 2. Identify protected routes
  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";
  const isContentRoute = pathname.startsWith("/api/content");
  const isUploadRoute = pathname.startsWith("/api/upload");
  const isApiProtected = isContentRoute || isUploadRoute;

  // Handle Admin UI routes
  if (isAdminRoute && !isLoginPage) {
    const token = request.cookies.get("admin_token")?.value;
    
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (error) {
      console.error("Admin Auth Error:", error);
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.delete("admin_token");
      return response;
    }
  }

  if (!isApiProtected) {
    return NextResponse.next();
  }

  // 3. Authentication check for API
  let token = "";
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else {
    // Also check cookie for API calls from the same domain
    const cookieToken = request.cookies.get("admin_token")?.value;
    if (cookieToken) {
      token = cookieToken;
    }
  }

  // ALLOW GET requests for content APIs without token
  // ALSO allow POST to /seed routes for initialization
  // ALSO allow POST to /api/content/pledge for public submission
  const isPublicPost = method === "POST" && pathname === "/api/content/pledge";
  if (!token && isContentRoute && (method === "GET" || pathname.endsWith("/seed") || isPublicPost)) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }
  
  try {
    const { payload } = await jwtVerify(token, secret);
    
    // 4. Authorization (RBAC)
    const role = payload.role as string;
    const userId = payload.userId as string;
    const isAdmin = role === "admin";
    const isWriteOperation = ["POST", "PUT", "DELETE", "PATCH"].includes(method);

    // Content routes: Users can GET, only Admin can write
    if (isContentRoute && isWriteOperation && !isAdmin) {
      return NextResponse.json(
        { error: "Forbidden: Admin role required for write operations" },
        { status: 403 }
      );
    }

    // Upload routes: Strictly Admin only
    if (isUploadRoute && !isAdmin) {
      return NextResponse.json(
        { error: "Forbidden: Admin role required for file uploads" },
        { status: 403 }
      );
    }

    // 5. Inject headers for downstream handlers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", userId);
    requestHeaders.set("x-user-role", role);

    // Add CORS headers to the response
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    response.headers.set("Access-Control-Allow-Origin", "*");
    
    return response;
  } catch (error: any) {
    console.error("Auth Middleware Error:", error);
    return NextResponse.json(
      { error: "Invalid or expired token", details: error.message },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/content/:path*",
    "/api/upload/:path*",
  ],
};
