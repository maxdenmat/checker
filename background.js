chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

const baseUrls = [
  'https://analyze.modolabs.net/', 
  'https://analyse.eu.modolabs.net/'
];

// Helper function to check if the URL starts with any of the base URLs
function startsWithAny(url, baseUrls) {
  return baseUrls.some(base => url.startsWith(base + 'applications') || url.startsWith(base));
}

// When the user clicks on the extension action
chrome.action.onClicked.addListener(async (tab) => {
  if (startsWithAny(tab.url, baseUrls)) {
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
