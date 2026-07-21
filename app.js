// App State
const appState = {
    currentPage: 'homescreen',
    adBlockerEnabled: true,
    trackingProtectionEnabled: true,
    darkModeEnabled: true,
    blockedAds: 0,
    blockedTrackers: 0
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    renderApp();
    setupEventListeners();
});

function renderApp() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="container">
            <nav class="navbar">
                <h1>🔒 BlowkeyG</h1>
                <div class="nav-buttons">
                    <button class="nav-btn active" data-page="homescreen">Home</button>
                    <button class="nav-btn" data-page="browser">Browser</button>
                    <button class="nav-btn" data-page="settings">Settings</button>
                </div>
            </nav>

            <!-- Homescreen -->
            <div class="homescreen active">
                <div class="search-container">
                    <div class="search-box">
                        <input type="text" class="search-input" id="search-input" placeholder="Search with DuckDuckGo...">
                        <button class="search-btn" id="search-btn">Search</button>
                    </div>
                </div>

                <h2 style="text-align: center; margin-bottom: 30px; color: var(--accent-color);">Quick Access</h2>
                <div class="quick-links">
                    <div class="quick-link" data-url="https://duckduckgo.com">
                        <div class="quick-link-title">🔍 DuckDuckGo</div>
                        <small>Search Engine</small>
                    </div>
                    <div class="quick-link" data-url="https://www.wikipedia.org">
                        <div class="quick-link-title">📖 Wikipedia</div>
                        <small>Knowledge Base</small>
                    </div>
                    <div class="quick-link" data-url="https://www.github.com">
                        <div class="quick-link-title">💻 GitHub</div>
                        <small>Code Repository</small>
                    </div>
                    <div class="quick-link" data-url="https://www.youtube.com">
                        <div class="quick-link-title">▶️ YouTube</div>
                        <small>Video Platform</small>
                    </div>
                    <div class="quick-link" data-url="https://www.reddit.com">
                        <div class="quick-link-title">🤖 Reddit</div>
                        <small>Community Forum</small>
                    </div>
                    <div class="quick-link" data-url="https://www.privacy.com">
                        <div class="quick-link-title">🛡️ Privacy</div>
                        <small>Privacy Tools</small>
                    </div>
                </div>
            </div>

            <!-- Browser -->
            <div class="browser">
                <div class="browser-address-bar">
                    <input type="text" class="address-input" id="address-bar" placeholder="Enter URL or search term...">
                    <button class="go-btn" id="go-btn">Go</button>
                </div>
                <div class="browser-content" id="browser-content">
                    <div style="padding: 40px; text-align: center; color: #999;">
                        <h3>Enter a URL or search term to begin</h3>
                    </div>
                </div>
                <div class="info-panel">
                    <div class="info-item">
                        <span>🛑 Ads Blocked:</span>
                        <span id="ads-blocked">0</span>
                    </div>
                    <div class="info-item">
                        <span>📊 Trackers Blocked:</span>
                        <span id="trackers-blocked">0</span>
                    </div>
                    <div class="info-item">
                        <span>🔐 Connection:</span>
                        <span>Secure</span>
                    </div>
                </div>
            </div>

            <!-- Settings -->
            <div class="settings">
                <div class="settings-panel">
                    <div class="settings-group">
                        <h3>Privacy & Security</h3>
                        <div class="setting-item">
                            <span>🛡️ Ad Blocker</span>
                            <div class="toggle-switch ${appState.adBlockerEnabled ? 'active' : ''}" data-setting="adBlocker"></div>
                        </div>
                        <div class="setting-item">
                            <span>👁️ Tracking Protection</span>
                            <div class="toggle-switch ${appState.trackingProtectionEnabled ? 'active' : ''}" data-setting="trackingProtection"></div>
                        </div>
                    </div>

                    <div class="settings-group">
                        <h3>Appearance</h3>
                        <div class="setting-item">
                            <span>🌙 Dark Mode</span>
                            <div class="toggle-switch ${appState.darkModeEnabled ? 'active' : ''}" data-setting="darkMode"></div>
                        </div>
                    </div>

                    <div class="settings-group">
                        <h3>Search Engine</h3>
                        <div class="setting-item">
                            <span>Default Search:</span>
                            <span style="color: var(--accent-color);">DuckDuckGo 🔒</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            changePage(e.target.dataset.page);
        });
    });

    // Search
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });

    // Quick Links
    document.querySelectorAll('.quick-link').forEach(link => {
        link.addEventListener('click', () => {
            navigateToUrl(link.dataset.url);
        });
    });

    // Browser
    const goBtn = document.getElementById('go-btn');
    const addressBar = document.getElementById('address-bar');
    goBtn.addEventListener('click', handleBrowserNavigation);
    addressBar.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleBrowserNavigation();
    });

    // Settings
    document.querySelectorAll('.toggle-switch').forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.target.classList.toggle('active');
            const setting = e.target.dataset.setting;
            updateSetting(setting);
        });
    });
}

function changePage(page) {
    appState.currentPage = page;

    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.page === page) btn.classList.add('active');
    });

    // Update content
    document.querySelectorAll('.homescreen, .browser, .settings').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelector(`.${page}`).classList.add('active');
}

function handleSearch() {
    const query = document.getElementById('search-input').value;
    if (query) {
        const searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
        navigateToUrl(searchUrl);
    }
}

function handleBrowserNavigation() {
    const input = document.getElementById('address-bar').value;
    if (input) {
        let url = input;
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = `https://duckduckgo.com/?q=${encodeURIComponent(input)}`;
        }
        navigateToUrl(url);
    }
}

function navigateToUrl(url) {
    changePage('browser');
    document.getElementById('address-bar').value = url;
    const browserContent = document.getElementById('browser-content');
    
    // Try to load in iframe
    try {
        browserContent.innerHTML = `<iframe src="${url}" style="width: 100%; height: 100%; border: none; border-radius: 10px;"></iframe>`;
    } catch (e) {
        browserContent.innerHTML = `
            <div style="padding: 40px; text-align: center; color: #999;">
                <h3>Unable to load content</h3>
                <p>Some websites cannot be embedded. Visit the site directly:</p>
                <a href="${url}" target="_blank" style="color: var(--accent-color); text-decoration: none;">${url}</a>
            </div>
        `;
    }
}

function updateSetting(setting) {
    if (setting === 'adBlocker') {
        appState.adBlockerEnabled = !appState.adBlockerEnabled;
        console.log('Ad Blocker:', appState.adBlockerEnabled);
    } else if (setting === 'trackingProtection') {
        appState.trackingProtectionEnabled = !appState.trackingProtectionEnabled;
        console.log('Tracking Protection:', appState.trackingProtectionEnabled);
    } else if (setting === 'darkMode') {
        appState.darkModeEnabled = !appState.darkModeEnabled;
        console.log('Dark Mode:', appState.darkModeEnabled);
    }
}