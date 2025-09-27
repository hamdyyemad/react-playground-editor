import { RefreshCw, X, ArrowLeft, ArrowRight } from "lucide-react";
import { useWebViewStore } from "../../../../../../../stores/webview/web-view-store";
import { useWebViewNavigationStore } from "../../../../../../../stores/webview/navigation-store";

interface WebViewHeaderProps {
  url: string;
  onRefresh: () => void;
}

export function WebViewHeader({ url, onRefresh }: WebViewHeaderProps) {
  const { toggleWebView } = useWebViewStore();
  const { goBack, goForward, canGoBack, canGoForward, navigateTo } =
    useWebViewNavigationStore();

  return (
    <>
      {/* Web View Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#171b22] border-b border-gray-700">
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-semibold text-gray-300">Web View</h3>
        </div>

        <div className="flex items-center gap-1">
          {/* Navigation buttons */}
          <button
            onClick={goBack}
            disabled={!canGoBack()}
            className="p-1.5 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Go back"
          >
            <ArrowLeft className="w-3 h-3" />
          </button>

          <button
            onClick={goForward}
            disabled={!canGoForward()}
            className="p-1.5 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Go forward"
          >
            <ArrowRight className="w-3 h-3" />
          </button>

          <div className="w-px h-4 bg-gray-600 mx-1"></div>

          <button
            onClick={onRefresh}
            className="p-1.5 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors"
            title="Refresh"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
          {/* <button className="p-1.5 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors">
            <ExternalLink className="w-3 h-3" />
          </button> */}
          {/* <button
            onClick={toggleWebView}
            className="p-1.5 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors"
          >
            <Maximize2 className="w-3 h-3" />
          </button> */}
          <button
            onClick={toggleWebView}
            className="p-1.5 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* URL Bar */}
      <div className="px-3 py-2 bg-[#171b22] border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-2 py-1 bg-gray-700 rounded text-xs text-gray-300">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>{url}</span>
          </div>
        </div>
      </div>
    </>
  );
}
