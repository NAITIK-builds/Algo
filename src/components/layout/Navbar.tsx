import React, { useState } from 'react';
import { useVisualizer } from '../../context/VisualizerContext';
import { ModeType } from '../../types/routing';
import { 
  Navigation, 
  GitCompare, 
  MapPin, 
  Map, 
  BarChart2, 
  Zap, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  Info, 
  X, 
  Code2
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { mode, setMode, isRunning, isSoundOn, toggleSound, theme, toggleTheme } = useVisualizer();
  const [showDocsModal, setShowDocsModal] = useState(false);

  const navItems: { id: ModeType; label: string; badge: string; icon: React.ReactNode }[] = [
    { id: 'grid', label: 'Grid Delivery', badge: 'Interactive', icon: <Navigation className="w-4 h-4" /> },
    { id: 'comparison', label: 'Dual Benchmark', badge: 'Race', icon: <GitCompare className="w-4 h-4" /> },
    { id: 'multistop', label: 'TSP Multi-Stop', badge: 'Exact DP', icon: <MapPin className="w-4 h-4" /> },
    { id: 'citymap', label: 'City Street Map', badge: 'Real GPS', icon: <Map className="w-4 h-4" /> },
    { id: 'sorting', label: 'Sorting Studio', badge: '3 Modes', icon: <BarChart2 className="w-4 h-4" /> },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/80 dark:bg-dark-950/80 border-b border-slate-200 dark:border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Top subtle bar */}
          <div className="flex items-center justify-between py-1.5 border-b border-slate-200/60 dark:border-white/5 text-[11px] font-mono text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isRunning ? 'bg-brand-amber' : 'bg-brand-emerald'} opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isRunning ? 'bg-brand-amber' : 'bg-brand-emerald'}`}></span>
              </span>
              <span className="font-semibold tracking-wide text-slate-700 dark:text-slate-300">ALGOLENZ ROUTEVIZ</span>
              <span className="text-slate-400 dark:text-slate-600">/</span>
              <span className="text-brand-cyan font-medium hidden sm:inline">Advanced Route & DSA Optimization Studio</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-1.5 bg-slate-100 dark:bg-white/5 px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-white/10 text-[10px]">
                <span className="text-slate-500 dark:text-slate-400">STATE:</span>
                <span className={`font-bold ${isRunning ? 'text-brand-amber animate-pulse' : 'text-brand-emerald'}`}>
                  {isRunning ? 'CALCULATING PATH...' : 'STANDBY (READY)'}
                </span>
              </div>

              <div className="hidden lg:flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                <span>TEAM:</span>
                <span className="text-slate-700 dark:text-slate-200 font-medium">NAITIK & CO.</span>
              </div>
            </div>
          </div>

          {/* Main Navigation Row */}
          <div className="flex items-center justify-between gap-4 py-3">
            {/* Brand Logo */}
            <div 
              className="flex items-center gap-3 cursor-pointer group select-none" 
              onClick={() => setMode('grid')}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-indigo via-brand-cyan to-brand-emerald p-[1.5px] shadow-glow-cyan/20 shadow-lg group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-white dark:bg-dark-900 rounded-[10px] flex items-center justify-center text-brand-cyan">
                  <Zap className="w-5 h-5 fill-brand-cyan/20 text-brand-cyan group-hover:text-brand-cyanLight transition-colors" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 dark:from-white dark:via-slate-100 dark:to-slate-400">
                    AlgoLenz
                  </span>
                  <span className="text-xs font-mono font-bold px-1.5 py-0.2 bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30 rounded-md">
                    PRO
                  </span>
                </div>
                <span className="text-[10px] font-mono tracking-wider text-slate-500 dark:text-slate-400 block -mt-0.5">
                  ROUTE OPTIMIZATION & DSA
                </span>
              </div>
            </div>

            {/* Mode Tabs Navigation */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-100/90 dark:bg-dark-900/80 p-1 rounded-2xl border border-slate-200 dark:border-white/10 shadow-inner">
              {navItems.map((item) => {
                const isActive = mode === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setMode(item.id)}
                    disabled={isRunning}
                    className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-brand-indigo to-brand-cyan text-white shadow-lg shadow-brand-cyan/20 font-semibold'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/5'
                    } ${isRunning ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono font-semibold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-200/80 dark:bg-white/5 text-slate-500 dark:text-slate-400'
                    }`}>
                      {item.badge}
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* Action buttons (Sound, Theme, Docs) */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Sound toggle button */}
              <button
                onClick={toggleSound}
                title={isSoundOn ? 'Mute Audio Synthesizer' : 'Enable Audio Synthesizer'}
                className={`p-2 rounded-xl border transition-all ${
                  isSoundOn 
                    ? 'bg-brand-cyan/10 border-brand-cyan/30 text-brand-cyan hover:bg-brand-cyan/20' 
                    : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                }`}
              >
                {isSoundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Theme toggle button */}
              <button
                onClick={toggleTheme}
                title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
                className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-all cursor-pointer"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-brand-amber animate-spin-slow" />
                ) : (
                  <Moon className="w-4 h-4 text-brand-indigo" />
                )}
              </button>

              {/* Info / Docs Modal Button */}
              <button
                onClick={() => setShowDocsModal(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-700 dark:text-slate-200 transition-all cursor-pointer"
              >
                <Info className="w-4 h-4 text-brand-cyan" />
                <span className="hidden sm:inline">Docs & Specs</span>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Dropdown Strip */}
          <div className="flex md:hidden overflow-x-auto pb-2 gap-1.5 pt-1 scrollbar-none">
            {navItems.map((item) => {
              const isActive = mode === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setMode(item.id)}
                  disabled={isRunning}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium transition-all ${
                    isActive
                      ? 'bg-brand-cyan text-dark-950 font-bold shadow-md shadow-brand-cyan/20'
                      : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Docs / Specification Modal */}
      {showDocsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/70 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/15 rounded-2xl shadow-2xl p-6 overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                    AlgoLenz // RouteViz Engine Specifications
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Comprehensive last-mile delivery and DSA optimization suite</p>
                </div>
              </div>
              <button
                onClick={() => setShowDocsModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-sans">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-1.5">
                <h4 className="font-mono font-bold text-brand-cyan uppercase tracking-wider text-[11px]">PROJECT TEAM & CREDENTIALS</h4>
                <div className="grid grid-cols-2 gap-2 text-slate-700 dark:text-slate-300 font-mono text-[11px] pt-1">
                  <div>• <strong className="text-slate-900 dark:text-white">Naitik</strong> (24116002322)</div>
                  <div>• <strong className="text-slate-900 dark:text-white">Kashish Gupta</strong> (24116002274)</div>
                  <div>• <strong className="text-slate-900 dark:text-white">Naitik Mishra</strong> (24116002324)</div>
                  <div>• <strong className="text-slate-900 dark:text-white">Khushboo Rajpoot</strong> (24116002277)</div>
                </div>
              </div>

              <div>
                <h4 className="font-mono font-bold text-slate-800 dark:text-slate-200 mb-2 uppercase tracking-wider text-[11px]">CORE ALGORITHM COMPLEXITY SPECIFICATIONS</h4>
                <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-white/10">
                  <table className="w-full text-left font-mono text-[11px]">
                    <thead className="bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-white/10">
                      <tr>
                        <th className="p-2.5">Algorithm</th>
                        <th className="p-2.5">Time Complexity</th>
                        <th className="p-2.5">Space</th>
                        <th className="p-2.5">Optimality</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-white/5 text-slate-700 dark:text-slate-300">
                      <tr>
                        <td className="p-2.5 font-bold text-brand-cyan">Dijkstra's Algorithm</td>
                        <td className="p-2.5">O((V + E) log V)</td>
                        <td className="p-2.5">O(V)</td>
                        <td className="p-2.5 text-brand-emerald">Guaranteed Optimal</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-brand-indigo">A* Search (Manhattan)</td>
                        <td className="p-2.5">O(E) Avg / O(b^d)</td>
                        <td className="p-2.5">O(V)</td>
                        <td className="p-2.5 text-brand-emerald">Admissible & Optimal</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-brand-amber">Held-Karp DP (TSP)</td>
                        <td className="p-2.5">O(2ⁿ · n²)</td>
                        <td className="p-2.5">O(2ⁿ · n)</td>
                        <td className="p-2.5 text-brand-emerald">Exact Multi-Stop Tour</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-brand-rose">Bellman-Ford</td>
                        <td className="p-2.5">O(V · E)</td>
                        <td className="p-2.5">O(V)</td>
                        <td className="p-2.5 text-brand-emerald">Negative weights support</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-slate-600 dark:text-slate-200">BFS / DFS</td>
                        <td className="p-2.5">O(V + E)</td>
                        <td className="p-2.5">O(V)</td>
                        <td className="p-2.5">Unweighted / Exploration</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setShowDocsModal(false)}
                  className="px-4 py-2 bg-brand-cyan hover:bg-brand-cyanLight text-dark-950 font-bold rounded-xl transition-all cursor-pointer"
                >
                  Close Specifications
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
