import React from 'react';
import { useVisualizer } from '../../context/VisualizerContext';
import { AlgorithmType, ToolType } from '../../types/routing';
import { generatePresetScenario } from '../../utils/gridGenerator';
import { 
  Navigation, 
  Target, 
  MapPin, 
  Ban, 
  Car, 
  Truck, 
  Eraser, 
  SlidersHorizontal,
  ChevronDown,
  Sparkles
} from 'lucide-react';

export const ControlPanel: React.FC = () => {
  const {
    algorithm, setAlgorithm,
    activeTool, setActiveTool,
    setGrid,
    isRunning
  } = useVisualizer();

  const tools: { 
    id: ToolType; 
    label: string; 
    icon: React.ReactNode; 
    colorClass: string;
  }[] = [
    { 
      id: 'START', 
      label: 'Origin (Rider)', 
      icon: <Navigation className="w-3.5 h-3.5 text-brand-emerald" />, 
      colorClass: 'border-brand-emerald text-brand-emerald bg-brand-emerald/10'
    },
    { 
      id: 'TARGET', 
      label: 'Target (Customer)', 
      icon: <Target className="w-3.5 h-3.5 text-brand-rose" />, 
      colorClass: 'border-brand-rose text-brand-rose bg-brand-rose/10'
    },
    { 
      id: 'WAYPOINT', 
      label: 'Waypoint (Kitchen)', 
      icon: <MapPin className="w-3.5 h-3.5 text-brand-amber" />, 
      colorClass: 'border-brand-amber text-brand-amber bg-brand-amber/10'
    },
    { 
      id: 'WALL', 
      label: 'Wall / Barrier', 
      icon: <Ban className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />, 
      colorClass: 'border-slate-500 text-slate-900 dark:text-white bg-slate-200 dark:bg-dark-800'
    },
    { 
      id: 'TRAFFIC_1', 
      label: 'Traffic +2', 
      icon: <Car className="w-3.5 h-3.5 text-brand-accent" />, 
      colorClass: 'border-brand-accent text-brand-accent bg-brand-accent/10'
    },
    { 
      id: 'TRAFFIC_2', 
      label: 'Traffic +5', 
      icon: <Car className="w-3.5 h-3.5 text-brand-amber" />, 
      colorClass: 'border-brand-amber text-brand-amber bg-brand-amber/10'
    },
    { 
      id: 'TRAFFIC_3', 
      label: 'Traffic +10', 
      icon: <Truck className="w-3.5 h-3.5 text-brand-rose" />, 
      colorClass: 'border-brand-rose text-brand-rose bg-brand-rose/10'
    },
    { 
      id: 'ERASER', 
      label: 'Eraser', 
      icon: <Eraser className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />, 
      colorClass: 'border-slate-400 text-slate-800 dark:text-slate-200 bg-slate-200 dark:bg-dark-800'
    },
  ];

  const handlePreset = (presetName: string) => {
    if (isRunning) return;
    setGrid(prev => generatePresetScenario(prev, presetName));
  };

  return (
    <div className="ui-panel p-4 rounded-xl flex flex-wrap items-center justify-between gap-4 transition-colors">
      
      {/* 1. Algorithm Selection */}
      <div className="flex flex-col gap-1.5 min-w-[260px] flex-1 sm:flex-initial">
        <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-brand-primary" />
          Routing Algorithm
        </label>
        <div className="relative">
          <select
            id="algorithm-select"
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value as AlgorithmType)}
            disabled={isRunning}
            className="w-full appearance-none bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-dark-750 rounded-lg px-3 py-2 text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary cursor-pointer transition-colors pr-8"
          >
            <option value="dijkstra">Dijkstra's Algorithm — O(E log V) (Guaranteed Shortest)</option>
            <option value="aStar">A* Heuristic Search — O(E) (Fastest for Maps)</option>
            <option value="bfs">Breadth-First Search (BFS) — O(V + E) (Unweighted Shortest)</option>
            <option value="dfs">Depth-First Search (DFS) — O(V + E) (Exploratory)</option>
            <option value="bellmanFord">Bellman-Ford — O(V · E) (Negative Cost Detection)</option>
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* 2. Placement Tools Toolbar */}
      <div className="flex flex-col gap-1.5 flex-1 min-w-[320px]">
        <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-3 h-3 text-brand-primary" />
            Grid Tool
          </span>
          <span className="text-[10px] text-slate-400 font-normal">Click or drag on grid</span>
        </label>
        <div className="flex flex-wrap gap-1">
          {tools.map(tool => {
            const isSelected = activeTool === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                disabled={isRunning}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  isSelected
                    ? `${tool.colorClass} shadow-subtle font-semibold`
                    : 'bg-white dark:bg-dark-900 border-slate-200 dark:border-dark-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-dark-700'
                } ${isRunning ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {tool.icon}
                <span>{tool.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Preset Mazes & Terrains */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
          Terrain Presets
        </label>
        <div className="flex flex-wrap gap-1">
          <button
            id="preset-rush_hour"
            onClick={() => handlePreset('rush_hour')}
            disabled={isRunning}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white dark:bg-dark-900 border border-slate-200 dark:border-dark-800 text-slate-700 dark:text-slate-300 hover:border-brand-primary hover:text-brand-primary transition-colors cursor-pointer disabled:opacity-40"
          >
            Rush Hour
          </button>
          <button
            id="preset-city_grid"
            onClick={() => handlePreset('city_grid')}
            disabled={isRunning}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white dark:bg-dark-900 border border-slate-200 dark:border-dark-800 text-slate-700 dark:text-slate-300 hover:border-brand-primary hover:text-brand-primary transition-colors cursor-pointer disabled:opacity-40"
          >
            City Blocks
          </button>
          <button
            id="preset-roadblock"
            onClick={() => handlePreset('roadblock')}
            disabled={isRunning}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white dark:bg-dark-900 border border-slate-200 dark:border-dark-800 text-slate-700 dark:text-slate-300 hover:border-brand-primary hover:text-brand-primary transition-colors cursor-pointer disabled:opacity-40"
          >
            Detour Wall
          </button>
          <button
            id="preset-spiral"
            onClick={() => handlePreset('spiral')}
            disabled={isRunning}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white dark:bg-dark-900 border border-slate-200 dark:border-dark-800 text-slate-700 dark:text-slate-300 hover:border-brand-primary hover:text-brand-primary transition-colors cursor-pointer disabled:opacity-40"
          >
            Spiral Maze
          </button>
        </div>
      </div>

    </div>
  );
};
