import os
import sys

# Ensure scripts directory in path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

import report_expanded_ch1 as ech1
import report_expanded_ch2 as ech2
import report_expanded_ch3 as ech3
import report_expanded_ch4 as ech4
import report_expanded_ch5_6 as ech5_6
import report_annotated_code_and_proofs as eproofs
import report_user_manual_and_appendices as emanual
import report_ch2 as ch2_base

doc = Document()

# Page Setup: A4 Portrait with 1 inch (72 pt) standard academic margins
for section in doc.sections:
    section.page_width = Inches(8.27)
    section.page_height = Inches(11.69)
    section.top_margin = Inches(1.0)
    section.bottom_margin = Inches(1.0)
    section.left_margin = Inches(1.0)
    section.right_margin = Inches(1.0)

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCS_DIR = os.path.join(ROOT_DIR, "docs")
ASSETS_DIR = os.path.join(DOCS_DIR, "assets")

PSIT_LOGO_PATH = os.path.join(ASSETS_DIR, "psit_logo.jpg")
CSJMU_LOGO_PATH = os.path.join(ASSETS_DIR, "CSJMU_logo.jpg")

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
    return add_p(text, size=16, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=20, space_after=14)

def add_h2(text):
    return add_p(text, size=14, bold=True, align=WD_ALIGN_PARAGRAPH.LEFT, space_before=16, space_after=6)

def add_h3(text):
    return add_p(text, size=12.5, bold=True, align=WD_ALIGN_PARAGRAPH.LEFT, space_before=12, space_after=4)

def add_body(text):
    return add_p(text, size=12, bold=False, italic=False, align=WD_ALIGN_PARAGRAPH.JUSTIFY, space_before=0, space_after=6, line_spacing=1.15)

def add_code_block(code_str):
    tbl = doc.add_table(rows=1, cols=1)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    c = tbl.rows[0].cells[0]
    c.width = Inches(6.27)
    p = c.paragraphs[0]
    p.paragraph_format.space_before = Pt(4)
    p.paragraph_format.space_after = Pt(4)
    p.paragraph_format.line_spacing = 1.05
    r = p.add_run(code_str)
    r.font.name = "Courier New"
    r.font.size = Pt(9.0)
    r.font.color.rgb = RGBColor(30, 30, 30)
    set_cell_bg(c, "F8F9FA")
    set_cell_borders(c, top={'sz':4,'val':'single','color':'CCCCCC'}, bottom={'sz':4,'val':'single','color':'CCCCCC'}, left={'sz':8,'val':'single','color':'2563EB'}, right={'sz':4,'val':'single','color':'CCCCCC'})
    set_cell_margins(c, 80, 80, 120, 120)
    doc.add_paragraph().paragraph_format.space_after = Pt(4)

print("Starting generation of 50+ Page Comprehensive Project Report...")

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
p_cert.add_run("This is to certify that project entitled ")
r_c2 = p_cert.add_run("“AlgoLenz: VisuAlgo-Inspired Interactive Data Structures, Pathfinding & Sorting Visualization Platform”")
r_c2.font.bold = True
p_cert.add_run(" submitted for partial fulfillment of the degree of BCA under the Department of Bachelor of Computer Application to through PSIT College of Higher Education, Kanpur, done by ")
r_c4 = p_cert.add_run("Naitik (Roll No: 24116002322), Kashish Gupta (Roll No: 24116002274), Naitik Mishra (Roll No: 24116002324), and Khushboo Rajpoot (Roll No: 24116002277)")
r_c4.font.bold = True
p_cert.add_run(" is an authentic work carried out by them under the guidance of ")
r_c6 = p_cert.add_run("Dr. Amit Yadav (Professor).")
r_c6.font.bold = True
p_cert.add_run(" The matter embodied in this project work has not been submitted earlier for award of any degree or diploma to the best of my knowledge and belief.")

add_p(space_before=80)

tbl_cert = doc.add_table(rows=2, cols=2)
tbl_cert.alignment = WD_TABLE_ALIGNMENT.CENTER
tbl_cert.rows[0].cells[0].width = Inches(3.13)
tbl_cert.rows[0].cells[1].width = Inches(3.13)
tbl_cert.rows[1].cells[0].width = Inches(3.13)
tbl_cert.rows[1].cells[1].width = Inches(3.13)

p_g = tbl_cert.rows[0].cells[0].paragraphs[0]
p_g.add_run("______________________________\n").font.name = "Times New Roman"
r_g = p_g.add_run("Internal Examiner / Guide\n(Dr. Amit Yadav)")
r_g.font.bold = True

p_e = tbl_cert.rows[0].cells[1].paragraphs[0]
p_e.alignment = WD_ALIGN_PARAGRAPH.RIGHT
p_e.add_run("______________________________\n").font.name = "Times New Roman"
r_e = p_e.add_run("External Examiner\n(External Faculty / Assessor)")
r_e.font.bold = True

p_h = tbl_cert.rows[1].cells[0].paragraphs[0]
p_h.paragraph_format.space_before = Pt(50)
p_h.add_run("______________________________\n").font.name = "Times New Roman"
r_h = p_h.add_run("Head of Department\n(Dr. Pragati Upadhyay)")
r_h.font.bold = True

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
    c1.width = Inches(2.0)
    
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
add_body("Last, but not the least, my parents are also an important inspiration for me. So with due regards, I express my gratitude to them.")

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
tbl_toc.rows[0].cells[1].width = Inches(4.5)
tbl_toc.rows[0].cells[2].width = Inches(0.8)

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
    ("", "      1.1.1 Background and Evolution of Algorithm Visualization", "1"),
    ("", "      1.1.2 The Cognitive Science Behind Algorithm Animation", "4"),
    ("", "  1.2 Theoretical Foundation of Algorithm Analysis & Complexity", "6"),
    ("", "      1.2.1 Asymptotic Analysis and Mathematical Notations", "6"),
    ("", "      1.2.2 Divide-and-Conquer Recurrences & Master Theorem", "9"),
    ("", "      1.2.3 Graph Theory Foundations & Complexity Classes (P vs NP)", "11"),
    ("", "  1.3 Existing System & Instructional Bottlenecks", "13"),
    ("", "      1.3.1 Historical Pedagogy and Traditional Mediums", "13"),
    ("", "      1.3.2 Critical Audit of Existing Software Visualizers", "15"),
    ("", "  1.4 Problems in Existing System", "17"),
    ("", "  1.5 Proposed System: Architecture & Interactive Paradigms", "19"),
    ("", "  1.6 Objectives of the Project", "22"),
    ("", "  1.7 Scope and Practical Applications", "24"),
    ("6", "Chapter-II: Modules, System Requirements & Technology Stack", "26"),
    ("", "  2.1 Modules Overview & Detailed Architecture Breakdown", "26"),
    ("", "      2.1.1 Architectural Modularity & Separation of Concerns", "26"),
    ("", "      2.1.2 Module 1: 2D Interactive Grid Pathfinding Visualizer", "27"),
    ("", "      2.1.3 Module 2: Graph Traversal & Heuristic Pathfinding Engines", "29"),
    ("", "      2.1.4 Module 3: Procedural Maze & Terrain Generators", "32"),
    ("", "      2.1.5 Module 4: Real-World Geospatial Map Routing (Leaflet.js)", "34"),
    ("", "      2.1.6 Module 5: Multi-Stop Dispatch & TSP Optimizer", "36"),
    ("", "      2.1.7 Module 6: Audio-Visual Sorting Engine & Web Audio", "38"),
    ("", "      2.1.8 Module 7: Comparative Benchmarking Arena", "40"),
    ("", "      2.1.9 Module 8: Synchronized Pseudocode Inspector & Playback", "42"),
    ("", "  2.2 System Requirements Specification", "44"),
    ("", "      2.2.1 Hardware Requirements (Developer & End-User)", "44"),
    ("", "      2.2.2 Software Requirements & Toolchain Runtime", "45"),
    ("", "  2.3 Technology Used in Project (React 18, TypeScript 5, Vite, Tailwind)", "46"),
    ("7", "Chapter-III: Feasibility Study, SDLC & System Modeling", "49"),
    ("", "  3.1 Comprehensive Feasibility Study", "49"),
    ("", "      3.1.1 Technical Feasibility Analysis", "49"),
    ("", "      3.1.2 Operational Feasibility Analysis", "51"),
    ("", "      3.1.3 Economic Feasibility Analysis", "53"),
    ("", "      3.1.4 Schedule & Legal Feasibility Analysis", "54"),
    ("", "  3.2 Software Development Life Cycle (Agile Scrum Methodology)", "55"),
    ("", "      3.2.1 Agile Iterative Framework Rationale", "55"),
    ("", "      3.2.2 Detailed Sprint Breakdown & Milestones", "56"),
    ("", "      3.2.3 Formal User Stories & Acceptance Criteria", "58"),
    ("", "  3.3 Data Flow Diagrams (DFDs)", "60"),
    ("", "      3.3.1 Level 0 DFD (Context Level Diagram)", "60"),
    ("", "      3.3.2 Level 1 DFD (Subsystem Decomposition)", "61"),
    ("", "      3.3.3 Level 2 DFD (Pathfinding Execution Pipeline)", "63"),
    ("", "  3.4 Unified Modeling Language (UML) Modeling", "65"),
    ("", "      3.4.1 Use Case Specifications & Actor Roles", "65"),
    ("", "      3.4.2 Sequence Diagrams & Dynamic Interactions", "67"),
    ("", "      3.4.3 State Machine Diagram of GridNode Lifecycle", "69"),
    ("8", "Chapter-IV: Data Architecture, Detailed Algorithms & Snapshots", "71"),
    ("", "  4.1 Data Architecture & Schema Design", "71"),
    ("", "      4.1.1 In-Memory Graph Data Structures & Memory Optimization", "71"),
    ("", "      4.1.2 GridNode Structural Interface Specification", "72"),
    ("", "      4.1.3 Animation Event Schemas (AlgorithmStep & SortingStep)", "74"),
    ("", "      4.1.4 Geospatial Landmark Graph Model (CityHubNode)", "76"),
    ("", "  4.2 Algorithm Formulations & Detailed Pseudocode", "77"),
    ("", "      4.2.1 Dijkstra’s Algorithm with Min-Heap Priority Queue", "77"),
    ("", "      4.2.2 A* Heuristic Search with Admissible Distance Metrics", "80"),
    ("", "      4.2.3 Bellman-Ford Algorithm & Negative Cycle Detection", "83"),
    ("", "      4.2.4 Traveling Salesperson Problem (TSP) with 2-Opt Heuristic", "86"),
    ("", "      4.2.5 Quick Sort with Lomuto Partition Scheme", "89"),
    ("", "  4.3 Screen Snapshots & Telemetry Walkthrough", "91"),
    ("9", "Chapter-V: Testing, Quality Assurance & Optimization", "95"),
    ("", "  5.1 Testing Strategy & Quality Assurance Framework", "95"),
    ("", "  5.2 Comprehensive Test Cases Specification Table (25 Test Cases)", "97"),
    ("", "  5.3 Rendering Performance & 60 FPS Frame Budget Analysis", "101"),
    ("10", "Chapter-VI: Conclusion, Limitations & Future Scope", "104"),
    ("", "  6.1 Conclusion & Summary of Accomplishments", "104"),
    ("", "  6.2 Limitations of the Current Implementation", "107"),
    ("", "  6.3 Future Scope & Technological Enhancements", "109"),
    ("11", "Chapter-VII: System User Manual & Deployment Guide", "111"),
    ("", "  7.1 System Installation & Deployment Guide", "111"),
    ("", "  7.2 Interactive 2D Grid Canvas Operation Manual", "113"),
    ("", "  7.3 Real-World Geospatial Map Routing User Manual", "115"),
    ("", "  7.4 Multi-Stop Waypoint Dispatch & TSP Optimizer Manual", "116"),
    ("", "  7.5 Audio-Visual Sorting Laboratory Operation Manual", "118"),
    ("", "  7.6 Dual-Algorithm Comparative Benchmarking Arena", "119"),
    ("", "  7.7 Troubleshooting & Operational Edge Cases", "121"),
    ("12", "Chapter-VIII: Formal Mathematical Proofs of Correctness", "123"),
    ("", "  8.1 Proof of Dijkstra's Algorithm by Mathematical Induction", "123"),
    ("", "  8.2 Mathematical Proof of A* Optimality with Consistent Heuristics", "125"),
    ("", "  8.3 Proof of Bellman-Ford Convergence in |V|-1 Iterations", "127"),
    ("", "  8.4 Geometric Untangling Proof of 2-Opt Heuristic for TSP", "129"),
    ("13", "Chapter-IX: Production Source Code Modules & Annotations", "131"),
    ("", "  9.1 Bellman-Ford Algorithm Engine (src/algorithms/bellmanFord.ts)", "131"),
    ("", "  9.2 Traveling Salesperson Problem (src/algorithms/tsp.ts)", "134"),
    ("", "  9.3 Audio-Visual Sorting Engine (src/algorithms/sorting.ts)", "138"),
    ("", "  9.4 Procedural Maze Generator (src/utils/gridGenerator.ts)", "142"),
    ("", "  9.5 State Management Provider (src/context/VisualizerContext.tsx)", "145"),
    ("14", "References & Academic Bibliography", "149")
]

for s_no, topic, pg in toc_items:
    row = tbl_toc.add_row()
    c0 = row.cells[0]
    c1 = row.cells[1]
    c2 = row.cells[2]
    c0.width = Inches(1.0)
    c1.width = Inches(4.5)
    c2.width = Inches(0.8)
    
    r0 = c0.paragraphs[0].add_run(s_no)
    r1 = c1.paragraphs[0].add_run(topic)
    r2 = c2.paragraphs[0].add_run(pg)
    r0.font.name = "Times New Roman"
    r1.font.name = "Times New Roman"
    r2.font.name = "Times New Roman"
    r0.font.size = Pt(9.5)
    r1.font.size = Pt(9.5)
    r2.font.size = Pt(9.5)
    
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
    set_cell_margins(c0, 25, 25, 40, 40)
    set_cell_margins(c1, 25, 25, 40, 40)
    set_cell_margins(c2, 25, 25, 40, 40)

doc.add_page_break()

# ==========================================
# PAGE 7: ABSTRACT
# ==========================================
add_h1("ABSTRACT")

add_body("In computer science education, understanding Data Structures and Algorithms (DSA) represents both the most crucial foundational competency and one of the steepest intellectual hurdles encountered by undergraduate students. Foundational concepts such as priority queue edge relaxations, recursive divide-and-conquer partitioning, dynamic programming state caching, heuristic search space pruning, and graph traversals are inherently dynamic, transient, and multi-dimensional. Traditional instructional paradigms—relying primarily on static textbook printouts, chalkboards, and slide decks—present substantial cognitive friction because they compress dynamic execution paths into frozen snapshots, forcing students to simulate complex state transitions mentally.")

add_body("To address this pedagogical divide, this project presents AlgoLenz: an interactive, high-performance web-based algorithm visualization and telemetry benchmarking platform modeled after internationally recognized educational tools such as VisuAlgo (National University of Singapore). AlgoLenz transforms theoretical computational complexity into intuitive, real-time visual and auditory experiences. Developed entirely using modern frontend engineering principles—incorporating React 18, TypeScript 5.3, Vite 5, Tailwind CSS 3.4, and the native HTML5 Canvas and Web Audio APIs—the platform implements a fully decoupled architecture that strictly separates algorithmic computation from visual state orchestration.")

add_body("AlgoLenz incorporates five comprehensive functional suites: (1) an Interactive 2D Grid Pathfinding Canvas simulating Dijkstra’s algorithm, A* heuristic search, Breadth-First Search (BFS), Depth-First Search (DFS), and Bellman-Ford across arbitrary weighted terrains and procedural mazes; (2) a Real-World Geospatial City Map Routing Engine utilizing Leaflet.js and OpenStreetMap to project shortest path computations onto actual urban road networks; (3) a Multi-Stop Waypoint & Delivery Dispatch Optimizer solving the NP-Hard Traveling Salesperson Problem (TSP) using Nearest Neighbor heuristics and Held-Karp Dynamic Programming; (4) a Comparative Benchmarking Arena running dual algorithms concurrently on identical graphs to benchmark runtime execution, search-space expansion, and path cost; and (5) an Audio-Visual Sorting Engine visualizing six fundamental sorting algorithms with real-time pitch synthesis reflecting element magnitudes and swap operations.")

add_body("Through bidirectional timeline scrubbing, synchronized line-by-line pseudocode highlighting, and comprehensive live telemetry displays, AlgoLenz bridges the gap between abstract algorithmic theory and tangible runtime mechanics, establishing an exemplary educational resource for modern computing curricula.")

add_p("Keywords: Algorithm Visualization, Computational Complexity, Pathfinding, Heuristic Search, Graph Theory, Traveling Salesperson Problem, Web Audio API, Computer Science Pedagogy.", size=11, bold=True, italic=True, space_before=15)

doc.add_page_break()

# ==========================================
# CHAPTER I: INTRODUCTION (EXPANDED)
# ==========================================
add_h1(ech1.CH1_TITLE)

for sec in ech1.CH1_SECTIONS:
    add_h2(sec["title"])
    for subsec in sec["subsections"]:
        add_h3(subsec["subtitle"])
        for p_txt in subsec["paragraphs"]:
            add_body(p_txt)
        doc.add_paragraph().paragraph_format.space_after = Pt(4)

doc.add_page_break()

# ==========================================
# CHAPTER II: MODULES & REQUIREMENTS (EXPANDED)
# ==========================================
add_h1(ech2.CH2_TITLE)

for sec in ech2.CH2_SECTIONS:
    add_h2(sec["title"])
    for subsec in sec["subsections"]:
        add_h3(subsec["subtitle"])
        for p_txt in subsec["paragraphs"]:
            add_body(p_txt)
        doc.add_paragraph().paragraph_format.space_after = Pt(4)

add_h3("Hardware Requirements Specification Table")
tbl_hw = doc.add_table(rows=len(ch2_base.HW_REQ_DATA), cols=3)
tbl_hw.alignment = WD_TABLE_ALIGNMENT.CENTER
for r_i, r_vals in enumerate(ch2_base.HW_REQ_DATA):
    for c_i, val in enumerate(r_vals):
        cell = tbl_hw.rows[r_i].cells[c_i]
        r = cell.paragraphs[0].add_run(val)
        r.font.name = "Times New Roman"
        r.font.size = Pt(9.5)
        if r_i == 0:
            r.font.bold = True
            cell.paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER
            set_cell_bg(cell, "F2F2F2")
        set_cell_borders(cell, top={'sz':4,'val':'single'}, bottom={'sz':4,'val':'single'}, left={'sz':4,'val':'single'}, right={'sz':4,'val':'single'})
        set_cell_margins(cell, 40, 40, 60, 60)

doc.add_paragraph().paragraph_format.space_after = Pt(8)

add_h3("Software Requirements Specification Table")
tbl_sw = doc.add_table(rows=len(ch2_base.SW_REQ_DATA), cols=3)
tbl_sw.alignment = WD_TABLE_ALIGNMENT.CENTER
for r_i, r_vals in enumerate(ch2_base.SW_REQ_DATA):
    for c_i, val in enumerate(r_vals):
        cell = tbl_sw.rows[r_i].cells[c_i]
        r = cell.paragraphs[0].add_run(val)
        r.font.name = "Times New Roman"
        r.font.size = Pt(9.5)
        if r_i == 0:
            r.font.bold = True
            cell.paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER
            set_cell_bg(cell, "F2F2F2")
        set_cell_borders(cell, top={'sz':4,'val':'single'}, bottom={'sz':4,'val':'single'}, left={'sz':4,'val':'single'}, right={'sz':4,'val':'single'})
        set_cell_margins(cell, 40, 40, 60, 60)

doc.add_page_break()

# ==========================================
# CHAPTER III: FEASIBILITY, SDLC & MODELING (EXPANDED)
# ==========================================
add_h1(ech3.CH3_TITLE)

for sec in ech3.CH3_SECTIONS:
    add_h2(sec["title"])
    for subsec in sec["subsections"]:
        add_h3(subsec["subtitle"])
        for p_txt in subsec["paragraphs"]:
            add_body(p_txt)
        doc.add_paragraph().paragraph_format.space_after = Pt(4)

doc.add_page_break()

# ==========================================
# CHAPTER IV: DATA ARCHITECTURE & ALGORITHMS (EXPANDED)
# ==========================================
add_h1(ech4.CH4_TITLE)

for sec in ech4.CH4_SECTIONS:
    add_h2(sec["title"])
    for subsec in sec["subsections"]:
        add_h3(subsec["subtitle"])
        for p_txt in subsec["paragraphs"]:
            add_body(p_txt)
        if "code" in subsec:
            add_code_block(subsec["code"])
        doc.add_paragraph().paragraph_format.space_after = Pt(4)

add_h2("4.3 System Screen Snapshots & Operational Walkthrough")
screenshots_data = [
    (os.path.join(ROOT_DIR, "images", "screenshot_grid.png"), "Figure 4.1: AlgoLenz Interactive 2D Grid Pathfinding Canvas demonstrating shortest path exploration with live node inspection and telemetry panel.", "The Interactive Grid Pathfinding Canvas provides an interactive visual laboratory for understanding graph search algorithms. Users can dynamically draw impassable wall barriers, place high-friction mud terrain, and relocate start and destination anchors in real time. The canvas leverages high-performance HTML5 Canvas rendering to guarantee a steady 60 FPS animation loop while animating frontier exploration."),
    (os.path.join(ROOT_DIR, "images", "screenshot_comparison.png"), "Figure 4.2: Dual-Algorithm Comparative Benchmarking Arena executing Dijkstra vs A* concurrently on identical terrain.", "The Comparison Arena provides side-by-side empirical verification of theoretical time and space complexity. Two independent algorithms run in synchronized lockstep across identical grid topologies, exposing the immense efficiency gains of heuristic guidance (A*) over blind uniform-cost exploration (Dijkstra). Live telemetry cards record nodes visited, execution duration, and optimal path length."),
    (os.path.join(ROOT_DIR, "images", "screenshot_multistop.png"), "Figure 4.3: Traveling Salesperson Problem (TSP) Multi-Stop Dispatch solving logistics delivery tours with 2-Opt local search untangling.", "The Multi-Stop Delivery Dispatch module visualizes solutions to the NP-Hard Traveling Salesperson Problem (TSP). Users place multiple customer delivery markers across an interactive plane. The system executes both Nearest Neighbor heuristics and exact Held-Karp Bitmask Dynamic Programming, applying 2-Opt edge swaps to visually untangle crossing routes and eliminate geometric inefficiencies."),
    (os.path.join(ROOT_DIR, "images", "screenshot_citymap.png"), "Figure 4.4: Real-World Geospatial City Map Routing using Leaflet.js and OpenStreetMap cartography across Indian metropolitan road networks.", "The Geospatial City Map module bridges theoretical textbook graph models with real-world road networks. Powered by Leaflet.js and OpenStreetMap vector tiles, users select major metropolitan centers (e.g., New Delhi, Mumbai, Kanpur) and compute real-world shortest paths across urban intersections, demonstrating practical GPS route planning principles."),
    (os.path.join(ROOT_DIR, "images", "screenshot_sorting.png"), "Figure 4.5: Audio-Visual Sorting Studio featuring HTML5 Web Audio pitch synthesis and synchronized algorithm telemetry.", "The Sorting Studio transforms numerical array ordering into a multi-sensory audio-visual experience. As algorithms (Quick Sort, Merge Sort, Heap Sort) execute array comparisons and element swaps, the platform synthesizes real-time acoustic sine tones mapped directly to numerical bar heights (120 Hz to 1200 Hz), producing distinctive auditory signatures for each sorting paradigm.")
]

for img_rel_path, caption_txt, desc_txt in screenshots_data:
    img_abs = os.path.abspath(img_rel_path)
    if os.path.exists(img_abs):
        p_img = doc.add_paragraph()
        p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_img.paragraph_format.space_before = Pt(8)
        p_img.paragraph_format.space_after = Pt(4)
        p_img.add_run().add_picture(img_abs, width=Inches(5.5))
        
        p_cap = doc.add_paragraph()
        p_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_cap.paragraph_format.space_before = Pt(2)
        p_cap.paragraph_format.space_after = Pt(6)
        r_cap = p_cap.add_run(caption_txt)
        r_cap.font.name = "Times New Roman"
        r_cap.font.size = Pt(10)
        r_cap.font.bold = True
        r_cap.font.italic = True
        
        add_body(desc_txt)
        doc.add_paragraph().paragraph_format.space_after = Pt(6)

doc.add_page_break()

# ==========================================
# CHAPTER V: TESTING & QUALITY ASSURANCE (EXPANDED)
# ==========================================
add_h1(ech5_6.CH5_TITLE)

for sec in ech5_6.CH5_SECTIONS:
    add_h2(sec["title"])
    for subsec in sec["subsections"]:
        add_h3(subsec["subtitle"])
        for p_txt in subsec["paragraphs"]:
            add_body(p_txt)
        doc.add_paragraph().paragraph_format.space_after = Pt(4)

add_h3("Comprehensive Test Cases Execution Matrix (25 Test Cases)")
tbl_tc = doc.add_table(rows=len(ech5_6.TEST_CASES_EXPANDED) + 1, cols=5)
tbl_tc.alignment = WD_TABLE_ALIGNMENT.CENTER
tc_headers = ["Test ID", "Module / Algorithm", "Input Condition", "Expected Output", "Result"]
for c_i, h_txt in enumerate(tc_headers):
    cell = tbl_tc.rows[0].cells[c_i]
    r = cell.paragraphs[0].add_run(h_txt)
    r.font.name = "Times New Roman"
    r.font.size = Pt(9.5)
    r.font.bold = True
    cell.paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER
    set_cell_bg(cell, "F2F2F2")
    set_cell_borders(cell, top={'sz':4,'val':'single'}, bottom={'sz':8,'val':'single'}, left={'sz':4,'val':'single'}, right={'sz':4,'val':'single'})
    set_cell_margins(cell, 35, 35, 45, 45)

for r_i, r_vals in enumerate(ech5_6.TEST_CASES_EXPANDED):
    row = tbl_tc.rows[r_i + 1]
    for c_i, val in enumerate(r_vals):
        cell = row.cells[c_i]
        r = cell.paragraphs[0].add_run(val)
        r.font.name = "Times New Roman"
        r.font.size = Pt(9)
        if c_i in [0, 4]:
            cell.paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER
            if c_i == 4 and val == "PASSED":
                r.font.bold = True
        set_cell_borders(cell, top={'sz':2,'val':'single','color':'CCCCCC'}, bottom={'sz':2,'val':'single','color':'CCCCCC'}, left={'sz':2,'val':'single','color':'CCCCCC'}, right={'sz':2,'val':'single','color':'CCCCCC'})
        set_cell_margins(cell, 30, 30, 45, 45)

doc.add_page_break()

# ==========================================
# CHAPTER VI: CONCLUSION & FUTURE SCOPE (EXPANDED)
# ==========================================
add_h1(ech5_6.CH6_TITLE)

for sec in ech5_6.CH6_SECTIONS:
    add_h2(sec["title"])
    for subsec in sec["subsections"]:
        add_h3(subsec["subtitle"])
        for p_txt in subsec["paragraphs"]:
            add_body(p_txt)
        doc.add_paragraph().paragraph_format.space_after = Pt(4)

doc.add_page_break()

# ==========================================
# CHAPTER VII: SYSTEM USER MANUAL & DEPLOYMENT GUIDE
# ==========================================
add_h1("CHAPTER-VII: SYSTEM USER MANUAL & DEPLOYMENT GUIDE")

for sec in emanual.MANUAL_SECTIONS:
    add_h2(sec["title"])
    for subsec in sec["subsections"]:
        add_h3(subsec["subtitle"])
        for p_txt in subsec["paragraphs"]:
            add_body(p_txt)
        doc.add_paragraph().paragraph_format.space_after = Pt(4)

doc.add_page_break()

# ==========================================
# CHAPTER VIII: FORMAL MATHEMATICAL PROOFS OF CORRECTNESS
# ==========================================
add_h1("CHAPTER-VIII: FORMAL MATHEMATICAL PROOFS OF CORRECTNESS")

for sec in eproofs.PROOF_SECTIONS:
    add_h2(sec["title"])
    for subsec in sec["subsections"]:
        add_h3(subsec["subtitle"])
        for p_txt in subsec["paragraphs"]:
            add_body(p_txt)
        doc.add_paragraph().paragraph_format.space_after = Pt(4)

doc.add_page_break()

# ==========================================
# CHAPTER IX: PRODUCTION SOURCE CODE MODULES & ANNOTATIONS
# ==========================================
add_h1("CHAPTER-IX: PRODUCTION SOURCE CODE MODULES & ANNOTATIONS")

for item in emanual.EXTENDED_SOURCE_CODE:
    add_h2(f"Source Module: {item['filename']}")
    add_body(item['description'])
    add_code_block(item['code'])
    doc.add_paragraph().paragraph_format.space_after = Pt(6)

doc.add_page_break()

# ==========================================
# REFERENCES & BIBLIOGRAPHY (EXPANDED)
# ==========================================
add_h1("REFERENCES & BIBLIOGRAPHY")

tbl_ref = doc.add_table(rows=len(ech5_6.REFERENCES_EXPANDED), cols=2)
tbl_ref.alignment = WD_TABLE_ALIGNMENT.CENTER
tbl_ref.rows[0].cells[0].width = Inches(0.8)
tbl_ref.rows[0].cells[1].width = Inches(5.47)

for r_i, (ref_id, ref_text) in enumerate(ech5_6.REFERENCES_EXPANDED):
    c0 = tbl_ref.rows[r_i].cells[0]
    c1 = tbl_ref.rows[r_i].cells[1]
    c0.width = Inches(0.8)
    c1.width = Inches(5.47)
    
    r0 = c0.paragraphs[0].add_run(f"[{ref_id}]")
    r0.font.name = "Times New Roman"
    r0.font.size = Pt(10)
    r0.font.bold = True
    c0.paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER
    
    r1 = c1.paragraphs[0].add_run(ref_text)
    r1.font.name = "Times New Roman"
    r1.font.size = Pt(10)
    c1.paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    
    set_cell_borders(c0)
    set_cell_borders(c1)
    set_cell_margins(c0, 35, 35, 50, 50)
    set_cell_margins(c1, 35, 35, 50, 50)

output_file = os.path.join(DOCS_DIR, "project_report.docx")
doc.save(output_file)
print(f"SUCCESS: Saved comprehensive 50+ page report to {output_file}!")
