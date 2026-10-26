# Chapter 2 content definitions for AlgoLenz Project Report

CH2_TITLE = "CHAPTER-II: MODULES, SYSTEM REQUIREMENTS & TECHNOLOGY STACK"

CH2_SEC1 = {
    "title": "2.1 Modules Overview & Detailed Architecture Breakdown",
    "text": [
        "AlgoLenz is engineered following modern modular design principles, encapsulating distinct algorithmic domains into self-contained, loosely coupled modules coordinated through a centralized state bus. This modular division ensures high code maintainability, reusability, and independent testability."
    ]
}

MODULE_DETAILS = [
    {
        "name": "2.1.1 Module 1: 2D Interactive Grid Pathfinding Visualizer",
        "paragraphs": [
            "The 2D Interactive Grid Visualizer serves as the foundational graphical canvas for exploring planar graph traversals. It presents a dynamic matrix of cells (default dimension: 25 rows by 50 columns, representing 1,250 vertices and up to 4,800 directed edges). Each cell in the grid represents an autonomous graph node characterized by discrete Cartesian coordinates (row, col), a node classification type, dynamic traversal states, and terrain passage weights.",
            "Key functional capabilities of this module include:",
            "• Interactive Cell State Painting: Users can utilize intuitive mouse drag interactions to paint obstacle walls, clear barriers, or reposition the designated Start node (🛵 Rider) and Target node (📦 Customer destination) in real time.",
            "• Dynamic Terrain Weight Brushes: Unlike standard unweighted grid visualizers, AlgoLenz supports weighted graph simulations. Users can paint cells with variable traversal costs: Light Traffic (+2 cost), Moderate Traffic (+5 cost), and Severe Gridlock (+10 cost). This enables direct observation of how weighted algorithms like Dijkstra and A* intelligently bypass congested pathways in favor of longer, lower-cost bypasses.",
            "• Color-Coded State Transitions: The visualizer employs clear visual hierarchy to communicate cell states during execution: unvisited (translucent white/slate), frontier (pulsing cyan/yellow nodes currently residing in the active priority queue or FIFO queue), visited (deep blue/purple nodes extracted and relaxed), and shortest path (vibrant emerald gold line connecting source to destination).",
            "• Real-Time Hover Telemetry: Hovering over any explored node dynamically displays an inspector overlay detailing its exact coordinates, current distance g(n) from start, heuristic estimation h(n) to target, composite cost f(n), and pointer reference to its parent node."
        ]
    },
    {
        "name": "2.1.2 Module 2: Pure TypeScript Graph Traversal & Heuristic Pathfinding Engines",
        "paragraphs": [
            "At the core of AlgoLenz resides a suite of pure, deterministic algorithmic engines written in TypeScript. Crucially, these engines are decoupled from the browser Document Object Model (DOM) and UI rendering logic. When invoked, an algorithm engine takes a snapshot of the grid matrix and produces an ordered sequence of discrete `AlgorithmStep` objects.",
            "The module encompasses five distinct pathfinding engines:",
            "1. Dijkstra's Algorithm (dijkstra.ts): Solves the single-source shortest path problem on weighted graphs. It maintains a binary Min-Heap priority queue to repeatedly extract the unvisited vertex with minimum tentative distance, relaxing all incident edges until the target is reached. Guarantees absolute path optimality under non-negative edge weights.",
            "2. A* Search Algorithm (aStar.ts): An informed search algorithm that accelerates pathfinding by incorporating heuristic evaluation: f(n) = g(n) + h(n), where g(n) is the exact cost from start to node n, and h(n) is an admissible heuristic estimating the cost from n to the goal. AlgoLenz supports multiple distance heuristics: Manhattan Distance (|dx| + |dy| for 4-directional grid movement), Euclidean Distance (sqrt(dx^2 + dy^2)), and Chebyshev Distance.",
            "3. Breadth-First Search (bfs.ts): An unweighted graph traversal algorithm utilizing a First-In, First-Out (FIFO) queue. Expands outward uniformly level-by-level, guaranteeing the shortest path in terms of edge count on unweighted graphs with time complexity O(V + E).",
            "4. Depth-First Search (dfs.ts): Explores graph branches to their maximum depth using a Last-In, First-Out (LIFO) stack before backtracking. Does not guarantee the shortest path, providing an instructive visual contrast illustrating how greedy depth exploration can wander through convoluted corridors.",
            "5. Bellman-Ford Algorithm (bellmanFord.ts): A dynamic programming approach that iteratively relaxes all edges in the graph |V| - 1 times. While having higher time complexity O(V * E), Bellman-Ford is capable of detecting negative-weight cycles, making it mathematically versatile."
        ]
    },
    {
        "name": "2.1.3 Module 3: Procedural Maze & Terrain Generators",
        "paragraphs": [
            "To challenge pathfinding algorithms against complex spatial topology without requiring tedious manual wall drawing, AlgoLenz features a robust procedural generation module (gridGenerator.ts).",
            "Included generation algorithms:",
            "• Recursive Division Maze: Generates authentic, non-trivial mazes by recursively bisecting rectangular chambers with wall lines and punching random passage openings. Guarantees a fully connected, single-component labyrinth with winding corridors that rigorously test search tree depth and heuristic steering.",
            "• Random Obstacle Scattering: Injects obstacles across the grid using a configurable Bernoulli density distribution (default: 30% wall density), generating randomized obstacle fields typical of sensor-based robotic navigation.",
            "• City Blocks Grid: Generates structured grid patterns resembling modern urban street blocks, complete with broad avenues, alleyways, and periodic intersections.",
            "• Traffic Corridor Generator: Constructs synthetic arterial highways flanked by dense congestion weights, forcing algorithms to choose between high-speed peripheral routes and congested direct paths."
        ]
    },
    {
        "name": "2.1.4 Module 4: Real-World Geospatial Map Routing Engine",
        "paragraphs": [
            "A standout innovation of AlgoLenz is its integration with real-world geospatial cartography via Leaflet.js and OpenStreetMap (CityMapView.tsx). Traditional visualizers remain confined to abstract pixel grids; AlgoLenz extends pathfinding to real street geographies.",
            "The city map routing engine establishes an urban landmark graph (cityData.ts) containing geo-referenced nodes across major metropolitan centers (e.g., Kanpur urban hubs: CSJM University, Bhauti, Rawatpur, Zsquare, Civil Lines, Dark Store Warehouses, and Residential Clusters).",
            "Nodes are encoded with real latitude and longitude coordinates. Edge weights are dynamically calculated based on actual geodesic distances computed using the Haversine trigonometric formula:",
            "d = 2 * R * asin(sqrt(sin^2((lat2 - lat1)/2) + cos(lat1) * cos(lat2) * sin^2((lng2 - lng1)/2)))",
            "where R is the Earth's radius (6,371 km).",
            "When users select source and destination landmarks, the system runs Dijkstra or A* directly across the road network, animating vehicle courier markers along the calculated optimal route."
        ]
    },
    {
        "name": "2.1.5 Module 5: Multi-Stop Dispatch & TSP Optimizer",
        "paragraphs": [
            "Real-world delivery platforms rarely dispatch couriers for single pick-up and single drop-off trips; instead, couriers must visit multiple distributed restaurant partners and customer addresses in optimal sequence. This scenario is modeled mathematically as the Traveling Salesperson Problem (TSP), a classic NP-Hard combinatorial optimization problem.",
            "The Multi-Stop TSP module (tsp.ts, MultiStopView.tsx) enables users to place multiple waypoint destinations across the canvas. Because exact dynamic programming (Held-Karp algorithm) scales with exponential time complexity O(n^2 * 2^n), it becomes computationally intractable in real-time browsers for n > 15 waypoints.",
            "AlgoLenz resolves this using a multi-phase heuristic pipeline:",
            "1. Nearest Neighbor Greedy Construction: Quickly constructs an initial valid tour by greedily selecting the closest unvisited waypoint at each step.",
            "2. 2-Opt Iterative Local Search: Systematically inspects pairs of non-adjacent route edges. If untangling the crossing edges reduces total path distance, the route segment is reversed. The 2-Opt algorithm iterates until a local optimum is achieved, eliminating route crossovers and minimizing total courier transit time."
        ]
    },
    {
        "name": "2.1.6 Module 6: Audio-Visual Sorting Engine & Web Audio Tone Synthesizer",
        "paragraphs": [
            "The sorting visualizer module (sorting.ts, SortingView.tsx) models and renders the state transformations of six core sorting algorithms:",
            "• Bubble Sort (O(n^2))",
            "• Selection Sort (O(n^2))",
            "• Insertion Sort (O(n^2))",
            "• Merge Sort (O(n log n))",
            "• Quick Sort with Lomuto Partitioning (O(n log n) average)",
            "• Heap Sort using Max-Heapify (O(n log n))",
            "The visual representation utilizes dynamic bar charts where bar height reflects numerical value. Elements involved in active comparisons are highlighted in vibrant coral, active swaps in amber, pivot elements in electric blue, and sorted partitions in emerald green.",
            "Audio Synthesis Pipeline (SoundFX.ts): Built on the HTML5 Web Audio API, the system maps each array element value linearly to an acoustic frequency within the human auditory spectrum (120 Hz to 1,200 Hz). When two elements are compared or swapped, a Web Audio OscillatorNode generates an instantaneous sine wave tone modulated through an exponential gain envelope. As sorting progresses, students perceive the transition from discordant chaotic noise to ascending harmonic scales, providing immediate auditory confirmation of sorted order."
        ]
    },
    {
        "name": "2.1.7 Module 7: Comparative Benchmarking Arena",
        "paragraphs": [
            "The Comparative Arena (ComparisonView.tsx) delivers a split-screen racing environment where two distinct algorithms execute simultaneously on identical grid layouts and obstacle configurations.",
            "Users can configure races such as Dijkstra vs A* (Manhattan), Dijkstra vs A* (Euclidean), or BFS vs DFS. As both algorithms advance frame-by-frame, a synchronized telemetry dashboard displays:",
            "• Execution Runtime Delta (milliseconds)",
            "• Explored Nodes Ratio (demonstrating search space reduction)",
            "• Final Path Cost & Path Length Comparison",
            "This empirical battle ground provides indisputable pedagogical proof of heuristic pruning and algorithmic efficiency."
        ]
    },
    {
        "name": "2.1.8 Module 8: Synchronized Pseudocode Inspector & Bidirectional Playback Controller",
        "paragraphs": [
            "Modeled directly after VisuAlgo's pedagogical framework, AlgoLenz features a synchronized pseudocode inspector. A persistent side drawer displays the formal pseudocode of the active algorithm. As each frame of the animation plays, the exact corresponding line of code (e.g., `for each neighbor v of u`, `if dist[u] + weight < dist[v]`) is highlighted with an active execution badge.",
            "The PlaybackBar controller provides full bidirectional scrubbing: Play, Pause, Step Forward (+1 step), Step Backward (-1 step), Reset, and an animation velocity slider adjusting frame intervals from 10 ms (high-speed processing) to 250 ms (pedagogical slow motion)."
        ]
    }
]

CH2_SEC2 = {
    "title": "2.2 System Requirements Specification",
    "text": [
        "To ensure universal accessibility, AlgoLenz was developed as a modern, zero-installation client-side Single Page Application (SPA). The platform requires no external database drivers or native executable compilation by the end user."
    ]
}

HW_REQ_DATA = [
    ("Component", "Developer Minimum Requirement", "End-User Client Minimum Requirement"),
    ("Processor (CPU)", "Intel Core i5 / AMD Ryzen 5 (Quad-Core, 2.5 GHz+)", "Intel Core i3 / AMD Dual-Core (1.8 GHz+) or modern mobile ARM"),
    ("Random Access Memory (RAM)", "8 GB DDR4", "4 GB RAM (2 GB free memory)"),
    ("Storage (Disk Space)", "2 GB available SSD space (including node_modules)", "100 MB available browser cache storage"),
    ("Display Resolution", "1920 x 1080 Full HD (recommended for dual arena)", "1366 x 768 minimum (Responsive scaling supported)"),
    ("Audio Output", "Headphones or internal stereo speakers (for Web Audio)", "Built-in speakers or headphone jack for audio feedback"),
    ("Network Interface", "Broadband internet (for initial package installations)", "Standard internet connection for initial page load (offline capable afterwards)")
]

SW_REQ_DATA = [
    ("Software Component", "Developer Environment", "End-User Environment"),
    ("Operating System", "Windows 11 / Windows 10 / Ubuntu Linux 22.04 / macOS", "Platform Independent (Windows, macOS, Linux, Android, iOS)"),
    ("Web Browser Engine", "Google Chrome 115+, Mozilla Firefox 118+, Microsoft Edge 115+", "Modern HTML5-compliant browser with ES6 & Web Audio API"),
    ("Runtime Environment", "Node.js (v18.0.0 LTS or v20.x)", "Client browser JavaScript V8 / SpiderMonkey / WebKit engine"),
    ("Package Manager", "npm (v9.0.0+) or yarn (v1.22+)", "Not Required"),
    ("Source Code Editor", "Visual Studio Code / Antigravity IDE", "Not Required"),
    ("Version Control", "Git (v2.40+) with GitHub remote repository", "Not Required")
]

CH2_SEC3 = {
    "title": "2.3 Technology Used in Project",
    "text": [
        "The technology stack of AlgoLenz was chosen specifically to ensure uncompromising rendering performance, strict type contracts, responsive modern UI styling, and zero-latency audio synthesis.",
        "1. React 18 (Frontend Framework): Leveraged for its declarative component model and optimized Virtual DOM reconciliation. Functional components utilizing modern React Hooks (`useState`, `useEffect`, `useCallback`, `useMemo`, `useRef`) allow high-frequency UI updates without unnecessary re-renders.",
        "2. TypeScript 5.3 (Programming Language): Introduces strict compile-time type safety across the application. Domain interfaces for `GridNode`, `AlgorithmStep`, `SortingStep`, and `CityHubNode` guarantee that algorithmic engines adhere strictly to structural contracts, eliminating runtime `undefined` or null reference errors.",
        "3. Vite 5 (Build Tool & Dev Server): Replaces traditional Webpack bundlers with native ES Modules (ESM) and blazing-fast Hot Module Replacement (HMR). Vite's optimized Rollup production bundling creates lightweight, minified assets resulting in near-instant initial page loads.",
        "4. Tailwind CSS 3.4 (Styling Engine): A utility-first CSS framework providing a curated design system. Enables sleek dark-mode glassmorphism aesthetics, responsive grid breakpoints, and polished typography without bloated custom style files.",
        "5. Leaflet.js 1.9 & React-Leaflet 4.2 (Geospatial Mapping): Industry-standard open-source mapping library. Powers the City Map routing module by loading OpenStreetMap vector tiles, rendering smooth polyline paths, and managing coordinate projection transformations.",
        "6. HTML5 Web Audio API (Sound Synthesis): Native browser audio synthesis framework. Generates real-time audio waveforms without external audio files, utilizing `AudioContext`, `OscillatorNode`, and `GainNode` for microsecond-precision audio cues.",
        "7. Lucide React (Iconography): Comprehensive icon library providing clean, scalable SVG icons for playback controls, maze generators, vehicle markers, and navigation bars."
    ]
}

print("Chapter 2 definitions ready.")
