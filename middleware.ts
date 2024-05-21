import { defaultLocale, getLocale, locales } from "./lib/i18n";

import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // adapt clerk endpoint
  if (pathname.startsWith("/api")) return;

  // If the system language is different from the default language,
  // redirect to the system language
  if (pathname === "/") {
    const systemLocale = getLocale({
      "accept-language": request.headers.get("accept-language") as string,
    });

    if (systemLocale !== defaultLocale) {
      request.nextUrl.pathname = `/${systemLocale}`;
      return Response.redirect(request.nextUrl);
    }
  }

  const isExit = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (isExit) return;

  request.nextUrl.pathname = `/`;
  return Response.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next)(?!.*\\.(?:ico|png|svg|jpg|jpeg|xml|txt)$)(?!/api).*)"],
};
