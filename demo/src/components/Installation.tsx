"use client";

import { motion } from "framer-motion";
import { Copy, Check, Package, Download } from "lucide-react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Installation() {
  const [copied, setCopied] = useState(false);

  const installCommands = [
    {
      name: "npm",
      command: "npm install react-playground-editor",
      icon: Package,
    },
    {
      name: "yarn",
      command: "yarn add react-playground-editor",
      icon: Package,
    },
    {
      name: "pnpm",
      command: "pnpm add react-playground-editor",
      icon: Package,
    },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="installation" className="py-16 bg-dark-800">
      <div className="max-w-7xl mx-auto px-2 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-dark-100 mb-3">
            Quick Installation
          </h2>
          <p className="text-base text-dark-300 max-w-2xl mx-auto">
            Get started with React Playground Editor in minutes. Install the
            package and start building interactive coding experiences.
          </p>
        </motion.div>

        {/* Installation Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Installation Commands */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-dark-100 mb-4">
              Install the Package
            </h3>
            <div className="space-y-3">
              {installCommands.map((cmd, index) => (
                <div key={index} className="terminal-bg rounded-md p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <cmd.icon className="w-4 h-4 text-syntax-string" />
                      <span className="text-dark-300 text-xs font-mono">
                        {cmd.name}
                      </span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(cmd.command)}
                      className="text-dark-400 hover:text-dark-200 transition-colors"
                    >
                      {copied ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                  <div className="mt-1">
                    <code className="text-syntax-string text-xs font-mono">
                      {cmd.command}
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Installation Guide */}
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-4"
              // Remove the inline style completely
            >
            <div className="card p-4">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-6 h-6 bg-primary-600/20 rounded-md flex items-center justify-center">
                  <span className="text-primary-400 font-bold text-xs">1</span>
                </div>
                <h4 className="text-base font-semibold text-dark-100">
                  Install Dependencies
                </h4>
              </div>
              <p className="text-dark-300 text-sm">
                Install the package using your preferred package manager. The
                library includes all necessary peer dependencies.
              </p>
            </div>

            <div className="card p-4">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-6 h-6 bg-primary-600/20 rounded-md flex items-center justify-center">
                  <span className="text-primary-400 font-bold text-xs">2</span>
                </div>
                <h4 className="text-base font-semibold text-dark-100">
                  Import CSS
                </h4>
              </div>
              <p className="text-dark-300 text-sm">
                Import the CSS file to get the default styling and themes.
              </p>
              <div className="mt-2">
                <SyntaxHighlighter
                  language="javascript"
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    fontSize: "0.75rem",
                    lineHeight: "1.4",
                    background: "#020617",
                    borderRadius: "0.375rem",
                    padding: "0.5rem",
                  }}
                  codeTagProps={{
                    style: {
                      fontFamily: "JetBrains Mono, Fira Code, monospace",
                    },
                  }}
                >
                  {"import 'react-playground-editor/dist/index.css'"}
                </SyntaxHighlighter>
              </div>
            </div>

            <div className="card p-4">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-6 h-6 bg-primary-600/20 rounded-md flex items-center justify-center">
                  <span className="text-primary-400 font-bold text-xs">3</span>
                </div>
                <h4 className="text-base font-semibold text-dark-100">
                  Use the Component
                </h4>
              </div>
              <p className="text-dark-300 text-sm">
                Import and use the Playground component in your React
                application.
              </p>
              <div className="mt-2">
                <SyntaxHighlighter
                  language="javascript"
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    fontSize: "0.75rem",
                    lineHeight: "1.4",
                    background: "#020617",
                    borderRadius: "0.375rem",
                    padding: "0.5rem",
                  }}
                  codeTagProps={{
                    style: {
                      fontFamily: "JetBrains Mono, Fira Code, monospace",
                    },
                  }}
                >
                  {"import { Playground } from 'react-playground-editor'"}
                </SyntaxHighlighter>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Peer Dependencies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="bg-syntax-type/10 border border-syntax-type/30 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <Download className="w-4 h-4 text-syntax-type mt-0.5" />
              <div>
                <h4 className="text-base font-semibold text-syntax-type mb-2">
                  Peer Dependencies
                </h4>
                <p className="text-dark-300 mb-3 text-sm">
                  Make sure you have these peer dependencies installed in your
                  project:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="terminal-bg rounded p-2">
                    <code className="text-xs font-mono text-syntax-string">
                      react@^18.0.0
                    </code>
                  </div>
                  <div className="terminal-bg rounded p-2">
                    <code className="text-xs font-mono text-syntax-string">
                      react-dom@^18.0.0
                    </code>
                  </div>
                  <div className="terminal-bg rounded p-2">
                    <code className="text-xs font-mono text-syntax-string">
                      zustand@^4.0.0
                    </code>
                  </div>
                  <div className="terminal-bg rounded p-2">
                    <code className="text-xs font-mono text-syntax-string">
                      lucide-react@^0.400.0
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
