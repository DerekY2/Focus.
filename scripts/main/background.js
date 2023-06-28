/* Authors: Derek Yu, Hrishi Paripati
 *  background page: This is where all background processes are located. These run independently of the user's actions
 *
 *  closeTabs() function: 
 *    -Retrieves the closeEntries and openEntries arrays from Chrome storage.
 *    -Queries all tabs using chrome.tabs.query() function.
 *    -Check if the focus.html tab is already open.
 *    -Prepares an array of promises to close the matching tabs.
 *    -Closes the matching tabs using chrome.tabs.remove() function and creates a new tab for focus.html.
 *    -Open the URLs in the openEntries array.
 *
 *
 *  toggleFocus() function: 
 *    This function is called to toggle the state of the closeTabsEnabled variable. If closeTabsEnabled is true, it calls the closeTabs() function immediately to close existing tabs. If closeTabsEnabled is false, it closes all focus.html tabs if they are open.
 *
 *  handleUpdatedTab() function: 
 *    -Retrieves the closeEntries array from Chrome storage.
 *    -Checks if the updated tab URL matches any entry in the closeEntries array.
 *    -Closes the matching tab using chrome.tabs.remove() function and creates a new tab for focus.html if necessary.
 *  openOptionsPage() function: 
 *    This function is called to open the extension's configuration page.
 *
 *  chrome.runtime.onMessage.addListener() event listener: 
 *    Listens for messages from the popup or content script and performs the corresponding action. Currently, it supports two actions: "openOptionsPage" and "toggleFocus".
 *
 *  chrome.runtime.onInstalled.addListener() event listener: 
 *    Registers the handleUpdatedTab() function as a listener for the tab update event when the extension is first installed.
*/

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

// Toggle closeTabsEnabled to false when the user opens their browser
chrome.runtime.onStartup.addListener(function () {
    closeTabsEnabled = false;
    chrome.storage.local.set({closeTabsEnabled: closeTabsEnabled}, function(){
        //console.log("Startup: closeTabsEnabled: ", closeTabsEnabled);
    });
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

            // Prepare an array of promises to close the matching tabs
            var closePromises = [];
            tabs.forEach(function(tab) {
                var tabUrl = new URL(tab.url);
                //console.log("Querying...\n tabUrl: " + tabUrl + "\ntabUrl.hostname: " + tabUrl.hostname + ', ' + tab.id);
                // Check if the tab URL hostname is included in the closeEntries array and not in the openEntries array
                console.log(tabUrl.href);
                    if(openEntries.some(entry => tabUrl.href==entry.websiteUrl)){
                        console.log("Permission granted: " + tabUrl.href);
                    }
                else if (closeEntries.some(entry => tabUrl.hostname.includes(entry.websiteUrl))) {
                    
                    // Create a promise to close the tab
                    var closePromise = new Promise(function(resolve, reject) {
                        chrome.tabs.remove(tab.id, function() {
                            console.log("Tab closed: ", tab.id, ", ", tabUrl.hostname);
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

    chrome.storage.local.set({closeTabsEnabled: closeTabsEnabled}, function(){
        //console.log("closeTabsEnabled: ", closeTabsEnabled);
    });
}



function handleUpdatedTab(tabId, changeInfo, tab) {
    if (changeInfo.url) {
        //console.log('url updated: ' + changeInfo.url + ', id: ' + tabId);
        if (closeTabsEnabled) {
            // Check if the updated tab matches the URL entries
            var tabUrl = new URL(changeInfo.url);
            chrome.storage.sync.get(["closeEntries", "openEntries"], function(result) {
                var closeEntries = result.closeEntries || [];
                var openEntries = result.openEntries || [];
                console.log(tabUrl.href);
                if(openEntries.some(entry => tabUrl.href.includes(entry.websiteUrl))){
                    console.log("Permission granted: " + tabUrl.href);
                }
                else if ((closeEntries.some(entry => tabUrl.hostname.includes(entry.websiteUrl)))) {
                    var matchingEntry = closeEntries.find(entry => tabUrl.hostname.includes(entry.websiteUrl));
                    // Close the matching tab
                    chrome.tabs.remove(tabId, function() {
                        console.log("Tab closed:", tabId, ", ", tabUrl.hostname, " to ", matchingEntry.websiteUrl);
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
                }
              else {
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