// Threat types
export interface Threat {
  id: string;
  name: string;
  description: string;
  severity: ThreatSeverity;
  category: ThreatCategory;
  source: string;
  detectedAt: string;
  status: ThreatStatus;
  affectedSystems: string[];
  riskScore: number;
  mitigationSteps?: string[];
}

export type ThreatSeverity = 'Critical' | 'High' | 'Medium' | 'Low' | 'Info';
export type ThreatCategory = 'Malware' | 'Phishing' | 'DDoS' | 'Data Breach' | 'Insider Threat' | 'APT';
export type ThreatStatus = 'Active' | 'Mitigated' | 'Investigating' | 'Resolved';

// Budget types
export interface BudgetAllocation {
  category: string;
  amount: number;
  percentage: number;
  priority: number;
  justification?: string;
}

export interface BudgetOptimization {
  totalBudget: number;
  allocations: BudgetAllocation[];
  riskReduction: number;
  roi: number;
  recommendations: BudgetRecommendation[];
}

export interface BudgetRecommendation {
  category: string;
  currentAmount: number;
  recommendedAmount: number;
  reasoning: string;
  impact: string;
  priority: 'High' | 'Medium' | 'Low';
}

// Security metrics
export interface SecurityMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
  target?: number;
  description?: string;
}

export interface SecurityScore {
  overall: number;
  components: {
    networkSecurity: number;
    identityAccess: number;
    dataProtection: number;
    compliance: number;
    incidentResponse: number;
  };
  lastUpdated: string;
}

// Alert types
export interface SecurityAlert {
  id: string;
  title: string;
  description: string;
  severity: ThreatSeverity;
  type: AlertType;
  source: string;
  timestamp: string;
  status: AlertStatus;
  assignedTo?: string;
  tags: string[];
}

export type AlertType = 'network' | 'identity' | 'malware' | 'data' | 'compliance' | 'system';
export type AlertStatus = 'new' | 'acknowledged' | 'investigating' | 'resolved' | 'false_positive';

// Dashboard types
export interface DashboardWidget {
  id: string;
  type: WidgetType;
  title: string;
  size: WidgetSize;
  position: { x: number; y: number };
  config: Record<string, any>;
}

export type WidgetType = 'metric' | 'chart' | 'table' | 'map' | 'alert_list';
export type WidgetSize = 'small' | 'medium' | 'large' | 'full';

// Chart data types
export interface ChartDataPoint {
  name: string;
  value: number;
  color?: string;
  [key: string]: any;
}

export interface TimeSeriesDataPoint {
  timestamp: string;
  value: number;
  [key: string]: any;
}

