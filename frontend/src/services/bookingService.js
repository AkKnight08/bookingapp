import axios from 'axios';

const API_URL = 'http://localhost:8000/api/bookings';

const createBooking = async (bookingData) => {
  try {
    console.log('Sending booking request to:', API_URL);
    console.log('Booking data:', JSON.stringify(bookingData, null, 2));
    
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.post(API_URL, bookingData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    
    console.log('Booking response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Booking service error:', error);
    console.error('Error response:', error.response?.data);
    throw error.response?.data || { message: 'Error creating booking' };
  }
};

const getMyBookings = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    // Get user ID from token
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    const userId = tokenPayload.userId;

    const response = await axios.get(`${API_URL}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error.response?.data || { message: 'Error fetching bookings' };
  }
};

const getBooking = async (id) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching booking:', error);
    throw error.response?.data || { message: 'Error fetching booking' };
  }
};

const cancelBooking = async (id) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.patch(`${API_URL}/${id}/cancel`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error cancelling booking:', error);
    throw error.response?.data || { message: 'Error cancelling booking' };
  }
};

export { createBooking, getMyBookings, getBooking, cancelBooking }; 