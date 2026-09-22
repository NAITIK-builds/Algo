import React from 'react';
import { useVisualizer } from '../../context/VisualizerContext';
import { BookOpen, CheckCircle, Sparkles } from 'lucide-react';

export const AlgorithmInfoCard: React.FC = () => {
  const { algorithm } = useVisualizer();

  const infoMap = {
    dijkstra: {
      name: "Dijkstra's Shortest Path",
      timeComp: 'O((V + E) log V)',
      spaceComp: 'O(V)',
      guarantee: 'Guaranteed Mathematically Optimal',
      desc: 'Explores nodes uniformly by current lowest cumulative path cost using a priority queue. Unbeatable for positive edge weights.',
      useCase: 'Primary shortest route optimizer in Swiggy & Zomato delivery dispatch with real-time street traffic weights.'
    },
    aStar: {
      name: 'A* Heuristic Search (A-Star)',
      timeComp: 'O(E) Avg / O(b^d)',
      spaceComp: 'O(V)',
      guarantee: 'Guaranteed Optimal (Admissible Heuristic)',
      desc: 'Directs exploration towards the target using f(n) = g(n) + h(n), where h(n) is the Manhattan distance heuristic.',
      useCase: 'Google Maps / Uber turn-by-turn navigation engine avoiding unnecessary searches in opposite directions.'
    },
    bfs: {
      name: 'Breadth-First Search (BFS)',
      timeComp: 'O(V + E)',
      spaceComp: 'O(V)',
      guarantee: 'Optimal for Unweighted Graphs',
      desc: 'Explores all immediate neighbor nodes at current depth level before moving deeper. Treats all street weights as 1.',
      useCase: 'Nearest available delivery rider radius allocation and unweighted street grid proximity checks.'
    },
    dfs: {
      name: 'Depth-First Search (DFS)',
      timeComp: 'O(V + E)',
      spaceComp: 'O(V)',
      guarantee: 'Not Optimal for Shortest Path',
      desc: 'Traverses as deep as possible along each branch before backtracking. Explores long winding paths first.',
      useCase: 'Maze generation, cycle detection, topological sorting, and dead-end street topology analysis.'
    },
    bellmanFord: {
      name: 'Bellman-Ford Algorithm',
      timeComp: 'O(V · E)',
      spaceComp: 'O(V)',
      guarantee: 'Optimal & Detects Negative Cycles',
      desc: 'Relaxes all graph edges |V| - 1 times. Robustly accommodates negative weight values and promotional discount loops.',
      useCase: 'Multi-hub logistics pricing optimization with dynamic toll discounts and promotional delivery credits.'
    },
    tsp: {
      name: 'Held-Karp Dynamic Programming (TSP)',
      timeComp: 'O(2ⁿ · n²)',
      spaceComp: 'O(2ⁿ · n)',
      guarantee: 'Exact Optimal Multi-Stop Tour',
      desc: 'Dynamic programming with bitmask states to compute the absolute minimum distance tour through all order stops.',
      useCase: 'Batch order dispatch routing multiple food orders from various restaurants to distinct customer locations.'
    }
  };

  const currentInfo = infoMap[algorithm] || infoMap.dijkstra;

  return (
    <div className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-white/10 shadow-card-light dark:shadow-card-dark flex flex-col gap-3 transition-all">
      {/* Title */}
      <div className="flex justify-between items-center pb-2.5 border-b border-slate-200 dark:border-white/10">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-brand-indigo/10 text-brand-indigo dark:text-brand-indigoLight border border-brand-indigo/20">
            <BookOpen className="w-4 h-4" />
          </div>
          <h3 className="font-mono text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            ALGORITHM SPECIFICATION
          </h3>
        </div>
        <span className="flex items-center gap-1 text-[10px] font-mono text-brand-emerald font-semibold bg-brand-emerald/10 px-2 py-0.5 rounded-full border border-brand-emerald/20">
          <CheckCircle className="w-3 h-3" /> VERIFIED
        </span>
      </div>

      <div className="space-y-3 font-mono text-xs">
        <div>
          <span className="text-slate-500 dark:text-slate-400 text-[10px] font-bold block">NAME</span>
          <strong className="text-slate-900 dark:text-white text-sm font-sans font-bold">{currentInfo.name}</strong>
          <p className="text-[11px] font-sans text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            {currentInfo.desc}
          </p>
        </div>

        {/* Complexity Cards */}
        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200 dark:border-white/10">
          <div className="bg-white/90 dark:bg-dark-900/80 p-2.5 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
            <span className="text-brand-cyan text-[10px] font-bold block">TIME COMPLEXITY</span>
            <strong className="text-slate-900 dark:text-white text-xs">{currentInfo.timeComp}</strong>
          </div>
          <div className="bg-white/90 dark:bg-dark-900/80 p-2.5 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
            <span className="text-brand-indigo dark:text-brand-indigoLight text-[10px] font-bold block">SPACE COMPLEXITY</span>
            <strong className="text-slate-900 dark:text-white text-xs">{currentInfo.spaceComp}</strong>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-200 dark:border-white/10">
          <span className="text-brand-amber text-[10px] font-bold block mb-0.5">OPTIMALITY GUARANTEE</span>
          <span className="text-slate-700 dark:text-slate-200 font-medium text-[11px]">{currentInfo.guarantee}</span>
        </div>

        <div className="pt-2 border-t border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-white/5 p-2.5 rounded-xl border border-slate-200 dark:border-white/10">
          <span className="text-brand-cyan text-[10px] font-bold block mb-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> REAL-WORLD LOGISTICS APPLICATION
          </span>
          <p className="text-slate-700 dark:text-slate-300 font-sans text-[11px] leading-relaxed">
            {currentInfo.useCase}
          </p>
        </div>
      </div>
    </div>
  );
};
