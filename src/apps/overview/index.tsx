import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainDashboard } from './pages/MainDashboard';

const OverviewApp: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainDashboard />} />
      <Route path="/*" element={<MainDashboard />} />
    </Routes>
  );
};

export default OverviewApp;

