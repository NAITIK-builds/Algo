import React from 'react';
import { useVisualizer } from '../../context/VisualizerContext';
import { Activity, Navigation, TrendingUp, Gauge, Clock } from 'lucide-react';

export const StatsPanel: React.FC = () => {
  const { stats, algorithm, grid } = useVisualizer();

  const totalCells = grid.length * (grid[0]?.length || 1);
  const explorationPct = totalCells > 0 ? ((stats.visitedCount / totalCells) * 100).toFixed(1) : '0.0';

  return (
    <div className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-white/10 shadow-card-light dark:shadow-card-dark flex flex-col gap-3.5 transition-all">
      {/* Header */}
      <div className="flex justify-between items-center pb-2.5 border-b border-slate-200 dark:border-white/10">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20">
            <Activity className="w-4 h-4" />
          </div>
          <h3 className="font-mono text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            REALTIME TELEMETRY HUD
          </h3>
        </div>
        <span className="font-mono text-[10px] bg-brand-cyan/10 text-brand-cyan font-bold px-2.5 py-1 rounded-full border border-brand-cyan/30 uppercase tracking-wide">
          {algorithm}
        </span>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 gap-2.5 font-mono">
        <div className="bg-white/90 dark:bg-dark-900/80 p-3 rounded-xl border border-slate-200 dark:border-white/10 relative overflow-hidden group hover:border-brand-cyan/30 transition-all shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">NODES VISITED</span>
            <Gauge className="w-3.5 h-3.5 text-brand-cyan opacity-80" />
          </div>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-xl sm:text-2xl font-extrabold text-brand-cyan font-mono">
              {stats.visitedCount}
            </span>
            <span className="text-[10px] text-slate-500">nodes</span>
          </div>
          <div className="mt-1.5 w-full bg-slate-200 dark:bg-white/5 h-1 rounded-full overflow-hidden">
            <div 
              style={{ width: `${Math.min(100, Number(explorationPct))}%` }} 
              className="bg-brand-cyan h-full rounded-full transition-all duration-300"
            ></div>
          </div>
          <span className="text-[9px] text-slate-500 block mt-1">{explorationPct}% grid evaluated</span>
        </div>

        <div className="bg-white/90 dark:bg-dark-900/80 p-3 rounded-xl border border-slate-200 dark:border-white/10 relative overflow-hidden group hover:border-brand-emerald/30 transition-all shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">PATH LENGTH</span>
            <Navigation className="w-3.5 h-3.5 text-brand-emerald opacity-80" />
          </div>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-xl sm:text-2xl font-extrabold text-brand-emerald font-mono">
              {stats.pathLength}
            </span>
            <span className="text-[10px] text-slate-500">steps</span>
          </div>
          <span className="text-[9px] text-slate-500 block mt-2">
            {stats.pathLength > 0 ? 'Optimal path locked' : 'Calculating route...'}
          </span>
        </div>

        <div className="bg-white/90 dark:bg-dark-900/80 p-3 rounded-xl border border-slate-200 dark:border-white/10 relative overflow-hidden group hover:border-brand-amber/30 transition-all shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">TOTAL ROUTE COST</span>
            <TrendingUp className="w-3.5 h-3.5 text-brand-amber opacity-80" />
          </div>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-xl sm:text-2xl font-extrabold text-brand-amber font-mono">
              {stats.totalCost}
            </span>
            <span className="text-[10px] text-slate-500">cost units</span>
          </div>
          <span className="text-[9px] text-slate-500 block mt-2">Includes traffic penalties</span>
        </div>

        <div className="bg-white/90 dark:bg-dark-900/80 p-3 rounded-xl border border-slate-200 dark:border-white/10 relative overflow-hidden group hover:border-brand-indigo/30 transition-all shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">EXECUTION TIME</span>
            <Clock className="w-3.5 h-3.5 text-brand-indigo dark:text-brand-indigoLight opacity-80" />
          </div>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-xl sm:text-2xl font-extrabold text-brand-indigo dark:text-brand-indigoLight font-mono">
              {stats.executionTimeMs}
            </span>
            <span className="text-[10px] text-slate-500">ms</span>
          </div>
          <span className="text-[9px] text-slate-500 block mt-2">Real-time compute</span>
        </div>
      </div>
    </div>
  );
};
