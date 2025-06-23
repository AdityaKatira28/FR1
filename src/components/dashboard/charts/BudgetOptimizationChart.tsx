
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { category: 'Network Security', current: 850000, recommended: 920000, roi: 2.3 },
  { category: 'Endpoint Protection', current: 600000, recommended: 580000, roi: 1.8 },
  { category: 'Identity & Access', current: 480000, recommended: 520000, roi: 2.1 },
  { category: 'Data Protection', current: 360000, recommended: 380000, roi: 1.9 },
  { category: 'Compliance', current: 120000, recommended: 100000, roi: 1.2 }
];

export const BudgetOptimizationChart = () => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis 
            dataKey="category" 
            tick={{ fill: '#94a3b8', fontSize: 10 }}
            axisLine={{ stroke: '#475569' }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            axisLine={{ stroke: '#475569' }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1e293b', 
              border: '1px solid #475569',
              borderRadius: '8px',
              color: '#fff'
            }}
            formatter={(value: number, name: string) => [
              `$${(value / 1000).toFixed(0)}K`,
              name === 'current' ? 'Current Budget' : 'Recommended Budget'
            ]}
          />
          <Bar dataKey="current" fill="#64748b" name="current" />
          <Bar dataKey="recommended" fill="#8b5cf6" name="recommended" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
