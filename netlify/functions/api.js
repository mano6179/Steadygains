// This is a simple serverless function that will proxy requests to your FastAPI backend
// For a production app, you would want to implement your API directly in serverless functions

const axios = require('axios');

exports.handler = async function(event, context) {
  // Get the path and method from the request
  const path = event.path.replace('/.netlify/functions/api', '');
  const method = event.httpMethod;
  
  // Mock authentication for development
  if (path === '/auth/login' && method === 'POST') {
    try {
      const requestBody = JSON.parse(event.body);
      const { email, password } = requestBody;
      
      let user = null;
      
      if (email === 'admin@steadygains.com' && password === 'password') {
        user = {
          id: 1,
          name: 'Admin User',
          email: 'admin@steadygains.com',
          role: 'admin',
          token: 'mock-jwt-token-admin'
        };
      } else if (email === 'investor@steadygains.com' && password === 'password') {
        user = {
          id: 2,
          name: 'Investor User',
          email: 'investor@steadygains.com',
          role: 'investor',
          token: 'mock-jwt-token-investor'
        };
      } else {
        return {
          statusCode: 401,
          body: JSON.stringify({ detail: 'Invalid email or password' })
        };
      }
      
      return {
        statusCode: 200,
        body: JSON.stringify(user)
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ detail: 'Internal server error' })
      };
    }
  }
  
  // Mock investors data
  if (path === '/investors' && method === 'GET') {
    const investors = [
      {
        id: 1,
        name: "John Doe",
        initial_capital: 1000000,
        current_capital: 1150000,
        join_date: "2023-01-15",
        profit_share: 20,
        is_active: true
      },
      {
        id: 2,
        name: "Jane Smith",
        initial_capital: 500000,
        current_capital: 575000,
        join_date: "2023-03-10",
        profit_share: 15,
        is_active: true
      }
    ];
    
    return {
      statusCode: 200,
      body: JSON.stringify(investors)
    };
  }
  
  // For other routes, return a 404
  return {
    statusCode: 404,
    body: JSON.stringify({ detail: 'Not found' })
  };
};
