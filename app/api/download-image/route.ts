import { NextRequest, NextResponse } from "next/server";
//nextjs api route to download image from openai url as cors prevents direct download

// In-memory storage for images
const imageStore = new Map<string, Buffer>();

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
      imageBuffer = imageStore.get(imageId)!;
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
      imageStore.set(newImageId, imageBuffer);

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
