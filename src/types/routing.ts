export type NodeType = 
  | 'START'       // Rider 🛵
  | 'TARGET'      // Customer 📦
  | 'WAYPOINT'    // Restaurant / Cloud Kitchen 🍔
  | 'WALL'        // Roadblock / Impassable 🚧
  | 'TRAFFIC_1'   // Light Traffic (+2) 🛵
  | 'TRAFFIC_2'   // Moderate Traffic (+5) 🚗
  | 'TRAFFIC_3'   // Severe Gridlock (+10) 🚛
  | 'EMPTY';

export type NodeState = 'unvisited' | 'frontier' | 'visited' | 'path';

export interface GridNode {
  row: number;
  col: number;
  type: NodeType;
  weight: number;
  isVisited: boolean;
  isFrontier: boolean;
  isPath: boolean;
  distance: number;
  heuristic: number;
  totalDistance: number;
  previousNode: GridNode | null;
}

export type AlgorithmType = 'dijkstra' | 'aStar' | 'bfs' | 'dfs' | 'bellmanFord' | 'tsp';
export type SortingAlgorithmType = 'quicksort' | 'mergesort' | 'bubblesort' | 'insertionsort' | 'selectionsort' | 'heapsort';

export type ModeType = 'grid' | 'comparison' | 'multistop' | 'citymap' | 'sorting';
export type ToolType = 'START' | 'TARGET' | 'WAYPOINT' | 'WALL' | 'TRAFFIC_1' | 'TRAFFIC_2' | 'TRAFFIC_3' | 'ERASER';
export type MazeType = 'random' | 'recursive_division' | 'city_blocks' | 'traffic_corridor' | 'spiral';

export interface AlgorithmStep {
  type: 'visit' | 'frontier' | 'path' | 'finish';
  node?: { row: number; col: number };
  frontierNodes?: { row: number; col: number }[];
  path?: { row: number; col: number }[];
  visitedCount: number;
  pathLength: number;
  totalCost: number;
}

export interface SortingStep {
  type: 'compare' | 'swap' | 'sorted' | 'finish';
  indices: number[];
  values?: number[];
  comparisons: number;
  swaps: number;
  lineCode?: string;
}

export interface CityHubNode {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: 'hub' | 'darkstore' | 'customer' | 'restaurant';
}

export interface CityEdge {
  from: string;
  to: string;
  weight: number;
  traffic: 'low' | 'medium' | 'high';
}

export interface StopOrder {
  id: string;
  name: string;
  row: number;
  col: number;
  type: 'RESTAURANT' | 'CUSTOMER';
  status: 'pending' | 'picked' | 'delivered';
}
