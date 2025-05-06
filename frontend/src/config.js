// Configuration file for environment-specific settings

// Get the API URL from environment variable or use default for development
// For Netlify deployment, API calls will be proxied to the serverless function
const isNetlify = window.location.hostname.includes('netlify.app');
const API_URL = isNetlify
  ? '' // Empty string means use relative URLs which will be handled by the redirects
  : (process.env.REACT_APP_API_URL || 'http://localhost:8000');

export { API_URL };
