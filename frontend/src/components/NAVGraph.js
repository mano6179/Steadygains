import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useTheme } from '../context/ThemeContext';

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const NAVGraph = () => {
  const { isDarkMode } = useTheme();
  const [navData, setNavData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll use the provided data
    const mockData = [
      { date: '01-04-2025', nav: 100.00 },
      { date: '05-04-2024', nav: 102.74 },
      { date: '12-04-2024', nav: 107.88 },
      { date: '19-04-2024', nav: 103.52 },
      { date: '26-04-2024', nav: 101.77 },
      { date: '03-05-2024', nav: 102.70 }
    ];

    setNavData(mockData);
    setIsLoading(false);
  }, []);

  // Format dates for display
  const formatDate = (dateStr) => {
    const parts = dateStr.split('-');
    const date = new Date(parts[2], parts[1] - 1, parts[0]);
    return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
  };

  // Prepare chart data
  const chartData = {
    labels: navData.map(item => formatDate(item.date)),
    datasets: [
      {
        label: 'NAV Value (₹)',
        data: navData.map(item => item.nav),
        borderColor: isDarkMode ? '#0077B6' : '#0D2E5C',
        backgroundColor: isDarkMode ? 'rgba(0, 119, 182, 0.2)' : 'rgba(13, 46, 92, 0.1)',
        tension: 0.3,
        fill: true
      }
    ]
  };

  // Chart options with auto-scaling
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
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
          callback: function(value) {
            return '₹' + value.toLocaleString();
          }
        },
        // This ensures the scale adapts to the data
        adapters: {
          date: {
            locale: 'en-US'
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
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: isDarkMode ? '#FFFFFF' : '#2D3748',
          font: {
            family: "'Inter', sans-serif",
            weight: 500
          }
        }
      },
      tooltip: {
        backgroundColor: isDarkMode ? '#1A202C' : '#FFFFFF',
        titleColor: isDarkMode ? '#FFFFFF' : '#0D2E5C',
        bodyColor: isDarkMode ? '#A0AEC0' : '#4A5568',
        borderColor: isDarkMode ? '#2D3748' : '#EDF2F7',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            return `NAV: ₹${context.parsed.y.toLocaleString()}`;
          }
        }
      }
    }
  };

  return (
    <div className={`p-4 md:p-6 rounded-sm shadow-card ${isDarkMode ? 'bg-neutral-DEFAULT border border-neutral-light' : 'bg-white border border-neutral-lightest'}`}>
      <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-primary-DEFAULT'}`}>NAV History</h3>
      {isLoading ? (
        <p className={`${isDarkMode ? 'text-neutral-lighter' : 'text-neutral-light'}`}>Loading NAV data...</p>
      ) : navData.length === 0 ? (
        <p className={`${isDarkMode ? 'text-neutral-lighter' : 'text-neutral-light'}`}>No NAV history available.</p>
      ) : (
        <div className="h-48 sm:h-56 md:h-64">
          <Line data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  );
};

export default NAVGraph;
