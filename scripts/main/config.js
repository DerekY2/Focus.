
/*
document.addEventListener('DOMContentLoaded', () => {
  const addTabButton = document.getElementById('addTabButton');
  const tabForm = document.getElementById('tabForm');
  const websiteUrlInput = document.getElementById('websiteUrl');
  const websiteNameInput = document.getElementById('websiteName');
  const saveButton = document.getElementById('saveButton');
  const savedTabsContainer = document.getElementById('savedTabsContainer');

  let isEditing = false;

  addTabButton.addEventListener('click', () => {
    if (!isEditing) {
      tabForm.style.display = 'block';
      isEditing = true;
      websiteUrlInput.value = '';
      websiteNameInput.value = '';
    }
  });

  function saveTab(websiteUrl, websiteName) {
    return new Promise((resolve, reject) => {
      // Simulate saving the tab to the database
      setTimeout(() => {
        resolve();
      }, 500);
    });
  }

  function deleteTab(savedTab) {
    savedTabsContainer.removeChild(savedTab);
  }

  savedTabsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-button')) {
      const savedTab = event.target.closest('.saved-website');
      deleteTab(savedTab);
    }
  });

  saveButton.addEventListener('click', () => {
    const websiteUrl = websiteUrlInput.value;
    const websiteName = websiteNameInput.value;

    if (websiteUrl.trim() === '' || websiteName.trim() === '') {
      return;
    }

    const savedTab = document.createElement('div');
    savedTab.classList.add('saved-website');
    savedTab.innerText = websiteName;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.innerText = 'Delete';

    savedTab.appendChild(deleteButton);
    savedTabsContainer.appendChild(savedTab);

    websiteUrlInput.value = '';
    websiteNameInput.value = '';
    tabForm.style.display = 'none';
    isEditing = false;

    saveTab(websiteUrl, websiteName)
      .then(() => {
        alert('Tab saved successfully!');
      })
      .catch((error) => {
        console.error('Error saving tab:', error);
      });
  });
});

--------------------schedule---------------------
// Get the select elements
var tabSelect = document.getElementById("tabs");
var timeSelect = document.getElementById("time");

// Get the schedule body element
var scheduleBody = document.getElementById("schedule-body");

// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault();

  // Get the selected tab and time options
  var selectedTab = tabSelect.value;
  var selectedTime = timeSelect.value;

  // Create a new table row
  var newRow = document.createElement("tr");

  // Create tab cell
  var tabCell = document.createElement("td");
  tabCell.textContent = selectedTab;

  // Create time cell
  var timeCell = document.createElement("td");
  timeCell.textContent = selectedTime;

  // Create action cell
  var actionCell = document.createElement("td");
  var deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "delete-button";
  deleteButton.addEventListener("click", handleDelete);
  actionCell.appendChild(deleteButton);

  // Append cells to the new row
  newRow.appendChild(tabCell);
  newRow.appendChild(timeCell);
  newRow.appendChild(actionCell);

  // Append the new row to the schedule body
  scheduleBody.appendChild(newRow);
}

// Function to handle delete button click
function handleDelete(event) {
  var row = event.target.closest("tr");
  row.remove();
}

----------------------break-------------------

// Add event listener to the form submit button
var submitButton = document.querySelector(".submit-button");
submitButton.addEventListener("click", handleSubmit);

var startButton = document.getElementById("startTimer");
    var durationSelect = document.getElementById("duration");
    var scheduleButton = document.getElementById("scheduleBreak");
    var scheduleDurationSelect = document.getElementById("scheduleDuration");
    var timeToBreakElement = document.getElementById("timeToBreak");
    var breakCountdownElement = document.getElementById("breakCountdown");
    var breakTimeoutId;

    function showBreakNotification() {
      alert("Break time!");
    }

    function startBreakTimer(duration) {
      var durationInMillis = duration * 60 * 1000;

      breakTimeoutId = setTimeout(function() {
        showBreakNotification();
        startBreakCountdown();
      }, durationInMillis);

      startTimerCountdown(durationInMillis);
    }

    function startTimerCountdown(durationInMillis) {
      var intervalId = setInterval(function() {
        var remainingTime = durationInMillis - (Date.now() - startTime);
        var minutes = Math.floor(remainingTime / (1000 * 60));
        var seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
        timeToBreakElement.textContent = formatTime(minutes) + ":" + formatTime(seconds);
        
        if (remainingTime <= 0) {
          clearInterval(intervalId);
        }
      }, 1000);
    }

    function formatTime(time) {
      return time.toString().padStart(2, '0');
    }

    function startBreakCountdown() {
      var duration = parseInt(durationSelect.value);
      var durationInMillis = duration * 60 * 1000;
      var startTime = Date.now();

      var intervalId = setInterval(function() {
        var remainingTime = durationInMillis - (Date.now() - startTime);
        var minutes = Math.floor(remainingTime / (1000 * 60));
        var seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
        breakCountdownElement.textContent = formatTime(minutes) + ":" + formatTime(seconds);
        
        if (remainingTime <= 0) {
          clearInterval(intervalId);
        }
      }, 1000);
    }

    function scheduleBreak() {
      var scheduleDuration = parseInt(scheduleDurationSelect.value);
      var scheduleDurationInMillis = scheduleDuration * 60 * 60 * 1000;

      clearTimeout(breakTimeoutId);

      var remainingTime = scheduleDurationInMillis - (Date.now() - startTime);
      startBreakTimer(remainingTime);
    }

    startButton.addEventListener("click", function() {
      var duration = parseInt(durationSelect.value);
      startBreakTimer(duration);
    });

    scheduleButton.addEventListener("click", scheduleBreak);

    */