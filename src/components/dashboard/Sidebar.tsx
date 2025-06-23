
import React from 'react';
import { Shield, BarChart3, AlertTriangle, Target, Bot } from 'lucide-react';
import { cn } from '@/shared/utils/utils';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: 'overview' | 'threats' | 'budget' | 'recommendations') => void;
}

export const Sidebar = ({ activeView, setActiveView }: SidebarProps) => {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'threats', label: 'Threat Intelligence', icon: AlertTriangle },
    { id: 'budget', label: 'Budget Optimization', icon: Target },
  ];

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 flex-shrink-0">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <Shield className="h-8 w-8 text-purple-500" />
          <div>
            <h1 className="text-xl font-bold text-white">SecureAI</h1>
            <p className="text-sm text-slate-400">Security Investment Platform</p>
          </div>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id as any)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200",
                  activeView === item.id
                    ? "bg-purple-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
