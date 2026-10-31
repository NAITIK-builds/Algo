import React, { useState } from 'react';
import { useVisualizer } from '../../context/VisualizerContext';
import { BookOpen, CheckCircle, Sparkles, Code, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';

interface AlgoSpec {
  name: string;
  timeComp: string;
  spaceComp: string;
  guarantee: string;
  desc: string;
  useCase: string;
  pseudocode: string[];
  cleanCode: string;
}

export const AlgorithmInfoCard: React.FC = () => {
  const { algorithm } = useVisualizer();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'pseudocode' | 'code'>('pseudocode');
  const [copied, setCopied] = useState<boolean>(false);

  const infoMap: Record<string, AlgoSpec> = {
    dijkstra: {
      name: "Dijkstra's Shortest Path",
      timeComp: 'O((V + E) log V)',
      spaceComp: 'O(V)',
      guarantee: 'Guaranteed Mathematically Optimal',
      desc: 'Explores nodes uniformly by current lowest cumulative path cost using a priority queue. Unbeatable for positive edge weights.',
      useCase: 'Primary shortest route optimizer in Swiggy & Zomato delivery dispatch with real-time street traffic weights.',
      pseudocode: [
        'function Dijkstra(Graph, source, target):',
        '  for each vertex v in Graph:',
        '    dist[v] = INFINITY',
        '    prev[v] = null',
        '  dist[source] = 0',
        '  PQ = MinPriorityQueue()',
        '  PQ.insert(source, priority = 0)',
        '',
        '  while PQ is not empty:',
        '    u = PQ.extractMin()',
        '    if u == target: return reconstructPath(prev, target)',
        '',
        '    for each neighbor v of u:',
        '      newDist = dist[u] + weight(u, v)',
        '      if newDist < dist[v]:',
        '        dist[v] = newDist',
        '        prev[v] = u',
        '        PQ.insertOrUpdate(v, priority = newDist)',
        '  return failure (path not found)'
      ],
      cleanCode: `// Clean, Easy-to-Understand Dijkstra Implementation
function dijkstra(graph, start, target) {
  const dist = {};
  const prev = {};
  const unvisited = new Set(Object.keys(graph));

  // 1. Initialize distances: 0 for start, Infinity for others
  for (let node of unvisited) dist[node] = Infinity;
  dist[start] = 0;

  // 2. Greedily visit node with smallest known distance
  while (unvisited.size > 0) {
    let curr = null;
    for (let node of unvisited) {
      if (!curr || dist[node] < dist[curr]) curr = node;
    }

    if (dist[curr] === Infinity || curr === target) break;
    unvisited.delete(curr);

    // 3. Relax neighbors
    for (let [neighbor, weight] of Object.entries(graph[curr])) {
      if (!unvisited.has(neighbor)) continue;
      const newDist = dist[curr] + weight;
      if (newDist < dist[neighbor]) {
        dist[neighbor] = newDist;
        prev[neighbor] = curr;
      }
    }
  }

  // 4. Reconstruct shortest path
  const path = [];
  let step = target;
  while (step) { path.unshift(step); step = prev[step]; }
  return { path, totalCost: dist[target] };
}`
    },
    aStar: {
      name: 'A* Heuristic Search (A-Star)',
      timeComp: 'O(E) Avg / O(b^d) Worst',
      spaceComp: 'O(V)',
      guarantee: 'Guaranteed Optimal (Admissible Heuristic)',
      desc: 'Directs exploration towards the target using f(n) = g(n) + h(n), where h(n) is the Manhattan distance heuristic.',
      useCase: 'Google Maps / Uber turn-by-turn navigation engine avoiding unnecessary searches in opposite directions.',
      pseudocode: [
        'function AStar(start, target, heuristic):',
        '  gScore[start] = 0',
        '  fScore[start] = heuristic(start, target)',
        '  OpenSet = PriorityQueue()',
        '  OpenSet.insert(start, priority = fScore[start])',
        '',
        '  while OpenSet is not empty:',
        '    curr = OpenSet.extractMin()',
        '    if curr == target: return reconstructPath(prev, target)',
        '',
        '    for each neighbor of curr:',
        '      tentative_g = gScore[curr] + cost(curr, neighbor)',
        '      if tentative_g < gScore[neighbor]:',
        '        prev[neighbor] = curr',
        '        gScore[neighbor] = tentative_g',
        '        fScore[neighbor] = tentative_g + heuristic(neighbor, target)',
        '        OpenSet.insertOrUpdate(neighbor, fScore[neighbor])',
        '  return failure'
      ],
      cleanCode: `// Clean, Easy-to-Understand A* Search Implementation
function aStar(start, target, getNeighbors, heuristic) {
  const gScore = new Map();
  const fScore = new Map();
  const prev = new Map();
  const openSet = [start];

  gScore.set(start.id, 0);
  fScore.set(start.id, heuristic(start, target));

  while (openSet.length > 0) {
    // Pick node with lowest f(n) = g(n) + h(n)
    openSet.sort((a, b) => (fScore.get(a.id) ?? Infinity) - (fScore.get(b.id) ?? Infinity));
    const curr = openSet.shift();

    if (curr.id === target.id) {
      // Goal reached! Rebuild path
      const path = [];
      let step = curr;
      while (step) { path.unshift(step); step = prev.get(step.id); }
      return { path, totalCost: gScore.get(target.id) };
    }

    for (const { node: neighbor, weight } of getNeighbors(curr)) {
      const tentativeG = (gScore.get(curr.id) ?? Infinity) + weight;
      if (tentativeG < (gScore.get(neighbor.id) ?? Infinity)) {
        prev.set(neighbor.id, curr);
        gScore.set(neighbor.id, tentativeG);
        fScore.set(neighbor.id, tentativeG + heuristic(neighbor, target));
        if (!openSet.some(n => n.id === neighbor.id)) openSet.push(neighbor);
      }
    }
  }
  return null; // No path found
}`
    },
    bfs: {
      name: 'Breadth-First Search (BFS)',
      timeComp: 'O(V + E)',
      spaceComp: 'O(V)',
      guarantee: 'Optimal for Unweighted Graphs',
      desc: 'Explores all immediate neighbor nodes at current depth level before moving deeper. Treats all street weights as 1.',
      useCase: 'Nearest available delivery rider radius allocation and unweighted street grid proximity checks.',
      pseudocode: [
        'function BFS(Graph, start, target):',
        '  queue = Queue()',
        '  visited = Set()',
        '  visited.add(start)',
        '  queue.enqueue(start)',
        '',
        '  while queue is not empty:',
        '    curr = queue.dequeue()',
        '    if curr == target: return reconstructPath(prev, target)',
        '',
        '    for each neighbor of curr:',
        '      if neighbor not in visited:',
        '        visited.add(neighbor)',
        '        prev[neighbor] = curr',
        '        queue.enqueue(neighbor)',
        '  return failure'
      ],
      cleanCode: `// Clean, Easy-to-Understand BFS Implementation
function bfs(adjList, start, target) {
  const queue = [start];
  const visited = new Set([start]);
  const prev = {};

  while (queue.length > 0) {
    const curr = queue.shift(); // First-In, First-Out (FIFO)
    if (curr === target) {
      const path = [];
      let step = target;
      while (step) { path.unshift(step); step = prev[step]; }
      return { path, stepsTaken: path.length - 1 };
    }

    for (const neighbor of adjList[curr] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        prev[neighbor] = curr;
        queue.push(neighbor);
      }
    }
  }
  return null; // Target unreachable
}`
    },
    dfs: {
      name: 'Depth-First Search (DFS)',
      timeComp: 'O(V + E)',
      spaceComp: 'O(V)',
      guarantee: 'Not Optimal for Shortest Path',
      desc: 'Traverses as deep as possible along each branch before backtracking. Explores long winding paths first.',
      useCase: 'Maze generation, cycle detection, topological sorting, and dead-end street topology analysis.',
      pseudocode: [
        'function DFS(Graph, start, target):',
        '  stack = Stack()',
        '  visited = Set()',
        '  stack.push(start)',
        '',
        '  while stack is not empty:',
        '    curr = stack.pop()',
        '    if curr in visited: continue',
        '    visited.add(curr)',
        '    if curr == target: return reconstructPath(prev, target)',
        '',
        '    for each neighbor of curr in reverse:',
        '      if neighbor not in visited:',
        '        prev[neighbor] = curr',
        '        stack.push(neighbor)',
        '  return failure'
      ],
      cleanCode: `// Clean, Easy-to-Understand DFS Implementation
function dfs(adjList, start, target) {
  const stack = [start]; // Last-In, First-Out (LIFO)
  const visited = new Set();
  const prev = {};

  while (stack.length > 0) {
    const curr = stack.pop();
    if (visited.has(curr)) continue;
    visited.add(curr);

    if (curr === target) {
      const path = [];
      let step = target;
      while (step) { path.unshift(step); step = prev[step]; }
      return { path, visitedNodesCount: visited.size };
    }

    for (const neighbor of (adjList[curr] || []).slice().reverse()) {
      if (!visited.has(neighbor)) {
        prev[neighbor] = curr;
        stack.push(neighbor);
      }
    }
  }
  return null;
}`
    },
    bellmanFord: {
      name: 'Bellman-Ford Algorithm',
      timeComp: 'O(V · E)',
      spaceComp: 'O(V)',
      guarantee: 'Optimal & Detects Negative Cycles',
      desc: 'Relaxes all graph edges |V| - 1 times. Robustly accommodates negative weight values and promotional discount loops.',
      useCase: 'Multi-hub logistics pricing optimization with dynamic toll discounts and promotional delivery credits.',
      pseudocode: [
        'function BellmanFord(Vertices, Edges, source):',
        '  dist[source] = 0',
        '  for each v in Vertices \\ {source}: dist[v] = INFINITY',
        '',
        '  // Step 1: Relax edges |V| - 1 times',
        '  for i = 1 to |Vertices| - 1:',
        '    for each edge (u, v, weight) in Edges:',
        '      if dist[u] + weight < dist[v]:',
        '        dist[v] = dist[u] + weight',
        '        prev[v] = u',
        '',
        '  // Step 2: Negative cycle check',
        '  for each edge (u, v, weight) in Edges:',
        '    if dist[u] + weight < dist[v]:',
        '      throw Error("Negative weight cycle detected!")',
        '  return { dist, prev }'
      ],
      cleanCode: `// Clean, Easy-to-Understand Bellman-Ford Implementation
function bellmanFord(vertices, edges, source) {
  const dist = {};
  const prev = {};

  // 1. Initialize distances
  vertices.forEach(v => { dist[v] = Infinity; prev[v] = null; });
  dist[source] = 0;

  // 2. Relax all edges |V| - 1 times
  const V = vertices.length;
  for (let i = 0; i < V - 1; i++) {
    let updated = false;
    for (const { from: u, to: v, weight } of edges) {
      if (dist[u] !== Infinity && dist[u] + weight < dist[v]) {
        dist[v] = dist[u] + weight;
        prev[v] = u;
        updated = true;
      }
    }
    if (!updated) break; // Early termination optimization
  }

  // 3. Check for negative weight cycle
  for (const { from: u, to: v, weight } of edges) {
    if (dist[u] !== Infinity && dist[u] + weight < dist[v]) {
      return { hasNegativeCycle: true };
    }
  }

  return { dist, prev, hasNegativeCycle: false };
}`
    },
    tsp: {
      name: 'Held-Karp Dynamic Programming (TSP)',
      timeComp: 'O(2ⁿ · n²)',
      spaceComp: 'O(2ⁿ · n)',
      guarantee: 'Exact Optimal Multi-Stop Tour',
      desc: 'Dynamic programming with bitmask states to compute the absolute minimum distance tour through all order stops.',
      useCase: 'Batch order dispatch routing multiple food orders from various restaurants to distinct customer locations.',
      pseudocode: [
        'function HeldKarpTSP(distanceMatrix, n):',
        '  memo = Map()',
        '',
        '  function dp(mask, pos):',
        '    if mask == (1 << n) - 1: return dist[pos][0] // Return to depot',
        '    if memo.has(mask, pos): return memo.get(mask, pos)',
        '',
        '    minCost = INFINITY',
        '    for next = 0 to n - 1:',
        '      if (mask & (1 << next)) == 0: // unvisited stop',
        '        cost = dist[pos][next] + dp(mask | (1 << next), next)',
        '        minCost = min(minCost, cost)',
        '',
        '    memo.set(mask, pos, minCost)',
        '    return minCost',
        '',
        '  return dp(1, 0) // Start at stop 0 with mask 00...001'
      ],
      cleanCode: `// Clean, Easy-to-Understand Held-Karp Bitmask DP (TSP)
function solveTSPHeldKarp(distMatrix) {
  const n = distMatrix.length;
  const memo = new Map();

  function dp(mask, pos) {
    // Base Case: All stops visited, return back to depot (stop 0)
    if (mask === (1 << n) - 1) return distMatrix[pos][0];

    const key = \`\${mask}-\${pos}\`;
    if (memo.has(key)) return memo.get(key);

    let minCost = Infinity;
    for (let next = 0; next < n; next++) {
      // If bit at 'next' is 0, node has not been visited yet
      if ((mask & (1 << next)) === 0) {
        const cost = distMatrix[pos][next] + dp(mask | (1 << next), next);
        if (cost < minCost) minCost = cost;
      }
    }

    memo.set(key, minCost);
    return minCost;
  }

  return dp(1, 0); // Start at stop 0 with mask 1 (000...001)
}`
    }
  };

  const currentInfo = infoMap[algorithm] || infoMap.dijkstra;

  const handleCopy = () => {
    const textToCopy = activeTab === 'pseudocode' 
      ? currentInfo.pseudocode.join('\n') 
      : currentInfo.cleanCode;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="ui-panel p-4 rounded-xl flex flex-col gap-3 transition-colors">
      <div className="flex justify-between items-center pb-2.5 border-b border-slate-200 dark:border-dark-800">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-brand-primary" />
          <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Algorithm Specification
          </h3>
        </div>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-brand-primary/10 text-brand-primary dark:text-brand-primaryLight border border-brand-primary/20 font-semibold">
          {currentInfo.name}
        </span>
      </div>

      <div className="space-y-3 text-xs">
        <div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[12px]">
            {currentInfo.desc}
          </p>
        </div>

        {/* Complexity Cards */}
        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200 dark:border-dark-800">
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-dark-800">
            <span className="text-[10px] text-slate-500 uppercase font-semibold block">Time Complexity</span>
            <strong className="text-slate-900 dark:text-white font-mono text-xs block mt-0.5">{currentInfo.timeComp}</strong>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-dark-800">
            <span className="text-[10px] text-slate-500 uppercase font-semibold block">Space Complexity</span>
            <strong className="text-slate-900 dark:text-white font-mono text-xs block mt-0.5">{currentInfo.spaceComp}</strong>
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-dark-900 border border-slate-200 dark:border-dark-800">
          <span className="text-[10px] text-slate-500 uppercase font-semibold block mb-0.5">Application Context</span>
          <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
            {currentInfo.useCase}
          </p>
        </div>

        {/* Code & Pseudocode Drawer */}
        <div className="pt-2 border-t border-slate-200 dark:border-dark-800">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1.5 text-xs font-semibold text-brand-primary hover:text-brand-primaryHover cursor-pointer"
            >
              <Code className="w-3.5 h-3.5" />
              <span>{isExpanded ? 'Hide Implementation' : 'View Implementation & Code'}</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {isExpanded && (
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-dark-850 p-0.5 rounded-lg border border-slate-200 dark:border-dark-750 text-[11px]">
                <button
                  onClick={() => setActiveTab('pseudocode')}
                  className={`px-2 py-0.5 rounded-md font-medium transition-colors ${
                    activeTab === 'pseudocode'
                      ? 'bg-white dark:bg-dark-900 text-slate-900 dark:text-white shadow-subtle'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Pseudocode
                </button>
                <button
                  onClick={() => setActiveTab('code')}
                  className={`px-2 py-0.5 rounded-md font-medium transition-colors ${
                    activeTab === 'code'
                      ? 'bg-white dark:bg-dark-900 text-slate-900 dark:text-white shadow-subtle'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  TypeScript
                </button>
              </div>
            )}
          </div>

          {isExpanded && (
            <div className="relative bg-slate-900 dark:bg-black text-slate-200 rounded-lg p-3.5 font-mono text-[11px] border border-slate-800 max-h-56 overflow-y-auto overflow-x-auto shadow-inner">
              <button
                onClick={handleCopy}
                title="Copy to clipboard"
                className="absolute top-2.5 right-2.5 px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-slate-300 transition-colors flex items-center gap-1 text-[10px] cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-brand-emerald" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              {activeTab === 'pseudocode' ? (
                <div className="space-y-0.5">
                  <div className="text-brand-amber font-semibold mb-2 pb-1 border-b border-white/10 text-xs">
                    {currentInfo.name} — Pseudocode Specification
                  </div>
                  {currentInfo.pseudocode.map((line, idx) => (
                    <div key={idx} className="leading-relaxed whitespace-pre text-slate-300">
                      {line}
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <div className="text-brand-primaryLight font-semibold mb-2 pb-1 border-b border-white/10 text-xs">
                    {currentInfo.name} — TypeScript Reference
                  </div>
                  <pre className="whitespace-pre text-[10.5px] leading-relaxed text-slate-300">
                    {currentInfo.cleanCode}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
