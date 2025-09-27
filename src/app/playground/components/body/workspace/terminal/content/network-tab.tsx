import { useNetworkStore } from "../../../../../../../stores/terminal/network-store";

export function NetworkTab() {
  const { requests, clearRequests } = useNetworkStore();

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return "text-green-400";
    if (status >= 300 && status < 400) return "text-yellow-400";
    if (status >= 400) return "text-red-400";
    return "text-gray-400";
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-blue-600";
      case "POST":
        return "bg-green-600";
      case "PUT":
        return "bg-yellow-600";
      case "DELETE":
        return "bg-red-600";
      case "PATCH":
        return "bg-purple-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="space-y-3">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-400">{requests.length} requests</div>
        <button
          onClick={clearRequests}
          className="px-2 py-1 text-xs rounded bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Requests List */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {requests.length === 0 ? (
          <div className="text-gray-500 text-center py-8">
            No network requests yet. Requests from the WebView will appear here.
          </div>
        ) : (
          requests.map((request) => (
            <div
              key={request.id}
              className="flex items-center gap-3 p-3 bg-gray-800 rounded border border-gray-700 hover:bg-gray-750 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 text-xs font-mono text-white rounded ${getMethodColor(
                    request.method
                  )}`}
                >
                  {request.method}
                </span>
                <span
                  className={`text-sm font-medium ${getStatusColor(
                    request.status
                  )}`}
                >
                  {request.status}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-300 truncate">
                  {request.url}
                </div>
                <div className="text-xs text-gray-500">
                  {request.timestamp.toLocaleTimeString()} • {request.duration}
                  ms
                  {request.size && ` • ${request.size} bytes`}
                </div>
              </div>
              <div className="text-xs text-gray-400">{request.statusText}</div>
            </div>
          ))
        )}
      </div>

      {/* Summary Stats */}
      {requests.length > 0 && (
        <div className="p-3 bg-gray-800 rounded border border-gray-700">
          <div className="text-sm font-medium text-gray-300 mb-2">
            Network Summary
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-green-400">
              ✅{" "}
              {requests.filter((r) => r.status >= 200 && r.status < 400).length}{" "}
              successful
            </span>
            <span className="text-red-400">
              ❌ {requests.filter((r) => r.status >= 400).length} failed
            </span>
            <span className="text-gray-400">
              📊{" "}
              {Math.round(
                requests.reduce((acc, r) => acc + r.duration, 0) /
                  requests.length
              )}
              ms avg
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
