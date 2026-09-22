import { GridNode, AlgorithmStep } from '../types/routing';

export function runAStar(grid: GridNode[][], start: { row: number; col: number }, target: { row: number; col: number }): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const rows = grid.length;
  const cols = grid[0].length;

  const nodes: GridNode[][] = grid.map(r => r.map(n => ({
    ...n,
    distance: Infinity,
    heuristic: Math.abs(n.row - target.row) + Math.abs(n.col - target.col),
    totalDistance: Infinity,
    isVisited: false,
    isFrontier: false,
    isPath: false,
    previousNode: null
  })));

  const startNode = nodes[start.row][start.col];
  startNode.distance = 0;
  startNode.totalDistance = startNode.heuristic;

  const openSet: GridNode[] = [startNode];
  let visitedCount = 0;

  while (openSet.length > 0) {
    openSet.sort((a, b) => a.totalDistance - b.totalDistance);
    const current = openSet.shift()!;

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
    const frontier: { row: number; col: number }[] = [];

    for (const neighbor of neighbors) {
      if (neighbor.isVisited || neighbor.type === 'WALL') continue;
      const tentativeG = current.distance + neighbor.weight;

      if (tentativeG < neighbor.distance) {
        neighbor.previousNode = current;
        neighbor.distance = tentativeG;
        neighbor.totalDistance = tentativeG + neighbor.heuristic;

        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
          neighbor.isFrontier = true;
          frontier.push({ row: neighbor.row, col: neighbor.col });
        }
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
