import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/register', userData);
export const getCurrentUser = () => api.get('/auth/me');

// Facility endpoints
export const getFacilities = () => api.get('/facilities');
export const getFacilityById = (id) => api.get(`/facilities/${id}`);

// Booking endpoints
export const createBooking = (bookingData) => api.post('/bookings', bookingData);
export const getUserBookings = (userId) => api.get(`/bookings/user/${userId}`);
export const getBookingById = (id) => api.get(`/bookings/${id}`);
export const cancelBooking = (id) => api.patch(`/bookings/${id}/cancel`);

export default api; 