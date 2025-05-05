import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useTheme } from '../context/ThemeContext';

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const NAVTracker = () => {
  const { isDarkMode } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [investors, setInvestors] = useState([]);
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const [navHistory, setNavHistory] = useState([]);
  const [navChartData, setNavChartData] = useState(null);
  const [newInvestor, setNewInvestor] = useState({
    name: '',
    email: '',
    initialInvestment: ''
  });

  // Handle input change for new investor form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInvestor(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle adding a new investor
  const handleAddInvestor = (e) => {
    e.preventDefault();

    // Mock API call to add investor
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const newInvestorWithId = {
        ...newInvestor,
        id: Date.now().toString(),
        initialInvestment: parseFloat(newInvestor.initialInvestment)
      };

      setInvestors(prev => [...prev, newInvestorWithId]);
      setNewInvestor({ name: '', email: '', initialInvestment: '' });
      setIsLoading(false);
    }, 1000);
  };

  // Fetch investors data
  useEffect(() => {
    // Mock API call
    setTimeout(() => {
      const mockInvestors = [
        { id: '1', name: 'John Doe', email: 'john@example.com', initialInvestment: 10000 },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', initialInvestment: 15000 },
        { id: '3', name: 'Bob Johnson', email: 'bob@example.com', initialInvestment: 20000 }
      ];

      setInvestors(mockInvestors);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Fetch NAV history when an investor is selected
  useEffect(() => {
    if (selectedInvestor) {
      setIsLoading(true);
      setError(null);

      // Mock API call
      setTimeout(() => {
        try {
          // Generate mock NAV history data
          const today = new Date();
          const mockHistory = Array.from({ length: 12 }, (_, i) => {
            const date = new Date(today);
            date.setMonth(today.getMonth() - 11 + i);

            // Calculate a mock NAV value with some random fluctuation
            const baseValue = selectedInvestor.initialInvestment;
            const growthFactor = 1 + (0.05 * i / 12); // 5% annual growth
            const randomFactor = 0.98 + (Math.random() * 0.04); // Random fluctuation ±2%
            const navValue = baseValue * growthFactor * randomFactor;

            return {
              date: date.toISOString().split('T')[0],
              value: parseFloat(navValue.toFixed(2))
            };
          });

          setNavHistory(mockHistory);

          // Prepare chart data
          const chartData = {
            labels: mockHistory.map(item => {
              const date = new Date(item.date);
              return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
            }),
            datasets: [
              {
                label: 'NAV Value ($)',
                data: mockHistory.map(item => item.value),
                borderColor: '#FFD166',
                backgroundColor: 'rgba(255, 209, 102, 0.1)',
                tension: 0.3,
                fill: true
              }
            ]
          };

          setNavChartData(chartData);
          setIsLoading(false);
        } catch (err) {
          setError('Failed to load NAV history. Please try again.');
          setIsLoading(false);
        }
      }, 1000);
    }
  }, [selectedInvestor]);

  return (
    <div className="space-y-6">
      <div className={`p-6 rounded-sm shadow-card ${isDarkMode ? 'bg-neutral-DEFAULT border border-neutral-light' : 'bg-white border border-neutral-lightest'}`}>
        <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-primary-DEFAULT'}`}>NAV Tracker</h2>
        <p className={`${isDarkMode ? 'text-neutral-lighter' : 'text-neutral-light'}`}>
          Track the Net Asset Value of your investments over time. Select an investor to view their NAV history.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Investor Form */}
        <div className={`p-6 rounded-sm shadow-card ${isDarkMode ? 'bg-neutral-DEFAULT border border-neutral-light' : 'bg-white border border-neutral-lightest'}`}>
          <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-primary-DEFAULT'}`}>Add New Investor</h3>

          <form onSubmit={handleAddInvestor} className="space-y-4">
            <div>
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-neutral-lighter' : 'text-neutral-DEFAULT'} mb-2`}>
                Investor Name
              </label>
              <input
                type="text"
                name="name"
                value={newInvestor.name}
                onChange={handleInputChange}
                required
                className={`w-full px-3 py-2 rounded-sm ${
                  isDarkMode
                    ? 'bg-neutral-DEFAULT border-neutral-light text-white'
                    : 'bg-white border-neutral-lighter text-neutral-DEFAULT'
                } border shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-accent focus:border-primary-accent`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-neutral-lighter' : 'text-neutral-DEFAULT'} mb-2`}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={newInvestor.email}
                onChange={handleInputChange}
                required
                className={`w-full px-3 py-2 rounded-sm ${
                  isDarkMode
                    ? 'bg-neutral-DEFAULT border-neutral-light text-white'
                    : 'bg-white border-neutral-lighter text-neutral-DEFAULT'
                } border shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-accent focus:border-primary-accent`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-neutral-lighter' : 'text-neutral-DEFAULT'} mb-2`}>
                Initial Investment ($)
              </label>
              <input
                type="number"
                name="initialInvestment"
                value={newInvestor.initialInvestment}
                onChange={handleInputChange}
                required
                min="1"
                step="0.01"
                className={`w-full px-3 py-2 rounded-sm ${
                  isDarkMode
                    ? 'bg-neutral-DEFAULT border-neutral-light text-white'
                    : 'bg-white border-neutral-lighter text-neutral-DEFAULT'
                } border shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-accent focus:border-primary-accent`}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-primary-DEFAULT text-white rounded-sm hover:bg-primary-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2"
            >
              {isLoading ? 'Adding...' : 'Add Investor'}
            </button>
          </form>
        </div>

        {/* Investors List */}
        <div className={`p-6 rounded-sm shadow-card ${isDarkMode ? 'bg-neutral-DEFAULT border border-neutral-light' : 'bg-white border border-neutral-lightest'}`}>
          <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-primary-DEFAULT'}`}>Investors</h3>

          {isLoading && investors.length === 0 ? (
            <p className={`${isDarkMode ? 'text-neutral-lighter' : 'text-neutral-light'}`}>Loading investors...</p>
          ) : error ? (
            <p className="text-accent-red">{error}</p>
          ) : investors.length === 0 ? (
            <p className={`${isDarkMode ? 'text-neutral-lighter' : 'text-neutral-light'}`}>No investors found. Add your first investor.</p>
          ) : (
            <div className="space-y-3">
              {investors.map(investor => (
                <div
                  key={investor.id}
                  onClick={() => setSelectedInvestor(investor)}
                  className={`p-3 rounded-sm cursor-pointer transition-colors ${
                    selectedInvestor?.id === investor.id
                      ? `${isDarkMode ? 'bg-primary-light' : 'bg-primary-DEFAULT bg-opacity-10'} border border-primary-accent`
                      : `${isDarkMode ? 'hover:bg-neutral-light' : 'hover:bg-neutral-lightest'} border border-transparent`
                  }`}
                >
                  <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-primary-DEFAULT'}`}>{investor.name}</h4>
                  <p className={`text-sm ${isDarkMode ? 'text-neutral-lighter' : 'text-neutral-light'}`}>{investor.email}</p>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-primary-DEFAULT'}`}>
                    Initial: ${investor.initialInvestment.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* NAV Chart */}
        {selectedInvestor && (
          <div className={`p-6 rounded-sm shadow-card ${isDarkMode ? 'bg-neutral-DEFAULT border border-neutral-light' : 'bg-white border border-neutral-lightest'}`}>
            <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-primary-DEFAULT'}`}>NAV History: {selectedInvestor.name}</h3>
            {isLoading ? (
              <p className={`${isDarkMode ? 'text-neutral-lighter' : 'text-neutral-light'}`}>Loading NAV data...</p>
            ) : error ? (
              <p className="text-accent-red">{error}</p>
            ) : navHistory.length === 0 ? (
              <p className={`${isDarkMode ? 'text-neutral-lighter' : 'text-neutral-light'}`}>No NAV history available.</p>
            ) : (
              <div className="h-64">
                {navChartData && (
                  <Line
                    data={{
                      ...navChartData,
                      datasets: [{
                        ...navChartData.datasets[0],
                        borderColor: isDarkMode ? '#0077B6' : '#0D2E5C',
                        backgroundColor: isDarkMode ? 'rgba(0, 119, 182, 0.2)' : 'rgba(13, 46, 92, 0.1)',
                      }]
                    }}
                    options={{
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
                              return '$' + value.toLocaleString();
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
                              return `NAV: $${context.parsed.y.toLocaleString()}`;
                            }
                          }
                        }
                      }
                    }}
                  />
                )}
              </div>
            )}
          </div>
        )}

        {/* NAV Summary */}
        {selectedInvestor && (
          <div className={`col-span-1 lg:col-span-3 p-6 rounded-sm shadow-card ${isDarkMode ? 'bg-primary-DEFAULT border border-primary-light' : 'bg-white border border-neutral-lightest'}`}>
            <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-primary-DEFAULT'}`}>Summary for {selectedInvestor.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`p-4 rounded-sm shadow-sm ${isDarkMode ? 'bg-primary-light border border-primary-accent' : 'bg-neutral-lightest border border-neutral-lighter'}`}>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-primary-DEFAULT'}`}>Initial Investment</p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'}`}>
                  ${selectedInvestor.initialInvestment.toLocaleString()}
                </p>
              </div>

              <div className={`p-4 rounded-sm shadow-sm ${isDarkMode ? 'bg-primary-light border border-primary-accent' : 'bg-neutral-lightest border border-neutral-lighter'}`}>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-primary-DEFAULT'}`}>Current NAV</p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'}`}>
                  ${navHistory.length > 0 ? navHistory[navHistory.length - 1].value.toLocaleString() : '0'}
                </p>
              </div>

              <div className={`p-4 rounded-sm shadow-sm ${isDarkMode ? 'bg-primary-light border border-primary-accent' : 'bg-neutral-lightest border border-neutral-lighter'}`}>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-primary-DEFAULT'}`}>Total Growth</p>
                {navHistory.length > 0 && (
                  <p className={`text-2xl font-bold ${
                    navHistory[navHistory.length - 1].value > selectedInvestor.initialInvestment
                      ? isDarkMode ? 'text-accent-green' : 'text-accent-green'
                      : isDarkMode ? 'text-accent-red' : 'text-accent-red'
                  }`}>
                    {(((navHistory[navHistory.length - 1].value - selectedInvestor.initialInvestment) /
                      selectedInvestor.initialInvestment) * 100).toFixed(2)}%
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NAVTracker;
