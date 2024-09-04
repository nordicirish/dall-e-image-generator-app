import React from "react";
import ButtonGroup from "./button-group";
import { formatTitle } from "@/utils";

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
            isDisabled={isLoading} // disable the button group when the image is loading to stop the user from clicking on the buttons
          />
        </fieldset>
      ))}
    </div>
  );
};

export default OptionsSelector;
