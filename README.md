# 🌟 AlgoLenz — Interactive Algorithm & Data Structure Visualizer

<div align="center">

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9-199900?logo=leaflet&logoColor=white)

**An interactive, VisuAlgo-inspired learning platform for Pathfinding, Sorting, and Geographic Route Optimization.**

[Explore Features](#-core-modules) • [Getting Started](#-getting-started) • [Algorithms & Complexities](#-algorithms--complexities) • [Team & Credits](#-project-team--credits)

</div>

---

## 📖 Overview

**AlgoLenz** is an advanced interactive educational platform designed to transform complex Data Structures and Algorithms (DSA) into intuitive, step-by-step visual experiences. 

Computer science algorithms—ranging from graph search and spatial path planning to array sorting—often present steep conceptual hurdles when taught strictly through static diagrams and code listings. **AlgoLenz** bridges this gap by providing real-time canvas animations, synchronized line-by-line pseudocode execution, live variable tracking, concurrent side-by-side benchmarking, and real-world geographic map routing.

---

## ✨ Core Modules

### 1. 🗺️ Interactive Grid & Graph Visualization Engine
- **Dynamic 2D Matrix Grid**: Draw custom walls, place weight-cost terrains, and position custom Start and Target nodes.
- **Frontier Expansion**: Watch step-by-step frontier exploration (visited nodes, active queue/stack, and final optimal path reconstruction).
- **Maze Generators**: Built-in recursive division and random obstacle generation patterns.

### 2. 📊 Sorting Algorithm & Array Animation Module
- **Real-Time Array Visualizer**: Dynamic bar charts displaying element values, active comparisons, pivot points, and element swaps.
- **Audio Feedback (SoundFX)**: Web Audio API synthesis generating real-time frequencies proportional to bar values during comparisons and swaps.
- **Speed & Size Controls**: Dynamically adjust array length and playback speed from 0.25x to 4x.

### 3. 🔍 VisuAlgo-Style Synchronized Pseudocode Inspector
- **Line-by-Line Code Highlighting**: Synchronized pseudocode panel showing the exact line of code currently executing.
- **State Inspector**: Live tracking of loop counters, pointers, queue/stack contents, and step-by-step plain English explanations.

### 4. ⚡ Side-by-Side Multi-Algorithm Comparison
- **Concurrent Benchmarking**: Run two algorithms (e.g., **Dijkstra vs. A\*** or **Quick Sort vs. Merge Sort**) on identical input datasets simultaneously.
- **Live Telemetry Metrics**: Compare execution duration (ms), total nodes visited/inspected, path length, and memory overhead.

### 5. 📍 Multi-Stop Waypoint & TSP Optimization Engine
- **Traveling Salesperson Problem (TSP)**: Interactive waypoint planning across multiple stops.
- **Heuristic Solvers**: Nearest-Neighbor heuristics and 2-opt local search optimization to compute efficient closed-loop routes interactively.

### 6. 🌍 Real-World Geographic City Map Routing (Leaflet.js)
- **Geospatial Mapping**: Overlay graph algorithms directly onto real-world street networks and city coordinate landmarks using Leaflet.js.
- **Practical Relevance**: Demonstrates how theoretical graph search powers modern GPS navigation and ride-hailing routing engines.

---

## 🔬 Algorithms & Complexities

### 🚀 Pathfinding & Graph Algorithms
| Algorithm | Time Complexity | Space Complexity | Weighted? | Guarantees Shortest Path? |
| :--- | :---: | :---: | :---: | :---: |
| **Dijkstra's Algorithm** | $\mathcal{O}((V + E) \log V)$ | $\mathcal{O}(V)$ | ✅ Yes | ✅ Yes (Non-negative weights) |
| **A\* Search** | $\mathcal{O}(E)$ (Heuristic dependent) | $\mathcal{O}(V)$ | ✅ Yes | ✅ Yes (with Admissible Heuristic) |
| **Breadth-First Search (BFS)** | $\mathcal{O}(V + E)$ | $\mathcal{O}(V)$ | ❌ No | ✅ Yes (Unweighted only) |
| **Depth-First Search (DFS)** | $\mathcal{O}(V + E)$ | $\mathcal{O}(V)$ | ❌ No | ❌ No |
| **Bellman-Ford Algorithm** | $\mathcal{O}(V \times E)$ | $\mathcal{O}(V)$ | ✅ Yes | ✅ Yes (Detects negative cycles) |

### 🔢 Sorting Algorithms
| Algorithm | Best Time | Average Time | Worst Time | Space | Stable? |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Bubble Sort** | $\Omega(n)$ | $\Theta(n^2)$ | $\mathcal{O}(n^2)$ | $\mathcal{O}(1)$ | ✅ Yes |
| **Selection Sort** | $\Omega(n^2)$ | $\Theta(n^2)$ | $\mathcal{O}(n^2)$ | $\mathcal{O}(1)$ | ❌ No |
| **Insertion Sort** | $\Omega(n)$ | $\Theta(n^2)$ | $\mathcal{O}(n^2)$ | $\mathcal{O}(1)$ | ✅ Yes |
| **Merge Sort** | $\Omega(n \log n)$ | $\Theta(n \log n)$ | $\mathcal{O}(n \log n)$ | $\mathcal{O}(n)$ | ✅ Yes |
| **Quick Sort** | $\Omega(n \log n)$ | $\Theta(n \log n)$ | $\mathcal{O}(n^2)$ | $\mathcal{O}(\log n)$ | ❌ No |
| **Heap Sort** | $\Omega(n \log n)$ | $\Theta(n \log n)$ | $\mathcal{O}(n \log n)$ | $\mathcal{O}(1)$ | ❌ No |

---

## 🏗️ System Architecture

```text
┌──────────────────────────────────────────────────────────────┐
│                   User Interface Layer                       │
│    (Navbar, PlaybackBar, ControlPanel, AlgorithmInfoCard)    │
└──────────────────────────────┬───────────────────────────────┘
                               │
┌──────────────────────────────▼───────────────────────────────┐
│              VisualizerContext (State Pipeline)              │
│    - Play / Pause / Step Controls    - Speed & Grid Config  │
│    - Step Queue Dispatcher           - Real-time Telemetry   │
└──────────────┬───────────────────────────────┬───────────────┘
               │                               │
┌──────────────▼──────────────┐ ┌──────────────▼───────────────┐
│     Algorithmic Engines     │ │    Dual Graphics Renderer    │
│  - dijkstra.ts, aStar.ts    │ │  - HTML5 Canvas Engine       │
│  - sorting.ts, tsp.ts       │ │  - Leaflet.js Geospatial Map │
│  - bfs.ts, dfs.ts           │ │  - Web Audio API (SoundFX)   │
└─────────────────────────────┘ └──────────────────────────────┘
```

---

## 📂 Project Directory Structure

```text
ALGO/
├── public/                    # Static assets & favicons
├── src/
│   ├── algorithms/            # Core algorithmic engines
│   │   ├── aStar.ts           # A* Pathfinding with Manhattan heuristic
│   │   ├── bellmanFord.ts     # Bellman-Ford algorithm
│   │   ├── bfs.ts             # Breadth-First Search
│   │   ├── dfs.ts             # Depth-First Search
│   │   ├── dijkstra.ts        # Dijkstra's shortest path
│   │   ├── sorting.ts         # Bubble, Selection, Insertion, Merge, Quick, Heap
│   │   └── tsp.ts             # Traveling Salesperson Problem heuristic
│   ├── components/
│   │   ├── analytics/         # Statistics and pseudocode inspector
│   │   │   ├── AlgorithmInfoCard.tsx
│   │   │   └── StatsPanel.tsx
│   │   ├── controls/          # Playback and visualizer configuration
│   │   │   ├── ControlPanel.tsx
│   │   │   └── PlaybackBar.tsx
│   │   ├── layout/            # Navigation header and footer
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   └── visualizer/        # Viewport components
│   │       ├── CityMapView.tsx      # Leaflet real-world map routing
│   │       ├── ComparisonView.tsx   # Side-by-side benchmarking
│   │       ├── GridVisualizer.tsx   # 2D pathfinding grid
│   │       ├── MultiStopView.tsx    # Waypoint routing view
│   │       └── SortingView.tsx      # Dynamic bar chart sorting view
│   ├── context/
│   │   └── VisualizerContext.tsx    # Central state management
│   ├── types/
│   │   └── routing.ts         # TypeScript interfaces & types
│   ├── utils/
│   │   ├── cityData.ts        # Geographic coordinates & map points
│   │   ├── gridGenerator.ts   # Grid initialization and maze algorithms
│   │   └── SoundFX.ts         # Web Audio synthesizer
│   ├── App.tsx                # Main application component
│   ├── main.tsx               # Application entrypoint
│   └── index.css              # Global styles & Tailwind utilities
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # Tailwind CSS styling configuration
├── tsconfig.json              # TypeScript compiler settings
└── vite.config.ts             # Vite build configuration
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js and npm installed on your system:
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/NAITIK-builds/Algo.git
   cd Algo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173` to explore the visualizer.

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 👥 Project Team & Credits

This project was developed as a Bachelor of Computer Application (BCA) Project at **PSIT College of Higher Education, Kanpur** (Affiliated with **Chhatrapati Shahu Ji Maharaj University**).

### 🎓 Team Members
| Name | University Roll Number | Primary Contribution |
| :--- | :---: | :--- |
| **Naitik** *(Team Lead)* | `24116002322` | Core Architecture, State Pipeline & Pathfinding Engine |
| **Kashish Gupta** | `24116002274` | Sorting Algorithms & Web Audio SoundFX Synthesis |
| **Naitik Mishra** | `24116002324` | Geospatial Leaflet Map Engine & Multi-Stop TSP Solver |
| **Khushboo Rajpoot** | `24116002277` | Synchronized Pseudocode Inspector & Analytics Benchmarking |

### 👨‍🏫 Project Supervisor
- **Dr. Amit Yadav**, Associate Professor, PSIT College of Higher Education

---

## 📚 References & Acknowledgments

1. **VisuAlgo Platform**: Steven Halim & Felix Halim (National University of Singapore) — [visualgo.net](https://visualgo.net/)
2. **Introduction to Algorithms (CLRS)**: Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein (MIT Press).
3. **Dijkstra's Algorithm**: E. W. Dijkstra (1959), *Numerische Mathematik*.
4. **A\* Search Heuristic**: P. E. Hart, N. J. Nilsson, B. Raphael (1968), *IEEE Transactions on Systems Science and Cybernetics*.
5. **Leaflet.js**: Vladimir Agafonkin — [leafletjs.com](https://leafletjs.com/)

---

<div align="center">
  <sub>Built with ❤️ by the AlgoLenz Team</sub>
</div>
