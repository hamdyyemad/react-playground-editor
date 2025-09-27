"use client";

import { useState } from "react";
import { Menu, X, Github, ExternalLink } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Features", href: "#features" },
    { name: "Demo", href: "#demo" },
    { name: "Installation", href: "#installation" },
    { name: "API", href: "#api" },
  ];

  return (
    <header className="fixed top-0 w-full bg-dark-900/90 backdrop-blur-md border-b border-dark-700 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 bg-gradient-to-r from-primary-500 to-syntax-function rounded-md flex items-center justify-center">
                  <span className="text-white font-bold text-xs">R</span>
                </div>
                <span className="text-lg font-bold gradient-text">
                  React Playground Editor
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-dark-300 hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href="https://github.com/hamdyyemad/react-playground-editor"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-300 hover:text-primary-400 transition-colors duration-200"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.npmjs.com/package/react-playground-editor"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs"
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              {/* View on NPM */}
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-dark-300 hover:text-primary-400 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-dark-800 border-t border-dark-700">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-dark-300 hover:text-primary-400 block px-3 py-2 text-sm font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 border-t border-dark-700">
                <a
                  href="https://github.com/hamdyyemad/react-playground-editor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-dark-300 hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </a>
                <a
                  href="https://www.npmjs.com/package/react-playground-editor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center btn-primary text-xs mx-3 mt-2"
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  View on NPM
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
