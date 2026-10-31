import React, { useState, useEffect, useRef, useMemo } from 'react';
import { SortingAlgorithmType, SortingStep } from '../../types/routing';
import { 
  runQuickSort, 
  runMergeSort, 
  runBubbleSort, 
  runInsertionSort, 
  runSelectionSort, 
  runHeapSort 
} from '../../algorithms/sorting';
import { soundFX } from '../../utils/SoundFX';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  BarChart2, 
  Layers, 
  Grid, 
  Code, 
  StepForward,
  StepBack,
  SkipBack,
  SkipForward,
  ArrowRightLeft,
  ChevronDown,
  CheckCircle2,
  SlidersHorizontal,
  Info,
  TrendingDown,
  Edit3
} from 'lucide-react';

type SortingViewMode = 'cards' | 'bars' | 'scatter';

// Helper to count remaining out-of-order pairs (inversions)
function countInversions(arr: number[]): number {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) count++;
    }
  }
  return count;
}

export const SortingView: React.FC = () => {
  const [algo, setAlgo] = useState<SortingAlgorithmType>('quicksort');
  const [viewMode, setViewMode] = useState<SortingViewMode>('cards');
  const [arraySize, setArraySize] = useState<number>(12);
  const [speedMs, setSpeedMs] = useState<number>(300);
  
  // Custom Input Modal / Popover state
  const [showCustomModal, setShowCustomModal] = useState<boolean>(false);
  const [customInputText, setCustomInputText] = useState<string>('42, 17, 89, 23, 65, 8, 54, 31, 76, 12');

  // Core array & generated steps
  const [initialArray, setInitialArray] = useState<number[]>([]);
  const [currentArray, setCurrentArray] = useState<number[]>([]);
  const [steps, setSteps] = useState<SortingStep[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const speedRef = useRef<number>(speedMs);
  const isPlayingRef = useRef<boolean>(false);
  const playTimerRef = useRef<any>(null);

  useEffect(() => {
    speedRef.current = speedMs;
  }, [speedMs]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Generate steps whenever initial array or algorithm changes
  const initEngineWithArray = (arr: number[], selectedAlgo: SortingAlgorithmType = algo) => {
    if (playTimerRef.current) clearTimeout(playTimerRef.current);
    setIsPlaying(false);
    isPlayingRef.current = false;

    let generated: SortingStep[] = [];
    if (selectedAlgo === 'quicksort') generated = runQuickSort(arr);
    else if (selectedAlgo === 'bubblesort') generated = runBubbleSort(arr);
    else if (selectedAlgo === 'insertionsort') generated = runInsertionSort(arr);
    else if (selectedAlgo === 'selectionsort') generated = runSelectionSort(arr);
    else if (selectedAlgo === 'mergesort') generated = runMergeSort(arr);
    else if (selectedAlgo === 'heapsort') generated = runHeapSort(arr);

    setInitialArray(arr);
    setCurrentArray([...arr]);
    setSteps(generated);
    setCurrentStepIdx(-1);
  };

  const generateRandomArray = (size = arraySize, currentAlgo = algo) => {
    const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 85) + 15);
    initEngineWithArray(arr, currentAlgo);
  };

  const generateNearlySortedArray = () => {
    const sorted = Array.from({ length: arraySize }, (_, i) => Math.floor((i + 1) * (90 / arraySize)) + 10);
    const i1 = Math.floor(Math.random() * arraySize);
    const i2 = (i1 + 3) % arraySize;
    [sorted[i1], sorted[i2]] = [sorted[i2], sorted[i1]];
    initEngineWithArray(sorted);
  };

  const generateReversedArray = () => {
    const reversed = Array.from({ length: arraySize }, (_, i) => Math.floor((arraySize - i) * (90 / arraySize)) + 10);
    initEngineWithArray(reversed);
  };

  const generateDuplicatesArray = () => {
    const base = [15, 35, 60, 85];
    const arr = Array.from({ length: arraySize }, () => base[Math.floor(Math.random() * base.length)]);
    initEngineWithArray(arr);
  };

  const applyCustomInput = () => {
    const parsed = customInputText
      .split(/[, ]+/)
      .map(s => parseInt(s.trim(), 10))
      .filter(n => !isNaN(n) && n > 0 && n <= 99);

    if (parsed.length < 4) {
      alert('Please enter at least 4 numbers (values between 1 and 99).');
      return;
    }
    setArraySize(parsed.length);
    setShowCustomModal(false);
    initEngineWithArray(parsed);
  };

  // Re-init on mount or size / algo change
  useEffect(() => {
    generateRandomArray(arraySize, algo);
  }, [arraySize, algo]);

  // Compute visual snapshot at any step index
  const snapshot = useMemo(() => {
    if (currentStepIdx < 0) {
      return {
        array: initialArray,
        activeCompare: [] as number[],
        activeSwap: [] as number[],
        swapTargets: {} as Record<number, number>,
        sortedIndices: [] as number[],
        comparisons: 0,
        swaps: 0,
        activeLine: undefined as number | undefined,
        pointers: {} as Record<string, number>,
        description: `Ready. Click "Run Sorting" or scrub the timeline to explore ${algo.toUpperCase()}.`,
        subArrayRange: undefined as [number, number] | undefined
      };
    }

    const curr = [...initialArray];
    const sorted = new Set<number>();

    for (let i = 0; i <= currentStepIdx && i < steps.length; i++) {
      const step = steps[i];
      if (step.type === 'swap') {
        if (step.indices.length === 2 && step.values && step.values.length === 2) {
          curr[step.indices[0]] = step.values[0];
          curr[step.indices[1]] = step.values[1];
        } else if (step.indices.length === 1 && step.values) {
          curr[step.indices[0]] = step.values[0];
        }
      } else if (step.type === 'sorted') {
        step.indices.forEach(idx => sorted.add(idx));
      }
    }

    const currentStep = steps[currentStepIdx] || steps[steps.length - 1];
    const activeCompare = currentStep.type === 'compare' ? currentStep.indices : [];
    const activeSwap = currentStep.type === 'swap' ? currentStep.indices : [];

    const swapTargets: Record<number, number> = {};
    if (currentStep.type === 'swap' && currentStep.indices.length === 2) {
      swapTargets[currentStep.indices[0]] = currentStep.indices[1];
      swapTargets[currentStep.indices[1]] = currentStep.indices[0];
    }

    return {
      array: curr,
      activeCompare,
      activeSwap,
      swapTargets,
      sortedIndices: Array.from(sorted),
      comparisons: currentStep.comparisons,
      swaps: currentStep.swaps,
      activeLine: currentStep.activeLine,
      pointers: currentStep.pointers || {},
      description: currentStep.description || 'Executing step...',
      subArrayRange: currentStep.subArrayRange
    };
  }, [currentStepIdx, initialArray, steps, algo]);

  // Update current array
  useEffect(() => {
    setCurrentArray(snapshot.array);
  }, [snapshot.array]);

  // Audio trigger on step advance
  const playAudioForStep = (idx: number) => {
    if (idx < 0 || idx >= steps.length) return;
    const step = steps[idx];
    if (step.type === 'compare' && step.indices.length > 0) {
      const val = snapshot.array[step.indices[0]] || 40;
      soundFX.playStepSound(180 + val * 6);
    } else if (step.type === 'swap' && step.indices.length > 0) {
      const val = snapshot.array[step.indices[0]] || 50;
      soundFX.playStepSound(300 + val * 7);
    } else if (step.type === 'finish') {
      soundFX.playSuccessSound();
    }
  };

  // Playback loop
  useEffect(() => {
    if (!isPlaying) {
      if (playTimerRef.current) clearTimeout(playTimerRef.current);
      return;
    }

    if (currentStepIdx >= steps.length - 1) {
      setIsPlaying(false);
      isPlayingRef.current = false;
      soundFX.playSuccessSound();
      return;
    }

    playTimerRef.current = setTimeout(() => {
      setCurrentStepIdx(prev => {
        const next = prev + 1;
        playAudioForStep(next);
        return next;
      });
    }, speedMs);

    return () => {
      if (playTimerRef.current) clearTimeout(playTimerRef.current);
    };
  }, [isPlaying, currentStepIdx, steps.length, speedMs]);

  // Stepping controls
  const handleTogglePlay = () => {
    if (currentStepIdx >= steps.length - 1) {
      setCurrentStepIdx(-1);
    }
    setIsPlaying(prev => !prev);
  };

  const handleStepForward = () => {
    setIsPlaying(false);
    if (currentStepIdx < steps.length - 1) {
      const next = currentStepIdx + 1;
      setCurrentStepIdx(next);
      playAudioForStep(next);
    }
  };

  const handleStepBack = () => {
    setIsPlaying(false);
    if (currentStepIdx > -1) {
      setCurrentStepIdx(prev => prev - 1);
    }
  };

  const handleJumpToFirst = () => {
    setIsPlaying(false);
    setCurrentStepIdx(-1);
  };

  const handleJumpToLast = () => {
    setIsPlaying(false);
    setCurrentStepIdx(steps.length - 1);
  };

  // Inversion metrics
  const maxPossibleInversions = (arraySize * (arraySize - 1)) / 2;
  const currentInversions = countInversions(snapshot.array);
  const sortedPercentage = maxPossibleInversions > 0 
    ? Math.max(0, Math.min(100, Math.round((1 - (currentInversions / maxPossibleInversions)) * 100))) 
    : 100;

  const maxVal = Math.max(...snapshot.array, 100);

  // Specifications and pseudocode for all 6 algorithms
  const algoSpecs: Record<SortingAlgorithmType, {
    name: string;
    bestTime: string;
    avgTime: string;
    worstTime: string;
    space: string;
    stable: boolean;
    inPlace: boolean;
    method: string;
    concept: string;
    code: string[];
  }> = {
    quicksort: {
      name: 'Quick Sort',
      bestTime: 'O(N log N)',
      avgTime: 'O(N log N)',
      worstTime: 'O(N²)',
      space: 'O(log N)',
      stable: false,
      inPlace: true,
      method: 'Divide and Conquer (Pivot Partitioning)',
      concept: 'Picks a pivot and partitions the array such that all elements smaller than the pivot are placed to its left, and all larger elements are placed to its right.',
      code: [
        'function quickSort(arr, low, high):',
        '  if low < high:',
        '    pivotIndex = partition(arr, low, high)',
        '    quickSort(arr, low, pivotIndex - 1)',
        '    quickSort(arr, pivotIndex + 1, high)',
        'function partition(arr, low, high):',
        '  pivot = arr[high], i = low - 1',
        '  for j = low to high - 1:',
        '    if arr[j] <= pivot:',
        '      i++; swap(arr[i], arr[j])',
        '  swap(arr[i + 1], arr[high]); return i + 1'
      ]
    },
    mergesort: {
      name: 'Merge Sort',
      bestTime: 'O(N log N)',
      avgTime: 'O(N log N)',
      worstTime: 'O(N log N)',
      space: 'O(N)',
      stable: true,
      inPlace: false,
      method: 'Divide and Conquer (Recursive Merging)',
      concept: 'Recursively divides the array into halves until each sub-array has 1 element, then repeatedly merges sorted sub-arrays in guaranteed linear time.',
      code: [
        'function mergeSort(arr, left, right):',
        '  if left >= right: return',
        '  mid = floor((left + right) / 2)',
        '  mergeSort(arr, left, mid)',
        '  mergeSort(arr, mid + 1, right)',
        '  merge(arr, left, mid, right)',
        'function merge(arr, left, mid, right):',
        '  compare left[i] with right[j]',
        '  copy smaller element into merged array'
      ]
    },
    bubblesort: {
      name: 'Bubble Sort',
      bestTime: 'O(N)',
      avgTime: 'O(N²)',
      worstTime: 'O(N²)',
      space: 'O(1)',
      stable: true,
      inPlace: true,
      method: 'Exchanging (Adjacent Swapping)',
      concept: 'Repeatedly steps through the list, compares adjacent elements, and swaps them if out of order. With each pass, the largest unsorted element "bubbles" to its final position.',
      code: [
        'function bubbleSort(arr):',
        '  for i = 0 to n - 1:',
        '    for j = 0 to n - i - 2:',
        '      if arr[j] > arr[j + 1]:',
        '        swap(arr[j], arr[j + 1])',
        '    arr[n - i - 1] locked in sorted position'
      ]
    },
    insertionsort: {
      name: 'Insertion Sort',
      bestTime: 'O(N)',
      avgTime: 'O(N²)',
      worstTime: 'O(N²)',
      space: 'O(1)',
      stable: true,
      inPlace: true,
      method: 'Incremental Insertion',
      concept: 'Iteratively builds a sorted prefix one element at a time, picking the current element (key) and scanning leftward to shift larger elements and insert the key into place.',
      code: [
        'function insertionSort(arr):',
        '  for i = 1 to n - 1:',
        '    key = arr[i], j = i - 1',
        '    while j >= 0 and arr[j] > key:',
        '      arr[j + 1] = arr[j]; j--',
        '    arr[j + 1] = key'
      ]
    },
    selectionsort: {
      name: 'Selection Sort',
      bestTime: 'O(N²)',
      avgTime: 'O(N²)',
      worstTime: 'O(N²)',
      space: 'O(1)',
      stable: false,
      inPlace: true,
      method: 'Selection (Global Minimum Finding)',
      concept: 'Divides the array into sorted and unsorted regions. In each pass, it finds the smallest element in the unsorted region and swaps it with the first unsorted position.',
      code: [
        'function selectionSort(arr):',
        '  for i = 0 to n - 1:',
        '    minIdx = i',
        '    for j = i + 1 to n - 1:',
        '      if arr[j] < arr[minIdx]: minIdx = j',
        '    if minIdx != i: swap(arr[i], arr[minIdx])'
      ]
    },
    heapsort: {
      name: 'Heap Sort',
      bestTime: 'O(N log N)',
      avgTime: 'O(N log N)',
      worstTime: 'O(N log N)',
      space: 'O(1)',
      stable: false,
      inPlace: true,
      method: 'Selection (Complete Binary Max-Heap)',
      concept: 'Transforms the array into a Max-Heap structure where the parent is always greater than its children, then repeatedly extracts the root max to the end of the array.',
      code: [
        'function heapSort(arr):',
        '  buildMaxHeap(arr)',
        '  for i = n - 1 down to 1:',
        '    swap(arr[0], arr[i])',
        '    maxHeapify(arr, 0, i)',
        'function maxHeapify(arr, root, size):',
        '  find largest of root, left & right child',
        '  if largest != root: swap and recurse'
      ]
    }
  };

  const currentSpec = algoSpecs[algo];

  return (
    <div className="flex flex-col gap-4">
      {/* 1. Header Toolbar (Algorithm Selector, Display Mode, Presets) */}
      <div className="ui-panel p-4 rounded-xl flex flex-wrap justify-between items-center gap-4 transition-colors">
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Select Algorithm */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Algorithm
            </label>
            <div className="relative">
              <select
                value={algo}
                onChange={(e) => setAlgo(e.target.value as SortingAlgorithmType)}
                className="appearance-none bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-dark-750 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-brand-primary cursor-pointer pr-7"
              >
                <option value="quicksort">Quick Sort — O(N log N) [Pivot Partitioning]</option>
                <option value="mergesort">Merge Sort — O(N log N) [Stable Divide & Conquer]</option>
                <option value="heapsort">Heap Sort — O(N log N) [Max-Heap Tree]</option>
                <option value="insertionsort">Insertion Sort — O(N²) [Adaptive / Online]</option>
                <option value="selectionsort">Selection Sort — O(N²) [Min Element Swap]</option>
                <option value="bubblesort">Bubble Sort — O(N²) [Adjacent Exchange]</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Display Mode */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Canvas Mode
            </label>
            <div className="flex border border-slate-200 dark:border-dark-800 bg-slate-100 dark:bg-dark-900 p-0.5 rounded-lg">
              <button
                onClick={() => { setViewMode('cards'); if (arraySize > 18) setArraySize(12); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  viewMode === 'cards' 
                    ? 'bg-white dark:bg-dark-800 text-brand-primary dark:text-white shadow-subtle font-semibold' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" /> 3D Cards
              </button>
              <button
                onClick={() => setViewMode('bars')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  viewMode === 'bars' 
                    ? 'bg-white dark:bg-dark-800 text-brand-primary dark:text-white shadow-subtle font-semibold' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <BarChart2 className="w-3.5 h-3.5" /> Sound Bars
              </button>
              <button
                onClick={() => setViewMode('scatter')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  viewMode === 'scatter' 
                    ? 'bg-white dark:bg-dark-800 text-brand-primary dark:text-white shadow-subtle font-semibold' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <Grid className="w-3.5 h-3.5" /> Scatter
              </button>
            </div>
          </div>

          {/* Elements Count Slider */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold text-slate-500 uppercase flex items-center justify-between">
              <span>Size</span>
              <span className="font-mono text-brand-primary">[{arraySize}]</span>
            </label>
            <input
              type="range"
              min="6"
              max={viewMode === 'cards' ? '18' : '50'}
              value={arraySize}
              onChange={(e) => setArraySize(Number(e.target.value))}
              className="w-20 accent-brand-primary cursor-pointer"
            />
          </div>

          {/* Speed Selector */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold text-slate-500 uppercase">
              Speed ({speedMs}ms)
            </label>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSpeedMs(600)}
                className={`px-2 py-1 rounded text-[11px] font-medium border transition-colors ${
                  speedMs >= 500
                    ? 'bg-brand-primary text-white border-brand-primary font-semibold'
                    : 'bg-white dark:bg-dark-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-dark-800'
                }`}
              >
                Slow
              </button>
              <button
                onClick={() => setSpeedMs(250)}
                className={`px-2 py-1 rounded text-[11px] font-medium border transition-colors ${
                  speedMs >= 150 && speedMs < 500
                    ? 'bg-brand-primary text-white border-brand-primary font-semibold'
                    : 'bg-white dark:bg-dark-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-dark-800'
                }`}
              >
                Normal
              </button>
              <button
                onClick={() => setSpeedMs(40)}
                className={`px-2 py-1 rounded text-[11px] font-medium border transition-colors ${
                  speedMs < 150
                    ? 'bg-brand-primary text-white border-brand-primary font-semibold'
                    : 'bg-white dark:bg-dark-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-dark-800'
                }`}
              >
                Fast
              </button>
            </div>
          </div>
        </div>

        {/* Array Generation Presets */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => generateRandomArray()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white dark:bg-dark-900 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-dark-800 hover:border-slate-300 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Shuffle</span>
          </button>

          <button
            onClick={generateNearlySortedArray}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white dark:bg-dark-900 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-dark-800 hover:border-slate-300 transition-colors cursor-pointer"
          >
            Nearly Sorted
          </button>

          <button
            onClick={generateReversedArray}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white dark:bg-dark-900 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-dark-800 hover:border-slate-300 transition-colors cursor-pointer"
          >
            Reversed
          </button>

          <button
            onClick={generateDuplicatesArray}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white dark:bg-dark-900 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-dark-800 hover:border-slate-300 transition-colors cursor-pointer"
          >
            Duplicates
          </button>

          <button
            onClick={() => setShowCustomModal(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-brand-primary/10 text-brand-primary border border-brand-primary/30 hover:bg-brand-primary/20 transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Custom</span>
          </button>
        </div>
      </div>

      {/* 2. Interactive Time-Travel Playback & Timeline Bar */}
      <div className="ui-panel p-3.5 rounded-xl flex flex-wrap items-center justify-between gap-4 transition-colors">
        
        {/* Playback Button Group */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleJumpToFirst}
            title="Jump to Start"
            className="p-2 rounded-lg bg-slate-100 dark:bg-dark-900 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-dark-800 transition-colors cursor-pointer"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleStepBack}
            disabled={currentStepIdx <= -1}
            title="Step Backward"
            className="p-2 rounded-lg bg-slate-100 dark:bg-dark-900 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-dark-800 transition-colors disabled:opacity-40 cursor-pointer"
          >
            <StepBack className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleTogglePlay}
            className={`flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-all cursor-pointer ${
              isPlaying
                ? 'bg-brand-amber hover:bg-amber-600 text-slate-950'
                : 'bg-brand-primary hover:bg-brand-primaryHover text-white shadow-brand-primary/25'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{currentStepIdx >= steps.length - 1 ? 'Replay' : 'Run Sorting'}</span>
              </>
            )}
          </button>

          <button
            onClick={handleStepForward}
            disabled={currentStepIdx >= steps.length - 1}
            title="Step Forward"
            className="p-2 rounded-lg bg-slate-100 dark:bg-dark-900 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-dark-800 transition-colors disabled:opacity-40 cursor-pointer"
          >
            <StepForward className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleJumpToLast}
            title="Fast-forward to End"
            className="p-2 rounded-lg bg-slate-100 dark:bg-dark-900 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-dark-800 transition-colors cursor-pointer"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Scrubbing Timeline Slider */}
        <div className="flex-1 min-w-[220px] flex items-center gap-3">
          <span className="text-[11px] font-mono text-slate-500 whitespace-nowrap">
            Step: <strong className="text-slate-900 dark:text-white">{currentStepIdx + 1}</strong> / {steps.length}
          </span>
          <input
            type="range"
            min="-1"
            max={steps.length - 1}
            value={currentStepIdx}
            onChange={(e) => {
              setIsPlaying(false);
              const val = Number(e.target.value);
              setCurrentStepIdx(val);
              playAudioForStep(val);
            }}
            className="flex-1 accent-brand-primary cursor-pointer h-1.5"
          />
        </div>

        {/* Live Inversions & Sortedness Telemetry */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-dark-900 border border-slate-200 dark:border-dark-800">
            <span className="text-slate-500 text-[10px] uppercase">Sortedness:</span>
            <span className="font-bold text-brand-emerald">{sortedPercentage}%</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-dark-900 border border-slate-200 dark:border-dark-800">
            <TrendingDown className="w-3.5 h-3.5 text-brand-amber" />
            <span className="text-slate-500 text-[10px] uppercase">Inversions:</span>
            <span className="font-bold text-slate-900 dark:text-white">{currentInversions}</span>
          </div>
        </div>
      </div>

      {/* 3. Real-time Step Explainer Ribbon */}
      <div className="p-3 rounded-lg bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-dark-800 flex flex-wrap items-center justify-between text-xs gap-3">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full shrink-0 ${isPlaying ? 'bg-brand-primary animate-pulse' : 'bg-slate-400'}`} />
          <span className="font-semibold text-slate-900 dark:text-white uppercase text-[10px] tracking-wider">
            Current Action:
          </span>
          <span className="text-slate-700 dark:text-slate-300 font-medium">
            {snapshot.description}
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono text-slate-500">
          <span>Comparisons: <strong className="text-slate-900 dark:text-white">{snapshot.comparisons}</strong></span>
          <span>Swaps / Writes: <strong className="text-brand-amber">{snapshot.swaps}</strong></span>
        </div>
      </div>

      {/* 4. Main Canvas & Pseudocode Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        
        {/* Canvas Viewport */}
        <div className="lg:col-span-3 ui-panel p-5 rounded-xl flex flex-col justify-between min-h-[440px] transition-colors relative">
          
          {/* Active Sub-array Range Banner (for QuickSort & MergeSort) */}
          {snapshot.subArrayRange && (
            <div className="text-[11px] font-mono text-slate-500 pb-2 mb-2 border-b border-slate-200 dark:border-dark-800 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-primary" />
                Active Partition Range: <strong className="text-brand-primary">Indices [{snapshot.subArrayRange[0]} ... {snapshot.subArrayRange[1]}]</strong>
              </span>
              <span className="text-slate-400 text-[10px]">Elements outside this range are paused</span>
            </div>
          )}

          {/* MODE 1: 3D CARD BLOCKS */}
          {viewMode === 'cards' && (
            <div className="flex-1 flex flex-col justify-center items-center py-6">
              <div className="flex flex-wrap justify-center items-end gap-3 max-w-full">
                {snapshot.array.map((val, idx) => {
                  const isComparing = snapshot.activeCompare.includes(idx);
                  const isSwapping = snapshot.activeSwap.includes(idx);
                  const isSorted = snapshot.sortedIndices.includes(idx);
                  const targetIdx = snapshot.swapTargets[idx];

                  // Check if any pointers match this index (e.g. pivot, i, j, min)
                  const matchingPointers = Object.entries(snapshot.pointers)
                    .filter(([_, ptrIdx]) => ptrIdx === idx)
                    .map(([ptrName]) => ptrName);

                  let cardStyle = 'bg-white dark:bg-dark-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-dark-800';
                  let pointerTag: React.ReactNode = null;

                  if (isSwapping) {
                    cardStyle = 'bg-brand-amber text-slate-950 border-amber-400 scale-105 -translate-y-2 font-bold shadow-sm';
                    pointerTag = (
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-brand-amber text-slate-950 flex items-center gap-1">
                        <ArrowRightLeft className="w-3 h-3" />
                        {targetIdx !== undefined ? `To #${targetIdx}` : 'Swap'}
                      </span>
                    );
                  } else if (isComparing) {
                    cardStyle = 'bg-brand-primary text-white border-brand-primary scale-105 -translate-y-1 font-semibold shadow-sm';
                    pointerTag = (
                      <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded bg-brand-primary text-white">
                        Compare
                      </span>
                    );
                  } else if (isSorted) {
                    cardStyle = 'bg-brand-emerald/15 text-brand-emerald border-brand-emerald/30 font-medium';
                    pointerTag = (
                      <span className="font-mono text-[9px] font-semibold px-1.5 py-0.5 rounded bg-brand-emerald/20 text-brand-emerald flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        Sorted
                      </span>
                    );
                  } else if (matchingPointers.length > 0) {
                    pointerTag = (
                      <span className="font-mono text-[9px] font-semibold px-1.5 py-0.5 rounded bg-slate-200 dark:bg-dark-800 text-slate-700 dark:text-slate-300 uppercase">
                        {matchingPointers.join(', ')}
                      </span>
                    );
                  }

                  return (
                    <div key={idx} className="flex flex-col items-center gap-1 transition-all">
                      {/* Active Pointer Label above Card */}
                      <div className="h-6 flex items-center justify-center">
                        {pointerTag}
                      </div>

                      {/* Physical Card */}
                      <div className={`w-14 h-24 sm:w-16 sm:h-28 rounded-xl border ${cardStyle} flex flex-col justify-between p-2.5 transition-all shadow-subtle`}>
                        <div className="flex justify-between items-center text-[10px] font-mono opacity-70">
                          <span>#{idx}</span>
                          {matchingPointers.length > 0 && !isSwapping && !isComparing && !isSorted && (
                            <span className="text-[9px] font-bold text-brand-primary">{matchingPointers[0]}</span>
                          )}
                        </div>
                        <span className="font-mono text-xl sm:text-2xl font-bold text-center my-auto">{val}</span>
                        <div className="w-full bg-slate-200 dark:bg-dark-800 h-1.5 rounded-full overflow-hidden">
                          <div 
                            style={{ width: `${(val / maxVal) * 100}%` }} 
                            className="bg-current h-full rounded-full transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* MODE 2: SOUND BARS WITH LIVE POINTER LABELS */}
          {viewMode === 'bars' && (
            <div className="h-80 bg-slate-50 dark:bg-dark-950 rounded-xl border border-slate-200 dark:border-dark-800 p-4 flex items-end justify-center gap-1.5 overflow-hidden transition-colors">
              {snapshot.array.map((val, idx) => {
                const isComparing = snapshot.activeCompare.includes(idx);
                const isSwapping = snapshot.activeSwap.includes(idx);
                const isSorted = snapshot.sortedIndices.includes(idx);

                const matchingPointers = Object.entries(snapshot.pointers)
                  .filter(([_, ptrIdx]) => ptrIdx === idx)
                  .map(([ptrName]) => ptrName);

                let barColor = 'bg-brand-primary/80';
                if (isSwapping) barColor = 'bg-brand-amber';
                else if (isComparing) barColor = 'bg-brand-accent';
                else if (isSorted) barColor = 'bg-brand-emerald';

                return (
                  <div
                    key={idx}
                    style={{
                      height: `${Math.max(14, (val / maxVal) * 100)}%`,
                      transition: 'height 0.25s ease'
                    }}
                    className={`flex-1 ${barColor} rounded-t-md flex flex-col justify-between items-center py-1 text-center relative`}
                  >
                    {matchingPointers.length > 0 && (
                      <span className="font-mono text-[8px] font-bold bg-slate-900 text-white px-1 rounded shadow -mt-5 absolute whitespace-nowrap">
                        {matchingPointers[0]}
                      </span>
                    )}
                    <span className="font-mono text-[9px] font-bold text-white mt-auto select-none">{val}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* MODE 3: SCATTER COORDINATE GALAXY */}
          {viewMode === 'scatter' && (
            <div className="h-80 bg-slate-50 dark:bg-dark-950 rounded-xl border border-slate-200 dark:border-dark-800 p-4 relative flex items-center justify-center transition-colors">
              <div className="w-full h-full relative">
                {snapshot.array.map((val, idx) => {
                  const leftPct = (idx / (snapshot.array.length - 1)) * 100;
                  const bottomPct = (val / maxVal) * 100;

                  let dotColor = 'bg-brand-primary';
                  if (snapshot.activeSwap.includes(idx)) dotColor = 'bg-brand-amber scale-150 z-20';
                  else if (snapshot.activeCompare.includes(idx)) dotColor = 'bg-brand-rose scale-125 z-10';
                  else if (snapshot.sortedIndices.includes(idx)) dotColor = 'bg-brand-emerald';

                  return (
                    <div
                      key={idx}
                      style={{ left: `${leftPct}%`, bottom: `${bottomPct}%` }}
                      className={`absolute w-3.5 h-3.5 -translate-x-1/2 translate-y-1/2 rounded-full border border-white ${dotColor} transition-all`}
                      title={`Index ${idx} = ${val}`}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Bottom Legend */}
          <div className="flex flex-wrap justify-between items-center text-xs pt-3 border-t border-slate-200 dark:border-dark-800 text-slate-500 gap-2">
            <div className="flex flex-wrap gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-white dark:bg-dark-800 border border-slate-300 dark:border-dark-700 inline-block" /> Unsorted
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-brand-primary inline-block" /> Comparing
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-brand-amber inline-block" /> Swapping
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-brand-emerald inline-block" /> Sorted Fixed
              </span>
            </div>
            <span className="font-mono text-[11px] text-slate-500">
              Total Steps: {steps.length}
            </span>
          </div>
        </div>

        {/* 5. Pseudocode Line Highlighting & Theory Drawer */}
        <div className="flex flex-col gap-4">
          <div className="ui-panel p-4 rounded-xl flex flex-col gap-3 transition-colors">
            
            {/* Header */}
            <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-dark-800">
              <h3 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Info className="w-4 h-4 text-brand-primary" />
                {currentSpec.name}
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-primary/10 text-brand-primary font-semibold">
                {currentSpec.method}
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {currentSpec.concept}
            </p>

            {/* Complexity Matrix Table */}
            <div className="rounded-lg border border-slate-200 dark:border-dark-800 overflow-hidden text-xs">
              <div className="grid grid-cols-3 bg-slate-100 dark:bg-dark-900 font-semibold p-2 border-b border-slate-200 dark:border-dark-800 text-slate-700 dark:text-slate-300">
                <span>Best Case</span>
                <span>Average</span>
                <span>Worst Case</span>
              </div>
              <div className="grid grid-cols-3 p-2 font-mono text-[11px] text-slate-800 dark:text-slate-200">
                <span className="text-brand-emerald">{currentSpec.bestTime}</span>
                <span className="text-brand-primary">{currentSpec.avgTime}</span>
                <span className="text-brand-rose">{currentSpec.worstTime}</span>
              </div>
              <div className="grid grid-cols-3 p-2 bg-slate-50 dark:bg-dark-900/60 border-t border-slate-200 dark:border-dark-800 text-[11px]">
                <div>
                  <span className="text-slate-400 block text-[10px]">SPACE</span>
                  <strong className="font-mono">{currentSpec.space}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">STABILITY</span>
                  <strong className={currentSpec.stable ? 'text-brand-emerald' : 'text-slate-400'}>
                    {currentSpec.stable ? 'Yes (Stable)' : 'No (Unstable)'}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">IN-PLACE</span>
                  <strong className={currentSpec.inPlace ? 'text-brand-emerald' : 'text-slate-400'}>
                    {currentSpec.inPlace ? 'Yes' : 'No'}
                  </strong>
                </div>
              </div>
            </div>

            {/* Live Line-by-Line Pseudocode Execution Box */}
            <div className="bg-slate-900 dark:bg-black text-slate-300 rounded-lg p-3 font-mono text-[11px] border border-slate-800 overflow-x-auto">
              <div className="text-brand-amber font-semibold mb-2 pb-1.5 border-b border-white/10 flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5" /> Live Pseudocode:
                </span>
                {snapshot.activeLine !== undefined && (
                  <span className="text-[10px] text-brand-primaryLight font-mono">
                    Executing Line #{snapshot.activeLine + 1}
                  </span>
                )}
              </div>
              <div className="space-y-0.5">
                {currentSpec.code.map((line, lIdx) => {
                  const isActive = snapshot.activeLine === lIdx;
                  return (
                    <div
                      key={lIdx}
                      className={`px-2 py-0.5 rounded transition-colors whitespace-pre flex items-center gap-2 ${
                        isActive
                          ? 'bg-brand-primary text-white font-bold border-l-2 border-white'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span className="text-[9px] opacity-40 select-none w-3 text-right">
                        {lIdx + 1}
                      </span>
                      <span>{line}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Custom Input Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-dark-900 border border-slate-200 dark:border-dark-750 rounded-xl p-5 max-w-md w-full shadow-dropdown space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Enter Custom Numbers
            </h3>
            <p className="text-xs text-slate-500">
              Enter comma-separated values (between 1 and 99) to test with homework questions, specific edge cases, or viva examples:
            </p>
            <input
              type="text"
              value={customInputText}
              onChange={(e) => setCustomInputText(e.target.value)}
              placeholder="e.g. 42, 17, 89, 23, 65, 8, 54, 31"
              className="w-full bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-dark-800 rounded-lg p-2.5 font-mono text-xs text-slate-900 dark:text-white focus:outline-none focus:border-brand-primary"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowCustomModal(false)}
                className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={applyCustomInput}
                className="px-4 py-1.5 rounded-lg bg-brand-primary hover:bg-brand-primaryHover text-white text-xs font-semibold shadow-sm"
              >
                Apply Array
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
