function closeCurrentTab() {
  if (chrome?.tabs?.getCurrent) {
    chrome.tabs.getCurrent((tab) => {
      if (tab?.id !== undefined) {
        chrome.tabs.remove(tab.id);
      } else {
        window.close();
      }
    });
    return;
  }

  window.close();
}

function navigateToUrl(targetUrl) {
  if (!targetUrl) return;
  if (chrome?.tabs?.getCurrent) {
    chrome.tabs.getCurrent((tab) => {
      if (tab?.id !== undefined) {
        chrome.runtime.sendMessage(
          { type: "ALLOW_CONTINUE", url: targetUrl, tabId: tab.id },
          () => {
            chrome.tabs.update(tab.id, { url: targetUrl });
          }
        );
      } else {
        window.location.href = targetUrl;
      }
    });
    return;
  }

  window.location.href = targetUrl;
}

function configureBackButton() {
  const backButton = document.getElementById("back-button");
  const proceedButton = document.getElementById("proceed-button");

  if (!backButton || !proceedButton) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const blockedUrl = params.get("blocked");
  const previousUrl = params.get("prev");
  const canNavigateBack = Boolean(previousUrl);

  backButton.textContent = canNavigateBack ? "<< Back" : "X Close";

  backButton.addEventListener("click", () => {
    if (canNavigateBack) {
      window.location.href = previousUrl;
    } else {
      closeCurrentTab();
    }
  });

  proceedButton.addEventListener("click", () => {
    if (blockedUrl) {
      console.log("Slopblock Zero: continue to", blockedUrl);
      navigateToUrl(blockedUrl);
    }
  });
}

document.addEventListener("DOMContentLoaded", configureBackButton);
