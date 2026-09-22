<div align="center">

# 🌐 AlgoLenz

### *VisuAlgo-Inspired Interactive Data Structures, Pathfinding & Sorting Visualization Platform*

[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-199900?style=for-the-badge&logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

<p align="center">
  <b>Transforming abstract computational complexity into intuitive, frame-by-frame visual experiences.</b>
  <br />
  Explore pathfinding algorithms, geographic route planning, multi-stop TSP delivery heuristics, and sorting audio-visualizers with live pseudocode and telemetry.
</p>

[Explore Modes](#-application-modes) •
[Algorithm Catalog](#-algorithm-catalog) •
[Getting Started](#-getting-started) •
[Architecture](#-system-architecture) •
[Team](#-team--contributors)

---

</div>

## 📖 Overview

Inspired by world-class educational platforms such as **VisuAlgo** (National University of Singapore), **AlgoLenz** bridges the pedagogical gap in computer science education. Rather than relying on static textbook graphs and dry pseudocode, AlgoLenz provides **real-time step inspection**, **audio-visual state synthesis**, **side-by-side benchmark battles**, and **real-world geographic map routing**.

Whether modeling food delivery route dispatching, avoiding dynamic traffic congestion, or analyzing array partition pivots, AlgoLenz makes algorithmic mechanics transparent and engaging.

---

## ✨ Key Features

- 🎯 **Interactive 2D Grid Visualizer**: Draw obstacles, paint traffic bottlenecks, place custom waypoints, and generate intricate procedural mazes.
- 🗺️ **Real-World Geographic City Routing**: Powered by **Leaflet.js**, project Dijkstra and A* algorithms directly onto real city maps and street networks.
- 🛵 **Multi-Stop Waypoint & TSP Optimizer**: Solve the NP-hard Traveling Salesperson Problem for multi-order pick-up and delivery dispatching.
- 📊 **Side-by-Side Algorithm Comparison**: Race algorithms simultaneously on identical input configurations to compare visited nodes, path lengths, and runtime (ms).
- 🔊 **Sorting Engine with Web Audio API**: Watch Bubble, Selection, Insertion, Merge, Quick, and Heap Sort with real-time sound synthesis reflecting element heights and swap entropy.
- 📜 **Synchronized Pseudocode & Call Inspector**: Follow execution line-by-line with real-time state variable tracking and algorithmic explanations.
- 🕹️ **Complete Playback Control**: Step forward, step backward, pause, adjust playback speed, or scrub through generation timelines.

---

## 🚀 Application Modes

| Mode | Description | Highlights |
| :--- | :--- | :--- |
| **Grid Pathfinding** | 2D interactive matrix canvas for graph traversals | Obstacle drawing, traffic costs (+2, +5, +10), 5 maze generators |
| **Comparison Arena** | Split-screen simultaneous benchmarking | Live metrics: execution time, nodes visited, path cost |
| **Multi-Stop (TSP)** | Delivery dispatch order optimization | Multi-restaurant pickup & customer delivery route planning |
| **Geographic City Map** | Real-world road graph routing with Leaflet | Dark stores, hubs, customer endpoints on actual coordinates |
| **Sorting Visualizer** | Array visualization with Web Audio synthesis | Bar charts, pivot indicators, swap counters, sound frequencies |

---

## 📚 Algorithm Catalog & Complexity

### 1. Pathfinding & Graph Traversals

| Algorithm | Type | Unweighted / Weighted | Time Complexity | Space Complexity | Guarantees Shortest Path? |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Dijkstra's Algorithm** | Greedy Priority Queue | Weighted | $\mathcal{O}((V + E) \log V)$ | $\mathcal{O}(V)$ | ✅ Yes |
| **A\* Search** | Heuristic ($g(n) + h(n)$) | Weighted | $\mathcal{O}(E)$ (optimal case) | $\mathcal{O}(V)$ | ✅ Yes (admissible heuristic) |
| **Breadth-First Search (BFS)** | Queue (FIFO) | Unweighted | $\mathcal{O}(V + E)$ | $\mathcal{O}(V)$ | ✅ Yes (unweighted graphs) |
| **Depth-First Search (DFS)** | Stack (LIFO / Recursion) | Unweighted | $\mathcal{O}(V + E)$ | $\mathcal{O}(V)$ | ❌ No |
| **Bellman-Ford** | Dynamic Programming | Weighted (incl. negative) | $\mathcal{O}(V \cdot E)$ | $\mathcal{O}(V)$ | ✅ Yes |
| **Traveling Salesperson (TSP)** | Heuristic / 2-Opt / DP | Complete Graph | NP-Hard ($\mathcal{O}(n^2 2^n)$) | $\mathcal{O}(n)$ | ⚡ Near-Optimal Heuristic |

### 2. Sorting Algorithms

| Algorithm | Best Time | Average Time | Worst Time | Space | Stable? |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Quick Sort** | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n^2)$ | $\mathcal{O}(\log n)$ | ❌ No |
| **Merge Sort** | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n)$ | ✅ Yes |
| **Heap Sort** | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n \log n)$ | $\mathcal{O}(1)$ | ❌ No |
| **Insertion Sort** | $\mathcal{O}(n)$ | $\mathcal{O}(n^2)$ | $\mathcal{O}(n^2)$ | $\mathcal{O}(1)$ | ✅ Yes |
| **Selection Sort** | $\mathcal{O}(n^2)$ | $\mathcal{O}(n^2)$ | $\mathcal{O}(n^2)$ | $\mathcal{O}(1)$ | ❌ No |
| **Bubble Sort** | $\mathcal{O}(n)$ | $\mathcal{O}(n^2)$ | $\mathcal{O}(n^2)$ | $\mathcal{O}(1)$ | ✅ Yes |

---

## 🛠️ Tech Stack

```
AlgoLenz
 ├── Frontend Framework  : React 18 (Functional Components + Hooks)
 ├── Language            : TypeScript 5.3 (Type-safe domain definitions)
 ├── Bundler & Dev Tool  : Vite 5 (Fast HMR & Optimized Bundling)
 ├── Styling & UI        : Tailwind CSS 3.4 + Lucide React Icons
 ├── Geospatial Mapping  : Leaflet 1.9 + React-Leaflet 4.2
 ├── Audio Synthesis     : Web Audio API (Dynamic Frequency Synthesis)
 └── State Management    : React Context API (VisualizerContext Pipeline)
```

---

## 📂 Project Structure

```
ALGO/
├── public/                     # Static assets (favicons, logos)
├── src/
│   ├── algorithms/             # Pure algorithmic TypeScript engines
│   │   ├── aStar.ts            # A* heuristic pathfinding
│   │   ├── bellmanFord.ts      # Bellman-Ford algorithm
│   │   ├── bfs.ts              # Breadth-First Search
│   │   ├── dfs.ts              # Depth-First Search
│   │   ├── dijkstra.ts         # Dijkstra's shortest path
│   │   ├── sorting.ts          # 6 dynamic sorting implementations
│   │   └── tsp.ts              # Traveling Salesperson solver
│   ├── components/
│   │   ├── analytics/          # StatsPanel, AlgorithmInfoCard, Complexity cards
│   │   ├── controls/           # ControlPanel, PlaybackBar, Speed sliders
│   │   ├── layout/             # Navbar, Footer, Navigation items
│   │   └── visualizer/         # GridVisualizer, CityMapView, ComparisonView,
│   │                           # MultiStopView, SortingView
│   ├── context/
│   │   └── VisualizerContext.tsx # Centralized execution & animation state
│   ├── types/
│   │   └── routing.ts          # Global interfaces, node types & step definitions
│   ├── utils/
│   │   ├── cityData.ts         # City street graph nodes and landmarks
│   │   ├── gridGenerator.ts    # Maze generation algorithms
│   │   └── SoundFX.ts          # Web Audio tone synthesizer
│   ├── App.tsx                 # Root application component & layout router
│   ├── index.css               # Global styles and Tailwind directives
│   └── main.tsx                # React DOM entrypoint
├── package.json                # Project dependencies and npm scripts
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.js          # Tailwind theme configuration
└── vite.config.ts              # Vite server & build configurations
```

---

## 💻 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 1. Clone the Repository

```bash
git clone https://github.com/NAITIK-builds/Algo.git
cd Algo
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

### 4. Build for Production

```bash
npm run build
```

The production-ready artifacts will be compiled into the `dist/` directory.

---

## 👥 Team & Contributors

This project was developed by students of **Bachelors of Computer Application (BCA)** at **PSIT College of Higher Education**, affiliated with **Chhatrapati Shahu Ji Maharaj University (CSJMU), Kanpur**.

| Name | Roll Number | Primary Role / Contribution |
| :--- | :--- | :--- |
| **Naitik** | `24116002322` | **Team Lead**, System Architecture, Graph Pathfinding Engine |
| **Kashish Gupta** | `24116002274` | Sorting Algorithm Engine & Web Audio Visualizer |
| **Naitik Mishra** | `24116002324` | Geospatial Map Engine (Leaflet) & Multi-Stop TSP Solver |
| **Khushboo Rajpoot** | `24116002277` | Comparative Benchmarking Arena & Analytics UI |

**Faculty Supervisor:** **Dr. Amit Yadav** (*Associate Professor, PSIT College of Higher Education*)

---

## 📄 References & Acknowledgments

- **VisuAlgo** by Dr. Steven Halim & Felix Halim (National University of Singapore) — [visualgo.net](https://visualgo.net/)
- Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2009). *Introduction to Algorithms* (3rd ed.). MIT Press.
- Dijkstra, E. W. (1959). *A note on two problems in connexion with graphs*. Numerische Mathematik.
- Hart, P. E., Nilsson, N. J., & Raphael, B. (1968). *A Formal Basis for the Heuristic Determination of Minimum Cost Paths*. IEEE Transactions on SSC.

---

<div align="center">
  <sub>Built with ❤️ by the AlgoLenz Team (2024–2025).</sub>
</div>
