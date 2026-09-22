import React from 'react';
import { useVisualizer } from '../../context/VisualizerContext';
import { Play, Pause, RotateCcw, Trash2, Sliders, ShieldX } from 'lucide-react';

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
    <div className="glass-panel p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-card-light dark:shadow-card-dark flex flex-wrap items-center justify-between gap-4 transition-all">
      {/* Playback Controls */}
      <div className="flex flex-wrap items-center gap-2.5">
        {!isRunning || isPaused ? (
          <button
            onClick={onRun}
            className="flex items-center gap-2 bg-gradient-to-r from-brand-emerald via-brand-cyan to-brand-indigo hover:brightness-110 text-dark-950 font-mono text-xs font-bold px-5 py-2.5 rounded-xl shadow-glow-cyan/30 shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-dark-950" />
            <span className="tracking-wide uppercase font-extrabold">
              {isPaused ? 'RESUME EXECUTION' : 'RUN ROUTE FINDER'}
            </span>
          </button>
        ) : (
          <button
            onClick={onPause}
            className="flex items-center gap-2 bg-gradient-to-r from-brand-amber to-brand-rose hover:brightness-110 text-dark-950 font-mono text-xs font-bold px-5 py-2.5 rounded-xl shadow-glow-amber/30 shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <Pause className="w-4 h-4 fill-dark-950" />
            <span className="tracking-wide uppercase font-extrabold">PAUSE ENGINE</span>
          </button>
        )}

        <button
          onClick={onClearPath}
          disabled={isRunning && !isPaused}
          className="flex items-center gap-1.5 bg-white dark:bg-dark-900/90 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white font-mono text-xs font-medium px-3.5 py-2 rounded-xl border border-slate-300 dark:border-white/10 hover:border-brand-cyan hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
        >
          <Trash2 className="w-3.5 h-3.5 text-brand-cyan" />
          <span>Clear Route Path</span>
        </button>

        <button
          onClick={handleClearWalls}
          disabled={isRunning && !isPaused}
          className="flex items-center gap-1.5 bg-white dark:bg-dark-900/90 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white font-mono text-xs font-medium px-3.5 py-2 rounded-xl border border-slate-300 dark:border-white/10 hover:border-brand-amber hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
        >
          <ShieldX className="w-3.5 h-3.5 text-brand-amber" />
          <span>Clear Obstacles</span>
        </button>

        <button
          onClick={onReset}
          disabled={isRunning && !isPaused}
          className="flex items-center gap-1.5 bg-white dark:bg-dark-900/90 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white font-mono text-xs font-medium px-3.5 py-2 rounded-xl border border-slate-300 dark:border-white/10 hover:border-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
          <span>Reset Everything</span>
        </button>
      </div>

      {/* Speed Slider */}
      <div className="flex items-center gap-3 bg-white dark:bg-dark-900/90 px-4 py-2 rounded-xl border border-slate-300 dark:border-white/10 shadow-sm">
        <Sliders className="w-4 h-4 text-brand-cyan" />
        <div className="flex flex-col">
          <div className="flex items-center justify-between gap-2 text-[10px] font-mono text-slate-500 dark:text-slate-400">
            <span>SPEED:</span>
            <span className="font-bold text-brand-cyan">
              {speed <= 15 ? 'ULTRA (10ms)' : speed <= 40 ? `FAST (${speed}ms)` : `NORMAL (${speed}ms)`}
            </span>
          </div>
          <input
            type="range"
            min="5"
            max="150"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-32 accent-brand-cyan cursor-pointer h-1.5 bg-slate-200 dark:bg-white/10 rounded-lg appearance-none"
            style={{ direction: 'rtl' }}
          />
        </div>
      </div>
    </div>
  );
};
