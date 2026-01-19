import { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { auth0 } from './lib/auth0';
import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // API routes - only Auth0 middleware, no i18n
  if (pathname.startsWith('/api/')) {
    return auth0.middleware(request);
  }

  // Auth routes - only Auth0 middleware, no i18n
  if (pathname.startsWith('/auth/')) {
    return auth0.middleware(request);
  }

  // All other routes - apply i18n middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - files with extensions (e.g., .png, .jpg, .css, .js)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)',
  ],
};
