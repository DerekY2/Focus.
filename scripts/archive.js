// deleteTab function:
    //const deleteName = savedTab.dataset.websiteUrl; // Get the website URL from the data attribute

    // Find the index of the entry with the specified websiteName
        //const deleteIndex = urlEntries.findIndex(entry => entry.websiteName === deleteName);
        //const deleteIndex = urlEntries.findIndex((entry) => entry.websiteName.toString() === deleteName.toString());

      /*
        function deleteTab(savedTab) {
            const deleteName = savedTab.innerText;
            console.log("Deleting tab:", deleteName);
        
            // Remove the entry from the urlEntries array
            const updatedEntries = urlEntries.filter(entry => entry.websiteName.toLowerCase() !== deleteName);
            console.log('updatedEntries: ', updatedEntries);
        
            // Save the updated array to Chrome storage
            chrome.storage.sync.set({ urlEntries: updatedEntries }, function() {
            console.log("Entry deleted:", deleteName);
            // Update the urlEntries variable with the updated entries
            urlEntries = updatedEntries;
            getTabs();
            });
        }
        */


// content.js (old)

// migrated to background.js
/* Listener for messages from popup.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "closeTab") {
    closeTab();
    sendResponse({ success: true });
  }
});

function closeTab() {
  // Retrieve the urlEntries array from storage
  chrome.storage.sync.get("urlEntries", function(result) {
    var urlEntries = result.urlEntries || [];
    console.log(urlEntries);
    // Get the current tab's URL
    var currentTabUrl = window.location.href;
    console.log(currentTalUrl);
    // Check if the current tab URL matches any entry in the urlEntries array
    var matchedEntry = urlEntries.find(function(entry) {
      return isSameHostname(currentTabUrl, entry.websiteUrl);
    });

    // Close the tab if a matching entry is found
    if (matchedEntry) {
      window.close();
    }
  });
}

function isSameHostname(url1, url2) {
  // Normalize URLs by removing "www" and converting to lowercase
  var hostname1 = normalizeHostname(url1);
  var hostname2 = normalizeHostname(url2);

  // Compare the normalized hostnames
  return hostname1 && hostname2 && hostname1 === hostname2;
}

function normalizeHostname(url) {
  try {
    // Remove "www" from the beginning of the hostname and convert to lowercase
    var hostname = new URL(url).hostname;
    return hostname.replace(/^www\./, "").toLowerCase();
  } catch (error) {
    console.error("Error normalizing hostname:", error);
    return null;
  }
}
*/