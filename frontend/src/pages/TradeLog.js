import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Card } from '../components/FormElements';

function TradeLog() {
  const { isDarkMode } = useTheme();
  const [trades, setTrades] = useState([]);
  const [activeTrades, setActiveTrades] = useState([]);
  const [lastMarketUpdate, setLastMarketUpdate] = useState(null);
  const [formData, setFormData] = useState({
    symbol: '',
    strategy: '',
    entry_exit: 'entry',
    quantity: '',
    premium: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    tags: [],
  });

  useEffect(() => {
    fetchTrades();
    fetchActiveTrades();
    fetchLastMarketUpdate();
  }, []);

  const fetchTrades = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/trades');
      setTrades(response.data);
    } catch (error) {
      console.error('Error fetching trades:', error);
    }
  };

  const fetchActiveTrades = async () => {
    try {
      // In a real app, this would be an API call
      // const response = await axios.get('http://localhost:8000/api/trades/active');

      // Mock data for demonstration
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
          realized_pnl: 0,
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
          realized_pnl: 0,
          unrealized_pnl: -150
        }
      ];

      setActiveTrades(mockActiveTrades);
    } catch (error) {
      console.error('Error fetching active trades:', error);
    }
  };

  const fetchLastMarketUpdate = async () => {
    try {
      // In a real app, this would be an API call
      // const response = await axios.get('http://localhost:8000/api/market-updates/latest');

      // Mock data for demonstration
      const mockLastUpdate = {
        id: 1,
        title: 'Market Update - June 20, 2023',
        content: 'Markets closed higher today with Nifty up 0.8% and Bank Nifty up 1.2%. FIIs were net buyers while DIIs were net sellers. Global markets were mixed with US futures pointing slightly higher.',
        timestamp: '2023-06-20T16:30:00'
      };

      setLastMarketUpdate(mockLastUpdate);
    } catch (error) {
      console.error('Error fetching last market update:', error);
    }
  };

  const handleDelete = async (tradeId) => {
    if (!window.confirm('Are you sure you want to delete this trade?')) return;
    try {
      await axios.delete(`http://localhost:8000/api/trades/${tradeId}`);
      setTrades((prev) => prev.filter((t) => t.id !== tradeId));
    } catch (error) {
      alert('Failed to delete trade.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/trades', formData);
      setFormData({
        symbol: '',
        strategy: '',
        entry_exit: 'entry',
        quantity: '',
        premium: '',
        date: new Date().toISOString().split('T')[0],
        notes: '',
        tags: [],
      });
      fetchTrades();
      fetchActiveTrades();
    } catch (error) {
      console.error('Error creating trade:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-6">
      <div className={`p-6 rounded-lg shadow ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h2 className="text-xl font-bold mb-4">Add New Trade</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium">Symbol</label>
              <input
                type="text"
                name="symbol"
                value={formData.symbol}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md ${
                  isDarkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
                } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Strategy</label>
              <select
                name="strategy"
                value={formData.strategy}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md ${
                  isDarkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
                } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                required
              >
                <option value="">Select Strategy</option>
                <option value="iron_condor">Iron Condor</option>
                <option value="straddle">Straddle</option>
                <option value="strangle">Strangle</option>
                <option value="butterfly">Butterfly</option>
                <option value="calendar">Calendar Spread</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Entry/Exit</label>
              <select
                name="entry_exit"
                value={formData.entry_exit}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md ${
                  isDarkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
                } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                required
              >
                <option value="entry">Entry</option>
                <option value="exit">Exit</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md ${
                  isDarkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
                } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Premium</label>
              <input
                type="number"
                name="premium"
                value={formData.premium}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md ${
                  isDarkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
                } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md ${
                  isDarkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
                } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className={`mt-1 block w-full rounded-md ${
                isDarkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
              } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md ${isDarkMode ? 'text-white bg-primary' : 'text-primary bg-white border-primary'} hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
            >
              Add Trade
            </button>
          </div>
        </form>
      </div>

      <Card title="Active Trades">
        <div className="overflow-x-auto">
          {activeTrades.length === 0 ? (
            <p className={`text-center py-4 ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'}`}>
              No active trades found.
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
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'}`}>₹{trade.premium}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'}`}>{trade.date}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${trade.unrealized_pnl >= 0 ? 'text-accent-green' : 'text-accent-red'}`}>
                      ₹{trade.unrealized_pnl.toFixed(2)}
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
        {!lastMarketUpdate ? (
          <p className={`text-center py-4 ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'}`}>
            No market updates found.
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