import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { AlertTriangle, CheckCircle, XCircle, RefreshCw, Shield, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { useComplianceData } from '../hooks/useComplianceData';
import { LoadingSpinner, ErrorMessage } from '@/shared/components/common';
import { FileUpload } from '../components/FileUpload';

export const ComplianceDashboard: React.FC = () => {
  const { data: complianceData, insights: aiInsights, loading, error, refreshData } = useComplianceData();

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'passing': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failing': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
        <span className="ml-2 text-white">Loading compliance data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <ErrorMessage message={error} />
        <Button onClick={refreshData} variant="outline" className="mt-4">
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      </div>
    );
  }

  if (!complianceData || !aiInsights) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-white">No compliance data available</p>
      </div>
    );
  }

  const compliancePercentage = Math.round((complianceData.compliant / complianceData.total_checks) * 100);

  return (
    <div className="space-y-6 bg-slate-950 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">AI Compliance Tracker</h1>
          <p className="text-slate-400 mt-1">Real-time compliance monitoring and AI-powered insights</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-900/50 text-green-300 border-green-500">
            <Activity className="h-4 w-4 mr-1" />
            Live Monitoring
          </Badge>
          <Button onClick={refreshData} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">Total Checks</CardTitle>
            <Shield className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{complianceData.total_checks}</div>
            <p className="text-xs text-slate-400">Across all frameworks</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">Compliance Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{compliancePercentage}%</div>
            <p className="text-xs text-slate-400">{complianceData.compliant} of {complianceData.total_checks} passing</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">Critical Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{complianceData.critical_count}</div>
            <p className="text-xs text-slate-400">Require immediate attention</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">Non-Compliant</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{complianceData.non_compliant}</div>
            <p className="text-xs text-slate-400">Failed checks</p>
          </CardContent>
        </Card>
      </div>

      {/* Framework Scores */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Framework Scores</CardTitle>
          <CardDescription className="text-slate-400">Average risk scores by compliance framework</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(complianceData.framework_scores).map(([framework, score]) => (
              <div key={framework} className="text-center p-4 bg-slate-800 rounded-lg border border-slate-700">
                <div className="text-2xl font-bold text-white">{score}</div>
                <div className="text-sm text-slate-400 mt-1">{framework}</div>
                <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full" 
                    style={{ width: `${Math.min(score, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Provider Statistics */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Provider Statistics</CardTitle>
          <CardDescription className="text-slate-400">Compliance status by cloud provider</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(complianceData.provider_stats).map(([provider, stats]) => (
              <div key={provider} className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white">{provider}</h4>
                  {stats.critical > 0 && (
                    <Badge className="bg-red-900/50 text-red-300 text-xs">
                      {stats.critical} Critical
                    </Badge>
                  )}
                </div>
                <div className="text-2xl font-bold text-white">{stats.total}</div>
                <div className="text-sm text-slate-400">Total resources</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Violations */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Recent Violations</CardTitle>
          <CardDescription className="text-slate-400">Latest compliance issues detected</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {complianceData.recent_violations.slice(0, 5).map((violation) => (
              <div key={violation.id} className="flex items-center justify-between p-4 bg-slate-800 rounded-lg border border-slate-700">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(violation.status)}
                  <div className="flex-1">
                    <div className="font-medium text-white">{violation.description}</div>
                    <div className="text-sm text-slate-400">
                      {violation.framework} • {violation.provider} • Risk Score: {violation.risk_score}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">{violation.ai_summary}</div>
                    <div className="text-xs text-slate-600 mt-1">
                      Last checked: {new Date(violation.last_checked).toLocaleString()}
                    </div>
                  </div>
                </div>
                <Badge className={`${getSeverityColor(violation.severity)} text-white`}>
                  {violation.severity}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">AI Insights & Recommendations</CardTitle>
          <CardDescription className="text-slate-400">AI-powered analysis and suggestions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-slate-800 rounded-lg border border-slate-700">
                <div className="text-2xl font-bold text-white">{aiInsights.summary.total_violations}</div>
                <div className="text-sm text-slate-400">Total Violations</div>
              </div>
              <div className="text-center p-4 bg-slate-800 rounded-lg border border-slate-700">
                <div className="text-2xl font-bold text-white">{aiInsights.summary.critical_violations}</div>
                <div className="text-sm text-slate-400">Critical Violations</div>
              </div>
              <div className="text-center p-4 bg-slate-800 rounded-lg border border-slate-700">
                <div className="text-2xl font-bold text-white">{aiInsights.summary.frameworks_affected}</div>
                <div className="text-sm text-slate-400">Frameworks Affected</div>
              </div>
            </div>
            
            {aiInsights.recommendations.length > 0 && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-white mb-3">AI Recommendations</h4>
                <div className="space-y-3">
                  {aiInsights.recommendations.map((rec, index) => (
                    <div key={index} className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={`${getSeverityColor(rec.priority)} text-white`}>
                          {rec.priority}
                        </Badge>
                      </div>
                      <div className="text-white font-medium mb-2">{rec.description}</div>
                      <div className="text-sm text-slate-400">{rec.action}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="text-xs text-slate-500 mt-4">
              Last updated: {new Date(aiInsights.summary.last_updated).toLocaleString()}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File Upload Section */}
     <FileUpload
  onUploadComplete={(files) => {
    console.log('Files uploaded successfully:', files);
    // Refresh compliance data after successful upload
    refreshData();
  }}
  onUploadError={(error) => {
    console.error('Upload error:', error);
  }}
  acceptedFileTypes={['.csv', '.json', '.xlsx', '.txt']}
  maxFileSize={10}
  maxFiles={5}
  uploadEndpoint="https://railway-production-9c73.up.railway.app/api/v1/upload"  
/>
    </div>
  );
};

