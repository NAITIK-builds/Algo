const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const tempProfile = path.join(process.env.TEMP || 'C:\\Temp', 'chrome_pdf_report_' + Date.now());
const rootDir = path.resolve(__dirname, '..');
const docsDir = path.join(rootDir, 'docs');
const htmlFile = 'file:///' + path.join(docsDir, 'project_report.html').replace(/\\/g, '/');
const outputFile = path.join(docsDir, 'project_report.pdf');

console.log('Generating PDF from:', htmlFile);
console.log('Output PDF to:', outputFile);

const args = [
  '--headless=new',
  '--disable-gpu',
  `--user-data-dir=${tempProfile}`,
  '--no-pdf-header-footer',
  `--print-to-pdf=${outputFile}`,
  htmlFile
];

const res = spawnSync(chromePath, args, { stdio: 'inherit' });
if (fs.existsSync(outputFile)) {
  const stat = fs.statSync(outputFile);
  console.log(`Success! ${outputFile} (${stat.size} bytes)`);
} else {
  console.error('Failed to generate PDF');
  process.exit(1);
}

try {
  fs.rmSync(tempProfile, { recursive: true, force: true });
} catch (e) {}
