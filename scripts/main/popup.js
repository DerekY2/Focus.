document.addEventListener("DOMContentLoaded", function() {
  var closeTabSwitch = document.getElementById('closeTabSwitch');
  var configBtn = document.getElementById("configBtn");

  // Retrieve the state of closeTabs from storage
  chrome.storage.sync.get("closeTabsEnabled", function(result) {
    var closeTabsEnabled = result.closeTabsEnabled || false;
    closeTabSwitch.checked = closeTabsEnabled;
  });

  // Add event listener to the switch
  closeTabSwitch.addEventListener("change", toggleCloseTabs);

  function toggleCloseTabs() {
    // Toggle the state of closeTabsEnabled
    var closeTabsEnabled = closeTabSwitch.checked;

    // Store the state of closeTabsEnabled in storage
    chrome.storage.sync.set({ closeTabsEnabled: closeTabsEnabled }, function() {
      console.log("closeTabsEnabled stored:", closeTabsEnabled);
    });

    // Send a message to the background script to toggle closeTabs
    chrome.runtime.sendMessage({ action: "toggleCloseTabs" }, function(response) {
      if (response && response.success) {
        console.log("Tabs closed");
      } else {
        console.log("Failed to close tabs");
      }
    });
  }

  // open configuration page
  if (configBtn) {
    configBtn.addEventListener("click", function() {
      chrome.runtime.sendMessage({ action: "openOptionsPage" });
    });
  }

  console.log('popup loaded');
});
