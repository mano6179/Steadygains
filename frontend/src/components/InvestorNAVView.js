import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Card } from './FormElements';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function InvestorNAVView() {
  const { currentUser } = useAuth();
  const { isDarkMode } = useTheme();
  const [navHistory, setNavHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [investorDetails, setInvestorDetails] = useState(null);

  useEffect(() => {
    if (currentUser?.investor_id) {
      fetchInvestorDetails();
      fetchNavHistory();
    }
  }, [currentUser]);

  const fetchInvestorDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/investors/${currentUser.investor_id}`);
      setInvestorDetails(response.data);
    } catch (error) {
      console.error('Error fetching investor details:', error);
      setError('Failed to load investor details. Please try again later.');
    }
  };

  const fetchNavHistory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8000/api/nav/${currentUser.investor_id}`);
      setNavHistory(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching NAV history:', error);
      setError('Failed to load NAV history. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Create chart data
  const navChartData = {
    labels: navHistory.length > 0 ? navHistory.map((nav) => nav.date) : [],
    datasets: [
      {
        label: 'NAV',
        data: navHistory.length > 0 ? navHistory.map((nav) => nav.total_value) : [],
        borderColor: isDarkMode ? '#0077B6' : '#0D2E5C',
        backgroundColor: isDarkMode ? 'rgba(0, 119, 182, 0.2)' : 'rgba(13, 46, 92, 0.1)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: isDarkMode ? '#FFFFFF' : '#2D3748',
          font: {
            family: "'Inter', sans-serif",
            weight: 500
          }
        },
      },
      title: {
        display: true,
        text: 'Your Investment Performance',
        color: isDarkMode ? '#FFFFFF' : '#0D2E5C',
        font: {
          family: "'Inter', sans-serif",
          weight: 600,
          size: 16
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: isDarkMode ? '#1A202C' : '#FFFFFF',
        titleColor: isDarkMode ? '#FFFFFF' : '#0D2E5C',
        bodyColor: isDarkMode ? '#A0AEC0' : '#4A5568',
        borderColor: isDarkMode ? '#2D3748' : '#EDF2F7',
        borderWidth: 1,
        padding: 10,
        bodyFont: {
          family: "'Inter', sans-serif"
        },
        titleFont: {
          family: "'Inter', sans-serif",
          weight: 600
        }
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
        },
        border: {
          color: isDarkMode ? '#2D3748' : '#EDF2F7'
        },
        ticks: {
          color: isDarkMode ? '#A0AEC0' : '#4A5568',
          font: {
            family: "'Inter', sans-serif"
          },
          callback: function(value) {
            return '₹' + value.toLocaleString();
          }
        }
      },
      x: {
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
        },
        border: {
          color: isDarkMode ? '#2D3748' : '#EDF2F7'
        },
        ticks: {
          color: isDarkMode ? '#A0AEC0' : '#4A5568',
          font: {
            family: "'Inter', sans-serif"
          }
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  return (
    <div className="space-y-6">
      {investorDetails && (
        <Card title="Your Investment Summary">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-sm shadow-sm ${isDarkMode ? 'bg-neutral-DEFAULT border border-neutral-light' : 'bg-white border border-neutral-lightest'}`}>
              <h3 className={`text-lg font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-primary-DEFAULT'}`}>Initial Investment</h3>
              <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'}`}>₹{investorDetails.initial_capital.toLocaleString()}</p>
            </div>
            <div className={`p-4 rounded-sm shadow-sm ${isDarkMode ? 'bg-neutral-DEFAULT border border-neutral-light' : 'bg-white border border-neutral-lightest'}`}>
              <h3 className={`text-lg font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-primary-DEFAULT'}`}>Current Value</h3>
              <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'}`}>₹{investorDetails.current_capital.toLocaleString()}</p>
            </div>
            <div className={`p-4 rounded-sm shadow-sm ${isDarkMode ? 'bg-neutral-DEFAULT border border-neutral-light' : 'bg-white border border-neutral-lightest'}`}>
              <h3 className={`text-lg font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-primary-DEFAULT'}`}>Profit Share</h3>
              <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'}`}>{investorDetails.profit_share}%</p>
            </div>
          </div>
        </Card>
      )}

      <Card title="Your NAV History">
        {loading ? (
          <div className={`text-center py-4 ${isDarkMode ? 'text-neutral-lighter' : 'text-neutral-light'}`}>Loading your investment data...</div>
        ) : error ? (
          <div className="text-center py-4 text-accent-red">{error}</div>
        ) : navHistory.length === 0 ? (
          <div className={`text-center py-4 ${isDarkMode ? 'text-neutral-lighter' : 'text-neutral-light'}`}>No investment history found.</div>
        ) : (
          <div className="h-96">
            <Line options={chartOptions} data={navChartData} />
          </div>
        )}
      </Card>
    </div>
  );
}

export default InvestorNAVView;