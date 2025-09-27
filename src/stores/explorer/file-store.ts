import { create } from "zustand";
import { persist } from "zustand/middleware";

// Helper function to get default content based on file extension
const getDefaultContentForFile = (filePath: string): string => {
  const extension = filePath.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "jsx":
    case "tsx":
      return `import React from 'react';

export default function ${getComponentName(filePath)}() {
  return (
    <div>
      <h1>Hello from ${getComponentName(filePath)}</h1>
    </div>
  );
}`;

    case "js":
    case "ts":
      return `// ${getComponentName(filePath)} utility
export const ${getComponentName(filePath)} = () => {
  // Your code here
};`;

    case "css":
      return `/* ${getComponentName(filePath)} styles */
.${getComponentName(filePath).toLowerCase()} {
  /* Your styles here */
}`;

    case "html":
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${getComponentName(filePath)}</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>`;

    case "json":
      return `{
  "name": "${getComponentName(filePath).toLowerCase()}",
  "version": "1.0.0",
  "description": ""
}`;

    case "md":
      return `# ${getComponentName(filePath)}

## Description

Your markdown content here.`;

    default:
      return `// ${filePath}`;
  }
};

// Helper function to extract component name from file path
const getComponentName = (filePath: string): string => {
  const fileName = filePath.split("/").pop() || "";
  const nameWithoutExt = fileName.split(".")[0];
  return nameWithoutExt.charAt(0).toUpperCase() + nameWithoutExt.slice(1);
};

interface FileState {
  // File Management
  activeFile: string;
  files: Record<string, string>;
  openFiles: string[]; // Track open files for tabs

  // Actions
  setActiveFile: (filePath: string) => void;
  updateFile: (filePath: string, content: string) => void;
  addFile: (filePath: string, content: string) => void;
  deleteFile: (filePath: string) => void;
  renameFile: (oldPath: string, newPath: string) => void;
  closeFile: (filePath: string) => void;
  openFile: (filePath: string) => void;
  cleanupOpenFiles: () => void;
}

const defaultFiles = {
  "src/App.jsx": `import { useState } from 'react';

function App(props) {
  const [count, setCount] = useState(0);

  return (
    <div className='App'>
      <h1>Hello React!</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
    </div>
  );
}

export default App;`,
  "src/index.jsx": `import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);`,
  "src/style.css": `body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 20px;
  background-color: #1a1a1a;
  color: #ffffff;
}

.App {
  text-align: center;
}

h1 {
  color: #4ade80;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

h2 {
  color: #4ade80;
  font-size: 1.5rem;
  margin-top: 0;
}`,
  "index.html": `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React Playground</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>`,
};

export const useFileStore = create<FileState>()(
  persist(
    (set, get) => ({
      // Initial File State
      activeFile: "src/App.jsx",
      files: defaultFiles,
      openFiles: ["src/App.jsx"], // Start with App.jsx open

      // Actions
      setActiveFile: (filePath: string) =>
        set((state) => ({
          activeFile: filePath,
          openFiles: state.openFiles.includes(filePath)
            ? state.openFiles
            : [...state.openFiles, filePath],
        })),

      updateFile: (filePath: string, content: string) =>
        set((state) => ({
          files: {
            ...state.files,
            [filePath]: content,
          },
        })),

      addFile: (filePath: string, content?: string) => {
        const defaultContent = getDefaultContentForFile(filePath);
        set((state) => ({
          files: {
            ...state.files,
            [filePath]: content || defaultContent,
          },
          openFiles: state.openFiles.includes(filePath)
            ? state.openFiles
            : [...state.openFiles, filePath],
        }));
      },

      deleteFile: (filePath: string) =>
        set((state) => {
          const newFiles = { ...state.files };
          delete newFiles[filePath];

          // Remove from open files and clean up any files that no longer exist
          const newOpenFiles = state.openFiles.filter(
            (file) => file !== filePath && newFiles[file] !== undefined
          );

          // If the deleted file was active, switch to another file
          let newActiveFile = state.activeFile;
          if (state.activeFile === filePath) {
            // Try to switch to another open file first, then any remaining file
            newActiveFile =
              newOpenFiles.length > 0
                ? newOpenFiles[0]
                : Object.keys(newFiles).length > 0
                ? Object.keys(newFiles)[0]
                : "";
          }

          return {
            files: newFiles,
            activeFile: newActiveFile,
            openFiles: newOpenFiles,
          };
        }),

      renameFile: (oldPath: string, newPath: string) =>
        set((state) => {
          const newFiles = { ...state.files };
          const content = newFiles[oldPath];
          delete newFiles[oldPath];
          newFiles[newPath] = content;

          // Update open files and active file if it was renamed
          const newOpenFiles = state.openFiles.map((file) =>
            file === oldPath ? newPath : file
          );
          const newActiveFile =
            state.activeFile === oldPath ? newPath : state.activeFile;

          return {
            files: newFiles,
            activeFile: newActiveFile,
            openFiles: newOpenFiles,
          };
        }),

      closeFile: (filePath: string) =>
        set((state) => {
          const newOpenFiles = state.openFiles.filter(
            (file) => file !== filePath
          );

          // If the closed file was active, switch to another open file
          let newActiveFile = state.activeFile;
          if (state.activeFile === filePath) {
            newActiveFile = newOpenFiles.length > 0 ? newOpenFiles[0] : "";
          }

          return {
            openFiles: newOpenFiles,
            activeFile: newActiveFile,
          };
        }),

      openFile: (filePath: string) =>
        set((state) => ({
          activeFile: filePath,
          openFiles: state.openFiles.includes(filePath)
            ? state.openFiles
            : [...state.openFiles, filePath],
        })),

      cleanupOpenFiles: () =>
        set((state) => ({
          openFiles: state.openFiles.filter(
            (file) => state.files[file] !== undefined
          ),
        })),
    }),
    {
      name: "playground-file-storage", // unique name for localStorage key
      partialize: (state) => ({
        activeFile: state.activeFile,
        files: state.files,
        openFiles: state.openFiles,
      }), // persist file state
    }
  )
);
