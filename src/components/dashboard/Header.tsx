
import React from 'react';
import { Bell, Search, User, Bot, Settings } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

interface HeaderProps {
  onToggleAssistant: () => void;
}

export const Header = ({ onToggleAssistant }: HeaderProps) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex-shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input 
              placeholder="Search threats, policies, or recommendations..." 
              className="pl-10 w-80 bg-slate-800 border-slate-700 text-white placeholder-slate-400"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleAssistant}
            className="bg-purple-600 hover:bg-purple-700 border-purple-500 text-white"
          >
            <Bot className="h-4 w-4 mr-2" />
            AI Assistant
          </Button>
          
          <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-800">
            <Bell className="h-4 w-4" />
          </Button>
          
          <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-800">
            <Settings className="h-4 w-4" />
          </Button>
          
          <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-800">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};
