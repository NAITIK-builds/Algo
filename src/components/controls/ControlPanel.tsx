import React from 'react';
import { useVisualizer } from '../../context/VisualizerContext';
import { AlgorithmType, ToolType } from '../../types/routing';
import { generatePresetScenario } from '../../utils/gridGenerator';
import { 
  Navigation, 
  Store, 
  ShoppingBag, 
  ShieldAlert, 
  Car, 
  Truck, 
  Eraser, 
  Zap, 
  Sparkles,
  ChevronDown
} from 'lucide-react';

export const ControlPanel: React.FC = () => {
  const {
    algorithm, setAlgorithm,
    activeTool, setActiveTool,
    setGrid,
    isRunning
  } = useVisualizer();

  const tools: { id: ToolType; label: string; icon: React.ReactNode; colorClass: string }[] = [
    { 
      id: 'START', 
      label: 'Rider 🛵', 
      icon: <Navigation className="w-4 h-4 text-brand-emerald" />, 
      colorClass: 'hover:border-brand-emerald/50' 
    },
    { 
      id: 'TARGET', 
      label: 'Customer 📦', 
      icon: <ShoppingBag className="w-4 h-4 text-brand-rose" />, 
      colorClass: 'hover:border-brand-rose/50' 
    },
    { 
      id: 'WAYPOINT', 
      label: 'Kitchen 🍔', 
      icon: <Store className="w-4 h-4 text-brand-amber" />, 
      colorClass: 'hover:border-brand-amber/50' 
    },
    { 
      id: 'WALL', 
      label: 'Roadblock 🚧', 
      icon: <ShieldAlert className="w-4 h-4 text-slate-500 dark:text-slate-400" />, 
      colorClass: 'hover:border-slate-400/50' 
    },
    { 
      id: 'TRAFFIC_1', 
      label: 'Light (+2)', 
      icon: <Car className="w-4 h-4 text-brand-cyan" />, 
      colorClass: 'hover:border-brand-cyan/50' 
    },
    { 
      id: 'TRAFFIC_2', 
      label: 'Heavy (+5)', 
      icon: <Car className="w-4 h-4 text-brand-amber" />, 
      colorClass: 'hover:border-brand-amber/50' 
    },
    { 
      id: 'TRAFFIC_3', 
      label: 'Gridlock (+10)', 
      icon: <Truck className="w-4 h-4 text-brand-rose" />, 
      colorClass: 'hover:border-brand-rose/50' 
    },
    { 
      id: 'ERASER', 
      label: 'Eraser 🧹', 
      icon: <Eraser className="w-4 h-4 text-slate-600 dark:text-slate-300" />, 
      colorClass: 'hover:border-slate-400/50' 
    },
  ];

  const handlePreset = (presetName: string) => {
    if (isRunning) return;
    setGrid(prev => generatePresetScenario(prev, presetName));
  };

  return (
    <div className="glass-panel p-4 rounded-2xl mb-4 border border-slate-200 dark:border-white/10 shadow-card-light dark:shadow-card-dark flex flex-wrap items-center justify-between gap-6 transition-colors">
      {/* Algorithm Selector */}
      <div className="flex flex-col gap-1.5 min-w-[280px]">
        <div className="flex items-center justify-between">
          <label className="font-mono text-[11px] font-bold text-brand-cyan uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> PRIMARY ROUTING ALGORITHM
          </label>
        </div>
        <div className="relative">
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value as AlgorithmType)}
            disabled={isRunning}
            className="w-full appearance-none bg-white dark:bg-dark-900 border border-slate-300 dark:border-white/15 rounded-xl px-3.5 py-2 font-mono text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan cursor-pointer transition-all shadow-sm"
          >
            <option value="dijkstra">Dijkstra's Shortest Path — O(E log V) [Optimal]</option>
            <option value="aStar">A* Heuristic Search (Manhattan) — O(E) [Fastest GPS]</option>
            <option value="bfs">Breadth-First Search (BFS) — O(V + E) [Unweighted]</option>
            <option value="dfs">Depth-First Search (DFS) — O(V + E) [Exploration]</option>
            <option value="bellmanFord">Bellman-Ford Algorithm — O(V · E) [Discounts]</option>
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Interactive Tool Placement Picker */}
      <div className="flex flex-col gap-1.5 flex-1 min-w-[320px]">
        <label className="font-mono text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          PLACEMENT TOOL (CLICK / DRAG ON GRID)
        </label>
        <div className="flex flex-wrap gap-1.5">
          {tools.map(tool => {
            const isSelected = activeTool === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                disabled={isRunning}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono text-xs font-medium border transition-all duration-200 ${tool.colorClass} ${
                  isSelected
                    ? 'bg-brand-cyan/15 dark:bg-white/15 border-brand-cyan text-slate-900 dark:text-white shadow-glow-cyan/20 shadow-sm font-bold'
                    : 'bg-white/90 dark:bg-dark-900/90 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                } ${isRunning ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {tool.icon}
                <span className="font-semibold">{tool.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Logistics Presets & Mazes */}
      <div className="flex flex-col gap-1.5">
        <label className="font-mono text-[11px] font-bold text-brand-amber uppercase tracking-wider flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5" /> LOGISTICS PRESET SCENARIOS
        </label>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => handlePreset('rush_hour')}
            disabled={isRunning}
            className="px-3 py-1.5 rounded-xl font-mono text-xs font-semibold bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:text-brand-cyan hover:border-brand-cyan/40 hover:bg-slate-100 dark:hover:bg-white/5 transition-all shadow-sm"
          >
            🚗 Rush Hour
          </button>
          <button
            onClick={() => handlePreset('roadblock')}
            disabled={isRunning}
            className="px-3 py-1.5 rounded-xl font-mono text-xs font-semibold bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:text-brand-rose hover:border-brand-rose/40 hover:bg-slate-100 dark:hover:bg-white/5 transition-all shadow-sm"
          >
            🚧 Detour Wall
          </button>
          <button
            onClick={() => handlePreset('rain_surge')}
            disabled={isRunning}
            className="px-3 py-1.5 rounded-xl font-mono text-xs font-semibold bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:text-brand-amber hover:border-brand-amber/40 hover:bg-slate-100 dark:hover:bg-white/5 transition-all shadow-sm"
          >
            🌧️ Rain Surge
          </button>
          <button
            onClick={() => handlePreset('city_grid')}
            disabled={isRunning}
            className="px-3 py-1.5 rounded-xl font-mono text-xs font-semibold bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:text-brand-emerald hover:border-brand-emerald/40 hover:bg-slate-100 dark:hover:bg-white/5 transition-all shadow-sm"
          >
            🏙️ City Blocks
          </button>
          <button
            onClick={() => handlePreset('spiral')}
            disabled={isRunning}
            className="px-3 py-1.5 rounded-xl font-mono text-xs font-semibold bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:text-brand-indigo dark:hover:text-brand-indigoLight hover:border-brand-indigo/40 hover:bg-slate-100 dark:hover:bg-white/5 transition-all shadow-sm"
          >
            🌀 Spiral
          </button>
        </div>
      </div>
    </div>
  );
};
