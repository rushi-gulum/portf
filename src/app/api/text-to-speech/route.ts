import { NextResponse } from 'next/server';

// Text-to-speech is now handled client-side via the Web Speech API.
// This route is kept for backwards compatibility but is no longer used.
export async function POST() {
  return NextResponse.json(
    { error: 'This endpoint is deprecated. TTS is handled client-side.' },
    { status: 410 }
  );
}
