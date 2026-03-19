document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('toggle');
    const statusText = document.querySelector('.status');
    const dot = document.querySelector('.dot');
    const openSettingsBtn = document.getElementById('openSettings');
    const openWebBtn = document.getElementById('openWeb');

    function updateUi(enabled) {
        toggle.checked = !!enabled;
        if (enabled) {
            statusText.textContent = 'system aktywny';
            dot.classList.add('red');
        } else {
            statusText.textContent = 'system wyłączony';
            dot.classList.remove('red');
        }
    }

    // Load stored value
    chrome.storage.local.get(['odns_enabled'], (result) => {
        updateUi(!!result.odns_enabled);
    });

    // Save when toggled and update UI
    toggle.addEventListener('change', function() {
        const enabled = toggle.checked;
        chrome.storage.local.set({ odns_enabled: enabled });
        updateUi(enabled);
    });

    // Open settings (options page) — fallback to internal URL if API unavailable
    openSettingsBtn.addEventListener('click', () => {
        if (chrome.runtime && chrome.runtime.openOptionsPage) {
            chrome.runtime.openOptionsPage();
        } else {
            chrome.tabs.create({ url: chrome.runtime.getURL('settings/main.html') });
        }
    });

    // Open external website
    openWebBtn.addEventListener('click', () => {
        chrome.tabs.create({ url: '/settings/404.html' });
    });
});