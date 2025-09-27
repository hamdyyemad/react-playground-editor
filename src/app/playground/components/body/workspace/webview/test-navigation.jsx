// Test component for webview navigation
// Add this to your App.jsx to test navigation

import React from "react";

export default function TestNavigation() {
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#2d3748",
        borderRadius: "8px",
        margin: "10px",
      }}
    >
      <h2 style={{ color: "#4ade80", marginBottom: "15px" }}>
        Navigation Test
      </h2>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <a
          href="/about"
          style={{
            padding: "8px 16px",
            backgroundColor: "#4ade80",
            color: "#1a1a1a",
            textDecoration: "none",
            borderRadius: "4px",
            display: "inline-block",
          }}
        >
          Go to About
        </a>

        <a
          href="/contact"
          style={{
            padding: "8px 16px",
            backgroundColor: "#4ade80",
            color: "#1a1a1a",
            textDecoration: "none",
            borderRadius: "4px",
            display: "inline-block",
          }}
        >
          Go to Contact
        </a>

        <a
          href="/products"
          style={{
            padding: "8px 16px",
            backgroundColor: "#4ade80",
            color: "#1a1a1a",
            textDecoration: "none",
            borderRadius: "4px",
            display: "inline-block",
          }}
        >
          Go to Products
        </a>

        <a
          href="https://google.com"
          target="_blank"
          style={{
            padding: "8px 16px",
            backgroundColor: "#6b7280",
            color: "#ffffff",
            textDecoration: "none",
            borderRadius: "4px",
            display: "inline-block",
          }}
        >
          External Link (Google)
        </a>
      </div>

      <div style={{ marginTop: "15px", fontSize: "14px", color: "#a0aec0" }}>
        <p>• Click the links above to test navigation</p>
        <p>• Use the back/forward buttons in the webview header</p>
        <p>• External links should open in new tabs</p>
        <p>• Check the console for navigation logs</p>
      </div>
    </div>
  );
}
