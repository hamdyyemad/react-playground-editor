"use client";
import React from "react";
import { Playground } from "react-playground-editor";
import "react-playground-editor/dist/index.css";
export default function PlaygroundPage() {
  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      <Playground
        initialFiles={{
          "src/App.jsx":
            'import React from "react";\n\nexport default function App() {\n  return <h1>Hello World!</h1>;\n}',
        }}
        defaultActiveFile="src/App.jsx"
      />
    </div>
  );
}
