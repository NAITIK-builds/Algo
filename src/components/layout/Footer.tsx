import React from 'react';
import { Route, CheckCircle2, GraduationCap, Code2, Users } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white dark:bg-dark-950 border-t border-slate-200 dark:border-dark-800 mt-auto pt-10 pb-6 px-4 sm:px-6 transition-colors">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-200 dark:border-dark-800">
        
        {/* Brand Column */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-brand-primary flex items-center justify-center text-white">
              <Route className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-base text-slate-900 dark:text-white tracking-tight">
              AlgoLenz
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Algorithmic computation and interactive visualizer platform engineered for route optimization, multi-stop logistics, city road networks, and data structure education.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
            <span className="w-2 h-2 rounded-full bg-brand-emerald" />
            <span>Interactive Algorithmic Engine</span>
          </div>
        </div>

        {/* Project Team */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-brand-primary" />
            Project Team
          </h4>
          <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-400 font-mono">
            <li className="flex justify-between items-center py-0.5">
              <span className="text-slate-800 dark:text-slate-200 font-sans font-medium">Naitik</span>
              <span className="text-[11px] text-slate-400">24116002322</span>
            </li>
            <li className="flex justify-between items-center py-0.5">
              <span className="text-slate-800 dark:text-slate-200 font-sans font-medium">Kashish Gupta</span>
              <span className="text-[11px] text-slate-400">24116002274</span>
            </li>
            <li className="flex justify-between items-center py-0.5">
              <span className="text-slate-800 dark:text-slate-200 font-sans font-medium">Naitik Mishra</span>
              <span className="text-[11px] text-slate-400">24116002324</span>
            </li>
            <li className="flex justify-between items-center py-0.5">
              <span className="text-slate-800 dark:text-slate-200 font-sans font-medium">Khushboo Rajpoot</span>
              <span className="text-[11px] text-slate-400">24116002277</span>
            </li>
          </ul>
        </div>

        {/* Algorithm Suite */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-brand-primary" />
            Supported Algorithms
          </h4>
          <ul className="text-xs space-y-1 text-slate-500 dark:text-slate-400">
            <li>Dijkstra Shortest Path — <span className="font-mono text-[11px]">O(E log V)</span></li>
            <li>A* Heuristic Search — <span className="font-mono text-[11px]">O(E)</span></li>
            <li>Held-Karp Exact DP (TSP) — <span className="font-mono text-[11px]">O(2ⁿ · n²)</span></li>
            <li>Bellman-Ford — <span className="font-mono text-[11px]">O(V · E)</span></li>
            <li>Quick, Merge & Heap Sort — <span className="font-mono text-[11px]">O(N log N)</span></li>
          </ul>
        </div>

        {/* Academic Affiliation */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-brand-primary" />
            Institution & Department
          </h4>
          <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
            <div className="font-semibold text-slate-900 dark:text-white">
              PSIT College of Higher Education
            </div>
            <div>Affiliated to C.S.J.M. University, Kanpur</div>
            <div className="text-[11px] text-brand-primary font-medium pt-1">
              BCA-5005 Major Project Submission
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Copyright Strip */}
      <div className="max-w-7xl mx-auto pt-6 flex flex-wrap justify-between items-center text-xs text-slate-500 gap-3">
        <span>© 2026 AlgoLenz. PSIT Kanpur BCA Final Year Project.</span>
        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
          <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald" />
          <span>Interactive Algorithmic Computation Engine</span>
        </div>
      </div>
    </footer>
  );
};
