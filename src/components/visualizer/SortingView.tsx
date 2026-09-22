import React, { useState, useEffect } from 'react';
import { SortingAlgorithmType, SortingStep } from '../../types/routing';
import { runQuickSort, runMergeSort, runBubbleSort, runInsertionSort, runSelectionSort, runHeapSort } from '../../algorithms/sorting';
import { soundFX } from '../../utils/SoundFX';
import { 
  Play, 
  RotateCcw, 
  BarChart2, 
  Layers, 
  Grid, 
  Code, 
  HelpCircle
} from 'lucide-react';

type SortingViewMode = 'cards' | 'bars' | 'scatter';

export const SortingView: React.FC = () => {
  const [algo, setAlgo] = useState<SortingAlgorithmType>('quicksort');
  const [viewMode, setViewMode] = useState<SortingViewMode>('cards');
  const [arraySize, setArraySize] = useState<number>(14);
  const [speedMs, setSpeedMs] = useState<number>(40);
  const [array, setArray] = useState<number[]>([]);

  // Telemetry & Steps
  const [, setSteps] = useState<SortingStep[]>([]);
  const [, setCurrentStepIdx] = useState<number>(-1);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Active step highlights
  const [activeCompare, setActiveCompare] = useState<number[]>([]);
  const [activeSwap, setActiveSwap] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [stepExplainer, setStepExplainer] = useState<string>('Select an algorithm and click "RUN SORTING ENGINE" to start.');
  const [stats, setStats] = useState({ comparisons: 0, swaps: 0, timeMs: 0 });

  useEffect(() => {
    generateRandomArray();
  }, [arraySize, algo]);

  const generateRandomArray = () => {
    setIsRunning(false);
    setSteps([]);
    setCurrentStepIdx(-1);
    setActiveCompare([]);
    setActiveSwap([]);
    setSortedIndices([]);
    setStats({ comparisons: 0, swaps: 0, timeMs: 0 });

    const newArr = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 85) + 15);
    setArray(newArr);
    setStepExplainer(`Generated array with ${arraySize} elements. Ready for ${algo.toUpperCase()}.`);
  };

  const generateNearlySortedArray = () => {
    setIsRunning(false);
    const sorted = Array.from({ length: arraySize }, (_, i) => Math.floor((i + 1) * (90 / arraySize)) + 10);
    const i1 = Math.floor(Math.random() * arraySize);
    const i2 = (i1 + 3) % arraySize;
    [sorted[i1], sorted[i2]] = [sorted[i2], sorted[i1]];
    setArray(sorted);
    setSortedIndices([]);
    setStepExplainer('Generated nearly-sorted array with minor inversions.');
  };

  const generateReversedArray = () => {
    setIsRunning(false);
    const reversed = Array.from({ length: arraySize }, (_, i) => Math.floor((arraySize - i) * (90 / arraySize)) + 10);
    setArray(reversed);
    setSortedIndices([]);
    setStepExplainer('Generated reverse-sorted array (worst case).');
  };

  const algoDetails: Record<SortingAlgorithmType, { name: string; code: string[]; time: string; space: string; concept: string }> = {
    quicksort: {
      name: 'QUICK SORT',
      time: 'O(N log N) Avg / O(N²) Worst',
      space: 'O(log N)',
      concept: 'Picks a "pivot" element and partitions the array so smaller items go left and larger items go right.',
      code: [
        'function quickSort(arr, low, high):',
        '  if low < high:',
        '    pivotIndex = partition(arr, low, high)',
        '    quickSort(arr, low, pivotIndex - 1)',
        '    quickSort(arr, pivotIndex + 1, high)'
      ]
    },
    mergesort: {
      name: 'MERGE SORT',
      time: 'O(N log N) Guaranteed',
      space: 'O(N)',
      concept: 'Recursively divides the array in half, sorts each sub-array, and merges them back in order.',
      code: [
        'function mergeSort(arr, left, right):',
        '  if left >= right: return',
        '  mid = floor((left + right) / 2)',
        '  mergeSort(arr, left, mid)',
        '  mergeSort(arr, mid + 1, right)',
        '  merge(arr, left, mid, right)'
      ]
    },
    bubblesort: {
      name: 'BUBBLE SORT',
      time: 'O(N²)',
      space: 'O(1)',
      concept: 'Repeatedly compares adjacent elements and swaps them if they are in wrong order, bubbling largest items to top.',
      code: [
        'function bubbleSort(arr):',
        '  for i = 0 to n - 1:',
        '    for j = 0 to n - i - 2:',
        '      if arr[j] > arr[j + 1]:',
        '        swap(arr[j], arr[j + 1])'
      ]
    },
    insertionsort: {
      name: 'INSERTION SORT',
      time: 'O(N²)',
      space: 'O(1)',
      concept: 'Builds sorted array one item at a time by shifting larger elements right and inserting the key into place.',
      code: [
        'function insertionSort(arr):',
        '  for i = 1 to arr.length - 1:',
        '    key = arr[i], j = i - 1',
        '    while j >= 0 and arr[j] > key:',
        '      arr[j + 1] = arr[j]; j--',
        '    arr[j + 1] = key'
      ]
    },
    selectionsort: {
      name: 'SELECTION SORT',
      time: 'O(N²)',
      space: 'O(1)',
      concept: 'Repeatedly finds the minimum element from the unsorted part and places it at the beginning.',
      code: [
        'function selectionSort(arr):',
        '  for i = 0 to n - 1:',
        '    minIdx = i',
        '    for j = i + 1 to n - 1:',
        '      if arr[j] < arr[minIdx]: minIdx = j',
        '    swap(arr[i], arr[minIdx])'
      ]
    },
    heapsort: {
      name: 'HEAP SORT',
      time: 'O(N log N) Guaranteed',
      space: 'O(1)',
      concept: 'Converts array into a Max-Heap binary tree, then repeatedly extracts the max root to the end.',
      code: [
        'function heapSort(arr):',
        '  buildMaxHeap(arr)',
        '  for i = n - 1 down to 1:',
        '    swap(arr[0], arr[i])',
        '    maxHeapify(arr, 0, i)'
      ]
    }
  };

  const handleStartPlayback = async () => {
    if (isRunning) return;
    setIsRunning(true);

    let generatedSteps: SortingStep[] = [];
    if (algo === 'quicksort') generatedSteps = runQuickSort(array);
    else if (algo === 'bubblesort') generatedSteps = runBubbleSort(array);
    else if (algo === 'insertionsort') generatedSteps = runInsertionSort(array);
    else if (algo === 'selectionsort') generatedSteps = runSelectionSort(array);
    else if (algo === 'mergesort') generatedSteps = runMergeSort(array);
    else if (algo === 'heapsort') generatedSteps = runHeapSort(array);

    setSteps(generatedSteps);
    const startT = performance.now();

    for (let i = 0; i < generatedSteps.length; i++) {
      setCurrentStepIdx(i);
      const step = generatedSteps[i];

      if (step.type === 'compare') {
        setActiveCompare(step.indices);
        setActiveSwap([]);
        const v1 = array[step.indices[0]] || 0;
        const v2 = array[step.indices[1]] || 0;
        setStepExplainer(`Comparing Card #${step.indices[0]} (Value: ${v1}) with Card #${step.indices[1]} (Value: ${v2}).`);
        soundFX.playStepSound(220 + step.indices[0] * 14);
      } else if (step.type === 'swap') {
        setActiveSwap(step.indices);
        setActiveCompare([]);
        setArray(prev => {
          const next = [...prev];
          if (step.indices.length === 2 && step.values && step.values.length === 2) {
            next[step.indices[0]] = step.values[0];
            next[step.indices[1]] = step.values[1];
          } else if (step.indices.length === 1 && step.values) {
            next[step.indices[0]] = step.values[0];
          }
          return next;
        });
        setStepExplainer(`Swapping Position #${step.indices[0]} with #${step.indices[1]} to establish ascending order.`);
        soundFX.playStepSound(440 + step.indices[0] * 18);
      } else if (step.type === 'sorted') {
        setSortedIndices(prev => [...new Set([...prev, ...step.indices])]);
        setStepExplainer(`Position ${step.indices.join(', ')} is now permanently sorted!`);
      } else if (step.type === 'finish') {
        soundFX.playSuccessSound();
        setStepExplainer(`🎉 Sorting Complete! All ${array.length} elements are in perfect ascending order.`);
      }

      setStats({
        comparisons: step.comparisons,
        swaps: step.swaps,
        timeMs: parseFloat((performance.now() - startT).toFixed(1))
      });

      await new Promise(r => setTimeout(r, speedMs));
    }

    setIsRunning(false);
  };

  const maxVal = Math.max(...array, 100);

  return (
    <div className="flex flex-col gap-4">
      {/* Educational Header & Mode Selector */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-white/10 shadow-card-light dark:shadow-card-dark flex flex-wrap justify-between items-center gap-4 transition-colors">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-col gap-1">
            <label className="font-mono text-[10px] font-bold text-brand-cyan uppercase tracking-wider">
              SELECT ALGORITHM
            </label>
            <select
              value={algo}
              onChange={(e) => setAlgo(e.target.value as SortingAlgorithmType)}
              disabled={isRunning}
              className="bg-white dark:bg-dark-900 border border-slate-300 dark:border-white/15 rounded-xl font-mono text-xs font-bold px-3 py-2 text-slate-900 dark:text-white focus:outline-none cursor-pointer shadow-sm"
            >
              <option value="quicksort">Quick Sort — O(N log N)</option>
              <option value="mergesort">Merge Sort — O(N log N)</option>
              <option value="heapsort">Heap Sort — O(N log N)</option>
              <option value="bubblesort">Bubble Sort — O(N²)</option>
              <option value="insertionsort">Insertion Sort — O(N²)</option>
              <option value="selectionsort">Selection Sort — O(N²)</option>
            </select>
          </div>

          {/* Visual Presentation Mode Selector */}
          <div className="flex flex-col gap-1">
            <label className="font-mono text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              VISUAL PRESENTATION MODE
            </label>
            <div className="flex border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-dark-900 p-1 rounded-xl shadow-inner">
              <button
                onClick={() => { setViewMode('cards'); if (arraySize > 20) setArraySize(14); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                  viewMode === 'cards' ? 'bg-brand-cyan text-dark-950 shadow-glow-cyan/20 shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" /> 3D Cards
              </button>
              <button
                onClick={() => setViewMode('bars')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                  viewMode === 'bars' ? 'bg-brand-cyan text-dark-950 shadow-glow-cyan/20 shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <BarChart2 className="w-3.5 h-3.5" /> Sound Bars
              </button>
              <button
                onClick={() => setViewMode('scatter')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                  viewMode === 'scatter' ? 'bg-brand-cyan text-dark-950 shadow-glow-cyan/20 shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Grid className="w-3.5 h-3.5" /> Scatter Galaxy
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-mono text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">
              ELEMENTS [{arraySize}]
            </label>
            <input
              type="range"
              min="6"
              max={viewMode === 'cards' ? '20' : '60'}
              value={arraySize}
              onChange={(e) => setArraySize(Number(e.target.value))}
              disabled={isRunning}
              className="w-24 accent-brand-cyan cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-mono text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">
              SPEED [{speedMs}ms]
            </label>
            <input
              type="range"
              min="10"
              max="250"
              value={speedMs}
              onChange={(e) => setSpeedMs(Number(e.target.value))}
              className="w-24 accent-brand-cyan cursor-pointer"
              style={{ direction: 'rtl' }}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={generateRandomArray}
            disabled={isRunning}
            className="flex items-center gap-1.5 bg-white dark:bg-dark-900 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white font-mono text-xs font-bold px-3 py-2 rounded-xl border border-slate-300 dark:border-white/10 hover:border-slate-400 transition-all shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Shuffle Random</span>
          </button>

          <button
            onClick={generateNearlySortedArray}
            disabled={isRunning}
            className="px-3 py-2 rounded-xl bg-white dark:bg-dark-900 text-slate-700 dark:text-slate-200 hover:text-brand-cyan font-mono text-xs font-bold border border-slate-300 dark:border-white/10 transition-all shadow-sm"
          >
            Nearly Sorted
          </button>

          <button
            onClick={generateReversedArray}
            disabled={isRunning}
            className="px-3 py-2 rounded-xl bg-white dark:bg-dark-900 text-slate-700 dark:text-slate-200 hover:text-brand-rose font-mono text-xs font-bold border border-slate-300 dark:border-white/10 transition-all shadow-sm"
          >
            Reversed
          </button>

          <button
            onClick={handleStartPlayback}
            disabled={isRunning}
            className="flex items-center gap-2 bg-gradient-to-r from-brand-emerald via-brand-cyan to-brand-indigo text-dark-950 font-mono text-xs font-bold px-5 py-2 rounded-xl shadow-glow-cyan/20 shadow-lg hover:brightness-110 disabled:opacity-50 cursor-pointer transition-all uppercase"
          >
            <Play className="w-4 h-4 fill-dark-950" />
            <span>RUN SORTING ENGINE</span>
          </button>
        </div>
      </div>

      {/* Real-time Step Explainer Banner */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-brand-indigo/10 via-brand-cyan/5 to-transparent border border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between font-mono text-xs text-slate-700 dark:text-slate-200 gap-3 shadow-sm">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan animate-pulse"></span>
          <span className="font-bold text-brand-cyan uppercase">STEP EXPLAINER:</span>
          <span className="font-sans font-medium text-slate-800 dark:text-slate-100">{stepExplainer}</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-bold">
          <span>COMPARISONS: <strong className="text-brand-cyan">{stats.comparisons}</strong></span>
          <span>SWAPS: <strong className="text-brand-amber">{stats.swaps}</strong></span>
          <span>TIME: <strong className="text-brand-emerald">{stats.timeMs} ms</strong></span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* MAIN VISUALIZATION CANVAS */}
        <div className="lg:col-span-3 glass-panel p-5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-card-light dark:shadow-card-dark flex flex-col justify-between min-h-[400px] transition-colors">
          {/* MODE 1: PHYSICAL 3D CARD BLOCKS */}
          {viewMode === 'cards' && (
            <div className="flex-1 flex flex-col justify-center items-center py-6">
              <div className="flex flex-wrap justify-center items-end gap-3 max-w-full">
                {array.map((val, idx) => {
                  const isComparing = activeCompare.includes(idx);
                  const isSwapping = activeSwap.includes(idx);
                  const isSorted = sortedIndices.includes(idx);

                  let cardBg = 'bg-white dark:bg-dark-850 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-white/15';
                  let pointerLabel = null;

                  if (isSwapping) {
                    cardBg = 'bg-gradient-to-t from-brand-amber/80 to-amber-400 text-dark-950 border-amber-400 scale-115 -translate-y-3 shadow-glow-amber z-20 font-extrabold';
                    pointerLabel = 'SWAP ⇄';
                  } else if (isComparing) {
                    cardBg = 'bg-gradient-to-t from-brand-cyan/80 to-cyan-400 text-dark-950 border-cyan-400 scale-110 -translate-y-2 shadow-glow-cyan z-10 font-bold';
                    pointerLabel = 'COMPARE 🔍';
                  } else if (isSorted) {
                    cardBg = 'bg-gradient-to-t from-emerald-100 dark:from-brand-emerald/30 to-emerald-300 dark:to-brand-emerald/70 text-emerald-950 dark:text-white border-emerald-400';
                    pointerLabel = 'SORTED ✓';
                  }

                  return (
                    <div key={idx} className="flex flex-col items-center gap-1.5 transition-all duration-200">
                      {/* Pointer Badge */}
                      <div className="h-6 flex items-center">
                        {pointerLabel && (
                          <span className={`font-mono text-[9px] font-extrabold px-2 py-0.5 rounded-full border shadow-md ${
                            isSwapping ? 'bg-brand-amber text-dark-950 border-amber-400' : isComparing ? 'bg-brand-cyan text-dark-950 border-cyan-400' : 'bg-brand-emerald text-dark-950 border-emerald-400'
                          }`}>
                            {pointerLabel}
                          </span>
                        )}
                      </div>

                      {/* Card Block */}
                      <div
                        className={`w-12 h-20 sm:w-16 sm:h-24 rounded-2xl border-2 ${cardBg} flex flex-col justify-between p-2 transition-all duration-200 shadow-lg`}
                      >
                        <span className="font-mono text-[10px] opacity-75 font-semibold">#{idx}</span>
                        <span className="font-mono text-lg sm:text-xl font-extrabold text-center tracking-tight">{val}</span>
                        <div className="w-full bg-slate-200 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                          <div 
                            style={{ width: `${(val / maxVal) * 100}%` }} 
                            className="bg-current h-full rounded-full"
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* MODE 2: SOUND BARS */}
          {viewMode === 'bars' && (
            <div className="h-80 bg-slate-100 dark:bg-dark-900/90 rounded-2xl border border-slate-300 dark:border-white/10 p-4 flex items-end justify-center gap-1.5 overflow-hidden shadow-inner transition-colors">
              {array.map((val, idx) => {
                let bg = 'bg-gradient-to-t from-brand-indigo/60 to-brand-cyan/80';
                if (activeSwap.includes(idx)) bg = 'bg-gradient-to-t from-brand-amber to-yellow-300 shadow-glow-amber';
                else if (activeCompare.includes(idx)) bg = 'bg-gradient-to-t from-brand-cyan to-cyan-300 shadow-glow-cyan';
                else if (sortedIndices.includes(idx)) bg = 'bg-gradient-to-t from-brand-emerald/70 to-emerald-400';

                return (
                  <div
                    key={idx}
                    style={{
                      height: `${(val / maxVal) * 100}%`,
                      transition: 'height 0.2s ease, background 0.15s ease'
                    }}
                    className={`flex-1 ${bg} rounded-t-lg flex flex-col justify-end items-center pb-1 text-center`}
                  >
                    <span className="font-mono text-[9px] font-bold text-dark-950 select-none">{val}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* MODE 3: SCATTER GALAXY */}
          {viewMode === 'scatter' && (
            <div className="h-80 bg-slate-100 dark:bg-dark-900/90 rounded-2xl border border-slate-300 dark:border-white/10 p-4 relative flex items-center justify-center shadow-inner transition-colors">
              <div className="w-full h-full relative">
                {array.map((val, idx) => {
                  const leftPct = (idx / (array.length - 1)) * 100;
                  const bottomPct = (val / maxVal) * 100;

                  let dotColor = 'bg-brand-cyan shadow-glow-cyan';
                  if (activeSwap.includes(idx)) dotColor = 'bg-brand-amber shadow-glow-amber scale-150 z-20';
                  else if (activeCompare.includes(idx)) dotColor = 'bg-brand-rose shadow-glow-rose scale-125 z-10';

                  return (
                    <div
                      key={idx}
                      style={{ left: `${leftPct}%`, bottom: `${bottomPct}%` }}
                      className={`absolute w-3.5 h-3.5 -translate-x-1/2 translate-y-1/2 rounded-full border border-white ${dotColor} transition-all duration-150`}
                      title={`[${idx}] = ${val}`}
                    ></div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bottom Legend */}
          <div className="flex flex-wrap justify-between items-center text-xs font-mono pt-3 border-t border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 gap-2">
            <div className="flex flex-wrap gap-4 text-[11px]">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-white dark:bg-dark-850 border border-slate-300 dark:border-white/20 inline-block"></span> Unsorted Card
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-brand-cyan inline-block"></span> Comparing
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-brand-amber inline-block"></span> Swapping
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-brand-emerald inline-block"></span> Sorted Fixed
              </span>
            </div>
            <span className="font-bold text-brand-cyan uppercase">MODE: {viewMode.toUpperCase()}</span>
          </div>
        </div>

        {/* ALGORITHM CONCEPT & PSEUDOCODE PANEL */}
        <div className="flex flex-col gap-4">
          <div className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-white/10 shadow-card-light dark:shadow-card-dark flex flex-col gap-3 transition-colors">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-white/10">
              <h3 className="font-mono text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-brand-cyan" /> {algoDetails[algo].name} CONCEPT
              </h3>
            </div>
            <p className="font-sans text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {algoDetails[algo].concept}
            </p>

            <div className="grid grid-cols-2 gap-2 font-mono text-[11px] p-2.5 bg-slate-100/90 dark:bg-dark-900/90 rounded-xl border border-slate-200 dark:border-white/10">
              <div><span className="text-brand-cyan font-bold block">TIME COMP:</span><strong className="text-slate-900 dark:text-white">{algoDetails[algo].time}</strong></div>
              <div><span className="text-brand-indigo dark:text-brand-indigoLight font-bold block">SPACE COMP:</span><strong className="text-slate-900 dark:text-white">{algoDetails[algo].space}</strong></div>
            </div>

            <div className="bg-slate-100 dark:bg-dark-900/90 rounded-xl p-3 font-mono text-[11px] border border-slate-200 dark:border-white/10 overflow-x-auto text-slate-800 dark:text-slate-200">
              <div className="text-brand-amber font-bold mb-1.5 pb-1 border-b border-slate-200 dark:border-white/10 flex items-center gap-1">
                <Code className="w-3.5 h-3.5" /> PSEUDOCODE SPECIFICATION:
              </div>
              {algoDetails[algo].code.map((line, lIdx) => (
                <div key={lIdx} className="whitespace-pre leading-relaxed text-slate-700 dark:text-slate-300">{line}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
