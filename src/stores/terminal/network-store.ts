import { create } from "zustand";

interface NetworkRequest {
  id: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  url: string;
  status: number;
  statusText: string;
  duration: number;
  timestamp: Date;
  size?: number;
  type: "request" | "response";
}

interface NetworkState {
  requests: NetworkRequest[];
  addRequest: (request: Omit<NetworkRequest, "id" | "timestamp">) => void;
  clearRequests: () => void;
}

export const useNetworkStore = create<NetworkState>((set) => ({
  requests: [],
  addRequest: (request) =>
    set((state) => ({
      requests: [
        ...state.requests,
        {
          ...request,
          id: Date.now().toString(),
          timestamp: new Date(),
        },
      ].slice(-50), // Keep last 50 requests
    })),
  clearRequests: () => set({ requests: [] }),
}));
