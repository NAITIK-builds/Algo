import os
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def set_cell_border(cell, **kwargs):
    """
    kwargs: top, bottom, left, right
    values: dict(sz=12, val='single', color='000000')
    """
    tcPr = cell._tc.get_or_add_tcPr()
    tcBorders = OxmlElement('w:tcBorders')
    for border_name in ['top', 'left', 'bottom', 'right']:
        if border_name in kwargs:
            edge = OxmlElement(f'w:{border_name}')
            for key, val in kwargs[border_name].items():
                edge.set(qn(f'w:{key}'), str(val))
            tcBorders.append(edge)
        else:
            edge = OxmlElement(f'w:{border_name}')
            edge.set(qn('w:val'), 'none')
            tcBorders.append(edge)
    tcPr.append(tcBorders)

def add_header(doc, logo_path):
    table = doc.add_table(rows=1, cols=2)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    
    # Left column: Institution text
    cell_left = table.cell(0, 0)
    cell_left.width = Inches(5.2)
    p_left = cell_left.paragraphs[0]
    p_left.alignment = WD_ALIGN_PARAGRAPH.LEFT
    p_left.paragraph_format.space_after = Pt(2)
    p_left.paragraph_format.line_spacing = 1.15
    run1 = p_left.add_run("PSIT-College of Higher Education\n")
    run1.font.name = "Times New Roman"
    run1.font.size = Pt(13)
    run1.font.bold = True
    
    run2 = p_left.add_run("Kanpur-Delhi National Highway (NH-19), Bhauti, Kanpur-209305 (U.P.), India")
    run2.font.name = "Times New Roman"
    run2.font.size = Pt(8.5)
    
    # Right column: Logo
    cell_right = table.cell(0, 1)
    cell_right.width = Inches(1.5)
    p_right = cell_right.paragraphs[0]
    p_right.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_right.paragraph_format.space_after = Pt(0)
    if os.path.exists(logo_path):
        p_right.add_run().add_picture(logo_path, width=Inches(1.2))
        
    # Remove borders from header table
    for row in table.rows:
        for cell in row.cells:
            set_cell_border(cell)

def add_footer(doc):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(15)
    p.paragraph_format.space_after = Pt(0)
    run_l = p.add_run("Department of Computer Applications")
    run_l.font.name = "Times New Roman"
    run_l.font.size = Pt(9)
    run_l.font.italic = True
    
    # Tab to right
    p.paragraph_format.tab_stops.add_tab_stop(Inches(6.5))
    run_r = p.add_run("\tMinor Project 2026-27")
    run_r.font.name = "Times New Roman"
    run_r.font.size = Pt(9)
    run_r.font.italic = True

print("Helper script ready.")
