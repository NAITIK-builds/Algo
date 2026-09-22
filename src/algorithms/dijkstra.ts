import { GridNode, AlgorithmStep } from '../types/routing';

export function runDijkstra(grid: GridNode[][], start: { row: number; col: number }, target: { row: number; col: number }): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const rows = grid.length;
  const cols = grid[0].length;
  
  // Clone grid nodes for pure calculation
  const nodes: GridNode[][] = grid.map(r => r.map(n => ({
    ...n,
    distance: Infinity,
    isVisited: false,
    isFrontier: false,
    isPath: false,
    previousNode: null
  })));

  const startNode = nodes[start.row][start.col];
  startNode.distance = 0;
  
  const unvisited: GridNode[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      unvisited.push(nodes[r][c]);
    }
  }

  let visitedCount = 0;

  while (unvisited.length > 0) {
    // Sort unvisited nodes by distance
    unvisited.sort((a, b) => a.distance - b.distance);
    const current = unvisited.shift()!;

    if (current.distance === Infinity) break; // Trapped or unreachable
    if (current.type === 'WALL') continue;

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
      // Reconstruct shortest path
      const path: { row: number; col: number }[] = [];
      let curr: GridNode | null = current;
      let totalCost = current.distance;
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

    // Neighbors (Up, Right, Down, Left)
    const neighbors = getNeighbors(nodes, current);
    const frontier: { row: number; col: number }[] = [];

    for (const neighbor of neighbors) {
      if (neighbor.isVisited || neighbor.type === 'WALL') continue;
      const alt = current.distance + neighbor.weight;
      if (alt < neighbor.distance) {
        neighbor.distance = alt;
        neighbor.previousNode = current;
        neighbor.isFrontier = true;
        frontier.push({ row: neighbor.row, col: neighbor.col });
      }
    }

    if (frontier.length > 0) {
      steps.push({
        type: 'frontier',
        frontierNodes: frontier,
        visitedCount,
        pathLength: 0,
        totalCost: current.distance
      });
    }
  }

  return steps;
}

function getNeighbors(grid: GridNode[][], node: GridNode): GridNode[] {
  const neighbors: GridNode[] = [];
  const { row, col } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors;
}
