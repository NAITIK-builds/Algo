# 🛠️ Build & Automation Scripts

This directory houses build pipelines, automated document generators, headless PDF compilation utilities, and regression test suites.

## 📋 Script Manifest

### 📄 Report Generation
- **`build_academic_50page_report.py`**: Compiles the official, balanced 50-page HTML report (`docs/project_report.html`) utilizing modular chapter imports (`report_expanded_ch*.py`).
- **`build_50page_report.py`**: Generates the matching Microsoft Word document (`docs/project_report.docx`) with embedded screenshots and styled tables.
- **`report_expanded_ch1.py` - `report_expanded_ch5_6.py`**: Content modules containing detailed academic chapters (Introduction, Requirements, Architectural Design, Testing, and Conclusion).
- **`report_annotated_code_and_proofs.py`**: Technical mathematical proofs and typed algorithm implementations.
- **`report_user_manual_and_appendices.py`**: User guide and supplementary appendices.

### 📔 Project Diary & Front Page
- **`generate_diary_html.py`**: Generates the complete 21-page progress diary (`docs/project_diary.html`).
- **`generate_diary_docx.py`**: Generates the Word edition of the project diary (`docs/project_diary.docx`).
- **`generate_frontpage.py`**: Generates university front page in HTML, DOCX, and PDF formats (`docs/front_page.*`).

### 🖨️ PDF Compilation (Chrome Headless)
- **`generate_report_pdf.cjs`**: Converts `docs/project_report.html` into `docs/project_report.pdf`.
- **`generate_pdf.cjs`**: Converts `docs/synopsis_preview.html` into `docs/project_synopsis.pdf`.

### 📸 Visual Asset Automation
- **`capture_screenshots.py`**: Uses Playwright to automatically take high-res viewport screenshots of all 5 visualizer modes and save them to `images/`.

### 🧪 Tests & Quality Assurance
- **`measure_fill.py`**: Measures page bounding boxes and layout density across the 50-page report.
- **`test_docx.py`** & **`test_report_helpers.py`**: Table padding and border validation helpers.
- **`update_md.py`**: Synchronizes markdown diary entries.

