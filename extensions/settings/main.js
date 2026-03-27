document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('toggle');
    const betaToggle = document.getElementById('betaToggle');
    const resolverUrl = document.getElementById('resolverUrl');
    const extraDomains = document.getElementById('extraDomains');
    const statusText = document.getElementById('statusText');
    const statusDot = document.getElementById('statusDot');
    const saveBtn = document.getElementById('saveBtn');
    const resetBtn = document.getElementById('resetBtn');
    const toast = document.getElementById('toast');

    const defaults = {
        odns_enabled: false,
        beta_enabled: false,
        resolver_url: 'https://opendomain-network.vercel.app/resolve?domain=',
        extra_domains: ''
    };

    let currentSettings = { ...defaults };

    function showToast(msg) {
        toast.textContent = msg;
        toast.style.display = 'block';
        setTimeout(() => { toast.style.display = 'none'; }, 1500);
    }

    function syncStatusVisual(enabled) {
        if (!statusText || !statusDot) return;
        if (enabled) {
            statusText.textContent = 'system aktywny';
            statusDot.classList.remove('inactive');
        } else {
            statusText.textContent = 'system wyłączony';
            statusDot.classList.add('inactive');
        }
    }

    function updateUi(settings) {
        currentSettings = { ...currentSettings, ...settings };
        const {
            odns_enabled,
            beta_enabled,
            resolver_url,
            extra_domains
        } = currentSettings;

        if (toggle) toggle.checked = !!odns_enabled;
        if (betaToggle) betaToggle.checked = !!beta_enabled;
        if (resolverUrl) resolverUrl.value = resolver_url || '';
        if (extraDomains) extraDomains.value = extra_domains || '';

        syncStatusVisual(!!odns_enabled);
    }

    chrome.storage.local.get([
        'odns_enabled',
        'beta_enabled',
        'resolver_url',
        'extra_domains'
    ], (result) => {
        const settings = {
            odns_enabled: !!result.odns_enabled,
            beta_enabled: !!result.beta_enabled,
            resolver_url: result.resolver_url || defaults.resolver_url,
            extra_domains: result.extra_domains || ''
        };
        updateUi(settings);
    });

    function captureFields() {
        return {
            odns_enabled: toggle ? toggle.checked : currentSettings.odns_enabled,
            beta_enabled: betaToggle ? betaToggle.checked : currentSettings.beta_enabled,
            resolver_url: resolverUrl ? resolverUrl.value : currentSettings.resolver_url,
            extra_domains: extraDomains ? extraDomains.value : currentSettings.extra_domains
        };
    }

    if (toggle) {
        toggle.addEventListener('change', () => {
            updateUi(captureFields());
        });
    }

    if (betaToggle) {
        betaToggle.addEventListener('change', () => {
            updateUi(captureFields());
        });
    }

    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            const settings = {
                odns_enabled: toggle ? toggle.checked : currentSettings.odns_enabled,
                beta_enabled: betaToggle ? betaToggle.checked : currentSettings.beta_enabled,
                resolver_url: (resolverUrl ? resolverUrl.value : '') || defaults.resolver_url,
                extra_domains: (extraDomains ? extraDomains.value : '') || ''
            };
            chrome.storage.local.set(settings, () => {
                showToast('Zapisano');
            });
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            chrome.storage.local.set(defaults, () => {
                updateUi(defaults);
                showToast('Zresetowano');
            });
        });
    }

    chrome.storage.onChanged.addListener((changes, area) => {
        if (area !== 'local') return;

        const update = {};
        if ('odns_enabled' in changes) {
            update.odns_enabled = !!changes.odns_enabled.newValue;
        }
        if ('beta_enabled' in changes) {
            update.beta_enabled = !!changes.beta_enabled.newValue;
        }
        if ('resolver_url' in changes) {
            update.resolver_url = changes.resolver_url.newValue || defaults.resolver_url;
        }
        if ('extra_domains' in changes) {
            update.extra_domains = changes.extra_domains.newValue || '';
        }

        if (Object.keys(update).length) {
            updateUi(update);
        }
    });
});
