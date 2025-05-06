import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setCurrentUser(user);
      // Set authorization header for all future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Mock authentication for development (since we're having CORS issues)
      // In a real app, this would be an API call to the backend

      // Check if credentials match our mock users
      let user = null;

      if (email === 'admin@steadygains.com' && password === 'password') {
        user = {
          id: 1,
          name: 'Admin User',
          email: 'admin@steadygains.com',
          role: 'admin',
          token: 'mock-jwt-token-admin'
        };
      } else if (email === 'investor@steadygains.com' && password === 'password') {
        user = {
          id: 2,
          name: 'Investor User',
          email: 'investor@steadygains.com',
          role: 'investor',
          token: 'mock-jwt-token-investor'
        };
      } else {
        throw new Error('Invalid email or password');
      }

      // Save user to localStorage
      localStorage.setItem('user', JSON.stringify(user));

      // Set user in state
      setCurrentUser(user);

      // Set authorization header for all future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

      return user;

      /* Commented out actual API call for now due to CORS issues
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password
      });

      const user = response.data;

      // Save user to localStorage
      localStorage.setItem('user', JSON.stringify(user));

      // Set user in state
      setCurrentUser(user);

      // Set authorization header for all future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

      return user;
      */
    } catch (error) {
      console.error('Authentication error:', error);

      // Format the error message to avoid passing objects to React components
      let errorMessage = 'Failed to login. Please check your credentials.';

      if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else if (error.message) {
        errorMessage = error.message;
      }

      throw errorMessage;
    }
  };

  const logout = () => {
    // Remove user from localStorage
    localStorage.removeItem('user');

    // Remove authorization header
    delete axios.defaults.headers.common['Authorization'];

    // Clear user from state
    setCurrentUser(null);
  };

  const isAdmin = () => {
    return currentUser?.role === 'admin';
  };

  const isInvestor = () => {
    return currentUser?.role === 'investor';
  };

  const value = {
    currentUser,
    login,
    logout,
    isAdmin,
    isInvestor
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

