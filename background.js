chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

const analyzeApps = 'https://analyze.modolabs.net/applications';
const analyze  = 'https://analyze.modolabs.net/';

// When the user clicks on the extension action
chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith(analyzeApps) || tab.url.startsWith(analyze)) {
    // We retrieve the action badge to check if the extension is 'ON' or 'OFF'
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    // Next state will always be the opposite
    const nextState = prevState === 'ON' ? 'OFF' : 'ON';

    // Set the action badge to the next state
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });

    if (nextState === "ON") {
      // Run the script to turn select all checkboxes
      await chrome.scripting.executeScript({
        files: ["script_on.js"],
        target: { tabId: tab.id },
      });
    } else if (nextState === "OFF") {
      // Run the script to uncheck all checkboxes
      await chrome.scripting.executeScript({
        files: ["script_off.js"],
        target: { tabId: tab.id },
      });
    }
  }
});