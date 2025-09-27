"use client";

import { motion } from "framer-motion";
import { Code, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Usage() {
  const [copied, setCopied] = useState(false);

  const basicExample = `import React from 'react';
import { Playground } from 'react-playground-editor';
import 'react-playground-editor/dist/index.css';

function App() {
  const initialFiles = {
    'src/App.jsx': \`import React from 'react';

function App() {
  return (
    <div>
      <h1>Hello React!</h1>
      <p>Start editing to see some magic happen!</p>
    </div>
  );
}

export default App;\`,
    'src/index.js': \`import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);\`
  };

  return (
    <div style={{ height: '100vh' }}>
      <Playground
        initialFiles={initialFiles}
        defaultActiveFile="src/App.jsx"
        showFileExplorer={true}
        showTerminal={true}
        showWebView={true}
        showDependencies={true}
        theme="dark"
      />
    </div>
  );
}

export default App;`;

  const advancedExample = `import React from 'react';
import { Playground, useFileStore } from 'react-playground-editor';
import 'react-playground-editor/dist/index.css';

function AdvancedPlayground() {
  const handleFileChange = (files) => {
    console.log('Files changed:', files);
    // Save files to localStorage, send to server, etc.
  };

  const handleActiveFileChange = (filePath) => {
    console.log('Active file changed:', filePath);
  };

  return (
    <div style={{ height: '100vh' }}>
      <Playground
        initialFiles={{
          'src/App.jsx': \`import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Counter App</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default App;\`,
          'src/styles.css': \`body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

button {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}\`
        }}
        defaultActiveFile="src/App.jsx"
        showFileExplorer={true}
        showTerminal={true}
        showWebView={true}
        showDependencies={true}
        theme="dark"
        onFileChange={handleFileChange}
        onActiveFileChange={handleActiveFileChange}
        className="custom-playground"
        style={{ border: '1px solid #e5e7eb' }}
      />
    </div>
  );
}

export default AdvancedPlayground;`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="usage" className="py-16 bg-dark-900">
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
            Usage Examples
          </h2>
          <p className="text-base text-dark-300 max-w-2xl mx-auto">
            Learn how to integrate React Playground Editor into your
            applications with these practical examples.
          </p>
        </motion.div>

        {/* Basic Usage */}
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
                <Code className="w-4 h-4 text-syntax-string" />
                <h3 className="text-base font-semibold text-dark-100">
                  Basic Usage
                </h3>
              </div>
              <button
                onClick={() => copyToClipboard(basicExample)}
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
                language="jsx"
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
                {basicExample}
              </SyntaxHighlighter>
            </div>
          </div>
        </motion.div>

        {/* Advanced Usage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="code-editor-bg rounded-lg shadow-lg overflow-hidden">
            <div className="bg-dark-800 px-4 py-3 flex items-center justify-between border-b border-dark-700">
              <div className="flex items-center space-x-2">
                <Code className="w-4 h-4 text-syntax-function" />
                <h3 className="text-base font-semibold text-dark-100">
                  Advanced Usage with Event Handlers
                </h3>
              </div>
              <button
                onClick={() => copyToClipboard(advancedExample)}
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
                language="jsx"
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
                {advancedExample}
              </SyntaxHighlighter>
            </div>
          </div>
        </motion.div>

        {/* Usage Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <div className="card p-4">
            <div className="w-10 h-10 bg-primary-600/20 rounded-md flex items-center justify-center mb-3">
              <span className="text-primary-400 font-bold text-sm">💡</span>
            </div>
            <h4 className="text-base font-semibold text-dark-100 mb-2">
              Initial Files
            </h4>
            <p className="text-dark-300 text-sm">
              Provide initial files as a key-value object where keys are file
              paths and values are file contents.
            </p>
          </div>

          <div className="card p-4">
            <div className="w-10 h-10 bg-syntax-string/20 rounded-md flex items-center justify-center mb-3">
              <span className="text-syntax-string font-bold text-sm">🎨</span>
            </div>
            <h4 className="text-base font-semibold text-dark-100 mb-2">
              Customization
            </h4>
            <p className="text-dark-300 text-sm">
              Customize the appearance with themes, show/hide panels, and add
              custom styling with className and style props.
            </p>
          </div>

          <div className="card p-4">
            <div className="w-10 h-10 bg-syntax-keyword/20 rounded-md flex items-center justify-center mb-3">
              <span className="text-syntax-keyword font-bold text-sm">⚡</span>
            </div>
            <h4 className="text-base font-semibold text-dark-100 mb-2">
              Event Handling
            </h4>
            <p className="text-dark-300 text-sm">
              Listen to file changes and active file changes to implement
              auto-save, persistence, or other custom behaviors.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
