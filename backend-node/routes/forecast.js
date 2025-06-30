import express from 'express';
import Joi from 'joi';
import * as ss from 'simple-statistics';
import { PolynomialRegression } from 'ml-regression';

const router = express.Router();

// Validation schemas
const forecastRequestSchema = Joi.object({
  data: Joi.array().items(Joi.number()).min(3).required(),
  config: Joi.object({
    horizon: Joi.number().integer().min(1).max(50).default(5),
    methods: Joi.array().items(Joi.string().valid('linear', 'polynomial', 'exponential')).default(['linear', 'polynomial', 'exponential']),
    confidence: Joi.number().min(0.5).max(0.99).default(0.95)
  }).default()
});

// POST /api/advanced/forecast
router.post('/', async (req, res) => {
  try {
    // Validate request
    const { error, value } = forecastRequestSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: {
          message: 'Validation error',
          details: error.details
        }
      });
    }

    const { data, config } = value;

    // Perform advanced forecasting
    const results = await advancedForecast(data, config);

    res.json({
      success: true,
      data: results,
      timestamp: new Date().toISOString(),
      request_id: req.id
    });

  } catch (error) {
    console.error('Forecasting error:', error);
    res.status(500).json({
      error: {
        message: error.message || 'Forecasting failed',
        request_id: req.id
      }
    });
  }
});

async function advancedForecast(data, config = {}) {
  try {
    if (data.length < 3) {
      return { error: 'Insufficient data for forecasting' };
    }

    const horizon = config.horizon || 5;
    const methods = config.methods || ['linear', 'polynomial', 'exponential'];
    const confidence = config.confidence || 0.95;

    const forecasts = {};

    if (methods.includes('linear')) {
      forecasts.linear = linearForecast(data, horizon);
    }

    if (methods.includes('polynomial')) {
      forecasts.polynomial = polynomialForecast(data, horizon);
    }

    if (methods.includes('exponential')) {
      forecasts.exponential = exponentialForecast(data, horizon);
    }

    // Ensemble forecast
    forecasts.ensemble = ensembleForecast(forecasts);

    // Calculate confidence intervals
    const confidenceIntervals = calculateConfidenceIntervals(forecasts.ensemble, confidence);

    // Calculate accuracy metrics
    const accuracyMetrics = calculateForecastAccuracy(data, forecasts);

    return {
      forecasts,
      confidence_intervals: confidenceIntervals,
      accuracy_metrics: accuracyMetrics,
      config: {
        horizon,
        methods,
        confidence
      }
    };

  } catch (error) {
    console.error('Advanced forecasting error:', error);
    return { error: 'Advanced forecasting failed' };
  }
}

function linearForecast(data, horizon) {
  try {
    const n = data.length;
    const x = Array.from({ length: n }, (_, i) => i);
    const regression = ss.linearRegression([x, data]);
    
    const forecast = [];
    for (let i = 0; i < horizon; i++) {
      forecast.push(regression.m * (n + i) + regression.b);
    }
    
    return forecast;
  } catch (error) {
    console.error('Linear forecast error:', error);
    return null;
  }
}

function polynomialForecast(data, horizon) {
  try {
    const n = data.length;
    const x = Array.from({ length: n }, (_, i) => i);
    const y = data;
    
    // Fit polynomial regression (degree 2)
    const regression = new PolynomialRegression(x, y, 2);
    regression.train();
    
    const forecast = [];
    for (let i = 0; i < horizon; i++) {
      forecast.push(regression.predict(n + i));
    }
    
    return forecast;
  } catch (error) {
    console.error('Polynomial forecast error:', error);
    return null;
  }
}

function exponentialForecast(data, horizon) {
  try {
    // Simple exponential smoothing
    const alpha = 0.3;
    let forecast = data[data.length - 1];
    const forecasts = [];
    
    for (let i = 0; i < horizon; i++) {
      forecasts.push(forecast);
      forecast = alpha * data[data.length - 1] + (1 - alpha) * forecast;
    }
    
    return forecasts;
  } catch (error) {
    console.error('Exponential forecast error:', error);
    return null;
  }
}

function ensembleForecast(forecasts) {
  const methods = Object.keys(forecasts).filter(key => forecasts[key] !== null);
  if (methods.length === 0) return [];
  
  const horizon = forecasts[methods[0]].length;
  const ensemble = [];
  
  for (let i = 0; i < horizon; i++) {
    let sum = 0;
    let count = 0;
    
    methods.forEach(method => {
      if (forecasts[method][i] !== undefined && !isNaN(forecasts[method][i])) {
        sum += forecasts[method][i];
        count++;
      }
    });
    
    ensemble.push(count > 0 ? sum / count : 0);
  }
  
  return ensemble;
}

function calculateConfidenceIntervals(forecast, confidence) {
  if (!forecast || forecast.length === 0) return [];
  
  const std = ss.standardDeviation(forecast);
  const zScore = getZScore(confidence);
  
  return forecast.map(value => ({
    lower: value - zScore * std,
    upper: value + zScore * std,
    point: value
  }));
}

function getZScore(confidence) {
  const zScores = {
    0.90: 1.645,
    0.95: 1.96,
    0.99: 2.576
  };
  return zScores[confidence] || 1.96;
}

function calculateForecastAccuracy(data, forecasts) {
  if (!forecasts.ensemble || forecasts.ensemble.length === 0) return {};
  
  // Use last few data points for validation
  const validationData = data.slice(-Math.min(5, data.length));
  const validationForecasts = forecasts.ensemble.slice(0, validationData.length);
  
  if (validationData.length === 0) return {};
  
  const mse = ss.meanSquaredError(validationData, validationForecasts);
  const mae = ss.meanAbsoluteError(validationData, validationForecasts);
  
  return {
    mse,
    mae,
    rmse: Math.sqrt(mse),
    mape: calculateMAPE(validationData, validationForecasts)
  };
}

function calculateMAPE(actual, predicted) {
  let sum = 0;
  let count = 0;
  
  for (let i = 0; i < actual.length; i++) {
    if (actual[i] !== 0) {
      sum += Math.abs((actual[i] - predicted[i]) / actual[i]);
      count++;
    }
  }
  
  return count > 0 ? (sum / count) * 100 : 0;
}

// GET /api/advanced/forecast/health
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'advanced_forecasting',
    timestamp: new Date().toISOString()
  });
});

export { router as forecastRoutes }; 