import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { AlertTriangle, Shield, Clock } from 'lucide-react';

export const RecentAlerts: React.FC = () => {
  const alerts = [
    {
      id: 1,
      title: 'Suspicious Network Activity Detected',
      severity: 'High',
      time: '2 min ago',
      description: 'Unusual traffic patterns from external IP ranges',
      type: 'network'
    },
    {
      id: 2,
      title: 'Failed Authentication Attempts',
      severity: 'Medium',
      time: '15 min ago',
      description: 'Multiple failed login attempts from single source',
      type: 'identity'
    },
    {
      id: 3,
      title: 'Vulnerability Scan Complete',
      severity: 'Info',
      time: '1 hour ago',
      description: 'Weekly vulnerability assessment completed',
      type: 'scan'
    },
    {
      id: 4,
      title: 'Endpoint Protection Updated',
      severity: 'Low',
      time: '2 hours ago',
      description: 'Endpoint protection rules updated successfully',
      type: 'update'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-500';
      case 'High': return 'bg-orange-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-blue-500';
      case 'Info': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          Recent Security Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-start gap-4 p-4 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors duration-200">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-white font-medium">{alert.title}</h4>
                  <Badge className={`${getSeverityColor(alert.severity)} text-white border-0`}>
                    {alert.severity}
                  </Badge>
                </div>
                <p className="text-slate-400 text-sm mb-2">{alert.description}</p>
                <div className="flex items-center gap-1 text-slate-500 text-xs">
                  <Clock className="h-3 w-3" />
                  {alert.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

