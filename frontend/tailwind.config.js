/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E40AF', // Blue-800
          light: '#3B82F6',   // Blue-500
          dark: '#1E3A8A',    // Blue-900
        },
        secondary: {
          DEFAULT: '#4F46E5', // Indigo-600
          light: '#6366F1',   // Indigo-500
          dark: '#4338CA',    // Indigo-700
        },
        accent: {
          blue: '#3B82F6',    // Blue-500
          green: '#10B981',   // Emerald-500
          red: '#EF4444',     // Red-500
        },
        neutral: {
          DEFAULT: '#374151', // Gray-700
          dark: '#1F2937',    // Gray-800
          light: '#6B7280',   // Gray-500
          lighter: '#9CA3AF', // Gray-400
          lightest: '#F3F4F6', // Gray-100
        },
        bgDark: '#111827',    // Gray-900
      },
    },
  },
  plugins: [],
}
