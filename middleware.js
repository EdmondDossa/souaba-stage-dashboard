import { NextResponse } from "next/server";

const PUBLIC_PATHS = [
  "/login",
  "/register",
  "/forgot-password",
  "/password-forgot-otp",
  "/register-confirmation",
  "/register-confirmation-otp",
  "/reset-password",
  "/set-profile-info",
  "/_next",
  "/api",
  "/favicon.ico",
  "/images",
  "/public",
  "/_static"
];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Allow public routes and assets
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const token = request.cookies.get("access_token")?.value;

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectedFrom", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
