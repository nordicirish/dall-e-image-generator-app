"use client";
import React, { useState } from "react";
import Image from "next/image";
import { imageGenerationOptions } from "../data";
import OptionsSelector from "./components/options-selector";
import { formatSelectedOptions } from "@/utils";

export default function ImageGeneration() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [model, setModel] = useState("dall-e-2");
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const [lastUsedOptions, setLastUsedOptions] = useState<
    Record<string, string>
  >({});
  // State to track if the image has loaded and
  const [imageLoaded, setImageLoaded] = useState(false);

  // If the clicked option is already selected, deselect it.
  // If a different option is clicked, it selects the new option for that category.
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

    // Store the current selectedOptions before clearing them
    // Used to display the last used options in the image generation text
    setLastUsedOptions({ ...selectedOptions });

    // Construct the full prompt by combining the user's input with selected options
    // Filter out empty options, format each as "value  + category", and join with commas
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
      // Clear the selected options after generating the image
      setSelectedOptions({});
    }
  }

  const handleDownload = async () => {
    if (imageUrl) {
      try {
        // First, send the image URL to be stored server-side
        const encodedUrl = encodeURIComponent(imageUrl);
        const storeResponse = await fetch(
          `/api/download-image?url=${encodedUrl}`
        );
        const { id } = await storeResponse.json();

        if (id) {
          // Now download the image using the returned ID
          const downloadUrl = `/api/download-image?id=${id}`;
          window.location.href = downloadUrl;
        } else {
          console.error("Failed to store image");
        }
      } catch (error) {
        console.error("Error initiating download:", error);
      }
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-12 flex flex-col items-center justify-start">
      <h1 className="text-4xl font-bold mb-8 text-center">Image Generation</h1>
      <div className="w-full max-w-6xl mx-auto mb-8 rounded-lg shadow-lg p-6 bg-transparent/5">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>
              <h2 className="text-2xl font-bold mb-4 text-white">
                Enter your prompt
              </h2>
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="mt-1 block w-full border border-purple-300 rounded-md shadow-sm p-2 text-white bg-transparent/5 placeholder-indigo-100 focus:ring-2 focus:ring-indigo-400 focus:border-transparent "
              rows={1}
              placeholder="Describe the image you want to generate..."
            />
          </div>
        </form>
        {error && <p className="text-red-300 mt-4">{error}</p>}
      </div>
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl mx-auto">
        {/* Left side - Generated image */}

        <div className="w-full lg:w-1/2 bg-transparent/5 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-white">
            AI Image Generation
          </h2>
          <div className="mb-4">
            <label
              htmlFor="model"
              className="block text-sm font-medium text-white mb-2"
            >
              Select Model
            </label>
            <select
              id="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="block w-full border border-purple-300 rounded-md shadow-sm p-2 text-white bg-indigo-700 bg-opacity-50 focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
            >
              <option value="dall-e-2">DALL-E 2</option>
              <option value="dall-e-3">DALL-E 3</option>
            </select>
          </div>
          <button
            onClick={(e) =>
              handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
            }
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 disabled:bg-gray-400 transition duration-300 mb-4"
          >
            {isLoading ? (
              <span className="opacity-50">Generating...</span>
            ) : (
              "Generate Image"
            )}
          </button>
          {isLoading ? (
            <div className="border-2 border-dashed border-purple-300 rounded-lg h-64 flex items-center justify-center">
              <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : imageUrl ? (
            <>
              <Image
                src={imageUrl}
                alt={`Generated image of a ${prompt}. ${formatSelectedOptions(
                  lastUsedOptions
                )}`}
                width={500}
                height={500}
                layout="responsive"
                // Set imageLoaded to true when the image is loaded
                // used to display the image generation text after the image has loaded
                onLoadingComplete={() => setImageLoaded(true)}
              />
              {imageLoaded && (
                <p className="text-sm text-white mt-2 capitalize">
                  Generated image: {prompt}
                  <br />
                  {formatSelectedOptions(lastUsedOptions)}
                </p>
              )}
            </>
          ) : (
            <div className="border-2 border-dashed border-purple-300 rounded-lg h-64 flex items-center justify-center text-purple-200">
              No image generated yet
            </div>
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

        {/* Right side - Options */}
        <div className="w-full lg:w-1/2 bg-transparent/5  rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-white">More Options</h2>
          <OptionsSelector
            options={imageGenerationOptions}
            selectedOptions={selectedOptions}
            onOptionClick={handleOptionClick}
            isLoading={isLoading} // Add this line
          />
        </div>
      </div>
    </main>
  );
}
