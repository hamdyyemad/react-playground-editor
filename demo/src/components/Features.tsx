"use client";

import { motion } from "framer-motion";
import {
  Code,
  FileText,
  Terminal,
  Eye,
  Package,
  Zap,
  Palette,
  GitBranch,
  Monitor,
} from "lucide-react";

const features = [
  {
    icon: Code,
    title: "Monaco Editor Integration",
    description:
      "Powered by the same editor that powers VS Code, with syntax highlighting, IntelliSense, and advanced editing features.",
    color: "text-syntax-function",
    bgColor: "bg-primary-600/20",
  },
  {
    icon: Eye,
    title: "Live Preview",
    description:
      "Real-time preview of your code with automatic updates as you type. See changes instantly without manual refresh.",
    color: "text-syntax-string",
    bgColor: "bg-syntax-string/20",
  },
  {
    icon: FileText,
    title: "File Management",
    description:
      "Complete file system with create, edit, delete, and rename operations. Organize your project files with ease.",
    color: "text-syntax-keyword",
    bgColor: "bg-syntax-keyword/20",
  },
  {
    icon: Terminal,
    title: "Integrated Terminal",
    description:
      "Built-in terminal with console output, network monitoring, and command execution capabilities.",
    color: "text-syntax-number",
    bgColor: "bg-syntax-number/20",
  },
  {
    icon: Package,
    title: "Dependency Management",
    description:
      "Smart dependency detection and management with CDN integration and package installation.",
    color: "text-syntax-type",
    bgColor: "bg-syntax-type/20",
  },
  {
    icon: Zap,
    title: "High Performance",
    description:
      "Optimized for speed with efficient rendering, minimal re-renders, and smooth user experience.",
    color: "text-syntax-operator",
    bgColor: "bg-syntax-operator/20",
  },
  {
    icon: Palette,
    title: "Customizable Themes",
    description:
      "Dark and light themes with customizable styling options to match your application design.",
    color: "text-primary-400",
    bgColor: "bg-primary-600/20",
  },
  {
    icon: GitBranch,
    title: "TypeScript Support",
    description:
      "Full TypeScript support with type definitions and excellent developer experience.",
    color: "text-syntax-function",
    bgColor: "bg-syntax-function/20",
  },
  {
    icon: Monitor,
    title: "Responsive Design",
    description:
      "Fully responsive design that works perfectly on desktop, tablet, and mobile devices.",
    color: "text-syntax-variable",
    bgColor: "bg-syntax-variable/20",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Features() {
  return (
    <section id="features" className="py-16 bg-dark-800">
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
            Powerful Features for Modern Development
          </h2>
          <p className="text-base text-dark-300 max-w-2xl mx-auto">
            Everything you need to build interactive coding experiences, online
            IDEs, and educational platforms.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="feature-card group"
            >
              <div
                className={`w-10 h-10 ${feature.bgColor} rounded-md flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}
              >
                <feature.icon className={`w-5 h-5 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-dark-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-dark-300 leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-dark-700 rounded-lg p-6 border border-dark-600">
            <h3 className="text-xl font-bold text-dark-100 mb-3">
              Ready to Get Started?
            </h3>
            <p className="text-dark-300 mb-4 max-w-xl mx-auto text-sm">
              Join thousands of developers who are already using React
              Playground Editor to build amazing interactive coding experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="#demo" className="btn-primary text-sm">
                Try Live Demo
              </a>
              <a href="#installation" className="btn-outline text-sm">
                View Documentation
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
