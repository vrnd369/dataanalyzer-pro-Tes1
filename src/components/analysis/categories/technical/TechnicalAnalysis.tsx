import { useState, useEffect, useMemo } from 'react';
import { 
  Cpu, Database, Server, AlertCircle, CheckCircle, TrendingUp, 
  Activity, BarChart3, Settings, RefreshCw, Filter, Search,
  ChevronDown, ChevronUp, Zap, Shield, Clock,
  ArrowUp, ArrowDown, Minus
} from 'lucide-react';

// Enhanced DataField interface
interface DataField {
  name: string;
  type: string;
  nullPercentage?: number;
  uniqueValues?: number;
  avgLength?: number;
  minValue?: number;
  maxValue?: number;
  lastUpdated?: string;
  criticalityLevel?: 'low' | 'medium' | 'high' | 'critical';
}

interface TechnicalAnalysisProps {
  data: {
    fields: DataField[];
    metadata?: {
      dataSize?: number;
      nullValues?: number;
      processingTime?: number;
      uptime?: number;
      errorRate?: number;
      throughput?: number;
      memoryUsage?: number;
      cpuUsage?: number;
      diskUsage?: number;
      lastAnalysis?: string;
    };
  };
  refreshInterval?: number;
  onRefresh?: () => void;
}

export function TechnicalAnalysis({ data, refreshInterval = 30000, onRefresh }: TechnicalAnalysisProps) {
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    metrics: true,
    recommendations: true,
    fields: false,
    systemHealth: false
  });
  const [filterCritical, setFilterCritical] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'type' | 'nullPercentage' | 'criticalityLevel'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [lastRefresh, setLastRefresh] = useState(new Date());

  // Auto-refresh logic
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      onRefresh?.();
      setLastRefresh(new Date());
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, onRefresh]);

  // Enhanced metrics calculation
  const metrics = useMemo(() => {
    const totalFields = data.fields.length;
    const fieldsWithIssues = data.fields.filter(
      field => !field.type || !field.name || (field.nullPercentage ?? 0) > 5
    ).length;
    
    const criticalFields = data.fields.filter(f => f.criticalityLevel === 'critical').length;
    const highRiskFields = data.fields.filter(f => ['critical', 'high'].includes(f.criticalityLevel || 'low')).length;
    
    const dataQualityScore = totalFields > 0 
      ? Math.max(0, 100 - (fieldsWithIssues / totalFields * 100) - (criticalFields * 5)) 
      : 0;
    
    const completenessScore = data.metadata?.dataSize && data.metadata.nullValues
      ? 100 - (data.metadata.nullValues / data.metadata.dataSize * 100)
      : 85;
    
    const systemPerformance = data.metadata?.uptime || 95;
    const processingEfficiency = data.metadata?.processingTime
      ? Math.min(100, Math.max(0, 100 - (data.metadata.processingTime / 1000 * 10)))
      : 80;

    // New calculated metrics
    const resourceUtilization = data.metadata ? 
      ((data.metadata.cpuUsage || 0) + (data.metadata.memoryUsage || 0) + (data.metadata.diskUsage || 0)) / 3 : 50;
    
    const overallHealth = Math.round((dataQualityScore * 0.3 + systemPerformance * 0.3 + processingEfficiency * 0.2 + (100 - resourceUtilization) * 0.2));
    
    return {
      dataQuality: Math.round(Math.min(100, (dataQualityScore * 0.6 + completenessScore * 0.4))),
      systemPerformance: Math.round(systemPerformance),
      processingEfficiency: Math.round(processingEfficiency),
      resourceUtilization: Math.round(resourceUtilization),
      overallHealth,
      issuesCount: fieldsWithIssues,
      criticalFields,
      highRiskFields,
      errorRate: data.metadata?.errorRate || 0,
      throughput: data.metadata?.throughput || 0,
      trend: Math.random() > 0.5 ? 'up' : Math.random() > 0.5 ? 'down' : 'stable' // Simulated trend
    };
  }, [data]);

  // Enhanced recommendations
  const recommendations = useMemo(() => {
    const recs = [];
    
    // Critical issues first
    if (metrics.criticalFields > 0) {
      recs.push({
        icon: <AlertCircle className="w-4 h-4 text-red-500" />,
        text: `${metrics.criticalFields} critical fields require immediate attention`,
        priority: 0,
        severity: 'critical' as const,
        action: 'Review critical fields immediately'
      });
    }

    // Data quality recommendations
    if (metrics.dataQuality < 70) {
      recs.push({
        icon: <AlertCircle className="w-4 h-4 text-red-500" />,
        text: "Critical data quality issues detected",
        priority: 1,
        severity: 'high' as const,
        action: 'Implement data validation rules'
      });
    } else if (metrics.dataQuality < 85) {
      recs.push({
        icon: <Database className="w-4 h-4 text-amber-500" />,
        text: "Moderate data quality issues detected",
        priority: 2,
        severity: 'medium' as const,
        action: 'Review data collection processes'
      });
    }

    // Resource utilization
    if (metrics.resourceUtilization > 85) {
      recs.push({
        icon: <Cpu className="w-4 h-4 text-red-500" />,
        text: `High resource utilization (${metrics.resourceUtilization}%)`,
        priority: 1,
        severity: 'high' as const,
        action: 'Scale resources or optimize processes'
      });
    } else if (metrics.resourceUtilization > 70) {
      recs.push({
        icon: <Activity className="w-4 h-4 text-amber-500" />,
        text: `Moderate resource usage (${metrics.resourceUtilization}%)`,
        priority: 2,
        severity: 'medium' as const,
        action: 'Monitor resource trends'
      });
    }

    // Performance recommendations
    if (metrics.processingEfficiency < 70) {
      recs.push({
        icon: <Zap className="w-4 h-4 text-red-500" />,
        text: "Processing performance is degraded",
        priority: 1,
        severity: 'high' as const,
        action: 'Investigate performance bottlenecks'
      });
    }

    // Positive feedback
    if (metrics.overallHealth >= 90) {
      recs.push({
        icon: <CheckCircle className="w-4 h-4 text-green-500" />,
        text: "System is performing optimally",
        priority: 4,
        severity: 'info' as const,
        action: 'Continue monitoring'
      });
    }

    return recs.sort((a, b) => a.priority - b.priority);
  }, [metrics]);

  // Filtered and sorted fields
  const processedFields = useMemo(() => {
    let filtered = data.fields.filter(field => 
      field.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (field.type || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterCritical) {
      filtered = filtered.filter(field => 
        ['critical', 'high'].includes(field.criticalityLevel || 'low')
      );
    }

    return filtered.sort((a, b) => {
      let aVal: any = a[sortBy];
      let bVal: any = b[sortBy];
      
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = (bVal || '').toLowerCase();
      }
      
      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
  }, [data.fields, searchTerm, filterCritical, sortBy, sortDirection]);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSort = (column: typeof sortBy) => {
    if (sortBy === column) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  const getHealthColor = (value: number) => {
    if (value >= 90) return 'text-green-600';
    if (value >= 75) return 'text-amber-500';
    return 'text-red-500';
  };

  const getHealthBgColor = (value: number) => {
    if (value >= 90) return 'bg-green-50 border-green-200';
    if (value >= 75) return 'bg-amber-50 border-amber-200';
    return 'bg-red-50 border-red-200';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-4 h-4 text-green-500" />;
      case 'down': return <ArrowDown className="w-4 h-4 text-red-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Technical Analysis Dashboard</h3>
              <p className="text-sm text-gray-500">
                Last updated: {lastRefresh.toLocaleTimeString()}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                autoRefresh 
                  ? 'bg-teal-100 text-teal-700 hover:bg-teal-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
              Auto Refresh
            </button>
            
            <button
              onClick={() => {
                onRefresh?.();
                setLastRefresh(new Date());
              }}
              className="flex items-center gap-2 px-3 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh Now
            </button>
          </div>
        </div>

        {/* Overall Health Score */}
        <div className={`p-4 rounded-lg border-2 ${getHealthBgColor(metrics.overallHealth)}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-teal-600" />
              <div>
                <h4 className="font-semibold text-gray-900">Overall System Health</h4>
                <p className="text-sm text-gray-600">Composite health score across all metrics</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-3xl font-bold ${getHealthColor(metrics.overallHealth)}`}>
                {metrics.overallHealth}%
              </span>
              {getTrendIcon(metrics.trend)}
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div 
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
          onClick={() => toggleSection('metrics')}
        >
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Activity className="w-5 h-5 text-teal-600" />
            Key Performance Metrics
          </h3>
          {expandedSections.metrics ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
        
        {expandedSections.metrics && (
          <div className="p-4 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <Database className="w-5 h-5 text-blue-600" />
                  {getTrendIcon(metrics.trend)}
                </div>
                <h4 className="font-medium text-gray-900">Data Quality</h4>
                <p className={`text-2xl font-bold ${getHealthColor(metrics.dataQuality)}`}>
                  {metrics.dataQuality}%
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {metrics.issuesCount} issues detected
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <Server className="w-5 h-5 text-green-600" />
                  {getTrendIcon(metrics.trend)}
                </div>
                <h4 className="font-medium text-gray-900">System Performance</h4>
                <p className={`text-2xl font-bold ${getHealthColor(metrics.systemPerformance)}`}>
                  {metrics.systemPerformance}%
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {metrics.errorRate.toFixed(2)}% error rate
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  {getTrendIcon(metrics.trend)}
                </div>
                <h4 className="font-medium text-gray-900">Processing Efficiency</h4>
                <p className={`text-2xl font-bold ${getHealthColor(metrics.processingEfficiency)}`}>
                  {metrics.processingEfficiency}%
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {data.metadata?.processingTime || 0}ms avg response
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <Cpu className="w-5 h-5 text-orange-600" />
                  {getTrendIcon(metrics.trend)}
                </div>
                <h4 className="font-medium text-gray-900">Resource Usage</h4>
                <p className={`text-2xl font-bold ${getHealthColor(100 - metrics.resourceUtilization)}`}>
                  {metrics.resourceUtilization}%
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  CPU, Memory, Disk
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div 
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
          onClick={() => toggleSection('recommendations')}
        >
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-teal-600" />
            Smart Recommendations
            {recommendations.filter(r => r.severity !== 'info').length > 0 && (
              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                {recommendations.filter(r => r.severity !== 'info').length}
              </span>
            )}
          </h3>
          {expandedSections.recommendations ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
        
        {expandedSections.recommendations && (
          <div className="p-4 pt-0">
            <div className="space-y-3">
              {recommendations.map((rec, index) => (
                <div key={index} className={`p-4 rounded-lg border-l-4 ${getSeverityColor(rec.severity)}`}>
                  <div className="flex items-start gap-3">
                    {rec.icon}
                    <div className="flex-1">
                      <p className="font-medium">{rec.text}</p>
                      <p className="text-sm opacity-75 mt-1">{rec.action}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(rec.severity)}`}>
                      {rec.severity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Field Analysis */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div 
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
          onClick={() => toggleSection('fields')}
        >
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Settings className="w-5 h-5 text-teal-600" />
            Field Analysis ({data.fields.length} fields)
            {metrics.criticalFields > 0 && (
              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                {metrics.criticalFields} critical
              </span>
            )}
          </h3>
          {expandedSections.fields ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
        
        {expandedSections.fields && (
          <div className="p-4 pt-0">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search fields..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              
              <button
                onClick={() => setFilterCritical(!filterCritical)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterCritical 
                    ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Filter className="w-4 h-4" />
                {filterCritical ? 'Show All' : 'Critical Only'}
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b">
                    <th 
                      className="p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center gap-1">
                        Field Name
                        {sortBy === 'name' && (sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                      </div>
                    </th>
                    <th 
                      className="p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => handleSort('type')}
                    >
                      <div className="flex items-center gap-1">
                        Type
                        {sortBy === 'type' && (sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                      </div>
                    </th>
                    <th 
                      className="p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => handleSort('nullPercentage')}
                    >
                      <div className="flex items-center gap-1">
                        Null %
                        {sortBy === 'nullPercentage' && (sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                      </div>
                    </th>
                    <th className="p-3">Unique Values</th>
                    <th 
                      className="p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => handleSort('criticalityLevel')}
                    >
                      <div className="flex items-center gap-1">
                        Criticality
                        {sortBy === 'criticalityLevel' && (sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                      </div>
                    </th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {processedFields.slice(0, 10).map((field, index) => (
                    <tr key={index} className="text-sm border-b hover:bg-gray-50 transition-colors">
                      <td className="p-3 font-medium">{field.name || 'Unnamed'}</td>
                      <td className="p-3">
                        <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                          {field.type || 'Unknown'}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`font-medium ${
                          (field.nullPercentage ?? 0) > 10 ? 'text-red-600' : 
                          (field.nullPercentage ?? 0) > 5 ? 'text-amber-600' : 'text-green-600'
                        }`}>
                          {(field.nullPercentage ?? 0).toFixed(1)}%
                        </span>
                      </td>
                      <td className="p-3">{field.uniqueValues?.toLocaleString() || 'N/A'}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(field.criticalityLevel || 'low')}`}>
                          {field.criticalityLevel || 'low'}
                        </span>
                      </td>
                      <td className="p-3">
                        {(!field.name || !field.type || ((field.nullPercentage ?? 0) > 5)) ? (
                          <span className="text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" /> Issues
                          </span>
                        ) : (
                          <span className="text-green-500 flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" /> Valid
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {processedFields.length > 10 && (
                <p className="text-xs text-gray-500 mt-3 p-3">
                  Showing 10 of {processedFields.length} fields. Use search to find specific fields.
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* System Health Details */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div 
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
          onClick={() => toggleSection('systemHealth')}
        >
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Activity className="w-5 h-5 text-teal-600" />
            System Health Details
          </h3>
          {expandedSections.systemHealth ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
        
        {expandedSections.systemHealth && data.metadata && (
          <div className="p-4 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Resource Utilization</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>CPU Usage</span>
                    <span className={getHealthColor(100 - (data.metadata.cpuUsage || 0))}>
                      {data.metadata.cpuUsage || 0}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Memory Usage</span>
                    <span className={getHealthColor(100 - (data.metadata.memoryUsage || 0))}>
                      {data.metadata.memoryUsage || 0}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Disk Usage</span>
                    <span className={getHealthColor(100 - (data.metadata.diskUsage || 0))}>
                      {data.metadata.diskUsage || 0}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Performance Metrics</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Throughput</span>
                    <span>{data.metadata.throughput?.toLocaleString() || 0} req/s</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Avg Response Time</span>
                    <span>{data.metadata.processingTime || 0}ms</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Uptime</span>
                    <span className={getHealthColor(data.metadata.uptime || 0)}>
                      {data.metadata.uptime || 0}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Data Statistics</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Records</span>
                    <span>{data.metadata.dataSize?.toLocaleString() || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Null Values</span>
                    <span className={getHealthColor(100 - ((data.metadata.nullValues || 0) / (data.metadata.dataSize || 1) * 100))}>
                      {data.metadata.nullValues?.toLocaleString() || 0}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Error Rate</span>
                    <span className={getHealthColor(100 - (data.metadata.errorRate || 0))}>
                      {data.metadata.errorRate?.toFixed(2) || 0}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {data.metadata.lastAnalysis && (
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Last full analysis: {new Date(data.metadata.lastAnalysis).toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 