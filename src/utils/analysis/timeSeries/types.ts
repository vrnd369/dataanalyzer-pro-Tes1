export interface TimeSeriesResult {
  field: string;
  trend: 'increasing' | 'decreasing' | 'stable';
  seasonality: number | null;
  forecast: number[];
  confidence: number;
  components: {
    trend: number[];
    seasonal: number[];
    residual: number[];
  };
  // Additional metadata fields
  analysisMethod?: string;
  analysisParams?: any;
  timestamp?: string;
  accuracyMetrics?: {
    mse?: number;
    mae?: number;
    rmse?: number;
    mape?: number;
    r2?: number;
    aic?: number;
    bic?: number;
  };
} 