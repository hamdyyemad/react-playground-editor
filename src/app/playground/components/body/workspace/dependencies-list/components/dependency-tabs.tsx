import { Package, Globe, Zap } from "lucide-react";

interface DependencyTabsProps {
  activeTab: "used" | "available" | "suggested";
  usedCount: number;
  availableCount: number;
  suggestedCount: number;
  onTabChange: (tab: "used" | "available" | "suggested") => void;
}

export function DependencyTabs({
  activeTab,
  usedCount,
  availableCount,
  suggestedCount,
  onTabChange,
}: DependencyTabsProps) {
  return (
    <div className="flex border-b border-gray-700">
      <button
        onClick={() => onTabChange("used")}
        className={`flex-1 px-3 py-2 text-xs font-medium transition-colors ${
          activeTab === "used"
            ? "text-white bg-gray-700 border-b-2 border-green-500"
            : "text-gray-400 hover:text-white hover:bg-gray-800"
        }`}
      >
        <div className="flex items-center justify-center gap-1">
          <Zap className="w-3 h-3" />
          Used ({usedCount})
        </div>
      </button>
      <button
        onClick={() => onTabChange("available")}
        className={`flex-1 px-3 py-2 text-xs font-medium transition-colors ${
          activeTab === "available"
            ? "text-white bg-gray-700 border-b-2 border-blue-500"
            : "text-gray-400 hover:text-white hover:bg-gray-800"
        }`}
      >
        <div className="flex items-center justify-center gap-1">
          <Globe className="w-3 h-3" />
          CDN ({availableCount})
        </div>
      </button>
      <button
        onClick={() => onTabChange("suggested")}
        className={`flex-1 px-3 py-2 text-xs font-medium transition-colors ${
          activeTab === "suggested"
            ? "text-white bg-gray-700 border-b-2 border-yellow-500"
            : "text-gray-400 hover:text-white hover:bg-gray-800"
        }`}
      >
        <div className="flex items-center justify-center gap-1">
          <Package className="w-3 h-3" />
          Suggested ({suggestedCount})
        </div>
      </button>
    </div>
  );
}
