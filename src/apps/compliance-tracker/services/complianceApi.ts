import { apiClient } from '@/shared/services/api';
import { ComplianceData, AiInsights, ComplianceCheck, ScanRequest, ScanResult } from '../types/compliance.types';
import { mockComplianceData, mockAiInsights } from '../utils/mockData';

// Compliance API service for Railway backend integration
class ComplianceApiService {
  private readonly baseUrl = '/api/v1';

  /**
   * Get compliance dashboard summary data
   */
  async getDashboardData(): Promise<ComplianceData> {
    try {
      const response = await apiClient.get(`${this.baseUrl}/dashboard`);
      return response.data;
    } catch (error) {
      console.warn('Backend compliance API not available, using mock data:', error);
      // Return mock data when backend is not available
      return mockComplianceData;
    }
  }

  /**
   * Get AI-powered insights and recommendations
   */
  async getAiInsights(): Promise<AiInsights> {
    try {
      const response = await apiClient.get(`${this.baseUrl}/ai-insights`);
      return response.data;
    } catch (error) {
      console.warn('Backend AI insights API not available, using mock data:', error);
      // Return mock data when backend is not available
      return mockAiInsights;
    }
  }

  /**
   * Get compliance checks with optional filters
   */
  async getComplianceChecks(filters?: {
    framework?: string;
    provider?: string;
    severity?: string;
  }): Promise<ComplianceCheck[]> {
    try {
      const params = new URLSearchParams();
      if (filters?.framework) params.append('framework', filters.framework);
      if (filters?.provider) params.append('provider', filters.provider);
      if (filters?.severity) params.append('severity', filters.severity);

      const response = await apiClient.get(`${this.baseUrl}/checks?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch compliance checks:', error);
      throw new Error('Failed to load compliance checks');
    }
  }

  /**
   * Perform a compliance scan on specified resources
   */
  async performScan(scanRequest: ScanRequest): Promise<ScanResult> {
    try {
      const response = await apiClient.post(`${this.baseUrl}/scan`, scanRequest);
      return response.data;
    } catch (error) {
      console.error('Failed to perform compliance scan:', error);
      throw new Error('Failed to perform compliance scan');
    }
  }

  /**
   * Get scan results by scan ID
   */
  async getScanResults(scanId: string): Promise<ScanResult> {
    try {
      const response = await apiClient.get(`${this.baseUrl}/scan/${scanId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch scan results:', error);
      throw new Error('Failed to load scan results');
    }
  }

  /**
   * Get compliance metrics for a specific framework
   */
  async getFrameworkMetrics(framework: string): Promise<{
    total_checks: number;
    passing: number;
    failing: number;
    average_score: number;
  }> {
    try {
      const response = await apiClient.get(`${this.baseUrl}/frameworks/${framework}/metrics`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch framework metrics:', error);
      throw new Error('Failed to load framework metrics');
    }
  }

  /**
   * Get provider-specific compliance data
   */
  async getProviderData(provider: string): Promise<{
    total_resources: number;
    compliant_resources: number;
    critical_issues: number;
    recent_scans: ComplianceCheck[];
  }> {
    try {
      const response = await apiClient.get(`${this.baseUrl}/providers/${provider}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch provider data:', error);
      throw new Error('Failed to load provider data');
    }
  }

  /**
   * Get available frameworks
   */
  async getFrameworks(): Promise<string[]> {
    try {
      const response = await apiClient.get(`${this.baseUrl}/frameworks`);
      return response.data.frameworks;
    } catch (error) {
      console.error('Failed to fetch frameworks:', error);
      return ['SOC2', 'GDPR', 'HIPAA', 'PCI-DSS', 'ISO27001']; // fallback
    }
  }

  /**
   * Get available providers
   */
  async getProviders(): Promise<string[]> {
    try {
      const response = await apiClient.get(`${this.baseUrl}/providers`);
      return response.data.providers;
    } catch (error) {
      console.error('Failed to fetch providers:', error);
      return ['AWS', 'Azure', 'GCP']; // fallback
    }
  }

  /**
   * Get detailed statistics
   */
  async getStatistics(): Promise<any> {
    try {
      const response = await apiClient.get(`${this.baseUrl}/statistics`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch statistics:', error);
      throw new Error('Failed to load statistics');
    }
  }
}

export const complianceApiService = new ComplianceApiService();
export default complianceApiService;

