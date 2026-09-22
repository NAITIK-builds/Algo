import React, { createContext, useContext, useState, useEffect } from 'react';
import { GridNode, ModeType, AlgorithmType, ToolType } from '../types/routing';
import { createInitialGrid, DEFAULT_ROWS, DEFAULT_COLS } from '../utils/gridGenerator';
import { soundFX } from '../utils/SoundFX';

interface VisualizerContextType {
  mode: ModeType;
  setMode: (mode: ModeType) => void;
  algorithm: AlgorithmType;
  setAlgorithm: (algo: AlgorithmType) => void;
  compareAlgorithm: AlgorithmType;
  setCompareAlgorithm: (algo: AlgorithmType) => void;
  activeTool: ToolType;
  setActiveTool: (tool: ToolType) => void;
  speed: number;
  setSpeed: (speed: number) => void;
  grid: GridNode[][];
  setGrid: React.Dispatch<React.SetStateAction<GridNode[][]>>;
  isRunning: boolean;
  setIsRunning: (running: boolean) => void;
  isPaused: boolean;
  setIsPaused: (paused: boolean) => void;
  isSoundOn: boolean;
  toggleSound: () => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  stats: {
    visitedCount: number;
    pathLength: number;
    totalCost: number;
    executionTimeMs: number;
  };
  setStats: React.Dispatch<React.SetStateAction<{
    visitedCount: number;
    pathLength: number;
    totalCost: number;
    executionTimeMs: number;
  }>>;
  resetGrid: () => void;
  clearPathOnly: () => void;
  clearWallsOnly: () => void;
  startPos: { row: number; col: number };
  setStartPos: (pos: { row: number; col: number }) => void;
  targetPos: { row: number; col: number };
  setTargetPos: (pos: { row: number; col: number }) => void;
}

const VisualizerContext = createContext<VisualizerContextType | undefined>(undefined);

export const VisualizerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ModeType>('grid');
  const [algorithm, setAlgorithm] = useState<AlgorithmType>('dijkstra');
  const [compareAlgorithm, setCompareAlgorithm] = useState<AlgorithmType>('aStar');
  const [activeTool, setActiveTool] = useState<ToolType>('WALL');
  const [speed, setSpeed] = useState<number>(30);
  const [grid, setGrid] = useState<GridNode[][]>(() => createInitialGrid());
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isSoundOn, setIsSoundOn] = useState<boolean>(true);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  
  const [startPos, setStartPos] = useState({ row: Math.floor(DEFAULT_ROWS / 2), col: 4 });
  const [targetPos, setTargetPos] = useState({ row: Math.floor(DEFAULT_ROWS / 2), col: DEFAULT_COLS - 5 });

  const [stats, setStats] = useState({
    visitedCount: 0,
    pathLength: 0,
    totalCost: 0,
    executionTimeMs: 0
  });

  useEffect(() => {
    // Apply dark class to documentElement
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleSound = () => {
    const newState = soundFX.toggleSound();
    setIsSoundOn(newState);
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const resetGrid = () => {
    setGrid(createInitialGrid());
    setStartPos({ row: Math.floor(DEFAULT_ROWS / 2), col: 4 });
    setTargetPos({ row: Math.floor(DEFAULT_ROWS / 2), col: DEFAULT_COLS - 5 });
    setStats({ visitedCount: 0, pathLength: 0, totalCost: 0, executionTimeMs: 0 });
    setIsRunning(false);
    setIsPaused(false);
  };

  const clearPathOnly = () => {
    setGrid(prev => prev.map(r => r.map(n => ({
      ...n,
      isVisited: false,
      isFrontier: false,
      isPath: false,
      distance: Infinity,
      heuristic: 0,
      totalDistance: Infinity,
      previousNode: null
    }))));
    setStats({ visitedCount: 0, pathLength: 0, totalCost: 0, executionTimeMs: 0 });
  };

  const clearWallsOnly = () => {
    setGrid(prev => prev.map(r => r.map(n => ({
      ...n,
      type: (n.type === 'START' || n.type === 'TARGET' || n.type === 'WAYPOINT') ? n.type : 'EMPTY',
      weight: 1,
      isVisited: false,
      isFrontier: false,
      isPath: false,
      distance: Infinity,
      previousNode: null
    }))));
    setStats({ visitedCount: 0, pathLength: 0, totalCost: 0, executionTimeMs: 0 });
  };

  return (
    <VisualizerContext.Provider value={{
      mode, setMode,
      algorithm, setAlgorithm,
      compareAlgorithm, setCompareAlgorithm,
      activeTool, setActiveTool,
      speed, setSpeed,
      grid, setGrid,
      isRunning, setIsRunning,
      isPaused, setIsPaused,
      isSoundOn, toggleSound,
      theme, toggleTheme,
      stats, setStats,
      resetGrid, clearPathOnly, clearWallsOnly,
      startPos, setStartPos,
      targetPos, setTargetPos
    }}>
      {children}
    </VisualizerContext.Provider>
  );
};

export const useVisualizer = () => {
  const context = useContext(VisualizerContext);
  if (!context) throw new Error('useVisualizer must be used within VisualizerProvider');
  return context;
};
