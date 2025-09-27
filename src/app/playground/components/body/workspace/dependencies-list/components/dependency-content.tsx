import { Package, Plus } from "lucide-react";
import { DependencyItem } from "./dependency-item";

interface Dependency {
  name: string;
  version: string;
  type: "dependency" | "devDependency";
  used: boolean;
  importType?: "import" | "require" | "cdn" | "global";
  source?: string;
}

interface DependencyContentProps {
  activeTab: "used" | "available" | "suggested";
  usedDeps: Dependency[];
  availableCDN: Dependency[];
  suggested: Dependency[];
  onUninstallPackage: (packageName: string) => void;
  onAddSuggestedPackage: (packageName: string) => void;
}

export function DependencyContent({
  activeTab,
  usedDeps,
  availableCDN,
  suggested,
  onUninstallPackage,
  onAddSuggestedPackage,
}: DependencyContentProps) {
  const renderUsedDependencies = () => (
    <div className="space-y-1">
      {usedDeps.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Package className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-xs">No dependencies used yet</p>
          <p className="text-[10px] mt-1">
            Import packages in your code to see them here
          </p>
        </div>
      ) : (
        usedDeps.map((dep) => (
          <DependencyItem
            key={dep.name}
            dependency={dep}
            onUninstall={onUninstallPackage}
          />
        ))
      )}
    </div>
  );

  const renderAvailableCDN = () => (
    <div className="space-y-1">
      <div className="text-[10px] text-gray-500 mb-2 px-2">
        Packages available via CDN in the iframe
      </div>
      {availableCDN.map((dep) => (
        <DependencyItem key={dep.name} dependency={dep} showActions={false} />
      ))}
    </div>
  );

  const renderSuggested = () => (
    <div className="space-y-1">
      <div className="text-[10px] text-gray-500 mb-2 px-2">
        Popular packages you can add to your project
      </div>
      {suggested.map((dep) => (
        <div
          key={dep.name}
          className="group flex items-center justify-between px-2 py-1.5 rounded hover:bg-gray-700 transition-colors"
        >
          <div className="flex-1 min-w-0 flex items-center gap-2">
            <Package className="w-2.5 h-2.5 text-gray-400" />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-gray-300 truncate">
                {dep.name}
              </div>
              <div className="text-[10px] text-gray-400">{dep.version}</div>
            </div>
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onAddSuggestedPackage(dep.name)}
              className="p-0.5 hover:bg-blue-600 rounded"
              title="Add to project"
            >
              <Plus className="w-2.5 h-2.5 text-blue-400" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto p-2">
      {activeTab === "used" && renderUsedDependencies()}
      {activeTab === "available" && renderAvailableCDN()}
      {activeTab === "suggested" && renderSuggested()}
    </div>
  );
}
