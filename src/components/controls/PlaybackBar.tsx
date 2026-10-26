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

  const getSpeedLabel = (s: number) => {
    if (s >= 120) return '🐢 SLOW-MO';
    if (s >= 35) return '🚶 NORMAL';
    return '⚡ ULTRA FAST';
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

      {/* Speed Slider & Slow-Mo Presets */}
      <div className="flex items-center gap-3 bg-white dark:bg-dark-900/90 px-4 py-2 rounded-xl border border-slate-300 dark:border-white/10 shadow-sm">
        <Sliders className="w-4 h-4 text-brand-cyan" />
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-2 text-[10px] font-mono text-slate-500 dark:text-slate-400">
            <span>SPEED:</span>
            <span className="font-bold text-brand-cyan">
              {getSpeedLabel(speed)} ({speed}ms)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="range"
              min="8"
              max="350"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-28 accent-brand-cyan cursor-pointer h-1.5 bg-slate-200 dark:bg-white/10 rounded-lg appearance-none"
              style={{ direction: 'rtl' }}
              title="Slide left to slow down animation"
            />

            <div className="flex items-center gap-1 text-[9px] font-mono font-bold">
              <button
                onClick={() => setSpeed(180)}
                className={`px-1.5 py-0.5 rounded border transition-all ${
                  speed >= 120
                    ? 'bg-brand-emerald text-dark-950 border-brand-emerald'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-white/10'
                }`}
                title="Slow pace to watch step-by-step path discovery"
              >
                🐢 Slow
              </button>
              <button
                onClick={() => setSpeed(40)}
                className={`px-1.5 py-0.5 rounded border transition-all ${
                  speed >= 25 && speed < 120
                    ? 'bg-brand-cyan text-dark-950 border-brand-cyan'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-white/10'
                }`}
                title="Balanced speed"
              >
                🚶 Normal
              </button>
              <button
                onClick={() => setSpeed(10)}
                className={`px-1.5 py-0.5 rounded border transition-all ${
                  speed < 25
                    ? 'bg-brand-amber text-dark-950 border-brand-amber'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-white/10'
                }`}
                title="Fast speed"
              >
                ⚡ Fast
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
