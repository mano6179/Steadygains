import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from '../components/FormElements';

const WeeklyUpdatesList = () => {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/api/nav/weekly-updates');
        setUpdates(response.data.updates);
        setError(null);
      } catch (err) {
        console.error('Error fetching updates:', err);
        setError('Failed to load weekly updates. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUpdates();
  }, []);

  // Calculate totals
  const totals = updates.reduce(
    (acc, update) => {
      acc.profit += update.profit;
      acc.charges += update.charges;
      acc.funds_in_out += update.funds_in_out;
      acc.net += update.profit - update.charges + update.funds_in_out;
      return acc;
    },
    { profit: 0, charges: 0, funds_in_out: 0, net: 0 }
  );

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card title="Weekly Updates History">
        {loading ? (
          <div className="text-center py-4">Loading updates...</div>
        ) : error ? (
          <div className="text-center py-4 text-red-500">{error}</div>
        ) : updates.length === 0 ? (
          <div className="text-center py-4">No updates found. Add your first weekly update!</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Profit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Charges
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Funds In/Out
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Net
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {updates.map((update) => (
                    <tr key={update.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {new Date(update.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">
                        {formatCurrency(update.profit)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500">
                        {formatCurrency(update.charges)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {formatCurrency(update.funds_in_out)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {formatCurrency(update.profit - update.charges + update.funds_in_out)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Totals
                    </td>
                    <td className="px-6 py-3 text-left text-xs font-medium text-green-500 uppercase tracking-wider">
                      {formatCurrency(totals.profit)}
                    </td>
                    <td className="px-6 py-3 text-left text-xs font-medium text-red-500 uppercase tracking-wider">
                      {formatCurrency(totals.charges)}
                    </td>
                    <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {formatCurrency(totals.funds_in_out)}
                    </td>
                    <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {formatCurrency(totals.net)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default WeeklyUpdatesList;