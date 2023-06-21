document.addEventListener("DOMContentLoaded", function() {
  var closeTabSwitch = document.getElementById('closeTabSwitch');
  var configBtn = document.getElementById("configBtn");
  var scheduleBody = document.getElementById("scheduleBody");

  // Retrieve the state of closeTabs from storage
  chrome.storage.sync.get("closeTabsEnabled", function(result) {
      var closeTabsEnabled = result.closeTabsEnabled || false;
      closeTabSwitch.checked = closeTabsEnabled;
  });

  // Add event listener to the switch
  closeTabSwitch.addEventListener("change", toggleFocus);

  function toggleFocus() {
      // Toggle the state of closeTabsEnabled
      var closeTabsEnabled = closeTabSwitch.checked;

      // Store the state of closeTabsEnabled in storage
      chrome.storage.sync.set({
          closeTabsEnabled: closeTabsEnabled
      }, function() {
          //console.log("closeTabsEnabled stored:", closeTabsEnabled);
      });

      // Send a message to the background script to toggle closeTabs
      chrome.runtime.sendMessage({
          action: "toggleFocus"
      }, function(response) {
          if (response && response.success) {
              //console.log("Tabs closed");
          } else {
              //console.log("Failed to close tabs");
          }
      });
  }


  function displaySchedule(tasks) {
      // Clear the existing schedule
      scheduleBody.innerHTML = "";

      if (tasks && tasks.length > 0) {
          tasks.forEach(function(entry) {
              var newRow = document.createElement("tr");
              var taskCell = document.createElement("td");
              taskCell.textContent = entry.task;

              var timeCell = document.createElement("td");
              timeCell.textContent = entry.time;

              newRow.appendChild(taskCell);
              newRow.appendChild(timeCell);

              scheduleBody.appendChild(newRow);
          });
      } else {
          var newRow = document.createElement("tr");
          var emptyCell = document.createElement("td");
          emptyCell.colSpan = 2;
          emptyCell.textContent = "No tasks found.";

          newRow.appendChild(emptyCell);
          scheduleBody.appendChild(newRow);
      }
  }

  // Function to load the user's tasks from Chrome storage
  function loadTasks() {
      chrome.storage.sync.get("tasks", function(result) {
          var tasks = result.tasks;
          displaySchedule(tasks);
      });
  }

  loadTasks(); // Load user's tasks on popup open

  // open configuration page
  if (configBtn) {
      configBtn.addEventListener("click", function() {
          chrome.runtime.sendMessage({
              action: "openOptionsPage"
          });
      });
  }

  //console.log('popup loaded');
});