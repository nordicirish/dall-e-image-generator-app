import React from "react";
import ButtonGroup from "./button-group";
import { formatTitle } from "@/utils";

interface OptionsSelectorProps {
  options: Record<string, string[]>;
  selectedOptions: Record<string, string>;
  onOptionClick: (category: string, option: string) => void;
}

const OptionsSelector: React.FC<OptionsSelectorProps> = ({
  options,
  selectedOptions,
  onOptionClick,
}) => {
  return (
    <div className="space-y-6">
      {Object.entries(options).map(([category, options]) => (
        <fieldset
          key={category}
          className="border border-indigo-300 rounded-md pt-2 pb-4 flex flex-col items-center"
        >
          <legend className="text-lg font-semibold text-white px-2">
            {formatTitle(category)}
          </legend>

          <ButtonGroup
            options={options}
            selectedOption={selectedOptions[category] || ""}
            onOptionClick={(option: string) => onOptionClick(category, option)}
          />
        </fieldset>
      ))}
    </div>
  );
};

export default OptionsSelector;
