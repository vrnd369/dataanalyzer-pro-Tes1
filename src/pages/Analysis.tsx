import { AnalysisSection } from '@/components/analysis/AnalysisSection';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getAnalysisData } from '@/utils/storage/db';
import { useAnalysis } from '@/hooks/analysis';
import type { FileData } from '@/types/file';
import { Brain, ArrowLeft, AlertCircle } from 'lucide-react';
// Add Vite-compatible worker instantiation
const createAnalysisWorker = () => new Worker(new URL('@/workers/analysisWorker.ts', import.meta.url), { type: 'module' });

function Analysis() {
  const [data, setData] = useState<FileData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const { error: analysisError } = useAnalysis();

  useEffect(() => {
    async function loadDataAndAnalyze() {
      try {
        setIsProcessing(true);
        setError(null);
        setAnalysisResult(null);
        const analysisData = await getAnalysisData();
        if (!analysisData) {
          navigate('/', { 
            replace: true,
            state: { error: 'No analysis data found. Please upload a file to analyze.' }
          });
          return;
        }
        // Validate fields structure (lightweight)
        if (!analysisData.content?.fields?.length) {
          throw new Error('Invalid analysis data structure - no fields found');
        }
        // Offload heavy validation and analysis to worker
        const worker = createAnalysisWorker();
        worker.postMessage({ fields: analysisData.content.fields });
        worker.onmessage = (e: MessageEvent) => {
          if (e.data.success) {
            setAnalysisResult(e.data.result);
          } else {
            setError(new Error(e.data.error || 'Analysis failed in worker'));
          }
          setIsProcessing(false);
          worker.terminate();
        };
        worker.onerror = (err: any) => {
          setError(new Error('Worker error: ' + err.message));
          setIsProcessing(false);
          worker.terminate();
        };
        setData(analysisData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load analysis data'));
        setIsProcessing(false);
      }
    }
    loadDataAndAnalyze();
  }, [navigate]);

  if (error || analysisError) {
    // Log the error for debugging
    console.error('Analysis error details:', {
      error: error?.message,
      analysisError: analysisError?.message,
      stack: error?.stack || analysisError?.stack
    });
    // Explicitly log the full error object and stack trace
    console.error('Full error object:', error || analysisError);
    console.trace('Stack trace for analysis error');
    
    // Show user-friendly error message
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 text-red-600 p-6 rounded-lg flex flex-col items-center gap-3 shadow-sm max-w-lg mx-auto">
          <AlertCircle className="w-8 h-8" />
          <div>
            <p className="font-medium text-black">{(error || analysisError)?.message}</p>
            <button
              onClick={() => navigate('/')}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
            >
              Return to Upload
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  if (isProcessing || !analysisResult) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="loader mb-4" />
        <div className="text-gray-700">Analyzing data, please wait...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-black hover:text-gray-300"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Upload
        </button>
        <div className="flex items-center gap-3">
          <Brain className="w-8 h-8 text-black" />
          <h1 className="text-2xl font-bold text-black">Analysis Results</h1>
          <h1 className="text-2xl font-bold text-black">
            {category 
              ? `${category.charAt(0).toUpperCase() + category.slice(1)} Analysis`
              : 'Analysis Results'
            }
          </h1>
        </div>
      </div>

      {data ? (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <AnalysisSection
              data={data.content} 
              category={category}
              results={analysisResult as any}
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
        </div>
      )}
    </div>
  );
}

export default Analysis;