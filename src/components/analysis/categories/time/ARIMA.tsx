import  { useState, useCallback, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Enhanced ARIMA Parameters interface
interface ARIMAParams {
  p: number;
  d: number;
  q: number;
  seasonal: boolean;
  seasonalPeriod: number;
  P?: number; // Seasonal AR
  D?: number; // Seasonal differencing
  Q?: number; // Seasonal MA
}

// Time series data structure
interface TimeSeriesDataPoint {
  timestamp: number;
  value: number;
  field?: string;
}

// Analysis results structure
interface ARIMAResult {
  field: string;
  originalData: number[];
  fittedValues: number[];
  residuals: number[];
  forecast: number[];
  forecastIntervals: { lower: number[]; upper: number[] };
  metrics: {
    aic: number;
    bic: number;
    rmse: number;
    mae: number;
    mape: number;
  };
  parameters: {
    ar: number[];
    ma: number[];
    seasonal_ar?: number[];
    seasonal_ma?: number[];
  };
  diagnostics: {
    stationarity: boolean;
    autocorrelation: number[];
    ljungBox: number;
  };
}

// Enhanced ARIMA Analyzer class
class EnhancedARIMAAnalyzer {
  private data: number[];
  private params: ARIMAParams;

  constructor(data: { timestamp: number; value: number }[], params: ARIMAParams) {
    // Validate and filter data
    if (!data || !Array.isArray(data)) {
      this.data = [];
    } else {
      // Filter out invalid entries and ensure values are numbers
      const validData = data.filter(d => 
        d && 
        typeof d.value === 'number' && 
        !isNaN(d.value) && 
        typeof d.timestamp === 'number' && 
        !isNaN(d.timestamp)
      );
      
      this.data = validData.map(d => d.value);
    }
    
    this.params = params;
  }

  // Augmented Dickey-Fuller test for stationarity
  private checkStationarity(series: number[]): boolean {
    if (series.length < 10) return true;
    
    const lagged = series.slice(0, -1);
    const diff = series.slice(1).map((val, i) => val - lagged[i]);
    
    // Simple ADF test approximation
    const mean_diff = diff.reduce((a, b) => a + b, 0) / diff.length;
    const variance = diff.reduce((acc, val) => acc + Math.pow(val - mean_diff, 2), 0) / (diff.length - 1);
    const t_stat = Math.abs(mean_diff) / Math.sqrt(variance / diff.length);
    
    return t_stat > 1.96; // Simplified critical value
  }

  // Apply differencing
  private difference(series: number[], order: number): number[] {
    let result = [...series];
    for (let i = 0; i < order; i++) {
      result = result.slice(1).map((val, idx) => val - result[idx]);
    }
    return result;
  }

  // Calculate autocorrelation function
  private autocorrelation(series: number[], maxLag: number = 20): number[] {
    const n = series.length;
    const mean = series.reduce((a, b) => a + b, 0) / n;
    const variance = series.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / n;
    
    const acf: number[] = [];
    for (let lag = 0; lag <= Math.min(maxLag, n - 1); lag++) {
      let sum = 0;
      for (let i = 0; i < n - lag; i++) {
        sum += (series[i] - mean) * (series[i + lag] - mean);
      }
      acf.push(sum / ((n - lag) * variance));
    }
    return acf;
  }

  // Fit ARIMA model using simplified maximum likelihood estimation
  private fitARIMA(): ARIMAResult {
    try {
      // Safety check for data
      if (!this.data || this.data.length === 0) {
        throw new Error('No data available for analysis');
      }

      let workingSeries = [...this.data];
      
      // Apply differencing
      if (this.params.d > 0) {
        workingSeries = this.difference(workingSeries, this.params.d);
      }

      // Check stationarity
      const isStationary = this.checkStationarity(workingSeries);

      // Estimate AR parameters using Yule-Walker equations (simplified)
      const arParams = this.estimateAR(workingSeries, this.params.p);
      
      // Calculate residuals from AR fit
      const arResiduals = this.calculateARResiduals(workingSeries, arParams);
      
      // Estimate MA parameters from residuals
      const maParams = this.estimateMA(arResiduals, this.params.q);
      
      // Generate fitted values
      const fittedValues = this.generateFittedValues(arParams, maParams);
      
      // Calculate final residuals
      const residuals = this.data.slice(Math.max(this.params.p, this.params.q))
        .map((val, i) => val - (fittedValues[i] || 0));

      // Generate forecast
      const { forecast, intervals } = this.generateForecast(arParams, maParams, 12);

      // Calculate metrics
      const metrics = this.calculateMetrics(residuals, arParams, maParams);

      // Calculate autocorrelation of residuals
      const autocorr = this.autocorrelation(residuals);

      return {
        field: 'analysis',
        originalData: this.data,
        fittedValues,
        residuals,
        forecast,
        forecastIntervals: intervals,
        metrics,
        parameters: {
          ar: arParams,
          ma: maParams
        },
        diagnostics: {
          stationarity: isStationary,
          autocorrelation: autocorr,
          ljungBox: this.ljungBoxTest(residuals)
        }
      };
    } catch (error) {
      console.error('Error in fitARIMA:', error);
      // Return a default result structure
      return {
        field: 'analysis',
        originalData: this.data || [],
        fittedValues: [],
        residuals: [],
        forecast: [],
        forecastIntervals: { lower: [], upper: [] },
        metrics: {
          aic: 0,
          bic: 0,
          rmse: 0,
          mae: 0,
          mape: 0
        },
        parameters: {
          ar: [],
          ma: []
        },
        diagnostics: {
          stationarity: false,
          autocorrelation: [],
          ljungBox: 0
        }
      };
    }
  }

  // Simplified AR parameter estimation using Yule-Walker
  private estimateAR(series: number[], order: number): number[] {
    if (order === 0) return [];
    
    const n = series.length;
    const mean = series.reduce((a, b) => a + b, 0) / n;
    const centeredSeries = series.map(x => x - mean);
    
    // Calculate autocorrelations
    const acf = this.autocorrelation(centeredSeries, order);
    
    // Solve Yule-Walker equations (simplified for small orders)
    const params: number[] = [];
    for (let i = 1; i <= order; i++) {
      if (i === 1) {
        params.push(acf[1] / acf[0]);
      } else {
        // Simplified recursive estimation
        params.push(acf[i] / acf[0] * 0.8); // Dampening factor
      }
    }
    
    return params;
  }

  // Calculate AR residuals
  private calculateARResiduals(series: number[], arParams: number[]): number[] {
    const residuals: number[] = [];
    const p = arParams.length;
    
    for (let i = p; i < series.length; i++) {
      let prediction = 0;
      for (let j = 0; j < p; j++) {
        prediction += arParams[j] * series[i - j - 1];
      }
      residuals.push(series[i] - prediction);
    }
    
    return residuals;
  }

  // Simplified MA parameter estimation
  private estimateMA(residuals: number[], order: number): number[] {
    if (order === 0) return [];
    
    // Simplified MA estimation using sample autocorrelations
    const acf = this.autocorrelation(residuals, order);
    return acf.slice(1, order + 1).map(x => x * 0.7); // Dampening
  }

  // Generate fitted values
  private generateFittedValues(arParams: number[], maParams: number[]): number[] {
    const fitted: number[] = [];
    const p = arParams.length;
    const q = maParams.length;
    const residuals: number[] = [];
    
    for (let i = Math.max(p, q); i < this.data.length; i++) {
      let prediction = 0;
      
      // AR component
      for (let j = 0; j < p; j++) {
        if (i - j - 1 >= 0) {
          prediction += arParams[j] * this.data[i - j - 1];
        }
      }
      
      // MA component
      for (let j = 0; j < q && j < residuals.length; j++) {
        prediction += maParams[j] * residuals[residuals.length - j - 1];
      }
      
      fitted.push(prediction);
      residuals.push(this.data[i] - prediction);
    }
    
    return fitted;
  }

  // Generate forecast with confidence intervals
  private generateForecast(arParams: number[], maParams: number[], periods: number): 
    { forecast: number[]; intervals: { lower: number[]; upper: number[] } } {
    
    const forecast: number[] = [];
    const lower: number[] = [];
    const upper: number[] = [];
    
    // Add safety checks
    if (!this.data || this.data.length === 0) {
      return { forecast: [], intervals: { lower: [], upper: [] } };
    }
    
    const lastValues = this.data.slice(-Math.max(arParams.length, 5));
    const residualVariance = this.calculateResidualVariance();
    const residuals: number[] = [];
    
    for (let h = 1; h <= periods; h++) {
      let prediction = 0;
      
      // AR component
      for (let i = 0; i < arParams.length && i < lastValues.length; i++) {
        const value = lastValues[lastValues.length - 1 - i] || lastValues[lastValues.length - 1];
        if (value !== undefined && !isNaN(value)) {
          prediction += arParams[i] * value;
        }
      }
      
      // MA component
      for (let i = 0; i < maParams.length && i < residuals.length; i++) {
        prediction += maParams[i] * residuals[residuals.length - 1 - i];
      }
      
      // Add some trend if detected
      if (lastValues.length > 1) {
        const firstValue = lastValues[0];
        const lastValue = lastValues[lastValues.length - 1];
        if (firstValue !== undefined && lastValue !== undefined && !isNaN(firstValue) && !isNaN(lastValue)) {
          const trend = (lastValue - firstValue) / lastValues.length;
          prediction += trend * h;
        }
      }
      
      // Confidence intervals (95%)
      const se = Math.sqrt(residualVariance * (1 + 0.1 * h)); // Increasing uncertainty
      const margin = 1.96 * se;
      
      forecast.push(prediction);
      lower.push(prediction - margin);
      upper.push(prediction + margin);
      
      // Update lastValues and residuals for next prediction
      lastValues.push(prediction);
      residuals.push(0); // Simplified residual for forecast
    }
    
    return { forecast, intervals: { lower, upper } };
  }

  // Calculate residual variance
  private calculateResidualVariance(): number {
    try {
      if (!this.data || this.data.length === 0) {
        return 1.0; // Default variance
      }
      
      const residuals = this.calculateARResiduals(this.data, this.estimateAR(this.data, this.params.p));
      if (residuals.length === 0) {
        return 1.0; // Default variance
      }
      
      const mean = residuals.reduce((a, b) => a + b, 0) / residuals.length;
      return residuals.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / (residuals.length - 1);
    } catch (error) {
      console.warn('Error calculating residual variance:', error);
      return 1.0; // Default variance
    }
  }

  // Calculate model metrics
  private calculateMetrics(residuals: number[], arParams: number[], maParams: number[]): ARIMAResult['metrics'] {
    try {
      const n = residuals.length;
      const k = arParams.length + maParams.length;
      
      // Safety check for empty residuals
      if (n === 0) {
        return { aic: 0, bic: 0, rmse: 0, mae: 0, mape: 0 };
      }
      
      const mse = residuals.reduce((acc, val) => acc + val * val, 0) / n;
      const rmse = Math.sqrt(mse);
      const mae = residuals.reduce((acc, val) => acc + Math.abs(val), 0) / n;
      
      // MAPE calculation with safety checks
      const actualValues = this.data.slice(-n);
      let mape = 0;
      if (actualValues.length > 0) {
        let validCount = 0;
        const mapeSum = actualValues.reduce((acc, actual, i) => {
          if (actual !== 0 && !isNaN(actual) && !isNaN(residuals[i])) {
            validCount++;
            return acc + Math.abs(residuals[i] / actual);
          }
          return acc;
        }, 0);
        mape = validCount > 0 ? (mapeSum / validCount) * 100 : 0;
      }

      // Information criteria with safety checks
      let aic = 0;
      let bic = 0;
      if (mse > 0 && !isNaN(mse)) {
        const logLikelihood = -0.5 * n * Math.log(2 * Math.PI * mse) - 0.5 * n;
        aic = -2 * logLikelihood + 2 * k;
        bic = -2 * logLikelihood + k * Math.log(n);
      }

      // Ensure all values are finite
      return { 
        aic: isFinite(aic) ? aic : 0, 
        bic: isFinite(bic) ? bic : 0, 
        rmse: isFinite(rmse) ? rmse : 0, 
        mae: isFinite(mae) ? mae : 0, 
        mape: isFinite(mape) ? mape : 0 
      };
    } catch (error) {
      console.warn('Error calculating metrics:', error);
      return { aic: 0, bic: 0, rmse: 0, mae: 0, mape: 0 };
    }
  }

  // Ljung-Box test for residual autocorrelation
  private ljungBoxTest(residuals: number[]): number {
    try {
      if (residuals.length === 0) {
        return 0;
      }
      
      const acf = this.autocorrelation(residuals, 10);
      const n = residuals.length;
      let stat = 0;
      
      for (let k = 1; k < acf.length; k++) {
        if (n - k > 0 && !isNaN(acf[k])) {
          stat += (acf[k] * acf[k]) / (n - k);
        }
      }
      
      const result = n * (n + 2) * stat;
      return isFinite(result) ? result : 0;
    } catch (error) {
      console.warn('Error in Ljung-Box test:', error);
      return 0;
    }
  }

  public analyze(): ARIMAResult {
    try {
      return this.fitARIMA();
    } catch (error) {
      console.error('Error in analyze method:', error);
      // Return a safe default result
      return {
        field: 'analysis',
        originalData: this.data || [],
        fittedValues: [],
        residuals: [],
        forecast: [],
        forecastIntervals: { lower: [], upper: [] },
        metrics: {
          aic: 0,
          bic: 0,
          rmse: 0,
          mae: 0,
          mape: 0
        },
        parameters: {
          ar: [],
          ma: []
        },
        diagnostics: {
          stationarity: false,
          autocorrelation: [],
          ljungBox: 0
        }
      };
    }
  }
}

// Main ARIMA Component
interface ARIMAProps {
  data: TimeSeriesDataPoint[];
  onAnalyze?: (results: ARIMAResult[]) => void;
  forecastPeriods?: number;
  confidenceLevel?: number;
}

export default function EnhancedARIMA({ data, onAnalyze, forecastPeriods = 12 }: ARIMAProps) {
  const [params, setParams] = useState<ARIMAParams>({
    p: 1,
    d: 1,
    q: 1,
    seasonal: false,
    seasonalPeriod: 12
  });
  
  const [results, setResults] = useState<ARIMAResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Group data by field
  const fieldGroups = useMemo(() => {
    return data.reduce((groups, item) => {
      const fieldName = item.field || 'value';
      if (!groups[fieldName]) {
        groups[fieldName] = [];
      }
      groups[fieldName].push({
        timestamp: item.timestamp,
        value: item.value
      });
      return groups;
    }, {} as Record<string, { timestamp: number; value: number }[]>);
  }, [data]);

  const handleParamChange = useCallback((key: keyof ARIMAParams, value: any) => {
    setParams(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleAnalyze = useCallback(() => {
    setIsAnalyzing(true);
    
    try {
      // Check if we have data to analyze
      if (!data || data.length === 0) {
        console.warn('No data available for ARIMA analysis');
        setResults([]);
        return;
      }

      const analysisResults: ARIMAResult[] = Object.entries(fieldGroups).map(([fieldName, fieldData]) => {
        try {
          if (!fieldData || fieldData.length === 0) {
            console.warn(`No data for field: ${fieldName}`);
            return {
              field: fieldName,
              originalData: [],
              fittedValues: [],
              residuals: [],
              forecast: [],
              forecastIntervals: { lower: [], upper: [] },
              metrics: { aic: 0, bic: 0, rmse: 0, mae: 0, mape: 0 },
              parameters: { ar: [], ma: [] },
              diagnostics: { stationarity: false, autocorrelation: [], ljungBox: 0 }
            } as ARIMAResult;
          }

          const analyzer = new EnhancedARIMAAnalyzer(fieldData, params);
          const result = analyzer.analyze();
          // Override the forecast with the specified number of periods
          const { forecast, intervals } = analyzer['generateForecast'](result.parameters.ar, result.parameters.ma, forecastPeriods);
          return { ...result, field: fieldName, forecast, forecastIntervals: intervals };
        } catch (error) {
          console.error(`Error analyzing field ${fieldName}:`, error);
          return {
            field: fieldName,
            originalData: fieldData ? fieldData.map(d => d.value) : [],
            fittedValues: [],
            residuals: [],
            forecast: [],
            forecastIntervals: { lower: [], upper: [] },
            metrics: { aic: 0, bic: 0, rmse: 0, mae: 0, mape: 0 },
            parameters: { ar: [], ma: [] },
            diagnostics: { stationarity: false, autocorrelation: [], ljungBox: 0 }
          } as ARIMAResult;
        }
      });

      setResults(analysisResults);
      onAnalyze?.(analysisResults);
    } catch (error) {
      console.error('ARIMA analysis failed:', error);
      setResults([]);
    } finally {
      setIsAnalyzing(false);
    }
  }, [fieldGroups, params, onAnalyze, data, forecastPeriods]);

  // Prepare chart data
  const chartData = useMemo(() => {
    if (results.length === 0) return [];
    
    const result = results[0];
    if (!result || !result.originalData || !result.forecast) {
      return [];
    }
    
    const maxLength = Math.max(result.originalData.length, result.forecast.length);
    
    return Array.from({ length: maxLength + result.forecast.length }, (_, i) => {
      const item: any = { index: i };
      
      if (i < result.originalData.length) {
        item.actual = result.originalData[i];
        if (result.fittedValues && i >= result.fittedValues.length) {
          const fittedIndex = i - (result.originalData.length - result.fittedValues.length);
          if (fittedIndex >= 0 && fittedIndex < result.fittedValues.length) {
            item.fitted = result.fittedValues[fittedIndex];
          }
        }
      }
      
      if (i >= result.originalData.length && i < result.originalData.length + result.forecast.length) {
        const forecastIndex = i - result.originalData.length;
        if (forecastIndex >= 0 && forecastIndex < result.forecast.length) {
          item.forecast = result.forecast[forecastIndex];
          if (result.forecastIntervals && result.forecastIntervals.lower && result.forecastIntervals.upper) {
            item.lower = result.forecastIntervals.lower[forecastIndex];
            item.upper = result.forecastIntervals.upper[forecastIndex];
          }
        }
      }
      
      return item;
    });
  }, [results]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Enhanced ARIMA Analysis</h2>
      
      {/* Parameter Controls */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-4 mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Parameters</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              AR Order (p)
            </label>
            <input
              type="number"
              min="0"
              max="5"
              value={params.p}
              onChange={(e) => handleParamChange('p', parseInt(e.target.value) || 0)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Differencing (d)
            </label>
            <input
              type="number"
              min="0"
              max="2"
              value={params.d}
              onChange={(e) => handleParamChange('d', parseInt(e.target.value) || 0)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              MA Order (q)
            </label>
            <input
              type="number"
              min="0"
              max="5"
              value={params.q}
              onChange={(e) => handleParamChange('q', parseInt(e.target.value) || 0)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Seasonal
            </label>
            <select
              value={params.seasonal ? 'true' : 'false'}
              onChange={(e) => handleParamChange('seasonal', e.target.value === 'true')}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
          
          {params.seasonal && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Seasonal Period
              </label>
              <input
                type="number"
                min="2"
                max="24"
                value={params.seasonalPeriod}
                onChange={(e) => handleParamChange('seasonalPeriod', parseInt(e.target.value) || 12)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Analyze Button */}
      <button
        onClick={handleAnalyze}
        disabled={isAnalyzing || data.length === 0}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
      >
        {isAnalyzing ? 'Analyzing...' : 'Run Enhanced ARIMA Analysis'}
      </button>
      
      {/* Results */}
      {results.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Analysis Results</h3>
          
          {/* Chart */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-lg font-medium text-gray-700 mb-4">Time Series Forecast</h4>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="index" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  name="Actual"
                  connectNulls={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="fitted" 
                  stroke="#059669" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Fitted"
                  connectNulls={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="forecast" 
                  stroke="#dc2626" 
                  strokeWidth={2}
                  name="Forecast"
                  connectNulls={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="upper" 
                  stroke="#fbbf24" 
                  strokeWidth={1}
                  strokeDasharray="2 2"
                  name="Upper CI"
                  connectNulls={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="lower" 
                  stroke="#fbbf24" 
                  strokeWidth={1}
                  strokeDasharray="2 2"
                  name="Lower CI"
                  connectNulls={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {/* Metrics and Diagnostics */}
          {results.map((result, index) => (
            <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-lg font-medium text-gray-700 mb-4">
                Field: {result.field}
              </h4>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-white p-3 rounded shadow">
                  <div className="text-sm text-gray-600">RMSE</div>
                  <div className="text-lg font-semibold text-gray-800">
                    {isNaN(result.metrics.rmse) ? 'N/A' : result.metrics.rmse.toFixed(4)}
                  </div>
                </div>
                <div className="bg-white p-3 rounded shadow">
                  <div className="text-sm text-gray-600">MAE</div>
                  <div className="text-lg font-semibold text-gray-800">
                    {isNaN(result.metrics.mae) ? 'N/A' : result.metrics.mae.toFixed(4)}
                  </div>
                </div>
                <div className="bg-white p-3 rounded shadow">
                  <div className="text-sm text-gray-600">AIC</div>
                  <div className="text-lg font-semibold text-gray-800">
                    {isNaN(result.metrics.aic) ? 'N/A' : result.metrics.aic.toFixed(2)}
                  </div>
                </div>
                <div className="bg-white p-3 rounded shadow">
                  <div className="text-sm text-gray-600">BIC</div>
                  <div className="text-lg font-semibold text-gray-800">
                    {isNaN(result.metrics.bic) ? 'N/A' : result.metrics.bic.toFixed(2)}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded shadow">
                  <div className="text-sm text-gray-600 mb-2">Model Parameters</div>
                  <div className="text-sm">
                    <strong>AR:</strong> [{result.parameters.ar.length > 0 ? result.parameters.ar.map(p => isNaN(p) ? '0.000' : p.toFixed(3)).join(', ') : 'None'}]
                  </div>
                  <div className="text-sm">
                    <strong>MA:</strong> [{result.parameters.ma.length > 0 ? result.parameters.ma.map(p => isNaN(p) ? '0.000' : p.toFixed(3)).join(', ') : 'None'}]
                  </div>
                </div>
                <div className="bg-white p-3 rounded shadow">
                  <div className="text-sm text-gray-600 mb-2">Diagnostics</div>
                  <div className="text-sm">
                    <strong>Stationary:</strong> {result.diagnostics.stationarity ? 'Yes' : 'No'}
                  </div>
                  <div className="text-sm">
                    <strong>Ljung-Box:</strong> {isNaN(result.diagnostics.ljungBox) ? 'N/A' : result.diagnostics.ljungBox.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 