/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Professional financial sector color palette
        primary: {
          DEFAULT: '#0D2E5C',        // Deep Navy Blue (BlackRock-inspired)
          light: '#1A4B8C',          // Lighter Navy
          dark: '#051D3B',           // Darker Navy
          accent: '#0077B6',         // Accent Blue
        },
        secondary: {
          DEFAULT: '#1E3A5F',        // Secondary Blue (Vanguard-inspired)
          light: '#2C5282',          // Lighter Secondary
          dark: '#152A45',           // Darker Secondary
        },
        neutral: {
          DEFAULT: '#2D3748',        // Dark Gray
          light: '#4A5568',          // Medium Gray
          lighter: '#A0AEC0',        // Light Gray
          lightest: '#EDF2F7',       // Very Light Gray/Off-white
        },
        accent: {
          green: '#10B981',          // Success Green
          red: '#EF4444',            // Error Red
          yellow: '#F59E0B',         // Warning Yellow
          blue: '#3B82F6',           // Info Blue
        },

        // Legacy color mappings (to maintain compatibility)
        dashboard: '#0D2E5C',        // Deep Navy Blue
        login: '#0077B6',            // Accent Blue
        navTracker: '#1E3A5F',       // Secondary Blue
        weeklyForm: '#2C5282',       // Lighter Secondary
        weeklyView: '#1A4B8C',       // Lighter Navy
        tradeLog: '#152A45',         // Darker Secondary
        indicators: '#0077B6',       // Accent Blue
        calendar: '#1E3A5F',         // Secondary Blue
        excel: '#0D2E5C',            // Deep Navy Blue
        sidebar: '#FFFFFF',          // White
        navActive: '#0077B6',        // Accent Blue
        navInactive: '#4A5568',      // Medium Gray
        buttonPrimary: '#0D2E5C',    // Deep Navy Blue

        // Background and text colors
        bgLight: '#FFFFFF',          // White background
        bgDark: '#1A202C',           // Dark background (almost black)
        textLight: '#FFFFFF',        // White text
        textDark: '#2D3748',         // Dark Gray text
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
