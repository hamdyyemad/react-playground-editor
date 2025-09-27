import { create } from "zustand";
import {
  DependencyAnalyzer,
  DetectedDependency,
} from "../../utils/dependency-analyzer";

interface Package {
  name: string;
  version: string;
  type: "dependency" | "devDependency";
  installed: boolean;
  used: boolean;
  importType?: "import" | "require" | "cdn" | "global";
  source?: string;
}

interface PackageManagerState {
  packages: Package[];
  analyzedDependencies: DetectedDependency[];
  installPackage: (
    name: string,
    type?: "dependency" | "devDependency"
  ) => Promise<void>;
  uninstallPackage: (name: string) => Promise<void>;
  updatePackage: (name: string, version: string) => Promise<void>;
  refreshPackages: () => Promise<void>;
  analyzeProjectDependencies: (files: Record<string, string>) => void;
  getUsedDependencies: () => Package[];
  getAvailableCDNPackages: () => DetectedDependency[];
  getSuggestedPackages: () => DetectedDependency[];
}

// Simulate real package installation
const simulatePackageInstallation = async (
  packageName: string
): Promise<Package> => {
  // In a real implementation, this would call your backend API
  // that actually installs the package in the WebView environment

  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate fetching package info from npm registry
      const version = "1.0.0"; // In real implementation, fetch from npm API
      resolve({
        name: packageName,
        version,
        type: "dependency",
        installed: true,
        used: false,
        importType: "import",
        source: "manually-added",
      });
    }, 2000);
  });
};

export const usePackageManagerStore = create<PackageManagerState>(
  (set, get) => ({
    packages: [
      // Core packages that are always available via CDN
      {
        name: "react",
        version: "18.2.0",
        type: "dependency",
        installed: true,
        used: true,
        importType: "cdn",
        source: "iframe-cdn",
      },
      {
        name: "react-dom",
        version: "18.2.0",
        type: "dependency",
        installed: true,
        used: true,
        importType: "cdn",
        source: "iframe-cdn",
      },
    ],
    analyzedDependencies: [],

    installPackage: async (
      name: string,
      type: "dependency" | "devDependency" = "dependency"
    ) => {
      const { packages } = get();

      // Check if package already exists
      const existingPackage = packages.find((pkg) => pkg.name === name);
      if (existingPackage) {
        console.log(`Package ${name} is already installed`);
        return;
      }

      try {
        // In real implementation, this would:
        // 1. Call backend API to install package in WebView environment
        // 2. Update package.json in the WebView
        // 3. Reload WebView with new dependencies

        const newPackage = await simulatePackageInstallation(name);
        newPackage.type = type;

        set((state) => ({
          packages: [...state.packages, newPackage],
        }));

        // In real implementation, trigger WebView reload with new packages
        console.log(`Package ${name} installed successfully`);
      } catch (error) {
        console.error(`Failed to install package ${name}:`, error);
        throw error;
      }
    },

    uninstallPackage: async (name: string) => {
      const { packages } = get();

      try {
        // In real implementation, this would:
        // 1. Call backend API to remove package from WebView environment
        // 2. Update package.json in the WebView
        // 3. Reload WebView without the package

        set((state) => ({
          packages: state.packages.filter((pkg) => pkg.name !== name),
        }));

        console.log(`Package ${name} uninstalled successfully`);
      } catch (error) {
        console.error(`Failed to uninstall package ${name}:`, error);
        throw error;
      }
    },

    updatePackage: async (name: string, version: string) => {
      const { packages } = get();

      try {
        // In real implementation, this would:
        // 1. Call backend API to update package in WebView environment
        // 2. Update package.json in the WebView
        // 3. Reload WebView with updated package

        set((state) => ({
          packages: state.packages.map((pkg) =>
            pkg.name === name ? { ...pkg, version } : pkg
          ),
        }));

        console.log(`Package ${name} updated to ${version}`);
      } catch (error) {
        console.error(`Failed to update package ${name}:`, error);
        throw error;
      }
    },

    refreshPackages: async () => {
      // In real implementation, this would:
      // 1. Read package.json from WebView environment
      // 2. Fetch latest package information
      // 3. Update the packages list

      console.log("Refreshing packages...");
    },

    analyzeProjectDependencies: (files: Record<string, string>) => {
      const detectedDeps = DependencyAnalyzer.analyzeDependencies(files);

      set((state) => {
        // Update analyzed dependencies
        const newAnalyzedDeps = detectedDeps;

        // Update packages list with usage information
        const updatedPackages = state.packages.map((pkg) => {
          const detectedDep = detectedDeps.find((dep) => dep.name === pkg.name);
          return {
            ...pkg,
            used: detectedDep ? detectedDep.used : pkg.used,
            importType: detectedDep ? detectedDep.importType : pkg.importType,
            source: detectedDep ? detectedDep.source : pkg.source,
          };
        });

        // Add new detected dependencies that aren't in packages list
        const newPackages = detectedDeps
          .filter((dep) => !state.packages.some((pkg) => pkg.name === dep.name))
          .map((dep) => ({
            name: dep.name,
            version: dep.version,
            type: dep.type,
            installed: true,
            used: dep.used,
            importType: dep.importType,
            source: dep.source,
          }));

        return {
          analyzedDependencies: newAnalyzedDeps,
          packages: [...updatedPackages, ...newPackages],
        };
      });
    },

    getUsedDependencies: () => {
      const { packages } = get();
      return packages.filter((pkg) => pkg.used);
    },

    getAvailableCDNPackages: () => {
      return DependencyAnalyzer.getAvailableCDNPackages();
    },

    getSuggestedPackages: () => {
      return DependencyAnalyzer.getSuggestedPackages();
    },
  })
);
