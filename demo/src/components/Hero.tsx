"use client";

import { motion } from "framer-motion";
import { Play, Download, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="gradient-bg pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-3 py-1 rounded-full bg-primary-600/20 text-primary-400 text-xs font-medium mb-6 border border-primary-600/30"
          >
            <Star className="w-3 h-3 mr-1 fill-current" />
            Featured on NPM
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-100 mb-4"
          >
            Interactive <span className="gradient-text">Code Editor</span>
            <br />
            for React
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg text-dark-300 mb-6 max-w-2xl mx-auto leading-relaxed"
          >
            A powerful, feature-rich React component with live preview, file
            management, terminal, and dependency management. Perfect for online
            IDEs and coding tutorials.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8"
          >
            <a
              href="#demo"
              className="btn-primary text-sm px-6 py-2 flex items-center"
            >
              <Play className="w-4 h-4 mr-1" />
              Try Live Demo
            </a>
            <a
              href="#installation"
              className="btn-secondary text-sm px-6 py-2 flex items-center"
            >
              <Download className="w-4 h-4 mr-1" />
              Get Started
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-xl mx-auto"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-400 mb-1">
                1.0.7+
              </div>
              <div className="text-dark-400 text-xs">Latest Version</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-400 mb-1">
                100%
              </div>
              <div className="text-dark-400 text-xs">TypeScript</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-400 mb-1">0</div>
              <div className="text-dark-400 text-xs">Dependencies</div>
            </div>
          </motion.div>
        </div>

        {/* Hero Visual */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 relative"
        >
          <div className="relative max-w-4xl mx-auto">
            {/* Code Editor Mockup */}
            <div className="code-editor-bg rounded-lg shadow-2xl overflow-hidden">
              <div className="bg-dark-800 px-3 py-2 flex items-center space-x-2 border-b border-dark-700">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-dark-400 text-xs ml-3 font-mono">
                  React Playground Editor
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 h-48">
                  {/* File Explorer */}
                  <div className="terminal-bg rounded-md p-3">
                    <div className="text-dark-400 text-xs mb-2 font-mono">
                      Files
                    </div>
                    <div className="space-y-1">
                      <div className="text-syntax-string text-xs">📁 src/</div>
                      <div className="text-syntax-function text-xs ml-3">
                        📄 App.jsx
                      </div>
                      <div className="text-syntax-function text-xs ml-3">
                        📄 index.js
                      </div>
                    </div>
                  </div>

                  {/* Code Editor */}
                  <div className="terminal-bg rounded-md p-3">
                    <div className="text-dark-400 text-xs mb-2 font-mono">
                      Editor
                    </div>
                    <div className="text-syntax-variable text-xs font-mono leading-relaxed">
                      <span className="syntax-keyword">import</span> React{" "}
                      <span className="syntax-keyword">from</span>{" "}
                      <span className="syntax-string">&apos;react&apos;</span>
                      <br />
                      <br />
                      <span className="syntax-keyword">function</span>{" "}
                      <span className="syntax-function">App</span>() {"{"}
                      <br />
                      &nbsp;&nbsp;<span className="syntax-keyword">
                        return
                      </span>{" "}
                      (
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&lt;
                      <span className="syntax-type">div</span>&gt;
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hello World!
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
                  <div className="bg-dark-800 rounded-md p-3 border border-dark-600">
                    <div className="text-dark-400 text-xs mb-2 font-mono">
                      Preview
                    </div>
                    <div className="text-dark-100 text-xs">Hello World!</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-3 -right-3 w-6 h-6 bg-primary-500 rounded-full animate-float"></div>
            <div
              className="absolute -bottom-3 -left-3 w-4 h-4 bg-syntax-function rounded-full animate-float"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
