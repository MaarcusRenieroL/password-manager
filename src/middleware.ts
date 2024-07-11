import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname;

    const token = await getToken({ req });
    const isAuth = !!token;

    const unprotectedRoutes = ["/auth/sign-in", "/auth/sign-up", "/"];
    const isApiRoute = req.nextUrl.pathname.startsWith("/api");

    if (!isAuth && !unprotectedRoutes.includes(pathname) && !isApiRoute) {
      return NextResponse.redirect(new URL("/auth/sign-in", req.url), 302);
    }

    if (["/auth/sign-in", "/auth/sign-up"].includes(req.nextUrl.pathname)) {
      if (isAuth && token.role) {
        return NextResponse.redirect(new URL("/dashboard", req.url), 302);
      }
    }
  },
  {
    callbacks: {
      async authorized() {
        await Promise.resolve();
        return true;
      },
    },
  },
);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/api/:path*",
    "/dashboard",
  ],
};
