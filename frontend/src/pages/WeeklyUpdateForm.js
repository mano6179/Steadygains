import React, { useState } from 'react';
import { Button, Input, Card } from '../components/FormElements';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const WeeklyUpdateForm = () => {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [profit, setProfit] = useState('');
  const [charges, setCharges] = useState('');
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);
    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:8000/api/nav/weekly-update', {
        date,
        profit: parseFloat(profit),
        charges: parseFloat(charges),
        funds_in_out: 0
      });
      
      console.log("Response:", response);
      setSuccess('Weekly update submitted successfully!');
      setProfit('');
      setCharges('');
      
      // Navigate to the list view after a short delay
      setTimeout(() => {
        navigate('/weekly-updates');
      }, 1500);
    } catch (err) {
      console.error('Error submitting update:', err);
      if (err.response) {
        console.error("Response data:", err.response.data);
        console.error("Response status:", err.response.status);
      } else if (err.request) {
        console.error("No response received:", err.request);
      } else {
        console.error("Error setting up request:", err.message);
      }
      setError('Failed to submit update. ' + (err.response?.data?.detail || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card title="Weekly Update">
        <form onSubmit={handleSubmit}>
          <Input
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          
          <Input
            label="Profit"
            type="number"
            step="0.01"
            value={profit}
            onChange={(e) => setProfit(e.target.value)}
            placeholder="Enter profit amount"
            required
          />
          
          <Input
            label="Charges"
            type="number"
            step="0.01"
            value={charges}
            onChange={(e) => setCharges(e.target.value)}
            placeholder="Enter charges amount"
            required
          />
          
          <div className="mt-6">
            <Button primary type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Update'}
            </Button>
          </div>
          
          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {success}
            </div>
          )}
        </form>
      </Card>
    </div>
  );
};

export default WeeklyUpdateForm; 
