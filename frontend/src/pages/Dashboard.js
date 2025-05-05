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
        {/* NAV Tracker Card */}
        <div className={`p-6 rounded-sm shadow-card ${isDarkMode ? 'bg-secondary-DEFAULT border border-secondary-light' : 'bg-white border border-neutral-lightest'}`}>
          <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-secondary-DEFAULT'}`}>NAV Tracker</h3>
          <p className={`${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'} mb-4`}>
            Track the Net Asset Value of your investments over time.
          </p>
          <div className="flex space-x-3">
            <Link
              to="/nav-tracker"
              className={`inline-block px-4 py-2 rounded-sm ${isDarkMode ? 'bg-secondary-light text-white' : 'bg-secondary-DEFAULT text-white'} hover:bg-secondary-light transition-colors duration-200`}
            >
              View NAV Tracker
            </Link>
            <Link
              to="/nav-tracker-detailed"
              className={`inline-block px-4 py-2 rounded-sm ${isDarkMode ? 'border border-secondary-light text-secondary-light' : 'border border-secondary-DEFAULT text-secondary-DEFAULT'} hover:bg-secondary-DEFAULT hover:text-white transition-colors duration-200`}
            >
              Detailed View
            </Link>
          </div>
        </div>

        {/* Weekly Updates Card */}
        <div className={`p-6 rounded-sm shadow-card ${isDarkMode ? 'bg-primary-light border border-primary-DEFAULT' : 'bg-white border border-neutral-lightest'}`}>
          <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-primary-light'}`}>Weekly Updates</h3>
          <p className={`${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'} mb-4`}>
            View weekly performance updates and fund reports.
          </p>
          <Link
            to="/weekly-updates"
            className={`inline-block px-4 py-2 rounded-sm ${isDarkMode ? 'bg-primary-DEFAULT text-white' : 'bg-primary-light text-white'} hover:bg-primary-DEFAULT transition-colors duration-200`}
          >
            View Updates
          </Link>
        </div>

        {/* Admin-only cards */}
        {isAdmin() && (
          <>
            <div className={`p-6 rounded-sm shadow-card ${isDarkMode ? 'bg-secondary-dark border border-secondary-DEFAULT' : 'bg-white border border-neutral-lightest'}`}>
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-secondary-dark'}`}>Trade Log</h3>
              <p className={`${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'} mb-4`}>
                Record and track all your trading activities.
              </p>
              <Link
                to="/trade-log"
                className={`inline-block px-4 py-2 rounded-sm ${isDarkMode ? 'bg-secondary-DEFAULT text-white' : 'bg-secondary-dark text-white'} hover:bg-secondary-DEFAULT transition-colors duration-200`}
              >
                View Trade Log
              </Link>
            </div>

            <div className={`p-6 rounded-sm shadow-card ${isDarkMode ? 'bg-accent-blue border border-primary-accent' : 'bg-white border border-neutral-lightest'}`}>
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-accent-blue'}`}>Add Weekly Update</h3>
              <p className={`${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'} mb-4`}>
                Create a new weekly performance update.
              </p>
              <Link
                to="/weekly-update"
                className={`inline-block px-4 py-2 rounded-sm ${isDarkMode ? 'bg-primary-accent text-white' : 'bg-accent-blue text-white'} hover:bg-primary-accent transition-colors duration-200`}
              >
                Add Update
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
