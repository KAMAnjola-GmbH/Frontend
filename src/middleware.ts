import { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { auth0 } from './lib/auth0';
import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip i18n for API routes and Auth0 routes
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/auth/')
  ) {
    return auth0.middleware(request);
  }

  // Apply i18n middleware first
  const intlResponse = intlMiddleware(request);

  // For protected routes, also run Auth0 middleware
  // Auth0 will handle the response appropriately
  const authResponse = await auth0.middleware(request);

  // If Auth0 needs to redirect (e.g., to login), use that response
  if (authResponse && authResponse.status !== 200) {
    return authResponse;
  }

  return intlResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)',  
  ],
};
