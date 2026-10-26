import os
import sys
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

doc = Document()

# Configure Page Setup (A4 Portrait, 1 inch margins)
for section in doc.sections:
    section.page_width = Inches(8.27)
    section.page_height = Inches(11.69)
    section.top_margin = Inches(1.0)
    section.bottom_margin = Inches(1.0)
    section.left_margin = Inches(1.0)
    section.right_margin = Inches(1.0)

PSIT_LOGO_PATH = os.path.abspath("psit_logo.jpg")
CSJMU_LOGO_PATH = os.path.abspath("CSJMU_logo.jpg")

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def set_cell_borders(cell, top=None, bottom=None, left=None, right=None):
    tcPr = cell._tc.get_or_add_tcPr()
    tcBorders = OxmlElement('w:tcBorders')
    borders = {'top': top, 'bottom': bottom, 'left': left, 'right': right}
    for edge_name, border_style in borders.items():
        edge = OxmlElement(f'w:{edge_name}')
        if border_style:
            edge.set(qn('w:val'), border_style.get('val', 'single'))
            edge.set(qn('w:sz'), str(border_style.get('sz', 4)))
            edge.set(qn('w:space'), '0')
            edge.set(qn('w:color'), border_style.get('color', '000000'))
        else:
            edge.set(qn('w:val'), 'none')
        tcBorders.append(edge)
    tcPr.append(tcBorders)

def set_cell_bg(cell, hex_color):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{hex_color}"/>')
    tcPr.append(shd)

def add_p(text="", size=12, bold=False, italic=False, align=WD_ALIGN_PARAGRAPH.LEFT, space_before=0, space_after=6, line_spacing=1.15):
    p = doc.add_paragraph()
    p.alignment = align
    p.paragraph_format.space_before = Pt(space_before)
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.line_spacing = line_spacing
    if text:
        r = p.add_run(text)
        r.font.name = "Times New Roman"
        r.font.size = Pt(size)
        r.font.bold = bold
        r.font.italic = italic
    return p

def add_h1(text):
    return add_p(text, size=16, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=18, space_after=14)

def add_h2(text):
    return add_p(text, size=14, bold=True, align=WD_ALIGN_PARAGRAPH.LEFT, space_before=14, space_after=6)

def add_h3(text):
    return add_p(text, size=12.5, bold=True, align=WD_ALIGN_PARAGRAPH.LEFT, space_before=10, space_after=4)

def add_body(text):
    return add_p(text, size=12, bold=False, italic=False, align=WD_ALIGN_PARAGRAPH.JUSTIFY, space_before=0, space_after=6, line_spacing=1.15)

def add_bullet(text):
    p = doc.add_paragraph(style='List Bullet')
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(3)
    p.paragraph_format.line_spacing = 1.15
    r = p.add_run(text)
    r.font.name = "Times New Roman"
    r.font.size = Pt(12)
    return p

# ==========================================
# PAGE 1: COVER PAGE
# ==========================================
if os.path.exists(CSJMU_LOGO_PATH):
    p_logo = doc.add_paragraph()
    p_logo.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_logo.paragraph_format.space_before = Pt(0)
    p_logo.paragraph_format.space_after = Pt(8)
    p_logo.add_run().add_picture(CSJMU_LOGO_PATH, width=Inches(1.2))

add_p("Chhatrapati Shahu Ji Maharaj University, Kanpur", size=16, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=4, space_after=4)
add_p("Project Report", size=15, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=4, space_after=4)
add_p("on", size=12, italic=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=2, space_after=6)
add_p("AlgoLenz: VisuAlgo-Inspired Interactive Data Structures, Pathfinding & Sorting Visualization Platform", size=14, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=4, space_after=14)

add_p("Submitted in Partial Fulfillment of the Requirements for the Degree of", size=11.5, italic=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=2, space_after=4)
add_p("Bachelor of Computer Applications (BCA)", size=14, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=2, space_after=16)

add_p("By", size=12, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=2, space_after=4)
p_st = doc.add_paragraph()
p_st.alignment = WD_ALIGN_PARAGRAPH.CENTER
p_st.paragraph_format.line_spacing = 1.3
p_st.paragraph_format.space_after = Pt(14)
for name, roll in [("Naitik", "24116002322"), ("Kashish Gupta", "24116002274"), ("Naitik Mishra", "24116002324"), ("Khushboo Rajpoot", "24116002277")]:
    r = p_st.add_run(f"{name} (Roll No: {roll})\n")
    r.font.name = "Times New Roman"
    r.font.size = Pt(12)
    r.font.bold = True

add_p("Under the Supervision of", size=12, italic=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=2, space_after=4)
add_p("Dr. Amit Yadav", size=13, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=0, space_after=2)
add_p("Professor, Department of Computer Applications", size=11, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=0, space_after=14)

if os.path.exists(PSIT_LOGO_PATH):
    p_plogo = doc.add_paragraph()
    p_plogo.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_plogo.paragraph_format.space_before = Pt(0)
    p_plogo.paragraph_format.space_after = Pt(6)
    p_plogo.add_run().add_picture(PSIT_LOGO_PATH, width=Inches(1.05))

add_p("PSIT College of Higher Education", size=14, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=0, space_after=2)
add_p("Kanpur-Delhi National Highway (NH-19), Bhauti, Kanpur-209305 (U.P.), India", size=10, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=0, space_after=2)
add_p("Academic Session: 2026–2027", size=11, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=2, space_after=0)

doc.add_page_break()

# ==========================================
# PAGE 2: CERTIFICATE (MATCHING INSTRUCTION FORMAT)
# ==========================================
add_h1("CERTIFICATE")

p_cert = add_p(space_before=20, space_after=18, line_spacing=1.3)
p_cert.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
r_c1 = p_cert.add_run("This is to certify that project entitled ")
r_c1.font.name = "Times New Roman"
r_c1.font.size = Pt(12)

r_c2 = p_cert.add_run("“AlgoLenz: VisuAlgo-Inspired Interactive Data Structures, Pathfinding & Sorting Visualization Platform”")
r_c2.font.name = "Times New Roman"
r_c2.font.size = Pt(12)
r_c2.font.bold = True

r_c3 = p_cert.add_run(" submitted for partial fulfillment of the degree of BCA under the Department of Bachelor of Computer Application to through PSIT College of Higher Education, Kanpur, done by ")
r_c3.font.name = "Times New Roman"
r_c3.font.size = Pt(12)

r_c4 = p_cert.add_run("Naitik (Roll No: 24116002322), Kashish Gupta (Roll No: 24116002274), Naitik Mishra (Roll No: 24116002324), and Khushboo Rajpoot (Roll No: 24116002277)")
r_c4.font.name = "Times New Roman"
r_c4.font.size = Pt(12)
r_c4.font.bold = True

r_c5 = p_cert.add_run(" is an authentic work carried out by them under the guidance of ")
r_c5.font.name = "Times New Roman"
r_c5.font.size = Pt(12)

r_c6 = p_cert.add_run("Dr. Amit Yadav (Professor).")
r_c6.font.name = "Times New Roman"
r_c6.font.size = Pt(12)
r_c6.font.bold = True

r_c7 = p_cert.add_run(" The matter embodied in this project work has not been submitted earlier for award of any degree or diploma to the best of my knowledge and belief.")
r_c7.font.name = "Times New Roman"
r_c7.font.size = Pt(12)

add_p(space_before=80)

tbl_cert = doc.add_table(rows=2, cols=2)
tbl_cert.alignment = WD_TABLE_ALIGNMENT.CENTER
tbl_cert.rows[0].cells[0].width = Inches(3.5)
tbl_cert.rows[0].cells[1].width = Inches(3.5)
tbl_cert.rows[1].cells[0].width = Inches(3.5)
tbl_cert.rows[1].cells[1].width = Inches(3.5)

p_g = tbl_cert.rows[0].cells[0].paragraphs[0]
p_g.add_run("______________________________\n").font.name = "Times New Roman"
r_g = p_g.add_run("Internal Examiner / Guide\n(Dr. Amit Yadav)")
r_g.font.bold = True
r_g.font.name = "Times New Roman"

p_e = tbl_cert.rows[0].cells[1].paragraphs[0]
p_e.alignment = WD_ALIGN_PARAGRAPH.RIGHT
p_e.add_run("______________________________\n").font.name = "Times New Roman"
r_e = p_e.add_run("External Examiner\n(External Faculty / Assessor)")
r_e.font.bold = True
r_e.font.name = "Times New Roman"

p_h = tbl_cert.rows[1].cells[0].paragraphs[0]
p_h.paragraph_format.space_before = Pt(50)
p_h.add_run("______________________________\n").font.name = "Times New Roman"
r_h = p_h.add_run("Head of Department\n(Dr. Pragati Upadhyay)")
r_h.font.bold = True
r_h.font.name = "Times New Roman"

for r in tbl_cert.rows:
    for c in r.cells:
        set_cell_borders(c)

doc.add_page_break()

# ==========================================
# PAGE 3: DECLARATION (MATCHING INSTRUCTION FORMAT)
# ==========================================
add_h1("Declaration")

p_dec = add_p(space_before=25, space_after=25, line_spacing=1.3)
p_dec.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
p_dec.add_run("I hereby declare that the project entitled ")
r_dt = p_dec.add_run("“AlgoLenz: VisuAlgo-Inspired Interactive Data Structures, Pathfinding & Sorting Visualization Platform”")
r_dt.font.bold = True
p_dec.add_run(" submitted for the Bachelor of Computer Application degree is my original work and the project has not formed the basis for the award of any other degree of the university or other institute of higher learning, except where due acknowledgment has been made in the text.")

add_p("Signature of the students:", size=12, bold=True, space_before=40, space_after=30)

tbl_dec_sig = doc.add_table(rows=4, cols=2)
tbl_dec_sig.alignment = WD_TABLE_ALIGNMENT.CENTER
for idx, (st_name, st_roll) in enumerate([("Naitik", "24116002322"), ("Kashish Gupta", "24116002274"), ("Naitik Mishra", "24116002324"), ("Khushboo Rajpoot", "24116002277")]):
    c0 = tbl_dec_sig.rows[idx].cells[0]
    c1 = tbl_dec_sig.rows[idx].cells[1]
    c0.width = Inches(4.5)
    c1.width = Inches(2.5)
    
    p0 = c0.paragraphs[0]
    p0.paragraph_format.space_after = Pt(8)
    r0 = p0.add_run(f"{st_name} (Roll No: {st_roll})\nBCA, PSIT College of Higher Education, Kanpur")
    r0.font.name = "Times New Roman"
    r0.font.size = Pt(11)
    
    p1 = c1.paragraphs[0]
    p1.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    r1 = p1.add_run("_______________________")
    r1.font.name = "Times New Roman"
    
    set_cell_borders(c0)
    set_cell_borders(c1)

doc.add_page_break()

# ==========================================
# PAGE 4: ACKNOWLEDGEMENT (MATCHING INSTRUCTION FORMAT)
# ==========================================
add_h1("ACKNOWLEDGEMENT")

add_body("Presentation inspiration and motivation have always played a key role in the success of any venture.")

add_body("I express my sincere thanks to Dr. Harit Kumar, Director, PSIT College of Higher Education, Kanpur, for his visionary administrative guidance and for providing the modern laboratory infrastructure and technical computing ecosystem that made this undertaking feasible.")

add_body("I pay my deep sense of gratitude to Dr. Pragati Upadhyay (HOD) of BCA Department, PSIT College of Higher Education, to encourage me to the highest peak and to provide me the opportunity to prepare the project. Her valuable critiques, academic leadership, and continuous encouragement established a rigorous engineering benchmark throughout the project duration. I am immensely obliged to my friends and team members for their elevating inspiration, encouraging guidance and kind supervision in the completion of my project.")

add_body("I feel to acknowledge my indebtedness and deep sense of gratitude to my guide Dr. Amit Yadav (Professor) whose valuable guidance, profound algorithmic insights, and kind supervision given to me throughout the course shaped the present work as its show. His meticulous advice during state-machine formulation and performance benchmarking proved indispensable.")

add_body("Last, but not the least, my parents are also an important inspiration for me. Their unconditional support, patience, and moral grounding have been my pillar of strength throughout this academic endeavor. So with due regards, I express my gratitude to them.")

p_ack_sig = doc.add_paragraph()
p_ack_sig.paragraph_format.space_before = Pt(40)
p_ack_sig.alignment = WD_ALIGN_PARAGRAPH.RIGHT
p_ack_sig.paragraph_format.line_spacing = 1.3
r_ack = p_ack_sig.add_run("Naitik (24116002322)\nKashish Gupta (24116002274)\nNaitik Mishra (24116002324)\nKhushboo Rajpoot (24116002277)\nDepartment of Computer Applications\nPSIT College of Higher Education, Kanpur")
r_ack.font.name = "Times New Roman"
r_ack.font.size = Pt(11)
r_ack.font.bold = True

doc.add_page_break()

# ==========================================
# PAGE 5-6: TABLE OF CONTENTS (INDEX)
# ==========================================
add_h1("TABLE OF CONTENTS")

tbl_toc = doc.add_table(rows=1, cols=3)
tbl_toc.alignment = WD_TABLE_ALIGNMENT.CENTER
tbl_toc.rows[0].cells[0].width = Inches(1.0)
tbl_toc.rows[0].cells[1].width = Inches(5.0)
tbl_toc.rows[0].cells[2].width = Inches(1.0)

for c_i, h_txt in enumerate(["S.No", "Topic / Chapter Details", "Page No"]):
    cell = tbl_toc.rows[0].cells[c_i]
    r = cell.paragraphs[0].add_run(h_txt)
    r.font.name = "Times New Roman"
    r.font.size = Pt(11)
    r.font.bold = True
    set_cell_bg(cell, "F2F2F2")
    if c_i != 1:
        cell.paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER
    set_cell_borders(cell, top={'sz':4,'val':'single'}, bottom={'sz':8,'val':'single'}, left={'sz':4,'val':'single'}, right={'sz':4,'val':'single'})
    set_cell_margins(cell, 60, 60, 80, 80)

toc_items = [
    ("1", "Certificate", "ii"),
    ("2", "Declaration", "iii"),
    ("3", "Acknowledgement", "iv"),
    ("4", "Abstract & Pedagogical Scope", "v"),
    ("5", "Chapter-I: Introduction", "1"),
    ("", "  1.1 Introduction to AlgoLenz & Algorithm Visualization", "1"),
    ("", "  1.2 Theoretical Foundation of Algorithm Analysis & Computational Complexity", "3"),
    ("", "  1.3 Existing System & Instructional Bottlenecks", "5"),
    ("", "  1.4 Problems in Existing System", "7"),
    ("", "  1.5 Proposed System: Architecture & Interactive Paradigms", "9"),
    ("", "  1.6 Objectives of the Project", "11"),
    ("", "  1.7 Scope and Practical Applications", "13"),
    ("6", "Chapter-II: Modules, System Requirements & Technology Stack", "15"),
    ("", "  2.1 Modules Overview & Detailed Architecture Breakdown", "15"),
    ("", "      2.1.1 Module 1: 2D Interactive Grid Pathfinding Visualizer", "16"),
    ("", "      2.1.2 Module 2: Heuristic & Graph Traversal Engine (Dijkstra, A*, BFS, DFS, Bellman-Ford)", "18"),
    ("", "      2.1.3 Module 3: Procedural Maze & Terrain Generators", "20"),
    ("", "      2.1.4 Module 4: Real-World Geospatial Map Routing (Leaflet.js)", "22"),
    ("", "      2.1.5 Module 5: Multi-Stop Dispatch & TSP Optimizer", "24"),
    ("", "      2.1.6 Module 6: Audio-Visual Sorting Engine & Web Audio Tone Synthesizer", "26"),
    ("", "      2.1.7 Module 7: Comparative Benchmarking Arena", "28"),
    ("", "      2.1.8 Module 8: Synchronized Pseudocode & Playback Controller", "30"),
    ("", "  2.2 System Requirements Specification", "31"),
    ("", "      2.2.1 Hardware Requirements (Developer & End-User)", "31"),
    ("", "      2.2.2 Software Requirements & Toolchain Runtime", "32"),
    ("", "  2.3 Technology Used in Project (React 18, TypeScript 5, Vite, Tailwind CSS)", "33"),
    ("7", "Chapter-III: Feasibility Study, SDLC & System Modeling", "36"),
    ("", "  3.1 Comprehensive Feasibility Study", "36"),
    ("", "      3.1.1 Technical Feasibility", "36"),
    ("", "      3.1.2 Operational Feasibility", "37"),
    ("", "      3.1.3 Economic Feasibility", "38"),
    ("", "      3.1.4 Schedule & Legal Feasibility", "39"),
    ("", "  3.2 Software Development Life Cycle (Agile Iterative Model)", "40"),
    ("", "  3.3 Data Flow Diagrams (DFDs)", "42"),
    ("", "      3.3.1 Level 0 DFD (Context Level Diagram)", "42"),
    ("", "      3.3.2 Level 1 DFD (Module Decomposition)", "43"),
    ("", "      3.3.3 Level 2 DFD (Grid Pathfinding & Sorting Pipeline)", "44"),
    ("", "  3.4 Unified Modeling Language (UML) Modeling", "45"),
    ("", "      3.4.1 Use Case Diagram & Actor Roles", "45"),
    ("", "      3.4.2 Sequence Diagram: Pathfinding Execution Pipeline", "46"),
    ("", "      3.4.3 Sequence Diagram: Sorting Audio Synthesis Pipeline", "47"),
    ("", "      3.4.4 State Machine Diagram: Node Transition Cycle", "48"),
    ("8", "Chapter-IV: Data Architecture, Detailed Algorithms & Screen Snapshots", "49"),
    ("", "  4.1 Data Architecture & Schema Design", "49"),
    ("", "      4.1.1 In-Memory Graph Data Structures (Adjacency Matrix & Grid Array)", "49"),
    ("", "      4.1.2 GridNode Interface & Node State Schemas", "50"),
    ("", "      4.1.3 AlgorithmStep & SortingStep Animation Event Schemas", "51"),
    ("", "      4.1.4 Geospatial Landmark Graph Model", "52"),
    ("", "      4.1.5 Web Audio Frequency & Tone Synthesis Lookup Tables", "53"),
    ("", "  4.2 Algorithm Formulations & Detailed Pseudocode", "54"),
    ("", "      4.2.1 Dijkstra’s Shortest Path Algorithm", "54"),
    ("", "      4.2.2 A* Heuristic Search (Manhattan vs Euclidean Distance)", "56"),
    ("", "      4.2.3 Bellman-Ford Negative Weight Edge Relaxation", "58"),
    ("", "      4.2.4 Breadth-First Search (BFS) & Depth-First Search (DFS)", "60"),
    ("", "      4.2.5 Traveling Salesperson Problem (TSP) Heuristic & 2-Opt", "62"),
    ("", "      4.2.6 Sorting Algorithms (Quick Sort, Merge Sort, Heap Sort)", "64"),
    ("", "  4.3 Screen Snapshots & Telemetry Walkthrough", "66"),
    ("9", "Chapter-V: Testing, Quality Assurance & Performance Optimization", "71"),
    ("", "  5.1 Testing Strategy & Test Plan", "71"),
    ("", "  5.2 Algorithmic Verification & Boundary Testing", "72"),
    ("", "  5.3 Comprehensive Test Cases Table", "73"),
    ("", "  5.4 Rendering Performance & 60 FPS Frame Budget Analysis", "76"),
    ("10", "Chapter-VI: Conclusion, Limitations & Future Scope", "78"),
    ("", "  6.1 Conclusion & Summary of Accomplishments", "78"),
    ("", "  6.2 Limitations of the Current Implementation", "79"),
    ("", "  6.3 Future Scope & Technological Enhancements", "80"),
    ("11", "References & Academic Bibliography", "81")
]

for s_no, topic, pg in toc_items:
    row = tbl_toc.add_row()
    c0 = row.cells[0]
    c1 = row.cells[1]
    c2 = row.cells[2]
    c0.width = Inches(1.0)
    c1.width = Inches(5.0)
    c2.width = Inches(1.0)
    
    r0 = c0.paragraphs[0].add_run(s_no)
    r1 = c1.paragraphs[0].add_run(topic)
    r2 = c2.paragraphs[0].add_run(pg)
    
    r0.font.name = "Times New Roman"
    r1.font.name = "Times New Roman"
    r2.font.name = "Times New Roman"
    
    r0.font.size = Pt(10)
    r1.font.size = Pt(10)
    r2.font.size = Pt(10)
    
    if s_no != "":
        r0.font.bold = True
        r1.font.bold = True
        r2.font.bold = True
        set_cell_bg(c0, "FAFAFA")
        set_cell_bg(c1, "FAFAFA")
        set_cell_bg(c2, "FAFAFA")
        
    c0.paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER
    c2.paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER
    
    set_cell_borders(c0, top={'sz':2,'val':'single','color':'DDDDDD'}, bottom={'sz':2,'val':'single','color':'DDDDDD'}, left={'sz':2,'val':'single','color':'DDDDDD'}, right={'sz':2,'val':'single','color':'DDDDDD'})
    set_cell_borders(c1, top={'sz':2,'val':'single','color':'DDDDDD'}, bottom={'sz':2,'val':'single','color':'DDDDDD'}, left={'sz':2,'val':'single','color':'DDDDDD'}, right={'sz':2,'val':'single','color':'DDDDDD'})
    set_cell_borders(c2, top={'sz':2,'val':'single','color':'DDDDDD'}, bottom={'sz':2,'val':'single','color':'DDDDDD'}, left={'sz':2,'val':'single','color':'DDDDDD'}, right={'sz':2,'val':'single','color':'DDDDDD'})
    set_cell_margins(c0, 30, 30, 60, 60)
    set_cell_margins(c1, 30, 30, 60, 60)
    set_cell_margins(c2, 30, 30, 60, 60)

doc.add_page_break()

# ==========================================
# PAGE 7: ABSTRACT
# ==========================================
add_h1("ABSTRACT")

add_body("In computer science education, understanding Data Structures and Algorithms (DSA) represents both the most crucial foundational competency and one of the steepest intellectual hurdles encountered by undergraduate students. Foundational concepts such as priority queue edge relaxations, recursive divide-and-conquer partitioning, dynamic programming state caching, heuristic search space pruning, and graph traversals are inherently dynamic, transient, and multi-dimensional. Traditional instructional paradigms—relying primarily on static textbook printouts, chalkboards, and slide decks—present substantial cognitive friction because they compress dynamic execution paths into frozen snapshots, forcing students to simulate complex state transitions mentally.")

add_body("To address this pedagogical divide, this project presents AlgoLenz: an interactive, high-performance web-based algorithm visualization and telemetry benchmarking platform modeled after internationally recognized educational tools such as VisuAlgo (National University of Singapore). AlgoLenz transforms theoretical computational complexity into intuitive, real-time visual and auditory experiences. Developed entirely using modern frontend engineering principles—incorporating React 18, TypeScript 5.3, Vite 5, Tailwind CSS 3.4, and the HTML5 Canvas and Web Audio APIs—the platform implements a fully decoupled architecture that strictly separates algorithmic computation from visual state orchestration.")

add_body("AlgoLenz incorporates five comprehensive functional suites: (1) an Interactive 2D Grid Pathfinding Canvas simulating Dijkstra’s algorithm, A* heuristic search, Breadth-First Search (BFS), Depth-First Search (DFS), and Bellman-Ford across arbitrary weighted terrains and procedural mazes; (2) a Real-World Geospatial City Map Routing Engine utilizing Leaflet.js and OpenStreetMap to project shortest path computations onto actual urban road networks; (3) a Multi-Stop Waypoint & Delivery Dispatch Optimizer solving the NP-Hard Traveling Salesperson Problem (TSP) using Nearest Neighbor heuristics and 2-Opt local search; (4) a Comparative Benchmarking Arena running dual algorithms concurrently on identical graphs to benchmark runtime execution, search-space expansion, and path cost; and (5) an Audio-Visual Sorting Engine visualizing six fundamental sorting algorithms with real-time pitch synthesis reflecting element magnitudes and swap operations.")

add_body("Through bidirectional timeline scrubbing, synchronized line-by-line pseudocode highlighting, and comprehensive live telemetry displays, AlgoLenz bridges the gap between abstract algorithmic theory and tangible runtime mechanics, establishing an exemplary educational resource for modern computing curricula.")

add_p("Keywords: Algorithm Visualization, Computational Complexity, Pathfinding, Heuristic Search, Graph Theory, Traveling Salesperson Problem, Web Audio API, Computer Science Pedagogy.", size=11, bold=True, italic=True, space_before=15)

doc.add_page_break()

print("Front matter successfully created.")
