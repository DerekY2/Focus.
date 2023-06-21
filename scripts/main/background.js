// Set a variable to track the state of closeTabs
let closeTabsEnabled = false;
let blockPageTabId = null; // Variable to store the focus.html tab ID

// Listen for messages from the popup or content script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    switch (message.action) {
        case "openOptionsPage":
            openOptionsPage();
            break;
        case "toggleFocus":
            toggleFocus();
            break;
        default:
            break;
    }
});

// Register the tab update event listener when the extension is first installed
chrome.runtime.onInstalled.addListener(function() {
    chrome.tabs.onUpdated.addListener(handleUpdatedTab);
});

function closeTabs() {
    // Retrieve the closeEntries and openEntries arrays from storage
    chrome.storage.sync.get(["closeEntries", "openEntries"], function(result) {
        var closeEntries = result.closeEntries || [];
        var openEntries = result.openEntries || [];
        //console.log("background.js: closeTabs: Retrieved from storage:", closeEntries, openEntries);

        // Query all tabs
        chrome.tabs.query({}, function(tabs) {
            // Check if focus.html is already open
            for (let i = 0; i < tabs.length; i++) {
                if (tabs[i].url.includes("focus.html")) {
                    blockPageTabId = tabs[i].id;
                    break;
                }
            }

            /*
            // If focus.html tab is found, activate it
            if (blockPageTabId) {
              chrome.tabs.update(blockPageTabId, { active: true }, function (updatedTab) {
                //console.log("Block page tab already exists:", blockPageTabId);
              });
            } else {
              
            }
            */

            // Prepare an array of promises to close the matching tabs
            var closePromises = [];
            tabs.forEach(function(tab) {
                var tabUrl = new URL(tab.url);
                //console.log("Querying...\n tabUrl: " + tabUrl + "\ntabUrl.hostname: " + tabUrl.hostname + ', ' + tab.id);
                // Check if the tab URL hostname is included in the closeEntries array
                if (closeEntries.some(entry => tabUrl.hostname.includes(entry.websiteUrl))) {
                    // Create a promise to close the tab
                    var closePromise = new Promise(function(resolve, reject) {
                        chrome.tabs.remove(tab.id, function() {
                            //console.log("Tab closed:", tab.id);
                            // Create a new tab for focus.html
                            chrome.tabs.create({
                                url: chrome.runtime.getURL("../../html/config/focus.html")
                            }, function(newTab) {
                                blockPageTabId = newTab.id;
                                //console.log("Block page opened:", blockPageTabId);
                            });
                            resolve(); // Resolve the promise when the tab is closed
                        });
                    });
                    closePromises.push(closePromise);
                }
            });

            // Close the matching tabs using Promise.all
            Promise.all(closePromises).then(function() {
                // Open the URLs in the openEntries array
                openEntries.forEach(function(entry) {
                    // Check if the tab with the URL is already open
                    var foundTab = tabs.find(tab => tab.url === entry.websiteUrl);
                    if (foundTab) {
                        // Activate the existing tab
                        chrome.tabs.update(foundTab.id, {
                            active: true
                        }, function(updatedTab) {
                            //console.log("Existing tab activated:", foundTab.id);
                        });
                    } else {
                        // Create a new tab with the URL
                        chrome.tabs.create({
                            url: entry.websiteUrl
                        }, function(newTab) {
                            //console.log("New tab opened:", newTab.id);
                        });
                    }
                });
            });
        });
    });
    chrome.tabs.onUpdated.addListener(handleUpdatedTab);
}

function toggleFocus() {
    // Toggle the state of closeTabsEnabled
    closeTabsEnabled = !closeTabsEnabled;

    if (closeTabsEnabled) {
        // Call closeTabs immediately to close existing tabs
        closeTabs();

        //console.log("closeTabs enabled");
    } else {
        // Close all focus.html tabs if they are open
        chrome.tabs.query({}, function(tabs) {
            tabs.forEach(function(tab) {
                if (tab.url.includes("focus.html")) {
                    chrome.tabs.remove(tab.id, function() {
                        //console.log("Block page closed:", tab.id);
                    });
                }
            });
        });

        //console.log("closeTabs disabled");
    }
}



function handleUpdatedTab(tabId, changeInfo, tab) {
    if (changeInfo.url) {
        //console.log('url updated: ' + changeInfo.url + ', id: ' + tabId);
        if (closeTabsEnabled) {
            // Check if the updated tab matches the URL entries
            var tabUrl = new URL(changeInfo.url);
            chrome.storage.sync.get("closeEntries", function(result) {
                var closeEntries = result.closeEntries || [];
                if (closeEntries.some(entry => tabUrl.hostname.includes(entry.websiteUrl))) {
                    // Close the matching tab
                    chrome.tabs.remove(tabId, function() {
                        //console.log("Tab closed:", tabId);
                    });

                    // Check if focus.html tab is already open
                    chrome.tabs.query({
                        url: chrome.runtime.getURL("../../html/config/focus.html")
                    }, function(blockPageTabs) {
                        if (blockPageTabs.length > 0) {
                            // Activate the existing focus.html tab
                            chrome.tabs.update(blockPageTabs[0].id, {
                                active: true
                            }, function(updatedTab) {
                                //console.log("Block page tab already exists:", blockPageTabs[0].id);
                            });
                        } else {
                            // Create a new tab for focus.html
                            chrome.tabs.create({
                                url: chrome.runtime.getURL("../../html/config/focus.html")
                            }, function(newTab) {
                                //console.log("Block page opened:", newTab.id);
                            });
                        }
                    });
                } else {
                    //console.log("no matches found.");
                }
            });
        }
    }
}

// open configuration window
function openOptionsPage() {
    chrome.runtime.openOptionsPage();
}