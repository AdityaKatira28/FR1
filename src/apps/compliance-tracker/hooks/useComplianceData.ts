import { useState, useEffect, useCallback } from 'react';
import { ComplianceData, AiInsights, ComplianceDashboardState } from '../types/compliance.types';
import { complianceApiService } from '../services/complianceApi';

export const useComplianceData = () => {
  const [state, setState] = useState<ComplianceDashboardState>({
    data: null,
    insights: null,
    loading: true,
    error: null,
    lastUpdated: null
  });

  const fetchData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // Fetch both dashboard data and AI insights in parallel
      const [dashboardData, aiInsights] = await Promise.all([
        complianceApiService.getDashboardData(),
        complianceApiService.getAiInsights()
      ]);

      setState({
        data: dashboardData,
        insights: aiInsights,
        loading: false,
        error: null,
        lastUpdated: new Date().toISOString()
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred'
      }));
    }
  }, []);

  const refreshData = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    ...state,
    refreshData
  };
};

export default useComplianceData;

