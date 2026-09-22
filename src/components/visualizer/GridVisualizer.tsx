import React, { useState } from 'react';
import { useVisualizer } from '../../context/VisualizerContext';
import { runDijkstra } from '../../algorithms/dijkstra';
import { runAStar } from '../../algorithms/aStar';
import { runBFS } from '../../algorithms/bfs';
import { runDFS } from '../../algorithms/dfs';
import { runBellmanFord } from '../../algorithms/bellmanFord';
import { soundFX } from '../../utils/SoundFX';
import { PlaybackBar } from '../controls/PlaybackBar';
import { StatsPanel } from '../analytics/StatsPanel';
import { AlgorithmInfoCard } from '../analytics/AlgorithmInfoCard';
import { 
  Navigation, 
  ShoppingBag, 
  Store, 
  ShieldAlert, 
  Compass
} from 'lucide-react';

export const GridVisualizer: React.FC = () => {
  const {
    grid, setGrid,
    algorithm,
    activeTool,
    speed,
    isRunning, setIsRunning,
    setIsPaused,
    setStats,
    startPos, setStartPos,
    targetPos, setTargetPos,
    clearPathOnly, resetGrid, clearWallsOnly
  } = useVisualizer();

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [hoverInfo, setHoverInfo] = useState<{
    row: number;
    col: number;
    title: string;
    weight: number;
    state: string;
    details: string;
  } | null>(null);

  const [draggingNode, setDraggingNode] = useState<'START' | 'TARGET' | null>(null);

  const handleCellClick = (row: number, col: number) => {
    if (isRunning) return;

    setGrid(prev => {
      const newGrid = prev.map(r => [...r]);
      const targetNode = { ...newGrid[row][col] };

      if (activeTool === 'START') {
        if (targetNode.type === 'TARGET') return prev;
        newGrid[startPos.row][startPos.col] = {
          ...newGrid[startPos.row][startPos.col],
          type: 'EMPTY',
          weight: 1
        };
        targetNode.type = 'START';
        targetNode.weight = 1;
        setStartPos({ row, col });
      } else if (activeTool === 'TARGET') {
        if (targetNode.type === 'START') return prev;
        newGrid[targetPos.row][targetPos.col] = {
          ...newGrid[targetPos.row][targetPos.col],
          type: 'EMPTY',
          weight: 1
        };
        targetNode.type = 'TARGET';
        targetNode.weight = 1;
        setTargetPos({ row, col });
      } else if (activeTool === 'WAYPOINT') {
        if (targetNode.type === 'START' || targetNode.type === 'TARGET') return prev;
        targetNode.type = targetNode.type === 'WAYPOINT' ? 'EMPTY' : 'WAYPOINT';
        targetNode.weight = 1;
      } else if (activeTool === 'WALL') {
        if (targetNode.type === 'START' || targetNode.type === 'TARGET') return prev;
        targetNode.type = targetNode.type === 'WALL' ? 'EMPTY' : 'WALL';
        targetNode.weight = 1;
      } else if (activeTool === 'TRAFFIC_1') {
        if (targetNode.type === 'START' || targetNode.type === 'TARGET') return prev;
        targetNode.type = targetNode.type === 'TRAFFIC_1' ? 'EMPTY' : 'TRAFFIC_1';
        targetNode.weight = targetNode.type === 'TRAFFIC_1' ? 2 : 1;
      } else if (activeTool === 'TRAFFIC_2') {
        if (targetNode.type === 'START' || targetNode.type === 'TARGET') return prev;
        targetNode.type = targetNode.type === 'TRAFFIC_2' ? 'EMPTY' : 'TRAFFIC_2';
        targetNode.weight = targetNode.type === 'TRAFFIC_2' ? 5 : 1;
      } else if (activeTool === 'TRAFFIC_3') {
        if (targetNode.type === 'START' || targetNode.type === 'TARGET') return prev;
        targetNode.type = targetNode.type === 'TRAFFIC_3' ? 'EMPTY' : 'TRAFFIC_3';
        targetNode.weight = targetNode.type === 'TRAFFIC_3' ? 10 : 1;
      } else if (activeTool === 'ERASER') {
        if (targetNode.type === 'START' || targetNode.type === 'TARGET') return prev;
        targetNode.type = 'EMPTY';
        targetNode.weight = 1;
      }

      newGrid[row][col] = targetNode;
      return newGrid;
    });
  };

  const handleMouseDown = (row: number, col: number) => {
    if (isRunning) return;
    setIsMouseDown(true);
    const node = grid[row][col];
    if (node.type === 'START') {
      setDraggingNode('START');
    } else if (node.type === 'TARGET') {
      setDraggingNode('TARGET');
    } else {
      handleCellClick(row, col);
    }
  };

  const handleMouseEnter = (row: number, col: number) => {
    const node = grid[row][col];
    let title = 'Standard Street Cell';
    let state = 'Unvisited';
    let details = `Row: ${row}, Col: ${col} • Weight: ${node.weight}`;

    if (node.type === 'START') {
      title = '🛵 Delivery Rider Hub (Start Node)';
      state = 'Origin Point';
    } else if (node.type === 'TARGET') {
      title = '📦 Customer Destination (Target Node)';
      state = 'Destination';
    } else if (node.type === 'WAYPOINT') {
      title = '🍔 Cloud Kitchen / Pickup Point';
      state = 'Intermediate Stop';
    } else if (node.type === 'WALL') {
      title = '🚧 Roadblock / Closed Street';
      state = 'Impassable Obstacle (Infinity Cost)';
    } else if (node.type === 'TRAFFIC_1') {
      title = '🛵 Light Traffic Flow';
      state = 'Slight Delay (+2 Weight Penalty)';
    } else if (node.type === 'TRAFFIC_2') {
      title = '🚗 Heavy Traffic Congestion';
      state = 'Moderate Delay (+5 Weight Penalty)';
    } else if (node.type === 'TRAFFIC_3') {
      title = '🚛 Severe Gridlock Jam';
      state = 'Severe Delay (+10 Weight Penalty)';
    } else if (node.isPath) {
      title = '⚡ Optimal Shortest Delivery Route';
      state = 'Final Solution Path';
    } else if (node.isVisited) {
      title = '🔍 Evaluated Node in Search Frontier';
      state = 'Visited & Relaxed';
    } else if (node.isFrontier) {
      title = '🌐 Frontier Open Set Node';
      state = 'Candidate in Priority Queue';
    }

    setHoverInfo({
      row,
      col,
      title,
      weight: node.weight,
      state,
      details
    });

    if (isMouseDown && !isRunning) {
      if (draggingNode === 'START') {
        if (node.type !== 'TARGET') {
          setGrid(prev => {
            const next = prev.map(r => [...r]);
            next[startPos.row][startPos.col] = { ...next[startPos.row][startPos.col], type: 'EMPTY', weight: 1 };
            next[row][col] = { ...next[row][col], type: 'START', weight: 1 };
            return next;
          });
          setStartPos({ row, col });
        }
      } else if (draggingNode === 'TARGET') {
        if (node.type !== 'START') {
          setGrid(prev => {
            const next = prev.map(r => [...r]);
            next[targetPos.row][targetPos.col] = { ...next[targetPos.row][targetPos.col], type: 'EMPTY', weight: 1 };
            next[row][col] = { ...next[row][col], type: 'TARGET', weight: 1 };
            return next;
          });
          setTargetPos({ row, col });
        }
      } else {
        handleCellClick(row, col);
      }
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    setDraggingNode(null);
  };

  const executeAlgorithm = async () => {
    clearPathOnly();
    setIsRunning(true);
    setIsPaused(false);

    let steps: any[] = [];
    if (algorithm === 'dijkstra') {
      steps = runDijkstra(grid, startPos, targetPos);
    } else if (algorithm === 'aStar') {
      steps = runAStar(grid, startPos, targetPos);
    } else if (algorithm === 'bfs') {
      steps = runBFS(grid, startPos, targetPos);
    } else if (algorithm === 'dfs') {
      steps = runDFS(grid, startPos, targetPos);
    } else if (algorithm === 'bellmanFord') {
      steps = runBellmanFord(grid, startPos, targetPos);
    }

    const startTime = performance.now();

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      await new Promise(resolve => setTimeout(resolve, speed));

      setGrid(prevGrid => {
        const nextGrid = prevGrid.map(r => r.map(n => ({ ...n })));

        if (step.type === 'visit' && step.node) {
          const { row, col } = step.node;
          if (nextGrid[row][col].type !== 'START' && nextGrid[row][col].type !== 'TARGET') {
            nextGrid[row][col].isVisited = true;
          }
          const pitch = 220 + ((row * 40 + col) % 36) * 16;
          soundFX.playStepSound(pitch);
        } else if (step.type === 'frontier' && step.frontierNodes) {
          step.frontierNodes.forEach((f: { row: number; col: number }) => {
            if (nextGrid[f.row][f.col].type !== 'START' && nextGrid[f.row][f.col].type !== 'TARGET') {
              nextGrid[f.row][f.col].isFrontier = true;
            }
          });
        } else if (step.type === 'path' && step.path) {
          step.path.forEach((p: { row: number; col: number }) => {
            if (nextGrid[p.row][p.col].type !== 'START' && nextGrid[p.row][p.col].type !== 'TARGET') {
              nextGrid[p.row][p.col].isPath = true;
            }
          });
          soundFX.playSuccessSound();
        }

        return nextGrid;
      });

      setStats({
        visitedCount: step.visitedCount,
        pathLength: step.pathLength,
        totalCost: step.totalCost,
        executionTimeMs: parseFloat((performance.now() - startTime).toFixed(2))
      });
    }

    setIsRunning(false);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Playback Dock */}
      <PlaybackBar
        onRun={executeAlgorithm}
        onPause={() => setIsPaused(true)}
        onReset={resetGrid}
        onClearPath={clearPathOnly}
        onClearWalls={clearWallsOnly}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Main Grid Canvas Viewport */}
        <div className="lg:col-span-3 glass-panel p-4 rounded-2xl border border-slate-200 dark:border-white/10 shadow-card-light dark:shadow-card-dark flex flex-col items-center transition-colors">
          {/* Header & Legend Bar */}
          <div className="w-full flex flex-wrap justify-between items-center text-xs font-mono mb-3 pb-3 border-b border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 gap-2">
            <div className="flex flex-wrap items-center gap-3.5">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-3.5 h-3.5 rounded-md bg-brand-emerald shadow-glow-emerald/40 shadow-sm inline-block"></span>
                <span>Rider (Start)</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-3.5 h-3.5 rounded-md bg-brand-rose shadow-glow-rose/40 shadow-sm inline-block"></span>
                <span>Customer (Target)</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-3.5 h-3.5 rounded-md bg-brand-amber shadow-glow-amber/40 shadow-sm inline-block"></span>
                <span>Route Path</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-3.5 h-3.5 rounded-md bg-brand-indigo/80 inline-block"></span>
                <span>Visited</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-3.5 h-3.5 rounded-md bg-brand-cyan/40 border border-brand-cyan inline-block"></span>
                <span>Frontier</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-3.5 h-3.5 rounded-md bg-slate-700 dark:bg-slate-800 border border-slate-600 dark:border-slate-700 inline-block"></span>
                <span>Roadblock</span>
              </span>
            </div>

            <div className="flex items-center gap-2 text-brand-cyan font-bold bg-slate-100 dark:bg-dark-900/90 px-3 py-1 rounded-full border border-slate-200 dark:border-white/10 shadow-sm">
              <Compass className="w-3.5 h-3.5" />
              <span>GRID: {grid.length}×{grid[0]?.length || 0} ({grid.length * (grid[0]?.length || 0)} NODES)</span>
            </div>
          </div>

          {/* Dynamic Cell Inspector Tooltip Bar */}
          <div className="w-full bg-slate-100/90 dark:bg-dark-900/90 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 mb-3.5 font-mono text-xs text-slate-700 dark:text-slate-300 flex flex-wrap justify-between items-center gap-2 shadow-inner">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse"></span>
              <span className="text-slate-500 dark:text-slate-400 font-bold">INSPECTOR:</span>
              <strong className="text-slate-900 dark:text-white font-sans font-semibold">
                {hoverInfo ? hoverInfo.title : 'Hover over any node to inspect properties & weights'}
              </strong>
            </div>
            {hoverInfo && (
              <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
                <span>COORD: <strong className="text-brand-cyan">({hoverInfo.row}, {hoverInfo.col})</strong></span>
                <span>WEIGHT: <strong className="text-brand-amber">+{hoverInfo.weight}</strong></span>
                <span className="text-slate-700 dark:text-slate-300">[{hoverInfo.state}]</span>
              </div>
            )}
          </div>

          {/* Interactive Responsive Grid Canvas */}
          <div className="w-full overflow-x-auto pb-3 flex justify-center scrollbar-none">
            <div
              className="inline-block p-2 rounded-2xl bg-slate-200/80 dark:bg-dark-900/90 border border-slate-300 dark:border-white/10 select-none cursor-pointer shadow-xl transition-colors"
              onMouseLeave={handleMouseUp}
              onMouseUp={handleMouseUp}
            >
              {grid.map((row, rIdx) => (
                <div key={rIdx} className="flex gap-[2px] mb-[2px]">
                  {row.map((node, cIdx) => {
                    let cellClasses = 'w-6 h-6 sm:w-7 sm:h-7 rounded-[4px] border border-slate-300/80 dark:border-white/5 bg-white dark:bg-dark-850 flex items-center justify-center text-[10px] font-mono transition-all duration-150 hover:scale-115 hover:z-20 hover:border-slate-400 dark:hover:border-white/40 hover:shadow-lg';
                    let icon = null;

                    if (node.type === 'START') {
                      cellClasses = 'w-6 h-6 sm:w-7 sm:h-7 rounded-[6px] bg-gradient-to-tr from-brand-emerald to-emerald-400 text-dark-950 font-bold scale-110 z-10 shadow-glow-emerald flex items-center justify-center cursor-grab active:cursor-grabbing border border-emerald-300';
                      icon = <Navigation className="w-3.5 h-3.5 fill-dark-950 text-dark-950 animate-pulse" />;
                    } else if (node.type === 'TARGET') {
                      cellClasses = 'w-6 h-6 sm:w-7 sm:h-7 rounded-[6px] bg-gradient-to-tr from-brand-rose to-rose-400 text-white font-bold scale-110 z-10 shadow-glow-rose flex items-center justify-center cursor-grab active:cursor-grabbing border border-rose-300';
                      icon = <ShoppingBag className="w-3.5 h-3.5 fill-white text-white animate-bounce" />;
                    } else if (node.type === 'WAYPOINT') {
                      cellClasses = 'w-6 h-6 sm:w-7 sm:h-7 rounded-[6px] bg-brand-amber text-dark-950 font-bold scale-105 z-10 shadow-glow-amber/40 flex items-center justify-center border border-amber-300';
                      icon = <Store className="w-3.5 h-3.5" />;
                    } else if (node.type === 'WALL') {
                      cellClasses = 'w-6 h-6 sm:w-7 sm:h-7 rounded-[4px] bg-slate-800 border-slate-700 text-slate-400 flex items-center justify-center shadow-inner';
                      icon = <ShieldAlert className="w-2.5 h-2.5 text-slate-400 opacity-80" />;
                    } else if (node.type === 'TRAFFIC_1') {
                      cellClasses = 'w-6 h-6 sm:w-7 sm:h-7 rounded-[4px] bg-brand-cyan/25 border-brand-cyan/50 text-brand-cyan font-bold flex items-center justify-center';
                      icon = <span className="text-[8px] font-bold">+2</span>;
                    } else if (node.type === 'TRAFFIC_2') {
                      cellClasses = 'w-6 h-6 sm:w-7 sm:h-7 rounded-[4px] bg-brand-amber/30 border-brand-amber/50 text-brand-amber font-bold flex items-center justify-center';
                      icon = <span className="text-[8px] font-bold">+5</span>;
                    } else if (node.type === 'TRAFFIC_3') {
                      cellClasses = 'w-6 h-6 sm:w-7 sm:h-7 rounded-[4px] bg-brand-rose/30 border-brand-rose/50 text-brand-rose font-bold flex items-center justify-center';
                      icon = <span className="text-[8px] font-bold">+10</span>;
                    } else if (node.isPath) {
                      cellClasses = 'w-6 h-6 sm:w-7 sm:h-7 rounded-[6px] node-path text-dark-950 font-bold scale-105 z-10 flex items-center justify-center border border-yellow-300';
                    } else if (node.isVisited) {
                      cellClasses = 'w-6 h-6 sm:w-7 sm:h-7 rounded-[4px] node-visited flex items-center justify-center border border-indigo-500/30';
                    } else if (node.isFrontier) {
                      cellClasses = 'w-6 h-6 sm:w-7 sm:h-7 rounded-[4px] node-frontier flex items-center justify-center border border-brand-cyan/40';
                    }

                    return (
                      <div
                        key={cIdx}
                        onMouseDown={() => handleMouseDown(rIdx, cIdx)}
                        onMouseEnter={() => handleMouseEnter(rIdx, cIdx)}
                        className={cellClasses}
                      >
                        {icon}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Telemetry & Specification Cards */}
        <div className="flex flex-col gap-4">
          <StatsPanel />
          <AlgorithmInfoCard />
        </div>
      </div>
    </div>
  );
};
