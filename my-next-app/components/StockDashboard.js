// components/StockDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';  // Assuming shadcn's Button component
import { Input } from '@/components/ui/input';    // Assuming shadcn's Input component
import { Card, CardHeader, CardContent } from '@/components/ui/card'; // Example shadcn card component

const StockDashboard = () => {
    const [ticker, setTicker] = useState('AAPL');  // Default ticker
    const [stockData, setStockData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchStockData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:5000/api/stock`, { params: { ticker } });
            setStockData(response.data);
        } catch (err) {
            setError('Failed to fetch data');
            console.error(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchStockData();
    }, [ticker]);

    return (
        <Card className="max-w-lg mx-auto mt-6">
            <CardHeader>
                <h1 className="text-2xl font-semibold">Stock Dashboard</h1>
            </CardHeader>
            <CardContent>
                {/* Input for Ticker and Fetch Button */}
                <div className="flex items-center space-x-2 mb-4">
                    <Input 
                        type="text" 
                        value={ticker} 
                        onChange={(e) => setTicker(e.target.value.toUpperCase())} 
                        placeholder="Enter stock ticker (e.g., AAPL)"
                        className="flex-grow"
                    />
                    <Button onClick={fetchStockData}>Fetch Data</Button>
                </div>

                {/* Display Loading, Error, or Data */}
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {stockData && (
                    <div className="space-y-2">
                        <h2 className="text-lg font-medium">Data for {ticker}</h2>
                        <ul className="list-disc pl-5">
                            {Object.entries(stockData).map(([time, value]) => (
                                <li key={time}>{time}: {value}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default StockDashboard;
