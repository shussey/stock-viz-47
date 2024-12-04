import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StockComparison = () => {
  const msftData = [
    {"date":"2024-12-03","close":431.20},{"date":"2024-12-02","close":430.98},{"date":"2024-11-29","close":423.46},
    {"date":"2024-11-27","close":422.99},{"date":"2024-11-26","close":427.99},{"date":"2024-11-25","close":418.79},
    {"date":"2024-11-22","close":417.00},{"date":"2024-11-21","close":412.87},{"date":"2024-11-20","close":415.49},
    {"date":"2024-11-19","close":417.79},{"date":"2024-11-18","close":415.76},{"date":"2024-11-15","close":415.00},
    {"date":"2024-11-14","close":426.89},{"date":"2024-11-13","close":425.20},{"date":"2024-11-12","close":423.03},
    {"date":"2024-11-11","close":418.01},{"date":"2024-11-08","close":422.54},{"date":"2024-11-07","close":425.43},
    {"date":"2024-11-06","close":420.18},{"date":"2024-11-05","close":411.46},{"date":"2024-11-04","close":408.46}
  ];

  const googData = [
    {"date":"2024-12-03","close":171.34},{"date":"2024-12-02","close":171.49},{"date":"2024-11-29","close":168.95},
    {"date":"2024-11-27","close":169.23},{"date":"2024-11-26","close":169.12},{"date":"2024-11-25","close":167.65},
    {"date":"2024-11-22","close":164.76},{"date":"2024-11-21","close":167.63},{"date":"2024-11-20","close":175.98},
    {"date":"2024-11-19","close":178.12},{"date":"2024-11-18","close":175.30},{"date":"2024-11-15","close":172.49},
    {"date":"2024-11-14","close":175.58},{"date":"2024-11-13","close":178.88},{"date":"2024-11-12","close":181.62},
    {"date":"2024-11-11","close":180.35},{"date":"2024-11-08","close":178.35},{"date":"2024-11-07","close":180.75},
    {"date":"2024-11-06","close":176.51},{"date":"2024-11-05","close":169.74},{"date":"2024-11-04","close":169.24}
  ];

  // Normalize the data to show percentage change from initial price
  const normalizedData = msftData.map((item, index) => {
    const msftInitial = msftData[msftData.length - 1].close;
    const googInitial = googData[googData.length - 1].close;
    
    return {
      date: item.date,
      MSFT: ((item.close - msftInitial) / msftInitial * 100).toFixed(2),
      GOOGL: ((googData[index].close - googInitial) / googInitial * 100).toFixed(2)
    };
  }).reverse();

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>MSFT vs GOOGL Stock Performance (Past Month)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={normalizedData}>
              <XAxis 
                dataKey="date" 
                tickFormatter={(date) => date.slice(5)} 
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                label={{ value: '% Change', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                formatter={(value) => [`${value}%`]}
                labelFormatter={(date) => `Date: ${date}`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="MSFT" 
                stroke="#00a8e8" 
                strokeWidth={2} 
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="GOOGL" 
                stroke="#34a853" 
                strokeWidth={2} 
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockComparison;