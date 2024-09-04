import React from "react";


interface ButtonGroupProps {
  options: string[];
  selectedOption: string;
  onOptionClick: (option: string) => void;
  isDisabled: boolean; 
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  options,
  selectedOption,
  onOptionClick,
  isDisabled, 
}) => {
  return (
    <div className="flex w-full justify-center flex-wrap gap-2 px-2">
      {options.map((option, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onOptionClick(option)}
          disabled={isDisabled} // Add this line
          className={`px-3 py-1 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200 ${
            selectedOption === option
              ? "bg-white text-indigo-700 font-semibold border-2 border-indigo-300"
              : "bg-indigo-600 text-white hover:bg-indigo-700 border-2 border-transparent"
          } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`} // Modify this line
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
