import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ComplianceDashboard } from './pages/ComplianceDashboard';

const ComplianceTrackerApp: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ComplianceDashboard />} />
      <Route path="/*" element={<ComplianceDashboard />} />
    </Routes>
  );
};

export default ComplianceTrackerApp;

