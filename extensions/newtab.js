// Early new-tab handler: inject UI only when enabled to avoid flicker.
(function(){
  const Web = 'https://start.duckduckgo.com/';

  function injectUI() {
    // inject stylesheet
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'tab.css';
    document.head.appendChild(link);

    // insert UI markup
    document.body.innerHTML = `
    <div class="container">

      <h1>OpenDomain</h1>
      <p class="subtitle">Redefiniujemy sposób, w jaki działa internet...</p>

      <div class="search-box">
        <input type="text" id="input" placeholder="Wyszukaj domenę...">
        <button id="go">➡</button>
      </div>

      <div class="status">
        <span class="dot"></span>
        System aktywny
      </div>

      <div class="quick-links">
        <a href="https://google.com" class="link-google">Google</a>
        <a href="https://github.com" class="link-github">GitHub</a>
        <a href="https://gitlab.com" class="link-gitlab">GitLab</a>
        <a href="https://spotify.com" class="link-spotify">Spotify</a>
        <a href="https://youtube.com" class="link-youtube">YouTube</a>
      </div>

    </div>
    `;

    // small behavior: search button opens resolver
    const go = document.getElementById('go');
    const input = document.getElementById('input');
    go && go.addEventListener('click', () => {
      const q = input.value.trim();
      if (!q) return;
      const url = 'https://opendomain-network.vercel.app/?domain=' + encodeURIComponent(q);
      try { window.location.href = url; } catch (e) { chrome.tabs && chrome.tabs.create && chrome.tabs.create({url}); }
    });

    // reveal
    document.body.style.visibility = 'visible';
  }

  if (!chrome || !chrome.storage || !chrome.storage.local) {
    injectUI();
    return;
  }

  chrome.storage.local.get(['odns_enabled'], function(res){
    const enabled = res.odns_enabled === undefined ? true : !!res.odns_enabled;
    if (!enabled) {
      try { window.location.replace(Web); } catch (e) { window.location.href = Web; }
      return;
    }
    injectUI();
  });
})();
