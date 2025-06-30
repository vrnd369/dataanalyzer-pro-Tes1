import { useState, useEffect } from 'react';
import SWOTAnalysis from './SWOTAnalysis';
import { generateSWOTAnalysis } from '@/utils/analysis/swot/analyzer';
import { DataField } from '@/types/data';

interface SWOTExampleProps {
  data: {
    fields: DataField[];
  };
}

export default function SWOTExample({ data }: SWOTExampleProps) {
  const [swotData, setSwotData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Generate SWOT analysis when component mounts
    const generateAnalysis = async () => {
      setIsLoading(true);
      
      // Simulate analysis time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const analysis = generateSWOTAnalysis(data);
      setSwotData(analysis);
      setIsLoading(false);
    };

    generateAnalysis();
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
        <span className="ml-2 text-gray-600">Generating SWOT analysis...</span>
      </div>
    );
  }

  if (!swotData) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">Unable to generate SWOT analysis</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">SWOT Analysis Example</h2>
        <p className="text-gray-600">Strategic analysis of your data and business metrics</p>
      </div>
      
      <SWOTAnalysis analysis={swotData} />
    </div>
  );
} 