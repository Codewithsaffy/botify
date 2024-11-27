export const ROOT = "/";
export const LOGIN = "/signin";
export const PUBLIC_ROUTES = [
  "/",
  "/profile/:path*",
  "/api/auth/callback/google",
  "/api/auth/callback/github",
  "/api/auth/callback/facebook",
];
export const PROTECTED_ROUTES = ["/new-post:path*", "/edit:path*"];
