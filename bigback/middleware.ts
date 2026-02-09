import { auth } from "@/app/(auth)/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Define protected routes (chat routes)
  const isProtectedRoute = nextUrl.pathname.startsWith("/chat") ||
                          nextUrl.pathname === "/" ||
                          nextUrl.pathname.startsWith("/api/chat") ||
                          nextUrl.pathname.startsWith("/api/vote") ||
                          nextUrl.pathname.startsWith("/api/suggestions") ||
                          nextUrl.pathname.startsWith("/api/history") ||
                          nextUrl.pathname.startsWith("/api/document");

  // Define auth routes (login/register)
  const isAuthRoute = nextUrl.pathname.startsWith("/login") ||
                     nextUrl.pathname.startsWith("/register");

  // Define API auth routes (these should be accessible)
  const isAuthApiRoute = nextUrl.pathname.startsWith("/api/auth");

  if (isProtectedRoute && !isLoggedIn && !isAuthApiRoute) {
    // Redirect to login page if trying to access protected route without authentication
    const loginUrl = new URL("/login", nextUrl);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && isLoggedIn) {
    // Redirect to home if trying to access auth pages while logged in
    const homeUrl = new URL("/", nextUrl);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth.js routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files with extensions
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.).*)",
  ],
};