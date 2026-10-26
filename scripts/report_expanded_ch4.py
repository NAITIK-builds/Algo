# Expanded Chapter 4 for AlgoLenz 50+ Page Project Report

CH4_TITLE = "CHAPTER-IV: DATA ARCHITECTURE, DETAILED ALGORITHMS & SCREEN SNAPSHOTS"

CH4_SECTIONS = [
    {
        "title": "4.1 Data Architecture & Schema Design",
        "subsections": [
            {
                "subtitle": "4.1.1 In-Memory Graph Data Structures & Memory Optimization",
                "paragraphs": [
                    "Because AlgoLenz operates as a high-frequency client-side Single Page Application, its data layer is maintained entirely in high-speed browser heap memory. Rather than relying on traditional relational database schemas (which introduce unnecessary network latency for transient visualization states), AlgoLenz implements strongly typed TypeScript structural interfaces, planar coordinate matrices, and event queues.",
                    "Memory layout optimization was a primary engineering consideration. In a standard 25x50 grid (1,250 nodes), allocating separate JavaScript object instances per animation frame would quickly generate gigabytes of garbage collection churn. AlgoLenz solves this by maintaining a single persistent 2D matrix array: `GridNode[][]`. During algorithmic execution, nodes are mutated in-place within memory, while visual state transitions are captured as lightweight delta event objects (`AlgorithmStep`)."
                ]
            },
            {
                "subtitle": "4.1.2 GridNode Structural Interface Specification",
                "paragraphs": [
                    "The `GridNode` interface defines the complete physical and algorithmic state of every individual vertex in the canvas matrix:"
                ],
                "code": """export type NodeType = 
  | 'START'       // Courier origin marker 🛵
  | 'TARGET'      // Delivery customer endpoint 📦
  | 'WAYPOINT'    // Multi-stop restaurant pickup 🍔
  | 'WALL'        // Impassable physical barrier 🚧
  | 'TRAFFIC_1'   // Light traffic delay (+2 weight)
  | 'TRAFFIC_2'   // Moderate congestion (+5 weight)
  | 'TRAFFIC_3'   // Severe gridlock (+10 weight)
  | 'EMPTY';      // Standard unimpeded cell

export interface GridNode {
  row: number;              // Row index in 2D Cartesian matrix (0 to Rows-1)
  col: number;              // Column index in 2D Cartesian matrix (0 to Cols-1)
  type: NodeType;           // Current functional terrain or endpoint type
  weight: number;           // Traversal cost (1 for default, 2, 5, 10 for traffic)
  isVisited: boolean;       // Traversal closed-set indicator
  isFrontier: boolean;      // Active open-set exploration queue membership
  isPath: boolean;          // Shortest path trajectory membership
  distance: number;         // Exact g(n) cost from start node
  heuristic: number;        // Estimated h(n) cost to destination
  totalDistance: number;    // Evaluated f(n) = g(n) + h(n) composite priority
  previousNode: GridNode | null; // Predecessor backpointer for path reconstruction
}"""
            },
            {
                "subtitle": "4.1.3 Animation Event Schemas (AlgorithmStep & SortingStep)",
                "paragraphs": [
                    "To enable arbitrary time-travel scrubbing, frame playback, and telemetry charting, algorithms serialize their execution into typed event step arrays:"
                ],
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
                "subtitle": "4.1.4 Geospatial Landmark Graph Model (CityHubNode)",
                "paragraphs": [
                    "For real-world city map routing across municipal road networks, AlgoLenz defines a geo-referenced landmark node schema representing physical urban coordinates:"
                ],
                "code": """export interface CityHubNode {
  id: string;               // Unique landmark identifier (e.g., 'CSJMU_MAIN')
  name: string;             // Human-readable landmark title
  lat: number;              // Geographical latitude in decimal degrees
  lng: number;              // Geographical longitude in decimal degrees
  type: 'hub' | 'darkstore' | 'customer' | 'restaurant';
}"""
            }
        ]
    },
    {
        "title": "4.2 Algorithm Formulations & Detailed Pseudocode",
        "subsections": [
            {
                "subtitle": "4.2.1 Dijkstra’s Shortest Path Algorithm with Min-Heap Priority Queue",
                "paragraphs": [
                    "Formulated by Edsger W. Dijkstra in 1959, this classic greedy algorithm solves the single-source shortest path problem for graphs with non-negative edge weights. It maintains a set of visited vertices and repeatedly selects the vertex u from the unvisited set with minimum tentative distance dist[u], relaxing all its outgoing edges (u, v). When implemented with a binary Min-Heap priority queue, its time complexity is O((|V| + |E|) log |V|).",
                    "Mathematical Edge Relaxation Invariant: For any edge (u, v) with weight w(u, v), if dist[u] + w(u, v) < dist[v], then dist[v] is updated to dist[u] + w(u, v), and parent[v] is assigned to u."
                ],
                "code": """algorithm Dijkstra(Graph G, Node startNode, Node targetNode):
    for each vertex v in G.vertices:
        dist[v] ← ∞
        prev[v] ← null
        visited[v] ← false
    
    dist[startNode] ← 0
    PQ ← new BinaryMinHeap()
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
                    PQ.insertOrDecreaseKey(v, priority: newDist)
                    emitStep(type: 'frontier', node: v)

    return failure // Target unreachable"""
            },
            {
                "subtitle": "4.2.2 A* Heuristic Search with Admissible Distance Metrics",
                "paragraphs": [
                    "First described by Peter Hart, Nils Nilsson, and Bertram Raphael in 1968, A* search extends Dijkstra's algorithm by incorporating a heuristic estimation function h(n). At each node n, the total evaluation function is defined as f(n) = g(n) + h(n), where g(n) is the exact path cost from start to n, and h(n) is an admissible heuristic estimating the cheapest path from n to the goal. An admissible heuristic never overestimates the true cost (h(n) <= h*(n)).",
                    "Supported Distance Metrics in AlgoLenz:",
                    "1. Manhattan Distance (L1 Norm): h(n) = |x1 - x2| + |y1 - y2|. Optimal for 4-directional grid movements.",
                    "2. Euclidean Distance (L2 Norm): h(n) = sqrt((x1 - x2)^2 + (y1 - y2)^2). Represents straight-line distance.",
                    "3. Chebyshev Distance (L-infinity Norm): h(n) = max(|x1 - x2|, |y1 - y2|)."
                ],
                "code": """algorithm A_Star(Graph G, Node startNode, Node targetNode, Heuristic h):
    gScore[startNode] ← 0
    fScore[startNode] ← h(startNode, targetNode)
    openSet ← new BinaryMinHeap()
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
                "subtitle": "4.2.3 Bellman-Ford Algorithm & Negative Cycle Detection",
                "paragraphs": [
                    "Developed by Richard Bellman and Lester Ford Jr., this dynamic programming algorithm computes shortest paths from a single source vertex to all other vertices on weighted directed graphs. Unlike Dijkstra's algorithm, Bellman-Ford correctly handles negative edge weights and detects negative-weight cycles by executing |V| - 1 iterations of edge relaxations across all edges E.",
                    "Mathematical Proof of |V| - 1 Iterations: In a graph with |V| vertices, any simple path (a path containing no repeating vertices) can contain at most |V| - 1 edges. Since each complete iteration of Bellman-Ford relaxes all edges, it guarantees that the shortest paths of length at most k edges are found by the k-th iteration. If an edge can still be relaxed during the |V|-th iteration, the graph must contain a negative-weight cycle."
                ],
                "code": """algorithm BellmanFord(Graph G, Node startNode, Node targetNode):
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
                "subtitle": "4.2.4 Traveling Salesperson Problem (TSP) with 2-Opt Local Search",
                "paragraphs": [
                    "The Traveling Salesperson Problem asks: Given a list of cities and the distances between each pair, what is the shortest possible route that visits each city exactly once and returns to the origin? TSP is proven NP-Hard. AlgoLenz implements a two-stage heuristic: (1) Nearest Neighbor construction O(n^2), followed by (2) 2-Opt local search which systematically swaps edge pairs (i, i+1) and (k, k+1) whenever distance(i, k) + distance(i+1, k+1) < distance(i, i+1) + distance(k, k+1).",
                    "Geometric Untangling Proof: In Euclidean 2D space, if two route segments (A, B) and (C, D) cross each other, the triangle inequality guarantees that the alternative connection (A, C) and (B, D) has strictly shorter total length. The 2-Opt heuristic iteratively untangles these crossings until no further length reduction is possible."
                ],
                "code": """algorithm TSP_TwoOpt(List<Node> waypoints):
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
                "subtitle": "4.2.5 Quick Sort with Lomuto Partition Scheme",
                "paragraphs": [
                    "Invented by Tony Hoare in 1959, Quick Sort is an efficient divide-and-conquer sorting algorithm. AlgoLenz implements the Lomuto partition scheme where the last element is chosen as the pivot. The array is partitioned such that all elements less than the pivot are shifted to its left, and all elements greater are shifted to its right, recursing on left and right sub-arrays.",
                    "Lomuto Partition Mechanics: Maintains two pointers: i (boundary of elements smaller than pivot) and j (current exploration index). When A[j] < pivot, i is incremented and A[i] is swapped with A[j]. Finally, the pivot is placed at i+1."
                ],
                "code": """algorithm QuickSort(Array A, low, high):
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
    },
    {
        "title": "4.3 Screen Snapshots & Telemetry Walkthrough",
        "subsections": [
            {
                "subtitle": "4.3.1 User Interface Design & Visual Ergonomics",
                "paragraphs": [
                    "AlgoLenz features a cohesive, modern visual identity crafted in accordance with modern responsive web standards and human-computer interaction (HCI) best practices. The color palette utilizes dark-mode slate backgrounds (`#0f172a`) paired with vibrant accent colors to maximize contrast and reduce ocular strain during extended laboratory sessions.",
                    "Key Visual Interface Components:",
                    "1. Primary Navigation Bar: Fixed at the top viewport boundary, providing instant tabbed navigation between all five operational modes: 2D Grid Pathfinding, City Map Routing, Multi-Stop TSP Delivery, Sorting Visualizer, and Comparative Arena. Includes instant links to source code documentation, sound muting toggles, and theme presets.",
                    "2. Dynamic Control Toolbar: Houses algorithm selection dropdowns, procedural maze generators, clear board controls, and tool brushes (Wall, Eraser, Light Traffic, Moderate Traffic, Severe Gridlock).",
                    "3. Media Playback Control Bar: Positioned directly beneath the active canvas. Features tactile Play/Pause buttons, frame-by-frame forward and backward scrubbing buttons, and an interactive slider to throttle animation speed between 10ms and 250ms per step.",
                    "4. Synchronized Telemetry HUD (Heads-Up Display): Renders live metrics updated per animation frame: Total Visited Nodes Counter, Computed Path Length (hops), Cumulative Path Cost (reflecting terrain resistance weights), and Execution Runtime in milliseconds.",
                    "5. Interactive Pseudocode Card: A floating monospaced inspector displaying the theoretical pseudocode of the active algorithm. The exact line executing during the current visual frame is highlighted with an active glowing cyan badge.",
                    "6. Leaflet.js City Map Canvas: High-resolution cartographic view displaying municipal landmark markers, delivery hubs, and animated vehicle routing lines rendered over OpenStreetMap tiles.",
                    "7. Audio Sorting Bar Arena: Dynamic bar visualizer with real-time coral comparison indicators, amber swap indicators, electric blue pivot markers, and ascending pitch audio synthesis."
                ]
            }
        ]
    }
]

print("Expanded Chapter 4 module ready.")
