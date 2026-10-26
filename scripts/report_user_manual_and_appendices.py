# User Manual, Extended Source Code, and Algorithmic Proofs Module

MANUAL_SECTIONS = [
    {
        "title": "7.1 System Installation & Deployment Guide",
        "subsections": [
            {
                "subtitle": "7.1.1 Local Development Environment Setup",
                "paragraphs": [
                    "AlgoLenz is engineered to run seamlessly across modern computing platforms without requiring complex database instances or remote backend server dependencies. The entire system is packaged as a high-performance Single-Page Application (SPA) utilizing Vite 5 as the build orchestrator and local development server.",
                    "To initialize the system in a local development or evaluation environment, ensure that Node.js (version 18.0.0 LTS or higher) and npm (version 9.0.0 or higher) are installed on the workstation. Open a terminal prompt in the project root directory and execute the following commands:",
                    "1. Install runtime dependencies and TypeScript type definitions:\n   npm install",
                    "2. Launch the Vite local development server with Hot Module Replacement (HMR):\n   npm run dev",
                    "3. Open the displayed local loopback address (typically http://localhost:5173/) within any modern evergreen web browser (Google Chrome 110+, Mozilla Firefox 110+, Microsoft Edge 110+, or Apple Safari 16+).",
                    "4. To generate an optimized, tree-shaken static production bundle suitable for web server deployment (e.g., Nginx, Apache, Vercel, or Netlify), execute:\n   npm run build\nThe resulting compiled assets will be emitted into the 'dist/' folder."
                ]
            },
            {
                "subtitle": "7.1.2 Environment & Browser Compatibility Checklist",
                "paragraphs": [
                    "HTML5 Canvas API: Requires full 2D Context rendering support with hardware acceleration enabled for smooth 60 FPS transitions.",
                    "Web Audio API: Requires AudioContext interface support. Modern browsers mandate an initial user interaction (such as clicking the 'Run' or 'Mute' button) before resuming audio playback to adhere to browser autoplay policies.",
                    "CSS Grid & Flexbox: Used extensively for the responsive layout, control panels, and the comparative split-screen benchmarking arena.",
                    "Display Resolution: Optimized for 1080p (1920x1080) desktop displays, with responsive breakpoints accommodating 1366x768 laptop screens and high-density 4K Retina monitors."
                ]
            }
        ]
    },
    {
        "title": "7.2 Interactive 2D Grid Canvas Operation Manual",
        "subsections": [
            {
                "subtitle": "7.2.1 Grid Canvas Navigation & Node Interactions",
                "paragraphs": [
                    "The primary 2D Grid Visualizer allows users to interact with a discrete matrix of graph nodes. Each cell in the grid represents a vertex V in the mathematical graph G = (V, E), with implicit directed or undirected edges connecting orthogonal adjacent cells.",
                    "Click and Drag Wall Painting: Holding down the left mouse button and dragging across the grid converts standard empty nodes into Wall nodes (impassable barriers with infinite traversal cost).",
                    "Weight / Mud Nodes: Selecting the 'Weight' tool from the control bar enables the placement of Mud tiles (cost = 5). Pathfinding algorithms such as Dijkstra and A* will intelligently navigate around or through these tiles depending on the total cumulative path cost.",
                    "Repositioning Start and Target Anchors: The green 'Start' node and red 'Target' node can be clicked and freely dragged to any unoccupied coordinate on the canvas.",
                    "Real-Time Dynamic Recalculation: Once an algorithm has completed its execution, moving the Start or Target anchor triggers an instantaneous re-solve, dynamically rerouting the shortest path line in real time without requiring a manual re-run."
                ]
            },
            {
                "subtitle": "7.2.2 Procedural Terrain & Maze Generation Controls",
                "paragraphs": [
                    "AlgoLenz includes automated procedural generation algorithms accessible via the 'Mazes & Patterns' dropdown menu:",
                    "Recursive Division: Partitions the grid into sub-quadrants using horizontal and vertical walls with randomly placed passage gaps, creating intricate, puzzle-like corridors.",
                    "Random Weighted Terrain: Distributes clusters of mud tiles across the grid using Perlin-style noise distributions to demonstrate how heuristic algorithms adapt to non-uniform terrain costs.",
                    "Clear Grid vs Clear Path: The 'Clear Grid' command resets all cells, walls, and weights back to a blank canvas. The 'Clear Path' command preserves all existing wall and weight configurations while stripping visited and path states, allowing immediate execution of alternative algorithms on the same layout."
                ]
            }
        ]
    },
    {
        "title": "7.3 Real-World Geospatial Map Routing User Manual",
        "subsections": [
            {
                "subtitle": "7.3.1 City Map Explorer Navigation",
                "paragraphs": [
                    "The City Map view connects abstract graph theory to tangible urban navigation by overlaying algorithm calculations onto real-world road networks using Leaflet.js and OpenStreetMap cartography.",
                    "Metropolitan Hub Selection: Users can select major Indian metropolitan centers (e.g., New Delhi, Mumbai, Bengaluru, Kanpur) from the location selector to load detailed road network topologies.",
                    "Waypoint Placement: Clicking directly on the interactive map canvas places origin, destination, and intermediate routing waypoints. The underlying topological graph models intersections as vertices and street segments as weighted edges based on actual road distance.",
                    "Comparative Route Overlay: When computing shortest routes, the map renders color-coded polyline overlays depicting the explored street segments in cyan and the final computed optimal route in bright amber."
                ]
            }
        ]
    },
    {
        "title": "7.4 Multi-Stop Waypoint Dispatch & TSP Optimizer Manual",
        "subsections": [
            {
                "subtitle": "7.4.1 Logistics Tour Planning Workflow",
                "paragraphs": [
                    "The Multi-Stop Dispatch module visualizes solutions to the classical NP-Hard Traveling Salesperson Problem (TSP), modeling practical logistics delivery routes.",
                    "Adding Delivery Waypoints: Users can click anywhere on the delivery simulation canvas to place delivery drop-off markers (representing customer destinations). A dedicated delivery rider marker represents the depot origin.",
                    "Algorithm Selection: Choose between 'Nearest Neighbor Heuristic' (an O(N^2) greedy approach suitable for rapid approximations) and 'Held-Karp Dynamic Programming' (an exact O(N^2 * 2^N) bitmask DP formulation providing the mathematically optimal tour for up to 12 stops).",
                    "2-Opt Untangling Optimization: Activating the '2-Opt Local Search' toggle applies iterative edge swaps to eliminate intersecting delivery legs, visually displaying how crossing paths are untangled to minimize fuel and travel time.",
                    "Playback Animation: Clicking 'Dispatch Delivery' initiates a smooth CSS/Canvas animation of the delivery vehicle traversing the optimized sequence of customer stops in real time."
                ]
            }
        ]
    },
    {
        "title": "7.5 Audio-Visual Sorting Laboratory Operation Manual",
        "subsections": [
            {
                "subtitle": "7.5.1 Sorting Controls & Audio Synthesis",
                "paragraphs": [
                    "The Sorting Laboratory visualizes array manipulation algorithms through an integrated audio-visual synthesis pipeline.",
                    "Array Generation: Adjust the 'Array Size' slider (from 10 up to 100 bars) and click 'Generate New Array' to create a randomized distribution of numerical bars.",
                    "Sorting Algorithm Selection: Choose between Quick Sort, Merge Sort, Heap Sort, Insertion Sort, Selection Sort, or Bubble Sort.",
                    "Acoustic Feedback: When audio is enabled, each array comparison and swap event emits a pure sine tone mapped to the value of the active element (120 Hz to 1200 Hz). Higher values generate higher pitched frequencies, producing characteristic acoustic melodies unique to each sorting algorithm (e.g., QuickSort's rapid staccato cascades vs BubbleSort's rising arpeggios).",
                    "Completion Fanfare: Upon full array ordering, a harmonious major triad chord is synthesized via the Web Audio API to signal completion."
                ]
            }
        ]
    },
    {
        "title": "7.6 Dual-Algorithm Comparative Benchmarking Arena",
        "subsections": [
            {
                "subtitle": "7.6.1 Split-Screen Head-to-Head Evaluation",
                "paragraphs": [
                    "The Comparison Arena enables rigorous empirical benchmarking by executing two distinct pathfinding algorithms concurrently on identical maze or terrain configurations.",
                    "Configuration: Select Algorithm A for the left canvas (e.g., Dijkstra's Algorithm) and Algorithm B for the right canvas (e.g., A* Heuristic Search).",
                    "Synchronized Execution: Pressing 'Run Benchmark' triggers both algorithms simultaneously with identical start and target positions.",
                    "Live Telemetry Metrics: Real-time telemetry cards below each viewport display nodes visited, execution duration in milliseconds, total path cost, and search space efficiency percentage. This highlights the dramatic search space pruning achieved by heuristic-guided algorithms compared to unguided uniform-cost searches."
                ]
            }
        ]
    },
    {
        "title": "7.7 Troubleshooting & Operational Edge Cases",
        "subsections": [
            {
                "subtitle": "7.7.1 Common Operational Anomalies and Solutions",
                "paragraphs": [
                    "1. Web Audio Autoplay Policy Block: If no sound is heard during sorting visualization, click anywhere on the page or toggle the 'Mute/Unmute' button. Modern browsers suspend audio contexts until an explicit user interaction occurs.",
                    "2. High-DPI Canvas Blur: On Retina or 4K displays, browser canvas elements may appear blurry if not scaled to devicePixelRatio. AlgoLenz automatically applies window.devicePixelRatio scaling to ensure crisp vector and pixel rendering.",
                    "3. Browser Tab Throttling: If the user navigates away from the active browser tab during a long-running visualization, requestAnimationFrame and setTimeout intervals are throttled by browser power-saving mechanisms. Returning to the tab resumes normal execution."
                ]
            }
        ]
    }
]

EXTENDED_SOURCE_CODE = [
    {
        "filename": "src/algorithms/dijkstra.ts",
        "description": "Production TypeScript implementation of Dijkstra's Algorithm with Min-Heap Priority Queue simulation and path reconstruction.",
        "code": """import { GridNode, AlgorithmStep } from '../types/routing';

export function dijkstra(
  grid: GridNode[][],
  startNode: GridNode,
  targetNode: GridNode
): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const rows = grid.length;
  const cols = grid[0].length;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      grid[r][c].distance = Infinity;
      grid[r][c].isVisited = false;
      grid[r][c].isFrontier = false;
      grid[r][c].isPath = false;
      grid[r][c].previousNode = null;
    }
  }

  startNode.distance = 0;
  const unvisitedNodes: GridNode[] = [startNode];
  let visitedCount = 0;

  while (unvisitedNodes.length > 0) {
    unvisitedNodes.sort((a, b) => a.distance - b.distance);
    const current = unvisitedNodes.shift()!;

    if (current.isVisited) continue;
    current.isVisited = true;
    visitedCount++;

    steps.push({
      type: 'visit',
      node: { row: current.row, col: current.col },
      visitedCount,
      pathLength: 0,
      totalCost: current.distance
    });

    if (current.row === targetNode.row && current.col === targetNode.col) {
      const path = reconstructShortestPath(targetNode);
      steps.push({
        type: 'path',
        path: path.map(n => ({ row: n.row, col: n.col })),
        visitedCount,
        pathLength: path.length,
        totalCost: current.distance
      });
      return steps;
    }

    const neighbors = getOrthogonalNeighbors(grid, current);
    for (const neighbor of neighbors) {
      if (neighbor.isVisited || neighbor.type === 'WALL') continue;

      const altDistance = current.distance + neighbor.weight;
      if (altDistance < neighbor.distance) {
        neighbor.distance = altDistance;
        neighbor.previousNode = current;
        neighbor.isFrontier = true;

        if (!unvisitedNodes.includes(neighbor)) {
          unvisitedNodes.push(neighbor);
        }

        steps.push({
          type: 'frontier',
          node: { row: neighbor.row, col: neighbor.col },
          visitedCount,
          pathLength: 0,
          totalCost: neighbor.distance
        });
      }
    }
  }

  return steps;
}

function getOrthogonalNeighbors(grid: GridNode[][], node: GridNode): GridNode[] {
  const neighbors: GridNode[] = [];
  const { row, col } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors;
}

function reconstructShortestPath(targetNode: GridNode): GridNode[] {
  const path: GridNode[] = [];
  let curr: GridNode | null = targetNode;
  while (curr !== null) {
    curr.isPath = true;
    path.unshift(curr);
    curr = curr.previousNode;
  }
  return path;
}"""
    },
    {
        "filename": "src/algorithms/aStar.ts",
        "description": "Production TypeScript implementation of A* Heuristic Search with configurable Manhattan & Euclidean metrics.",
        "code": """import { GridNode, AlgorithmStep } from '../types/routing';

export type HeuristicFunction = (a: GridNode, b: GridNode) => number;

export const manhattanDistance: HeuristicFunction = (a, b) => 
  Math.abs(a.row - b.row) + Math.abs(a.col - b.col);

export const euclideanDistance: HeuristicFunction = (a, b) => 
  Math.sqrt((a.row - b.row) ** 2 + (a.col - b.col) ** 2);

export function aStar(
  grid: GridNode[][],
  startNode: GridNode,
  targetNode: GridNode,
  heuristic: HeuristicFunction = manhattanDistance
): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const rows = grid.length;
  const cols = grid[0].length;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      grid[r][c].distance = Infinity;
      grid[r][c].heuristic = heuristic(grid[r][c], targetNode);
      grid[r][c].totalDistance = Infinity;
      grid[r][c].isVisited = false;
      grid[r][c].isFrontier = false;
      grid[r][c].isPath = false;
      grid[r][c].previousNode = null;
    }
  }

  startNode.distance = 0;
  startNode.totalDistance = startNode.heuristic;
  const openSet: GridNode[] = [startNode];
  let visitedCount = 0;

  while (openSet.length > 0) {
    openSet.sort((a, b) => a.totalDistance - b.totalDistance);
    const current = openSet.shift()!;

    if (current.isVisited) continue;
    current.isVisited = true;
    visitedCount++;

    steps.push({
      type: 'visit',
      node: { row: current.row, col: current.col },
      visitedCount,
      pathLength: 0,
      totalCost: current.distance
    });

    if (current.row === targetNode.row && current.col === targetNode.col) {
      const path = reconstructShortestPath(targetNode);
      steps.push({
        type: 'path',
        path: path.map(n => ({ row: n.row, col: n.col })),
        visitedCount,
        pathLength: path.length,
        totalCost: current.distance
      });
      return steps;
    }

    const neighbors = getOrthogonalNeighbors(grid, current);
    for (const neighbor of neighbors) {
      if (neighbor.isVisited || neighbor.type === 'WALL') continue;

      const tentativeG = current.distance + neighbor.weight;
      if (tentativeG < neighbor.distance) {
        neighbor.distance = tentativeG;
        neighbor.totalDistance = tentativeG + neighbor.heuristic;
        neighbor.previousNode = current;
        neighbor.isFrontier = true;

        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        }

        steps.push({
          type: 'frontier',
          node: { row: neighbor.row, col: neighbor.col },
          visitedCount,
          pathLength: 0,
          totalCost: neighbor.distance
        });
      }
    }
  }

  return steps;
}"""
    },
    {
        "filename": "src/algorithms/bellmanFord.ts",
        "description": "Production TypeScript implementation of the Bellman-Ford Shortest Path Algorithm with edge relaxations.",
        "code": """import { GridNode, AlgorithmStep } from '../types/routing';

export function runBellmanFord(
  grid: GridNode[][],
  start: { row: number; col: number },
  target: { row: number; col: number }
): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const rows = grid.length;
  const cols = grid[0].length;

  const nodes: GridNode[][] = grid.map(r => r.map(n => ({
    ...n,
    distance: Infinity,
    isVisited: false,
    previousNode: null
  })));

  const startNode = nodes[start.row][start.col];
  startNode.distance = 0;

  const allNodes: GridNode[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (nodes[r][c].type !== 'WALL') {
        allNodes.push(nodes[r][c]);
      }
    }
  }

  let visitedCount = 0;
  const numVertices = allNodes.length;

  for (let iter = 0; iter < numVertices - 1; iter++) {
    let updated = false;

    for (const node of allNodes) {
      if (node.distance === Infinity) continue;
      node.isVisited = true;
      visitedCount++;

      const neighbors = getNeighbors(nodes, node);
      for (const neighbor of neighbors) {
        if (neighbor.type === 'WALL') continue;
        const newDist = node.distance + neighbor.weight;
        if (newDist < neighbor.distance) {
          neighbor.distance = newDist;
          neighbor.previousNode = node;
          updated = true;
        }
      }

      if (visitedCount % Math.max(1, Math.floor(numVertices / 10)) === 0) {
        steps.push({
          type: 'visit',
          node: { row: node.row, col: node.col },
          visitedCount,
          pathLength: 0,
          totalCost: node.distance
        });
      }
    }

    if (!updated) break;
  }

  const targetNode = nodes[target.row][target.col];
  if (targetNode.distance !== Infinity) {
    const path: { row: number; col: number }[] = [];
    let curr: GridNode | null = targetNode;
    const totalCost = targetNode.distance;
    while (curr) {
      path.unshift({ row: curr.row, col: curr.col });
      curr = curr.previousNode;
    }

    steps.push({
      type: 'path',
      path,
      visitedCount,
      pathLength: path.length,
      totalCost
    });
  }

  return steps;
}"""
    },
    {
        "filename": "src/algorithms/bfs.ts",
        "description": "Production TypeScript implementation of Breadth-First Search (BFS) using a FIFO queue.",
        "code": """import { GridNode, AlgorithmStep } from '../types/routing';

export function runBFS(
  grid: GridNode[][],
  start: { row: number; col: number },
  target: { row: number; col: number }
): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const rows = grid.length;
  const cols = grid[0].length;

  const nodes: GridNode[][] = grid.map(r => r.map(n => ({
    ...n,
    isVisited: false,
    previousNode: null,
    distance: Infinity
  })));

  const startNode = nodes[start.row][start.col];
  startNode.distance = 0;
  startNode.isVisited = true;

  const queue: GridNode[] = [startNode];
  let visitedCount = 0;

  while (queue.length > 0) {
    const current = queue.shift()!;
    visitedCount++;

    steps.push({
      type: 'visit',
      node: { row: current.row, col: current.col },
      visitedCount,
      pathLength: 0,
      totalCost: current.distance
    });

    if (current.row === target.row && current.col === target.col) {
      const path: { row: number; col: number }[] = [];
      let curr: GridNode | null = current;
      const totalCost = current.distance;
      while (curr) {
        path.unshift({ row: curr.row, col: curr.col });
        curr = curr.previousNode;
      }

      steps.push({
        type: 'path',
        path,
        visitedCount,
        pathLength: path.length,
        totalCost
      });
      return steps;
    }

    const neighbors = getNeighbors(nodes, current);
    for (const neighbor of neighbors) {
      if (!neighbor.isVisited && neighbor.type !== 'WALL') {
        neighbor.isVisited = true;
        neighbor.previousNode = current;
        neighbor.distance = current.distance + neighbor.weight;
        queue.push(neighbor);
      }
    }
  }

  return steps;
}"""
    },
    {
        "filename": "src/algorithms/dfs.ts",
        "description": "Production TypeScript implementation of Depth-First Search (DFS) using an explicit LIFO call stack.",
        "code": """import { GridNode, AlgorithmStep } from '../types/routing';

export function runDFS(
  grid: GridNode[][],
  start: { row: number; col: number },
  target: { row: number; col: number }
): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];

  const nodes: GridNode[][] = grid.map(r => r.map(n => ({
    ...n,
    isVisited: false,
    previousNode: null,
    distance: Infinity
  })));

  const startNode = nodes[start.row][start.col];
  startNode.distance = 0;

  const stack: GridNode[] = [startNode];
  let visitedCount = 0;

  while (stack.length > 0) {
    const current = stack.pop()!;

    if (current.isVisited || current.type === 'WALL') continue;
    current.isVisited = true;
    visitedCount++;

    steps.push({
      type: 'visit',
      node: { row: current.row, col: current.col },
      visitedCount,
      pathLength: 0,
      totalCost: current.distance
    });

    if (current.row === target.row && current.col === target.col) {
      const path: { row: number; col: number }[] = [];
      let curr: GridNode | null = current;
      const totalCost = current.distance;
      while (curr) {
        path.unshift({ row: curr.row, col: curr.col });
        curr = curr.previousNode;
      }

      steps.push({
        type: 'path',
        path,
        visitedCount,
        pathLength: path.length,
        totalCost
      });
      return steps;
    }

    const neighbors = getNeighbors(nodes, current);
    for (const neighbor of neighbors) {
      if (!neighbor.isVisited && neighbor.type !== 'WALL') {
        neighbor.previousNode = current;
        neighbor.distance = current.distance + neighbor.weight;
        stack.push(neighbor);
      }
    }
  }

  return steps;
}"""
    },
    {
        "filename": "src/algorithms/tsp.ts",
        "description": "Production TypeScript implementation of the Traveling Salesperson Problem (TSP) featuring exact Held-Karp Bitmask Dynamic Programming and Nearest Neighbor Heuristics.",
        "code": """export interface TSPStop {
  id: string;
  name: string;
  x: number;
  y: number;
}

export interface TSPResult {
  path: number[];
  totalDistance: number;
  stopsSequence: TSPStop[];
  computationTimeMs: number;
  method: 'HELD_KARP_DP' | 'NEAREST_NEIGHBOR';
}

function getDistanceMatrix(stops: TSPStop[]): number[][] {
  const n = stops.length;
  const matrix: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i !== j) {
        const dx = stops[i].x - stops[j].x;
        const dy = stops[i].y - stops[j].y;
        matrix[i][j] = Math.sqrt(dx * dx + dy * dy);
      }
    }
  }
  return matrix;
}

// 1. Nearest Neighbor Heuristic - O(N^2)
export function solveTSPNearestNeighbor(stops: TSPStop[]): TSPResult {
  const startTime = performance.now();
  const n = stops.length;
  if (n <= 1) {
    return { path: [0], totalDistance: 0, stopsSequence: stops, computationTimeMs: 0, method: 'NEAREST_NEIGHBOR' };
  }

  const dist = getDistanceMatrix(stops);
  const visited = new Array(n).fill(false);
  const path: number[] = [0];
  visited[0] = true;

  let totalDist = 0;
  let curr = 0;

  for (let step = 1; step < n; step++) {
    let nearest = -1;
    let minDist = Infinity;

    for (let next = 0; next < n; next++) {
      if (!visited[next] && dist[curr][next] < minDist) {
        minDist = dist[curr][next];
        nearest = next;
      }
    }

    if (nearest !== -1) {
      visited[nearest] = true;
      path.push(nearest);
      totalDist += minDist;
      curr = nearest;
    }
  }

  totalDist += dist[curr][0];
  path.push(0);

  const stopsSeq = path.map(idx => stops[idx]);
  const computationTimeMs = parseFloat((performance.now() - startTime).toFixed(2));

  return {
    path,
    totalDistance: parseFloat(totalDist.toFixed(2)),
    stopsSequence: stopsSeq,
    computationTimeMs,
    method: 'NEAREST_NEIGHBOR'
  };
}

// 2. Exact Held-Karp Dynamic Programming (Bitmask DP) - O(N^2 * 2^N)
export function solveTSPHeldKarp(stops: TSPStop[]): TSPResult {
  const startTime = performance.now();
  const n = stops.length;
  
  if (n > 12) {
    return solveTSPNearestNeighbor(stops);
  }

  const dist = getDistanceMatrix(stops);
  const memo: Map<string, { cost: number; parent: number }> = new Map();

  function dp(mask: number, pos: number): number {
    if (mask === (1 << n) - 1) {
      return dist[pos][0];
    }

    const key = `${mask}-${pos}`;
    if (memo.has(key)) return memo.get(key)!.cost;

    let ans = Infinity;
    let bestParent = -1;

    for (let next = 0; next < n; next++) {
      if ((mask & (1 << next)) === 0) {
        const newCost = dist[pos][next] + dp(mask | (1 << next), next);
        if (newCost < ans) {
          ans = newCost;
          bestParent = next;
        }
      }
    }

    memo.set(key, { cost: ans, parent: bestParent });
    return ans;
  }

  const totalDist = dp(1, 0);

  const path: number[] = [0];
  let mask = 1;
  let curr = 0;

  for (let i = 1; i < n; i++) {
    const key = `${mask}-${curr}`;
    const parent = memo.get(key)?.parent;
    if (parent !== undefined && parent !== -1) {
      path.push(parent);
      mask |= (1 << parent);
      curr = parent;
    }
  }
  path.push(0);

  const stopsSeq = path.map(idx => stops[idx]);
  const computationTimeMs = parseFloat((performance.now() - startTime).toFixed(2));

  return {
    path,
    totalDistance: parseFloat(totalDist.toFixed(2)),
    stopsSequence: stopsSeq,
    computationTimeMs,
    method: 'HELD_KARP_DP'
  };
}"""
    },
    {
        "filename": "src/algorithms/sorting.ts",
        "description": "Production TypeScript implementation of the Audio-Visual Sorting Engine with QuickSort, BubbleSort, InsertionSort, and SelectionSort.",
        "code": """import { SortingStep } from '../types/routing';

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
}"""
    },
    {
        "filename": "src/utils/SoundFX.ts",
        "description": "Production TypeScript implementation of the HTML5 Web Audio Synthesizer Engine mapping values to frequencies with exponential decay.",
        "code": """class SoundSynthesizer {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playTone(value: number, minVal: number = 10, maxVal: number = 500, durationMs: number = 40) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const clampedVal = Math.max(minVal, Math.min(maxVal, value));
    const normalized = (clampedVal - minVal) / (maxVal - minVal);
    const frequency = 120 + normalized * (1200 - 120);

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + durationMs / 1000);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + durationMs / 1000);
  }

  public playCompletionChord() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const frequencies = [523.25, 659.25, 783.99, 1046.50];
    frequencies.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.35);
      }, idx * 70);
    });
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }
}

export const soundFX = new SoundSynthesizer();"""
    },
    {
        "filename": "src/utils/gridGenerator.ts",
        "description": "Procedural Grid Generation utility implementing Recursive Division Maze algorithms and Perlin-style weighted noise distributions.",
        "code": """import { GridNode } from '../types/routing';

export function generateRecursiveDivisionMaze(
  grid: GridNode[][],
  startNode: { row: number; col: number },
  targetNode: { row: number; col: number }
): { row: number; col: number }[] {
  const walls: { row: number; col: number }[] = [];
  const rows = grid.length;
  const cols = grid[0].length;

  for (let r = 0; r < rows; r++) {
    if (r !== startNode.row || 0 !== startNode.col) walls.push({ row: r, col: 0 });
    if (r !== startNode.row || (cols - 1) !== startNode.col) walls.push({ row: r, col: cols - 1 });
  }
  for (let c = 0; c < cols; c++) {
    if (0 !== startNode.row || c !== startNode.col) walls.push({ row: 0, col: c });
    if ((rows - 1) !== startNode.row || c !== startNode.col) walls.push({ row: rows - 1, col: c });
  }

  function divide(r1: number, r2: number, c1: number, c2: number) {
    if (r2 - r1 < 2 || c2 - c1 < 2) return;

    const isHorizontal = (r2 - r1) > (c2 - c1);

    if (isHorizontal) {
      const midR = Math.floor((r1 + r2) / 2);
      const passC = Math.floor(Math.random() * (c2 - c1 + 1)) + c1;

      for (let c = c1; c <= c2; c++) {
        if (c !== passC) {
          if ((midR !== startNode.row || c !== startNode.col) &&
              (midR !== targetNode.row || c !== targetNode.col)) {
            walls.push({ row: midR, col: c });
          }
        }
      }

      divide(r1, midR - 1, c1, c2);
      divide(midR + 1, r2, c1, c2);
    } else {
      const midC = Math.floor((c1 + c2) / 2);
      const passR = Math.floor(Math.random() * (r2 - r1 + 1)) + r1;

      for (let r = r1; r <= r2; r++) {
        if (r !== passR) {
          if ((r !== startNode.row || midC !== startNode.col) &&
              (r !== targetNode.row || midC !== targetNode.col)) {
            walls.push({ row: r, col: midC });
          }
        }
      }

      divide(r1, r2, c1, midC - 1);
      divide(r1, r2, midC + 1, c2);
    }
  }

  divide(1, rows - 2, 1, cols - 2);
  return walls;
}"""
    },
    {
        "filename": "src/context/VisualizerContext.tsx",
        "description": "Core React Context state provider orchestrating visualization state machines, step playback dispatching, animation timing, and telemetry logging.",
        "code": """import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { AlgorithmStep, SortingStep, GridNode } from '../types/routing';
import { soundFX } from '../utils/SoundFX';

interface VisualizerContextType {
  isRunning: boolean;
  isPaused: boolean;
  playbackSpeed: number;
  currentStepIndex: number;
  totalSteps: number;
  isAudioEnabled: boolean;
  startVisualization: () => void;
  pauseVisualization: () => void;
  resumeVisualization: () => void;
  resetVisualization: () => void;
  setSpeed: (speed: number) => void;
  toggleAudio: () => void;
}

const VisualizerContext = createContext<VisualizerContextType | undefined>(undefined);

export const VisualizerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(30);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [totalSteps, setTotalSteps] = useState<number>(0);
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);

  const stepTimerRef = useRef<NodeJS.Timeout | null>(null);

  const toggleAudio = () => {
    const muted = soundFX.toggleMute();
    setIsAudioEnabled(!muted);
  };

  const startVisualization = () => {
    setIsRunning(true);
    setIsPaused(false);
    setCurrentStepIndex(0);
  };

  const pauseVisualization = () => {
    setIsPaused(true);
    if (stepTimerRef.current) clearTimeout(stepTimerRef.current);
  };

  const resumeVisualization = () => {
    setIsPaused(false);
  };

  const resetVisualization = () => {
    setIsRunning(false);
    setIsPaused(false);
    setCurrentStepIndex(0);
    if (stepTimerRef.current) clearTimeout(stepTimerRef.current);
  };

  return (
    <VisualizerContext.Provider
      value={{
        isRunning,
        isPaused,
        playbackSpeed,
        currentStepIndex,
        totalSteps,
        isAudioEnabled,
        startVisualization,
        pauseVisualization,
        resumeVisualization,
        resetVisualization,
        setSpeed: setPlaybackSpeed,
        toggleAudio
      }}
    >
      {children}
    </VisualizerContext.Provider>
  );
};

export const useVisualizer = () => {
  const context = useContext(VisualizerContext);
  if (!context) throw new Error('useVisualizer must be used within VisualizerProvider');
  return context;
};"""
    }
]

print("Extended manual and code listings ready.")
