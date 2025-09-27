import { useState, useRef, useEffect } from "react";
import { File } from "lucide-react";
import { useFileStore } from "@/stores/explorer/file-store";
import { Dialog, DialogActions, DialogButton } from "@/common/dialog";

interface NewFileDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FileType {
  extension: string;
  name: string;
  icon: React.ReactNode;
  template: string;
}

const FILE_TYPES: FileType[] = [
  {
    extension: "jsx",
    name: "React Component",
    icon: <File className="w-3 h-3 text-blue-400" />,
    template: `import React from 'react';

export default function NewComponent() {
  return (
    <div>
      <h1>Hello from NewComponent</h1>
    </div>
  );
}`,
  },
  {
    extension: "tsx",
    name: "TypeScript Component",
    icon: <File className="w-3 h-3 text-blue-500" />,
    template: `import React from 'react';

interface NewComponentProps {
  // Add props here
}

export default function NewComponent({}: NewComponentProps) {
  return (
    <div>
      <h1>Hello from NewComponent</h1>
    </div>
  );
}`,
  },
  {
    extension: "js",
    name: "JavaScript",
    icon: <File className="w-3 h-3 text-yellow-400" />,
    template: `// New JavaScript file
export const newFunction = () => {
  // Your code here
};`,
  },
  {
    extension: "ts",
    name: "TypeScript",
    icon: <File className="w-3 h-3 text-blue-600" />,
    template: `// New TypeScript file
export const newFunction = (): void => {
  // Your code here
};`,
  },
  {
    extension: "css",
    name: "CSS",
    icon: <File className="w-3 h-3 text-pink-400" />,
    template: `/* New CSS file */
.new-component {
  /* Your styles here */
}`,
  },
  {
    extension: "html",
    name: "HTML",
    icon: <File className="w-3 h-3 text-orange-400" />,
    template: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New HTML File</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>`,
  },
  {
    extension: "json",
    name: "JSON",
    icon: <File className="w-3 h-3 text-green-400" />,
    template: `{
  "name": "new-file",
  "version": "1.0.0",
  "description": ""
}`,
  },
  {
    extension: "md",
    name: "Markdown",
    icon: <File className="w-3 h-3 text-gray-400" />,
    template: `# New Markdown File

## Description

Your markdown content here.`,
  },
];

export function NewFileDialog({ isOpen, onClose }: NewFileDialogProps) {
  const [fileName, setFileName] = useState("");
  const [selectedType, setSelectedType] = useState(FILE_TYPES[0]);
  const [isCreating, setIsCreating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { addFile, setActiveFile } = useFileStore();

  // Auto-focus input when dialog opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (isOpen) {
      setFileName("");
      setSelectedType(FILE_TYPES[0]);
      setIsCreating(false);
    }
  }, [isOpen]);

  const handleCreateFile = async () => {
    if (!fileName.trim()) return;

    const fullFileName = fileName.includes(".")
      ? fileName
      : `${fileName}.${selectedType.extension}`;

    // Check if file already exists
    const { files } = useFileStore.getState();
    if (files[fullFileName]) {
      alert("A file with this name already exists!");
      return;
    }

    setIsCreating(true);
    try {
      addFile(fullFileName, selectedType.template);
      setActiveFile(fullFileName);
      onClose();
    } catch (error) {
      console.error("Failed to create file:", error);
      alert("Failed to create file. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCreateFile();
    }
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Create New File" size="md">
      <div className="space-y-3">
        {/* File Name Input */}
        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">
            File Name
          </label>
          <input
            ref={inputRef}
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={`Enter filename (e.g., MyComponent)`}
            className="w-full px-2 py-1.5 text-xs bg-gray-800 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            disabled={isCreating}
          />
          <p className="text-[10px] text-gray-500 mt-1">
            Extension will be added automatically: .{selectedType.extension}
          </p>
        </div>

        {/* File Type Selection */}
        <div>
          <label className="block text-xs font-medium text-gray-300 mb-2">
            File Type
          </label>
          <div
            className="grid grid-cols-4 gap-2"
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}
          >
            {FILE_TYPES.map((type) => (
              <button
                key={type.extension}
                onClick={() => setSelectedType(type)}
                className={`flex flex-col items-center gap-0.5 p-1 rounded border transition-all duration-200 min-w-0 ${
                  selectedType.extension === type.extension
                    ? "border-blue-500 bg-blue-500/10 shadow-sm scale-105"
                    : "border-gray-600 hover:border-gray-500 hover:bg-gray-800/50"
                }`}
                disabled={isCreating}
              >
                <div className="flex items-center justify-center w-3 h-3">
                  {type.icon}
                </div>
                <span className="text-[6px] text-gray-500 font-mono">
                  .{type.extension}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <DialogActions>
          <DialogButton onClick={onClose} disabled={isCreating}>
            Cancel
          </DialogButton>
          <DialogButton
            onClick={handleCreateFile}
            disabled={isCreating || !fileName.trim()}
            variant="primary"
          >
            {isCreating ? "Creating..." : "Create File"}
          </DialogButton>
        </DialogActions>
      </div>
    </Dialog>
  );
}
