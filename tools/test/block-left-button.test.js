const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

function createButtonElement() {
  const handlers = new Map();
  return {
    textContent: "",
    addEventListener(event, handler) {
      handlers.set(event, handler);
    },
    click() {
      const handler = handlers.get("click");
      if (handler) handler();
    },
  };
}

function createLinkElement() {
  return { href: "" };
}

function loadBlockScript({ search, chromeMock }) {
  const backButton = createButtonElement();
  const proceedButton = createButtonElement();
  const whyLink = createLinkElement();
  const disputeLink = createLinkElement();

  let domContentLoadedHandler = null;
  let closeCallCount = 0;

  const documentMock = {
    getElementById(id) {
      if (id === "back-button") return backButton;
      if (id === "proceed-button") return proceedButton;
      if (id === "why-link") return whyLink;
      if (id === "dispute-link") return disputeLink;
      return null;
    },
    addEventListener(event, handler) {
      if (event === "DOMContentLoaded") {
        domContentLoadedHandler = handler;
      }
    },
  };

  const windowMock = {
    location: {
      search,
      href: "https://initial.test",
    },
    close() {
      closeCallCount += 1;
    },
  };

  const scriptPath = path.resolve(__dirname, "../extension/block.js");
  const scriptSource = fs.readFileSync(scriptPath, "utf8");

  const context = {
    chrome: chromeMock,
    document: documentMock,
    window: windowMock,
    URLSearchParams,
    console,
  };

  vm.runInNewContext(scriptSource, context, { filename: "block.js" });
  assert.ok(domContentLoadedHandler, "Expected DOMContentLoaded handler to be registered");
  domContentLoadedHandler();

  return {
    backButton,
    windowMock,
    getCloseCallCount() {
      return closeCallCount;
    },
  };
}

test("left button shows back label and navigates to previous URL when prev exists", () => {
  const previousUrl = "https://example.com/previous";

  const env = loadBlockScript({
    search: `?prev=${encodeURIComponent(previousUrl)}`,
    chromeMock: {},
  });

  assert.equal(env.backButton.textContent, "<< Back");
  env.backButton.click();
  assert.equal(env.windowMock.location.href, previousUrl);
});

test("left button shows close label and closes extension tab when prev is missing", () => {
  let removedTabId = null;

  const env = loadBlockScript({
    search: "",
    chromeMock: {
      tabs: {
        getCurrent(callback) {
          callback({ id: 42 });
        },
        remove(tabId) {
          removedTabId = tabId;
        },
      },
    },
  });

  assert.equal(env.backButton.textContent, "✕ Close");
  env.backButton.click();
  assert.equal(removedTabId, 42);
});

test("left button falls back to window.close when extension tab id is unavailable", () => {
  const env = loadBlockScript({
    search: "",
    chromeMock: {
      tabs: {
        getCurrent(callback) {
          callback({});
        },
        remove() {},
      },
    },
  });

  assert.equal(env.backButton.textContent, "✕ Close");
  env.backButton.click();
  assert.equal(env.getCloseCallCount(), 1);
});
