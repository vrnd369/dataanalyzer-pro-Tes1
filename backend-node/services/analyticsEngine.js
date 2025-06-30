import * as ss from 'simple-statistics';
import { Matrix } from 'ml-matrix';
import { PolynomialRegression } from 'ml-regression';
import { UniversalAnalytics } from './universalAnalytics.js';

export class AnalyticsEngine {
  constructor() {
    this.universalAnalytics = new UniversalAnalytics();
  }

  prepareData(data) {
    const numericData = {};
    const textData = {};
    
    for (const field of data) {
      if (field.type === 'number') {
        try {
          numericData[field.name] = parseFloat(field.value);
        } catch (error) {
          console.warn(`Could not convert ${field.name} to number`);
        }
      } else {
        textData[field.name] = String(field.value);
      }
    }
    
    return {
      numeric: numericData,
      text: textData
    };
  }

  async analyzeData(data, analysisType, parameters = {}) {
    try {
      const preparedData = this.prepareData(data);
      const results = {};

      // Basic statistics for numeric data
      if (Object.keys(preparedData.numeric).length > 0) {
        const numericValues = Object.values(preparedData.numeric);
        results.statistics = {
          mean: ss.mean(numericValues),
          median: ss.median(numericValues),
          std: ss.standardDeviation(numericValues),
          min: ss.min(numericValues),
          max: ss.max(numericValues),
          variance: ss.variance(numericValues),
          skewness: ss.sampleSkewness(numericValues),
          kurtosis: ss.sampleKurtosis(numericValues)
        };

        // Perform specific analysis based on type
        switch (analysisType) {
          case 'time_series':
            results.time_series = await this.universalAnalytics.advancedTimeSeriesAnalysis(
              numericValues,
              parameters
            );
            break;
            
          case 'anomaly':
            results.anomalies = await this.universalAnalytics.advancedAnomalyDetection(
              numericValues,
              parameters
            );
            break;
            
          case 'correlation':
            results.correlation = await this.universalAnalytics.advancedCorrelationAnalysis(
              preparedData.numeric
            );
            break;
            
          case 'industry':
            const industry = (parameters.industry || '').toLowerCase();
            results.industry_insights = this.getIndustryInsights(preparedData.numeric, industry);
            break;
            
          default:
            results.basic_analysis = {
              count: numericValues.length,
              range: results.statistics.max - results.statistics.min,
              coefficient_of_variation: results.statistics.std / results.statistics.mean
            };
        }
      }

      // Text analysis if available
      if (Object.keys(preparedData.text).length > 0) {
        results.text_analysis = {
          field_count: Object.keys(preparedData.text).length,
          fields: Object.keys(preparedData.text),
          total_characters: Object.values(preparedData.text).reduce((sum, text) => sum + text.length, 0)
        };
      }

      return results;
    } catch (error) {
      console.error('Analysis error:', error);
      throw new Error(`Analysis failed: ${error.message}`);
    }
  }

  getIndustryInsights(numericData, industry) {
    switch (industry) {
      case 'finance':
        return {
          note: 'Finance industry: focus on revenue growth and risk management.',
          custom_metric: (numericData.revenue || 0) * 1.1,
          risk_score: this.calculateRiskScore(numericData),
          growth_rate: this.calculateGrowthRate(numericData)
        };
        
      case 'healthcare':
        return {
          note: 'Healthcare industry: patient satisfaction and compliance are key.',
          custom_metric: (numericData.customers || 0) * 0.8,
          patient_satisfaction_score: this.calculatePatientSatisfaction(numericData),
          compliance_rate: this.calculateComplianceRate(numericData)
        };
        
      case 'retail':
        return {
          note: 'Retail industry: customer experience and inventory management are critical.',
          custom_metric: (numericData.sales || 0) * 1.2,
          customer_satisfaction: this.calculateCustomerSatisfaction(numericData),
          inventory_turnover: this.calculateInventoryTurnover(numericData)
        };
        
      case 'technology':
        return {
          note: 'Technology industry: innovation and user engagement drive success.',
          custom_metric: (numericData.users || 0) * 1.5,
          innovation_score: this.calculateInnovationScore(numericData),
          user_engagement: this.calculateUserEngagement(numericData)
        };
        
      default:
        return {
          note: `No custom logic for industry: ${industry}`,
          general_metrics: {
            total_value: Object.values(numericData).reduce((sum, val) => sum + val, 0),
            average_value: Object.values(numericData).reduce((sum, val) => sum + val, 0) / Object.values(numericData).length
          }
        };
    }
  }

  calculateRiskScore(data) {
    // Simple risk calculation based on variance
    const values = Object.values(data);
    if (values.length === 0) return 0;
    
    const mean = ss.mean(values);
    const variance = ss.variance(values);
    return Math.min(100, (variance / mean) * 100);
  }

  calculateGrowthRate(data) {
    // Simple growth rate calculation
    const values = Object.values(data);
    if (values.length < 2) return 0;
    
    const sortedValues = values.sort((a, b) => a - b);
    return ((sortedValues[sortedValues.length - 1] - sortedValues[0]) / sortedValues[0]) * 100;
  }

  calculatePatientSatisfaction(data) {
    // Mock patient satisfaction calculation
    const values = Object.values(data);
    if (values.length === 0) return 0;
    
    const avg = ss.mean(values);
    return Math.min(100, Math.max(0, (avg / 100) * 100));
  }

  calculateComplianceRate(data) {
    // Mock compliance rate calculation
    const values = Object.values(data);
    if (values.length === 0) return 0;
    
    const compliant = values.filter(v => v > 80).length;
    return (compliant / values.length) * 100;
  }

  calculateCustomerSatisfaction(data) {
    // Mock customer satisfaction calculation
    const values = Object.values(data);
    if (values.length === 0) return 0;
    
    const avg = ss.mean(values);
    return Math.min(100, Math.max(0, (avg / 100) * 100));
  }

  calculateInventoryTurnover(data) {
    // Mock inventory turnover calculation
    const values = Object.values(data);
    if (values.length === 0) return 0;
    
    return ss.mean(values) / 30; // Assuming monthly turnover
  }

  calculateInnovationScore(data) {
    // Mock innovation score calculation
    const values = Object.values(data);
    if (values.length === 0) return 0;
    
    const growth = this.calculateGrowthRate(data);
    return Math.min(100, Math.max(0, growth + 50));
  }

  calculateUserEngagement(data) {
    // Mock user engagement calculation
    const values = Object.values(data);
    if (values.length === 0) return 0;
    
    const avg = ss.mean(values);
    return Math.min(100, Math.max(0, (avg / 1000) * 100));
  }
} 