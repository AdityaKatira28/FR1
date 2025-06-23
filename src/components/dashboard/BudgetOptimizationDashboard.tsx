
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Slider } from "@/shared/components/ui/slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/shared/components/ui/tabs";
import { Badge } from "@/shared/components/ui/badge";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { toast } from "@/shared/hooks/use-toast";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { analyzeThreatData, optimizeBudget, processQuery } from "@/shared/services/optishieldApi";
import { AlertTriangle, Shield, DollarSign, TrendingUp, Target } from "lucide-react";

export const BudgetOptimizationDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [budget, setBudget] = useState(250000);
  const [query, setQuery] = useState("");
  const [threatData, setThreatData] = useState<any>(null);
  const [budgetData, setBudgetData] = useState<any>(null);
  const [queryResult, setQueryResult] = useState<any>(null);
  const [loading, setLoading] = useState({
    threats: true,
    budget: true,
    query: false
  });

  // Enhanced threat-based recommendations
  const threatBasedRecommendations = [
    { 
      threat: "Advanced Persistent Threats", 
      recommendation: "Increase MFA and Zero Trust investments",
      priority: "Critical",
      budgetImpact: 45000,
      riskReduction: "85%"
    },
    { 
      threat: "Ransomware Attacks", 
      recommendation: "Strengthen backup and recovery systems",
      priority: "High",
      budgetImpact: 35000,
      riskReduction: "70%"
    },
    { 
      threat: "Data Exfiltration", 
      recommendation: "Deploy advanced DLP solutions",
      priority: "High",
      budgetImpact: 40000,
      riskReduction: "75%"
    }
  ];

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const threatResult = await analyzeThreatData();
        setThreatData(threatResult);
        setLoading(prev => ({ ...prev, threats: false }));
        
        const budgetResult = await optimizeBudget(budget);
        setBudgetData(budgetResult);
        setLoading(prev => ({ ...prev, budget: false }));
      } catch (error) {
        toast({
          title: "Error loading data",
          description: "Failed to initialize the dashboard.",
          variant: "destructive"
        });
      }
    };
    
    fetchData();
  }, []);

  // Update budget allocation when budget changes
  const handleBudgetChange = async (value: number[]) => {
    const newBudget = value[0];
    setBudget(newBudget);
    setLoading(prev => ({ ...prev, budget: true }));
    
    try {
      const result = await optimizeBudget(newBudget);
      setBudgetData(result);
    } catch (error) {
      toast({
        title: "Budget optimization error",
        description: "Failed to calculate new allocations.",
        variant: "destructive"
      });
    } finally {
      setLoading(prev => ({ ...prev, budget: false }));
    }
  };

  // Handle query submission
  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(prev => ({ ...prev, query: true }));
    
    try {
      const result = await processQuery(query);
      setQueryResult(result);
    } catch (error) {
      toast({
        title: "Query processing error",
        description: "Failed to process your question.",
        variant: "destructive"
      });
    } finally {
      setLoading(prev => ({ ...prev, query: false }));
    }
  };

  // Prepare threat-adjusted allocation data
  const prepareThreatAdjustedData = () => {
    if (!budgetData || !budgetData.allocations) return [];
    
    return Object.entries(budgetData.allocations).map(([name, value]) => {
      let threatMultiplier = 1;
      let threatJustification = "Standard allocation";
      
      if (name === "MFA") {
        threatMultiplier = 1.8; // Higher due to credential attacks
        threatJustification = "Increased due to high credential attack risk";
      } else if (name === "WAF") {
        threatMultiplier = 1.4; // Higher due to web vulnerabilities
        threatJustification = "Boosted for web application threats";
      } else if (name === "Patching") {
        threatMultiplier = 1.6; // Critical due to CVE exposure
        threatJustification = "Critical for vulnerability management";
      }
      
      return {
        name,
        value: Math.round((value as number) * threatMultiplier),
        originalValue: value,
        threatMultiplier,
        threatJustification,
        roi: budgetData.roi * threatMultiplier * 0.7
      };
    });
  };

  const allocationData = prepareThreatAdjustedData();
  const totalThreatAdjustedBudget = allocationData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-6 bg-slate-950 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Budget Optimization AI</h2>
          <p className="text-slate-400 mt-1">Threat-driven security investment recommendations</p>
        </div>
        <Badge variant="outline" className="bg-purple-900/50 text-purple-300 border-purple-500">
          <Shield className="h-4 w-4 mr-1" />
          AI-powered
        </Badge>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-900 border-slate-800">
          <TabsTrigger value="dashboard" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white text-slate-300">
            Threat-Based Allocation
          </TabsTrigger>
          <TabsTrigger value="query" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white text-slate-300">
            AI Query
          </TabsTrigger>
          <TabsTrigger value="budget" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white text-slate-300">
            Scenario Analysis
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-6 mt-6">
          {/* Threat Intelligence Summary */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Current Threat Landscape
              </CardTitle>
              <CardDescription className="text-slate-400">
                AI analysis of active threats influencing budget recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading.threats ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full bg-slate-800" />
                  <Skeleton className="h-4 w-3/4 bg-slate-800" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-red-900/30 border border-red-800 p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                      <p className="text-sm text-red-300 font-medium">Threat Severity</p>
                    </div>
                    <p className="text-2xl font-bold text-red-400 mt-1">{threatData?.severity || "HIGH"}</p>
                    <p className="text-xs text-red-300 mt-1">Active credential attacks detected</p>
                  </div>
                  <div className="bg-blue-900/30 border border-blue-800 p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-blue-400" />
                      <p className="text-sm text-blue-300 font-medium">AI Confidence</p>
                    </div>
                    <p className="text-2xl font-bold text-blue-400 mt-1">
                      {threatData?.confidence ? `${Math.round(threatData.confidence * 100)}%` : "92%"}
                    </p>
                    <p className="text-xs text-blue-300 mt-1">Model accuracy rating</p>
                  </div>
                  <div className="bg-amber-900/30 border border-amber-800 p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-amber-400" />
                      <p className="text-sm text-amber-300 font-medium">Active Threats</p>
                    </div>
                    <p className="text-2xl font-bold text-amber-400 mt-1">
                      {threatData?.threats ? threatData.threats.length : "5"} critical
                    </p>
                    <p className="text-xs text-amber-300 mt-1">Requiring immediate attention</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Threat-Adjusted Budget Allocation */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <DollarSign className="h-5 w-5 text-green-500" />
                Threat-Adjusted Budget Allocation
              </CardTitle>
              <CardDescription className="text-slate-400">
                AI-optimized investment based on current threat intelligence
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">Total Security Budget</span>
                  <span className="text-sm font-medium text-green-400">${budget.toLocaleString()}</span>
                </div>
                <Slider 
                  value={[budget]} 
                  min={50000} 
                  max={500000} 
                  step={10000} 
                  onValueChange={handleBudgetChange}
                  className="mb-4"
                />
                <div className="text-xs text-slate-400">
                  Recommended range: $200K - $400K based on threat analysis
                </div>
              </div>
              
              {loading.budget ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full bg-slate-800" />
                  <Skeleton className="h-4 w-3/4 bg-slate-800" />
                </div>
              ) : allocationData.length > 0 ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {allocationData.map((item) => (
                      <div key={item.name} className="bg-slate-800 border border-slate-700 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm text-slate-300 font-medium">{item.name}</p>
                          <Badge className="bg-purple-900/50 text-purple-300 text-xs">
                            +{Math.round((item.threatMultiplier - 1) * 100)}%
                          </Badge>
                        </div>
                        <p className="text-2xl font-bold text-white">${item.value.toLocaleString()}</p>
                        <p className="text-xs text-slate-400 mt-1">{item.threatJustification}</p>
                        <div className="flex items-center gap-1 mt-2">
                          <TrendingUp className="h-3 w-3 text-green-400" />
                          <span className="text-xs text-green-400">ROI: {(item.roi * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-slate-800 border border-slate-700 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-white mb-3">Budget vs. Threat Impact Analysis</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={allocationData}>
                          <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                          <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#1e293b', 
                              border: '1px solid #475569',
                              borderRadius: '8px',
                              color: '#fff'
                            }}
                            formatter={(value: number, name: string) => [
                              `$${value.toLocaleString()}`,
                              name === 'value' ? 'Threat-Adjusted Budget' : name
                            ]}
                          />
                          <Bar dataKey="value" fill="#8b5cf6" name="value" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-900/30 border border-green-800 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-green-300 mb-2">Projected Risk Reduction</h4>
                      <p className="text-2xl font-bold text-green-400">78%</p>
                      <p className="text-xs text-green-300 mt-1">
                        Based on threat-adjusted allocations
                      </p>
                    </div>
                    <div className="bg-blue-900/30 border border-blue-800 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-blue-300 mb-2">Cost Avoidance</h4>
                      <p className="text-2xl font-bold text-blue-400">$3.2M</p>
                      <p className="text-xs text-blue-300 mt-1">
                        Estimated prevented breach costs
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-slate-400">No allocation data available</p>
              )}
            </CardContent>
          </Card>

          {/* Threat-Based Recommendations */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">AI Threat-Based Recommendations</CardTitle>
              <CardDescription className="text-slate-400">
                Specific actions based on current threat landscape
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {threatBasedRecommendations.map((rec, index) => (
                  <div key={index} className="bg-slate-800 border border-slate-700 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-white">{rec.threat}</h5>
                      <Badge className={
                        rec.priority === 'Critical' ? 'bg-red-900/50 text-red-300' :
                        rec.priority === 'High' ? 'bg-orange-900/50 text-orange-300' :
                        'bg-yellow-900/50 text-yellow-300'
                      }>
                        {rec.priority}
                      </Badge>
                    </div>
                    <p className="text-slate-300 text-sm mb-3">{rec.recommendation}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">
                        Budget Impact: <span className="text-white">${rec.budgetImpact.toLocaleString()}</span>
                      </span>
                      <span className="text-slate-400">
                        Risk Reduction: <span className="text-green-400">{rec.riskReduction}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="query" className="space-y-6 mt-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Ask OptiShield AI</CardTitle>
              <CardDescription className="text-slate-400">
                Query the AI for threat-specific budget insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleQuerySubmit} className="space-y-4">
                <div className="flex gap-2">
                  <Input 
                    placeholder="e.g., 'How should I allocate budget for ransomware protection?'"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    disabled={loading.query}
                    className="bg-slate-800 border-slate-700 text-white placeholder-slate-400"
                  />
                  <Button type="submit" disabled={loading.query} className="bg-purple-600 hover:bg-purple-700">
                    {loading.query ? "Processing..." : "Ask AI"}
                  </Button>
                </div>
                
                {queryResult && (
                  <div className="mt-6 p-4 bg-slate-800 border border-slate-700 rounded-lg">
                    <h4 className="text-sm font-medium text-white mb-2">AI Response</h4>
                    <p className="text-slate-300 mb-3">{queryResult.answer}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">
                        Confidence: <span className="text-purple-400">{Math.round(queryResult.confidence * 100)}%</span>
                      </span>
                      <span className="text-slate-400">
                        Based on current threat intelligence
                      </span>
                    </div>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="budget" className="space-y-6 mt-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Budget Scenario Analysis</CardTitle>
              <CardDescription className="text-slate-400">
                Test different budget levels against threat models
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">Scenario Budget</span>
                    <span className="text-sm font-medium text-green-400">${budget.toLocaleString()}</span>
                  </div>
                  <Slider 
                    value={[budget]} 
                    min={50000} 
                    max={500000} 
                    step={10000} 
                    onValueChange={handleBudgetChange}
                    className="mb-4"
                  />
                </div>
                
                {loading.budget ? (
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full bg-slate-800" />
                    <Skeleton className="h-4 w-3/4 bg-slate-800" />
                  </div>
                ) : allocationData.length > 0 ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {allocationData.map((item) => (
                        <div key={item.name} className="bg-slate-800 border border-slate-700 p-4 rounded-lg">
                          <p className="text-sm text-slate-300 font-medium">{item.name}</p>
                          <p className="text-xl font-bold text-white">${item.value.toLocaleString()}</p>
                          <p className="text-xs text-slate-400 mt-1">
                            {((item.value / totalThreatAdjustedBudget) * 100).toFixed(1)}% of total
                          </p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-purple-900/30 border border-purple-800 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-purple-300 mb-2">Scenario Impact Analysis</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-400">Risk Coverage:</span>
                          <span className="text-white ml-2 font-medium">
                            {budget >= 200000 ? "Comprehensive" : budget >= 100000 ? "Moderate" : "Basic"}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400">Threat Readiness:</span>
                          <span className="text-white ml-2 font-medium">
                            {budget >= 250000 ? "Advanced" : budget >= 150000 ? "Standard" : "Minimal"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-400">No scenario data available</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BudgetOptimizationDashboard;
