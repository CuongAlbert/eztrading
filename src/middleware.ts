import { NextFetchEvent, NextRequest } from "next/server";
import { localePrefix, locales } from "./config/i18n-navigation";

import { authMiddleware } from "@clerk/nextjs";
import createMiddleware from "next-intl/middleware";

const i18nMiddleware = createMiddleware({
  defaultLocale: "en",
  localePrefix,
  locales,
});
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
const authenMiddleware = authMiddleware({
  publicRoutes: (req) => !req.url.includes("/provider"),
});

export default function middleware(req: NextRequest, res: NextFetchEvent) {
  authenMiddleware(req, res);
  i18nMiddleware(req);
}

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
    "/(vi|en)/:path*",
  ],
};
