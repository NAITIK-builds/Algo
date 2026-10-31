import React from 'react';
import { useVisualizer } from '../../context/VisualizerContext';
import { Play, Pause, RotateCcw, Trash2, Gauge, Ban } from 'lucide-react';

interface PlaybackBarProps {
  onRun: () => void;
  onPause: () => void;
  onReset: () => void;
  onClearPath: () => void;
  onClearWalls?: () => void;
}

export const PlaybackBar: React.FC<PlaybackBarProps> = ({ 
  onRun, 
  onPause, 
  onReset, 
  onClearPath, 
  onClearWalls 
}) => {
  const { isRunning, isPaused, speed, setSpeed, clearWallsOnly } = useVisualizer();

  const handleClearWalls = () => {
    if (onClearWalls) onClearWalls();
    else clearWallsOnly();
  };

  return (
    <div className="ui-panel p-3 rounded-xl flex flex-wrap items-center justify-between gap-3 transition-colors">
      
      {/* Primary Execution & Reset Actions */}
      <div className="flex flex-wrap items-center gap-2">
        {!isRunning || isPaused ? (
          <button
            id="btn-run-viz"
            onClick={onRun}
            className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primaryHover text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm shadow-brand-primary/25 transition-all cursor-pointer active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isPaused ? 'Resume Visualization' : 'Run Visualization'}</span>
          </button>
        ) : (
          <button
            onClick={onPause}
            className="flex items-center gap-2 bg-brand-amber hover:bg-amber-600 text-slate-950 text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-all cursor-pointer active:scale-95"
          >
            <Pause className="w-3.5 h-3.5 fill-current" />
            <span>Pause Engine</span>
          </button>
        )}

        <button
          onClick={onClearPath}
          disabled={isRunning && !isPaused}
          className="flex items-center gap-1.5 bg-white dark:bg-dark-900 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-medium px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-800 hover:border-slate-300 dark:hover:border-dark-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5 text-slate-400" />
          <span>Clear Path</span>
        </button>

        <button
          onClick={handleClearWalls}
          disabled={isRunning && !isPaused}
          className="flex items-center gap-1.5 bg-white dark:bg-dark-900 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-medium px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-800 hover:border-slate-300 dark:hover:border-dark-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <Ban className="w-3.5 h-3.5 text-slate-400" />
          <span>Clear Barriers</span>
        </button>

        <button
          id="btn-reset-grid"
          onClick={onReset}
          disabled={isRunning && !isPaused}
          className="flex items-center gap-1.5 bg-white dark:bg-dark-900 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-medium px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-800 hover:border-slate-300 dark:hover:border-dark-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
          <span>Reset Grid</span>
        </button>
      </div>

      {/* Speed Selector Presets */}
      <div className="flex items-center gap-2 bg-slate-50 dark:bg-dark-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-dark-800">
        <Gauge className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-xs text-slate-500 font-medium mr-1">Speed:</span>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setSpeed(70)}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
              speed >= 60 
                ? 'bg-brand-primary text-white font-semibold' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            0.5x (Slow)
          </button>
          <button
            onClick={() => setSpeed(25)}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
              speed >= 20 && speed < 60
                ? 'bg-brand-primary text-white font-semibold' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            1.0x (Normal)
          </button>
          <button
            onClick={() => setSpeed(8)}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
              speed < 20 
                ? 'bg-brand-primary text-white font-semibold' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            2.0x (Fast)
          </button>
        </div>
      </div>

    </div>
  );
};
