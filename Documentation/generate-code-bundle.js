#!/usr/bin/env node
/**
 * generate-code-bundle.js
 *
 * Bundles every source file in the project into a single printable HTML
 * (code-bundle.html) ready for IP / copyright submission.
 *
 * Usage:
 *   cd C:\Users\Admin\Downloads\Employment-main\Employment
 *   node Documentation/generate-code-bundle.js
 *
 * Then open code-bundle.html in Chrome/Edge → Ctrl+P → Save as PDF.
 *
 * The output includes a cover page, a table of contents, and every
 * source file with line numbers and file path headers.
 */

const fs = require('fs');
const path = require('path');

const ROOT   = process.cwd();
const OUTPUT = path.join(ROOT, 'code-bundle.html');

// Directories we never descend into (mostly third-party code or build output)
const SKIP_DIRS = new Set([
  'node_modules', 'vendor', '.git', '.cursor', '.vscode', '.idea',
  'dist', 'build', 'coverage', 'test-results', 'playwright-report',
  'bootstrap', 'storage', 'public/build', 'public/hot', 'public/storage',
]);

// File extensions we DO include (source code only)
const INCLUDE_EXT = new Set([
  '.html', '.htm', '.js', '.cjs', '.mjs',
  '.css', '.scss',
  '.php',
  '.json', '.md',
  '.env',
]);

// Specific filenames to always include (no extension)
const INCLUDE_FILES = new Set(['.gitignore', '.env.example', '.env.production.example', 'serve.json']);

const SKIP_FILES = new Set([
  'package-lock.json',  // 100k+ lines of dependency tree, irrelevant to IP
  'composer.lock',
  'code-bundle.html',   // don't include the output in itself
]);

const MAX_FILE_BYTES = 500 * 1024; // skip anything > 500KB (binary-ish or generated)

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const rel  = path.relative(ROOT, full).replace(/\\/g, '/');

    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      // Belt-and-suspenders: also skip if any segment in the path is a skip dir
      if (rel.split('/').some(seg => SKIP_DIRS.has(seg))) continue;
      walk(full, out);
    } else if (entry.isFile()) {
      if (SKIP_FILES.has(entry.name)) continue;
      const ext = path.extname(entry.name).toLowerCase();
      if (INCLUDE_EXT.has(ext) || INCLUDE_FILES.has(entry.name)) {
        out.push(rel);
      }
    }
  }
  return out;
}

function escapeHtml(s) {
  return s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
}

function isBinary(buf) {
  // Quick heuristic — null byte in the first 8KB means probably binary
  for (let i = 0; i < Math.min(buf.length, 8192); i++) if (buf[i] === 0) return true;
  return false;
}

console.log('Scanning project tree…');
const files = walk(ROOT).sort();
console.log(`Found ${files.length} source files. Building bundle…`);

const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
let totalLines = 0;

const fileSections = [];
for (const rel of files) {
  const abs  = path.join(ROOT, rel);
  const stat = fs.statSync(abs);
  if (stat.size > MAX_FILE_BYTES) {
    console.warn(`  skipping (too large): ${rel}`);
    continue;
  }
  const buf = fs.readFileSync(abs);
  if (isBinary(buf)) {
    console.warn(`  skipping (binary):    ${rel}`);
    continue;
  }
  const content = buf.toString('utf8');
  const lines   = content.split('\n');
  totalLines   += lines.length;

  const numbered = lines.map((line, i) =>
    `<span class="lineno">${String(i + 1).padStart(4)}</span>${escapeHtml(line)}`
  ).join('\n');

  fileSections.push(`
<section class="file-section">
  <div class="file-header">${escapeHtml(rel)} <span class="file-meta">· ${lines.length} lines</span></div>
  <pre><code>${numbered}</code></pre>
</section>`);
}

const tocItems = files.map(f => `<li>${escapeHtml(f)}</li>`).join('');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>WorkBridge PH — Source Code Bundle</title>
<style>
  @page { size: letter; margin: 0.75in; }
  body { font: 10.5pt/1.4 Georgia, 'Times New Roman', serif; color: #111; }
  h1   { font-size: 22pt; margin: 0 0 0.4em; }
  h2   { font-size: 13pt; margin: 1.4em 0 0.4em; padding-bottom: 0.3em; border-bottom: 2px solid #333; }

  .cover { text-align: center; padding: 1.5in 0 1in; page-break-after: always; }
  .cover h1 { font-size: 30pt; letter-spacing: 0.5px; }
  .cover .subtitle { font-size: 14pt; color: #555; margin: 0.5em 0 2em; }
  .cover .meta { font-size: 11pt; line-height: 2; }
  .cover .meta strong { display: block; margin-top: 0.6em; }

  .toc { page-break-after: always; }
  .toc-list { font-size: 9.5pt; line-height: 1.6; columns: 2; column-gap: 0.4in; }
  .toc-list li { break-inside: avoid; padding-left: 0.2em; }

  .file-section { page-break-before: always; margin-top: 0; }
  .file-header  { background: #f0f0f0; padding: 6pt 10pt; border-left: 3px solid #444; font: 600 10pt 'Consolas', 'Courier New', monospace; margin-bottom: 4pt; }
  .file-meta    { color: #666; font-weight: 400; font-size: 9pt; }

  pre  { background: #fafafa; border: 1px solid #ddd; padding: 6pt 8pt; overflow: visible; white-space: pre-wrap; word-break: break-all; margin: 0; }
  code { font: 8.5pt/1.45 'Consolas', 'Courier New', monospace; color: #1a1a1a; }
  .lineno { display: inline-block; width: 3.2em; color: #999; user-select: none; text-align: right; padding-right: 1em; }

  @media print {
    body { margin: 0; }
    .file-section { page-break-before: always; }
  }
</style>
</head>
<body>

<div class="cover">
  <h1>WorkBridge PH</h1>
  <p class="subtitle">A Web-Based Unified Employment Platform for Decent Work Access</p>
  <p class="meta">
    Major Course Output · IT305 Web Systems and Technologies<br>
    Northwest Samar State University · Calbayog City, Samar
    <strong>Submitted for Intellectual Property Protection</strong>
    ${today}
    <br>
    Source repository: github.com/SEPrimo19/workbridge-ph<br>
    Total source files: ${fileSections.length}<br>
    Total lines of code: ${totalLines.toLocaleString()}
  </p>
</div>

<div class="toc">
  <h2>Table of Contents</h2>
  <ol class="toc-list">${tocItems}</ol>
</div>

${fileSections.join('\n')}

</body>
</html>`;

fs.writeFileSync(OUTPUT, html);
console.log(`\n✓ Wrote ${OUTPUT}`);
console.log(`  ${fileSections.length} files · ${totalLines.toLocaleString()} lines · ${(html.length / 1024).toFixed(0)} KB`);
console.log(`\nNext: open code-bundle.html in Chrome → Ctrl+P → Save as PDF.`);
