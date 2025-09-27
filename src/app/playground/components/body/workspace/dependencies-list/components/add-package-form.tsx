import { X } from "lucide-react";
import { useRef, useEffect } from "react";

interface AddPackageFormProps {
  isVisible: boolean;
  packageName: string;
  isInstalling: boolean;
  onPackageNameChange: (name: string) => void;
  onInstall: () => void;
  onCancel: () => void;
}

export function AddPackageForm({
  isVisible,
  packageName,
  isInstalling,
  onPackageNameChange,
  onInstall,
  onCancel,
}: AddPackageFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when form opens
  useEffect(() => {
    if (isVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isVisible]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onInstall();
    } else if (e.key === "Escape") {
      onCancel();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="mt-2 p-2 bg-gray-800 rounded border border-gray-600 relative">
      <div className="absolute top-0 right-0">
        <button
          onClick={onCancel}
          disabled={isInstalling}
          className="p-1 text-gray-400 hover:text-white rounded transition-colors disabled:opacity-50 flex-shrink-0"
          title="Cancel"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
      <div className="flex items-center gap-1 mt-4">
        <div className="flex flex-col w-6/6 gap-1">
          <input
            ref={inputRef}
            type="text"
            value={packageName}
            onChange={(e) => onPackageNameChange(e.target.value)}
            placeholder="Package name (e.g., lodash)"
            className="flex-1 px-2 py-1 text-xs bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none placeholder-gray-400 min-w-0"
            onKeyDown={handleKeyPress}
            disabled={isInstalling}
          />
          <button
            onClick={onInstall}
            disabled={isInstalling || !packageName.trim()}
            className="mx-auto w-1/2 px-0.25 py-0.25 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
          >
            {isInstalling ? "..." : "Add"}
          </button>
        </div>
      </div>
      <div className="text-[10px] text-gray-500 mt-1">
        <span>Press Enter to add, Escape to cancel</span>
      </div>
    </div>
  );
}
