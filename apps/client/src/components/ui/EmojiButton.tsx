import { useState, useRef, useEffect } from "react";
import { SmileIcon } from "lucide-react";
import { Tag } from "./Tag";

interface EmojiButtonProps {
  onClick?: (emoji: string) => void;
  size?: "sm" | "md";
  tooltip?: string;
  disabled?: boolean;
}

const emojiList = ["👍", "❤️", "😂", "😮", "😢", "🔥"];

export const EmojiButton = ({
  onClick,
  size = "sm",
  tooltip = "React",
  disabled = false,
}: EmojiButtonProps) => {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block">
      <Tag
        onClick={() => {
          if (disabled) return;
          setShowPopup(!showPopup);
        }}
        size={size}
        tooltip={tooltip}
      >
        <SmileIcon className="size-4" />
      </Tag>

      {showPopup && (
        <div
          ref={popupRef}
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-fit bg-base-muted border border-base-border shadow-lg rounded-lg p-2 flex gap-2"
        >
          {emojiList.map((emoji) => (
            <button
              key={emoji}
              onClick={() => {
                if (disabled) return;
                setShowPopup(false);
                if (onClick) onClick(emoji);
              }}
              className="text-lg hover:scale-110 transition-transform"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
