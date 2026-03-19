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

    function showToast(msg) {
        toast.textContent = msg;
        toast.style.display = 'block';
        setTimeout(() => { toast.style.display = 'none'; }, 1500);
    }

    function updateUi(settings) {
        toggle.checked = !!settings.odns_enabled;
        betaToggle.checked = !!settings.beta_enabled;
        resolverUrl.value = settings.resolver_url || '';
        extraDomains.value = settings.extra_domains || '';

        if (settings.odns_enabled) {
            statusText.textContent = 'system aktywny';
            statusDot.classList.remove('inactive');
        } else {
            statusText.textContent = 'system wyłączony';
            statusDot.classList.add('inactive');
        }
    }

    // Load stored settings (all keys)
    chrome.storage.local.get([
        'odns_enabled',
        'beta_enabled',
        'resolver_url',
        'extra_domains'
    ], (result) => {
        const settings = {
            odns_enabled: !!result.odns_enabled,
            beta_enabled: !!result.beta_enabled,
            resolver_url: result.resolver_url || 'https://resolver.odns.dev',
            extra_domains: result.extra_domains || ''
        };
        updateUi(settings);
    });

    // Immediate UI update when toggled (doesn't save until Save pressed)
    toggle.addEventListener('change', () => {
        updateUi({
            odns_enabled: toggle.checked,
            beta_enabled: betaToggle.checked,
            resolver_url: resolverUrl.value,
            extra_domains: extraDomains.value
        });
    });

    // Keep beta toggle immediate UI feedback
    betaToggle.addEventListener('change', () => {
        // not much to do visually here, but could be extended
    });

    saveBtn.addEventListener('click', () => {
        const settings = {
            odns_enabled: toggle.checked,
            beta_enabled: betaToggle.checked,
            resolver_url: resolverUrl.value || 'https://resolver.odns.dev',
            extra_domains: extraDomains.value || ''
        };
        chrome.storage.local.set(settings, () => {
            showToast('Zapisano');
        });
    });

    resetBtn.addEventListener('click', () => {
        const defaults = {
            odns_enabled: false,
            beta_enabled: false,
            resolver_url: 'https://resolver.odns.dev',
            extra_domains: ''
        };
        chrome.storage.local.set(defaults, () => {
            updateUi(defaults);
            showToast('Zresetowano');
        });
    });
});
