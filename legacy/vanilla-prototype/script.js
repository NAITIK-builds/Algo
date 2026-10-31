/* ==========================================================================
   ALGO // COMPUTATIONAL ENGINE JAVASCRIPT
   REAL-TIME ALGORITHM VISUALIZATION ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const displayContainer = document.getElementById('visualizer-display');
  const miniBarsContainer = document.getElementById('mini-bars');
  const algoSelect = document.getElementById('algo-select');
  const arraySizeInput = document.getElementById('array-size');
  const sizeValLabel = document.getElementById('size-val');
  const speedInput = document.getElementById('speed-range');
  const speedValLabel = document.getElementById('speed-val');

  // Control Buttons
  const btnStart = document.getElementById('btn-start');
  const btnPause = document.getElementById('btn-pause');
  const btnStep = document.getElementById('btn-step');
  const btnReset = document.getElementById('btn-reset');
  const btnQuickRun = document.getElementById('quick-run-btn');

  // Telemetry Labels
  const statComparisons = document.getElementById('stat-comparisons');
  const statSwaps = document.getElementById('stat-swaps');
  const statTime = document.getElementById('stat-time');
  const statStatus = document.getElementById('stat-status');
  const specName = document.getElementById('spec-name');
  const codeSnippet = document.getElementById('code-snippet');
  const logBox = document.getElementById('log-box');
  const lineIndicator = document.getElementById('line-indicator');

  // State Variables
  let array = [];
  let arraySize = parseInt(arraySizeInput.value, 10);
  let speedMs = parseInt(speedInput.value, 10);
  let isRunning = false;
  let isPaused = false;
  let animationTimeouts = [];
  let comparisons = 0;
  let swaps = 0;
  let startTime = 0;

  // Pseudocode Map
  const algoCodeMap = {
    quicksort: {
      name: 'QUICK SORT',
      code: `function quickSort(arr, low, high):
  if low < high:
    pivotIndex = partition(arr, low, high)
    quickSort(arr, low, pivotIndex - 1)
    quickSort(arr, pivotIndex + 1, high)

function partition(arr, low, high):
  pivot = arr[high]
  i = low - 1
  for j = low to high - 1:
    if arr[j] <= pivot:
      i = i + 1
      swap arr[i] with arr[j]
  swap arr[i + 1] with arr[high]
  return i + 1`
    },
    mergesort: {
      name: 'MERGE SORT',
      code: `function mergeSort(arr, left, right):
  if left >= right: return
  mid = floor((left + right) / 2)
  mergeSort(arr, left, mid)
  mergeSort(arr, mid + 1, right)
  merge(arr, left, mid, right)

function merge(arr, left, mid, right):
  L = arr[left...mid], R = arr[mid+1...right]
  i = 0, j = 0, k = left
  while i < L.length and j < R.length:
    if L[i] <= R[j]: arr[k] = L[i]; i++
    else: arr[k] = R[j]; j++
    k++`
    },
    bubblesort: {
      name: 'BUBBLE SORT',
      code: `function bubbleSort(arr):
  n = arr.length
  for i = 0 to n - 1:
    swapped = false
    for j = 0 to n - i - 2:
      if arr[j] > arr[j + 1]:
        swap(arr[j], arr[j + 1])
        swapped = true
    if not swapped: break`
    },
    insertionsort: {
      name: 'INSERTION SORT',
      code: `function insertionSort(arr):
  for i = 1 to arr.length - 1:
    key = arr[i]
    j = i - 1
    while j >= 0 and arr[j] > key:
      arr[j + 1] = arr[j]
      j = j - 1
    arr[j + 1] = key`
    },
    selectionsort: {
      name: 'SELECTION SORT',
      code: `function selectionSort(arr):
  for i = 0 to arr.length - 1:
    minIdx = i
    for j = i + 1 to arr.length - 1:
      if arr[j] < arr[minIdx]: minIdx = j
    if minIdx != i:
      swap(arr[i], arr[minIdx])`
    },
    dijkstra: {
      name: 'DIJKSTRA GRAPH',
      code: `function dijkstra(graph, source):
  dist[source] = 0
  Q = priorityQueue(all_nodes)
  while Q is not empty:
    u = Q.extractMin()
    for each neighbor v of u:
      alt = dist[u] + weight(u, v)
      if alt < dist[v]:
        dist[v] = alt
        Q.decreaseKey(v, alt)`
    }
  };

  // Helper Functions
  function addLog(msg) {
    const line = document.createElement('div');
    line.className = 'log-line';
    line.textContent = `[${new Date().toLocaleTimeString().split(' ')[0]}] ${msg}`;
    logBox.appendChild(line);
    logBox.scrollTop = logBox.scrollHeight;
  }

  function generateRandomArray() {
    clearAllTimeouts();
    isRunning = false;
    isPaused = false;
    comparisons = 0;
    swaps = 0;
    updateTelemetryUI();

    array = [];
    for (let i = 0; i < arraySize; i++) {
      array.push(Math.floor(Math.random() * 85) + 15);
    }
    renderBars();
    addLog(`Generated array with ${arraySize} elements.`);
  }

  function renderBars() {
    displayContainer.innerHTML = '';
    const maxVal = Math.max(...array, 100);

    array.forEach((val, idx) => {
      const bar = document.createElement('div');
      bar.className = 'array-bar';
      bar.style.height = `${(val / maxVal) * 100}%`;
      bar.id = `bar-${idx}`;

      const barVal = document.createElement('span');
      barVal.className = 'bar-val';
      barVal.textContent = val;

      bar.appendChild(barVal);
      displayContainer.appendChild(bar);
    });
  }

  function renderMiniHeroBars() {
    miniBarsContainer.innerHTML = '';
    const sampleArr = [35, 75, 20, 90, 45, 60, 15, 85, 50, 30, 95, 40, 65, 25, 80, 55, 10, 70, 48, 88, 32, 62, 18, 92];
    sampleArr.forEach((val) => {
      const b = document.createElement('div');
      b.className = 'mini-bar';
      b.style.height = `${val}%`;
      miniBarsContainer.appendChild(b);
    });

    // Simple continuous mini animation
    setInterval(() => {
      const bars = miniBarsContainer.children;
      if (bars.length > 0) {
        const randIdx1 = Math.floor(Math.random() * bars.length);
        const randIdx2 = Math.floor(Math.random() * bars.length);
        const temp = bars[randIdx1].style.height;
        bars[randIdx1].style.height = bars[randIdx2].style.height;
        bars[randIdx2].style.height = temp;

        bars[randIdx1].classList.add('compare');
        bars[randIdx2].classList.add('active');
        setTimeout(() => {
          bars[randIdx1].classList.remove('compare');
          bars[randIdx2].classList.remove('active');
        }, 300);
      }
    }, 450);
  }

  function clearAllTimeouts() {
    animationTimeouts.forEach(t => clearTimeout(t));
    animationTimeouts = [];
  }

  function updateTelemetryUI() {
    statComparisons.textContent = comparisons;
    statSwaps.textContent = swaps;
    if (isRunning) {
      const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
      statTime.textContent = `${elapsed} s`;
    } else if (comparisons === 0 && swaps === 0) {
      statTime.textContent = '0.00 ms';
    }
  }

  // Animation Queue Helper
  function animateStep(actions) {
    let delay = 0;
    startTime = performance.now();
    statStatus.textContent = 'EXECUTING';

    actions.forEach((act, stepIdx) => {
      const timeout = setTimeout(() => {
        if (act.type === 'compare') {
          highlightBars(act.indices, 'compare');
          comparisons++;
          lineIndicator.textContent = `CMP [${act.indices[0]}, ${act.indices[1]}]`;
        } else if (act.type === 'swap') {
          swapBars(act.i, act.j, act.valI, act.valJ);
          swaps++;
          lineIndicator.textContent = `SWAP [${act.i} ↔ ${act.j}]`;
        } else if (act.type === 'sorted') {
          markSorted(act.idx);
        } else if (act.type === 'finish') {
          isRunning = false;
          statStatus.textContent = 'FINISHED';
          lineIndicator.textContent = 'DONE';
          addLog(`Execution completed in ${((performance.now() - startTime) / 1000).toFixed(2)}s.`);
        }
        updateTelemetryUI();
      }, delay);
      animationTimeouts.push(timeout);
      delay += speedMs;
    });
  }

  function highlightBars(indices, className) {
    document.querySelectorAll('.array-bar').forEach(b => {
      if (!b.classList.contains('sorted')) {
        b.className = 'array-bar';
      }
    });
    indices.forEach(idx => {
      const bar = document.getElementById(`bar-${idx}`);
      if (bar) bar.classList.add(className);
    });
  }

  function swapBars(i, j, valI, valJ) {
    const barI = document.getElementById(`bar-${i}`);
    const barJ = document.getElementById(`bar-${j}`);

    if (barI && barJ) {
      const maxVal = Math.max(...array, 100);
      barI.style.height = `${(valI / maxVal) * 100}%`;
      barI.querySelector('.bar-val').textContent = valI;
      barJ.style.height = `${(valJ / maxVal) * 100}%`;
      barJ.querySelector('.bar-val').textContent = valJ;

      barI.className = 'array-bar swap';
      barJ.className = 'array-bar swap';
    }
  }

  function markSorted(idx) {
    const bar = document.getElementById(`bar-${idx}`);
    if (bar) bar.className = 'array-bar sorted';
  }

  // ALGORITHM IMPLEMENTATIONS & STEP GENERATOR
  function runSorting() {
    if (isRunning) return;
    isRunning = true;
    clearAllTimeouts();
    comparisons = 0;
    swaps = 0;

    const selectedAlgo = algoSelect.value;
    const actions = [];
    const arrCopy = [...array];

    if (selectedAlgo === 'quicksort') {
      quickSortHelper(arrCopy, 0, arrCopy.length - 1, actions);
    } else if (selectedAlgo === 'bubblesort') {
      bubbleSortHelper(arrCopy, actions);
    } else if (selectedAlgo === 'insertionsort') {
      insertionSortHelper(arrCopy, actions);
    } else if (selectedAlgo === 'selectionsort') {
      selectionSortHelper(arrCopy, actions);
    } else if (selectedAlgo === 'mergesort') {
      mergeSortHelper(arrCopy, 0, arrCopy.length - 1, actions);
    }

    // Mark all sorted at finish
    for (let k = 0; k < arrCopy.length; k++) {
      actions.push({ type: 'sorted', idx: k });
    }
    actions.push({ type: 'finish' });

    addLog(`Running ${algoCodeMap[selectedAlgo].name}...`);
    animateStep(actions);
  }

  // Bubble Sort Logic
  function bubbleSortHelper(arr, actions) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        actions.push({ type: 'compare', indices: [j, j + 1] });
        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          actions.push({ type: 'swap', i: j, j: j + 1, valI: arr[j], valJ: arr[j + 1] });
        }
      }
      actions.push({ type: 'sorted', idx: n - i - 1 });
    }
  }

  // Quick Sort Logic
  function quickSortHelper(arr, low, high, actions) {
    if (low < high) {
      let pivotIdx = partition(arr, low, high, actions);
      quickSortHelper(arr, low, pivotIdx - 1, actions);
      quickSortHelper(arr, pivotIdx + 1, actions);
    }
  }

  function partition(arr, low, high, actions) {
    let pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      actions.push({ type: 'compare', indices: [j, high] });
      if (arr[j] <= pivot) {
        i++;
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        actions.push({ type: 'swap', i: i, j: j, valI: arr[i], valJ: arr[j] });
      }
    }
    let temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    actions.push({ type: 'swap', i: i + 1, j: high, valI: arr[i + 1], valJ: arr[high] });
    return i + 1;
  }

  // Insertion Sort Logic
  function insertionSortHelper(arr, actions) {
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        actions.push({ type: 'compare', indices: [j, j + 1] });
        arr[j + 1] = arr[j];
        actions.push({ type: 'swap', i: j + 1, j: j, valI: arr[j + 1], valJ: arr[j] });
        j--;
      }
      arr[j + 1] = key;
    }
  }

  // Selection Sort Logic
  function selectionSortHelper(arr, actions) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        actions.push({ type: 'compare', indices: [j, minIdx] });
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      if (minIdx !== i) {
        let temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
        actions.push({ type: 'swap', i: i, j: minIdx, valI: arr[i], valJ: arr[minIdx] });
      }
      actions.push({ type: 'sorted', idx: i });
    }
  }

  // Merge Sort Logic
  function mergeSortHelper(arr, left, right, actions) {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);
    mergeSortHelper(arr, left, mid, actions);
    mergeSortHelper(arr, mid + 1, right, actions);
    merge(arr, left, mid, right, actions);
  }

  function merge(arr, left, mid, right, actions) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
      actions.push({ type: 'compare', indices: [left + i, mid + 1 + j] });
      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        actions.push({ type: 'swap', i: k, j: k, valI: arr[k], valJ: arr[k] });
        i++;
      } else {
        arr[k] = rightArr[j];
        actions.push({ type: 'swap', i: k, j: k, valI: arr[k], valJ: arr[k] });
        j++;
      }
      k++;
    }
    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      actions.push({ type: 'swap', i: k, j: k, valI: arr[k], valJ: arr[k] });
      i++; k++;
    }
    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      actions.push({ type: 'swap', i: k, j: k, valI: arr[k], valJ: arr[k] });
      j++; k++;
    }
  }

  // EVENT LISTENERS
  algoSelect.addEventListener('change', (e) => {
    const selected = e.target.value;
    if (algoCodeMap[selected]) {
      specName.textContent = algoCodeMap[selected].name;
      codeSnippet.textContent = algoCodeMap[selected].code;
      addLog(`Selected algorithm: ${algoCodeMap[selected].name}`);
    }
    generateRandomArray();
  });

  arraySizeInput.addEventListener('input', (e) => {
    arraySize = parseInt(e.target.value, 10);
    sizeValLabel.textContent = arraySize;
    generateRandomArray();
  });

  speedInput.addEventListener('input', (e) => {
    speedMs = parseInt(e.target.value, 10);
    speedValLabel.textContent = speedMs < 30 ? 'Ultra' : speedMs < 80 ? 'Fast' : 'Normal';
  });

  btnStart.addEventListener('click', runSorting);
  btnQuickRun.addEventListener('click', () => {
    window.location.hash = '#visualizer';
    runSorting();
  });

  btnPause.addEventListener('click', () => {
    clearAllTimeouts();
    isRunning = false;
    statStatus.textContent = 'PAUSED';
    addLog('Execution paused.');
  });

  btnReset.addEventListener('click', generateRandomArray);

  document.getElementById('theme-info-btn').addEventListener('click', () => {
    document.getElementById('theme-spec').scrollIntoView({ behavior: 'smooth' });
  });

  // CATALOG TABS FILTERING
  const tabBtns = document.querySelectorAll('.tab-btn');
  const algoCards = document.querySelectorAll('.algo-card');

  tabBtns.forEach(tab => {
    tab.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.getAttribute('data-filter');

      algoCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Global function for card action buttons
  window.selectAlgo = function(algoKey) {
    if (algoSelect) {
      algoSelect.value = algoKey;
      algoSelect.dispatchEvent(new Event('change'));
      document.getElementById('visualizer').scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Initialize
  generateRandomArray();
  renderMiniHeroBars();
});
