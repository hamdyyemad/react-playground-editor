import { Package, ExternalLink, Trash2, Globe, Code } from "lucide-react";

interface Dependency {
  name: string;
  version: string;
  type: "dependency" | "devDependency";
  used: boolean;
  importType?: "import" | "require" | "cdn" | "global";
  source?: string;
}

interface DependencyItemProps {
  dependency: Dependency;
  showActions?: boolean;
  onUninstall?: (packageName: string) => void;
}

export function DependencyItem({
  dependency,
  showActions = true,
  onUninstall,
}: DependencyItemProps) {
  const getImportTypeIcon = (importType?: string) => {
    switch (importType) {
      case "cdn":
        return <Globe className="w-2.5 h-2.5 text-blue-400" />;
      case "global":
        return <Code className="w-2.5 h-2.5 text-green-400" />;
      case "import":
      case "require":
        return <Package className="w-2.5 h-2.5 text-yellow-400" />;
      default:
        return <Package className="w-2.5 h-2.5 text-gray-400" />;
    }
  };

  const handleViewOnNpm = () => {
    window.open(`https://www.npmjs.com/package/${dependency.name}`, "_blank");
  };

  const handleUninstall = () => {
    if (onUninstall) {
      onUninstall(dependency.name);
    }
  };

  return (
    <div className="group flex items-center justify-between px-2 py-1.5 rounded hover:bg-gray-700 transition-colors">
      <div className="flex-1 min-w-0 flex items-center gap-2">
        {getImportTypeIcon(dependency.importType)}
        <div className="flex-1 min-w-0">
          <div className="text-xs font-medium text-gray-300 truncate">
            {dependency.name}
          </div>
          <div className="text-[10px] text-gray-400">{dependency.version}</div>
        </div>
      </div>
      {showActions && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleViewOnNpm}
            className="p-0.5 hover:bg-gray-600 rounded"
            title="View on npm"
          >
            <ExternalLink className="w-2.5 h-2.5 text-gray-400" />
          </button>
          {dependency.importType !== "cdn" && onUninstall && (
            <button
              onClick={handleUninstall}
              className="p-0.5 hover:bg-red-600 rounded"
              title="Remove package"
            >
              <Trash2 className="w-2.5 h-2.5 text-red-400" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
