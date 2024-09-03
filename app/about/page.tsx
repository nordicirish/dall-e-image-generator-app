"use client";
import React from "react";

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-green-500 to-blue-500 text-white flex flex-col items-center justify-start px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">About Us</h1>
      <p className="text-xl">
        We are a team dedicated to providing innovative solutions. Our mission
        is to deliver high-quality products that enhance the user experience and
        foster creativity.
      </p>
      <p className="text-xl mt-4">
        Founded in 2021, our company has grown rapidly, thanks to our commitment
        to excellence and our passion for technology.
      </p>
    </main>
  );
}
