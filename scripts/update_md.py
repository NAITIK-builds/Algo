import os
import re

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCS_DIR = os.path.join(ROOT_DIR, "docs")
TARGET_MD = os.path.join(DOCS_DIR, "PROJECT_DIARY_BCA5005.md")

with open(TARGET_MD, "r", encoding="utf-8") as f:
    content = f.read()

# Split up to WEEK 1
parts = content.split("## WEEK 1:")
front_matter = parts[0]

weeks_markdown = ""
dates = [
    "01/08/2026", "08/08/2026", "16/08/2026", "22/08/2026", "29/08/2026",
    "05/09/2026", "12/09/2026", "19/09/2026", "26/09/2026", "03/10/2026"
]

for i in range(1, 11):
    w_md = f"""## WEEK {i}: Progress Sheet
**Subject Code:** BCA 5005 &nbsp;&nbsp;|&nbsp;&nbsp; **Group Id:** BCA-2026-MP-042  
**Meeting Date:** {dates[i-1]} &nbsp;&nbsp;|&nbsp;&nbsp; **Session:** 2026–2027 (Odd Semester)

### Attendance
| S.No | Roll Number | Student Name | Status on Meeting Date (Present /Absent) | Student Signature |
| :--- | :--- | :--- | :--- | :--- |
| 1 | 24116002322 | Naitik | | ____________________ |
| 2 | 24116002274 | Kashish Gupta | | ____________________ |
| 3 | 24116002324 | Naitik Mishra | | ____________________ |
| 4 | 24116002277 | Khushboo Rajpoot | | ____________________ |

**Project Title :** AlgoLenz: Interactive Data Structures, Pathfinding & Sorting Visualization Platform  
**Name of Project Supervisor:** Dr. Amit Yadav  

### Work done in current Week:
<br><br><br><br><br><br><br><br>

### Work to be done in next Week :
<br><br><br><br><br><br>

### Supervisor Comments:
<br><br><br><br>

**Supervisor Signature/Date:** ....................................................

---

\\newpage

"""
    weeks_markdown += w_md

eval_sheet = """# SUPERVISOR FINAL EVALUATION SHEET
*(To be filled by Project Supervisor)*

**Project Title:** AlgoLenz: Interactive Data Structures, Pathfinding & Sorting Visualization Platform  
**Project Id:** `BCA-2026-MP-042`

| S.No | Roll No | Name of the Student | Grade by Supervisor |
| :--- | :--- | :--- | :--- |
| 1 | 24116002322 | Naitik | |
| 2 | 24116002274 | Kashish Gupta | |
| 3 | 24116002324 | Naitik Mishra | |
| 4 | 24116002277 | Khushboo Rajpoot | |

**Type of the project (Software/ Software and Hardware/ Simulation or Modelling):** __________________________________________________

**Any other Remark:**  
<br><br><br><br><br>

**Supervisor Name and Signature:**  
Dr. Amit Yadav (Professor)  
**Signature:** __________________________ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Date:** _______________  

**Grading Scheme Reference:**  
- **A+**: Outstanding  
- **A**: Excellent  
- **B+**: Good  
- **B**: Average  
- **C**: Not Satisfactory  
"""

new_content = front_matter + weeks_markdown + eval_sheet

with open(TARGET_MD, "w", encoding="utf-8") as f:
    f.write(new_content)

print(f"Updated {TARGET_MD} successfully!")
