import os
import base64
import subprocess
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCS_DIR = os.path.join(ROOT_DIR, "docs")
ASSETS_DIR = os.path.join(DOCS_DIR, "assets")

def get_base64_img(img_path):
    with open(img_path, 'rb') as f:
        return base64.b64encode(f.read()).decode('utf-8')

def generate_html():
    csjmu_b64 = get_base64_img(os.path.join(ASSETS_DIR, 'csjmu_logo_transparent.png'))
    psit_b64 = get_base64_img(os.path.join(ASSETS_DIR, 'psit_logo_transparent.png'))

    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Front Page - BCA-5002P</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Tinos:ital,wght@0,400;0,700;1,400&display=swap');

    @page {{
      size: A4 portrait;
      margin: 0;
    }}

    * {{
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }}

    body {{
      margin: 0;
      padding: 0;
      background-color: #4b5563;
      font-family: 'Times New Roman', Times, 'Tinos', serif;
      color: #000000;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 100vh;
    }}

    /* Top Action Bar for browser view */
    .action-bar {{
      width: 100%;
      max-width: 900px;
      margin: 18px auto 14px auto;
      padding: 12px 20px;
      background: #111827;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #ffffff;
      box-shadow: 0 4px 14px rgba(0,0,0,0.3);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }}

    .action-bar .info {{
      display: flex;
      flex-direction: column;
    }}

    .action-bar .info-title {{
      font-size: 15px;
      font-weight: 700;
      color: #f3f4f6;
    }}

    .action-bar .info-sub {{
      font-size: 12px;
      color: #9ca3af;
      margin-top: 2px;
    }}

    .btn-group {{
      display: flex;
      gap: 10px;
    }}

    .btn {{
      font-size: 13px;
      font-weight: 600;
      padding: 8px 16px;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      text-decoration: none;
      transition: all 0.15s ease;
    }}

    .btn-pdf {{
      background: #2563eb;
      color: #ffffff;
    }}
    .btn-pdf:hover {{
      background: #1d4ed8;
      transform: translateY(-1px);
    }}

    .btn-docx {{
      background: #059669;
      color: #ffffff;
    }}
    .btn-docx:hover {{
      background: #047857;
      transform: translateY(-1px);
    }}

    .btn-print {{
      background: #374151;
      color: #ffffff;
    }}
    .btn-print:hover {{
      background: #4b5563;
    }}

    /* Printable A4 Page */
    .page-sheet {{
      width: 210mm;
      height: 297mm;
      min-height: 297mm;
      max-height: 297mm;
      background: #ffffff;
      box-shadow: 0 10px 30px rgba(0,0,0,0.35);
      margin-bottom: 30px;
      padding: 24mm 22mm 22mm 22mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      overflow: hidden;
    }}

    /* Section 1: University Header */
    .header-section {{
      text-align: center;
    }}

    .univ-title {{
      font-size: 19.5pt;
      font-weight: 700;
      line-height: 1.25;
      margin: 0;
      letter-spacing: 0.2px;
    }}

    .univ-city {{
      font-size: 16.5pt;
      font-weight: 700;
      margin: 4px 0 0 0;
    }}

    .csjmu-logo-wrap {{
      margin: 16px auto 0 auto;
      text-align: center;
    }}

    .csjmu-logo {{
      width: 96px;
      height: 96px;
      object-fit: contain;
      display: block;
      margin: 0 auto;
    }}

    /* Section 2: Subject Details */
    .subject-section {{
      text-align: center;
      margin-top: 6px;
    }}

    .subject-name {{
      font-size: 14.5pt;
      font-weight: 700;
      line-height: 1.35;
      margin: 0;
    }}

    .subject-code {{
      font-size: 14.5pt;
      font-weight: 700;
      margin: 8px 0 0 0;
    }}

    /* Section 3: Two-Column Submission Block */
    .submission-section {{
      width: 86%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }}

    .sub-col {{
      font-size: 12pt;
      line-height: 1.45;
    }}

    .sub-col-left {{
      width: 52%;
      text-align: left;
    }}

    .sub-col-right {{
      width: 44%;
      text-align: left;
    }}

    .sub-header {{
      font-size: 12pt;
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 6px;
      letter-spacing: 0.2px;
    }}

    .sub-line {{
      margin: 1px 0;
      font-size: 11.5pt;
      white-space: nowrap;
    }}

    /* Section 4: Institution Footer */
    .footer-section {{
      text-align: center;
      margin-top: auto;
      padding-bottom: 6px;
    }}

    .psit-logo-wrap {{
      margin: 0 auto 10px auto;
      text-align: center;
    }}

    .psit-logo {{
      width: 135px;
      height: auto;
      object-fit: contain;
      display: block;
      margin: 0 auto;
    }}

    .college-name {{
      font-size: 16pt;
      font-weight: 700;
      color: #1F3864; /* Official PSIT navy blue */
      margin: 0 0 4px 0;
      letter-spacing: 0.3px;
    }}

    .college-address {{
      font-size: 11.5pt;
      color: #000000;
      margin: 0 0 6px 0;
      font-weight: 400;
    }}

    .session-line {{
      font-size: 11.5pt;
      color: #000000;
      margin: 0;
      font-weight: 400;
    }}

    /* Print styles */
    @media print {{
      body {{
        background: #ffffff !important;
        margin: 0 !important;
        padding: 0 !important;
      }}
      .action-bar {{
        display: none !important;
      }}
      .page-sheet {{
        box-shadow: none !important;
        margin: 0 !important;
        width: 210mm !important;
        height: 297mm !important;
        min-height: 297mm !important;
        max-height: 297mm !important;
        padding: 24mm 22mm 22mm 22mm !important;
        page-break-after: avoid !important;
        page-break-inside: avoid !important;
        break-inside: avoid !important;
      }}
    }}
  </style>
</head>
<body>

  <div class="action-bar">
    <div class="info">
      <div class="info-title">Academic Front Page (BCA-5002P)</div>
      <div class="info-sub">CSJMU Kanpur &bull; PSIT College of Higher Education</div>
    </div>
    <div class="btn-group">
      <a href="front_page.pdf" download="BCA_Front_Page.pdf" class="btn btn-pdf">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
        Download PDF
      </a>
      <a href="front_page.docx" download="BCA_Front_Page.docx" class="btn btn-docx">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
        Download Word (.docx)
      </a>
      <button class="btn btn-print" onclick="window.print()">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
        Browser Print
      </button>
    </div>
  </div>

  <div class="page-sheet">

    <!-- Section 1: University Header -->
    <div class="header-section">
      <div class="univ-title">Chhatrapati Shahu Ji Maharaj University</div>
      <div class="univ-city">Kanpur</div>
      <div class="csjmu-logo-wrap">
        <img src="data:image/png;base64,{csjmu_b64}" alt="CSJMU University Seal" class="csjmu-logo">
      </div>
    </div>

    <!-- Section 2: Subject Details -->
    <div class="subject-section">
      <div class="subject-name">Subject: Java programming and dynamic</div>
      <div class="subject-name">Webpage design</div>
      <div class="subject-code">Subject Code: (BCA-5002P)</div>
    </div>

    <!-- Section 3: Two-Column Submission Details -->
    <div class="submission-section">
      <div class="sub-col sub-col-left">
        <div class="sub-header">SUBMITTED BY:</div>
        <div class="sub-line">Student Name: Naitik</div>
        <div class="sub-line">Roll No: 24116002322</div>
        <div class="sub-line">Section: BCA 3B</div>
      </div>
      <div class="sub-col sub-col-right">
        <div class="sub-header">SUBMITTED TO:</div>
        <div class="sub-line">Mr. Sumit Kumar</div>
        <div class="sub-line">Assistant Professor</div>
      </div>
    </div>

    <!-- Section 4: College Footer -->
    <div class="footer-section">
      <div class="psit-logo-wrap">
        <img src="data:image/png;base64,{psit_b64}" alt="PSIT Logo" class="psit-logo">
      </div>
      <div class="college-name">PSIT College of Higher Education</div>
      <div class="college-address">Kanpur-Agra-Delhi National Highway-2, Bhauti, Kanpur</div>
      <div class="session-line">Session: 2026-27</div>
    </div>

  </div>

</body>
</html>
"""

    output_html = os.path.join(DOCS_DIR, 'front_page.html')
    with open(output_html, 'w', encoding='utf-8') as f:
        f.write(html_content)
    print(f"front_page.html generated successfully at {output_html}.")

def generate_docx():
    doc = Document()
    
    # Set page margins to standard ~0.8 inch (approx 20mm)
    for section in doc.sections:
        section.top_margin = Inches(0.85)
        section.bottom_margin = Inches(0.8)
        section.left_margin = Inches(0.85)
        section.right_margin = Inches(0.85)
        section.page_width = Inches(8.27)
        section.page_height = Inches(11.69)
        
    def add_p(text, size_pt, bold=False, color_rgb=(0,0,0), align=WD_ALIGN_PARAGRAPH.CENTER, space_before=0, space_after=0):
        p = doc.add_paragraph()
        p.alignment = align
        p.paragraph_format.space_before = Pt(space_before)
        p.paragraph_format.space_after = Pt(space_after)
        p.paragraph_format.line_spacing = 1.2
        if text:
            run = p.add_run(text)
            run.font.name = 'Times New Roman'
            run.font.size = Pt(size_pt)
            run.bold = bold
            run.font.color.rgb = RGBColor(*color_rgb)
        return p

    # 1. University Header
    add_p("Chhatrapati Shahu Ji Maharaj University", 20, bold=True, space_before=0, space_after=2)
    add_p("Kanpur", 17, bold=True, space_before=0, space_after=14)

    # CSJMU Logo
    p_logo = doc.add_paragraph()
    p_logo.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_logo.paragraph_format.space_before = Pt(0)
    p_logo.paragraph_format.space_after = Pt(20)
    p_logo.add_run().add_picture(os.path.join(ASSETS_DIR, 'csjmu_logo_tight.png'), width=Inches(1.02))

    # 2. Subject block
    add_p("Subject: Java programming and dynamic", 15, bold=True, space_before=0, space_after=2)
    add_p("Webpage design", 15, bold=True, space_before=0, space_after=8)
    add_p("Subject Code: (BCA-5002P)", 15, bold=True, space_before=0, space_after=32)

    # 3. Two-Column Table
    table = doc.add_table(rows=1, cols=2)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    
    # Remove borders
    tblPr = table._tbl.tblPr
    tblBorders = OxmlElement('w:tblBorders')
    for b in ['top', 'left', 'bottom', 'right', 'insideH', 'insideV']:
        border = OxmlElement(f'w:{b}')
        border.set(qn('w:val'), 'none')
        tblBorders.append(border)
    tblPr.append(tblBorders)

    col_widths = [Inches(3.6), Inches(2.9)]
    for row in table.rows:
        for i, w in enumerate(col_widths):
            row.cells[i].width = w

    cell_left = table.cell(0, 0)
    cell_right = table.cell(0, 1)

    def fill_cell(cell, header, lines):
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.LEFT
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(4)
        run_h = p.add_run(header)
        run_h.font.name = 'Times New Roman'
        run_h.font.size = Pt(12)
        run_h.bold = True
        
        for line in lines:
            p_line = cell.add_paragraph()
            p_line.alignment = WD_ALIGN_PARAGRAPH.LEFT
            p_line.paragraph_format.space_before = Pt(0)
            p_line.paragraph_format.space_after = Pt(2)
            p_line.paragraph_format.line_spacing = 1.25
            r = p_line.add_run(line)
            r.font.name = 'Times New Roman'
            r.font.size = Pt(11.5)

    fill_cell(cell_left, "SUBMITTED BY:", [
        "Student Name: Naitik",
        "Roll No: 24116002322",
        "Section: BCA 3B"
    ])

    fill_cell(cell_right, "SUBMITTED TO:", [
        "Mr. Sumit Kumar",
        "Assistant Professor"
    ])

    # Spacing before footer
    add_p("", 12, space_before=40, space_after=0)

    # 4. PSIT Logo & Footer
    p_psit = doc.add_paragraph()
    p_psit.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_psit.paragraph_format.space_before = Pt(0)
    p_psit.paragraph_format.space_after = Pt(10)
    p_psit.add_run().add_picture(os.path.join(ASSETS_DIR, 'psit_logo_tight.png'), width=Inches(1.4))

    add_p("PSIT College of Higher Education", 16, bold=True, color_rgb=(31, 56, 100), space_before=0, space_after=4)
    add_p("Kanpur-Agra-Delhi National Highway-2, Bhauti, Kanpur", 11.5, bold=False, space_before=0, space_after=6)
    add_p("Session: 2026-27", 11.5, bold=False, space_before=0, space_after=0)

    output_docx = os.path.join(DOCS_DIR, 'front_page.docx')
    doc.save(output_docx)
    print(f"front_page.docx generated successfully at {output_docx}.")

def compile_pdf():
    chrome_path = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
    temp_profile = os.path.join(os.environ.get('TEMP', r'C:\Temp'), f'chrome_pdf_fp_{os.getpid()}')
    html_file = 'file:///' + os.path.join(DOCS_DIR, 'front_page.html').replace('\\', '/')
    output_pdf = os.path.join(DOCS_DIR, 'front_page.pdf')

    cmd = [
        chrome_path,
        '--headless=new',
        '--disable-gpu',
        f'--user-data-dir={temp_profile}',
        '--no-pdf-header-footer',
        f'--print-to-pdf={output_pdf}',
        html_file
    ]
    print("Compiling PDF with Chrome headless...")
    res = subprocess.run(cmd, capture_output=True, text=True)
    if os.path.exists(output_pdf):
        print(f"PDF successfully created: {output_pdf} ({os.path.getsize(output_pdf)} bytes)")
    else:
        print("Failed to generate PDF. Output:", res.stderr)

if __name__ == '__main__':
    generate_html()
    generate_docx()
    compile_pdf()
