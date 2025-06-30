import 'leaflet/dist/leaflet.css';
import { Globe, MapPin, Layers, Compass, Ruler, ZoomIn, ZoomOut, Target, Filter, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useRef, lazy, Suspense, useCallback, useMemo, useEffect } from 'react';
import { DataField } from '@/types/data';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Map } from 'leaflet';

// Dynamically import Map components
const MapContainer = lazy(() => import('react-leaflet').then(mod => ({ default: mod.MapContainer })));
const TileLayer = lazy(() => import('react-leaflet').then(mod => ({ default: mod.TileLayer })));
const Popup = lazy(() => import('react-leaflet').then(mod => ({ default: mod.Popup })));
const Circle = lazy(() => import('react-leaflet').then(mod => ({ default: mod.Circle })));

interface SpatialAnalysisProps {
  data: {
    fields: DataField[];
    rows: Record<string, any>[];
  };
}

interface Coordinate {
  lat: number;
  lng: number;
  row: Record<string, any>;
}

type Cluster = Coordinate[];

export const modules = [
  {
    id: 'spatial',
    name: 'Spatial Analysis',
    icon: Globe,
    description: 'Geographic and location-based analysis with interactive maps and spatial metrics',
    available: (data: { fields: DataField[] }) => data.fields.some(f =>
      f.name.toLowerCase().includes('location') ||
      f.name.toLowerCase().includes('lat') ||
      f.name.toLowerCase().includes('lon') ||
      f.name.toLowerCase().includes('address') ||
      f.name.toLowerCase().includes('geo')
    )
  },
];

export function SpatialAnalysisPanel({ data }: SpatialAnalysisProps) {
  const [mapType, setMapType] = useState<'points' | 'heatmap' | 'clusters'>('points');
  const [radius, setRadius] = useState<number>(1000);
  const [latField, setLatField] = useState<string>('');
  const [lngField, setLngField] = useState<string>('');
  const [colorField, setColorField] = useState<string>('none');
  const [sizeField, setSizeField] = useState<string>('none');
  const [clusterDistance, setClusterDistance] = useState<number>(50);
  const [showOutliers, setShowOutliers] = useState<boolean>(true);
  const mapRef = useRef<Map | null>(null);
  const [mapKey, setMapKey] = useState<string>('');
  
  // Update map key when relevant props change
  useEffect(() => {
    setMapKey(`${latField}-${lngField}-${mapType}-${Date.now()}`);
  }, [latField, lngField, mapType]);

  // Cleanup map instance on unmount or when key changes
  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [mapKey]);

  // Enhanced coordinate validation
  const validateCoordinates = useCallback((lat: number, lng: number) => {
    // Handle string inputs
    if (typeof lat === 'string') lat = parseFloat(lat);
    if (typeof lng === 'string') lng = parseFloat(lng);
    
    console.log('Validating coordinates:', { lat, lng });
    
    // Check for NaN
    if (isNaN(lat) || isNaN(lng)) {
      console.log('NaN coordinates:', { lat, lng });
      return false;
    }
    
    // Check ranges with more lenient validation
    if (lat < -90 || lat > 90) {
      console.log('Latitude out of range:', lat);
      return false;
    }
    if (lng < -180 || lng > 180) {
      console.log('Longitude out of range:', lng);
      return false;
    }
    
    // Remove the zero coordinate check as it's too strict
    return true;
  }, []);

  // Enhanced spatial metrics calculation
  const calculateMetrics = useMemo(() => {
    if (!latField || !lngField || !data?.rows || !Array.isArray(data.rows)) {
      return null;
    }
    
    console.log('Selected fields:', { latField, lngField });
    console.log('First few rows:', data.rows.slice(0, 3));
    
    const validCoordinates = data.rows
      .map(row => {
        const lat = parseFloat(row[latField]);
        const lng = parseFloat(row[lngField]);
        console.log('Processing row:', { lat, lng, row });
        const isValid = validateCoordinates(lat, lng);
        if (!isValid) {
          console.log('Invalid coordinates:', { lat, lng, row });
        }
        return validateCoordinates(lat, lng) ? { lat, lng, row } : null;
      })
      .filter(coord => coord !== null) as { lat: number; lng: number; row: any }[];
    
    console.log('Valid coordinates count:', validCoordinates.length);
    if (validCoordinates.length === 0) {
      console.log('No valid coordinates found in the data');
      return null;
    }
    
    const lats = validCoordinates.map(c => c.lat);
    const lngs = validCoordinates.map(c => c.lng);
    
    // Calculate bounds
    const bounds = {
      minLat: Math.min(...lats),
      maxLat: Math.max(...lats),
      minLng: Math.min(...lngs),
      maxLng: Math.max(...lngs)
    };
    
    // Calculate center (centroid)
    const centerLat = lats.reduce((sum, lat) => sum + lat, 0) / lats.length;
    const centerLng = lngs.reduce((sum, lng) => sum + lng, 0) / lngs.length;
    
    // Calculate distances using Haversine formula
    const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
      const R = 6371; // Earth's radius in km
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLng = (lng2 - lng1) * Math.PI / 180;
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLng/2) * Math.sin(dLng/2);
      return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    };
    
    // Calculate max distance and detect outliers
    const distances = validCoordinates.map(coord => 
      calculateDistance(centerLat, centerLng, coord.lat, coord.lng)
    );
    
    // Outlier detection using IQR method
    distances.sort((a, b) => a - b);
    const q1 = distances[Math.floor(distances.length * 0.25)];
    const q3 = distances[Math.floor(distances.length * 0.75)];
    const iqr = q3 - q1;
    const outlierThreshold = q3 + 1.5 * iqr;
    
    const outliers = validCoordinates.filter(coord => {
      const dist = calculateDistance(centerLat, centerLng, coord.lat, coord.lng);
      return dist > outlierThreshold;
    });
    
    return {
      pointCount: validCoordinates.length,
      validCoordinates,
      bounds,
      center: { lat: centerLat, lng: centerLng },
      spread: { 
        lat: bounds.maxLat - bounds.minLat, 
        lng: bounds.maxLng - bounds.minLng 
      },
      maxDistance: Math.max(...distances),
      outliers,
      averageDistance: distances.reduce((sum, d) => sum + d, 0) / distances.length
    };
  }, [latField, lngField, data, validateCoordinates]);

  // Clustering algorithm
  const calculateClusters = useMemo((): Cluster[] => {
    if (!calculateMetrics || mapType !== 'clusters') return [];
    
    const points = calculateMetrics.validCoordinates;
    if (points.length < 2) return [];
    
    const clusters: Cluster[] = [];
    const used = new Set<number>();
    
    points.forEach((point, i) => {
      if (used.has(i)) return;
      
      const cluster: Coordinate[] = [point];
      used.add(i);
      
      points.forEach((other, j) => {
        if (i !== j && !used.has(j)) {
          const distance = Math.sqrt(
            Math.pow(point.lat - other.lat, 2) + Math.pow(point.lng - other.lng, 2)
          );
          
          if (distance < clusterDistance / 10000) {
            cluster.push(other);
            used.add(j);
          }
        }
      });
      
      clusters.push(cluster);
    });
    
    return clusters;
  }, [calculateMetrics, mapType, clusterDistance]);

  // Color mapping function
  const getColorFromValue = (value: number | string) => {
    if (!value || value === 'none') return '#3b82f6';
    const normalized = Math.min(1, Math.max(0, Number(value) / 50));
    const hue = (1 - normalized) * 240;
    return `hsl(${hue}, 70%, 50%)`;
  };

  // Export functionality
  const exportData = () => {
    if (!calculateMetrics) return;
    
    const exportData = {
      metrics: calculateMetrics,
      clusters: calculateClusters,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'spatial-analysis.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  console.log('Available fields:', data.fields);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
      {/* Left sidebar with controls */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              <span>Spatial Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black-500 mb-1">Latitude Field</label>
                <Select value={latField} onValueChange={setLatField}>
                  <SelectTrigger className="w-full text-black-500">
                    <SelectValue placeholder="Select latitude field" className="bg-grey text-black-500" />
                  </SelectTrigger>
                  <SelectContent>
                    {data.fields
                      .filter(f => f.type === 'number')
                      .map(f => (
                        <SelectItem key={f.name} value={f.name}>{f.name}</SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500 mt-1">Select a numeric field containing latitude values (-90 to 90)</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-black-500 mb-1">Longitude Field</label>
                <Select value={lngField} onValueChange={setLngField}>
                  <SelectTrigger className="w-full text-black-500">
                    <SelectValue placeholder="Select longitude field" className="text-black-500" />
                  </SelectTrigger>
                  <SelectContent>
                    {data.fields
                      .filter(f => f.type === 'number')
                      .map(f => (
                        <SelectItem key={f.name} value={f.name}>{f.name}</SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500 mt-1">Select a numeric field containing longitude values (-180 to 180)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-black-500 mb-1">Color By (Optional)</label>
                <Select value={colorField} onValueChange={setColorField}>
                  <SelectTrigger className="w-full text-black-500">
                    <SelectValue placeholder="Select color field" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {data.fields
                      .filter(f => f.type === 'number')
                      .map(f => (
                        <SelectItem key={f.name} value={f.name}>{f.name}</SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-black-500 mb-1">Size By (Optional)</label>
                <Select value={sizeField} onValueChange={setSizeField}>
                  <SelectTrigger className="w-full text-black-500">
                    <SelectValue placeholder="Select size field" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {data.fields
                      .filter(f => f.type === 'number')
                      .map(f => (
                        <SelectItem key={f.name} value={f.name}>{f.name}</SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Visualization Type</label>
                <Tabs value={mapType} onValueChange={(v) => setMapType(v as any)} className="w-full">
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="points" className="flex items-center justify-center">
                      <MapPin className="w-4 h-4 mr-1" /> Points
                    </TabsTrigger>
                    <TabsTrigger value="heatmap" className="flex items-center justify-center">
                      <Layers className="w-4 h-4 mr-1" /> Heatmap
                    </TabsTrigger>
                    <TabsTrigger value="clusters" className="flex items-center justify-center">
                      <Compass className="w-4 h-4 mr-1" /> Clusters
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              {mapType === 'heatmap' && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Heatmap Radius: {radius} meters
                  </label>
                  <Slider
                    value={[radius]}
                    onValueChange={([val]) => setRadius(val)}
                    min={100}
                    max={5000}
                    step={100}
                    className="w-full"
                  />
                </div>
              )}

              {mapType === 'clusters' && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Cluster Distance: {clusterDistance}
                  </label>
                  <Slider
                    value={[clusterDistance]}
                    onValueChange={([val]) => setClusterDistance(val)}
                    min={10}
                    max={200}
                    step={10}
                    className="w-full"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Enhanced Spatial metrics card */}
        {calculateMetrics && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ruler className="w-5 h-5" />
                <span>Spatial Metrics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 bg-blue-50 rounded">
                  <div className="text-xs text-blue-600">Points</div>
                  <div className="font-bold text-blue-800">{calculateMetrics.pointCount}</div>
                </div>
                <div className="p-2 bg-green-50 rounded">
                  <div className="text-xs text-green-600">Max Distance</div>
                  <div className="font-bold text-green-800">{calculateMetrics.maxDistance.toFixed(0)} km</div>
                </div>
                <div className="p-2 bg-orange-50 rounded">
                  <div className="text-xs text-orange-600">Outliers</div>
                  <div className="font-bold text-orange-800">{calculateMetrics.outliers.length}</div>
                </div>
                <div className="p-2 bg-purple-50 rounded">
                  <div className="text-xs text-purple-600">Avg Distance</div>
                  <div className="font-bold text-purple-800">{calculateMetrics.averageDistance.toFixed(0)} km</div>
                </div>
                {mapType === 'clusters' && (
                  <div className="p-2 bg-indigo-50 rounded col-span-2">
                    <div className="text-xs text-indigo-600">Clusters</div>
                    <div className="font-bold text-indigo-800">{calculateClusters.length}</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Main map area */}
      <div className="lg:col-span-2">
        <Card className="h-full">
          <CardContent className="p-0 h-[600px]">
            {!latField || !lngField ? (
              <div className="h-full flex flex-col items-center justify-center p-4 text-center">
                <Globe className="w-12 h-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select Geographic Fields</h3>
                <p className="text-gray-500 max-w-md">
                  Please select both latitude and longitude fields from your data to visualize the map.
                  Look for fields containing geographic coordinates or location data.
                </p>
                <div className="mt-4 text-sm text-gray-500">
                  <p>Available numeric fields:</p>
                  <ul className="list-disc list-inside mt-2">
                    {data.fields
                      .filter(f => f.type === 'number')
                      .map(f => (
                        <li key={f.name}>{f.name}</li>
                      ))}
                  </ul>
                </div>
              </div>
            ) : !calculateMetrics ? (
              <div className="h-full flex flex-col items-center justify-center p-4 text-center">
                <MapPin className="w-12 h-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Valid Coordinates Found</h3>
                <p className="text-gray-500 max-w-md">
                  The selected fields do not contain valid geographic coordinates.
                  Please ensure your latitude values are between -90 and 90,
                  and longitude values are between -180 and 180.
                </p>
              </div>
            ) : (
              <Suspense fallback={<div>Loading map...</div>}>
                <MapContainer
                  key={mapKey}
                  center={[calculateMetrics.center.lat, calculateMetrics.center.lng]}
                  zoom={10}
                  scrollWheelZoom={true}
                  className="h-full w-full rounded-b-lg"
                  whenCreated={(map: Map) => {
                    if (mapRef.current) {
                      mapRef.current.remove();
                    }
                    mapRef.current = map;
                  }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  
                  {/* Render points or other visualizations */}
                  {mapType === 'points' && calculateMetrics.validCoordinates.map((coord, idx) => {
                    const isOutlier = calculateMetrics.outliers.some(o => 
                      o.lat === coord.lat && o.lng === coord.lng
                    );
                    
                    if (!showOutliers && isOutlier) return null;
                    
                    const size = sizeField ? 
                      Math.max(5, Math.min(20, (Number(coord.row[sizeField]) || 0) / 1000000) * 10) : 8;
                    const color = colorField ? 
                      getColorFromValue(coord.row[colorField]) : 
                      (isOutlier ? '#ff4444' : '#3b82f6');
                    
                    return (
                      <Circle
                        key={idx}
                        center={[coord.lat, coord.lng]}
                        radius={size}
                        fillColor={color}
                        color={isOutlier ? '#ff0000' : 'white'}
                        fillOpacity={0.7}
                        weight={isOutlier ? 2 : 1}
                      >
                        <Popup>
                          <div className="text-sm">
                            <div className="font-bold">Coordinates</div>
                            <div>Lat: {coord.lat.toFixed(4)}</div>
                            <div>Lng: {coord.lng.toFixed(4)}</div>
                            {colorField && (
                              <div className="mt-1">
                                <div className="font-bold">{colorField}</div>
                                <div>{coord.row[colorField]}</div>
                              </div>
                            )}
                            {sizeField && (
                              <div className="mt-1">
                                <div className="font-bold">{sizeField}</div>
                                <div>{coord.row[sizeField]}</div>
                              </div>
                            )}
                          </div>
                        </Popup>
                      </Circle>
                    );
                  })}
                  
                  {mapType === 'heatmap' && calculateMetrics.validCoordinates.map((coord, idx) => (
                    <Circle
                      key={idx}
                      center={[coord.lat, coord.lng]}
                      radius={radius}
                      fillColor="red"
                      color="red"
                      fillOpacity={0.3}
                      weight={0}
                    />
                  ))}
                  
                  {mapType === 'clusters' && calculateClusters.map((cluster: Cluster, clusterIdx: number) => {
                    const centerLat = cluster.reduce((sum: number, p: Coordinate) => sum + p.lat, 0) / cluster.length;
                    const centerLng = cluster.reduce((sum: number, p: Coordinate) => sum + p.lng, 0) / cluster.length;
                    const clusterSize = Math.max(20, Math.min(60, (cluster.length || 1) * 8));
                    
                    return (
                      <div key={clusterIdx}>
                        <Circle
                          center={[centerLat, centerLng]}
                          radius={clusterSize}
                          fillColor={`hsl(${clusterIdx * 137.5 % 360}, 70%, 50%)`}
                          color="white"
                          fillOpacity={0.7}
                          weight={2}
                        >
                          <Popup>
                            <div className="text-sm">
                              <div className="font-bold">Cluster {clusterIdx + 1}</div>
                              <div>Points: {cluster.length}</div>
                              <div>Center: {centerLat.toFixed(4)}, {centerLng.toFixed(4)}</div>
                            </div>
                          </Popup>
                        </Circle>
                        
                        {cluster.map((point: Coordinate, pointIdx: number) => (
                          <Circle
                            key={pointIdx}
                            center={[point.lat, point.lng]}
                            radius={4}
                            fillColor="gray"
                            color="white"
                            fillOpacity={0.6}
                            weight={1}
                          />
                        ))}
                      </div>
                    );
                  })}
                  
                  {/* Center marker */}
                  <Circle
                    center={[calculateMetrics.center.lat, calculateMetrics.center.lng]}
                    radius={6}
                    fillColor="red"
                    color="white"
                    fillOpacity={1}
                    weight={2}
                  >
                    <Popup>
                      <div className="text-sm">
                        <div className="font-bold">Center Point</div>
                        <div>Lat: {calculateMetrics.center.lat.toFixed(4)}</div>
                        <div>Lng: {calculateMetrics.center.lng.toFixed(4)}</div>
                      </div>
                    </Popup>
                  </Circle>
                </MapContainer>
              </Suspense>
            )}
          </CardContent>
        </Card>
        
        {/* Map controls */}
        {latField && lngField && calculateMetrics && (
          <div className="mt-2 flex justify-between">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (mapRef.current) {
                    mapRef.current.flyTo(
                      [calculateMetrics.center.lat, calculateMetrics.center.lng],
                      10
                    );
                  }
                }}
              >
                <Target className="w-4 h-4 mr-1" /> Reset View
              </Button>
              <Button
                variant={showOutliers ? "default" : "outline"}
                size="sm"
                onClick={() => setShowOutliers(!showOutliers)}
              >
                <Filter className="w-4 h-4 mr-1" /> 
                Outliers ({calculateMetrics.outliers.length})
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={exportData}
              >
                <Download className="w-4 h-4 mr-1" /> Export
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (mapRef.current) {
                    mapRef.current.zoomIn();
                  }
                }}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (mapRef.current) {
                    mapRef.current.zoomOut();
                  }
                }}
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export const SpatialAnalysis = {
  render: (props: SpatialAnalysisProps) => <SpatialAnalysisPanel {...props} />
}; 