import { NextRequest, NextResponse } from 'next/server';
import { auth0 } from '@/lib/auth0';

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5256/api';

interface ProxyParams {
  params: Promise<{ path: string[] }>;
}

async function proxyHandler(request: NextRequest, { params }: ProxyParams) {
  try {
    const { path } = await params;

    // 1. Get access token
    const tokenResponse = await auth0.getAccessToken();

    if (!tokenResponse || !tokenResponse.token) {
      return NextResponse.json(
        { error: 'Not authenticated or missing access token.' },
        { status: 401, headers: { 'X-Proxy-Auth': 'Missing' } }
      );
    }

    const accessToken = tokenResponse.token;

    // 2. Construct target URL
    const relativePath = path.join('/');
    const baseUrl = BACKEND_BASE_URL.endsWith('/')
      ? BACKEND_BASE_URL.slice(0, -1)
      : BACKEND_BASE_URL;
    const targetUrl = new URL(`${baseUrl}/${relativePath}`);
    targetUrl.search = request.nextUrl.search;

    // 3. Prepare body
    const method = request.method;
    const body =
      method !== 'GET' && method !== 'HEAD' ? await request.blob() : undefined;

    // 4. Prepare headers
    const headers = new Headers();
    headers.set('Authorization', `Bearer ${accessToken}`);
    const contentType = request.headers.get('Content-Type');
    if (contentType) headers.set('Content-Type', contentType);

    // 5. Send request
    try {
        console.log(accessToken)
      const backendRes = await fetch(targetUrl.toString(), {
        method,
        headers,
        body,
        cache: 'no-store'
      });

      return new NextResponse(backendRes.body, {
        status: backendRes.status,
        headers: backendRes.headers
      });
    } catch (fetchError) {
      // fetchError can be unknown
      const message =
        fetchError instanceof Error
          ? fetchError.message
          : 'Unknown error connecting to backend';
      console.error(`Failed to connect to backend at ${targetUrl}:`, message);

      return NextResponse.json(
        { error: `Backend Connection Failed: ${message}` },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error('Proxy Error:', err);

    if (err instanceof Error) {
      const code = (err as { code?: string }).code;

      if (code === 'ERR_MISSING_SESSION' || err.message.includes('not authenticated')) {
        return NextResponse.json(
          { error: 'Not authenticated' },
          { status: 401, headers: { 'X-Proxy-Auth': 'Missing' } }
        );
      }

      return NextResponse.json(
        { error: `Internal Proxy Error: ${err.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal Proxy Error: Unknown error' },
      { status: 500 }
    );
  }
}

export const GET = proxyHandler;
export const POST = proxyHandler;
export const PUT = proxyHandler;
export const DELETE = proxyHandler;
export const PATCH = proxyHandler;
