import { GridNode, AlgorithmStep } from '../types/routing';

export function runBellmanFord(grid: GridNode[][], start: { row: number; col: number }, target: { row: number; col: number }): AlgorithmStep[] {
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

  // Relax edges V - 1 times
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
