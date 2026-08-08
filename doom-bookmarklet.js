function launchDoom() {
  var overlay = document.createElement('div');
  overlay.setAttribute('id', 'doom-overlay');
  overlay.style.cssText =
    'position:fixed;top:0;left:0;width:100vw;height:100vh;' +
    'background:#000;z-index:999999;display:flex;align-items:center;' +
    'justify-content:center;overflow:hidden;cursor:crosshair;';
  overlay.innerHTML =
    '<div style="position:absolute;top:12px;left:50%;transform:translateX(-50%);' +
    'color:#f00;font-family:monospace;font-size:14px;letter-spacing:2px;' +
'text-shadow:0 0 6px #f00;z-index:10;">DOOM BOOKMARKLET&hellip;</div>' +
    '<canvas id="doom-screen" width="640" height="400" style="width:100vw;height:100vh;"></canvas>' +
    '<div style="position:absolute;bottom:12px;left:50%;transform:translateX(-50%);' +
    'color:#888;font-family:monospace;font-size:12px;z-index:10;">' +
    'Click to focus &middot; Esc = menu &middot; Close this tab to exit</div>';
  document.body.appendChild(overlay);

  var closeBtn = document.createElement('button');
  closeBtn.textContent = 'X';
  closeBtn.style.cssText =
    'position:absolute;top:8px;right:12px;z-index:20;background:transparent;' +
    'border:1px solid #f00;color:#f00;font-family:monospace;font-size:16px;' +
    'padding:4px 10px;cursor:pointer;';
  closeBtn.onclick = function () {
    if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
  };
  overlay.appendChild(closeBtn);

var scriptUrl =
    'https://raw.githack.com/caiiiycuk/js-dos/gh-pages/6.22/current/js-dos.js';
  var script = document.createElement('script');
  script.src = scriptUrl;
  script.onload = boot;
  script.onerror = function () { alert('Could not load the emulator from CDN.'); };
  document.head.appendChild(script);

  function boot() {
    if (typeof Dos === 'undefined') {
      alert('Failed to load the DOS emulator. Check your connection.');
      return;
    }
var screen = document.getElementById('doom-screen');
    var wdosboxUrl =
      'https://raw.githack.com/caiiis iycuk/js-dos/gh-pages/6.22/current/wdosbox.js';
    var bundle = 'https://raw.githack.com/caiiiycuk/js-dos/gh-pages/cdn/upload/DOOM-@evilution.zip';
    Dos(screen, { wdosboxUrl: wdosboxUrl }).ready(function (fs, main) {
      fs.extract(bundle, '/').then(function () {
        main(['-c', 'cd DOOM', '-c', 'DOOM.EXE -warp 1 1']);
        var label = overlay.querySelector('div[style*="DOOM"]');
        if (label && label.parentNode) label.parentNode.removeChild(label);
      });
    }).catch(function (err) {
      console.error('DOOM failed to boot:', err);
      alert('DOOM failed to boot. See the browser console for details.');
    });
  }
}