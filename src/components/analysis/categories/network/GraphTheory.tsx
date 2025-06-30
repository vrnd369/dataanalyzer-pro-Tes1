import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Card } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Badge } from '../../../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../components/ui/tabs';
import { RotateCcw, Plus, Minus, Info, Zap, GitBranch, Network } from 'lucide-react';

interface Node {
  id: number;
  x: number;
  y: number;
  label: string;
}

interface Edge {
  from: number;
  to: number;
  weight: number;
}

interface GraphStats {
  nodes: number;
  edges: number;
  maxDegree: number;
  minDegree: number;
  avgDegree: string;
  isConnected: boolean;
  density: number;
}

interface SampleGraph {
  nodes: Node[];
  edges: Edge[];
}

interface SampleGraphs {
  [key: string]: SampleGraph;
}

export function GraphTheory() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 550, height: 400 });
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [mode, setMode] = useState<'add-node' | 'add-edge' | 'move'>('add-node');
  const [draggedNode, setDraggedNode] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentAlgorithm, setCurrentAlgorithm] = useState<string | null>(null);
  const [visitedNodes, setVisitedNodes] = useState<Set<number>>(new Set());
  const [visitedEdges, setVisitedEdges] = useState<Set<string>>(new Set());
  const [graphStats, setGraphStats] = useState<GraphStats>({
    nodes: 0,
    edges: 0,
    maxDegree: 0,
    minDegree: 0,
    avgDegree: '0',
    isConnected: true,
    density: 0
  });

  // Sample graphs for quick testing
  const sampleGraphs: SampleGraphs = {
    complete4: {
      nodes: [
        { id: 1, x: 200, y: 150, label: 'A' },
        { id: 2, x: 350, y: 150, label: 'B' },
        { id: 3, x: 350, y: 300, label: 'C' },
        { id: 4, x: 200, y: 300, label: 'D' }
      ],
      edges: [
        { from: 1, to: 2, weight: 1 },
        { from: 2, to: 3, weight: 2 },
        { from: 3, to: 4, weight: 3 },
        { from: 4, to: 1, weight: 4 },
        { from: 1, to: 3, weight: 5 },
        { from: 2, to: 4, weight: 6 }
      ]
    },
    tree: {
      nodes: [
        { id: 1, x: 275, y: 100, label: 'Root' },
        { id: 2, x: 200, y: 200, label: 'L1' },
        { id: 3, x: 350, y: 200, label: 'R1' },
        { id: 4, x: 150, y: 300, label: 'L2' },
        { id: 5, x: 250, y: 300, label: 'L3' },
        { id: 6, x: 400, y: 300, label: 'R2' }
      ],
      edges: [
        { from: 1, to: 2, weight: 1 },
        { from: 1, to: 3, weight: 1 },
        { from: 2, to: 4, weight: 1 },
        { from: 2, to: 5, weight: 1 },
        { from: 3, to: 6, weight: 1 }
      ]
    }
  };

  // Calculate graph statistics
  const calculateStats = useCallback(() => {
    const numNodes = nodes.length;
    const numEdges = edges.length;
    const degrees: { [key: number]: number } = {};
    
    nodes.forEach(node => {
      degrees[node.id] = edges.filter(edge => 
        edge.from === node.id || edge.to === node.id
      ).length;
    });

    const maxDegree = Math.max(...Object.values(degrees), 0);
    const minDegree = Math.min(...Object.values(degrees), 0);
    const avgDegree = numNodes > 0 ? (2 * numEdges) / numNodes : 0;

    // Check if graph is connected (simple BFS check)
    const isConnected = numNodes <= 1 || checkConnectivity();

    setGraphStats({
      nodes: numNodes,
      edges: numEdges,
      maxDegree,
      minDegree,
      avgDegree: avgDegree.toFixed(2),
      isConnected,
      density: numNodes > 1 ? (2 * numEdges) / (numNodes * (numNodes - 1)) : 0
    });
  }, [nodes, edges]);

  const checkConnectivity = () => {
    if (nodes.length === 0) return true;
    
    const visited = new Set<number>();
    const queue = [nodes[0].id];
    visited.add(nodes[0].id);

    while (queue.length > 0) {
      const current = queue.shift()!;
      const neighbors = edges
        .filter(edge => edge.from === current || edge.to === current)
        .map(edge => edge.from === current ? edge.to : edge.from);
      
      neighbors.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      });
    }

    return visited.size === nodes.length;
  };

  useEffect(() => {
    calculateStats();
  }, [nodes, edges, calculateStats]);

  // Add resize observer effect
  useEffect(() => {
    const updateCanvasSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setCanvasSize({
          width: width - 32, // Subtract padding
          height: height - 32
        });
      }
    };

    const resizeObserver = new ResizeObserver(updateCanvasSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Drawing functions
  const drawGraph = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw edges
    edges.forEach((edge) => {
      const fromNode = nodes.find(n => n.id === edge.from);
      const toNode = nodes.find(n => n.id === edge.to);
      
      if (fromNode && toNode) {
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        
        // Highlight visited edges during algorithm animation
        if (visitedEdges.has(`${edge.from}-${edge.to}`) || visitedEdges.has(`${edge.to}-${edge.from}`)) {
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 3;
        } else {
          ctx.strokeStyle = '#64748b';
          ctx.lineWidth = 2;
        }
        
        ctx.stroke();

        // Draw weight labels
        const midX = (fromNode.x + toNode.x) / 2;
        const midY = (fromNode.y + toNode.y) / 2;
        ctx.fillStyle = '#1f2937';
        ctx.font = '12px Arial';
        ctx.fillText(edge.weight.toString(), midX + 5, midY - 5);
      }
    });

    // Draw nodes
    nodes.forEach(node => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
      
      // Node colors based on state
      if (visitedNodes.has(node.id)) {
        ctx.fillStyle = '#10b981';
      } else if (selectedNode === node.id) {
        ctx.fillStyle = '#3b82f6';
      } else {
        ctx.fillStyle = '#f8fafc';
      }
      
      ctx.fill();
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw node labels
      ctx.fillStyle = '#1f2937';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(node.label || node.id.toString(), node.x, node.y + 4);
    });
  }, [nodes, edges, selectedNode, visitedNodes, visitedEdges, canvasSize]);

  useEffect(() => {
    drawGraph();
  }, [drawGraph]);

  // Event handlers
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if clicked on existing node
    const clickedNode = nodes.find(node => {
      const distance = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2);
      return distance <= 20;
    });

    if (mode === 'add-node' && !clickedNode) {
      const newNode = {
        id: nodes.length + 1,
        x,
        y,
        label: String.fromCharCode(65 + nodes.length) // A, B, C...
      };
      setNodes(prev => [...prev, newNode]);
    } else if (mode === 'add-edge' && clickedNode) {
      if (!selectedNode) {
        setSelectedNode(clickedNode.id);
      } else if (selectedNode !== clickedNode.id) {
        // Check if edge already exists
        const edgeExists = edges.some(edge => 
          (edge.from === selectedNode && edge.to === clickedNode.id) ||
          (edge.from === clickedNode.id && edge.to === selectedNode)
        );
        
        if (!edgeExists) {
          const weight = Math.floor(Math.random() * 10) + 1;
          setEdges(prev => [...prev, { from: selectedNode, to: clickedNode.id, weight }]);
        }
        setSelectedNode(null);
      }
    } else if (mode === 'move' && clickedNode) {
      setDraggedNode(clickedNode.id);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (draggedNode && mode === 'move') {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setNodes(prev => prev.map(node => 
        node.id === draggedNode ? { ...node, x, y } : node
      ));
    }
  };

  const handleMouseUp = () => {
    setDraggedNode(null);
  };

  // Algorithm implementations
  const runDFS = async (startNodeId: number) => {
    setIsAnimating(true);
    setCurrentAlgorithm('DFS');
    setVisitedNodes(new Set<number>());
    setVisitedEdges(new Set<string>());

    const visited = new Set<number>();
    const stack = [startNodeId];
    const newVisitedNodes = new Set<number>();
    const newVisitedEdges = new Set<string>();

    while (stack.length > 0) {
      const current = stack.pop()!;
      
      if (!visited.has(current)) {
        visited.add(current);
        newVisitedNodes.add(current);
        setVisitedNodes(new Set<number>(newVisitedNodes));
        
        await new Promise(resolve => setTimeout(resolve, 800));

        // Add neighbors to stack
        const neighbors = edges
          .filter(edge => 
            (edge.from === current || edge.to === current) && 
            !visited.has(edge.from === current ? edge.to : edge.from)
          )
          .map(edge => {
            const neighbor = edge.from === current ? edge.to : edge.from;
            newVisitedEdges.add(`${current}-${neighbor}`);
            return neighbor;
          });

        setVisitedEdges(new Set<string>(newVisitedEdges));
        stack.push(...neighbors);
      }
    }

    setIsAnimating(false);
  };

  const runBFS = async (startNodeId: number) => {
    setIsAnimating(true);
    setCurrentAlgorithm('BFS');
    setVisitedNodes(new Set<number>());
    setVisitedEdges(new Set<string>());

    const visited = new Set<number>();
    const queue = [startNodeId];
    const newVisitedNodes = new Set<number>();
    const newVisitedEdges = new Set<string>();

    while (queue.length > 0) {
      const current = queue.shift()!;
      
      if (!visited.has(current)) {
        visited.add(current);
        newVisitedNodes.add(current);
        setVisitedNodes(new Set<number>(newVisitedNodes));
        
        await new Promise(resolve => setTimeout(resolve, 800));

        // Add neighbors to queue
        const neighbors = edges
          .filter(edge => 
            (edge.from === current || edge.to === current) && 
            !visited.has(edge.from === current ? edge.to : edge.from)
          )
          .map(edge => {
            const neighbor = edge.from === current ? edge.to : edge.from;
            newVisitedEdges.add(`${current}-${neighbor}`);
            return neighbor;
          });

        setVisitedEdges(new Set<string>(newVisitedEdges));
        queue.push(...neighbors);
      }
    }

    setIsAnimating(false);
  };

  const loadSampleGraph = (graphKey: keyof SampleGraphs) => {
    const graph = sampleGraphs[graphKey];
    setNodes(graph.nodes);
    setEdges(graph.edges);
    setSelectedNode(null);
    setVisitedNodes(new Set());
    setVisitedEdges(new Set());
  };

  const clearGraph = () => {
    setNodes([]);
    setEdges([]);
    setSelectedNode(null);
    setVisitedNodes(new Set());
    setVisitedEdges(new Set());
    setCurrentAlgorithm(null);
  };

  return (
    <Card className="p-6 max-w-6xl mx-auto bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="flex items-center gap-3 mb-6">
        <Network className="h-7 w-7 text-blue-600" />
        <h3 className="text-2xl font-bold text-gray-800">Interactive Graph Theory Analysis</h3>
      </div>

      <Tabs defaultValue="visualization" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="visualization" className="flex items-center gap-2">
            <GitBranch className="h-4 w-4" />
            Visualization
          </TabsTrigger>
          <TabsTrigger value="algorithms" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Algorithms
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="visualization" className="space-y-4">
          {/* Control Panel */}
          <div className="flex flex-wrap gap-3 p-4 bg-white rounded-lg border shadow-sm">
            <div className="flex gap-2">
              <Button
                variant={mode === 'add-node' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setMode('add-node')}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Node
              </Button>
              <Button
                variant={mode === 'add-edge' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setMode('add-edge')}
                className="flex items-center gap-2"
              >
                <Minus className="h-4 w-4" />
                Add Edge
              </Button>
              <Button
                variant={mode === 'move' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setMode('move')}
              >
                Move
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => loadSampleGraph('complete4')}
              >
                Load Complete Graph
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => loadSampleGraph('tree')}
              >
                Load Tree
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={clearGraph}
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Clear
              </Button>
            </div>
          </div>

          {/* Update Canvas container */}
          <div ref={containerRef} className="bg-white rounded-lg border shadow-sm p-4 h-[500px]">
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              className="border rounded cursor-crosshair bg-gradient-to-br from-gray-50 to-blue-50 w-full h-full"
              style={{ cursor: mode === 'move' ? 'grab' : 'crosshair' }}
            />
            <div className="text-sm text-gray-600 mt-2">
              Current Mode: <Badge variant="outline">{mode.replace('-', ' ').toUpperCase()}</Badge>
              {selectedNode && <span className="ml-2">Selected Node: {selectedNode}</span>}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="algorithms" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5 text-orange-500" />
                Graph Traversal
              </h4>
              <div className="space-y-3">
                <div>
                  <Button
                    onClick={() => nodes.length > 0 && runDFS(nodes[0].id)}
                    disabled={isAnimating || nodes.length === 0}
                    className="w-full mb-2"
                  >
                    {isAnimating && currentAlgorithm === 'DFS' ? 'Running...' : 'Depth-First Search (DFS)'}
                  </Button>
                  <p className="text-sm text-gray-600">
                    Explores as far as possible along each branch before backtracking
                  </p>
                </div>
                <div>
                  <Button
                    onClick={() => nodes.length > 0 && runBFS(nodes[0].id)}
                    disabled={isAnimating || nodes.length === 0}
                    variant="outline"
                    className="w-full mb-2"
                  >
                    {isAnimating && currentAlgorithm === 'BFS' ? 'Running...' : 'Breadth-First Search (BFS)'}
                  </Button>
                  <p className="text-sm text-gray-600">
                    Explores all neighbors at the current depth before moving to deeper levels
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold mb-3">Algorithm Status</h4>
              {currentAlgorithm ? (
                <div className="space-y-2">
                  <Badge variant="secondary">{currentAlgorithm} Active</Badge>
                  <p className="text-sm text-gray-600">
                    Visited Nodes: {visitedNodes.size} / {nodes.length}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${nodes.length > 0 ? (visitedNodes.size / nodes.length) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No algorithm running</p>
              )}
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="p-4">
              <h4 className="font-semibold mb-2">Basic Properties</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Nodes (Vertices):</span>
                  <Badge variant="outline">{graphStats.nodes}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Edges:</span>
                  <Badge variant="outline">{graphStats.edges}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Connected:</span>
                  <Badge variant={graphStats.isConnected ? "default" : "destructive"}>
                    {graphStats.isConnected ? "Yes" : "No"}
                  </Badge>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold mb-2">Degree Analysis</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Max Degree:</span>
                  <Badge variant="outline">{graphStats.maxDegree}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Min Degree:</span>
                  <Badge variant="outline">{graphStats.minDegree}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Avg Degree:</span>
                  <Badge variant="outline">{graphStats.avgDegree}</Badge>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold mb-2">Graph Density</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Density:</span>
                  <Badge variant="outline">{(graphStats.density * 100).toFixed(1)}%</Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${graphStats.density * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600">
                  Ratio of existing edges to possible edges
                </p>
              </div>
            </Card>
          </div>

          <Card className="p-4">
            <h4 className="font-semibold mb-3">Graph Theory Concepts</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-medium mb-2">Key Definitions:</h5>
                <ul className="space-y-1 text-gray-600">
                  <li><strong>Vertex/Node:</strong> A point in the graph</li>
                  <li><strong>Edge:</strong> A connection between two vertices</li>
                  <li><strong>Degree:</strong> Number of edges connected to a vertex</li>
                  <li><strong>Path:</strong> A sequence of vertices connected by edges</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium mb-2">Graph Types:</h5>
                <ul className="space-y-1 text-gray-600">
                  <li><strong>Connected:</strong> Path exists between all vertex pairs</li>
                  <li><strong>Complete:</strong> Every vertex connects to every other</li>
                  <li><strong>Tree:</strong> Connected graph with no cycles</li>
                  <li><strong>Bipartite:</strong> Vertices can be colored with two colors</li>
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </Card>
  );
} 