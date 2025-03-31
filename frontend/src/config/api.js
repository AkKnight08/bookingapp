// Remove any trailing slashes from the base URL
const baseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/+$/, '');
export const API_URL = baseUrl; 