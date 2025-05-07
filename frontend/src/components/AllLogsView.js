import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Card } from './FormElements';

const AllLogsView = () => {
  const { isDarkMode } = useTheme();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      
      // Get logs from localStorage
      const storedLogsJSON = localStorage.getItem('steadyGainsLogs');
      
      if (storedLogsJSON) {
        const allLogs = JSON.parse(storedLogsJSON);
        setLogs(allLogs);
        setError(null);
      } else {
        setLogs([]);
      }
    } catch (err) {
      console.error('Error fetching logs:', err);
      setError('Failed to load logs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Format timestamp for display
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Get log type label
  const getLogTypeLabel = (type) => {
    switch(type) {
      case 'weekly_profit': return 'Weekly Profit';
      case 'iv_tracker': return 'IV Tracker';
      case 'trade': return 'Trade';
      case 'market_update': return 'Market Update';
      default: return 'Log';
    }
  };

  // Render log details based on log type
  const renderLogDetails = (log) => {
    switch(log.type) {
      case 'weekly_profit':
        return (
          <>
            <span className="mr-2">{formatCurrency(log.profit)}</span>
            <span className="text-accent-red">{formatCurrency(-log.charges)}</span>
          </>
        );
      case 'iv_tracker':
        return (
          <>
            <span className="mr-2">{log.symbol}</span>
            <span className="mr-2">{log.strike}</span>
            <span className="mr-2">{new Date(log.expiry).toLocaleDateString()}</span>
            <span>{log.iv}%</span>
          </>
        );
      case 'trade':
        return (
          <>
            <span className="mr-2">{log.symbol}</span>
            <span className="mr-2">{log.strategy}</span>
            <span className="mr-2">{log.entry_exit === 'entry' ? 'Entry' : 'Exit'}</span>
            <span className="mr-2">{log.quantity}</span>
            <span>{formatCurrency(log.premium)}</span>
          </>
        );
      case 'market_update':
        return (
          <>
            <span className="font-medium">{log.title}</span>
          </>
        );
      default:
        return <span>Unknown log type</span>;
    }
  };

  // Filter logs based on active tab
  const filteredLogs = activeTab === 'all' 
    ? logs 
    : logs.filter(log => log.type === activeTab);

  return (
    <Card title="Activity Logs">
      {/* Tabs */}
      <div className="flex border-b mb-4">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'all'
              ? `${isDarkMode ? 'text-white border-accent-blue' : 'text-primary-DEFAULT border-primary-DEFAULT'} border-b-2`
              : `${isDarkMode ? 'text-neutral-lighter' : 'text-neutral-light'} border-b-0`
          }`}
          onClick={() => setActiveTab('all')}
        >
          All Logs
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'weekly_profit'
              ? `${isDarkMode ? 'text-white border-accent-blue' : 'text-primary-DEFAULT border-primary-DEFAULT'} border-b-2`
              : `${isDarkMode ? 'text-neutral-lighter' : 'text-neutral-light'} border-b-0`
          }`}
          onClick={() => setActiveTab('weekly_profit')}
        >
          Weekly Profit
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'iv_tracker'
              ? `${isDarkMode ? 'text-white border-accent-blue' : 'text-primary-DEFAULT border-primary-DEFAULT'} border-b-2`
              : `${isDarkMode ? 'text-neutral-lighter' : 'text-neutral-light'} border-b-0`
          }`}
          onClick={() => setActiveTab('iv_tracker')}
        >
          IV Tracker
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'trade'
              ? `${isDarkMode ? 'text-white border-accent-blue' : 'text-primary-DEFAULT border-primary-DEFAULT'} border-b-2`
              : `${isDarkMode ? 'text-neutral-lighter' : 'text-neutral-light'} border-b-0`
          }`}
          onClick={() => setActiveTab('trade')}
        >
          Trades
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'market_update'
              ? `${isDarkMode ? 'text-white border-accent-blue' : 'text-primary-DEFAULT border-primary-DEFAULT'} border-b-2`
              : `${isDarkMode ? 'text-neutral-lighter' : 'text-neutral-light'} border-b-0`
          }`}
          onClick={() => setActiveTab('market_update')}
        >
          Market Updates
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className={`text-center py-4 ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'}`}>
          Loading logs...
        </div>
      ) : error ? (
        <div className={`text-center py-4 ${isDarkMode ? 'text-accent-red' : 'text-accent-red'}`}>
          {error}
        </div>
      ) : filteredLogs.length === 0 ? (
        <div className={`text-center py-4 ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'}`}>
          No logs found. Add your first log entry!
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className={isDarkMode ? 'bg-neutral-light' : 'bg-neutral-lightest'}>
              <tr>
                <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'} uppercase tracking-wider`}>
                  Timestamp
                </th>
                <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'} uppercase tracking-wider`}>
                  Type
                </th>
                <th className={`px-4 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'} uppercase tracking-wider`}>
                  Details
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? 'divide-neutral-light bg-neutral-DEFAULT' : 'divide-neutral-lightest bg-white'}`}>
              {filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td className={`px-4 py-3 whitespace-nowrap text-sm ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'}`}>
                    {formatTimestamp(log.timestamp)}
                  </td>
                  <td className={`px-4 py-3 whitespace-nowrap text-sm ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'}`}>
                    {getLogTypeLabel(log.type)}
                  </td>
                  <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'}`}>
                    {renderLogDetails(log)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};

export default AllLogsView;
