// Compliance-specific types
export interface ComplianceCheck {
  id: string;
  framework: string;
  provider: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Passing' | 'Failing' | 'Warning';
  risk_score: number;
  description: string;
  last_checked: string;
  ai_summary: string;
}

export interface ComplianceData {
  total_checks: number;
  compliant: number;
  non_compliant: number;
  critical_count: number;
  framework_scores: Record<string, number>;
  provider_stats: Record<string, { total: number; critical: number }>;
  recent_violations: ComplianceCheck[];
}

export interface AiInsights {
  summary: {
    total_violations: number;
    critical_violations: number;
    frameworks_affected: number;
    last_updated: string;
  };
  recommendations: Array<{
    priority: 'Critical' | 'High' | 'Medium' | 'Low';
    description: string;
    action: string;
  }>;
}

export interface ScanRequest {
  resources: string[];
}

export interface ScanResult {
  scan_id: string;
  status: 'completed' | 'running' | 'failed';
  results: ComplianceCheck[];
  started_at: string;
  completed_at?: string;
}

// Framework types
export type ComplianceFramework = 'SOC2' | 'GDPR' | 'HIPAA' | 'PCI-DSS' | 'ISO27001' | 'NIST';
export type CloudProvider = 'AWS' | 'Azure' | 'GCP' | 'Multi-Cloud';

// Dashboard state types
export interface ComplianceDashboardState {
  data: ComplianceData | null;
  insights: AiInsights | null;
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

