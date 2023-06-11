document.addEventListener("DOMContentLoaded", function() {
  var closeTabButton = document.getElementById('closeTabButton');
  var configBtn = document.getElementById("configBtn");
  document.getElementById("closeTabButton").addEventListener("click", closeTabButtonClicked);

  function closeTabButtonClicked() {
    // Send a message to the background script to close the tabs
    chrome.runtime.sendMessage({ action: "closeTabs" }, function(response) {
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
