
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

        const expectedPath = normalizePath(`${account.joiner}${account.username}`);
        if (pathname.toLowerCase().startsWith(expectedPath.toLowerCase())) {
            return account;
        }
    }

    return null;
}

chrome.webNavigation.onCommitted.addListener(async (details) => {
    if (details.frameId !== 0) {
        return;
    }

    const targetUrl = details.url;
    if (!targetUrl || targetUrl.startsWith("chrome-extension://")) {
        return;
    }
    if (!isHttpUrl(targetUrl)) {
        return;
    }

    const matchedAccount = await shouldBlockUrl(targetUrl);
    if (matchedAccount) {
        const allowedSet = allowlistByTab.get(details.tabId);
        const normalizedTarget = normalizeUrl(targetUrl);
        if (allowedSet && allowedSet.has(normalizedTarget)) {
            lastSafeUrlByTab.set(details.tabId, targetUrl);
            return;
        }

        const previousUrl = lastSafeUrlByTab.get(details.tabId);
        const prevParam = previousUrl ? `&prev=${encodeURIComponent(previousUrl)}` : "";
        const redirectUrl = `${BLOCK_PAGE_URL}?blocked=${encodeURIComponent(targetUrl)}${prevParam}`;
        chrome.tabs.update(details.tabId, { url: redirectUrl });
        return;
    }

    lastSafeUrlByTab.set(details.tabId, targetUrl);
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
