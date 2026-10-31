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
      steps.push({
        type: 'compare',
        indices: [j, high],
        comparisons,
        swaps,
        activeLine: 8,
        pointers: { pivot: high, j, ...(i >= low ? { i } : {}) },
        description: `Comparing arr[${j}] (${arr[j]}) with pivot arr[${high}] (${pivot})`,
        subArrayRange: [low, high]
      });

      if (arr[j] <= pivot) {
        i++;
        swaps++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        steps.push({
          type: 'swap',
          indices: [i, j],
          values: [arr[i], arr[j]],
          comparisons,
          swaps,
          activeLine: 9,
          pointers: { pivot: high, i, j },
          description: `arr[${j}] <= pivot: Swapped arr[${i}] (${arr[i]}) with arr[${j}] (${arr[j]})`,
          subArrayRange: [low, high]
        });
      }
    }

    swaps++;
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    steps.push({
      type: 'swap',
      indices: [i + 1, high],
      values: [arr[i + 1], arr[high]],
      comparisons,
      swaps,
      activeLine: 10,
      pointers: { pivot: i + 1 },
      description: `Placed pivot (${pivot}) at sorted position #${i + 1}`,
      subArrayRange: [low, high]
    });

    steps.push({
      type: 'sorted',
      indices: [i + 1],
      comparisons,
      swaps,
      activeLine: 10,
      pointers: { pivot: i + 1 },
      description: `Pivot at index #${i + 1} (${arr[i + 1]}) is now locked in place`,
      subArrayRange: [low, high]
    });

    return i + 1;
  }

  quickSort(0, arr.length - 1);
  for (let k = 0; k < arr.length; k++) {
    steps.push({ type: 'sorted', indices: [k], comparisons, swaps, description: `Element #${k} sorted` });
  }
  steps.push({ type: 'finish', indices: [], comparisons, swaps, description: 'All elements partitioned & sorted' });
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
      const willSwap = arr[j] > arr[j + 1];
      steps.push({
        type: 'compare',
        indices: [j, j + 1],
        comparisons,
        swaps,
        activeLine: 3,
        pointers: { j, 'j+1': j + 1 },
        description: `Comparing arr[${j}] (${arr[j]}) with arr[${j + 1}] (${arr[j + 1]}) — ${willSwap ? 'Out of order' : 'Correct order'}`
      });

      if (willSwap) {
        swaps++;
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({
          type: 'swap',
          indices: [j, j + 1],
          values: [arr[j], arr[j + 1]],
          comparisons,
          swaps,
          activeLine: 4,
          pointers: { j, 'j+1': j + 1 },
          description: `Swapped arr[${j}] and arr[${j + 1}] to bubble larger value rightwards`
        });
      }
    }

    steps.push({
      type: 'sorted',
      indices: [n - i - 1],
      comparisons,
      swaps,
      activeLine: 5,
      pointers: { sorted: n - i - 1 },
      description: `Largest item bubbled to index #${n - i - 1} (${arr[n - i - 1]})`
    });
  }

  steps.push({ type: 'sorted', indices: [0], comparisons, swaps, description: 'First element sorted' });
  steps.push({ type: 'finish', indices: [], comparisons, swaps, description: 'Bubble sort pass complete' });
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

    steps.push({
      type: 'compare',
      indices: [i, j],
      comparisons,
      swaps,
      activeLine: 2,
      pointers: { key: i, j },
      description: `Selected key = ${key} at index #${i}; scanning leftward to find insertion spot`
    });

    while (j >= 0 && arr[j] > key) {
      comparisons++;
      steps.push({
        type: 'compare',
        indices: [j, j + 1],
        comparisons,
        swaps,
        activeLine: 3,
        pointers: { j, key: i },
        description: `arr[${j}] (${arr[j]}) > key (${key}): Shifting arr[${j}] to the right`
      });

      swaps++;
      arr[j + 1] = arr[j];
      steps.push({
        type: 'swap',
        indices: [j + 1, j],
        values: [arr[j + 1], arr[j]],
        comparisons,
        swaps,
        activeLine: 4,
        pointers: { shifted: j + 1, j },
        description: `Shifted element from index #${j} to #${j + 1}`
      });
      j--;
    }

    arr[j + 1] = key;
    steps.push({
      type: 'swap',
      indices: [j + 1],
      values: [key],
      comparisons,
      swaps,
      activeLine: 5,
      pointers: { inserted: j + 1 },
      description: `Inserted key (${key}) into vacant position #${j + 1}`
    });
  }

  for (let k = 0; k < arr.length; k++) {
    steps.push({ type: 'sorted', indices: [k], comparisons, swaps, description: `Element #${k} sorted` });
  }
  steps.push({ type: 'finish', indices: [], comparisons, swaps, description: 'Insertion sort completed' });
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

    steps.push({
      type: 'compare',
      indices: [i, i],
      comparisons,
      swaps,
      activeLine: 2,
      pointers: { i, min: i },
      description: `Starting pass #${i + 1}: assuming initial minimum is arr[${i}] (${arr[i]})`
    });

    for (let j = i + 1; j < n; j++) {
      comparisons++;
      const isSmaller = arr[j] < arr[minIdx];
      steps.push({
        type: 'compare',
        indices: [j, minIdx],
        comparisons,
        swaps,
        activeLine: 4,
        pointers: { i, min: minIdx, j },
        description: `Comparing candidate arr[${j}] (${arr[j]}) with current min arr[${minIdx}] (${arr[minIdx]})`
      });

      if (isSmaller) {
        minIdx = j;
        steps.push({
          type: 'compare',
          indices: [j, minIdx],
          comparisons,
          swaps,
          activeLine: 4,
          pointers: { i, min: minIdx, j },
          description: `New minimum found! arr[${minIdx}] = ${arr[minIdx]}`
        });
      }
    }

    if (minIdx !== i) {
      swaps++;
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      steps.push({
        type: 'swap',
        indices: [i, minIdx],
        values: [arr[i], arr[minIdx]],
        comparisons,
        swaps,
        activeLine: 5,
        pointers: { i, min: minIdx },
        description: `Swapped minimum (${arr[i]}) into position #${i}`
      });
    }

    steps.push({
      type: 'sorted',
      indices: [i],
      comparisons,
      swaps,
      activeLine: 5,
      pointers: { sorted: i },
      description: `Position #${i} (${arr[i]}) is permanently sorted`
    });
  }

  steps.push({ type: 'sorted', indices: [n - 1], comparisons, swaps, description: 'Last element sorted' });
  steps.push({ type: 'finish', indices: [], comparisons, swaps, description: 'Selection sort finished' });
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
      const valL = leftArr[i];
      const valR = rightArr[j];

      steps.push({
        type: 'compare',
        indices: [left + i, mid + 1 + j],
        comparisons,
        swaps,
        activeLine: 7,
        pointers: { leftHalf: left + i, rightHalf: mid + 1 + j, target: k },
        description: `Comparing left sub-array (${valL}) with right sub-array (${valR})`,
        subArrayRange: [left, right]
      });

      if (valL <= valR) {
        arr[k] = valL;
        swaps++;
        steps.push({
          type: 'swap',
          indices: [k, k],
          values: [arr[k]],
          comparisons,
          swaps,
          activeLine: 8,
          pointers: { merged: k },
          description: `Placed smaller value ${valL} at index #${k}`,
          subArrayRange: [left, right]
        });
        i++;
      } else {
        arr[k] = valR;
        swaps++;
        steps.push({
          type: 'swap',
          indices: [k, k],
          values: [arr[k]],
          comparisons,
          swaps,
          activeLine: 8,
          pointers: { merged: k },
          description: `Placed smaller value ${valR} at index #${k}`,
          subArrayRange: [left, right]
        });
        j++;
      }
      k++;
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      swaps++;
      steps.push({
        type: 'swap',
        indices: [k, k],
        values: [arr[k]],
        comparisons,
        swaps,
        activeLine: 8,
        pointers: { merged: k },
        description: `Flushed remaining left element (${arr[k]}) to index #${k}`,
        subArrayRange: [left, right]
      });
      i++; k++;
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      swaps++;
      steps.push({
        type: 'swap',
        indices: [k, k],
        values: [arr[k]],
        comparisons,
        swaps,
        activeLine: 8,
        pointers: { merged: k },
        description: `Flushed remaining right element (${arr[k]}) to index #${k}`,
        subArrayRange: [left, right]
      });
      j++; k++;
    }
  }

  mergeSort(0, arr.length - 1);
  for (let k = 0; k < arr.length; k++) {
    steps.push({ type: 'sorted', indices: [k], comparisons, swaps, description: `Element #${k} sorted` });
  }
  steps.push({ type: 'finish', indices: [], comparisons, swaps, description: 'Merge sort complete' });
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
      steps.push({
        type: 'compare',
        indices: [left, largest],
        comparisons,
        swaps,
        activeLine: 6,
        pointers: { root: largest, leftChild: left },
        description: `Heapify: comparing left child arr[${left}] (${arr[left]}) with root arr[${largest}] (${arr[largest]})`
      });
      if (arr[left] > arr[largest]) largest = left;
    }

    if (right < length) {
      comparisons++;
      steps.push({
        type: 'compare',
        indices: [right, largest],
        comparisons,
        swaps,
        activeLine: 6,
        pointers: { root: largest, rightChild: right },
        description: `Heapify: comparing right child arr[${right}] (${arr[right]}) with largest arr[${largest}] (${arr[largest]})`
      });
      if (arr[right] > arr[largest]) largest = right;
    }

    if (largest !== i) {
      swaps++;
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      steps.push({
        type: 'swap',
        indices: [i, largest],
        values: [arr[i], arr[largest]],
        comparisons,
        swaps,
        activeLine: 7,
        pointers: { parent: i, swappedChild: largest },
        description: `Heapify: swapped arr[${i}] and arr[${largest}] to maintain Max-Heap property`
      });
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
    steps.push({
      type: 'swap',
      indices: [0, i],
      values: [arr[0], arr[i]],
      comparisons,
      swaps,
      activeLine: 3,
      pointers: { maxExtracted: i, root: 0 },
      description: `Extracted max element (${arr[i]}) from root to sorted index #${i}`
    });
    steps.push({
      type: 'sorted',
      indices: [i],
      comparisons,
      swaps,
      activeLine: 4,
      pointers: { sorted: i },
      description: `Index #${i} locked in sorted position`
    });
    heapify(i, 0);
  }

  steps.push({ type: 'sorted', indices: [0], comparisons, swaps, description: 'Root sorted' });
  steps.push({ type: 'finish', indices: [], comparisons, swaps, description: 'Heap sort finished' });
  return steps;
}
