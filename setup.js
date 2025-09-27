const fs = require("fs");
const path = require("path");

console.log("🚀 Setting up React Playground Editor...\n");

// Check if we're in the right directory
if (!fs.existsSync("package.json")) {
  console.error(
    "❌ Error: package.json not found. Please run this script from the library root directory."
  );
  process.exit(1);
}

// Create necessary directories
const dirs = [
  "src/components/body",
  "src/components/header",
  "src/stores",
  "src/hooks",
  "src/common",
  "src/designs",
  "src/types",
  "src/utils",
  "src/styles",
];

console.log("📁 Creating directory structure...");
dirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`   ✓ Created ${dir}`);
  } else {
    console.log(`   ✓ ${dir} already exists`);
  }
});

// Create .gitignore
const gitignore = `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build outputs
dist/
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
logs
*.log

# Coverage
coverage/

# Temporary files
*.tmp
*.temp
`;

if (!fs.existsSync(".gitignore")) {
  fs.writeFileSync(".gitignore", gitignore);
  console.log("   ✓ Created .gitignore");
} else {
  console.log("   ✓ .gitignore already exists");
}

console.log("\n✅ Setup completed!");
console.log("\n📋 Next steps:");
console.log("1. Copy your playground components from the main project");
console.log("2. Install dependencies: npm install");
console.log("3. Build the library: npm run build");
console.log("4. Test locally: npm pack");
console.log("\n📖 See README.md for detailed instructions");
