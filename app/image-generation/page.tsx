"use client";
import React, { useState } from "react";
import Image from "next/image";
import { imageGenerationOptions } from "../data";
import OptionsSelector from "./components/options-selector";
import { formatSelectedOptions } from "@/utils";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function ImageGeneration() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [model, setModel] = useState("dall-e-2");
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});

  const handleOptionClick = (category: string, option: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [category]: prev[category] === option ? "" : option,
    }));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const fullPrompt = `${prompt} ${Object.entries(selectedOptions)
      .filter(([_, value]) => value)
      .map(([category, value]) => `${value} ${category}`)
      .join(", ")}`.trim();

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: fullPrompt, model }),
      });

      const result = await response.json();

      if (result.success) {
        setImageUrl(result.imageUrl || "");
      } else {
        setError(result.error || "Failed to generate image");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  const router = useRouter();

  const handleDownload = async () => {
    if (imageUrl) {
      try {
        // First, send the image URL to be stored server-side
        const encodedUrl = encodeURIComponent(imageUrl);
        const storeResponse = await fetch(`/api/download-image?url=${encodedUrl}`);
        const { id } = await storeResponse.json();

        if (id) {
          // Now download the image using the returned ID
          const downloadUrl = `/api/download-image?id=${id}`;
          window.location.href = downloadUrl;
        } else {
          console.error('Failed to store image');
        }
      } catch (error) {
        console.error('Error initiating download:', error);
      }
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-12 flex flex-col items-center justify-start">
      <h1 className="text-4xl font-bold mb-8 text-center">Image Generation</h1>
      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
        {/* Left side - Prompt input */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="prompt"
                className="block text-sm font-medium text-white"
              >
                Enter your prompt
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="mt-1 block w-full border border-purple-300 rounded-md shadow-sm p-2 text-white bg-indigo-700 bg-opacity-50 placeholder-indigo-200 focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                rows={4}
                placeholder="Describe the image you want to generate..."
              />
            </div>
            <div>
              <label
                htmlFor="model"
                className="block text-sm font-medium text-white"
              >
                Select Model
              </label>
              <select
                id="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="mt-1 block w-full border border-purple-300 rounded-md shadow-sm p-2 text-white bg-indigo-700 bg-opacity-50 focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
              >
                <option value="dall-e-2">DALL-E 2</option>
                <option value="dall-e-3">DALL-E 3</option>
              </select>
            </div>
            <OptionsSelector
              options={imageGenerationOptions}
              selectedOptions={selectedOptions}
              onOptionClick={handleOptionClick}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 disabled:bg-gray-400 transition duration-300"
            >
              {isLoading ? (
                <span className="opacity-50">Generating...</span>
              ) : (
                "Generate Image"
              )}
            </button>
          </form>
          {error && <p className="text-red-300 mt-4">{error}</p>}
        </div>

        {/* Right side - Generated image */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg p-6">
          {isLoading ? (
            <>
              <h2 className="text-2xl font-bold mb-4 text-white">
                Image is generating...
              </h2>
              <div className="border-2 border-dashed border-purple-300 rounded-lg h-64 flex items-center justify-center">
                <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-white"></div>
              </div>
            </>
          ) : imageUrl ? (
            <>
              <h2 className="text-2xl font-bold mb-4 text-white">
                Generated Image
              </h2>
              <Image
                src={imageUrl}
                alt={`Generated image of a ${prompt}. ${formatSelectedOptions(
                  selectedOptions
                )}`}
                width={500}
                height={500}
                layout="responsive"
              />
              <p className="text-sm text-white mt-2 capitalize">
                Generated image: {prompt}
                <br />
                {formatSelectedOptions(selectedOptions)}
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4 text-white">
                Generated Image
              </h2>
              <div className="border-2 border-dashed border-purple-300 rounded-lg h-64 flex items-center justify-center text-purple-200">
                No image generated yet
              </div>
            </>
          )}
          {imageUrl && (
            <div className="mt-4">
              <button
                onClick={handleDownload}
                className="inline-block bg-white text-indigo-700 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-100 transition-colors duration-200"
              >
                Download Image
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

