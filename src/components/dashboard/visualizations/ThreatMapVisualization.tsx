
import React from 'react';

export const ThreatMapVisualization = () => {
  const threats = [
    { country: 'United States', threats: 45, x: 20, y: 30 },
    { country: 'China', threats: 32, x: 75, y: 35 },
    { country: 'Russia', threats: 28, x: 60, y: 25 },
    { country: 'Brazil', threats: 15, x: 30, y: 65 },
    { country: 'India', threats: 22, x: 70, y: 45 },
    { country: 'Germany', threats: 18, x: 50, y: 28 }
  ];

  const getThreatSize = (threats: number) => {
    return Math.max(8, Math.min(24, threats / 2));
  };

  const getThreatColor = (threats: number) => {
    if (threats > 30) return '#ef4444';
    if (threats > 20) return '#f97316';
    if (threats > 10) return '#eab308';
    return '#22c55e';
  };

  return (
    <div className="h-64 relative bg-slate-800 rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900">
        {/* World map simplified representation */}
        <svg viewBox="0 0 100 60" className="w-full h-full">
          {/* Simplified continent shapes */}
          <path 
            d="M10 20 L35 15 L40 25 L35 35 L15 40 L10 30 Z" 
            fill="#374151" 
            opacity="0.6"
          />
          <path 
            d="M45 15 L75 12 L85 25 L80 40 L60 45 L45 35 Z" 
            fill="#374151" 
            opacity="0.6"
          />
          <path 
            d="M20 45 L45 42 L50 55 L40 58 L25 55 Z" 
            fill="#374151" 
            opacity="0.6"
          />
        </svg>
        
        {/* Threat indicators */}
        {threats.map((threat, index) => (
          <div
            key={index}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
            style={{
              left: `${threat.x}%`,
              top: `${threat.y}%`,
              width: `${getThreatSize(threat.threats)}px`,
              height: `${getThreatSize(threat.threats)}px`,
              backgroundColor: getThreatColor(threat.threats),
              borderRadius: '50%',
              boxShadow: `0 0 ${getThreatSize(threat.threats)}px ${getThreatColor(threat.threats)}40`
            }}
            title={`${threat.country}: ${threat.threats} threats`}
          />
        ))}
      </div>
      
      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span>High Risk</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span>Medium Risk</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Low Risk</span>
          </div>
        </div>
      </div>
    </div>
  );
};
