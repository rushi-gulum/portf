import ZAI from 'z-ai-web-dev-sdk';
import { NextResponse } from 'next/server';

const VALID_SIZES = ['1024x1024', '768x1344', '1344x768', '1152x864', '1440x720'] as const;
type ValidSize = (typeof VALID_SIZES)[number];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, size } = body as { prompt?: string; size?: string };

    // Validate prompt
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Prompt is required and cannot be empty.' },
        { status: 400 }
      );
    }

    if (prompt.length > 500) {
      return NextResponse.json(
        { success: false, error: 'Prompt must be under 500 characters.' },
        { status: 400 }
      );
    }

    // Validate and default size
    const resolvedSize: ValidSize = VALID_SIZES.includes(size as ValidSize)
      ? (size as ValidSize)
      : '1024x1024';

    // Generate image using z-ai-web-dev-sdk
    const zai = await ZAI.create();
    const response = await zai.images.generations.create({
      prompt: prompt.trim(),
      size: resolvedSize,
    });

    const imageBase64 = response.data[0].base64;

    return NextResponse.json({
      success: true,
      image: imageBase64,
      prompt: prompt.trim(),
      size: resolvedSize,
    });
  } catch (error) {
    console.error('Image generation error:', error);
    const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return NextResponse.json(
      { success: false, error: `Image generation failed: ${message}` },
      { status: 500 }
    );
  }
}