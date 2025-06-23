import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { ThreatLevelChart } from '../components/ThreatLevelChart';
import { BudgetAllocationChart } from '../components/BudgetAllocationChart';
import { SecurityScoreCard } from '../components/SecurityScoreCard';
import { MetricsGrid } from '../components/MetricsGrid';
import { RecentAlerts } from '../components/RecentAlerts';
import { TrendingUp, Shield, AlertTriangle, DollarSign } from 'lucide-react';

export const MainDashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Security Overview</h1>
          <p className="text-slate-400 mt-1">Real-time insights into your security posture and investment optimization</p>
        </div>
        <div className="flex items-center gap-2 text-green-400">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm">Live Monitoring Active</span>
        </div>
      </div>

      <MetricsGrid />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Threat Landscape
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ThreatLevelChart />
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <DollarSign className="h-5 w-5 text-green-500" />
              Budget Allocation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BudgetAllocationChart />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentAlerts />
        </div>
        <div>
          <SecurityScoreCard />
        </div>
      </div>
    </div>
  );
};

