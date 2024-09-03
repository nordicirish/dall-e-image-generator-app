"use client";
import React, { useState } from "react";
import { submitContact } from "./actions";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let valid = true;
    let errors = { name: "", email: "", message: "" };

    if (!formData.name) {
      errors.name = "Name is required";
      valid = false;
    }
    if (!formData.email) {
      errors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
      valid = false;
    }
    if (!formData.message) {
      errors.message = "Message is required";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const result = await submitContact(formData);
      if (result.success) {
        alert(result.message);
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert(result.error || "Failed to send message.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("An error occurred. Please try again.");
    }
  };
  ;

  return (
    <main className="p-4 min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 text-white flex flex-col items-center justify-start px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-gradient-to-br from-purple-600 to-pink-600 p-8 rounded-lg shadow-lg text-white"
      >
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border border-purple-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent bg-white bg-opacity-90"
          />
          {errors.name && (
            <p className="text-red-300 text-xs italic mt-1">{errors.name}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border border-purple-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent bg-white bg-opacity-90"
          />
          {errors.email && (
            <p className="text-red-300 text-xs italic mt-1">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="shadow appearance-none border border-purple-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent bg-white bg-opacity-90 h-32"
          />
          {errors.message && (
            <p className="text-red-300 text-xs italic mt-1">{errors.message}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
          >
            Send Message
          </button>
        </div>
      </form>
    </main>
  );
}
