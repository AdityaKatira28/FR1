
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { AlertTriangle, Globe, Shield, Target } from 'lucide-react';
import { ThreatMapVisualization } from './visualizations/ThreatMapVisualization';
import { ThreatTimelineChart } from './charts/ThreatTimelineChart';

export const ThreatDashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-white">Threat Intelligence</h1>
        <p className="text-slate-400 mt-1">Real-time threat monitoring and analysis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Active Threats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500 mb-2">23</div>
            <div className="text-sm text-slate-400">-12% from yesterday</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Globe className="h-5 w-5 text-blue-500" />
              Global Coverage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-500 mb-2">47</div>
            <div className="text-sm text-slate-400">Countries monitored</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Target className="h-5 w-5 text-purple-500" />
              Threats Blocked
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-500 mb-2">1,247</div>
            <div className="text-sm text-slate-400">Last 24 hours</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Threat Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ThreatTimelineChart />
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Global Threat Map</CardTitle>
          </CardHeader>
          <CardContent>
            <ThreatMapVisualization />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
