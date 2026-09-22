export interface TSPStop {
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

// Distance matrix calculator (Euclidean distance)
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

// 1. Nearest Neighbor Heuristic
export function solveTSPNearestNeighbor(stops: TSPStop[]): TSPResult {
  const startTime = performance.now();
  const n = stops.length;
  if (n <= 1) {
    return { path: [0], totalDistance: 0, stopsSequence: stops, computationTimeMs: 0, method: 'NEAREST_NEIGHBOR' };
  }

  const dist = getDistanceMatrix(stops);
  const visited = new Array(n).fill(false);
  const path: number[] = [0]; // Start at rider (0)
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

  return {
    path,
    totalDistance: parseFloat(totalDist.toFixed(2)),
    stopsSequence: stopsSeq,
    computationTimeMs,
    method: 'NEAREST_NEIGHBOR'
  };
}

// 2. Exact Held-Karp Dynamic Programming (Bitmask DP)
export function solveTSPHeldKarp(stops: TSPStop[]): TSPResult {
  const startTime = performance.now();
  const n = stops.length;
  
  // Fall back to nearest neighbor if n > 12 to avoid stack overflow
  if (n > 12) {
    return solveTSPNearestNeighbor(stops);
  }

  const dist = getDistanceMatrix(stops);
  const memo: Map<string, { cost: number; parent: number }> = new Map();

  function dp(mask: number, pos: number): number {
    if (mask === (1 << n) - 1) {
      return dist[pos][0]; // return to rider
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
  path.push(0); // return to origin

  const stopsSeq = path.map(idx => stops[idx]);
  const computationTimeMs = parseFloat((performance.now() - startTime).toFixed(2));

  return {
    path,
    totalDistance: parseFloat(totalDist.toFixed(2)),
    stopsSequence: stopsSeq,
    computationTimeMs,
    method: 'HELD_KARP_DP'
  };
}
