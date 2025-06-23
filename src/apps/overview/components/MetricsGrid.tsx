import React from 'react';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Shield, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react';

export const MetricsGrid: React.FC = () => {
  const metrics = [
    {
      title: 'Security Score',
      value: '87',
      change: '+5%',
      trend: 'up',
      icon: Shield,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      title: 'Active Threats',
      value: '23',
      change: '-12%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10'
    },
    {
      title: 'Budget Efficiency',
      value: '92%',
      change: '+8%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: 'Cost Savings',
      value: '$2.4M',
      change: '+15%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <Card key={index} className="bg-slate-900 border-slate-800 hover:bg-slate-800 transition-colors duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                  <Icon className={`h-5 w-5 ${metric.color}`} />
                </div>
                <span className={`text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {metric.change}
                </span>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-white">{metric.value}</div>
                <div className="text-sm text-slate-400">{metric.title}</div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

