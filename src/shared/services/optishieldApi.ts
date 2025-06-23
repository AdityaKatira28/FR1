
import { toast } from "@/shared/hooks/use-toast";

// Enhanced mock threat data with real-world scenarios
const threatData = [
  { 
    threat_id: "T001", 
    type: "credential_stuffing", 
    severity: "critical", 
    cost_impact: 3200000,
    source: "Darkweb intelligence",
    affected_assets: ["user_accounts", "admin_portals"],
    confidence: 0.95
  },
  { 
    threat_id: "T002", 
    type: "ransomware", 
    severity: "high", 
    cost_impact: 2800000,
    source: "Threat hunting",
    affected_assets: ["file_servers", "databases"],
    confidence: 0.87
  },
  { 
    threat_id: "T003", 
    type: "supply_chain", 
    severity: "high", 
    cost_impact: 1500000,
    source: "Third-party monitoring",
    affected_assets: ["dependencies", "vendor_access"],
    confidence: 0.78
  },
  { 
    threat_id: "T004", 
    type: "data_exfiltration", 
    severity: "medium", 
    cost_impact: 950000,
    source: "DLP alerts",
    affected_assets: ["customer_data", "intellectual_property"],
    confidence: 0.82
  },
  { 
    threat_id: "T005", 
    type: "insider_threat", 
    severity: "medium", 
    cost_impact: 750000,
    source: "Behavioral analytics",
    affected_assets: ["sensitive_documents", "financial_data"],
    confidence: 0.73
  }
];

// Enhanced CVE data with current vulnerabilities
const cveData = [
  { 
    cve_id: "CVE-2024-12345", 
    asset: "web_application", 
    severity: "critical", 
    patch_cost: 75000,
    description: "Remote code execution in authentication module",
    exploitability: "high"
  },
  { 
    cve_id: "CVE-2024-67890", 
    asset: "database", 
    severity: "high", 
    patch_cost: 45000,
    description: "SQL injection vulnerability in user management",
    exploitability: "medium"
  },
  { 
    cve_id: "CVE-2024-11111", 
    asset: "api_gateway", 
    severity: "high", 
    patch_cost: 35000,
    description: "Authorization bypass in API endpoints",
    exploitability: "high"
  }
];

// Live-like Splunk/SIEM data
const generateRealtimeAlerts = () => {
  const alertTypes = [
    "failed_authentication", "suspicious_network_traffic", "malware_detection", 
    "privilege_escalation", "data_access_anomaly", "endpoint_compromise"
  ];
  
  return Array.from({ length: 8 }, (_, i) => ({
    alert_id: `A${String(Date.now() + i).slice(-6)}`,
    type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
    asset: ["web_server", "database", "workstation", "mobile_device"][Math.floor(Math.random() * 4)],
    timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    severity: ["critical", "high", "medium", "low"][Math.floor(Math.random() * 4)],
    source_ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    confidence: 0.7 + Math.random() * 0.3
  }));
};

// Threat Agent functionality with enhanced intelligence
export const analyzeThreatData = async () => {
  try {
    console.log("Analyzing threat data...");
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const criticalThreats = threatData.filter(t => t.severity === "critical");
    const highThreats = threatData.filter(t => t.severity === "high");
    const totalImpact = threatData.reduce((sum, t) => sum + t.cost_impact, 0);
    const avgConfidence = threatData.reduce((sum, t) => sum + t.confidence, 0) / threatData.length;
    
    return {
      threats: threatData.map(t => t.threat_id),
      severity: criticalThreats.length > 0 ? "CRITICAL" : highThreats.length > 0 ? "HIGH" : "MEDIUM",
      confidence: avgConfidence,
      totalImpact,
      threatBreakdown: {
        critical: criticalThreats.length,
        high: highThreats.length,
        medium: threatData.filter(t => t.severity === "medium").length,
        low: threatData.filter(t => t.severity === "low").length
      },
      topThreats: threatData
        .sort((a, b) => b.cost_impact - a.cost_impact)
        .slice(0, 3)
        .map(t => ({
          type: t.type,
          impact: t.cost_impact,
          confidence: t.confidence
        })),
      realtimeAlerts: generateRealtimeAlerts()
    };
  } catch (error) {
    console.error("Threat analysis error:", error);
    toast({
      title: "Error analyzing threats",
      description: "Failed to process threat intelligence data.",
      variant: "destructive"
    });
    return { status: "Error analyzing threats" };
  }
};

// Enhanced Budget Agent with threat-driven optimization
export const optimizeBudget = async (budget: number) => {
  try {
    console.log(`Optimizing budget: $${budget}`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Threat-driven allocation logic
    const threatAnalysis = await analyzeThreatData();
    const hasCredentialThreats = threatData.some(t => t.type.includes("credential"));
    const hasRansomware = threatData.some(t => t.type === "ransomware");
    const hasWebThreats = threatData.some(t => t.affected_assets?.includes("web"));
    
    // Base allocations adjusted for threat landscape
    let allocations = {
      MFA: Math.min(budget * (hasCredentialThreats ? 0.45 : 0.25), 150000),
      WAF: Math.min(budget * (hasWebThreats ? 0.35 : 0.20), 120000),
      Patching: Math.min(budget * 0.15, 50000),
      BackupRecovery: Math.min(budget * (hasRansomware ? 0.25 : 0.15), 80000),
      ZeroTrust: Math.min(budget * 0.20, 100000)
    };
    
    // Ensure we don't exceed budget
    const totalAllocated = Object.values(allocations).reduce((sum, val) => sum + val, 0);
    if (totalAllocated > budget) {
      const scaleFactor = budget / totalAllocated;
      allocations = Object.fromEntries(
        Object.entries(allocations).map(([key, value]) => [key, Math.round(value * scaleFactor)])
      );
    }
    
    // ROI calculation based on threat prevention
    const totalCost = Object.values(allocations).reduce((sum, val) => sum + val, 0);
    const preventedLoss = threatAnalysis.totalImpact || 8500000;
    const roi = totalCost > 0 ? (preventedLoss - totalCost) / totalCost : 0;
    
    return {
      budget,
      allocations,
      roi,
      threatJustification: {
        MFA: hasCredentialThreats ? "Increased due to credential stuffing attacks" : "Standard protection",
        WAF: hasWebThreats ? "Boosted for web application threats" : "Basic web protection",
        Patching: "Critical for vulnerability management",
        BackupRecovery: hasRansomware ? "Enhanced due to ransomware threats" : "Standard backup",
        ZeroTrust: "Future-proofing security architecture"
      },
      riskReduction: Math.min(0.85, (totalCost / 300000) * 0.7 + 0.15),
      costAvoidance: preventedLoss * 0.8
    };
  } catch (error) {
    console.error("Budget optimization error:", error);
    toast({
      title: "Error optimizing budget",
      description: "Failed to calculate threat-based allocations.",
      variant: "destructive"
    });
    return { status: "Error optimizing budget" };
  }
};

// Enhanced Query Agent with threat-specific responses
export const processQuery = async (query: string) => {
  try {
    console.log(`Processing query: ${query}`);
    await new Promise(resolve => setTimeout(resolve, 900));
    
    const sanitizedQuery = query.replace(/;/g, "").replace(/--/g, "");
    const lowerQuery = sanitizedQuery.toLowerCase();
    
    let answer = "Based on current threat intelligence, I don't have specific data for that query.";
    let confidence = 0.5;
    
    // Enhanced query responses with threat context
    if (lowerQuery.includes("mfa") || lowerQuery.includes("multi-factor")) {
      if (lowerQuery.includes("roi") || lowerQuery.includes("return")) {
        answer = "MFA investment of $75K-150K prevents credential stuffing attacks worth $3.2M in potential damages, providing an ROI of 2,033%. Current threat intelligence shows active credential attacks targeting your industry.";
        confidence = 0.96;
      } else {
        answer = "MFA is critical given current credential stuffing campaigns. Recommend $150K investment for enterprise-grade solutions covering all access points. This addresses 67% of current attack vectors.";
        confidence = 0.92;
      }
    } else if (lowerQuery.includes("waf") || lowerQuery.includes("firewall")) {
      answer = "WAF investment of $120K recommended due to detected web application threats. This prevents SQL injection and XSS attacks worth $2.8M in potential breach costs, providing 2,233% ROI.";
      confidence = 0.89;
    } else if (lowerQuery.includes("ransomware") || lowerQuery.includes("backup")) {
      answer = "Given active ransomware threats, allocate $80K for backup/recovery systems. This prevents $2.8M average ransomware costs and ensures 4-hour recovery time objectives.";
      confidence = 0.94;
    } else if (lowerQuery.includes("patch") || lowerQuery.includes("vulnerability")) {
      answer = "Patching budget of $50K addresses 23 critical CVEs including remote code execution vulnerabilities. Prevents $1.5M in exploitation costs with 2,900% ROI.";
      confidence = 0.87;
    } else if (lowerQuery.includes("zero trust") || lowerQuery.includes("network")) {
      answer = "Zero Trust architecture investment of $100K reduces lateral movement risk by 85%. Critical for preventing advanced persistent threats with $3.2M potential impact.";
      confidence = 0.83;
    } else if (lowerQuery.includes("budget") || lowerQuery.includes("allocat")) {
      answer = "Optimal budget allocation based on threat analysis: 45% Identity (MFA/Zero Trust), 35% Network (WAF/Segmentation), 20% Data Protection. Total recommended: $250K-350K for comprehensive coverage.";
      confidence = 0.91;
    }
    
    return {
      query: sanitizedQuery,
      answer,
      confidence,
      threatContext: "Response based on real-time threat intelligence and current attack patterns",
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error("Query processing error:", error);
    toast({
      title: "Error processing query",
      description: "Failed to analyze your security question.",
      variant: "destructive"
    });
    return { status: "Error processing query" };
  }
};

// Additional helper for live demo data
export const getLiveThreatFeeds = () => {
  return {
    feeds: [
      "MISP Threat Intelligence Platform",
      "AlienVault OTX",
      "IBM X-Force Exchange", 
      "SANS Internet Storm Center",
      "VirusTotal Intelligence",
      "Recorded Future",
      "ThreatConnect",
      "Anomali ThreatStream"
    ],
    updateFrequency: "Real-time",
    lastUpdate: new Date().toISOString(),
    coverage: "Global threat landscape with industry-specific intelligence"
  };
};
