import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Card } from '../components/FormElements';

function TradeLog() {
  const { isDarkMode } = useTheme();
  const [activeTrades, setActiveTrades] = useState([]);
  const [lastMarketUpdate, setLastMarketUpdate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActiveTrades();
    fetchLastMarketUpdate();
  }, []);

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const fetchActiveTrades = async () => {
    try {
      // Get logs from localStorage
      const storedLogsJSON = localStorage.getItem('steadyGainsLogs');

      if (storedLogsJSON) {
        const allLogs = JSON.parse(storedLogsJSON);

        // Filter to get only trade logs with entry_exit = 'entry'
        const tradeLogs = allLogs
          .filter(log => log.type === 'trade' && log.entry_exit === 'entry')
          .map(log => ({
            id: log.id,
            symbol: log.symbol,
            strategy: log.strategy,
            entry_exit: log.entry_exit,
            quantity: log.quantity,
            premium: log.premium,
            date: log.date || new Date(log.timestamp).toISOString().split('T')[0],
            notes: log.notes || '',
            // Mock P&L data for demonstration
            unrealized_pnl: Math.floor(Math.random() * 2000) - 1000
          }));

        setActiveTrades(tradeLogs);
      } else {
        // If no logs in localStorage, use mock data
        const mockActiveTrades = [
          {
            id: 1,
            symbol: 'NIFTY',
            strategy: 'Iron Condor',
            entry_exit: 'entry',
            quantity: 50,
            premium: 1500,
            date: '2023-06-15',
            notes: 'Weekly expiry trade',
            unrealized_pnl: 300
          },
          {
            id: 2,
            symbol: 'BANKNIFTY',
            strategy: 'Strangle',
            entry_exit: 'entry',
            quantity: 25,
            premium: 2200,
            date: '2023-06-18',
            notes: 'Monthly expiry trade',
            unrealized_pnl: -150
          }
        ];

        setActiveTrades(mockActiveTrades);
      }
    } catch (error) {
      console.error('Error fetching active trades:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLastMarketUpdate = async () => {
    try {
      // Get logs from localStorage
      const storedLogsJSON = localStorage.getItem('steadyGainsLogs');

      if (storedLogsJSON) {
        const allLogs = JSON.parse(storedLogsJSON);

        // Filter to get only market_update logs and sort by timestamp (newest first)
        const marketUpdates = allLogs
          .filter(log => log.type === 'market_update')
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        // Get the latest market update
        if (marketUpdates.length > 0) {
          setLastMarketUpdate({
            id: marketUpdates[0].id,
            title: marketUpdates[0].title,
            content: marketUpdates[0].content,
            timestamp: marketUpdates[0].timestamp
          });
        } else {
          // If no market updates in localStorage, use mock data
          const mockLastUpdate = {
            id: 1,
            title: 'Market Update - June 20, 2023',
            content: 'Markets closed higher today with Nifty up 0.8% and Bank Nifty up 1.2%. FIIs were net buyers while DIIs were net sellers. Global markets were mixed with US futures pointing slightly higher.',
            timestamp: '2023-06-20T16:30:00'
          };

          setLastMarketUpdate(mockLastUpdate);
        }
      } else {
        // If no logs in localStorage, use mock data
        const mockLastUpdate = {
          id: 1,
          title: 'Market Update - June 20, 2023',
          content: 'Markets closed higher today with Nifty up 0.8% and Bank Nifty up 1.2%. FIIs were net buyers while DIIs were net sellers. Global markets were mixed with US futures pointing slightly higher.',
          timestamp: '2023-06-20T16:30:00'
        };

        setLastMarketUpdate(mockLastUpdate);
      }
    } catch (error) {
      console.error('Error fetching last market update:', error);
    }
  };

  const handleDelete = async (tradeId) => {
    if (!window.confirm('Are you sure you want to delete this trade?')) return;
    try {
      // Get logs from localStorage
      const storedLogsJSON = localStorage.getItem('steadyGainsLogs');

      if (storedLogsJSON) {
        const allLogs = JSON.parse(storedLogsJSON);

        // Remove the trade with the specified ID
        const updatedLogs = allLogs.filter(log => log.id !== tradeId);

        // Save updated logs to localStorage
        localStorage.setItem('steadyGainsLogs', JSON.stringify(updatedLogs));
      }

      // Update the UI
      setActiveTrades((prev) => prev.filter((t) => t.id !== tradeId));
    } catch (error) {
      alert('Failed to delete trade.');
    }
  };

  return (
    <div className="space-y-6">
      <Card title="Active Trades">
        <div className="overflow-x-auto">
          {loading ? (
            <p className={`text-center py-4 ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'}`}>
              Loading trades...
            </p>
          ) : activeTrades.length === 0 ? (
            <p className={`text-center py-4 ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'}`}>
              No active trades found. Add trades using the Logger.
            </p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className={isDarkMode ? 'bg-neutral-light' : 'bg-neutral-lightest'}>
                <tr>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'} uppercase tracking-wider`}>Symbol</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'} uppercase tracking-wider`}>Strategy</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'} uppercase tracking-wider`}>Quantity</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'} uppercase tracking-wider`}>Premium</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'} uppercase tracking-wider`}>Date</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'} uppercase tracking-wider`}>Current P&L</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'} uppercase tracking-wider`}>Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDarkMode ? 'divide-neutral-light bg-neutral-DEFAULT' : 'divide-neutral-lightest bg-white'}`}>
                {activeTrades.map((trade) => (
                  <tr key={trade.id}>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'}`}>{trade.symbol}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'}`}>{trade.strategy}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'}`}>{trade.quantity}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'}`}>{formatCurrency(trade.premium)}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'}`}>{trade.date}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${trade.unrealized_pnl >= 0 ? 'text-accent-green' : 'text-accent-red'}`}>
                      {formatCurrency(trade.unrealized_pnl)}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'}`}>
                      <IconButton aria-label="delete" color="error" onClick={() => handleDelete(trade.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>

      {/* Last Market Update */}
      <Card title="Latest Market Update">
        {loading ? (
          <p className={`text-center py-4 ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'}`}>
            Loading market update...
          </p>
        ) : !lastMarketUpdate ? (
          <p className={`text-center py-4 ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'}`}>
            No market updates found. Add market updates using the Logger.
          </p>
        ) : (
          <div className={`p-4 rounded-sm ${isDarkMode ? 'bg-neutral-DEFAULT' : 'bg-white'}`}>
            <div className="flex justify-between items-center mb-2">
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-primary-DEFAULT'}`}>
                {lastMarketUpdate.title}
              </h3>
              <span className={`text-sm ${isDarkMode ? 'text-neutral-lighter' : 'text-neutral-light'}`}>
                {new Date(lastMarketUpdate.timestamp).toLocaleString()}
              </span>
            </div>
            <p className={`${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'}`}>
              {lastMarketUpdate.content}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}

export default TradeLog;