import React, { useState, useEffect } from 'react';
import { useVisualizer } from '../../context/VisualizerContext';
import { ModeType } from '../../types/routing';
import { 
  Navigation, 
  GitCompare, 
  MapPin, 
  Map, 
  BarChart2, 
  Route, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  X, 
  Code2,
  CheckCircle2,
  BookOpen,
  Users,
  Command,
  Sparkles,
  Keyboard,
  HelpCircle,
  Zap,
  MousePointer
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { mode, setMode, isRunning, isSoundOn, toggleSound, theme, toggleTheme } = useVisualizer();
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [modalTab, setModalTab] = useState<'shortcuts' | 'controls' | 'specs' | 'team'>('shortcuts');

  // Global Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

      if (e.key === '?' || (e.key === '/' && (e.metaKey || e.ctrlKey))) {
        e.preventDefault();
        setShowGuideModal(prev => !prev);
      } else if (e.key === '1') {
        setMode('grid');
      } else if (e.key === '2') {
        setMode('comparison');
      } else if (e.key === '3') {
        setMode('multistop');
      } else if (e.key === '4') {
        setMode('citymap');
      } else if (e.key === '5') {
        setMode('sorting');
      } else if (e.key === 'm' || e.key === 'M') {
        toggleSound();
      } else if (e.key === 'd' || e.key === 'D') {
        toggleTheme();
      } else if (e.key === 'o' || e.key === 'O') {
        window.dispatchEvent(new CustomEvent('toggle-owl-bot'));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setMode, toggleSound, toggleTheme]);

  const navItems: { id: ModeType; label: string; icon: React.ReactNode; hotkey: string }[] = [
    { id: 'grid', label: 'Grid Pathfinding', icon: <Navigation className="w-4 h-4" />, hotkey: '1' },
    { id: 'comparison', label: 'Engine Duel', icon: <GitCompare className="w-4 h-4" />, hotkey: '2' },
    { id: 'multistop', label: 'Multi-Stop TSP', icon: <MapPin className="w-4 h-4" />, hotkey: '3' },
    { id: 'citymap', label: 'City Map GIS', icon: <Map className="w-4 h-4" />, hotkey: '4' },
    { id: 'sorting', label: 'Sorting Studio', icon: <BarChart2 className="w-4 h-4" />, hotkey: '5' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-dark-950/95 backdrop-blur-md border-b border-slate-200 dark:border-dark-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          
          {/* Brand Identity */}
          <div 
            className="flex items-center gap-3 cursor-pointer select-none group" 
            onClick={() => setMode('grid')}
          >
            <div className="w-9 h-9 rounded-xl bg-brand-primary flex items-center justify-center text-white shadow-sm shadow-brand-primary/20 group-hover:bg-brand-primaryHover transition-colors">
              <Route className="w-5 h-5 text-white" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-base text-slate-900 dark:text-white tracking-tight">
                  AlgoLenz
                </span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                Route Optimization & DSA Platform
              </span>
            </div>
          </div>

          {/* Segmented Pill Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-dark-900 p-1 rounded-xl border border-slate-200 dark:border-dark-800">
            {navItems.map((item) => {
              const isActive = mode === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => setMode(item.id)}
                  disabled={isRunning}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-white dark:bg-dark-800 text-brand-primary dark:text-white shadow-subtle border border-slate-200/90 dark:border-dark-700 font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  } ${isRunning ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <span className={isActive ? 'text-brand-primary dark:text-brand-primaryLight' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Utilities */}
          <div className="flex items-center gap-2">
            {/* Status indicator */}
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-dark-900 border border-slate-200 dark:border-dark-800 text-xs text-slate-600 dark:text-slate-400">
              <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-brand-amber animate-pulse' : 'bg-brand-emerald'}`} />
              <span className="font-mono text-[11px]">{isRunning ? 'Running' : 'Ready'}</span>
            </div>

            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-lg border transition-colors ${
                isSoundOn 
                  ? 'bg-brand-primary/10 border-brand-primary/30 text-brand-primary dark:text-brand-primaryLight' 
                  : 'bg-white dark:bg-dark-900 border-slate-200 dark:border-dark-800 text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
              title={isSoundOn ? 'Sound FX On (Press M to Mute)' : 'Sound FX Muted (Press M to Unmute)'}
            >
              {isSoundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white dark:bg-dark-900 border border-slate-200 dark:border-dark-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              title={`Switch Theme (Press D)`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Owl Assistant Toggle */}
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('toggle-owl-bot'))}
              className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors"
              title="Toggle Athena AlgoOwl Guide (Press O)"
            >
              <span className="text-sm">🦉</span>
            </button>

            {/* Quick Guide & Shortcuts Modal Trigger */}
            <button
              onClick={() => setShowGuideModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 text-xs font-semibold transition-all cursor-pointer shadow-sm"
              title="Quick Guide & Keyboard Shortcuts (Press ?)"
            >
              <Command className="w-3.5 h-3.5 text-brand-primary" />
              <span className="hidden sm:inline">Quick Guide</span>
              <kbd className="hidden lg:inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-mono rounded bg-slate-800 text-slate-300 dark:bg-slate-200 dark:text-slate-800 ml-0.5">
                ?
              </kbd>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="md:hidden flex overflow-x-auto px-4 py-2 border-t border-slate-200 dark:border-dark-800 gap-1.5 bg-slate-50 dark:bg-dark-950">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setMode(item.id)}
              disabled={isRunning}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
                mode === item.id
                  ? 'bg-brand-primary text-white font-semibold'
                  : 'bg-white dark:bg-dark-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-dark-800'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Quick Guide & Shortcuts Modal */}
      {showGuideModal && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowGuideModal(false)}
        >
          <div 
            className="bg-white dark:bg-dark-900 border border-slate-200 dark:border-dark-750 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-dropdown animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-dark-800 flex justify-between items-center bg-slate-50 dark:bg-dark-950">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                  <Command className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                    AlgoLenz Quick Guide & Shortcuts
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Keyboard hotkeys, interactive controls, and algorithm reference
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowGuideModal(false)}
                className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-dark-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Segmented Tabs */}
            <div className="flex border-b border-slate-200 dark:border-dark-800 bg-slate-100/60 dark:bg-dark-950/60 px-5 pt-3 gap-2">
              <button
                onClick={() => setModalTab('shortcuts')}
                className={`flex items-center gap-2 px-3.5 py-2 border-b-2 font-medium text-xs transition-colors ${
                  modalTab === 'shortcuts'
                    ? 'border-brand-primary text-brand-primary dark:text-white font-semibold'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Keyboard className="w-3.5 h-3.5" />
                <span>Hotkeys</span>
              </button>
              <button
                onClick={() => setModalTab('controls')}
                className={`flex items-center gap-2 px-3.5 py-2 border-b-2 font-medium text-xs transition-colors ${
                  modalTab === 'controls'
                    ? 'border-brand-primary text-brand-primary dark:text-white font-semibold'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <MousePointer className="w-3.5 h-3.5" />
                <span>Interactions</span>
              </button>
              <button
                onClick={() => setModalTab('specs')}
                className={`flex items-center gap-2 px-3.5 py-2 border-b-2 font-medium text-xs transition-colors ${
                  modalTab === 'specs'
                    ? 'border-brand-primary text-brand-primary dark:text-white font-semibold'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>DSA Complexity</span>
              </button>
              <button
                onClick={() => setModalTab('team')}
                className={`flex items-center gap-2 px-3.5 py-2 border-b-2 font-medium text-xs transition-colors ${
                  modalTab === 'team'
                    ? 'border-brand-primary text-brand-primary dark:text-white font-semibold'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Team & Specs</span>
              </button>
            </div>

            {/* Modal Content Body */}
            <div className="p-5 overflow-y-auto space-y-4 text-xs text-slate-700 dark:text-slate-300">
              
              {/* Tab 1: Keyboard Hotkeys */}
              {modalTab === 'shortcuts' && (
                <div className="space-y-3">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Global Keyboard Navigation:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono">
                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-dark-800 flex items-center justify-between">
                      <span className="font-sans text-slate-800 dark:text-slate-200">Grid Pathfinding Tab</span>
                      <kbd className="px-2 py-0.5 rounded bg-white dark:bg-dark-800 border border-slate-300 dark:border-dark-700 text-brand-primary font-bold">1</kbd>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-dark-800 flex items-center justify-between">
                      <span className="font-sans text-slate-800 dark:text-slate-200">Engine Duel Arena</span>
                      <kbd className="px-2 py-0.5 rounded bg-white dark:bg-dark-800 border border-slate-300 dark:border-dark-700 text-brand-primary font-bold">2</kbd>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-dark-800 flex items-center justify-between">
                      <span className="font-sans text-slate-800 dark:text-slate-200">Multi-Stop TSP Solver</span>
                      <kbd className="px-2 py-0.5 rounded bg-white dark:bg-dark-800 border border-slate-300 dark:border-dark-700 text-brand-primary font-bold">3</kbd>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-dark-800 flex items-center justify-between">
                      <span className="font-sans text-slate-800 dark:text-slate-200">City Map GIS Dispatch</span>
                      <kbd className="px-2 py-0.5 rounded bg-white dark:bg-dark-800 border border-slate-300 dark:border-dark-700 text-brand-primary font-bold">4</kbd>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-dark-800 flex items-center justify-between">
                      <span className="font-sans text-slate-800 dark:text-slate-200">Sorting Studio</span>
                      <kbd className="px-2 py-0.5 rounded bg-white dark:bg-dark-800 border border-slate-300 dark:border-dark-700 text-brand-primary font-bold">5</kbd>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-dark-800 flex items-center justify-between">
                      <span className="font-sans text-slate-800 dark:text-slate-200">Toggle Audio Mute / Unmute</span>
                      <kbd className="px-2 py-0.5 rounded bg-white dark:bg-dark-800 border border-slate-300 dark:border-dark-700 text-brand-primary font-bold">M</kbd>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-dark-800 flex items-center justify-between">
                      <span className="font-sans text-slate-800 dark:text-slate-200">Toggle Dark / Light Theme</span>
                      <kbd className="px-2 py-0.5 rounded bg-white dark:bg-dark-800 border border-slate-300 dark:border-dark-700 text-brand-primary font-bold">D</kbd>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-dark-800 flex items-center justify-between">
                      <span className="font-sans text-slate-800 dark:text-slate-200">Athena Owl Guide & Quests</span>
                      <kbd className="px-2 py-0.5 rounded bg-white dark:bg-dark-800 border border-slate-300 dark:border-dark-700 text-brand-primary font-bold">O</kbd>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-dark-800 flex items-center justify-between">
                      <span className="font-sans text-slate-800 dark:text-slate-200">Open Quick Guide</span>
                      <kbd className="px-2 py-0.5 rounded bg-white dark:bg-dark-800 border border-slate-300 dark:border-dark-700 text-brand-primary font-bold">?</kbd>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Interactive Controls Guide */}
              {modalTab === 'controls' && (
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-dark-800 space-y-1">
                    <h4 className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-brand-primary" />
                      Grid Pathfinding & Duel
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      • <strong>Draw Barriers:</strong> Click and drag across grid cells to erect roadblocks.<br />
                      • <strong>Move Markers:</strong> Click and drag the Origin (🛵) or Destination (📦) to test dynamic rerouting.<br />
                      • <strong>Traffic Weights:</strong> Add +2, +5, or +10 traffic bottlenecks to see Dijkstra and A* avoid congested roads.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-dark-800 space-y-1">
                    <h4 className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-primary" />
                      Multi-Stop TSP Dispatcher
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      • <strong>Add Waypoint:</strong> Click any empty spot on the canvas to drop a new customer pin.<br />
                      • <strong>Reshape Tour:</strong> Drag waypoint pins in real time to recompute the optimal loop.<br />
                      • <strong>Dispatch Van:</strong> Click "Dispatch Delivery Van 🚚" to watch a live animated courier deliver packages.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-dark-800 space-y-1">
                    <h4 className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <BarChart2 className="w-3.5 h-3.5 text-brand-primary" />
                      Sorting Studio
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      • <strong>Time-Travel Scrubbing:</strong> Drag the step slider to inspect any past or future algorithm state.<br />
                      • <strong>Custom Data:</strong> Enter custom comma-separated numbers to test worst-case arrays.
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 3: Algorithm Complexity Reference */}
              {modalTab === 'specs' && (
                <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-dark-800">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 dark:bg-dark-950 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-dark-800">
                      <tr>
                        <th className="p-3">Algorithm</th>
                        <th className="p-3">Time</th>
                        <th className="p-3">Space</th>
                        <th className="p-3">Optimality</th>
                        <th className="p-3">Application</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-dark-800 font-mono text-[11px]">
                      <tr className="hover:bg-slate-50 dark:hover:bg-dark-850">
                        <td className="p-3 font-semibold text-slate-900 dark:text-white font-sans">Dijkstra</td>
                        <td className="p-3 text-brand-primary font-bold">O((V+E) log V)</td>
                        <td className="p-3">O(V)</td>
                        <td className="p-3 text-brand-emerald font-semibold">Guaranteed (W ≥ 0)</td>
                        <td className="p-3 text-slate-500 font-sans">Swiggy & Zomato delivery dispatch</td>
                      </tr>
                      <tr className="hover:bg-slate-50 dark:hover:bg-dark-850">
                        <td className="p-3 font-semibold text-slate-900 dark:text-white font-sans">A* Search</td>
                        <td className="p-3 text-brand-accent font-bold">O(E) best</td>
                        <td className="p-3">O(V)</td>
                        <td className="p-3 text-brand-emerald font-semibold">Guaranteed (Admissible)</td>
                        <td className="p-3 text-slate-500 font-sans">Google Maps & GPS pathfinding</td>
                      </tr>
                      <tr className="hover:bg-slate-50 dark:hover:bg-dark-850">
                        <td className="p-3 font-semibold text-slate-900 dark:text-white font-sans">Held-Karp DP</td>
                        <td className="p-3 text-brand-amber font-bold">O(2ⁿ · n²)</td>
                        <td className="p-3">O(n · 2ⁿ)</td>
                        <td className="p-3 text-brand-emerald font-semibold">Exact Global Minimum</td>
                        <td className="p-3 text-slate-500 font-sans">Last-mile multi-stop TSP routing</td>
                      </tr>
                      <tr className="hover:bg-slate-50 dark:hover:bg-dark-850">
                        <td className="p-3 font-semibold text-slate-900 dark:text-white font-sans">2-Opt Search</td>
                        <td className="p-3 text-emerald-600 font-bold">O(n²)</td>
                        <td className="p-3">O(n)</td>
                        <td className="p-3 text-emerald-600 font-semibold">Within 2% of optimal</td>
                        <td className="p-3 text-slate-500 font-sans">Fleet route untangling</td>
                      </tr>
                      <tr className="hover:bg-slate-50 dark:hover:bg-dark-850">
                        <td className="p-3 font-semibold text-slate-900 dark:text-white font-sans">Bellman-Ford</td>
                        <td className="p-3 text-rose-500 font-bold">O(V · E)</td>
                        <td className="p-3">O(V)</td>
                        <td className="p-3 text-brand-emerald font-semibold">Guaranteed</td>
                        <td className="p-3 text-slate-500 font-sans">Negative cycle detection in finance</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* Tab 4: Team & Academic Specs */}
              {modalTab === 'team' && (
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-dark-800">
                    <span className="text-[10px] text-brand-primary font-bold uppercase block">Academic Project</span>
                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      BCA-5005 Major Project • PSIT College of Higher Education
                    </h4>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      Affiliated to Chhatrapati Shahu Ji Maharaj University (CSJMU), Kanpur
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="p-3 rounded-xl border border-slate-200 dark:border-dark-800 bg-slate-50 dark:bg-dark-950">
                      <div className="font-semibold text-slate-900 dark:text-white">Naitik</div>
                      <div className="text-[11px] text-brand-primary font-mono">Roll: 24116002322</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Lead Developer & Algorithm Architect</div>
                    </div>
                    <div className="p-3 rounded-xl border border-slate-200 dark:border-dark-800 bg-slate-50 dark:bg-dark-950">
                      <div className="font-semibold text-slate-900 dark:text-white">Kashish Gupta</div>
                      <div className="text-[11px] text-brand-primary font-mono">Roll: 24116002274</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">UI/UX & GIS Integration</div>
                    </div>
                    <div className="p-3 rounded-xl border border-slate-200 dark:border-dark-800 bg-slate-50 dark:bg-dark-950">
                      <div className="font-semibold text-slate-900 dark:text-white">Naitik Mishra</div>
                      <div className="text-[11px] text-brand-primary font-mono">Roll: 24116002324</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Sorting Engine & Benchmarking</div>
                    </div>
                    <div className="p-3 rounded-xl border border-slate-200 dark:border-dark-800 bg-slate-50 dark:bg-dark-950">
                      <div className="font-semibold text-slate-900 dark:text-white">Khushboo Rajpoot</div>
                      <div className="text-[11px] text-brand-primary font-mono">Roll: 24116002277</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Testing & Documentation QA</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-dark-800 bg-slate-50 dark:bg-dark-950 flex justify-between items-center text-xs text-slate-500">
              <span className="font-mono text-[11px]">Press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-dark-800 text-slate-700 dark:text-slate-300">Esc</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-dark-800 text-slate-700 dark:text-slate-300">?</kbd> to toggle</span>
              <button
                onClick={() => setShowGuideModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
