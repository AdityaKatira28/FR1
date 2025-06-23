
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { month: 'Jan', roi: 1.2, savings: 180000 },
  { month: 'Feb', roi: 1.4, savings: 220000 },
  { month: 'Mar', roi: 1.6, savings: 260000 },
  { month: 'Apr', roi: 1.8, savings: 300000 },
  { month: 'May', roi: 2.1, savings: 340000 },
  { month: 'Jun', roi: 2.3, savings: 380000 }
];

export const ROIAnalysisChart = () => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis 
            dataKey="month" 
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            axisLine={{ stroke: '#475569' }}
          />
          <YAxis 
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            axisLine={{ stroke: '#475569' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1e293b', 
              border: '1px solid #475569',
              borderRadius: '8px',
              color: '#fff'
            }}
            formatter={(value: number, name: string) => [
              name === 'roi' ? `${value.toFixed(1)}x` : `$${(value / 1000).toFixed(0)}K`,
              name === 'roi' ? 'ROI Multiplier' : 'Cost Savings'
            ]}
          />
          <Line 
            type="monotone" 
            dataKey="roi" 
            stroke="#22c55e" 
            strokeWidth={3}
            name="roi"
          />
          <Line 
            type="monotone" 
            dataKey="savings" 
            stroke="#8b5cf6" 
            strokeWidth={3}
            name="savings"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
