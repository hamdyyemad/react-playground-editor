const fs = require("fs");
const path = require("path");

function fixImportsInFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let changed = false;

  // Fix @/stores imports
  if (content.includes("@/stores")) {
    // Calculate relative path from file to stores
    const relativePath = path.relative(
      path.dirname(filePath),
      path.join(__dirname, "src", "stores")
    );
    const normalizedPath = relativePath.replace(/\\/g, "/");
    content = content.replace(/@\/stores/g, normalizedPath);
    changed = true;
  }

  // Fix @/common imports
  if (content.includes("@/common")) {
    const relativePath = path.relative(
      path.dirname(filePath),
      path.join(__dirname, "src", "common")
    );
    const normalizedPath = relativePath.replace(/\\/g, "/");
    content = content.replace(/@\/common/g, normalizedPath);
    changed = true;
  }

  // Fix @/hooks imports
  if (content.includes("@/hooks")) {
    const relativePath = path.relative(
      path.dirname(filePath),
      path.join(__dirname, "src", "hooks")
    );
    const normalizedPath = relativePath.replace(/\\/g, "/");
    content = content.replace(/@\/hooks/g, normalizedPath);
    changed = true;
  }

  // Fix @/utils imports
  if (content.includes("@/utils")) {
    const relativePath = path.relative(
      path.dirname(filePath),
      path.join(__dirname, "src", "utils")
    );
    const normalizedPath = relativePath.replace(/\\/g, "/");
    content = content.replace(/@\/utils/g, normalizedPath);
    changed = true;
  }

  // Fix @/types imports
  if (content.includes("@/types")) {
    const relativePath = path.relative(
      path.dirname(filePath),
      path.join(__dirname, "src", "types")
    );
    const normalizedPath = relativePath.replace(/\\/g, "/");
    content = content.replace(/@\/types/g, normalizedPath);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed imports in: ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith(".tsx") || file.endsWith(".ts")) {
      fixImportsInFile(filePath);
    }
  }
}

// Start from src directory
walkDir(path.join(__dirname, "src"));
console.log("Import fixing complete!");

