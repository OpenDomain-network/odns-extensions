document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('toggle');
    const statusText = document.getElementById('statusText');
    const dot = document.getElementById('statusDot');
    const openSettingsBtn = document.getElementById('openSettings');
    const openWebBtn = document.getElementById('openWeb');
    const hasChromeRuntime = typeof chrome !== 'undefined' && !!chrome.runtime;
    const hasChromeStorage = typeof chrome !== 'undefined' && !!chrome.storage && !!chrome.storage.local;
    const hasChromeTabs = typeof chrome !== 'undefined' && !!chrome.tabs;
    const fallbackStorageKey = 'odns_enabled';

    function updateUi(enabled) {
        if (toggle) {
            toggle.checked = !!enabled;
        }

        if (statusText) {
            statusText.textContent = enabled ? 'system aktywny' : 'system wyłączony';
        }

        if (dot) {
            dot.classList.toggle('red', !enabled);
        }
    }

    function readEnabled(callback) {
        if (hasChromeStorage) {
            chrome.storage.local.get(['odns_enabled'], (result) => {
                const enabled = result.odns_enabled === undefined ? true : !!result.odns_enabled;
                callback(enabled);
            });
            return;
        }

        let enabled = true;
        try {
            const value = localStorage.getItem(fallbackStorageKey);
            enabled = value === null ? true : value === 'true';
        } catch (e) {
            enabled = true;
        }
        callback(enabled);
    }

    function writeEnabled(enabled) {
        if (hasChromeStorage) {
            chrome.storage.local.set({ odns_enabled: enabled });
            return;
        }

        try {
            localStorage.setItem(fallbackStorageKey, String(!!enabled));
        } catch (e) {
            // ignore localStorage failures in fallback mode
        }
    }

    readEnabled((enabled) => {
        updateUi(enabled);
    });

    if (toggle) {
        toggle.addEventListener('change', function() {
            const enabled = toggle.checked;
            writeEnabled(enabled);
            updateUi(enabled);
        });
    }

    if (hasChromeStorage && chrome.storage.onChanged) {
        chrome.storage.onChanged.addListener((changes, area) => {
            if (area !== 'local') return;
            if ('odns_enabled' in changes) {
                updateUi(!!changes.odns_enabled.newValue);
            }
        });
    }

    if (openSettingsBtn) {
        openSettingsBtn.addEventListener('click', () => {
            if (hasChromeRuntime && chrome.runtime.openOptionsPage) {
                chrome.runtime.openOptionsPage();
            } else if (hasChromeRuntime && chrome.runtime.getURL && hasChromeTabs && chrome.tabs.create) {
                chrome.tabs.create({ url: chrome.runtime.getURL('settings/main.html') });
            } else {
                window.location.href = 'settings/main.html';
            }
        });
    }

    if (openWebBtn) {
        openWebBtn.addEventListener('click', () => {
            if (hasChromeRuntime && chrome.runtime.getURL && hasChromeTabs && chrome.tabs.create) {
                chrome.tabs.create({ url: chrome.runtime.getURL('settings/404.html') });
            } else {
                window.location.href = 'settings/404.html';
            }
        });
    }
});
