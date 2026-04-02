
const ACCOUNTS_URL = chrome.runtime.getURL("lists/account_tagging_v1.json");
const JOINERS_URL = chrome.runtime.getURL("lists/joiners.json");
const PLATFORMS_URL = chrome.runtime.getURL("lists/platforms.json");
const BLOCK_PAGE_URL = chrome.runtime.getURL("block.html");

let listCachePromise = null;
const lastSafeUrlByTab = new Map();
const allowlistByTab = new Map();

function isHttpUrl(url) {
    return url.startsWith("http://") || url.startsWith("https://");
}

async function loadLists() {
    const [accountsResponse, joinersResponse, platformsResponse] = await Promise.all([
        fetch(ACCOUNTS_URL),
        fetch(JOINERS_URL),
        fetch(PLATFORMS_URL)
    ]);

    if (!accountsResponse.ok || !joinersResponse.ok || !platformsResponse.ok) {
        throw new Error("Failed to load block lists.");
    }

    const accountsData = await accountsResponse.json();
    const joinersData = await joinersResponse.json();
    const platformsData = await platformsResponse.json();

    const joinerMap = new Map();
    for (const platform of joinersData.platforms || []) {
        if (platform?.name && platform?.joiner) {
            joinerMap.set(platform.name.toLowerCase(), platform.joiner);
        }
    }

    const aliasMap = new Map();
    for (const platform of platformsData.platforms || []) {
        const baseName = platform?.name?.toLowerCase();
        if (!baseName) {
            continue;
        }

        const aliasList = Array.isArray(platform.aliases) ? platform.aliases : [];
        const normalizedAliases = aliasList
            .filter((alias) => typeof alias === "string" && alias.trim().length > 0)
            .map((alias) => alias.toLowerCase());

        aliasMap.set(baseName, new Set([baseName, ...normalizedAliases]));
    }

    const accounts = [];
    for (const account of accountsData.accounts || []) {
        const platform = account?.platform?.toLowerCase();
        const username = account?.username;
        const joiner = joinerMap.get(platform);
        if (!platform || !username || !joiner) {
            continue;
        }

        accounts.push({
            platform,
            joiner,
            username,
            aliases: aliasMap.get(platform) ?? new Set([platform])
        });
    }

    return accounts;
}

async function getAccounts() {
    if (!listCachePromise) {
        listCachePromise = loadLists().catch((error) => {
            console.error(error);
            listCachePromise = null;
            return [];
        });
    }

    return listCachePromise;
}

function normalizeHostname(hostname) {
    return hostname.replace(/^www\./i, "").toLowerCase();
}

function normalizePath(pathname) {
    if (!pathname) return "/";
    return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

function normalizeUrl(value) {
    if (!value) return "";
    try {
        const parsed = new URL(value);
        let path = parsed.pathname;
        if (path.endsWith("/") && path.length > 1) {
            path = path.slice(0, -1);
        }
        return `${parsed.protocol}//${parsed.host}${path}`;
    } catch (error) {
        return value;
    }
}

/** Platforms where Path 2 applies: post URLs still contain host + profile path (see tools/dev/notes/user-paths.md). */
const PATH2_CONTAINMENT_PLATFORMS = new Set(["twitter.com", "tiktok.com"]);

/**
 * Path 2 (X / Twitter / TikTok): true if the full URL string contains the host + profile
 * segment anywhere (e.g. https://x.com/User/status/… contains x.com/user).
 * Same idea for TikTok: … contains tiktok.com/@handle.
 */
function path2UrlContainsProfilePath(fullUrl, account, hostname) {
    const lower = fullUrl.toLowerCase();
    const user = account.username.toLowerCase();
    const host = hostname.toLowerCase();

    if (account.platform === "twitter.com") {
        return lower.includes(`${host}/${user}`);
    }

    if (account.platform === "tiktok.com") {
        return lower.includes(`${host}/@${user}`);
    }

    return false;
}

/**
 * Block page copy: "post" vs profile when the blocked URL is a post/video (Path 2–style URLs).
 */
function blockedUrlIndicatesPost(targetUrl, matchedAccount) {
    if (!matchedAccount || !targetUrl) {
        return false;
    }
    try {
        const parsed = new URL(targetUrl);
        const path = parsed.pathname.toLowerCase();
        if (matchedAccount.platform === "twitter.com") {
            return path.includes("/status/");
        }
        if (matchedAccount.platform === "tiktok.com") {
            return path.includes("/video/") || path.includes("/photo/");
        }
        return false;
    } catch (error) {
        return false;
    }
}

async function shouldBlockUrl(url) {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        return false;
    }

    let parsedUrl = null;
    try {
        parsedUrl = new URL(url);
    } catch (error) {
        return false;
    }

    const hostname = normalizeHostname(parsedUrl.hostname);
    const pathname = normalizePath(parsedUrl.pathname);
    const accounts = await getAccounts();

    for (const account of accounts) {
        const allowedHosts = Array.from(account.aliases || []);
        const matchesHost = allowedHosts.some(
            (host) => normalizeHostname(host) === hostname
        );
        if (!matchesHost) {
            continue;
        }

        if (PATH2_CONTAINMENT_PLATFORMS.has(account.platform)) {
            if (path2UrlContainsProfilePath(url, account, hostname)) {
                return account;
            }
            continue;
        }

        const expectedPath = normalizePath(`${account.joiner}${account.username}`);
        if (pathname.toLowerCase().startsWith(expectedPath.toLowerCase())) {
            return account;
        }
    }

    return null;
}

/**
 * X/Twitter, TikTok, etc. often change the address bar via History API (in-feed clicks)
 * without a full document navigation, so onCommitted may not run. onHistoryStateUpdated
 * catches those SPA URL updates.
 */
async function handleNavigationUrl(tabId, targetUrl) {
    if (!targetUrl || targetUrl.startsWith("chrome-extension://")) {
        return;
    }
    if (!isHttpUrl(targetUrl)) {
        return;
    }

    const matchedAccount = await shouldBlockUrl(targetUrl);
    if (matchedAccount) {
        const allowedSet = allowlistByTab.get(tabId);
        const normalizedTarget = normalizeUrl(targetUrl);
        if (allowedSet && allowedSet.has(normalizedTarget)) {
            lastSafeUrlByTab.set(tabId, targetUrl);
            return;
        }

        const previousUrl = lastSafeUrlByTab.get(tabId);
        const prevParam = previousUrl ? `&prev=${encodeURIComponent(previousUrl)}` : "";
        let redirectUrl = `${BLOCK_PAGE_URL}?blocked=${encodeURIComponent(targetUrl)}${prevParam}`;
        if (blockedUrlIndicatesPost(targetUrl, matchedAccount)) {
            redirectUrl += "&blockContext=post";
        }
        chrome.tabs.update(tabId, { url: redirectUrl });
        return;
    }

    lastSafeUrlByTab.set(tabId, targetUrl);
}

function navigationFilter(details) {
    return details.frameId === 0;
}

chrome.webNavigation.onCommitted.addListener((details) => {
    if (!navigationFilter(details)) {
        return;
    }
    void handleNavigationUrl(details.tabId, details.url);
});

chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
    if (!navigationFilter(details)) {
        return;
    }
    void handleNavigationUrl(details.tabId, details.url);
});

/** Fallback when the tab URL changes without a classic navigation (some SPA edge cases). */
function urlLooksLikeXOrTikTok(url) {
    if (!url || !isHttpUrl(url)) {
        return false;
    }
    const u = url.toLowerCase();
    return (
        u.includes("x.com/") ||
        u.includes("twitter.com/") ||
        u.includes("tiktok.com/")
    );
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (changeInfo.url === undefined) {
        return;
    }
    if (!urlLooksLikeXOrTikTok(changeInfo.url)) {
        return;
    }
    void handleNavigationUrl(tabId, changeInfo.url);
});

chrome.tabs.onRemoved.addListener((tabId) => {
    lastSafeUrlByTab.delete(tabId);
    allowlistByTab.delete(tabId);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message?.type === "ALLOW_CONTINUE" && typeof message.url === "string") {
        const tabId = sender?.tab?.id ?? message.tabId;
        if (tabId !== undefined) {
            const normalized = normalizeUrl(message.url);
            const allowSet = allowlistByTab.get(tabId) ?? new Set();
            allowSet.add(normalized);
            allowlistByTab.set(tabId, allowSet);
            sendResponse({ ok: true });
        } else {
            sendResponse({ ok: false });
        }
        return true;
    }
    if (message?.type === "CHECK_SLOP_URL" && typeof message.url === "string") {
        shouldBlockUrl(message.url)
            .then((match) => sendResponse({ isSlop: Boolean(match) }))
            .catch(() => sendResponse({ isSlop: false }));
        return true;
    }
    return false;
});
