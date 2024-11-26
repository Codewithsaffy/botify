export const ROOT = "/";
export const LOGIN = "/login";
export const PUBLIC_ROUTES = [
  "/signin",
  "/",
  "/profile/:path*",
  "/api/auth/callback/google",
  "/api/auth/callback/github",
  "/api/register",
  "/api/post",
];
export const PROTECTED_ROUTES = ["/dashboard", "/check"];
