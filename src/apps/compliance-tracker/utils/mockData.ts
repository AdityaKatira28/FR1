// Mock data for compliance dashboard when backend is not available
export const mockComplianceData = {
  total_checks: 156,
  compliant: 142,
  non_compliant: 14,
  critical_count: 3,
  framework_scores: {
    'SOC2': 85.2,
    'GDPR': 92.1,
    'HIPAA': 78.9,
    'PCI-DSS': 88.7,
    'ISO27001': 91.3
  },
  provider_stats: {
    'AWS': { total: 89, critical: 2 },
    'Azure': { total: 45, critical: 1 },
    'GCP': { total: 22, critical: 0 }
  },
  recent_violations: [
    {
      id: 'cv-001',
      framework: 'SOC2',
      provider: 'AWS',
      severity: 'Critical',
      status: 'Failing',
      risk_score: 9.2,
      description: 'Unencrypted data transmission detected',
      last_checked: new Date().toISOString(),
      ai_summary: 'Critical security vulnerability: Data transmitted without encryption between services'
    },
    {
      id: 'cv-002',
      framework: 'GDPR',
      provider: 'Azure',
      severity: 'High',
      status: 'Failing',
      risk_score: 7.8,
      description: 'Personal data retention policy violation',
      last_checked: new Date(Date.now() - 3600000).toISOString(),
      ai_summary: 'GDPR compliance issue: Personal data retained beyond required period'
    },
    {
      id: 'cv-003',
      framework: 'HIPAA',
      provider: 'AWS',
      severity: 'Medium',
      status: 'Warning',
      risk_score: 6.1,
      description: 'Access logging configuration incomplete',
      last_checked: new Date(Date.now() - 7200000).toISOString(),
      ai_summary: 'HIPAA audit trail incomplete: Some access events not being logged'
    },
    {
      id: 'cv-004',
      framework: 'PCI-DSS',
      provider: 'GCP',
      severity: 'Low',
      status: 'Warning',
      risk_score: 4.3,
      description: 'Network segmentation best practices',
      last_checked: new Date(Date.now() - 10800000).toISOString(),
      ai_summary: 'PCI-DSS recommendation: Improve network segmentation for card data environment'
    }
  ]
};

export const mockAiInsights = {
  summary: {
    total_violations: 14,
    critical_violations: 3,
    frameworks_affected: 4,
    last_updated: new Date().toISOString()
  },
  recommendations: [
    {
      priority: 'Critical',
      description: 'Implement end-to-end encryption for all data transmissions',
      action: 'Configure TLS 1.3 for all service communications and enable encryption at rest'
    },
    {
      priority: 'High',
      description: 'Review and update data retention policies',
      action: 'Implement automated data lifecycle management and purging processes'
    },
    {
      priority: 'Medium',
      description: 'Enhance access logging and monitoring',
      action: 'Deploy comprehensive audit logging across all systems and enable real-time monitoring'
    }
  ]
};

