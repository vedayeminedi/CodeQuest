/**
 * CodeQuest API Client Configuration & Base Layer
 * 
 * [BACKEND INTEGRATION POINT]
 * When connecting to a real backend API:
 * 1. Set VITE_API_URL in your .env file (e.g. VITE_API_URL=https://api.codequest.dev/v1)
 * 2. Switch simulateDelay to use native fetch / axios calls
 * 3. Add Authorization Bearer tokens from your auth provider
 */

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.codequest.dev/v1';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

/**
 * Utility to simulate realistic asynchronous network latency during frontend development.
 */
export async function simulateNetworkDelay<T>(data: T, delayMs: number = 250): Promise<ApiResponse<T>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      });
    }, delayMs);
  });
}
