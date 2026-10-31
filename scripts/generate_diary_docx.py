import os
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

doc = Document()

# Set standard page size A4 and margins (0.5 inch / 36 pt)
for section in doc.sections:
    section.page_width = Inches(8.27)
    section.page_height = Inches(11.69)
    section.top_margin = Inches(0.5)
    section.bottom_margin = Inches(0.5)
    section.left_margin = Inches(0.65)
    section.right_margin = Inches(0.65)

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCS_DIR = os.path.join(ROOT_DIR, "docs")
ASSETS_DIR = os.path.join(DOCS_DIR, "assets")

LOGO_PATH = os.path.join(ASSETS_DIR, "psit_logo.jpg")

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

def add_college_header(doc):
    tbl = doc.add_table(rows=1, cols=2)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl.autofit = False
    
    c_left = tbl.cell(0, 0)
    c_left.width = Inches(5.5)
    p_l = c_left.paragraphs[0]
    p_l.paragraph_format.space_before = Pt(0)
    p_l.paragraph_format.space_after = Pt(0)
    p_l.paragraph_format.line_spacing = 1.15
    
    r1 = p_l.add_run("PSIT-College of Higher Education\n")
    r1.font.name = "Times New Roman"
    r1.font.size = Pt(14)
    r1.font.bold = True
    
    r2 = p_l.add_run("Kanpur-Delhi National Highway (NH-19), Bhauti, Kanpur-209305 (U.P.), India")
    r2.font.name = "Times New Roman"
    r2.font.size = Pt(8.5)
    r2.font.color.rgb = RGBColor(50, 50, 50)
    
    c_right = tbl.cell(0, 1)
    c_right.width = Inches(1.5)
    p_r = c_right.paragraphs[0]
    p_r.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_r.paragraph_format.space_before = Pt(0)
    p_r.paragraph_format.space_after = Pt(0)
    if os.path.exists(LOGO_PATH):
        p_r.add_run().add_picture(LOGO_PATH, width=Inches(1.15))
        
    for row in tbl.rows:
        for cell in row.cells:
            set_cell_borders(cell, bottom={'sz': 12, 'val': 'single', 'color': '000000'})
            set_cell_margins(cell, top=20, bottom=60, left=50, right=50)

def add_college_footer(doc):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(16)
    p.paragraph_format.space_after = Pt(0)
    
    r_l = p.add_run("Department of Computer Applications")
    r_l.font.name = "Times New Roman"
    r_l.font.size = Pt(9)
    r_l.font.italic = True
    
    p.paragraph_format.tab_stops.add_tab_stop(Inches(7.0))
    r_r = p.add_run("\tMinor Project 2026-27")
    r_r.font.name = "Times New Roman"
    r_r.font.size = Pt(9)
    r_r.font.italic = True

def add_styled_para(doc, text, size=11, bold=False, italic=False, align=WD_ALIGN_PARAGRAPH.LEFT, space_before=0, space_after=4, line_spacing=1.2):
    p = doc.add_paragraph()
    p.alignment = align
    p.paragraph_format.space_before = Pt(space_before)
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.line_spacing = line_spacing
    r = p.add_run(text)
    r.font.name = "Times New Roman"
    r.font.size = Pt(size)
    r.font.bold = bold
    r.font.italic = italic
    return p

# ==========================================
# PAGE 1: COVER PAGE
# ==========================================
add_college_header(doc)
add_styled_para(doc, "DEPARTMENT OF COMPUTER APPLICATIONS", size=16, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=15, space_after=10)
add_styled_para(doc, "Minor Project\n(2026-2027)", size=14, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=5, space_after=15)
add_styled_para(doc, "PROGRESS DIARY\n(BCA-5005)", size=16, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=5, space_after=18)
add_styled_para(doc, "AlgoLenz: Interactive Data Structures, Pathfinding & Sorting Visualization Platform", size=13, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=0, space_after=18)

p_names = doc.add_paragraph()
p_names.alignment = WD_ALIGN_PARAGRAPH.CENTER
p_names.paragraph_format.space_before = Pt(0)
p_names.paragraph_format.space_after = Pt(15)
p_names.paragraph_format.line_spacing = 1.4
for name, roll in [("Naitik", "24116002322"), ("Kashish Gupta", "24116002274"), ("Naitik Mishra", "24116002324"), ("Khushboo Rajpoot", "24116002277")]:
    r = p_names.add_run(f"{name}, Roll No: {roll}\n")
    r.font.name = "Times New Roman"
    r.font.size = Pt(12)
    r.font.bold = True

add_styled_para(doc, "Project_Id: BCA-2026-MP-042", size=13, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=0, space_after=14)
add_styled_para(doc, "Supervisor Name: Dr. Amit Yadav\n(Professor)", size=13, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=0, space_after=15)

if os.path.exists(LOGO_PATH):
    p_logo = doc.add_paragraph()
    p_logo.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_logo.paragraph_format.space_before = Pt(0)
    p_logo.paragraph_format.space_after = Pt(10)
    p_logo.add_run().add_picture(LOGO_PATH, width=Inches(1.25))

add_college_footer(doc)
doc.add_page_break()

# ==========================================
# PAGE 2: VISION, MISSION, PEOS, PO1
# ==========================================
add_college_header(doc)
add_styled_para(doc, "Department Vision Statement", size=13, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=10, space_after=6)
add_styled_para(doc, "To be a recognized department of Computer Application that produces versatile computer professional with the ability to adapt to the changing needs of computer and related Industry.", size=10.5, italic=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=0, space_after=12)

add_styled_para(doc, "Department Mission Statements", size=13, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=6, space_after=6)
add_styled_para(doc, "The mission of the Department of Computer Applications is:", size=10.5, space_before=0, space_after=4)

for item in [
    "1. To provide broad based quality education with knowledge and attitude to succeed in Computer Application career.",
    "2. To prepare students for emerging trends in Computer and related industry.",
    "3. To develop competence in students by providing them skills and aptitude to foster culture of continuous and lifelong learning.",
    "4. To develop practicing professionals who investigate, design and find workable solution to the related complex problems with awareness and concern for society and environment."
]:
    add_styled_para(doc, item, size=10, space_before=0, space_after=3)

add_styled_para(doc, "Program Educational Objectives (PEOs)", size=13, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=8, space_after=6)
peos = [
    ("PEO-1", "Graduates will be efficient leading professionals with the knowledge of computer application discipline that enables them to pursue higher education and/or successful careers in national and global realms."),
    ("PEO-2", "Graduates will possess the capability of designing successful and sustainable innovative solutions to real life problems that are technically sound, economically viable and socially acceptable."),
    ("PEO-3", "Graduates will be competent team leaders, effective communicators and capable of working in multidisciplinary teams following ethical values."),
    ("PEO-4", "Graduates will be capable of adapting to new technologies/tools, constantly upgrading their knowledge and skills with an attitude for life-long learning."),
    ("PEO-5", "Graduates with an aptitude of self-employment will be able to initiate and build upon entrepreneurial ventures or demonstrate enterprising expertise for their employer organization.")
]
for code, desc in peos:
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(3)
    p.paragraph_format.line_spacing = 1.15
    r_code = p.add_run(f"{code} ")
    r_code.font.name = "Times New Roman"
    r_code.font.size = Pt(9.5)
    r_code.font.bold = True
    r_desc = p.add_run(desc)
    r_desc.font.name = "Times New Roman"
    r_desc.font.size = Pt(9.5)

add_styled_para(doc, "Department Program Outcomes (POs)", size=12, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=6, space_after=4)
add_styled_para(doc, "The students of Computer Application Department will be able:", size=10, space_before=0, space_after=4)

tbl_po1 = doc.add_table(rows=1, cols=2)
tbl_po1.alignment = WD_TABLE_ALIGNMENT.CENTER
tbl_po1.rows[0].cells[0].width = Inches(1.0)
tbl_po1.rows[0].cells[1].width = Inches(6.0)
r_p1 = tbl_po1.rows[0].cells[0].paragraphs[0].add_run("PO1")
r_p1.font.bold = True
r_p1.font.name = "Times New Roman"
tbl_po1.rows[0].cells[0].paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER
r_p1_d = tbl_po1.rows[0].cells[1].paragraphs[0].add_run("Computer Application Knowledge: Apply the knowledge of mathematics, social science, fundamentals of computer application, and management to the solution of complex problems.")
r_p1_d.font.name = "Times New Roman"
r_p1_d.font.size = Pt(9.5)
for c in tbl_po1.rows[0].cells:
    set_cell_borders(c, top={'sz':4,'val':'single'}, bottom={'sz':4,'val':'single'}, left={'sz':4,'val':'single'}, right={'sz':4,'val':'single'})
    set_cell_margins(c, 80, 80, 100, 100)

add_college_footer(doc)
doc.add_page_break()

# ==========================================
# PAGE 3: PO2 TO PO10
# ==========================================
add_college_header(doc)
pos_list = [
    ("PO2", "Problem Analysis: Identify, formulate, review research literature, and analyse complex problems reaching substantiated conclusions using basic principles."),
    ("PO3", "Design/Development of Solutions: Design solutions for complex computer application problems and design system processes that meet the specified needs with appropriate consideration for the public health and safety, and the cultural, societal, and environmental considerations."),
    ("PO4", "Conduct Investigations of Complex Problems: Use research-based knowledge and research methods including design of experiments, including analysis and interpretation of data, and synthesis of information to provide valid conclusions for complex problems – that cannot be solved by straightforward application of knowledge; that may not have a unique solution; that require consideration of constraints; which need to be defined within appropriate mathematical frameworks."),
    ("PO5", "Modern Tool Usage: Create, select, and apply appropriate techniques, resources, and modern Computer Application and IT tools including prediction and modelling to complex Computer Application activities with an understanding of the limitations."),
    ("PO6", "The Computer Professionals and Society: Apply reasoning informed by the contextual knowledge to assess societal, health, safety, legal and cultural issues and the consequent responsibilities relevant to the professional computer application practice."),
    ("PO7", "Environment and Sustainability: Understand the impact of the professional computer application solutions in societal and environmental contexts, and demonstrate the knowledge of, and need for sustainable development."),
    ("PO8", "Ethics: Apply ethical principles and commit to professional ethics and responsibilities and norms of the computer application practice."),
    ("PO9", "Individual and Teamwork: Function effectively as an individual, and as a member or leader in diverse teams, and in multidisciplinary settings."),
    ("PO10", "Communication: Communicate effectively on complex Computer Application activities with the community and with society at large, such as, being able to comprehend and write effective reports and design/maintain documentation, make effective presentations, and give and receive clear instructions.")
]

tbl_pos = doc.add_table(rows=len(pos_list), cols=2)
tbl_pos.alignment = WD_TABLE_ALIGNMENT.CENTER
for idx, (p_code, p_desc) in enumerate(pos_list):
    c0 = tbl_pos.rows[idx].cells[0]
    c1 = tbl_pos.rows[idx].cells[1]
    c0.width = Inches(0.9)
    c1.width = Inches(6.1)
    
    r_code = c0.paragraphs[0].add_run(p_code)
    r_code.font.bold = True
    r_code.font.name = "Times New Roman"
    c0.paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER
    
    r_desc = c1.paragraphs[0].add_run(p_desc)
    r_desc.font.name = "Times New Roman"
    r_desc.font.size = Pt(9)
    
    set_cell_borders(c0, top={'sz':4,'val':'single'}, bottom={'sz':4,'val':'single'}, left={'sz':4,'val':'single'}, right={'sz':4,'val':'single'})
    set_cell_borders(c1, top={'sz':4,'val':'single'}, bottom={'sz':4,'val':'single'}, left={'sz':4,'val':'single'}, right={'sz':4,'val':'single'})
    set_cell_margins(c0, 60, 60, 80, 80)
    set_cell_margins(c1, 60, 60, 80, 80)

add_college_footer(doc)
doc.add_page_break()

# ==========================================
# PAGE 4: PO11-PO12, COS, CO-PO MAPPING
# ==========================================
add_college_header(doc)
tbl_p11 = doc.add_table(rows=2, cols=2)
tbl_p11.alignment = WD_TABLE_ALIGNMENT.CENTER
for idx, (p_code, p_desc) in enumerate([
    ("PO11", "Project Management and Finance: Demonstrate knowledge and understanding of the computer application and management principles and apply these to one’s own work, as a member and leader in a team, to manage projects and in multidisciplinary environments."),
    ("PO12", "Life-long Learning: Recognize the need for and have the preparation and ability to engage in independent and lifelong learning in the broadest context of technological change.")
]):
    c0 = tbl_p11.rows[idx].cells[0]
    c1 = tbl_p11.rows[idx].cells[1]
    c0.width = Inches(0.9)
    c1.width = Inches(6.1)
    r = c0.paragraphs[0].add_run(p_code)
    r.font.bold = True
    r.font.name = "Times New Roman"
    c0.paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_d = c1.paragraphs[0].add_run(p_desc)
    r_d.font.name = "Times New Roman"
    r_d.font.size = Pt(9.5)
    set_cell_borders(c0, top={'sz':4,'val':'single'}, bottom={'sz':4,'val':'single'}, left={'sz':4,'val':'single'}, right={'sz':4,'val':'single'})
    set_cell_borders(c1, top={'sz':4,'val':'single'}, bottom={'sz':4,'val':'single'}, left={'sz':4,'val':'single'}, right={'sz':4,'val':'single'})
    set_cell_margins(c0, 60, 60, 80, 80)
    set_cell_margins(c1, 60, 60, 80, 80)

add_styled_para(doc, "Course Outcomes:", size=11, bold=True, space_before=10, space_after=4)
add_styled_para(doc, "On successful completion of this course:", size=10, space_before=0, space_after=4)

tbl_cos = doc.add_table(rows=5, cols=2)
tbl_cos.alignment = WD_TABLE_ALIGNMENT.CENTER
co_data = [
    ("S No", "Course Outcome"),
    ("CO1", "Identify [L1: Remember] and finalize the problem statement by surveying a variety of domains."),
    ("CO2", "Specify [L2: Understand] the design methodologies appropriate to solve the problem."),
    ("CO3", "Apply [L3: Apply] appropriate tools and techniques, resources to implement design exhibiting integrity and ethical behaviour of engineering practices."),
    ("CO4", "Test and defend [L4: Analyse] their work along with their team members through reports and presentations.")
]
for r_idx, (c0_text, c1_text) in enumerate(co_data):
    c0 = tbl_cos.rows[r_idx].cells[0]
    c1 = tbl_cos.rows[r_idx].cells[1]
    c0.width = Inches(0.9)
    c1.width = Inches(6.1)
    r0 = c0.paragraphs[0].add_run(c0_text)
    r1 = c1.paragraphs[0].add_run(c1_text)
    r0.font.name = "Times New Roman"
    r1.font.name = "Times New Roman"
    r0.font.size = Pt(9.5)
    r1.font.size = Pt(9.5)
    if r_idx == 0:
        r0.font.bold = True
        r1.font.bold = True
        set_cell_bg(c0, "F2F2F2")
        set_cell_bg(c1, "F2F2F2")
    set_cell_borders(c0, top={'sz':4,'val':'single'}, bottom={'sz':4,'val':'single'}, left={'sz':4,'val':'single'}, right={'sz':4,'val':'single'})
    set_cell_borders(c1, top={'sz':4,'val':'single'}, bottom={'sz':4,'val':'single'}, left={'sz':4,'val':'single'}, right={'sz':4,'val':'single'})
    set_cell_margins(c0, 50, 50, 80, 80)
    set_cell_margins(c1, 50, 50, 80, 80)

add_styled_para(doc, "CO-PO/PSO Mapping:", size=11, bold=True, space_before=10, space_after=4)
tbl_map = doc.add_table(rows=6, cols=13)
tbl_map.alignment = WD_TABLE_ALIGNMENT.CENTER
map_rows = [
    ["CO", "PO1", "PO2", "PO3", "PO4", "PO5", "PO6", "PO7", "PO8", "PO9", "PO10", "PO11", "PO12"],
    ["CO1", "3", "", "", "", "", "", "3", "3", "", "3", "3", "3"],
    ["CO2", "", "3", "", "2", "", "3", "", "3", "3", "", "3", ""],
    ["CO3", "", "", "3", "2", "3", "", "", "3", "3", "", "3", "3"],
    ["CO4", "", "", "", "", "", "", "", "3", "3", "3", "3", ""],
    ["Avg", "3", "3", "3", "2", "3", "3", "3", "3", "3", "3", "3", "3"]
]
for r_i, r_vals in enumerate(map_rows):
    for c_i, val in enumerate(r_vals):
        cell = tbl_map.rows[r_i].cells[c_i]
        r = cell.paragraphs[0].add_run(val)
        r.font.name = "Times New Roman"
        r.font.size = Pt(8.5)
        cell.paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER
        if r_i == 0 or r_i == 5:
            r.font.bold = True
            set_cell_bg(cell, "F2F2F2")
        set_cell_borders(cell, top={'sz':4,'val':'single'}, bottom={'sz':4,'val':'single'}, left={'sz':4,'val':'single'}, right={'sz':4,'val':'single'})
        set_cell_margins(cell, 40, 40, 40, 40)

add_college_footer(doc)
doc.add_page_break()

# ==========================================
# PAGE 5: INNER TITLE PAGE WITH BORDER BOX
# ==========================================
add_college_header(doc)
box_tbl = doc.add_table(rows=1, cols=1)
box_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
box_cell = box_tbl.rows[0].cells[0]
box_cell.width = Inches(7.0)
set_cell_borders(box_cell, top={'sz':16,'val':'single'}, bottom={'sz':16,'val':'single'}, left={'sz':16,'val':'single'}, right={'sz':16,'val':'single'})
set_cell_margins(box_cell, 250, 250, 250, 250)

p_b1 = box_cell.paragraphs[0]
p_b1.alignment = WD_ALIGN_PARAGRAPH.CENTER
p_b1.paragraph_format.line_spacing = 1.3
r_title = p_b1.add_run("AlgoLenz: Interactive Data Structures, Pathfinding & Sorting Visualization Platform\n\n")
r_title.font.name = "Times New Roman"
r_title.font.size = Pt(15)
r_title.font.bold = True

r_a = p_b1.add_run("A\n\nReport submitted in partial fulfillment of the requirement for the degree of\n\n")
r_a.font.name = "Times New Roman"
r_a.font.size = Pt(12)

r_bca = p_b1.add_run("BCA\n\n\n")
r_bca.font.name = "Times New Roman"
r_bca.font.size = Pt(15)
r_bca.font.bold = True

r_sup = p_b1.add_run("Under the Supervision of\n\nDr. Amit Yadav\n(Professor)\n\n\nBy\n\n")
r_sup.font.name = "Times New Roman"
r_sup.font.size = Pt(12)

r_students = p_b1.add_run("Naitik (Roll No: 24116002322)\nKashish Gupta (Roll No: 24116002274)\nNaitik Mishra (Roll No: 24116002324)\nKhushboo Rajpoot (Roll No: 24116002277)\n\n\n")
r_students.font.name = "Times New Roman"
r_students.font.size = Pt(12)
r_students.font.bold = True

if os.path.exists(LOGO_PATH):
    p_b1.add_run().add_picture(LOGO_PATH, width=Inches(1.1))
    p_b1.add_run("\n\n")

r_inst = p_b1.add_run("PSIT College Of Higher Education, Kanpur\nC.S.J.M. University\nKanpur")
r_inst.font.name = "Times New Roman"
r_inst.font.size = Pt(13)
r_inst.font.bold = True

add_college_footer(doc)
doc.add_page_break()

# ==========================================
# PAGE 6: DECLARATION
# ==========================================
add_college_header(doc)
add_styled_para(doc, "DECLARATION", size=14, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=25, space_after=30)
p_dec1 = add_styled_para(doc, "We hereby declare that the work presented in this report entitled “AlgoLenz: Interactive Data Structures, Pathfinding & Sorting Visualization Platform”, was carried out by us. We have not submitted the matter embodied in this report for the award of any other degree or diploma of any other University or Institute.", size=12, space_before=0, space_after=18, line_spacing=1.5)
p_dec1.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY

p_dec2 = add_styled_para(doc, "We have given due credit to the original authors/sources for all the words, ideas, diagrams, graphics, computer programs, experiments, results, that are not my original contribution. We have used quotation marks to identify verbatim sentences and given credit to the original authors/sources.", size=12, space_before=0, space_after=18, line_spacing=1.5)
p_dec2.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY

p_dec3 = add_styled_para(doc, "We affirm that no portion of my work is plagiarized, and the experiments and results reported in the report are not manipulated. In the event of a complaint of plagiarism and the manipulation of the experiments and results, we shall be fully responsible and answerable.", size=12, space_before=0, space_after=40, line_spacing=1.5)
p_dec3.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY

add_styled_para(doc, "Name : Naitik, Kashish Gupta, Naitik Mishra, Khushboo Rajpoot", size=12, space_before=10, space_after=8)
add_styled_para(doc, "Roll. No : 24116002322, 24116002274, 24116002324, 24116002277", size=12, space_before=0, space_after=20)
add_styled_para(doc, "Signature : __________________________________________________", size=12, space_before=0, space_after=10)

add_college_footer(doc)
doc.add_page_break()

# ==========================================
# PAGE 7: CERTIFICATE
# ==========================================
add_college_header(doc)
add_styled_para(doc, "Certificate", size=14, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=25, space_after=35)

p_cert1 = add_styled_para(doc, "This is to certify that Project Report entitled “AlgoLenz: Interactive Data Structures, Pathfinding & Sorting Visualization Platform” which is submitted by Naitik (24116002322), Kashish Gupta (24116002274), Naitik Mishra (24116002324), and Khushboo Rajpoot (24116002277) in partial fulfilment of the requirement for the award of degree B.C.A of PSIT-College Of Higher Education, affiliated to C.SJ.M. University, Kanpur is a record of the candidates own work carried out by them under my/our supervision.", size=12, space_before=0, space_after=20, line_spacing=1.5)
p_cert1.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY

p_cert2 = add_styled_para(doc, "The project embodies result of original work and studies carried out by the students themselves and the contents of the project do not form the basis for the award of any other degree to the candidate or to anybody else.", size=12, space_before=0, space_after=70, line_spacing=1.5)
p_cert2.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY

tbl_sig = doc.add_table(rows=1, cols=2)
tbl_sig.alignment = WD_TABLE_ALIGNMENT.CENTER
tbl_sig.rows[0].cells[0].width = Inches(3.5)
tbl_sig.rows[0].cells[1].width = Inches(3.5)
p_s1 = tbl_sig.rows[0].cells[0].paragraphs[0]
p_s1.add_run("Signature: __________________________\n\n").font.name = "Times New Roman"
r_hod = p_s1.add_run("HOD BCA\n")
r_hod.font.bold = True
r_hod.font.name = "Times New Roman"
p_s1.add_run("Department of Computer Applications").font.name = "Times New Roman"

p_s2 = tbl_sig.rows[0].cells[1].paragraphs[0]
p_s2.alignment = WD_ALIGN_PARAGRAPH.RIGHT
p_s2.add_run("Signature: __________________________\n\n").font.name = "Times New Roman"
r_sup = p_s2.add_run("Dr. Amit Yadav\n")
r_sup.font.bold = True
r_sup.font.name = "Times New Roman"
p_s2.add_run("Supervisor, Professor").font.name = "Times New Roman"

for c in tbl_sig.rows[0].cells:
    set_cell_borders(c)

add_college_footer(doc)
doc.add_page_break()

# ==========================================
# PAGE 8: ABSTRACT
# ==========================================
add_college_header(doc)
add_styled_para(doc, "Abstract", size=14, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=20, space_after=25)

p_abs1 = add_styled_para(doc, "In contemporary computer science pedagogy, students frequently encounter cognitive friction when attempting to bridge the conceptual gap between theoretical pseudocode and dynamic runtime algorithmic behavior. Abstract notions such as priority queue node relaxations, heuristic evaluations, array partitioning, and recursive backtracking remain difficult to comprehend using static 2D textbook diagrams. To resolve this instructional bottleneck, this project introduces AlgoLenz, an interactive, high-performance web-based algorithm visualization and telemetry benchmarking platform inspired by pedagogical environments like VisuAlgo.", size=12, space_before=0, space_after=14, line_spacing=1.5)
p_abs1.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY

p_abs2 = add_styled_para(doc, "AlgoLenz provides an end-to-end multi-paradigm simulation suite developed with React 18, TypeScript 5, Vite, and Tailwind CSS. The platform is structured around five core modules: (1) an Interactive 2D Grid Pathfinding Visualizer that simulates Dijkstra’s algorithm, A* search, Breadth-First Search (BFS), Depth-First Search (DFS), and Bellman-Ford across weighted grids, custom terrain weights, and procedural mazes (Recursive Division and Random Walls); (2) a Geospatial Map Routing Engine integrated with Leaflet.js that executes shortest path algorithms on real-world road networks and geographical coordinates; (3) a Multi-Stop Traveling Salesperson Problem (TSP) Optimizer modeling realistic delivery dispatch heuristics across distributed waypoints; (4) a Comparative Arena that executes dual algorithms concurrently under identical input conditions to evaluate time complexity, nodes explored, and path lengths; and (5) an Audio-Visual Sorting Engine visualizing Bubble, Selection, Insertion, Merge, Quick, and Heap Sort with real-time audio frequency synthesis generated through the Web Audio API to mirror element swaps and partition boundaries.", size=12, space_before=0, space_after=14, line_spacing=1.5)
p_abs2.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY

p_abs3 = add_styled_para(doc, "Architected with a decoupled state machine powered by the React Context API, AlgoLenz features bidirectional playback controls (step-forward, step-backward, pause, speed throttle) and synchronized code inspectors highlighting active lines of code in real time. The resulting platform delivers an accessible, production-ready educational tool that significantly improves student comprehension of computational complexity, graph theory, and sorting efficiency.", size=12, space_before=0, space_after=14, line_spacing=1.5)
p_abs3.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY

add_college_footer(doc)
doc.add_page_break()

# ==========================================
# PAGE 9: SYNOPSIS (PLACEHOLDER)
# ==========================================
add_college_header(doc)
add_styled_para(doc, "Synopsis", size=14, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=80, space_after=20)
add_styled_para(doc, "(Attach the signed copy of synopsis here).", size=13, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=0, space_after=10)
add_styled_para(doc, "(This page should not be printed)", size=11, italic=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=0, space_after=10)

add_college_footer(doc)
doc.add_page_break()

# ==========================================
# PAGE 10: PROJECT SCHEDULE (ODD SEM 2026-2027)
# ==========================================
add_college_header(doc)
add_styled_para(doc, "Minor Project-Time Line", size=11, italic=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=5, space_after=4)
add_styled_para(doc, "PROJECT SCHEDULE ODD SEM 2026-2027", size=13, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=0, space_after=15)

tbl_sched = doc.add_table(rows=7, cols=4)
tbl_sched.alignment = WD_TABLE_ALIGNMENT.CENTER
sched_data = [
    ("ACTIVITY", "DEADLINE", "PERSON INCHARGE", "DOCUMENT/FORM"),
    ("Title/Group Formation/\nSupervisor Allocation", "Till 24th July-2026", "Supervisor/Group leader", "Project Proposal"),
    ("Proposal Submission", "Till 14th Aug-2026", "Supervisor/DPC", "Project Proposal"),
    ("Progress Evaluation 1", "During CT-I", "DPC/ Evaluators", "Power Point Presentation/Synopsis"),
    ("Weekly performance Monitoring", "Throughout the semester", "Supervisor", "Project Diary"),
    ("Progress Evaluation 2", "During CT-II", "DPC/ Evaluators", "Power Point Presentation"),
    ("End Semester Report (Project work Submission)/\nFinal Evaluation", "During PU", "Supervisor", "Project Diary/\nPower Point Presentation")
]
for r_i, r_vals in enumerate(sched_data):
    for c_i, val in enumerate(r_vals):
        cell = tbl_sched.rows[r_i].cells[c_i]
        r = cell.paragraphs[0].add_run(val)
        r.font.name = "Times New Roman"
        r.font.size = Pt(9.5)
        if r_i == 0:
            r.font.bold = True
            cell.paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER
            set_cell_bg(cell, "F2F2F2")
        elif c_i in [1, 2]:
            cell.paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER
        set_cell_borders(cell, top={'sz':4,'val':'single'}, bottom={'sz':4,'val':'single'}, left={'sz':4,'val':'single'}, right={'sz':4,'val':'single'})
        set_cell_margins(cell, 60, 60, 70, 70)

add_college_footer(doc)
doc.add_page_break()

# ==========================================
# PAGES 11 TO 20: 10 WEEKS PROGRESS SHEETS
# ==========================================
import json
with open("scripts/generate_diary_html.py", "r", encoding="utf-8") as f:
    pass

import sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from generate_diary_html import weeks_data

for w in weeks_data:
    add_college_header(doc)
    add_styled_para(doc, "(To be filled by Students for every week to show the Weekly Progress of Project)", size=10, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=2, space_after=3)
    
    # Meta row 1
    p_m1 = doc.add_paragraph()
    p_m1.paragraph_format.space_before = Pt(0)
    p_m1.paragraph_format.space_after = Pt(2)
    r_sub = p_m1.add_run("Subject Code: BCA 5005")
    r_sub.font.bold = True
    r_sub.font.name = "Times New Roman"
    r_sub.font.size = Pt(10)
    p_m1.paragraph_format.tab_stops.add_tab_stop(Inches(6.8))
    r_grp = p_m1.add_run("\tGroup Id: BCA-2026-MP-042")
    r_grp.font.bold = True
    r_grp.font.name = "Times New Roman"
    r_grp.font.size = Pt(10)
    
    # Meta row 2
    p_m2 = doc.add_paragraph()
    p_m2.paragraph_format.space_before = Pt(0)
    p_m2.paragraph_format.space_after = Pt(4)
    r_date = p_m2.add_run(f"Meeting Date: {w['date']}")
    r_date.font.bold = True
    r_date.font.name = "Times New Roman"
    r_date.font.size = Pt(10)
    p_m2.paragraph_format.tab_stops.add_tab_stop(Inches(6.8))
    r_wk = p_m2.add_run(f"\tWeek — {w['week_num']}")
    r_wk.font.bold = True
    r_wk.font.name = "Times New Roman"
    r_wk.font.size = Pt(10)
    
    add_styled_para(doc, "Session 2026–2027 (Odd Semester)", size=10.5, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=0, space_after=4)
    
    # Attendance table
    tbl_att = doc.add_table(rows=5, cols=5)
    tbl_att.alignment = WD_TABLE_ALIGNMENT.CENTER
    att_rows = [
        ("S No", "Roll Number", "Student Name", "Status on Meeting Date (Present /Absent)", "Student Signature"),
        ("1", "24116002322", "Naitik", "", ""),
        ("2", "24116002274", "Kashish Gupta", "", ""),
        ("3", "24116002324", "Naitik Mishra", "", ""),
        ("4", "24116002277", "Khushboo Rajpoot", "", "")
    ]
    for r_i, r_vals in enumerate(att_rows):
        for c_i, val in enumerate(r_vals):
            cell = tbl_att.rows[r_i].cells[c_i]
            r = cell.paragraphs[0].add_run(val)
            r.font.name = "Times New Roman"
            r.font.size = Pt(9)
            if r_i == 0:
                r.font.bold = True
                cell.paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER
                set_cell_bg(cell, "F2F2F2")
            elif c_i in [0, 3]:
                cell.paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER
            set_cell_borders(cell, top={'sz':4,'val':'single'}, bottom={'sz':4,'val':'single'}, left={'sz':4,'val':'single'}, right={'sz':4,'val':'single'})
            set_cell_margins(cell, 35, 35, 50, 50)
            
    add_styled_para(doc, "Project Title : AlgoLenz: Interactive Data Structures, Pathfinding & Sorting Visualization Platform", size=9.5, bold=False, space_before=4, space_after=2)
    add_styled_para(doc, "Name of Project Supervisor: Dr. Amit Yadav", size=9.5, bold=False, space_before=0, space_after=4)
    
    # 3 Boxes: Work done, Work to be done, Supervisor comments (Empty for handwriting)
    tbl_boxes = doc.add_table(rows=3, cols=1)
    tbl_boxes.alignment = WD_TABLE_ALIGNMENT.CENTER
    
    # Box 1: Work done
    c_done = tbl_boxes.rows[0].cells[0]
    p_d0 = c_done.paragraphs[0]
    r_dt = p_d0.add_run("Work done in current Week:\n\n\n\n\n\n\n\n")
    r_dt.font.bold = True
    r_dt.font.underline = True
    r_dt.font.name = "Times New Roman"
    r_dt.font.size = Pt(10)
        
    # Box 2: Work to be done
    c_next = tbl_boxes.rows[1].cells[0]
    p_n0 = c_next.paragraphs[0]
    r_nt = p_n0.add_run("Work to be done in next Week :\n\n\n\n\n\n")
    r_nt.font.bold = True
    r_nt.font.underline = True
    r_nt.font.name = "Times New Roman"
    r_nt.font.size = Pt(10)
        
    # Box 3: Supervisor Comments
    c_com = tbl_boxes.rows[2].cells[0]
    p_c0 = c_com.paragraphs[0]
    r_ct = p_c0.add_run("Supervisor Comments:\n\n\n\n")
    r_ct.font.bold = True
    r_ct.font.underline = True
    r_ct.font.name = "Times New Roman"
    r_ct.font.size = Pt(10)
    
    p_c2 = c_com.add_paragraph()
    p_c2.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_c2.paragraph_format.space_before = Pt(5)
    p_c2.paragraph_format.space_after = Pt(0)
    r_sig = p_c2.add_run("Supervisor Signature/Date: ....................................................")
    r_sig.font.name = "Times New Roman"
    r_sig.font.size = Pt(9)
    r_sig.font.bold = True
    
    for row in tbl_boxes.rows:
        for c in row.cells:
            c.width = Inches(7.0)
            set_cell_borders(c, top={'sz':6,'val':'single'}, bottom={'sz':6,'val':'single'}, left={'sz':6,'val':'single'}, right={'sz':6,'val':'single'})
            set_cell_margins(c, 50, 50, 70, 70)
            set_cell_bg(c, "FFFFFF")
            
    add_college_footer(doc)
    doc.add_page_break()

# ==========================================
# PAGE 21: FINAL SUPERVISOR EVALUATION
# ==========================================
add_college_header(doc)
add_styled_para(doc, "(To be filled by Project Supervisor)", size=12, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=10, space_after=12)

add_styled_para(doc, "ProjectTitle: AlgoLenz: Interactive Data Structures, Pathfinding & Sorting Visualization Platform", size=10.5, bold=True, space_before=0, space_after=4)
add_styled_para(doc, "Project Id.: BCA-2026-MP-042", size=10.5, bold=True, space_before=0, space_after=12)

tbl_eval = doc.add_table(rows=5, cols=3)
tbl_eval.alignment = WD_TABLE_ALIGNMENT.CENTER
eval_rows = [
    ("Roll No", "Name of the student", "Grade by Supervisor"),
    ("24116002322", "Naitik", ""),
    ("24116002274", "Kashish Gupta", ""),
    ("24116002324", "Naitik Mishra", ""),
    ("24116002277", "Khushboo Rajpoot", "")
]
for r_i, r_vals in enumerate(eval_rows):
    for c_i, val in enumerate(r_vals):
        cell = tbl_eval.rows[r_i].cells[c_i]
        r = cell.paragraphs[0].add_run(val)
        r.font.name = "Times New Roman"
        r.font.size = Pt(10)
        if r_i == 0:
            r.font.bold = True
            cell.paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER
            set_cell_bg(cell, "F2F2F2")
        elif c_i in [0, 2]:
            cell.paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER
        set_cell_borders(cell, top={'sz':4,'val':'single'}, bottom={'sz':4,'val':'single'}, left={'sz':4,'val':'single'}, right={'sz':4,'val':'single'})
        set_cell_margins(cell, 50, 50, 70, 70)

add_styled_para(doc, "Type of the project (Software/ Software and Hardware/ Simulation or Modelling): __________________________________________________", size=10.5, bold=True, space_before=14, space_after=10)
add_styled_para(doc, "Any other Remark:", size=10.5, bold=True, space_before=6, space_after=4)

tbl_rem = doc.add_table(rows=1, cols=1)
tbl_rem.alignment = WD_TABLE_ALIGNMENT.CENTER
c_rem = tbl_rem.rows[0].cells[0]
c_rem.width = Inches(7.0)
p_rem = c_rem.paragraphs[0]
r_rem = p_rem.add_run("\n\n\n\n\n\n")
set_cell_borders(c_rem, top={'sz':6,'val':'single'}, bottom={'sz':6,'val':'single'}, left={'sz':6,'val':'single'}, right={'sz':6,'val':'single'})
set_cell_margins(c_rem, 80, 80, 100, 100)
set_cell_bg(c_rem, "FFFFFF")

p_sup_sig = doc.add_paragraph()
p_sup_sig.paragraph_format.space_before = Pt(25)
p_sup_sig.paragraph_format.space_after = Pt(20)
p_sup_sig.paragraph_format.line_spacing = 1.3
r_ss1 = p_sup_sig.add_run("Supervisor Name and Signature:\n\n")
r_ss1.font.bold = True
r_ss1.font.name = "Times New Roman"
r_ss2 = p_sup_sig.add_run("Dr. Amit Yadav (Professor)\nSignature: __________________________        Date: ____________________")
r_ss2.font.name = "Times New Roman"

p_scheme = doc.add_paragraph()
p_scheme.paragraph_format.space_before = Pt(20)
p_scheme.paragraph_format.space_after = Pt(0)
r_sch = p_scheme.add_run("Grading Scheme:\nA+: Outstanding   |   A: Excellent   |   B+: Good   |   B: Average   |   C: Not Satisfactory")
r_sch.font.name = "Times New Roman"
r_sch.font.size = Pt(9.5)
r_sch.font.bold = True

add_college_footer(doc)

output_file = os.path.join(DOCS_DIR, "project_diary.docx")
doc.save(output_file)
print(f"Saved project diary successfully to {output_file}!")
