import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function TradeLog() {
  const { isDarkMode } = useTheme();
  const [trades, setTrades] = useState([]);
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
  }, []);

  const fetchTrades = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/trades');
      setTrades(response.data);
    } catch (error) {
      console.error('Error fetching trades:', error);
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

      <div className={`p-6 rounded-lg shadow ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h2 className="text-xl font-bold mb-4">Trade History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Symbol</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Strategy</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Entry/Exit</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Premium</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">PnL</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {trades.map((trade) => (
                <tr key={trade.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{trade.symbol}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{trade.strategy}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{trade.entry_exit}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{trade.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">₹{trade.premium}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{trade.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ₹{(trade.realized_pnl + trade.unrealized_pnl).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <IconButton aria-label="delete" color="error" onClick={() => handleDelete(trade.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TradeLog; 