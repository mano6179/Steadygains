import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { currentUser, isAdmin } = useAuth();
  const { isDarkMode } = useTheme();

  return (
    <div className="space-y-6">
      <div className={`p-6 rounded-sm shadow-card ${isDarkMode ? 'bg-primary-DEFAULT border border-primary-light' : 'bg-white border border-neutral-lightest'}`}>
        <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-primary-DEFAULT'}`}>Welcome, {currentUser?.name}</h2>
        <p className={`${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'}`}>
          This is your personal trading dashboard. Here you can track your investments,
          monitor performance, and stay updated with the latest market trends.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* NAV Card */}
        <div className={`p-6 rounded-sm shadow-card ${isDarkMode ? 'bg-primary-DEFAULT border border-primary-light' : 'bg-white border border-neutral-lightest'}`}>
          <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-secondary-DEFAULT'}`}>NAV</h3>
          <p className={`${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'} mb-4`}>
            Track the Net Asset Value of your investments over time. The graph will automatically scale as new data points are added weekly.
          </p>
          <Link
            to="/nav-tracker-detailed"
            className={`inline-block px-4 py-2 rounded-sm ${isDarkMode ? 'bg-primary-light text-white' : 'bg-secondary-DEFAULT text-white'} hover:bg-primary-light transition-colors duration-200`}
          >
            View NAV
          </Link>
        </div>

        {/* Activity Logs Card */}
        <div className={`p-6 rounded-sm shadow-card ${isDarkMode ? 'bg-primary-DEFAULT border border-primary-light' : 'bg-white border border-neutral-lightest'}`}>
          <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-primary-DEFAULT'}`}>Activity Logs</h3>
          <p className={`${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'} mb-4`}>
            View all activity logs including IV tracker, trades, market updates, and weekly profits.
          </p>
          <Link
            to="/weekly-updates"
            className={`inline-block px-4 py-2 rounded-sm ${isDarkMode ? 'bg-primary-light text-white' : 'bg-primary-DEFAULT text-white'} hover:bg-primary-light transition-colors duration-200`}
          >
            View Logs
          </Link>
        </div>

        {/* Admin-only cards */}
        {isAdmin() && (
          <>
            <div className={`p-6 rounded-sm shadow-card ${isDarkMode ? 'bg-primary-DEFAULT border border-primary-light' : 'bg-white border border-neutral-lightest'}`}>
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-secondary-dark'}`}>Trade Log</h3>
              <p className={`${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'} mb-4`}>
                Record and track all your trading activities.
              </p>
              <Link
                to="/trade-log"
                className={`inline-block px-4 py-2 rounded-sm ${isDarkMode ? 'bg-primary-light text-white' : 'bg-secondary-dark text-white'} hover:bg-primary-light transition-colors duration-200`}
              >
                View Trade Log
              </Link>
            </div>

            <div className={`p-6 rounded-sm shadow-card ${isDarkMode ? 'bg-primary-DEFAULT border border-primary-light' : 'bg-white border border-neutral-lightest'}`}>
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-accent-blue'}`}>Logger</h3>
              <p className={`${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'} mb-4`}>
                Log IV tracker, trades, market updates, and weekly profits.
              </p>
              <Link
                to="/logger"
                className={`inline-block px-4 py-2 rounded-sm ${isDarkMode ? 'bg-primary-light text-white' : 'bg-accent-blue text-white'} hover:bg-primary-light transition-colors duration-200`}
              >
                Open Logger
              </Link>
            </div>

            <div className={`p-6 rounded-sm shadow-card ${isDarkMode ? 'bg-primary-DEFAULT border border-primary-light' : 'bg-white border border-neutral-lightest'}`}>
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-primary-DEFAULT'}`}>Excel Upload</h3>
              <p className={`${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'} mb-4`}>
                Upload Excel files to import data into the system.
              </p>
              <Link
                to="/excel-upload"
                className={`inline-block px-4 py-2 rounded-sm ${isDarkMode ? 'bg-primary-light text-white' : 'bg-primary-DEFAULT text-white'} hover:bg-primary-light transition-colors duration-200`}
              >
                Upload Excel
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
