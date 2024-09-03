import React from "react";
import { formatTitle } from "@/utils";

interface ButtonGroupProps {
  title: string;
  options: string[];
  selectedOption: string;
  onOptionClick: (option: string) => void;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  title,
  options,
  selectedOption,
  onOptionClick,
}) => {
  return (
    <div className="mt-4">
      <p className="text-sm font-medium text-white mb-2">
        {formatTitle(title)}:
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((option, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onOptionClick(option)}
            className={`px-3 py-1 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200 ${
              selectedOption === option
                ? "bg-white text-indigo-700 font-semibold border-2 border-indigo-300"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ButtonGroup;
