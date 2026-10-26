# Chapter 3 content definitions for AlgoLenz Project Report

CH3_TITLE = "CHAPTER-III: FEASIBILITY STUDY, SDLC & SYSTEM MODELING"

CH3_SEC1 = {
    "title": "3.1 Comprehensive Feasibility Study",
    "text": [
        "Before commencing active software engineering, a rigorous multi-dimensional feasibility study was conducted to evaluate the viability, constraints, and operational practicality of the AlgoLenz platform. The analysis evaluated four primary dimensions: Technical, Operational, Economic, and Schedule Feasibility."
    ]
}

FEASIBILITY_DETAILS = [
    {
        "name": "3.1.1 Technical Feasibility",
        "paragraphs": [
            "Technical feasibility evaluates whether the proposed system can be engineered utilizing existing hardware, software frameworks, and developer competencies without encountering unsolvable technical barriers.",
            "• Performance Constraints: The primary technical challenge was maintaining a smooth 60 frames-per-second (FPS) rendering rate while animating up to 1,500 grid cells or 100 array bars alongside simultaneous Web Audio tone generation. Traditional React re-renders would cause severe DOM thrashing. Technical feasibility was verified by prototyping a canvas-based grid generator and implementing React state memoization (`useMemo` and `useCallback`), proving that modern V8 JavaScript engines easily handle thousands of state transitions per second.",
            "• Algorithmic Determinism: The team evaluated the viability of implementing pure TypeScript implementations of Dijkstra, A*, Bellman-Ford, BFS, DFS, TSP (2-Opt), and six sorting algorithms. All algorithms are mathematically deterministic and execute in sub-100 millisecond runtimes on desktop hardware for standard input sizes.",
            "• Geospatial Tiling: The integration of Leaflet.js with public OpenStreetMap tile servers was evaluated for network latency. OpenStreetMap tiles are cached locally by browsers, ensuring negligible bandwidth consumption during routing simulations.",
            "Conclusion: The project was deemed completely technically feasible using standard modern web technologies."
        ]
    },
    {
        "name": "3.1.2 Operational Feasibility",
        "paragraphs": [
            "Operational feasibility assesses how effectively the software will integrate into its intended educational environment and whether target users (students, educators, self-learners) can adopt the system without friction.",
            "• Zero-Installation Client Architecture: Because AlgoLenz operates entirely in modern web browsers, users are not required to configure local development environments, install Python/Java runtimes, or compile binaries. This eliminates the standard technical barrier faced by novice students.",
            "• Intuitive User Interface: The interface employs universally recognized UI patterns: drag-to-paint obstacle drawing, standard media player playback bars (Play, Pause, Step Forward, Step Backward), and real-time tooltips. Novice users can launch complex A* heuristic comparisons within seconds of opening the application.",
            "• Pedagogical Alignment: The feature set directly reflects university curricula (BCA-5005 syllabus, MCA/B.Tech algorithm coursework, and competitive programming syllabi), ensuring immediate academic relevance.",
            "Conclusion: The operational feasibility is outstanding, with zero onboarding overhead for educational institutions."
        ]
    },
    {
        "name": "3.1.3 Economic Feasibility",
        "paragraphs": [
            "Economic feasibility conducts a cost-benefit analysis regarding development, infrastructure, hosting, and licensing expenditure.",
            "• Development Cost: Built entirely by undergraduate students as an academic Minor Project, incurring zero capital developer expenditure.",
            "• Licensing & Open Source Stack: Every library in the technology stack—React, TypeScript, Vite, Tailwind CSS, Leaflet, Lucide React, and OpenStreetMap—is distributed under permissive open-source licenses (MIT or Apache 2.0). There are zero licensing fees or subscription overheads.",
            "• Cloud Hosting & Infrastructure: Because the application is a client-side Single Page Application (SPA) requiring zero backend application servers or cloud database instances, it can be hosted permanently on free-tier global content delivery networks such as GitHub Pages, Vercel, or Netlify.",
            "Conclusion: The economic feasibility is absolute, achieving enterprise-grade educational utility at zero financial cost."
        ]
    },
    {
        "name": "3.1.4 Schedule & Legal Feasibility",
        "paragraphs": [
            "• Schedule Feasibility: The project timeline was systematically mapped against the 10-week Odd Semester 2026–2027 academic schedule prescribed by the PSIT Department of Computer Applications. Milestones were established for proposal approval (Week 2), Progress Evaluation 1 during CT-I (Week 5), Progress Evaluation 2 during CT-II (Week 9), and Final Defense during Pre-University exams (Week 10). All deliverables were completed strictly on schedule.",
            "• Legal & Ethical Compliance: The project adheres strictly to academic integrity standards. All foundational algorithm references (Dijkstra 1959, Hart et al. 1968, Cormen et al. 2009) and pedagogical inspirations (VisuAlgo by NUS) are thoroughly acknowledged and cited. The source code is licensed under the MIT License.",
            "Conclusion: All schedule and legal conditions were thoroughly validated."
        ]
    }
]

CH3_SEC2 = {
    "title": "3.2 Software Development Life Cycle (Agile Iterative Model)",
    "text": [
        "To manage development systematically while allowing continuous refinement of user experience and algorithmic visualization, the team adopted the Agile Iterative Development Model.",
        "Rather than relying on a rigid sequential Waterfall model, Agile facilitated continuous integration, rapid feedback loops with project supervisor Dr. Amit Yadav, and incremental feature delivery across five distinct two-week Sprints:",
        "• Sprint 1 (Weeks 1–2): Requirement Analysis, Domain Survey, Tech Stack Scaffolding, and Proposal Submission.",
        "• Sprint 2 (Weeks 3–4): Core 2D Matrix Canvas, State Management Pipeline (VisualizerContext), and Unweighted Graph Traversals (BFS, DFS).",
        "• Sprint 3 (Weeks 5–6): Weighted Algorithms (Dijkstra, Bellman-Ford), Heuristic A* Search, Procedural Maze Generation, and CT-I Defense.",
        "• Sprint 4 (Weeks 7–8): Web Audio Tone Synthesizer, Sorting Visualizer Engine (6 Algorithms), and Leaflet Geospatial City Map Integration.",
        "• Sprint 5 (Weeks 9–10): Multi-Stop TSP Delivery Optimizer, Dual Comparison Arena, Stress Testing, Code Optimization, and Final Documentation."
    ]
}

CH3_SEC3 = {
    "title": "3.3 Data Flow Diagrams (DFDs)",
    "text": [
        "Data Flow Diagrams graphically represent how data moves through the AlgoLenz platform, transforming from user canvas inputs into recorded execution steps and visual/auditory outputs."
    ]
}

DFD_DESCRIPTIONS = [
    {
        "level": "3.3.1 Level 0 DFD (Context Level Diagram)",
        "desc": [
            "The Level 0 Context Diagram represents AlgoLenz as a centralized process interacting with external entities: the Student/User and the Audio/Visual Browser Subsystems.",
            "Data Inflows: User provides Algorithm Selection, Grid Dimensions, Wall/Terrain Weights, Array Size, and Playback Controls (Play/Pause/Scrub).",
            "Data Outflows: System emits Visual Frame Animations (DOM updates), Real-Time Telemetry Metrics (nodes visited, runtime ms, path cost), Synchronized Pseudocode Highlights, and Web Audio Frequency Tones."
        ]
    },
    {
        "level": "3.3.2 Level 1 DFD (Subsystem Decomposition)",
        "desc": [
            "The Level 1 DFD decomposes the system into four autonomous sub-processes:",
            "1. Process 1.0 (Canvas Configuration Manager): Captures mouse interactions, maintains grid matrix data, and handles procedural maze generation.",
            "2. Process 2.0 (Algorithmic Execution Engine): Receives matrix snapshots, invokes pure TypeScript pathfinding/sorting routines, and generates ordered step queues.",
            "3. Process 3.0 (Animation & Playback Controller): Manages the bidirectional execution timeline, interval timer scheduling, and step scrubbing.",
            "4. Process 4.0 (Multi-Sensory Output Synthesizer): Dispatches synchronous updates to the canvas renderer, telemetry stats panel, code inspector, and Web Audio oscillator nodes."
        ]
    },
    {
        "level": "3.3.3 Level 2 DFD (Pathfinding Execution Pipeline)",
        "desc": [
            "The Level 2 DFD details the internal workflow of Process 2.0 during graph pathfinding:",
            "• Step 2.1: Matrix Parsing & Node Extraction (Converts 2D visual grid into weighted adjacency graph).",
            "• Step 2.2: Priority Queue / Heuristic Evaluation (Min-Heap maintains open set ordered by f(n) = g(n) + h(n)).",
            "• Step 2.3: Neighbor Inspection & Edge Relaxation (Calculates tentative distances and records parent pointers).",
            "• Step 2.4: Step Event Serialization (Pushes discrete `visit` and `frontier` events to `AlgorithmStep[]`).",
            "• Step 2.5: Path Backtracking (Traces parent pointers from target to start, emitting final `path` step events)."
        ]
    }
]

CH3_SEC4 = {
    "title": "3.4 Unified Modeling Language (UML) Modeling",
    "text": [
        "To provide standard structural and behavioral architectural blueprints, the system is modeled through formal UML diagrams:"
    ]
}

UML_DETAILS = [
    {
        "name": "3.4.1 Use Case Diagram & Actor Descriptions",
        "desc": [
            "Primary Actor: Student / Learner / Educator.",
            "Secondary Actor: Web Audio API / Leaflet Tile Server.",
            "Core Use Cases:",
            "• UC-01: Configure Grid Canvas (Draw walls, set terrain weights, reposition start/target).",
            "• UC-02: Generate Procedural Maze (Recursive division, random obstacles, city blocks).",
            "• UC-03: Execute Pathfinding Simulation (Select Dijkstra, A*, BFS, DFS, Bellman-Ford).",
            "• UC-04: Control Playback Timeline (Play, pause, step forward, step backward, throttle speed).",
            "• UC-05: Inspect Synchronized Pseudocode (Observe live highlighted execution lines).",
            "• UC-06: Launch Comparison Arena (Run dual algorithms simultaneously and compare metrics).",
            "• UC-07: Simulate City Map Route (Plot geospatial shortest path on OpenStreetMap).",
            "• UC-08: Optimize Multi-Stop Delivery (Solve TSP tour using 2-Opt heuristic).",
            "• UC-09: Audio-Visual Sorting Simulation (Visualize bar sorting with musical pitch tones)."
        ]
    },
    {
        "name": "3.4.2 Sequence Diagram: Pathfinding Execution Pipeline",
        "desc": [
            "Sequence of interactions between User, UI Components, VisualizerContext, Algorithmic Engine, and Audio API:",
            "1. User clicks 'Visualize Algorithm' on ControlPanel.",
            "2. ControlPanel triggers `runAlgorithm(selectedAlgorithm)` in VisualizerContext.",
            "3. VisualizerContext clones current Grid state and passes snapshot to Algorithmic Engine (e.g., `dijkstra(grid, start, end)`).",
            "4. Algorithmic Engine executes search synchronously, populating `AlgorithmStep[]` array in memory, and returns result to Context.",
            "5. VisualizerContext resets `currentStepIndex = 0` and initiates `requestAnimationFrame` animation timer.",
            "6. On each tick, Context dispatches step state to GridVisualizer (mutates cell classes) and StatsPanel (updates telemetry counters).",
            "7. Upon reaching terminal step, Context plays completion chord via SoundFX and renders shortest path highlight."
        ]
    },
    {
        "name": "3.4.3 State Machine Diagram: Node Transition Cycle",
        "desc": [
            "Lifecycle states of an individual `GridNode` during pathfinding:",
            "• State 1: UNVISITED (Initial state, distance = infinity, parent = null).",
            "• State 2: FRONTIER (Discovered neighbor added to Priority Queue, distance updated, pulsing visual state).",
            "• State 3: VISITED (Extracted from Priority Queue, incident edges relaxed, marked closed).",
            "• State 4: SHORTEST_PATH (Backtracked parent node belonging to optimal reconstructed trajectory).",
            "• State 5: WALL / WEIGHT (Special obstacle state modifying traversal impedance)."
        ]
    }
]

print("Chapter 3 definitions ready.")
