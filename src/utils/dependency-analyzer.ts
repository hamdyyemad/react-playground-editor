export interface DetectedDependency {
  name: string;
  version: string;
  type: "dependency" | "devDependency";
  used: boolean;
  importType: "import" | "require" | "cdn" | "global";
  source: string; // file path where it was detected
}

export class DependencyAnalyzer {
  // Common CDN packages that are available in the iframe
  private static readonly CDN_PACKAGES = {
    react: "18.2.0",
    "react-dom": "18.2.0",
    "@babel/standalone": "7.23.0",
  };

  // Common packages that might be used in playground projects
  private static readonly COMMON_PACKAGES = {
    lodash: "^4.17.21",
    axios: "^1.6.0",
    moment: "^2.29.4",
    "date-fns": "^2.30.0",
    uuid: "^9.0.1",
    classnames: "^2.3.2",
    clsx: "^2.1.1",
    "tailwind-merge": "^3.3.1",
    "lucide-react": "^0.544.0",
    zustand: "^5.0.8",
    "@monaco-editor/react": "^4.7.0",
  };

  /**
   * Analyze files and extract dependencies that are actually being used
   */
  static analyzeDependencies(
    files: Record<string, string>
  ): DetectedDependency[] {
    const dependencies: Map<string, DetectedDependency> = new Map();

    Object.entries(files).forEach(([filePath, content]) => {
      this.analyzeFile(filePath, content, dependencies);
    });

    return Array.from(dependencies.values());
  }

  /**
   * Analyze a single file for dependencies
   */
  private static analyzeFile(
    filePath: string,
    content: string,
    dependencies: Map<string, DetectedDependency>
  ): void {
    // Skip non-JS/JSX files
    if (
      !filePath.endsWith(".js") &&
      !filePath.endsWith(".jsx") &&
      !filePath.endsWith(".ts") &&
      !filePath.endsWith(".tsx")
    ) {
      return;
    }

    // Extract import statements
    this.extractImports(content, filePath, dependencies);

    // Extract require statements
    this.extractRequires(content, filePath, dependencies);

    // Extract global variable usage
    this.extractGlobalUsage(content, filePath, dependencies);
  }

  /**
   * Extract ES6 import statements
   */
  private static extractImports(
    content: string,
    filePath: string,
    dependencies: Map<string, DetectedDependency>
  ): void {
    // Match various import patterns
    const importRegex =
      /import\s+(?:{[^}]*}|\*\s+as\s+\w+|\w+)\s+from\s+['"]([^'"]+)['"]/g;
    const defaultImportRegex = /import\s+(\w+)\s+from\s+['"]([^'"]+)['"]/g;
    const sideEffectImportRegex = /import\s+['"]([^'"]+)['"]/g;

    let match;

    // Named imports and namespace imports
    while ((match = importRegex.exec(content)) !== null) {
      const packageName = this.extractPackageName(match[1]);
      if (packageName && !this.isBuiltInModule(packageName)) {
        this.addDependency(dependencies, packageName, filePath, "import");
      }
    }

    // Default imports
    while ((match = defaultImportRegex.exec(content)) !== null) {
      const packageName = this.extractPackageName(match[2]);
      if (packageName && !this.isBuiltInModule(packageName)) {
        this.addDependency(dependencies, packageName, filePath, "import");
      }
    }

    // Side effect imports
    while ((match = sideEffectImportRegex.exec(content)) !== null) {
      const packageName = this.extractPackageName(match[1]);
      if (packageName && !this.isBuiltInModule(packageName)) {
        this.addDependency(dependencies, packageName, filePath, "import");
      }
    }
  }

  /**
   * Extract CommonJS require statements
   */
  private static extractRequires(
    content: string,
    filePath: string,
    dependencies: Map<string, DetectedDependency>
  ): void {
    const requireRegex = /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
    let match;

    while ((match = requireRegex.exec(content)) !== null) {
      const packageName = this.extractPackageName(match[1]);
      if (packageName && !this.isBuiltInModule(packageName)) {
        this.addDependency(dependencies, packageName, filePath, "require");
      }
    }
  }

  /**
   * Extract global variable usage (for CDN packages)
   */
  private static extractGlobalUsage(
    content: string,
    filePath: string,
    dependencies: Map<string, DetectedDependency>
  ): void {
    // Check for React usage (since it's loaded via CDN)
    if (
      content.includes("React.") ||
      content.includes("ReactDOM.") ||
      content.includes("React.createElement")
    ) {
      this.addDependency(dependencies, "react", filePath, "global");
      this.addDependency(dependencies, "react-dom", filePath, "global");
    }

    // Check for other common global variables
    if (content.includes("_") && content.includes("lodash")) {
      this.addDependency(dependencies, "lodash", filePath, "global");
    }
  }

  /**
   * Extract package name from import path
   */
  private static extractPackageName(importPath: string): string | null {
    // Handle scoped packages (@scope/package)
    if (importPath.startsWith("@")) {
      const parts = importPath.split("/");
      if (parts.length >= 2) {
        return `${parts[0]}/${parts[1]}`;
      }
    }

    // Handle regular packages
    const parts = importPath.split("/");
    return parts[0];
  }

  /**
   * Check if a module is a built-in Node.js module
   */
  private static isBuiltInModule(moduleName: string): boolean {
    const builtInModules = [
      "fs",
      "path",
      "os",
      "crypto",
      "util",
      "events",
      "stream",
      "buffer",
      "url",
      "querystring",
      "http",
      "https",
      "net",
      "tls",
      "dns",
      "child_process",
      "cluster",
      "worker_threads",
      "perf_hooks",
      "async_hooks",
      "timers",
      "console",
      "process",
      "assert",
      "vm",
      "v8",
      "inspector",
      "trace_events",
    ];
    return builtInModules.includes(moduleName);
  }

  /**
   * Add or update a dependency
   */
  private static addDependency(
    dependencies: Map<string, DetectedDependency>,
    packageName: string,
    source: string,
    importType: "import" | "require" | "cdn" | "global"
  ): void {
    if (dependencies.has(packageName)) {
      const existing = dependencies.get(packageName)!;
      existing.used = true;
      existing.source = existing.source.includes(source)
        ? existing.source
        : `${existing.source}, ${source}`;
    } else {
      const version = this.getPackageVersion(packageName);
      dependencies.set(packageName, {
        name: packageName,
        version,
        type: "dependency",
        used: true,
        importType,
        source,
      });
    }
  }

  /**
   * Get version for a package
   */
  private static getPackageVersion(packageName: string): string {
    // Check CDN packages first
    if (packageName in this.CDN_PACKAGES) {
      return this.CDN_PACKAGES[packageName as keyof typeof this.CDN_PACKAGES];
    }

    // Check common packages
    if (packageName in this.COMMON_PACKAGES) {
      return this.COMMON_PACKAGES[
        packageName as keyof typeof this.COMMON_PACKAGES
      ];
    }

    // Default version for unknown packages
    return "^1.0.0";
  }

  /**
   * Get available CDN packages for the iframe
   */
  static getAvailableCDNPackages(): DetectedDependency[] {
    return Object.entries(this.CDN_PACKAGES).map(([name, version]) => ({
      name,
      version,
      type: "dependency" as const,
      used: true,
      importType: "cdn" as const,
      source: "iframe-cdn",
    }));
  }

  /**
   * Get suggested packages that could be added
   */
  static getSuggestedPackages(): DetectedDependency[] {
    return Object.entries(this.COMMON_PACKAGES).map(([name, version]) => ({
      name,
      version,
      type: "dependency" as const,
      used: false,
      importType: "import" as const,
      source: "suggested",
    }));
  }
}
