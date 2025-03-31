// Remove any trailing slashes and ensure proper URL formatting
const baseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/+$/, '');
export const API_URL = baseUrl;
export const API_ENDPOINTS = {
  auth: {
    login: `${API_URL}/api/users/login`,
    register: `${API_URL}/api/users/register`,
    me: `${API_URL}/api/users/me`
  },
  facilities: `${API_URL}/api/facilities`,
  bookings: `${API_URL}/api/bookings`
}; 