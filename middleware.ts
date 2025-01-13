import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  const publicRoutes = ["/test", "/api","/api/webhook"];

  
  if (
    isPublicRoute(request) ||
    publicRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    return NextResponse.next();
  }

  
  return NextResponse.next();
});

export const config = {
  matcher: [
    
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    
    "/(api|trpc)(.*)",
    "/api/:path*",
  ],
};
