import { Settings } from "lucide-react";

export function SettingsDrawer() {
  return (
    <button className="cursor-pointer p-2 rounded hover:bg-gray-700 transition-colors text-gray-400 hover:text-white">
      <Settings className="w-4 h-4" />
    </button>
  );
}
