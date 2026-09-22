import { GridNode, NodeType, MazeType } from '../types/routing';

export const DEFAULT_ROWS = 20;
export const DEFAULT_COLS = 42;

export function createInitialGrid(rows: number = DEFAULT_ROWS, cols: number = DEFAULT_COLS): GridNode[][] {
  const grid: GridNode[][] = [];
  for (let r = 0; r < rows; r++) {
    const currentRow: GridNode[] = [];
    for (let c = 0; c < cols; c++) {
      let type: NodeType = 'EMPTY';
      let weight = 1;

      // Default start rider (left center) & target customer (right center)
      if (r === Math.floor(rows / 2) && c === 4) {
        type = 'START';
      } else if (r === Math.floor(rows / 2) && c === cols - 5) {
        type = 'TARGET';
      }

      currentRow.push({
        row: r,
        col: c,
        type,
        weight,
        isVisited: false,
        isFrontier: false,
        isPath: false,
        distance: Infinity,
        heuristic: 0,
        totalDistance: Infinity,
        previousNode: null
      });
    }
    grid.push(currentRow);
  }
  return grid;
}

export function generatePresetScenario(grid: GridNode[][], presetName: string): GridNode[][] {
  const rows = grid.length;
  const cols = grid[0].length;
  
  const newGrid = grid.map(r => r.map(n => ({
    ...n,
    type: (n.type === 'START' || n.type === 'TARGET') ? n.type : 'EMPTY' as NodeType,
    weight: 1,
    isVisited: false,
    isFrontier: false,
    isPath: false,
    distance: Infinity,
    heuristic: 0,
    totalDistance: Infinity,
    previousNode: null
  })));

  if (presetName === 'rush_hour') {
    // Dense multi-tier traffic grid in central delivery hub
    for (let r = 2; r < rows - 2; r++) {
      for (let c = 8; c < cols - 8; c++) {
        if (newGrid[r][c].type === 'EMPTY') {
          const rand = Math.random();
          if (rand > 0.7) {
            newGrid[r][c].type = 'TRAFFIC_3';
            newGrid[r][c].weight = 10;
          } else if (rand > 0.45) {
            newGrid[r][c].type = 'TRAFFIC_2';
            newGrid[r][c].weight = 5;
          } else if (rand > 0.25) {
            newGrid[r][c].type = 'TRAFFIC_1';
            newGrid[r][c].weight = 2;
          }
        }
      }
    }
  } else if (presetName === 'roadblock') {
    // Central barrier wall forcing pathfinder to seek upper or lower detour
    const midCol = Math.floor(cols / 2);
    for (let r = 2; r < rows - 3; r++) {
      if (newGrid[r][midCol].type === 'EMPTY') {
        newGrid[r][midCol].type = 'WALL';
      }
    }
    // Add side barriers
    for (let r = 6; r < rows - 6; r++) {
      if (newGrid[r][midCol - 6].type === 'EMPTY') newGrid[r][midCol - 6].type = 'WALL';
      if (newGrid[r][midCol + 6].type === 'EMPTY') newGrid[r][midCol + 6].type = 'WALL';
    }
  } else if (presetName === 'rain_surge') {
    // Scattered flooding (+5 traffic) and intermediate food pickups
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (newGrid[r][c].type === 'EMPTY' && Math.random() < 0.2) {
          newGrid[r][c].type = 'TRAFFIC_2';
          newGrid[r][c].weight = 5;
        }
      }
    }
    if (newGrid[4][14].type === 'EMPTY') newGrid[4][14].type = 'WAYPOINT';
    if (newGrid[14][28].type === 'EMPTY') newGrid[14][28].type = 'WAYPOINT';
  } else if (presetName === 'city_grid') {
    // Regular urban city blocks with intersections
    for (let r = 2; r < rows - 2; r += 3) {
      for (let c = 3; c < cols - 3; c += 4) {
        for (let dr = 0; dr < 2; dr++) {
          for (let dc = 0; dc < 3; dc++) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr < rows - 1 && nc < cols - 1 && newGrid[nr][nc].type === 'EMPTY') {
              newGrid[nr][nc].type = 'WALL';
            }
          }
        }
      }
    }
  } else if (presetName === 'spiral') {
    // Challenging spiral corridor
    let top = 1, bottom = rows - 2, left = 2, right = cols - 3;
    while (top <= bottom && left <= right) {
      for (let c = left; c <= right; c++) if (newGrid[top][c].type === 'EMPTY' && (c % 2 === 0)) newGrid[top][c].type = 'WALL';
      top += 2;
      for (let r = top; r <= bottom; r++) if (newGrid[r][right].type === 'EMPTY' && (r % 2 === 0)) newGrid[r][right].type = 'WALL';
      right -= 2;
      for (let c = right; c >= left; c--) if (newGrid[bottom][c].type === 'EMPTY' && (c % 2 === 0)) newGrid[bottom][c].type = 'WALL';
      bottom -= 2;
      for (let r = bottom; r >= top; r--) if (newGrid[r][left].type === 'EMPTY' && (r % 2 === 0)) newGrid[r][left].type = 'WALL';
      left += 2;
    }
  }

  return newGrid;
}
