"use client";

import { motion } from "framer-motion";
import { Code, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function API() {
  const [copied, setCopied] = useState(false);

  const propsExample = `interface PlaygroundProps {
  // Initial files to load
  initialFiles?: Record<string, string>;
  
  // Default active file
  defaultActiveFile?: string;
  
  // Panel visibility controls
  showFileExplorer?: boolean;
  showTerminal?: boolean;
  showWebView?: boolean;
  showDependencies?: boolean;
  
  // Theme
  theme?: "dark" | "light";
  
  // Event handlers
  onFileChange?: (files: Record<string, string>) => void;
  onActiveFileChange?: (filePath: string) => void;
  
  // Styling
  className?: string;
  style?: React.CSSProperties;
}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const props = [
    {
      name: "initialFiles",
      type: "Record<string, string>",
      required: false,
      description:
        "Object containing initial files where keys are file paths and values are file contents.",
      example: "{ 'src/App.jsx': 'import React from \"react\";...' }",
    },
    {
      name: "defaultActiveFile",
      type: "string",
      required: false,
      description: "Path of the file that should be active by default.",
      example: '"src/App.jsx"',
    },
    {
      name: "showFileExplorer",
      type: "boolean",
      required: false,
      description: "Whether to show the file explorer panel.",
      example: "true",
    },
    {
      name: "showTerminal",
      type: "boolean",
      required: false,
      description: "Whether to show the terminal panel.",
      example: "true",
    },
    {
      name: "showWebView",
      type: "boolean",
      required: false,
      description: "Whether to show the web view panel.",
      example: "true",
    },
    {
      name: "showDependencies",
      type: "boolean",
      required: false,
      description: "Whether to show the dependencies panel.",
      example: "true",
    },
    {
      name: "theme",
      type: '"dark" | "light"',
      required: false,
      description: "Theme for the playground interface.",
      example: '"dark"',
    },
    {
      name: "onFileChange",
      type: "(files: Record<string, string>) => void",
      required: false,
      description: "Callback function called when files are modified.",
      example: "(files) => console.log(files)",
    },
    {
      name: "onActiveFileChange",
      type: "(filePath: string) => void",
      required: false,
      description: "Callback function called when the active file changes.",
      example: "(filePath) => console.log(filePath)",
    },
    {
      name: "className",
      type: "string",
      required: false,
      description: "Additional CSS class names for the playground container.",
      example: '"custom-playground"',
    },
    {
      name: "style",
      type: "React.CSSProperties",
      required: false,
      description: "Inline styles for the playground container.",
      example: '{ height: "100vh" }',
    },
  ];

  return (
    <section id="api" className="py-16 bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-dark-100 mb-3">
            API Reference
          </h2>
          <p className="text-base text-dark-300 max-w-2xl mx-auto">
            Complete reference for all props and methods available in React
            Playground Editor.
          </p>
        </motion.div>

        {/* TypeScript Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="code-editor-bg rounded-lg shadow-lg overflow-hidden">
            <div className="bg-dark-800 px-4 py-3 flex items-center justify-between border-b border-dark-700">
              <div className="flex items-center space-x-2">
                <Code className="w-4 h-4 text-syntax-function" />
                <h3 className="text-base font-semibold text-dark-100">
                  TypeScript Interface
                </h3>
              </div>
              <button
                onClick={() => copyToClipboard(propsExample)}
                className="text-dark-400 hover:text-dark-200 transition-colors"
              >
                {copied ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </button>
            </div>
            <div className="p-0">
              <SyntaxHighlighter
                language="typescript"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  fontSize: "0.75rem",
                  lineHeight: "1.4",
                  background: "#0f172a",
                  borderRadius: "0 0 0.5rem 0.5rem",
                }}
                codeTagProps={{
                  style: {
                    fontFamily: "JetBrains Mono, Fira Code, monospace",
                  },
                }}
              >
                {propsExample}
              </SyntaxHighlighter>
            </div>
          </div>
        </motion.div>

        {/* Props Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="overflow-hidden"
        >
          <div className="code-editor-bg rounded-lg shadow-lg overflow-hidden">
            <div className="bg-dark-800 px-4 py-3 border-b border-dark-700">
              <h3 className="text-base font-semibold text-dark-100">Props</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-dark-800">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-dark-400 uppercase tracking-wider">
                      Prop
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-dark-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-dark-400 uppercase tracking-wider">
                      Required
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-dark-400 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-dark-400 uppercase tracking-wider">
                      Example
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-dark-900 divide-y divide-dark-700">
                  {props.map((prop, index) => (
                    <tr key={index} className="hover:bg-dark-800">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <code className="text-xs font-mono text-primary-400 bg-primary-600/20 px-2 py-1 rounded">
                          {prop.name}
                        </code>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <code className="text-xs font-mono text-syntax-type">
                          {prop.type}
                        </code>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            prop.required
                              ? "bg-syntax-number/20 text-syntax-number"
                              : "bg-dark-700 text-dark-300"
                          }`}
                        >
                          {prop.required ? "Required" : "Optional"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-dark-300">
                        {prop.description}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <code className="text-xs font-mono text-syntax-string bg-dark-800 px-2 py-1 rounded">
                          {prop.example}
                        </code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-primary-600/10 border border-primary-600/30 rounded-lg p-4">
            <h4 className="text-base font-semibold text-primary-400 mb-2">
              📚 Documentation
            </h4>
            <p className="text-dark-300 mb-3 text-sm">
              For more detailed documentation and examples, visit our GitHub
              repository.
            </p>
            <a
              href="https://github.com/hamdyyemad/react-playground-editor"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300 font-medium text-sm"
            >
              View Documentation →
            </a>
          </div>

          <div className="bg-syntax-string/10 border border-syntax-string/30 rounded-lg p-4">
            <h4 className="text-base font-semibold text-syntax-string mb-2">
              🐛 Issues & Support
            </h4>
            <p className="text-dark-300 mb-3 text-sm">
              Found a bug or need help? Open an issue on GitHub or start a
              discussion.
            </p>
            <a
              href="https://github.com/hamdyyemad/react-playground-editor/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-syntax-string hover:text-syntax-string/80 font-medium text-sm"
            >
              Get Support →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
