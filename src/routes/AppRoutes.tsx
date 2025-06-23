import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { APP_REGISTRY } from '../config/apps';
import { LoadingSpinner } from '../shared/components/common/LoadingSpinner';

// Lazy load app components
const OverviewApp = React.lazy(() => import('../apps/overview'));
const ThreatIntelligenceApp = React.lazy(() => import('../apps/threat-intelligence'));
const BudgetOptimizationApp = React.lazy(() => import('../apps/budget-optimization'));
const ComplianceTrackerApp = React.lazy(() => import('../apps/compliance-tracker'));

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Default redirect to overview */}
        <Route path="/" element={<Navigate to="/overview" replace />} />
        
        {/* App routes */}
        <Route path="/overview/*" element={<OverviewApp />} />
        <Route path="/threat-intelligence/*" element={<ThreatIntelligenceApp />} />
        <Route path="/budget-optimization/*" element={<BudgetOptimizationApp />} />
        <Route path="/compliance-tracker/*" element={<ComplianceTrackerApp />} />
        
        {/* Future app routes will be added here automatically */}
        
        {/* Catch-all route - redirect to overview */}
        <Route path="*" element={<Navigate to="/overview" replace />} />
      </Routes>
    </Suspense>
  );
};

