"use client";

import { motion } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";

export default function Demo() {
  return (
    <section id="demo" className="py-16 bg-dark-900">
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
            See It In Action
          </h2>
          <p className="text-base text-dark-300 max-w-2xl mx-auto">
            Experience the power of React Playground Editor with our interactive
            demo. Try editing the code and see the live preview update in
            real-time.
          </p>
        </motion.div>

        {/* Demo Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Demo Frame */}
          <div className="code-editor-bg rounded-lg shadow-2xl overflow-hidden">
            {/* Demo Header */}
            <div className="bg-dark-800 px-4 py-3 flex items-center justify-between border-b border-dark-700">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-dark-300 text-xs font-mono">
                  React Playground Editor Demo
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-dark-400 text-xs font-mono">Live</span>
              </div>
            </div>

            {/* Demo Content */}
            <div className="h-80 bg-dark-900 flex">
              {/* File Explorer */}
              <div className="w-56 bg-dark-800 border-r border-dark-700 p-3">
                <div className="text-dark-400 text-xs font-mono mb-2">
                  Files
                </div>
                <div className="space-y-1">
                  <div className="text-syntax-string text-xs flex items-center">
                    <span className="mr-1">📁</span>
                    src/
                  </div>
                  <div className="text-syntax-function text-xs flex items-center ml-3">
                    <span className="mr-1">📄</span>
                    App.jsx
                  </div>
                  <div className="text-syntax-function text-xs flex items-center ml-3">
                    <span className="mr-1">📄</span>
                    index.js
                  </div>
                  <div className="text-syntax-function text-xs flex items-center ml-3">
                    <span className="mr-1">📄</span>
                    styles.css
                  </div>
                </div>
              </div>

              {/* Code Editor */}
              <div className="flex-1 p-3">
                <div className="text-dark-400 text-xs font-mono mb-2">
                  Editor
                </div>
                <div className="text-syntax-variable text-xs font-mono leading-relaxed">
                  <span className="syntax-keyword">import</span> React, {"{"}{" "}
                  useState {"}"} <span className="syntax-keyword">from</span>{" "}
                  <span className="syntax-string">'react'</span>
                  <br />
                  <br />
                  <span className="syntax-keyword">function</span>{" "}
                  <span className="syntax-function">App</span>() {"{"}
                  <br />
                  &nbsp;&nbsp;<span className="syntax-keyword">const</span>{" "}
                  [count, setCount] ={" "}
                  <span className="syntax-function">useState</span>(
                  <span className="syntax-number">0</span>)
                  <br />
                  <br />
                  &nbsp;&nbsp;<span className="syntax-keyword">return</span> (
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&lt;
                  <span className="syntax-type">div</span>{" "}
                  <span className="syntax-keyword">className</span>=
                  <span className="syntax-string">"app"</span>&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                  <span className="syntax-type">h1</span>&gt;Hello React!&lt;/
                  <span className="syntax-type">h1</span>&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                  <span className="syntax-type">p</span>&gt;Count: {"{"}count
                  {"}"}&lt;/
                  <span className="syntax-type">p</span>&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                  <span className="syntax-type">button</span>{" "}
                  <span className="syntax-keyword">onClick</span>={"{"}() =&gt;
                  setCount(count + <span className="syntax-number">1</span>)
                  {"}"}&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Increment
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/
                  <span className="syntax-type">button</span>&gt;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&lt;/
                  <span className="syntax-type">div</span>&gt;
                  <br />
                  &nbsp;&nbsp;)
                  <br />
                  {"}"}
                </div>
              </div>

              {/* Preview */}
              <div className="w-72 bg-dark-800 border-l border-dark-700 p-3">
                <div className="text-dark-400 text-xs font-mono mb-2">
                  Preview
                </div>
                <div className="bg-dark-700 rounded-md p-3 border border-dark-600">
                  <h1 className="text-lg font-bold text-dark-100 mb-1">
                    Hello React!
                  </h1>
                  <p className="text-dark-300 mb-2 text-sm">Count: 0</p>
                  <button className="bg-primary-600 text-white px-3 py-1 rounded text-xs hover:bg-primary-500 transition-colors">
                    Increment
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Demo CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-6"
          >
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <a
                href="/playground"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm px-6 py-2 flex items-center"
              >
                <Play className="w-4 h-4 mr-1" />
                Try Interactive Demo
              </a>
              <a
                href="https://github.com/hamdyyemad/react-playground-editor"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-sm px-6 py-2 flex items-center"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                View Source Code
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
