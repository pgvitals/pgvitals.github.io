/* pgvitals shared shell — injects nav + footer into every page */
(function () {
  var GH_SVG = '<svg height="14" viewBox="0 0 16 16" width="14" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>';

  var path = window.location.pathname.replace(/\/$/, '') || '/';
  var isHome = path === '' || path === '/' || path === '/index.html';
  var isDiag = path === '/diagnostics.html';
  var isReport = path === '/example-report.html';
  var isPlay = path === '/playground.html';

  function a(href, label, active) {
    return '<li><a href="' + href + '"' + (active ? ' class="active"' : '') + '>' + label + '</a></li>';
  }

  var navLinks = [
    a('/', 'Home', isHome),
    a('/#vitals', 'Vitals', false),
    a('/#triage', 'Triage', false),
    a('/#runner', 'Runner', false),
    a('/diagnostics.html', 'Diagnostics', isDiag),
    a('/playground.html', 'Playground', isPlay),
    a('/example-report.html', 'Example Report', isReport),
  ].join('\n      ');

  var primaryBtn = isHome
    ? '<a class="btn-primary" href="/diagnostics.html">Open Diagnostics →</a>'
    : '';

  var nav = [
    '<nav>',
    '  <div class="nav-inner">',
    '    <a class="nav-logo" href="/">🩺 pg<span>vitals</span></a>',
    '    <ul class="nav-links">',
    '      ' + navLinks,
    '    </ul>',
    '    <div class="nav-right">',
    '      <a class="btn-ghost" href="https://github.com/pgvitals/pgvitals" target="_blank" rel="noopener">',
    '        ' + GH_SVG,
    '        GitHub',
    '      </a>',
    '      ' + primaryBtn,
    '    </div>',
    '  </div>',
    '</nav>',
  ].join('\n');

  var footer = [
    '<footer>',
    '  <div class="footer-inner">',
    '    <span>🩺 <strong>pgvitals</strong> — MIT License &nbsp;\xB7&nbsp; Built by <a href="https://github.com/gauravs19" target="_blank" rel="noopener">Gaurav Sharma</a></span>',
    '    <span>',
    '      <a href="/diagnostics.html">Diagnostics</a> \xB7',
    '      <a href="/playground.html">Playground</a> \xB7',
    '      <a href="/example-report.html">Example Report</a> \xB7',
    '      <a href="https://github.com/pgvitals/pgvitals" target="_blank" rel="noopener">GitHub</a> \xB7',
    '      <a href="https://github.com/pgvitals/pgvitals/blob/master/master.sql" target="_blank" rel="noopener">Download master.sql</a> \xB7',
    '      <a href="https://github.com/pgvitals/pgvitals/blob/master/health_score.sql" target="_blank" rel="noopener">Health Score SQL</a>',
    '    </span>',
    '  </div>',
    '</footer>',
  ].join('\n');

  document.body.insertAdjacentHTML('afterbegin', nav);
  document.body.insertAdjacentHTML('beforeend', footer);
})();
