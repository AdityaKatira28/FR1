import React from 'react';
import { Bot, Bell, Settings, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { getAppByPath } from '../config/apps';

export const Header: React.FC = () => {
  const location = useLocation();
  const currentApp = getAppByPath(location.pathname);

  const handleToggleAssistant = () => {
    console.log('AI Assistant toggled');
    // TODO: Implement AI assistant toggle functionality
  };

  return (
    <header className="bg-slate-900 border-b border-slate-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-white">
            {currentApp?.name || 'Dashboard'}
          </h2>
          {currentApp?.description && (
            <span className="text-sm text-slate-400">
              {currentApp.description}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={handleToggleAssistant}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="AI Assistant"
          >
            <Bot className="h-5 w-5" />
          </button>
          
          <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
            <Bell className="h-5 w-5" />
          </button>
          
          <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
            <Settings className="h-5 w-5" />
          </button>
          
          <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

