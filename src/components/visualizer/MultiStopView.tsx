import React, { useState } from 'react';
import { solveTSPHeldKarp, solveTSPNearestNeighbor, TSPStop, TSPResult } from '../../algorithms/tsp';
import { Play, Truck, RefreshCw, Plus, Zap, Trophy } from 'lucide-react';
import { soundFX } from '../../utils/SoundFX';

const INITIAL_STOPS: TSPStop[] = [
  { id: 'rider', name: 'Rider Hub 🛵 (Origin)', x: 70, y: 70 },
  { id: 'rest_1', name: 'Burger King 🍔', x: 220, y: 130 },
  { id: 'rest_2', name: 'Pizza Hut 🍕', x: 380, y: 90 },
  { id: 'cust_1', name: 'Customer A 📦 (Mall Road)', x: 190, y: 310 },
  { id: 'cust_2', name: 'Customer B 📦 (Swaroop Nagar)', x: 460, y: 240 },
  { id: 'cust_3', name: 'Customer C 📦 (Civil Lines)', x: 320, y: 360 },
];

export const MultiStopView: React.FC = () => {
  const [stops, setStops] = useState<TSPStop[]>(INITIAL_STOPS);
  const [resultDP, setResultDP] = useState<TSPResult | null>(null);
  const [resultNN, setResultNN] = useState<TSPResult | null>(null);
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);

  const handleSolve = () => {
    soundFX.playSuccessSound();
    const dp = solveTSPHeldKarp(stops);
    const nn = solveTSPNearestNeighbor(stops);
    setResultDP(dp);
    setResultNN(nn);
  };

  const handleAddRandomStop = () => {
    if (stops.length >= 11) {
      alert('Held-Karp Exact DP operates optimally up to 11 stops (O(2ⁿ · n²)).');
      return;
    }
    const id = `stop_${Date.now()}`;
    const names = [
      'Subway 🥪', 'Taco Bell 🌮', 'Starbucks ☕', 'KFC 🍗',
      'Customer D 📦', 'Customer E 📦', 'Customer F 📦', 'Darkstore Hub 🏬'
    ];
    const name = `${names[stops.length % names.length]} #${stops.length}`;
    const x = Math.floor(Math.random() * 450) + 50;
    const y = Math.floor(Math.random() * 300) + 50;
    setStops(prev => [...prev, { id, name, x, y }]);
    setResultDP(null);
    setResultNN(null);
  };

  const handleResetStops = () => {
    setStops(INITIAL_STOPS);
    setResultDP(null);
    setResultNN(null);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-white/10 shadow-card-light dark:shadow-card-dark flex flex-wrap justify-between items-center gap-4 transition-colors">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-brand-amber/10 text-brand-amber border border-brand-amber/20">
              <Zap className="w-4 h-4" />
            </span>
            <h2 className="font-mono text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">
              MULTI-STOP LOGISTICS TOUR OPTIMIZER (TSP ENGINE)
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5">
            Computes exact global optimal delivery tour sequence (Held-Karp Dynamic Programming) vs Greedy Heuristics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleAddRandomStop}
            className="flex items-center gap-1.5 bg-white dark:bg-dark-900 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white font-mono text-xs font-semibold px-3.5 py-2 rounded-xl border border-slate-300 dark:border-white/10 hover:border-brand-cyan/40 hover:bg-slate-50 dark:hover:bg-white/5 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4 text-brand-cyan" />
            <span>Add Delivery Stop</span>
          </button>

          <button
            onClick={handleResetStops}
            className="flex items-center gap-1.5 bg-white dark:bg-dark-900 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white font-mono text-xs font-semibold px-3.5 py-2 rounded-xl border border-slate-300 dark:border-white/10 hover:border-slate-400 transition-all shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset Stops</span>
          </button>

          <button
            onClick={handleSolve}
            className="flex items-center gap-2 bg-gradient-to-r from-brand-amber via-brand-rose to-brand-indigo text-dark-950 font-mono text-xs font-bold px-5 py-2 rounded-xl shadow-glow-amber/20 shadow-lg hover:brightness-110 cursor-pointer transition-all uppercase"
          >
            <Play className="w-4 h-4 fill-dark-950" />
            <span>OPTIMIZE RIDER TOUR (HELD-KARP DP)</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Interactive Coordinate Canvas */}
        <div className="lg:col-span-2 glass-panel p-4 rounded-2xl border border-slate-200 dark:border-white/10 shadow-card-light dark:shadow-card-dark flex flex-col justify-between transition-colors">
          <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-200 dark:border-white/10 text-xs font-mono text-slate-700 dark:text-slate-300">
            <span>DRAG MARKERS OR CLICK "ADD STOP" TO REPOSITION</span>
            <span className="text-brand-amber font-bold">{stops.length} ACTIVE STOPS</span>
          </div>

          <div 
            className="w-full h-[420px] bg-slate-100 dark:bg-dark-900/90 rounded-xl border border-slate-300 dark:border-white/10 relative overflow-hidden select-none shadow-inner transition-colors"
            onMouseMove={(e) => {
              if (draggingIdx !== null) {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = Math.max(30, Math.min(rect.width - 30, e.clientX - rect.left));
                const y = Math.max(30, Math.min(rect.height - 30, e.clientY - rect.top));
                setStops(prev => {
                  const next = [...prev];
                  next[draggingIdx] = { ...next[draggingIdx], x, y };
                  return next;
                });
              }
            }}
            onMouseUp={() => setDraggingIdx(null)}
            onMouseLeave={() => setDraggingIdx(null)}
          >
            {/* Ambient grid background */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#6366F1_1px,transparent_1px)] [background-size:16px_16px]"></div>

            {/* SVG Path Lines */}
            {resultDP && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {resultDP.path.map((currIdx, i) => {
                  if (i === resultDP.path.length - 1) return null;
                  const nextIdx = resultDP.path[i + 1];
                  const p1 = stops[currIdx];
                  const p2 = stops[nextIdx];
                  if (!p1 || !p2) return null;

                  return (
                    <g key={i}>
                      <line
                        x1={p1.x}
                        y1={p1.y}
                        x2={p2.x}
                        y2={p2.y}
                        stroke="#F59E0B"
                        strokeWidth="3.5"
                        strokeDasharray="8 5"
                        className="animate-pulse"
                      />
                    </g>
                  );
                })}
              </svg>
            )}

            {/* Stop Markers */}
            {stops.map((stop, idx) => {
              const isOrigin = idx === 0;
              return (
                <div
                  key={stop.id}
                  style={{ left: `${stop.x}px`, top: `${stop.y}px` }}
                  onMouseDown={() => setDraggingIdx(idx)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing group flex flex-col items-center`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-extrabold border-2 transition-all shadow-lg ${
                    isOrigin
                      ? 'bg-brand-emerald text-dark-950 border-emerald-300 shadow-glow-emerald scale-110 z-20'
                      : 'bg-white dark:bg-dark-850 text-slate-900 dark:text-white border-brand-amber/80 shadow-glow-amber/40 hover:scale-115 z-10'
                  }`}>
                    {isOrigin ? <Truck className="w-4 h-4" /> : idx}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-800 dark:text-slate-200 bg-white/95 dark:bg-dark-950/90 px-2 py-0.5 rounded-md border border-slate-300 dark:border-white/10 mt-1 whitespace-nowrap shadow-md pointer-events-none">
                    {stop.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Algorithm Comparison Telemetry */}
        <div className="flex flex-col gap-4">
          {/* Held Karp Exact DP */}
          <div className="glass-panel p-4 rounded-2xl border border-brand-amber/30 shadow-card-light dark:shadow-card-dark bg-brand-amber/5">
            <div className="flex justify-between items-center pb-2.5 border-b border-slate-200 dark:border-white/10 mb-3">
              <h3 className="font-mono text-xs font-bold text-brand-amber uppercase tracking-wider flex items-center gap-1.5">
                <Trophy className="w-4 h-4" /> HELD-KARP DP (GLOBAL OPTIMAL)
              </h3>
              <span className="text-[9px] font-mono bg-brand-amber/20 text-brand-amber font-bold px-2 py-0.5 rounded-full border border-brand-amber/30">
                EXACT
              </span>
            </div>

            {resultDP ? (
              <div className="space-y-3 font-mono text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white/90 dark:bg-dark-900/90 p-2.5 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
                    <span className="text-slate-500 dark:text-slate-400 text-[10px] block">TOTAL TOUR DISTANCE</span>
                    <strong className="text-base text-brand-amber font-bold">{resultDP.totalDistance} km</strong>
                  </div>
                  <div className="bg-white/90 dark:bg-dark-900/90 p-2.5 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
                    <span className="text-slate-500 dark:text-slate-400 text-[10px] block">COMPUTE TIME</span>
                    <strong className="text-base text-brand-cyan font-bold">{resultDP.computationTimeMs} ms</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-white/10">
                  <span className="text-slate-600 dark:text-slate-400 text-[10px] font-bold block mb-1.5 uppercase">
                    OPTIMIZED DELIVERY SEQUENCE:
                  </span>
                  <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                    {resultDP.stopsSequence.map((s, i) => (
                      <div key={i} className="flex items-center gap-2 p-1 rounded-lg bg-slate-100 dark:bg-white/5 text-[11px] text-slate-800 dark:text-slate-200">
                        <span className="w-4 h-4 rounded-full bg-brand-amber/20 text-brand-amber flex items-center justify-center font-bold text-[9px]">
                          {i + 1}
                        </span>
                        <span>{s.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="font-sans text-xs text-slate-500 dark:text-slate-400">Click "OPTIMIZE RIDER TOUR" to compute exact DP sequence.</p>
            )}
          </div>

          {/* Nearest Neighbor Greedy */}
          <div className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-white/10 shadow-card-light dark:shadow-card-dark">
            <h3 className="font-mono text-xs font-bold text-slate-800 dark:text-slate-300 mb-2 pb-2 border-b border-slate-200 dark:border-white/10 uppercase">
              NEAREST NEIGHBOR (GREEDY HEURISTIC)
            </h3>
            {resultNN ? (
              <div className="space-y-2 font-mono text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white/90 dark:bg-dark-900/90 p-2.5 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
                    <span className="text-slate-500 dark:text-slate-400 text-[10px] block">HEURISTIC DISTANCE</span>
                    <strong className="text-base text-slate-800 dark:text-slate-200">{resultNN.totalDistance} km</strong>
                  </div>
                  <div className="bg-white/90 dark:bg-dark-900/90 p-2.5 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
                    <span className="text-slate-500 dark:text-slate-400 text-[10px] block">COMPUTE TIME</span>
                    <strong className="text-base text-brand-cyan">{resultNN.computationTimeMs} ms</strong>
                  </div>
                </div>
                {resultDP && (
                  <p className="text-[11px] font-sans text-brand-emerald pt-1 font-semibold">
                    ✓ Held-Karp saved {(resultNN.totalDistance - resultDP.totalDistance).toFixed(1)} km over naive greedy routing.
                  </p>
                )}
              </div>
            ) : (
              <p className="font-sans text-xs text-slate-500 dark:text-slate-400">Heuristic baseline benchmark ready.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
