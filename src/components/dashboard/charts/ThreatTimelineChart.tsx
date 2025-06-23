
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { time: '00:00', threats: 12, blocked: 45 },
  { time: '04:00', threats: 8, blocked: 32 },
  { time: '08:00', threats: 18, blocked: 67 },
  { time: '12:00', threats: 23, blocked: 89 },
  { time: '16:00', threats: 15, blocked: 56 },
  { time: '20:00', threats: 19, blocked: 73 }
];

export const ThreatTimelineChart = () => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis 
            dataKey="time" 
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
          />
          <Line 
            type="monotone" 
            dataKey="threats" 
            stroke="#ef4444" 
            strokeWidth={2}
            name="Active Threats"
          />
          <Line 
            type="monotone" 
            dataKey="blocked" 
            stroke="#22c55e" 
            strokeWidth={2}
            name="Threats Blocked"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
