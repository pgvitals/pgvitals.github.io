/*
 * build-diagnostics.js — inject static, crawlable section cards into
 * diagnostics.html from sections.js.
 *
 *   node tools/build-diagnostics.js
 *
 * diagnostics.html is a single page that is BOTH:
 *   - static SQL content in the HTML (indexable by search engines), and
 *   - an interactive search/filter tool (JS operates on this static DOM).
 * This script regenerates the markup between <!-- CARDS:START --> and
 * <!-- CARDS:END -->. Re-run it whenever sections.js changes.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SECTIONS = new Function(
  fs.readFileSync(path.join(ROOT, 'sections.js'), 'utf8') + '\n;return SECTIONS;')();

const AREA_LABELS = {
  query: 'Query Behavior', index: 'Index Health', table: 'Tables & Storage',
  vacuum: 'Vacuum & Stats', connections: 'Connections & Locks', replication: 'Replication',
  risk: 'Risk Signals', config: 'Config & Health', inventory: 'Inventory & Extensions',
};

const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const slugify = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const LINK_SVG = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>';

function card(s, i) {
  const slug = slugify(s.title);
  const label = AREA_LABELS[s.areaSlug] || s.area;
  const search = `${s.id} ${s.title} ${s.area} ${s.what} ${s.lookFor || ''} ${s.action || ''} ${s.sql}`.toLowerCase();
  const requires = s.requires ? `\n          <div class="requires-badge">Requires: ${esc(s.requires)}</div>` : '';
  return `    <div id="${esc(slug)}" class="section-card card-${esc(s.areaSlug)}" data-area="${esc(s.areaSlug)}" data-search="${esc(search)}">
      <div class="card-head">
        <div class="card-meta">
          <span class="area-badge badge-${esc(s.areaSlug)}"><span class="area-badge-dot"></span>${esc(label)}</span>
          <div style="display:flex;align-items:center;gap:8px">
            <span class="section-num">#${esc(String(s.id).padStart(2, '0'))}</span>
            <button class="copy-link-btn" aria-label="Copy link to this section" title="Copy link to this section" onclick="event.stopPropagation();copyLink('${esc(slug)}')">${LINK_SVG}</button>
          </div>
        </div>
        <h2 class="card-title">${esc(s.title)}</h2>
      </div>
      <div class="card-info">
        <div class="info-row"><span class="info-label">What</span><span class="info-value">${esc(s.what)}</span></div>
        <div class="info-row"><span class="info-label">Look for</span><span class="info-value">${esc(s.lookFor || '')}</span></div>
        <div class="info-row"><span class="info-label">Action</span><span class="info-value">${esc(s.action || '')}</span></div>${requires}
      </div>
      <div class="sql-wrap" id="wrap-${i}">
        <div class="sql-toggle" onclick="toggleSQL(this)">
          <div class="sql-toggle-left"><span class="sql-lbl">SQL</span><span class="sql-chevron">&#9662;</span></div>
          <div class="sql-toggle-right"><button class="copy-btn" aria-label="Copy SQL to clipboard" onclick="event.stopPropagation();copySQL(this,${i})">Copy</button></div>
        </div>
        <div class="sql-content"><pre><code class="language-sql" id="sql-${i}">${esc(s.sql.trim())}</code></pre></div>
      </div>
    </div>`;
}

const cards = SECTIONS.map(card).join('\n');
const file = path.join(ROOT, 'diagnostics.html');
let html = fs.readFileSync(file, 'utf8');
const START = '<!-- CARDS:START -->', END = '<!-- CARDS:END -->';
const re = new RegExp(START + '[\\s\\S]*?' + END);
if (!re.test(html)) { console.error('Markers not found in diagnostics.html'); process.exit(1); }
html = html.replace(re, `${START}\n${cards}\n    ${END}`);
fs.writeFileSync(file, html);
console.log(`Injected ${SECTIONS.length} static cards into diagnostics.html.`);
