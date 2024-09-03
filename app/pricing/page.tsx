"use client";
import { useState } from "react";
import { pricingPlans } from "../data";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  const togglePricing = () => {
    setIsAnnual(!isAnnual);
  };

  return (
    <main className="flex flex-col items-center justify-start px-8 py-12 min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-4xl font-bold mb-8">Pricing</h1>
      <div className="flex items-center mb-8">
        <span className="mr-2">Monthly</span>
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            className="sr-only"
            checked={isAnnual}
            onChange={togglePricing}
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:bg-blue-600">
            <div className={`transform transition duration-300 ease-in-out absolute top-0.5 bg-white border-gray-300 border rounded-full h-5 w-5 ${isAnnual ? 'right-1' : 'left-1'}`}></div>
          </div>
        </label>
        <span className="ml-2">Annual</span>
      </div>
      <div className="grid gap-8 lg:grid-cols-3 justify-items-stretch">
        {pricingPlans.map((plan) => (
          <div
            key={plan.name}
            className="p-6 bg-white text-black rounded-lg shadow-lg text-center flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl font-bold mb-4">{plan.name}</h2>
              <p className="text-4xl font-bold mb-4">
                ${isAnnual ? plan.priceAnnual : plan.priceMonthly}
                <span className="text-lg">/{isAnnual ? "year" : "month"}</span>
              </p>
              <ul className="mb-4">
                {plan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded">
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
