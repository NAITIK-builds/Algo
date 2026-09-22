import { SortingStep } from '../types/routing';

export function runQuickSort(array: number[]): SortingStep[] {
  const steps: SortingStep[] = [];
  const arr = [...array];
  let comparisons = 0;
  let swaps = 0;

  function quickSort(low: number, high: number) {
    if (low < high) {
      const pIdx = partition(low, high);
      quickSort(low, pIdx - 1);
      quickSort(pIdx + 1, high);
    }
  }

  function partition(low: number, high: number): number {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      comparisons++;
      steps.push({ type: 'compare', indices: [j, high], comparisons, swaps });
      if (arr[j] <= pivot) {
        i++;
        swaps++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        steps.push({ type: 'swap', indices: [i, j], values: [arr[i], arr[j]], comparisons, swaps });
      }
    }
    swaps++;
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    steps.push({ type: 'swap', indices: [i + 1, high], values: [arr[i + 1], arr[high]], comparisons, swaps });
    steps.push({ type: 'sorted', indices: [i + 1], comparisons, swaps });
    return i + 1;
  }

  quickSort(0, arr.length - 1);
  for (let k = 0; k < arr.length; k++) {
    steps.push({ type: 'sorted', indices: [k], comparisons, swaps });
  }
  steps.push({ type: 'finish', indices: [], comparisons, swaps });
  return steps;
}

export function runBubbleSort(array: number[]): SortingStep[] {
  const steps: SortingStep[] = [];
  const arr = [...array];
  let comparisons = 0;
  let swaps = 0;
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      steps.push({ type: 'compare', indices: [j, j + 1], comparisons, swaps });
      if (arr[j] > arr[j + 1]) {
        swaps++;
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({ type: 'swap', indices: [j, j + 1], values: [arr[j], arr[j + 1]], comparisons, swaps });
      }
    }
    steps.push({ type: 'sorted', indices: [n - i - 1], comparisons, swaps });
  }
  steps.push({ type: 'sorted', indices: [0], comparisons, swaps });
  steps.push({ type: 'finish', indices: [], comparisons, swaps });
  return steps;
}

export function runInsertionSort(array: number[]): SortingStep[] {
  const steps: SortingStep[] = [];
  const arr = [...array];
  let comparisons = 0;
  let swaps = 0;

  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      comparisons++;
      steps.push({ type: 'compare', indices: [j, j + 1], comparisons, swaps });
      swaps++;
      arr[j + 1] = arr[j];
      steps.push({ type: 'swap', indices: [j + 1, j], values: [arr[j + 1], arr[j]], comparisons, swaps });
      j--;
    }
    arr[j + 1] = key;
  }

  for (let k = 0; k < arr.length; k++) {
    steps.push({ type: 'sorted', indices: [k], comparisons, swaps });
  }
  steps.push({ type: 'finish', indices: [], comparisons, swaps });
  return steps;
}

export function runSelectionSort(array: number[]): SortingStep[] {
  const steps: SortingStep[] = [];
  const arr = [...array];
  let comparisons = 0;
  let swaps = 0;
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      comparisons++;
      steps.push({ type: 'compare', indices: [j, minIdx], comparisons, swaps });
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      swaps++;
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      steps.push({ type: 'swap', indices: [i, minIdx], values: [arr[i], arr[minIdx]], comparisons, swaps });
    }
    steps.push({ type: 'sorted', indices: [i], comparisons, swaps });
  }
  steps.push({ type: 'sorted', indices: [n - 1], comparisons, swaps });
  steps.push({ type: 'finish', indices: [], comparisons, swaps });
  return steps;
}

export function runMergeSort(array: number[]): SortingStep[] {
  const steps: SortingStep[] = [];
  const arr = [...array];
  let comparisons = 0;
  let swaps = 0;

  function mergeSort(left: number, right: number) {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);
    mergeSort(left, mid);
    mergeSort(mid + 1, right);
    merge(left, mid, right);
  }

  function merge(left: number, mid: number, right: number) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
      comparisons++;
      steps.push({ type: 'compare', indices: [left + i, mid + 1 + j], comparisons, swaps });
      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        swaps++;
        steps.push({ type: 'swap', indices: [k, k], values: [arr[k]], comparisons, swaps });
        i++;
      } else {
        arr[k] = rightArr[j];
        swaps++;
        steps.push({ type: 'swap', indices: [k, k], values: [arr[k]], comparisons, swaps });
        j++;
      }
      k++;
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      swaps++;
      steps.push({ type: 'swap', indices: [k, k], values: [arr[k]], comparisons, swaps });
      i++; k++;
    }
    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      swaps++;
      steps.push({ type: 'swap', indices: [k, k], values: [arr[k]], comparisons, swaps });
      j++; k++;
    }
  }

  mergeSort(0, arr.length - 1);
  for (let k = 0; k < arr.length; k++) {
    steps.push({ type: 'sorted', indices: [k], comparisons, swaps });
  }
  steps.push({ type: 'finish', indices: [], comparisons, swaps });
  return steps;
}

export function runHeapSort(array: number[]): SortingStep[] {
  const steps: SortingStep[] = [];
  const arr = [...array];
  let comparisons = 0;
  let swaps = 0;
  const n = arr.length;

  function heapify(length: number, i: number) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < length) {
      comparisons++;
      steps.push({ type: 'compare', indices: [left, largest], comparisons, swaps });
      if (arr[left] > arr[largest]) largest = left;
    }

    if (right < length) {
      comparisons++;
      steps.push({ type: 'compare', indices: [right, largest], comparisons, swaps });
      if (arr[right] > arr[largest]) largest = right;
    }

    if (largest !== i) {
      swaps++;
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      steps.push({ type: 'swap', indices: [i, largest], values: [arr[i], arr[largest]], comparisons, swaps });
      heapify(length, largest);
    }
  }

  // Build Heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  // Extract Elements
  for (let i = n - 1; i > 0; i--) {
    swaps++;
    [arr[0], arr[i]] = [arr[i], arr[0]];
    steps.push({ type: 'swap', indices: [0, i], values: [arr[0], arr[i]], comparisons, swaps });
    steps.push({ type: 'sorted', indices: [i], comparisons, swaps });
    heapify(i, 0);
  }
  steps.push({ type: 'sorted', indices: [0], comparisons, swaps });
  steps.push({ type: 'finish', indices: [], comparisons, swaps });
  return steps;
}
