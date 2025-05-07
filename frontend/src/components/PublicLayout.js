import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LoginIcon from '@mui/icons-material/Login';
import ArticleIcon from '@mui/icons-material/Article';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function PublicLayout({ children }) {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { login, currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Login slider state
  const [loginSliderOpen, setLoginSliderOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      await login(email, password);
      setLoginSliderOpen(false);
      navigate('/dashboard');
    } catch (error) {
      setLoginError('Invalid email or password. Please try again.');
      console.error('Login error:', error);
    } finally {
      setLoginLoading(false);
    }
  };

  // Public navigation items
  const publicNavigation = [
    { name: 'Market Updates', href: '/public/market-updates', icon: <ArticleIcon fontSize="small" /> },
  ];

  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-bgDark text-textLight' : 'bg-bgLight text-textDark'}`}>
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className={`${isDarkMode ? 'bg-bgDark' : 'bg-white'} border-b border-neutral-lightest shadow-sm z-10`}>
          <div className="flex justify-between items-center px-6 py-4">
            <div className="flex items-center">
              <button
                onClick={() => navigate(currentUser ? '/dashboard' : '/')}
                className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-primary-DEFAULT'} hover:opacity-80 transition-opacity duration-200`}
              >
                Steady Gains
              </button>
            </div>

            {/* Navigation */}
            <div className="hidden md:flex space-x-6 mx-4">
              {publicNavigation.map((item) => {
                // Determine styling based on active route
                const isActive = location.pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-3 py-2 rounded-md transition-colors duration-200 ${
                      isActive
                        ? `${isDarkMode ? 'bg-primary-dark text-white' : 'bg-primary-DEFAULT text-black'}`
                        : `${isDarkMode ? 'text-neutral-lighter hover:text-white' : 'text-neutral-DEFAULT hover:text-primary-DEFAULT'}`
                    }`}
                  >
                    <span className="mr-2">
                      {item.icon}
                    </span>
                    <span>
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center space-x-2">
              {/* Theme toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full ${isDarkMode ? 'text-neutral-lighter hover:text-white' : 'text-neutral-light hover:text-primary-DEFAULT'}`}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </button>

              {/* Login/Dashboard button */}
              {currentUser ? (
                <button
                  onClick={() => navigate('/dashboard')}
                  className={`flex items-center px-3 py-2 rounded-md ${
                    isDarkMode
                      ? 'bg-primary-DEFAULT text-white hover:bg-primary-light'
                      : 'bg-primary-DEFAULT text-black hover:bg-primary-light'
                  }`}
                >
                  <span>Dashboard</span>
                </button>
              ) : (
                <button
                  onClick={() => setLoginSliderOpen(true)}
                  className={`flex items-center px-3 py-2 rounded-md ${
                    isDarkMode
                      ? 'bg-primary-DEFAULT text-white hover:bg-primary-light'
                      : 'bg-primary-DEFAULT text-black hover:bg-primary-light'
                  }`}
                >
                  <LoginIcon className="mr-2" fontSize="small" />
                  <span>Login</span>
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className={`flex-1 overflow-auto p-4 md:p-6 ${isDarkMode ? 'bg-bgDark' : 'bg-neutral-lightest'}`}>
          {children}
        </main>

        {/* Footer */}
        <footer className={`py-4 px-6 ${isDarkMode ? 'bg-blue-900' : 'bg-blue-800'} text-white shadow-md`}>
          <div className="text-center text-sm">
            © 2025 Steady Gains
          </div>
        </footer>
      </div>

      {/* Login Slider */}
      {loginSliderOpen && !currentUser && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex justify-end">
          <div
            className={`w-full max-w-md h-full ${
              isDarkMode ? 'bg-neutral-DEFAULT' : 'bg-white'
            } p-6 overflow-y-auto`}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-primary-DEFAULT'}`}>
                Login to Your Account
              </h2>
              <button
                onClick={() => setLoginSliderOpen(false)}
                className={`p-2 rounded-full ${isDarkMode ? 'text-white hover:bg-neutral-light' : 'text-neutral-DEFAULT hover:bg-neutral-lightest'}`}
              >
                <CloseIcon />
              </button>
            </div>

            {loginError && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium ${isDarkMode ? 'text-neutral-lighter' : 'text-neutral-DEFAULT'} mb-1`}
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <PersonIcon className={`h-5 w-5 ${isDarkMode ? 'text-neutral-light' : 'text-neutral-light'}`} />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`block w-full pl-10 pr-3 py-2 border ${
                      isDarkMode
                        ? 'bg-white border-neutral-light text-black'
                        : 'bg-white border-neutral-light text-neutral-DEFAULT'
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent`}
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className={`block text-sm font-medium ${isDarkMode ? 'text-neutral-lighter' : 'text-neutral-DEFAULT'} mb-1`}
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockIcon className={`h-5 w-5 ${isDarkMode ? 'text-neutral-light' : 'text-neutral-light'}`} />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`block w-full pl-10 pr-10 py-2 border ${
                      isDarkMode
                        ? 'bg-white border-neutral-light text-black'
                        : 'bg-white border-neutral-light text-neutral-DEFAULT'
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent`}
                    placeholder="••••••••"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`${isDarkMode ? 'text-neutral-light hover:text-white' : 'text-neutral-light hover:text-neutral-DEFAULT'}`}
                    >
                      {showPassword ? <VisibilityOffIcon className="h-5 w-5" /> : <VisibilityIcon className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loginLoading}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    loginLoading
                      ? 'bg-accent-blue/70 cursor-not-allowed'
                      : 'bg-accent-blue hover:bg-accent-blue/90'
                  } transition-colors duration-200`}
                >
                  {loginLoading ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PublicLayout;
