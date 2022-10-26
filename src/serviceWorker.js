chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['before.js'],
  });
});

// async function execScript() {
//   const tabId = await getTabId();
//   console.log({ tabId });
//   chrome.scripting.executeScript({
//     target: { tabId: tabId },
//     files: ['contentScript.js'],
//   });
// }

// async function getTabId() {
//   const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
//   return tabs.length > 0 ? tabs[0].id : null;
// }
