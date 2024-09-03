"use server";

import OpenAI from "openai";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Correctly set the API key
});

// Log the API key (ensure this is done securely)
console.log('OpenAI API Key:', process.env.OPENAI_API_KEY); 

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

export async function generateImage(prompt: string, model: string) {
  try {
    const response = await openai.images.generate({
      model: model,
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    return { 
      success: true, 
      imageUrl: response.data[0].url 
    };
  } catch (error: any) {
    console.error('Error generating image:', error);
    let errorMessage = 'Failed to generate image';
    if (error.error && error.error.code === 'billing_hard_limit_reached') {
      errorMessage = 'Billing limit reached.';
    }
    return { 
      success: false, 
      error: errorMessage
    };
  }
}
