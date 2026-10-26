import os
import sys
import subprocess

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

print("Assembling Exact 50-Page Academic Project Report...")

pages = []

# ==========================================
# PAGE 1: COVER PAGE
# ==========================================
p1 = """
<div class="report-page" id="page-1">
  <div class="cover-wrapper">
    <img src="CSJMU_logo.jpg" alt="CSJMU Logo" class="cover-logo" onerror="this.style.display='none'">
    <div class="cover-univ">Chhatrapati Shahu Ji Maharaj University, Kanpur</div>
    <div class="cover-report-label">PROJECT REPORT</div>
    <div class="cover-on">on</div>
    <div class="cover-title">AlgoLenz: VisuAlgo-Inspired Interactive Data Structures, Pathfinding & Sorting Visualization Platform</div>
    
    <div class="cover-sub-label">Submitted in Partial Fulfillment of the Requirements for the Degree of</div>
    <div class="cover-degree">Bachelor of Computer Applications (BCA)</div>

    <div class="cover-by-label">By:</div>
    <div class="cover-students">
      <strong>Naitik</strong> (Roll No: 24116002322)<br>
      <strong>Kashish Gupta</strong> (Roll No: 24116002274)<br>
      <strong>Naitik Mishra</strong> (Roll No: 24116002324)<br>
      <strong>Khushboo Rajpoot</strong> (Roll No: 24116002277)
    </div>

    <div class="cover-guide-label">Under the Supervision of</div>
    <div class="cover-guide-name">Dr. Amit Yadav</div>
    <div class="cover-guide-desig">Professor, Department of Computer Applications</div>

    <img src="psit_logo.jpg" alt="PSIT Logo" class="cover-logo" onerror="this.style.display='none'">
    <div class="cover-college-name">PSIT College of Higher Education</div>
    <div class="cover-address">Kanpur-Delhi National Highway (NH-19), Bhauti, Kanpur-209305 (U.P.), India</div>
    <div class="cover-session">Academic Session: 2026–2027</div>
  </div>
</div>
"""
pages.append(p1)

# ==========================================
# PAGE 2: CERTIFICATE
# ==========================================
p2 = """
<div class="report-page" id="page-2">
  <h1 class="chapter-title">CERTIFICATE</h1>
  
  <p style="margin-top: 45px; line-height: 1.45; text-align: justify; font-size: 12pt;">
    This is to certify that project entitled <strong>“AlgoLenz: VisuAlgo-Inspired Interactive Data Structures, Pathfinding & Sorting Visualization Platform”</strong> submitted for partial fulfillment of the degree of BCA under the Department of Bachelor of Computer Application to through PSIT College of Higher Education, Kanpur, done by <strong>Naitik (Roll No: 24116002322), Kashish Gupta (Roll No: 24116002274), Naitik Mishra (Roll No: 24116002324), and Khushboo Rajpoot (Roll No: 24116002277)</strong> is an authentic work carried out by them under the guidance of <strong>Dr. Amit Yadav (Professor)</strong>. The matter embodied in this project work has not been submitted earlier for award of any degree or diploma to the best of my knowledge and belief.
  </p>

  <div style="margin-top: 180px;">
    <table class="sig-table">
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
        <td style="padding-top: 90px;">
          ______________________________<br>
          <strong>Head of Department</strong><br>
          (Dr. Pragati Upadhyay)
        </td>
        <td></td>
      </tr>
    </table>
  </div>
</div>
"""
pages.append(p2)

# ==========================================
# PAGE 3: DECLARATION
# ==========================================
p3 = """
<div class="report-page" id="page-3">
  <h1 class="chapter-title">DECLARATION</h1>
  
  <p style="margin-top: 45px; line-height: 1.45; text-align: justify; font-size: 12pt;">
    I hereby declare that the project entitled <strong>“AlgoLenz: VisuAlgo-Inspired Interactive Data Structures, Pathfinding & Sorting Visualization Platform”</strong> submitted for the Bachelor of Computer Application degree is my original work and the project has not formed the basis for the award of any other degree of the university or other institute of higher learning, except where due acknowledgment has been made in the text.
  </p>

  <div style="margin-top: 80px; font-weight: bold; font-size: 12pt;">Signature of the students:</div>

  <table class="sig-table" style="margin-top: 40px;">
    <tr>
      <td style="width: 65%; padding: 16px 0;">
        <strong>Naitik</strong> (Roll No: 24116002322)<br>
        BCA, PSIT College of Higher Education, Kanpur
      </td>
      <td style="width: 35%; text-align: right; vertical-align: bottom;">
        _______________________
      </td>
    </tr>
    <tr>
      <td style="padding: 16px 0;">
        <strong>Kashish Gupta</strong> (Roll No: 24116002274)<br>
        BCA, PSIT College of Higher Education, Kanpur
      </td>
      <td style="text-align: right; vertical-align: bottom;">
        _______________________
      </td>
    </tr>
    <tr>
      <td style="padding: 16px 0;">
        <strong>Naitik Mishra</strong> (Roll No: 24116002324)<br>
        BCA, PSIT College of Higher Education, Kanpur
      </td>
      <td style="text-align: right; vertical-align: bottom;">
        _______________________
      </td>
    </tr>
    <tr>
      <td style="padding: 16px 0;">
        <strong>Khushboo Rajpoot</strong> (Roll No: 24116002277)<br>
        BCA, PSIT College of Higher Education, Kanpur
      </td>
      <td style="text-align: right; vertical-align: bottom;">
        _______________________
      </td>
    </tr>
  </table>
</div>
"""
pages.append(p3)

# ==========================================
# PAGE 4: ACKNOWLEDGEMENT
# ==========================================
p4 = """
<div class="report-page" id="page-4">
  <h1 class="chapter-title">ACKNOWLEDGEMENT</h1>
  
  <p style="margin-top: 30px;">
    Presentation inspiration and motivation have always played a key role in the success of any venture.
  </p>
  <p>
    I express my sincere thanks to <strong>Dr. Harit Kumar</strong>, Director, PSIT College of Higher Education, Kanpur, for his visionary administrative guidance and for providing the modern laboratory infrastructure and technical computing ecosystem that made this undertaking feasible.
  </p>
  <p>
    I pay my deep sense of gratitude to <strong>Dr. Pragati Upadhyay (HOD)</strong> of BCA Department, PSIT College of Higher Education, to encourage me to the highest peak and to provide me the opportunity to prepare the project. Her valuable critiques, academic leadership, and continuous encouragement established a rigorous engineering benchmark throughout the project duration. I am immensely obliged to my friends and team members for their elevating inspiration, encouraging guidance and kind supervision in the completion of my project.
  </p>
  <p>
    I feel to acknowledge my indebtedness and deep sense of gratitude to my guide <strong>Dr. Amit Yadav (Professor)</strong> whose valuable guidance, profound algorithmic insights, and kind supervision given to me throughout the course shaped the present work as its show. His meticulous advice during state-machine formulation and performance benchmarking proved indispensable.
  </p>
  <p>
    Last, but not the least, my parents are also an important inspiration for me. Their unconditional support, patience, and moral grounding have been my pillar of strength throughout this academic endeavor. So with due regards, I express my gratitude to them.
  </p>

  <div style="margin-top: 60px; text-align: right; font-weight: bold; line-height: 1.35; font-size: 11pt;">
    Naitik (24116002322)<br>
    Kashish Gupta (24116002274)<br>
    Naitik Mishra (24116002324)<br>
    Khushboo Rajpoot (24116002277)<br>
    Department of Computer Applications<br>
    PSIT College of Higher Education, Kanpur
  </div>
</div>
"""
pages.append(p4)

# ==========================================
# PAGE 5: TABLE OF CONTENTS (PART 1)
# ==========================================
p5 = """
<div class="report-page" id="page-5">
  <h1 class="chapter-title">TABLE OF CONTENTS</h1>
  
  <table class="toc-table">
    <thead>
      <tr>
        <th style="width: 10%; text-align: center;">S.No</th>
        <th style="width: 78%;">Topic / Chapter Details</th>
        <th style="width: 12%; text-align: center;">Page No</th>
      </tr>
    </thead>
    <tbody>
      <tr class="toc-major"><td class="center bold">1</td><td class="bold">Certificate</td><td class="center bold">ii</td></tr>
      <tr class="toc-major"><td class="center bold">2</td><td class="bold">Declaration</td><td class="center bold">iii</td></tr>
      <tr class="toc-major"><td class="center bold">3</td><td class="bold">Acknowledgement</td><td class="center bold">iv</td></tr>
      <tr class="toc-major"><td class="center bold">4</td><td class="bold">Abstract & Pedagogical Scope</td><td class="center bold">v</td></tr>
      <tr class="toc-major"><td class="center bold">5</td><td class="bold">Chapter-I: Introduction & Theoretical Foundation</td><td class="center bold">1</td></tr>
      <tr><td></td><td class="toc-sub">1.1 Introduction to AlgoLenz & Algorithm Visualization</td><td class="center">1</td></tr>
      <tr><td></td><td class="toc-sub">1.2 Theoretical Foundation of Algorithm Analysis & Complexity</td><td class="center">2</td></tr>
      <tr><td></td><td class="toc-sub">1.2.2 Divide-and-Conquer Recurrences & Master Theorem</td><td class="center">3</td></tr>
      <tr><td></td><td class="toc-sub">1.2.3 Graph Theory Foundations & Complexity Classes (P vs NP)</td><td class="center">4</td></tr>
      <tr><td></td><td class="toc-sub">1.3 Existing System & Instructional Bottlenecks</td><td class="center">5</td></tr>
      <tr><td></td><td class="toc-sub">1.4 Problems in Existing System & 1.5 Proposed System Architecture</td><td class="center">6</td></tr>
      <tr><td></td><td class="toc-sub">1.6 Objectives of the Project & 1.7 Scope and Practical Applications</td><td class="center">7</td></tr>
      <tr class="toc-major"><td class="center bold">6</td><td class="bold">Chapter-II: Modules, System Requirements & Technology Stack</td><td class="center bold">8</td></tr>
      <tr><td></td><td class="toc-sub">2.1 Modules Overview & Detailed Architecture Breakdown</td><td class="center">8</td></tr>
      <tr><td></td><td class="toc-sub">2.1.2 Module 1: 2D Interactive Grid Pathfinding Visualizer</td><td class="center">9</td></tr>
      <tr><td></td><td class="toc-sub">2.1.4 Module 3: Procedural Maze & Terrain Generators</td><td class="center">10</td></tr>
      <tr><td></td><td class="toc-sub">2.1.6 Module 5: Multi-Stop Dispatch & TSP Optimizer</td><td class="center">11</td></tr>
      <tr><td></td><td class="toc-sub">2.2 System Requirements Specification (Hardware & Software Tables)</td><td class="center">12</td></tr>
      <tr><td></td><td class="toc-sub">2.3 Technology Used in Project (React 18, TypeScript, Vite, Tailwind)</td><td class="center">13</td></tr>
      <tr class="toc-major"><td class="center bold">7</td><td class="bold">Chapter-III: Feasibility Study, SDLC & System Modeling</td><td class="center bold">14</td></tr>
      <tr><td></td><td class="toc-sub">3.1 Comprehensive Feasibility Study (Technical & Operational)</td><td class="center">14</td></tr>
      <tr><td></td><td class="toc-sub">3.1.3 Economic, Schedule & Legal Feasibility Analysis</td><td class="center">15</td></tr>
      <tr><td></td><td class="toc-sub">3.2 Software Development Life Cycle (Agile Scrum Framework)</td><td class="center">16</td></tr>
      <tr><td></td><td class="toc-sub">3.2.3 Formal User Stories & Acceptance Criteria</td><td class="center">17</td></tr>
    </tbody>
  </table>
</div>
"""
pages.append(p5)

# ==========================================
# PAGE 6: TABLE OF CONTENTS (PART 2)
# ==========================================
p6 = """
<div class="report-page" id="page-6">
  <h1 class="chapter-title" style="margin-bottom: 12px;">TABLE OF CONTENTS (Contd.)</h1>
  
  <table class="toc-table">
    <thead>
      <tr>
        <th style="width: 10%; text-align: center;">S.No</th>
        <th style="width: 78%;">Topic / Chapter Details</th>
        <th style="width: 12%; text-align: center;">Page No</th>
      </tr>
    </thead>
    <tbody>
      <tr><td></td><td class="toc-sub">3.3 Data Flow Diagrams (Level 0, Level 1, Level 2 DFDs)</td><td class="center">18</td></tr>
      <tr><td></td><td class="toc-sub">3.4 Unified Modeling Language (UML) Modeling (Use Case & Sequence)</td><td class="center">19</td></tr>
      <tr><td></td><td class="toc-sub">3.4.3 State Machine Diagram of GridNode Lifecycle</td><td class="center">20</td></tr>
      <tr class="toc-major"><td class="center bold">8</td><td class="bold">Chapter-IV: Data Architecture, Detailed Algorithms & Screen Snapshots</td><td class="center bold">21</td></tr>
      <tr><td></td><td class="toc-sub">4.1 Data Architecture & Schema Design (In-Memory Graph, GridNode)</td><td class="center">21</td></tr>
      <tr><td></td><td class="toc-sub">4.2 Algorithm Formulations (Dijkstra Min-Heap & A* Search)</td><td class="center">22</td></tr>
      <tr><td></td><td class="toc-sub">4.2.3 Bellman-Ford Negative Cycle Engine & 4.2.4 TSP Formulation</td><td class="center">23</td></tr>
      <tr><td></td><td class="toc-sub">4.2.5 Quick Sort with Lomuto Partition Scheme</td><td class="center">24</td></tr>
      <tr><td></td><td class="toc-sub">4.3 Screen Snapshots: Figure 4.1 2D Interactive Grid Visualizer</td><td class="center">25</td></tr>
      <tr><td></td><td class="toc-sub">4.3 Screen Snapshots: Figure 4.2 Dual-Algorithm Comparison Arena</td><td class="center">26</td></tr>
      <tr><td></td><td class="toc-sub">4.3 Screen Snapshots: Figure 4.3 Multi-Stop Delivery & TSP Dispatch</td><td class="center">27</td></tr>
      <tr><td></td><td class="toc-sub">4.3 Screen Snapshots: Figure 4.4 Real-World Geospatial City Map Routing</td><td class="center">28</td></tr>
      <tr><td></td><td class="toc-sub">4.3 Screen Snapshots: Figure 4.5 Audio-Visual Sorting Studio</td><td class="center">29</td></tr>
      <tr class="toc-major"><td class="center bold">9</td><td class="bold">Chapter-V: Testing, Quality Assurance & Optimization</td><td class="center bold">30</td></tr>
      <tr><td></td><td class="toc-sub">5.1 Testing Strategy & Quality Assurance Framework</td><td class="center">30</td></tr>
      <tr><td></td><td class="toc-sub">5.2 Comprehensive Test Cases Execution Matrix (Part 1: TC01 - TC13)</td><td class="center">31</td></tr>
      <tr><td></td><td class="toc-sub">5.2 Comprehensive Test Cases Execution Matrix (Part 2: TC14 - TC25)</td><td class="center">32</td></tr>
      <tr><td></td><td class="toc-sub">5.3 Rendering Performance & 60 FPS Frame Budget Analysis</td><td class="center">33</td></tr>
      <tr><td></td><td class="toc-sub">5.4 Cross-Browser Verification & Benchmarking Telemetry</td><td class="center">34</td></tr>
      <tr class="toc-major"><td class="center bold">10</td><td class="bold">Chapter-VI: Conclusion, Limitations & Future Scope</td><td class="center bold">35</td></tr>
      <tr><td></td><td class="toc-sub">6.1 Conclusion & Summary of Accomplishments</td><td class="center">35</td></tr>
      <tr><td></td><td class="toc-sub">6.2 Limitations of the Current Implementation</td><td class="center">36</td></tr>
      <tr><td></td><td class="toc-sub">6.3 Future Scope & Technological Enhancements</td><td class="center">37</td></tr>
      <tr class="toc-major"><td class="center bold">11</td><td class="bold">Chapter-VII: System User Manual & Deployment Guide</td><td class="center bold">38</td></tr>
      <tr><td></td><td class="toc-sub">7.1 System Installation & Deployment Guide</td><td class="center">38</td></tr>
      <tr><td></td><td class="toc-sub">7.2 Interactive Grid Canvas & 7.3 Geospatial Map Operations</td><td class="center">39</td></tr>
      <tr><td></td><td class="toc-sub">7.4 Multi-Stop Dispatch, Sorting & Troubleshooting Guide</td><td class="center">40</td></tr>
      <tr class="toc-major"><td class="center bold">12</td><td class="bold">Chapter-VIII: Formal Mathematical Proofs of Correctness</td><td class="center bold">41</td></tr>
      <tr><td></td><td class="toc-sub">8.1 Proof of Dijkstra's Algorithm by Mathematical Induction</td><td class="center">41</td></tr>
      <tr><td></td><td class="toc-sub">8.2 Proof of A* Optimality & 8.3 Proof of Bellman-Ford Convergence</td><td class="center">42</td></tr>
      <tr class="toc-major"><td class="center bold">13</td><td class="bold">References & Academic Bibliography</td><td class="center bold">43</td></tr>
    </tbody>
  </table>
</div>
"""
pages.append(p6)

# ==========================================
# PAGE 7: ABSTRACT
# ==========================================
p7 = """
<div class="report-page" id="page-7">
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

  <p style="margin-top: 30px;" class="bold italic">
    Keywords: Algorithm Visualization, Computational Complexity, Pathfinding, Heuristic Search, Graph Theory, Traveling Salesperson Problem, Web Audio API, Computer Science Pedagogy.
  </p>
</div>
"""
pages.append(p7)

# Helper function to generate standardized chapter pages
def make_page(page_num, title, subtitle, paragraphs, extra_html=""):
    p_html = f"""
<div class="report-page" id="page-{page_num}">
  {f'<h1 class="chapter-title">{title}</h1>' if title else ''}
  {f'<h2 class="section-title">{subtitle}</h2>' if subtitle else ''}
"""
    for p in paragraphs:
        p_html += f"  <p>{p}</p>\n"
    if extra_html:
        p_html += f"  {extra_html}\n"
    p_html += "</div>\n"
    return p_html

# ==========================================
# CHAPTER I: INTRODUCTION (PAGES 8 - 14)
# ==========================================
# Page 8: 1.1 Intro
p8_paras = [
    ech1.CH1_SECTIONS[0]["subsections"][0]["paragraphs"][0],
    ech1.CH1_SECTIONS[0]["subsections"][0]["paragraphs"][1],
    ech1.CH1_SECTIONS[0]["subsections"][0]["paragraphs"][2]
]
pages.append(make_page(8, ech1.CH1_TITLE, ech1.CH1_SECTIONS[0]["title"], p8_paras))

# Page 9: 1.1.2 Cognitive Science & 1.2 Complexity Foundations
p9_paras = [
    ech1.CH1_SECTIONS[0]["subsections"][1]["paragraphs"][0],
    ech1.CH1_SECTIONS[0]["subsections"][1]["paragraphs"][1],
    ech1.CH1_SECTIONS[1]["subsections"][0]["paragraphs"][0],
    ech1.CH1_SECTIONS[1]["subsections"][0]["paragraphs"][1]
]
pages.append(make_page(9, "", "1.1.2 Cognitive Science & 1.2 Mathematical Foundations", p9_paras))

# Page 10: 1.2.2 Divide and Conquer & Master Theorem
p10_paras = [
    ech1.CH1_SECTIONS[1]["subsections"][1]["paragraphs"][0],
    ech1.CH1_SECTIONS[1]["subsections"][1]["paragraphs"][1],
    ech1.CH1_SECTIONS[1]["subsections"][1]["paragraphs"][2]
]
pages.append(make_page(10, "", ech1.CH1_SECTIONS[1]["subsections"][1]["subtitle"], p10_paras))

# Page 11: 1.2.3 Graph Theory & P vs NP
p11_paras = [
    ech1.CH1_SECTIONS[1]["subsections"][2]["paragraphs"][0],
    ech1.CH1_SECTIONS[1]["subsections"][2]["paragraphs"][1],
    ech1.CH1_SECTIONS[1]["subsections"][2]["paragraphs"][2]
]
pages.append(make_page(11, "", ech1.CH1_SECTIONS[1]["subsections"][2]["subtitle"], p11_paras))

# Page 12: 1.3 Existing Systems & Critique
p12_paras = [
    ech1.CH1_SECTIONS[2]["subsections"][0]["paragraphs"][0],
    ech1.CH1_SECTIONS[2]["subsections"][0]["paragraphs"][1],
    ech1.CH1_SECTIONS[2]["subsections"][1]["paragraphs"][0],
    ech1.CH1_SECTIONS[2]["subsections"][1]["paragraphs"][1]
]
pages.append(make_page(12, "", ech1.CH1_SECTIONS[2]["title"], p12_paras))

# Page 13: 1.4 Problems in Existing System & 1.5 Proposed System
p13_paras = [
    ech1.CH1_SECTIONS[3]["subsections"][0]["paragraphs"][0],
    ech1.CH1_SECTIONS[3]["subsections"][0]["paragraphs"][1],
    ech1.CH1_SECTIONS[4]["subsections"][0]["paragraphs"][0],
    ech1.CH1_SECTIONS[4]["subsections"][0]["paragraphs"][1]
]
pages.append(make_page(13, "", "1.4 Problems in Existing System & 1.5 Proposed System Architecture", p13_paras))

# Page 14: 1.6 Objectives & 1.7 Scope
p14_paras = [
    ech1.CH1_SECTIONS[5]["subsections"][0]["paragraphs"][0],
    ech1.CH1_SECTIONS[5]["subsections"][0]["paragraphs"][1],
    ech1.CH1_SECTIONS[6]["subsections"][0]["paragraphs"][0],
    ech1.CH1_SECTIONS[6]["subsections"][0]["paragraphs"][1]
]
pages.append(make_page(14, "", "1.6 Project Objectives & 1.7 Pedagogical Scope", p14_paras))

# ==========================================
# CHAPTER II: MODULES & REQUIREMENTS (PAGES 15 - 20)
# ==========================================
# Page 15: Chapter II Intro & 2.1 Modularity Breakdown
p15_paras = [
    ech2.CH2_SECTIONS[0]["subsections"][0]["paragraphs"][0],
    ech2.CH2_SECTIONS[0]["subsections"][0]["paragraphs"][1],
    ech2.CH2_SECTIONS[0]["subsections"][0]["paragraphs"][2]
]
pages.append(make_page(15, ech2.CH2_TITLE, ech2.CH2_SECTIONS[0]["title"], p15_paras))

# Page 16: Modules 1 & 2 (2D Grid & Graph Engines)
p16_paras = [
    ech2.CH2_SECTIONS[0]["subsections"][1]["paragraphs"][0],
    ech2.CH2_SECTIONS[0]["subsections"][1]["paragraphs"][1],
    ech2.CH2_SECTIONS[0]["subsections"][2]["paragraphs"][0],
    ech2.CH2_SECTIONS[0]["subsections"][2]["paragraphs"][1]
]
pages.append(make_page(16, "", "2.1.2 2D Grid Pathfinding & 2.1.3 Heuristic Graph Engines", p16_paras))

# Page 17: Modules 3 & 4 (Mazes & Geospatial City Maps)
p17_paras = [
    ech2.CH2_SECTIONS[0]["subsections"][3]["paragraphs"][0],
    ech2.CH2_SECTIONS[0]["subsections"][3]["paragraphs"][1],
    ech2.CH2_SECTIONS[0]["subsections"][4]["paragraphs"][0],
    ech2.CH2_SECTIONS[0]["subsections"][4]["paragraphs"][1]
]
pages.append(make_page(17, "", "2.1.4 Procedural Mazes & 2.1.5 Real-World Geospatial City Maps", p17_paras))

# Page 18: Modules 5, 6, 7 (TSP, Audio-Visual Sorting, Comparison)
p18_paras = [
    ech2.CH2_SECTIONS[0]["subsections"][5]["paragraphs"][0],
    ech2.CH2_SECTIONS[0]["subsections"][6]["paragraphs"][0],
    ech2.CH2_SECTIONS[0]["subsections"][7]["paragraphs"][0]
]
pages.append(make_page(18, "", "2.1.6 TSP Dispatch, 2.1.7 Sorting Studio & 2.1.8 Arena", p18_paras))

# Page 19: Hardware & Software Requirements Tables
hw_tbl = """
<h3 class="subsection-title">Hardware Requirements Specification Table</h3>
<table>
  <thead><tr><th>Category</th><th>Minimum Specification</th><th>Recommended Specification</th></tr></thead>
  <tbody>
"""
for r in ch2_base.HW_REQ_DATA[1:]:
    hw_tbl += f"<tr><td class='bold'>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td></tr>\n"
hw_tbl += """
  </tbody>
</table>

<h3 class="subsection-title" style="margin-top: 15px;">Software Requirements Specification Table</h3>
<table>
  <thead><tr><th>Component</th><th>Developer Environment</th><th>Client Runtime Environment</th></tr></thead>
  <tbody>
"""
for r in ch2_base.SW_REQ_DATA[1:]:
    hw_tbl += f"<tr><td class='bold'>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td></tr>\n"
hw_tbl += "</tbody></table>"

pages.append(make_page(19, "", "2.2 System Requirements Specification", [], hw_tbl))

# Page 20: 2.3 Technology Stack Rationale
p20_paras = [
    ech2.CH2_SECTIONS[2]["subsections"][0]["paragraphs"][0],
    ech2.CH2_SECTIONS[2]["subsections"][0]["paragraphs"][1],
    ech2.CH2_SECTIONS[2]["subsections"][0]["paragraphs"][2]
]
pages.append(make_page(20, "", ech2.CH2_SECTIONS[2]["title"], p20_paras))

# ==========================================
# CHAPTER III: FEASIBILITY & SDLC (PAGES 21 - 27)
# ==========================================
# Page 21: 3.1 Feasibility Study
p21_paras = [
    ech3.CH3_SECTIONS[0]["subsections"][0]["paragraphs"][0],
    ech3.CH3_SECTIONS[0]["subsections"][0]["paragraphs"][1],
    ech3.CH3_SECTIONS[0]["subsections"][1]["paragraphs"][0],
    ech3.CH3_SECTIONS[0]["subsections"][1]["paragraphs"][1]
]
pages.append(make_page(21, ech3.CH3_TITLE, "3.1 Technical & Operational Feasibility Analysis", p21_paras))

# Page 22: Economic, Schedule & Legal Feasibility
p22_paras = [
    ech3.CH3_SECTIONS[0]["subsections"][2]["paragraphs"][0],
    ech3.CH3_SECTIONS[0]["subsections"][2]["paragraphs"][1],
    ech3.CH3_SECTIONS[0]["subsections"][3]["paragraphs"][0],
    ech3.CH3_SECTIONS[0]["subsections"][3]["paragraphs"][1]
]
pages.append(make_page(22, "", "3.1.3 Economic, Schedule & Legal Feasibility Analysis", p22_paras))

# Page 23: 3.2 Agile Scrum SDLC
p23_paras = [
    ech3.CH3_SECTIONS[1]["subsections"][0]["paragraphs"][0],
    ech3.CH3_SECTIONS[1]["subsections"][0]["paragraphs"][1],
    ech3.CH3_SECTIONS[1]["subsections"][1]["paragraphs"][0],
    ech3.CH3_SECTIONS[1]["subsections"][1]["paragraphs"][1]
]
pages.append(make_page(23, "", "3.2 Software Development Life Cycle (Agile Scrum)", p23_paras))

# Page 24: 3.2.3 User Stories & Acceptance Criteria
p24_paras = [
    ech3.CH3_SECTIONS[1]["subsections"][2]["paragraphs"][0],
    ech3.CH3_SECTIONS[1]["subsections"][2]["paragraphs"][1],
    ech3.CH3_SECTIONS[1]["subsections"][2]["paragraphs"][2]
]
pages.append(make_page(24, "", "3.2.3 Formal User Stories & Acceptance Criteria", p24_paras))

# Page 25: 3.3 Data Flow Diagrams (DFDs)
p25_paras = [
    ech3.CH3_SECTIONS[2]["subsections"][0]["paragraphs"][0],
    ech3.CH3_SECTIONS[2]["subsections"][0]["paragraphs"][1],
    ech3.CH3_SECTIONS[2]["subsections"][1]["paragraphs"][0],
    ech3.CH3_SECTIONS[2]["subsections"][2]["paragraphs"][0]
]
pages.append(make_page(25, "", "3.3 Data Flow Diagrams (Level 0, 1, 2)", p25_paras))

# Page 26: 3.4 UML Modeling (Use Case & Sequence)
p26_paras = [
    ech3.CH3_SECTIONS[3]["subsections"][0]["paragraphs"][0],
    ech3.CH3_SECTIONS[3]["subsections"][0]["paragraphs"][1],
    ech3.CH3_SECTIONS[3]["subsections"][1]["paragraphs"][0],
    ech3.CH3_SECTIONS[3]["subsections"][1]["paragraphs"][1]
]
pages.append(make_page(26, "", "3.4 UML Use Case & Sequence Diagrams", p26_paras))

# Page 27: 3.4.3 State Machine of GridNode Lifecycle
p27_paras = [
    ech3.CH3_SECTIONS[3]["subsections"][2]["paragraphs"][0],
    ech3.CH3_SECTIONS[3]["subsections"][2]["paragraphs"][1],
    ech3.CH3_SECTIONS[3]["subsections"][2]["paragraphs"][2]
]
pages.append(make_page(27, "", "3.4.3 State Machine Diagram of GridNode Lifecycle", p27_paras))

# ==========================================
# CHAPTER IV: DATA ARCHITECTURE & ALGORITHMS (PAGES 28 - 36)
# ==========================================
# Page 28: 4.1 Data Architecture & Schema Design
p28_paras = [
    ech4.CH4_SECTIONS[0]["subsections"][0]["paragraphs"][0],
    ech4.CH4_SECTIONS[0]["subsections"][0]["paragraphs"][1],
    ech4.CH4_SECTIONS[0]["subsections"][1]["paragraphs"][0],
    ech4.CH4_SECTIONS[0]["subsections"][2]["paragraphs"][0]
]
pages.append(make_page(28, ech4.CH4_TITLE, ech4.CH4_SECTIONS[0]["title"], p28_paras))

# Page 29: 4.2 Algorithm Formulations (Dijkstra & A*)
p29_paras = [
    ech4.CH4_SECTIONS[1]["subsections"][0]["paragraphs"][0],
    ech4.CH4_SECTIONS[1]["subsections"][0]["paragraphs"][1],
    ech4.CH4_SECTIONS[1]["subsections"][1]["paragraphs"][0],
    ech4.CH4_SECTIONS[1]["subsections"][1]["paragraphs"][1]
]
pages.append(make_page(29, "", "4.2 Algorithm Formulations: Dijkstra & A* Heuristic", p29_paras))

# Page 30: 4.2.3 Bellman-Ford & 4.2.4 TSP Formulations
p30_paras = [
    ech4.CH4_SECTIONS[1]["subsections"][2]["paragraphs"][0],
    ech4.CH4_SECTIONS[1]["subsections"][2]["paragraphs"][1],
    ech4.CH4_SECTIONS[1]["subsections"][3]["paragraphs"][0],
    ech4.CH4_SECTIONS[1]["subsections"][3]["paragraphs"][1]
]
pages.append(make_page(30, "", "4.2.3 Bellman-Ford Negative Cycle & 4.2.4 TSP Formulation", p30_paras))

# Page 31: 4.2.5 QuickSort Lomuto Partition Algorithm
p31_paras = [
    ech4.CH4_SECTIONS[1]["subsections"][4]["paragraphs"][0],
    ech4.CH4_SECTIONS[1]["subsections"][4]["paragraphs"][1]
]
p31_code = f"""<pre style="background:#f8fafc; border:1px solid #cbd5e1; border-left:4px solid #2563eb; padding:10px; font-family:'Courier New', monospace; font-size:9pt; line-height:1.2; margin-top:12px;">{ech4.CH4_SECTIONS[1]["subsections"][4]["code"]}</pre>"""
pages.append(make_page(31, "", "4.2.5 Quick Sort with Lomuto Partition Scheme", p31_paras, p31_code))

# Page 32: Screenshot 1 - 2D Grid Visualizer
shot1_html = """
<div class="screenshot-box">
  <img src="images/screenshot_grid.png" alt="2D Interactive Grid Visualizer" class="report-img">
  <div class="figure-caption">Figure 4.1: AlgoLenz Interactive 2D Grid Pathfinding Canvas demonstrating shortest path exploration with live node inspection and telemetry panel.</div>
</div>
<p style="margin-top: 15px;">
  The Interactive Grid Pathfinding Canvas provides an interactive visual laboratory for understanding graph search algorithms. Users can dynamically draw impassable wall barriers, place high-friction mud terrain, and relocate start and destination anchors in real time. The canvas leverages high-performance HTML5 Canvas rendering to guarantee a steady 60 FPS animation loop while animating frontier exploration.
</p>
"""
pages.append(make_page(32, "", "4.3 System Screen Snapshots: 2D Grid Pathfinding Engine", [], shot1_html))

# Page 33: Screenshot 2 - Dual-Algorithm Comparison Arena
shot2_html = """
<div class="screenshot-box">
  <img src="images/screenshot_comparison.png" alt="Dual-Algorithm Comparison Arena" class="report-img">
  <div class="figure-caption">Figure 4.2: Dual-Algorithm Comparative Benchmarking Arena executing Dijkstra vs A* concurrently on identical terrain.</div>
</div>
<p style="margin-top: 15px;">
  The Comparison Arena provides side-by-side empirical verification of theoretical time and space complexity. Two independent algorithms run in synchronized lockstep across identical grid topologies, exposing the immense efficiency gains of heuristic guidance (A*) over blind uniform-cost exploration (Dijkstra). Live telemetry cards record nodes visited, execution duration, and optimal path length.
</p>
"""
pages.append(make_page(33, "", "4.3 System Screen Snapshots: Comparative Benchmarking Arena", [], shot2_html))

# Page 34: Screenshot 3 - TSP Multi-Stop Delivery Dispatch
shot3_html = """
<div class="screenshot-box">
  <img src="images/screenshot_multistop.png" alt="TSP Multi-Stop Delivery Dispatch" class="report-img">
  <div class="figure-caption">Figure 4.3: Traveling Salesperson Problem (TSP) Multi-Stop Dispatch solving logistics delivery tours with 2-Opt local search untangling.</div>
</div>
<p style="margin-top: 15px;">
  The Multi-Stop Delivery Dispatch module visualizes solutions to the NP-Hard Traveling Salesperson Problem (TSP). Users place multiple customer delivery markers across an interactive plane. The system executes both Nearest Neighbor heuristics and exact Held-Karp Bitmask Dynamic Programming, applying 2-Opt edge swaps to visually untangle crossing routes and eliminate geometric inefficiencies.
</p>
"""
pages.append(make_page(34, "", "4.3 System Screen Snapshots: Multi-Stop TSP Delivery Dispatch", [], shot3_html))

# Page 35: Screenshot 4 - Real-World Geospatial City Map Routing
shot4_html = """
<div class="screenshot-box">
  <img src="images/screenshot_citymap.png" alt="Real-World Geospatial City Map Routing" class="report-img">
  <div class="figure-caption">Figure 4.4: Real-World Geospatial City Map Routing using Leaflet.js and OpenStreetMap cartography across Indian metropolitan road networks.</div>
</div>
<p style="margin-top: 15px;">
  The Geospatial City Map module bridges theoretical textbook graph models with real-world road networks. Powered by Leaflet.js and OpenStreetMap vector tiles, users select major metropolitan centers (e.g., New Delhi, Mumbai, Kanpur) and compute real-world shortest paths across urban intersections, demonstrating practical GPS route planning principles.
</p>
"""
pages.append(make_page(35, "", "4.3 System Screen Snapshots: Geospatial City Map Routing", [], shot4_html))

# Page 36: Screenshot 5 - Audio-Visual Sorting Studio
shot5_html = """
<div class="screenshot-box">
  <img src="images/screenshot_sorting.png" alt="Audio-Visual Sorting Studio" class="report-img">
  <div class="figure-caption">Figure 4.5: Audio-Visual Sorting Studio featuring HTML5 Web Audio pitch synthesis and synchronized algorithm telemetry.</div>
</div>
<p style="margin-top: 15px;">
  The Sorting Studio transforms numerical array ordering into a multi-sensory audio-visual experience. As algorithms (Quick Sort, Merge Sort, Heap Sort) execute array comparisons and element swaps, the platform synthesizes real-time acoustic sine tones mapped directly to numerical bar heights (120 Hz to 1200 Hz), producing distinctive auditory signatures for each sorting paradigm.
</p>
"""
pages.append(make_page(36, "", "4.3 System Screen Snapshots: Audio-Visual Sorting Studio", [], shot5_html))

# ==========================================
# CHAPTER V: TESTING & QUALITY ASSURANCE (PAGES 37 - 41)
# ==========================================
# Page 37: 5.1 Testing Strategy
p37_paras = [
    ech5_6.CH5_SECTIONS[0]["subsections"][0]["paragraphs"][0],
    ech5_6.CH5_SECTIONS[0]["subsections"][0]["paragraphs"][1],
    ech5_6.CH5_SECTIONS[0]["subsections"][0]["paragraphs"][2]
]
pages.append(make_page(37, ech5_6.CH5_TITLE, ech5_6.CH5_SECTIONS[0]["title"], p37_paras))

# Page 38: 5.2 Test Cases Matrix Part 1 (TC01 - TC13)
tc1_html = """
<h3 class="subsection-title">Test Cases Execution Matrix (Part 1: TC01 to TC13)</h3>
<table style="font-size: 8.5pt;">
  <thead>
    <tr>
      <th style="width: 10%; text-align: center;">Test ID</th>
      <th style="width: 25%;">Module / Feature</th>
      <th style="width: 30%;">Input Condition</th>
      <th style="width: 25%;">Expected Output</th>
      <th style="width: 10%; text-align: center;">Result</th>
    </tr>
  </thead>
  <tbody>
"""
for r in ech5_6.TEST_CASES_EXPANDED[:13]:
    tc1_html += f"<tr><td class='center bold'>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td class='center bold' style='color:#15803d;'>{r[4]}</td></tr>\n"
tc1_html += "</tbody></table>"
pages.append(make_page(38, "", "5.2 Comprehensive Test Cases Execution Matrix (Part 1)", [], tc1_html))

# Page 39: 5.2 Test Cases Matrix Part 2 (TC14 - TC25)
tc2_html = """
<h3 class="subsection-title">Test Cases Execution Matrix (Part 2: TC14 to TC25)</h3>
<table style="font-size: 8.5pt;">
  <thead>
    <tr>
      <th style="width: 10%; text-align: center;">Test ID</th>
      <th style="width: 25%;">Module / Feature</th>
      <th style="width: 30%;">Input Condition</th>
      <th style="width: 25%;">Expected Output</th>
      <th style="width: 10%; text-align: center;">Result</th>
    </tr>
  </thead>
  <tbody>
"""
for r in ech5_6.TEST_CASES_EXPANDED[13:]:
    tc2_html += f"<tr><td class='center bold'>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td class='center bold' style='color:#15803d;'>{r[4]}</td></tr>\n"
tc2_html += "</tbody></table>"
pages.append(make_page(39, "", "5.2 Comprehensive Test Cases Execution Matrix (Part 2)", [], tc2_html))

# Page 40: 5.3 60 FPS Rendering Budget Analysis
p40_paras = [
    ech5_6.CH5_SECTIONS[2]["subsections"][0]["paragraphs"][0],
    ech5_6.CH5_SECTIONS[2]["subsections"][0]["paragraphs"][1],
    ech5_6.CH5_SECTIONS[2]["subsections"][0]["paragraphs"][2]
]
pages.append(make_page(40, "", ech5_6.CH5_SECTIONS[2]["title"], p40_paras))

# Page 41: 5.4 Cross-Browser Verification & Benchmarking
p41_paras = [
    ech5_6.CH5_SECTIONS[2]["subsections"][0]["paragraphs"][3],
    ech5_6.CH5_SECTIONS[2]["subsections"][0]["paragraphs"][4],
    ech5_6.CH5_SECTIONS[2]["subsections"][0]["paragraphs"][5],
    "Cross-browser testing was conducted on Chrome 110+, Firefox 110+, Safari 16+, and Edge. Results verified that JavaScript event queues, Web Audio synthesizers, and canvas rendering contexts behaved identically across all target browser environments without memory degradation."
]
pages.append(make_page(41, "", "5.4 Cross-Browser Verification & Telemetry Results", p41_paras))

# ==========================================
# CHAPTER VI: CONCLUSION & FUTURE SCOPE (PAGES 42 - 44)
# ==========================================
# Page 42: 6.1 Conclusion
p42_paras = [
    ech5_6.CH6_SECTIONS[0]["subsections"][0]["paragraphs"][0],
    ech5_6.CH6_SECTIONS[0]["subsections"][0]["paragraphs"][1],
    ech5_6.CH6_SECTIONS[0]["subsections"][1]["paragraphs"][0]
]
pages.append(make_page(42, ech5_6.CH6_TITLE, ech5_6.CH6_SECTIONS[0]["title"], p42_paras))

# Page 43: 6.2 Limitations
p43_paras = [
    ech5_6.CH6_SECTIONS[1]["subsections"][0]["paragraphs"][0],
    ech5_6.CH6_SECTIONS[1]["subsections"][0]["paragraphs"][1],
    ech5_6.CH6_SECTIONS[1]["subsections"][0]["paragraphs"][2]
]
pages.append(make_page(43, "", ech5_6.CH6_SECTIONS[1]["title"], p43_paras))

# Page 44: 6.3 Future Scope
p44_paras = [
    ech5_6.CH6_SECTIONS[2]["subsections"][0]["paragraphs"][0],
    ech5_6.CH6_SECTIONS[2]["subsections"][0]["paragraphs"][1],
    ech5_6.CH6_SECTIONS[2]["subsections"][0]["paragraphs"][2]
]
pages.append(make_page(44, "", ech5_6.CH6_SECTIONS[2]["title"], p44_paras))

# ==========================================
# CHAPTER VII: SYSTEM USER MANUAL (PAGES 45 - 47)
# ==========================================
# Page 45: 7.1 Installation & Deployment Guide
p45_paras = [
    emanual.MANUAL_SECTIONS[0]["subsections"][0]["paragraphs"][0],
    emanual.MANUAL_SECTIONS[0]["subsections"][0]["paragraphs"][1],
    emanual.MANUAL_SECTIONS[0]["subsections"][0]["paragraphs"][2],
    emanual.MANUAL_SECTIONS[0]["subsections"][1]["paragraphs"][0]
]
pages.append(make_page(45, "CHAPTER-VII: SYSTEM USER MANUAL & DEPLOYMENT GUIDE", "7.1 System Installation & Deployment Guide", p45_paras))

# Page 46: 7.2 Grid Canvas & 7.3 Geospatial Maps
p46_paras = [
    emanual.MANUAL_SECTIONS[1]["subsections"][0]["paragraphs"][0],
    emanual.MANUAL_SECTIONS[1]["subsections"][0]["paragraphs"][1],
    emanual.MANUAL_SECTIONS[1]["subsections"][1]["paragraphs"][0],
    emanual.MANUAL_SECTIONS[2]["subsections"][0]["paragraphs"][0]
]
pages.append(make_page(46, "", "7.2 Interactive Grid Canvas & 7.3 Geospatial Map Operations", p46_paras))

# Page 47: 7.4 TSP Dispatch & 7.5 Troubleshooting
p47_paras = [
    emanual.MANUAL_SECTIONS[3]["subsections"][0]["paragraphs"][0],
    emanual.MANUAL_SECTIONS[4]["subsections"][0]["paragraphs"][0],
    emanual.MANUAL_SECTIONS[5]["subsections"][0]["paragraphs"][0],
    emanual.MANUAL_SECTIONS[6]["subsections"][0]["paragraphs"][0]
]
pages.append(make_page(47, "", "7.4 Multi-Stop Dispatch, Sorting Studio & Troubleshooting", p47_paras))

# ==========================================
# CHAPTER VIII: FORMAL MATHEMATICAL PROOFS (PAGES 48 - 49)
# ==========================================
# Page 48: 8.1 Proof of Dijkstra by Induction
p48_paras = [
    eproofs.PROOF_SECTIONS[0]["subsections"][0]["paragraphs"][0],
    eproofs.PROOF_SECTIONS[0]["subsections"][0]["paragraphs"][1],
    eproofs.PROOF_SECTIONS[0]["subsections"][0]["paragraphs"][2],
    eproofs.PROOF_SECTIONS[0]["subsections"][0]["paragraphs"][3],
    eproofs.PROOF_SECTIONS[0]["subsections"][0]["paragraphs"][4]
]
pages.append(make_page(48, "CHAPTER-VIII: FORMAL MATHEMATICAL PROOFS OF CORRECTNESS", eproofs.PROOF_SECTIONS[0]["subsections"][0]["subtitle"], p48_paras))

# Page 49: 8.2 A* Optimality & 8.3 Bellman-Ford Convergence
p49_paras = [
    eproofs.PROOF_SECTIONS[0]["subsections"][1]["paragraphs"][0],
    eproofs.PROOF_SECTIONS[0]["subsections"][1]["paragraphs"][1],
    eproofs.PROOF_SECTIONS[0]["subsections"][1]["paragraphs"][2],
    eproofs.PROOF_SECTIONS[0]["subsections"][2]["paragraphs"][0],
    eproofs.PROOF_SECTIONS[0]["subsections"][2]["paragraphs"][1]
]
pages.append(make_page(49, "", "8.2 A* Optimality & 8.3 Bellman-Ford Convergence Proofs", p49_paras))

# ==========================================
# PAGE 50: REFERENCES & BIBLIOGRAPHY
# ==========================================
ref_html = """
<div class="report-page" id="page-50">
  <h1 class="chapter-title">REFERENCES & BIBLIOGRAPHY</h1>
  
  <table class="ref-table" style="margin-top: 25px;">
    <tbody>
"""
for ref_id, ref_text in ech5_6.REFERENCES_EXPANDED:
    ref_html += f"""
      <tr>
        <td style="width: 8%; text-align: center; vertical-align: top; font-weight: bold;">[{ref_id}]</td>
        <td style="width: 92%; vertical-align: top; text-align: justify; font-size: 9.5pt; line-height: 1.25;">{ref_text}</td>
      </tr>
    """
ref_html += """
    </tbody>
  </table>
  
  <div style="margin-top: 40px; padding: 12px; background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; text-align: center; font-size: 9.5pt; color: #475569;">
    <strong>Minor Project Report (BCA-5005)</strong> — PSIT College of Higher Education, Kanpur (Session 2026–2027)<br>
    <em>End of Project Report • Exactly 50 Pages Formatted strictly per Department Instructions</em>
  </div>
</div>
"""
pages.append(ref_html)

print(f"Total Pages Assembled: {len(pages)}")
assert len(pages) == 50, f"Expected exactly 50 pages, got {len(pages)}"

# Construct final complete HTML
html_template = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Minor Project Report (BCA-5005) - AlgoLenz (Exact 50 Pages)</title>
<style>
  @page {{
    size: A4 portrait;
    margin: 18mm 18mm 18mm 18mm;
    @bottom-center {{
      content: counter(page);
      font-family: 'Times New Roman', serif;
      font-size: 10pt;
    }}
  }}

  * {{
    box-sizing: border-box;
  }}

  body {{
    font-family: 'Times New Roman', Times, serif;
    font-size: 12pt;
    line-height: 1.15;
    color: #111111;
    background-color: #e2e8f0;
    margin: 0;
    padding: 0;
  }}

  /* Top sticky action banner */
  .action-banner {{
    position: sticky;
    top: 0;
    z-index: 9999;
    background: linear-gradient(135deg, #0f172a, #1e293b);
    color: #ffffff;
    padding: 12px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    border-bottom: 2px solid #38bdf8;
  }}

  .action-banner .title {{
    font-size: 14pt;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 10px;
  }}

  .action-banner .badge-pill {{
    background-color: #0284c7;
    color: #ffffff;
    font-size: 10pt;
    padding: 4px 10px;
    border-radius: 9999px;
    font-weight: 600;
  }}

  .btn-print {{
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    color: #ffffff;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 11pt;
    font-weight: bold;
    padding: 10px 22px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 4px 12px rgba(37,99,235,0.4);
    transition: all 0.2s ease;
  }}

  .btn-print:hover {{
    background: linear-gradient(135deg, #1d4ed8, #1e40af);
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(37,99,235,0.5);
  }}

  /* Outer container */
  .report-wrapper {{
    max-width: 8.27in;
    margin: 25px auto;
  }}

  /* Individual Page Container */
  .report-page {{
    background: #ffffff;
    width: 8.27in;
    min-height: 11.69in;
    padding: 1.0in;
    margin-bottom: 25px;
    box-shadow: 0 6px 20px rgba(0,0,0,0.12);
    position: relative;
    page-break-after: always;
    break-after: page;
  }}

  @media print {{
    @page {{
      size: A4 portrait;
      margin: 15mm 15mm 15mm 15mm;
    }}
    html, body {{
      background: #ffffff;
      padding: 0;
      margin: 0;
      height: 100%;
    }}
    .action-banner {{
      display: none !important;
    }}
    .report-wrapper {{
      margin: 0 !important;
      padding: 0 !important;
      max-width: 100% !important;
      width: 100% !important;
    }}
    .report-page {{
      width: 100% !important;
      height: 265mm !important;
      max-height: 265mm !important;
      min-height: 265mm !important;
      margin: 0 !important;
      padding: 0 !important;
      box-shadow: none !important;
      overflow: hidden !important;
      box-sizing: border-box !important;
      page-break-inside: avoid !important;
      break-inside: avoid !important;
      page-break-after: always !important;
      break-after: page !important;
    }}
    .report-page:last-child {{
      page-break-after: avoid !important;
      break-after: avoid !important;
    }}
  }}

  h1.chapter-title {{
    font-size: 16pt;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
    margin-top: 0;
    margin-bottom: 18px;
    color: #000000;
  }}

  h2.section-title {{
    font-size: 14pt;
    font-weight: bold;
    text-align: left;
    margin-top: 14px;
    margin-bottom: 8px;
    color: #111111;
  }}

  h3.subsection-title {{
    font-size: 12.5pt;
    font-weight: bold;
    text-align: left;
    margin-top: 12px;
    margin-bottom: 6px;
    color: #222222;
  }}

  p {{
    font-size: 12pt;
    line-height: 1.15;
    text-align: justify;
    margin-top: 0;
    margin-bottom: 6pt;
  }}

  .bold {{ font-weight: bold; }}
  .italic {{ font-style: italic; }}
  .center {{ text-align: center; }}
  .right {{ text-align: right; }}

  table {{
    width: 100%;
    border-collapse: collapse;
    margin: 8px 0 12px 0;
    font-size: 9.5pt;
  }}

  th, td {{
    border: 1px solid #777777;
    padding: 5px 7px;
    vertical-align: top;
  }}

  th {{
    background-color: #f2f2f2;
    font-weight: bold;
  }}

  .sig-table {{
    width: 100%;
    border-collapse: collapse;
  }}
  .sig-table td {{
    border: none;
    padding: 12px 4px;
  }}

  .toc-table td {{
    padding: 4px 6px;
    border: 1px solid #e2e8f0;
  }}
  .toc-major td {{
    background-color: #f8fafc;
    font-weight: bold;
  }}
  .toc-sub {{
    padding-left: 18px !important;
  }}

  .ref-table td {{
    border: none;
    padding: 3px 4px;
  }}

  /* Screenshot styling */
  .screenshot-box {{
    margin: 10px 0;
    text-align: center;
  }}
  .report-img {{
    width: 100%;
    max-height: 4.0in;
    object-fit: contain;
    border: 1px solid #cbd5e1;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }}
  .figure-caption {{
    font-size: 10pt;
    font-weight: bold;
    color: #334155;
    margin-top: 8px;
    text-align: center;
  }}

  /* Cover page specific styles */
  .cover-wrapper {{
    text-align: center;
    padding-top: 10px;
  }}
  .cover-logo {{
    max-height: 85px;
    margin: 4px auto;
    display: block;
  }}
  .cover-univ {{
    font-size: 16pt;
    font-weight: bold;
    margin-top: 8px;
  }}
  .cover-report-label {{
    font-size: 15pt;
    font-weight: bold;
    margin-top: 10px;
  }}
  .cover-on {{
    font-style: italic;
    font-size: 12pt;
    margin: 4px 0;
  }}
  .cover-title {{
    font-size: 14pt;
    font-weight: bold;
    color: #1e3a8a;
    line-height: 1.35;
    margin: 6px 0 16px 0;
  }}
  .cover-sub-label {{
    font-style: italic;
    font-size: 11pt;
    margin-top: 10px;
  }}
  .cover-degree {{
    font-size: 14pt;
    font-weight: bold;
    margin: 4px 0 16px 0;
  }}
  .cover-by-label {{
    font-size: 12pt;
    font-weight: bold;
  }}
  .cover-students {{
    font-size: 11.5pt;
    line-height: 1.4;
    margin: 6px 0 16px 0;
  }}
  .cover-guide-label {{
    font-style: italic;
    font-size: 11pt;
  }}
  .cover-guide-name {{
    font-size: 13pt;
    font-weight: bold;
    margin-top: 2px;
  }}
  .cover-guide-desig {{
    font-size: 10.5pt;
    margin-bottom: 12px;
  }}
  .cover-college-name {{
    font-size: 14pt;
    font-weight: bold;
    margin-top: 4px;
  }}
  .cover-address {{
    font-size: 9.5pt;
    color: #333333;
    margin: 2px 0;
  }}
  .cover-session {{
    font-size: 11pt;
    font-weight: bold;
    margin-top: 6px;
  }}
</style>
</head>
<body>

<div class="action-banner">
  <div class="title">
    <span>📘 AlgoLenz Project Report</span>
    <span class="badge-pill">EXACT 50 PAGES (PSIT / CSJMU BCA-5005)</span>
  </div>
  <button class="btn-print" onclick="window.print()">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
    Make / Save as PDF (Exact 50 Pages)
  </button>
</div>

<div class="report-wrapper">
{"".join(pages)}
</div>

</body>
</html>
"""

with open("project_report.html", "w", encoding="utf-8") as f:
    f.write(html_template)

print("SUCCESS: Written exact 50-page project_report.html!")
