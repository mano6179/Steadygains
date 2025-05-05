import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AddIcon from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';

// Navigation items with roles
const navigation = [
  { name: 'Dashboard', href: '/', icon: <DashboardIcon fontSize="small" />, roles: ['admin', 'investor'] },
  { name: 'Trade Log', href: '/trade-log', icon: <BarChartIcon fontSize="small" />, roles: ['admin'] },
  { name: 'NAV Tracker', href: '/nav-tracker', icon: <ShowChartIcon fontSize="small" />, roles: ['admin', 'investor'] },
  { name: 'NAV Detailed', href: '/nav-tracker-detailed', icon: <ShowChartIcon fontSize="small" />, roles: ['admin', 'investor'] },
  { name: 'Indicators', href: '/indicators', icon: <SignalCellularAltIcon fontSize="small" />, roles: ['admin'] },
  { name: 'Economic Calendar', href: '/economic-calendar', icon: <CalendarMonthIcon fontSize="small" />, roles: ['admin'] },
  { name: 'Excel Upload', href: '/excel-upload', icon: <UploadFileIcon fontSize="small" />, roles: ['admin'] },
  { name: 'Add Weekly Update', href: '/weekly-update', icon: <AddIcon fontSize="small" />, roles: ['admin'] },
  { name: 'View Updates', href: '/weekly-updates', icon: <ListAltIcon fontSize="small" />, roles: ['admin', 'investor'] },
];

function Layout({ children }) {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { currentUser, logout, isAdmin, isInvestor } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Filter navigation items based on user role
  const filteredNavigation = navigation.filter(item => {
    if (!currentUser) return false;
    if (isAdmin()) return true;
    if (isInvestor() && item.roles.includes('investor')) return true;
    return false;
  });

  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-bgDark text-textLight' : 'bg-bgLight text-textDark'}`}>
      {/* Sidebar */}
      <div className={`w-64 ${isDarkMode ? 'bg-primary-dark' : 'bg-primary-DEFAULT'} text-white`}>
        {/* Logo area */}
        <div className="p-6 border-b border-opacity-20 border-white">
          <h1 className="text-xl font-bold tracking-tight text-white">Steady Gains</h1>
        </div>

        {/* Navigation */}
        <nav className="mt-6">
          {filteredNavigation.map((item) => {
            // Determine styling based on active route
            const isActive = location.pathname === item.href;
            const activeClasses = isActive
              ? `${isDarkMode ? 'bg-primary-light' : 'bg-primary-light'} border-l-4 border-accent-blue`
              : 'border-l-4 border-transparent';

            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-6 py-3 ${activeClasses} hover:bg-primary-light transition-colors duration-200`}
              >
                <span className={`mr-3 ${isActive ? 'text-white' : 'text-neutral-lighter'}`}>
                  {item.icon}
                </span>
                <span className={`${isActive ? 'text-white font-medium' : 'text-neutral-lighter font-normal'}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Footer area */}
        <div className="absolute bottom-0 w-64 p-4 border-t border-opacity-20 border-white">
          <div className="text-xs text-neutral-lighter text-center">
            © 2025 Steady Gains
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className={`${isDarkMode ? 'bg-bgDark' : 'bg-white'} border-b border-neutral-lightest shadow-sm z-10`}>
          <div className="flex justify-between items-center px-6 py-4">
            <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-primary-DEFAULT'}`}>
              {filteredNavigation.find(item => item.href === location.pathname)?.name || 'Dashboard'}
            </h2>
            <div className="flex items-center space-x-6">
              <button
                onClick={toggleDarkMode}
                className={`p-1 rounded-full ${isDarkMode ? 'text-neutral-lighter hover:text-white' : 'text-neutral-light hover:text-primary-DEFAULT'}`}
              >
                {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </button>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-primary-light text-white flex items-center justify-center mr-2 text-sm font-medium">
                  {currentUser?.name?.charAt(0) || 'U'}
                </div>
                <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-primary-DEFAULT'}`}>{currentUser?.name}</div>
              </div>
              <button
                onClick={handleLogout}
                className={`p-1 rounded-full ${isDarkMode ? 'text-neutral-lighter hover:text-white' : 'text-neutral-light hover:text-primary-DEFAULT'}`}
              >
                <LogoutIcon />
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className={`flex-1 overflow-auto p-6 ${isDarkMode ? 'bg-bgDark' : 'bg-neutral-lightest'}`}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;

// These components are moved to FormElements.js
