// pages/page.js
"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../components/ui/button';  // Ensure this uses shadcn's Button component
import { Input } from '../components/ui/input';  // Ensure this uses shadcn's Input component
import { Card, CardHeader, CardContent } from '../components/ui/card'; // Ensure this uses shadcn's Card components

export default function Home() {
  const [data, setData] = useState(null);
  const [ticker, setTicker] = useState('AAPL'); // Default ticker symbol
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch stock data from Flask API
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:5000/api/stock`, { params: { ticker } });
      setData(response.data);
    } catch (err) {
      setError('Failed to fetch data');
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [ticker]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="max-w-lg w-full p-6 bg-white rounded-lg shadow-md">
        <CardHeader>
          <h1 className="text-2xl font-semibold text-gray-800">Stock Dashboard</h1>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Input
              type="text"
              value={ticker}
              onChange={(e) => setTicker(e.target.value.toUpperCase())}
              placeholder="Enter stock ticker (e.g., AAPL)"
              className="flex-grow p-2 border rounded-md"
            />
            <Button onClick={fetchData} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Fetch Data
            </Button>
          </div>

          {loading && <p className="text-gray-500">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {data && (
            <div className="mt-4">
              <h2 className="text-lg font-medium text-gray-700">Data for {ticker}</h2>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1 max-h-60 overflow-y-scroll">
                {Object.entries(data).map(([time, value]) => (
                  <li key={time} className="whitespace-nowrap">{time}: {value.toFixed(2)}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
