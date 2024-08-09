import { NextResponse } from "next/server";

import { auth } from "@acme/auth/admin";

import {
  apiAuthPrefix,
  apiTrpcPrefix,
  authRoutes,
  DEFAULT_SIGNIN_REDIRECT,
  roleBasedRoutes,
} from "~/routes";

export default auth((req) => {
  const { nextUrl, auth } = req;
  console.log("Middleware - auth:", auth);
  const isLoggedIn = !!auth;
  const pathname = nextUrl.pathname;

  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
  const isApiTrpcRoute = pathname.startsWith(apiTrpcPrefix);
  const isAuthRoute = authRoutes.includes(pathname);

  // Allow API authentication and trpc routes
  if (isApiAuthRoute || isApiTrpcRoute) {
    return NextResponse.next();
  }

  // Redirect authenticated users trying to access auth routes (e.g., sign-in, sign-up)
  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL(DEFAULT_SIGNIN_REDIRECT, nextUrl));
  }

  // Redirect unauthenticated users trying to access protected routes (e.g., dashboard)
  if (!isLoggedIn && !isAuthRoute) {
    return NextResponse.redirect(new URL("/sign-in", nextUrl));
  }

  return NextResponse.next();
});


export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
