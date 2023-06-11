

// Listen for messages from the popup or content script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  switch (message.action) {
    case "openOptionsPage":
      openOptionsPage();
      break;
    case "closeTabs":
      closeTabs();
      break;
    default:
      break;
  }
});

function closeTabs(message, sender, sendResponse) {
  // Retrieve the urlEntries array from storage
  chrome.storage.sync.get("urlEntries", function(result) {
    var urlEntries = result.urlEntries || [];
    console.log("background.js: closeTabs: Retrieved from storage:", urlEntries);

    // Query all tabs
    chrome.tabs.query({}, function(tabs) {
      // Iterate through each tab
      tabs.forEach(function(tab) {
        var tabUrl = new URL(tab.url);
        console.log("Querying...\n tabUrl: " + tabUrl + "\ntabUrl.hostname: " + tabUrl.hostname + ', ' + tab.id);
        // Check if the tab URL hostname is included in the urlEntries array
        if (urlEntries.some(entry => tabUrl.hostname.includes(entry.websiteUrl))) {
          // remove matching tabs
          chrome.tabs.remove(tab.id, function() {
            console.log("Tab closed:", tab.id);
          });
        }
      });
    });
  });
}

function openOptionsPage() {
  chrome.runtime.openOptionsPage();
}

/*
function close(tabID) {
  // Close the tab
  chrome.tabs.remove(tabID, function() {
    console.log("Tab closed:", tabID);
  });
}



function update(){
  // Send a message to the content script to update the tab
  chrome.storage.local.set({tabID: tab.id}).then(() => {
    console.log('Captured tab: ' + tab.id + ', ' + tabUrl.hostname);
    // Delay the message sending by 500 milliseconds
    setTimeout(function() {
      // Send a message to the content script to update the tab
      chrome.tabs.sendMessage(tab.id, { action: "updateTab" }, function(response) {
        if (chrome.runtime.lastError) {
          console.log("Error sending message:", chrome.runtime.lastError.message);
        } else {
          console.log("updateTab request sent:", tab.id);
        }
      });
    }, 500);
  });
}
*/


