import React, { useState, useRef, useEffect } from 'react';
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
  Target, 
  MapPin, 
  Ban, 
  Grid
} from 'lucide-react';

export const GridVisualizer: React.FC = () => {
  const {
    grid, setGrid,
    algorithm,
    activeTool,
    speed,
    isRunning, setIsRunning,
    isPaused, setIsPaused,
    setStats,
    startPos, setStartPos,
    targetPos, setTargetPos,
    clearPathOnly, resetGrid, clearWallsOnly
  } = useVisualizer();

  const isPausedRef = useRef(isPaused);
  const speedRef = useRef(speed);
  const cancelRef = useRef(false);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [hoverInfo, setHoverInfo] = useState<{
    row: number;
    col: number;
    title: string;
    weight: number;
    state: string;
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
    let stateLabel = 'Default';
    if (node.isPath) stateLabel = 'Optimal Path';
    else if (node.isVisited) stateLabel = 'Visited';
    else if (node.isFrontier) stateLabel = 'Frontier';

    let title = 'Unvisited Node';
    if (node.type === 'START') title = 'Rider (Origin)';
    else if (node.type === 'TARGET') title = 'Customer (Destination)';
    else if (node.type === 'WAYPOINT') title = 'Waypoint (Kitchen)';
    else if (node.type === 'WALL') title = 'Roadblock Barrier';
    else if (node.type === 'TRAFFIC_1') title = 'Light Traffic (+2)';
    else if (node.type === 'TRAFFIC_2') title = 'Moderate Traffic (+5)';
    else if (node.type === 'TRAFFIC_3') title = 'Severe Traffic (+10)';

    setHoverInfo({
      row,
      col,
      title,
      weight: node.weight,
      state: stateLabel
    });

    if (!isMouseDown || isRunning) return;

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
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    setDraggingNode(null);
  };

  const executeAlgorithm = async () => {
    if (isRunning) return;
    clearPathOnly();
    cancelRef.current = false;
    setIsRunning(true);
    setIsPaused(false);
    isPausedRef.current = false;

    let steps: any[] = [];
    const startTime = performance.now();

    // Check for intermediate waypoint
    let waypointPos: { row: number; col: number } | null = null;
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[0].length; c++) {
        if (grid[r][c].type === 'WAYPOINT') {
          waypointPos = { row: r, col: c };
          break;
        }
      }
      if (waypointPos) break;
    }

    if (waypointPos) {
      if (algorithm === 'dijkstra') {
        const leg1 = runDijkstra(grid, startPos, waypointPos);
        const leg2 = runDijkstra(grid, waypointPos, targetPos);
        steps = [...leg1, ...leg2];
      } else if (algorithm === 'aStar') {
        const leg1 = runAStar(grid, startPos, waypointPos);
        const leg2 = runAStar(grid, waypointPos, targetPos);
        steps = [...leg1, ...leg2];
      } else {
        steps = runDijkstra(grid, startPos, targetPos);
      }
    } else {
      switch (algorithm) {
        case 'dijkstra':
          steps = runDijkstra(grid, startPos, targetPos);
          break;
        case 'aStar':
          steps = runAStar(grid, startPos, targetPos);
          break;
        case 'bfs':
          steps = runBFS(grid, startPos, targetPos);
          break;
        case 'dfs':
          steps = runDFS(grid, startPos, targetPos);
          break;
        case 'bellmanFord':
          steps = runBellmanFord(grid, startPos, targetPos);
          break;
        default:
          steps = runDijkstra(grid, startPos, targetPos);
      }
    }

    for (let i = 0; i < steps.length; i++) {
      if (cancelRef.current) break;

      while (isPausedRef.current && !cancelRef.current) {
        await new Promise(resolve => setTimeout(resolve, 60));
      }
      if (cancelRef.current) break;

      const step = steps[i];
      await new Promise(resolve => setTimeout(resolve, speedRef.current));

      setGrid(prevGrid => {
        const nextGrid = prevGrid.map(r => r.map(n => ({ ...n })));

        if (step.type === 'visit' && step.node) {
          const { row, col } = step.node;
          if (nextGrid[row][col].type !== 'START' && nextGrid[row][col].type !== 'TARGET') {
            nextGrid[row][col].isVisited = true;
          }
          const pitch = 220 + ((row * 36 + col) % 36) * 16;
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
        executionTimeMs: parseFloat((performance.now() - startTime).toFixed(1))
      });
    }

    setIsRunning(false);
    setIsPaused(false);
    isPausedRef.current = false;
  };

  const colsCount = grid[0]?.length || 36;

  return (
    <div className="flex flex-col gap-4">
      {/* Top Playback Control Bar */}
      <PlaybackBar
        onRun={executeAlgorithm}
        onPause={() => {
          setIsPaused(true);
          isPausedRef.current = true;
        }}
        onReset={() => {
          cancelRef.current = true;
          setIsRunning(false);
          setIsPaused(false);
          isPausedRef.current = false;
          resetGrid();
        }}
        onClearPath={() => {
          cancelRef.current = true;
          setIsRunning(false);
          setIsPaused(false);
          isPausedRef.current = false;
          clearPathOnly();
        }}
        onClearWalls={clearWallsOnly}
      />

      {/* Balanced 8 : 4 Grid Layout (66.7% Grid, 33.3% Side Containers) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* Main Grid Viewport (8 Columns - Completely Fluid & Stable) */}
        <div className="lg:col-span-8 ui-panel p-4 sm:p-5 rounded-xl flex flex-col transition-colors">
          
          {/* Header & Legend */}
          <div className="w-full flex flex-wrap justify-between items-center text-xs pb-3 mb-3 border-b border-slate-200 dark:border-dark-800 text-slate-600 dark:text-slate-400 gap-2">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-3 h-3 rounded bg-brand-emerald inline-block" />
                <span>Origin</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-3 h-3 rounded bg-brand-rose inline-block" />
                <span>Destination</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-3 h-3 rounded bg-brand-amber inline-block" />
                <span>Waypoint</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-3 h-3 rounded bg-brand-primary inline-block" />
                <span>Visited</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-3 h-3 rounded bg-slate-800 dark:bg-slate-700 inline-block" />
                <span>Barrier</span>
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
              <Grid className="w-3.5 h-3.5" />
              <span>{grid.length}×{colsCount} ({grid.length * colsCount} cells)</span>
            </div>
          </div>

          {/* Interactive Cell Inspector Ribbon */}
          <div className="w-full bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-dark-800 rounded-lg px-3 py-1.5 mb-3 text-xs text-slate-600 dark:text-slate-400 flex flex-wrap justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 uppercase font-semibold text-[10px]">INSPECTOR:</span>
              <span className="font-medium text-slate-900 dark:text-slate-100">
                {hoverInfo ? hoverInfo.title : 'Hover over any cell or click & drag to edit grid'}
              </span>
            </div>
            {hoverInfo ? (
              <div className="flex items-center gap-3 font-mono text-[11px] text-slate-500">
                <span>R{hoverInfo.row}, C{hoverInfo.col}</span>
                <span>Weight: <strong className="text-brand-primary">+{hoverInfo.weight}</strong></span>
                <span>State: <strong className="text-slate-700 dark:text-slate-300">{hoverInfo.state}</strong></span>
              </div>
            ) : (
              <span className="text-[11px] text-slate-400 font-mono">100% Stable Vector Grid</span>
            )}
          </div>

          {/* 100% Fluid, Stable Canvas with ZERO Horizontal Scroll */}
          <div
            className="w-full p-2 rounded-xl bg-slate-100 dark:bg-dark-950 border border-slate-200 dark:border-dark-800 select-none overflow-hidden"
            style={{ touchAction: 'none' }}
            onMouseLeave={handleMouseUp}
            onMouseUp={handleMouseUp}
          >
            <div 
              className="grid gap-[2px] w-full"
              style={{ 
                gridTemplateColumns: `repeat(${colsCount}, minmax(0, 1fr))` 
              }}
            >
              {grid.flatMap((row, rIdx) =>
                row.map((node, cIdx) => {
                  let cellClasses = 'aspect-square w-full rounded-[2.5px] border border-slate-200/90 dark:border-dark-800/80 bg-white dark:bg-dark-900 flex items-center justify-center text-[10px] font-mono select-none transition-colors';
                  let icon = null;

                  if (node.type === 'START') {
                    cellClasses = 'aspect-square w-full rounded-[3px] bg-brand-emerald text-white font-bold flex items-center justify-center cursor-grab active:cursor-grabbing';
                    icon = <Navigation className="w-3 h-3 fill-current" />;
                  } else if (node.type === 'TARGET') {
                    cellClasses = 'aspect-square w-full rounded-[3px] bg-brand-rose text-white font-bold flex items-center justify-center cursor-grab active:cursor-grabbing';
                    icon = <Target className="w-3 h-3" />;
                  } else if (node.type === 'WAYPOINT') {
                    cellClasses = 'aspect-square w-full rounded-[3px] bg-brand-amber text-slate-950 font-bold flex items-center justify-center';
                    icon = <MapPin className="w-3 h-3" />;
                  } else if (node.type === 'WALL') {
                    cellClasses = 'aspect-square w-full rounded-[2.5px] bg-slate-800 dark:bg-slate-700 border-slate-700 flex items-center justify-center';
                    icon = <Ban className="w-2.5 h-2.5 text-slate-400" />;
                  } else if (node.type === 'TRAFFIC_1') {
                    cellClasses = 'aspect-square w-full rounded-[2.5px] bg-brand-accent/20 border-brand-accent/40 text-brand-accent font-semibold flex items-center justify-center';
                    icon = <span className="text-[8px] font-bold">+2</span>;
                  } else if (node.type === 'TRAFFIC_2') {
                    cellClasses = 'aspect-square w-full rounded-[2.5px] bg-brand-amber/25 border-brand-amber/40 text-brand-amber font-semibold flex items-center justify-center';
                    icon = <span className="text-[8px] font-bold">+5</span>;
                  } else if (node.type === 'TRAFFIC_3') {
                    cellClasses = 'aspect-square w-full rounded-[2.5px] bg-brand-rose/25 border-brand-rose/40 text-brand-rose font-semibold flex items-center justify-center';
                    icon = <span className="text-[8px] font-bold">+10</span>;
                  } else if (node.isPath) {
                    cellClasses = 'aspect-square w-full rounded-[2.5px] node-path text-slate-950 font-bold flex items-center justify-center';
                  } else if (node.isVisited) {
                    cellClasses = 'aspect-square w-full rounded-[2.5px] node-visited flex items-center justify-center';
                  } else if (node.isFrontier) {
                    cellClasses = 'aspect-square w-full rounded-[2.5px] node-frontier flex items-center justify-center';
                  }

                  return (
                    <div
                      key={`${rIdx}-${cIdx}`}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleMouseDown(rIdx, cIdx);
                      }}
                      onMouseEnter={() => handleMouseEnter(rIdx, cIdx)}
                      className={cellClasses}
                    >
                      {icon}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Side Containers (4 Columns - 33.3% Width with Room to Breathe) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <StatsPanel />
          <AlgorithmInfoCard />
        </div>

      </div>
    </div>
  );
};
