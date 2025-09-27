import { useFileStore } from "@/stores/explorer/file-store";
import { WebViewContent } from "./components/web-view-content";

export function WebView() {
  const { files } = useFileStore();

  return <WebViewContent files={files} />;
}
