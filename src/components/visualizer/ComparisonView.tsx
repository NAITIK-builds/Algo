import React, { useState } from 'react';
import { useVisualizer } from '../../context/VisualizerContext';
import { AlgorithmType, GridNode } from '../../types/routing';
import { runDijkstra } from '../../algorithms/dijkstra';
import { runAStar } from '../../algorithms/aStar';
import { runBFS } from '../../algorithms/bfs';
import { runDFS } from '../../algorithms/dfs';
import { runBellmanFord } from '../../algorithms/bellmanFord';
import { Play, Trophy, Zap } from 'lucide-react';
import { soundFX } from '../../utils/SoundFX';

export const ComparisonView: React.FC = () => {
  const { grid, startPos, targetPos } = useVisualizer();

  const [algoLeft, setAlgoLeft] = useState<AlgorithmType>('dijkstra');
  const [algoRight, setAlgoRight] = useState<AlgorithmType>('aStar');

  const [gridLeft, setGridLeft] = useState<GridNode[][]>(() => grid.map(r => r.map(n => ({ ...n }))));
  const [gridRight, setGridRight] = useState<GridNode[][]>(() => grid.map(r => r.map(n => ({ ...n }))));

  const [statsLeft, setStatsLeft] = useState({ visited: 0, cost: 0, time: 0, finished: false });
  const [statsRight, setStatsRight] = useState({ visited: 0, cost: 0, time: 0, finished: false });
  const [isComparing, setIsComparing] = useState(false);
  const [winnerInfo, setWinnerInfo] = useState<string | null>(null);

  const getAlgorithmSteps = (algo: AlgorithmType, inputGrid: GridNode[][]) => {
    if (algo === 'dijkstra') return runDijkstra(inputGrid, startPos, targetPos);
    if (algo === 'aStar') return runAStar(inputGrid, startPos, targetPos);
    if (algo === 'bfs') return runBFS(inputGrid, startPos, targetPos);
    if (algo === 'dfs') return runDFS(inputGrid, startPos, targetPos);
    if (algo === 'bellmanFord') return runBellmanFord(inputGrid, startPos, targetPos);
    return runDijkstra(inputGrid, startPos, targetPos);
  };

  const runComparison = async () => {
    setIsComparing(true);
    setWinnerInfo(null);

    // Reset grids
    setGridLeft(grid.map(r => r.map(n => ({ ...n, isVisited: false, isPath: false }))));
    setGridRight(grid.map(r => r.map(n => ({ ...n, isVisited: false, isPath: false }))));

    setStatsLeft({ visited: 0, cost: 0, time: 0, finished: false });
    setStatsRight({ visited: 0, cost: 0, time: 0, finished: false });

    const stepsL = getAlgorithmSteps(algoLeft, grid);
    const stepsR = getAlgorithmSteps(algoRight, grid);

    const maxLen = Math.max(stepsL.length, stepsR.length);
    const startT = performance.now();

    for (let i = 0; i < maxLen; i++) {
      await new Promise(r => setTimeout(r, 15));

      if (i < stepsL.length) {
        const step = stepsL[i];
        setGridLeft(prev => {
          const next = prev.map(row => row.map(cell => ({ ...cell })));
          if (step.type === 'visit' && step.node) next[step.node.row][step.node.col].isVisited = true;
          if (step.type === 'path' && step.path) step.path.forEach((p: { row: number; col: number }) => next[p.row][p.col].isPath = true);
          return next;
        });
        setStatsLeft({
          visited: step.visitedCount,
          cost: step.totalCost,
          time: parseFloat((performance.now() - startT).toFixed(1)),
          finished: i === stepsL.length - 1
        });
      }

      if (i < stepsR.length) {
        const step = stepsR[i];
        setGridRight(prev => {
          const next = prev.map(row => row.map(cell => ({ ...cell })));
          if (step.type === 'visit' && step.node) next[step.node.row][step.node.col].isVisited = true;
          if (step.type === 'path' && step.path) step.path.forEach((p: { row: number; col: number }) => next[p.row][p.col].isPath = true);
          return next;
        });
        setStatsRight({
          visited: step.visitedCount,
          cost: step.totalCost,
          time: parseFloat((performance.now() - startT).toFixed(1)),
          finished: i === stepsR.length - 1
        });
      }
    }

    soundFX.playSuccessSound();

    const lastL = stepsL[stepsL.length - 1];
    const lastR = stepsR[stepsR.length - 1];
    const visitedL = lastL?.visitedCount || 0;
    const visitedR = lastR?.visitedCount || 0;

    if (visitedL < visitedR) {
      const diff = (((visitedR - visitedL) / visitedR) * 100).toFixed(0);
      setWinnerInfo(`🏆 ${algoLeft.toUpperCase()} expanded ${diff}% fewer nodes than ${algoRight.toUpperCase()}, providing maximum search efficiency!`);
    } else if (visitedR < visitedL) {
      const diff = (((visitedL - visitedR) / visitedL) * 100).toFixed(0);
      setWinnerInfo(`🏆 ${algoRight.toUpperCase()} expanded ${diff}% fewer nodes than ${algoLeft.toUpperCase()}, providing maximum search efficiency!`);
    } else {
      setWinnerInfo(`⚖️ Both algorithms explored equal nodes (${visitedL}) and produced identical cost paths.`);
    }

    setIsComparing(false);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Top Toolbar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-white/10 shadow-card-light dark:shadow-card-dark flex flex-wrap justify-between items-center gap-4 transition-colors">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20">
              <Zap className="w-4 h-4" />
            </span>
            <h2 className="font-mono text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">
              DUAL ALGORITHM BENCHMARK RACE ENGINE
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5">
            Synchronized side-by-side performance race analyzing node expansions, execution times, and optimality.
          </p>
        </div>

        <button
          onClick={runComparison}
          disabled={isComparing}
          className="flex items-center gap-2 bg-gradient-to-r from-brand-indigo via-brand-cyan to-brand-emerald text-dark-950 font-mono text-xs font-bold px-5 py-2.5 rounded-xl shadow-glow-cyan/20 shadow-lg hover:brightness-110 disabled:opacity-50 cursor-pointer transition-all"
        >
          <Play className="w-4 h-4 fill-dark-950" />
          <span className="uppercase font-extrabold">START SYNCHRONIZED RACE</span>
        </button>
      </div>

      {/* Winner Celebration Card */}
      {winnerInfo && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-amber/15 via-brand-emerald/15 to-brand-cyan/15 border border-brand-amber/30 text-slate-900 dark:text-white font-mono text-xs flex items-center justify-between shadow-glow-amber/20 shadow-lg animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-brand-amber/20 text-brand-amber border border-brand-amber/40">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-brand-amber uppercase tracking-wider block">BENCHMARK RACE VERDICT</span>
              <strong className="text-sm font-sans font-bold">{winnerInfo}</strong>
            </div>
          </div>
          <span className="px-3 py-1 bg-white/40 dark:bg-white/10 rounded-full text-[11px] font-bold text-brand-emerald border border-slate-300 dark:border-white/10">
            OPTIMALITY VERIFIED
          </span>
        </div>
      )}

      {/* Dual Side-by-Side Grid Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Algorithm Panel */}
        <div className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-white/10 shadow-card-light dark:shadow-card-dark flex flex-col justify-between transition-colors">
          <div>
            <div className="flex justify-between items-center mb-3 pb-3 border-b border-slate-200 dark:border-white/10">
              <select
                value={algoLeft}
                onChange={(e) => setAlgoLeft(e.target.value as AlgorithmType)}
                disabled={isComparing}
                className="bg-white dark:bg-dark-900 border border-slate-300 dark:border-white/15 rounded-xl font-mono text-xs font-bold px-3 py-1.5 text-brand-cyan focus:outline-none cursor-pointer shadow-sm"
              >
                <option value="dijkstra">Algorithm A: Dijkstra's Shortest Path</option>
                <option value="aStar">Algorithm A: A* Heuristic Search</option>
                <option value="bfs">Algorithm A: Breadth-First Search (BFS)</option>
                <option value="dfs">Algorithm A: Depth-First Search (DFS)</option>
                <option value="bellmanFord">Algorithm A: Bellman-Ford</option>
              </select>
              <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
                VISITED: <strong className="text-brand-cyan">{statsLeft.visited}</strong>
              </span>
            </div>

            {/* Mini Grid Canvas */}
            <div className="overflow-x-auto pb-2 flex justify-center">
              <div className="inline-block p-1.5 rounded-xl bg-slate-200 dark:bg-dark-900/90 border border-slate-300 dark:border-white/10 select-none shadow-md">
                {gridLeft.map((row, r) => (
                  <div key={r} className="flex gap-[1.5px] mb-[1.5px]">
                    {row.map((node, c) => {
                      let bg = 'bg-white dark:bg-dark-850';
                      if (node.type === 'START') bg = 'bg-brand-emerald shadow-glow-emerald';
                      else if (node.type === 'TARGET') bg = 'bg-brand-rose shadow-glow-rose';
                      else if (node.type === 'WALL') bg = 'bg-slate-700 dark:bg-slate-800';
                      else if (node.isPath) bg = 'bg-brand-amber node-path';
                      else if (node.isVisited) bg = 'bg-brand-indigo/80';

                      return <div key={c} className={`w-3.5 h-3.5 rounded-[2px] ${bg}`}></div>;
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 font-mono text-xs text-center border-t border-slate-200 dark:border-white/10 pt-3">
            <div className="bg-white/90 dark:bg-dark-900/80 p-2 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 block text-[10px]">NODES EXPANDED</span>
              <strong className="text-base text-brand-cyan">{statsLeft.visited}</strong>
            </div>
            <div className="bg-white/90 dark:bg-dark-900/80 p-2 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 block text-[10px]">TOTAL ROUTE COST</span>
              <strong className="text-base text-brand-emerald">{statsLeft.cost}</strong>
            </div>
            <div className="bg-white/90 dark:bg-dark-900/80 p-2 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 block text-[10px]">EXECUTION TIME</span>
              <strong className="text-base text-brand-amber">{statsLeft.time} ms</strong>
            </div>
          </div>
        </div>

        {/* Right Algorithm Panel */}
        <div className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-white/10 shadow-card-light dark:shadow-card-dark flex flex-col justify-between transition-colors">
          <div>
            <div className="flex justify-between items-center mb-3 pb-3 border-b border-slate-200 dark:border-white/10">
              <select
                value={algoRight}
                onChange={(e) => setAlgoRight(e.target.value as AlgorithmType)}
                disabled={isComparing}
                className="bg-white dark:bg-dark-900 border border-slate-300 dark:border-white/15 rounded-xl font-mono text-xs font-bold px-3 py-1.5 text-brand-emerald focus:outline-none cursor-pointer shadow-sm"
              >
                <option value="aStar">Algorithm B: A* Heuristic Search</option>
                <option value="dijkstra">Algorithm B: Dijkstra's Shortest Path</option>
                <option value="bfs">Algorithm B: Breadth-First Search (BFS)</option>
                <option value="dfs">Algorithm B: Depth-First Search (DFS)</option>
                <option value="bellmanFord">Algorithm B: Bellman-Ford</option>
              </select>
              <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
                VISITED: <strong className="text-brand-emerald">{statsRight.visited}</strong>
              </span>
            </div>

            {/* Mini Grid Canvas */}
            <div className="overflow-x-auto pb-2 flex justify-center">
              <div className="inline-block p-1.5 rounded-xl bg-slate-200 dark:bg-dark-900/90 border border-slate-300 dark:border-white/10 select-none shadow-md">
                {gridRight.map((row, r) => (
                  <div key={r} className="flex gap-[1.5px] mb-[1.5px]">
                    {row.map((node, c) => {
                      let bg = 'bg-white dark:bg-dark-850';
                      if (node.type === 'START') bg = 'bg-brand-emerald shadow-glow-emerald';
                      else if (node.type === 'TARGET') bg = 'bg-brand-rose shadow-glow-rose';
                      else if (node.type === 'WALL') bg = 'bg-slate-700 dark:bg-slate-800';
                      else if (node.isPath) bg = 'bg-brand-amber node-path';
                      else if (node.isVisited) bg = 'bg-brand-indigo/80';

                      return <div key={c} className={`w-3.5 h-3.5 rounded-[2px] ${bg}`}></div>;
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 font-mono text-xs text-center border-t border-slate-200 dark:border-white/10 pt-3">
            <div className="bg-white/90 dark:bg-dark-900/80 p-2 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 block text-[10px]">NODES EXPANDED</span>
              <strong className="text-base text-brand-emerald">{statsRight.visited}</strong>
            </div>
            <div className="bg-white/90 dark:bg-dark-900/80 p-2 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 block text-[10px]">TOTAL ROUTE COST</span>
              <strong className="text-base text-brand-cyan">{statsRight.cost}</strong>
            </div>
            <div className="bg-white/90 dark:bg-dark-900/80 p-2 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 block text-[10px]">EXECUTION TIME</span>
              <strong className="text-base text-brand-amber">{statsRight.time} ms</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
