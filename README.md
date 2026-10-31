<div align="center">

# 🌐 AlgoLenz

### *Interactive Data Structures, Pathfinding & Sorting Visualization Platform*
**Minor Project (BCA-5005) | PSIT College of Higher Education, Kanpur (CSJMU)**

[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-199900?style=for-the-badge&logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![Web Audio API](https://img.shields.io/badge/Web_Audio-API-orange?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

<p align="center">
  <b>Transforming abstract computational complexity into intuitive, frame-by-frame visual experiences.</b>
  <br />
  Explore pathfinding algorithms, geographic route planning, multi-stop TSP delivery heuristics, and sorting audio-visualizers with live pseudocode and telemetry.
</p>

[⚡ 2-Minute Quick Summary](#-2-minute-quick-summary-everything-you-need-to-know) •
[Explore Modes](#-the-5-application-modes) •
[Algorithm Catalog](#-algorithms-implemented) •
[Viva & Presentation Q&A](#-viva--presentation-cheat-sheet) •
[Getting Started](#-getting-started-in-10-seconds) •
[Team](#-team--contributors)

---

</div>

## ⚡ 2-Minute Quick Summary (Everything You Need to Know)

### 1. What is AlgoLenz?
**AlgoLenz** is an interactive, full-stack browser-based algorithm simulation platform. In computer science education, students often struggle to understand abstract algorithms from static textbook pseudocode. AlgoLenz solves this by rendering **every single comparison, pointer shift, relaxation, and swap frame-by-frame** with real-time audio synthesis, live pseudocode tracking, and real-world logistics applications (such as Swiggy/Zomato dispatching and Google Maps routing).

### 2. What Problems Does It Solve?
- **Static Learning Problem:** Traditional textbooks show only before-and-after states. AlgoLenz shows **every intermediate step**.
- **Lack of Real-World Context:** Algorithms are usually taught with abstract circles and numbers. AlgoLenz connects them to actual street traffic, multi-restaurant food delivery routes (TSP), and warehouse sorting.
- **Speed Barrier:** Beginners get overwhelmed when animations run too fast. AlgoLenz features **Slow-Mo mode (700ms)**, **Pause**, and **Single-Step (Step ❯)** controls with destination badges (`⇄ TO #7`) showing exactly where elements move.

### 3. Key Stats
- **13 Implemented Algorithms** (5 Pathfinding/Graph, 2 Multi-Stop TSP, 6 Sorting).
- **5 Distinct Interactive Modes** (Grid, City Map, Comparison Battles, Multi-Stop TSP, Sorting Visualizer).
- **Zero Third-Party Visualization Bloat** (Built directly with React 18, TypeScript, and Canvas/DOM).
- **100% Type-Safe & Zero Build Errors**.

---

## 🚀 The 5 Application Modes

| Mode | Real-World Concept | What the User Can Do |
| :--- | :--- | :--- |
| **1. 2D Grid Pathfinding** | Urban Street Navigation & Traffic Detours | Draw walls, add weighted traffic jams (+2, +5, +10 cost), generate spiral/random mazes, drag rider/customer pins, and watch Dijkstra, A*, BFS, DFS, and Bellman-Ford explore step-by-step. |
| **2. Geographic City Map** | Real-world GPS Navigation (Google Maps / Uber) | Powered by **Leaflet.js**, projects pathfinding onto real street coordinates in Kanpur/Delhi with live delivery dispatch markers. |
| **3. Multi-Stop TSP Dispatch** | Batch Food Delivery Routing (Swiggy / Zomato) | Solves the NP-hard Traveling Salesperson Problem across multiple restaurant pickups and customer drops using **Held-Karp Dynamic Programming (Exact)** and **Nearest Neighbor (Greedy Heuristic)**. |
| **4. Comparison Battle Arena** | Algorithmic Benchmarking | Races two algorithms head-to-head on the exact same maze. Compares runtime (ms), total path cost, and nodes visited side-by-side. |
| **5. Sorting Audio-Visualizer** | Warehouse Package & Database Index Sorting | Visualizes Bubble, Selection, Insertion, Merge, Quick, and Heap Sort in **3D Cards**, **Sound Bars**, or **Scatter Galaxy** modes with real-time pitch synthesis via Web Audio API. |

---

## 📚 Algorithms Implemented

### 1. Graph & Pathfinding Engines (`src/algorithms/`)

| Algorithm | Category | Guarantees Shortest Path? | Time Complexity | Space Complexity | Real-World Use Case |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Dijkstra's Algorithm** | Greedy / Priority Queue | ✅ Yes (Positive weights) | $\mathcal{O}((V + E) \log V)$ | $\mathcal{O}(V)$ | Zomato/Swiggy delivery dispatch with road congestion weights |
| **A\* Search (A-Star)** | Heuristic Directed | ✅ Yes (Admissible $h(n)$) | Average $\mathcal{O}(E)$ | $\mathcal{O}(V)$ | Google Maps / Uber turn-by-turn navigation engine |
| **Breadth-First Search (BFS)** | Level-order (Queue FIFO) | ✅ Yes (Unweighted only) | $\mathcal{O}(V + E)$ | $\mathcal{O}(V)$ | Proximity radius checks / finding nearest delivery riders |
| **Depth-First Search (DFS)** | Deep traversal (Stack LIFO) | ❌ No | $\mathcal{O}(V + E)$ | $\mathcal{O}(V)$ | Procedural maze generation, cycle detection, topological sorting |
| **Bellman-Ford** | Edge Relaxation DP | ✅ Yes (Detects negative cycles) | $\mathcal{O}(V \cdot E)$ | $\mathcal{O}(V)$ | Dynamic delivery credit loops, toll discounts, forex arbitrage |

---

### 2. Multi-Stop Route Optimization & TSP (`src/algorithms/tsp.ts`)

| Algorithm | Approach | Optimality | Time Complexity | Stop Capacity |
| :--- | :--- | :--- | :--- | :--- |
| **Nearest Neighbor** | Greedy Heuristic | Approximation (Good) | $\mathcal{O}(N^2)$ | Hundreds of stops |
| **Held-Karp (Bitmask DP)** | Dynamic Programming | 100% Mathematically Optimal | $\mathcal{O}(2^N \cdot N^2)$ | Up to 12 stops |
| **2-Opt Local Search** | Geometric Edge Untangling | Local Optimum | $\mathcal{O}(N^2)$ per pass | 500+ stops |

---

### 3. Sorting Algorithms (`src/algorithms/sorting.ts`)

| Algorithm | Best Time | Average Time | Worst Time | Space | Stable? | Method |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Quick Sort** | $\mathcal{O}(N \log N)$ | $\mathcal{O}(N \log N)$ | $\mathcal{O}(N^2)$ | $\mathcal{O}(\log N)$ | ❌ No | Lomuto Partitioning |
| **Merge Sort** | $\mathcal{O}(N \log N)$ | $\mathcal{O}(N \log N)$ | $\mathcal{O}(N \log N)$ | $\mathcal{O}(N)$ | ✅ Yes | Divide & Conquer |
| **Heap Sort** | $\mathcal{O}(N \log N)$ | $\mathcal{O}(N \log N)$ | $\mathcal{O}(N \log N)$ | $\mathcal{O}(1)$ | ❌ No | Binary Max-Heap Selection |
| **Insertion Sort** | $\mathcal{O}(N)$ | $\mathcal{O}(N^2)$ | $\mathcal{O}(N^2)$ | $\mathcal{O}(1)$ | ✅ Yes | Adaptive Shifting (Cards) |
| **Selection Sort** | $\mathcal{O}(N^2)$ | $\mathcal{O}(N^2)$ | $\mathcal{O}(N^2)$ | $\mathcal{O}(1)$ | ❌ No | Minimum Extraction |
| **Bubble Sort** | $\mathcal{O}(N)$ | $\mathcal{O}(N^2)$ | $\mathcal{O}(N^2)$ | $\mathcal{O}(1)$ | ✅ Yes | Adjacent Exchanges |

---

## 🎯 Standout Innovations

1. **Slow-Motion & Single-Step Control:**
   - Default **350ms educational speed** with instant buttons: **🐢 Slow-Mo (700ms)**, **🚶 Normal (350ms)**, and **⚡ Fast (70ms)**.
   - **Step ❯ Button:** Freeze execution and click to advance one comparison or swap at a time!
2. **Explicit Target Movement Badges:**
   - Swapping elements display dynamic pointers: `⇄ TO #7` (Card 3 shows it is moving to position 7, Card 7 shows it is moving to position 3).
3. **Interactive Pseudocode Drawer:**
   - Built directly into [AlgorithmInfoCard.tsx](file:///src/components/analytics/AlgorithmInfoCard.tsx) and [SortingView.tsx](file:///src/components/visualizer/SortingView.tsx). Toggle between **Textbook Pseudocode** and **Production JavaScript/TypeScript** with one-click copy.
4. **Web Audio Frequency Synthesizer:**
   - Real-time tone generation via browser oscillator nodes ($220\,\text{Hz} - 880\,\text{Hz}$) corresponding to element values, providing acoustic reinforcement of entropy reduction.

---

## 💻 Getting Started in 10 Seconds

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Run the App Locally
```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```
Open your browser at: **`http://localhost:5173`**

### Build Production Bundle
```bash
npm run build
```
Generates optimized static bundle in `dist/`.

---

## 📂 Project Architecture & Organization

```
ALGO/
├── public/                           # Static web assets (favicon.svg)
├── src/                              # AlgoLenz React + TypeScript source code
│   ├── algorithms/                   # Pure mathematical algorithm engines
│   │   ├── dijkstra.ts               # Dijkstra's shortest path
│   │   ├── aStar.ts                  # A* heuristic Manhattan search
│   │   ├── bfs.ts                    # Breadth-First Search
│   │   ├── dfs.ts                    # Depth-First Search
│   │   ├── bellmanFord.ts            # Bellman-Ford negative edge solver
│   │   ├── tsp.ts                    # Held-Karp Bitmask DP & Nearest Neighbor
│   │   └── sorting.ts                # 6 sorting algorithms emitting step events
│   ├── components/                   # Modular React UI components
│   │   ├── analytics/                # Telemetry panels & algorithm info cards
│   │   ├── controls/                 # Tool selection, speed slider, playback controls
│   │   ├── layout/                   # Header navbar & footer
│   │   └── visualizer/               # 5 visualizer view modes (Grid, Map, TSP, etc.)
│   ├── context/                      # React state management (VisualizerContext.tsx)
│   ├── types/                        # TypeScript types & interface declarations
│   ├── utils/                        # Audio synthesizer (SoundFX), grid generator, city hubs
│   ├── App.tsx                       # Root view shell & tab controller
│   ├── index.css                     # Tailwind CSS & custom design system
│   └── main.tsx                      # Vite React root mount
│
├── docs/                             # BCA-5005 Academic Project Deliverables & Reports
│   ├── README.md                     # Documentation index & compilation guide
│   ├── project_report.pdf            # 50-Page Formal Minor Project Report (PDF)
│   ├── project_report.docx           # Editable Word document format
│   ├── project_report.html           # Interactive HTML report preview
│   ├── project_diary.pdf             # 21-Page Progress Diary (PDF)
│   ├── project_diary.docx            # Editable Word diary format
│   ├── project_diary.html            # Progress diary HTML preview
│   ├── PROJECT_DIARY_BCA5005.md      # Raw markdown diary transcript
│   ├── front_page.pdf                # University assignment cover page (PDF)
│   ├── front_page.docx               # Editable cover page format
│   ├── front_page.html               # Cover page HTML preview
│   ├── project_synopsis.pdf          # Official Project Synopsis (PDF)
│   ├── project_synopsis.tex          # Project Synopsis LaTeX source
│   ├── synopsis_preview.html         # Synopsis HTML compiler preview
│   ├── ALGORITHM_CODE_AND_PSEUDOCODE.md # 13-algorithm proofs & pseudocode guide
│   └── assets/                       # University crests & college logos (CSJMU & PSIT)
│
├── images/                           # Application screenshots & visual benchmarks
│   ├── screenshot_grid.png           # 2D Grid pathfinding visualizer
│   ├── screenshot_comparison.png     # Side-by-side comparison battle arena
│   ├── screenshot_multistop.png      # TSP multi-stop delivery dispatcher
│   ├── screenshot_citymap.png        # Real-world city map routing (Leaflet)
│   └── screenshot_sorting.png        # Audio-visual sorting studio
│
├── scripts/                          # Automated build, PDF compilation & doc tools
│   ├── README.md                     # Scripts guide & documentation
│   ├── build_academic_50page_report.py # Generates 50-page HTML report
│   ├── build_50page_report.py        # Generates 50-page Word (.docx) report
│   ├── generate_diary_html.py        # Generates 21-page diary HTML
│   ├── generate_diary_docx.py        # Generates 21-page diary DOCX
│   ├── generate_frontpage.py         # Generates submission front page
│   ├── generate_report_pdf.cjs       # Compiles report HTML to PDF
│   ├── generate_pdf.cjs              # Compiles synopsis HTML to PDF
│   ├── capture_screenshots.py        # Playwright automatic UI screenshot capture
│   └── ...                           # Chapter content modules & test helpers
│
└── legacy/                           # Archived earlier prototypes
    └── vanilla-prototype/            # Original vanilla JS & CSS single-page prototype
        ├── README.md                 # Prototype notes
        ├── script.js                 # DOM-based visualizer script
        └── styles.css                # Swiss architectural stylesheet
```

---

## 🎓 Viva & Presentation Cheat Sheet

Common questions external examiners and professors ask about this project:

#### Q1: Why did you choose React and Vite instead of pure HTML/Canvas?
> **Answer:** React provides component-driven declarative state management (`VisualizerContext`). Every algorithm emits discrete step events (`compare`, `swap`, `visit`, `path`), which React translates into smooth CSS animations and reactive DOM cards. Vite provides instant sub-second Hot Module Replacement (HMR) and optimized build bundling.

#### Q2: What is the difference between Dijkstra and A*?
> **Answer:** Dijkstra is an uninformed greedy search exploring uniformly in all directions ($f(n) = g(n)$). A* is an informed heuristic search using $f(n) = g(n) + h(n)$, where $h(n)$ estimates remaining distance to the target (Manhattan distance). This directs A* towards the goal, visiting far fewer nodes while still guaranteeing an optimal path.

#### Q3: Why does Dijkstra fail on negative edge weights?
> **Answer:** Dijkstra assumes that once a vertex is removed from the priority queue and marked visited, its shortest distance is finalized. A negative edge discovered later can retroactively shorten an already visited path, invalidating Dijkstra's greedy choice. Bellman-Ford must be used instead.

#### Q4: What is the time complexity of the Traveling Salesperson Problem?
> **Answer:** TSP is NP-Hard. Brute-force checking all permutations takes $\mathcal{O}(N!)$ time. Our exact **Held-Karp algorithm** uses bitmask dynamic programming to reduce this to $\mathcal{O}(2^N \cdot N^2)$, solving up to 12 stops instantaneously. For larger stop counts, we use the **Nearest Neighbor Heuristic** in $\mathcal{O}(N^2)$.

#### Q5: What makes Merge Sort preferred for external/linked list sorting over Quick Sort?
> **Answer:** Merge Sort guarantees $\mathcal{O}(N \log N)$ worst-case time and is **stable** (preserves equal element ordering). Quick Sort degrades to $\mathcal{O}(N^2)$ in worst-case pivot selections and is not stable.

---

## 👥 Team & Contributors

**PSIT College of Higher Education, Kanpur**  
*Department of Computer Applications | Affiliated with C.S.J.M. University*

| Name | Roll Number | Major Area of Contribution |
| :--- | :--- | :--- |
| **Naitik** | `24116002322` | **Team Lead**, System Architecture, Pathfinding Engines & State Pipeline |
| **Kashish Gupta** | `24116002274` | Sorting Algorithm Engine, SoundFX & Web Audio Integration |
| **Naitik Mishra** | `24116002324` | Leaflet Geographic Map Engine & Multi-Stop TSP Heuristics |
| **Khushboo Rajpoot** | `24116002277` | Comparative Arena, Analytics Telemetry & Technical Documentation |

**Project Supervisor:** **Dr. Amit Yadav** *(Professor, Department of Computer Applications)*

---

<div align="center">
  <sub>AlgoLenz: Built with ❤️ for CS Education | PSIT Minor Project 2026–2027</sub>
</div>
