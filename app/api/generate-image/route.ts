import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define the schema for input validation
const generateImageSchema = z.object({
  prompt: z
    .string()
    .min(1, "Prompt is required")
    .max(1000, "Prompt is too long"),
  model: z
    .enum(["dall-e-2", "dall-e-3"])
    .refine((value) => value !== undefined, {
      message: "Invalid model selected",
    }),
});

export const runtime = "edge"; // Specify that this function should run on the Edge runtime to prevent timeouts

export async function POST(req: NextRequest) {
  // Specify the type for 'req'
  try {
    const { prompt, model } = await req.json();

    // Validate input using the schema
    const validatedInput = generateImageSchema.parse({ prompt, model });

    // Use OpenAI API for making requests
    const response = await openai.images.generate({
      model: validatedInput.model,
      prompt: validatedInput.prompt,
      n: 1,
      size: "1024x1024",
    });

    return NextResponse.json({
      success: true,
      imageUrl: response.data[0].url,
    });
  } catch (error: any) {
    // Specify the type for 'error'
    console.error("Error generating image:", error);
    let errorMessage = "Failed to generate image";
    if (error instanceof z.ZodError) {
      errorMessage = error.errors.map((err) => err.message).join(", ");
    } else if (
      error.error &&
      error.error.code === "billing_hard_limit_reached"
    ) {
      errorMessage = "Billing limit reached.";
    }
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 400 }
    );
  }
}
