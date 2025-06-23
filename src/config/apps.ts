import { BarChart3, AlertTriangle, Target, Shield } from 'lucide-react';
import { lazy } from 'react';

export interface AppConfig {
  id: string;
  name: string;
  path: string;
  icon: any;
  description: string;
  component: () => Promise<{ default: React.ComponentType<any> }>;
}

// Lazy load app components for better performance
const OverviewApp = lazy(() => import('../apps/overview'));
const ThreatIntelligenceApp = lazy(() => import('../apps/threat-intelligence'));
const BudgetOptimizationApp = lazy(() => import('../apps/budget-optimization'));
const ComplianceTrackerApp = lazy(() => import('../apps/compliance-tracker'));

export const APP_REGISTRY: AppConfig[] = [
  {
    id: 'overview',
    name: 'Overview',
    path: '/overview',
    icon: BarChart3,
    description: 'System overview and dashboard',
    component: () => import('../apps/overview')
  },
  {
    id: 'threat-intelligence',
    name: 'Threat Intelligence',
    path: '/threat-intelligence',
    icon: AlertTriangle,
    description: 'AI-powered threat analysis',
    component: () => import('../apps/threat-intelligence')
  },
  {
    id: 'budget-optimization',
    name: 'Budget Optimization',
    path: '/budget-optimization',
    icon: Target,
    description: 'Cost analysis and optimization',
    component: () => import('../apps/budget-optimization')
  },
  {
    id: 'compliance-tracker',
    name: 'Compliance Tracker',
    path: '/compliance-tracker',
    icon: Shield,
    description: 'Real-time compliance monitoring',
    component: () => import('../apps/compliance-tracker')
  }
  // Future apps will be added here:
  // - vulnerability-scanner
  // - incident-response
  // - security-training
  // - reporting-analytics
];

// Helper function to get app by ID
export const getAppById = (id: string): AppConfig | undefined => {
  return APP_REGISTRY.find(app => app.id === id);
};

// Helper function to get app by path
export const getAppByPath = (path: string): AppConfig | undefined => {
  return APP_REGISTRY.find(app => path.startsWith(app.path));
};

