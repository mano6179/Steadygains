import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const InvestorSummary = () => {
  const { isDarkMode } = useTheme();
  const { isInvestor } = useAuth();
  const [summaryData, setSummaryData] = useState({
    initialInvestment: 0,
    totalInvestment: 0,
    currentValue: 0,
    profit: 0,
    growthPercentage: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvestmentData();
  }, []);

  const fetchInvestmentData = async () => {
    try {
      setLoading(true);

      // In a real app, this would be an API call to get the investor's specific data
      // For now, we'll use mock data for an individual investor

      // Mock data for demonstration - this would be specific to the logged-in investor
      const mockInvestorData = {
        // The investor's initial investment
        initialInvestment: 100000,

        // The date when the investor joined
        entryDate: '15-04-2024',

        // The NAV value when the investor joined
        entryNAV: 105.50,

        // The number of units the investor received
        units: 947.87,

        // The current NAV value
        currentNAV: 112.80,

        // Any additional investments made by this investor
        additionalInvestments: [
          {
            date: '28-04-2024',
            amount: 50000,
            nav: 101.90,
            units: 490.68
          }
        ]
      };

      // Calculate the investor's initial investment
      const initialInvestment = mockInvestorData.initialInvestment;

      // Calculate total additional investment made by this investor
      const totalAdditionalInvestment = mockInvestorData.additionalInvestments.reduce(
        (sum, investment) => sum + investment.amount,
        0
      );

      // Calculate total investment made by this investor
      const totalInvestment = initialInvestment + totalAdditionalInvestment;

      // Calculate total units owned by this investor
      const totalUnits = mockInvestorData.units +
        mockInvestorData.additionalInvestments.reduce(
          (sum, investment) => sum + investment.units,
          0
        );

      // Calculate current value of the investor's holdings
      const currentValue = totalUnits * mockInvestorData.currentNAV;

      // Calculate profit for this specific investor
      const profit = currentValue - totalInvestment;

      // Calculate growth percentage for this specific investor
      const growthPercentage = (profit / totalInvestment) * 100;

      setSummaryData({
        initialInvestment,
        totalInvestment,
        currentValue,
        profit,
        growthPercentage
      });
    } catch (error) {
      console.error('Error fetching investment data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  if (!isInvestor()) {
    return null;
  }

  return (
    <div className={`p-6 rounded-sm shadow-card ${isDarkMode ? 'bg-secondary-DEFAULT border border-secondary-light' : 'bg-white border border-neutral-lightest'}`}>
      <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-secondary-DEFAULT'}`}>Your Investment Summary</h3>

      {loading ? (
        <div className={`text-center py-4 ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'}`}>
          Loading investment data...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-sm shadow-sm ${isDarkMode ? 'bg-secondary-light border border-secondary-DEFAULT' : 'bg-neutral-lightest border border-neutral-lighter'}`}>
            <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-secondary-DEFAULT'}`}>Your Investment</p>
            <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'}`}>
              {formatCurrency(summaryData.totalInvestment)}
            </p>
            <p className={`text-xs ${isDarkMode ? 'text-neutral-lighter' : 'text-neutral-light'}`}>
              Initial: {formatCurrency(summaryData.initialInvestment)}
              {summaryData.totalInvestment > summaryData.initialInvestment &&
                ` + Additional: ${formatCurrency(summaryData.totalInvestment - summaryData.initialInvestment)}`}
            </p>
          </div>

          <div className={`p-4 rounded-sm shadow-sm ${isDarkMode ? 'bg-secondary-light border border-secondary-DEFAULT' : 'bg-neutral-lightest border border-neutral-lighter'}`}>
            <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-secondary-DEFAULT'}`}>Current Value</p>
            <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'}`}>
              {formatCurrency(summaryData.currentValue)}
            </p>
            <p className={`text-xs ${isDarkMode ? 'text-neutral-lighter' : 'text-neutral-light'}`}>
              Your portfolio's current market value
            </p>
          </div>

          <div className={`p-4 rounded-sm shadow-sm ${isDarkMode ? 'bg-secondary-light border border-secondary-DEFAULT' : 'bg-neutral-lightest border border-neutral-lighter'}`}>
            <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-secondary-DEFAULT'}`}>Returns Generated</p>
            <p className={`text-2xl font-bold ${summaryData.profit >= 0 ?
              (isDarkMode ? 'text-accent-green' : 'text-accent-green') :
              (isDarkMode ? 'text-accent-red' : 'text-accent-red')}`}>
              {formatCurrency(summaryData.profit)}
            </p>
            <p className={`text-xs ${isDarkMode ? 'text-neutral-lighter' : 'text-neutral-light'}`}>
              {summaryData.growthPercentage >= 0 ? '+' : ''}{summaryData.growthPercentage.toFixed(2)}% since your entry
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestorSummary;
