"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    product: [
      { name: "Features", href: "#features" },
      { name: "Demo", href: "#demo" },
      { name: "Installation", href: "#installation" },
      { name: "API Reference", href: "#api" },
    ],
    resources: [
      {
        name: "Documentation",
        href: "https://github.com/hamdyyemad/react-playground-editor",
      },
      {
        name: "GitHub Repository",
        href: "https://github.com/hamdyyemad/react-playground-editor",
      },
      {
        name: "NPM Package",
        href: "https://www.npmjs.com/package/react-playground-editor",
      },
      {
        name: "Issues",
        href: "https://github.com/hamdyyemad/react-playground-editor/issues",
      },
    ],
    community: [
      {
        name: "GitHub Discussions",
        href: "https://github.com/hamdyyemad/react-playground-editor/discussions",
      },
      {
        name: "Contributing",
        href: "https://github.com/hamdyyemad/react-playground-editor/blob/main/CONTRIBUTING.md",
      },
      {
        name: "Code of Conduct",
        href: "https://github.com/hamdyyemad/react-playground-editor/blob/main/CODE_OF_CONDUCT.md",
      },
      {
        name: "License",
        href: "https://github.com/hamdyyemad/react-playground-editor/blob/main/LICENSE",
      },
    ],
  };

  return (
    <footer className="bg-dark-950 text-dark-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-7 h-7 bg-gradient-to-r from-primary-500 to-syntax-function rounded-md flex items-center justify-center">
                  <span className="text-white font-bold text-xs">R</span>
                </div>
                <span className="text-lg font-bold">
                  React Playground Editor
                </span>
              </div>
              <p className="text-dark-400 mb-4 max-w-sm text-sm">
                A powerful, feature-rich React component for interactive code
                editing with live preview, file management, and more.
              </p>
              <div className="flex space-x-3">
                <a
                  href="https://github.com/hamdyyemad/react-playground-editor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark-400 hover:text-primary-400 transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://www.npmjs.com/package/react-playground-editor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark-400 hover:text-primary-400 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* Product Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-base font-semibold mb-3">Product</h3>
              <ul className="space-y-2">
                {links.product.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-dark-400 hover:text-primary-400 transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Resources Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-base font-semibold mb-3">Resources</h3>
              <ul className="space-y-2">
                {links.resources.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-dark-400 hover:text-primary-400 transition-colors flex items-center text-sm"
                    >
                      {link.name}
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Community Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-base font-semibold mb-3">Community</h3>
              <ul className="space-y-2">
                {links.community.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-dark-400 hover:text-primary-400 transition-colors flex items-center text-sm"
                    >
                      {link.name}
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="py-6 border-t border-dark-800"
        >
          <div className="text-center">
            <h3 className="text-base font-semibold mb-2">Stay Updated</h3>
            <p className="text-dark-400 mb-4 text-sm">
              Get notified about new releases and updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 bg-dark-800 border border-dark-700 rounded-md text-dark-100 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              />
              <button className="btn-primary whitespace-nowrap text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="py-4 border-t border-dark-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-dark-400 text-xs mb-3 md:mb-0">
              © {currentYear} React Playground Editor. All rights reserved.
            </div>
            <div className="flex items-center space-x-3 text-xs text-dark-400">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-red-500 fill-current" />
              <span>by Hamdy Emad</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
