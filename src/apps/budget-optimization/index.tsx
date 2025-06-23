import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BudgetDashboard } from './pages/BudgetDashboard';

const BudgetOptimizationApp: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<BudgetDashboard />} />
      <Route path="/*" element={<BudgetDashboard />} />
    </Routes>
  );
};

export default BudgetOptimizationApp;

