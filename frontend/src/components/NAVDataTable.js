import React from 'react';
import { useTheme } from '../context/ThemeContext';

const NAVDataTable = () => {
  const { isDarkMode } = useTheme();
  
  // Mock data based on the provided information
  const navData = [
    {
      date: '01-04-2025',
      amount: 0,
      fee: 0,
      netAmount: 0,
      cumulativeAmount: 400000,
      additionalInvestment: 400000,
      unitsBefore: 0,
      unitsAdded: 4000,
      profitLoss: 0,
      nav: 100.00
    },
    {
      date: '05-04-2024',
      amount: 11400,
      fee: 434.63,
      netAmount: 10965.37,
      cumulativeAmount: 410965.37,
      additionalInvestment: 0,
      unitsBefore: 4000,
      unitsAdded: 0,
      profitLoss: 10965.37,
      nav: 102.74
    },
    {
      date: '12-04-2024',
      amount: 20745,
      fee: 195.97,
      netAmount: 20549.03,
      cumulativeAmount: 431514.40,
      additionalInvestment: 0,
      unitsBefore: 4000,
      unitsAdded: 0,
      profitLoss: 31514.40,
      nav: 107.88
    },
    {
      date: '19-04-2024',
      amount: -17261.25,
      fee: 179.17,
      netAmount: -17440.42,
      cumulativeAmount: 414073.98,
      additionalInvestment: 0,
      unitsBefore: 4000,
      unitsAdded: 0,
      profitLoss: 14073.98,
      nav: 103.52
    },
    {
      date: '26-04-2024',
      amount: -6397.50,
      fee: 616.10,
      netAmount: -7013.60,
      cumulativeAmount: 407060.38,
      additionalInvestment: 0,
      unitsBefore: 4000,
      unitsAdded: 0,
      profitLoss: 7060.38,
      nav: 101.77
    },
    {
      date: '03-05-2024',
      amount: 4110,
      fee: 356.50,
      netAmount: 3753.50,
      cumulativeAmount: 410813.88,
      additionalInvestment: 300000,
      unitsBefore: 4000,
      unitsAdded: 2921.03,
      profitLoss: 10813.88,
      nav: 102.70
    }
  ];

  // Format currency
  const formatCurrency = (value) => {
    return `₹ ${value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className={`p-6 rounded-sm shadow-card ${isDarkMode ? 'bg-neutral-DEFAULT border border-neutral-light' : 'bg-white border border-neutral-lightest'}`}>
      <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-primary-DEFAULT'}`}>NAV Data</h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className={isDarkMode ? 'bg-neutral-light' : 'bg-neutral-lightest'}>
            <tr>
              <th scope="col" className={`px-3 py-3 text-left text-xs font-medium ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'} uppercase tracking-wider`}>Date</th>
              <th scope="col" className={`px-3 py-3 text-right text-xs font-medium ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'} uppercase tracking-wider`}>Amount</th>
              <th scope="col" className={`px-3 py-3 text-right text-xs font-medium ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'} uppercase tracking-wider`}>Fee</th>
              <th scope="col" className={`px-3 py-3 text-right text-xs font-medium ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'} uppercase tracking-wider`}>Net Amount</th>
              <th scope="col" className={`px-3 py-3 text-right text-xs font-medium ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'} uppercase tracking-wider`}>Cumulative</th>
              <th scope="col" className={`px-3 py-3 text-right text-xs font-medium ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'} uppercase tracking-wider`}>Investment</th>
              <th scope="col" className={`px-3 py-3 text-right text-xs font-medium ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'} uppercase tracking-wider`}>Units Before</th>
              <th scope="col" className={`px-3 py-3 text-right text-xs font-medium ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'} uppercase tracking-wider`}>Units Added</th>
              <th scope="col" className={`px-3 py-3 text-right text-xs font-medium ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'} uppercase tracking-wider`}>Profit/Loss</th>
              <th scope="col" className={`px-3 py-3 text-right text-xs font-medium ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'} uppercase tracking-wider`}>NAV</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isDarkMode ? 'divide-neutral-light' : 'divide-neutral-lightest'}`}>
            {navData.map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? (isDarkMode ? 'bg-neutral-DEFAULT' : 'bg-white') : (isDarkMode ? 'bg-neutral-light bg-opacity-30' : 'bg-neutral-lightest bg-opacity-50')}>
                <td className={`px-3 py-2 whitespace-nowrap text-sm ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'}`}>{row.date}</td>
                <td className={`px-3 py-2 whitespace-nowrap text-sm text-right ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'}`}>
                  {row.amount === 0 ? '₹ -' : formatCurrency(row.amount)}
                </td>
                <td className={`px-3 py-2 whitespace-nowrap text-sm text-right ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'}`}>
                  {row.fee === 0 ? '₹ -' : formatCurrency(row.fee)}
                </td>
                <td className={`px-3 py-2 whitespace-nowrap text-sm text-right ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'}`}>
                  {row.netAmount === 0 ? '₹ -' : formatCurrency(row.netAmount)}
                </td>
                <td className={`px-3 py-2 whitespace-nowrap text-sm text-right ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'}`}>
                  {formatCurrency(row.cumulativeAmount)}
                </td>
                <td className={`px-3 py-2 whitespace-nowrap text-sm text-right ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'}`}>
                  {row.additionalInvestment === 0 ? '₹ -' : formatCurrency(row.additionalInvestment)}
                </td>
                <td className={`px-3 py-2 whitespace-nowrap text-sm text-right ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'}`}>
                  {row.unitsBefore}
                </td>
                <td className={`px-3 py-2 whitespace-nowrap text-sm text-right ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'}`}>
                  {row.unitsAdded}
                </td>
                <td className={`px-3 py-2 whitespace-nowrap text-sm text-right ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'}`}>
                  {row.profitLoss === 0 ? '₹ -' : formatCurrency(row.profitLoss)}
                </td>
                <td className={`px-3 py-2 whitespace-nowrap text-sm text-right font-medium ${isDarkMode ? 'text-white' : 'text-primary-DEFAULT'}`}>
                  {`₹ ${row.nav.toFixed(2)}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NAVDataTable;
