import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Shield, TrendingUp } from 'lucide-react';
import { Progress } from '@/shared/components/ui/progress';

export const SecurityScoreCard: React.FC = () => {
  const scoreComponents = [
    { name: 'Network Security', score: 92, color: 'bg-green-500' },
    { name: 'Identity & Access', score: 88, color: 'bg-blue-500' },
    { name: 'Data Protection', score: 85, color: 'bg-purple-500' },
    { name: 'Compliance', score: 90, color: 'bg-yellow-500' },
    { name: 'Incident Response', score: 82, color: 'bg-orange-500' }
  ];

  const overallScore = Math.round(scoreComponents.reduce((acc, item) => acc + item.score, 0) / scoreComponents.length);

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Shield className="h-5 w-5 text-green-500" />
          Security Score
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-white mb-2">{overallScore}</div>
          <div className="flex items-center justify-center gap-1 text-green-400 text-sm">
            <TrendingUp className="h-4 w-4" />
            +5% from last month
          </div>
        </div>
        
        <div className="space-y-4">
          {scoreComponents.map((component, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-300">{component.name}</span>
                <span className="text-white font-medium">{component.score}%</span>
              </div>
              <Progress value={component.score} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

