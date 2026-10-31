import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  solveTSPHeldKarp, 
  solveTSPNearestNeighbor, 
  solveTSP2Opt, 
  TSPStop, 
  TSPResult 
} from '../../algorithms/tsp';
import { 
  Play, 
  Truck, 
  RotateCcw, 
  Plus, 
  MapPin, 
  CheckCircle2, 
  Layers, 
  Zap, 
  TrendingDown, 
  Sparkles, 
  Trash2, 
  Award,
  Navigation,
  ArrowRight,
  Package
} from 'lucide-react';
import { soundFX } from '../../utils/SoundFX';

const PRESET_SCENARIOS: Record<string, { name: string; stops: TSPStop[] }> = {
  food_rush: {
    name: 'Swiggy Food Dispatch (6 Stops)',
    stops: [
      { id: 'depot', name: 'Central Cloud Kitchen Depot', x: 80, y: 80, type: 'depot' },
      { id: 'rest_1', name: 'Biryani Hub', x: 260, y: 120, type: 'restaurant' },
      { id: 'rest_2', name: 'Pizza Express', x: 440, y: 90, type: 'restaurant' },
      { id: 'cust_1', name: 'Customer (Civil Lines)', x: 210, y: 310, type: 'customer' },
      { id: 'cust_2', name: 'Customer (Kakadeo)', x: 480, y: 260, type: 'customer' },
      { id: 'cust_3', name: 'Customer (Swaroop Nagar)', x: 330, y: 380, type: 'customer' },
    ]
  },
  ecommerce_cluster: {
    name: 'Amazon Parcel Cluster (8 Stops)',
    stops: [
      { id: 'depot', name: 'Logistics Fulfillment Center', x: 70, y: 220, type: 'depot' },
      { id: 'hub_1', name: 'Tech Park Locker', x: 190, y: 80, type: 'customer' },
      { id: 'hub_2', name: 'University Campus', x: 360, y: 60, type: 'customer' },
      { id: 'hub_3', name: 'Residential Tower A', x: 520, y: 140, type: 'customer' },
      { id: 'hub_4', name: 'Metro Plaza Hub', x: 560, y: 310, type: 'customer' },
      { id: 'hub_5', name: 'Green Park Villa', x: 410, y: 390, type: 'customer' },
      { id: 'hub_6', name: 'Commercial Square', x: 240, y: 360, type: 'customer' },
      { id: 'hub_7', name: 'Executive Residency', x: 340, y: 220, type: 'customer' },
    ]
  },
  greedy_trap: {
    name: 'Greedy Trap (Forces Suboptimal Detour)',
    stops: [
      { id: 'depot', name: 'Origin Depot', x: 60, y: 60, type: 'depot' },
      { id: 'p_1', name: 'Waypoint Alpha', x: 210, y: 70, type: 'customer' },
      { id: 'p_2', name: 'Waypoint Beta', x: 220, y: 220, type: 'customer' },
      { id: 'p_3', name: 'Waypoint Gamma', x: 540, y: 230, type: 'customer' },
      { id: 'p_4', name: 'Waypoint Delta', x: 530, y: 80, type: 'customer' },
      { id: 'p_5', name: 'Waypoint Epsilon', x: 370, y: 360, type: 'customer' },
      { id: 'p_6', name: 'Waypoint Zeta', x: 120, y: 340, type: 'customer' },
    ]
  }
};

type ActiveTourMode = 'held_karp' | 'two_opt' | 'nearest_neighbor' | 'overlay';

export const MultiStopView: React.FC = () => {
  const [stops, setStops] = useState<TSPStop[]>(PRESET_SCENARIOS.food_rush.stops);
  const [activePreset, setActivePreset] = useState<string>('food_rush');
  const [tourMode, setTourMode] = useState<ActiveTourMode>('held_karp');
  
  // Results
  const [resultDP, setResultDP] = useState<TSPResult | null>(null);
  const [result2Opt, setResult2Opt] = useState<TSPResult | null>(null);
  const [resultNN, setResultNN] = useState<TSPResult | null>(null);
  
  // Interactive State
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);
  const [hoveredStopIdx, setHoveredStopIdx] = useState<number | null>(null);
  
  // Delivery Vehicle Simulation State
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [vanPosition, setVanPosition] = useState<{ x: number; y: number } | null>(null);
  const [vanAngle, setVanAngle] = useState<number>(0);
  const [deliveredStopIds, setDeliveredStopIds] = useState<Set<string>>(new Set());
  const [currentCargoCount, setCurrentCargoCount] = useState<number>(0);
  const [simOdometer, setSimOdometer] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const simulationTimerRef = useRef<number | null>(null);

  // Compute All 3 Routing Algorithms (DP, 2-Opt, Greedy)
  const handleSolve = () => {
    soundFX.playSuccessSound();
    
    // Stop any ongoing simulation
    if (simulationTimerRef.current) {
      clearInterval(simulationTimerRef.current);
      simulationTimerRef.current = null;
    }
    setIsSimulating(false);
    setVanPosition(null);
    setDeliveredStopIds(new Set());

    const dp = solveTSPHeldKarp(stops);
    const twoOpt = solveTSP2Opt(stops);
    const nn = solveTSPNearestNeighbor(stops);

    setResultDP(dp);
    setResult2Opt(twoOpt);
    setResultNN(nn);
  };

  // Click on Canvas to Add a Waypoint
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // If dragging or clicked an existing element, don't drop
    if (draggingIdx !== null) return;
    if ((e.target as HTMLElement).closest('.stop-marker-node')) return;

    if (stops.length >= 11) {
      alert('Held-Karp Exact DP operates optimally up to 11 stops (O(2ⁿ · n²)). Delete a stop to add more.');
      return;
    }

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);

    const newStop: TSPStop = {
      id: `stop_${Date.now()}`,
      name: `Waypoint #${stops.length}`,
      x: Math.max(30, Math.min(rect.width - 30, x)),
      y: Math.max(30, Math.min(rect.height - 30, y)),
      type: 'customer'
    };

    soundFX.playStepSound(360);
    setStops(prev => [...prev, newStop]);
    setResultDP(null);
    setResult2Opt(null);
    setResultNN(null);
  };

  // Delete Individual Waypoint
  const handleDeleteStop = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (idx === 0) {
      alert('Origin Depot cannot be removed.');
      return;
    }
    setStops(prev => prev.filter((_, i) => i !== idx));
    setResultDP(null);
    setResult2Opt(null);
    setResultNN(null);
    soundFX.playStepSound(200);
  };

  // Load Scenario Preset
  const handleSelectPreset = (key: string) => {
    setActivePreset(key);
    setStops(PRESET_SCENARIOS[key].stops);
    setResultDP(null);
    setResult2Opt(null);
    setResultNN(null);
    setIsSimulating(false);
    setVanPosition(null);
    setDeliveredStopIds(new Set());
  };

  // Reset to default
  const handleResetStops = () => {
    handleSelectPreset('food_rush');
  };

  // Live Delivery Van Simulation
  const handleSimulateTour = () => {
    const activeResult = tourMode === 'nearest_neighbor' ? resultNN : (resultDP || result2Opt);
    if (!activeResult || activeResult.path.length < 2) return;

    if (simulationTimerRef.current) {
      clearInterval(simulationTimerRef.current);
    }

    setIsSimulating(true);
    setDeliveredStopIds(new Set());
    setCurrentCargoCount(stops.length - 1);
    setSimOdometer(0);

    const tourPath = activeResult.path;
    const stepsPerEdge = 25;
    const pathPoints: { x: number; y: number; angle: number; stopId?: string }[] = [];

    for (let i = 0; i < tourPath.length - 1; i++) {
      const p1 = stops[tourPath[i]];
      const p2 = stops[tourPath[i + 1]];
      if (!p1 || !p2) continue;

      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const angle = (Math.atan2(dy, dx) * 180 / Math.PI);

      for (let s = 0; s < stepsPerEdge; s++) {
        const ratio = s / stepsPerEdge;
        pathPoints.push({
          x: p1.x + dx * ratio,
          y: p1.y + dy * ratio,
          angle
        });
      }

      // Reached waypoint stop
      pathPoints.push({
        x: p2.x,
        y: p2.y,
        angle,
        stopId: p2.id
      });
    }

    let currentStep = 0;
    const totalSteps = pathPoints.length;
    const deliveredSet = new Set<string>();

    simulationTimerRef.current = window.setInterval(() => {
      if (currentStep >= totalSteps) {
        if (simulationTimerRef.current) {
          clearInterval(simulationTimerRef.current);
          simulationTimerRef.current = null;
        }
        setIsSimulating(false);
        setSimOdometer(activeResult.totalDistance);
        soundFX.playSuccessSound();
        return;
      }

      const point = pathPoints[currentStep];
      setVanPosition({ x: point.x, y: point.y });
      setVanAngle(point.angle);

      // Check if arriving at a stop
      if (point.stopId && point.stopId !== stops[0].id && !deliveredSet.has(point.stopId)) {
        deliveredSet.add(point.stopId);
        setDeliveredStopIds(new Set(deliveredSet));
        setCurrentCargoCount(prev => Math.max(0, prev - 1));
        soundFX.playStepSound(480);
      }

      const distProgress = (currentStep / totalSteps) * activeResult.totalDistance;
      setSimOdometer(parseFloat(distProgress.toFixed(1)));

      currentStep++;
    }, 35);
  };

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (simulationTimerRef.current) {
        clearInterval(simulationTimerRef.current);
      }
    };
  }, []);

  // Compute Efficiency Comparison
  const efficiency = useMemo(() => {
    if (!resultDP || !resultNN) return null;
    const diff = resultNN.totalDistance - resultDP.totalDistance;
    const pct = ((diff / (resultNN.totalDistance || 1)) * 100).toFixed(1);
    const fuelSaved = (diff * 0.12).toFixed(2); // ~0.12L per km city van average
    return {
      distanceSaved: parseFloat(diff.toFixed(1)),
      percentSaved: pct,
      fuelSaved,
      crossoverDiff: (resultNN.crossovers || 0) - (resultDP.crossovers || 0)
    };
  }, [resultDP, resultNN]);

  return (
    <div className="flex flex-col gap-4">
      {/* 1. Top Controls & Scenario Bar */}
      <div className="ui-panel p-4 rounded-xl flex flex-wrap justify-between items-center gap-4 transition-colors">
        <div>
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-brand-primary" />
            <h2 className="text-base font-semibold text-slate-900 dark:text-white tracking-tight">
              Multi-Stop Delivery Route Dispatcher (TSP)
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Traveling Salesperson Problem solver comparing exact Held-Karp Bitmask DP, 2-Opt local search, and Nearest Neighbor greedy heuristics.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Preset Scenario Selector */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-dark-900 p-0.5 rounded-lg border border-slate-200 dark:border-dark-800 text-xs">
            {Object.entries(PRESET_SCENARIOS).map(([key, val]) => (
              <button
                key={key}
                onClick={() => handleSelectPreset(key)}
                className={`px-2.5 py-1.5 rounded-md font-medium transition-colors ${
                  activePreset === key
                    ? 'bg-white dark:bg-dark-800 text-brand-primary dark:text-white shadow-subtle font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {val.name.split(' ')[0]}
              </button>
            ))}
          </div>

          <button
            onClick={handleResetStops}
            className="flex items-center gap-1.5 bg-white dark:bg-dark-900 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-medium px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-800 transition-colors cursor-pointer"
            title="Reset Stops"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset</span>
          </button>

          <button
            onClick={handleSolve}
            className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primaryHover text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm shadow-brand-primary/25 transition-all cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Solve Tours (Held-Karp & 2-Opt)</span>
          </button>
        </div>
      </div>

      {/* 2. Interactive Coordinate Canvas & Telemetry Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* Interactive 2D Waypoint Canvas (8 Columns) */}
        <div className="lg:col-span-8 ui-panel p-4 rounded-xl flex flex-col justify-between transition-colors">
          
          {/* Canvas Sub-Header: Mode Switcher & Instructions */}
          <div className="flex flex-wrap justify-between items-center mb-3 pb-2.5 border-b border-slate-200 dark:border-dark-800 text-xs gap-2">
            <span className="flex items-center gap-1.5 text-slate-500 text-[11px]">
              <MapPin className="w-3.5 h-3.5 text-brand-primary" />
              Click empty canvas to drop waypoint • Drag pins to reshape tour
            </span>

            {/* Tour Visualizer Mode Switcher */}
            {(resultDP || resultNN) && (
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-dark-900 p-0.5 rounded-lg border border-slate-200 dark:border-dark-800 text-xs">
                <button
                  onClick={() => setTourMode('held_karp')}
                  className={`px-2 py-1 rounded font-medium text-[11px] transition-colors ${
                    tourMode === 'held_karp'
                      ? 'bg-brand-primary text-white font-semibold'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Held-Karp (Optimal)
                </button>
                <button
                  onClick={() => setTourMode('two_opt')}
                  className={`px-2 py-1 rounded font-medium text-[11px] transition-colors ${
                    tourMode === 'two_opt'
                      ? 'bg-brand-emerald text-white font-semibold'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  2-Opt Search
                </button>
                <button
                  onClick={() => setTourMode('nearest_neighbor')}
                  className={`px-2 py-1 rounded font-medium text-[11px] transition-colors ${
                    tourMode === 'nearest_neighbor'
                      ? 'bg-amber-600 text-white font-semibold'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Greedy Heuristic
                </button>
                <button
                  onClick={() => setTourMode('overlay')}
                  className={`px-2 py-1 rounded font-medium text-[11px] transition-colors ${
                    tourMode === 'overlay'
                      ? 'bg-purple-600 text-white font-semibold'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Dual Overlay
                </button>
              </div>
            )}
          </div>

          {/* Canvas Viewport */}
          <div 
            ref={containerRef}
            onClick={handleCanvasClick}
            onMouseMove={(e) => {
              if (draggingIdx !== null && containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const x = Math.max(35, Math.min(rect.width - 35, e.clientX - rect.left));
                const y = Math.max(35, Math.min(rect.height - 35, e.clientY - rect.top));
                setStops(prev => {
                  const next = [...prev];
                  next[draggingIdx] = { ...next[draggingIdx], x, y };
                  return next;
                });
              }
            }}
            onMouseUp={() => setDraggingIdx(null)}
            onMouseLeave={() => setDraggingIdx(null)}
            className="w-full h-[480px] bg-slate-50 dark:bg-dark-950 rounded-xl border border-slate-200 dark:border-dark-800 relative overflow-hidden select-none cursor-crosshair transition-colors"
          >
            {/* Subtle Blueprint Grid Pattern */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#94A3B8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

            {/* SVG Tour Path Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              
              {/* Layer 1: Nearest Neighbor (Greedy) Dotted Line */}
              {(tourMode === 'nearest_neighbor' || tourMode === 'overlay') && resultNN && (
                resultNN.path.map((currIdx, i) => {
                  if (i === resultNN.path.length - 1) return null;
                  const nextIdx = resultNN.path[i + 1];
                  const p1 = stops[currIdx];
                  const p2 = stops[nextIdx];
                  if (!p1 || !p2) return null;

                  return (
                    <line
                      key={`nn-${i}`}
                      x1={p1.x}
                      y1={p1.y}
                      x2={p2.x}
                      y2={p2.y}
                      stroke="#F59E0B"
                      strokeWidth={tourMode === 'overlay' ? '2' : '3'}
                      strokeDasharray="6 5"
                      opacity={tourMode === 'overlay' ? '0.7' : '1'}
                    />
                  );
                })
              )}

              {/* Layer 2: 2-Opt Local Search Line */}
              {tourMode === 'two_opt' && result2Opt && (
                result2Opt.path.map((currIdx, i) => {
                  if (i === result2Opt.path.length - 1) return null;
                  const nextIdx = result2Opt.path[i + 1];
                  const p1 = stops[currIdx];
                  const p2 = stops[nextIdx];
                  if (!p1 || !p2) return null;

                  return (
                    <line
                      key={`2opt-${i}`}
                      x1={p1.x}
                      y1={p1.y}
                      x2={p2.x}
                      y2={p2.y}
                      stroke="#10B981"
                      strokeWidth="3.5"
                    />
                  );
                })
              )}

              {/* Layer 3: Held-Karp Optimal Solid Glowing Tour */}
              {(tourMode === 'held_karp' || tourMode === 'overlay') && resultDP && (
                resultDP.path.map((currIdx, i) => {
                  if (i === resultDP.path.length - 1) return null;
                  const nextIdx = resultDP.path[i + 1];
                  const p1 = stops[currIdx];
                  const p2 = stops[nextIdx];
                  if (!p1 || !p2) return null;

                  return (
                    <g key={`dp-${i}`}>
                      {/* Glow */}
                      <line
                        x1={p1.x}
                        y1={p1.y}
                        x2={p2.x}
                        y2={p2.y}
                        stroke="#4F46E5"
                        strokeWidth="8"
                        opacity="0.25"
                      />
                      {/* Core */}
                      <line
                        x1={p1.x}
                        y1={p1.y}
                        x2={p2.x}
                        y2={p2.y}
                        stroke="#6366F1"
                        strokeWidth="3.5"
                      />
                    </g>
                  );
                })
              )}
            </svg>

            {/* Delivery Van Live Simulation Marker */}
            {vanPosition && (
              <div
                style={{ 
                  left: `${vanPosition.x}px`, 
                  top: `${vanPosition.y}px`,
                  transform: `translate(-50%, -50%) rotate(${vanAngle}deg)`
                }}
                className="absolute z-30 pointer-events-none transition-transform duration-75"
              >
                <div className="w-10 h-10 rounded-full bg-brand-primary text-white border-2 border-white shadow-xl flex items-center justify-center text-lg">
                  🚚
                </div>
              </div>
            )}

            {/* Stop Waypoint Markers */}
            {stops.map((stop, idx) => {
              const isOrigin = idx === 0;
              const isDelivered = deliveredStopIds.has(stop.id);

              return (
                <div
                  key={stop.id}
                  style={{ left: `${stop.x}px`, top: `${stop.y}px` }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    setDraggingIdx(idx);
                  }}
                  onMouseEnter={() => setHoveredStopIdx(idx)}
                  onMouseLeave={() => setHoveredStopIdx(null)}
                  className="stop-marker-node absolute -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing flex flex-col items-center group z-20"
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold border-2 transition-all shadow-md ${
                    isOrigin
                      ? 'bg-brand-emerald text-white border-white scale-110 shadow-emerald-500/30'
                      : isDelivered
                      ? 'bg-emerald-600 text-white border-white scale-105'
                      : stop.type === 'restaurant'
                      ? 'bg-amber-500 text-white border-white'
                      : 'bg-white dark:bg-dark-800 text-slate-900 dark:text-white border-slate-300 dark:border-dark-700'
                  }`}>
                    {isOrigin ? (
                      <Truck className="w-4 h-4" />
                    ) : isDelivered ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      idx
                    )}
                  </div>

                  {/* Stop Name Badge & Delete Action */}
                  <div className="flex items-center gap-1 mt-1 bg-white/95 dark:bg-dark-900/95 px-2 py-0.5 rounded-md border border-slate-200 dark:border-dark-800 shadow-sm text-[10px] font-medium text-slate-800 dark:text-slate-200 whitespace-nowrap pointer-events-auto">
                    <span>{stop.name}</span>
                    {!isOrigin && (
                      <button
                        onClick={(e) => handleDeleteStop(idx, e)}
                        className="opacity-0 group-hover:opacity-100 hover:text-rose-500 transition-opacity ml-0.5 p-0.5"
                        title="Delete Waypoint"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {/* In-Canvas Live Dispatch HUD */}
            {isSimulating && (
              <div className="absolute top-4 left-4 z-40 bg-dark-950/90 text-white backdrop-blur-md px-4 py-2.5 rounded-xl border border-brand-primary/40 shadow-xl flex items-center gap-4 text-xs font-mono animate-fade-in">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-brand-emerald animate-bounce" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block font-sans">Remaining Cargo</span>
                    <span className="text-sm font-bold text-brand-emerald">{currentCargoCount} Deliveries Left</span>
                  </div>
                </div>
                <div className="h-6 w-px bg-slate-700" />
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-sans">Tour Distance</span>
                  <span className="text-sm font-bold text-white font-mono">{simOdometer} km</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Algorithm Telemetry & Comparison Dashboard (4 Columns) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          
          {/* Dispatch Simulation Trigger Card */}
          {(resultDP || result2Opt) && (
            <div className="ui-panel p-4 rounded-xl flex flex-col gap-3 transition-colors bg-gradient-to-br from-brand-primary/5 to-transparent border-brand-primary/20">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
                  Fleet Dispatch Simulator
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-primary/15 text-brand-primary font-bold">
                  Ready
                </span>
              </div>

              <button
                onClick={handleSimulateTour}
                disabled={isSimulating}
                className="w-full flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primaryHover text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm shadow-brand-primary/25 transition-all cursor-pointer disabled:opacity-50"
              >
                <Truck className="w-3.5 h-3.5 fill-current" />
                <span>{isSimulating ? 'Van in Transit...' : 'Dispatch Delivery Van 🚚'}</span>
              </button>
            </div>
          )}

          {/* Efficiency Scorecard (Held-Karp vs Greedy) */}
          {efficiency && (
            <div className="ui-panel p-4 rounded-xl flex flex-col gap-3 transition-colors border-emerald-500/20 bg-emerald-500/5">
              <h3 className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                <TrendingDown className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Optimization Efficiency Scorecard
              </h3>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-white dark:bg-dark-900 border border-emerald-500/20">
                  <span className="text-[10px] text-slate-500 block uppercase font-sans">Distance Saved</span>
                  <strong className="text-base font-bold text-emerald-600 dark:text-emerald-400 block mt-0.5">
                    {efficiency.distanceSaved} km ({efficiency.percentSaved}%)
                  </strong>
                </div>
                <div className="p-2.5 rounded-lg bg-white dark:bg-dark-900 border border-emerald-500/20">
                  <span className="text-[10px] text-slate-500 block uppercase font-sans">Fuel Saved</span>
                  <strong className="text-base font-bold text-emerald-600 dark:text-emerald-400 block mt-0.5">
                    ~{efficiency.fuelSaved} L CO₂
                  </strong>
                </div>
              </div>

              {efficiency.crossoverDiff > 0 && (
                <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 shrink-0" />
                  <span>Held-Karp eliminated <strong>{efficiency.crossoverDiff} self-intersecting loops</strong> made by greedy routing!</span>
                </div>
              )}
            </div>
          )}

          {/* Held-Karp Exact DP Card */}
          <div className="ui-panel p-4 rounded-xl flex flex-col gap-3 transition-colors">
            <div className="flex justify-between items-center pb-2.5 border-b border-slate-200 dark:border-dark-800">
              <div>
                <h3 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
                  Held-Karp Dynamic Programming
                </h3>
                <span className="text-[10px] text-slate-500">Global Minimum Tour (Bitmask DP)</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-primary/10 text-brand-primary font-bold">
                O(2ⁿ · n²)
              </span>
            </div>

            {resultDP ? (
              <div className="space-y-3 font-mono text-xs">
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-dark-800">
                    <span className="text-slate-500 text-[10px] block uppercase font-sans">Distance</span>
                    <strong className="text-sm font-bold text-brand-primary block mt-0.5">{resultDP.totalDistance} km</strong>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-dark-800">
                    <span className="text-slate-500 text-[10px] block uppercase font-sans">Latency</span>
                    <strong className="text-sm font-bold text-slate-900 dark:text-white block mt-0.5">{resultDP.computationTimeMs} ms</strong>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-dark-800">
                    <span className="text-slate-500 text-[10px] block uppercase font-sans">Crosses</span>
                    <strong className="text-sm font-bold text-emerald-500 block mt-0.5">{resultDP.crossovers || 0}</strong>
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-semibold block mb-1.5 font-sans">
                    Optimal Stop Sequence:
                  </span>
                  <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
                    {resultDP.stopsSequence.map((s, i) => (
                      <div key={i} className="flex items-center justify-between p-1.5 rounded-md bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-dark-800 text-[11px] text-slate-700 dark:text-slate-300">
                        <div className="flex items-center gap-1.5 truncate">
                          <span className="w-4 h-4 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-[9px]">
                            {i + 1}
                          </span>
                          <span className="font-medium truncate">{s.name}</span>
                        </div>
                        {i === 0 && <span className="text-[9px] text-emerald-500 font-bold">Depot</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 py-3 text-center font-sans">
                Click "Solve Tours" to compute mathematically optimal path.
              </p>
            )}
          </div>

          {/* 2-Opt Local Search Heuristic Card */}
          <div className="ui-panel p-4 rounded-xl flex flex-col gap-3 transition-colors">
            <div className="flex justify-between items-center pb-2.5 border-b border-slate-200 dark:border-dark-800">
              <div>
                <h3 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
                  2-Opt Local Search
                </h3>
                <span className="text-[10px] text-slate-500">Industry Standard Sub-Tour Reversal</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                O(n²) Untangling
              </span>
            </div>

            {result2Opt ? (
              <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-dark-800">
                  <span className="text-slate-500 text-[10px] block uppercase font-sans">Distance</span>
                  <strong className="text-sm font-bold text-emerald-600 dark:text-emerald-400 block mt-0.5">{result2Opt.totalDistance} km</strong>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-dark-800">
                  <span className="text-slate-500 text-[10px] block uppercase font-sans">Latency</span>
                  <strong className="text-sm font-bold text-slate-900 dark:text-white block mt-0.5">{result2Opt.computationTimeMs} ms</strong>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-dark-800">
                  <span className="text-slate-500 text-[10px] block uppercase font-sans">Crosses</span>
                  <strong className="text-sm font-bold text-emerald-500 block mt-0.5">{result2Opt.crossovers || 0}</strong>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 py-2 text-center font-sans">
                Ready for high-speed local search evaluation.
              </p>
            )}
          </div>

          {/* Nearest Neighbor Greedy Card */}
          <div className="ui-panel p-4 rounded-xl flex flex-col gap-3 transition-colors">
            <div className="flex justify-between items-center pb-2.5 border-b border-slate-200 dark:border-dark-800">
              <div>
                <h3 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
                  Nearest Neighbor (Greedy)
                </h3>
                <span className="text-[10px] text-slate-500">Myopic Baseline Heuristic</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold">
                O(n²)
              </span>
            </div>

            {resultNN ? (
              <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-dark-800">
                  <span className="text-slate-500 text-[10px] block uppercase font-sans">Distance</span>
                  <strong className="text-sm font-bold text-amber-600 dark:text-amber-400 block mt-0.5">{resultNN.totalDistance} km</strong>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-dark-800">
                  <span className="text-slate-500 text-[10px] block uppercase font-sans">Latency</span>
                  <strong className="text-sm font-bold text-slate-900 dark:text-white block mt-0.5">{resultNN.computationTimeMs} ms</strong>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-dark-800">
                  <span className="text-slate-500 text-[10px] block uppercase font-sans">Crosses</span>
                  <strong className="text-sm font-bold text-rose-500 block mt-0.5">{resultNN.crossovers || 0}</strong>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 py-2 text-center font-sans">
                Greedy heuristic baseline ready for comparison.
              </p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
