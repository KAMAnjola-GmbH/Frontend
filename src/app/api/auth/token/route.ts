import { NextResponse } from 'next/server';
import { auth0 } from '@/lib/auth0';

/**
 * Returns the access token for SignalR connections.
 * This is needed because SignalR requires the token at connection time.
 */
export async function GET() {
  try {
    const tokenResponse = await auth0.getAccessToken();

    if (!tokenResponse || !tokenResponse.token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Return the full response - frontend expects 'token' field
    return NextResponse.json(tokenResponse);
  } catch (err) {
    console.error('[Token API] Error:', err);

    if (err instanceof Error) {
      const code = (err as { code?: string }).code;
      if (code === 'ERR_MISSING_SESSION' || err.message.includes('not authenticated')) {
        return NextResponse.json(
          { error: 'Not authenticated' },
          { status: 401 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to get access token' },
      { status: 500 }
    );
  }
}
