import { NextRequest, NextResponse } from "next/server";
import { getUserSession } from "./actions/get-user-session";

const privateRoutes = ["/private"];
const adminRoutes = ["/admin"];
export async function proxy(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;
  const currentSession = await getUserSession();
  if (
    (privateRoutes.includes(currentPath) ||
      adminRoutes.includes(currentPath)) &&
    !currentSession
  ) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (adminRoutes.includes(currentPath) && currentSession?.role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
