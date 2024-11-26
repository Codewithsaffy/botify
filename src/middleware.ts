import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "@/auth.config";
import NextAuth from "next-auth";
import { LOGIN, PROTECTED_ROUTES, PUBLIC_ROUTES, ROOT } from "@/helper/routes";

const { auth } = NextAuth(authConfig);

async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const session = await auth();
  const isAuthenticated = !!session?.user;
  const isPublicRoute =
    (PUBLIC_ROUTES.find((route) => nextUrl.pathname.startsWith(route)) ||
      nextUrl.pathname === ROOT) &&
    !PROTECTED_ROUTES.find((route) => nextUrl.pathname.includes(route));
  console.log(isPublicRoute);
  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL(LOGIN, nextUrl));
  }
  // here (req.url) is a base url like http://localhost:3000
}

export const config = {
  matcher: ["/check"],
};

export default middleware;
