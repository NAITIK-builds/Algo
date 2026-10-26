import os
import sys

# Ensure scripts directory in path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import report_expanded_ch1 as ech1
import report_expanded_ch2 as ech2
import report_expanded_ch3 as ech3
import report_expanded_ch4 as ech4
import report_expanded_ch5_6 as ech5_6
import report_annotated_code_and_proofs as eproofs
import report_user_manual_and_appendices as emanual
import report_ch2 as ch2_base

html_lines = []

html_lines.append("""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Minor Project Report (BCA-5005) - AlgoLenz</title>
<style>
  @page {
    size: A4 portrait;
    margin: 1.0in;
    @bottom-center {
      content: counter(page);
      font-family: 'Times New Roman', serif;
      font-size: 10pt;
    }
  }

  body {
    font-family: 'Times New Roman', Times, serif;
    font-size: 12pt;
    line-height: 1.15;
    color: #111111;
    background-color: #f4f6f8;
    margin: 0;
    padding: 20px 0;
  }

  .report-container {
    max-width: 8.27in;
    margin: 0 auto;
    background: #ffffff;
    box-shadow: 0 4px 15px rgba(0,0,0,0.12);
    padding: 1.0in;
    box-sizing: border-box;
  }

  @media print {
    body {
      background: #ffffff;
      padding: 0;
    }
    .report-container {
      box-shadow: none;
      padding: 0;
      max-width: 100%;
    }
    .page-break {
      page-break-before: always;
      break-before: page;
    }
    .no-print {
      display: none;
    }
  }

  .page-break {
    page-break-before: always;
    break-before: page;
    margin-top: 40px;
    padding-top: 20px;
    border-top: 1px dashed #d1d5db;
  }

  @media print {
    .page-break {
      margin-top: 0;
      padding-top: 0;
      border-top: none;
    }
  }

  h1.chapter-title {
    font-size: 16pt;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
    margin-top: 24px;
    margin-bottom: 18px;
    color: #000000;
  }

  h2.section-title {
    font-size: 14pt;
    font-weight: bold;
    text-align: left;
    margin-top: 20px;
    margin-bottom: 8px;
    color: #111111;
  }

  h3.subsection-title {
    font-size: 12.5pt;
    font-weight: bold;
    text-align: left;
    margin-top: 14px;
    margin-bottom: 6px;
    color: #222222;
  }

  p {
    font-size: 12pt;
    line-height: 1.15;
    text-align: justify;
    margin-top: 0;
    margin-bottom: 6pt;
    text-indent: 0;
  }

  .text-center { text-align: center; }
  .text-right { text-align: right; }
  .bold { font-weight: bold; }
  .italic { font-style: italic; }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 12px 0 16px 0;
    font-size: 10pt;
  }

  th, td {
    border: 1px solid #777777;
    padding: 6px 8px;
    text-align: left;
    vertical-align: top;
  }

  th {
    background-color: #f2f2f2;
    font-weight: bold;
  }

  pre.code-block {
    background-color: #f8f9fa;
    border: 1px solid #cccccc;
    border-left: 4px solid #2563eb;
    padding: 10px 12px;
    font-family: 'Courier New', Courier, monospace;
    font-size: 9pt;
    line-height: 1.25;
    white-space: pre-wrap;
    word-break: break-all;
    overflow-x: auto;
    margin: 8px 0 14px 0;
    color: #1e1e1e;
  }

  .cover-header {
    text-align: center;
    margin-bottom: 20px;
  }

  .cover-title {
    font-size: 15pt;
    font-weight: bold;
    margin: 12px 0;
    line-height: 1.3;
  }

  .cover-subtitle {
    font-size: 13pt;
    font-weight: bold;
    color: #1e3a8a;
    margin: 10px 0 20px 0;
    line-height: 1.35;
  }

  .cover-logo {
    max-height: 90px;
    margin: 8px auto;
    display: block;
  }

  .signature-table td {
    border: none;
    padding: 15px 5px;
  }

  .badge {
    display: inline-block;
    padding: 2px 6px;
    font-weight: bold;
    border-radius: 3px;
    font-size: 8.5pt;
  }
  .badge-pass { background-color: #dcfce7; color: #15803d; border: 1px solid #86efac; }
</style>
</head>
<body>

<div class="report-container">
""")

# ==========================================
# PAGE 1: COVER PAGE
# ==========================================
html_lines.append("""
<div class="cover-header">
  <img src="CSJMU_logo.jpg" alt="CSJMU Logo" class="cover-logo" onerror="this.style.display='none'">
  <div style="font-size: 16pt; font-weight: bold; margin-top: 8px;">Chhatrapati Shahu Ji Maharaj University, Kanpur</div>
  <div class="cover-title">PROJECT REPORT</div>
  <div class="italic" style="font-size: 12pt; margin-bottom: 6px;">on</div>
  <div class="cover-subtitle">AlgoLenz: VisuAlgo-Inspired Interactive Data Structures, Pathfinding & Sorting Visualization Platform</div>
  
  <p class="text-center italic" style="font-size: 11pt; margin-top: 15px;">Submitted in Partial Fulfillment of the Requirements for the Degree of</p>
  <div style="font-size: 14pt; font-weight: bold; margin-bottom: 20px;">Bachelor of Computer Applications (BCA)</div>

  <div style="font-size: 12pt; font-weight: bold; margin-bottom: 6px;">By:</div>
  <p class="text-center bold" style="line-height: 1.4; margin-bottom: 20px;">
    Naitik (Roll No: 24116002322)<br>
    Kashish Gupta (Roll No: 24116002274)<br>
    Naitik Mishra (Roll No: 24116002324)<br>
    Khushboo Rajpoot (Roll No: 24116002277)
  </p>

  <p class="text-center italic" style="font-size: 11.5pt; margin-bottom: 4px;">Under the Supervision of</p>
  <div style="font-size: 13pt; font-weight: bold;">Dr. Amit Yadav</div>
  <div style="font-size: 11pt; margin-bottom: 20px;">Professor, Department of Computer Applications</div>

  <img src="psit_logo.jpg" alt="PSIT Logo" class="cover-logo" onerror="this.style.display='none'">
  <div style="font-size: 14pt; font-weight: bold; margin-top: 6px;">PSIT College of Higher Education</div>
  <div style="font-size: 10pt;">Kanpur-Delhi National Highway (NH-19), Bhauti, Kanpur-209305 (U.P.), India</div>
  <div style="font-size: 11pt; font-weight: bold; margin-top: 8px;">Academic Session: 2026–2027</div>
</div>
""")

# ==========================================
# PAGE 2: CERTIFICATE
# ==========================================
html_lines.append("""
<div class="page-break"></div>
<h1 class="chapter-title">CERTIFICATE</h1>

<p style="margin-top: 30px; line-height: 1.35;">
This is to certify that project entitled <strong>“AlgoLenz: VisuAlgo-Inspired Interactive Data Structures, Pathfinding & Sorting Visualization Platform”</strong> submitted for partial fulfillment of the degree of BCA under the Department of Bachelor of Computer Application to through PSIT College of Higher Education, Kanpur, done by <strong>Naitik (Roll No: 24116002322), Kashish Gupta (Roll No: 24116002274), Naitik Mishra (Roll No: 24116002324), and Khushboo Rajpoot (Roll No: 24116002277)</strong> is an authentic work carried out by them under the guidance of <strong>Dr. Amit Yadav (Professor)</strong>. The matter embodied in this project work has not been submitted earlier for award of any degree or diploma to the best of my knowledge and belief.
</p>

<table class="signature-table" style="margin-top: 80px; width: 100%;">
  <tr>
    <td style="width: 50%;">
      ______________________________<br>
      <strong>Internal Examiner / Guide</strong><br>
      (Dr. Amit Yadav)
    </td>
    <td style="width: 50%; text-align: right;">
      ______________________________<br>
      <strong>External Examiner</strong><br>
      (External Faculty / Assessor)
    </td>
  </tr>
  <tr>
    <td style="padding-top: 60px;">
      ______________________________<br>
      <strong>Head of Department</strong><br>
      (Dr. Pragati Upadhyay)
    </td>
    <td></td>
  </tr>
</table>
""")

# ==========================================
# PAGE 3: DECLARATION
# ==========================================
html_lines.append("""
<div class="page-break"></div>
<h1 class="chapter-title">DECLARATION</h1>

<p style="margin-top: 30px; line-height: 1.35;">
I hereby declare that the project entitled <strong>“AlgoLenz: VisuAlgo-Inspired Interactive Data Structures, Pathfinding & Sorting Visualization Platform”</strong> submitted for the Bachelor of Computer Application degree is my original work and the project has not formed the basis for the award of any other degree of the university or other institute of higher learning, except where due acknowledgment has been made in the text.
</p>

<div class="bold" style="margin-top: 40px; margin-bottom: 20px;">Signature of the students:</div>

<table class="signature-table" style="width: 100%;">
  <tr>
    <td style="width: 70%;">
      <strong>Naitik</strong> (Roll No: 24116002322)<br>
      BCA, PSIT College of Higher Education, Kanpur
    </td>
    <td style="width: 30%; text-align: right; vertical-align: bottom;">
      _______________________
    </td>
  </tr>
  <tr>
    <td>
      <strong>Kashish Gupta</strong> (Roll No: 24116002274)<br>
      BCA, PSIT College of Higher Education, Kanpur
    </td>
    <td style="text-align: right; vertical-align: bottom;">
      _______________________
    </td>
  </tr>
  <tr>
    <td>
      <strong>Naitik Mishra</strong> (Roll No: 24116002324)<br>
      BCA, PSIT College of Higher Education, Kanpur
    </td>
    <td style="text-align: right; vertical-align: bottom;">
      _______________________
    </td>
  </tr>
  <tr>
    <td>
      <strong>Khushboo Rajpoot</strong> (Roll No: 24116002277)<br>
      BCA, PSIT College of Higher Education, Kanpur
    </td>
    <td style="text-align: right; vertical-align: bottom;">
      _______________________
    </td>
  </tr>
</table>
""")

# ==========================================
# PAGE 4: ACKNOWLEDGEMENT
# ==========================================
html_lines.append("""
<div class="page-break"></div>
<h1 class="chapter-title">ACKNOWLEDGEMENT</h1>

<p style="margin-top: 25px;">
Presentation inspiration and motivation have always played a key role in the success of any venture.
</p>
<p>
I express my sincere thanks to <strong>Dr. Harit Kumar</strong>, Director, PSIT College of Higher Education, Kanpur, for his visionary administrative guidance and for providing the modern laboratory infrastructure and technical computing ecosystem that made this undertaking feasible.
</p>
<p>
I pay my deep sense of gratitude to <strong>Dr. Pragati Upadhyay</strong> (HOD) of BCA Department, PSIT College of Higher Education, to encourage me to the highest peak and to provide me the opportunity to prepare the project. Her valuable critiques, academic leadership, and continuous encouragement established a rigorous engineering benchmark throughout the project duration. I am immensely obliged to my friends and team members for their elevating inspiration, encouraging guidance and kind supervision in the completion of my project.
</p>
<p>
I feel to acknowledge my indebtedness and deep sense of gratitude to my guide <strong>Dr. Amit Yadav</strong> (Professor) whose valuable guidance, profound algorithmic insights, and kind supervision given to me throughout the course shaped the present work as its show. His meticulous advice during state-machine formulation and performance benchmarking proved indispensable.
</p>
<p>
Last, but not the least, my parents are also an important inspiration for me. Their unconditional support, patience, and moral grounding have been my pillar of strength throughout this academic endeavor. So with due regards, I express my gratitude to them.
</p>

<div class="text-right bold" style="margin-top: 50px; line-height: 1.35; font-size: 11pt;">
  Naitik (24116002322)<br>
  Kashish Gupta (24116002274)<br>
  Naitik Mishra (24116002324)<br>
  Khushboo Rajpoot (24116002277)<br>
  Department of Computer Applications<br>
  PSIT College of Higher Education, Kanpur
</div>
""")

# ==========================================
# PAGE 5: TABLE OF CONTENTS
# ==========================================
html_lines.append("""
<div class="page-break"></div>
<h1 class="chapter-title">TABLE OF CONTENTS</h1>

<table>
  <thead>
    <tr>
      <th style="width: 12%; text-align: center;">S.No</th>
      <th style="width: 76%;">Topic / Chapter Details</th>
      <th style="width: 12%; text-align: center;">Page No</th>
    </tr>
  </thead>
  <tbody>
""")

toc_items = [
    ("1", "Certificate", "ii"),
    ("2", "Declaration", "iii"),
    ("3", "Acknowledgement", "iv"),
    ("4", "Abstract & Pedagogical Scope", "v"),
    ("5", "Chapter-I: Introduction", "1"),
    ("", "&nbsp;&nbsp;1.1 Introduction to AlgoLenz & Algorithm Visualization", "1"),
    ("", "&nbsp;&nbsp;&nbsp;&nbsp;1.1.1 Background and Evolution of Algorithm Visualization", "1"),
    ("", "&nbsp;&nbsp;&nbsp;&nbsp;1.1.2 The Cognitive Science Behind Algorithm Animation", "4"),
    ("", "&nbsp;&nbsp;1.2 Theoretical Foundation of Algorithm Analysis & Complexity", "6"),
    ("", "&nbsp;&nbsp;&nbsp;&nbsp;1.2.1 Asymptotic Analysis and Mathematical Notations", "6"),
    ("", "&nbsp;&nbsp;&nbsp;&nbsp;1.2.2 Divide-and-Conquer Recurrences & Master Theorem", "9"),
    ("", "&nbsp;&nbsp;&nbsp;&nbsp;1.2.3 Graph Theory Foundations & Complexity Classes (P vs NP)", "11"),
    ("", "&nbsp;&nbsp;1.3 Existing System & Instructional Bottlenecks", "13"),
    ("", "&nbsp;&nbsp;&nbsp;&nbsp;1.3.1 Historical Pedagogy and Traditional Mediums", "13"),
    ("", "&nbsp;&nbsp;&nbsp;&nbsp;1.3.2 Critical Audit of Existing Software Visualizers", "15"),
    ("", "&nbsp;&nbsp;1.4 Problems in Existing System", "17"),
    ("", "&nbsp;&nbsp;1.5 Proposed System: Architecture & Interactive Paradigms", "19"),
    ("", "&nbsp;&nbsp;1.6 Objectives of the Project", "22"),
    ("", "&nbsp;&nbsp;1.7 Scope and Practical Applications", "24"),
    ("6", "Chapter-II: Modules, System Requirements & Technology Stack", "26"),
    ("", "&nbsp;&nbsp;2.1 Modules Overview & Detailed Architecture Breakdown", "26"),
    ("", "&nbsp;&nbsp;&nbsp;&nbsp;2.1.1 Architectural Modularity & Separation of Concerns", "26"),
    ("", "&nbsp;&nbsp;&nbsp;&nbsp;2.1.2 Module 1: 2D Interactive Grid Pathfinding Visualizer", "27"),
    ("", "&nbsp;&nbsp;&nbsp;&nbsp;2.1.3 Module 2: Graph Traversal & Heuristic Pathfinding Engines", "29"),
    ("", "&nbsp;&nbsp;&nbsp;&nbsp;2.1.4 Module 3: Procedural Maze & Terrain Generators", "32"),
    ("", "&nbsp;&nbsp;&nbsp;&nbsp;2.1.5 Module 4: Real-World Geospatial Map Routing (Leaflet.js)", "34"),
    ("", "&nbsp;&nbsp;&nbsp;&nbsp;2.1.6 Module 5: Multi-Stop Dispatch & TSP Optimizer", "36"),
    ("", "&nbsp;&nbsp;&nbsp;&nbsp;2.1.7 Module 6: Audio-Visual Sorting Engine & Web Audio", "38"),
    ("", "&nbsp;&nbsp;&nbsp;&nbsp;2.1.8 Module 7: Comparative Benchmarking Arena", "40"),
    ("", "&nbsp;&nbsp;&nbsp;&nbsp;2.1.9 Module 8: Synchronized Pseudocode Inspector & Playback", "42"),
    ("", "&nbsp;&nbsp;2.2 System Requirements Specification", "44"),
    ("", "&nbsp;&nbsp;&nbsp;&nbsp;2.2.1 Hardware Requirements (Developer & End-User)", "44"),
    ("", "&nbsp;&nbsp;&nbsp;&nbsp;2.2.2 Software Requirements & Toolchain Runtime", "45"),
    ("", "&nbsp;&nbsp;2.3 Technology Used in Project (React 18, TypeScript 5, Vite, Tailwind)", "46"),
    ("7", "Chapter-III: Feasibility Study, SDLC & System Modeling", "49"),
    ("", "&nbsp;&nbsp;3.1 Comprehensive Feasibility Study", "49"),
    ("", "&nbsp;&nbsp;&nbsp;&nbsp;3.1.1 Technical Feasibility Analysis", "49"),
    ("", "&nbsp;&nbsp;&nbsp;&nbsp;3.1.2 Operational Feasibility Analysis", "51"),
    ("", "&nbsp;&nbsp;&nbsp;&nbsp;3.1.3 Economic Feasibility Analysis", "53"),
    ("", "&nbsp;&nbsp;&nbsp;&nbsp;3.1.4 Schedule & Legal Feasibility Analysis", "54"),
    ("", "&nbsp;&nbsp;3.2 Software Development Life Cycle (Agile Scrum Methodology)", "55"),
    ("", "&nbsp;&nbsp;&nbsp;&nbsp;3.2.1 Agile Iterative Framework Rationale", "55"),
    ("", "&nbsp;&nbsp;&nbsp;&nbsp;3.2.2 Detailed Sprint Breakdown & Milestones", "56"),
    ("", "&nbsp;&nbsp;&nbsp;&nbsp;3.2.3 Formal User Stories & Acceptance Criteria", "58"),
    ("", "&nbsp;&nbsp;3.3 Data Flow Diagrams (DFDs)", "60"),
    ("", "&nbsp;&nbsp;&nbsp;&nbsp;3.3.1 Level 0 DFD (Context Level Diagram)", "60"),
    ("", "&nbsp;&nbsp;&nbsp;&nbsp;3.3.2 Level 1 DFD (Subsystem Decomposition)", "61"),
    ("", "&nbsp;&nbsp;&nbsp;&nbsp;3.3.3 Level 2 DFD (Pathfinding Execution Pipeline)", "63"),
    ("", "&nbsp;&nbsp;3.4 Unified Modeling Language (UML) Modeling", "65"),
    ("", "&nbsp;&nbsp;&nbsp;&nbsp;3.4.1 Use Case Specifications & Actor Roles", "65"),
    ("", "&nbsp;&nbsp;&nbsp;&nbsp;3.4.2 Sequence Diagrams & Dynamic Interactions", "67"),
    ("", "&nbsp;&nbsp;&nbsp;&nbsp;3.4.3 State Machine Diagram of GridNode Lifecycle", "69"),
    ("8", "Chapter-IV: Data Architecture, Detailed Algorithms & Snapshots", "71"),
    ("", "&nbsp;&nbsp;4.1 Data Architecture & Schema Design", "71"),
    ("", "&nbsp;&nbsp;&nbsp;&nbsp;4.1.1 In-Memory Graph Data Structures & Memory Optimization", "71"),
    ("", "&nbsp;&nbsp;&nbsp;&nbsp;4.1.2 GridNode Structural Interface Specification", "72"),
    ("", "&nbsp;&nbsp;&nbsp;&nbsp;4.1.3 Animation Event Schemas (AlgorithmStep & SortingStep)", "74"),
    ("", "&nbsp;&nbsp;&nbsp;&nbsp;4.1.4 Geospatial Landmark Graph Model (CityHubNode)", "76"),
    ("", "&nbsp;&nbsp;4.2 Algorithm Formulations & Detailed Pseudocode", "77"),
    ("", "&nbsp;&nbsp;&nbsp;&nbsp;4.2.1 Dijkstra’s Algorithm with Min-Heap Priority Queue", "77"),
    ("", "&nbsp;&nbsp;&nbsp;&nbsp;4.2.2 A* Heuristic Search with Admissible Distance Metrics", "80"),
    ("", "&nbsp;&nbsp;&nbsp;&nbsp;4.2.3 Bellman-Ford Algorithm & Negative Cycle Detection", "83"),
    ("", "&nbsp;&nbsp;&nbsp;&nbsp;4.2.4 Traveling Salesperson Problem (TSP) with 2-Opt Heuristic", "86"),
    ("", "&nbsp;&nbsp;&nbsp;&nbsp;4.2.5 Quick Sort with Lomuto Partition Scheme", "89"),
    ("", "&nbsp;&nbsp;4.3 Screen Snapshots & Telemetry Walkthrough", "91"),
    ("9", "Chapter-V: Testing, Quality Assurance & Optimization", "95"),
    ("", "&nbsp;&nbsp;5.1 Testing Strategy & Quality Assurance Framework", "95"),
    ("", "&nbsp;&nbsp;5.2 Comprehensive Test Cases Specification Table (25 Test Cases)", "97"),
    ("", "&nbsp;&nbsp;5.3 Rendering Performance & 60 FPS Frame Budget Analysis", "101"),
    ("10", "Chapter-VI: Conclusion, Limitations & Future Scope", "104"),
    ("", "&nbsp;&nbsp;6.1 Conclusion & Summary of Accomplishments", "104"),
    ("", "&nbsp;&nbsp;6.2 Limitations of the Current Implementation", "107"),
    ("", "&nbsp;&nbsp;6.3 Future Scope & Technological Enhancements", "109"),
    ("11", "Chapter-VII: System User Manual & Deployment Guide", "111"),
    ("", "&nbsp;&nbsp;7.1 System Installation & Deployment Guide", "111"),
    ("", "&nbsp;&nbsp;7.2 Interactive 2D Grid Canvas Operation Manual", "113"),
    ("", "&nbsp;&nbsp;7.3 Real-World Geospatial Map Routing User Manual", "115"),
    ("", "&nbsp;&nbsp;7.4 Multi-Stop Waypoint Dispatch & TSP Optimizer Manual", "116"),
    ("", "&nbsp;&nbsp;7.5 Audio-Visual Sorting Laboratory Operation Manual", "118"),
    ("", "&nbsp;&nbsp;7.6 Dual-Algorithm Comparative Benchmarking Arena", "119"),
    ("", "&nbsp;&nbsp;7.7 Troubleshooting & Operational Edge Cases", "121"),
    ("12", "Chapter-VIII: Formal Mathematical Proofs of Correctness", "123"),
    ("", "&nbsp;&nbsp;8.1 Proof of Dijkstra's Algorithm by Mathematical Induction", "123"),
    ("", "&nbsp;&nbsp;8.2 Mathematical Proof of A* Optimality with Consistent Heuristics", "125"),
    ("", "&nbsp;&nbsp;8.3 Proof of Bellman-Ford Convergence in |V|-1 Iterations", "127"),
    ("", "&nbsp;&nbsp;8.4 Geometric Untangling Proof of 2-Opt Heuristic for TSP", "129"),
    ("13", "Chapter-IX: Production Source Code Modules & Annotations", "131"),
    ("", "&nbsp;&nbsp;9.1 Bellman-Ford Algorithm Engine (src/algorithms/bellmanFord.ts)", "131"),
    ("", "&nbsp;&nbsp;9.2 Traveling Salesperson Problem (src/algorithms/tsp.ts)", "134"),
    ("", "&nbsp;&nbsp;9.3 Audio-Visual Sorting Engine (src/algorithms/sorting.ts)", "138"),
    ("", "&nbsp;&nbsp;9.4 Procedural Maze Generator (src/utils/gridGenerator.ts)", "142"),
    ("", "&nbsp;&nbsp;9.5 State Management Provider (src/context/VisualizerContext.tsx)", "145"),
    ("14", "References & Academic Bibliography", "149")
]

for s_no, topic, pg in toc_items:
    bold_cls = "bold" if s_no != "" else ""
    bg_style = "style='background-color: #fafafa;'" if s_no != "" else ""
    html_lines.append(f"""
    <tr {bg_style}>
      <td style="text-align: center;" class="{bold_cls}">{s_no}</td>
      <td class="{bold_cls}">{topic}</td>
      <td style="text-align: center;" class="{bold_cls}">{pg}</td>
    </tr>
    """)

html_lines.append("""
  </tbody>
</table>
""")

# ==========================================
# PAGE 6: ABSTRACT
# ==========================================
html_lines.append("""
<div class="page-break"></div>
<h1 class="chapter-title">ABSTRACT</h1>

<p>
In computer science education, understanding Data Structures and Algorithms (DSA) represents both the most crucial foundational competency and one of the steepest intellectual hurdles encountered by undergraduate students. Foundational concepts such as priority queue edge relaxations, recursive divide-and-conquer partitioning, dynamic programming state caching, heuristic search space pruning, and graph traversals are inherently dynamic, transient, and multi-dimensional. Traditional instructional paradigms—relying primarily on static textbook printouts, chalkboards, and slide decks—present substantial cognitive friction because they compress dynamic execution paths into frozen snapshots, forcing students to simulate complex state transitions mentally.
</p>
<p>
To address this pedagogical divide, this project presents <strong>AlgoLenz</strong>: an interactive, high-performance web-based algorithm visualization and telemetry benchmarking platform modeled after internationally recognized educational tools such as VisuAlgo (National University of Singapore). AlgoLenz transforms theoretical computational complexity into intuitive, real-time visual and auditory experiences. Developed entirely using modern frontend engineering principles—incorporating React 18, TypeScript 5.3, Vite 5, Tailwind CSS 3.4, and the native HTML5 Canvas and Web Audio APIs—the platform implements a fully decoupled architecture that strictly separates algorithmic computation from visual state orchestration.
</p>
<p>
AlgoLenz incorporates five comprehensive functional suites: (1) an Interactive 2D Grid Pathfinding Canvas simulating Dijkstra’s algorithm, A* heuristic search, Breadth-First Search (BFS), Depth-First Search (DFS), and Bellman-Ford across arbitrary weighted terrains and procedural mazes; (2) a Real-World Geospatial City Map Routing Engine utilizing Leaflet.js and OpenStreetMap to project shortest path computations onto actual urban road networks; (3) a Multi-Stop Waypoint & Delivery Dispatch Optimizer solving the NP-Hard Traveling Salesperson Problem (TSP) using Nearest Neighbor heuristics and Held-Karp Dynamic Programming; (4) a Comparative Benchmarking Arena running dual algorithms concurrently on identical graphs to benchmark runtime execution, search-space expansion, and path cost; and (5) an Audio-Visual Sorting Engine visualizing six fundamental sorting algorithms with real-time pitch synthesis reflecting element magnitudes and swap operations.
</p>
<p>
Through bidirectional timeline scrubbing, synchronized line-by-line pseudocode highlighting, and comprehensive live telemetry displays, AlgoLenz bridges the gap between abstract algorithmic theory and tangible runtime mechanics, establishing an exemplary educational resource for modern computing curricula.
</p>

<p class="bold italic" style="margin-top: 25px;">
Keywords: Algorithm Visualization, Computational Complexity, Pathfinding, Heuristic Search, Graph Theory, Traveling Salesperson Problem, Web Audio API, Computer Science Pedagogy.
</p>
""")

# ==========================================
# CHAPTER I: INTRODUCTION
# ==========================================
html_lines.append(f"""
<div class="page-break"></div>
<h1 class="chapter-title">{ech1.CH1_TITLE}</h1>
""")

for sec in ech1.CH1_SECTIONS:
    html_lines.append(f'<h2 class="section-title">{sec["title"]}</h2>')
    for subsec in sec["subsections"]:
        html_lines.append(f'<h3 class="subsection-title">{subsec["subtitle"]}</h3>')
        for p_txt in subsec["paragraphs"]:
            html_lines.append(f'<p>{p_txt}</p>')

# ==========================================
# CHAPTER II: MODULES & REQUIREMENTS
# ==========================================
html_lines.append(f"""
<div class="page-break"></div>
<h1 class="chapter-title">{ech2.CH2_TITLE}</h1>
""")

for sec in ech2.CH2_SECTIONS:
    html_lines.append(f'<h2 class="section-title">{sec["title"]}</h2>')
    for subsec in sec["subsections"]:
        html_lines.append(f'<h3 class="subsection-title">{subsec["subtitle"]}</h3>')
        for p_txt in subsec["paragraphs"]:
            html_lines.append(f'<p>{p_txt}</p>')

html_lines.append('<h3 class="subsection-title">Hardware Requirements Specification Table</h3>')
html_lines.append('<table><thead><tr><th>Category</th><th>Minimum Specification</th><th>Recommended Specification</th></tr></thead><tbody>')
for r in ch2_base.HW_REQ_DATA[1:]:
    html_lines.append(f'<tr><td class="bold">{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td></tr>')
html_lines.append('</tbody></table>')

html_lines.append('<h3 class="subsection-title">Software Requirements Specification Table</h3>')
html_lines.append('<table><thead><tr><th>Component</th><th>Developer Environment</th><th>Client Runtime Environment</th></tr></thead><tbody>')
for r in ch2_base.SW_REQ_DATA[1:]:
    html_lines.append(f'<tr><td class="bold">{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td></tr>')
html_lines.append('</tbody></table>')

# ==========================================
# CHAPTER III: FEASIBILITY & SDLC
# ==========================================
html_lines.append(f"""
<div class="page-break"></div>
<h1 class="chapter-title">{ech3.CH3_TITLE}</h1>
""")

for sec in ech3.CH3_SECTIONS:
    html_lines.append(f'<h2 class="section-title">{sec["title"]}</h2>')
    for subsec in sec["subsections"]:
        html_lines.append(f'<h3 class="subsection-title">{subsec["subtitle"]}</h3>')
        for p_txt in subsec["paragraphs"]:
            html_lines.append(f'<p>{p_txt}</p>')

# ==========================================
# CHAPTER IV: DATA ARCHITECTURE & ALGORITHMS
# ==========================================
html_lines.append(f"""
<div class="page-break"></div>
<h1 class="chapter-title">{ech4.CH4_TITLE}</h1>
""")

for sec in ech4.CH4_SECTIONS:
    html_lines.append(f'<h2 class="section-title">{sec["title"]}</h2>')
    for subsec in sec["subsections"]:
        html_lines.append(f'<h3 class="subsection-title">{subsec["subtitle"]}</h3>')
        for p_txt in subsec["paragraphs"]:
            html_lines.append(f'<p>{p_txt}</p>')
        if "code" in subsec:
            html_lines.append(f'<pre class="code-block">{subsec["code"]}</pre>')

# ==========================================
# CHAPTER V: TESTING & QUALITY ASSURANCE
# ==========================================
html_lines.append(f"""
<div class="page-break"></div>
<h1 class="chapter-title">{ech5_6.CH5_TITLE}</h1>
""")

for sec in ech5_6.CH5_SECTIONS:
    html_lines.append(f'<h2 class="section-title">{sec["title"]}</h2>')
    for subsec in sec["subsections"]:
        html_lines.append(f'<h3 class="subsection-title">{subsec["subtitle"]}</h3>')
        for p_txt in subsec["paragraphs"]:
            html_lines.append(f'<p>{p_txt}</p>')

html_lines.append('<h3 class="subsection-title">Comprehensive Test Cases Execution Matrix (25 Test Cases)</h3>')
html_lines.append('<table><thead><tr><th style="text-align:center;">Test ID</th><th>Module / Algorithm</th><th>Input Condition</th><th>Expected Output</th><th style="text-align:center;">Result</th></tr></thead><tbody>')
for r in ech5_6.TEST_CASES_EXPANDED:
    html_lines.append(f'<tr><td style="text-align:center;" class="bold">{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td style="text-align:center;"><span class="badge badge-pass">{r[4]}</span></td></tr>')
html_lines.append('</tbody></table>')

# ==========================================
# CHAPTER VI: CONCLUSION & FUTURE SCOPE
# ==========================================
html_lines.append(f"""
<div class="page-break"></div>
<h1 class="chapter-title">{ech5_6.CH6_TITLE}</h1>
""")

for sec in ech5_6.CH6_SECTIONS:
    html_lines.append(f'<h2 class="section-title">{sec["title"]}</h2>')
    for subsec in sec["subsections"]:
        html_lines.append(f'<h3 class="subsection-title">{subsec["subtitle"]}</h3>')
        for p_txt in subsec["paragraphs"]:
            html_lines.append(f'<p>{p_txt}</p>')

# ==========================================
# CHAPTER VII: SYSTEM USER MANUAL
# ==========================================
html_lines.append("""
<div class="page-break"></div>
<h1 class="chapter-title">CHAPTER-VII: SYSTEM USER MANUAL & DEPLOYMENT GUIDE</h1>
""")

for sec in emanual.MANUAL_SECTIONS:
    html_lines.append(f'<h2 class="section-title">{sec["title"]}</h2>')
    for subsec in sec["subsections"]:
        html_lines.append(f'<h3 class="subsection-title">{subsec["subtitle"]}</h3>')
        for p_txt in subsec["paragraphs"]:
            html_lines.append(f'<p>{p_txt}</p>')

# ==========================================
# CHAPTER VIII: FORMAL MATHEMATICAL PROOFS
# ==========================================
html_lines.append("""
<div class="page-break"></div>
<h1 class="chapter-title">CHAPTER-VIII: FORMAL MATHEMATICAL PROOFS OF CORRECTNESS</h1>
""")

for sec in eproofs.PROOF_SECTIONS:
    html_lines.append(f'<h2 class="section-title">{sec["title"]}</h2>')
    for subsec in sec["subsections"]:
        html_lines.append(f'<h3 class="subsection-title">{subsec["subtitle"]}</h3>')
        for p_txt in subsec["paragraphs"]:
            html_lines.append(f'<p>{p_txt}</p>')

# ==========================================
# CHAPTER IX: PRODUCTION SOURCE CODE MODULES
# ==========================================
html_lines.append("""
<div class="page-break"></div>
<h1 class="chapter-title">CHAPTER-IX: PRODUCTION SOURCE CODE MODULES & ANNOTATIONS</h1>
""")

for item in emanual.EXTENDED_SOURCE_CODE:
    html_lines.append(f'<h2 class="section-title">Source Module: {item["filename"]}</h2>')
    html_lines.append(f'<p>{item["description"]}</p>')
    html_lines.append(f'<pre class="code-block">{item["code"]}</pre>')

# ==========================================
# REFERENCES & BIBLIOGRAPHY
# ==========================================
html_lines.append("""
<div class="page-break"></div>
<h1 class="chapter-title">REFERENCES & BIBLIOGRAPHY</h1>

<table style="width: 100%;">
  <tbody>
""")

for ref_id, ref_text in ech5_6.REFERENCES_EXPANDED:
    html_lines.append(f"""
    <tr>
      <td style="width: 10%; text-align: center;" class="bold">[{ref_id}]</td>
      <td style="width: 90%;">{ref_text}</td>
    </tr>
    """)

html_lines.append("""
  </tbody>
</table>

</div>
</body>
</html>
""")

with open("project_report.html", "w", encoding="utf-8") as f:
    f.write("\n".join(html_lines))

print("SUCCESS: Generated project_report.html successfully!")
