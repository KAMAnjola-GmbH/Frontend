import { NextRequest, NextResponse } from 'next/server';
import { auth0 } from '@/lib/auth0'; 

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5256/api';

// FIX: Update type definition to treat params as a Promise
async function proxyHandler(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  try {
    // FIX: Await the params object before using it
    const { path } = await params;

    // 1. Get Access Token using the specialized method for API routes
    const tokenResponse = await auth0.getAccessToken();
    
    if (!tokenResponse || !tokenResponse.token) {
      return NextResponse.json(
        { error: 'Not authenticated or missing access token.' },
        { 
            status: 401,
            headers: { 'X-Proxy-Auth': 'Missing' } 
        }
      );
    }
    
    const accessToken = tokenResponse.token;
    
    // 2. Construct Target URL
    // FIX: Use the awaited 'path' variable here
    const relativePath = path.join('/');
    const baseUrl = BACKEND_BASE_URL.endsWith('/') ? BACKEND_BASE_URL.slice(0, -1) : BACKEND_BASE_URL;
    const targetUrl = new URL(`${baseUrl}/${relativePath}`);
    targetUrl.search = request.nextUrl.search;
    
    // 3. Prepare Body
    const requestMethod = request.method;
    const body = (requestMethod !== 'GET' && requestMethod !== 'HEAD') ? await request.blob() : undefined;

    // 4. Prepare Headers 
    const headers = new Headers();
    headers.set('Authorization', `Bearer ${accessToken}`);
    
    if (request.headers.has('Content-Type')) {
        headers.set('Content-Type', request.headers.get('Content-Type')!);
    }
    
    // 5. Send Request
    try {
        const backendRes = await fetch(targetUrl.toString(), {
            method: requestMethod,
            headers: headers,
            body: body,
            cache: 'no-store',
        });

        // 6. Forward Response
        return new NextResponse(backendRes.body, {
            status: backendRes.status,
            headers: backendRes.headers,
        });
    } catch (fetchError: any) {
        console.error(`Failed to connect to backend at ${targetUrl}:`, fetchError);
        return NextResponse.json(
            { error: `Backend Connection Failed: ${fetchError.message}` },
            { status: 502 } 
        );
    }

  } catch (err: any) {
    console.error('Proxy Error:', err);
    if (err.code === 'ERR_MISSING_SESSION' || err.message?.includes('not authenticated')) {
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
}

export const GET = proxyHandler;
export const POST = proxyHandler;
export const PUT = proxyHandler;
export const DELETE = proxyHandler;
export const PATCH = proxyHandler;