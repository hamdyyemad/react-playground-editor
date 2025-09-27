import { usePanelSizesStore, useWebViewStore } from "../../../../stores";
import { ResizableBox } from "react-resizable";
import { WebView } from "./workspace";

export function WebViewCanvas() {
  const { showWebView } = useWebViewStore();
  const { webViewWidth, setWebViewWidth } = usePanelSizesStore();

  return (
    <>
      {showWebView && (
        <ResizableBox
          width={webViewWidth}
          height={Infinity}
          minConstraints={[200, Infinity]}
          maxConstraints={[800, Infinity]}
          onResize={(e, { size }) => setWebViewWidth(size.width)}
          resizeHandles={["w", "sw"]}
          className="border-l border-gray-700"
        >
          <div className="h-full">
            <WebView />
          </div>
        </ResizableBox>
      )}
    </>
  );
}
