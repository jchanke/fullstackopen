// vite.config.ts configures a proxy; re-routes to http://localhost:3001/api
// For production, use the actual API URL from environment variable or fallback to relative path
export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "/api";
