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
          <div className="text-center py-4 text-vscode-error">{error}</div>
        ) : updates.length === 0 ? (
          <div className="text-center py-4">No updates found. Add your first weekly update!</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-vscode-border">
                <thead className="bg-vscode-active">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-vscode-text-active uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-vscode-text-active uppercase tracking-wider">
                      Profit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-vscode-text-active uppercase tracking-wider">
                      Charges
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-vscode-text-active uppercase tracking-wider">
                      Funds In/Out
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-vscode-text-active uppercase tracking-wider">
                      Net
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-vscode-panel divide-y divide-vscode-border">
                  {updates.map((update) => (
                    <tr key={update.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {new Date(update.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-vscode-success">
                        {formatCurrency(update.profit)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-vscode-error">
                        {formatCurrency(update.charges)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {formatCurrency(update.funds_in_out)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {formatCurrency(update.profit - update.charges + update.funds_in_out)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-vscode-active">
                  <tr>
                    <td className="px-6 py-3 text-left text-xs font-medium text-vscode-text-active uppercase tracking-wider">
                      Totals
                    </td>
                    <td className="px-6 py-3 text-left text-xs font-medium text-vscode-success uppercase tracking-wider">
                      {formatCurrency(totals.profit)}
                    </td>
                    <td className="px-6 py-3 text-left text-xs font-medium text-vscode-error uppercase tracking-wider">
                      {formatCurrency(totals.charges)}
                    </td>
                    <td className="px-6 py-3 text-left text-xs font-medium text-vscode-text-active uppercase tracking-wider">
                      {formatCurrency(totals.funds_in_out)}
                    </td>
                    <td className="px-6 py-3 text-left text-xs font-medium text-vscode-text-active uppercase tracking-wider">
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

