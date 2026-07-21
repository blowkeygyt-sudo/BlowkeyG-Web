// Ad Blocker Module
const AdBlocker = (() => {
    const commonAdPatterns = [
        /ads?\./i,
        /advert/i,
        /banner/i,
        /doubleclick/i,
        /googlesyndication/i,
        /facebook\.com\/tr/i,
        /analytics/i,
        /tracking/i,
        /beacon/i,
        /pagead/i,
        /adservices/i,
        /youtube-nocookie/i
    ];

    const blockList = [
        'ads.google.com',
        'pagead.googlesyndication.com',
        'adservice.google.com',
        'googleadservices.com',
        'facebook.com/tr',
        'analytics.google.com',
        'google-analytics.com',
        'doubleclick.net',
        'amazon-adsystem.com',
        'adx1.com',
        'criteo.com',
        'scorecardresearch.com',
        'taboola.com',
        'outbrain.com'
    ];

    function isAdUrl(url) {
        return blockList.some(adDomain => url.includes(adDomain)) ||
               commonAdPatterns.some(pattern => pattern.test(url));
    }

    function blockAds() {
        if (typeof MutationObserver !== 'undefined') {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.addedNodes.length) {
                        mutation.addedNodes.forEach((node) => {
                            if (node.nodeType === 1) { // Element node
                                // Remove common ad elements
                                const adSelectors = [
                                    '[id*="ad-"]',
                                    '[id*="ads"]',
                                    '[class*="ad-"]',
                                    '[class*="ads"]',
                                    '[class*="banner"]',
                                    '[data-ad-slot]',
                                    'ins[class*="adsbygoogle"]'
                                ];

                                adSelectors.forEach(selector => {
                                    node.querySelectorAll(selector).forEach(el => {
                                        el.style.display = 'none';
                                        updateBlockedCount('ads');
                                    });
                                });
                            }
                        });
                    }
                });
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }

    function blockTrackers() {
        // Block tracking pixels and beacons
        const originalFetch = window.fetch;
        window.fetch = function(...args) {
            const url = args[0];
            if (typeof url === 'string' && isTrackerUrl(url)) {
                console.log('Tracker blocked:', url);
                updateBlockedCount('trackers');
                return Promise.reject('Tracker blocked');
            }
            return originalFetch.apply(this, args);
        };
    }

    function isTrackerUrl(url) {
        const trackers = [
            'analytics',
            'tracking',
            'beacon',
            'doubleclick',
            'facebook.com/tr'
        ];
        return trackers.some(tracker => url.includes(tracker));
    }

    function updateBlockedCount(type) {
        const countElement = document.getElementById(`${type}-blocked`);
        if (countElement) {
            const currentCount = parseInt(countElement.textContent) || 0;
            countElement.textContent = currentCount + 1;
        }
    }

    return {
        init: function() {
            blockAds();
            blockTrackers();
            console.log('🛡️ Ad Blocker & Tracker Protection Initialized');
        },
        isAdUrl: isAdUrl
    };
})();

// Initialize Ad Blocker
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => AdBlocker.init());
} else {
    AdBlocker.init();
}