import { useState } from "react";

interface ToggleSwitchProps {
  trueLabel?: string;
  falseLabel?: string;
  onToggle?: (value: boolean) => void;
}

export const ToggleSwitch = ({
  trueLabel = "Andy",
  falseLabel = "Anonymous",
  onToggle = () => {},
}: ToggleSwitchProps) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = (value: boolean) => {
    setIsToggled(value);
    if (onToggle) {
      onToggle?.(value);
    }
  };

  return (
    <div className="flex items-center space-x-2 w-full max-w-xs">
      <div className="flex w-full space-x-2">
        <button
          onClick={() => handleToggle(true)}
          className={`
            flex-1 
            px-4 
            py-2 
            rounded-lg 
            transition-all 
            duration-200 
            ${
              isToggled
                ? "bg-green-500 text-white"
                : "bg-white text-gray-500 border border-gray-300"
            }
          `}
        >
          {trueLabel}
        </button>
        <button
          onClick={() => handleToggle(false)}
          className={`
            flex-1 
            px-4 
            py-2 
            rounded-lg 
            transition-all 
            duration-200 
            ${
              !isToggled
                ? "bg-gray-700 text-white"
                : "bg-white text-gray-500 border border-gray-300"
            }
          `}
        >
          {falseLabel}
        </button>
      </div>
    </div>
  );
};
