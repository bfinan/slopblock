const LOG_INTERVAL_MS = 15000;

let logIntervalId = null;

function checkSlopPage() {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(
      { type: "CHECK_SLOP_URL", url: window.location.href },
      (response) => resolve(Boolean(response?.isSlop))
    );
  });
}

async function logIfSlop() {
  const matches = await checkSlopPage();
  if (matches) {
    console.log("Slopblock Zero: AI slop page detected.");
  }
}

function startLogLoop() {
  if (logIntervalId) return;
  logIfSlop();
  logIntervalId = window.setInterval(logIfSlop, LOG_INTERVAL_MS);
}

startLogLoop();
