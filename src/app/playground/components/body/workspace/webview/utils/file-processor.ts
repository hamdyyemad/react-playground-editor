import { ProcessedFile } from "../types/webview.types";

export class FileProcessor {
  static processFiles(files: Record<string, string>): string {
    const allComponents: string[] = [];

    Object.entries(files).forEach(([filePath, content]) => {
      if (filePath.endsWith(".jsx") || filePath.endsWith(".js")) {
        const processedContent = this.processFile(filePath, content);

        if (processedContent.trim()) {
          allComponents.push(processedContent);

          // Debug logging for index.jsx
          if (filePath.includes("index.jsx")) {
            console.log("Processed index.jsx:", processedContent);
          }
        } else {
          console.warn(`Skipping empty processed content for ${filePath}`);
        }
      }
    });

    return allComponents.join("\n\n");
  }

  private static processFile(filePath: string, content: string): string {
    let processedContent = content;

    // Handle React imports first (before removing all imports)
    processedContent = processedContent
      .replace(
        /import\s+\{([^}]+)\}\s+from\s+['"]react['"];?\s*/g,
        (match, imports) => {
          const cleanImports = imports
            .split(",")
            .map((imp: string) => imp.trim())
            .join(", ");
          return `const { ${cleanImports} } = React;\n`;
        }
      )
      .replace(
        /import\s+\{([^}]+)\}\s+from\s+['"]react-dom\/client['"];?\s*/g,
        (match, imports) => {
          const cleanImports = imports
            .split(",")
            .map((imp: string) => imp.trim())
            .join(", ");
          return `const { ${cleanImports} } = ReactDOM;\n`;
        }
      );

    // Remove all other import statements (including commented ones)
    processedContent = processedContent
      .replace(/\/\/\s*import\s+.*$/gm, "") // Remove commented imports
      .replace(/import\s+.*?from\s+['"][^'"]*['"];?\s*/g, "") // Remove regular imports
      .replace(/import\s+.*?;?\s*/g, ""); // Remove any remaining imports

    // Convert export default function to function
    processedContent = processedContent.replace(
      /export\s+default\s+function\s+/g,
      "function "
    );

    // Remove other export statements
    processedContent = processedContent
      .replace(/export\s+default\s+/g, "")
      .replace(/export\s+const\s+/g, "const ")
      .replace(/export\s+function\s+/g, "function ");

    // Clean up any standalone variable references
    processedContent = processedContent.replace(/^(\w+);\s*$/gm, "");

    // Fix variable name conflicts in index.jsx and prevent duplicate root creation
    if (filePath.includes("index.jsx")) {
      processedContent = processedContent
        .replace(/const container =/g, "const indexContainer =")
        .replace(/const root =/g, "const indexRoot =")
        .replace(/root\.render/g, "indexRoot.render")
        .replace(/container/g, "indexContainer") // Replace all remaining container references
        .replace(/createRoot\([^)]+\)/g, "null") // Remove createRoot calls to prevent conflicts
        .replace(
          /indexRoot\.render\([^)]+\)/g,
          "// indexRoot.render() removed to prevent conflicts"
        );
    }

    // Clean up whitespace
    processedContent = processedContent.replace(/\n\s*\n\s*\n/g, "\n\n").trim();

    return processedContent;
  }
}
