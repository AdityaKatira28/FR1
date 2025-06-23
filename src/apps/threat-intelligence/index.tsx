import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThreatDashboard } from './pages/ThreatDashboard';

const ThreatIntelligenceApp: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ThreatDashboard />} />
      <Route path="/*" element={<ThreatDashboard />} />
    </Routes>
  );
};

export default ThreatIntelligenceApp;

