import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { AppRoutes } from '../routes/AppRoutes';

export const MainLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-6 overflow-auto bg-slate-950">
          <AppRoutes />
        </main>
      </div>
    </div>
  );
};

