import { File, FileText, FileCode, FileImage, Package } from "lucide-react";

export const getFileIcon = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "jsx":
    case "js":
      return <FileCode className="w-3.5 h-3.5 text-blue-400" />;
    case "tsx":
    case "ts":
      return <FileCode className="w-3.5 h-3.5 text-blue-500" />;
    case "css":
      return <FileCode className="w-3.5 h-3.5 text-pink-400" />;
    case "html":
      return <FileText className="w-3.5 h-3.5 text-orange-400" />;
    case "json":
      return <Package className="w-3.5 h-3.5 text-yellow-400" />;
    case "md":
      return <FileText className="w-3.5 h-3.5 text-gray-400" />;
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
    case "svg":
      return <FileImage className="w-3.5 h-3.5 text-green-400" />;
    default:
      return <File className="w-3.5 h-3.5 text-gray-400" />;
  }
};

export const getFileIconDot = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "jsx":
    case "js":
      return <div className="w-3 h-3 bg-blue-400 rounded-sm"></div>;
    case "tsx":
    case "ts":
      return <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>;
    case "css":
      return <div className="w-3 h-3 bg-pink-400 rounded-sm"></div>;
    case "html":
      return <div className="w-3 h-3 bg-orange-400 rounded-sm"></div>;
    case "json":
      return <div className="w-3 h-3 bg-yellow-400 rounded-sm"></div>;
    case "md":
      return <div className="w-3 h-3 bg-gray-400 rounded-sm"></div>;
    default:
      return <div className="w-3 h-3 bg-gray-500 rounded-sm"></div>;
  }
};

export const getLanguageFromPath = (filePath: string): string => {
  const extension = filePath.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "jsx":
    case "js":
      return "javascript";
    case "tsx":
    case "ts":
      return "typescript";
    case "css":
      return "css";
    case "html":
      return "html";
    case "json":
      return "json";
    case "md":
      return "markdown";
    default:
      return "plaintext";
  }
};
