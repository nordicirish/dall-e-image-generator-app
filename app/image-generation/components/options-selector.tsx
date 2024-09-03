import React from "react";
import ButtonGroup from "./button-group";

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
    <>
      {Object.entries(options).map(([category, options]) => (
        <ButtonGroup
          key={category}
          title={category}
          options={options}
          selectedOption={selectedOptions[category] || ""}
          onOptionClick={(option: string) => onOptionClick(category, option)}
        />
      ))}
    </>
  );
};

export default OptionsSelector;
