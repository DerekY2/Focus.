// Set a variable to track the state of closeTabs
let closeTabsEnabled = false;
let blockPageTabId = null; // Variable to store the focus.html tab ID

// Listen for messages from the popup or content script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  switch (message.action) {
    case "openOptionsPage":
      openOptionsPage();
      break;
    case "toggleCloseTabs":
      toggleCloseTabs();
      break;
    default:
      break;
  }
});

function closeTabs() {
  // Retrieve the urlEntries and openEntries arrays from storage
  chrome.storage.sync.get(["urlEntries", "openEntries"], function(result) {
    var urlEntries = result.urlEntries || [];
    var openEntries = result.openEntries || [];
    console.log("background.js: closeTabs: Retrieved from storage:", urlEntries, openEntries);

    // Query all tabs
    chrome.tabs.query({}, function(tabs) {
      // Check if focus.html is already open
      for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].url.includes("focus.html")) {
          blockPageTabId = tabs[i].id;
          break;
        }
      }

      // If focus.html tab is found, activate it
      if (blockPageTabId) {
        chrome.tabs.update(blockPageTabId, { active: true }, function(updatedTab) {
          console.log("Block page tab already exists:", blockPageTabId);
        });
      } else {
        // Create a new tab for focus.html
        chrome.tabs.create({ url: chrome.runtime.getURL("../../html/config/focus.html") }, function(newTab) {
          blockPageTabId = newTab.id;
          console.log("Block page opened:", blockPageTabId);
        });
      }

      // Close the matching tabs
      tabs.forEach(function(tab) {
        var tabUrl = new URL(tab.url);
        console.log("Querying...\n tabUrl: " + tabUrl + "\ntabUrl.hostname: " + tabUrl.hostname + ', ' + tab.id);
        // Check if the tab URL hostname is included in the urlEntries array
        if (urlEntries.some(entry => tabUrl.hostname.includes(entry.websiteUrl))) {
          chrome.tabs.remove(tab.id, function() {
            console.log("Tab closed:", tab.id);
          });
        }
      });

      // Open the URLs in the openEntries array
      openEntries.forEach(function(entry) {
        // Check if the tab with the URL is already open
        var foundTab = tabs.find(tab => tab.url === entry.websiteUrl);
        if (foundTab) {
          // Activate the existing tab
          chrome.tabs.update(foundTab.id, { active: true }, function(updatedTab) {
            console.log("Existing tab activated:", foundTab.id);
          });
        } else {
          // Create a new tab with the URL
          chrome.tabs.create({ url: entry.websiteUrl }, function(newTab) {
            console.log("New tab opened:", newTab.id);
          });
        }
      });
    });
  });
}



function toggleCloseTabs() {
  // Toggle the state of closeTabsEnabled
  closeTabsEnabled = !closeTabsEnabled;

  if (closeTabsEnabled) {
    // Call closeTabs immediately to close existing tabs
    closeTabs();

    // Add event listener for tab updates
    chrome.tabs.onUpdated.addListener(handleUpdatedTab);

    console.log("closeTabs enabled");
  } else {
    // Remove the event listener for tab updates
    chrome.tabs.onUpdated.removeListener(handleUpdatedTab);

    // Close focus.html tab if it is open
    if (blockPageTabId) {
      chrome.tabs.remove(blockPageTabId, function() {
        console.log("Block page closed:", blockPageTabId);
        blockPageTabId = null;
      });
    }

    console.log("closeTabs disabled");
  }
}

function handleNewTab(tab) {
  console.log('url: ' + tab.url + ', id: ' + tab.id);
  if (closeTabsEnabled) {
    // Check if the newly opened tab matches the URL entries
    var tabUrl = new URL(tab.url);
    chrome.storage.sync.get("urlEntries", function(result) {
      var urlEntries = result.urlEntries || [];
      if (urlEntries.some(entry => tabUrl.hostname.includes(entry.websiteUrl))) {
        // Close the matching tab
        chrome.tabs.remove(tab.id, function() {
          console.log("Tab closed:", tab.id);
        });

        // Check if focus.html tab is already open
        chrome.tabs.query({ url: chrome.runtime.getURL("../../html/config/focus.html") }, function(blockPageTabs) {
          if (blockPageTabs.length > 0) {
            // Activate the existing focus.html tab
            chrome.tabs.update(blockPageTabs[0].id, { active: true }, function(updatedTab) {
              console.log("Block page tab already exists:", blockPageTabs[0].id);
            });
          } else {
            // Create a new tab for focus.html
            chrome.tabs.create({ url: chrome.runtime.getURL("../../html/config/focus.html") }, function(newTab) {
              console.log("Block page opened:", newTab.id);
            });
          }
        });
      } else {
        console.log("no matches found.");
      }
    });
  }
}

function handleUpdatedTab(tabId, changeInfo, tab) {
  if (changeInfo.url) {
    console.log('url updated: ' + changeInfo.url + ', id: ' + tabId);
    if (closeTabsEnabled) {
      // Check if the updated tab matches the URL entries
      var tabUrl = new URL(changeInfo.url);
      chrome.storage.sync.get("urlEntries", function(result) {
        var urlEntries = result.urlEntries || [];
        if (urlEntries.some(entry => tabUrl.hostname.includes(entry.websiteUrl))) {
          // Close the matching tab
          chrome.tabs.remove(tabId, function() {
            console.log("Tab closed:", tabId);
          });

          // Check if focus.html tab is already open
          chrome.tabs.query({ url: chrome.runtime.getURL("../../html/config/focus.html") }, function(blockPageTabs) {
            if (blockPageTabs.length > 0) {
              // Activate the existing focus.html tab
              chrome.tabs.update(blockPageTabs[0].id, { active: true }, function(updatedTab) {
                console.log("Block page tab already exists:", blockPageTabs[0].id);
              });
            } else {
              // Create a new tab for focus.html
              chrome.tabs.create({ url: chrome.runtime.getURL("../../html/config/focus.html") }, function(newTab) {
                console.log("Block page opened:", newTab.id);
              });
            }
          });
        } else {
          console.log("no matches found.");
        }
      });
    }
  }
}

function openOptionsPage() {
  chrome.runtime.openOptionsPage();
}
