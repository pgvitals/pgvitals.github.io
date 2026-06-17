/*
 * build-sections.js — generate static SEO landing pages from sections.js
 *
 *   node tools/build-sections.js
 *
 * Emits one /sections/<id>-<slug>.html per diagnostic section, a /sections/
 * hub index, and regenerates sitemap.xml. Pages are static HTML (crawlable)
 * built from the same SECTIONS data the diagnostics browser uses.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://pgvitals.github.io';

// Load SECTIONS from sections.js without an export hook.
const sectionsSrc = fs.readFileSync(path.join(ROOT, 'sections.js'), 'utf8');
const SECTIONS = new Function(sectionsSrc + '\n;return SECTIONS;')();

function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"]/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}
function slugify(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}
function fileFor(sec) { return `${sec.id}-${slugify(sec.title)}.html`; }

function page(sec, all) {
  const slug = fileFor(sec);
  const url = `${SITE}/sections/${slug}`;
  const title = `${sec.title} in PostgreSQL — Diagnose & Fix`;
  const desc = `${sec.what} Ready-to-run SQL, what to look for (${sec.lookFor || 'see query'}), and how to fix it.`;
  const related = all.filter(s => s.area === sec.area && s.id !== sec.id).slice(0, 6);

  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description: sec.what,
    about: 'PostgreSQL performance diagnostics',
    articleSection: sec.area,
    url,
    isPartOf: { '@type': 'WebSite', name: 'pgvitals', url: SITE },
    keywords: [sec.title, 'PostgreSQL', sec.area, 'database diagnostics'].join(', ')
  };
  const crumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'pgvitals', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: 'Diagnostics', item: SITE + '/diagnostics.html' },
      { '@type': 'ListItem', position: 3, name: sec.title, item: url }
    ]
  };

  const relatedHtml = related.length ? `
    <section class="block">
      <h2>Related ${esc(sec.area)} checks</h2>
      <ul class="related">
        ${related.map(r => `<li><a href="/sections/${fileFor(r)}">${esc(r.id)} · ${esc(r.title)}</a></li>`).join('\n        ')}
      </ul>
    </section>` : '';

  const requiresHtml = sec.requires
    ? `<p class="req"><strong>Requires:</strong> <code>${esc(sec.requires)}</code></p>` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)} — pgvitals</title>
  <meta name="description" content="${esc(desc)}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${url}" />
  <meta property="og:site_name" content="pgvitals" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(sec.what)}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:type" content="article" />
  <meta property="og:image" content="${SITE}/og-image.svg" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(sec.what)}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/sql.min.js"></script>
  <link rel="stylesheet" href="/shell.css" />
  <script src="/shell.js" defer></script>
  <script type="application/ld+json">${JSON.stringify(jsonld)}</script>
  <script type="application/ld+json">${JSON.stringify(crumbs)}</script>
  <style>
    body { font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
           color:#0f172a; background:#f8fafc; margin:0; }
    .hdr { background:#0f172a; color:#fff; padding:38px 0 30px; }
    .wrap { max-width:840px; margin:0 auto; padding:0 24px; }
    .crumb { font-size:13px; color:#94a3b8; margin-bottom:10px; }
    .crumb a { color:#cbd5e1; text-decoration:none; }
    .hdr h1 { margin:6px 0 8px; font-size:30px; letter-spacing:-0.6px; line-height:1.15; }
    .pill { display:inline-block; font-size:12px; font-weight:700; background:rgba(59,130,246,.18);
            color:#bfdbfe; padding:4px 11px; border-radius:999px; }
    main { padding:30px 0 70px; }
    .block { margin:0 0 30px; }
    .block h2 { font-size:18px; margin:0 0 10px; }
    .lead { font-size:17px; line-height:1.6; color:#334155; }
    .lookfor { background:#fff; border:1px solid #e2e8f0; border-left:4px solid #f59e0b;
               border-radius:8px; padding:12px 16px; font-size:15px; }
    pre { background:#0d1117; border-radius:10px; padding:16px; overflow-x:auto; margin:0; }
    pre code { font:13px/1.55 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace; }
    .action { background:#ecfdf5; border:1px solid #a7f3d0; border-radius:8px; padding:12px 16px; font-size:15px; }
    .req { font-size:14px; color:#64748b; }
    code { background:#eef2f7; padding:1px 6px; border-radius:5px;
           font:13px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace; }
    .related { list-style:none; padding:0; margin:0; display:grid;
               grid-template-columns:1fr 1fr; gap:8px; }
    @media (max-width:640px){ .related { grid-template-columns:1fr; } }
    .related a { display:block; background:#fff; border:1px solid #e2e8f0; border-radius:8px;
                 padding:10px 12px; text-decoration:none; color:#1d4ed8; font-size:14px; font-weight:600; }
    .related a:hover { background:#f1f5f9; }
    .cta { display:flex; gap:10px; flex-wrap:wrap; margin-top:8px; }
    .cta a { text-decoration:none; font-weight:600; font-size:14px; padding:10px 16px;
             border-radius:9px; border:1px solid #e2e8f0; color:#0f172a; background:#fff; }
    .cta a.primary { background:#1d4ed8; color:#fff; border-color:#1d4ed8; }
    .copy { float:right; font-size:12px; font-weight:600; color:#94a3b8; background:transparent;
            border:1px solid #334155; border-radius:6px; padding:4px 10px; cursor:pointer; }
  </style>
</head>
<body>
  <header class="hdr">
    <div class="wrap">
      <div class="crumb"><a href="/">pgvitals</a> / <a href="/diagnostics.html">Diagnostics</a> / ${esc(sec.title)}</div>
      <span class="pill">${esc(sec.area)} · Section ${esc(sec.id)}</span>
      <h1>${esc(sec.title)} in PostgreSQL</h1>
    </div>
  </header>
  <main class="wrap">
    <section class="block">
      <p class="lead">${esc(sec.what)}</p>
    </section>

    <section class="block">
      <h2>What to look for</h2>
      <p class="lookfor">${esc(sec.lookFor || 'Review the query output for outliers.')}</p>
    </section>

    <section class="block">
      <h2>The diagnostic query</h2>
      ${requiresHtml}
      <pre><button class="copy" onclick="(function(b){navigator.clipboard.writeText(b.parentElement.querySelector('code').innerText).then(()=>{b.textContent='Copied';setTimeout(()=>b.textContent='Copy',1200)})})(this)">Copy</button><code class="language-sql">${esc(sec.sql)}</code></pre>
    </section>

    <section class="block">
      <h2>How to fix it</h2>
      <p class="action">${esc(sec.action || 'Investigate the offending rows and remediate.')}</p>
    </section>

    <section class="block">
      <div class="cta">
        <a class="primary" href="/diagnostics.html#${esc(slugify(sec.title))}">Open in diagnostics browser →</a>
        <a href="/playground.html">Score your database</a>
        <a href="https://github.com/pgvitals/pgvitals/tree/master/sql">View all SQL on GitHub</a>
      </div>
    </section>
${relatedHtml}
  </main>
  <script>document.addEventListener('DOMContentLoaded',function(){if(window.hljs)hljs.highlightAll();});</script>
</body>
</html>
`;
}

function hub(all) {
  const byArea = {};
  all.forEach(s => { (byArea[s.area] = byArea[s.area] || []).push(s); });
  const groups = Object.keys(byArea).map(area => `
      <h2>${esc(area)}</h2>
      <ul class="list">
        ${byArea[area].map(s => `<li><a href="/sections/${fileFor(s)}"><b>${esc(s.id)}</b> ${esc(s.title)}</a><span>${esc(s.what)}</span></li>`).join('\n        ')}
      </ul>`).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>PostgreSQL Diagnostic Guides — pgvitals</title>
  <meta name="description" content="Guides for every common PostgreSQL performance problem — slow queries, bloat, vacuum lag, lock waits, replication lag, wraparound risk — each with ready-to-run SQL and a fix." />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${SITE}/sections/" />
  <meta property="og:title" content="PostgreSQL Diagnostic Guides — pgvitals" />
  <meta property="og:description" content="A guide for every common PostgreSQL performance problem, each with ready-to-run SQL." />
  <meta property="og:url" content="${SITE}/sections/" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="${SITE}/og-image.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/shell.css" />
  <script src="/shell.js" defer></script>
  <style>
    body { font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; color:#0f172a; background:#f8fafc; margin:0; }
    .hdr { background:#0f172a; color:#fff; padding:40px 0 32px; }
    .wrap { max-width:900px; margin:0 auto; padding:0 24px; }
    .hdr h1 { margin:0 0 8px; font-size:30px; letter-spacing:-0.6px; }
    .hdr p { margin:0; color:#94a3b8; }
    main { padding:30px 0 70px; }
    h2 { font-size:15px; text-transform:uppercase; letter-spacing:.5px; color:#64748b; margin:28px 0 12px; }
    .list { list-style:none; padding:0; margin:0; display:grid; gap:8px; }
    .list li { background:#fff; border:1px solid #e2e8f0; border-radius:10px; padding:12px 14px; }
    .list a { text-decoration:none; color:#1d4ed8; font-weight:700; font-size:15px; }
    .list b { color:#94a3b8; margin-right:6px; }
    .list span { display:block; color:#475569; font-size:13.5px; font-weight:400; margin-top:3px; }
  </style>
</head>
<body>
  <header class="hdr"><div class="wrap">
    <h1>PostgreSQL Diagnostic Guides</h1>
    <p>${all.length} common PostgreSQL problems — each with ready-to-run SQL and a fix.</p>
  </div></header>
  <main class="wrap">${groups}
  </main>
</body>
</html>
`;
}

function sitemap(all) {
  const core = [
    ['/', '1.0'], ['/diagnostics.html', '0.9'], ['/playground.html', '0.8'],
    ['/sections/', '0.8'], ['/example-report.html', '0.7']
  ];
  const urls = core.map(([loc, pri]) =>
    `  <url>\n    <loc>${SITE}${loc}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>${pri}</priority>\n  </url>`);
  all.forEach(s => urls.push(
    `  <url>\n    <loc>${SITE}/sections/${fileFor(s)}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`));
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}

// ── Generate ────────────────────────────────────────────────────────
const outDir = path.join(ROOT, 'sections');
fs.mkdirSync(outDir, { recursive: true });
let n = 0;
for (const sec of SECTIONS) {
  fs.writeFileSync(path.join(outDir, fileFor(sec)), page(sec, SECTIONS));
  n++;
}
fs.writeFileSync(path.join(outDir, 'index.html'), hub(SECTIONS));
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap(SECTIONS));
console.log(`Generated ${n} section pages + hub + sitemap (${SECTIONS.length} sections).`);
