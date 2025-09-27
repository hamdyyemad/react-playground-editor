import { ReactNode } from "react";

interface ToggleButtonProps {
  isActive: boolean;
  onToggle: () => void;
  icon: ReactNode;
  tooltip: string;
  keyboardShortcut?: string;
  className?: string;
}

export function ToggleButton({
  isActive,
  onToggle,
  icon,
  tooltip,
  keyboardShortcut,
  className = "",
}: ToggleButtonProps) {
  return (
    <div className="relative group">
      <button
        onClick={onToggle}
        className={`p-2 rounded hover:bg-gray-700 transition-colors cursor-pointer ${className} ${
          isActive ? "text-white" : "text-gray-400"
        }`}
      >
        {icon}
      </button>

      {/* Tooltip - positioned to appear below the button to avoid header clipping */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap z-[9999] opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none">
        {tooltip}
        {keyboardShortcut && (
          <div className="text-gray-400 text-xs mt-0.5">{keyboardShortcut}</div>
        )}
        {/* Tooltip arrow pointing up */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
      </div>
    </div>
  );
}
