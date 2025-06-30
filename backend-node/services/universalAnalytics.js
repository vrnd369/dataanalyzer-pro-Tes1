import * as ss from 'simple-statistics';
import { Matrix } from 'ml-matrix';
import { PolynomialRegression } from 'ml-regression';
import * as math from 'mathjs';

export class UniversalAnalytics {
  constructor() {
    this.anomalyThreshold = 0.95;
  }

  async advancedTimeSeriesAnalysis(data, config = {}) {
    try {
      if (data.length < 2) {
        return { error: 'Insufficient data for time series analysis' };
      }

      const results = {
        trend: this.calculateTrend(data),
        seasonality: this.detectSeasonality(data),
        decomposition: this.decomposeTimeSeries(data),
        forecasting: await this.generateForecast(data, config),
        volatility: this.calculateVolatility(data),
        stationarity: this.testStationarity(data)
      };

      return results;
    } catch (error) {
      console.error('Time series analysis error:', error);
      return { error: 'Time series analysis failed' };
    }
  }

  async advancedAnomalyDetection(data, config = {}) {
    try {
      if (data.length < 3) {
        return [];
      }

      const threshold = config.threshold || this.anomalyThreshold;
      const anomalies = [];

      // Statistical outlier detection using Z-score
      const mean = ss.mean(data);
      const std = ss.standardDeviation(data);
      
      data.forEach((value, index) => {
        const zScore = Math.abs((value - mean) / std);
        if (zScore > 2.5) { // 2.5 standard deviations
          anomalies.push({
            index,
            value,
            zScore,
            type: 'statistical_outlier'
          });
        }
      });

      // Moving average based anomaly detection
      const windowSize = Math.min(5, Math.floor(data.length / 2));
      if (windowSize > 1) {
        const movingAverages = this.calculateMovingAverage(data, windowSize);
        const movingStd = this.calculateMovingStd(data, windowSize);
        
        data.forEach((value, index) => {
          if (index >= windowSize) {
            const ma = movingAverages[index - windowSize];
            const ms = movingStd[index - windowSize];
            const deviation = Math.abs(value - ma);
            
            if (deviation > ms * 2) {
              anomalies.push({
                index,
                value,
                deviation,
                movingAverage: ma,
                type: 'moving_average_outlier'
              });
            }
          }
        });
      }

      // Remove duplicates and sort by index
      const uniqueAnomalies = this.removeDuplicateAnomalies(anomalies);
      return uniqueAnomalies.sort((a, b) => a.index - b.index);

    } catch (error) {
      console.error('Anomaly detection error:', error);
      return [];
    }
  }

  async advancedCorrelationAnalysis(data) {
    try {
      const keys = Object.keys(data);
      if (keys.length < 2) {
        return { error: 'Insufficient data for correlation analysis' };
      }

      const correlationMatrix = {};
      const pValues = {};

      for (let i = 0; i < keys.length; i++) {
        correlationMatrix[keys[i]] = {};
        pValues[keys[i]] = {};
        
        for (let j = 0; j < keys.length; j++) {
          if (i === j) {
            correlationMatrix[keys[i]][keys[j]] = 1;
            pValues[keys[i]][keys[j]] = 0;
          } else {
            const correlation = ss.correlation([data[keys[i]]], [data[keys[j]]]);
            correlationMatrix[keys[i]][keys[j]] = correlation;
            
            // Simple p-value approximation
            const n = 1; // sample size
            const t = correlation * Math.sqrt((n - 2) / (1 - correlation * correlation));
            pValues[keys[i]][keys[j]] = this.calculatePValue(t, n - 2);
          }
        }
      }

      // Find strong correlations
      const strongCorrelations = [];
      for (let i = 0; i < keys.length; i++) {
        for (let j = i + 1; j < keys.length; j++) {
          const corr = correlationMatrix[keys[i]][keys[j]];
          if (Math.abs(corr) > 0.7) {
            strongCorrelations.push({
              variable1: keys[i],
              variable2: keys[j],
              correlation: corr,
              pValue: pValues[keys[i]][keys[j]],
              strength: Math.abs(corr) > 0.9 ? 'very_strong' : 
                       Math.abs(corr) > 0.8 ? 'strong' : 'moderate'
            });
          }
        }
      }

      return {
        correlationMatrix,
        pValues,
        strongCorrelations,
        summary: {
          totalVariables: keys.length,
          strongCorrelations: strongCorrelations.length,
          averageCorrelation: this.calculateAverageCorrelation(correlationMatrix)
        }
      };

    } catch (error) {
      console.error('Correlation analysis error:', error);
      return { error: 'Correlation analysis failed' };
    }
  }

  async advancedForecasting(data, config = {}) {
    try {
      if (data.length < 3) {
        return { error: 'Insufficient data for forecasting' };
      }

      const horizon = config.horizon || 5;
      const methods = config.methods || ['linear', 'polynomial', 'exponential'];

      const forecasts = {};

      if (methods.includes('linear')) {
        forecasts.linear = this.linearForecast(data, horizon);
      }

      if (methods.includes('polynomial')) {
        forecasts.polynomial = this.polynomialForecast(data, horizon);
      }

      if (methods.includes('exponential')) {
        forecasts.exponential = this.exponentialForecast(data, horizon);
      }

      // Ensemble forecast
      forecasts.ensemble = this.ensembleForecast(forecasts);

      return {
        forecasts,
        confidence_intervals: this.calculateConfidenceIntervals(forecasts.ensemble),
        accuracy_metrics: this.calculateForecastAccuracy(data, forecasts)
      };

    } catch (error) {
      console.error('Forecasting error:', error);
      return { error: 'Forecasting failed' };
    }
  }

  // Helper methods
  calculateTrend(data) {
    const n = data.length;
    const x = Array.from({ length: n }, (_, i) => i);
    const slope = ss.linearRegression([x, data]).m;
    const intercept = ss.linearRegression([x, data]).b;
    
    return {
      slope,
      intercept,
      direction: slope > 0 ? 'increasing' : slope < 0 ? 'decreasing' : 'stable',
      strength: Math.abs(slope) > 0.1 ? 'strong' : Math.abs(slope) > 0.01 ? 'moderate' : 'weak'
    };
  }

  detectSeasonality(data) {
    // Simple seasonality detection using autocorrelation
    const autocorr = this.calculateAutocorrelation(data);
    const seasonality = {
      detected: false,
      period: null,
      strength: 0
    };

    // Look for peaks in autocorrelation
    for (let lag = 2; lag < Math.min(20, data.length / 2); lag++) {
      if (autocorr[lag] > 0.7) {
        seasonality.detected = true;
        seasonality.period = lag;
        seasonality.strength = autocorr[lag];
        break;
      }
    }

    return seasonality;
  }

  decomposeTimeSeries(data) {
    const trend = this.calculateTrend(data);
    const trendValues = Array.from({ length: data.length }, (_, i) => trend.slope * i + trend.intercept);
    const detrended = data.map((value, i) => value - trendValues[i]);
    
    return {
      original: data,
      trend: trendValues,
      detrended,
      residual: detrended // Simplified - no seasonal component
    };
  }

  async generateForecast(data, config) {
    const horizon = config.horizon || 5;
    const trend = this.calculateTrend(data);
    const forecast = [];
    
    for (let i = 0; i < horizon; i++) {
      const futureIndex = data.length + i;
      forecast.push(trend.slope * futureIndex + trend.intercept);
    }
    
    return forecast;
  }

  calculateVolatility(data) {
    const returns = [];
    for (let i = 1; i < data.length; i++) {
      returns.push((data[i] - data[i - 1]) / data[i - 1]);
    }
    
    return {
      volatility: ss.standardDeviation(returns),
      annualized_volatility: ss.standardDeviation(returns) * Math.sqrt(252), // Assuming daily data
      max_drawdown: this.calculateMaxDrawdown(data)
    };
  }

  testStationarity(data) {
    // Simplified stationarity test
    const firstHalf = data.slice(0, Math.floor(data.length / 2));
    const secondHalf = data.slice(Math.floor(data.length / 2));
    
    const mean1 = ss.mean(firstHalf);
    const mean2 = ss.mean(secondHalf);
    const var1 = ss.variance(firstHalf);
    const var2 = ss.variance(secondHalf);
    
    return {
      is_stationary: Math.abs(mean1 - mean2) < 0.1 * Math.max(mean1, mean2) && 
                     Math.abs(var1 - var2) < 0.1 * Math.max(var1, var2),
      mean_difference: Math.abs(mean1 - mean2),
      variance_difference: Math.abs(var1 - var2)
    };
  }

  calculateMovingAverage(data, windowSize) {
    const result = [];
    for (let i = windowSize - 1; i < data.length; i++) {
      const window = data.slice(i - windowSize + 1, i + 1);
      result.push(ss.mean(window));
    }
    return result;
  }

  calculateMovingStd(data, windowSize) {
    const result = [];
    for (let i = windowSize - 1; i < data.length; i++) {
      const window = data.slice(i - windowSize + 1, i + 1);
      result.push(ss.standardDeviation(window));
    }
    return result;
  }

  removeDuplicateAnomalies(anomalies) {
    const seen = new Set();
    return anomalies.filter(anomaly => {
      const key = `${anomaly.index}-${anomaly.type}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  calculatePValue(t, df) {
    // Simplified p-value calculation
    return Math.exp(-0.5 * t * t) / Math.sqrt(2 * Math.PI);
  }

  calculateAverageCorrelation(matrix) {
    const keys = Object.keys(matrix);
    let sum = 0;
    let count = 0;
    
    for (let i = 0; i < keys.length; i++) {
      for (let j = i + 1; j < keys.length; j++) {
        sum += Math.abs(matrix[keys[i]][keys[j]]);
        count++;
      }
    }
    
    return count > 0 ? sum / count : 0;
  }

  linearForecast(data, horizon) {
    const n = data.length;
    const x = Array.from({ length: n }, (_, i) => i);
    const regression = ss.linearRegression([x, data]);
    
    const forecast = [];
    for (let i = 0; i < horizon; i++) {
      forecast.push(regression.m * (n + i) + regression.b);
    }
    
    return forecast;
  }

  polynomialForecast(data, horizon) {
    const n = data.length;
    const x = Array.from({ length: n }, (_, i) => i);
    const y = data;
    
    // Fit polynomial regression
    const regression = new PolynomialRegression(x, y, 2);
    regression.train();
    
    const forecast = [];
    for (let i = 0; i < horizon; i++) {
      forecast.push(regression.predict(n + i));
    }
    
    return forecast;
  }

  exponentialForecast(data, horizon) {
    // Simple exponential smoothing
    const alpha = 0.3;
    let forecast = data[data.length - 1];
    const forecasts = [];
    
    for (let i = 0; i < horizon; i++) {
      forecasts.push(forecast);
      forecast = alpha * data[data.length - 1] + (1 - alpha) * forecast;
    }
    
    return forecasts;
  }

  ensembleForecast(forecasts) {
    const methods = Object.keys(forecasts);
    if (methods.length === 0) return [];
    
    const horizon = forecasts[methods[0]].length;
    const ensemble = [];
    
    for (let i = 0; i < horizon; i++) {
      let sum = 0;
      let count = 0;
      
      methods.forEach(method => {
        if (forecasts[method][i] !== undefined) {
          sum += forecasts[method][i];
          count++;
        }
      });
      
      ensemble.push(count > 0 ? sum / count : 0);
    }
    
    return ensemble;
  }

  calculateConfidenceIntervals(forecast) {
    // Simplified confidence intervals
    const std = ss.standardDeviation(forecast);
    return forecast.map(value => ({
      lower: value - 1.96 * std,
      upper: value + 1.96 * std,
      point: value
    }));
  }

  calculateForecastAccuracy(data, forecasts) {
    // Simplified accuracy metrics
    const actual = data.slice(-5); // Last 5 values
    const predicted = forecasts.ensemble.slice(0, Math.min(5, actual.length));
    
    const mse = ss.meanSquaredError(actual, predicted);
    const mae = ss.meanAbsoluteError(actual, predicted);
    
    return {
      mse,
      mae,
      rmse: Math.sqrt(mse),
      mape: this.calculateMAPE(actual, predicted)
    };
  }

  calculateMAPE(actual, predicted) {
    let sum = 0;
    for (let i = 0; i < actual.length; i++) {
      if (actual[i] !== 0) {
        sum += Math.abs((actual[i] - predicted[i]) / actual[i]);
      }
    }
    return (sum / actual.length) * 100;
  }

  calculateAutocorrelation(data) {
    const maxLag = Math.min(20, data.length - 1);
    const autocorr = [];
    
    for (let lag = 0; lag <= maxLag; lag++) {
      let numerator = 0;
      let denominator = 0;
      const mean = ss.mean(data);
      
      for (let i = 0; i < data.length - lag; i++) {
        numerator += (data[i] - mean) * (data[i + lag] - mean);
        denominator += Math.pow(data[i] - mean, 2);
      }
      
      autocorr.push(denominator !== 0 ? numerator / denominator : 0);
    }
    
    return autocorr;
  }

  calculateMaxDrawdown(data) {
    let maxDrawdown = 0;
    let peak = data[0];
    
    for (let i = 1; i < data.length; i++) {
      if (data[i] > peak) {
        peak = data[i];
      } else {
        const drawdown = (peak - data[i]) / peak;
        maxDrawdown = Math.max(maxDrawdown, drawdown);
      }
    }
    
    return maxDrawdown;
  }
} 