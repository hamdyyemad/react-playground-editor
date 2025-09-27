import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "React Playground Editor - Interactive Code Editor Component",
  description:
    "A powerful, feature-rich React component for interactive code editing with live preview, file management, terminal, and dependency management. Perfect for online IDEs, coding tutorials, and developer tools.",
  keywords: [
    "react",
    "code editor",
    "monaco editor",
    "live preview",
    "interactive coding",
    "online IDE",
    "web development",
    "javascript",
    "typescript",
    "react component",
    "npm package",
    "developer tools",
  ],
  authors: [{ name: "React Playground Editor Team" }],
  creator: "React Playground Editor",
  publisher: "React Playground Editor",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://react-playground-editor.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "React Playground Editor - Interactive Code Editor Component",
    description:
      "A powerful, feature-rich React component for interactive code editing with live preview, file management, terminal, and dependency management.",
    url: "https://react-playground-editor.vercel.app",
    siteName: "React Playground Editor",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "React Playground Editor - Interactive Code Editor",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "React Playground Editor - Interactive Code Editor Component",
    description:
      "A powerful, feature-rich React component for interactive code editing with live preview, file management, terminal, and dependency management.",
    images: ["/og-image.png"],
    creator: "@reactplayground",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
