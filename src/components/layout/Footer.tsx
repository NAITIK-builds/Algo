import React from 'react';
import { Zap, CheckCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-100 dark:bg-dark-950 border-t border-slate-200 dark:border-white/10 mt-auto pt-10 pb-6 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-200 dark:border-white/10">
        {/* Brand Col */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-brand-indigo to-brand-cyan flex items-center justify-center text-dark-950 font-bold">
              <Zap className="w-4 h-4 fill-dark-950 text-dark-950" />
            </div>
            <span className="font-display font-bold text-base text-slate-900 dark:text-white tracking-tight">
              AlgoLenz <span className="text-brand-cyan font-mono text-xs">// ROUTEVIZ</span>
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
            High-performance algorithmic computation and visualization platform engineered for last-mile logistics, multi-stop routing, city graph navigation, and interactive DSA learning.
          </p>
          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400">
            <span className="inline-block w-2 h-2 rounded-full bg-brand-emerald"></span>
            <span>BUILD: V5.0 HIGH PERFORMANCE ENGINE</span>
          </div>
        </div>

        {/* Project Team */}
        <div className="space-y-2.5">
          <h4 className="font-mono text-xs font-bold text-brand-cyan uppercase tracking-wider">PROJECT TEAM</h4>
          <ul className="text-xs font-mono space-y-1.5 text-slate-700 dark:text-slate-300">
            <li className="flex items-center gap-1.5">
              <span className="text-brand-cyan">▹</span>
              <span><strong className="text-slate-900 dark:text-white">Naitik</strong> (24116002322)</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-brand-cyan">▹</span>
              <span><strong className="text-slate-900 dark:text-white">Kashish Gupta</strong> (24116002274)</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-brand-cyan">▹</span>
              <span><strong className="text-slate-900 dark:text-white">Naitik Mishra</strong> (24116002324)</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-brand-cyan">▹</span>
              <span><strong className="text-slate-900 dark:text-white">Khushboo Rajpoot</strong> (24116002277)</span>
            </li>
          </ul>
        </div>

        {/* Algorithm Suite */}
        <div className="space-y-2.5">
          <h4 className="font-mono text-xs font-bold text-brand-indigo dark:text-brand-indigoLight uppercase tracking-wider">SUPPORTED ALGORITHMS</h4>
          <ul className="text-xs font-mono space-y-1.5 text-slate-600 dark:text-slate-400">
            <li className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">• Dijkstra Shortest Path — O(E log V)</li>
            <li className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">• A* Heuristic Search — O(E)</li>
            <li className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">• Held-Karp Exact DP (TSP) — O(2ⁿ · n²)</li>
            <li className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">• Bellman-Ford Negative Cycle — O(V · E)</li>
            <li className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">• Quick, Merge & Heap Sort — O(N log N)</li>
          </ul>
        </div>

        {/* Technical Architecture Tokens */}
        <div className="space-y-2.5">
          <h4 className="font-mono text-xs font-bold text-brand-emerald uppercase tracking-wider">CORE TECH STACK</h4>
          <div className="flex flex-wrap gap-1.5 text-[11px] font-mono">
            <span className="px-2.5 py-1 rounded-lg bg-slate-200/80 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300">React 18 + TS</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-200/80 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-brand-cyan font-bold">TailwindCSS 3.4</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-200/80 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-brand-indigo dark:text-brand-indigoLight">Leaflet GIS</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-200/80 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-brand-emerald font-bold">Web Audio API</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-200/80 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-brand-amber font-bold">Vite Build</span>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Strip */}
      <div className="max-w-7xl mx-auto pt-6 flex flex-wrap justify-between items-center text-xs font-mono text-slate-500 dark:text-slate-500 gap-2">
        <span>© 2026 ALGOLENZ // ROUTEVIZ STUDIO. ALL RIGHTS RESERVED.</span>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
            <CheckCircle className="w-3.5 h-3.5 text-brand-emerald" /> 60FPS SMOOTH GRAPH FLOW
          </span>
        </div>
      </div>
    </footer>
  );
};
