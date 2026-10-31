# 📁 Academic Project Deliverables & Documentation Index

**Project Title:** AlgoLenz: VisuAlgo-Inspired Interactive Data Structures, Pathfinding & Sorting Visualization Platform  
**Course Code:** BCA-5005 (Minor Project)  
**Institution:** PSIT College of Higher Education, Kanpur (Affiliated to CSJMU Kanpur)  
**Session:** 2026–2027  

---

## 📑 Deliverables Overview

| File | Format | Description |
| :--- | :--- | :--- |
| [`project_report.pdf`](./project_report.pdf) | PDF (50 Pages) | Complete, professionally compiled 50-page formal Minor Project Report following university guidelines. |
| [`project_report.docx`](./project_report.docx) | Word Document | Fully editable Microsoft Word version of the 50-page project report with all tables, citations, and screenshots. |
| [`project_report.html`](./project_report.html) | Interactive HTML | Browser-viewable academic report with print formatting, quick downloads, and high-resolution visuals. |
| [`project_diary.pdf`](./project_diary.pdf) | PDF (21 Pages) | Complete 21-page Minor Project Progress Diary covering all 10 meeting weeks, attendance, and evaluation sheets. |
| [`project_diary.docx`](./project_diary.docx) | Word Document | Fully editable Microsoft Word version of the 21-page Project Diary. |
| [`project_diary.html`](./project_diary.html) | Interactive HTML | Print-ready HTML edition of the Project Diary with printable layout. |
| [`PROJECT_DIARY_BCA5005.md`](./PROJECT_DIARY_BCA5005.md) | Markdown | Raw text transcript and markdown structure of weekly project diary entries. |
| [`front_page.pdf`](./front_page.pdf) | PDF (Single Page) | Official PSIT / CSJMU assignment and project submission cover page. |
| [`front_page.docx`](./front_page.docx) | Word Document | Editable cover page document. |
| [`front_page.html`](./front_page.html) | Interactive HTML | Web preview of the university-standard front page. |
| [`project_synopsis.pdf`](./project_synopsis.pdf) | PDF (8 Pages) | Official Project Synopsis detailing objectives, system requirements, modular breakdown, and literature review. |
| [`project_synopsis.tex`](./project_synopsis.tex) | LaTeX Source | Complete LaTeX source code for the academic project synopsis. |
| [`synopsis_preview.html`](./synopsis_preview.html) | Interactive HTML | HTML preview used to compile the synopsis PDF via headless Chrome. |
| [`ALGORITHM_CODE_AND_PSEUDOCODE.md`](./ALGORITHM_CODE_AND_PSEUDOCODE.md) | Markdown | Comprehensive compendium of all 13 algorithms, annotated pseudocode, asymptotic proofs, and invariants. |

---

## 🏛️ Assets & Institutional Logos (`docs/assets/`)

- `CSJMU_logo.jpg` / `csjmu_logo_tight.png` / `csjmu_logo_transparent.png`: Chhatrapati Shahu Ji Maharaj University official crests.
- `psit_logo.jpg` / `psit_logo_cropped.jpg` / `psit_logo_tight.png` / `psit_logo_transparent.png`: PSIT College of Higher Education official emblems.

---

## 🛠️ Regeneration & Compilation Commands

All documents can be recompiled using the automation scripts in `scripts/` or the npm shortcuts:

```bash
# 1. Regenerate 50-Page Academic Report (HTML & DOCX)
npm run report:html
npm run report:docx

# 2. Compile Report to PDF (Chrome Headless)
npm run pdf:report

# 3. Regenerate Project Diary (HTML & DOCX)
npm run diary:html
npm run diary:docx

# 4. Regenerate Project Front Page
npm run frontpage

# 5. Compile Synopsis PDF from HTML Preview
npm run pdf:synopsis
```

