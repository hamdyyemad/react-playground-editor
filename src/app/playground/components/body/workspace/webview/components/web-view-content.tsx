import { useState, useMemo, useEffect } from "react";
import { WebViewHeader } from "./web-view-header";
import { WebViewIframe } from "./web-view-iframe";
import { HTMLGenerator } from "../utils/html-generator";
import { usePackageManagerStore } from "@/stores/package-manager/package-manager-store";
import { useWebViewNavigationStore } from "@/stores/webview/navigation-store";

interface WebViewContentProps {
  files: Record<string, string>;
}

export function WebViewContent({ files }: WebViewContentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const { currentUrl, setCurrentUrl, navigateTo } = useWebViewNavigationStore();
  const { analyzeProjectDependencies } = usePackageManagerStore();

  // Analyze dependencies whenever files change
  useEffect(() => {
    analyzeProjectDependencies(files);
  }, [files, analyzeProjectDependencies]);

  const htmlContent = useMemo(() => {
    return HTMLGenerator.generateHTML(files);
  }, [files]);

  const updatePreview = () => {
    // Force refresh by updating the trigger
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleUrlChange = (newUrl: string) => {
    setCurrentUrl(newUrl);
  };

  const handleNavigation = (url: string) => {
    navigateTo(url);
    // Force refresh to show the new URL
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="h-full flex flex-col bg-gray-800 border-l border-gray-700">
      <WebViewHeader url={currentUrl} onRefresh={updatePreview} />

      <WebViewIframe
        key={refreshTrigger} // Force re-render on refresh
        htmlContent={htmlContent}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        onUrlChange={handleUrlChange}
        onNavigation={handleNavigation}
        currentUrl={currentUrl}
      />
    </div>
  );
}
