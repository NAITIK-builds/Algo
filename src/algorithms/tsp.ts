export interface TSPStop {
  id: string;
  name: string;
  x: number;
  y: number;
  type?: 'depot' | 'restaurant' | 'customer';
  packageCount?: number;
}

export interface TSPResult {
  path: number[];
  totalDistance: number;
  stopsSequence: TSPStop[];
  computationTimeMs: number;
  method: 'HELD_KARP_DP' | 'NEAREST_NEIGHBOR' | '2_OPT_LOCAL_SEARCH';
  crossovers?: number;
}

// Distance matrix calculator (Euclidean distance)
export function getDistanceMatrix(stops: TSPStop[]): number[][] {
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

// 2D Line Segment Crossover / Intersection Counter
function ccw(A: TSPStop, B: TSPStop, C: TSPStop): boolean {
  return (C.y - A.y) * (B.x - A.x) > (B.y - A.y) * (C.x - A.x);
}

function lineIntersects(A: TSPStop, B: TSPStop, C: TSPStop, D: TSPStop): boolean {
  if (A.id === C.id || A.id === D.id || B.id === C.id || B.id === D.id) return false;
  return (ccw(A, C, D) !== ccw(B, C, D)) && (ccw(A, B, C) !== ccw(A, B, D));
}

export function countTourCrossovers(stops: TSPStop[], path: number[]): number {
  let count = 0;
  const edges: [TSPStop, TSPStop][] = [];
  for (let i = 0; i < path.length - 1; i++) {
    const s1 = stops[path[i]];
    const s2 = stops[path[i + 1]];
    if (s1 && s2) edges.push([s1, s2]);
  }

  for (let i = 0; i < edges.length; i++) {
    for (let j = i + 1; j < edges.length; j++) {
      if (lineIntersects(edges[i][0], edges[i][1], edges[j][0], edges[j][1])) {
        count++;
      }
    }
  }
  return count;
}

// 1. Nearest Neighbor Heuristic O(n²)
export function solveTSPNearestNeighbor(stops: TSPStop[]): TSPResult {
  const startTime = performance.now();
  const n = stops.length;
  if (n <= 1) {
    return { 
      path: [0], 
      totalDistance: 0, 
      stopsSequence: stops, 
      computationTimeMs: 0, 
      method: 'NEAREST_NEIGHBOR',
      crossovers: 0 
    };
  }

  const dist = getDistanceMatrix(stops);
  const visited = new Array(n).fill(false);
  const path: number[] = [0]; // Start at depot (0)
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

  // Return to start
  totalDist += dist[curr][0];
  path.push(0);

  const stopsSeq = path.map(idx => stops[idx]);
  const computationTimeMs = parseFloat((performance.now() - startTime).toFixed(2));
  const crossovers = countTourCrossovers(stops, path);

  return {
    path,
    totalDistance: parseFloat(totalDist.toFixed(2)),
    stopsSequence: stopsSeq,
    computationTimeMs,
    method: 'NEAREST_NEIGHBOR',
    crossovers
  };
}

// 2. 2-Opt Local Search Heuristic (Industry Standard Untangling)
export function solveTSP2Opt(stops: TSPStop[]): TSPResult {
  const startTime = performance.now();
  const n = stops.length;
  if (n <= 2) {
    return solveTSPNearestNeighbor(stops);
  }

  const dist = getDistanceMatrix(stops);
  const initial = solveTSPNearestNeighbor(stops);
  let bestTour = [...initial.path];

  function getTourDistance(tour: number[]): number {
    let d = 0;
    for (let i = 0; i < tour.length - 1; i++) {
      d += dist[tour[i]][tour[i + 1]];
    }
    return d;
  }

  let bestDist = getTourDistance(bestTour);
  let improved = true;
  let iterations = 0;
  const maxIterations = 400;

  while (improved && iterations < maxIterations) {
    improved = false;
    iterations++;

    for (let i = 1; i < n - 1; i++) {
      for (let k = i + 1; k < n; k++) {
        const delta = 
          (dist[bestTour[i - 1]][bestTour[k]] + dist[bestTour[i]][bestTour[k + 1]]) -
          (dist[bestTour[i - 1]][bestTour[i]] + dist[bestTour[k]][bestTour[k + 1]]);

        if (delta < -0.01) {
          bestTour = [
            ...bestTour.slice(0, i),
            ...bestTour.slice(i, k + 1).reverse(),
            ...bestTour.slice(k + 1)
          ];
          bestDist = getTourDistance(bestTour);
          improved = true;
          break;
        }
      }
      if (improved) break;
    }
  }

  const computationTimeMs = parseFloat((performance.now() - startTime).toFixed(2));
  const crossovers = countTourCrossovers(stops, bestTour);

  return {
    path: bestTour,
    totalDistance: parseFloat(bestDist.toFixed(2)),
    stopsSequence: bestTour.map(idx => stops[idx]),
    computationTimeMs,
    method: '2_OPT_LOCAL_SEARCH',
    crossovers
  };
}

// 3. Exact Held-Karp Dynamic Programming (Bitmask DP)
export function solveTSPHeldKarp(stops: TSPStop[]): TSPResult {
  const startTime = performance.now();
  const n = stops.length;
  
  // Use 2-Opt if n > 12 to prevent exponential browser lockup
  if (n > 12) {
    return solveTSP2Opt(stops);
  }

  const dist = getDistanceMatrix(stops);
  const memo: Map<string, { cost: number; parent: number }> = new Map();

  function dp(mask: number, pos: number): number {
    if (mask === (1 << n) - 1) {
      return dist[pos][0]; // return to depot
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

  // Reconstruct path
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
  path.push(0); // return to depot

  const stopsSeq = path.map(idx => stops[idx]);
  const computationTimeMs = parseFloat((performance.now() - startTime).toFixed(2));
  const crossovers = countTourCrossovers(stops, path);

  return {
    path,
    totalDistance: parseFloat(totalDist.toFixed(2)),
    stopsSequence: stopsSeq,
    computationTimeMs,
    method: 'HELD_KARP_DP',
    crossovers
  };
}
