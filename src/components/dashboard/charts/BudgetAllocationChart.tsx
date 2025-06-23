
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Network Security', value: 35, color: '#8b5cf6' },
  { name: 'Endpoint Protection', value: 25, color: '#06b6d4' },
  { name: 'Identity & Access', value: 20, color: '#10b981' },
  { name: 'Data Protection', value: 15, color: '#f59e0b' },
  { name: 'Compliance', value: 5, color: '#ef4444' }
];

export const BudgetAllocationChart = () => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend 
            wrapperStyle={{ color: '#94a3b8', fontSize: '12px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
