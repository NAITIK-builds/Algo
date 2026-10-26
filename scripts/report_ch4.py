# Chapter 4 content definitions for AlgoLenz Project Report

CH4_TITLE = "CHAPTER-IV: DATA ARCHITECTURE, DETAILED ALGORITHMS & SCREEN SNAPSHOTS"

CH4_SEC1 = {
    "title": "4.1 Data Architecture & Schema Design",
    "text": [
        "Because AlgoLenz operates as an in-memory interactive visualization engine, its database and schema layer is implemented through highly optimized TypeScript structural interfaces, state stores, and in-memory adjacency matrices.",
        "The primary data entities governing the system include:"
    ]
}

SCHEMAS = [
    {
        "name": "4.1.1 GridNode Interface & State Schema",
        "code": """export type NodeType = 
  | 'START'       // Rider origin
  | 'TARGET'      // Customer destination
  | 'WAYPOINT'    // Multi-stop pickup waypoint
  | 'WALL'        // Impassable obstacle barrier
  | 'TRAFFIC_1'   // Light traffic (+2 cost)
  | 'TRAFFIC_2'   // Moderate traffic (+5 cost)
  | 'TRAFFIC_3'   // Severe gridlock (+10 cost)
  | 'EMPTY';      // Default traversal terrain

export interface GridNode {
  row: number;              // Row index in 2D coordinate matrix
  col: number;              // Column index in 2D coordinate matrix
  type: NodeType;           // Functional terrain or endpoint category
  weight: number;           // Edge relaxation cost (1 for default, 2, 5, 10 for traffic)
  isVisited: boolean;       // Traversal closed set indicator
  isFrontier: boolean;      // Active open set exploration queue flag
  isPath: boolean;          // Shortest path trajectory membership
  distance: number;         // Exact g(n) cost from start node
  heuristic: number;        // Estimated h(n) cost to destination
  totalDistance: number;    // Evaluated f(n) = g(n) + h(n) composite priority
  previousNode: GridNode | null; // Predecessor backpointer for path reconstruction
}"""
    },
    {
        "name": "4.1.2 AlgorithmStep & SortingStep Event Schemas",
        "code": """export interface AlgorithmStep {
  type: 'visit' | 'frontier' | 'path' | 'finish';
  node?: { row: number; col: number };
  frontierNodes?: { row: number; col: number }[];
  path?: { row: number; col: number }[];
  visitedCount: number;     // Cumulative nodes explored up to this frame
  pathLength: number;       // Number of hops in computed shortest path
  totalCost: number;        // Accumulated weight of shortest path
}

export interface SortingStep {
  type: 'compare' | 'swap' | 'sorted' | 'finish';
  indices: number[];        // Array indices actively involved in operation
  values?: number[];        // Snapshot of values being exchanged
  comparisons: number;      // Total comparisons performed
  swaps: number;            // Total element swaps performed
  lineCode?: string;        // Active pseudocode statement string
}"""
    },
    {
        "name": "4.1.3 Geospatial CityHubNode Model",
        "code": """export interface CityHubNode {
  id: string;               // Unique landmark identifier (e.g., 'CSJMU_MAIN')
  name: string;             // Human-readable landmark title
  lat: number;              // Geographical latitude in decimal degrees
  lng: number;              // Geographical longitude in decimal degrees
  type: 'hub' | 'darkstore' | 'customer' | 'restaurant';
}"""
    }
]

CH4_SEC2 = {
    "title": "4.2 Algorithm Formulations & Detailed Pseudocode",
    "text": [
        "AlgoLenz implements mathematically rigorous formulations of foundational computer science algorithms. Each algorithm is detailed below with its theoretical mechanics, recurrence relations, and formal pseudocode."
    ]
}

ALGORITHMS_DETAILED = [
    {
        "name": "4.2.1 Dijkstra’s Shortest Path Algorithm",
        "theory": "Formulated by Edsger W. Dijkstra in 1959, this greedy algorithm solves the single-source shortest path problem for graphs with non-negative edge weights. It maintains a set of visited vertices and repeatedly selects the vertex u from the unvisited set with minimum tentative distance dist[u], relaxing all its outgoing edges (u, v). When implemented with a binary Min-Heap priority queue, its time complexity is O((|V| + |E|) log |V|).",
        "pseudocode": """algorithm Dijkstra(Graph G, Node startNode, Node targetNode):
    for each vertex v in G.vertices:
        dist[v] ← ∞
        prev[v] ← null
        visited[v] ← false
    
    dist[startNode] ← 0
    PQ ← new PriorityQueue()
    PQ.insert(startNode, priority: 0)

    while PQ is not empty:
        current ← PQ.extractMin()
        if visited[current]: continue
        visited[current] ← true
        emitStep(type: 'visit', node: current)

        if current = targetNode:
            return reconstructPath(prev, targetNode)

        for each neighbor v of current:
            if not visited[v] and not v.isWall:
                newDist ← dist[current] + v.weight
                if newDist < dist[v]:
                    dist[v] ← newDist
                    prev[v] ← current
                    PQ.insert(v, priority: newDist)
                    emitStep(type: 'frontier', node: v)

    return failure // Path blocked by obstacles"""
    },
    {
        "name": "4.2.2 A* Heuristic Search Algorithm",
        "theory": "First described by Peter Hart, Nils Nilsson, and Bertram Raphael in 1968, A* search extends Dijkstra's algorithm by incorporating a heuristic estimation function h(n). At each node n, the total evaluation function is defined as f(n) = g(n) + h(n), where g(n) is the exact path cost from start to n, and h(n) is an admissible heuristic estimating the cheapest path from n to the goal. An admissible heuristic never overestimates the true cost (h(n) <= h*(n)).",
        "pseudocode": """algorithm A_Star(Graph G, Node startNode, Node targetNode, Heuristic h):
    gScore[startNode] ← 0
    fScore[startNode] ← h(startNode, targetNode)
    openSet ← new PriorityQueue()
    openSet.insert(startNode, priority: fScore[startNode])
    cameFrom ← map()

    while openSet is not empty:
        current ← openSet.extractMin()
        if current = targetNode:
            return reconstructPath(cameFrom, targetNode)
        
        emitStep(type: 'visit', node: current)

        for each neighbor v of current:
            if v.isWall: continue
            tentative_g ← gScore[current] + v.weight
            if tentative_g < gScore[v]:
                cameFrom[v] ← current
                gScore[v] ← tentative_g
                fScore[v] ← tentative_g + h(v, targetNode)
                if not openSet.contains(v):
                    openSet.insert(v, priority: fScore[v])
                    emitStep(type: 'frontier', node: v)

    return failure"""
    },
    {
        "name": "4.2.3 Bellman-Ford Algorithm",
        "theory": "Developed by Richard Bellman and Lester Ford Jr., this dynamic programming algorithm computes shortest paths from a single source vertex to all other vertices on weighted directed graphs. Unlike Dijkstra's algorithm, Bellman-Ford correctly handles negative edge weights and detects negative-weight cycles by executing |V| - 1 iterations of edge relaxations across all edges E.",
        "pseudocode": """algorithm BellmanFord(Graph G, Node startNode, Node targetNode):
    dist[startNode] ← 0
    prev[startNode] ← null
    for each v in G.vertices \ {startNode}:
        dist[v] ← ∞
        prev[v] ← null

    for i from 1 to |G.vertices| - 1:
        for each directed edge (u, v) in G.edges:
            if dist[u] + weight(u, v) < dist[v]:
                dist[v] ← dist[u] + weight(u, v)
                prev[v] ← u
                emitStep(type: 'relax', edge: (u, v))

    // Negative cycle detection check
    for each directed edge (u, v) in G.edges:
        if dist[u] + weight(u, v) < dist[v]:
            emitStep(type: 'negative_cycle_detected')
            return error("Graph contains negative weight cycle")

    return reconstructPath(prev, targetNode)"""
    },
    {
        "name": "4.2.4 Traveling Salesperson Problem (TSP) with 2-Opt Heuristic",
        "theory": "The Traveling Salesperson Problem asks: Given a list of cities and the distances between each pair, what is the shortest possible route that visits each city exactly once and returns to the origin? TSP is proven NP-Hard. AlgoLenz implements a two-stage heuristic: (1) Nearest Neighbor construction O(n^2), followed by (2) 2-Opt local search which systematically swaps edge pairs (i, i+1) and (k, k+1) whenever distance(i, k) + distance(i+1, k+1) < distance(i, i+1) + distance(k, k+1).",
        "pseudocode": """algorithm TSP_TwoOpt(List<Node> waypoints):
    tour ← NearestNeighborTour(waypoints)
    improvement ← true

    while improvement:
        improvement ← false
        for i from 1 to |tour| - 2:
            for k from i + 1 to |tour| - 1:
                delta ← distance(tour[i-1], tour[k]) + distance(tour[i], tour[k+1])
                      - distance(tour[i-1], tour[i]) - distance(tour[k], tour[k+1])
                if delta < 0:
                    reverseSegment(tour, i, k)
                    improvement ← true
                    emitStep(type: 'tour_update', tour: tour)
    return tour"""
    },
    {
        "name": "4.2.5 Quick Sort with Lomuto Partition Scheme",
        "theory": "Invented by Tony Hoare in 1959, Quick Sort is an efficient divide-and-conquer sorting algorithm. AlgoLenz implements the Lomuto partition scheme where the last element is chosen as the pivot. The array is partitioned such that all elements less than the pivot are shifted to its left, and all elements greater are shifted to its right, recursing on left and right sub-arrays.",
        "pseudocode": """algorithm QuickSort(Array A, low, high):
    if low < high:
        p ← LomutoPartition(A, low, high)
        QuickSort(A, low, p - 1)
        QuickSort(A, p + 1, high)

algorithm LomutoPartition(Array A, low, high):
    pivot ← A[high]
    i ← low - 1
    for j from low to high - 1:
        emitStep(type: 'compare', indices: [j, high])
        if A[j] < pivot:
            i ← i + 1
            swap(A[i], A[j])
            emitStep(type: 'swap', indices: [i, j])
    swap(A[i + 1], A[high])
    emitStep(type: 'swap', indices: [i + 1, high])
    return i + 1"""
    }
]

CH4_SEC3 = {
    "title": "4.3 Screen Snapshots & Telemetry Walkthrough",
    "text": [
        "This section documents the visual layout, user experience design, and interactive controls of the five primary operational modes comprising AlgoLenz.",
        "1. Global Application Header & Navigation Bar: Located at the top of the viewport, the navigation bar provides seamless mode switching between 2D Grid Pathfinding, Geographic City Map, Multi-Stop TSP Delivery, Audio Sorting Visualizer, and Comparative Arena. A master theme selector toggles between dark-mode slate aesthetics and high-contrast educational themes.",
        "2. 2D Interactive Grid Visualizer View: Features a prominent canvas matrix. The left toolbar provides intuitive tool brushes: Start Marker (🛵 Rider), Target Marker (📦 Customer), Wall Obstacle brush, Light Traffic (+2), Moderate Traffic (+5), and Severe Gridlock (+10). Procedural maze generation buttons immediately instantiate Recursive Division labyrinths or random obstacle scatter.",
        "3. Live Stats & Telemetry Panel: A telemetry HUD located alongside the canvas displays live quantitative metrics updated in real time: Total Explored Nodes, Shortest Path Length (hops), Cumulative Path Cost (including terrain penalties), and Millisecond Execution Duration.",
        "4. Synchronized Pseudocode Inspector: Displays the formal algorithmic pseudocode line-by-line in a high-contrast monospaced card. The active executing line is decorated with an active glowing chevron badge, establishing clear visual linkage between abstract instructions and canvas animations.",
        "5. Geographic City Map View: An interactive Leaflet.js cartography canvas rendering Kanpur urban landmarks (CSJM University, Bhauti, Rawatpur, Zsquare, Civil Lines). Users click landmarks to plot real-world shortest paths computed via Haversine distance, accompanied by animated vehicle courier routing.",
        "6. Audio-Visual Sorting Arena: An array bar chart rendering numerical elements with real-time Web Audio pitch synthesis. Elements pulsate in coral during comparison and amber during swap exchanges, culminating in an ascending musical cascade upon completion.",
        "7. Dual Comparison Arena: A split-screen layout racing two selected algorithms simultaneously on identical graph matrices, rendering side-by-side performance comparison bar charts."
    ]
}

print("Chapter 4 definitions ready.")
