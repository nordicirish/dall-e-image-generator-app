import { NextRequest, NextResponse } from "next/server";

// In-memory storage for images
const imageStore = new Map<string, { buffer: Buffer; timestamp: number }>();

// Cleanup configuration
const CLEANUP_INTERVAL = 5 * 60 * 1000; // 5 minutes
const IMAGE_EXPIRY = 24 * 60 * 60 * 1000; // 24hours

// Cleanup function
function cleanupImages() {
  const now = Date.now();
  imageStore.forEach(({ timestamp }, id) => {
    if (now - timestamp > IMAGE_EXPIRY) {
      imageStore.delete(id);
    }
  });
}

// Start the cleanup interval
setInterval(cleanupImages, CLEANUP_INTERVAL);

export async function GET(req: NextRequest) {
  const imageUrl = req.nextUrl.searchParams.get("url");
  const imageId = req.nextUrl.searchParams.get("id");

  if (!imageUrl && !imageId) {
    return NextResponse.json(
      { error: "Image URL or ID is required" },
      { status: 400 }
    );
  }

  try {
    let imageBuffer: Buffer;
    let contentType: string | null = "image/png";

    if (imageId && imageStore.has(imageId)) {
      // Retrieve image from memory
      const storedImage = imageStore.get(imageId)!;
      imageBuffer = storedImage.buffer;
      // Update timestamp to keep the image "fresh"
      storedImage.timestamp = Date.now();
    } else if (imageUrl) {
      // Fetch and store image
      const response = await fetch(imageUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }

      contentType = response.headers.get("content-type");
      const arrayBuffer = await response.arrayBuffer();
      imageBuffer = Buffer.from(arrayBuffer);

      // Generate a unique ID and store the image
      const newImageId = Date.now().toString();
      imageStore.set(newImageId, {
        buffer: imageBuffer,
        timestamp: Date.now(),
      });

      // Return the ID to the client
      return NextResponse.json({ id: newImageId });
    } else {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Serve the image
    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": contentType || "image/png",
        "Content-Disposition": `attachment; filename="generated-image-${Date.now()}.png"`,
      },
    });
  } catch (error) {
    console.error("Error processing image:", error);
    return NextResponse.json(
      { error: "Failed to process image" },
      { status: 500 }
    );
  }
}
