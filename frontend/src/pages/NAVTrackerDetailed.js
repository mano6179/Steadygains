import React from 'react';
import { useTheme } from '../context/ThemeContext';
import NAVGraph from '../components/NAVGraph';
import NAVDataTable from '../components/NAVDataTable';

const NAVTrackerDetailed = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="space-y-6">
      <div className={`p-6 rounded-sm shadow-card ${isDarkMode ? 'bg-primary-DEFAULT border border-primary-light' : 'bg-white border border-neutral-lightest'}`}>
        <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-primary-DEFAULT'}`}>NAV Tracker</h2>
        <p className={`${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'}`}>
          Track the Net Asset Value of your investments over time. The graph will automatically scale as new data points are added weekly.
        </p>
      </div>

      {/* NAV Graph */}
      <NAVGraph />

      {/* NAV Data Table */}
      <NAVDataTable />

      {/* Summary Section */}
      <div className={`p-6 rounded-sm shadow-card ${isDarkMode ? 'bg-secondary-DEFAULT border border-secondary-light' : 'bg-white border border-neutral-lightest'}`}>
        <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-secondary-DEFAULT'}`}>Investment Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-sm shadow-sm ${isDarkMode ? 'bg-secondary-light border border-secondary-DEFAULT' : 'bg-neutral-lightest border border-neutral-lighter'}`}>
            <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-secondary-DEFAULT'}`}>Initial Investment</p>
            <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'}`}>
              ₹ 400,000.00
            </p>
          </div>
          
          <div className={`p-4 rounded-sm shadow-sm ${isDarkMode ? 'bg-secondary-light border border-secondary-DEFAULT' : 'bg-neutral-lightest border border-neutral-lighter'}`}>
            <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-secondary-DEFAULT'}`}>Current Value</p>
            <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'}`}>
              ₹ 410,813.88
            </p>
          </div>
          
          <div className={`p-4 rounded-sm shadow-sm ${isDarkMode ? 'bg-secondary-light border border-secondary-DEFAULT' : 'bg-neutral-lightest border border-neutral-lighter'}`}>
            <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-secondary-DEFAULT'}`}>Total Growth</p>
            <p className={`text-2xl font-bold ${isDarkMode ? 'text-accent-green' : 'text-accent-green'}`}>
              2.70%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NAVTrackerDetailed;
