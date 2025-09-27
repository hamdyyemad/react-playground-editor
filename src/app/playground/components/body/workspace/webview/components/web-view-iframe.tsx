import { useRef, useEffect, useCallback } from "react";
import { useConsoleStore } from "../../../../../../../stores/terminal/console-store";

interface WebViewIframeProps {
  htmlContent: string;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  onUrlChange?: (url: string) => void;
  onNavigation?: (url: string) => void;
  currentUrl?: string;
  refreshTrigger?: number;
}

export function WebViewIframe({
  htmlContent,
  isLoading,
  setIsLoading,
  onUrlChange,
  onNavigation,
  currentUrl,
  refreshTrigger,
}: WebViewIframeProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const previousHtmlRef = useRef<string>("");
  const addConsoleOutput = useConsoleStore((state) => state.addConsoleOutput);

  // Memoize the console output function to prevent unnecessary re-renders
  const handleConsoleOutput = useCallback(
    (level: string, message: string) => {
      const timestamp = new Date().toLocaleTimeString();
      const formattedMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
      addConsoleOutput(formattedMessage);
    },
    [addConsoleOutput]
  );

  const updatePreview = useCallback(() => {
    if (iframeRef.current) {
      setIsLoading(true);
      const blob = new Blob([htmlContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);

      iframeRef.current.src = url;

      // Notify parent component of the new URL (only for non-blob URLs)
      if (onUrlChange && !url.startsWith("blob:")) {
        onUrlChange(url);
      }

      // Clean up the URL after a short delay
      setTimeout(() => {
        URL.revokeObjectURL(url);
        setIsLoading(false);
      }, 100);
    }
  }, [htmlContent, setIsLoading, onUrlChange]);

  // Listen for console messages and navigation from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Only accept messages from our iframe
      if (
        event.source === iframeRef.current?.contentWindow &&
        event.data.type === "console"
      ) {
        const level = event.data.level || "log";
        const message = event.data.message;
        handleConsoleOutput(level, message);
      }

      // Handle navigation requests
      if (
        event.source === iframeRef.current?.contentWindow &&
        event.data.type === "navigate"
      ) {
        const url = event.data.url;
        if (url) {
          // Open in new tab for external links
          if (url.startsWith("http://") || url.startsWith("https://")) {
            window.open(url, "_blank");
          } else {
            // For relative URLs, use navigation store
            console.log("Navigating to:", url);
            if (onNavigation) {
              onNavigation(url);
            }
          }
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleConsoleOutput, onUrlChange, onNavigation]);

  // Initial load effect
  useEffect(() => {
    if (htmlContent && !previousHtmlRef.current) {
      previousHtmlRef.current = htmlContent;
      updatePreview();
    }
  }, []);

  // Update preview when HTML content changes
  useEffect(() => {
    // Always update on initial render or when content changes
    if (htmlContent && htmlContent !== previousHtmlRef.current) {
      previousHtmlRef.current = htmlContent;
      const timeoutId = setTimeout(updatePreview, 100); // Debounce updates
      return () => clearTimeout(timeoutId);
    }
  }, [htmlContent, updatePreview]);

  // Handle refresh trigger
  useEffect(() => {
    if (refreshTrigger !== undefined && refreshTrigger > 0) {
      updatePreview();
    }
  }, [refreshTrigger, updatePreview]);

  // Handle URL changes from navigation store
  useEffect(() => {
    // If currentUrl is not a blob URL, it means we navigated to a new page
    if (currentUrl && !currentUrl.startsWith("blob:")) {
      // For now, just update the preview with the same content
      // In a real implementation, you'd load the new URL content
      updatePreview();
    }
  }, [currentUrl, updatePreview]);

  return (
    <div className="flex-1 relative">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-10">
          <div className="text-sm text-gray-600">Loading...</div>
        </div>
      )}

      <iframe
        ref={iframeRef}
        className="w-full h-full border-0"
        sandbox="allow-scripts"
        title="Live Preview"
      />
    </div>
  );
}
