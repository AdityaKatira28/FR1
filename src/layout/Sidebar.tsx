import React from 'react';
import { Shield } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { APP_REGISTRY } from '../config/apps';
import { cn } from '@/shared/utils/utils';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActiveApp = (appPath: string): boolean => {
    return location.pathname.startsWith(appPath);
  };

  const handleAppNavigation = (appPath: string) => {
    navigate(appPath);
  };

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 flex-shrink-0">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <Shield className="h-8 w-8 text-purple-500" />
          <div>
            <h1 className="text-xl font-bold text-white">CyberWise AI</h1>
            <p className="text-sm text-slate-400">Security Investment Platform</p>
          </div>
        </div>
        
        <nav className="space-y-2">
          {APP_REGISTRY.map((app) => {
            const Icon = app.icon;
            const isActive = isActiveApp(app.path);
            
            return (
              <button
                key={app.id}
                onClick={() => handleAppNavigation(app.path)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200",
                  isActive
                    ? "bg-purple-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                )}
                title={app.description}
              >
                <Icon className="h-5 w-5" />
                {app.name}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

