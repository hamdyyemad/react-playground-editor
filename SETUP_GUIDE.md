# Setup Guide for React Playground Editor

This guide will help you set up the `@` alias in your project to use the React Playground Editor library.

## Installation

```bash
npm install react-playground-editor
# or
yarn add react-playground-editor
# or
pnpm add react-playground-editor
```

## Setting up the @ Alias

### 1. Next.js Project

#### Option A: Using next.config.js

```javascript
// next.config.js
const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"),
    };
    return config;
  },
};

module.exports = nextConfig;
```

#### Option B: Using tsconfig.json

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 2. Vite Project

```javascript
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

### 3. Create React App

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@/*": ["*"]
    }
  }
}
```

### 4. Webpack Project

```javascript
// webpack.config.js
const path = require("path");

module.exports = {
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
};
```

### 5. TypeScript Project

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Usage

After setting up the alias, you can use the library like this:

```tsx
import React from "react";
import { Playground } from "react-playground-editor";
import "react-playground-editor/dist/style.css";

function App() {
  return (
    <div className="h-screen">
      <Playground
        initialFiles={{
          "src/App.jsx": `import React from 'react';
          
          function App() {
            return <div>Hello World!</div>;
          }
          
          export default App;`,
        }}
        defaultActiveFile="src/App.jsx"
        showFileExplorer={true}
        showTerminal={true}
        showWebView={true}
        onFileChange={(files) => console.log("Files changed:", files)}
        onActiveFileChange={(file) => console.log("Active file:", file)}
      />
    </div>
  );
}

export default App;
```

## Troubleshooting

### Common Issues

1. **Module not found error**: Make sure you've set up the `@` alias correctly
2. **TypeScript errors**: Ensure your `tsconfig.json` has the correct path mapping
3. **Build errors**: Check that your build tool (webpack, vite, etc.) is configured with the alias

### Alternative: Use Relative Imports

If you prefer not to use the `@` alias, you can use relative imports:

```tsx
// Instead of: import { Playground } from '@/components/Playground';
// Use: import { Playground } from './components/Playground';
```

## Support

If you encounter any issues, please check:

1. Your build tool configuration
2. TypeScript configuration
3. Node modules installation

For more help, please open an issue on the GitHub repository.
