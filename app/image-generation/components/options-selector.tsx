import React from "react";
import { formatTitle } from "@/lib/utils";

interface OptionsSelectorProps {
  options: Record<string, string[]>;
  selectedOptions: Record<string, string>;
  onOptionClick: (category: string, option: string) => void;
  isLoading: boolean;
}

const OptionsSelector: React.FC<OptionsSelectorProps> = ({
  options,
  selectedOptions,
  onOptionClick,
  isLoading,
}) => {
  return (
    <div className="space-y-6">
      {Object.entries(options).map(([category, categoryOptions]) => (
        <fieldset
          key={category}
          className="border border-indigo-300 rounded-md pt-2 pb-4 flex flex-col items-center"
        >
          <legend className="text-lg font-semibold text-white px-2">
            {formatTitle(category)}
          </legend>

          <div className="flex w-full justify-center flex-wrap gap-2 px-2">
            {categoryOptions.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => onOptionClick(category, option)}
                disabled={isLoading}
                className={`px-3 py-1 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200 ${
                  selectedOptions[category] === option
                    ? "bg-white text-indigo-700 font-semibold border-2 border-indigo-300"
                    : "bg-indigo-600 text-white hover:bg-indigo-700 border-2 border-transparent"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {option}
              </button>
            ))}
          </div>
        </fieldset>
      ))}
    </div>
  );
};

export default OptionsSelector;
