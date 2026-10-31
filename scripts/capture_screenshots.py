import os
import time
from playwright.sync_api import sync_playwright

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
output_dir = os.path.join(ROOT_DIR, "images")
os.makedirs(output_dir, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    
    print("Navigating to http://localhost:3000/ ...")
    page.goto("http://localhost:3000/", wait_until="networkidle")
    time.sleep(2)
    
    # 1. Grid Visualizer
    print("Capturing 1. Grid Visualizer...")
    page.screenshot(path=os.path.join(output_dir, "screenshot_grid.png"))
    
    # 2. Dual Benchmark (Comparison)
    print("Switching to Dual Benchmark...")
    page.click("text='Dual Benchmark'")
    time.sleep(1.5)
    page.screenshot(path=os.path.join(output_dir, "screenshot_comparison.png"))
    
    # 3. TSP Multi-Stop
    print("Switching to TSP Multi-Stop...")
    page.click("text='TSP Multi-Stop'")
    time.sleep(1.5)
    page.screenshot(path=os.path.join(output_dir, "screenshot_multistop.png"))
    
    # 4. City Street Map
    print("Switching to City Street Map...")
    page.click("text='City Street Map'")
    time.sleep(2)
    page.screenshot(path=os.path.join(output_dir, "screenshot_citymap.png"))
    
    # 5. Sorting Studio
    print("Switching to Sorting Studio...")
    page.click("text='Sorting Studio'")
    time.sleep(1.5)
    page.screenshot(path=os.path.join(output_dir, "screenshot_sorting.png"))
    
    browser.close()
    print("All screenshots successfully captured!")
