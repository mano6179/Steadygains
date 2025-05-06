// Configuration file for environment-specific settings

// Get the API URL from environment variable or use default for development
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export { API_URL };
