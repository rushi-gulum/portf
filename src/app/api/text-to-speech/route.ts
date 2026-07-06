import ZAI from 'z-ai-web-dev-sdk';
import { NextResponse } from 'next/server';

const VALID_VOICES = ['tongtong', 'chuichui', 'xiaochen', 'jam', 'kazi', 'douji', 'luodo'] as const;
type ValidVoice = (typeof VALID_VOICES)[number];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text, voice, speed } = body as { text?: string; voice?: string; speed?: number };

    // Validate text
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Text is required and cannot be empty.' },
        { status: 400 }
      );
    }

    if (text.length > 1024) {
      return NextResponse.json(
        { error: 'Text must be under 1024 characters.' },
        { status: 400 }
      );
    }

    // Validate and default voice
    const resolvedVoice: ValidVoice = VALID_VOICES.includes(voice as ValidVoice)
      ? (voice as ValidVoice)
      : 'tongtong';

    // Validate and default speed
    const resolvedSpeed = typeof speed === 'number' ? speed : 1.0;
    if (resolvedSpeed < 0.5 || resolvedSpeed > 2.0) {
      return NextResponse.json(
        { error: 'Speed must be between 0.5 and 2.0.' },
        { status: 400 }
      );
    }

    // Generate audio using z-ai-web-dev-sdk
    const zai = await ZAI.create();
    const response = await zai.audio.tts.create({
      input: text.trim(),
      voice: resolvedVoice,
      speed: resolvedSpeed,
      response_format: 'wav',
      stream: false,
    });

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(new Uint8Array(arrayBuffer));

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/wav',
        'Content-Length': buffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('TTS error:', error);
    const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return NextResponse.json(
      { error: `Text-to-speech failed: ${message}` },
      { status: 500 }
    );
  }
}