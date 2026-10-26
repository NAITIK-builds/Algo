# AlgoLenz: Complete Algorithm Guide, Source Code & Pseudocode Specifications

Welcome to the comprehensive reference manual for all algorithms implemented in **AlgoLenz: Interactive Data Structures, Pathfinding & Sorting Visualization Platform**.

Every algorithm in this guide is structured with:
1. **Intuitive Concept & Real-World Analogy** (Easy to understand for any student, developer, or viva examiner).
2. **Standard Pseudocode Specification** (Clean, textbook-grade, step-by-step).
3. **Clean, Understandable Source Code** (Production-ready JavaScript/TypeScript without visualizer boilerplate).
4. **Complexity Analysis** (Best, Average, Worst Time & Auxiliary Space).
5. **Key Viva & Interview Takeaways** (Common questions asked in academic assessments).

---

## Table of Contents
- [PART 1: Graph Pathfinding & Traversal Algorithms](#part-1-graph-pathfinding--traversal-algorithms)
  - [1.1 Dijkstra's Shortest Path Algorithm](#11-dijkstras-shortest-path-algorithm)
  - [1.2 A* (A-Star) Heuristic Search Algorithm](#12-a-a-star-heuristic-search-algorithm)
  - [1.3 Breadth-First Search (BFS)](#13-breadth-first-search-bfs)
  - [1.4 Depth-First Search (DFS)](#14-depth-first-search-dfs)
  - [1.5 Bellman-Ford Algorithm](#15-bellman-ford-algorithm)
- [PART 2: Multi-Stop Routing & Traveling Salesperson (TSP)](#part-2-multi-stop-routing--traveling-salesperson-tsp)
  - [2.1 Nearest Neighbor Greedy TSP](#21-nearest-neighbor-greedy-tsp)
  - [2.2 Held-Karp Bitmask Dynamic Programming TSP](#22-held-karp-bitmask-dynamic-programming-tsp)
  - [2.3 2-Opt Geometric Untangling Heuristic](#23-2-opt-geometric-untangling-heuristic)
- [PART 3: Sorting Algorithms](#part-3-sorting-algorithms)
  - [3.1 Bubble Sort](#31-bubble-sort)
  - [3.2 Selection Sort](#32-selection-sort)
  - [3.3 Insertion Sort](#33-insertion-sort)
  - [3.4 Merge Sort](#34-merge-sort)
  - [3.5 Quick Sort](#35-quick-sort)
  - [3.6 Heap Sort](#36-heap-sort)
- [PART 4: Summary Comparison Master Tables](#part-4-summary-comparison-master-tables)

---

# PART 1: Graph Pathfinding & Traversal Algorithms

---

## 1.1 Dijkstra's Shortest Path Algorithm

### 💡 Intuition & Concept
Imagine pouring water onto a network of pipes where water spreads equally in all directions. The water naturally arrives at the closest points first before reaching farther ones. Dijkstra's algorithm operates on this principle: it explores outward in concentric ripples from the starting location, always visiting the unvisited intersection that has the **lowest cumulative travel cost** so far.

### 📋 Pseudocode
```text
Algorithm Dijkstra(Graph, startNode, targetNode):
    Input: Graph G = (V, E) with non-negative edge weights, startNode, targetNode
    Output: Shortest distance and path from startNode to targetNode

    1.  For each vertex v in V:
    2.      dist[v] = INFINITY
    3.      prev[v] = null
    4.      visited[v] = false
    5.  dist[startNode] = 0
    6.
    7.  Initialize MinPriorityQueue PQ
    8.  PQ.insert(startNode, priority = 0)
    9.
    10. While PQ is not empty:
    11.     u = PQ.extractMin()
    12.     If visited[u] is true: continue
    13.     visited[u] = true
    14.
    15.     If u == targetNode:
    16.         Return reconstructPath(prev, targetNode), dist[targetNode]
    17.
    18.     For each neighbor v of u:
    19.         If visited[v] is false:
    20.             tentativeDist = dist[u] + weight(u, v)
    21.             If tentativeDist < dist[v]:
    22.                 dist[v] = tentativeDist
    23.                 prev[v] = u
    24.                 PQ.insert(v, priority = tentativeDist)
    25.
    26. Return "No Path Exists"
```

### 💻 Easy-to-Understand Code
```typescript
interface Edge {
  node: string;
  weight: number;
}

type Graph = Record<string, Edge[]>;

export function dijkstra(graph: Graph, start: string, target: string) {
  const dist: Record<string, number> = {};
  const prev: Record<string, string | null> = {};
  const visited = new Set<string>();

  // 1. Initialize distances
  for (const node of Object.keys(graph)) {
    dist[node] = Infinity;
    prev[node] = null;
  }
  dist[start] = 0;

  // Simple Priority Queue simulated using an array
  const pq: { node: string; cost: number }[] = [{ node: start, cost: 0 }];

  while (pq.length > 0) {
    // Extract node with smallest tentative distance
    pq.sort((a, b) => a.cost - b.cost);
    const { node: curr } = pq.shift()!;

    if (visited.has(curr)) continue;
    visited.add(curr);

    // Reached destination!
    if (curr === target) break;

    // Inspect neighbors
    for (const { node: neighbor, weight } of graph[curr] || []) {
      if (visited.has(neighbor)) continue;

      const newDist = dist[curr] + weight;
      if (newDist < dist[neighbor]) {
        dist[neighbor] = newDist;
        prev[neighbor] = curr;
        pq.push({ node: neighbor, cost: newDist });
      }
    }
  }

  // Reconstruct path from target back to start
  const path: string[] = [];
  let currStep: string | null = target;
  while (currStep) {
    path.unshift(currStep);
    currStep = prev[currStep];
  }

  return {
    path: path[0] === start ? path : [],
    totalCost: dist[target] === Infinity ? -1 : dist[target],
  };
}
```

### ⏱️ Complexity Analysis
- **Time Complexity:**
  - With Binary Min-Heap: $\mathcal{O}((V + E) \log V)$
  - With Adjacency Matrix / Array: $\mathcal{O}(V^2)$
- **Space Complexity:** $\mathcal{O}(V)$ for distance table, visited set, and priority queue.
- **Limitation:** Fails with **negative edge weights** (can loop infinitely or produce incorrect shortest paths).

---

## 1.2 A* (A-Star) Heuristic Search Algorithm

### 💡 Intuition & Concept
Dijkstra searches in all directions equally. If our destination is to the East, Dijkstra wastes time exploring West, North, and South. **A* Search** fixes this by adding a "compass" called a **heuristic** ($h(n)$). It calculates total expected cost as:
$$f(n) = g(n) + h(n)$$
- $g(n)$: Exact travel cost paid to get from start to node $n$.
- $h(n)$: Estimated remaining distance from node $n$ to goal (e.g., Manhattan distance $|x_1 - x_2| + |y_1 - y_2|$).

Because it prefers nodes closer to the goal, it cuts through the grid like an arrow rather than spreading in a wide circle.

### 📋 Pseudocode
```text
Algorithm AStar(startNode, targetNode, HeuristicFunction):
    Input: startNode, targetNode, heuristic function h(n)
    Output: Optimal shortest path

    1.  gScore[startNode] = 0
    2.  fScore[startNode] = h(startNode, targetNode)
    3.
    4.  OpenSet = MinPriorityQueue()
    5.  OpenSet.insert(startNode, priority = fScore[startNode])
    6.  prev = Map()
    7.
    8.  While OpenSet is not empty:
    9.      current = OpenSet.extractMin()
    10.
    11.     If current == targetNode:
    12.         Return reconstructPath(prev, targetNode)
    13.
    14.     For each neighbor of current:
    15.         tentative_g = gScore[current] + weight(current, neighbor)
    16.         If tentative_g < gScore[neighbor]:
    17.             prev[neighbor] = current
    18.             gScore[neighbor] = tentative_g
    19.             fScore[neighbor] = tentative_g + h(neighbor, targetNode)
    20.             If neighbor not in OpenSet:
    21.                 OpenSet.insert(neighbor, priority = fScore[neighbor])
    22.
    23. Return "No Path Exists"
```

### 💻 Easy-to-Understand Code
```typescript
interface Point {
  row: number;
  col: number;
}

// Manhattan Distance Heuristic (admissible for 4-directional grid)
function manhattanDistance(a: Point, b: Point): number {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

export function aStar(
  grid: number[][], // grid[r][c] represents traversal weight (>0) or -1 for wall
  start: Point,
  target: Point
) {
  const rows = grid.length;
  const cols = grid[0].length;
  const key = (p: Point) => `${p.row},${p.col}`;

  const gScore = new Map<string, number>();
  const fScore = new Map<string, number>();
  const prev = new Map<string, Point | null>();

  const startKey = key(start);
  gScore.set(startKey, 0);
  fScore.set(startKey, manhattanDistance(start, target));

  const openSet: Point[] = [start];
  const closedSet = new Set<string>();

  while (openSet.length > 0) {
    // Sort to extract lowest fScore = g(n) + h(n)
    openSet.sort((a, b) => (fScore.get(key(a)) ?? Infinity) - (fScore.get(key(b)) ?? Infinity));
    const curr = openSet.shift()!;
    const currKey = key(curr);

    // Target reached
    if (curr.row === target.row && curr.col === target.col) {
      const path: Point[] = [];
      let step: Point | null = curr;
      while (step) {
        path.unshift(step);
        step = prev.get(key(step)) ?? null;
      }
      return { path, totalCost: gScore.get(currKey) };
    }

    closedSet.add(currKey);

    // 4 Orthogonal directions: Up, Down, Left, Right
    const deltas = [
      [-1, 0], [1, 0], [0, -1], [0, 1]
    ];

    for (const [dr, dc] of deltas) {
      const nr = curr.row + dr;
      const nc = curr.col + dc;

      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
      if (grid[nr][nc] === -1) continue; // Wall

      const neighbor: Point = { row: nr, col: nc };
      const nKey = key(neighbor);
      if (closedSet.has(nKey)) continue;

      const tentativeG = (gScore.get(currKey) ?? Infinity) + grid[nr][nc];

      if (tentativeG < (gScore.get(nKey) ?? Infinity)) {
        prev.set(nKey, curr);
        gScore.set(nKey, tentativeG);
        fScore.set(nKey, tentativeG + manhattanDistance(neighbor, target));

        if (!openSet.some(p => p.row === nr && p.col === nc)) {
          openSet.push(neighbor);
        }
      }
    }
  }

  return { path: [], totalCost: -1 };
}
```

### ⏱️ Complexity Analysis
- **Time Complexity:** Average $\mathcal{O}(E)$ (highly directed); Worst case $\mathcal{O}(b^d)$ where $b$ is branching factor and $d$ is solution depth.
- **Space Complexity:** $\mathcal{O}(V)$ to store the open set, closed set, and score maps.
- **Optimality Rule:** If $h(n)$ is **admissible** ($h(n) \le h^*(n)$ never overestimates) and **consistent**, A* is guaranteed to return the mathematically optimal shortest path.

---

## 1.3 Breadth-First Search (BFS)

### 💡 Intuition & Concept
BFS explores graph nodes in concentric layers (depth 1, then depth 2, then depth 3...). Think of it like ripples spreading on a calm pond. Because it uses a **Queue (FIFO - First In, First Out)**, it evaluates every neighbor at the current distance before taking any step further. On an **unweighted graph**, BFS is guaranteed to discover the shortest path with the fewest number of hops.

### 📋 Pseudocode
```text
Algorithm BFS(Graph, startNode, targetNode):
    Input: Graph G = (V, E), startNode, targetNode
    Output: Shortest path (fewest edges)

    1.  Initialize Queue Q
    2.  Initialize visited = Set()
    3.  Initialize prev = Map()
    4.
    5.  visited.add(startNode)
    6.  Q.enqueue(startNode)
    7.
    8.  While Q is not empty:
    9.      current = Q.dequeue()
    10.
    11.     If current == targetNode:
    12.         Return reconstructPath(prev, targetNode)
    13.
    14.     For each neighbor of current:
    15.         If neighbor not in visited:
    16.             visited.add(neighbor)
    17.             prev[neighbor] = current
    18.             Q.enqueue(neighbor)
    19.
    20. Return "Path Not Found"
```

### 💻 Easy-to-Understand Code
```typescript
export function bfs(adjList: Record<string, string[]>, start: string, target: string) {
  const queue: string[] = [start]; // FIFO Queue
  const visited = new Set<string>([start]);
  const prev: Record<string, string | null> = { [start]: null };

  while (queue.length > 0) {
    const curr = queue.shift()!; // Dequeue first element

    if (curr === target) {
      // Reconstruct path
      const path: string[] = [];
      let step: string | null = target;
      while (step) {
        path.unshift(step);
        step = prev[step];
      }
      return { path, hops: path.length - 1 };
    }

    for (const neighbor of adjList[curr] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        prev[neighbor] = curr;
        queue.push(neighbor); // Enqueue at end
      }
    }
  }

  return { path: [], hops: -1 };
}
```

### ⏱️ Complexity Analysis
- **Time Complexity:** $\mathcal{O}(V + E)$ — Every vertex and edge is visited at most once.
- **Space Complexity:** $\mathcal{O}(V)$ for the queue and visited set.

---

## 1.4 Depth-First Search (DFS)

### 💡 Intuition & Concept
DFS explores a path as deep as possible until it hits a dead end, and only then **backtracks** to explore alternate branches. Imagine exploring a maze by keeping your hand against the right-hand wall: you walk down every corridor until you must turn back. DFS uses a **Stack (LIFO - Last In, First Out)** or recursion.

*Note: DFS does NOT guarantee the shortest path! It is primarily used for maze generation, cycle detection, and topological sorting.*

### 📋 Pseudocode
```text
Algorithm DFS(Graph, startNode, targetNode):
    Input: Graph G = (V, E), startNode, targetNode
    Output: A discovered path to targetNode (not necessarily shortest)

    1.  Initialize Stack S
    2.  Initialize visited = Set()
    3.  Initialize prev = Map()
    4.
    5.  S.push(startNode)
    6.
    7.  While S is not empty:
    8.      current = S.pop()
    9.
    10.     If current in visited: continue
    11.     visited.add(current)
    12.
    13.     If current == targetNode:
    14.         Return reconstructPath(prev, targetNode)
    15.
    16.     For each neighbor of current in reverse order:
    17.         If neighbor not in visited:
    18.             prev[neighbor] = current
    19.             S.push(neighbor)
    20.
    21. Return "Target Unreachable"
```

### 💻 Easy-to-Understand Code
```typescript
export function dfs(adjList: Record<string, string[]>, start: string, target: string) {
  const stack: string[] = [start]; // LIFO Stack
  const visited = new Set<string>();
  const prev: Record<string, string | null> = { [start]: null };

  while (stack.length > 0) {
    const curr = stack.pop()!; // Pop top element

    if (visited.has(curr)) continue;
    visited.add(curr);

    if (curr === target) {
      const path: string[] = [];
      let step: string | null = target;
      while (step) {
        path.unshift(step);
        step = prev[step];
      }
      return { path, visitedCount: visited.size };
    }

    // Push unvisited neighbors onto stack
    const neighbors = adjList[curr] || [];
    for (let i = neighbors.length - 1; i >= 0; i--) {
      const neighbor = neighbors[i];
      if (!visited.has(neighbor)) {
        prev[neighbor] = curr;
        stack.push(neighbor);
      }
    }
  }

  return { path: [], visitedCount: visited.size };
}
```

### ⏱️ Complexity Analysis
- **Time Complexity:** $\mathcal{O}(V + E)$
- **Space Complexity:** $\mathcal{O}(V)$ for the recursion stack / memory stack.

---

## 1.5 Bellman-Ford Algorithm

### 💡 Intuition & Concept
While Dijkstra's algorithm fails when edge weights are negative, **Bellman-Ford** handles negative edges reliably. It works by brute-force relaxation: in a graph with $|V|$ vertices, any simple path can contain at most $|V| - 1$ edges. Thus, relaxing all edges $|V| - 1$ times guarantees finding the true shortest paths. If an edge can still be relaxed in the $|V|$-th pass, the graph must contain a **negative weight cycle** (infinite discount loop).

### 📋 Pseudocode
```text
Algorithm BellmanFord(Vertices, Edges, source):
    Input: Set of Vertices V, Set of directed Edges E with weights, source
    Output: Shortest distance array dist, or Negative Cycle Flag

    1.  For each vertex v in V:
    2.      dist[v] = INFINITY
    3.      prev[v] = null
    4.  dist[source] = 0
    5.
    6.  // Pass 1 to |V| - 1: Relax all edges
    7.  For iteration from 1 to |V| - 1:
    8.      updated = false
    9.      For each directed edge (u, v, weight) in Edges:
    10.         If dist[u] != INFINITY and dist[u] + weight < dist[v]:
    11.             dist[v] = dist[u] + weight
    12.             prev[v] = u
    13.             updated = true
    14.     If updated is false: break // Early termination optimization
    15.
    16.  // Step 2: Check for negative weight cycles
    17.  For each directed edge (u, v, weight) in Edges:
    18.      If dist[u] != INFINITY and dist[u] + weight < dist[v]:
    19.          Return "Graph contains a negative weight cycle!"
    20.
    21.  Return dist, prev
```

### 💻 Easy-to-Understand Code
```typescript
interface DirectedEdge {
  from: string;
  to: string;
  weight: number;
}

export function bellmanFord(vertices: string[], edges: DirectedEdge[], source: string) {
  const dist: Record<string, number> = {};
  const prev: Record<string, string | null> = {};

  for (const v of vertices) {
    dist[v] = Infinity;
    prev[v] = null;
  }
  dist[source] = 0;

  // Relax all edges |V| - 1 times
  const V = vertices.length;
  for (let i = 0; i < V - 1; i++) {
    let hasChanged = false;
    for (const { from, to, weight } of edges) {
      if (dist[from] !== Infinity && dist[from] + weight < dist[to]) {
        dist[to] = dist[from] + weight;
        prev[to] = from;
        hasChanged = true;
      }
    }
    if (!hasChanged) break; // Optimization: early finish if converged
  }

  // Detect negative weight cycle
  for (const { from, to, weight } of edges) {
    if (dist[from] !== Infinity && dist[from] + weight < dist[to]) {
      return { hasNegativeCycle: true, dist: {}, prev: {} };
    }
  }

  return { hasNegativeCycle: false, dist, prev };
}
```

### ⏱️ Complexity Analysis
- **Time Complexity:** $\mathcal{O}(V \cdot E)$
- **Space Complexity:** $\mathcal{O}(V)$ for distance and predecessor tables.

---

# PART 2: Multi-Stop Routing & Traveling Salesperson (TSP)

---

## 2.1 Nearest Neighbor Greedy TSP

### 💡 Intuition & Concept
Imagine a delivery driver who has 8 parcels to deliver. At each stop, instead of calculating all possible routes, the driver simply looks at GPS and drives to whichever undelivered address is **closest right now**. This is the **Nearest Neighbor Heuristic**: fast, intuitive, and produces good solutions in milliseconds, though not always the absolute shortest total tour.

### 📋 Pseudocode
```text
Algorithm NearestNeighborTSP(Stops):
    Input: Array of stops S[0..n-1], where S[0] is rider hub
    Output: Complete closed delivery tour

    1.  visited = Array of size n, initialized to false
    2.  tour = [0]
    3.  visited[0] = true
    4.  current = 0
    5.
    6.  For step = 1 to n - 1:
    7.      nearestStop = -1
    8.      minDistance = INFINITY
    9.      For candidate = 0 to n - 1:
    10.         If visited[candidate] is false:
    11.             d = EuclideanDistance(Stops[current], Stops[candidate])
    12.             If d < minDistance:
    13.                 minDistance = d
    14.                 nearestStop = candidate
    15.     visited[nearestStop] = true
    16.     tour.append(nearestStop)
    17.     current = nearestStop
    18.
    19. tour.append(0) // Return to rider depot
    20. Return tour
```

### 💻 Easy-to-Understand Code
```typescript
interface Stop {
  id: string;
  x: number;
  y: number;
}

function euclideanDistance(a: Stop, b: Stop): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

export function nearestNeighborTSP(stops: Stop[]) {
  const n = stops.length;
  if (n <= 1) return { tour: [0], totalDistance: 0 };

  const visited = new Array(n).fill(false);
  const tour: number[] = [0]; // Start at origin hub
  visited[0] = true;

  let current = 0;
  let totalDistance = 0;

  for (let step = 1; step < n; step++) {
    let nearest = -1;
    let minDist = Infinity;

    for (let candidate = 0; candidate < n; candidate++) {
      if (!visited[candidate]) {
        const d = euclideanDistance(stops[current], stops[candidate]);
        if (d < minDist) {
          minDist = d;
          nearest = candidate;
        }
      }
    }

    visited[nearest] = true;
    tour.push(nearest);
    totalDistance += minDist;
    current = nearest;
  }

  // Return to origin stop
  totalDistance += euclideanDistance(stops[current], stops[0]);
  tour.push(0);

  return { tour, totalDistance };
}
```

### ⏱️ Complexity Analysis
- **Time Complexity:** $\mathcal{O}(N^2)$ — Fast and scalable for hundreds of stops.
- **Space Complexity:** $\mathcal{O}(N)$ for visited tracking and path array.

---

## 2.2 Held-Karp Bitmask Dynamic Programming TSP

### 💡 Intuition & Concept
TSP is NP-Hard. Checking every possible order of $N$ cities takes $\mathcal{O}(N!)$ (factorial) time—for 15 stops, $15! \approx 1.3 \times 10^{12}$ calculations!
The **Held-Karp Algorithm** reduces this dramatically to $\mathcal{O}(2^N \cdot N^2)$ using **Dynamic Programming with Bitmasks**:
- A single integer `mask` represents the set of visited cities in binary (e.g., `1011` means cities 0, 1, and 3 are visited).
- We store subproblem answers in memory: `memo[mask][city]` = *shortest route visiting the subset of cities in `mask` and ending at `city`*.
- Redundant calculations are eliminated completely.

### 📋 Pseudocode
```text
Algorithm HeldKarpTSP(DistanceMatrix, n):
    Input: DistanceMatrix D[0..n-1][0..n-1], number of cities n
    Output: Absolute minimum cost closed tour

    1.  memo = 2D array of size (2^n) x n, initialized to null
    2.
    3.  Function DP(mask, pos):
    4.      // Base Case: All n stops visited (mask has all 1s)
    5.      If mask == (1 << n) - 1:
    6.          Return D[pos][0] // Return to start
    7.
    8.      If memo[mask][pos] is not null:
    9.          Return memo[mask][pos]
    10.
    11.     minCost = INFINITY
    12.     For next = 0 to n - 1:
    13.         // If city 'next' has not been visited yet:
    14.         If (mask & (1 << next)) == 0:
    15.             newCost = D[pos][next] + DP(mask | (1 << next), next)
    16.             minCost = min(minCost, newCost)
    17.
    18.     memo[mask][pos] = minCost
    19.     Return minCost
    20.
    21. Return DP(1, 0) // Start at city 0 with mask 1 (binary ...0001)
```

### 💻 Easy-to-Understand Code
```typescript
export function heldKarpTSP(distanceMatrix: number[][]): number {
  const n = distanceMatrix.length;
  // memo[mask][pos]: mask is a bitmask of visited nodes, pos is current city
  const memo = new Map<string, number>();

  function dp(mask: number, pos: number): number {
    // All cities visited: (1 << n) - 1 is all 1s in binary
    if (mask === (1 << n) - 1) {
      return distanceMatrix[pos][0]; // Cost to return to depot
    }

    const key = `${mask},${pos}`;
    if (memo.has(key)) return memo.get(key)!;

    let minDistance = Infinity;

    for (let next = 0; next < n; next++) {
      // Check if 'next' bit is 0 (unvisited)
      if ((mask & (1 << next)) === 0) {
        const cost = distanceMatrix[pos][next] + dp(mask | (1 << next), next);
        if (cost < minDistance) {
          minDistance = cost;
        }
      }
    }

    memo.set(key, minDistance);
    return minDistance;
  }

  // Start at city 0, mask = 1 (only city 0 visited)
  return dp(1, 0);
}
```

### ⏱️ Complexity Analysis
- **Time Complexity:** $\mathcal{O}(2^N \cdot N^2)$ — Solves $N \le 15$ in milliseconds where brute force would take days.
- **Space Complexity:** $\mathcal{O}(2^N \cdot N)$ for memoization table.

---

## 2.3 2-Opt Geometric Untangling Heuristic

### 💡 Intuition & Concept
When an initial TSP tour is generated (e.g., via Nearest Neighbor), route segments often cross each other. In Euclidean geometry, the shortest distance between two points is a straight line. By the **Triangle Inequality**, whenever two lines cross, untangling them and connecting opposite endpoints **always shortens the tour**. 2-Opt continuously cuts two crossing edges and reconnects them in reverse order until no further improvement is possible.

### 📋 Pseudocode
```text
Algorithm TwoOpt(Tour, DistanceMatrix):
    Input: Tour T of vertices, DistanceMatrix D
    Output: Untangled local minimum tour

    1.  improved = true
    2.  While improved is true:
    3.      improved = false
    4.      For i = 1 to Tour.length - 2:
    5.          For j = i + 1 to Tour.length - 1:
    6.              currentCost = D[T[i-1]][T[i]] + D[T[j]][T[j+1]]
    7.              newCost     = D[T[i-1]][T[j]] + D[T[i]][T[j+1]]
    8.              If newCost < currentCost:
    9.                  Reverse the sub-array Tour[i...j]
    10.                 improved = true
    11. Return Tour
```

### 💻 Easy-to-Understand Code
```typescript
export function twoOpt(tour: number[], distMatrix: number[][]): number[] {
  let improved = true;
  const n = tour.length;
  const bestTour = [...tour];

  while (improved) {
    improved = false;
    for (let i = 1; i < n - 2; i++) {
      for (let j = i + 1; j < n - 1; j++) {
        const a = bestTour[i - 1], b = bestTour[i];
        const c = bestTour[j], d = bestTour[j + 1];

        const currentDist = distMatrix[a][b] + distMatrix[c][d];
        const swappedDist = distMatrix[a][c] + distMatrix[b][d];

        if (swappedDist < currentDist) {
          // Reverse segment from index i to j
          let left = i, right = j;
          while (left < right) {
            [bestTour[left], bestTour[right]] = [bestTour[right], bestTour[left]];
            left++;
            right--;
          }
          improved = true;
        }
      }
    }
  }

  return bestTour;
}
```

---

# PART 3: Sorting Algorithms

---

## 3.1 Bubble Sort

### 💡 Intuition & Concept
Compare adjacent items in an array. If the left item is larger than the right, swap them. Repeat this pass over and over. With each full pass, the largest remaining item "bubbles up" to its correct position at the end of the array, just like air bubbles rising in a glass of soda.

### 📋 Pseudocode
```text
Algorithm BubbleSort(A):
    Input: Array A of size n
    Output: Sorted Array A in ascending order

    1.  For i = 0 to n - 1:
    2.      swapped = false
    3.      For j = 0 to n - i - 2:
    4.          If A[j] > A[j + 1]:
    5.              Swap(A[j], A[j + 1])
    6.              swapped = true
    7.      If swapped is false: break // Array is already sorted
    8.  Return A
```

### 💻 Easy-to-Understand Code
```typescript
export function bubbleSort(arr: number[]): number[] {
  const a = [...arr];
  const n = a.length;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]]; // Swap
        swapped = true;
      }
    }
    // Optimization: if no two elements swapped, array is sorted
    if (!swapped) break;
  }

  return a;
}
```

### ⏱️ Complexity Analysis
- **Best Case Time:** $\mathcal{O}(N)$ (When array is already sorted).
- **Average & Worst Case Time:** $\mathcal{O}(N^2)$.
- **Space Complexity:** $\mathcal{O}(1)$ (In-place).
- **Stability:** **Stable** (Does not change the relative order of identical elements).

---

## 3.2 Selection Sort

### 💡 Intuition & Concept
Scan the entire unsorted list to find the absolute **minimum** value. Once found, swap it with the element at the beginning. Then scan the rest of the list for the next smallest value and place it in the second slot. Continue until the list is completely sorted.

### 📋 Pseudocode
```text
Algorithm SelectionSort(A):
    Input: Array A of size n
    Output: Sorted Array A

    1.  For i = 0 to n - 1:
    2.      minIdx = i
    3.      For j = i + 1 to n - 1:
    4.          If A[j] < A[minIdx]:
    5.              minIdx = j
    6.      If minIdx != i:
    7.          Swap(A[i], A[minIdx])
    8.  Return A
```

### 💻 Easy-to-Understand Code
```typescript
export function selectionSort(arr: number[]): number[] {
  const a = [...arr];
  const n = a.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (a[j] < a[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
    }
  }

  return a;
}
```

### ⏱️ Complexity Analysis
- **Best, Average, and Worst Time:** Always $\mathcal{O}(N^2)$ (always checks all remaining elements).
- **Space Complexity:** $\mathcal{O}(1)$ (In-place).
- **Key Advantage:** Performs at most $\mathcal{O}(N)$ memory swaps (useful when memory write operations are expensive, such as flash EEPROM).

---

## 3.3 Insertion Sort

### 💡 Intuition & Concept
Think of how you sort playing cards in your hand. You start with one card. When you pick up a second card, you compare it to the first and slide it into its correct position. For each subsequent card, you slide it left past all cards that are larger until it reaches its proper spot.

### 📋 Pseudocode
```text
Algorithm InsertionSort(A):
    Input: Array A of size n
    Output: Sorted Array A

    1.  For i = 1 to n - 1:
    2.      key = A[i]
    3.      j = i - 1
    4.      While j >= 0 and A[j] > key:
    5.          A[j + 1] = A[j] // Shift element to right
    6.          j = j - 1
    7.      A[j + 1] = key      // Insert key in vacant position
    8.  Return A
```

### 💻 Easy-to-Understand Code
```typescript
export function insertionSort(arr: number[]): number[] {
  const a = [...arr];

  for (let i = 1; i < a.length; i++) {
    const key = a[i];
    let j = i - 1;

    // Shift elements of a[0..i-1] that are greater than key to one position ahead
    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j];
      j--;
    }
    a[j + 1] = key;
  }

  return a;
}
```

### ⏱️ Complexity Analysis
- **Best Case Time:** $\mathcal{O}(N)$ (When array is already sorted or nearly sorted).
- **Average & Worst Case Time:** $\mathcal{O}(N^2)$.
- **Space Complexity:** $\mathcal{O}(1)$.
- **Key Advantage:** Extremely fast for small arrays ($N \le 20$) and **adaptive** (finishes in near-linear time on nearly sorted data).

---

## 3.4 Merge Sort

### 💡 Intuition & Concept
Merge Sort is a **Divide and Conquer** algorithm:
1. **Divide:** Cut the array in half repeatedly until you have single-element subarrays (which are trivially sorted).
2. **Conquer:** Merge pairs of sorted sub-lists back together by comparing front elements one by one into a new combined sorted list.

### 📋 Pseudocode
```text
Algorithm MergeSort(A, left, right):
    Input: Array A, left index, right index

    1.  If left >= right: return
    2.  mid = floor((left + right) / 2)
    3.  MergeSort(A, left, mid)
    4.  MergeSort(A, mid + 1, right)
    5.  Merge(A, left, mid, right)

Algorithm Merge(A, left, mid, right):
    1.  Create temporary arrays L and R
    2.  i = 0, j = 0, k = left
    3.  While i < L.length and j < R.length:
    4.      If L[i] <= R[j]:
    5.          A[k] = L[i]; i++
    6.      Else:
    7.          A[k] = R[j]; j++
    8.      k++
    9.  Copy any remaining items from L and R into A
```

### 💻 Easy-to-Understand Code
```typescript
export function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let i = 0, j = 0;

  // Zipper merge
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  // Append remaining items
  return result.concat(left.slice(i)).concat(right.slice(j));
}
```

### ⏱️ Complexity Analysis
- **Time Complexity:** Guaranteed $\mathcal{O}(N \log N)$ in all cases (Best, Average, Worst).
- **Space Complexity:** $\mathcal{O}(N)$ for temporary arrays.
- **Stability:** **Stable** (preserves initial order of equals).

---

## 3.5 Quick Sort

### 💡 Intuition & Concept
Quick Sort also uses **Divide and Conquer**:
1. Select a **pivot** element (e.g., the last element).
2. **Partition:** Rearrange the array so that every item smaller than the pivot is on its left, and every item larger than the pivot is on its right.
3. The pivot is now in its permanently correct final position.
4. Recursively repeat this process on the left and right halves.

### 📋 Pseudocode
```text
Algorithm QuickSort(A, low, high):
    Input: Array A, starting index low, ending index high

    1.  If low < high:
    2.      pivotIndex = Partition(A, low, high)
    3.      QuickSort(A, low, pivotIndex - 1)
    4.      QuickSort(A, pivotIndex + 1, high)

Algorithm Partition(A, low, high):
    1.  pivot = A[high]
    2.  i = low - 1
    3.  For j = low to high - 1:
    4.      If A[j] <= pivot:
    5.          i = i + 1
    6.          Swap(A[i], A[j])
    7.  Swap(A[i + 1], A[high])
    8.  Return i + 1
```

### 💻 Easy-to-Understand Code
```typescript
export function quickSort(arr: number[]): number[] {
  const a = [...arr];

  function sort(low: number, high: number) {
    if (low < high) {
      const pIdx = partition(low, high);
      sort(low, pIdx - 1);
      sort(pIdx + 1, high);
    }
  }

  function partition(low: number, high: number): number {
    const pivot = a[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (a[j] <= pivot) {
        i++;
        [a[i], a[j]] = [a[j], a[i]];
      }
    }
    // Place pivot in correct spot
    [a[i + 1], a[high]] = [a[high], a[i + 1]];
    return i + 1;
  }

  sort(0, a.length - 1);
  return a;
}
```

### ⏱️ Complexity Analysis
- **Best & Average Case Time:** $\mathcal{O}(N \log N)$ (With high cache locality and minimal overhead).
- **Worst Case Time:** $\mathcal{O}(N^2)$ (When pivot is always the smallest or largest element, e.g. already sorted array without randomized pivot).
- **Space Complexity:** $\mathcal{O}(\log N)$ auxiliary stack space.

---

## 3.6 Heap Sort

### 💡 Intuition & Concept
Heap Sort converts the array into a **Binary Max-Heap** (a complete binary tree where every parent node is greater than or equal to its children):
1. Build Max-Heap from the array. The largest element is now at the root `a[0]`.
2. Swap the root with the last element of the array. The largest element is now in its sorted final place.
3. Reduce the heap size by 1 and call `heapify` on the new root to restore the Max-Heap property.
4. Repeat until all elements are sorted.

### 📋 Pseudocode
```text
Algorithm HeapSort(A):
    Input: Array A of size n
    Output: Sorted Array A

    1.  // Step 1: Build max-heap
    2.  For i = floor(n / 2) - 1 down to 0:
    3.      Heapify(A, n, i)
    4.
    5.  // Step 2: Extract elements from heap one by one
    6.  For i = n - 1 down to 1:
    7.      Swap(A[0], A[i]) // Move current max to end
    8.      Heapify(A, i, 0) // Re-heapify root
    9.  Return A

Algorithm Heapify(A, n, i):
    1.  largest = i
    2.  left = 2 * i + 1
    3.  right = 2 * i + 2
    4.  If left < n and A[left] > A[largest]: largest = left
    5.  If right < n and A[right] > A[largest]: largest = right
    6.  If largest != i:
    7.      Swap(A[i], A[largest])
    8.      Heapify(A, n, largest)
```

### 💻 Easy-to-Understand Code
```typescript
export function heapSort(arr: number[]): number[] {
  const a = [...arr];
  const n = a.length;

  function heapify(length: number, i: number) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < length && a[left] > a[largest]) largest = left;
    if (right < length && a[right] > a[largest]) largest = right;

    if (largest !== i) {
      [a[i], a[largest]] = [a[largest], a[i]];
      heapify(length, largest); // Sift down
    }
  }

  // 1. Build Max-Heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  // 2. Extract max element to end
  for (let i = n - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    heapify(i, 0);
  }

  return a;
}
```

### ⏱️ Complexity Analysis
- **Time Complexity:** Guaranteed $\mathcal{O}(N \log N)$ in all cases (Best, Average, Worst).
- **Space Complexity:** $\mathcal{O}(1)$ strictly in-place (no auxiliary array like Merge Sort).
- **Stability:** **Not Stable** (Swaps can disrupt original relative ordering of equal elements).

---

# PART 4: Summary Comparison Master Tables

### Graph & Pathfinding Algorithms

| Algorithm | Best / Avg Time | Worst Time | Space | Weights | Negative Edges? | Optimal? | Primary Use Case |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Dijkstra** | $\mathcal{O}((V+E)\log V)$ | $\mathcal{O}((V+E)\log V)$ | $\mathcal{O}(V)$ | Weighted | ❌ No | ✅ Yes | Food dispatch / real street traffic |
| **A\* Search** | $\mathcal{O}(E)$ Avg | $\mathcal{O}(b^d)$ | $\mathcal{O}(V)$ | Weighted | ❌ No | ✅ Yes (if admissible) | Google Maps / GPS routing |
| **BFS** | $\mathcal{O}(V + E)$ | $\mathcal{O}(V + E)$ | $\mathcal{O}(V)$ | Unweighted | N/A | ✅ Yes (fewest hops) | Social networks / peer discovery |
| **DFS** | $\mathcal{O}(V + E)$ | $\mathcal{O}(V + E)$ | $\mathcal{O}(V)$ | Unweighted | N/A | ❌ No | Maze generation / cycle checks |
| **Bellman-Ford** | $\mathcal{O}(V \cdot E)$ | $\mathcal{O}(V \cdot E)$ | $\mathcal{O}(V)$ | Weighted | ✅ Yes | ✅ Yes (detects cycles) | Forex arbitrage / toll discount pricing |

---

### Sorting Algorithms

| Algorithm | Best Time | Average Time | Worst Time | Space | Stable? | Method |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Bubble Sort** | $\mathcal{O}(N)$ | $\mathcal{O}(N^2)$ | $\mathcal{O}(N^2)$ | $\mathcal{O}(1)$ | ✅ Yes | Exchanging |
| **Selection Sort**| $\mathcal{O}(N^2)$ | $\mathcal{O}(N^2)$ | $\mathcal{O}(N^2)$ | $\mathcal{O}(1)$ | ❌ No | Selection |
| **Insertion Sort**| $\mathcal{O}(N)$ | $\mathcal{O}(N^2)$ | $\mathcal{O}(N^2)$ | $\mathcal{O}(1)$ | ✅ Yes | Insertion |
| **Merge Sort** | $\mathcal{O}(N \log N)$ | $\mathcal{O}(N \log N)$ | $\mathcal{O}(N \log N)$ | $\mathcal{O}(N)$ | ✅ Yes | Divide & Conquer |
| **Quick Sort** | $\mathcal{O}(N \log N)$ | $\mathcal{O}(N \log N)$ | $\mathcal{O}(N^2)$ | $\mathcal{O}(\log N)$ | ❌ No | Partitioning |
| **Heap Sort** | $\mathcal{O}(N \log N)$ | $\mathcal{O}(N \log N)$ | $\mathcal{O}(N \log N)$ | $\mathcal{O}(1)$ | ❌ No | Selection via Heap |

---

### Multi-Stop & TSP Algorithms

| Method | Technique | Time Complexity | Space | Optimality | Recommended Stop Limit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Nearest Neighbor** | Greedy Heuristic | $\mathcal{O}(N^2)$ | $\mathcal{O}(N)$ | Approximation | Up to $1000+$ stops |
| **Held-Karp** | Bitmask Dynamic Programming | $\mathcal{O}(2^N \cdot N^2)$ | $\mathcal{O}(2^N \cdot N)$ | 100% Mathematically Exact | Up to $12$ stops |
| **2-Opt** | Geometric Local Search | $\mathcal{O}(N^2)$ per pass | $\mathcal{O}(N)$ | Local Optimum (Untangled) | Up to $500+$ stops |

---
*Created for PSIT Minor Project BCA-5005 — AlgoLenz Visualization Platform.*
