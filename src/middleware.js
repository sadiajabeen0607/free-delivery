import { NextResponse } from "next/server";

export function middleware(req) {
  const response = NextResponse.next();

  // CORS headers apply karein
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  return response;
}

// Middleware sirf API routes pe apply hoga
export const config = {
  matcher: "/api/:path*",
};
