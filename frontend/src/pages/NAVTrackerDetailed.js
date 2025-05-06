import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import NAVGraph from '../components/NAVGraph';
import NAVDataTable from '../components/NAVDataTable';

const NAVTrackerDetailed = () => {
  const { isDarkMode } = useTheme();
  const [summaryData, setSummaryData] = useState({
    initialInvestment: 400000,
    totalAdditionalInvestment: 0,
    cumulativeAmount: 0,
    latestInvestment: 0,
    currentValue: 0,
    profit: 0,
    growthPercentage: 0
  });

  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll use the mock data from NAVDataTable
    const mockNavData = [
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

    // Calculate total additional investment (excluding initial investment)
    const initialInvestment = mockNavData[0].additionalInvestment;
    const totalAdditionalInvestment = mockNavData
      .slice(1) // Skip the first entry which is the initial investment
      .reduce((sum, entry) => sum + entry.additionalInvestment, 0);

    // Get the latest entry
    const latestEntry = mockNavData[mockNavData.length - 1];

    // The cumulative amount is previous fund value plus profit minus charges
    // It does NOT include the latest investment added
    const cumulativeAmount = latestEntry.cumulativeAmount;

    // Get the latest additional investment
    const latestInvestment = latestEntry.additionalInvestment;

    // Calculate current value as cumulative amount plus the latest investment
    const currentValue = cumulativeAmount + latestInvestment;

    // Calculate total investment (initial + additional investments)
    const totalInvestment = initialInvestment + totalAdditionalInvestment;

    // Calculate profit (current value minus total investment)
    const profit = currentValue - totalInvestment;

    // Calculate growth percentage based on initial investment only (excluding additional investment)
    // This is because the profit was made before the additional investment was added
    const growthPercentage = (profit / initialInvestment) * 100;

    setSummaryData({
      initialInvestment,
      totalAdditionalInvestment,
      cumulativeAmount,
      latestInvestment,
      currentValue,
      profit,
      growthPercentage
    });
  }, []);

  // Format currency
  const formatCurrency = (value) => {
    return `₹ ${value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="space-y-6">
      <div className={`p-6 rounded-sm shadow-card ${isDarkMode ? 'bg-primary-DEFAULT border border-primary-light' : 'bg-white border border-neutral-lightest'}`}>
        <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-primary-DEFAULT'}`}>NAV</h2>
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
            <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-secondary-DEFAULT'}`}>Total Investment</p>
            <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'}`}>
              {formatCurrency(summaryData.initialInvestment + summaryData.totalAdditionalInvestment)}
            </p>
            <p className={`text-xs ${isDarkMode ? 'text-neutral-lighter' : 'text-neutral-light'}`}>
              Initial + Additional Investments
            </p>
          </div>

          <div className={`p-4 rounded-sm shadow-sm ${isDarkMode ? 'bg-secondary-light border border-secondary-DEFAULT' : 'bg-neutral-lightest border border-neutral-lighter'}`}>
            <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-secondary-DEFAULT'}`}>AUM</p>
            <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'}`}>
              {formatCurrency(summaryData.currentValue)}
            </p>
            <p className={`text-xs ${isDarkMode ? 'text-neutral-lighter' : 'text-neutral-light'}`}>
              Cumulative Amount + Latest Investment
            </p>
          </div>

          <div className={`p-4 rounded-sm shadow-sm ${isDarkMode ? 'bg-secondary-light border border-secondary-DEFAULT' : 'bg-neutral-lightest border border-neutral-lighter'}`}>
            <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-secondary-DEFAULT'}`}>Growth</p>
            <p className={`text-2xl font-bold ${summaryData.growthPercentage >= 0 ?
              (isDarkMode ? 'text-accent-green' : 'text-accent-green') :
              (isDarkMode ? 'text-accent-red' : 'text-accent-red')}`}>
              {summaryData.growthPercentage.toFixed(2)}%
            </p>
            <p className={`text-xs ${isDarkMode ? 'text-neutral-lighter' : 'text-neutral-light'}`}>
              Profit as % of Initial Investment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NAVTrackerDetailed;
