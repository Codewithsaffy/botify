import { NextRequest, NextResponse } from "next/server";
import { LOGIN, ROOT } from "@/helper/routes";
import { auth } from "./auth";

async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const session = await auth();
  console.log(session);
  const isAuthenticated = session?.user ? true : false;
  console.log(isAuthenticated);
  if (!isAuthenticated) {
    if (
      nextUrl.pathname.startsWith("/new-post") ||
      nextUrl.pathname.startsWith("/edit") ||
      nextUrl.pathname.startsWith("/redirecting")
    ) {
      return NextResponse.redirect(new URL(LOGIN, req.url));
    }
  } else if (isAuthenticated) {
    if (nextUrl.pathname === LOGIN) {
      return NextResponse.redirect(new URL(ROOT, req.url));
    }
  }
}

export const config = {
  matcher: ["/new-post/:path*", "/edit/:path*", "/signin", "/redirecting"],
};

export default middleware;
