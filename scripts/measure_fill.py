import os
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 1200, 'height': 1600})
    page.goto('file:///C:/Users/naiti/Desktop/ALGO/project_report.html')
    
    pages = page.query_selector_all('.academic-page')
    print(f"Total pages in DOM: {len(pages)}")
    for i, p_el in enumerate(pages, 1):
        box = p_el.bounding_box()
        body = p_el.query_selector('.page-body')
        
        children = body.query_selector_all('> *') if body else []
        last_bottom = 0
        if children:
            last_box = children[-1].bounding_box()
            if last_box:
                last_bottom = (last_box['y'] + last_box['height']) - box['y']
            
        fill_pct = (last_bottom / box['height'] * 100) if box['height'] > 0 else 0
        p_count = len(body.query_selector_all('p')) if body else 0
        t_count = len(body.query_selector_all('table')) if body else 0
        text = body.inner_text() if body else ''
        words = len(text.split())
        gap = 1000 - last_bottom
        print(f"P{i:02d}: bottom={last_bottom:4.0f}px ({fill_pct:4.1f}%) | words={words:3d} | p={p_count} | t={t_count} | gap={gap:4.0f}px")
    browser.close()
