import { NextResponse } from 'next/server';

const VALID_SIZES = ['1024x1024', '768x1344', '1344x768', '1152x864', '1440x720'] as const;
type ValidSize = (typeof VALID_SIZES)[number];

// Map size string to width/height for HuggingFace
function parseSize(size: string): { width: number; height: number } {
  const [w, h] = size.split('x').map(Number);
  return { width: w, height: h };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, size } = body as { prompt?: string; size?: string };

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

    const resolvedSize: ValidSize = VALID_SIZES.includes(size as ValidSize)
      ? (size as ValidSize)
      : '1024x1024';

    const { width, height } = parseSize(resolvedSize);

    const hfToken = process.env.HUGGINGFACE_API_TOKEN;
    if (!hfToken) {
      return NextResponse.json(
        { success: false, error: 'Image generation is not configured.' },
        { status: 503 }
      );
    }

    // Use SDXL via HuggingFace Inference API
    const hfRes = await fetch(
      'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${hfToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: prompt.trim(),
          parameters: { width, height },
        }),
      }
    );

    if (!hfRes.ok) {
      const errText = await hfRes.text();
      // Model may be loading (503) — inform the user to retry
      if (hfRes.status === 503) {
        return NextResponse.json(
          { success: false, error: 'Model is loading, please try again in 20 seconds.' },
          { status: 503 }
        );
      }
      console.error('HuggingFace error:', errText);
      return NextResponse.json(
        { success: false, error: 'Image generation failed. Please try again.' },
        { status: 500 }
      );
    }

    const imageBuffer = await hfRes.arrayBuffer();
    const base64 = Buffer.from(imageBuffer).toString('base64');

    return NextResponse.json({
      success: true,
      image: base64,
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
