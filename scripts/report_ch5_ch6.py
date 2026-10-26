# Chapters 5, 6 and References for AlgoLenz Project Report

CH5_TITLE = "CHAPTER-V: TESTING, QUALITY ASSURANCE & PERFORMANCE OPTIMIZATION"

CH5_SEC1 = {
    "title": "5.1 Testing Strategy & Quality Assurance",
    "text": [
        "Quality assurance for AlgoLenz followed a rigorous, multi-tiered testing methodology designed to verify algorithmic correctness, state synchronization, browser compatibility, and visual rendering responsiveness.",
        "Testing tiers included:",
        "1. Unit Testing of Algorithmic Correctness: Mathematical verification that pathfinding engines locate the optimal shortest path and that sorting engines produce monotonically non-decreasing arrays.",
        "2. Boundary & Stress Testing: Subjecting engines to degenerate inputs, cyclic graphs, unreachable destinations, and extreme array dimensions.",
        "3. Cross-Browser Compatibility: Verifying rendering consistency and Web Audio support across Google Chrome, Mozilla Firefox, Microsoft Edge, and Apple Safari."
    ]
}

TEST_CASES_DATA = [
    ("TC-01", "Dijkstra Unweighted Grid", "Grid with no obstacles, Start (0,0), Target (10,10)", "Shortest path length = 20 hops, nodes explored radially", "PASSED"),
    ("TC-02", "Dijkstra Obstacle Wall Avoidance", "Linear wall barrier completely blocking direct straight line", "Path routes around the wall boundary with optimal cost", "PASSED"),
    ("TC-03", "Dijkstra Unreachable Destination", "Target completely enclosed inside an impassable solid 4-sided wall box", "Explores all accessible nodes, stops gracefully, displays 'No Path Found'", "PASSED"),
    ("TC-04", "A* Manhattan Heuristic Steering", "Open grid, Start (5,5), Target (5,45)", "Exploration focused tightly along horizontal axis toward target; nodes visited < 50% of Dijkstra", "PASSED"),
    ("TC-05", "A* vs Dijkstra Weighted Terrain", "Direct path through heavy traffic (+10), detour path through empty cells (cost 1)", "Algorithm successfully routes around heavy traffic corridor to minimize total accumulated cost", "PASSED"),
    ("TC-06", "Bellman-Ford Negative Weight Cycle", "Graph containing directed cycle with net negative accumulated weight", "Successfully flags negative cycle detection alert without infinite looping", "PASSED"),
    ("TC-07", "BFS Shortest Path Guarantee", "Unweighted grid with multiple convoluted labyrinth paths", "Guarantees absolute minimum hop count from source to target", "PASSED"),
    ("TC-08", "DFS Deep Traversal", "Unweighted labyrinth maze", "Traverses to maximum branch depth, exhibiting non-optimal winding trajectory", "PASSED"),
    ("TC-09", "Procedural Maze Generation", "Invocation of Recursive Division algorithm on empty 25x50 canvas", "Generates single-component solvable maze without isolated closed rooms", "PASSED"),
    ("TC-10", "TSP Nearest Neighbor Tour", "5 distributed waypoints on grid canvas", "Builds closed tour visiting each waypoint once without node omission", "PASSED"),
    ("TC-11", "TSP 2-Opt Edge Untangling", "Initial tour with crossed geometric trajectory edges", "2-Opt local search uncrosses overlapping segments, reducing total tour length", "PASSED"),
    ("TC-12", "Quick Sort Sorting Invariant", "Random array of 50 integers (range 10 to 500)", "Array completely sorted in ascending order; comparisons O(n log n)", "PASSED"),
    ("TC-13", "Quick Sort Reverse Array", "Strictly descending array of 50 integers", "Successfully sorted without stack overflow error using Lomuto partitioning", "PASSED"),
    ("TC-14", "Merge Sort Stability", "Array with repeated identical values", "Stable sort preserved; auxiliary memory allocated and merged correctly", "PASSED"),
    ("TC-15", "Heap Sort Max-Heap Invariant", "Random array of 75 elements", "Binary max-heap constructed in O(n); sorted ascending in O(n log n)", "PASSED"),
    ("TC-16", "Web Audio API Initialization", "User clicks 'Play' on sorting visualizer", "AudioContext resumes without user-gesture browser permission warning", "PASSED"),
    ("TC-17", "Web Audio Tone Frequency Range", "Sorting array with min value 10 and max value 500", "Frequencies accurately bounded within 120 Hz to 1200 Hz spectrum", "PASSED"),
    ("TC-18", "Bidirectional Scrubbing (Step Back)", "Algorithm paused mid-execution; user clicks 'Step Backward'", "Cell state cleanly reverts to unvisited/frontier without canvas reload", "PASSED"),
    ("TC-19", "Leaflet Geospatial Map Routing", "Route from CSJM University to Rawatpur landmark", "Haversine geodesic distance calculated; polyline rendered on OpenStreetMap", "PASSED"),
    ("TC-20", "Dual Comparison Arena Sync", "Race Dijkstra vs A* simultaneously on identical maze", "Both engines advance synchronously; comparative stats correctly populated", "PASSED")
]

CH5_SEC2 = {
    "title": "5.2 Rendering Performance & 60 FPS Frame Budget Analysis",
    "text": [
        "In interactive web applications, the browser rendering pipeline operates within a strict 16.67 millisecond frame budget to maintain 60 frames per second (FPS). Any script execution or DOM manipulation exceeding this threshold results in perceptible jank and dropped frames.",
        "Performance Optimization Techniques Applied in AlgoLenz:",
        "1. Offloading Algorithmic Computation: Algorithmic path exploration runs synchronously in memory prior to animation playback. The resulting `AlgorithmStep[]` queue decouples heavy graph mathematics from visual rendering.",
        "2. React Component Memoization: The individual grid cells (`GridCell.tsx`) are wrapped in `React.memo` with custom equality comparators. Only cells whose specific visual states (`isVisited`, `isFrontier`, `isPath`, `type`) change are re-rendered, bypassing thousands of unchanged DOM nodes.",
        "3. requestAnimationFrame Loop Timing: Rather than using unreliable `setInterval` timers which drift during tab switching, playback uses `requestAnimationFrame` synchronized directly with the hardware display refresh cycle.",
        "4. Audio Oscillator Recycling: Instead of instantiating new `AudioContext` instances per note, a persistent singleton audio context is maintained with dynamic gain envelope ramping, minimizing garbage collection pauses."
    ]
}

CH6_TITLE = "CHAPTER-VI: CONCLUSION, LIMITATIONS & FUTURE SCOPE"

CH6_SEC1 = {
    "title": "6.1 Conclusion & Summary of Accomplishments",
    "text": [
        "The AlgoLenz project successfully conceptualizes, designs, and implements an advanced interactive algorithm visualization and benchmarking platform modeled after global educational benchmarks like VisuAlgo. Over the course of the 10-week development cycle for the BCA Minor Project (BCA-5005) at PSIT College of Higher Education, the team accomplished all planned engineering milestones:",
        "• Successfully engineered five distinct visual operational modes: 2D Grid Pathfinding, Geographic City Map, Multi-Stop TSP Delivery, Audio-Visual Sorting, and Comparative Arena.",
        "• Implemented verified, pure TypeScript engines for Dijkstra, A*, BFS, DFS, Bellman-Ford, TSP (2-Opt), and six sorting algorithms.",
        "• Successfully integrated the native HTML5 Web Audio API to deliver real-time pitch synthesis reflecting element values and swap entropy.",
        "• Linked real-world OpenStreetMap cartography via Leaflet.js to solve geodesic shortest path problems across actual Kanpur municipal landmarks.",
        "• Provided complete bidirectional playback controls with synchronized line-by-line pseudocode highlighting.",
        "AlgoLenz represents a powerful, production-ready educational platform that substantively reduces cognitive friction and improves comprehension of foundational computer science concepts."
    ]
}

CH6_SEC2 = {
    "title": "6.2 Limitations of the Current Implementation",
    "text": [
        "While AlgoLenz provides a comprehensive visualization suite, certain engineering constraints and limitations remain:",
        "1. Two-Dimensional Planar Constraints: Grid pathfinding is currently restricted to 2D Cartesian matrices. It does not model three-dimensional environments (e.g., multi-floor building navigation or aerial drone volumetric waypoints).",
        "2. Single-Threaded Browser Execution: In extremely large grids (> 100x100 cells or 10,000 vertices), computing Dijkstra or Bellman-Ford on the main JavaScript thread can momentarily block UI interactions. Offloading to Web Workers would further enhance scalability.",
        "3. Static City Map Graph: The geospatial city map utilizes a predefined curated landmark graph rather than dynamic live OpenStreetMap overpass API network extraction.",
        "4. Exact TSP Scalability: Due to the NP-Hard nature of the Traveling Salesperson Problem, exact optimal tours are limited to heuristic approximations (Nearest Neighbor + 2-Opt) rather than exact branch-and-bound or dynamic programming solvers for large waypoint sets."
    ]
}

CH6_SEC3 = {
    "title": "6.3 Future Scope & Technological Enhancements",
    "text": [
        "The architectural modularity of AlgoLenz provides an exceptional foundation for future research and technical expansions:",
        "• 3D Volumetric Visualizations with Three.js: Extending the 2D grid canvas into immersive 3D terrain matrices with elevation contours, modeling mountain passes, drone corridors, and multi-tier architectures.",
        "• Web Workers Multithreading: Offloading computationally intensive algorithms (such as dense Bellman-Ford relaxations or large TSP genetic algorithms) to dedicated background Web Workers, ensuring silky-smooth UI response on mobile devices.",
        "• Multi-User Collaborative Race Arena: Incorporating WebSockets (Socket.io) to enable multiplayer algorithmic battles where students race custom heuristic configurations against one another across shared network mazes.",
        "• Expanded Algorithmic Catalog: Integrating Dynamic Programming visualizers (Knapsack, Longest Common Subsequence, Matrix Chain Multiplication) and Advanced Tree Structures (Red-Black Trees, AVL Trees, B-Trees, Segment Trees).",
        "• Automated Gamified Assessment Engine: Building interactive coding challenges where students must fix broken algorithm steps to guide a lost courier home."
    ]
}

REFERENCES_LIST = [
    ("1", "Halim, S., & Halim, F. (2013). Competitive Programming 3: The New Lower Bound of Programming Contests. National University of Singapore (VisuAlgo)."),
    ("2", "Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2009). Introduction to Algorithms (3rd ed.). MIT Press, Cambridge, MA."),
    ("3", "Dijkstra, E. W. (1959). A note on two problems in connexion with graphs. Numerische Mathematik, 1(1), 269–271."),
    ("4", "Hart, P. E., Nilsson, N. J., & Raphael, B. (1968). A Formal Basis for the Heuristic Determination of Minimum Cost Paths. IEEE Transactions on Systems Science and Cybernetics, 4(2), 100–107."),
    ("5", "Bellman, R. (1958). On a routing problem. Quarterly of Applied Mathematics, 16(1), 87–90."),
    ("6", "Ford, L. R. (1956). Network Flow Theory. The RAND Corporation, Paper P-923."),
    ("7", "Hoare, C. A. R. (1962). Quicksort. The Computer Journal, 5(1), 10–16."),
    ("8", "Williams, J. W. J. (1964). Algorithm 232: Heapsort. Communications of the ACM, 7(6), 347–348."),
    ("9", "Croes, G. A. (1958). A method for solving traveling-salesman problems. Operations Research, 6(6), 791–812 (2-Opt Heuristic)."),
    ("10", "Brown, M. H., & Sedgewick, R. (1984). A system for algorithm animation. ACM SIGGRAPH Computer Graphics, 18(3), 177–186."),
    ("11", "Stasko, J. T. (1990). TANGO: A framework and system for algorithm animation. IEEE Computer, 23(9), 27–39."),
    ("12", "Hundhausen, C. D., Douglas, S. A., & Stasko, J. T. (2002). A meta-study of algorithm visualization effectiveness. Journal of Visual Languages & Computing, 13(3), 259–290."),
    ("13", "Sinnott, R. W. (1984). Virtues of the Haversine. Sky and Telescope, 68(2), 159."),
    ("14", "W3C Web Audio Working Group. (2021). Web Audio API Specification. World Wide Web Consortium (W3C Recommendation)."),
    ("15", "Facebook Open Source. (2023). React: A JavaScript library for building user interfaces (v18.2). Meta Platforms, Inc.")
]

print("Chapters 5, 6 and References definitions ready.")
