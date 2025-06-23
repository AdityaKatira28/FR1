
import React, { useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import { OverviewDashboard } from '@/components/dashboard/OverviewDashboard';
import { ThreatDashboard } from '@/components/dashboard/ThreatDashboard';
import BudgetOptimizationDashboard from '@/components/dashboard/BudgetOptimizationDashboard';
import { Toaster } from "@/shared/components/ui/toaster";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [activeView, setActiveView] = useState<'overview' | 'threats' | 'budget' | 'recommendations'>('overview');

  const handleToggleAssistant = () => {
    console.log('AI Assistant toggled');
    // TODO: Implement AI assistant toggle functionality
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'overview':
        return <OverviewDashboard />;
      case 'threats':
        return <ThreatDashboard />;
      case 'budget':
        return <BudgetOptimizationDashboard />;
      default:
        return <OverviewDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex flex-col flex-1">
        <Header onToggleAssistant={handleToggleAssistant} />
        <main className="flex-1 p-6 overflow-auto bg-slate-950">
          {children || renderActiveView()}
        </main>
      </div>
      <Toaster />
    </div>
  );
};
