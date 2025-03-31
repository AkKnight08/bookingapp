import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const response = await axios.get(`${API_URL}/api/users/me`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            setUser(response.data);
          } catch (error) {
            localStorage.removeItem('token');
            setUser(null);
          }
        }
      } catch (error) {
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/api/users/login`, {
        email,
        password
      });

      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setUser(user);
      return user;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/api/users/register`, {
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        password: userData.password,
      });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setUser(user);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 