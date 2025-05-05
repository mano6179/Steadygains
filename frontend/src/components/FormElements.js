import React from 'react';
import { useTheme } from '../context/ThemeContext';

// Button component with financial sector styling
export const Button = ({ children, primary, className, ...props }) => {
  const { isDarkMode } = useTheme();

  return (
    <button
      className={`px-4 py-2 rounded-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        primary
          ? "bg-primary-DEFAULT hover:bg-primary-light text-white focus:ring-primary-light"
          : `${isDarkMode
              ? 'bg-neutral-DEFAULT hover:bg-neutral-light text-white'
              : 'bg-white hover:bg-neutral-lightest text-neutral-DEFAULT'}
             border ${isDarkMode ? 'border-neutral-light' : 'border-neutral-lighter'}
             focus:ring-neutral-lighter`
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Input component with financial sector styling
export const Input = ({ label, className, ...props }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="mb-4">
      {label && (
        <label className={`block text-sm font-medium ${isDarkMode ? 'text-neutral-lighter' : 'text-neutral-DEFAULT'} mb-2`}>
          {label}
        </label>
      )}
      <input
        className={`w-full px-3 py-2 ${
          isDarkMode
            ? 'bg-neutral-DEFAULT border-neutral-light text-white'
            : 'bg-white border-neutral-lighter text-neutral-DEFAULT'
        } border rounded-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-accent focus:border-primary-accent ${className}`}
        {...props}
      />
    </div>
  );
};

// Card component with financial sector styling
export const Card = ({ children, title, className }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`${
      isDarkMode
        ? 'bg-neutral-DEFAULT border-neutral-light'
        : 'bg-white border-neutral-lightest'
    } border rounded-sm shadow-card overflow-hidden transition-shadow duration-200 hover:shadow-card-hover ${className}`}>
      {title && (
        <div className={`px-6 py-4 border-b ${
          isDarkMode ? 'border-neutral-light' : 'border-neutral-lightest'
        }`}>
          <h3 className={`text-lg font-semibold ${
            isDarkMode ? 'text-white' : 'text-primary-DEFAULT'
          }`}>{title}</h3>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};

// Select component with financial sector styling
export const Select = ({ label, options, className, ...props }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="mb-4">
      {label && (
        <label className={`block text-sm font-medium ${isDarkMode ? 'text-neutral-lighter' : 'text-neutral-DEFAULT'} mb-2`}>
          {label}
        </label>
      )}
      <select
        className={`w-full px-3 py-2 ${
          isDarkMode
            ? 'bg-neutral-DEFAULT border-neutral-light text-white'
            : 'bg-white border-neutral-lighter text-neutral-DEFAULT'
        } border rounded-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-accent focus:border-primary-accent ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// Table component with financial sector styling
export const Table = ({ headers, data, className }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className={isDarkMode ? 'bg-neutral-light' : 'bg-neutral-lightest'}>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium ${
                  isDarkMode ? 'text-white' : 'text-neutral-DEFAULT'
                } uppercase tracking-wider`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={`divide-y ${
          isDarkMode ? 'divide-neutral-light bg-neutral-DEFAULT' : 'divide-neutral-lightest bg-white'
        }`}>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-opacity-50' : ''}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`px-6 py-4 whitespace-nowrap text-sm ${
                    isDarkMode ? 'text-neutral-lighter' : 'text-neutral-light'
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

