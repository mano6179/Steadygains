import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Login as LoginIcon } from '@mui/icons-material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the redirect path from location state or default to dashboard
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      // Convert error object to string to avoid rendering objects directly
      let errorMessage = 'Failed to login. Please check your credentials.';

      if (err.response?.data?.detail) {
        errorMessage = err.response.data.detail;
      } else if (typeof err === 'string') {
        errorMessage = err;
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex items-center justify-center min-h-screen ${isDarkMode ? 'bg-bgDark' : 'bg-login bg-opacity-10'}`}>
      <div className="w-full max-w-md">
        <div className={`${isDarkMode ? 'bg-bgDark border border-login' : 'bg-white'} shadow-lg rounded-lg overflow-hidden`}>
          <div className="px-6 py-8">
            <div className="text-center">
              <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-login' : 'text-login'} mb-2`}>
                Login to Steady Gains
              </h2>
              <p className={`${isDarkMode ? 'text-textLight' : 'text-textDark'} mb-6`}>
                Enter your credentials to access your account
              </p>
            </div>

            <div className="flex justify-center mb-6">
              <div className="p-3 rounded-full bg-buttonPrimary">
                <LoginIcon className="text-textLight" fontSize="large" />
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}


            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className={`block text-sm font-medium ${isDarkMode ? 'text-textLight' : 'text-textDark'}`}>
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`mt-1 block w-full rounded-md ${
                    isDarkMode
                      ? 'bg-bgDark border-login text-textLight'
                      : 'border-gray-300 text-textDark'
                  } shadow-sm focus:border-buttonPrimary focus:ring-buttonPrimary`}
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className={`block text-sm font-medium ${isDarkMode ? 'text-textLight' : 'text-textDark'}`}>
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`mt-1 block w-full rounded-md ${
                    isDarkMode
                      ? 'bg-bgDark border-login text-textLight'
                      : 'border-gray-300 text-textDark'
                  } shadow-sm focus:border-buttonPrimary focus:ring-buttonPrimary`}
                  placeholder="Enter your password"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-textLight bg-buttonPrimary hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-buttonPrimary"
                >
                  {loading ? 'Logging in...' : 'Sign in'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;



