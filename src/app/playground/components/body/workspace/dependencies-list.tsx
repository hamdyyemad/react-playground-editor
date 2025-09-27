import { Plus } from "lucide-react";
import { useState } from "react";
import { usePackageManagerStore } from "@/stores/package-manager/package-manager-store";
import {
  AddPackageForm,
  DependencyTabs,
  DependencyContent,
} from "./dependencies-list/components";

export function DependenciesList() {
  const {
    installPackage,
    uninstallPackage,
    getUsedDependencies,
    getAvailableCDNPackages,
    getSuggestedPackages,
  } = usePackageManagerStore();

  const [newPackageName, setNewPackageName] = useState("");
  const [isInstalling, setIsInstalling] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "used" | "available" | "suggested"
  >("used");

  const usedDeps = getUsedDependencies();
  const availableCDN = getAvailableCDNPackages();
  const suggested = getSuggestedPackages();

  const handleInstallPackage = async () => {
    if (!newPackageName.trim()) return;

    setIsInstalling(true);
    try {
      await installPackage(newPackageName.trim());
      setNewPackageName("");
      setShowAddForm(false);
    } catch (error) {
      console.error("Failed to install package:", error);
    } finally {
      setIsInstalling(false);
    }
  };

  const handleCancelAdd = () => {
    setNewPackageName("");
    setShowAddForm(false);
  };

  const handleUninstallPackage = async (packageName: string) => {
    try {
      await uninstallPackage(packageName);
    } catch (error) {
      console.error("Failed to uninstall package:", error);
    }
  };

  const handleAddSuggestedPackage = (packageName: string) => {
    setNewPackageName(packageName);
    setShowAddForm(true);
  };

  return (
    <div className="h-full flex flex-col bg-[#11151c]">
      {/* Header */}
      <div className="px-3 py-2 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold text-gray-300 uppercase tracking-wide">
            Dependencies
          </h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors"
            title="Add Package"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>

        <AddPackageForm
          isVisible={showAddForm}
          packageName={newPackageName}
          isInstalling={isInstalling}
          onPackageNameChange={setNewPackageName}
          onInstall={handleInstallPackage}
          onCancel={handleCancelAdd}
        />
      </div>

      <DependencyTabs
        activeTab={activeTab}
        usedCount={usedDeps.length}
        availableCount={availableCDN.length}
        suggestedCount={suggested.length}
        onTabChange={setActiveTab}
      />

      <DependencyContent
        activeTab={activeTab}
        usedDeps={usedDeps}
        availableCDN={availableCDN}
        suggested={suggested}
        onUninstallPackage={handleUninstallPackage}
        onAddSuggestedPackage={handleAddSuggestedPackage}
      />
    </div>
  );
}
