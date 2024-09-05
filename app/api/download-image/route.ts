import { NextRequest } from "next/server";

/**
 * Image Download Redirect API Route
 * 
 * This route handles redirecting the user to download an image directly from the OpenAI URL:
 * - Accepts an image URL as a query parameter
 * - Validates the URL 
 * - Redirects the user to the image URL for direct download
 * - No server-side storage required
 * - Error handling for invalid requests
 */

export async function GET(req: NextRequest) {
  const imageUrl = req.nextUrl.searchParams.get("url");

  if (!imageUrl) {
    return new Response(JSON.stringify({ error: "Image URL is required" }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    const arrayBuffer = await response.arrayBuffer();
    
    return new Response(arrayBuffer, {
      headers: {
        'Content-Type': contentType || 'image/png',
        'Content-Disposition': `attachment; filename="generated-image-${Date.now()}.png"`,
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error("Error processing image URL:", error);
    const errorMessage = (error instanceof Error) ? error.message : "Failed to process image";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
