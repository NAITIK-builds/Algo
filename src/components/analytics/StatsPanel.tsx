import React from 'react';
import { useVisualizer } from '../../context/VisualizerContext';
import { Activity, Route, TrendingUp, Clock, CheckCircle2 } from 'lucide-react';

export const StatsPanel: React.FC = () => {
  const { stats, algorithm, grid } = useVisualizer();

  const totalCells = grid.length * (grid[0]?.length || 1);
  const explorationPct = totalCells > 0 ? ((stats.visitedCount / totalCells) * 100).toFixed(1) : '0.0';

  return (
    <div className="ui-panel p-4 rounded-xl flex flex-col gap-3 transition-colors">
      {/* Header */}
      <div className="flex justify-between items-center pb-2.5 border-b border-slate-200 dark:border-dark-800">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-brand-primary" />
          <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Execution Metrics
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-dark-850 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-dark-750 uppercase">
            {algorithm}
          </span>
        </div>
      </div>

      {/* 4 Clean Metric Cards */}
      <div className="grid grid-cols-2 gap-2.5">
        
        {/* 1. Evaluated Nodes */}
        <div className="p-3 rounded-lg bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-dark-800">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-[11px]">
            <span>Evaluated Nodes</span>
            <span className="font-mono text-[10px]">{explorationPct}%</span>
          </div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
              {stats.visitedCount}
            </span>
            <span className="text-xs text-slate-500">nodes</span>
          </div>
          <div className="mt-2 w-full bg-slate-200 dark:bg-dark-800 h-1.5 rounded-full overflow-hidden">
            <div 
              style={{ width: `${Math.min(100, Number(explorationPct))}%` }} 
              className="bg-brand-primary h-full rounded-full transition-all duration-300"
            />
          </div>
        </div>

        {/* 2. Path Length */}
        <div className="p-3 rounded-lg bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-dark-800">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-[11px]">
            <span>Path Length</span>
            <Route className="w-3.5 h-3.5 text-brand-emerald" />
          </div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-mono text-brand-emerald">
              {stats.pathLength}
            </span>
            <span className="text-xs text-slate-500">steps</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-1 truncate">
            {stats.pathLength > 0 ? (
              <span className="text-brand-emerald flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3 h-3" /> Optimal route found
              </span>
            ) : (
              <span>Pending execution...</span>
            )}
          </div>
        </div>

        {/* 3. Cumulative Friction Cost */}
        <div className="p-3 rounded-lg bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-dark-800">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-[11px]">
            <span>Total Friction Cost</span>
            <TrendingUp className="w-3.5 h-3.5 text-brand-amber" />
          </div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
              {stats.totalCost}
            </span>
            <span className="text-xs text-slate-500">units</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 truncate">
            Includes terrain weights (+2, +5, +10)
          </div>
        </div>

        {/* 4. Execution Time */}
        <div className="p-3 rounded-lg bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-dark-800">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-[11px]">
            <span>Computation Latency</span>
            <Clock className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
              {stats.executionTimeMs}
            </span>
            <span className="text-xs text-slate-500">ms</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 truncate">
            Native JS engine benchmark
          </div>
        </div>

      </div>
    </div>
  );
};
