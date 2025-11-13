import { auth0 } from '@/lib/auth0';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await auth0.getSession();
    if (!session || !session.tokenSet?.accessToken) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Get the Auth0 access token
    const accessToken = session.tokenSet.accessToken;

    // Call your backend securely
    const backendRes = await fetch('http://localhost:5256/api/projects', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!backendRes.ok) {
      const text = await backendRes.text();
      return NextResponse.json(
        { error: `Backend error: HTTP ${backendRes.status} (${text})` },
        { status: backendRes.status }
      );
    }

    const data = await backendRes.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: `Unexpected error: ${err.message}` },
      { status: 500 }
    );
  }
}
