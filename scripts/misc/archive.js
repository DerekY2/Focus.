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


/****************************************config.js***********************************/


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

/**************************************************************************/
/****************************config.html*******************************/

/*
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Focus Settings</title>
  <link rel="stylesheet" href="../styles/config.css">
  <img src="img/icon128.png">
</head>
<body>
  <header>
    <h1>Focus Settings</h1>
    <nav>
      <ul>
        <li><a href="#websites-to-block-section">Websites to Block</a></li>
        <li><a href="#when-to-block-section">When to Block</a></li>
        <li><a href="#schedule-section">Schedule</a></li>
        <li><a href="#time-limit-section">Time Limit</a></li>
        <li><a href="#break-time-section">Break Time</a></li>
        <li><a href="#login-section">Login or Sign Up</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section id="websites-to-block-section">
      <h2>Websites to Block</h2>
      <p>Enter the URLs of the websites you want to block:</p>
      <form>
        <textarea id="websites-to-block" name="websites-to-block"></textarea>
      </form>
    </section>

    <section id="when-to-block-section">
      <h2>When to Block</h2>
      <p>When do you want to block these websites?</p>
      <form>
        <label>
          <input type="radio" name="when-to-block" value="always"> Always
        </label>
        <label>
          <input type="radio" name="when-to-block" value="on-a-schedule"> On a schedule
        </label>
        <label>
          <input type="radio" name="when-to-block" value="after-time-limit"> After a time limit
        </label>
      </form>
    </section>

    <section id="schedule-section">
      <h2>Schedule</h2>
      <p>What schedule do you want to set for blocking websites?</p>
      <form>
        <label>
          <input type="checkbox" name="monday" value="monday"> Monday
        </label>
        <label>
          <input type="checkbox" name="tuesday" value="tuesday"> Tuesday
        </label>
        <label>
          <input type="checkbox" name="wednesday" value="wednesday"> Wednesday
        </label>
        <label>
          <input type="checkbox" name="thursday" value="thursday"> Thursday
        </label>
        <label>
          <input type="checkbox" name="friday" value="friday"> Friday
        </label>
        <label>
          <input type="checkbox" name="saturday" value="saturday"> Saturday
        </label>
        <label>
          <input type="checkbox" name="sunday" value="sunday"> Sunday
        </label>
      </form>
    </section>

    <section id="time-limit-section">
      <h2>Time Limit</h2>
      <p>How long do you want to allow yourself to browse?</p>
      <form>
        <input type="number" id="time-limit" name="time

*/

/*****************************************************************/


/*************************index.js**********************************/

/*
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const port = 3000

const app = express();
app.use(cors({ origin: true} ));

var serviceAccount = require("../permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});   

const db = admin.firestore()

app.get('/read/:collection_name/:item_id', (req, res) =>{
  (async() => {
    try{
      const document = db.collection(req.params.collection_name).doc(req.params.item_id);
      let item = await document.get();
      let response = item.data();
      return res.status(200).send(response);
    }catch(error){
      //console.log(error);
      return res.status(500).send(error);
    }
  })();
});


app.get('/read/:collection_name', (req, res) => {
  (async() => {
    try{
      let query = db.collection(req.params.collection_name);
      let response = [];
      await query.get().then(querySnapshot => {
        let docs = querySnapshot.docs;
        for(let doc of docs){
          const selectedItem = {
            id: doc.id,
            item: doc.data()
          };
          response.push(selectedItem);
        }
      });
      return res.status(200).send(response);
    } catch(error){
      //console.log(error);
      return res.status(500).send(error);
    }
  })();
});
  

app.listen(port, () => {console.log("listening on port " + port)})
*/

/********************************************************************/
/***********************index.html**********************/

/*
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Focus</title>
  <link rel="stylesheet" href="../styles/config.css">
</head>
<body>
  <header>
    <h1 id="logo">Focus.</h1>
    <nav>
      <ul>
        <li><a href="home.html">Home</a></li>
        <li><a href="tabs.html">Tabs</a></li>
        <li><a href="schedule.html">Schedule</a></li>
        <li><a href="break time.html">Break Time</a></li>
        <li><a href="login.html">Login</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section>
      <h1>Welcome to focus</h1>
      <p>ready to get rid of stop procrastinating</p>
    </section>
  </main>
</body>
</html>

*/

/*************************************break time.js*****************************************/

/*

var startButton = document.getElementById("startTimer");
var durationSelect = document.getElementById("duration");
var scheduleButton = document.getElementById("scheduleBreak");
var scheduleDurationSelect = document.getElementById("scheduleDuration");
var timerTitleElement = document.getElementById("timerTitle");
var timerElement = document.getElementById("timer");
var timerIntervalId;
var startTime;
var isBreakScheduled = false;

function showBreakNotification() {
  alert("Break time!");
}

function startTimer(duration) {
  var durationInMillis = duration * 60 * 60 * 1000; // Convert hours to milliseconds
  startTime = Date.now() + durationInMillis;

  timerIntervalId = setInterval(function() {
    var remainingTime = startTime - Date.now();
    var hours = Math.floor(remainingTime / (1000 * 60 * 60));
    var minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
    timerElement.textContent = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds);
    
    if (remainingTime <= 0) {
      clearInterval(timerIntervalId);
      if (!isBreakScheduled) {
        showBreakNotification();
        startBreakTimer();
      } else {
        timerTitleElement.textContent = "Break in:";
        timerElement.textContent = "00:00:00";
      }
    }
  }, 1000);
}

function formatTime(time) {
  return time.toString().padStart(2, '0');
}

function startBreakTimer() {
  var duration = parseFloat(durationSelect.value); // Use parseFloat to handle decimal value for 1 minute
  timerTitleElement.textContent = "Break in:";
  startTime = Date.now() + (duration * 60 * 60 * 1000); // Convert hours to milliseconds
  startTimer(duration);
}

function scheduleBreak() {
  var scheduleDuration = parseFloat(scheduleDurationSelect.value); // Use parseFloat to handle decimal value for 1 minute
  clearInterval(timerIntervalId);
  isBreakScheduled = true;
  timerTitleElement.textContent = "Break in:";
  timerElement.textContent = "00:00:00";
  startTimer(scheduleDuration);
}

scheduleButton.addEventListener("click", scheduleBreak);
 */

/********************************************************************************/

/************************************break time.html**************************************/

/*
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Focus</title>
  <link rel="stylesheet" href="../../styles/config.css">
  <style>
    main {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    
    section {
      margin-bottom: 20px;
      background-color: #fff;
      padding: 20px;
      border-radius: 5px;
      text-align: center;
    }
    
    h1, h2 {
      font-size: 24px;
      margin-top: 0;
    }
    
    p {
      margin-bottom: 20px;
    }
    
    label {
      display: block;
      font-weight: bold;
      margin-bottom: 5px;
    }
    
    select {
      width: 100%;
      padding: 5px;
      border: 1px solid #ccc;
      border-radius: 3px;
      box-sizing: border-box;
      text-align: center;
    }
    
    button {
      font-family: cursive;
      padding: 10px 30px;
      background-color: lightblue;
      color: #fff;
      border: none;
      border-radius: 3px;
      cursor: pointer;
    }

    .timer-container {
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
    }

    .timer {
      width: 48%;
      padding: 20px;
      background-color: #f1f1f1;
      border-radius: 5px;
    }

    .timer h2 {
      font-size: 18px;
    }

    .timer p {
      font-size: 24px;
      margin: 10px 0;
    }
  </style>
</head>
<body>
  <header>
    <h1 id="logo">Focus.</h1>
    <nav>
      <ul>
        <li><a href="home.html">Home</a></li>
        <li><a href="tabs.html">Tabs</a></li>
        <li><a href="schedule.html">Schedule</a></li>
        <li><a href="break.html">Break Time</a></li>
        <li><a href="login.html">Login</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section>
      <h2>Schedule Break</h2>
      <div>
        <label for="scheduleDuration">Schedule break in:</label>
        <select id="scheduleDuration" name="scheduleDuration">
          <option value="1">1 hour</option>
          <option value="2">2 hours</option>
          <option value="3">3 hours</option>
          <option value="4">4 hours</option>
          <option value="5">5 hours</option>
          <option value="0.0167">1 minute</option> 
        </select>
      </div>
      <button id="scheduleBreak">Schedule Break</button>
    </section>

    <section>
      <h2>Break Timer</h2>
      <div>
        <label for="duration">Choose break duration:</label>
        <select id="duration" name="duration">
          <option value="5">5 minutes</option>
          <option value="10">10 minutes</option>
          <option value="15">15 minutes</option>
          <option value="20">20 minutes</option>
          <option value="25">25 minutes</option>
          <option value="30">30 minutes</option>
          <!-- Add more duration options as needed -->
        </select>
      </div>
      <button id="startTimer">Start Break</button>
    </section>
    <div class="timer-container">
      <div class="timer">
        <h2 id="timerTitle">Break in:</h2>
        <p id="timer">00:00</p>
      </div>
  </main>
  <script src="../../scripts/config/break.js"></script>
</body>
</html>

*/

/************************************************************/

/***********************blockPage.css***************************/

/*
 
  .c {
    text-align: center;
    display: block;
    position: relative;
    width: 80%;
    margin: 100px auto;
  }
  ._404 {
    font-size: 220px;
    position: relative;
    display: inline-block;
    z-index: 2;
    height: 250px;
    letter-spacing: 15px;
  }
  ._1 {
    text-align: center;
    display: block;
    position: relative;
    letter-spacing: 12px;
    font-size: 4em;
    line-height: 80%;
  }
  ._2 {
    text-align: center;
    display: block;
    position: relative;
    font-size: 20px;
  }
  .text {
    font-size: 70px;
    text-align: center;
    position: relative;
    display: inline-block;
    margin: 19px 0px 0px 0px;
    top: 256.301px; 
    z-index: 3;
    width: 100%;
    line-height: 1.2em;
    display: inline-block;
  }
  
 
  .right {
    float: right;
    width: 60%;
  }
*/
/***************************************************/

/***************************tabConfig.css**********************************/
/*
.circle-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #f1f1f1;
  color: #333;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
}

.rectangle-box {
  display: none;
  background-color: #f1f1f1;
  padding: 20px;
  margin-top: 20px;
}

.input-container {
  margin-bottom: 10px;
}

.input-container label {
  display: block;
  font-weight: bold;
}

.input-container input {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.save-button {
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 3px;
  }

.saved-website-container {
  display: flex;
  flex-wrap: wrap;
}

.saved-website {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #333;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  margin-right: 10px;
  margin-bottom: 10px;
}

.saved-website .remove-icon {
  position: absolute;
  top: -8px;
  right: -8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #ff0000;
  color: #fff;
  font-weight: bold;
  font-size: 12px;
  cursor: pointer;
}

#addCircleContainer {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 20px;
}

#addCircleButton {
  margin-right: 10px;
}
*/
/***********************************************************/

/***************************************chartBundle.js***********************************/
/*
! function(t) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
    else if ("function" == typeof define && define.amd) define([], t);
    else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).Chart = t()
    }
}(function() {
    return function() {
        return function t(e, i, n) {
            function a(o, s) {
                if (!i[o]) {
                    if (!e[o]) {
                        var l = "function" == typeof require && require;
                        if (!s && l) return l(o, !0);
                        if (r) return r(o, !0);
                        var h = new Error("Cannot find module '" + o + "'");
                        throw h.code = "MODULE_NOT_FOUND", h
                    }
                    var u = i[o] = {
                        exports: {}
                    };
                    e[o][0].call(u.exports, function(t) {
                        var i = e[o][1][t];
                        return a(i || t)
                    }, u, u.exports, t, e, i, n)
                }
                return i[o].exports
            }
            for (var r = "function" == typeof require && require, o = 0; o < n.length; o++) a(n[o]);
            return a
        }
    }()({
        1: [function(t, e, i) {
            var n = t(5);
            e.exports = {
                getRgba: a,
                getHsla: r,
                getRgb: function(t) {
                    var e = a(t);
                    return e && e.slice(0, 3)
                },
                getHsl: function(t) {
                    var e = r(t);
                    return e && e.slice(0, 3)
                },
                getHwb: o,
                getAlpha: function(t) {
                    var e = a(t);
                    if (e) return e[3];
                    if (e = r(t)) return e[3];
                    if (e = o(t)) return e[3]
                },
                hexString: function(t) {
                    return "#" + d(t[0]) + d(t[1]) + d(t[2])
                },
                rgbString: function(t, e) {
                    if (e < 1 || t[3] && t[3] < 1) return s(t, e);
                    return "rgb(" + t[0] + ", " + t[1] + ", " + t[2] + ")"
                },
                rgbaString: s,
                percentString: function(t, e) {
                    if (e < 1 || t[3] && t[3] < 1) return l(t, e);
                    var i = Math.round(t[0] / 255 * 100),
                        n = Math.round(t[1] / 255 * 100),
                        a = Math.round(t[2] / 255 * 100);
                    return "rgb(" + i + "%, " + n + "%, " + a + "%)"
                },
                percentaString: l,
                hslString: function(t, e) {
                    if (e < 1 || t[3] && t[3] < 1) return h(t, e);
                    return "hsl(" + t[0] + ", " + t[1] + "%, " + t[2] + "%)"
                },
                hslaString: h,
                hwbString: function(t, e) {
                    void 0 === e && (e = void 0 !== t[3] ? t[3] : 1);
                    return "hwb(" + t[0] + ", " + t[1] + "%, " + t[2] + "%" + (void 0 !== e && 1 !== e ? ", " + e : "") + ")"
                },
                keyword: function(t) {
                    return c[t.slice(0, 3)]
                }
            };

            function a(t) {
                if (t) {
                    var e = [0, 0, 0],
                        i = 1,
                        a = t.match(/^#([a-fA-F0-9]{3})$/i);
                    if (a) {
                        a = a[1];
                        for (var r = 0; r < e.length; r++) e[r] = parseInt(a[r] + a[r], 16)
                    } else if (a = t.match(/^#([a-fA-F0-9]{6})$/i)) {
                        a = a[1];
                        for (r = 0; r < e.length; r++) e[r] = parseInt(a.slice(2 * r, 2 * r + 2), 16)
                    } else if (a = t.match(/^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i)) {
                        for (r = 0; r < e.length; r++) e[r] = parseInt(a[r + 1]);
                        i = parseFloat(a[4])
                    } else if (a = t.match(/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i)) {
                        for (r = 0; r < e.length; r++) e[r] = Math.round(2.55 * parseFloat(a[r + 1]));
                        i = parseFloat(a[4])
                    } else if (a = t.match(/(\w+)/)) {
                        if ("transparent" == a[1]) return [0, 0, 0, 0];
                        if (!(e = n[a[1]])) return
                    }
                    for (r = 0; r < e.length; r++) e[r] = u(e[r], 0, 255);
                    return i = i || 0 == i ? u(i, 0, 1) : 1, e[3] = i, e
                }
            }

            function r(t) {
                if (t) {
                    var e = t.match(/^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/);
                    if (e) {
                        var i = parseFloat(e[4]);
                        return [u(parseInt(e[1]), 0, 360), u(parseFloat(e[2]), 0, 100), u(parseFloat(e[3]), 0, 100), u(isNaN(i) ? 1 : i, 0, 1)]
                    }
                }
            }

            function o(t) {
                if (t) {
                    var e = t.match(/^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/);
                    if (e) {
                        var i = parseFloat(e[4]);
                        return [u(parseInt(e[1]), 0, 360), u(parseFloat(e[2]), 0, 100), u(parseFloat(e[3]), 0, 100), u(isNaN(i) ? 1 : i, 0, 1)]
                    }
                }
            }

            function s(t, e) {
                return void 0 === e && (e = void 0 !== t[3] ? t[3] : 1), "rgba(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + e + ")"
            }

            function l(t, e) {
                return "rgba(" + Math.round(t[0] / 255 * 100) + "%, " + Math.round(t[1] / 255 * 100) + "%, " + Math.round(t[2] / 255 * 100) + "%, " + (e || t[3] || 1) + ")"
            }

            function h(t, e) {
                return void 0 === e && (e = void 0 !== t[3] ? t[3] : 1), "hsla(" + t[0] + ", " + t[1] + "%, " + t[2] + "%, " + e + ")"
            }

            function u(t, e, i) {
                return Math.min(Math.max(e, t), i)
            }

            function d(t) {
                var e = t.toString(16).toUpperCase();
                return e.length < 2 ? "0" + e : e
            }
            var c = {};
            for (var f in n) c[n[f]] = f
        }, {
            5: 5
        }],
        2: [function(t, e, i) {
            var n = t(4),
                a = t(1),
                r = function(t) {
                    if (t instanceof r) return t;
                    if (!(this instanceof r)) return new r(t);
                    this.valid = !1, this.values = {
                        rgb: [0, 0, 0],
                        hsl: [0, 0, 0],
                        hsv: [0, 0, 0],
                        hwb: [0, 0, 0],
                        cmyk: [0, 0, 0, 0],
                        alpha: 1
                    };
                    var e;
                    "string" == typeof t ? (e = a.getRgba(t)) ? this.setValues("rgb", e) : (e = a.getHsla(t)) ? this.setValues("hsl", e) : (e = a.getHwb(t)) && this.setValues("hwb", e) : "object" == typeof t && (void 0 !== (e = t).r || void 0 !== e.red ? this.setValues("rgb", e) : void 0 !== e.l || void 0 !== e.lightness ? this.setValues("hsl", e) : void 0 !== e.v || void 0 !== e.value ? this.setValues("hsv", e) : void 0 !== e.w || void 0 !== e.whiteness ? this.setValues("hwb", e) : void 0 === e.c && void 0 === e.cyan || this.setValues("cmyk", e))
                };
            r.prototype = {
                isValid: function() {
                    return this.valid
                },
                rgb: function() {
                    return this.setSpace("rgb", arguments)
                },
                hsl: function() {
                    return this.setSpace("hsl", arguments)
                },
                hsv: function() {
                    return this.setSpace("hsv", arguments)
                },
                hwb: function() {
                    return this.setSpace("hwb", arguments)
                },
                cmyk: function() {
                    return this.setSpace("cmyk", arguments)
                },
                rgbArray: function() {
                    return this.values.rgb
                },
                hslArray: function() {
                    return this.values.hsl
                },
                hsvArray: function() {
                    return this.values.hsv
                },
                hwbArray: function() {
                    var t = this.values;
                    return 1 !== t.alpha ? t.hwb.concat([t.alpha]) : t.hwb
                },
                cmykArray: function() {
                    return this.values.cmyk
                },
                rgbaArray: function() {
                    var t = this.values;
                    return t.rgb.concat([t.alpha])
                },
                hslaArray: function() {
                    var t = this.values;
                    return t.hsl.concat([t.alpha])
                },
                alpha: function(t) {
                    return void 0 === t ? this.values.alpha : (this.setValues("alpha", t), this)
                },
                red: function(t) {
                    return this.setChannel("rgb", 0, t)
                },
                green: function(t) {
                    return this.setChannel("rgb", 1, t)
                },
                blue: function(t) {
                    return this.setChannel("rgb", 2, t)
                },
                hue: function(t) {
                    return t && (t = (t %= 360) < 0 ? 360 + t : t), this.setChannel("hsl", 0, t)
                },
                saturation: function(t) {
                    return this.setChannel("hsl", 1, t)
                },
                lightness: function(t) {
                    return this.setChannel("hsl", 2, t)
                },
                saturationv: function(t) {
                    return this.setChannel("hsv", 1, t)
                },
                whiteness: function(t) {
                    return this.setChannel("hwb", 1, t)
                },
                blackness: function(t) {
                    return this.setChannel("hwb", 2, t)
                },
                value: function(t) {
                    return this.setChannel("hsv", 2, t)
                },
                cyan: function(t) {
                    return this.setChannel("cmyk", 0, t)
                },
                magenta: function(t) {
                    return this.setChannel("cmyk", 1, t)
                },
                yellow: function(t) {
                    return this.setChannel("cmyk", 2, t)
                },
                black: function(t) {
                    return this.setChannel("cmyk", 3, t)
                },
                hexString: function() {
                    return a.hexString(this.values.rgb)
                },
                rgbString: function() {
                    return a.rgbString(this.values.rgb, this.values.alpha)
                },
                rgbaString: function() {
                    return a.rgbaString(this.values.rgb, this.values.alpha)
                },
                percentString: function() {
                    return a.percentString(this.values.rgb, this.values.alpha)
                },
                hslString: function() {
                    return a.hslString(this.values.hsl, this.values.alpha)
                },
                hslaString: function() {
                    return a.hslaString(this.values.hsl, this.values.alpha)
                },
                hwbString: function() {
                    return a.hwbString(this.values.hwb, this.values.alpha)
                },
                keyword: function() {
                    return a.keyword(this.values.rgb, this.values.alpha)
                },
                rgbNumber: function() {
                    var t = this.values.rgb;
                    return t[0] << 16 | t[1] << 8 | t[2]
                },
                luminosity: function() {
                    for (var t = this.values.rgb, e = [], i = 0; i < t.length; i++) {
                        var n = t[i] / 255;
                        e[i] = n <= .03928 ? n / 12.92 : Math.pow((n + .055) / 1.055, 2.4)
                    }
                    return .2126 * e[0] + .7152 * e[1] + .0722 * e[2]
                },
                contrast: function(t) {
                    var e = this.luminosity(),
                        i = t.luminosity();
                    return e > i ? (e + .05) / (i + .05) : (i + .05) / (e + .05)
                },
                level: function(t) {
                    var e = this.contrast(t);
                    return e >= 7.1 ? "AAA" : e >= 4.5 ? "AA" : ""
                },
                dark: function() {
                    var t = this.values.rgb;
                    return (299 * t[0] + 587 * t[1] + 114 * t[2]) / 1e3 < 128
                },
                light: function() {
                    return !this.dark()
                },
                negate: function() {
                    for (var t = [], e = 0; e < 3; e++) t[e] = 255 - this.values.rgb[e];
                    return this.setValues("rgb", t), this
                },
                lighten: function(t) {
                    var e = this.values.hsl;
                    return e[2] += e[2] * t, this.setValues("hsl", e), this
                },
                darken: function(t) {
                    var e = this.values.hsl;
                    return e[2] -= e[2] * t, this.setValues("hsl", e), this
                },
                saturate: function(t) {
                    var e = this.values.hsl;
                    return e[1] += e[1] * t, this.setValues("hsl", e), this
                },
                desaturate: function(t) {
                    var e = this.values.hsl;
                    return e[1] -= e[1] * t, this.setValues("hsl", e), this
                },
                whiten: function(t) {
                    var e = this.values.hwb;
                    return e[1] += e[1] * t, this.setValues("hwb", e), this
                },
                blacken: function(t) {
                    var e = this.values.hwb;
                    return e[2] += e[2] * t, this.setValues("hwb", e), this
                },
                greyscale: function() {
                    var t = this.values.rgb,
                        e = .3 * t[0] + .59 * t[1] + .11 * t[2];
                    return this.setValues("rgb", [e, e, e]), this
                },
                clearer: function(t) {
                    var e = this.values.alpha;
                    return this.setValues("alpha", e - e * t), this
                },
                opaquer: function(t) {
                    var e = this.values.alpha;
                    return this.setValues("alpha", e + e * t), this
                },
                rotate: function(t) {
                    var e = this.values.hsl,
                        i = (e[0] + t) % 360;
                    return e[0] = i < 0 ? 360 + i : i, this.setValues("hsl", e), this
                },
                mix: function(t, e) {
                    var i = t,
                        n = void 0 === e ? .5 : e,
                        a = 2 * n - 1,
                        r = this.alpha() - i.alpha(),
                        o = ((a * r == -1 ? a : (a + r) / (1 + a * r)) + 1) / 2,
                        s = 1 - o;
                    return this.rgb(o * this.red() + s * i.red(), o * this.green() + s * i.green(), o * this.blue() + s * i.blue()).alpha(this.alpha() * n + i.alpha() * (1 - n))
                },
                toJSON: function() {
                    return this.rgb()
                },
                clone: function() {
                    var t, e, i = new r,
                        n = this.values,
                        a = i.values;
                    for (var o in n) n.hasOwnProperty(o) && (t = n[o], "[object Array]" === (e = {}.toString.call(t)) ? a[o] = t.slice(0) : "[object Number]" === e ? a[o] = t : console.error("unexpected color value:", t));
                    return i
                }
            }, r.prototype.spaces = {
                rgb: ["red", "green", "blue"],
                hsl: ["hue", "saturation", "lightness"],
                hsv: ["hue", "saturation", "value"],
                hwb: ["hue", "whiteness", "blackness"],
                cmyk: ["cyan", "magenta", "yellow", "black"]
            }, r.prototype.maxes = {
                rgb: [255, 255, 255],
                hsl: [360, 100, 100],
                hsv: [360, 100, 100],
                hwb: [360, 100, 100],
                cmyk: [100, 100, 100, 100]
            }, r.prototype.getValues = function(t) {
                for (var e = this.values, i = {}, n = 0; n < t.length; n++) i[t.charAt(n)] = e[t][n];
                return 1 !== e.alpha && (i.a = e.alpha), i
            }, r.prototype.setValues = function(t, e) {
                var i, a = this.values,
                    r = this.spaces,
                    o = this.maxes,
                    s = 1;
                if (this.valid = !0, "alpha" === t) s = e;
                else if (e.length) a[t] = e.slice(0, t.length), s = e[t.length];
                else if (void 0 !== e[t.charAt(0)]) {
                    for (i = 0; i < t.length; i++) a[t][i] = e[t.charAt(i)];
                    s = e.a
                } else if (void 0 !== e[r[t][0]]) {
                    var l = r[t];
                    for (i = 0; i < t.length; i++) a[t][i] = e[l[i]];
                    s = e.alpha
                }
                if (a.alpha = Math.max(0, Math.min(1, void 0 === s ? a.alpha : s)), "alpha" === t) return !1;
                var h;
                for (i = 0; i < t.length; i++) h = Math.max(0, Math.min(o[t][i], a[t][i])), a[t][i] = Math.round(h);
                for (var u in r) u !== t && (a[u] = n[t][u](a[t]));
                return !0
            }, r.prototype.setSpace = function(t, e) {
                var i = e[0];
                return void 0 === i ? this.getValues(t) : ("number" == typeof i && (i = Array.prototype.slice.call(e)), this.setValues(t, i), this)
            }, r.prototype.setChannel = function(t, e, i) {
                var n = this.values[t];
                return void 0 === i ? n[e] : i === n[e] ? this : (n[e] = i, this.setValues(t, n), this)
            }, "undefined" != typeof window && (window.Color = r), e.exports = r
        }, {
            1: 1,
            4: 4
        }],
        3: [function(t, e, i) {
            e.exports = {
                rgb2hsl: n,
                rgb2hsv: a,
                rgb2hwb: o,
                rgb2cmyk: s,
                rgb2keyword: l,
                rgb2xyz: h,
                rgb2lab: u,
                rgb2lch: function(t) {
                    return x(u(t))
                },
                hsl2rgb: d,
                hsl2hsv: function(t) {
                    var e = t[0],
                        i = t[1] / 100,
                        n = t[2] / 100;
                    if (0 === n) return [0, 0, 0];
                    return [e, 100 * (2 * (i *= (n *= 2) <= 1 ? n : 2 - n) / (n + i)), 100 * ((n + i) / 2)]
                },
                hsl2hwb: function(t) {
                    return o(d(t))
                },
                hsl2cmyk: function(t) {
                    return s(d(t))
                },
                hsl2keyword: function(t) {
                    return l(d(t))
                },
                hsv2rgb: c,
                hsv2hsl: function(t) {
                    var e, i, n = t[0],
                        a = t[1] / 100,
                        r = t[2] / 100;
                    return e = a * r, [n, 100 * (e = (e /= (i = (2 - a) * r) <= 1 ? i : 2 - i) || 0), 100 * (i /= 2)]
                },
                hsv2hwb: function(t) {
                    return o(c(t))
                },
                hsv2cmyk: function(t) {
                    return s(c(t))
                },
                hsv2keyword: function(t) {
                    return l(c(t))
                },
                hwb2rgb: f,
                hwb2hsl: function(t) {
                    return n(f(t))
                },
                hwb2hsv: function(t) {
                    return a(f(t))
                },
                hwb2cmyk: function(t) {
                    return s(f(t))
                },
                hwb2keyword: function(t) {
                    return l(f(t))
                },
                cmyk2rgb: m,
                cmyk2hsl: function(t) {
                    return n(m(t))
                },
                cmyk2hsv: function(t) {
                    return a(m(t))
                },
                cmyk2hwb: function(t) {
                    return o(m(t))
                },
                cmyk2keyword: function(t) {
                    return l(m(t))
                },
                keyword2rgb: w,
                keyword2hsl: function(t) {
                    return n(w(t))
                },
                keyword2hsv: function(t) {
                    return a(w(t))
                },
                keyword2hwb: function(t) {
                    return o(w(t))
                },
                keyword2cmyk: function(t) {
                    return s(w(t))
                },
                keyword2lab: function(t) {
                    return u(w(t))
                },
                keyword2xyz: function(t) {
                    return h(w(t))
                },
                xyz2rgb: p,
                xyz2lab: v,
                xyz2lch: function(t) {
                    return x(v(t))
                },
                lab2xyz: y,
                lab2rgb: _,
                lab2lch: x,
                lch2lab: k,
                lch2xyz: function(t) {
                    return y(k(t))
                },
                lch2rgb: function(t) {
                    return _(k(t))
                }
            };

            function n(t) {
                var e, i, n = t[0] / 255,
                    a = t[1] / 255,
                    r = t[2] / 255,
                    o = Math.min(n, a, r),
                    s = Math.max(n, a, r),
                    l = s - o;
                return s == o ? e = 0 : n == s ? e = (a - r) / l : a == s ? e = 2 + (r - n) / l : r == s && (e = 4 + (n - a) / l), (e = Math.min(60 * e, 360)) < 0 && (e += 360), i = (o + s) / 2, [e, 100 * (s == o ? 0 : i <= .5 ? l / (s + o) : l / (2 - s - o)), 100 * i]
            }

            function a(t) {
                var e, i, n = t[0],
                    a = t[1],
                    r = t[2],
                    o = Math.min(n, a, r),
                    s = Math.max(n, a, r),
                    l = s - o;
                return i = 0 == s ? 0 : l / s * 1e3 / 10, s == o ? e = 0 : n == s ? e = (a - r) / l : a == s ? e = 2 + (r - n) / l : r == s && (e = 4 + (n - a) / l), (e = Math.min(60 * e, 360)) < 0 && (e += 360), [e, i, s / 255 * 1e3 / 10]
            }

            function o(t) {
                var e = t[0],
                    i = t[1],
                    a = t[2];
                return [n(t)[0], 100 * (1 / 255 * Math.min(e, Math.min(i, a))), 100 * (a = 1 - 1 / 255 * Math.max(e, Math.max(i, a)))]
            }

            function s(t) {
                var e, i = t[0] / 255,
                    n = t[1] / 255,
                    a = t[2] / 255;
                return [100 * ((1 - i - (e = Math.min(1 - i, 1 - n, 1 - a))) / (1 - e) || 0), 100 * ((1 - n - e) / (1 - e) || 0), 100 * ((1 - a - e) / (1 - e) || 0), 100 * e]
            }

            function l(t) {
                return S[JSON.stringify(t)]
            }

            function h(t) {
                var e = t[0] / 255,
                    i = t[1] / 255,
                    n = t[2] / 255;
                return [100 * (.4124 * (e = e > .04045 ? Math.pow((e + .055) / 1.055, 2.4) : e / 12.92) + .3576 * (i = i > .04045 ? Math.pow((i + .055) / 1.055, 2.4) : i / 12.92) + .1805 * (n = n > .04045 ? Math.pow((n + .055) / 1.055, 2.4) : n / 12.92)), 100 * (.2126 * e + .7152 * i + .0722 * n), 100 * (.0193 * e + .1192 * i + .9505 * n)]
            }

            function u(t) {
                var e = h(t),
                    i = e[0],
                    n = e[1],
                    a = e[2];
                return n /= 100, a /= 108.883, i = (i /= 95.047) > .008856 ? Math.pow(i, 1 / 3) : 7.787 * i + 16 / 116, [116 * (n = n > .008856 ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116) - 16, 500 * (i - n), 200 * (n - (a = a > .008856 ? Math.pow(a, 1 / 3) : 7.787 * a + 16 / 116))]
            }

            function d(t) {
                var e, i, n, a, r, o = t[0] / 360,
                    s = t[1] / 100,
                    l = t[2] / 100;
                if (0 == s) return [r = 255 * l, r, r];
                e = 2 * l - (i = l < .5 ? l * (1 + s) : l + s - l * s), a = [0, 0, 0];
                for (var h = 0; h < 3; h++)(n = o + 1 / 3 * -(h - 1)) < 0 && n++, n > 1 && n--, r = 6 * n < 1 ? e + 6 * (i - e) * n : 2 * n < 1 ? i : 3 * n < 2 ? e + (i - e) * (2 / 3 - n) * 6 : e, a[h] = 255 * r;
                return a
            }

            function c(t) {
                var e = t[0] / 60,
                    i = t[1] / 100,
                    n = t[2] / 100,
                    a = Math.floor(e) % 6,
                    r = e - Math.floor(e),
                    o = 255 * n * (1 - i),
                    s = 255 * n * (1 - i * r),
                    l = 255 * n * (1 - i * (1 - r));
                n *= 255;
                switch (a) {
                    case 0:
                        return [n, l, o];
                    case 1:
                        return [s, n, o];
                    case 2:
                        return [o, n, l];
                    case 3:
                        return [o, s, n];
                    case 4:
                        return [l, o, n];
                    case 5:
                        return [n, o, s]
                }
            }

            function f(t) {
                var e, i, n, a, o = t[0] / 360,
                    s = t[1] / 100,
                    l = t[2] / 100,
                    h = s + l;
                switch (h > 1 && (s /= h, l /= h), i = 1 - l, n = 6 * o - (e = Math.floor(6 * o)), 0 != (1 & e) && (n = 1 - n), a = s + n * (i - s), e) {
                    default:
                    case 6:
                    case 0:
                        r = i, g = a, b = s;
                        break;
                    case 1:
                        r = a, g = i, b = s;
                        break;
                    case 2:
                        r = s, g = i, b = a;
                        break;
                    case 3:
                        r = s, g = a, b = i;
                        break;
                    case 4:
                        r = a, g = s, b = i;
                        break;
                    case 5:
                        r = i, g = s, b = a
                }
                return [255 * r, 255 * g, 255 * b]
            }

            function m(t) {
                var e = t[0] / 100,
                    i = t[1] / 100,
                    n = t[2] / 100,
                    a = t[3] / 100;
                return [255 * (1 - Math.min(1, e * (1 - a) + a)), 255 * (1 - Math.min(1, i * (1 - a) + a)), 255 * (1 - Math.min(1, n * (1 - a) + a))]
            }

            function p(t) {
                var e, i, n, a = t[0] / 100,
                    r = t[1] / 100,
                    o = t[2] / 100;
                return i = -.9689 * a + 1.8758 * r + .0415 * o, n = .0557 * a + -.204 * r + 1.057 * o, e = (e = 3.2406 * a + -1.5372 * r + -.4986 * o) > .0031308 ? 1.055 * Math.pow(e, 1 / 2.4) - .055 : e *= 12.92, i = i > .0031308 ? 1.055 * Math.pow(i, 1 / 2.4) - .055 : i *= 12.92, n = n > .0031308 ? 1.055 * Math.pow(n, 1 / 2.4) - .055 : n *= 12.92, [255 * (e = Math.min(Math.max(0, e), 1)), 255 * (i = Math.min(Math.max(0, i), 1)), 255 * (n = Math.min(Math.max(0, n), 1))]
            }

            function v(t) {
                var e = t[0],
                    i = t[1],
                    n = t[2];
                return i /= 100, n /= 108.883, e = (e /= 95.047) > .008856 ? Math.pow(e, 1 / 3) : 7.787 * e + 16 / 116, [116 * (i = i > .008856 ? Math.pow(i, 1 / 3) : 7.787 * i + 16 / 116) - 16, 500 * (e - i), 200 * (i - (n = n > .008856 ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116))]
            }

            function y(t) {
                var e, i, n, a, r = t[0],
                    o = t[1],
                    s = t[2];
                return r <= 8 ? a = (i = 100 * r / 903.3) / 100 * 7.787 + 16 / 116 : (i = 100 * Math.pow((r + 16) / 116, 3), a = Math.pow(i / 100, 1 / 3)), [e = e / 95.047 <= .008856 ? e = 95.047 * (o / 500 + a - 16 / 116) / 7.787 : 95.047 * Math.pow(o / 500 + a, 3), i, n = n / 108.883 <= .008859 ? n = 108.883 * (a - s / 200 - 16 / 116) / 7.787 : 108.883 * Math.pow(a - s / 200, 3)]
            }

            function x(t) {
                var e, i = t[0],
                    n = t[1],
                    a = t[2];
                return (e = 360 * Math.atan2(a, n) / 2 / Math.PI) < 0 && (e += 360), [i, Math.sqrt(n * n + a * a), e]
            }

            function _(t) {
                return p(y(t))
            }

            function k(t) {
                var e, i = t[0],
                    n = t[1];
                return e = t[2] / 360 * 2 * Math.PI, [i, n * Math.cos(e), n * Math.sin(e)]
            }

            function w(t) {
                return M[t]
            }
            var M = {
                    aliceblue: [240, 248, 255],
                    antiquewhite: [250, 235, 215],
                    aqua: [0, 255, 255],
                    aquamarine: [127, 255, 212],
                    azure: [240, 255, 255],
                    beige: [245, 245, 220],
                    bisque: [255, 228, 196],
                    black: [0, 0, 0],
                    blanchedalmond: [255, 235, 205],
                    blue: [0, 0, 255],
                    blueviolet: [138, 43, 226],
                    brown: [165, 42, 42],
                    burlywood: [222, 184, 135],
                    cadetblue: [95, 158, 160],
                    chartreuse: [127, 255, 0],
                    chocolate: [210, 105, 30],
                    coral: [255, 127, 80],
                    cornflowerblue: [100, 149, 237],
                    cornsilk: [255, 248, 220],
                    crimson: [220, 20, 60],
                    cyan: [0, 255, 255],
                    darkblue: [0, 0, 139],
                    darkcyan: [0, 139, 139],
                    darkgoldenrod: [184, 134, 11],
                    darkgray: [169, 169, 169],
                    darkgreen: [0, 100, 0],
                    darkgrey: [169, 169, 169],
                    darkkhaki: [189, 183, 107],
                    darkmagenta: [139, 0, 139],
                    darkolivegreen: [85, 107, 47],
                    darkorange: [255, 140, 0],
                    darkorchid: [153, 50, 204],
                    darkred: [139, 0, 0],
                    darksalmon: [233, 150, 122],
                    darkseagreen: [143, 188, 143],
                    darkslateblue: [72, 61, 139],
                    darkslategray: [47, 79, 79],
                    darkslategrey: [47, 79, 79],
                    darkturquoise: [0, 206, 209],
                    darkviolet: [148, 0, 211],
                    deeppink: [255, 20, 147],
                    deepskyblue: [0, 191, 255],
                    dimgray: [105, 105, 105],
                    dimgrey: [105, 105, 105],
                    dodgerblue: [30, 144, 255],
                    firebrick: [178, 34, 34],
                    floralwhite: [255, 250, 240],
                    forestgreen: [34, 139, 34],
                    fuchsia: [255, 0, 255],
                    gainsboro: [220, 220, 220],
                    ghostwhite: [248, 248, 255],
                    gold: [255, 215, 0],
                    goldenrod: [218, 165, 32],
                    gray: [128, 128, 128],
                    green: [0, 128, 0],
                    greenyellow: [173, 255, 47],
                    grey: [128, 128, 128],
                    honeydew: [240, 255, 240],
                    hotpink: [255, 105, 180],
                    indianred: [205, 92, 92],
                    indigo: [75, 0, 130],
                    ivory: [255, 255, 240],
                    khaki: [240, 230, 140],
                    lavender: [230, 230, 250],
                    lavenderblush: [255, 240, 245],
                    lawngreen: [124, 252, 0],
                    lemonchiffon: [255, 250, 205],
                    lightblue: [173, 216, 230],
                    lightcoral: [240, 128, 128],
                    lightcyan: [224, 255, 255],
                    lightgoldenrodyellow: [250, 250, 210],
                    lightgray: [211, 211, 211],
                    lightgreen: [144, 238, 144],
                    lightgrey: [211, 211, 211],
                    lightpink: [255, 182, 193],
                    lightsalmon: [255, 160, 122],
                    lightseagreen: [32, 178, 170],
                    lightskyblue: [135, 206, 250],
                    lightslategray: [119, 136, 153],
                    lightslategrey: [119, 136, 153],
                    lightsteelblue: [176, 196, 222],
                    lightyellow: [255, 255, 224],
                    lime: [0, 255, 0],
                    limegreen: [50, 205, 50],
                    linen: [250, 240, 230],
                    magenta: [255, 0, 255],
                    maroon: [128, 0, 0],
                    mediumaquamarine: [102, 205, 170],
                    mediumblue: [0, 0, 205],
                    mediumorchid: [186, 85, 211],
                    mediumpurple: [147, 112, 219],
                    mediumseagreen: [60, 179, 113],
                    mediumslateblue: [123, 104, 238],
                    mediumspringgreen: [0, 250, 154],
                    mediumturquoise: [72, 209, 204],
                    mediumvioletred: [199, 21, 133],
                    midnightblue: [25, 25, 112],
                    mintcream: [245, 255, 250],
                    mistyrose: [255, 228, 225],
                    moccasin: [255, 228, 181],
                    navajowhite: [255, 222, 173],
                    navy: [0, 0, 128],
                    oldlace: [253, 245, 230],
                    olive: [128, 128, 0],
                    olivedrab: [107, 142, 35],
                    orange: [255, 165, 0],
                    orangered: [255, 69, 0],
                    orchid: [218, 112, 214],
                    palegoldenrod: [238, 232, 170],
                    palegreen: [152, 251, 152],
                    paleturquoise: [175, 238, 238],
                    palevioletred: [219, 112, 147],
                    papayawhip: [255, 239, 213],
                    peachpuff: [255, 218, 185],
                    peru: [205, 133, 63],
                    pink: [255, 192, 203],
                    plum: [221, 160, 221],
                    powderblue: [176, 224, 230],
                    purple: [128, 0, 128],
                    rebeccapurple: [102, 51, 153],
                    red: [255, 0, 0],
                    rosybrown: [188, 143, 143],
                    royalblue: [65, 105, 225],
                    saddlebrown: [139, 69, 19],
                    salmon: [250, 128, 114],
                    sandybrown: [244, 164, 96],
                    seagreen: [46, 139, 87],
                    seashell: [255, 245, 238],
                    sienna: [160, 82, 45],
                    silver: [192, 192, 192],
                    skyblue: [135, 206, 235],
                    slateblue: [106, 90, 205],
                    slategray: [112, 128, 144],
                    slategrey: [112, 128, 144],
                    snow: [255, 250, 250],
                    springgreen: [0, 255, 127],
                    steelblue: [70, 130, 180],
                    tan: [210, 180, 140],
                    teal: [0, 128, 128],
                    thistle: [216, 191, 216],
                    tomato: [255, 99, 71],
                    turquoise: [64, 224, 208],
                    violet: [238, 130, 238],
                    wheat: [245, 222, 179],
                    white: [255, 255, 255],
                    whitesmoke: [245, 245, 245],
                    yellow: [255, 255, 0],
                    yellowgreen: [154, 205, 50]
                },
                S = {};
            for (var D in M) S[JSON.stringify(M[D])] = D
        }, {}],
        4: [function(t, e, i) {
            var n = t(3),
                a = function() {
                    return new h
                };
            for (var r in n) {
                a[r + "Raw"] = function(t) {
                    return function(e) {
                        return "number" == typeof e && (e = Array.prototype.slice.call(arguments)), n[t](e)
                    }
                }(r);
                var o = /(\w+)2(\w+)/.exec(r),
                    s = o[1],
                    l = o[2];
                (a[s] = a[s] || {})[l] = a[r] = function(t) {
                    return function(e) {
                        "number" == typeof e && (e = Array.prototype.slice.call(arguments));
                        var i = n[t](e);
                        if ("string" == typeof i || void 0 === i) return i;
                        for (var a = 0; a < i.length; a++) i[a] = Math.round(i[a]);
                        return i
                    }
                }(r)
            }
            var h = function() {
                this.convs = {}
            };
            h.prototype.routeSpace = function(t, e) {
                var i = e[0];
                return void 0 === i ? this.getValues(t) : ("number" == typeof i && (i = Array.prototype.slice.call(e)), this.setValues(t, i))
            }, h.prototype.setValues = function(t, e) {
                return this.space = t, this.convs = {}, this.convs[t] = e, this
            }, h.prototype.getValues = function(t) {
                var e = this.convs[t];
                if (!e) {
                    var i = this.space,
                        n = this.convs[i];
                    e = a[i][t](n), this.convs[t] = e
                }
                return e
            }, ["rgb", "hsl", "hsv", "cmyk", "keyword"].forEach(function(t) {
                h.prototype[t] = function(e) {
                    return this.routeSpace(t, arguments)
                }
            }), e.exports = a
        }, {
            3: 3
        }],
        5: [function(t, e, i) {
            "use strict";
            e.exports = {
                aliceblue: [240, 248, 255],
                antiquewhite: [250, 235, 215],
                aqua: [0, 255, 255],
                aquamarine: [127, 255, 212],
                azure: [240, 255, 255],
                beige: [245, 245, 220],
                bisque: [255, 228, 196],
                black: [0, 0, 0],
                blanchedalmond: [255, 235, 205],
                blue: [0, 0, 255],
                blueviolet: [138, 43, 226],
                brown: [165, 42, 42],
                burlywood: [222, 184, 135],
                cadetblue: [95, 158, 160],
                chartreuse: [127, 255, 0],
                chocolate: [210, 105, 30],
                coral: [255, 127, 80],
                cornflowerblue: [100, 149, 237],
                cornsilk: [255, 248, 220],
                crimson: [220, 20, 60],
                cyan: [0, 255, 255],
                darkblue: [0, 0, 139],
                darkcyan: [0, 139, 139],
                darkgoldenrod: [184, 134, 11],
                darkgray: [169, 169, 169],
                darkgreen: [0, 100, 0],
                darkgrey: [169, 169, 169],
                darkkhaki: [189, 183, 107],
                darkmagenta: [139, 0, 139],
                darkolivegreen: [85, 107, 47],
                darkorange: [255, 140, 0],
                darkorchid: [153, 50, 204],
                darkred: [139, 0, 0],
                darksalmon: [233, 150, 122],
                darkseagreen: [143, 188, 143],
                darkslateblue: [72, 61, 139],
                darkslategray: [47, 79, 79],
                darkslategrey: [47, 79, 79],
                darkturquoise: [0, 206, 209],
                darkviolet: [148, 0, 211],
                deeppink: [255, 20, 147],
                deepskyblue: [0, 191, 255],
                dimgray: [105, 105, 105],
                dimgrey: [105, 105, 105],
                dodgerblue: [30, 144, 255],
                firebrick: [178, 34, 34],
                floralwhite: [255, 250, 240],
                forestgreen: [34, 139, 34],
                fuchsia: [255, 0, 255],
                gainsboro: [220, 220, 220],
                ghostwhite: [248, 248, 255],
                gold: [255, 215, 0],
                goldenrod: [218, 165, 32],
                gray: [128, 128, 128],
                green: [0, 128, 0],
                greenyellow: [173, 255, 47],
                grey: [128, 128, 128],
                honeydew: [240, 255, 240],
                hotpink: [255, 105, 180],
                indianred: [205, 92, 92],
                indigo: [75, 0, 130],
                ivory: [255, 255, 240],
                khaki: [240, 230, 140],
                lavender: [230, 230, 250],
                lavenderblush: [255, 240, 245],
                lawngreen: [124, 252, 0],
                lemonchiffon: [255, 250, 205],
                lightblue: [173, 216, 230],
                lightcoral: [240, 128, 128],
                lightcyan: [224, 255, 255],
                lightgoldenrodyellow: [250, 250, 210],
                lightgray: [211, 211, 211],
                lightgreen: [144, 238, 144],
                lightgrey: [211, 211, 211],
                lightpink: [255, 182, 193],
                lightsalmon: [255, 160, 122],
                lightseagreen: [32, 178, 170],
                lightskyblue: [135, 206, 250],
                lightslategray: [119, 136, 153],
                lightslategrey: [119, 136, 153],
                lightsteelblue: [176, 196, 222],
                lightyellow: [255, 255, 224],
                lime: [0, 255, 0],
                limegreen: [50, 205, 50],
                linen: [250, 240, 230],
                magenta: [255, 0, 255],
                maroon: [128, 0, 0],
                mediumaquamarine: [102, 205, 170],
                mediumblue: [0, 0, 205],
                mediumorchid: [186, 85, 211],
                mediumpurple: [147, 112, 219],
                mediumseagreen: [60, 179, 113],
                mediumslateblue: [123, 104, 238],
                mediumspringgreen: [0, 250, 154],
                mediumturquoise: [72, 209, 204],
                mediumvioletred: [199, 21, 133],
                midnightblue: [25, 25, 112],
                mintcream: [245, 255, 250],
                mistyrose: [255, 228, 225],
                moccasin: [255, 228, 181],
                navajowhite: [255, 222, 173],
                navy: [0, 0, 128],
                oldlace: [253, 245, 230],
                olive: [128, 128, 0],
                olivedrab: [107, 142, 35],
                orange: [255, 165, 0],
                orangered: [255, 69, 0],
                orchid: [218, 112, 214],
                palegoldenrod: [238, 232, 170],
                palegreen: [152, 251, 152],
                paleturquoise: [175, 238, 238],
                palevioletred: [219, 112, 147],
                papayawhip: [255, 239, 213],
                peachpuff: [255, 218, 185],
                peru: [205, 133, 63],
                pink: [255, 192, 203],
                plum: [221, 160, 221],
                powderblue: [176, 224, 230],
                purple: [128, 0, 128],
                rebeccapurple: [102, 51, 153],
                red: [255, 0, 0],
                rosybrown: [188, 143, 143],
                royalblue: [65, 105, 225],
                saddlebrown: [139, 69, 19],
                salmon: [250, 128, 114],
                sandybrown: [244, 164, 96],
                seagreen: [46, 139, 87],
                seashell: [255, 245, 238],
                sienna: [160, 82, 45],
                silver: [192, 192, 192],
                skyblue: [135, 206, 235],
                slateblue: [106, 90, 205],
                slategray: [112, 128, 144],
                slategrey: [112, 128, 144],
                snow: [255, 250, 250],
                springgreen: [0, 255, 127],
                steelblue: [70, 130, 180],
                tan: [210, 180, 140],
                teal: [0, 128, 128],
                thistle: [216, 191, 216],
                tomato: [255, 99, 71],
                turquoise: [64, 224, 208],
                violet: [238, 130, 238],
                wheat: [245, 222, 179],
                white: [255, 255, 255],
                whitesmoke: [245, 245, 245],
                yellow: [255, 255, 0],
                yellowgreen: [154, 205, 50]
            }
        }, {}],
        6: [function(t, e, i) {
            n = this, a = function() {
                "use strict";
                var i;

                function n() {
                    return i.apply(null, arguments)
                }

                function a(t) {
                    return t instanceof Array || "[object Array]" === Object.prototype.toString.call(t)
                }

                function r(t) {
                    return null != t && "[object Object]" === Object.prototype.toString.call(t)
                }

                function o(t) {
                    return void 0 === t
                }

                function s(t) {
                    return "number" == typeof t || "[object Number]" === Object.prototype.toString.call(t)
                }

                function l(t) {
                    return t instanceof Date || "[object Date]" === Object.prototype.toString.call(t)
                }

                function h(t, e) {
                    var i, n = [];
                    for (i = 0; i < t.length; ++i) n.push(e(t[i], i));
                    return n
                }

                function u(t, e) {
                    return Object.prototype.hasOwnProperty.call(t, e)
                }

                function d(t, e) {
                    for (var i in e) u(e, i) && (t[i] = e[i]);
                    return u(e, "toString") && (t.toString = e.toString), u(e, "valueOf") && (t.valueOf = e.valueOf), t
                }

                function c(t, e, i, n) {
                    return Pe(t, e, i, n, !0).utc()
                }

                function f(t) {
                    return null == t._pf && (t._pf = {
                        empty: !1,
                        unusedTokens: [],
                        unusedInput: [],
                        overflow: -2,
                        charsLeftOver: 0,
                        nullInput: !1,
                        invalidMonth: null,
                        invalidFormat: !1,
                        userInvalidated: !1,
                        iso: !1,
                        parsedDateParts: [],
                        meridiem: null,
                        rfc2822: !1,
                        weekdayMismatch: !1
                    }), t._pf
                }
                var g;
                g = Array.prototype.some ? Array.prototype.some : function(t) {
                    for (var e = Object(this), i = e.length >>> 0, n = 0; n < i; n++)
                        if (n in e && t.call(this, e[n], n, e)) return !0;
                    return !1
                };

                function m(t) {
                    if (null == t._isValid) {
                        var e = f(t),
                            i = g.call(e.parsedDateParts, function(t) {
                                return null != t
                            }),
                            n = !isNaN(t._d.getTime()) && e.overflow < 0 && !e.empty && !e.invalidMonth && !e.invalidWeekday && !e.weekdayMismatch && !e.nullInput && !e.invalidFormat && !e.userInvalidated && (!e.meridiem || e.meridiem && i);
                        if (t._strict && (n = n && 0 === e.charsLeftOver && 0 === e.unusedTokens.length && void 0 === e.bigHour), null != Object.isFrozen && Object.isFrozen(t)) return n;
                        t._isValid = n
                    }
                    return t._isValid
                }

                function p(t) {
                    var e = c(NaN);
                    return null != t ? d(f(e), t) : f(e).userInvalidated = !0, e
                }
                var v = n.momentProperties = [];

                function y(t, e) {
                    var i, n, a;
                    if (o(e._isAMomentObject) || (t._isAMomentObject = e._isAMomentObject), o(e._i) || (t._i = e._i), o(e._f) || (t._f = e._f), o(e._l) || (t._l = e._l), o(e._strict) || (t._strict = e._strict), o(e._tzm) || (t._tzm = e._tzm), o(e._isUTC) || (t._isUTC = e._isUTC), o(e._offset) || (t._offset = e._offset), o(e._pf) || (t._pf = f(e)), o(e._locale) || (t._locale = e._locale), v.length > 0)
                        for (i = 0; i < v.length; i++) o(a = e[n = v[i]]) || (t[n] = a);
                    return t
                }
                var b = !1;

                function x(t) {
                    y(this, t), this._d = new Date(null != t._d ? t._d.getTime() : NaN), this.isValid() || (this._d = new Date(NaN)), !1 === b && (b = !0, n.updateOffset(this), b = !1)
                }

                function _(t) {
                    return t instanceof x || null != t && null != t._isAMomentObject
                }

                function k(t) {
                    return t < 0 ? Math.ceil(t) || 0 : Math.floor(t)
                }

                function w(t) {
                    var e = +t,
                        i = 0;
                    return 0 !== e && isFinite(e) && (i = k(e)), i
                }

                function M(t, e, i) {
                    var n, a = Math.min(t.length, e.length),
                        r = Math.abs(t.length - e.length),
                        o = 0;
                    for (n = 0; n < a; n++)(i && t[n] !== e[n] || !i && w(t[n]) !== w(e[n])) && o++;
                    return o + r
                }

                function S(t) {
                    !1 === n.suppressDeprecationWarnings && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + t)
                }

                function D(t, e) {
                    var i = !0;
                    return d(function() {
                        if (null != n.deprecationHandler && n.deprecationHandler(null, t), i) {
                            for (var a, r = [], o = 0; o < arguments.length; o++) {
                                if (a = "", "object" == typeof arguments[o]) {
                                    a += "\n[" + o + "] ";
                                    for (var s in arguments[0]) a += s + ": " + arguments[0][s] + ", ";
                                    a = a.slice(0, -2)
                                } else a = arguments[o];
                                r.push(a)
                            }
                            S(t + "\nArguments: " + Array.prototype.slice.call(r).join("") + "\n" + (new Error).stack), i = !1
                        }
                        return e.apply(this, arguments)
                    }, e)
                }
                var C = {};

                function P(t, e) {
                    null != n.deprecationHandler && n.deprecationHandler(t, e), C[t] || (S(e), C[t] = !0)
                }
                n.suppressDeprecationWarnings = !1, n.deprecationHandler = null;

                function T(t) {
                    return t instanceof Function || "[object Function]" === Object.prototype.toString.call(t)
                }

                function O(t, e) {
                    var i, n = d({}, t);
                    for (i in e) u(e, i) && (r(t[i]) && r(e[i]) ? (n[i] = {}, d(n[i], t[i]), d(n[i], e[i])) : null != e[i] ? n[i] = e[i] : delete n[i]);
                    for (i in t) u(t, i) && !u(e, i) && r(t[i]) && (n[i] = d({}, n[i]));
                    return n
                }

                function I(t) {
                    null != t && this.set(t)
                }
                var A;
                A = Object.keys ? Object.keys : function(t) {
                    var e, i = [];
                    for (e in t) u(t, e) && i.push(e);
                    return i
                };
                var F = {};

                function R(t, e) {
                    var i = t.toLowerCase();
                    F[i] = F[i + "s"] = F[e] = t
                }

                function L(t) {
                    return "string" == typeof t ? F[t] || F[t.toLowerCase()] : void 0
                }

                function W(t) {
                    var e, i, n = {};
                    for (i in t) u(t, i) && (e = L(i)) && (n[e] = t[i]);
                    return n
                }
                var Y = {};

                function N(t, e) {
                    Y[t] = e
                }

                function z(t, e, i) {
                    var n = "" + Math.abs(t),
                        a = e - n.length;
                    return (t >= 0 ? i ? "+" : "" : "-") + Math.pow(10, Math.max(0, a)).toString().substr(1) + n
                }
                var H = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
                    V = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
                    B = {},
                    E = {};

                function j(t, e, i, n) {
                    var a = n;
                    "string" == typeof n && (a = function() {
                        return this[n]()
                    }), t && (E[t] = a), e && (E[e[0]] = function() {
                        return z(a.apply(this, arguments), e[1], e[2])
                    }), i && (E[i] = function() {
                        return this.localeData().ordinal(a.apply(this, arguments), t)
                    })
                }

                function U(t, e) {
                    return t.isValid() ? (e = q(e, t.localeData()), B[e] = B[e] || function(t) {
                        var e, i, n = t.match(H);
                        for (e = 0, i = n.length; e < i; e++) E[n[e]] ? n[e] = E[n[e]] : n[e] = (a = n[e], a.match(/\[[\s\S]/) ? a.replace(/^\[|\]$/g, "") : a.replace(/\\/g, ""));
                        var a;
                        return function(e) {
                            var a, r = "";
                            for (a = 0; a < i; a++) r += T(n[a]) ? n[a].call(e, t) : n[a];
                            return r
                        }
                    }(e), B[e](t)) : t.localeData().invalidDate()
                }

                function q(t, e) {
                    var i = 5;

                    function n(t) {
                        return e.longDateFormat(t) || t
                    }
                    for (V.lastIndex = 0; i >= 0 && V.test(t);) t = t.replace(V, n), V.lastIndex = 0, i -= 1;
                    return t
                }
                var G = /\d/,
                    Z = /\d\d/,
                    X = /\d{3}/,
                    J = /\d{4}/,
                    K = /[+-]?\d{6}/,
                    $ = /\d\d?/,
                    Q = /\d\d\d\d?/,
                    tt = /\d\d\d\d\d\d?/,
                    et = /\d{1,3}/,
                    it = /\d{1,4}/,
                    nt = /[+-]?\d{1,6}/,
                    at = /\d+/,
                    rt = /[+-]?\d+/,
                    ot = /Z|[+-]\d\d:?\d\d/gi,
                    st = /Z|[+-]\d\d(?::?\d\d)?/gi,
                    lt = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
                    ht = {};

                function ut(t, e, i) {
                    ht[t] = T(e) ? e : function(t, n) {
                        return t && i ? i : e
                    }
                }

                function dt(t, e) {
                    if (!u(ht, t)) return new RegExp(ct(t.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(t, e, i, n, a) {
                        return e || i || n || a
                    })));
                    return ht[t](e._strict, e._locale)
                }

                function ct(t) {
                    return t.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
                }
                var ft = {};

                function gt(t, e) {
                    var i, n = e;
                    for ("string" == typeof t && (t = [t]), s(e) && (n = function(t, i) {
                            i[e] = w(t)
                        }), i = 0; i < t.length; i++) ft[t[i]] = n
                }

                function mt(t, e) {
                    gt(t, function(t, i, n, a) {
                        n._w = n._w || {}, e(t, n._w, n, a)
                    })
                }
                var pt = 0,
                    vt = 1,
                    yt = 2,
                    bt = 3,
                    xt = 4,
                    _t = 5,
                    kt = 6,
                    wt = 7,
                    Mt = 8;
                j("Y", 0, 0, function() {
                    var t = this.year();
                    return t <= 9999 ? "" + t : "+" + t
                }), j(0, ["YY", 2], 0, function() {
                    return this.year() % 100
                }), j(0, ["YYYY", 4], 0, "year"), j(0, ["YYYYY", 5], 0, "year"), j(0, ["YYYYYY", 6, !0], 0, "year"), R("year", "y"), N("year", 1), ut("Y", rt), ut("YY", $, Z), ut("YYYY", it, J), ut("YYYYY", nt, K), ut("YYYYYY", nt, K), gt(["YYYYY", "YYYYYY"], pt), gt("YYYY", function(t, e) {
                    e[pt] = 2 === t.length ? n.parseTwoDigitYear(t) : w(t)
                }), gt("YY", function(t, e) {
                    e[pt] = n.parseTwoDigitYear(t)
                }), gt("Y", function(t, e) {
                    e[pt] = parseInt(t, 10)
                });

                function St(t) {
                    return Dt(t) ? 366 : 365
                }

                function Dt(t) {
                    return t % 4 == 0 && t % 100 != 0 || t % 400 == 0
                }
                n.parseTwoDigitYear = function(t) {
                    return w(t) + (w(t) > 68 ? 1900 : 2e3)
                };
                var Ct = Pt("FullYear", !0);

                function Pt(t, e) {
                    return function(i) {
                        return null != i ? (Ot(this, t, i), n.updateOffset(this, e), this) : Tt(this, t)
                    }
                }

                function Tt(t, e) {
                    return t.isValid() ? t._d["get" + (t._isUTC ? "UTC" : "") + e]() : NaN
                }

                function Ot(t, e, i) {
                    t.isValid() && !isNaN(i) && ("FullYear" === e && Dt(t.year()) && 1 === t.month() && 29 === t.date() ? t._d["set" + (t._isUTC ? "UTC" : "") + e](i, t.month(), At(i, t.month())) : t._d["set" + (t._isUTC ? "UTC" : "") + e](i))
                }
                var It;
                It = Array.prototype.indexOf ? Array.prototype.indexOf : function(t) {
                    var e;
                    for (e = 0; e < this.length; ++e)
                        if (this[e] === t) return e;
                    return -1
                };

                function At(t, e) {
                    if (isNaN(t) || isNaN(e)) return NaN;
                    var i, n, a = (i = e, n = 12, (i % n + n) % n);
                    return t += (e - a) / 12, 1 === a ? Dt(t) ? 29 : 28 : 31 - a % 7 % 2
                }
                j("M", ["MM", 2], "Mo", function() {
                    return this.month() + 1
                }), j("MMM", 0, 0, function(t) {
                    return this.localeData().monthsShort(this, t)
                }), j("MMMM", 0, 0, function(t) {
                    return this.localeData().months(this, t)
                }), R("month", "M"), N("month", 8), ut("M", $), ut("MM", $, Z), ut("MMM", function(t, e) {
                    return e.monthsShortRegex(t)
                }), ut("MMMM", function(t, e) {
                    return e.monthsRegex(t)
                }), gt(["M", "MM"], function(t, e) {
                    e[vt] = w(t) - 1
                }), gt(["MMM", "MMMM"], function(t, e, i, n) {
                    var a = i._locale.monthsParse(t, n, i._strict);
                    null != a ? e[vt] = a : f(i).invalidMonth = t
                });
                var Ft = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
                    Rt = "January_February_March_April_May_June_July_August_September_October_November_December".split("_");
                var Lt = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_");

                function Wt(t, e) {
                    var i;
                    if (!t.isValid()) return t;
                    if ("string" == typeof e)
                        if (/^\d+$/.test(e)) e = w(e);
                        else if (!s(e = t.localeData().monthsParse(e))) return t;
                    return i = Math.min(t.date(), At(t.year(), e)), t._d["set" + (t._isUTC ? "UTC" : "") + "Month"](e, i), t
                }

                function Yt(t) {
                    return null != t ? (Wt(this, t), n.updateOffset(this, !0), this) : Tt(this, "Month")
                }
                var Nt = lt;
                var zt = lt;

                function Ht() {
                    function t(t, e) {
                        return e.length - t.length
                    }
                    var e, i, n = [],
                        a = [],
                        r = [];
                    for (e = 0; e < 12; e++) i = c([2e3, e]), n.push(this.monthsShort(i, "")), a.push(this.months(i, "")), r.push(this.months(i, "")), r.push(this.monthsShort(i, ""));
                    for (n.sort(t), a.sort(t), r.sort(t), e = 0; e < 12; e++) n[e] = ct(n[e]), a[e] = ct(a[e]);
                    for (e = 0; e < 24; e++) r[e] = ct(r[e]);
                    this._monthsRegex = new RegExp("^(" + r.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + a.join("|") + ")", "i"), this._monthsShortStrictRegex = new RegExp("^(" + n.join("|") + ")", "i")
                }

                function Vt(t) {
                    var e = new Date(Date.UTC.apply(null, arguments));
                    return t < 100 && t >= 0 && isFinite(e.getUTCFullYear()) && e.setUTCFullYear(t), e
                }

                function Bt(t, e, i) {
                    var n = 7 + e - i;
                    return -((7 + Vt(t, 0, n).getUTCDay() - e) % 7) + n - 1
                }

                function Et(t, e, i, n, a) {
                    var r, o, s = 1 + 7 * (e - 1) + (7 + i - n) % 7 + Bt(t, n, a);
                    return s <= 0 ? o = St(r = t - 1) + s : s > St(t) ? (r = t + 1, o = s - St(t)) : (r = t, o = s), {
                        year: r,
                        dayOfYear: o
                    }
                }

                function jt(t, e, i) {
                    var n, a, r = Bt(t.year(), e, i),
                        o = Math.floor((t.dayOfYear() - r - 1) / 7) + 1;
                    return o < 1 ? n = o + Ut(a = t.year() - 1, e, i) : o > Ut(t.year(), e, i) ? (n = o - Ut(t.year(), e, i), a = t.year() + 1) : (a = t.year(), n = o), {
                        week: n,
                        year: a
                    }
                }

                function Ut(t, e, i) {
                    var n = Bt(t, e, i),
                        a = Bt(t + 1, e, i);
                    return (St(t) - n + a) / 7
                }
                j("w", ["ww", 2], "wo", "week"), j("W", ["WW", 2], "Wo", "isoWeek"), R("week", "w"), R("isoWeek", "W"), N("week", 5), N("isoWeek", 5), ut("w", $), ut("ww", $, Z), ut("W", $), ut("WW", $, Z), mt(["w", "ww", "W", "WW"], function(t, e, i, n) {
                    e[n.substr(0, 1)] = w(t)
                });
                j("d", 0, "do", "day"), j("dd", 0, 0, function(t) {
                    return this.localeData().weekdaysMin(this, t)
                }), j("ddd", 0, 0, function(t) {
                    return this.localeData().weekdaysShort(this, t)
                }), j("dddd", 0, 0, function(t) {
                    return this.localeData().weekdays(this, t)
                }), j("e", 0, 0, "weekday"), j("E", 0, 0, "isoWeekday"), R("day", "d"), R("weekday", "e"), R("isoWeekday", "E"), N("day", 11), N("weekday", 11), N("isoWeekday", 11), ut("d", $), ut("e", $), ut("E", $), ut("dd", function(t, e) {
                    return e.weekdaysMinRegex(t)
                }), ut("ddd", function(t, e) {
                    return e.weekdaysShortRegex(t)
                }), ut("dddd", function(t, e) {
                    return e.weekdaysRegex(t)
                }), mt(["dd", "ddd", "dddd"], function(t, e, i, n) {
                    var a = i._locale.weekdaysParse(t, n, i._strict);
                    null != a ? e.d = a : f(i).invalidWeekday = t
                }), mt(["d", "e", "E"], function(t, e, i, n) {
                    e[n] = w(t)
                });
                var qt = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_");
                var Gt = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_");
                var Zt = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
                var Xt = lt;
                var Jt = lt;
                var Kt = lt;

                function $t() {
                    function t(t, e) {
                        return e.length - t.length
                    }
                    var e, i, n, a, r, o = [],
                        s = [],
                        l = [],
                        h = [];
                    for (e = 0; e < 7; e++) i = c([2e3, 1]).day(e), n = this.weekdaysMin(i, ""), a = this.weekdaysShort(i, ""), r = this.weekdays(i, ""), o.push(n), s.push(a), l.push(r), h.push(n), h.push(a), h.push(r);
                    for (o.sort(t), s.sort(t), l.sort(t), h.sort(t), e = 0; e < 7; e++) s[e] = ct(s[e]), l[e] = ct(l[e]), h[e] = ct(h[e]);
                    this._weekdaysRegex = new RegExp("^(" + h.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp("^(" + l.join("|") + ")", "i"), this._weekdaysShortStrictRegex = new RegExp("^(" + s.join("|") + ")", "i"), this._weekdaysMinStrictRegex = new RegExp("^(" + o.join("|") + ")", "i")
                }

                function Qt() {
                    return this.hours() % 12 || 12
                }
                j("H", ["HH", 2], 0, "hour"), j("h", ["hh", 2], 0, Qt), j("k", ["kk", 2], 0, function() {
                    return this.hours() || 24
                }), j("hmm", 0, 0, function() {
                    return "" + Qt.apply(this) + z(this.minutes(), 2)
                }), j("hmmss", 0, 0, function() {
                    return "" + Qt.apply(this) + z(this.minutes(), 2) + z(this.seconds(), 2)
                }), j("Hmm", 0, 0, function() {
                    return "" + this.hours() + z(this.minutes(), 2)
                }), j("Hmmss", 0, 0, function() {
                    return "" + this.hours() + z(this.minutes(), 2) + z(this.seconds(), 2)
                });

                function te(t, e) {
                    j(t, 0, 0, function() {
                        return this.localeData().meridiem(this.hours(), this.minutes(), e)
                    })
                }
                te("a", !0), te("A", !1), R("hour", "h"), N("hour", 13);

                function ee(t, e) {
                    return e._meridiemParse
                }
                ut("a", ee), ut("A", ee), ut("H", $), ut("h", $), ut("k", $), ut("HH", $, Z), ut("hh", $, Z), ut("kk", $, Z), ut("hmm", Q), ut("hmmss", tt), ut("Hmm", Q), ut("Hmmss", tt), gt(["H", "HH"], bt), gt(["k", "kk"], function(t, e, i) {
                    var n = w(t);
                    e[bt] = 24 === n ? 0 : n
                }), gt(["a", "A"], function(t, e, i) {
                    i._isPm = i._locale.isPM(t), i._meridiem = t
                }), gt(["h", "hh"], function(t, e, i) {
                    e[bt] = w(t), f(i).bigHour = !0
                }), gt("hmm", function(t, e, i) {
                    var n = t.length - 2;
                    e[bt] = w(t.substr(0, n)), e[xt] = w(t.substr(n)), f(i).bigHour = !0
                }), gt("hmmss", function(t, e, i) {
                    var n = t.length - 4,
                        a = t.length - 2;
                    e[bt] = w(t.substr(0, n)), e[xt] = w(t.substr(n, 2)), e[_t] = w(t.substr(a)), f(i).bigHour = !0
                }), gt("Hmm", function(t, e, i) {
                    var n = t.length - 2;
                    e[bt] = w(t.substr(0, n)), e[xt] = w(t.substr(n))
                }), gt("Hmmss", function(t, e, i) {
                    var n = t.length - 4,
                        a = t.length - 2;
                    e[bt] = w(t.substr(0, n)), e[xt] = w(t.substr(n, 2)), e[_t] = w(t.substr(a))
                });
                var ie, ne = Pt("Hours", !0),
                    ae = {
                        calendar: {
                            sameDay: "[Today at] LT",
                            nextDay: "[Tomorrow at] LT",
                            nextWeek: "dddd [at] LT",
                            lastDay: "[Yesterday at] LT",
                            lastWeek: "[Last] dddd [at] LT",
                            sameElse: "L"
                        },
                        longDateFormat: {
                            LTS: "h:mm:ss A",
                            LT: "h:mm A",
                            L: "MM/DD/YYYY",
                            LL: "MMMM D, YYYY",
                            LLL: "MMMM D, YYYY h:mm A",
                            LLLL: "dddd, MMMM D, YYYY h:mm A"
                        },
                        invalidDate: "Invalid date",
                        ordinal: "%d",
                        dayOfMonthOrdinalParse: /\d{1,2}/,
                        relativeTime: {
                            future: "in %s",
                            past: "%s ago",
                            s: "a few seconds",
                            ss: "%d seconds",
                            m: "a minute",
                            mm: "%d minutes",
                            h: "an hour",
                            hh: "%d hours",
                            d: "a day",
                            dd: "%d days",
                            M: "a month",
                            MM: "%d months",
                            y: "a year",
                            yy: "%d years"
                        },
                        months: Rt,
                        monthsShort: Lt,
                        week: {
                            dow: 0,
                            doy: 6
                        },
                        weekdays: qt,
                        weekdaysMin: Zt,
                        weekdaysShort: Gt,
                        meridiemParse: /[ap]\.?m?\.?/i
                    },
                    re = {},
                    oe = {};

                function se(t) {
                    return t ? t.toLowerCase().replace("_", "-") : t
                }

                function le(i) {
                    var n = null;
                    if (!re[i] && void 0 !== e && e && e.exports) try {
                        n = ie._abbr;
                        t("./locale/" + i), he(n)
                    } catch (t) {}
                    return re[i]
                }

                function he(t, e) {
                    var i;
                    return t && (i = o(e) ? de(t) : ue(t, e)) && (ie = i), ie._abbr
                }

                function ue(t, e) {
                    if (null !== e) {
                        var i = ae;
                        if (e.abbr = t, null != re[t]) P("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."), i = re[t]._config;
                        else if (null != e.parentLocale) {
                            if (null == re[e.parentLocale]) return oe[e.parentLocale] || (oe[e.parentLocale] = []), oe[e.parentLocale].push({
                                name: t,
                                config: e
                            }), null;
                            i = re[e.parentLocale]._config
                        }
                        return re[t] = new I(O(i, e)), oe[t] && oe[t].forEach(function(t) {
                            ue(t.name, t.config)
                        }), he(t), re[t]
                    }
                    return delete re[t], null
                }

                function de(t) {
                    var e;
                    if (t && t._locale && t._locale._abbr && (t = t._locale._abbr), !t) return ie;
                    if (!a(t)) {
                        if (e = le(t)) return e;
                        t = [t]
                    }
                    return function(t) {
                        for (var e, i, n, a, r = 0; r < t.length;) {
                            for (e = (a = se(t[r]).split("-")).length, i = (i = se(t[r + 1])) ? i.split("-") : null; e > 0;) {
                                if (n = le(a.slice(0, e).join("-"))) return n;
                                if (i && i.length >= e && M(a, i, !0) >= e - 1) break;
                                e--
                            }
                            r++
                        }
                        return null
                    }(t)
                }

                function ce(t) {
                    var e, i = t._a;
                    return i && -2 === f(t).overflow && (e = i[vt] < 0 || i[vt] > 11 ? vt : i[yt] < 1 || i[yt] > At(i[pt], i[vt]) ? yt : i[bt] < 0 || i[bt] > 24 || 24 === i[bt] && (0 !== i[xt] || 0 !== i[_t] || 0 !== i[kt]) ? bt : i[xt] < 0 || i[xt] > 59 ? xt : i[_t] < 0 || i[_t] > 59 ? _t : i[kt] < 0 || i[kt] > 999 ? kt : -1, f(t)._overflowDayOfYear && (e < pt || e > yt) && (e = yt), f(t)._overflowWeeks && -1 === e && (e = wt), f(t)._overflowWeekday && -1 === e && (e = Mt), f(t).overflow = e), t
                }

                function fe(t, e, i) {
                    return null != t ? t : null != e ? e : i
                }

                function ge(t) {
                    var e, i, a, r, o, s = [];
                    if (!t._d) {
                        for (a = function(t) {
                                var e = new Date(n.now());
                                return t._useUTC ? [e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate()] : [e.getFullYear(), e.getMonth(), e.getDate()]
                            }(t), t._w && null == t._a[yt] && null == t._a[vt] && function(t) {
                                var e, i, n, a, r, o, s, l;
                                if (null != (e = t._w).GG || null != e.W || null != e.E) r = 1, o = 4, i = fe(e.GG, t._a[pt], jt(Te(), 1, 4).year), n = fe(e.W, 1), ((a = fe(e.E, 1)) < 1 || a > 7) && (l = !0);
                                else {
                                    r = t._locale._week.dow, o = t._locale._week.doy;
                                    var h = jt(Te(), r, o);
                                    i = fe(e.gg, t._a[pt], h.year), n = fe(e.w, h.week), null != e.d ? ((a = e.d) < 0 || a > 6) && (l = !0) : null != e.e ? (a = e.e + r, (e.e < 0 || e.e > 6) && (l = !0)) : a = r
                                }
                                n < 1 || n > Ut(i, r, o) ? f(t)._overflowWeeks = !0 : null != l ? f(t)._overflowWeekday = !0 : (s = Et(i, n, a, r, o), t._a[pt] = s.year, t._dayOfYear = s.dayOfYear)
                            }(t), null != t._dayOfYear && (o = fe(t._a[pt], a[pt]), (t._dayOfYear > St(o) || 0 === t._dayOfYear) && (f(t)._overflowDayOfYear = !0), i = Vt(o, 0, t._dayOfYear), t._a[vt] = i.getUTCMonth(), t._a[yt] = i.getUTCDate()), e = 0; e < 3 && null == t._a[e]; ++e) t._a[e] = s[e] = a[e];
                        for (; e < 7; e++) t._a[e] = s[e] = null == t._a[e] ? 2 === e ? 1 : 0 : t._a[e];
                        24 === t._a[bt] && 0 === t._a[xt] && 0 === t._a[_t] && 0 === t._a[kt] && (t._nextDay = !0, t._a[bt] = 0), t._d = (t._useUTC ? Vt : function(t, e, i, n, a, r, o) {
                            var s = new Date(t, e, i, n, a, r, o);
                            return t < 100 && t >= 0 && isFinite(s.getFullYear()) && s.setFullYear(t), s
                        }).apply(null, s), r = t._useUTC ? t._d.getUTCDay() : t._d.getDay(), null != t._tzm && t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm), t._nextDay && (t._a[bt] = 24), t._w && void 0 !== t._w.d && t._w.d !== r && (f(t).weekdayMismatch = !0)
                    }
                }
                var me = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
                    pe = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
                    ve = /Z|[+-]\d\d(?::?\d\d)?/,
                    ye = [
                        ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
                        ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
                        ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
                        ["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
                        ["YYYY-DDD", /\d{4}-\d{3}/],
                        ["YYYY-MM", /\d{4}-\d\d/, !1],
                        ["YYYYYYMMDD", /[+-]\d{10}/],
                        ["YYYYMMDD", /\d{8}/],
                        ["GGGG[W]WWE", /\d{4}W\d{3}/],
                        ["GGGG[W]WW", /\d{4}W\d{2}/, !1],
                        ["YYYYDDD", /\d{7}/]
                    ],
                    be = [
                        ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
                        ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
                        ["HH:mm:ss", /\d\d:\d\d:\d\d/],
                        ["HH:mm", /\d\d:\d\d/],
                        ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
                        ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
                        ["HHmmss", /\d\d\d\d\d\d/],
                        ["HHmm", /\d\d\d\d/],
                        ["HH", /\d\d/]
                    ],
                    xe = /^\/?Date\((\-?\d+)/i;

                function _e(t) {
                    var e, i, n, a, r, o, s = t._i,
                        l = me.exec(s) || pe.exec(s);
                    if (l) {
                        for (f(t).iso = !0, e = 0, i = ye.length; e < i; e++)
                            if (ye[e][1].exec(l[1])) {
                                a = ye[e][0], n = !1 !== ye[e][2];
                                break
                            } if (null == a) return void(t._isValid = !1);
                        if (l[3]) {
                            for (e = 0, i = be.length; e < i; e++)
                                if (be[e][1].exec(l[3])) {
                                    r = (l[2] || " ") + be[e][0];
                                    break
                                } if (null == r) return void(t._isValid = !1)
                        }
                        if (!n && null != r) return void(t._isValid = !1);
                        if (l[4]) {
                            if (!ve.exec(l[4])) return void(t._isValid = !1);
                            o = "Z"
                        }
                        t._f = a + (r || "") + (o || ""), De(t)
                    } else t._isValid = !1
                }
                var ke = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;

                function we(t, e, i, n, a, r) {
                    var o = [function(t) {
                        var e = parseInt(t, 10);
                        if (e <= 49) return 2e3 + e;
                        if (e <= 999) return 1900 + e;
                        return e
                    }(t), Lt.indexOf(e), parseInt(i, 10), parseInt(n, 10), parseInt(a, 10)];
                    return r && o.push(parseInt(r, 10)), o
                }
                var Me = {
                    UT: 0,
                    GMT: 0,
                    EDT: -240,
                    EST: -300,
                    CDT: -300,
                    CST: -360,
                    MDT: -360,
                    MST: -420,
                    PDT: -420,
                    PST: -480
                };

                function Se(t) {
                    var e, i = ke.exec((e = t._i, e.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim()));
                    if (i) {
                        var n = we(i[4], i[3], i[2], i[5], i[6], i[7]);
                        if (! function(t, e, i) {
                                if (t && Gt.indexOf(t) !== new Date(e[0], e[1], e[2]).getDay()) return f(i).weekdayMismatch = !0, i._isValid = !1, !1;
                                return !0
                            }(i[1], n, t)) return;
                        t._a = n, t._tzm = function(t, e, i) {
                            if (t) return Me[t];
                            if (e) return 0;
                            var n = parseInt(i, 10),
                                a = n % 100;
                            return (n - a) / 100 * 60 + a
                        }(i[8], i[9], i[10]), t._d = Vt.apply(null, t._a), t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm), f(t).rfc2822 = !0
                    } else t._isValid = !1
                }
                n.createFromInputFallback = D("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function(t) {
                    t._d = new Date(t._i + (t._useUTC ? " UTC" : ""))
                }), n.ISO_8601 = function() {}, n.RFC_2822 = function() {};

                function De(t) {
                    if (t._f !== n.ISO_8601)
                        if (t._f !== n.RFC_2822) {
                            t._a = [], f(t).empty = !0;
                            var e, i, a, r, o, s = "" + t._i,
                                l = s.length,
                                h = 0;
                            for (a = q(t._f, t._locale).match(H) || [], e = 0; e < a.length; e++) r = a[e], (i = (s.match(dt(r, t)) || [])[0]) && ((o = s.substr(0, s.indexOf(i))).length > 0 && f(t).unusedInput.push(o), s = s.slice(s.indexOf(i) + i.length), h += i.length), E[r] ? (i ? f(t).empty = !1 : f(t).unusedTokens.push(r), d = r, g = t, null != (c = i) && u(ft, d) && ft[d](c, g._a, g, d)) : t._strict && !i && f(t).unusedTokens.push(r);
                            var d, c, g;
                            f(t).charsLeftOver = l - h, s.length > 0 && f(t).unusedInput.push(s), t._a[bt] <= 12 && !0 === f(t).bigHour && t._a[bt] > 0 && (f(t).bigHour = void 0), f(t).parsedDateParts = t._a.slice(0), f(t).meridiem = t._meridiem, t._a[bt] = function(t, e, i) {
                                var n;
                                if (null == i) return e;
                                return null != t.meridiemHour ? t.meridiemHour(e, i) : null != t.isPM ? ((n = t.isPM(i)) && e < 12 && (e += 12), n || 12 !== e || (e = 0), e) : e
                            }(t._locale, t._a[bt], t._meridiem), ge(t), ce(t)
                        } else Se(t);
                    else _e(t)
                }

                function Ce(t) {
                    var e = t._i,
                        i = t._f;
                    return t._locale = t._locale || de(t._l), null === e || void 0 === i && "" === e ? p({
                        nullInput: !0
                    }) : ("string" == typeof e && (t._i = e = t._locale.preparse(e)), _(e) ? new x(ce(e)) : (l(e) ? t._d = e : a(i) ? function(t) {
                        var e, i, n, a, r;
                        if (0 === t._f.length) return f(t).invalidFormat = !0, void(t._d = new Date(NaN));
                        for (a = 0; a < t._f.length; a++) r = 0, e = y({}, t), null != t._useUTC && (e._useUTC = t._useUTC), e._f = t._f[a], De(e), m(e) && (r += f(e).charsLeftOver, r += 10 * f(e).unusedTokens.length, f(e).score = r, (null == n || r < n) && (n = r, i = e));
                        d(t, i || e)
                    }(t) : i ? De(t) : function(t) {
                        var e = t._i;
                        o(e) ? t._d = new Date(n.now()) : l(e) ? t._d = new Date(e.valueOf()) : "string" == typeof e ? function(t) {
                            var e = xe.exec(t._i);
                            null === e ? (_e(t), !1 === t._isValid && (delete t._isValid, Se(t), !1 === t._isValid && (delete t._isValid, n.createFromInputFallback(t)))) : t._d = new Date(+e[1])
                        }(t) : a(e) ? (t._a = h(e.slice(0), function(t) {
                            return parseInt(t, 10)
                        }), ge(t)) : r(e) ? function(t) {
                            if (!t._d) {
                                var e = W(t._i);
                                t._a = h([e.year, e.month, e.day || e.date, e.hour, e.minute, e.second, e.millisecond], function(t) {
                                    return t && parseInt(t, 10)
                                }), ge(t)
                            }
                        }(t) : s(e) ? t._d = new Date(e) : n.createFromInputFallback(t)
                    }(t), m(t) || (t._d = null), t))
                }

                function Pe(t, e, i, n, o) {
                    var s = {};
                    return !0 !== i && !1 !== i || (n = i, i = void 0), (r(t) && function(t) {
                            if (Object.getOwnPropertyNames) return 0 === Object.getOwnPropertyNames(t).length;
                            var e;
                            for (e in t)
                                if (t.hasOwnProperty(e)) return !1;
                            return !0
                        }(t) || a(t) && 0 === t.length) && (t = void 0), s._isAMomentObject = !0, s._useUTC = s._isUTC = o, s._l = i, s._i = t, s._f = e, s._strict = n,
                        function(t) {
                            var e = new x(ce(Ce(t)));
                            return e._nextDay && (e.add(1, "d"), e._nextDay = void 0), e
                        }(s)
                }

                function Te(t, e, i, n) {
                    return Pe(t, e, i, n, !1)
                }
                var Oe = D("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
                        var t = Te.apply(null, arguments);
                        return this.isValid() && t.isValid() ? t < this ? this : t : p()
                    }),
                    Ie = D("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
                        var t = Te.apply(null, arguments);
                        return this.isValid() && t.isValid() ? t > this ? this : t : p()
                    });

                function Ae(t, e) {
                    var i, n;
                    if (1 === e.length && a(e[0]) && (e = e[0]), !e.length) return Te();
                    for (i = e[0], n = 1; n < e.length; ++n) e[n].isValid() && !e[n][t](i) || (i = e[n]);
                    return i
                }
                var Fe = ["year", "quarter", "month", "week", "day", "hour", "minute", "second", "millisecond"];

                function Re(t) {
                    var e = W(t),
                        i = e.year || 0,
                        n = e.quarter || 0,
                        a = e.month || 0,
                        r = e.week || 0,
                        o = e.day || 0,
                        s = e.hour || 0,
                        l = e.minute || 0,
                        h = e.second || 0,
                        u = e.millisecond || 0;
                    this._isValid = function(t) {
                        for (var e in t)
                            if (-1 === It.call(Fe, e) || null != t[e] && isNaN(t[e])) return !1;
                        for (var i = !1, n = 0; n < Fe.length; ++n)
                            if (t[Fe[n]]) {
                                if (i) return !1;
                                parseFloat(t[Fe[n]]) !== w(t[Fe[n]]) && (i = !0)
                            } return !0
                    }(e), this._milliseconds = +u + 1e3 * h + 6e4 * l + 1e3 * s * 60 * 60, this._days = +o + 7 * r, this._months = +a + 3 * n + 12 * i, this._data = {}, this._locale = de(), this._bubble()
                }

                function Le(t) {
                    return t instanceof Re
                }

                function We(t) {
                    return t < 0 ? -1 * Math.round(-1 * t) : Math.round(t)
                }

                function Ye(t, e) {
                    j(t, 0, 0, function() {
                        var t = this.utcOffset(),
                            i = "+";
                        return t < 0 && (t = -t, i = "-"), i + z(~~(t / 60), 2) + e + z(~~t % 60, 2)
                    })
                }
                Ye("Z", ":"), Ye("ZZ", ""), ut("Z", st), ut("ZZ", st), gt(["Z", "ZZ"], function(t, e, i) {
                    i._useUTC = !0, i._tzm = ze(st, t)
                });
                var Ne = /([\+\-]|\d\d)/gi;

                function ze(t, e) {
                    var i = (e || "").match(t);
                    if (null === i) return null;
                    var n = ((i[i.length - 1] || []) + "").match(Ne) || ["-", 0, 0],
                        a = 60 * n[1] + w(n[2]);
                    return 0 === a ? 0 : "+" === n[0] ? a : -a
                }

                function He(t, e) {
                    var i, a;
                    return e._isUTC ? (i = e.clone(), a = (_(t) || l(t) ? t.valueOf() : Te(t).valueOf()) - i.valueOf(), i._d.setTime(i._d.valueOf() + a), n.updateOffset(i, !1), i) : Te(t).local()
                }

                function Ve(t) {
                    return 15 * -Math.round(t._d.getTimezoneOffset() / 15)
                }
                n.updateOffset = function() {};

                function Be() {
                    return !!this.isValid() && (this._isUTC && 0 === this._offset)
                }
                var Ee = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,
                    je = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

                function Ue(t, e) {
                    var i, n, a, r = t,
                        o = null;
                    return Le(t) ? r = {
                        ms: t._milliseconds,
                        d: t._days,
                        M: t._months
                    } : s(t) ? (r = {}, e ? r[e] = t : r.milliseconds = t) : (o = Ee.exec(t)) ? (i = "-" === o[1] ? -1 : 1, r = {
                        y: 0,
                        d: w(o[yt]) * i,
                        h: w(o[bt]) * i,
                        m: w(o[xt]) * i,
                        s: w(o[_t]) * i,
                        ms: w(We(1e3 * o[kt])) * i
                    }) : (o = je.exec(t)) ? (i = "-" === o[1] ? -1 : (o[1], 1), r = {
                        y: qe(o[2], i),
                        M: qe(o[3], i),
                        w: qe(o[4], i),
                        d: qe(o[5], i),
                        h: qe(o[6], i),
                        m: qe(o[7], i),
                        s: qe(o[8], i)
                    }) : null == r ? r = {} : "object" == typeof r && ("from" in r || "to" in r) && (a = function(t, e) {
                        var i;
                        if (!t.isValid() || !e.isValid()) return {
                            milliseconds: 0,
                            months: 0
                        };
                        e = He(e, t), t.isBefore(e) ? i = Ge(t, e) : ((i = Ge(e, t)).milliseconds = -i.milliseconds, i.months = -i.months);
                        return i
                    }(Te(r.from), Te(r.to)), (r = {}).ms = a.milliseconds, r.M = a.months), n = new Re(r), Le(t) && u(t, "_locale") && (n._locale = t._locale), n
                }
                Ue.fn = Re.prototype, Ue.invalid = function() {
                    return Ue(NaN)
                };

                function qe(t, e) {
                    var i = t && parseFloat(t.replace(",", "."));
                    return (isNaN(i) ? 0 : i) * e
                }

                function Ge(t, e) {
                    var i = {
                        milliseconds: 0,
                        months: 0
                    };
                    return i.months = e.month() - t.month() + 12 * (e.year() - t.year()), t.clone().add(i.months, "M").isAfter(e) && --i.months, i.milliseconds = +e - +t.clone().add(i.months, "M"), i
                }

                function Ze(t, e) {
                    return function(i, n) {
                        var a;
                        return null === n || isNaN(+n) || (P(e, "moment()." + e + "(period, number) is deprecated. Please use moment()." + e + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."), a = i, i = n, n = a), Xe(this, Ue(i = "string" == typeof i ? +i : i, n), t), this
                    }
                }

                function Xe(t, e, i, a) {
                    var r = e._milliseconds,
                        o = We(e._days),
                        s = We(e._months);
                    t.isValid() && (a = null == a || a, s && Wt(t, Tt(t, "Month") + s * i), o && Ot(t, "Date", Tt(t, "Date") + o * i), r && t._d.setTime(t._d.valueOf() + r * i), a && n.updateOffset(t, o || s))
                }
                var Je = Ze(1, "add"),
                    Ke = Ze(-1, "subtract");

                function $e(t, e) {
                    var i = 12 * (e.year() - t.year()) + (e.month() - t.month()),
                        n = t.clone().add(i, "months");
                    return -(i + (e - n < 0 ? (e - n) / (n - t.clone().add(i - 1, "months")) : (e - n) / (t.clone().add(i + 1, "months") - n))) || 0
                }
                n.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", n.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";

                function Qe(t) {
                    var e;
                    return void 0 === t ? this._locale._abbr : (null != (e = de(t)) && (this._locale = e), this)
                }
                var ti = D("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(t) {
                    return void 0 === t ? this.localeData() : this.locale(t)
                });

                function ei() {
                    return this._locale
                }
                j(0, ["gg", 2], 0, function() {
                    return this.weekYear() % 100
                }), j(0, ["GG", 2], 0, function() {
                    return this.isoWeekYear() % 100
                });

                function ii(t, e) {
                    j(0, [t, t.length], 0, e)
                }
                ii("gggg", "weekYear"), ii("ggggg", "weekYear"), ii("GGGG", "isoWeekYear"), ii("GGGGG", "isoWeekYear"), R("weekYear", "gg"), R("isoWeekYear", "GG"), N("weekYear", 1), N("isoWeekYear", 1), ut("G", rt), ut("g", rt), ut("GG", $, Z), ut("gg", $, Z), ut("GGGG", it, J), ut("gggg", it, J), ut("GGGGG", nt, K), ut("ggggg", nt, K), mt(["gggg", "ggggg", "GGGG", "GGGGG"], function(t, e, i, n) {
                    e[n.substr(0, 2)] = w(t)
                }), mt(["gg", "GG"], function(t, e, i, a) {
                    e[a] = n.parseTwoDigitYear(t)
                });

                function ni(t, e, i, n, a) {
                    var r;
                    return null == t ? jt(this, n, a).year : (e > (r = Ut(t, n, a)) && (e = r), function(t, e, i, n, a) {
                        var r = Et(t, e, i, n, a),
                            o = Vt(r.year, 0, r.dayOfYear);
                        return this.year(o.getUTCFullYear()), this.month(o.getUTCMonth()), this.date(o.getUTCDate()), this
                    }.call(this, t, e, i, n, a))
                }
                j("Q", 0, "Qo", "quarter"), R("quarter", "Q"), N("quarter", 7), ut("Q", G), gt("Q", function(t, e) {
                    e[vt] = 3 * (w(t) - 1)
                });
                j("D", ["DD", 2], "Do", "date"), R("date", "D"), N("date", 9), ut("D", $), ut("DD", $, Z), ut("Do", function(t, e) {
                    return t ? e._dayOfMonthOrdinalParse || e._ordinalParse : e._dayOfMonthOrdinalParseLenient
                }), gt(["D", "DD"], yt), gt("Do", function(t, e) {
                    e[yt] = w(t.match($)[0])
                });
                var ai = Pt("Date", !0);
                j("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), R("dayOfYear", "DDD"), N("dayOfYear", 4), ut("DDD", et), ut("DDDD", X), gt(["DDD", "DDDD"], function(t, e, i) {
                    i._dayOfYear = w(t)
                });
                j("m", ["mm", 2], 0, "minute"), R("minute", "m"), N("minute", 14), ut("m", $), ut("mm", $, Z), gt(["m", "mm"], xt);
                var ri = Pt("Minutes", !1);
                j("s", ["ss", 2], 0, "second"), R("second", "s"), N("second", 15), ut("s", $), ut("ss", $, Z), gt(["s", "ss"], _t);
                var oi = Pt("Seconds", !1);
                j("S", 0, 0, function() {
                    return ~~(this.millisecond() / 100)
                }), j(0, ["SS", 2], 0, function() {
                    return ~~(this.millisecond() / 10)
                }), j(0, ["SSS", 3], 0, "millisecond"), j(0, ["SSSS", 4], 0, function() {
                    return 10 * this.millisecond()
                }), j(0, ["SSSSS", 5], 0, function() {
                    return 100 * this.millisecond()
                }), j(0, ["SSSSSS", 6], 0, function() {
                    return 1e3 * this.millisecond()
                }), j(0, ["SSSSSSS", 7], 0, function() {
                    return 1e4 * this.millisecond()
                }), j(0, ["SSSSSSSS", 8], 0, function() {
                    return 1e5 * this.millisecond()
                }), j(0, ["SSSSSSSSS", 9], 0, function() {
                    return 1e6 * this.millisecond()
                }), R("millisecond", "ms"), N("millisecond", 16), ut("S", et, G), ut("SS", et, Z), ut("SSS", et, X);
                var si;
                for (si = "SSSS"; si.length <= 9; si += "S") ut(si, at);

                function li(t, e) {
                    e[kt] = w(1e3 * ("0." + t))
                }
                for (si = "S"; si.length <= 9; si += "S") gt(si, li);
                var hi = Pt("Milliseconds", !1);
                j("z", 0, 0, "zoneAbbr"), j("zz", 0, 0, "zoneName");
                var ui = x.prototype;
                ui.add = Je, ui.calendar = function(t, e) {
                    var i = t || Te(),
                        a = He(i, this).startOf("day"),
                        r = n.calendarFormat(this, a) || "sameElse",
                        o = e && (T(e[r]) ? e[r].call(this, i) : e[r]);
                    return this.format(o || this.localeData().calendar(r, this, Te(i)))
                }, ui.clone = function() {
                    return new x(this)
                }, ui.diff = function(t, e, i) {
                    var n, a, r;
                    if (!this.isValid()) return NaN;
                    if (!(n = He(t, this)).isValid()) return NaN;
                    switch (a = 6e4 * (n.utcOffset() - this.utcOffset()), e = L(e)) {
                        case "year":
                            r = $e(this, n) / 12;
                            break;
                        case "month":
                            r = $e(this, n);
                            break;
                        case "quarter":
                            r = $e(this, n) / 3;
                            break;
                        case "second":
                            r = (this - n) / 1e3;
                            break;
                        case "minute":
                            r = (this - n) / 6e4;
                            break;
                        case "hour":
                            r = (this - n) / 36e5;
                            break;
                        case "day":
                            r = (this - n - a) / 864e5;
                            break;
                        case "week":
                            r = (this - n - a) / 6048e5;
                            break;
                        default:
                            r = this - n
                    }
                    return i ? r : k(r)
                }, ui.endOf = function(t) {
                    return void 0 === (t = L(t)) || "millisecond" === t ? this : ("date" === t && (t = "day"), this.startOf(t).add(1, "isoWeek" === t ? "week" : t).subtract(1, "ms"))
                }, ui.format = function(t) {
                    t || (t = this.isUtc() ? n.defaultFormatUtc : n.defaultFormat);
                    var e = U(this, t);
                    return this.localeData().postformat(e)
                }, ui.from = function(t, e) {
                    return this.isValid() && (_(t) && t.isValid() || Te(t).isValid()) ? Ue({
                        to: this,
                        from: t
                    }).locale(this.locale()).humanize(!e) : this.localeData().invalidDate()
                }, ui.fromNow = function(t) {
                    return this.from(Te(), t)
                }, ui.to = function(t, e) {
                    return this.isValid() && (_(t) && t.isValid() || Te(t).isValid()) ? Ue({
                        from: this,
                        to: t
                    }).locale(this.locale()).humanize(!e) : this.localeData().invalidDate()
                }, ui.toNow = function(t) {
                    return this.to(Te(), t)
                }, ui.get = function(t) {
                    return T(this[t = L(t)]) ? this[t]() : this
                }, ui.invalidAt = function() {
                    return f(this).overflow
                }, ui.isAfter = function(t, e) {
                    var i = _(t) ? t : Te(t);
                    return !(!this.isValid() || !i.isValid()) && ("millisecond" === (e = L(o(e) ? "millisecond" : e)) ? this.valueOf() > i.valueOf() : i.valueOf() < this.clone().startOf(e).valueOf())
                }, ui.isBefore = function(t, e) {
                    var i = _(t) ? t : Te(t);
                    return !(!this.isValid() || !i.isValid()) && ("millisecond" === (e = L(o(e) ? "millisecond" : e)) ? this.valueOf() < i.valueOf() : this.clone().endOf(e).valueOf() < i.valueOf())
                }, ui.isBetween = function(t, e, i, n) {
                    return ("(" === (n = n || "()")[0] ? this.isAfter(t, i) : !this.isBefore(t, i)) && (")" === n[1] ? this.isBefore(e, i) : !this.isAfter(e, i))
                }, ui.isSame = function(t, e) {
                    var i, n = _(t) ? t : Te(t);
                    return !(!this.isValid() || !n.isValid()) && ("millisecond" === (e = L(e || "millisecond")) ? this.valueOf() === n.valueOf() : (i = n.valueOf(), this.clone().startOf(e).valueOf() <= i && i <= this.clone().endOf(e).valueOf()))
                }, ui.isSameOrAfter = function(t, e) {
                    return this.isSame(t, e) || this.isAfter(t, e)
                }, ui.isSameOrBefore = function(t, e) {
                    return this.isSame(t, e) || this.isBefore(t, e)
                }, ui.isValid = function() {
                    return m(this)
                }, ui.lang = ti, ui.locale = Qe, ui.localeData = ei, ui.max = Ie, ui.min = Oe, ui.parsingFlags = function() {
                    return d({}, f(this))
                }, ui.set = function(t, e) {
                    if ("object" == typeof t)
                        for (var i = function(t) {
                                var e = [];
                                for (var i in t) e.push({
                                    unit: i,
                                    priority: Y[i]
                                });
                                return e.sort(function(t, e) {
                                    return t.priority - e.priority
                                }), e
                            }(t = W(t)), n = 0; n < i.length; n++) this[i[n].unit](t[i[n].unit]);
                    else if (T(this[t = L(t)])) return this[t](e);
                    return this
                }, ui.startOf = function(t) {
                    switch (t = L(t)) {
                        case "year":
                            this.month(0);
                        case "quarter":
                        case "month":
                            this.date(1);
                        case "week":
                        case "isoWeek":
                        case "day":
                        case "date":
                            this.hours(0);
                        case "hour":
                            this.minutes(0);
                        case "minute":
                            this.seconds(0);
                        case "second":
                            this.milliseconds(0)
                    }
                    return "week" === t && this.weekday(0), "isoWeek" === t && this.isoWeekday(1), "quarter" === t && this.month(3 * Math.floor(this.month() / 3)), this
                }, ui.subtract = Ke, ui.toArray = function() {
                    return [this.year(), this.month(), this.date(), this.hour(), this.minute(), this.second(), this.millisecond()]
                }, ui.toObject = function() {
                    return {
                        years: this.year(),
                        months: this.month(),
                        date: this.date(),
                        hours: this.hours(),
                        minutes: this.minutes(),
                        seconds: this.seconds(),
                        milliseconds: this.milliseconds()
                    }
                }, ui.toDate = function() {
                    return new Date(this.valueOf())
                }, ui.toISOString = function(t) {
                    if (!this.isValid()) return null;
                    var e = !0 !== t,
                        i = e ? this.clone().utc() : this;
                    return i.year() < 0 || i.year() > 9999 ? U(i, e ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ") : T(Date.prototype.toISOString) ? e ? this.toDate().toISOString() : new Date(this._d.valueOf()).toISOString().replace("Z", U(i, "Z")) : U(i, e ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ")
                }, ui.inspect = function() {
                    if (!this.isValid()) return "moment.invalid(/* " + this._i + " )";
                    var t = "moment",
                        e = "";
                    this.isLocal() || (t = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone", e = "Z");
                    var i = "[" + t + '("]',
                        n = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY",
                        a = e + '[")]';
                    return this.format(i + n + "-MM-DD[T]HH:mm:ss.SSS" + a)
                }, ui.toJSON = function() {
                    return this.isValid() ? this.toISOString() : null
                }, ui.toString = function() {
                    return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
                }, ui.unix = function() {
                    return Math.floor(this.valueOf() / 1e3)
                }, ui.valueOf = function() {
                    return this._d.valueOf() - 6e4 * (this._offset || 0)
                }, ui.creationData = function() {
                    return {
                        input: this._i,
                        format: this._f,
                        locale: this._locale,
                        isUTC: this._isUTC,
                        strict: this._strict
                    }
                }, ui.year = Ct, ui.isLeapYear = function() {
                    return Dt(this.year())
                }, ui.weekYear = function(t) {
                    return ni.call(this, t, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy)
                }, ui.isoWeekYear = function(t) {
                    return ni.call(this, t, this.isoWeek(), this.isoWeekday(), 1, 4)
                }, ui.quarter = ui.quarters = function(t) {
                    return null == t ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (t - 1) + this.month() % 3)
                }, ui.month = Yt, ui.daysInMonth = function() {
                    return At(this.year(), this.month())
                }, ui.week = ui.weeks = function(t) {
                    var e = this.localeData().week(this);
                    return null == t ? e : this.add(7 * (t - e), "d")
                }, ui.isoWeek = ui.isoWeeks = function(t) {
                    var e = jt(this, 1, 4).week;
                    return null == t ? e : this.add(7 * (t - e), "d")
                }, ui.weeksInYear = function() {
                    var t = this.localeData()._week;
                    return Ut(this.year(), t.dow, t.doy)
                }, ui.isoWeeksInYear = function() {
                    return Ut(this.year(), 1, 4)
                }, ui.date = ai, ui.day = ui.days = function(t) {
                    if (!this.isValid()) return null != t ? this : NaN;
                    var e = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
                    return null != t ? (i = t, n = this.localeData(), t = "string" != typeof i ? i : isNaN(i) ? "number" == typeof(i = n.weekdaysParse(i)) ? i : null : parseInt(i, 10), this.add(t - e, "d")) : e;
                    var i, n
                }, ui.weekday = function(t) {
                    if (!this.isValid()) return null != t ? this : NaN;
                    var e = (this.day() + 7 - this.localeData()._week.dow) % 7;
                    return null == t ? e : this.add(t - e, "d")
                }, ui.isoWeekday = function(t) {
                    if (!this.isValid()) return null != t ? this : NaN;
                    if (null != t) {
                        var e = (i = t, n = this.localeData(), "string" == typeof i ? n.weekdaysParse(i) % 7 || 7 : isNaN(i) ? null : i);
                        return this.day(this.day() % 7 ? e : e - 7)
                    }
                    return this.day() || 7;
                    var i, n
                }, ui.dayOfYear = function(t) {
                    var e = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
                    return null == t ? e : this.add(t - e, "d")
                }, ui.hour = ui.hours = ne, ui.minute = ui.minutes = ri, ui.second = ui.seconds = oi, ui.millisecond = ui.milliseconds = hi, ui.utcOffset = function(t, e, i) {
                    var a, r = this._offset || 0;
                    if (!this.isValid()) return null != t ? this : NaN;
                    if (null != t) {
                        if ("string" == typeof t) {
                            if (null === (t = ze(st, t))) return this
                        } else Math.abs(t) < 16 && !i && (t *= 60);
                        return !this._isUTC && e && (a = Ve(this)), this._offset = t, this._isUTC = !0, null != a && this.add(a, "m"), r !== t && (!e || this._changeInProgress ? Xe(this, Ue(t - r, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, n.updateOffset(this, !0), this._changeInProgress = null)), this
                    }
                    return this._isUTC ? r : Ve(this)
                }, ui.utc = function(t) {
                    return this.utcOffset(0, t)
                }, ui.local = function(t) {
                    return this._isUTC && (this.utcOffset(0, t), this._isUTC = !1, t && this.subtract(Ve(this), "m")), this
                }, ui.parseZone = function() {
                    if (null != this._tzm) this.utcOffset(this._tzm, !1, !0);
                    else if ("string" == typeof this._i) {
                        var t = ze(ot, this._i);
                        null != t ? this.utcOffset(t) : this.utcOffset(0, !0)
                    }
                    return this
                }, ui.hasAlignedHourOffset = function(t) {
                    return !!this.isValid() && (t = t ? Te(t).utcOffset() : 0, (this.utcOffset() - t) % 60 == 0)
                }, ui.isDST = function() {
                    return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
                }, ui.isLocal = function() {
                    return !!this.isValid() && !this._isUTC
                }, ui.isUtcOffset = function() {
                    return !!this.isValid() && this._isUTC
                }, ui.isUtc = Be, ui.isUTC = Be, ui.zoneAbbr = function() {
                    return this._isUTC ? "UTC" : ""
                }, ui.zoneName = function() {
                    return this._isUTC ? "Coordinated Universal Time" : ""
                }, ui.dates = D("dates accessor is deprecated. Use date instead.", ai), ui.months = D("months accessor is deprecated. Use month instead", Yt), ui.years = D("years accessor is deprecated. Use year instead", Ct), ui.zone = D("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", function(t, e) {
                    return null != t ? ("string" != typeof t && (t = -t), this.utcOffset(t, e), this) : -this.utcOffset()
                }), ui.isDSTShifted = D("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", function() {
                    if (!o(this._isDSTShifted)) return this._isDSTShifted;
                    var t = {};
                    if (y(t, this), (t = Ce(t))._a) {
                        var e = t._isUTC ? c(t._a) : Te(t._a);
                        this._isDSTShifted = this.isValid() && M(t._a, e.toArray()) > 0
                    } else this._isDSTShifted = !1;
                    return this._isDSTShifted
                });

                function di(t) {
                    return t
                }
                var ci = I.prototype;
                ci.calendar = function(t, e, i) {
                    var n = this._calendar[t] || this._calendar.sameElse;
                    return T(n) ? n.call(e, i) : n
                }, ci.longDateFormat = function(t) {
                    var e = this._longDateFormat[t],
                        i = this._longDateFormat[t.toUpperCase()];
                    return e || !i ? e : (this._longDateFormat[t] = i.replace(/MMMM|MM|DD|dddd/g, function(t) {
                        return t.slice(1)
                    }), this._longDateFormat[t])
                }, ci.invalidDate = function() {
                    return this._invalidDate
                }, ci.ordinal = function(t) {
                    return this._ordinal.replace("%d", t)
                }, ci.preparse = di, ci.postformat = di, ci.relativeTime = function(t, e, i, n) {
                    var a = this._relativeTime[i];
                    return T(a) ? a(t, e, i, n) : a.replace(/%d/i, t)
                }, ci.pastFuture = function(t, e) {
                    var i = this._relativeTime[t > 0 ? "future" : "past"];
                    return T(i) ? i(e) : i.replace(/%s/i, e)
                }, ci.set = function(t) {
                    var e, i;
                    for (i in t) T(e = t[i]) ? this[i] = e : this["_" + i] = e;
                    this._config = t, this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source)
                }, ci.months = function(t, e) {
                    return t ? a(this._months) ? this._months[t.month()] : this._months[(this._months.isFormat || Ft).test(e) ? "format" : "standalone"][t.month()] : a(this._months) ? this._months : this._months.standalone
                }, ci.monthsShort = function(t, e) {
                    return t ? a(this._monthsShort) ? this._monthsShort[t.month()] : this._monthsShort[Ft.test(e) ? "format" : "standalone"][t.month()] : a(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone
                }, ci.monthsParse = function(t, e, i) {
                    var n, a, r;
                    if (this._monthsParseExact) return function(t, e, i) {
                        var n, a, r, o = t.toLocaleLowerCase();
                        if (!this._monthsParse)
                            for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], n = 0; n < 12; ++n) r = c([2e3, n]), this._shortMonthsParse[n] = this.monthsShort(r, "").toLocaleLowerCase(), this._longMonthsParse[n] = this.months(r, "").toLocaleLowerCase();
                        return i ? "MMM" === e ? -1 !== (a = It.call(this._shortMonthsParse, o)) ? a : null : -1 !== (a = It.call(this._longMonthsParse, o)) ? a : null : "MMM" === e ? -1 !== (a = It.call(this._shortMonthsParse, o)) ? a : -1 !== (a = It.call(this._longMonthsParse, o)) ? a : null : -1 !== (a = It.call(this._longMonthsParse, o)) ? a : -1 !== (a = It.call(this._shortMonthsParse, o)) ? a : null
                    }.call(this, t, e, i);
                    for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), n = 0; n < 12; n++) {
                        if (a = c([2e3, n]), i && !this._longMonthsParse[n] && (this._longMonthsParse[n] = new RegExp("^" + this.months(a, "").replace(".", "") + "$", "i"), this._shortMonthsParse[n] = new RegExp("^" + this.monthsShort(a, "").replace(".", "") + "$", "i")), i || this._monthsParse[n] || (r = "^" + this.months(a, "") + "|^" + this.monthsShort(a, ""), this._monthsParse[n] = new RegExp(r.replace(".", ""), "i")), i && "MMMM" === e && this._longMonthsParse[n].test(t)) return n;
                        if (i && "MMM" === e && this._shortMonthsParse[n].test(t)) return n;
                        if (!i && this._monthsParse[n].test(t)) return n
                    }
                }, ci.monthsRegex = function(t) {
                    return this._monthsParseExact ? (u(this, "_monthsRegex") || Ht.call(this), t ? this._monthsStrictRegex : this._monthsRegex) : (u(this, "_monthsRegex") || (this._monthsRegex = zt), this._monthsStrictRegex && t ? this._monthsStrictRegex : this._monthsRegex)
                }, ci.monthsShortRegex = function(t) {
                    return this._monthsParseExact ? (u(this, "_monthsRegex") || Ht.call(this), t ? this._monthsShortStrictRegex : this._monthsShortRegex) : (u(this, "_monthsShortRegex") || (this._monthsShortRegex = Nt), this._monthsShortStrictRegex && t ? this._monthsShortStrictRegex : this._monthsShortRegex)
                }, ci.week = function(t) {
                    return jt(t, this._week.dow, this._week.doy).week
                }, ci.firstDayOfYear = function() {
                    return this._week.doy
                }, ci.firstDayOfWeek = function() {
                    return this._week.dow
                }, ci.weekdays = function(t, e) {
                    return t ? a(this._weekdays) ? this._weekdays[t.day()] : this._weekdays[this._weekdays.isFormat.test(e) ? "format" : "standalone"][t.day()] : a(this._weekdays) ? this._weekdays : this._weekdays.standalone
                }, ci.weekdaysMin = function(t) {
                    return t ? this._weekdaysMin[t.day()] : this._weekdaysMin
                }, ci.weekdaysShort = function(t) {
                    return t ? this._weekdaysShort[t.day()] : this._weekdaysShort
                }, ci.weekdaysParse = function(t, e, i) {
                    var n, a, r;
                    if (this._weekdaysParseExact) return function(t, e, i) {
                        var n, a, r, o = t.toLocaleLowerCase();
                        if (!this._weekdaysParse)
                            for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], n = 0; n < 7; ++n) r = c([2e3, 1]).day(n), this._minWeekdaysParse[n] = this.weekdaysMin(r, "").toLocaleLowerCase(), this._shortWeekdaysParse[n] = this.weekdaysShort(r, "").toLocaleLowerCase(), this._weekdaysParse[n] = this.weekdays(r, "").toLocaleLowerCase();
                        return i ? "dddd" === e ? -1 !== (a = It.call(this._weekdaysParse, o)) ? a : null : "ddd" === e ? -1 !== (a = It.call(this._shortWeekdaysParse, o)) ? a : null : -1 !== (a = It.call(this._minWeekdaysParse, o)) ? a : null : "dddd" === e ? -1 !== (a = It.call(this._weekdaysParse, o)) ? a : -1 !== (a = It.call(this._shortWeekdaysParse, o)) ? a : -1 !== (a = It.call(this._minWeekdaysParse, o)) ? a : null : "ddd" === e ? -1 !== (a = It.call(this._shortWeekdaysParse, o)) ? a : -1 !== (a = It.call(this._weekdaysParse, o)) ? a : -1 !== (a = It.call(this._minWeekdaysParse, o)) ? a : null : -1 !== (a = It.call(this._minWeekdaysParse, o)) ? a : -1 !== (a = It.call(this._weekdaysParse, o)) ? a : -1 !== (a = It.call(this._shortWeekdaysParse, o)) ? a : null
                    }.call(this, t, e, i);
                    for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), n = 0; n < 7; n++) {
                        if (a = c([2e3, 1]).day(n), i && !this._fullWeekdaysParse[n] && (this._fullWeekdaysParse[n] = new RegExp("^" + this.weekdays(a, "").replace(".", ".?") + "$", "i"), this._shortWeekdaysParse[n] = new RegExp("^" + this.weekdaysShort(a, "").replace(".", ".?") + "$", "i"), this._minWeekdaysParse[n] = new RegExp("^" + this.weekdaysMin(a, "").replace(".", ".?") + "$", "i")), this._weekdaysParse[n] || (r = "^" + this.weekdays(a, "") + "|^" + this.weekdaysShort(a, "") + "|^" + this.weekdaysMin(a, ""), this._weekdaysParse[n] = new RegExp(r.replace(".", ""), "i")), i && "dddd" === e && this._fullWeekdaysParse[n].test(t)) return n;
                        if (i && "ddd" === e && this._shortWeekdaysParse[n].test(t)) return n;
                        if (i && "dd" === e && this._minWeekdaysParse[n].test(t)) return n;
                        if (!i && this._weekdaysParse[n].test(t)) return n
                    }
                }, ci.weekdaysRegex = function(t) {
                    return this._weekdaysParseExact ? (u(this, "_weekdaysRegex") || $t.call(this), t ? this._weekdaysStrictRegex : this._weekdaysRegex) : (u(this, "_weekdaysRegex") || (this._weekdaysRegex = Xt), this._weekdaysStrictRegex && t ? this._weekdaysStrictRegex : this._weekdaysRegex)
                }, ci.weekdaysShortRegex = function(t) {
                    return this._weekdaysParseExact ? (u(this, "_weekdaysRegex") || $t.call(this), t ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (u(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = Jt), this._weekdaysShortStrictRegex && t ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
                }, ci.weekdaysMinRegex = function(t) {
                    return this._weekdaysParseExact ? (u(this, "_weekdaysRegex") || $t.call(this), t ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (u(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Kt), this._weekdaysMinStrictRegex && t ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
                }, ci.isPM = function(t) {
                    return "p" === (t + "").toLowerCase().charAt(0)
                }, ci.meridiem = function(t, e, i) {
                    return t > 11 ? i ? "pm" : "PM" : i ? "am" : "AM"
                };

                function fi(t, e, i, n) {
                    var a = de(),
                        r = c().set(n, e);
                    return a[i](r, t)
                }

                function gi(t, e, i) {
                    if (s(t) && (e = t, t = void 0), t = t || "", null != e) return fi(t, e, i, "month");
                    var n, a = [];
                    for (n = 0; n < 12; n++) a[n] = fi(t, n, i, "month");
                    return a
                }

                function mi(t, e, i, n) {
                    "boolean" == typeof t ? (s(e) && (i = e, e = void 0), e = e || "") : (i = e = t, t = !1, s(e) && (i = e, e = void 0), e = e || "");
                    var a = de(),
                        r = t ? a._week.dow : 0;
                    if (null != i) return fi(e, (i + r) % 7, n, "day");
                    var o, l = [];
                    for (o = 0; o < 7; o++) l[o] = fi(e, (o + r) % 7, n, "day");
                    return l
                }
                he("en", {
                    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
                    ordinal: function(t) {
                        var e = t % 10;
                        return t + (1 === w(t % 100 / 10) ? "th" : 1 === e ? "st" : 2 === e ? "nd" : 3 === e ? "rd" : "th")
                    }
                }), n.lang = D("moment.lang is deprecated. Use moment.locale instead.", he), n.langData = D("moment.langData is deprecated. Use moment.localeData instead.", de);
                var pi = Math.abs;

                function vi(t, e, i, n) {
                    var a = Ue(e, i);
                    return t._milliseconds += n * a._milliseconds, t._days += n * a._days, t._months += n * a._months, t._bubble()
                }

                function yi(t) {
                    return t < 0 ? Math.floor(t) : Math.ceil(t)
                }

                function bi(t) {
                    return 4800 * t / 146097
                }

                function xi(t) {
                    return 146097 * t / 4800
                }

                function _i(t) {
                    return function() {
                        return this.as(t)
                    }
                }
                var ki = _i("ms"),
                    wi = _i("s"),
                    Mi = _i("m"),
                    Si = _i("h"),
                    Di = _i("d"),
                    Ci = _i("w"),
                    Pi = _i("M"),
                    Ti = _i("y");

                function Oi(t) {
                    return function() {
                        return this.isValid() ? this._data[t] : NaN
                    }
                }
                var Ii = Oi("milliseconds"),
                    Ai = Oi("seconds"),
                    Fi = Oi("minutes"),
                    Ri = Oi("hours"),
                    Li = Oi("days"),
                    Wi = Oi("months"),
                    Yi = Oi("years");
                var Ni = Math.round,
                    zi = {
                        ss: 44,
                        s: 45,
                        m: 45,
                        h: 22,
                        d: 26,
                        M: 11
                    };
                var Hi = Math.abs;

                function Vi(t) {
                    return (t > 0) - (t < 0) || +t
                }

                function Bi() {
                    if (!this.isValid()) return this.localeData().invalidDate();
                    var t, e, i = Hi(this._milliseconds) / 1e3,
                        n = Hi(this._days),
                        a = Hi(this._months);
                    e = k((t = k(i / 60)) / 60), i %= 60, t %= 60;
                    var r = k(a / 12),
                        o = a %= 12,
                        s = n,
                        l = e,
                        h = t,
                        u = i ? i.toFixed(3).replace(/\.?0+$/, "") : "",
                        d = this.asSeconds();
                    if (!d) return "P0D";
                    var c = d < 0 ? "-" : "",
                        f = Vi(this._months) !== Vi(d) ? "-" : "",
                        g = Vi(this._days) !== Vi(d) ? "-" : "",
                        m = Vi(this._milliseconds) !== Vi(d) ? "-" : "";
                    return c + "P" + (r ? f + r + "Y" : "") + (o ? f + o + "M" : "") + (s ? g + s + "D" : "") + (l || h || u ? "T" : "") + (l ? m + l + "H" : "") + (h ? m + h + "M" : "") + (u ? m + u + "S" : "")
                }
                var Ei = Re.prototype;
                Ei.isValid = function() {
                    return this._isValid
                }, Ei.abs = function() {
                    var t = this._data;
                    return this._milliseconds = pi(this._milliseconds), this._days = pi(this._days), this._months = pi(this._months), t.milliseconds = pi(t.milliseconds), t.seconds = pi(t.seconds), t.minutes = pi(t.minutes), t.hours = pi(t.hours), t.months = pi(t.months), t.years = pi(t.years), this
                }, Ei.add = function(t, e) {
                    return vi(this, t, e, 1)
                }, Ei.subtract = function(t, e) {
                    return vi(this, t, e, -1)
                }, Ei.as = function(t) {
                    if (!this.isValid()) return NaN;
                    var e, i, n = this._milliseconds;
                    if ("month" === (t = L(t)) || "year" === t) return e = this._days + n / 864e5, i = this._months + bi(e), "month" === t ? i : i / 12;
                    switch (e = this._days + Math.round(xi(this._months)), t) {
                        case "week":
                            return e / 7 + n / 6048e5;
                        case "day":
                            return e + n / 864e5;
                        case "hour":
                            return 24 * e + n / 36e5;
                        case "minute":
                            return 1440 * e + n / 6e4;
                        case "second":
                            return 86400 * e + n / 1e3;
                        case "millisecond":
                            return Math.floor(864e5 * e) + n;
                        default:
                            throw new Error("Unknown unit " + t)
                    }
                }, Ei.asMilliseconds = ki, Ei.asSeconds = wi, Ei.asMinutes = Mi, Ei.asHours = Si, Ei.asDays = Di, Ei.asWeeks = Ci, Ei.asMonths = Pi, Ei.asYears = Ti, Ei.valueOf = function() {
                    return this.isValid() ? this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * w(this._months / 12) : NaN
                }, Ei._bubble = function() {
                    var t, e, i, n, a, r = this._milliseconds,
                        o = this._days,
                        s = this._months,
                        l = this._data;
                    return r >= 0 && o >= 0 && s >= 0 || r <= 0 && o <= 0 && s <= 0 || (r += 864e5 * yi(xi(s) + o), o = 0, s = 0), l.milliseconds = r % 1e3, t = k(r / 1e3), l.seconds = t % 60, e = k(t / 60), l.minutes = e % 60, i = k(e / 60), l.hours = i % 24, s += a = k(bi(o += k(i / 24))), o -= yi(xi(a)), n = k(s / 12), s %= 12, l.days = o, l.months = s, l.years = n, this
                }, Ei.clone = function() {
                    return Ue(this)
                }, Ei.get = function(t) {
                    return t = L(t), this.isValid() ? this[t + "s"]() : NaN
                }, Ei.milliseconds = Ii, Ei.seconds = Ai, Ei.minutes = Fi, Ei.hours = Ri, Ei.days = Li, Ei.weeks = function() {
                    return k(this.days() / 7)
                }, Ei.months = Wi, Ei.years = Yi, Ei.humanize = function(t) {
                    if (!this.isValid()) return this.localeData().invalidDate();
                    var e = this.localeData(),
                        i = function(t, e, i) {
                            var n = Ue(t).abs(),
                                a = Ni(n.as("s")),
                                r = Ni(n.as("m")),
                                o = Ni(n.as("h")),
                                s = Ni(n.as("d")),
                                l = Ni(n.as("M")),
                                h = Ni(n.as("y")),
                                u = a <= zi.ss && ["s", a] || a < zi.s && ["ss", a] || r <= 1 && ["m"] || r < zi.m && ["mm", r] || o <= 1 && ["h"] || o < zi.h && ["hh", o] || s <= 1 && ["d"] || s < zi.d && ["dd", s] || l <= 1 && ["M"] || l < zi.M && ["MM", l] || h <= 1 && ["y"] || ["yy", h];
                            return u[2] = e, u[3] = +t > 0, u[4] = i,
                                function(t, e, i, n, a) {
                                    return a.relativeTime(e || 1, !!i, t, n)
                                }.apply(null, u)
                        }(this, !t, e);
                    return t && (i = e.pastFuture(+this, i)), e.postformat(i)
                }, Ei.toISOString = Bi, Ei.toString = Bi, Ei.toJSON = Bi, Ei.locale = Qe, Ei.localeData = ei, Ei.toIsoString = D("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", Bi), Ei.lang = ti, j("X", 0, 0, "unix"), j("x", 0, 0, "valueOf"), ut("x", rt), ut("X", /[+-]?\d+(\.\d{1,3})?/), gt("X", function(t, e, i) {
                    i._d = new Date(1e3 * parseFloat(t, 10))
                }), gt("x", function(t, e, i) {
                    i._d = new Date(w(t))
                }), n.version = "2.20.1", i = Te;
                return n.fn = ui, n.min = function() {
                    return Ae("isBefore", [].slice.call(arguments, 0))
                }, n.max = function() {
                    return Ae("isAfter", [].slice.call(arguments, 0))
                }, n.now = function() {
                    return Date.now ? Date.now() : +new Date
                }, n.utc = c, n.unix = function(t) {
                    return Te(1e3 * t)
                }, n.months = function(t, e) {
                    return gi(t, e, "months")
                }, n.isDate = l, n.locale = he, n.invalid = p, n.duration = Ue, n.isMoment = _, n.weekdays = function(t, e, i) {
                    return mi(t, e, i, "weekdays")
                }, n.parseZone = function() {
                    return Te.apply(null, arguments).parseZone()
                }, n.localeData = de, n.isDuration = Le, n.monthsShort = function(t, e) {
                    return gi(t, e, "monthsShort")
                }, n.weekdaysMin = function(t, e, i) {
                    return mi(t, e, i, "weekdaysMin")
                }, n.defineLocale = ue, n.updateLocale = function(t, e) {
                    if (null != e) {
                        var i, n, a = ae;
                        null != (n = le(t)) && (a = n._config), (i = new I(e = O(a, e))).parentLocale = re[t], re[t] = i, he(t)
                    } else null != re[t] && (null != re[t].parentLocale ? re[t] = re[t].parentLocale : null != re[t] && delete re[t]);
                    return re[t]
                }, n.locales = function() {
                    return A(re)
                }, n.weekdaysShort = function(t, e, i) {
                    return mi(t, e, i, "weekdaysShort")
                }, n.normalizeUnits = L, n.relativeTimeRounding = function(t) {
                    return void 0 === t ? Ni : "function" == typeof t && (Ni = t, !0)
                }, n.relativeTimeThreshold = function(t, e) {
                    return void 0 !== zi[t] && (void 0 === e ? zi[t] : (zi[t] = e, "s" === t && (zi.ss = e - 1), !0))
                }, n.calendarFormat = function(t, e) {
                    var i = t.diff(e, "days", !0);
                    return i < -6 ? "sameElse" : i < -1 ? "lastWeek" : i < 0 ? "lastDay" : i < 1 ? "sameDay" : i < 2 ? "nextDay" : i < 7 ? "nextWeek" : "sameElse"
                }, n.prototype = ui, n.HTML5_FMT = {
                    DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
                    DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
                    DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
                    DATE: "YYYY-MM-DD",
                    TIME: "HH:mm",
                    TIME_SECONDS: "HH:mm:ss",
                    TIME_MS: "HH:mm:ss.SSS",
                    WEEK: "YYYY-[W]WW",
                    MONTH: "YYYY-MM"
                }, n
            }, "object" == typeof i && void 0 !== e ? e.exports = a() : n.moment = a();
            var n, a
        }, {}],
        7: [function(t, e, i) {
            var n = t(29)();
            n.helpers = t(45), t(27)(n), n.defaults = t(25), n.Element = t(26), n.elements = t(40), n.Interaction = t(28), n.layouts = t(30), n.platform = t(48), n.plugins = t(31), n.Ticks = t(34), t(22)(n), t(23)(n), t(24)(n), t(33)(n), t(32)(n), t(35)(n), t(55)(n), t(53)(n), t(54)(n), t(56)(n), t(57)(n), t(58)(n), t(15)(n), t(16)(n), t(17)(n), t(18)(n), t(19)(n), t(20)(n), t(21)(n), t(8)(n), t(9)(n), t(10)(n), t(11)(n), t(12)(n), t(13)(n), t(14)(n);
            var a = t(49);
            for (var r in a) a.hasOwnProperty(r) && n.plugins.register(a[r]);
            n.platform.initialize(), e.exports = n, "undefined" != typeof window && (window.Chart = n), n.Legend = a.legend._element, n.Title = a.title._element, n.pluginService = n.plugins, n.PluginBase = n.Element.extend({}), n.canvasHelpers = n.helpers.canvas, n.layoutService = n.layouts
        }, {
            10: 10,
            11: 11,
            12: 12,
            13: 13,
            14: 14,
            15: 15,
            16: 16,
            17: 17,
            18: 18,
            19: 19,
            20: 20,
            21: 21,
            22: 22,
            23: 23,
            24: 24,
            25: 25,
            26: 26,
            27: 27,
            28: 28,
            29: 29,
            30: 30,
            31: 31,
            32: 32,
            33: 33,
            34: 34,
            35: 35,
            40: 40,
            45: 45,
            48: 48,
            49: 49,
            53: 53,
            54: 54,
            55: 55,
            56: 56,
            57: 57,
            58: 58,
            8: 8,
            9: 9
        }],
        8: [function(t, e, i) {
            "use strict";
            e.exports = function(t) {
                t.Bar = function(e, i) {
                    return i.type = "bar", new t(e, i)
                }
            }
        }, {}],
        9: [function(t, e, i) {
            "use strict";
            e.exports = function(t) {
                t.Bubble = function(e, i) {
                    return i.type = "bubble", new t(e, i)
                }
            }
        }, {}],
        10: [function(t, e, i) {
            "use strict";
            e.exports = function(t) {
                t.Doughnut = function(e, i) {
                    return i.type = "doughnut", new t(e, i)
                }
            }
        }, {}],
        11: [function(t, e, i) {
            "use strict";
            e.exports = function(t) {
                t.Line = function(e, i) {
                    return i.type = "line", new t(e, i)
                }
            }
        }, {}],
        12: [function(t, e, i) {
            "use strict";
            e.exports = function(t) {
                t.PolarArea = function(e, i) {
                    return i.type = "polarArea", new t(e, i)
                }
            }
        }, {}],
        13: [function(t, e, i) {
            "use strict";
            e.exports = function(t) {
                t.Radar = function(e, i) {
                    return i.type = "radar", new t(e, i)
                }
            }
        }, {}],
        14: [function(t, e, i) {
            "use strict";
            e.exports = function(t) {
                t.Scatter = function(e, i) {
                    return i.type = "scatter", new t(e, i)
                }
            }
        }, {}],
        15: [function(t, e, i) {
            "use strict";
            var n = t(25),
                a = t(40),
                r = t(45);
            n._set("bar", {
                hover: {
                    mode: "label"
                },
                scales: {
                    xAxes: [{
                        type: "category",
                        categoryPercentage: .8,
                        barPercentage: .9,
                        offset: !0,
                        gridLines: {
                            offsetGridLines: !0
                        }
                    }],
                    yAxes: [{
                        type: "linear"
                    }]
                }
            }), n._set("horizontalBar", {
                hover: {
                    mode: "index",
                    axis: "y"
                },
                scales: {
                    xAxes: [{
                        type: "linear",
                        position: "bottom"
                    }],
                    yAxes: [{
                        position: "left",
                        type: "category",
                        categoryPercentage: .8,
                        barPercentage: .9,
                        offset: !0,
                        gridLines: {
                            offsetGridLines: !0
                        }
                    }]
                },
                elements: {
                    rectangle: {
                        borderSkipped: "left"
                    }
                },
                tooltips: {
                    callbacks: {
                        title: function(t, e) {
                            var i = "";
                            return t.length > 0 && (t[0].yLabel ? i = t[0].yLabel : e.labels.length > 0 && t[0].index < e.labels.length && (i = e.labels[t[0].index])), i
                        },
                        label: function(t, e) {
                            return (e.datasets[t.datasetIndex].label || "") + ": " + t.xLabel
                        }
                    },
                    mode: "index",
                    axis: "y"
                }
            });
            e.exports = function(t) {
                t.controllers.bar = t.DatasetController.extend({
                    dataElementType: a.Rectangle,
                    initialize: function() {
                        var e;
                        t.DatasetController.prototype.initialize.apply(this, arguments), (e = this.getMeta()).stack = this.getDataset().stack, e.bar = !0
                    },
                    update: function(t) {
                        var e, i, n = this.getMeta().data;
                        for (this._ruler = this.getRuler(), e = 0, i = n.length; e < i; ++e) this.updateElement(n[e], e, t)
                    },
                    updateElement: function(t, e, i) {
                        var n = this.chart,
                            a = this.getMeta(),
                            o = this.getDataset(),
                            s = t.custom || {},
                            l = n.options.elements.rectangle;
                        t._xScale = this.getScaleForId(a.xAxisID), t._yScale = this.getScaleForId(a.yAxisID), t._datasetIndex = this.index, t._index = e, t._model = {
                            datasetLabel: o.label,
                            label: n.data.labels[e],
                            borderSkipped: s.borderSkipped ? s.borderSkipped : l.borderSkipped,
                            backgroundColor: s.backgroundColor ? s.backgroundColor : r.valueAtIndexOrDefault(o.backgroundColor, e, l.backgroundColor),
                            borderColor: s.borderColor ? s.borderColor : r.valueAtIndexOrDefault(o.borderColor, e, l.borderColor),
                            borderWidth: s.borderWidth ? s.borderWidth : r.valueAtIndexOrDefault(o.borderWidth, e, l.borderWidth)
                        }, this.updateElementGeometry(t, e, i), t.pivot()
                    },
                    updateElementGeometry: function(t, e, i) {
                        var n = t._model,
                            a = this.getValueScale(),
                            r = a.getBasePixel(),
                            o = a.isHorizontal(),
                            s = this._ruler || this.getRuler(),
                            l = this.calculateBarValuePixels(this.index, e),
                            h = this.calculateBarIndexPixels(this.index, e, s);
                        n.horizontal = o, n.base = i ? r : l.base, n.x = o ? i ? r : l.head : h.center, n.y = o ? h.center : i ? r : l.head, n.height = o ? h.size : void 0, n.width = o ? void 0 : h.size
                    },
                    getValueScaleId: function() {
                        return this.getMeta().yAxisID
                    },
                    getIndexScaleId: function() {
                        return this.getMeta().xAxisID
                    },
                    getValueScale: function() {
                        return this.getScaleForId(this.getValueScaleId())
                    },
                    getIndexScale: function() {
                        return this.getScaleForId(this.getIndexScaleId())
                    },
                    _getStacks: function(t) {
                        var e, i, n = this.chart,
                            a = this.getIndexScale().options.stacked,
                            r = void 0 === t ? n.data.datasets.length : t + 1,
                            o = [];
                        for (e = 0; e < r; ++e)(i = n.getDatasetMeta(e)).bar && n.isDatasetVisible(e) && (!1 === a || !0 === a && -1 === o.indexOf(i.stack) || void 0 === a && (void 0 === i.stack || -1 === o.indexOf(i.stack))) && o.push(i.stack);
                        return o
                    },
                    getStackCount: function() {
                        return this._getStacks().length
                    },
                    getStackIndex: function(t, e) {
                        var i = this._getStacks(t),
                            n = void 0 !== e ? i.indexOf(e) : -1;
                        return -1 === n ? i.length - 1 : n
                    },
                    getRuler: function() {
                        var t, e, i = this.getIndexScale(),
                            n = this.getStackCount(),
                            a = this.index,
                            o = i.isHorizontal(),
                            s = o ? i.left : i.top,
                            l = s + (o ? i.width : i.height),
                            h = [];
                        for (t = 0, e = this.getMeta().data.length; t < e; ++t) h.push(i.getPixelForValue(null, t, a));
                        return {
                            min: r.isNullOrUndef(i.options.barThickness) ? function(t, e) {
                                var i, n, a, r, o = t.isHorizontal() ? t.width : t.height,
                                    s = t.getTicks();
                                for (a = 1, r = e.length; a < r; ++a) o = Math.min(o, e[a] - e[a - 1]);
                                for (a = 0, r = s.length; a < r; ++a) n = t.getPixelForTick(a), o = a > 0 ? Math.min(o, n - i) : o, i = n;
                                return o
                            }(i, h) : -1,
                            pixels: h,
                            start: s,
                            end: l,
                            stackCount: n,
                            scale: i
                        }
                    },
                    calculateBarValuePixels: function(t, e) {
                        var i, n, a, r, o, s, l = this.chart,
                            h = this.getMeta(),
                            u = this.getValueScale(),
                            d = l.data.datasets,
                            c = u.getRightValue(d[t].data[e]),
                            f = u.options.stacked,
                            g = h.stack,
                            m = 0;
                        if (f || void 0 === f && void 0 !== g)
                            for (i = 0; i < t; ++i)(n = l.getDatasetMeta(i)).bar && n.stack === g && n.controller.getValueScaleId() === u.id && l.isDatasetVisible(i) && (a = u.getRightValue(d[i].data[e]), (c < 0 && a < 0 || c >= 0 && a > 0) && (m += a));
                        return r = u.getPixelForValue(m), {
                            size: s = ((o = u.getPixelForValue(m + c)) - r) / 2,
                            base: r,
                            head: o,
                            center: o + s / 2
                        }
                    },
                    calculateBarIndexPixels: function(t, e, i) {
                        var n = i.scale.options,
                            a = "flex" === n.barThickness ? function(t, e, i) {
                                var n, a = e.pixels,
                                    r = a[t],
                                    o = t > 0 ? a[t - 1] : null,
                                    s = t < a.length - 1 ? a[t + 1] : null,
                                    l = i.categoryPercentage;
                                return null === o && (o = r - (null === s ? e.end - r : s - r)), null === s && (s = r + r - o), n = r - (r - o) / 2 * l, {
                                    chunk: (s - o) / 2 * l / e.stackCount,
                                    ratio: i.barPercentage,
                                    start: n
                                }
                            }(e, i, n) : function(t, e, i) {
                                var n, a, o = i.barThickness,
                                    s = e.stackCount,
                                    l = e.pixels[t];
                                return r.isNullOrUndef(o) ? (n = e.min * i.categoryPercentage, a = i.barPercentage) : (n = o * s, a = 1), {
                                    chunk: n / s,
                                    ratio: a,
                                    start: l - n / 2
                                }
                            }(e, i, n),
                            o = this.getStackIndex(t, this.getMeta().stack),
                            s = a.start + a.chunk * o + a.chunk / 2,
                            l = Math.min(r.valueOrDefault(n.maxBarThickness, 1 / 0), a.chunk * a.ratio);
                        return {
                            base: s - l / 2,
                            head: s + l / 2,
                            center: s,
                            size: l
                        }
                    },
                    draw: function() {
                        var t = this.chart,
                            e = this.getValueScale(),
                            i = this.getMeta().data,
                            n = this.getDataset(),
                            a = i.length,
                            o = 0;
                        for (r.canvas.clipArea(t.ctx, t.chartArea); o < a; ++o) isNaN(e.getRightValue(n.data[o])) || i[o].draw();
                        r.canvas.unclipArea(t.ctx)
                    },
                    setHoverStyle: function(t) {
                        var e = this.chart.data.datasets[t._datasetIndex],
                            i = t._index,
                            n = t.custom || {},
                            a = t._model;
                        a.backgroundColor = n.hoverBackgroundColor ? n.hoverBackgroundColor : r.valueAtIndexOrDefault(e.hoverBackgroundColor, i, r.getHoverColor(a.backgroundColor)), a.borderColor = n.hoverBorderColor ? n.hoverBorderColor : r.valueAtIndexOrDefault(e.hoverBorderColor, i, r.getHoverColor(a.borderColor)), a.borderWidth = n.hoverBorderWidth ? n.hoverBorderWidth : r.valueAtIndexOrDefault(e.hoverBorderWidth, i, a.borderWidth)
                    },
                    removeHoverStyle: function(t) {
                        var e = this.chart.data.datasets[t._datasetIndex],
                            i = t._index,
                            n = t.custom || {},
                            a = t._model,
                            o = this.chart.options.elements.rectangle;
                        a.backgroundColor = n.backgroundColor ? n.backgroundColor : r.valueAtIndexOrDefault(e.backgroundColor, i, o.backgroundColor), a.borderColor = n.borderColor ? n.borderColor : r.valueAtIndexOrDefault(e.borderColor, i, o.borderColor), a.borderWidth = n.borderWidth ? n.borderWidth : r.valueAtIndexOrDefault(e.borderWidth, i, o.borderWidth)
                    }
                }), t.controllers.horizontalBar = t.controllers.bar.extend({
                    getValueScaleId: function() {
                        return this.getMeta().xAxisID
                    },
                    getIndexScaleId: function() {
                        return this.getMeta().yAxisID
                    }
                })
            }
        }, {
            25: 25,
            40: 40,
            45: 45
        }],
        16: [function(t, e, i) {
            "use strict";
            var n = t(25),
                a = t(40),
                r = t(45);
            n._set("bubble", {
                hover: {
                    mode: "single"
                },
                scales: {
                    xAxes: [{
                        type: "linear",
                        position: "bottom",
                        id: "x-axis-0"
                    }],
                    yAxes: [{
                        type: "linear",
                        position: "left",
                        id: "y-axis-0"
                    }]
                },
                tooltips: {
                    callbacks: {
                        title: function() {
                            return ""
                        },
                        label: function(t, e) {
                            var i = e.datasets[t.datasetIndex].label || "",
                                n = e.datasets[t.datasetIndex].data[t.index];
                            return i + ": (" + t.xLabel + ", " + t.yLabel + ", " + n.r + ")"
                        }
                    }
                }
            }), e.exports = function(t) {
                t.controllers.bubble = t.DatasetController.extend({
                    dataElementType: a.Point,
                    update: function(t) {
                        var e = this,
                            i = e.getMeta().data;
                        r.each(i, function(i, n) {
                            e.updateElement(i, n, t)
                        })
                    },
                    updateElement: function(t, e, i) {
                        var n = this.getMeta(),
                            a = t.custom || {},
                            r = this.getScaleForId(n.xAxisID),
                            o = this.getScaleForId(n.yAxisID),
                            s = this._resolveElementOptions(t, e),
                            l = this.getDataset().data[e],
                            h = this.index,
                            u = i ? r.getPixelForDecimal(.5) : r.getPixelForValue("object" == typeof l ? l : NaN, e, h),
                            d = i ? o.getBasePixel() : o.getPixelForValue(l, e, h);
                        t._xScale = r, t._yScale = o, t._options = s, t._datasetIndex = h, t._index = e, t._model = {
                            backgroundColor: s.backgroundColor,
                            borderColor: s.borderColor,
                            borderWidth: s.borderWidth,
                            hitRadius: s.hitRadius,
                            pointStyle: s.pointStyle,
                            radius: i ? 0 : s.radius,
                            skip: a.skip || isNaN(u) || isNaN(d),
                            x: u,
                            y: d
                        }, t.pivot()
                    },
                    setHoverStyle: function(t) {
                        var e = t._model,
                            i = t._options;
                        e.backgroundColor = r.valueOrDefault(i.hoverBackgroundColor, r.getHoverColor(i.backgroundColor)), e.borderColor = r.valueOrDefault(i.hoverBorderColor, r.getHoverColor(i.borderColor)), e.borderWidth = r.valueOrDefault(i.hoverBorderWidth, i.borderWidth), e.radius = i.radius + i.hoverRadius
                    },
                    removeHoverStyle: function(t) {
                        var e = t._model,
                            i = t._options;
                        e.backgroundColor = i.backgroundColor, e.borderColor = i.borderColor, e.borderWidth = i.borderWidth, e.radius = i.radius
                    },
                    _resolveElementOptions: function(t, e) {
                        var i, n, a, o = this.chart,
                            s = o.data.datasets[this.index],
                            l = t.custom || {},
                            h = o.options.elements.point,
                            u = r.options.resolve,
                            d = s.data[e],
                            c = {},
                            f = {
                                chart: o,
                                dataIndex: e,
                                dataset: s,
                                datasetIndex: this.index
                            },
                            g = ["backgroundColor", "borderColor", "borderWidth", "hoverBackgroundColor", "hoverBorderColor", "hoverBorderWidth", "hoverRadius", "hitRadius", "pointStyle"];
                        for (i = 0, n = g.length; i < n; ++i) c[a = g[i]] = u([l[a], s[a], h[a]], f, e);
                        return c.radius = u([l.radius, d ? d.r : void 0, s.radius, h.radius], f, e), c
                    }
                })
            }
        }, {
            25: 25,
            40: 40,
            45: 45
        }],
        17: [function(t, e, i) {
            "use strict";
            var n = t(25),
                a = t(40),
                r = t(45);
            n._set("doughnut", {
                animation: {
                    animateRotate: !0,
                    animateScale: !1
                },
                hover: {
                    mode: "single"
                },
                legendCallback: function(t) {
                    var e = [];
                    e.push('<ul class="' + t.id + '-legend">');
                    var i = t.data,
                        n = i.datasets,
                        a = i.labels;
                    if (n.length)
                        for (var r = 0; r < n[0].data.length; ++r) e.push('<li><span style="background-color:' + n[0].backgroundColor[r] + '"></span>'), a[r] && e.push(a[r]), e.push("</li>");
                    return e.push("</ul>"), e.join("")
                },
                legend: {
                    labels: {
                        generateLabels: function(t) {
                            var e = t.data;
                            return e.labels.length && e.datasets.length ? e.labels.map(function(i, n) {
                                var a = t.getDatasetMeta(0),
                                    o = e.datasets[0],
                                    s = a.data[n],
                                    l = s && s.custom || {},
                                    h = r.valueAtIndexOrDefault,
                                    u = t.options.elements.arc;
                                return {
                                    text: i,
                                    fillStyle: l.backgroundColor ? l.backgroundColor : h(o.backgroundColor, n, u.backgroundColor),
                                    strokeStyle: l.borderColor ? l.borderColor : h(o.borderColor, n, u.borderColor),
                                    lineWidth: l.borderWidth ? l.borderWidth : h(o.borderWidth, n, u.borderWidth),
                                    hidden: isNaN(o.data[n]) || a.data[n].hidden,
                                    index: n
                                }
                            }) : []
                        }
                    },
                    onClick: function(t, e) {
                        var i, n, a, r = e.index,
                            o = this.chart;
                        for (i = 0, n = (o.data.datasets || []).length; i < n; ++i)(a = o.getDatasetMeta(i)).data[r] && (a.data[r].hidden = !a.data[r].hidden);
                        o.update()
                    }
                },
                cutoutPercentage: 50,
                rotation: -.5 * Math.PI,
                circumference: 2 * Math.PI,
                tooltips: {
                    callbacks: {
                        title: function() {
                            return ""
                        },
                        label: function(t, e) {
                            var i = e.labels[t.index],
                                n = ": " + e.datasets[t.datasetIndex].data[t.index];
                            return r.isArray(i) ? (i = i.slice())[0] += n : i += n, i
                        }
                    }
                }
            }), n._set("pie", r.clone(n.doughnut)), n._set("pie", {
                cutoutPercentage: 0
            }), e.exports = function(t) {
                t.controllers.doughnut = t.controllers.pie = t.DatasetController.extend({
                    dataElementType: a.Arc,
                    linkScales: r.noop,
                    getRingIndex: function(t) {
                        for (var e = 0, i = 0; i < t; ++i) this.chart.isDatasetVisible(i) && ++e;
                        return e
                    },
                    update: function(t) {
                        var e = this,
                            i = e.chart,
                            n = i.chartArea,
                            a = i.options,
                            o = a.elements.arc,
                            s = n.right - n.left - o.borderWidth,
                            l = n.bottom - n.top - o.borderWidth,
                            h = Math.min(s, l),
                            u = {
                                x: 0,
                                y: 0
                            },
                            d = e.getMeta(),
                            c = a.cutoutPercentage,
                            f = a.circumference;
                        if (f < 2 * Math.PI) {
                            var g = a.rotation % (2 * Math.PI),
                                m = (g += 2 * Math.PI * (g >= Math.PI ? -1 : g < -Math.PI ? 1 : 0)) + f,
                                p = {
                                    x: Math.cos(g),
                                    y: Math.sin(g)
                                },
                                v = {
                                    x: Math.cos(m),
                                    y: Math.sin(m)
                                },
                                y = g <= 0 && m >= 0 || g <= 2 * Math.PI && 2 * Math.PI <= m,
                                b = g <= .5 * Math.PI && .5 * Math.PI <= m || g <= 2.5 * Math.PI && 2.5 * Math.PI <= m,
                                x = g <= -Math.PI && -Math.PI <= m || g <= Math.PI && Math.PI <= m,
                                _ = g <= .5 * -Math.PI && .5 * -Math.PI <= m || g <= 1.5 * Math.PI && 1.5 * Math.PI <= m,
                                k = c / 100,
                                w = {
                                    x: x ? -1 : Math.min(p.x * (p.x < 0 ? 1 : k), v.x * (v.x < 0 ? 1 : k)),
                                    y: _ ? -1 : Math.min(p.y * (p.y < 0 ? 1 : k), v.y * (v.y < 0 ? 1 : k))
                                },
                                M = {
                                    x: y ? 1 : Math.max(p.x * (p.x > 0 ? 1 : k), v.x * (v.x > 0 ? 1 : k)),
                                    y: b ? 1 : Math.max(p.y * (p.y > 0 ? 1 : k), v.y * (v.y > 0 ? 1 : k))
                                },
                                S = {
                                    width: .5 * (M.x - w.x),
                                    height: .5 * (M.y - w.y)
                                };
                            h = Math.min(s / S.width, l / S.height), u = {
                                x: -.5 * (M.x + w.x),
                                y: -.5 * (M.y + w.y)
                            }
                        }
                        i.borderWidth = e.getMaxBorderWidth(d.data), i.outerRadius = Math.max((h - i.borderWidth) / 2, 0), i.innerRadius = Math.max(c ? i.outerRadius / 100 * c : 0, 0), i.radiusLength = (i.outerRadius - i.innerRadius) / i.getVisibleDatasetCount(), i.offsetX = u.x * i.outerRadius, i.offsetY = u.y * i.outerRadius, d.total = e.calculateTotal(), e.outerRadius = i.outerRadius - i.radiusLength * e.getRingIndex(e.index), e.innerRadius = Math.max(e.outerRadius - i.radiusLength, 0), r.each(d.data, function(i, n) {
                            e.updateElement(i, n, t)
                        })
                    },
                    updateElement: function(t, e, i) {
                        var n = this.chart,
                            a = n.chartArea,
                            o = n.options,
                            s = o.animation,
                            l = (a.left + a.right) / 2,
                            h = (a.top + a.bottom) / 2,
                            u = o.rotation,
                            d = o.rotation,
                            c = this.getDataset(),
                            f = i && s.animateRotate ? 0 : t.hidden ? 0 : this.calculateCircumference(c.data[e]) * (o.circumference / (2 * Math.PI)),
                            g = i && s.animateScale ? 0 : this.innerRadius,
                            m = i && s.animateScale ? 0 : this.outerRadius,
                            p = r.valueAtIndexOrDefault;
                        r.extend(t, {
                            _datasetIndex: this.index,
                            _index: e,
                            _model: {
                                x: l + n.offsetX,
                                y: h + n.offsetY,
                                startAngle: u,
                                endAngle: d,
                                circumference: f,
                                outerRadius: m,
                                innerRadius: g,
                                label: p(c.label, e, n.data.labels[e])
                            }
                        });
                        var v = t._model;
                        this.removeHoverStyle(t), i && s.animateRotate || (v.startAngle = 0 === e ? o.rotation : this.getMeta().data[e - 1]._model.endAngle, v.endAngle = v.startAngle + v.circumference), t.pivot()
                    },
                    removeHoverStyle: function(e) {
                        t.DatasetController.prototype.removeHoverStyle.call(this, e, this.chart.options.elements.arc)
                    },
                    calculateTotal: function() {
                        var t, e = this.getDataset(),
                            i = this.getMeta(),
                            n = 0;
                        return r.each(i.data, function(i, a) {
                            t = e.data[a], isNaN(t) || i.hidden || (n += Math.abs(t))
                        }), n
                    },
                    calculateCircumference: function(t) {
                        var e = this.getMeta().total;
                        return e > 0 && !isNaN(t) ? 2 * Math.PI * (Math.abs(t) / e) : 0
                    },
                    getMaxBorderWidth: function(t) {
                        for (var e, i, n = 0, a = this.index, r = t.length, o = 0; o < r; o++) e = t[o]._model ? t[o]._model.borderWidth : 0, n = (i = t[o]._chart ? t[o]._chart.config.data.datasets[a].hoverBorderWidth : 0) > (n = e > n ? e : n) ? i : n;
                        return n
                    }
                })
            }
        }, {
            25: 25,
            40: 40,
            45: 45
        }],
        18: [function(t, e, i) {
            "use strict";
            var n = t(25),
                a = t(40),
                r = t(45);
            n._set("line", {
                showLines: !0,
                spanGaps: !1,
                hover: {
                    mode: "label"
                },
                scales: {
                    xAxes: [{
                        type: "category",
                        id: "x-axis-0"
                    }],
                    yAxes: [{
                        type: "linear",
                        id: "y-axis-0"
                    }]
                }
            }), e.exports = function(t) {
                function e(t, e) {
                    return r.valueOrDefault(t.showLine, e.showLines)
                }
                t.controllers.line = t.DatasetController.extend({
                    datasetElementType: a.Line,
                    dataElementType: a.Point,
                    update: function(t) {
                        var i, n, a, o = this.getMeta(),
                            s = o.dataset,
                            l = o.data || [],
                            h = this.chart.options,
                            u = h.elements.line,
                            d = this.getScaleForId(o.yAxisID),
                            c = this.getDataset(),
                            f = e(c, h);
                        for (f && (a = s.custom || {}, void 0 !== c.tension && void 0 === c.lineTension && (c.lineTension = c.tension), s._scale = d, s._datasetIndex = this.index, s._children = l, s._model = {
                                spanGaps: c.spanGaps ? c.spanGaps : h.spanGaps,
                                tension: a.tension ? a.tension : r.valueOrDefault(c.lineTension, u.tension),
                                backgroundColor: a.backgroundColor ? a.backgroundColor : c.backgroundColor || u.backgroundColor,
                                borderWidth: a.borderWidth ? a.borderWidth : c.borderWidth || u.borderWidth,
                                borderColor: a.borderColor ? a.borderColor : c.borderColor || u.borderColor,
                                borderCapStyle: a.borderCapStyle ? a.borderCapStyle : c.borderCapStyle || u.borderCapStyle,
                                borderDash: a.borderDash ? a.borderDash : c.borderDash || u.borderDash,
                                borderDashOffset: a.borderDashOffset ? a.borderDashOffset : c.borderDashOffset || u.borderDashOffset,
                                borderJoinStyle: a.borderJoinStyle ? a.borderJoinStyle : c.borderJoinStyle || u.borderJoinStyle,
                                fill: a.fill ? a.fill : void 0 !== c.fill ? c.fill : u.fill,
                                steppedLine: a.steppedLine ? a.steppedLine : r.valueOrDefault(c.steppedLine, u.stepped),
                                cubicInterpolationMode: a.cubicInterpolationMode ? a.cubicInterpolationMode : r.valueOrDefault(c.cubicInterpolationMode, u.cubicInterpolationMode)
                            }, s.pivot()), i = 0, n = l.length; i < n; ++i) this.updateElement(l[i], i, t);
                        for (f && 0 !== s._model.tension && this.updateBezierControlPoints(), i = 0, n = l.length; i < n; ++i) l[i].pivot()
                    },
                    getPointBackgroundColor: function(t, e) {
                        var i = this.chart.options.elements.point.backgroundColor,
                            n = this.getDataset(),
                            a = t.custom || {};
                        return a.backgroundColor ? i = a.backgroundColor : n.pointBackgroundColor ? i = r.valueAtIndexOrDefault(n.pointBackgroundColor, e, i) : n.backgroundColor && (i = n.backgroundColor), i
                    },
                    getPointBorderColor: function(t, e) {
                        var i = this.chart.options.elements.point.borderColor,
                            n = this.getDataset(),
                            a = t.custom || {};
                        return a.borderColor ? i = a.borderColor : n.pointBorderColor ? i = r.valueAtIndexOrDefault(n.pointBorderColor, e, i) : n.borderColor && (i = n.borderColor), i
                    },
                    getPointBorderWidth: function(t, e) {
                        var i = this.chart.options.elements.point.borderWidth,
                            n = this.getDataset(),
                            a = t.custom || {};
                        return isNaN(a.borderWidth) ? !isNaN(n.pointBorderWidth) || r.isArray(n.pointBorderWidth) ? i = r.valueAtIndexOrDefault(n.pointBorderWidth, e, i) : isNaN(n.borderWidth) || (i = n.borderWidth) : i = a.borderWidth, i
                    },
                    updateElement: function(t, e, i) {
                        var n, a, o = this.getMeta(),
                            s = t.custom || {},
                            l = this.getDataset(),
                            h = this.index,
                            u = l.data[e],
                            d = this.getScaleForId(o.yAxisID),
                            c = this.getScaleForId(o.xAxisID),
                            f = this.chart.options.elements.point;
                        void 0 !== l.radius && void 0 === l.pointRadius && (l.pointRadius = l.radius), void 0 !== l.hitRadius && void 0 === l.pointHitRadius && (l.pointHitRadius = l.hitRadius), n = c.getPixelForValue("object" == typeof u ? u : NaN, e, h), a = i ? d.getBasePixel() : this.calculatePointY(u, e, h), t._xScale = c, t._yScale = d, t._datasetIndex = h, t._index = e, t._model = {
                            x: n,
                            y: a,
                            skip: s.skip || isNaN(n) || isNaN(a),
                            radius: s.radius || r.valueAtIndexOrDefault(l.pointRadius, e, f.radius),
                            pointStyle: s.pointStyle || r.valueAtIndexOrDefault(l.pointStyle, e, f.pointStyle),
                            backgroundColor: this.getPointBackgroundColor(t, e),
                            borderColor: this.getPointBorderColor(t, e),
                            borderWidth: this.getPointBorderWidth(t, e),
                            tension: o.dataset._model ? o.dataset._model.tension : 0,
                            steppedLine: !!o.dataset._model && o.dataset._model.steppedLine,
                            hitRadius: s.hitRadius || r.valueAtIndexOrDefault(l.pointHitRadius, e, f.hitRadius)
                        }
                    },
                    calculatePointY: function(t, e, i) {
                        var n, a, r, o = this.chart,
                            s = this.getMeta(),
                            l = this.getScaleForId(s.yAxisID),
                            h = 0,
                            u = 0;
                        if (l.options.stacked) {
                            for (n = 0; n < i; n++)
                                if (a = o.data.datasets[n], "line" === (r = o.getDatasetMeta(n)).type && r.yAxisID === l.id && o.isDatasetVisible(n)) {
                                    var d = Number(l.getRightValue(a.data[e]));
                                    d < 0 ? u += d || 0 : h += d || 0
                                } var c = Number(l.getRightValue(t));
                            return c < 0 ? l.getPixelForValue(u + c) : l.getPixelForValue(h + c)
                        }
                        return l.getPixelForValue(t)
                    },
                    updateBezierControlPoints: function() {
                        var t, e, i, n, a = this.getMeta(),
                            o = this.chart.chartArea,
                            s = a.data || [];
                        a.dataset._model.spanGaps && (s = s.filter(function(t) {
                            return !t._model.skip
                        }));

                        function l(t, e, i) {
                            return Math.max(Math.min(t, i), e)
                        }
                        if ("monotone" === a.dataset._model.cubicInterpolationMode) r.splineCurveMonotone(s);
                        else
                            for (t = 0, e = s.length; t < e; ++t) i = s[t]._model, n = r.splineCurve(r.previousItem(s, t)._model, i, r.nextItem(s, t)._model, a.dataset._model.tension), i.controlPointPreviousX = n.previous.x, i.controlPointPreviousY = n.previous.y, i.controlPointNextX = n.next.x, i.controlPointNextY = n.next.y;
                        if (this.chart.options.elements.line.capBezierPoints)
                            for (t = 0, e = s.length; t < e; ++t)(i = s[t]._model).controlPointPreviousX = l(i.controlPointPreviousX, o.left, o.right), i.controlPointPreviousY = l(i.controlPointPreviousY, o.top, o.bottom), i.controlPointNextX = l(i.controlPointNextX, o.left, o.right), i.controlPointNextY = l(i.controlPointNextY, o.top, o.bottom)
                    },
                    draw: function() {
                        var t = this.chart,
                            i = this.getMeta(),
                            n = i.data || [],
                            a = t.chartArea,
                            o = n.length,
                            s = 0;
                        for (r.canvas.clipArea(t.ctx, a), e(this.getDataset(), t.options) && i.dataset.draw(), r.canvas.unclipArea(t.ctx); s < o; ++s) n[s].draw(a)
                    },
                    setHoverStyle: function(t) {
                        var e = this.chart.data.datasets[t._datasetIndex],
                            i = t._index,
                            n = t.custom || {},
                            a = t._model;
                        a.radius = n.hoverRadius || r.valueAtIndexOrDefault(e.pointHoverRadius, i, this.chart.options.elements.point.hoverRadius), a.backgroundColor = n.hoverBackgroundColor || r.valueAtIndexOrDefault(e.pointHoverBackgroundColor, i, r.getHoverColor(a.backgroundColor)), a.borderColor = n.hoverBorderColor || r.valueAtIndexOrDefault(e.pointHoverBorderColor, i, r.getHoverColor(a.borderColor)), a.borderWidth = n.hoverBorderWidth || r.valueAtIndexOrDefault(e.pointHoverBorderWidth, i, a.borderWidth)
                    },
                    removeHoverStyle: function(t) {
                        var e = this.chart.data.datasets[t._datasetIndex],
                            i = t._index,
                            n = t.custom || {},
                            a = t._model;
                        void 0 !== e.radius && void 0 === e.pointRadius && (e.pointRadius = e.radius), a.radius = n.radius || r.valueAtIndexOrDefault(e.pointRadius, i, this.chart.options.elements.point.radius), a.backgroundColor = this.getPointBackgroundColor(t, i), a.borderColor = this.getPointBorderColor(t, i), a.borderWidth = this.getPointBorderWidth(t, i)
                    }
                })
            }
        }, {
            25: 25,
            40: 40,
            45: 45
        }],
        19: [function(t, e, i) {
            "use strict";
            var n = t(25),
                a = t(40),
                r = t(45);
            n._set("polarArea", {
                scale: {
                    type: "radialLinear",
                    angleLines: {
                        display: !1
                    },
                    gridLines: {
                        circular: !0
                    },
                    pointLabels: {
                        display: !1
                    },
                    ticks: {
                        beginAtZero: !0
                    }
                },
                animation: {
                    animateRotate: !0,
                    animateScale: !0
                },
                startAngle: -.5 * Math.PI,
                legendCallback: function(t) {
                    var e = [];
                    e.push('<ul class="' + t.id + '-legend">');
                    var i = t.data,
                        n = i.datasets,
                        a = i.labels;
                    if (n.length)
                        for (var r = 0; r < n[0].data.length; ++r) e.push('<li><span style="background-color:' + n[0].backgroundColor[r] + '"></span>'), a[r] && e.push(a[r]), e.push("</li>");
                    return e.push("</ul>"), e.join("")
                },
                legend: {
                    labels: {
                        generateLabels: function(t) {
                            var e = t.data;
                            return e.labels.length && e.datasets.length ? e.labels.map(function(i, n) {
                                var a = t.getDatasetMeta(0),
                                    o = e.datasets[0],
                                    s = a.data[n].custom || {},
                                    l = r.valueAtIndexOrDefault,
                                    h = t.options.elements.arc;
                                return {
                                    text: i,
                                    fillStyle: s.backgroundColor ? s.backgroundColor : l(o.backgroundColor, n, h.backgroundColor),
                                    strokeStyle: s.borderColor ? s.borderColor : l(o.borderColor, n, h.borderColor),
                                    lineWidth: s.borderWidth ? s.borderWidth : l(o.borderWidth, n, h.borderWidth),
                                    hidden: isNaN(o.data[n]) || a.data[n].hidden,
                                    index: n
                                }
                            }) : []
                        }
                    },
                    onClick: function(t, e) {
                        var i, n, a, r = e.index,
                            o = this.chart;
                        for (i = 0, n = (o.data.datasets || []).length; i < n; ++i)(a = o.getDatasetMeta(i)).data[r].hidden = !a.data[r].hidden;
                        o.update()
                    }
                },
                tooltips: {
                    callbacks: {
                        title: function() {
                            return ""
                        },
                        label: function(t, e) {
                            return e.labels[t.index] + ": " + t.yLabel
                        }
                    }
                }
            }), e.exports = function(t) {
                t.controllers.polarArea = t.DatasetController.extend({
                    dataElementType: a.Arc,
                    linkScales: r.noop,
                    update: function(t) {
                        var e = this,
                            i = e.chart,
                            n = i.chartArea,
                            a = e.getMeta(),
                            o = i.options,
                            s = o.elements.arc,
                            l = Math.min(n.right - n.left, n.bottom - n.top);
                        i.outerRadius = Math.max((l - s.borderWidth / 2) / 2, 0), i.innerRadius = Math.max(o.cutoutPercentage ? i.outerRadius / 100 * o.cutoutPercentage : 1, 0), i.radiusLength = (i.outerRadius - i.innerRadius) / i.getVisibleDatasetCount(), e.outerRadius = i.outerRadius - i.radiusLength * e.index, e.innerRadius = e.outerRadius - i.radiusLength, a.count = e.countVisibleElements(), r.each(a.data, function(i, n) {
                            e.updateElement(i, n, t)
                        })
                    },
                    updateElement: function(t, e, i) {
                        for (var n = this.chart, a = this.getDataset(), o = n.options, s = o.animation, l = n.scale, h = n.data.labels, u = this.calculateCircumference(a.data[e]), d = l.xCenter, c = l.yCenter, f = 0, g = this.getMeta(), m = 0; m < e; ++m) isNaN(a.data[m]) || g.data[m].hidden || ++f;
                        var p = o.startAngle,
                            v = t.hidden ? 0 : l.getDistanceFromCenterForValue(a.data[e]),
                            y = p + u * f,
                            b = y + (t.hidden ? 0 : u),
                            x = s.animateScale ? 0 : l.getDistanceFromCenterForValue(a.data[e]);
                        r.extend(t, {
                            _datasetIndex: this.index,
                            _index: e,
                            _scale: l,
                            _model: {
                                x: d,
                                y: c,
                                innerRadius: 0,
                                outerRadius: i ? x : v,
                                startAngle: i && s.animateRotate ? p : y,
                                endAngle: i && s.animateRotate ? p : b,
                                label: r.valueAtIndexOrDefault(h, e, h[e])
                            }
                        }), this.removeHoverStyle(t), t.pivot()
                    },
                    removeHoverStyle: function(e) {
                        t.DatasetController.prototype.removeHoverStyle.call(this, e, this.chart.options.elements.arc)
                    },
                    countVisibleElements: function() {
                        var t = this.getDataset(),
                            e = this.getMeta(),
                            i = 0;
                        return r.each(e.data, function(e, n) {
                            isNaN(t.data[n]) || e.hidden || i++
                        }), i
                    },
                    calculateCircumference: function(t) {
                        var e = this.getMeta().count;
                        return e > 0 && !isNaN(t) ? 2 * Math.PI / e : 0
                    }
                })
            }
        }, {
            25: 25,
            40: 40,
            45: 45
        }],
        20: [function(t, e, i) {
            "use strict";
            var n = t(25),
                a = t(40),
                r = t(45);
            n._set("radar", {
                scale: {
                    type: "radialLinear"
                },
                elements: {
                    line: {
                        tension: 0
                    }
                }
            }), e.exports = function(t) {
                t.controllers.radar = t.DatasetController.extend({
                    datasetElementType: a.Line,
                    dataElementType: a.Point,
                    linkScales: r.noop,
                    update: function(t) {
                        var e = this,
                            i = e.getMeta(),
                            n = i.dataset,
                            a = i.data,
                            o = n.custom || {},
                            s = e.getDataset(),
                            l = e.chart.options.elements.line,
                            h = e.chart.scale;
                        void 0 !== s.tension && void 0 === s.lineTension && (s.lineTension = s.tension), r.extend(i.dataset, {
                            _datasetIndex: e.index,
                            _scale: h,
                            _children: a,
                            _loop: !0,
                            _model: {
                                tension: o.tension ? o.tension : r.valueOrDefault(s.lineTension, l.tension),
                                backgroundColor: o.backgroundColor ? o.backgroundColor : s.backgroundColor || l.backgroundColor,
                                borderWidth: o.borderWidth ? o.borderWidth : s.borderWidth || l.borderWidth,
                                borderColor: o.borderColor ? o.borderColor : s.borderColor || l.borderColor,
                                fill: o.fill ? o.fill : void 0 !== s.fill ? s.fill : l.fill,
                                borderCapStyle: o.borderCapStyle ? o.borderCapStyle : s.borderCapStyle || l.borderCapStyle,
                                borderDash: o.borderDash ? o.borderDash : s.borderDash || l.borderDash,
                                borderDashOffset: o.borderDashOffset ? o.borderDashOffset : s.borderDashOffset || l.borderDashOffset,
                                borderJoinStyle: o.borderJoinStyle ? o.borderJoinStyle : s.borderJoinStyle || l.borderJoinStyle
                            }
                        }), i.dataset.pivot(), r.each(a, function(i, n) {
                            e.updateElement(i, n, t)
                        }, e), e.updateBezierControlPoints()
                    },
                    updateElement: function(t, e, i) {
                        var n = t.custom || {},
                            a = this.getDataset(),
                            o = this.chart.scale,
                            s = this.chart.options.elements.point,
                            l = o.getPointPositionForValue(e, a.data[e]);
                        void 0 !== a.radius && void 0 === a.pointRadius && (a.pointRadius = a.radius), void 0 !== a.hitRadius && void 0 === a.pointHitRadius && (a.pointHitRadius = a.hitRadius), r.extend(t, {
                            _datasetIndex: this.index,
                            _index: e,
                            _scale: o,
                            _model: {
                                x: i ? o.xCenter : l.x,
                                y: i ? o.yCenter : l.y,
                                tension: n.tension ? n.tension : r.valueOrDefault(a.lineTension, this.chart.options.elements.line.tension),
                                radius: n.radius ? n.radius : r.valueAtIndexOrDefault(a.pointRadius, e, s.radius),
                                backgroundColor: n.backgroundColor ? n.backgroundColor : r.valueAtIndexOrDefault(a.pointBackgroundColor, e, s.backgroundColor),
                                borderColor: n.borderColor ? n.borderColor : r.valueAtIndexOrDefault(a.pointBorderColor, e, s.borderColor),
                                borderWidth: n.borderWidth ? n.borderWidth : r.valueAtIndexOrDefault(a.pointBorderWidth, e, s.borderWidth),
                                pointStyle: n.pointStyle ? n.pointStyle : r.valueAtIndexOrDefault(a.pointStyle, e, s.pointStyle),
                                hitRadius: n.hitRadius ? n.hitRadius : r.valueAtIndexOrDefault(a.pointHitRadius, e, s.hitRadius)
                            }
                        }), t._model.skip = n.skip ? n.skip : isNaN(t._model.x) || isNaN(t._model.y)
                    },
                    updateBezierControlPoints: function() {
                        var t = this.chart.chartArea,
                            e = this.getMeta();
                        r.each(e.data, function(i, n) {
                            var a = i._model,
                                o = r.splineCurve(r.previousItem(e.data, n, !0)._model, a, r.nextItem(e.data, n, !0)._model, a.tension);
                            a.controlPointPreviousX = Math.max(Math.min(o.previous.x, t.right), t.left), a.controlPointPreviousY = Math.max(Math.min(o.previous.y, t.bottom), t.top), a.controlPointNextX = Math.max(Math.min(o.next.x, t.right), t.left), a.controlPointNextY = Math.max(Math.min(o.next.y, t.bottom), t.top), i.pivot()
                        })
                    },
                    setHoverStyle: function(t) {
                        var e = this.chart.data.datasets[t._datasetIndex],
                            i = t.custom || {},
                            n = t._index,
                            a = t._model;
                        a.radius = i.hoverRadius ? i.hoverRadius : r.valueAtIndexOrDefault(e.pointHoverRadius, n, this.chart.options.elements.point.hoverRadius), a.backgroundColor = i.hoverBackgroundColor ? i.hoverBackgroundColor : r.valueAtIndexOrDefault(e.pointHoverBackgroundColor, n, r.getHoverColor(a.backgroundColor)), a.borderColor = i.hoverBorderColor ? i.hoverBorderColor : r.valueAtIndexOrDefault(e.pointHoverBorderColor, n, r.getHoverColor(a.borderColor)), a.borderWidth = i.hoverBorderWidth ? i.hoverBorderWidth : r.valueAtIndexOrDefault(e.pointHoverBorderWidth, n, a.borderWidth)
                    },
                    removeHoverStyle: function(t) {
                        var e = this.chart.data.datasets[t._datasetIndex],
                            i = t.custom || {},
                            n = t._index,
                            a = t._model,
                            o = this.chart.options.elements.point;
                        a.radius = i.radius ? i.radius : r.valueAtIndexOrDefault(e.pointRadius, n, o.radius), a.backgroundColor = i.backgroundColor ? i.backgroundColor : r.valueAtIndexOrDefault(e.pointBackgroundColor, n, o.backgroundColor), a.borderColor = i.borderColor ? i.borderColor : r.valueAtIndexOrDefault(e.pointBorderColor, n, o.borderColor), a.borderWidth = i.borderWidth ? i.borderWidth : r.valueAtIndexOrDefault(e.pointBorderWidth, n, o.borderWidth)
                    }
                })
            }
        }, {
            25: 25,
            40: 40,
            45: 45
        }],
        21: [function(t, e, i) {
            "use strict";
            t(25)._set("scatter", {
                hover: {
                    mode: "single"
                },
                scales: {
                    xAxes: [{
                        id: "x-axis-1",
                        type: "linear",
                        position: "bottom"
                    }],
                    yAxes: [{
                        id: "y-axis-1",
                        type: "linear",
                        position: "left"
                    }]
                },
                showLines: !1,
                tooltips: {
                    callbacks: {
                        title: function() {
                            return ""
                        },
                        label: function(t) {
                            return "(" + t.xLabel + ", " + t.yLabel + ")"
                        }
                    }
                }
            }), e.exports = function(t) {
                t.controllers.scatter = t.controllers.line
            }
        }, {
            25: 25
        }],
        22: [function(t, e, i) {
            "use strict";
            var n = t(25),
                a = t(26),
                r = t(45);
            n._set("global", {
                animation: {
                    duration: 1e3,
                    easing: "easeOutQuart",
                    onProgress: r.noop,
                    onComplete: r.noop
                }
            }), e.exports = function(t) {
                t.Animation = a.extend({
                    chart: null,
                    currentStep: 0,
                    numSteps: 60,
                    easing: "",
                    render: null,
                    onAnimationProgress: null,
                    onAnimationComplete: null
                }), t.animationService = {
                    frameDuration: 17,
                    animations: [],
                    dropFrames: 0,
                    request: null,
                    addAnimation: function(t, e, i, n) {
                        var a, r, o = this.animations;
                        for (e.chart = t, n || (t.animating = !0), a = 0, r = o.length; a < r; ++a)
                            if (o[a].chart === t) return void(o[a] = e);
                        o.push(e), 1 === o.length && this.requestAnimationFrame()
                    },
                    cancelAnimation: function(t) {
                        var e = r.findIndex(this.animations, function(e) {
                            return e.chart === t
                        }); - 1 !== e && (this.animations.splice(e, 1), t.animating = !1)
                    },
                    requestAnimationFrame: function() {
                        var t = this;
                        null === t.request && (t.request = r.requestAnimFrame.call(window, function() {
                            t.request = null, t.startDigest()
                        }))
                    },
                    startDigest: function() {
                        var t = Date.now(),
                            e = 0;
                        this.dropFrames > 1 && (e = Math.floor(this.dropFrames), this.dropFrames = this.dropFrames % 1), this.advance(1 + e);
                        var i = Date.now();
                        this.dropFrames += (i - t) / this.frameDuration, this.animations.length > 0 && this.requestAnimationFrame()
                    },
                    advance: function(t) {
                        for (var e, i, n = this.animations, a = 0; a < n.length;) i = (e = n[a]).chart, e.currentStep = (e.currentStep || 0) + t, e.currentStep = Math.min(e.currentStep, e.numSteps), r.callback(e.render, [i, e], i), r.callback(e.onAnimationProgress, [e], i), e.currentStep >= e.numSteps ? (r.callback(e.onAnimationComplete, [e], i), i.animating = !1, n.splice(a, 1)) : ++a
                    }
                }, Object.defineProperty(t.Animation.prototype, "animationObject", {
                    get: function() {
                        return this
                    }
                }), Object.defineProperty(t.Animation.prototype, "chartInstance", {
                    get: function() {
                        return this.chart
                    },
                    set: function(t) {
                        this.chart = t
                    }
                })
            }
        }, {
            25: 25,
            26: 26,
            45: 45
        }],
        23: [function(t, e, i) {
            "use strict";
            var n = t(25),
                a = t(45),
                r = t(28),
                o = t(30),
                s = t(48),
                l = t(31);
            e.exports = function(t) {
                t.types = {}, t.instances = {}, t.controllers = {};

                function e(t) {
                    return "top" === t || "bottom" === t
                }
                a.extend(t.prototype, {
                    construct: function(e, i) {
                        var r = this;
                        i = function(t) {
                            var e = (t = t || {}).data = t.data || {};
                            return e.datasets = e.datasets || [], e.labels = e.labels || [], t.options = a.configMerge(n.global, n[t.type], t.options || {}), t
                        }(i);
                        var o = s.acquireContext(e, i),
                            l = o && o.canvas,
                            h = l && l.height,
                            u = l && l.width;
                        r.id = a.uid(), r.ctx = o, r.canvas = l, r.config = i, r.width = u, r.height = h, r.aspectRatio = h ? u / h : null, r.options = i.options, r._bufferedRender = !1, r.chart = r, r.controller = r, t.instances[r.id] = r, Object.defineProperty(r, "data", {
                            get: function() {
                                return r.config.data
                            },
                            set: function(t) {
                                r.config.data = t
                            }
                        }), o && l ? (r.initialize(), r.update()) : console.error("Failed to create chart: can't acquire context from the given item")
                    },
                    initialize: function() {
                        return l.notify(this, "beforeInit"), a.retinaScale(this, this.options.devicePixelRatio), this.bindEvents(), this.options.responsive && this.resize(!0), this.ensureScalesHaveIDs(), this.buildOrUpdateScales(), this.initToolTip(), l.notify(this, "afterInit"), this
                    },
                    clear: function() {
                        return a.canvas.clear(this), this
                    },
                    stop: function() {
                        return t.animationService.cancelAnimation(this), this
                    },
                    resize: function(t) {
                        var e = this.options,
                            i = this.canvas,
                            n = e.maintainAspectRatio && this.aspectRatio || null,
                            r = Math.max(0, Math.floor(a.getMaximumWidth(i))),
                            o = Math.max(0, Math.floor(n ? r / n : a.getMaximumHeight(i)));
                        if ((this.width !== r || this.height !== o) && (i.width = this.width = r, i.height = this.height = o, i.style.width = r + "px", i.style.height = o + "px", a.retinaScale(this, e.devicePixelRatio), !t)) {
                            var s = {
                                width: r,
                                height: o
                            };
                            l.notify(this, "resize", [s]), this.options.onResize && this.options.onResize(this, s), this.stop(), this.update(this.options.responsiveAnimationDuration)
                        }
                    },
                    ensureScalesHaveIDs: function() {
                        var t = this.options,
                            e = t.scales || {},
                            i = t.scale;
                        a.each(e.xAxes, function(t, e) {
                            t.id = t.id || "x-axis-" + e
                        }), a.each(e.yAxes, function(t, e) {
                            t.id = t.id || "y-axis-" + e
                        }), i && (i.id = i.id || "scale")
                    },
                    buildOrUpdateScales: function() {
                        var i = this,
                            n = i.options,
                            r = i.scales || {},
                            o = [],
                            s = Object.keys(r).reduce(function(t, e) {
                                return t[e] = !1, t
                            }, {});
                        n.scales && (o = o.concat((n.scales.xAxes || []).map(function(t) {
                            return {
                                options: t,
                                dtype: "category",
                                dposition: "bottom"
                            }
                        }), (n.scales.yAxes || []).map(function(t) {
                            return {
                                options: t,
                                dtype: "linear",
                                dposition: "left"
                            }
                        }))), n.scale && o.push({
                            options: n.scale,
                            dtype: "radialLinear",
                            isDefault: !0,
                            dposition: "chartArea"
                        }), a.each(o, function(n) {
                            var o = n.options,
                                l = o.id,
                                h = a.valueOrDefault(o.type, n.dtype);
                            e(o.position) !== e(n.dposition) && (o.position = n.dposition), s[l] = !0;
                            var u = null;
                            if (l in r && r[l].type === h)(u = r[l]).options = o, u.ctx = i.ctx, u.chart = i;
                            else {
                                var d = t.scaleService.getScaleConstructor(h);
                                if (!d) return;
                                u = new d({
                                    id: l,
                                    type: h,
                                    options: o,
                                    ctx: i.ctx,
                                    chart: i
                                }), r[u.id] = u
                            }
                            u.mergeTicksOptions(), n.isDefault && (i.scale = u)
                        }), a.each(s, function(t, e) {
                            t || delete r[e]
                        }), i.scales = r, t.scaleService.addScalesToLayout(this)
                    },
                    buildOrUpdateControllers: function() {
                        var e = this,
                            i = [],
                            n = [];
                        return a.each(e.data.datasets, function(a, r) {
                            var o = e.getDatasetMeta(r),
                                s = a.type || e.config.type;
                            if (o.type && o.type !== s && (e.destroyDatasetMeta(r), o = e.getDatasetMeta(r)), o.type = s, i.push(o.type), o.controller) o.controller.updateIndex(r), o.controller.linkScales();
                            else {
                                var l = t.controllers[o.type];
                                if (void 0 === l) throw new Error('"' + o.type + '" is not a chart type.');
                                o.controller = new l(e, r), n.push(o.controller)
                            }
                        }, e), n
                    },
                    resetElements: function() {
                        var t = this;
                        a.each(t.data.datasets, function(e, i) {
                            t.getDatasetMeta(i).controller.reset()
                        }, t)
                    },
                    reset: function() {
                        this.resetElements(), this.tooltip.initialize()
                    },
                    update: function(e) {
                        var i = this;
                        if (e && "object" == typeof e || (e = {
                                duration: e,
                                lazy: arguments[1]
                            }), function(e) {
                                var i = e.options;
                                a.each(e.scales, function(t) {
                                    o.removeBox(e, t)
                                }), i = a.configMerge(t.defaults.global, t.defaults[e.config.type], i), e.options = e.config.options = i, e.ensureScalesHaveIDs(), e.buildOrUpdateScales(), e.tooltip._options = i.tooltips, e.tooltip.initialize()
                            }(i), l._invalidate(i), !1 !== l.notify(i, "beforeUpdate")) {
                            i.tooltip._data = i.data;
                            var n = i.buildOrUpdateControllers();
                            a.each(i.data.datasets, function(t, e) {
                                i.getDatasetMeta(e).controller.buildOrUpdateElements()
                            }, i), i.updateLayout(), i.options.animation && i.options.animation.duration && a.each(n, function(t) {
                                t.reset()
                            }), i.updateDatasets(), i.tooltip.initialize(), i.lastActive = [], l.notify(i, "afterUpdate"), i._bufferedRender ? i._bufferedRequest = {
                                duration: e.duration,
                                easing: e.easing,
                                lazy: e.lazy
                            } : i.render(e)
                        }
                    },
                    updateLayout: function() {
                        !1 !== l.notify(this, "beforeLayout") && (o.update(this, this.width, this.height), l.notify(this, "afterScaleUpdate"), l.notify(this, "afterLayout"))
                    },
                    updateDatasets: function() {
                        if (!1 !== l.notify(this, "beforeDatasetsUpdate")) {
                            for (var t = 0, e = this.data.datasets.length; t < e; ++t) this.updateDataset(t);
                            l.notify(this, "afterDatasetsUpdate")
                        }
                    },
                    updateDataset: function(t) {
                        var e = this.getDatasetMeta(t),
                            i = {
                                meta: e,
                                index: t
                            };
                        !1 !== l.notify(this, "beforeDatasetUpdate", [i]) && (e.controller.update(), l.notify(this, "afterDatasetUpdate", [i]))
                    },
                    render: function(e) {
                        var i = this;
                        e && "object" == typeof e || (e = {
                            duration: e,
                            lazy: arguments[1]
                        });
                        var n = e.duration,
                            r = e.lazy;
                        if (!1 !== l.notify(i, "beforeRender")) {
                            var o = i.options.animation,
                                s = function(t) {
                                    l.notify(i, "afterRender"), a.callback(o && o.onComplete, [t], i)
                                };
                            if (o && (void 0 !== n && 0 !== n || void 0 === n && 0 !== o.duration)) {
                                var h = new t.Animation({
                                    numSteps: (n || o.duration) / 16.66,
                                    easing: e.easing || o.easing,
                                    render: function(t, e) {
                                        var i = a.easing.effects[e.easing],
                                            n = e.currentStep,
                                            r = n / e.numSteps;
                                        t.draw(i(r), r, n)
                                    },
                                    onAnimationProgress: o.onProgress,
                                    onAnimationComplete: s
                                });
                                t.animationService.addAnimation(i, h, n, r)
                            } else i.draw(), s(new t.Animation({
                                numSteps: 0,
                                chart: i
                            }));
                            return i
                        }
                    },
                    draw: function(t) {
                        var e = this;
                        e.clear(), a.isNullOrUndef(t) && (t = 1), e.transition(t), !1 !== l.notify(e, "beforeDraw", [t]) && (a.each(e.boxes, function(t) {
                            t.draw(e.chartArea)
                        }, e), e.scale && e.scale.draw(), e.drawDatasets(t), e._drawTooltip(t), l.notify(e, "afterDraw", [t]))
                    },
                    transition: function(t) {
                        for (var e = 0, i = (this.data.datasets || []).length; e < i; ++e) this.isDatasetVisible(e) && this.getDatasetMeta(e).controller.transition(t);
                        this.tooltip.transition(t)
                    },
                    drawDatasets: function(t) {
                        if (!1 !== l.notify(this, "beforeDatasetsDraw", [t])) {
                            for (var e = (this.data.datasets || []).length - 1; e >= 0; --e) this.isDatasetVisible(e) && this.drawDataset(e, t);
                            l.notify(this, "afterDatasetsDraw", [t])
                        }
                    },
                    drawDataset: function(t, e) {
                        var i = this.getDatasetMeta(t),
                            n = {
                                meta: i,
                                index: t,
                                easingValue: e
                            };
                        !1 !== l.notify(this, "beforeDatasetDraw", [n]) && (i.controller.draw(e), l.notify(this, "afterDatasetDraw", [n]))
                    },
                    _drawTooltip: function(t) {
                        var e = this.tooltip,
                            i = {
                                tooltip: e,
                                easingValue: t
                            };
                        !1 !== l.notify(this, "beforeTooltipDraw", [i]) && (e.draw(), l.notify(this, "afterTooltipDraw", [i]))
                    },
                    getElementAtEvent: function(t) {
                        return r.modes.single(this, t)
                    },
                    getElementsAtEvent: function(t) {
                        return r.modes.label(this, t, {
                            intersect: !0
                        })
                    },
                    getElementsAtXAxis: function(t) {
                        return r.modes["x-axis"](this, t, {
                            intersect: !0
                        })
                    },
                    getElementsAtEventForMode: function(t, e, i) {
                        var n = r.modes[e];
                        return "function" == typeof n ? n(this, t, i) : []
                    },
                    getDatasetAtEvent: function(t) {
                        return r.modes.dataset(this, t, {
                            intersect: !0
                        })
                    },
                    getDatasetMeta: function(t) {
                        var e = this.data.datasets[t];
                        e._meta || (e._meta = {});
                        var i = e._meta[this.id];
                        return i || (i = e._meta[this.id] = {
                            type: null,
                            data: [],
                            dataset: null,
                            controller: null,
                            hidden: null,
                            xAxisID: null,
                            yAxisID: null
                        }), i
                    },
                    getVisibleDatasetCount: function() {
                        for (var t = 0, e = 0, i = this.data.datasets.length; e < i; ++e) this.isDatasetVisible(e) && t++;
                        return t
                    },
                    isDatasetVisible: function(t) {
                        var e = this.getDatasetMeta(t);
                        return "boolean" == typeof e.hidden ? !e.hidden : !this.data.datasets[t].hidden
                    },
                    generateLegend: function() {
                        return this.options.legendCallback(this)
                    },
                    destroyDatasetMeta: function(t) {
                        var e = this.id,
                            i = this.data.datasets[t],
                            n = i._meta && i._meta[e];
                        n && (n.controller.destroy(), delete i._meta[e])
                    },
                    destroy: function() {
                        var e, i, n = this.canvas;
                        for (this.stop(), e = 0, i = this.data.datasets.length; e < i; ++e) this.destroyDatasetMeta(e);
                        n && (this.unbindEvents(), a.canvas.clear(this), s.releaseContext(this.ctx), this.canvas = null, this.ctx = null), l.notify(this, "destroy"), delete t.instances[this.id]
                    },
                    toBase64Image: function() {
                        return this.canvas.toDataURL.apply(this.canvas, arguments)
                    },
                    initToolTip: function() {
                        this.tooltip = new t.Tooltip({
                            _chart: this,
                            _chartInstance: this,
                            _data: this.data,
                            _options: this.options.tooltips
                        }, this)
                    },
                    bindEvents: function() {
                        var t = this,
                            e = t._listeners = {},
                            i = function() {
                                t.eventHandler.apply(t, arguments)
                            };
                        a.each(t.options.events, function(n) {
                            s.addEventListener(t, n, i), e[n] = i
                        }), t.options.responsive && (i = function() {
                            t.resize()
                        }, s.addEventListener(t, "resize", i), e.resize = i)
                    },
                    unbindEvents: function() {
                        var t = this,
                            e = t._listeners;
                        e && (delete t._listeners, a.each(e, function(e, i) {
                            s.removeEventListener(t, i, e)
                        }))
                    },
                    updateHoverStyle: function(t, e, i) {
                        var n, a, r, o = i ? "setHoverStyle" : "removeHoverStyle";
                        for (a = 0, r = t.length; a < r; ++a)(n = t[a]) && this.getDatasetMeta(n._datasetIndex).controller[o](n)
                    },
                    eventHandler: function(t) {
                        var e = this.tooltip;
                        if (!1 !== l.notify(this, "beforeEvent", [t])) {
                            this._bufferedRender = !0, this._bufferedRequest = null;
                            var i = this.handleEvent(t);
                            e && (i = e._start ? e.handleEvent(t) : i | e.handleEvent(t)), l.notify(this, "afterEvent", [t]);
                            var n = this._bufferedRequest;
                            return n ? this.render(n) : i && !this.animating && (this.stop(), this.render(this.options.hover.animationDuration, !0)), this._bufferedRender = !1, this._bufferedRequest = null, this
                        }
                    },
                    handleEvent: function(t) {
                        var e = this.options || {},
                            i = e.hover,
                            n = !1;
                        return this.lastActive = this.lastActive || [], "mouseout" === t.type ? this.active = [] : this.active = this.getElementsAtEventForMode(t, i.mode, i), a.callback(e.onHover || e.hover.onHover, [t.native, this.active], this), "mouseup" !== t.type && "click" !== t.type || e.onClick && e.onClick.call(this, t.native, this.active), this.lastActive.length && this.updateHoverStyle(this.lastActive, i.mode, !1), this.active.length && i.mode && this.updateHoverStyle(this.active, i.mode, !0), n = !a.arrayEquals(this.active, this.lastActive), this.lastActive = this.active, n
                    }
                }), t.Controller = t
            }
        }, {
            25: 25,
            28: 28,
            30: 30,
            31: 31,
            45: 45,
            48: 48
        }],
        24: [function(t, e, i) {
            "use strict";
            var n = t(45);
            e.exports = function(t) {
                var e = ["push", "pop", "shift", "splice", "unshift"];

                function i(t, i) {
                    var n = t._chartjs;
                    if (n) {
                        var a = n.listeners,
                            r = a.indexOf(i); - 1 !== r && a.splice(r, 1), a.length > 0 || (e.forEach(function(e) {
                            delete t[e]
                        }), delete t._chartjs)
                    }
                }
                t.DatasetController = function(t, e) {
                    this.initialize(t, e)
                }, n.extend(t.DatasetController.prototype, {
                    datasetElementType: null,
                    dataElementType: null,
                    initialize: function(t, e) {
                        this.chart = t, this.index = e, this.linkScales(), this.addElements()
                    },
                    updateIndex: function(t) {
                        this.index = t
                    },
                    linkScales: function() {
                        var t = this.getMeta(),
                            e = this.getDataset();
                        null !== t.xAxisID && t.xAxisID in this.chart.scales || (t.xAxisID = e.xAxisID || this.chart.options.scales.xAxes[0].id), null !== t.yAxisID && t.yAxisID in this.chart.scales || (t.yAxisID = e.yAxisID || this.chart.options.scales.yAxes[0].id)
                    },
                    getDataset: function() {
                        return this.chart.data.datasets[this.index]
                    },
                    getMeta: function() {
                        return this.chart.getDatasetMeta(this.index)
                    },
                    getScaleForId: function(t) {
                        return this.chart.scales[t]
                    },
                    reset: function() {
                        this.update(!0)
                    },
                    destroy: function() {
                        this._data && i(this._data, this)
                    },
                    createMetaDataset: function() {
                        var t = this.datasetElementType;
                        return t && new t({
                            _chart: this.chart,
                            _datasetIndex: this.index
                        })
                    },
                    createMetaData: function(t) {
                        var e = this.dataElementType;
                        return e && new e({
                            _chart: this.chart,
                            _datasetIndex: this.index,
                            _index: t
                        })
                    },
                    addElements: function() {
                        var t, e, i = this.getMeta(),
                            n = this.getDataset().data || [],
                            a = i.data;
                        for (t = 0, e = n.length; t < e; ++t) a[t] = a[t] || this.createMetaData(t);
                        i.dataset = i.dataset || this.createMetaDataset()
                    },
                    addElementAndReset: function(t) {
                        var e = this.createMetaData(t);
                        this.getMeta().data.splice(t, 0, e), this.updateElement(e, t, !0)
                    },
                    buildOrUpdateElements: function() {
                        var t = this.getDataset(),
                            a = t.data || (t.data = []);
                        this._data !== a && (this._data && i(this._data, this), o = this, (r = a)._chartjs ? r._chartjs.listeners.push(o) : (Object.defineProperty(r, "_chartjs", {
                            configurable: !0,
                            enumerable: !1,
                            value: {
                                listeners: [o]
                            }
                        }), e.forEach(function(t) {
                            var e = "onData" + t.charAt(0).toUpperCase() + t.slice(1),
                                i = r[t];
                            Object.defineProperty(r, t, {
                                configurable: !0,
                                enumerable: !1,
                                value: function() {
                                    var t = Array.prototype.slice.call(arguments),
                                        a = i.apply(this, t);
                                    return n.each(r._chartjs.listeners, function(i) {
                                        "function" == typeof i[e] && i[e].apply(i, t)
                                    }), a
                                }
                            })
                        })), this._data = a);
                        var r, o;
                        this.resyncElements()
                    },
                    update: n.noop,
                    transition: function(t) {
                        for (var e = this.getMeta(), i = e.data || [], n = i.length, a = 0; a < n; ++a) i[a].transition(t);
                        e.dataset && e.dataset.transition(t)
                    },
                    draw: function() {
                        var t = this.getMeta(),
                            e = t.data || [],
                            i = e.length,
                            n = 0;
                        for (t.dataset && t.dataset.draw(); n < i; ++n) e[n].draw()
                    },
                    removeHoverStyle: function(t, e) {
                        var i = this.chart.data.datasets[t._datasetIndex],
                            a = t._index,
                            r = t.custom || {},
                            o = n.valueAtIndexOrDefault,
                            s = t._model;
                        s.backgroundColor = r.backgroundColor ? r.backgroundColor : o(i.backgroundColor, a, e.backgroundColor), s.borderColor = r.borderColor ? r.borderColor : o(i.borderColor, a, e.borderColor), s.borderWidth = r.borderWidth ? r.borderWidth : o(i.borderWidth, a, e.borderWidth)
                    },
                    setHoverStyle: function(t) {
                        var e = this.chart.data.datasets[t._datasetIndex],
                            i = t._index,
                            a = t.custom || {},
                            r = n.valueAtIndexOrDefault,
                            o = n.getHoverColor,
                            s = t._model;
                        s.backgroundColor = a.hoverBackgroundColor ? a.hoverBackgroundColor : r(e.hoverBackgroundColor, i, o(s.backgroundColor)), s.borderColor = a.hoverBorderColor ? a.hoverBorderColor : r(e.hoverBorderColor, i, o(s.borderColor)), s.borderWidth = a.hoverBorderWidth ? a.hoverBorderWidth : r(e.hoverBorderWidth, i, s.borderWidth)
                    },
                    resyncElements: function() {
                        var t = this.getMeta(),
                            e = this.getDataset().data,
                            i = t.data.length,
                            n = e.length;
                        n < i ? t.data.splice(n, i - n) : n > i && this.insertElements(i, n - i)
                    },
                    insertElements: function(t, e) {
                        for (var i = 0; i < e; ++i) this.addElementAndReset(t + i)
                    },
                    onDataPush: function() {
                        this.insertElements(this.getDataset().data.length - 1, arguments.length)
                    },
                    onDataPop: function() {
                        this.getMeta().data.pop()
                    },
                    onDataShift: function() {
                        this.getMeta().data.shift()
                    },
                    onDataSplice: function(t, e) {
                        this.getMeta().data.splice(t, e), this.insertElements(t, arguments.length - 2)
                    },
                    onDataUnshift: function() {
                        this.insertElements(0, arguments.length)
                    }
                }), t.DatasetController.extend = n.inherits
            }
        }, {
            45: 45
        }],
        25: [function(t, e, i) {
            "use strict";
            var n = t(45);
            e.exports = {
                _set: function(t, e) {
                    return n.merge(this[t] || (this[t] = {}), e)
                }
            }
        }, {
            45: 45
        }],
        26: [function(t, e, i) {
            "use strict";
            var n = t(2),
                a = t(45);
            var r = function(t) {
                a.extend(this, t), this.initialize.apply(this, arguments)
            };
            a.extend(r.prototype, {
                initialize: function() {
                    this.hidden = !1
                },
                pivot: function() {
                    return this._view || (this._view = a.clone(this._model)), this._start = {}, this
                },
                transition: function(t) {
                    var e = this._model,
                        i = this._start,
                        a = this._view;
                    return e && 1 !== t ? (a || (a = this._view = {}), i || (i = this._start = {}), function(t, e, i, a) {
                        var r, o, s, l, h, u, d, c, f, g = Object.keys(i);
                        for (r = 0, o = g.length; r < o; ++r)
                            if (u = i[s = g[r]], e.hasOwnProperty(s) || (e[s] = u), (l = e[s]) !== u && "_" !== s[0]) {
                                if (t.hasOwnProperty(s) || (t[s] = l), (d = typeof u) == typeof(h = t[s]))
                                    if ("string" === d) {
                                        if ((c = n(h)).valid && (f = n(u)).valid) {
                                            e[s] = f.mix(c, a).rgbString();
                                            continue
                                        }
                                    } else if ("number" === d && isFinite(h) && isFinite(u)) {
                                    e[s] = h + (u - h) * a;
                                    continue
                                }
                                e[s] = u
                            }
                    }(i, a, e, t), this) : (this._view = e, this._start = null, this)
                },
                tooltipPosition: function() {
                    return {
                        x: this._model.x,
                        y: this._model.y
                    }
                },
                hasValue: function() {
                    return a.isNumber(this._model.x) && a.isNumber(this._model.y)
                }
            }), r.extend = a.inherits, e.exports = r
        }, {
            2: 2,
            45: 45
        }],
        27: [function(t, e, i) {
            "use strict";
            var n = t(2),
                a = t(25),
                r = t(45);
            e.exports = function(t) {
                r.configMerge = function() {
                    return r.merge(r.clone(arguments[0]), [].slice.call(arguments, 1), {
                        merger: function(e, i, n, a) {
                            var o = i[e] || {},
                                s = n[e];
                            "scales" === e ? i[e] = r.scaleMerge(o, s) : "scale" === e ? i[e] = r.merge(o, [t.scaleService.getScaleDefaults(s.type), s]) : r._merger(e, i, n, a)
                        }
                    })
                }, r.scaleMerge = function() {
                    return r.merge(r.clone(arguments[0]), [].slice.call(arguments, 1), {
                        merger: function(e, i, n, a) {
                            if ("xAxes" === e || "yAxes" === e) {
                                var o, s, l, h = n[e].length;
                                for (i[e] || (i[e] = []), o = 0; o < h; ++o) l = n[e][o], s = r.valueOrDefault(l.type, "xAxes" === e ? "category" : "linear"), o >= i[e].length && i[e].push({}), !i[e][o].type || l.type && l.type !== i[e][o].type ? r.merge(i[e][o], [t.scaleService.getScaleDefaults(s), l]) : r.merge(i[e][o], l)
                            } else r._merger(e, i, n, a)
                        }
                    })
                }, r.where = function(t, e) {
                    if (r.isArray(t) && Array.prototype.filter) return t.filter(e);
                    var i = [];
                    return r.each(t, function(t) {
                        e(t) && i.push(t)
                    }), i
                }, r.findIndex = Array.prototype.findIndex ? function(t, e, i) {
                    return t.findIndex(e, i)
                } : function(t, e, i) {
                    i = void 0 === i ? t : i;
                    for (var n = 0, a = t.length; n < a; ++n)
                        if (e.call(i, t[n], n, t)) return n;
                    return -1
                }, r.findNextWhere = function(t, e, i) {
                    r.isNullOrUndef(i) && (i = -1);
                    for (var n = i + 1; n < t.length; n++) {
                        var a = t[n];
                        if (e(a)) return a
                    }
                }, r.findPreviousWhere = function(t, e, i) {
                    r.isNullOrUndef(i) && (i = t.length);
                    for (var n = i - 1; n >= 0; n--) {
                        var a = t[n];
                        if (e(a)) return a
                    }
                }, r.isNumber = function(t) {
                    return !isNaN(parseFloat(t)) && isFinite(t)
                }, r.almostEquals = function(t, e, i) {
                    return Math.abs(t - e) < i
                }, r.almostWhole = function(t, e) {
                    var i = Math.round(t);
                    return i - e < t && i + e > t
                }, r.max = function(t) {
                    return t.reduce(function(t, e) {
                        return isNaN(e) ? t : Math.max(t, e)
                    }, Number.NEGATIVE_INFINITY)
                }, r.min = function(t) {
                    return t.reduce(function(t, e) {
                        return isNaN(e) ? t : Math.min(t, e)
                    }, Number.POSITIVE_INFINITY)
                }, r.sign = Math.sign ? function(t) {
                    return Math.sign(t)
                } : function(t) {
                    return 0 === (t = +t) || isNaN(t) ? t : t > 0 ? 1 : -1
                }, r.log10 = Math.log10 ? function(t) {
                    return Math.log10(t)
                } : function(t) {
                    var e = Math.log(t) * Math.LOG10E,
                        i = Math.round(e);
                    return t === Math.pow(10, i) ? i : e
                }, r.toRadians = function(t) {
                    return t * (Math.PI / 180)
                }, r.toDegrees = function(t) {
                    return t * (180 / Math.PI)
                }, r.getAngleFromPoint = function(t, e) {
                    var i = e.x - t.x,
                        n = e.y - t.y,
                        a = Math.sqrt(i * i + n * n),
                        r = Math.atan2(n, i);
                    return r < -.5 * Math.PI && (r += 2 * Math.PI), {
                        angle: r,
                        distance: a
                    }
                }, r.distanceBetweenPoints = function(t, e) {
                    return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2))
                }, r.aliasPixel = function(t) {
                    return t % 2 == 0 ? 0 : .5
                }, r.splineCurve = function(t, e, i, n) {
                    var a = t.skip ? e : t,
                        r = e,
                        o = i.skip ? e : i,
                        s = Math.sqrt(Math.pow(r.x - a.x, 2) + Math.pow(r.y - a.y, 2)),
                        l = Math.sqrt(Math.pow(o.x - r.x, 2) + Math.pow(o.y - r.y, 2)),
                        h = s / (s + l),
                        u = l / (s + l),
                        d = n * (h = isNaN(h) ? 0 : h),
                        c = n * (u = isNaN(u) ? 0 : u);
                    return {
                        previous: {
                            x: r.x - d * (o.x - a.x),
                            y: r.y - d * (o.y - a.y)
                        },
                        next: {
                            x: r.x + c * (o.x - a.x),
                            y: r.y + c * (o.y - a.y)
                        }
                    }
                }, r.EPSILON = Number.EPSILON || 1e-14, r.splineCurveMonotone = function(t) {
                    var e, i, n, a, o = (t || []).map(function(t) {
                            return {
                                model: t._model,
                                deltaK: 0,
                                mK: 0
                            }
                        }),
                        s = o.length;
                    for (e = 0; e < s; ++e)
                        if (!(n = o[e]).model.skip) {
                            if (i = e > 0 ? o[e - 1] : null, (a = e < s - 1 ? o[e + 1] : null) && !a.model.skip) {
                                var l = a.model.x - n.model.x;
                                n.deltaK = 0 !== l ? (a.model.y - n.model.y) / l : 0
                            }!i || i.model.skip ? n.mK = n.deltaK : !a || a.model.skip ? n.mK = i.deltaK : this.sign(i.deltaK) !== this.sign(n.deltaK) ? n.mK = 0 : n.mK = (i.deltaK + n.deltaK) / 2
                        } var h, u, d, c;
                    for (e = 0; e < s - 1; ++e) n = o[e], a = o[e + 1], n.model.skip || a.model.skip || (r.almostEquals(n.deltaK, 0, this.EPSILON) ? n.mK = a.mK = 0 : (h = n.mK / n.deltaK, u = a.mK / n.deltaK, (c = Math.pow(h, 2) + Math.pow(u, 2)) <= 9 || (d = 3 / Math.sqrt(c), n.mK = h * d * n.deltaK, a.mK = u * d * n.deltaK)));
                    var f;
                    for (e = 0; e < s; ++e)(n = o[e]).model.skip || (i = e > 0 ? o[e - 1] : null, a = e < s - 1 ? o[e + 1] : null, i && !i.model.skip && (f = (n.model.x - i.model.x) / 3, n.model.controlPointPreviousX = n.model.x - f, n.model.controlPointPreviousY = n.model.y - f * n.mK), a && !a.model.skip && (f = (a.model.x - n.model.x) / 3, n.model.controlPointNextX = n.model.x + f, n.model.controlPointNextY = n.model.y + f * n.mK))
                }, r.nextItem = function(t, e, i) {
                    return i ? e >= t.length - 1 ? t[0] : t[e + 1] : e >= t.length - 1 ? t[t.length - 1] : t[e + 1]
                }, r.previousItem = function(t, e, i) {
                    return i ? e <= 0 ? t[t.length - 1] : t[e - 1] : e <= 0 ? t[0] : t[e - 1]
                }, r.niceNum = function(t, e) {
                    var i = Math.floor(r.log10(t)),
                        n = t / Math.pow(10, i);
                    return (e ? n < 1.5 ? 1 : n < 3 ? 2 : n < 7 ? 5 : 10 : n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * Math.pow(10, i)
                }, r.requestAnimFrame = "undefined" == typeof window ? function(t) {
                    t()
                } : window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(t) {
                    return window.setTimeout(t, 1e3 / 60)
                }, r.getRelativePosition = function(t, e) {
                    var i, n, a = t.originalEvent || t,
                        o = t.currentTarget || t.srcElement,
                        s = o.getBoundingClientRect(),
                        l = a.touches;
                    l && l.length > 0 ? (i = l[0].clientX, n = l[0].clientY) : (i = a.clientX, n = a.clientY);
                    var h = parseFloat(r.getStyle(o, "padding-left")),
                        u = parseFloat(r.getStyle(o, "padding-top")),
                        d = parseFloat(r.getStyle(o, "padding-right")),
                        c = parseFloat(r.getStyle(o, "padding-bottom")),
                        f = s.right - s.left - h - d,
                        g = s.bottom - s.top - u - c;
                    return {
                        x: i = Math.round((i - s.left - h) / f * o.width / e.currentDevicePixelRatio),
                        y: n = Math.round((n - s.top - u) / g * o.height / e.currentDevicePixelRatio)
                    }
                };

                function e(t, e, i) {
                    var n;
                    return "string" == typeof t ? (n = parseInt(t, 10), -1 !== t.indexOf("%") && (n = n / 100 * e.parentNode[i])) : n = t, n
                }

                function i(t) {
                    return void 0 !== t && null !== t && "none" !== t
                }

                function o(t, n, a) {
                    var r = document.defaultView,
                        o = t.parentNode,
                        s = r.getComputedStyle(t)[n],
                        l = r.getComputedStyle(o)[n],
                        h = i(s),
                        u = i(l),
                        d = Number.POSITIVE_INFINITY;
                    return h || u ? Math.min(h ? e(s, t, a) : d, u ? e(l, o, a) : d) : "none"
                }
                r.getConstraintWidth = function(t) {
                    return o(t, "max-width", "clientWidth")
                }, r.getConstraintHeight = function(t) {
                    return o(t, "max-height", "clientHeight")
                }, r.getMaximumWidth = function(t) {
                    var e = t.parentNode;
                    if (!e) return t.clientWidth;
                    var i = parseInt(r.getStyle(e, "padding-left"), 10),
                        n = parseInt(r.getStyle(e, "padding-right"), 10),
                        a = e.clientWidth - i - n,
                        o = r.getConstraintWidth(t);
                    return isNaN(o) ? a : Math.min(a, o)
                }, r.getMaximumHeight = function(t) {
                    var e = t.parentNode;
                    if (!e) return t.clientHeight;
                    var i = parseInt(r.getStyle(e, "padding-top"), 10),
                        n = parseInt(r.getStyle(e, "padding-bottom"), 10),
                        a = e.clientHeight - i - n,
                        o = r.getConstraintHeight(t);
                    return isNaN(o) ? a : Math.min(a, o)
                }, r.getStyle = function(t, e) {
                    return t.currentStyle ? t.currentStyle[e] : document.defaultView.getComputedStyle(t, null).getPropertyValue(e)
                }, r.retinaScale = function(t, e) {
                    var i = t.currentDevicePixelRatio = e || window.devicePixelRatio || 1;
                    if (1 !== i) {
                        var n = t.canvas,
                            a = t.height,
                            r = t.width;
                        n.height = a * i, n.width = r * i, t.ctx.scale(i, i), n.style.height || n.style.width || (n.style.height = a + "px", n.style.width = r + "px")
                    }
                }, r.fontString = function(t, e, i) {
                    return e + " " + t + "px " + i
                }, r.longestText = function(t, e, i, n) {
                    var a = (n = n || {}).data = n.data || {},
                        o = n.garbageCollect = n.garbageCollect || [];
                    n.font !== e && (a = n.data = {}, o = n.garbageCollect = [], n.font = e), t.font = e;
                    var s = 0;
                    r.each(i, function(e) {
                        void 0 !== e && null !== e && !0 !== r.isArray(e) ? s = r.measureText(t, a, o, s, e) : r.isArray(e) && r.each(e, function(e) {
                            void 0 === e || null === e || r.isArray(e) || (s = r.measureText(t, a, o, s, e))
                        })
                    });
                    var l = o.length / 2;
                    if (l > i.length) {
                        for (var h = 0; h < l; h++) delete a[o[h]];
                        o.splice(0, l)
                    }
                    return s
                }, r.measureText = function(t, e, i, n, a) {
                    var r = e[a];
                    return r || (r = e[a] = t.measureText(a).width, i.push(a)), r > n && (n = r), n
                }, r.numberOfLabelLines = function(t) {
                    var e = 1;
                    return r.each(t, function(t) {
                        r.isArray(t) && t.length > e && (e = t.length)
                    }), e
                }, r.color = n ? function(t) {
                    return t instanceof CanvasGradient && (t = a.global.defaultColor), n(t)
                } : function(t) {
                    return console.error("Color.js not found!"), t
                }, r.getHoverColor = function(t) {
                    return t instanceof CanvasPattern ? t : r.color(t).saturate(.5).darken(.1).rgbString()
                }
            }
        }, {
            2: 2,
            25: 25,
            45: 45
        }],
        28: [function(t, e, i) {
            "use strict";
            var n = t(45);

            function a(t, e) {
                return t.native ? {
                    x: t.x,
                    y: t.y
                } : n.getRelativePosition(t, e)
            }

            function r(t, e) {
                var i, n, a, r, o;
                for (n = 0, r = t.data.datasets.length; n < r; ++n)
                    if (t.isDatasetVisible(n))
                        for (a = 0, o = (i = t.getDatasetMeta(n)).data.length; a < o; ++a) {
                            var s = i.data[a];
                            s._view.skip || e(s)
                        }
            }

            function o(t, e) {
                var i = [];
                return r(t, function(t) {
                    t.inRange(e.x, e.y) && i.push(t)
                }), i
            }

            function s(t, e, i, n) {
                var a = Number.POSITIVE_INFINITY,
                    o = [];
                return r(t, function(t) {
                    if (!i || t.inRange(e.x, e.y)) {
                        var r = t.getCenterPoint(),
                            s = n(e, r);
                        s < a ? (o = [t], a = s) : s === a && o.push(t)
                    }
                }), o
            }

            function l(t) {
                var e = -1 !== t.indexOf("x"),
                    i = -1 !== t.indexOf("y");
                return function(t, n) {
                    var a = e ? Math.abs(t.x - n.x) : 0,
                        r = i ? Math.abs(t.y - n.y) : 0;
                    return Math.sqrt(Math.pow(a, 2) + Math.pow(r, 2))
                }
            }

            function h(t, e, i) {
                var n = a(e, t);
                i.axis = i.axis || "x";
                var r = l(i.axis),
                    h = i.intersect ? o(t, n) : s(t, n, !1, r),
                    u = [];
                return h.length ? (t.data.datasets.forEach(function(e, i) {
                    if (t.isDatasetVisible(i)) {
                        var n = t.getDatasetMeta(i).data[h[0]._index];
                        n && !n._view.skip && u.push(n)
                    }
                }), u) : []
            }
            e.exports = {
                modes: {
                    single: function(t, e) {
                        var i = a(e, t),
                            n = [];
                        return r(t, function(t) {
                            if (t.inRange(i.x, i.y)) return n.push(t), n
                        }), n.slice(0, 1)
                    },
                    label: h,
                    index: h,
                    dataset: function(t, e, i) {
                        var n = a(e, t);
                        i.axis = i.axis || "xy";
                        var r = l(i.axis),
                            h = i.intersect ? o(t, n) : s(t, n, !1, r);
                        return h.length > 0 && (h = t.getDatasetMeta(h[0]._datasetIndex).data), h
                    },
                    "x-axis": function(t, e) {
                        return h(t, e, {
                            intersect: !1
                        })
                    },
                    point: function(t, e) {
                        return o(t, a(e, t))
                    },
                    nearest: function(t, e, i) {
                        var n = a(e, t);
                        i.axis = i.axis || "xy";
                        var r = l(i.axis),
                            o = s(t, n, i.intersect, r);
                        return o.length > 1 && o.sort(function(t, e) {
                            var i = t.getArea() - e.getArea();
                            return 0 === i && (i = t._datasetIndex - e._datasetIndex), i
                        }), o.slice(0, 1)
                    },
                    x: function(t, e, i) {
                        var n = a(e, t),
                            o = [],
                            s = !1;
                        return r(t, function(t) {
                            t.inXRange(n.x) && o.push(t), t.inRange(n.x, n.y) && (s = !0)
                        }), i.intersect && !s && (o = []), o
                    },
                    y: function(t, e, i) {
                        var n = a(e, t),
                            o = [],
                            s = !1;
                        return r(t, function(t) {
                            t.inYRange(n.y) && o.push(t), t.inRange(n.x, n.y) && (s = !0)
                        }), i.intersect && !s && (o = []), o
                    }
                }
            }
        }, {
            45: 45
        }],
        29: [function(t, e, i) {
            "use strict";
            t(25)._set("global", {
                responsive: !0,
                responsiveAnimationDuration: 0,
                maintainAspectRatio: !0,
                events: ["mousemove", "mouseout", "click", "touchstart", "touchmove"],
                hover: {
                    onHover: null,
                    mode: "nearest",
                    intersect: !0,
                    animationDuration: 400
                },
                onClick: null,
                defaultColor: "rgba(0,0,0,0.1)",
                defaultFontColor: "#666",
                defaultFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                defaultFontSize: 12,
                defaultFontStyle: "normal",
                showLines: !0,
                elements: {},
                layout: {
                    padding: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }
                }
            }), e.exports = function() {
                var t = function(t, e) {
                    return this.construct(t, e), this
                };
                return t.Chart = t, t
            }
        }, {
            25: 25
        }],
        30: [function(t, e, i) {
            "use strict";
            var n = t(45);

            function a(t, e) {
                return n.where(t, function(t) {
                    return t.position === e
                })
            }

            function r(t, e) {
                t.forEach(function(t, e) {
                    return t._tmpIndex_ = e, t
                }), t.sort(function(t, i) {
                    var n = e ? i : t,
                        a = e ? t : i;
                    return n.weight === a.weight ? n._tmpIndex_ - a._tmpIndex_ : n.weight - a.weight
                }), t.forEach(function(t) {
                    delete t._tmpIndex_
                })
            }
            e.exports = {
                defaults: {},
                addBox: function(t, e) {
                    t.boxes || (t.boxes = []), e.fullWidth = e.fullWidth || !1, e.position = e.position || "top", e.weight = e.weight || 0, t.boxes.push(e)
                },
                removeBox: function(t, e) {
                    var i = t.boxes ? t.boxes.indexOf(e) : -1; - 1 !== i && t.boxes.splice(i, 1)
                },
                configure: function(t, e, i) {
                    for (var n, a = ["fullWidth", "position", "weight"], r = a.length, o = 0; o < r; ++o) n = a[o], i.hasOwnProperty(n) && (e[n] = i[n])
                },
                update: function(t, e, i) {
                    if (t) {
                        var o = t.options.layout || {},
                            s = n.options.toPadding(o.padding),
                            l = s.left,
                            h = s.right,
                            u = s.top,
                            d = s.bottom,
                            c = a(t.boxes, "left"),
                            f = a(t.boxes, "right"),
                            g = a(t.boxes, "top"),
                            m = a(t.boxes, "bottom"),
                            p = a(t.boxes, "chartArea");
                        r(c, !0), r(f, !1), r(g, !0), r(m, !1);
                        var v = e - l - h,
                            y = i - u - d,
                            b = y / 2,
                            x = (e - v / 2) / (c.length + f.length),
                            _ = (i - b) / (g.length + m.length),
                            k = v,
                            w = y,
                            M = [];
                        n.each(c.concat(f, g, m), function(t) {
                            var e, i = t.isHorizontal();
                            i ? (e = t.update(t.fullWidth ? v : k, _), w -= e.height) : (e = t.update(x, w), k -= e.width), M.push({
                                horizontal: i,
                                minSize: e,
                                box: t
                            })
                        });
                        var S = 0,
                            D = 0,
                            C = 0,
                            P = 0;
                        n.each(g.concat(m), function(t) {
                            if (t.getPadding) {
                                var e = t.getPadding();
                                S = Math.max(S, e.left), D = Math.max(D, e.right)
                            }
                        }), n.each(c.concat(f), function(t) {
                            if (t.getPadding) {
                                var e = t.getPadding();
                                C = Math.max(C, e.top), P = Math.max(P, e.bottom)
                            }
                        });
                        var T = l,
                            O = h,
                            I = u,
                            A = d;
                        n.each(c.concat(f), z), n.each(c, function(t) {
                            T += t.width
                        }), n.each(f, function(t) {
                            O += t.width
                        }), n.each(g.concat(m), z), n.each(g, function(t) {
                            I += t.height
                        }), n.each(m, function(t) {
                            A += t.height
                        }), n.each(c.concat(f), function(t) {
                            var e = n.findNextWhere(M, function(e) {
                                    return e.box === t
                                }),
                                i = {
                                    left: 0,
                                    right: 0,
                                    top: I,
                                    bottom: A
                                };
                            e && t.update(e.minSize.width, w, i)
                        }), T = l, O = h, I = u, A = d, n.each(c, function(t) {
                            T += t.width
                        }), n.each(f, function(t) {
                            O += t.width
                        }), n.each(g, function(t) {
                            I += t.height
                        }), n.each(m, function(t) {
                            A += t.height
                        });
                        var F = Math.max(S - T, 0);
                        T += F, O += Math.max(D - O, 0);
                        var R = Math.max(C - I, 0);
                        I += R, A += Math.max(P - A, 0);
                        var L = i - I - A,
                            W = e - T - O;
                        W === k && L === w || (n.each(c, function(t) {
                            t.height = L
                        }), n.each(f, function(t) {
                            t.height = L
                        }), n.each(g, function(t) {
                            t.fullWidth || (t.width = W)
                        }), n.each(m, function(t) {
                            t.fullWidth || (t.width = W)
                        }), w = L, k = W);
                        var Y = l + F,
                            N = u + R;
                        n.each(c.concat(g), H), Y += k, N += w, n.each(f, H), n.each(m, H), t.chartArea = {
                            left: T,
                            top: I,
                            right: T + k,
                            bottom: I + w
                        }, n.each(p, function(e) {
                            e.left = t.chartArea.left, e.top = t.chartArea.top, e.right = t.chartArea.right, e.bottom = t.chartArea.bottom, e.update(k, w)
                        })
                    }

                    function z(t) {
                        var e = n.findNextWhere(M, function(e) {
                            return e.box === t
                        });
                        if (e)
                            if (t.isHorizontal()) {
                                var i = {
                                    left: Math.max(T, S),
                                    right: Math.max(O, D),
                                    top: 0,
                                    bottom: 0
                                };
                                t.update(t.fullWidth ? v : k, y / 2, i)
                            } else t.update(e.minSize.width, w)
                    }

                    function H(t) {
                        t.isHorizontal() ? (t.left = t.fullWidth ? l : T, t.right = t.fullWidth ? e - h : T + k, t.top = N, t.bottom = N + t.height, N = t.bottom) : (t.left = Y, t.right = Y + t.width, t.top = I, t.bottom = I + w, Y = t.right)
                    }
                }
            }
        }, {
            45: 45
        }],
        31: [function(t, e, i) {
            "use strict";
            var n = t(25),
                a = t(45);
            n._set("global", {
                plugins: {}
            }), e.exports = {
                _plugins: [],
                _cacheId: 0,
                register: function(t) {
                    var e = this._plugins;
                    [].concat(t).forEach(function(t) {
                        -1 === e.indexOf(t) && e.push(t)
                    }), this._cacheId++
                },
                unregister: function(t) {
                    var e = this._plugins;
                    [].concat(t).forEach(function(t) {
                        var i = e.indexOf(t); - 1 !== i && e.splice(i, 1)
                    }), this._cacheId++
                },
                clear: function() {
                    this._plugins = [], this._cacheId++
                },
                count: function() {
                    return this._plugins.length
                },
                getAll: function() {
                    return this._plugins
                },
                notify: function(t, e, i) {
                    var n, a, r, o, s, l = this.descriptors(t),
                        h = l.length;
                    for (n = 0; n < h; ++n)
                        if ("function" == typeof(s = (r = (a = l[n]).plugin)[e]) && ((o = [t].concat(i || [])).push(a.options), !1 === s.apply(r, o))) return !1;
                    return !0
                },
                descriptors: function(t) {
                    var e = t.$plugins || (t.$plugins = {});
                    if (e.id === this._cacheId) return e.descriptors;
                    var i = [],
                        r = [],
                        o = t && t.config || {},
                        s = o.options && o.options.plugins || {};
                    return this._plugins.concat(o.plugins || []).forEach(function(t) {
                        if (-1 === i.indexOf(t)) {
                            var e = t.id,
                                o = s[e];
                            !1 !== o && (!0 === o && (o = a.clone(n.global.plugins[e])), i.push(t), r.push({
                                plugin: t,
                                options: o || {}
                            }))
                        }
                    }), e.descriptors = r, e.id = this._cacheId, r
                },
                _invalidate: function(t) {
                    delete t.$plugins
                }
            }
        }, {
            25: 25,
            45: 45
        }],
        32: [function(t, e, i) {
            "use strict";
            var n = t(25),
                a = t(26),
                r = t(45),
                o = t(34);
            n._set("scale", {
                display: !0,
                position: "left",
                offset: !1,
                gridLines: {
                    display: !0,
                    color: "rgba(0, 0, 0, 0.1)",
                    lineWidth: 1,
                    drawBorder: !0,
                    drawOnChartArea: !0,
                    drawTicks: !0,
                    tickMarkLength: 10,
                    zeroLineWidth: 1,
                    zeroLineColor: "rgba(0,0,0,0.25)",
                    zeroLineBorderDash: [],
                    zeroLineBorderDashOffset: 0,
                    offsetGridLines: !1,
                    borderDash: [],
                    borderDashOffset: 0
                },
                scaleLabel: {
                    display: !1,
                    labelString: "",
                    lineHeight: 1.2,
                    padding: {
                        top: 4,
                        bottom: 4
                    }
                },
                ticks: {
                    beginAtZero: !1,
                    minRotation: 0,
                    maxRotation: 50,
                    mirror: !1,
                    padding: 0,
                    reverse: !1,
                    display: !0,
                    autoSkip: !0,
                    autoSkipPadding: 0,
                    labelOffset: 0,
                    callback: o.formatters.values,
                    minor: {},
                    major: {}
                }
            });

            function s(t) {
                var e, i, n = [];
                for (e = 0, i = t.length; e < i; ++e) n.push(t[e].label);
                return n
            }

            function l(t, e, i) {
                var n = t.getPixelForTick(e);
                return i && (n -= 0 === e ? (t.getPixelForTick(1) - n) / 2 : (n - t.getPixelForTick(e - 1)) / 2), n
            }
            e.exports = function(t) {
                function e(t, e, i) {
                    return r.isArray(e) ? r.longestText(t, i, e) : t.measureText(e).width
                }

                function i(t) {
                    var e = r.valueOrDefault,
                        i = n.global,
                        a = e(t.fontSize, i.defaultFontSize),
                        o = e(t.fontStyle, i.defaultFontStyle),
                        s = e(t.fontFamily, i.defaultFontFamily);
                    return {
                        size: a,
                        style: o,
                        family: s,
                        font: r.fontString(a, o, s)
                    }
                }

                function o(t) {
                    return r.options.toLineHeight(r.valueOrDefault(t.lineHeight, 1.2), r.valueOrDefault(t.fontSize, n.global.defaultFontSize))
                }
                t.Scale = a.extend({
                    getPadding: function() {
                        return {
                            left: this.paddingLeft || 0,
                            top: this.paddingTop || 0,
                            right: this.paddingRight || 0,
                            bottom: this.paddingBottom || 0
                        }
                    },
                    getTicks: function() {
                        return this._ticks
                    },
                    mergeTicksOptions: function() {
                        var t = this.options.ticks;
                        !1 === t.minor && (t.minor = {
                            display: !1
                        }), !1 === t.major && (t.major = {
                            display: !1
                        });
                        for (var e in t) "major" !== e && "minor" !== e && (void 0 === t.minor[e] && (t.minor[e] = t[e]), void 0 === t.major[e] && (t.major[e] = t[e]))
                    },
                    beforeUpdate: function() {
                        r.callback(this.options.beforeUpdate, [this])
                    },
                    update: function(t, e, i) {
                        var n, a, o, s, l, h;
                        for (this.beforeUpdate(), this.maxWidth = t, this.maxHeight = e, this.margins = r.extend({
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0
                            }, i), this.longestTextCache = this.longestTextCache || {}, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this.beforeBuildTicks(), l = this.buildTicks() || [], this.afterBuildTicks(), this.beforeTickToLabelConversion(), o = this.convertTicksToLabels(l) || this.ticks, this.afterTickToLabelConversion(), this.ticks = o, n = 0, a = o.length; n < a; ++n) s = o[n], (h = l[n]) ? h.label = s : l.push(h = {
                            label: s,
                            major: !1
                        });
                        return this._ticks = l, this.beforeCalculateTickRotation(), this.calculateTickRotation(), this.afterCalculateTickRotation(), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate(), this.minSize
                    },
                    afterUpdate: function() {
                        r.callback(this.options.afterUpdate, [this])
                    },
                    beforeSetDimensions: function() {
                        r.callback(this.options.beforeSetDimensions, [this])
                    },
                    setDimensions: function() {
                        this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0
                    },
                    afterSetDimensions: function() {
                        r.callback(this.options.afterSetDimensions, [this])
                    },
                    beforeDataLimits: function() {
                        r.callback(this.options.beforeDataLimits, [this])
                    },
                    determineDataLimits: r.noop,
                    afterDataLimits: function() {
                        r.callback(this.options.afterDataLimits, [this])
                    },
                    beforeBuildTicks: function() {
                        r.callback(this.options.beforeBuildTicks, [this])
                    },
                    buildTicks: r.noop,
                    afterBuildTicks: function() {
                        r.callback(this.options.afterBuildTicks, [this])
                    },
                    beforeTickToLabelConversion: function() {
                        r.callback(this.options.beforeTickToLabelConversion, [this])
                    },
                    convertTicksToLabels: function() {
                        var t = this.options.ticks;
                        this.ticks = this.ticks.map(t.userCallback || t.callback, this)
                    },
                    afterTickToLabelConversion: function() {
                        r.callback(this.options.afterTickToLabelConversion, [this])
                    },
                    beforeCalculateTickRotation: function() {
                        r.callback(this.options.beforeCalculateTickRotation, [this])
                    },
                    calculateTickRotation: function() {
                        var t = this.ctx,
                            e = this.options.ticks,
                            n = s(this._ticks),
                            a = i(e);
                        t.font = a.font;
                        var o = e.minRotation || 0;
                        if (n.length && this.options.display && this.isHorizontal())
                            for (var l, h = r.longestText(t, a.font, n, this.longestTextCache), u = h, d = this.getPixelForTick(1) - this.getPixelForTick(0) - 6; u > d && o < e.maxRotation;) {
                                var c = r.toRadians(o);
                                if (l = Math.cos(c), Math.sin(c) * h > this.maxHeight) {
                                    o--;
                                    break
                                }
                                o++, u = l * h
                            }
                        this.labelRotation = o
                    },
                    afterCalculateTickRotation: function() {
                        r.callback(this.options.afterCalculateTickRotation, [this])
                    },
                    beforeFit: function() {
                        r.callback(this.options.beforeFit, [this])
                    },
                    fit: function() {
                        var t = this.minSize = {
                                width: 0,
                                height: 0
                            },
                            n = s(this._ticks),
                            a = this.options,
                            l = a.ticks,
                            h = a.scaleLabel,
                            u = a.gridLines,
                            d = a.display,
                            c = this.isHorizontal(),
                            f = i(l),
                            g = a.gridLines.tickMarkLength;
                        if (t.width = c ? this.isFullWidth() ? this.maxWidth - this.margins.left - this.margins.right : this.maxWidth : d && u.drawTicks ? g : 0, t.height = c ? d && u.drawTicks ? g : 0 : this.maxHeight, h.display && d) {
                            var m = o(h) + r.options.toPadding(h.padding).height;
                            c ? t.height += m : t.width += m
                        }
                        if (l.display && d) {
                            var p = r.longestText(this.ctx, f.font, n, this.longestTextCache),
                                v = r.numberOfLabelLines(n),
                                y = .5 * f.size,
                                b = this.options.ticks.padding;
                            if (c) {
                                this.longestLabelWidth = p;
                                var x = r.toRadians(this.labelRotation),
                                    _ = Math.cos(x),
                                    k = Math.sin(x) * p + f.size * v + y * (v - 1) + y;
                                t.height = Math.min(this.maxHeight, t.height + k + b), this.ctx.font = f.font;
                                var w = e(this.ctx, n[0], f.font),
                                    M = e(this.ctx, n[n.length - 1], f.font);
                                0 !== this.labelRotation ? (this.paddingLeft = "bottom" === a.position ? _ * w + 3 : _ * y + 3, this.paddingRight = "bottom" === a.position ? _ * y + 3 : _ * M + 3) : (this.paddingLeft = w / 2 + 3, this.paddingRight = M / 2 + 3)
                            } else l.mirror ? p = 0 : p += b + y, t.width = Math.min(this.maxWidth, t.width + p), this.paddingTop = f.size / 2, this.paddingBottom = f.size / 2
                        }
                        this.handleMargins(), this.width = t.width, this.height = t.height
                    },
                    handleMargins: function() {
                        this.margins && (this.paddingLeft = Math.max(this.paddingLeft - this.margins.left, 0), this.paddingTop = Math.max(this.paddingTop - this.margins.top, 0), this.paddingRight = Math.max(this.paddingRight - this.margins.right, 0), this.paddingBottom = Math.max(this.paddingBottom - this.margins.bottom, 0))
                    },
                    afterFit: function() {
                        r.callback(this.options.afterFit, [this])
                    },
                    isHorizontal: function() {
                        return "top" === this.options.position || "bottom" === this.options.position
                    },
                    isFullWidth: function() {
                        return this.options.fullWidth
                    },
                    getRightValue: function(t) {
                        if (r.isNullOrUndef(t)) return NaN;
                        if ("number" == typeof t && !isFinite(t)) return NaN;
                        if (t)
                            if (this.isHorizontal()) {
                                if (void 0 !== t.x) return this.getRightValue(t.x)
                            } else if (void 0 !== t.y) return this.getRightValue(t.y);
                        return t
                    },
                    getLabelForIndex: r.noop,
                    getPixelForValue: r.noop,
                    getValueForPixel: r.noop,
                    getPixelForTick: function(t) {
                        var e = this.options.offset;
                        if (this.isHorizontal()) {
                            var i = (this.width - (this.paddingLeft + this.paddingRight)) / Math.max(this._ticks.length - (e ? 0 : 1), 1),
                                n = i * t + this.paddingLeft;
                            e && (n += i / 2);
                            var a = this.left + Math.round(n);
                            return a += this.isFullWidth() ? this.margins.left : 0
                        }
                        var r = this.height - (this.paddingTop + this.paddingBottom);
                        return this.top + t * (r / (this._ticks.length - 1))
                    },
                    getPixelForDecimal: function(t) {
                        if (this.isHorizontal()) {
                            var e = (this.width - (this.paddingLeft + this.paddingRight)) * t + this.paddingLeft,
                                i = this.left + Math.round(e);
                            return i += this.isFullWidth() ? this.margins.left : 0
                        }
                        return this.top + t * this.height
                    },
                    getBasePixel: function() {
                        return this.getPixelForValue(this.getBaseValue())
                    },
                    getBaseValue: function() {
                        var t = this.min,
                            e = this.max;
                        return this.beginAtZero ? 0 : t < 0 && e < 0 ? e : t > 0 && e > 0 ? t : 0
                    },
                    _autoSkip: function(t) {
                        var e, i, n, a, o = this.isHorizontal(),
                            s = this.options.ticks.minor,
                            l = t.length,
                            h = r.toRadians(this.labelRotation),
                            u = Math.cos(h),
                            d = this.longestLabelWidth * u,
                            c = [];
                        for (s.maxTicksLimit && (a = s.maxTicksLimit), o && (e = !1, (d + s.autoSkipPadding) * l > this.width - (this.paddingLeft + this.paddingRight) && (e = 1 + Math.floor((d + s.autoSkipPadding) * l / (this.width - (this.paddingLeft + this.paddingRight)))), a && l > a && (e = Math.max(e, Math.floor(l / a)))), i = 0; i < l; i++) n = t[i], (e > 1 && i % e > 0 || i % e == 0 && i + e >= l) && i !== l - 1 && delete n.label, c.push(n);
                        return c
                    },
                    draw: function(t) {
                        var e = this,
                            a = e.options;
                        if (a.display) {
                            var s = e.ctx,
                                h = n.global,
                                u = a.ticks.minor,
                                d = a.ticks.major || u,
                                c = a.gridLines,
                                f = a.scaleLabel,
                                g = 0 !== e.labelRotation,
                                m = e.isHorizontal(),
                                p = u.autoSkip ? e._autoSkip(e.getTicks()) : e.getTicks(),
                                v = r.valueOrDefault(u.fontColor, h.defaultFontColor),
                                y = i(u),
                                b = r.valueOrDefault(d.fontColor, h.defaultFontColor),
                                x = i(d),
                                _ = c.drawTicks ? c.tickMarkLength : 0,
                                k = r.valueOrDefault(f.fontColor, h.defaultFontColor),
                                w = i(f),
                                M = r.options.toPadding(f.padding),
                                S = r.toRadians(e.labelRotation),
                                D = [],
                                C = e.options.gridLines.lineWidth,
                                P = "right" === a.position ? e.right : e.right - C - _,
                                T = "right" === a.position ? e.right + _ : e.right,
                                O = "bottom" === a.position ? e.top + C : e.bottom - _ - C,
                                I = "bottom" === a.position ? e.top + C + _ : e.bottom + C;
                            if (r.each(p, function(i, n) {
                                    if (!r.isNullOrUndef(i.label)) {
                                        var o, s, d, f, v = i.label;
                                        n === e.zeroLineIndex && a.offset === c.offsetGridLines ? (o = c.zeroLineWidth, s = c.zeroLineColor, d = c.zeroLineBorderDash, f = c.zeroLineBorderDashOffset) : (o = r.valueAtIndexOrDefault(c.lineWidth, n), s = r.valueAtIndexOrDefault(c.color, n), d = r.valueOrDefault(c.borderDash, h.borderDash), f = r.valueOrDefault(c.borderDashOffset, h.borderDashOffset));
                                        var y, b, x, k, w, M, A, F, R, L, W = "middle",
                                            Y = "middle",
                                            N = u.padding;
                                        if (m) {
                                            var z = _ + N;
                                            "bottom" === a.position ? (Y = g ? "middle" : "top", W = g ? "right" : "center", L = e.top + z) : (Y = g ? "middle" : "bottom", W = g ? "left" : "center", L = e.bottom - z);
                                            var H = l(e, n, c.offsetGridLines && p.length > 1);
                                            H < e.left && (s = "rgba(0,0,0,0)"), H += r.aliasPixel(o), R = e.getPixelForTick(n) + u.labelOffset, y = x = w = A = H, b = O, k = I, M = t.top, F = t.bottom + C
                                        } else {
                                            var V, B = "left" === a.position;
                                            u.mirror ? (W = B ? "left" : "right", V = N) : (W = B ? "right" : "left", V = _ + N), R = B ? e.right - V : e.left + V;
                                            var E = l(e, n, c.offsetGridLines && p.length > 1);
                                            E < e.top && (s = "rgba(0,0,0,0)"), E += r.aliasPixel(o), L = e.getPixelForTick(n) + u.labelOffset, y = P, x = T, w = t.left, A = t.right + C, b = k = M = F = E
                                        }
                                        D.push({
                                            tx1: y,
                                            ty1: b,
                                            tx2: x,
                                            ty2: k,
                                            x1: w,
                                            y1: M,
                                            x2: A,
                                            y2: F,
                                            labelX: R,
                                            labelY: L,
                                            glWidth: o,
                                            glColor: s,
                                            glBorderDash: d,
                                            glBorderDashOffset: f,
                                            rotation: -1 * S,
                                            label: v,
                                            major: i.major,
                                            textBaseline: Y,
                                            textAlign: W
                                        })
                                    }
                                }), r.each(D, function(t) {
                                    if (c.display && (s.save(), s.lineWidth = t.glWidth, s.strokeStyle = t.glColor, s.setLineDash && (s.setLineDash(t.glBorderDash), s.lineDashOffset = t.glBorderDashOffset), s.beginPath(), c.drawTicks && (s.moveTo(t.tx1, t.ty1), s.lineTo(t.tx2, t.ty2)), c.drawOnChartArea && (s.moveTo(t.x1, t.y1), s.lineTo(t.x2, t.y2)), s.stroke(), s.restore()), u.display) {
                                        s.save(), s.translate(t.labelX, t.labelY), s.rotate(t.rotation), s.font = t.major ? x.font : y.font, s.fillStyle = t.major ? b : v, s.textBaseline = t.textBaseline, s.textAlign = t.textAlign;
                                        var i = t.label;
                                        if (r.isArray(i))
                                            for (var n = i.length, a = 1.5 * y.size, o = e.isHorizontal() ? 0 : -a * (n - 1) / 2, l = 0; l < n; ++l) s.fillText("" + i[l], 0, o), o += a;
                                        else s.fillText(i, 0, 0);
                                        s.restore()
                                    }
                                }), f.display) {
                                var A, F, R = 0,
                                    L = o(f) / 2;
                                if (m) A = e.left + (e.right - e.left) / 2, F = "bottom" === a.position ? e.bottom - L - M.bottom : e.top + L + M.top;
                                else {
                                    var W = "left" === a.position;
                                    A = W ? e.left + L + M.top : e.right - L - M.top, F = e.top + (e.bottom - e.top) / 2, R = W ? -.5 * Math.PI : .5 * Math.PI
                                }
                                s.save(), s.translate(A, F), s.rotate(R), s.textAlign = "center", s.textBaseline = "middle", s.fillStyle = k, s.font = w.font, s.fillText(f.labelString, 0, 0), s.restore()
                            }
                            if (c.drawBorder) {
                                s.lineWidth = r.valueAtIndexOrDefault(c.lineWidth, 0), s.strokeStyle = r.valueAtIndexOrDefault(c.color, 0);
                                var Y = e.left,
                                    N = e.right + C,
                                    z = e.top,
                                    H = e.bottom + C,
                                    V = r.aliasPixel(s.lineWidth);
                                m ? (z = H = "top" === a.position ? e.bottom : e.top, z += V, H += V) : (Y = N = "left" === a.position ? e.right : e.left, Y += V, N += V), s.beginPath(), s.moveTo(Y, z), s.lineTo(N, H), s.stroke()
                            }
                        }
                    }
                })
            }
        }, {
            25: 25,
            26: 26,
            34: 34,
            45: 45
        }],
        33: [function(t, e, i) {
            "use strict";
            var n = t(25),
                a = t(45),
                r = t(30);
            e.exports = function(t) {
                t.scaleService = {
                    constructors: {},
                    defaults: {},
                    registerScaleType: function(t, e, i) {
                        this.constructors[t] = e, this.defaults[t] = a.clone(i)
                    },
                    getScaleConstructor: function(t) {
                        return this.constructors.hasOwnProperty(t) ? this.constructors[t] : void 0
                    },
                    getScaleDefaults: function(t) {
                        return this.defaults.hasOwnProperty(t) ? a.merge({}, [n.scale, this.defaults[t]]) : {}
                    },
                    updateScaleDefaults: function(t, e) {
                        this.defaults.hasOwnProperty(t) && (this.defaults[t] = a.extend(this.defaults[t], e))
                    },
                    addScalesToLayout: function(t) {
                        a.each(t.scales, function(e) {
                            e.fullWidth = e.options.fullWidth, e.position = e.options.position, e.weight = e.options.weight, r.addBox(t, e)
                        })
                    }
                }
            }
        }, {
            25: 25,
            30: 30,
            45: 45
        }],
        34: [function(t, e, i) {
            "use strict";
            var n = t(45);
            e.exports = {
                formatters: {
                    values: function(t) {
                        return n.isArray(t) ? t : "" + t
                    },
                    linear: function(t, e, i) {
                        var a = i.length > 3 ? i[2] - i[1] : i[1] - i[0];
                        Math.abs(a) > 1 && t !== Math.floor(t) && (a = t - Math.floor(t));
                        var r = n.log10(Math.abs(a)),
                            o = "";
                        if (0 !== t) {
                            var s = -1 * Math.floor(r);
                            s = Math.max(Math.min(s, 20), 0), o = t.toFixed(s)
                        } else o = "0";
                        return o
                    },
                    logarithmic: function(t, e, i) {
                        var a = t / Math.pow(10, Math.floor(n.log10(t)));
                        return 0 === t ? "0" : 1 === a || 2 === a || 5 === a || 0 === e || e === i.length - 1 ? t.toExponential() : ""
                    }
                }
            }
        }, {
            45: 45
        }],
        35: [function(t, e, i) {
            "use strict";
            var n = t(25),
                a = t(26),
                r = t(45);
            n._set("global", {
                tooltips: {
                    enabled: !0,
                    custom: null,
                    mode: "nearest",
                    position: "average",
                    intersect: !0,
                    backgroundColor: "rgba(0,0,0,0.8)",
                    titleFontStyle: "bold",
                    titleSpacing: 2,
                    titleMarginBottom: 6,
                    titleFontColor: "#fff",
                    titleAlign: "left",
                    bodySpacing: 2,
                    bodyFontColor: "#fff",
                    bodyAlign: "left",
                    footerFontStyle: "bold",
                    footerSpacing: 2,
                    footerMarginTop: 6,
                    footerFontColor: "#fff",
                    footerAlign: "left",
                    yPadding: 6,
                    xPadding: 6,
                    caretPadding: 2,
                    caretSize: 5,
                    cornerRadius: 6,
                    multiKeyBackground: "#fff",
                    displayColors: !0,
                    borderColor: "rgba(0,0,0,0)",
                    borderWidth: 0,
                    callbacks: {
                        beforeTitle: r.noop,
                        title: function(t, e) {
                            var i = "",
                                n = e.labels,
                                a = n ? n.length : 0;
                            if (t.length > 0) {
                                var r = t[0];
                                r.xLabel ? i = r.xLabel : a > 0 && r.index < a && (i = n[r.index])
                            }
                            return i
                        },
                        afterTitle: r.noop,
                        beforeBody: r.noop,
                        beforeLabel: r.noop,
                        label: function(t, e) {
                            var i = e.datasets[t.datasetIndex].label || "";
                            return i && (i += ": "), i += t.yLabel
                        },
                        labelColor: function(t, e) {
                            var i = e.getDatasetMeta(t.datasetIndex).data[t.index]._view;
                            return {
                                borderColor: i.borderColor,
                                backgroundColor: i.backgroundColor
                            }
                        },
                        labelTextColor: function() {
                            return this._options.bodyFontColor
                        },
                        afterLabel: r.noop,
                        afterBody: r.noop,
                        beforeFooter: r.noop,
                        footer: r.noop,
                        afterFooter: r.noop
                    }
                }
            }), e.exports = function(t) {
                function e(t, e) {
                    var i = r.color(t);
                    return i.alpha(e * i.alpha()).rgbaString()
                }

                function i(t, e) {
                    return e && (r.isArray(e) ? Array.prototype.push.apply(t, e) : t.push(e)), t
                }

                function o(t) {
                    var e = t._xScale,
                        i = t._yScale || t._scale,
                        n = t._index,
                        a = t._datasetIndex;
                    return {
                        xLabel: e ? e.getLabelForIndex(n, a) : "",
                        yLabel: i ? i.getLabelForIndex(n, a) : "",
                        index: n,
                        datasetIndex: a,
                        x: t._model.x,
                        y: t._model.y
                    }
                }

                function s(t) {
                    var e = n.global,
                        i = r.valueOrDefault;
                    return {
                        xPadding: t.xPadding,
                        yPadding: t.yPadding,
                        xAlign: t.xAlign,
                        yAlign: t.yAlign,
                        bodyFontColor: t.bodyFontColor,
                        _bodyFontFamily: i(t.bodyFontFamily, e.defaultFontFamily),
                        _bodyFontStyle: i(t.bodyFontStyle, e.defaultFontStyle),
                        _bodyAlign: t.bodyAlign,
                        bodyFontSize: i(t.bodyFontSize, e.defaultFontSize),
                        bodySpacing: t.bodySpacing,
                        titleFontColor: t.titleFontColor,
                        _titleFontFamily: i(t.titleFontFamily, e.defaultFontFamily),
                        _titleFontStyle: i(t.titleFontStyle, e.defaultFontStyle),
                        titleFontSize: i(t.titleFontSize, e.defaultFontSize),
                        _titleAlign: t.titleAlign,
                        titleSpacing: t.titleSpacing,
                        titleMarginBottom: t.titleMarginBottom,
                        footerFontColor: t.footerFontColor,
                        _footerFontFamily: i(t.footerFontFamily, e.defaultFontFamily),
                        _footerFontStyle: i(t.footerFontStyle, e.defaultFontStyle),
                        footerFontSize: i(t.footerFontSize, e.defaultFontSize),
                        _footerAlign: t.footerAlign,
                        footerSpacing: t.footerSpacing,
                        footerMarginTop: t.footerMarginTop,
                        caretSize: t.caretSize,
                        cornerRadius: t.cornerRadius,
                        backgroundColor: t.backgroundColor,
                        opacity: 0,
                        legendColorBackground: t.multiKeyBackground,
                        displayColors: t.displayColors,
                        borderColor: t.borderColor,
                        borderWidth: t.borderWidth
                    }
                }
                t.Tooltip = a.extend({
                    initialize: function() {
                        this._model = s(this._options), this._lastActive = []
                    },
                    getTitle: function() {
                        var t = this._options.callbacks,
                            e = t.beforeTitle.apply(this, arguments),
                            n = t.title.apply(this, arguments),
                            a = t.afterTitle.apply(this, arguments),
                            r = [];
                        return r = i(r = i(r = i(r, e), n), a)
                    },
                    getBeforeBody: function() {
                        var t = this._options.callbacks.beforeBody.apply(this, arguments);
                        return r.isArray(t) ? t : void 0 !== t ? [t] : []
                    },
                    getBody: function(t, e) {
                        var n = this,
                            a = n._options.callbacks,
                            o = [];
                        return r.each(t, function(t) {
                            var r = {
                                before: [],
                                lines: [],
                                after: []
                            };
                            i(r.before, a.beforeLabel.call(n, t, e)), i(r.lines, a.label.call(n, t, e)), i(r.after, a.afterLabel.call(n, t, e)), o.push(r)
                        }), o
                    },
                    getAfterBody: function() {
                        var t = this._options.callbacks.afterBody.apply(this, arguments);
                        return r.isArray(t) ? t : void 0 !== t ? [t] : []
                    },
                    getFooter: function() {
                        var t = this._options.callbacks,
                            e = t.beforeFooter.apply(this, arguments),
                            n = t.footer.apply(this, arguments),
                            a = t.afterFooter.apply(this, arguments),
                            r = [];
                        return r = i(r = i(r = i(r, e), n), a)
                    },
                    update: function(e) {
                        var i, n, a = this,
                            l = a._options,
                            h = a._model,
                            u = a._model = s(l),
                            d = a._active,
                            c = a._data,
                            f = {
                                xAlign: h.xAlign,
                                yAlign: h.yAlign
                            },
                            g = {
                                x: h.x,
                                y: h.y
                            },
                            m = {
                                width: h.width,
                                height: h.height
                            },
                            p = {
                                x: h.caretX,
                                y: h.caretY
                            };
                        if (d.length) {
                            u.opacity = 1;
                            var v = [],
                                y = [];
                            p = t.Tooltip.positioners[l.position].call(a, d, a._eventPosition);
                            var b = [];
                            for (i = 0, n = d.length; i < n; ++i) b.push(o(d[i]));
                            l.filter && (b = b.filter(function(t) {
                                return l.filter(t, c)
                            })), l.itemSort && (b = b.sort(function(t, e) {
                                return l.itemSort(t, e, c)
                            })), r.each(b, function(t) {
                                v.push(l.callbacks.labelColor.call(a, t, a._chart)), y.push(l.callbacks.labelTextColor.call(a, t, a._chart))
                            }), u.title = a.getTitle(b, c), u.beforeBody = a.getBeforeBody(b, c), u.body = a.getBody(b, c), u.afterBody = a.getAfterBody(b, c), u.footer = a.getFooter(b, c), u.x = Math.round(p.x), u.y = Math.round(p.y), u.caretPadding = l.caretPadding, u.labelColors = v, u.labelTextColors = y, u.dataPoints = b, g = function(t, e, i, n) {
                                var a = t.x,
                                    r = t.y,
                                    o = t.caretSize,
                                    s = t.caretPadding,
                                    l = t.cornerRadius,
                                    h = i.xAlign,
                                    u = i.yAlign,
                                    d = o + s,
                                    c = l + s;
                                return "right" === h ? a -= e.width : "center" === h && ((a -= e.width / 2) + e.width > n.width && (a = n.width - e.width), a < 0 && (a = 0)), "top" === u ? r += d : r -= "bottom" === u ? e.height + d : e.height / 2, "center" === u ? "left" === h ? a += d : "right" === h && (a -= d) : "left" === h ? a -= c : "right" === h && (a += c), {
                                    x: a,
                                    y: r
                                }
                            }(u, m = function(t, e) {
                                var i = t._chart.ctx,
                                    n = 2 * e.yPadding,
                                    a = 0,
                                    o = e.body,
                                    s = o.reduce(function(t, e) {
                                        return t + e.before.length + e.lines.length + e.after.length
                                    }, 0);
                                s += e.beforeBody.length + e.afterBody.length;
                                var l = e.title.length,
                                    h = e.footer.length,
                                    u = e.titleFontSize,
                                    d = e.bodyFontSize,
                                    c = e.footerFontSize;
                                n += l * u, n += l ? (l - 1) * e.titleSpacing : 0, n += l ? e.titleMarginBottom : 0, n += s * d, n += s ? (s - 1) * e.bodySpacing : 0, n += h ? e.footerMarginTop : 0, n += h * c, n += h ? (h - 1) * e.footerSpacing : 0;
                                var f = 0,
                                    g = function(t) {
                                        a = Math.max(a, i.measureText(t).width + f)
                                    };
                                return i.font = r.fontString(u, e._titleFontStyle, e._titleFontFamily), r.each(e.title, g), i.font = r.fontString(d, e._bodyFontStyle, e._bodyFontFamily), r.each(e.beforeBody.concat(e.afterBody), g), f = e.displayColors ? d + 2 : 0, r.each(o, function(t) {
                                    r.each(t.before, g), r.each(t.lines, g), r.each(t.after, g)
                                }), f = 0, i.font = r.fontString(c, e._footerFontStyle, e._footerFontFamily), r.each(e.footer, g), {
                                    width: a += 2 * e.xPadding,
                                    height: n
                                }
                            }(this, u), f = function(t, e) {
                                var i = t._model,
                                    n = t._chart,
                                    a = t._chart.chartArea,
                                    r = "center",
                                    o = "center";
                                i.y < e.height ? o = "top" : i.y > n.height - e.height && (o = "bottom");
                                var s, l, h, u, d, c = (a.left + a.right) / 2,
                                    f = (a.top + a.bottom) / 2;
                                "center" === o ? (s = function(t) {
                                    return t <= c
                                }, l = function(t) {
                                    return t > c
                                }) : (s = function(t) {
                                    return t <= e.width / 2
                                }, l = function(t) {
                                    return t >= n.width - e.width / 2
                                }), h = function(t) {
                                    return t + e.width + i.caretSize + i.caretPadding > n.width
                                }, u = function(t) {
                                    return t - e.width - i.caretSize - i.caretPadding < 0
                                }, d = function(t) {
                                    return t <= f ? "top" : "bottom"
                                }, s(i.x) ? (r = "left", h(i.x) && (r = "center", o = d(i.y))) : l(i.x) && (r = "right", u(i.x) && (r = "center", o = d(i.y)));
                                var g = t._options;
                                return {
                                    xAlign: g.xAlign ? g.xAlign : r,
                                    yAlign: g.yAlign ? g.yAlign : o
                                }
                            }(this, m), a._chart)
                        } else u.opacity = 0;
                        return u.xAlign = f.xAlign, u.yAlign = f.yAlign, u.x = g.x, u.y = g.y, u.width = m.width, u.height = m.height, u.caretX = p.x, u.caretY = p.y, a._model = u, e && l.custom && l.custom.call(a, u), a
                    },
                    drawCaret: function(t, e) {
                        var i = this._chart.ctx,
                            n = this._view,
                            a = this.getCaretPosition(t, e, n);
                        i.lineTo(a.x1, a.y1), i.lineTo(a.x2, a.y2), i.lineTo(a.x3, a.y3)
                    },
                    getCaretPosition: function(t, e, i) {
                        var n, a, r, o, s, l, h = i.caretSize,
                            u = i.cornerRadius,
                            d = i.xAlign,
                            c = i.yAlign,
                            f = t.x,
                            g = t.y,
                            m = e.width,
                            p = e.height;
                        if ("center" === c) s = g + p / 2, "left" === d ? (a = (n = f) - h, r = n, o = s + h, l = s - h) : (a = (n = f + m) + h, r = n, o = s - h, l = s + h);
                        else if ("left" === d ? (n = (a = f + u + h) - h, r = a + h) : "right" === d ? (n = (a = f + m - u - h) - h, r = a + h) : (n = (a = i.caretX) - h, r = a + h), "top" === c) s = (o = g) - h, l = o;
                        else {
                            s = (o = g + p) + h, l = o;
                            var v = r;
                            r = n, n = v
                        }
                        return {
                            x1: n,
                            x2: a,
                            x3: r,
                            y1: o,
                            y2: s,
                            y3: l
                        }
                    },
                    drawTitle: function(t, i, n, a) {
                        var o = i.title;
                        if (o.length) {
                            n.textAlign = i._titleAlign, n.textBaseline = "top";
                            var s = i.titleFontSize,
                                l = i.titleSpacing;
                            n.fillStyle = e(i.titleFontColor, a), n.font = r.fontString(s, i._titleFontStyle, i._titleFontFamily);
                            var h, u;
                            for (h = 0, u = o.length; h < u; ++h) n.fillText(o[h], t.x, t.y), t.y += s + l, h + 1 === o.length && (t.y += i.titleMarginBottom - l)
                        }
                    },
                    drawBody: function(t, i, n, a) {
                        var o = i.bodyFontSize,
                            s = i.bodySpacing,
                            l = i.body;
                        n.textAlign = i._bodyAlign, n.textBaseline = "top", n.font = r.fontString(o, i._bodyFontStyle, i._bodyFontFamily);
                        var h = 0,
                            u = function(e) {
                                n.fillText(e, t.x + h, t.y), t.y += o + s
                            };
                        n.fillStyle = e(i.bodyFontColor, a), r.each(i.beforeBody, u);
                        var d = i.displayColors;
                        h = d ? o + 2 : 0, r.each(l, function(s, l) {
                            var h = e(i.labelTextColors[l], a);
                            n.fillStyle = h, r.each(s.before, u), r.each(s.lines, function(r) {
                                d && (n.fillStyle = e(i.legendColorBackground, a), n.fillRect(t.x, t.y, o, o), n.lineWidth = 1, n.strokeStyle = e(i.labelColors[l].borderColor, a), n.strokeRect(t.x, t.y, o, o), n.fillStyle = e(i.labelColors[l].backgroundColor, a), n.fillRect(t.x + 1, t.y + 1, o - 2, o - 2), n.fillStyle = h), u(r)
                            }), r.each(s.after, u)
                        }), h = 0, r.each(i.afterBody, u), t.y -= s
                    },
                    drawFooter: function(t, i, n, a) {
                        var o = i.footer;
                        o.length && (t.y += i.footerMarginTop, n.textAlign = i._footerAlign, n.textBaseline = "top", n.fillStyle = e(i.footerFontColor, a), n.font = r.fontString(i.footerFontSize, i._footerFontStyle, i._footerFontFamily), r.each(o, function(e) {
                            n.fillText(e, t.x, t.y), t.y += i.footerFontSize + i.footerSpacing
                        }))
                    },
                    drawBackground: function(t, i, n, a, r) {
                        n.fillStyle = e(i.backgroundColor, r), n.strokeStyle = e(i.borderColor, r), n.lineWidth = i.borderWidth;
                        var o = i.xAlign,
                            s = i.yAlign,
                            l = t.x,
                            h = t.y,
                            u = a.width,
                            d = a.height,
                            c = i.cornerRadius;
                        n.beginPath(), n.moveTo(l + c, h), "top" === s && this.drawCaret(t, a), n.lineTo(l + u - c, h), n.quadraticCurveTo(l + u, h, l + u, h + c), "center" === s && "right" === o && this.drawCaret(t, a), n.lineTo(l + u, h + d - c), n.quadraticCurveTo(l + u, h + d, l + u - c, h + d), "bottom" === s && this.drawCaret(t, a), n.lineTo(l + c, h + d), n.quadraticCurveTo(l, h + d, l, h + d - c), "center" === s && "left" === o && this.drawCaret(t, a), n.lineTo(l, h + c), n.quadraticCurveTo(l, h, l + c, h), n.closePath(), n.fill(), i.borderWidth > 0 && n.stroke()
                    },
                    draw: function() {
                        var t = this._chart.ctx,
                            e = this._view;
                        if (0 !== e.opacity) {
                            var i = {
                                    width: e.width,
                                    height: e.height
                                },
                                n = {
                                    x: e.x,
                                    y: e.y
                                },
                                a = Math.abs(e.opacity < .001) ? 0 : e.opacity,
                                r = e.title.length || e.beforeBody.length || e.body.length || e.afterBody.length || e.footer.length;
                            this._options.enabled && r && (this.drawBackground(n, e, t, i, a), n.x += e.xPadding, n.y += e.yPadding, this.drawTitle(n, e, t, a), this.drawBody(n, e, t, a), this.drawFooter(n, e, t, a))
                        }
                    },
                    handleEvent: function(t) {
                        var e = this._options,
                            i = !1;
                        return this._lastActive = this._lastActive || [], "mouseout" === t.type ? this._active = [] : this._active = this._chart.getElementsAtEventForMode(t, e.mode, e), (i = !r.arrayEquals(this._active, this._lastActive)) && (this._lastActive = this._active, (e.enabled || e.custom) && (this._eventPosition = {
                            x: t.x,
                            y: t.y
                        }, this.update(!0), this.pivot())), i
                    }
                }), t.Tooltip.positioners = {
                    average: function(t) {
                        if (!t.length) return !1;
                        var e, i, n = 0,
                            a = 0,
                            r = 0;
                        for (e = 0, i = t.length; e < i; ++e) {
                            var o = t[e];
                            if (o && o.hasValue()) {
                                var s = o.tooltipPosition();
                                n += s.x, a += s.y, ++r
                            }
                        }
                        return {
                            x: Math.round(n / r),
                            y: Math.round(a / r)
                        }
                    },
                    nearest: function(t, e) {
                        var i, n, a, o = e.x,
                            s = e.y,
                            l = Number.POSITIVE_INFINITY;
                        for (i = 0, n = t.length; i < n; ++i) {
                            var h = t[i];
                            if (h && h.hasValue()) {
                                var u = h.getCenterPoint(),
                                    d = r.distanceBetweenPoints(e, u);
                                d < l && (l = d, a = h)
                            }
                        }
                        if (a) {
                            var c = a.tooltipPosition();
                            o = c.x, s = c.y
                        }
                        return {
                            x: o,
                            y: s
                        }
                    }
                }
            }
        }, {
            25: 25,
            26: 26,
            45: 45
        }],
        36: [function(t, e, i) {
            "use strict";
            var n = t(25),
                a = t(26),
                r = t(45);
            n._set("global", {
                elements: {
                    arc: {
                        backgroundColor: n.global.defaultColor,
                        borderColor: "#fff",
                        borderWidth: 2
                    }
                }
            }), e.exports = a.extend({
                inLabelRange: function(t) {
                    var e = this._view;
                    return !!e && Math.pow(t - e.x, 2) < Math.pow(e.radius + e.hoverRadius, 2)
                },
                inRange: function(t, e) {
                    var i = this._view;
                    if (i) {
                        for (var n = r.getAngleFromPoint(i, {
                                x: t,
                                y: e
                            }), a = n.angle, o = n.distance, s = i.startAngle, l = i.endAngle; l < s;) l += 2 * Math.PI;
                        for (; a > l;) a -= 2 * Math.PI;
                        for (; a < s;) a += 2 * Math.PI;
                        var h = a >= s && a <= l,
                            u = o >= i.innerRadius && o <= i.outerRadius;
                        return h && u
                    }
                    return !1
                },
                getCenterPoint: function() {
                    var t = this._view,
                        e = (t.startAngle + t.endAngle) / 2,
                        i = (t.innerRadius + t.outerRadius) / 2;
                    return {
                        x: t.x + Math.cos(e) * i,
                        y: t.y + Math.sin(e) * i
                    }
                },
                getArea: function() {
                    var t = this._view;
                    return Math.PI * ((t.endAngle - t.startAngle) / (2 * Math.PI)) * (Math.pow(t.outerRadius, 2) - Math.pow(t.innerRadius, 2))
                },
                tooltipPosition: function() {
                    var t = this._view,
                        e = t.startAngle + (t.endAngle - t.startAngle) / 2,
                        i = (t.outerRadius - t.innerRadius) / 2 + t.innerRadius;
                    return {
                        x: t.x + Math.cos(e) * i,
                        y: t.y + Math.sin(e) * i
                    }
                },
                draw: function() {
                    var t = this._chart.ctx,
                        e = this._view,
                        i = e.startAngle,
                        n = e.endAngle;
                    t.beginPath(), t.arc(e.x, e.y, e.outerRadius, i, n), t.arc(e.x, e.y, e.innerRadius, n, i, !0), t.closePath(), t.strokeStyle = e.borderColor, t.lineWidth = e.borderWidth, t.fillStyle = e.backgroundColor, t.fill(), t.lineJoin = "bevel", e.borderWidth && t.stroke()
                }
            })
        }, {
            25: 25,
            26: 26,
            45: 45
        }],
        37: [function(t, e, i) {
            "use strict";
            var n = t(25),
                a = t(26),
                r = t(45),
                o = n.global;
            n._set("global", {
                elements: {
                    line: {
                        tension: .4,
                        backgroundColor: o.defaultColor,
                        borderWidth: 3,
                        borderColor: o.defaultColor,
                        borderCapStyle: "butt",
                        borderDash: [],
                        borderDashOffset: 0,
                        borderJoinStyle: "miter",
                        capBezierPoints: !0,
                        fill: !0
                    }
                }
            }), e.exports = a.extend({
                draw: function() {
                    var t, e, i, n, a = this._view,
                        s = this._chart.ctx,
                        l = a.spanGaps,
                        h = this._children.slice(),
                        u = o.elements.line,
                        d = -1;
                    for (this._loop && h.length && h.push(h[0]), s.save(), s.lineCap = a.borderCapStyle || u.borderCapStyle, s.setLineDash && s.setLineDash(a.borderDash || u.borderDash), s.lineDashOffset = a.borderDashOffset || u.borderDashOffset, s.lineJoin = a.borderJoinStyle || u.borderJoinStyle, s.lineWidth = a.borderWidth || u.borderWidth, s.strokeStyle = a.borderColor || o.defaultColor, s.beginPath(), d = -1, t = 0; t < h.length; ++t) e = h[t], i = r.previousItem(h, t), n = e._view, 0 === t ? n.skip || (s.moveTo(n.x, n.y), d = t) : (i = -1 === d ? i : h[d], n.skip || (d !== t - 1 && !l || -1 === d ? s.moveTo(n.x, n.y) : r.canvas.lineTo(s, i._view, e._view), d = t));
                    s.stroke(), s.restore()
                }
            })
        }, {
            25: 25,
            26: 26,
            45: 45
        }],
        38: [function(t, e, i) {
            "use strict";
            var n = t(25),
                a = t(26),
                r = t(45),
                o = n.global.defaultColor;
            n._set("global", {
                elements: {
                    point: {
                        radius: 3,
                        pointStyle: "circle",
                        backgroundColor: o,
                        borderColor: o,
                        borderWidth: 1,
                        hitRadius: 1,
                        hoverRadius: 4,
                        hoverBorderWidth: 1
                    }
                }
            });

            function s(t) {
                var e = this._view;
                return !!e && Math.abs(t - e.x) < e.radius + e.hitRadius
            }
            e.exports = a.extend({
                inRange: function(t, e) {
                    var i = this._view;
                    return !!i && Math.pow(t - i.x, 2) + Math.pow(e - i.y, 2) < Math.pow(i.hitRadius + i.radius, 2)
                },
                inLabelRange: s,
                inXRange: s,
                inYRange: function(t) {
                    var e = this._view;
                    return !!e && Math.abs(t - e.y) < e.radius + e.hitRadius
                },
                getCenterPoint: function() {
                    var t = this._view;
                    return {
                        x: t.x,
                        y: t.y
                    }
                },
                getArea: function() {
                    return Math.PI * Math.pow(this._view.radius, 2)
                },
                tooltipPosition: function() {
                    var t = this._view;
                    return {
                        x: t.x,
                        y: t.y,
                        padding: t.radius + t.borderWidth
                    }
                },
                draw: function(t) {
                    var e = this._view,
                        i = this._model,
                        a = this._chart.ctx,
                        s = e.pointStyle,
                        l = e.radius,
                        h = e.x,
                        u = e.y,
                        d = r.color,
                        c = 0;
                    e.skip || (a.strokeStyle = e.borderColor || o, a.lineWidth = r.valueOrDefault(e.borderWidth, n.global.elements.point.borderWidth), a.fillStyle = e.backgroundColor || o, void 0 !== t && (i.x < t.left || 1.01 * t.right < i.x || i.y < t.top || 1.01 * t.bottom < i.y) && (i.x < t.left ? c = (h - i.x) / (t.left - i.x) : 1.01 * t.right < i.x ? c = (i.x - h) / (i.x - t.right) : i.y < t.top ? c = (u - i.y) / (t.top - i.y) : 1.01 * t.bottom < i.y && (c = (i.y - u) / (i.y - t.bottom)), c = Math.round(100 * c) / 100, a.strokeStyle = d(a.strokeStyle).alpha(c).rgbString(), a.fillStyle = d(a.fillStyle).alpha(c).rgbString()), r.canvas.drawPoint(a, s, l, h, u))
                }
            })
        }, {
            25: 25,
            26: 26,
            45: 45
        }],
        39: [function(t, e, i) {
            "use strict";
            var n = t(25),
                a = t(26);
            n._set("global", {
                elements: {
                    rectangle: {
                        backgroundColor: n.global.defaultColor,
                        borderColor: n.global.defaultColor,
                        borderSkipped: "bottom",
                        borderWidth: 0
                    }
                }
            });

            function r(t) {
                return void 0 !== t._view.width
            }

            function o(t) {
                var e, i, n, a, o = t._view;
                if (r(t)) {
                    var s = o.width / 2;
                    e = o.x - s, i = o.x + s, n = Math.min(o.y, o.base), a = Math.max(o.y, o.base)
                } else {
                    var l = o.height / 2;
                    e = Math.min(o.x, o.base), i = Math.max(o.x, o.base), n = o.y - l, a = o.y + l
                }
                return {
                    left: e,
                    top: n,
                    right: i,
                    bottom: a
                }
            }
            e.exports = a.extend({
                draw: function() {
                    var t, e, i, n, a, r, o, s = this._chart.ctx,
                        l = this._view,
                        h = l.borderWidth;
                    if (l.horizontal ? (t = l.base, e = l.x, i = l.y - l.height / 2, n = l.y + l.height / 2, a = e > t ? 1 : -1, r = 1, o = l.borderSkipped || "left") : (t = l.x - l.width / 2, e = l.x + l.width / 2, i = l.y, a = 1, r = (n = l.base) > i ? 1 : -1, o = l.borderSkipped || "bottom"), h) {
                        var u = Math.min(Math.abs(t - e), Math.abs(i - n)),
                            d = (h = h > u ? u : h) / 2,
                            c = t + ("left" !== o ? d * a : 0),
                            f = e + ("right" !== o ? -d * a : 0),
                            g = i + ("top" !== o ? d * r : 0),
                            m = n + ("bottom" !== o ? -d * r : 0);
                        c !== f && (i = g, n = m), g !== m && (t = c, e = f)
                    }
                    s.beginPath(), s.fillStyle = l.backgroundColor, s.strokeStyle = l.borderColor, s.lineWidth = h;
                    var p = [
                            [t, n],
                            [t, i],
                            [e, i],
                            [e, n]
                        ],
                        v = ["bottom", "left", "top", "right"].indexOf(o, 0); - 1 === v && (v = 0);

                    function y(t) {
                        return p[(v + t) % 4]
                    }
                    var b = y(0);
                    s.moveTo(b[0], b[1]);
                    for (var x = 1; x < 4; x++) b = y(x), s.lineTo(b[0], b[1]);
                    s.fill(), h && s.stroke()
                },
                height: function() {
                    var t = this._view;
                    return t.base - t.y
                },
                inRange: function(t, e) {
                    var i = !1;
                    if (this._view) {
                        var n = o(this);
                        i = t >= n.left && t <= n.right && e >= n.top && e <= n.bottom
                    }
                    return i
                },
                inLabelRange: function(t, e) {
                    if (!this._view) return !1;
                    var i = o(this);
                    return r(this) ? t >= i.left && t <= i.right : e >= i.top && e <= i.bottom
                },
                inXRange: function(t) {
                    var e = o(this);
                    return t >= e.left && t <= e.right
                },
                inYRange: function(t) {
                    var e = o(this);
                    return t >= e.top && t <= e.bottom
                },
                getCenterPoint: function() {
                    var t, e, i = this._view;
                    return r(this) ? (t = i.x, e = (i.y + i.base) / 2) : (t = (i.x + i.base) / 2, e = i.y), {
                        x: t,
                        y: e
                    }
                },
                getArea: function() {
                    var t = this._view;
                    return t.width * Math.abs(t.y - t.base)
                },
                tooltipPosition: function() {
                    var t = this._view;
                    return {
                        x: t.x,
                        y: t.y
                    }
                }
            })
        }, {
            25: 25,
            26: 26
        }],
        40: [function(t, e, i) {
            "use strict";
            e.exports = {}, e.exports.Arc = t(36), e.exports.Line = t(37), e.exports.Point = t(38), e.exports.Rectangle = t(39)
        }, {
            36: 36,
            37: 37,
            38: 38,
            39: 39
        }],
        41: [function(t, e, i) {
            "use strict";
            var n = t(42);
            i = e.exports = {
                clear: function(t) {
                    t.ctx.clearRect(0, 0, t.width, t.height)
                },
                roundedRect: function(t, e, i, n, a, r) {
                    if (r) {
                        var o = Math.min(r, n / 2),
                            s = Math.min(r, a / 2);
                        t.moveTo(e + o, i), t.lineTo(e + n - o, i), t.quadraticCurveTo(e + n, i, e + n, i + s), t.lineTo(e + n, i + a - s), t.quadraticCurveTo(e + n, i + a, e + n - o, i + a), t.lineTo(e + o, i + a), t.quadraticCurveTo(e, i + a, e, i + a - s), t.lineTo(e, i + s), t.quadraticCurveTo(e, i, e + o, i)
                    } else t.rect(e, i, n, a)
                },
                drawPoint: function(t, e, i, n, a) {
                    var r, o, s, l, h, u;
                    if (!e || "object" != typeof e || "[object HTMLImageElement]" !== (r = e.toString()) && "[object HTMLCanvasElement]" !== r) {
                        if (!(isNaN(i) || i <= 0)) {
                            switch (e) {
                                default:
                                    t.beginPath(), t.arc(n, a, i, 0, 2 * Math.PI), t.closePath(), t.fill();
                                    break;
                                case "triangle":
                                    t.beginPath(), h = (o = 3 * i / Math.sqrt(3)) * Math.sqrt(3) / 2, t.moveTo(n - o / 2, a + h / 3), t.lineTo(n + o / 2, a + h / 3), t.lineTo(n, a - 2 * h / 3), t.closePath(), t.fill();
                                    break;
                                case "rect":
                                    u = 1 / Math.SQRT2 * i, t.beginPath(), t.fillRect(n - u, a - u, 2 * u, 2 * u), t.strokeRect(n - u, a - u, 2 * u, 2 * u);
                                    break;
                                case "rectRounded":
                                    var d = i / Math.SQRT2,
                                        c = n - d,
                                        f = a - d,
                                        g = Math.SQRT2 * i;
                                    t.beginPath(), this.roundedRect(t, c, f, g, g, i / 2), t.closePath(), t.fill();
                                    break;
                                case "rectRot":
                                    u = 1 / Math.SQRT2 * i, t.beginPath(), t.moveTo(n - u, a), t.lineTo(n, a + u), t.lineTo(n + u, a), t.lineTo(n, a - u), t.closePath(), t.fill();
                                    break;
                                case "cross":
                                    t.beginPath(), t.moveTo(n, a + i), t.lineTo(n, a - i), t.moveTo(n - i, a), t.lineTo(n + i, a), t.closePath();
                                    break;
                                case "crossRot":
                                    t.beginPath(), s = Math.cos(Math.PI / 4) * i, l = Math.sin(Math.PI / 4) * i, t.moveTo(n - s, a - l), t.lineTo(n + s, a + l), t.moveTo(n - s, a + l), t.lineTo(n + s, a - l), t.closePath();
                                    break;
                                case "star":
                                    t.beginPath(), t.moveTo(n, a + i), t.lineTo(n, a - i), t.moveTo(n - i, a), t.lineTo(n + i, a), s = Math.cos(Math.PI / 4) * i, l = Math.sin(Math.PI / 4) * i, t.moveTo(n - s, a - l), t.lineTo(n + s, a + l), t.moveTo(n - s, a + l), t.lineTo(n + s, a - l), t.closePath();
                                    break;
                                case "line":
                                    t.beginPath(), t.moveTo(n - i, a), t.lineTo(n + i, a), t.closePath();
                                    break;
                                case "dash":
                                    t.beginPath(), t.moveTo(n, a), t.lineTo(n + i, a), t.closePath()
                            }
                            t.stroke()
                        }
                    } else t.drawImage(e, n - e.width / 2, a - e.height / 2, e.width, e.height)
                },
                clipArea: function(t, e) {
                    t.save(), t.beginPath(), t.rect(e.left, e.top, e.right - e.left, e.bottom - e.top), t.clip()
                },
                unclipArea: function(t) {
                    t.restore()
                },
                lineTo: function(t, e, i, n) {
                    if (i.steppedLine) return "after" === i.steppedLine && !n || "after" !== i.steppedLine && n ? t.lineTo(e.x, i.y) : t.lineTo(i.x, e.y), void t.lineTo(i.x, i.y);
                    i.tension ? t.bezierCurveTo(n ? e.controlPointPreviousX : e.controlPointNextX, n ? e.controlPointPreviousY : e.controlPointNextY, n ? i.controlPointNextX : i.controlPointPreviousX, n ? i.controlPointNextY : i.controlPointPreviousY, i.x, i.y) : t.lineTo(i.x, i.y)
                }
            };
            n.clear = i.clear, n.drawRoundedRectangle = function(t) {
                t.beginPath(), i.roundedRect.apply(i, arguments), t.closePath()
            }
        }, {
            42: 42
        }],
        42: [function(t, e, i) {
            "use strict";
            var n = {
                noop: function() {},
                uid: function() {
                    var t = 0;
                    return function() {
                        return t++
                    }
                }(),
                isNullOrUndef: function(t) {
                    return null === t || void 0 === t
                },
                isArray: Array.isArray ? Array.isArray : function(t) {
                    return "[object Array]" === Object.prototype.toString.call(t)
                },
                isObject: function(t) {
                    return null !== t && "[object Object]" === Object.prototype.toString.call(t)
                },
                valueOrDefault: function(t, e) {
                    return void 0 === t ? e : t
                },
                valueAtIndexOrDefault: function(t, e, i) {
                    return n.valueOrDefault(n.isArray(t) ? t[e] : t, i)
                },
                callback: function(t, e, i) {
                    if (t && "function" == typeof t.call) return t.apply(i, e)
                },
                each: function(t, e, i, a) {
                    var r, o, s;
                    if (n.isArray(t))
                        if (o = t.length, a)
                            for (r = o - 1; r >= 0; r--) e.call(i, t[r], r);
                        else
                            for (r = 0; r < o; r++) e.call(i, t[r], r);
                    else if (n.isObject(t))
                        for (o = (s = Object.keys(t)).length, r = 0; r < o; r++) e.call(i, t[s[r]], s[r])
                },
                arrayEquals: function(t, e) {
                    var i, a, r, o;
                    if (!t || !e || t.length !== e.length) return !1;
                    for (i = 0, a = t.length; i < a; ++i)
                        if (r = t[i], o = e[i], r instanceof Array && o instanceof Array) {
                            if (!n.arrayEquals(r, o)) return !1
                        } else if (r !== o) return !1;
                    return !0
                },
                clone: function(t) {
                    if (n.isArray(t)) return t.map(n.clone);
                    if (n.isObject(t)) {
                        for (var e = {}, i = Object.keys(t), a = i.length, r = 0; r < a; ++r) e[i[r]] = n.clone(t[i[r]]);
                        return e
                    }
                    return t
                },
                _merger: function(t, e, i, a) {
                    var r = e[t],
                        o = i[t];
                    n.isObject(r) && n.isObject(o) ? n.merge(r, o, a) : e[t] = n.clone(o)
                },
                _mergerIf: function(t, e, i) {
                    var a = e[t],
                        r = i[t];
                    n.isObject(a) && n.isObject(r) ? n.mergeIf(a, r) : e.hasOwnProperty(t) || (e[t] = n.clone(r))
                },
                merge: function(t, e, i) {
                    var a, r, o, s, l, h = n.isArray(e) ? e : [e],
                        u = h.length;
                    if (!n.isObject(t)) return t;
                    for (a = (i = i || {}).merger || n._merger, r = 0; r < u; ++r)
                        if (e = h[r], n.isObject(e))
                            for (l = 0, s = (o = Object.keys(e)).length; l < s; ++l) a(o[l], t, e, i);
                    return t
                },
                mergeIf: function(t, e) {
                    return n.merge(t, e, {
                        merger: n._mergerIf
                    })
                },
                extend: function(t) {
                    for (var e = function(e, i) {
                            t[i] = e
                        }, i = 1, a = arguments.length; i < a; ++i) n.each(arguments[i], e);
                    return t
                },
                inherits: function(t) {
                    var e = this,
                        i = t && t.hasOwnProperty("constructor") ? t.constructor : function() {
                            return e.apply(this, arguments)
                        },
                        a = function() {
                            this.constructor = i
                        };
                    return a.prototype = e.prototype, i.prototype = new a, i.extend = n.inherits, t && n.extend(i.prototype, t), i.__super__ = e.prototype, i
                }
            };
            e.exports = n, n.callCallback = n.callback, n.indexOf = function(t, e, i) {
                return Array.prototype.indexOf.call(t, e, i)
            }, n.getValueOrDefault = n.valueOrDefault, n.getValueAtIndexOrDefault = n.valueAtIndexOrDefault
        }, {}],
        43: [function(t, e, i) {
            "use strict";
            var n = t(42),
                a = {
                    linear: function(t) {
                        return t
                    },
                    easeInQuad: function(t) {
                        return t * t
                    },
                    easeOutQuad: function(t) {
                        return -t * (t - 2)
                    },
                    easeInOutQuad: function(t) {
                        return (t /= .5) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1)
                    },
                    easeInCubic: function(t) {
                        return t * t * t
                    },
                    easeOutCubic: function(t) {
                        return (t -= 1) * t * t + 1
                    },
                    easeInOutCubic: function(t) {
                        return (t /= .5) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2)
                    },
                    easeInQuart: function(t) {
                        return t * t * t * t
                    },
                    easeOutQuart: function(t) {
                        return -((t -= 1) * t * t * t - 1)
                    },
                    easeInOutQuart: function(t) {
                        return (t /= .5) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2)
                    },
                    easeInQuint: function(t) {
                        return t * t * t * t * t
                    },
                    easeOutQuint: function(t) {
                        return (t -= 1) * t * t * t * t + 1
                    },
                    easeInOutQuint: function(t) {
                        return (t /= .5) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2)
                    },
                    easeInSine: function(t) {
                        return 1 - Math.cos(t * (Math.PI / 2))
                    },
                    easeOutSine: function(t) {
                        return Math.sin(t * (Math.PI / 2))
                    },
                    easeInOutSine: function(t) {
                        return -.5 * (Math.cos(Math.PI * t) - 1)
                    },
                    easeInExpo: function(t) {
                        return 0 === t ? 0 : Math.pow(2, 10 * (t - 1))
                    },
                    easeOutExpo: function(t) {
                        return 1 === t ? 1 : 1 - Math.pow(2, -10 * t)
                    },
                    easeInOutExpo: function(t) {
                        return 0 === t ? 0 : 1 === t ? 1 : (t /= .5) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * --t))
                    },
                    easeInCirc: function(t) {
                        return t >= 1 ? t : -(Math.sqrt(1 - t * t) - 1)
                    },
                    easeOutCirc: function(t) {
                        return Math.sqrt(1 - (t -= 1) * t)
                    },
                    easeInOutCirc: function(t) {
                        return (t /= .5) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
                    },
                    easeInElastic: function(t) {
                        var e = 1.70158,
                            i = 0,
                            n = 1;
                        return 0 === t ? 0 : 1 === t ? 1 : (i || (i = .3), n < 1 ? (n = 1, e = i / 4) : e = i / (2 * Math.PI) * Math.asin(1 / n), -n * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / i))
                    },
                    easeOutElastic: function(t) {
                        var e = 1.70158,
                            i = 0,
                            n = 1;
                        return 0 === t ? 0 : 1 === t ? 1 : (i || (i = .3), n < 1 ? (n = 1, e = i / 4) : e = i / (2 * Math.PI) * Math.asin(1 / n), n * Math.pow(2, -10 * t) * Math.sin((t - e) * (2 * Math.PI) / i) + 1)
                    },
                    easeInOutElastic: function(t) {
                        var e = 1.70158,
                            i = 0,
                            n = 1;
                        return 0 === t ? 0 : 2 == (t /= .5) ? 1 : (i || (i = .45), n < 1 ? (n = 1, e = i / 4) : e = i / (2 * Math.PI) * Math.asin(1 / n), t < 1 ? n * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / i) * -.5 : n * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / i) * .5 + 1)
                    },
                    easeInBack: function(t) {
                        return t * t * (2.70158 * t - 1.70158)
                    },
                    easeOutBack: function(t) {
                        return (t -= 1) * t * (2.70158 * t + 1.70158) + 1
                    },
                    easeInOutBack: function(t) {
                        var e = 1.70158;
                        return (t /= .5) < 1 ? t * t * ((1 + (e *= 1.525)) * t - e) * .5 : .5 * ((t -= 2) * t * ((1 + (e *= 1.525)) * t + e) + 2)
                    },
                    easeInBounce: function(t) {
                        return 1 - a.easeOutBounce(1 - t)
                    },
                    easeOutBounce: function(t) {
                        return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
                    },
                    easeInOutBounce: function(t) {
                        return t < .5 ? .5 * a.easeInBounce(2 * t) : .5 * a.easeOutBounce(2 * t - 1) + .5
                    }
                };
            e.exports = {
                effects: a
            }, n.easingEffects = a
        }, {
            42: 42
        }],
        44: [function(t, e, i) {
            "use strict";
            var n = t(42);
            e.exports = {
                toLineHeight: function(t, e) {
                    var i = ("" + t).match(/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/);
                    if (!i || "normal" === i[1]) return 1.2 * e;
                    switch (t = +i[2], i[3]) {
                        case "px":
                            return t;
                        case "%":
                            t /= 100
                    }
                    return e * t
                },
                toPadding: function(t) {
                    var e, i, a, r;
                    return n.isObject(t) ? (e = +t.top || 0, i = +t.right || 0, a = +t.bottom || 0, r = +t.left || 0) : e = i = a = r = +t || 0, {
                        top: e,
                        right: i,
                        bottom: a,
                        left: r,
                        height: e + a,
                        width: r + i
                    }
                },
                resolve: function(t, e, i) {
                    var a, r, o;
                    for (a = 0, r = t.length; a < r; ++a)
                        if (void 0 !== (o = t[a]) && (void 0 !== e && "function" == typeof o && (o = o(e)), void 0 !== i && n.isArray(o) && (o = o[i]), void 0 !== o)) return o
                }
            }
        }, {
            42: 42
        }],
        45: [function(t, e, i) {
            "use strict";
            e.exports = t(42), e.exports.easing = t(43), e.exports.canvas = t(41), e.exports.options = t(44)
        }, {
            41: 41,
            42: 42,
            43: 43,
            44: 44
        }],
        46: [function(t, e, i) {
            e.exports = {
                acquireContext: function(t) {
                    return t && t.canvas && (t = t.canvas), t && t.getContext("2d") || null
                }
            }
        }, {}],
        47: [function(t, e, i) {
            "use strict";
            var n = t(45),
                a = "$chartjs",
                r = "chartjs-",
                o = r + "render-monitor",
                s = r + "render-animation",
                l = ["animationstart", "webkitAnimationStart"],
                h = {
                    touchstart: "mousedown",
                    touchmove: "mousemove",
                    touchend: "mouseup",
                    pointerenter: "mouseenter",
                    pointerdown: "mousedown",
                    pointermove: "mousemove",
                    pointerup: "mouseup",
                    pointerleave: "mouseout",
                    pointerout: "mouseout"
                };

            function u(t, e) {
                var i = n.getStyle(t, e),
                    a = i && i.match(/^(\d+)(\.\d+)?px$/);
                return a ? Number(a[1]) : void 0
            }
            var d = !! function() {
                var t = !1;
                try {
                    var e = Object.defineProperty({}, "passive", {
                        get: function() {
                            t = !0
                        }
                    });
                    window.addEventListener("e", null, e)
                } catch (t) {}
                return t
            }() && {
                passive: !0
            };

            function c(t, e, i) {
                t.addEventListener(e, i, d)
            }

            function f(t, e, i) {
                t.removeEventListener(e, i, d)
            }

            function g(t, e, i, n, a) {
                return {
                    type: t,
                    chart: e,
                    native: a || null,
                    x: void 0 !== i ? i : null,
                    y: void 0 !== n ? n : null
                }
            }

            function m(t, e, i) {
                var h = t[a] || (t[a] = {}),
                    u = h.resizer = function(t) {
                        var e = document.createElement("div"),
                            i = r + "size-monitor",
                            n = "position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;";
                        e.style.cssText = n, e.className = i, e.innerHTML = '<div class="' + i + '-expand" style="' + n + '"><div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div></div><div class="' + i + '-shrink" style="' + n + '"><div style="position:absolute;width:200%;height:200%;left:0; top:0"></div></div>';
                        var a = e.childNodes[0],
                            o = e.childNodes[1];
                        e._reset = function() {
                            a.scrollLeft = 1e6, a.scrollTop = 1e6, o.scrollLeft = 1e6, o.scrollTop = 1e6
                        };
                        var s = function() {
                            e._reset(), t()
                        };
                        return c(a, "scroll", s.bind(a, "expand")), c(o, "scroll", s.bind(o, "shrink")), e
                    }(function(t, e) {
                        var i = !1,
                            a = [];
                        return function() {
                            a = Array.prototype.slice.call(arguments), e = e || this, i || (i = !0, n.requestAnimFrame.call(window, function() {
                                i = !1, t.apply(e, a)
                            }))
                        }
                    }(function() {
                        if (h.resizer) return e(g("resize", i))
                    }));
                ! function(t, e) {
                    var i = t[a] || (t[a] = {}),
                        r = i.renderProxy = function(t) {
                            t.animationName === s && e()
                        };
                    n.each(l, function(e) {
                        c(t, e, r)
                    }), i.reflow = !!t.offsetParent, t.classList.add(o)
                }(t, function() {
                    if (h.resizer) {
                        var e = t.parentNode;
                        e && e !== u.parentNode && e.insertBefore(u, e.firstChild), u._reset()
                    }
                })
            }

            function p(t) {
                var e = t[a] || {},
                    i = e.resizer;
                delete e.resizer,
                    function(t) {
                        var e = t[a] || {},
                            i = e.renderProxy;
                        i && (n.each(l, function(e) {
                            f(t, e, i)
                        }), delete e.renderProxy), t.classList.remove(o)
                    }(t), i && i.parentNode && i.parentNode.removeChild(i)
            }
            e.exports = {
                _enabled: "undefined" != typeof window && "undefined" != typeof document,
                initialize: function() {
                    var t = "from{opacity:0.99}to{opacity:1}";
                    ! function(t, e) {
                        var i = t._style || document.createElement("style");
                        t._style || (t._style = i, e = "\n" + e, i.setAttribute("type", "text/css"), document.getElementsByTagName("head")[0].appendChild(i)), i.appendChild(document.createTextNode(e))
                    }(this, "@-webkit-keyframes " + s + "{" + t + "}@keyframes " + s + "{" + t + "}." + o + "{-webkit-animation:" + s + " 0.001s;animation:" + s + " 0.001s;}")
                },
                acquireContext: function(t, e) {
                    "string" == typeof t ? t = document.getElementById(t) : t.length && (t = t[0]), t && t.canvas && (t = t.canvas);
                    var i = t && t.getContext && t.getContext("2d");
                    return i && i.canvas === t ? (function(t, e) {
                        var i = t.style,
                            n = t.getAttribute("height"),
                            r = t.getAttribute("width");
                        if (t[a] = {
                                initial: {
                                    height: n,
                                    width: r,
                                    style: {
                                        display: i.display,
                                        height: i.height,
                                        width: i.width
                                    }
                                }
                            }, i.display = i.display || "block", null === r || "" === r) {
                            var o = u(t, "width");
                            void 0 !== o && (t.width = o)
                        }
                        if (null === n || "" === n)
                            if ("" === t.style.height) t.height = t.width / (e.options.aspectRatio || 2);
                            else {
                                var s = u(t, "height");
                                void 0 !== o && (t.height = s)
                            }
                    }(t, e), i) : null
                },
                releaseContext: function(t) {
                    var e = t.canvas;
                    if (e[a]) {
                        var i = e[a].initial;
                        ["height", "width"].forEach(function(t) {
                            var a = i[t];
                            n.isNullOrUndef(a) ? e.removeAttribute(t) : e.setAttribute(t, a)
                        }), n.each(i.style || {}, function(t, i) {
                            e.style[i] = t
                        }), e.width = e.width, delete e[a]
                    }
                },
                addEventListener: function(t, e, i) {
                    var r = t.canvas;
                    if ("resize" !== e) {
                        var o = i[a] || (i[a] = {});
                        c(r, e, (o.proxies || (o.proxies = {}))[t.id + "_" + e] = function(e) {
                            i(function(t, e) {
                                var i = h[t.type] || t.type,
                                    a = n.getRelativePosition(t, e);
                                return g(i, e, a.x, a.y, t)
                            }(e, t))
                        })
                    } else m(r, i, t)
                },
                removeEventListener: function(t, e, i) {
                    var n = t.canvas;
                    if ("resize" !== e) {
                        var r = ((i[a] || {}).proxies || {})[t.id + "_" + e];
                        r && f(n, e, r)
                    } else p(n)
                }
            }, n.addEvent = c, n.removeEvent = f
        }, {
            45: 45
        }],
        48: [function(t, e, i) {
            "use strict";
            var n = t(45),
                a = t(46),
                r = t(47),
                o = r._enabled ? r : a;
            e.exports = n.extend({
                initialize: function() {},
                acquireContext: function() {},
                releaseContext: function() {},
                addEventListener: function() {},
                removeEventListener: function() {}
            }, o)
        }, {
            45: 45,
            46: 46,
            47: 47
        }],
        49: [function(t, e, i) {
            "use strict";
            e.exports = {}, e.exports.filler = t(50), e.exports.legend = t(51), e.exports.title = t(52)
        }, {
            50: 50,
            51: 51,
            52: 52
        }],
        50: [function(t, e, i) {
            "use strict";
            var n = t(25),
                a = t(40),
                r = t(45);
            n._set("global", {
                plugins: {
                    filler: {
                        propagate: !0
                    }
                }
            });
            var o = {
                dataset: function(t) {
                    var e = t.fill,
                        i = t.chart,
                        n = i.getDatasetMeta(e),
                        a = n && i.isDatasetVisible(e) && n.dataset._children || [],
                        r = a.length || 0;
                    return r ? function(t, e) {
                        return e < r && a[e]._view || null
                    } : null
                },
                boundary: function(t) {
                    var e = t.boundary,
                        i = e ? e.x : null,
                        n = e ? e.y : null;
                    return function(t) {
                        return {
                            x: null === i ? t.x : i,
                            y: null === n ? t.y : n
                        }
                    }
                }
            };

            function s(t, e, i) {
                var n, a = t._model || {},
                    r = a.fill;
                if (void 0 === r && (r = !!a.backgroundColor), !1 === r || null === r) return !1;
                if (!0 === r) return "origin";
                if (n = parseFloat(r, 10), isFinite(n) && Math.floor(n) === n) return "-" !== r[0] && "+" !== r[0] || (n = e + n), !(n === e || n < 0 || n >= i) && n;
                switch (r) {
                    case "bottom":
                        return "start";
                    case "top":
                        return "end";
                    case "zero":
                        return "origin";
                    case "origin":
                    case "start":
                    case "end":
                        return r;
                    default:
                        return !1
                }
            }

            function l(t) {
                var e, i = t.el._model || {},
                    n = t.el._scale || {},
                    a = t.fill,
                    r = null;
                if (isFinite(a)) return null;
                if ("start" === a ? r = void 0 === i.scaleBottom ? n.bottom : i.scaleBottom : "end" === a ? r = void 0 === i.scaleTop ? n.top : i.scaleTop : void 0 !== i.scaleZero ? r = i.scaleZero : n.getBasePosition ? r = n.getBasePosition() : n.getBasePixel && (r = n.getBasePixel()), void 0 !== r && null !== r) {
                    if (void 0 !== r.x && void 0 !== r.y) return r;
                    if ("number" == typeof r && isFinite(r)) return {
                        x: (e = n.isHorizontal()) ? r : null,
                        y: e ? null : r
                    }
                }
                return null
            }

            function h(t, e, i) {
                var n, a = t[e].fill,
                    r = [e];
                if (!i) return a;
                for (; !1 !== a && -1 === r.indexOf(a);) {
                    if (!isFinite(a)) return a;
                    if (!(n = t[a])) return !1;
                    if (n.visible) return a;
                    r.push(a), a = n.fill
                }
                return !1
            }

            function u(t) {
                var e = t.fill,
                    i = "dataset";
                return !1 === e ? null : (isFinite(e) || (i = "boundary"), o[i](t))
            }

            function d(t) {
                return t && !t.skip
            }

            function c(t, e, i, n, a) {
                var o;
                if (n && a) {
                    for (t.moveTo(e[0].x, e[0].y), o = 1; o < n; ++o) r.canvas.lineTo(t, e[o - 1], e[o]);
                    for (t.lineTo(i[a - 1].x, i[a - 1].y), o = a - 1; o > 0; --o) r.canvas.lineTo(t, i[o], i[o - 1], !0)
                }
            }
            e.exports = {
                id: "filler",
                afterDatasetsUpdate: function(t, e) {
                    var i, n, r, o, d = (t.data.datasets || []).length,
                        c = e.propagate,
                        f = [];
                    for (n = 0; n < d; ++n) o = null, (r = (i = t.getDatasetMeta(n)).dataset) && r._model && r instanceof a.Line && (o = {
                        visible: t.isDatasetVisible(n),
                        fill: s(r, n, d),
                        chart: t,
                        el: r
                    }), i.$filler = o, f.push(o);
                    for (n = 0; n < d; ++n)(o = f[n]) && (o.fill = h(f, n, c), o.boundary = l(o), o.mapper = u(o))
                },
                beforeDatasetDraw: function(t, e) {
                    var i = e.meta.$filler;
                    if (i) {
                        var a = t.ctx,
                            o = i.el,
                            s = o._view,
                            l = o._children || [],
                            h = i.mapper,
                            u = s.backgroundColor || n.global.defaultColor;
                        h && u && l.length && (r.canvas.clipArea(a, t.chartArea), function(t, e, i, n, a, r) {
                            var o, s, l, h, u, f, g, m = e.length,
                                p = n.spanGaps,
                                v = [],
                                y = [],
                                b = 0,
                                x = 0;
                            for (t.beginPath(), o = 0, s = m + !!r; o < s; ++o) u = i(h = e[l = o % m]._view, l, n), f = d(h), g = d(u), f && g ? (b = v.push(h), x = y.push(u)) : b && x && (p ? (f && v.push(h), g && y.push(u)) : (c(t, v, y, b, x), b = x = 0, v = [], y = []));
                            c(t, v, y, b, x), t.closePath(), t.fillStyle = a, t.fill()
                        }(a, l, h, s, u, o._loop), r.canvas.unclipArea(a))
                    }
                }
            }
        }, {
            25: 25,
            40: 40,
            45: 45
        }],
        51: [function(t, e, i) {
            "use strict";
            var n = t(25),
                a = t(26),
                r = t(45),
                o = t(30),
                s = r.noop;
            n._set("global", {
                legend: {
                    display: !0,
                    position: "top",
                    fullWidth: !0,
                    reverse: !1,
                    weight: 1e3,
                    onClick: function(t, e) {
                        var i = e.datasetIndex,
                            n = this.chart,
                            a = n.getDatasetMeta(i);
                        a.hidden = null === a.hidden ? !n.data.datasets[i].hidden : null, n.update()
                    },
                    onHover: null,
                    labels: {
                        boxWidth: 40,
                        padding: 10,
                        generateLabels: function(t) {
                            var e = t.data;
                            return r.isArray(e.datasets) ? e.datasets.map(function(e, i) {
                                return {
                                    text: e.label,
                                    fillStyle: r.isArray(e.backgroundColor) ? e.backgroundColor[0] : e.backgroundColor,
                                    hidden: !t.isDatasetVisible(i),
                                    lineCap: e.borderCapStyle,
                                    lineDash: e.borderDash,
                                    lineDashOffset: e.borderDashOffset,
                                    lineJoin: e.borderJoinStyle,
                                    lineWidth: e.borderWidth,
                                    strokeStyle: e.borderColor,
                                    pointStyle: e.pointStyle,
                                    datasetIndex: i
                                }
                            }, this) : []
                        }
                    }
                },
                legendCallback: function(t) {
                    var e = [];
                    e.push('<ul class="' + t.id + '-legend">');
                    for (var i = 0; i < t.data.datasets.length; i++) e.push('<li><span style="background-color:' + t.data.datasets[i].backgroundColor + '"></span>'), t.data.datasets[i].label && e.push(t.data.datasets[i].label), e.push("</li>");
                    return e.push("</ul>"), e.join("")
                }
            });

            function l(t, e) {
                return t.usePointStyle ? e * Math.SQRT2 : t.boxWidth
            }
            var h = a.extend({
                initialize: function(t) {
                    r.extend(this, t), this.legendHitBoxes = [], this.doughnutMode = !1
                },
                beforeUpdate: s,
                update: function(t, e, i) {
                    return this.beforeUpdate(), this.maxWidth = t, this.maxHeight = e, this.margins = i, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this.beforeBuildLabels(), this.buildLabels(), this.afterBuildLabels(), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate(), this.minSize
                },
                afterUpdate: s,
                beforeSetDimensions: s,
                setDimensions: function() {
                    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0, this.minSize = {
                        width: 0,
                        height: 0
                    }
                },
                afterSetDimensions: s,
                beforeBuildLabels: s,
                buildLabels: function() {
                    var t = this,
                        e = t.options.labels || {},
                        i = r.callback(e.generateLabels, [t.chart], t) || [];
                    e.filter && (i = i.filter(function(i) {
                        return e.filter(i, t.chart.data)
                    })), t.options.reverse && i.reverse(), t.legendItems = i
                },
                afterBuildLabels: s,
                beforeFit: s,
                fit: function() {
                    var t = this,
                        e = t.options,
                        i = e.labels,
                        a = e.display,
                        o = t.ctx,
                        s = n.global,
                        h = r.valueOrDefault,
                        u = h(i.fontSize, s.defaultFontSize),
                        d = h(i.fontStyle, s.defaultFontStyle),
                        c = h(i.fontFamily, s.defaultFontFamily),
                        f = r.fontString(u, d, c),
                        g = t.legendHitBoxes = [],
                        m = t.minSize,
                        p = t.isHorizontal();
                    if (p ? (m.width = t.maxWidth, m.height = a ? 10 : 0) : (m.width = a ? 10 : 0, m.height = t.maxHeight), a)
                        if (o.font = f, p) {
                            var v = t.lineWidths = [0],
                                y = t.legendItems.length ? u + i.padding : 0;
                            o.textAlign = "left", o.textBaseline = "top", r.each(t.legendItems, function(e, n) {
                                var a = l(i, u) + u / 2 + o.measureText(e.text).width;
                                v[v.length - 1] + a + i.padding >= t.width && (y += u + i.padding, v[v.length] = t.left), g[n] = {
                                    left: 0,
                                    top: 0,
                                    width: a,
                                    height: u
                                }, v[v.length - 1] += a + i.padding
                            }), m.height += y
                        } else {
                            var b = i.padding,
                                x = t.columnWidths = [],
                                _ = i.padding,
                                k = 0,
                                w = 0,
                                M = u + b;
                            r.each(t.legendItems, function(t, e) {
                                var n = l(i, u) + u / 2 + o.measureText(t.text).width;
                                w + M > m.height && (_ += k + i.padding, x.push(k), k = 0, w = 0), k = Math.max(k, n), w += M, g[e] = {
                                    left: 0,
                                    top: 0,
                                    width: n,
                                    height: u
                                }
                            }), _ += k, x.push(k), m.width += _
                        } t.width = m.width, t.height = m.height
                },
                afterFit: s,
                isHorizontal: function() {
                    return "top" === this.options.position || "bottom" === this.options.position
                },
                draw: function() {
                    var t = this,
                        e = t.options,
                        i = e.labels,
                        a = n.global,
                        o = a.elements.line,
                        s = t.width,
                        h = t.lineWidths;
                    if (e.display) {
                        var u, d = t.ctx,
                            c = r.valueOrDefault,
                            f = c(i.fontColor, a.defaultFontColor),
                            g = c(i.fontSize, a.defaultFontSize),
                            m = c(i.fontStyle, a.defaultFontStyle),
                            p = c(i.fontFamily, a.defaultFontFamily),
                            v = r.fontString(g, m, p);
                        d.textAlign = "left", d.textBaseline = "middle", d.lineWidth = .5, d.strokeStyle = f, d.fillStyle = f, d.font = v;
                        var y = l(i, g),
                            b = t.legendHitBoxes,
                            x = t.isHorizontal();
                        u = x ? {
                            x: t.left + (s - h[0]) / 2,
                            y: t.top + i.padding,
                            line: 0
                        } : {
                            x: t.left + i.padding,
                            y: t.top + i.padding,
                            line: 0
                        };
                        var _ = g + i.padding;
                        r.each(t.legendItems, function(n, l) {
                            var f = d.measureText(n.text).width,
                                m = y + g / 2 + f,
                                p = u.x,
                                v = u.y;
                            x ? p + m >= s && (v = u.y += _, u.line++, p = u.x = t.left + (s - h[u.line]) / 2) : v + _ > t.bottom && (p = u.x = p + t.columnWidths[u.line] + i.padding, v = u.y = t.top + i.padding, u.line++),
                                function(t, i, n) {
                                    if (!(isNaN(y) || y <= 0)) {
                                        d.save(), d.fillStyle = c(n.fillStyle, a.defaultColor), d.lineCap = c(n.lineCap, o.borderCapStyle), d.lineDashOffset = c(n.lineDashOffset, o.borderDashOffset), d.lineJoin = c(n.lineJoin, o.borderJoinStyle), d.lineWidth = c(n.lineWidth, o.borderWidth), d.strokeStyle = c(n.strokeStyle, a.defaultColor);
                                        var s = 0 === c(n.lineWidth, o.borderWidth);
                                        if (d.setLineDash && d.setLineDash(c(n.lineDash, o.borderDash)), e.labels && e.labels.usePointStyle) {
                                            var l = g * Math.SQRT2 / 2,
                                                h = l / Math.SQRT2,
                                                u = t + h,
                                                f = i + h;
                                            r.canvas.drawPoint(d, n.pointStyle, l, u, f)
                                        } else s || d.strokeRect(t, i, y, g), d.fillRect(t, i, y, g);
                                        d.restore()
                                    }
                                }(p, v, n), b[l].left = p, b[l].top = v,
                                function(t, e, i, n) {
                                    var a = g / 2,
                                        r = y + a + t,
                                        o = e + a;
                                    d.fillText(i.text, r, o), i.hidden && (d.beginPath(), d.lineWidth = 2, d.moveTo(r, o), d.lineTo(r + n, o), d.stroke())
                                }(p, v, n, f), x ? u.x += m + i.padding : u.y += _
                        })
                    }
                },
                handleEvent: function(t) {
                    var e = this.options,
                        i = "mouseup" === t.type ? "click" : t.type,
                        n = !1;
                    if ("mousemove" === i) {
                        if (!e.onHover) return
                    } else {
                        if ("click" !== i) return;
                        if (!e.onClick) return
                    }
                    var a = t.x,
                        r = t.y;
                    if (a >= this.left && a <= this.right && r >= this.top && r <= this.bottom)
                        for (var o = this.legendHitBoxes, s = 0; s < o.length; ++s) {
                            var l = o[s];
                            if (a >= l.left && a <= l.left + l.width && r >= l.top && r <= l.top + l.height) {
                                if ("click" === i) {
                                    e.onClick.call(this, t.native, this.legendItems[s]), n = !0;
                                    break
                                }
                                if ("mousemove" === i) {
                                    e.onHover.call(this, t.native, this.legendItems[s]), n = !0;
                                    break
                                }
                            }
                        }
                    return n
                }
            });

            function u(t, e) {
                var i = new h({
                    ctx: t.ctx,
                    options: e,
                    chart: t
                });
                o.configure(t, i, e), o.addBox(t, i), t.legend = i
            }
            e.exports = {
                id: "legend",
                _element: h,
                beforeInit: function(t) {
                    var e = t.options.legend;
                    e && u(t, e)
                },
                beforeUpdate: function(t) {
                    var e = t.options.legend,
                        i = t.legend;
                    e ? (r.mergeIf(e, n.global.legend), i ? (o.configure(t, i, e), i.options = e) : u(t, e)) : i && (o.removeBox(t, i), delete t.legend)
                },
                afterEvent: function(t, e) {
                    var i = t.legend;
                    i && i.handleEvent(e)
                }
            }
        }, {
            25: 25,
            26: 26,
            30: 30,
            45: 45
        }],
        52: [function(t, e, i) {
            "use strict";
            var n = t(25),
                a = t(26),
                r = t(45),
                o = t(30),
                s = r.noop;
            n._set("global", {
                title: {
                    display: !1,
                    fontStyle: "bold",
                    fullWidth: !0,
                    lineHeight: 1.2,
                    padding: 10,
                    position: "top",
                    text: "",
                    weight: 2e3
                }
            });
            var l = a.extend({
                initialize: function(t) {
                    r.extend(this, t), this.legendHitBoxes = []
                },
                beforeUpdate: s,
                update: function(t, e, i) {
                    return this.beforeUpdate(), this.maxWidth = t, this.maxHeight = e, this.margins = i, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this.beforeBuildLabels(), this.buildLabels(), this.afterBuildLabels(), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate(), this.minSize
                },
                afterUpdate: s,
                beforeSetDimensions: s,
                setDimensions: function() {
                    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0, this.minSize = {
                        width: 0,
                        height: 0
                    }
                },
                afterSetDimensions: s,
                beforeBuildLabels: s,
                buildLabels: s,
                afterBuildLabels: s,
                beforeFit: s,
                fit: function() {
                    var t = r.valueOrDefault,
                        e = this.options,
                        i = e.display,
                        a = t(e.fontSize, n.global.defaultFontSize),
                        o = this.minSize,
                        s = r.isArray(e.text) ? e.text.length : 1,
                        l = r.options.toLineHeight(e.lineHeight, a),
                        h = i ? s * l + 2 * e.padding : 0;
                    this.isHorizontal() ? (o.width = this.maxWidth, o.height = h) : (o.width = h, o.height = this.maxHeight), this.width = o.width, this.height = o.height
                },
                afterFit: s,
                isHorizontal: function() {
                    var t = this.options.position;
                    return "top" === t || "bottom" === t
                },
                draw: function() {
                    var t = this.ctx,
                        e = r.valueOrDefault,
                        i = this.options,
                        a = n.global;
                    if (i.display) {
                        var o, s, l, h = e(i.fontSize, a.defaultFontSize),
                            u = e(i.fontStyle, a.defaultFontStyle),
                            d = e(i.fontFamily, a.defaultFontFamily),
                            c = r.fontString(h, u, d),
                            f = r.options.toLineHeight(i.lineHeight, h),
                            g = f / 2 + i.padding,
                            m = 0,
                            p = this.top,
                            v = this.left,
                            y = this.bottom,
                            b = this.right;
                        t.fillStyle = e(i.fontColor, a.defaultFontColor), t.font = c, this.isHorizontal() ? (s = v + (b - v) / 2, l = p + g, o = b - v) : (s = "left" === i.position ? v + g : b - g, l = p + (y - p) / 2, o = y - p, m = Math.PI * ("left" === i.position ? -.5 : .5)), t.save(), t.translate(s, l), t.rotate(m), t.textAlign = "center", t.textBaseline = "middle";
                        var x = i.text;
                        if (r.isArray(x))
                            for (var _ = 0, k = 0; k < x.length; ++k) t.fillText(x[k], 0, _, o), _ += f;
                        else t.fillText(x, 0, 0, o);
                        t.restore()
                    }
                }
            });

            function h(t, e) {
                var i = new l({
                    ctx: t.ctx,
                    options: e,
                    chart: t
                });
                o.configure(t, i, e), o.addBox(t, i), t.titleBlock = i
            }
            e.exports = {
                id: "title",
                _element: l,
                beforeInit: function(t) {
                    var e = t.options.title;
                    e && h(t, e)
                },
                beforeUpdate: function(t) {
                    var e = t.options.title,
                        i = t.titleBlock;
                    e ? (r.mergeIf(e, n.global.title), i ? (o.configure(t, i, e), i.options = e) : h(t, e)) : i && (o.removeBox(t, i), delete t.titleBlock)
                }
            }
        }, {
            25: 25,
            26: 26,
            30: 30,
            45: 45
        }],
        53: [function(t, e, i) {
            "use strict";
            e.exports = function(t) {
                var e = t.Scale.extend({
                    getLabels: function() {
                        var t = this.chart.data;
                        return this.options.labels || (this.isHorizontal() ? t.xLabels : t.yLabels) || t.labels
                    },
                    determineDataLimits: function() {
                        var t = this.getLabels();
                        this.minIndex = 0, this.maxIndex = t.length - 1;
                        var e;
                        void 0 !== this.options.ticks.min && (e = t.indexOf(this.options.ticks.min), this.minIndex = -1 !== e ? e : this.minIndex), void 0 !== this.options.ticks.max && (e = t.indexOf(this.options.ticks.max), this.maxIndex = -1 !== e ? e : this.maxIndex), this.min = t[this.minIndex], this.max = t[this.maxIndex]
                    },
                    buildTicks: function() {
                        var t = this.getLabels();
                        this.ticks = 0 === this.minIndex && this.maxIndex === t.length - 1 ? t : t.slice(this.minIndex, this.maxIndex + 1)
                    },
                    getLabelForIndex: function(t, e) {
                        var i = this.chart.data,
                            n = this.isHorizontal();
                        return i.yLabels && !n ? this.getRightValue(i.datasets[e].data[t]) : this.ticks[t - this.minIndex]
                    },
                    getPixelForValue: function(t, e) {
                        var i, n = this.options.offset,
                            a = Math.max(this.maxIndex + 1 - this.minIndex - (n ? 0 : 1), 1);
                        if (void 0 !== t && null !== t && (i = this.isHorizontal() ? t.x : t.y), void 0 !== i || void 0 !== t && isNaN(e)) {
                            var r = this.getLabels();
                            t = i || t;
                            var o = r.indexOf(t);
                            e = -1 !== o ? o : e
                        }
                        if (this.isHorizontal()) {
                            var s = this.width / a,
                                l = s * (e - this.minIndex);
                            return n && (l += s / 2), this.left + Math.round(l)
                        }
                        var h = this.height / a,
                            u = h * (e - this.minIndex);
                        return n && (u += h / 2), this.top + Math.round(u)
                    },
                    getPixelForTick: function(t) {
                        return this.getPixelForValue(this.ticks[t], t + this.minIndex, null)
                    },
                    getValueForPixel: function(t) {
                        var e = this.options.offset,
                            i = Math.max(this._ticks.length - (e ? 0 : 1), 1),
                            n = this.isHorizontal(),
                            a = (n ? this.width : this.height) / i;
                        return t -= n ? this.left : this.top, e && (t -= a / 2), (t <= 0 ? 0 : Math.round(t / a)) + this.minIndex
                    },
                    getBasePixel: function() {
                        return this.bottom
                    }
                });
                t.scaleService.registerScaleType("category", e, {
                    position: "bottom"
                })
            }
        }, {}],
        54: [function(t, e, i) {
            "use strict";
            var n = t(25),
                a = t(45),
                r = t(34);
            e.exports = function(t) {
                var e = {
                        position: "left",
                        ticks: {
                            callback: r.formatters.linear
                        }
                    },
                    i = t.LinearScaleBase.extend({
                        determineDataLimits: function() {
                            var t = this,
                                e = t.options,
                                i = t.chart,
                                n = i.data.datasets,
                                r = t.isHorizontal();

                            function o(e) {
                                return r ? e.xAxisID === t.id : e.yAxisID === t.id
                            }
                            t.min = null, t.max = null;
                            var s = e.stacked;
                            if (void 0 === s && a.each(n, function(t, e) {
                                    if (!s) {
                                        var n = i.getDatasetMeta(e);
                                        i.isDatasetVisible(e) && o(n) && void 0 !== n.stack && (s = !0)
                                    }
                                }), e.stacked || s) {
                                var l = {};
                                a.each(n, function(n, r) {
                                    var s = i.getDatasetMeta(r),
                                        h = [s.type, void 0 === e.stacked && void 0 === s.stack ? r : "", s.stack].join(".");
                                    void 0 === l[h] && (l[h] = {
                                        positiveValues: [],
                                        negativeValues: []
                                    });
                                    var u = l[h].positiveValues,
                                        d = l[h].negativeValues;
                                    i.isDatasetVisible(r) && o(s) && a.each(n.data, function(i, n) {
                                        var a = +t.getRightValue(i);
                                        isNaN(a) || s.data[n].hidden || (u[n] = u[n] || 0, d[n] = d[n] || 0, e.relativePoints ? u[n] = 100 : a < 0 ? d[n] += a : u[n] += a)
                                    })
                                }), a.each(l, function(e) {
                                    var i = e.positiveValues.concat(e.negativeValues),
                                        n = a.min(i),
                                        r = a.max(i);
                                    t.min = null === t.min ? n : Math.min(t.min, n), t.max = null === t.max ? r : Math.max(t.max, r)
                                })
                            } else a.each(n, function(e, n) {
                                var r = i.getDatasetMeta(n);
                                i.isDatasetVisible(n) && o(r) && a.each(e.data, function(e, i) {
                                    var n = +t.getRightValue(e);
                                    isNaN(n) || r.data[i].hidden || (null === t.min ? t.min = n : n < t.min && (t.min = n), null === t.max ? t.max = n : n > t.max && (t.max = n))
                                })
                            });
                            t.min = isFinite(t.min) && !isNaN(t.min) ? t.min : 0, t.max = isFinite(t.max) && !isNaN(t.max) ? t.max : 1, this.handleTickRangeOptions()
                        },
                        getTickLimit: function() {
                            var t, e = this.options.ticks;
                            if (this.isHorizontal()) t = Math.min(e.maxTicksLimit ? e.maxTicksLimit : 11, Math.ceil(this.width / 50));
                            else {
                                var i = a.valueOrDefault(e.fontSize, n.global.defaultFontSize);
                                t = Math.min(e.maxTicksLimit ? e.maxTicksLimit : 11, Math.ceil(this.height / (2 * i)))
                            }
                            return t
                        },
                        handleDirectionalChanges: function() {
                            this.isHorizontal() || this.ticks.reverse()
                        },
                        getLabelForIndex: function(t, e) {
                            return +this.getRightValue(this.chart.data.datasets[e].data[t])
                        },
                        getPixelForValue: function(t) {
                            var e = this.start,
                                i = +this.getRightValue(t),
                                n = this.end - e;
                            return this.isHorizontal() ? this.left + this.width / n * (i - e) : this.bottom - this.height / n * (i - e)
                        },
                        getValueForPixel: function(t) {
                            var e = this.isHorizontal(),
                                i = e ? this.width : this.height,
                                n = (e ? t - this.left : this.bottom - t) / i;
                            return this.start + (this.end - this.start) * n
                        },
                        getPixelForTick: function(t) {
                            return this.getPixelForValue(this.ticksAsNumbers[t])
                        }
                    });
                t.scaleService.registerScaleType("linear", i, e)
            }
        }, {
            25: 25,
            34: 34,
            45: 45
        }],
        55: [function(t, e, i) {
            "use strict";
            var n = t(45);
            e.exports = function(t) {
                var e = n.noop;
                t.LinearScaleBase = t.Scale.extend({
                    getRightValue: function(e) {
                        return "string" == typeof e ? +e : t.Scale.prototype.getRightValue.call(this, e)
                    },
                    handleTickRangeOptions: function() {
                        var t = this.options.ticks;
                        if (t.beginAtZero) {
                            var e = n.sign(this.min),
                                i = n.sign(this.max);
                            e < 0 && i < 0 ? this.max = 0 : e > 0 && i > 0 && (this.min = 0)
                        }
                        var a = void 0 !== t.min || void 0 !== t.suggestedMin,
                            r = void 0 !== t.max || void 0 !== t.suggestedMax;
                        void 0 !== t.min ? this.min = t.min : void 0 !== t.suggestedMin && (null === this.min ? this.min = t.suggestedMin : this.min = Math.min(this.min, t.suggestedMin)), void 0 !== t.max ? this.max = t.max : void 0 !== t.suggestedMax && (null === this.max ? this.max = t.suggestedMax : this.max = Math.max(this.max, t.suggestedMax)), a !== r && this.min >= this.max && (a ? this.max = this.min + 1 : this.min = this.max - 1), this.min === this.max && (this.max++, t.beginAtZero || this.min--)
                    },
                    getTickLimit: e,
                    handleDirectionalChanges: e,
                    buildTicks: function() {
                        var t = this.options.ticks,
                            e = this.getTickLimit(),
                            i = {
                                maxTicks: e = Math.max(2, e),
                                min: t.min,
                                max: t.max,
                                stepSize: n.valueOrDefault(t.fixedStepSize, t.stepSize)
                            },
                            a = this.ticks = function(t, e) {
                                var i, a = [];
                                if (t.stepSize && t.stepSize > 0) i = t.stepSize;
                                else {
                                    var r = n.niceNum(e.max - e.min, !1);
                                    i = n.niceNum(r / (t.maxTicks - 1), !0)
                                }
                                var o = Math.floor(e.min / i) * i,
                                    s = Math.ceil(e.max / i) * i;
                                t.min && t.max && t.stepSize && n.almostWhole((t.max - t.min) / t.stepSize, i / 1e3) && (o = t.min, s = t.max);
                                var l = (s - o) / i;
                                l = n.almostEquals(l, Math.round(l), i / 1e3) ? Math.round(l) : Math.ceil(l);
                                var h = 1;
                                i < 1 && (h = Math.pow(10, i.toString().length - 2), o = Math.round(o * h) / h, s = Math.round(s * h) / h), a.push(void 0 !== t.min ? t.min : o);
                                for (var u = 1; u < l; ++u) a.push(Math.round((o + u * i) * h) / h);
                                return a.push(void 0 !== t.max ? t.max : s), a
                            }(i, this);
                        this.handleDirectionalChanges(), this.max = n.max(a), this.min = n.min(a), t.reverse ? (a.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max)
                    },
                    convertTicksToLabels: function() {
                        this.ticksAsNumbers = this.ticks.slice(), this.zeroLineIndex = this.ticks.indexOf(0), t.Scale.prototype.convertTicksToLabels.call(this)
                    }
                })
            }
        }, {
            45: 45
        }],
        56: [function(t, e, i) {
            "use strict";
            var n = t(45),
                a = t(34);
            e.exports = function(t) {
                var e = {
                        position: "left",
                        ticks: {
                            callback: a.formatters.logarithmic
                        }
                    },
                    i = t.Scale.extend({
                        determineDataLimits: function() {
                            var t = this,
                                e = t.options,
                                i = t.chart,
                                a = i.data.datasets,
                                r = t.isHorizontal();

                            function o(e) {
                                return r ? e.xAxisID === t.id : e.yAxisID === t.id
                            }
                            t.min = null, t.max = null, t.minNotZero = null;
                            var s = e.stacked;
                            if (void 0 === s && n.each(a, function(t, e) {
                                    if (!s) {
                                        var n = i.getDatasetMeta(e);
                                        i.isDatasetVisible(e) && o(n) && void 0 !== n.stack && (s = !0)
                                    }
                                }), e.stacked || s) {
                                var l = {};
                                n.each(a, function(a, r) {
                                    var s = i.getDatasetMeta(r),
                                        h = [s.type, void 0 === e.stacked && void 0 === s.stack ? r : "", s.stack].join(".");
                                    i.isDatasetVisible(r) && o(s) && (void 0 === l[h] && (l[h] = []), n.each(a.data, function(e, i) {
                                        var n = l[h],
                                            a = +t.getRightValue(e);
                                        isNaN(a) || s.data[i].hidden || a < 0 || (n[i] = n[i] || 0, n[i] += a)
                                    }))
                                }), n.each(l, function(e) {
                                    if (e.length > 0) {
                                        var i = n.min(e),
                                            a = n.max(e);
                                        t.min = null === t.min ? i : Math.min(t.min, i), t.max = null === t.max ? a : Math.max(t.max, a)
                                    }
                                })
                            } else n.each(a, function(e, a) {
                                var r = i.getDatasetMeta(a);
                                i.isDatasetVisible(a) && o(r) && n.each(e.data, function(e, i) {
                                    var n = +t.getRightValue(e);
                                    isNaN(n) || r.data[i].hidden || n < 0 || (null === t.min ? t.min = n : n < t.min && (t.min = n), null === t.max ? t.max = n : n > t.max && (t.max = n), 0 !== n && (null === t.minNotZero || n < t.minNotZero) && (t.minNotZero = n))
                                })
                            });
                            this.handleTickRangeOptions()
                        },
                        handleTickRangeOptions: function() {
                            var t = this.options.ticks,
                                e = n.valueOrDefault;
                            this.min = e(t.min, this.min), this.max = e(t.max, this.max), this.min === this.max && (0 !== this.min && null !== this.min ? (this.min = Math.pow(10, Math.floor(n.log10(this.min)) - 1), this.max = Math.pow(10, Math.floor(n.log10(this.max)) + 1)) : (this.min = 1, this.max = 10)), null === this.min && (this.min = Math.pow(10, Math.floor(n.log10(this.max)) - 1)), null === this.max && (this.max = 0 !== this.min ? Math.pow(10, Math.floor(n.log10(this.min)) + 1) : 10), null === this.minNotZero && (this.min > 0 ? this.minNotZero = this.min : this.max < 1 ? this.minNotZero = Math.pow(10, Math.floor(n.log10(this.max))) : this.minNotZero = 1)
                        },
                        buildTicks: function() {
                            var t = this.options.ticks,
                                e = !this.isHorizontal(),
                                i = {
                                    min: t.min,
                                    max: t.max
                                },
                                a = this.ticks = function(t, e) {
                                    var i, a, r = [],
                                        o = n.valueOrDefault,
                                        s = o(t.min, Math.pow(10, Math.floor(n.log10(e.min)))),
                                        l = Math.floor(n.log10(e.max)),
                                        h = Math.ceil(e.max / Math.pow(10, l));
                                    0 === s ? (i = Math.floor(n.log10(e.minNotZero)), a = Math.floor(e.minNotZero / Math.pow(10, i)), r.push(s), s = a * Math.pow(10, i)) : (i = Math.floor(n.log10(s)), a = Math.floor(s / Math.pow(10, i)));
                                    var u = i < 0 ? Math.pow(10, Math.abs(i)) : 1;
                                    do {
                                        r.push(s), 10 == ++a && (a = 1, u = ++i >= 0 ? 1 : u), s = Math.round(a * Math.pow(10, i) * u) / u
                                    } while (i < l || i === l && a < h);
                                    var d = o(t.max, s);
                                    return r.push(d), r
                                }(i, this);
                            this.max = n.max(a), this.min = n.min(a), t.reverse ? (e = !e, this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), e && a.reverse()
                        },
                        convertTicksToLabels: function() {
                            this.tickValues = this.ticks.slice(), t.Scale.prototype.convertTicksToLabels.call(this)
                        },
                        getLabelForIndex: function(t, e) {
                            return +this.getRightValue(this.chart.data.datasets[e].data[t])
                        },
                        getPixelForTick: function(t) {
                            return this.getPixelForValue(this.tickValues[t])
                        },
                        _getFirstTickValue: function(t) {
                            var e = Math.floor(n.log10(t));
                            return Math.floor(t / Math.pow(10, e)) * Math.pow(10, e)
                        },
                        getPixelForValue: function(e) {
                            var i, a, r, o, s, l = this.options.ticks.reverse,
                                h = n.log10,
                                u = this._getFirstTickValue(this.minNotZero),
                                d = 0;
                            return e = +this.getRightValue(e), l ? (r = this.end, o = this.start, s = -1) : (r = this.start, o = this.end, s = 1), this.isHorizontal() ? (i = this.width, a = l ? this.right : this.left) : (i = this.height, s *= -1, a = l ? this.top : this.bottom), e !== r && (0 === r && (i -= d = n.getValueOrDefault(this.options.ticks.fontSize, t.defaults.global.defaultFontSize), r = u), 0 !== e && (d += i / (h(o) - h(r)) * (h(e) - h(r))), a += s * d), a
                        },
                        getValueForPixel: function(e) {
                            var i, a, r, o, s = this.options.ticks.reverse,
                                l = n.log10,
                                h = this._getFirstTickValue(this.minNotZero);
                            if (s ? (a = this.end, r = this.start) : (a = this.start, r = this.end), this.isHorizontal() ? (i = this.width, o = s ? this.right - e : e - this.left) : (i = this.height, o = s ? e - this.top : this.bottom - e), o !== a) {
                                if (0 === a) {
                                    var u = n.getValueOrDefault(this.options.ticks.fontSize, t.defaults.global.defaultFontSize);
                                    o -= u, i -= u, a = h
                                }
                                o *= l(r) - l(a), o /= i, o = Math.pow(10, l(a) + o)
                            }
                            return o
                        }
                    });
                t.scaleService.registerScaleType("logarithmic", i, e)
            }
        }, {
            34: 34,
            45: 45
        }],
        57: [function(t, e, i) {
            "use strict";
            var n = t(25),
                a = t(45),
                r = t(34);
            e.exports = function(t) {
                var e = n.global,
                    i = {
                        display: !0,
                        animate: !0,
                        position: "chartArea",
                        angleLines: {
                            display: !0,
                            color: "rgba(0, 0, 0, 0.1)",
                            lineWidth: 1
                        },
                        gridLines: {
                            circular: !1
                        },
                        ticks: {
                            showLabelBackdrop: !0,
                            backdropColor: "rgba(255,255,255,0.75)",
                            backdropPaddingY: 2,
                            backdropPaddingX: 2,
                            callback: r.formatters.linear
                        },
                        pointLabels: {
                            display: !0,
                            fontSize: 10,
                            callback: function(t) {
                                return t
                            }
                        }
                    };

                function o(t) {
                    var e = t.options;
                    return e.angleLines.display || e.pointLabels.display ? t.chart.data.labels.length : 0
                }

                function s(t) {
                    var i = t.options.pointLabels,
                        n = a.valueOrDefault(i.fontSize, e.defaultFontSize),
                        r = a.valueOrDefault(i.fontStyle, e.defaultFontStyle),
                        o = a.valueOrDefault(i.fontFamily, e.defaultFontFamily);
                    return {
                        size: n,
                        style: r,
                        family: o,
                        font: a.fontString(n, r, o)
                    }
                }

                function l(t, e, i, n, a) {
                    return t === n || t === a ? {
                        start: e - i / 2,
                        end: e + i / 2
                    } : t < n || t > a ? {
                        start: e - i - 5,
                        end: e
                    } : {
                        start: e,
                        end: e + i + 5
                    }
                }

                function h(t, e, i, n) {
                    if (a.isArray(e))
                        for (var r = i.y, o = 1.5 * n, s = 0; s < e.length; ++s) t.fillText(e[s], i.x, r), r += o;
                    else t.fillText(e, i.x, i.y)
                }

                function u(t) {
                    return a.isNumber(t) ? t : 0
                }
                var d = t.LinearScaleBase.extend({
                    setDimensions: function() {
                        var t = this.options,
                            i = t.ticks;
                        this.width = this.maxWidth, this.height = this.maxHeight, this.xCenter = Math.round(this.width / 2), this.yCenter = Math.round(this.height / 2);
                        var n = a.min([this.height, this.width]),
                            r = a.valueOrDefault(i.fontSize, e.defaultFontSize);
                        this.drawingArea = t.display ? n / 2 - (r / 2 + i.backdropPaddingY) : n / 2
                    },
                    determineDataLimits: function() {
                        var t = this,
                            e = t.chart,
                            i = Number.POSITIVE_INFINITY,
                            n = Number.NEGATIVE_INFINITY;
                        a.each(e.data.datasets, function(r, o) {
                            if (e.isDatasetVisible(o)) {
                                var s = e.getDatasetMeta(o);
                                a.each(r.data, function(e, a) {
                                    var r = +t.getRightValue(e);
                                    isNaN(r) || s.data[a].hidden || (i = Math.min(r, i), n = Math.max(r, n))
                                })
                            }
                        }), t.min = i === Number.POSITIVE_INFINITY ? 0 : i, t.max = n === Number.NEGATIVE_INFINITY ? 0 : n, t.handleTickRangeOptions()
                    },
                    getTickLimit: function() {
                        var t = this.options.ticks,
                            i = a.valueOrDefault(t.fontSize, e.defaultFontSize);
                        return Math.min(t.maxTicksLimit ? t.maxTicksLimit : 11, Math.ceil(this.drawingArea / (1.5 * i)))
                    },
                    convertTicksToLabels: function() {
                        t.LinearScaleBase.prototype.convertTicksToLabels.call(this), this.pointLabels = this.chart.data.labels.map(this.options.pointLabels.callback, this)
                    },
                    getLabelForIndex: function(t, e) {
                        return +this.getRightValue(this.chart.data.datasets[e].data[t])
                    },
                    fit: function() {
                        this.options.pointLabels.display ? function(t) {
                            var e, i, n, r = s(t),
                                h = Math.min(t.height / 2, t.width / 2),
                                u = {
                                    r: t.width,
                                    l: 0,
                                    t: t.height,
                                    b: 0
                                },
                                d = {};
                            t.ctx.font = r.font, t._pointLabelSizes = [];
                            var c = o(t);
                            for (e = 0; e < c; e++) {
                                n = t.getPointPosition(e, h), v = t.ctx, y = r.size, b = t.pointLabels[e] || "", i = a.isArray(b) ? {
                                    w: a.longestText(v, v.font, b),
                                    h: b.length * y + 1.5 * (b.length - 1) * y
                                } : {
                                    w: v.measureText(b).width,
                                    h: y
                                }, t._pointLabelSizes[e] = i;
                                var f = t.getIndexAngle(e),
                                    g = a.toDegrees(f) % 360,
                                    m = l(g, n.x, i.w, 0, 180),
                                    p = l(g, n.y, i.h, 90, 270);
                                m.start < u.l && (u.l = m.start, d.l = f), m.end > u.r && (u.r = m.end, d.r = f), p.start < u.t && (u.t = p.start, d.t = f), p.end > u.b && (u.b = p.end, d.b = f)
                            }
                            var v, y, b;
                            t.setReductions(h, u, d)
                        }(this) : function(t) {
                            var e = Math.min(t.height / 2, t.width / 2);
                            t.drawingArea = Math.round(e), t.setCenterPoint(0, 0, 0, 0)
                        }(this)
                    },
                    setReductions: function(t, e, i) {
                        var n = e.l / Math.sin(i.l),
                            a = Math.max(e.r - this.width, 0) / Math.sin(i.r),
                            r = -e.t / Math.cos(i.t),
                            o = -Math.max(e.b - this.height, 0) / Math.cos(i.b);
                        n = u(n), a = u(a), r = u(r), o = u(o), this.drawingArea = Math.min(Math.round(t - (n + a) / 2), Math.round(t - (r + o) / 2)), this.setCenterPoint(n, a, r, o)
                    },
                    setCenterPoint: function(t, e, i, n) {
                        var a = this.width - e - this.drawingArea,
                            r = t + this.drawingArea,
                            o = i + this.drawingArea,
                            s = this.height - n - this.drawingArea;
                        this.xCenter = Math.round((r + a) / 2 + this.left), this.yCenter = Math.round((o + s) / 2 + this.top)
                    },
                    getIndexAngle: function(t) {
                        return t * (2 * Math.PI / o(this)) + (this.chart.options && this.chart.options.startAngle ? this.chart.options.startAngle : 0) * Math.PI * 2 / 360
                    },
                    getDistanceFromCenterForValue: function(t) {
                        if (null === t) return 0;
                        var e = this.drawingArea / (this.max - this.min);
                        return this.options.ticks.reverse ? (this.max - t) * e : (t - this.min) * e
                    },
                    getPointPosition: function(t, e) {
                        var i = this.getIndexAngle(t) - Math.PI / 2;
                        return {
                            x: Math.round(Math.cos(i) * e) + this.xCenter,
                            y: Math.round(Math.sin(i) * e) + this.yCenter
                        }
                    },
                    getPointPositionForValue: function(t, e) {
                        return this.getPointPosition(t, this.getDistanceFromCenterForValue(e))
                    },
                    getBasePosition: function() {
                        var t = this.min,
                            e = this.max;
                        return this.getPointPositionForValue(0, this.beginAtZero ? 0 : t < 0 && e < 0 ? e : t > 0 && e > 0 ? t : 0)
                    },
                    draw: function() {
                        var t = this,
                            i = t.options,
                            n = i.gridLines,
                            r = i.ticks,
                            l = a.valueOrDefault;
                        if (i.display) {
                            var u = t.ctx,
                                d = this.getIndexAngle(0),
                                c = l(r.fontSize, e.defaultFontSize),
                                f = l(r.fontStyle, e.defaultFontStyle),
                                g = l(r.fontFamily, e.defaultFontFamily),
                                m = a.fontString(c, f, g);
                            a.each(t.ticks, function(i, s) {
                                if (s > 0 || r.reverse) {
                                    var h = t.getDistanceFromCenterForValue(t.ticksAsNumbers[s]);
                                    if (n.display && 0 !== s && function(t, e, i, n) {
                                            var r = t.ctx;
                                            if (r.strokeStyle = a.valueAtIndexOrDefault(e.color, n - 1), r.lineWidth = a.valueAtIndexOrDefault(e.lineWidth, n - 1), t.options.gridLines.circular) r.beginPath(), r.arc(t.xCenter, t.yCenter, i, 0, 2 * Math.PI), r.closePath(), r.stroke();
                                            else {
                                                var s = o(t);
                                                if (0 === s) return;
                                                r.beginPath();
                                                var l = t.getPointPosition(0, i);
                                                r.moveTo(l.x, l.y);
                                                for (var h = 1; h < s; h++) l = t.getPointPosition(h, i), r.lineTo(l.x, l.y);
                                                r.closePath(), r.stroke()
                                            }
                                        }(t, n, h, s), r.display) {
                                        var f = l(r.fontColor, e.defaultFontColor);
                                        if (u.font = m, u.save(), u.translate(t.xCenter, t.yCenter), u.rotate(d), r.showLabelBackdrop) {
                                            var g = u.measureText(i).width;
                                            u.fillStyle = r.backdropColor, u.fillRect(-g / 2 - r.backdropPaddingX, -h - c / 2 - r.backdropPaddingY, g + 2 * r.backdropPaddingX, c + 2 * r.backdropPaddingY)
                                        }
                                        u.textAlign = "center", u.textBaseline = "middle", u.fillStyle = f, u.fillText(i, 0, -h), u.restore()
                                    }
                                }
                            }), (i.angleLines.display || i.pointLabels.display) && function(t) {
                                var i = t.ctx,
                                    n = t.options,
                                    r = n.angleLines,
                                    l = n.pointLabels;
                                i.lineWidth = r.lineWidth, i.strokeStyle = r.color;
                                var u = t.getDistanceFromCenterForValue(n.ticks.reverse ? t.min : t.max),
                                    d = s(t);
                                i.textBaseline = "top";
                                for (var c = o(t) - 1; c >= 0; c--) {
                                    if (r.display) {
                                        var f = t.getPointPosition(c, u);
                                        i.beginPath(), i.moveTo(t.xCenter, t.yCenter), i.lineTo(f.x, f.y), i.stroke(), i.closePath()
                                    }
                                    if (l.display) {
                                        var g = t.getPointPosition(c, u + 5),
                                            m = a.valueAtIndexOrDefault(l.fontColor, c, e.defaultFontColor);
                                        i.font = d.font, i.fillStyle = m;
                                        var p = t.getIndexAngle(c),
                                            v = a.toDegrees(p);
                                        i.textAlign = (_ = v, 0 === _ || 180 === _ ? "center" : _ < 180 ? "left" : "right"), y = v, b = t._pointLabelSizes[c], x = g, 90 === y || 270 === y ? x.y -= b.h / 2 : (y > 270 || y < 90) && (x.y -= b.h), h(i, t.pointLabels[c] || "", g, d.size)
                                    }
                                }
                                var y, b, x, _
                            }(t)
                        }
                    }
                });
                t.scaleService.registerScaleType("radialLinear", d, i)
            }
        }, {
            25: 25,
            34: 34,
            45: 45
        }],
        58: [function(t, e, i) {
            "use strict";
            var n = t(6);
            n = "function" == typeof n ? n : window.moment;
            var a = t(25),
                r = t(45),
                o = Number.MIN_SAFE_INTEGER || -9007199254740991,
                s = Number.MAX_SAFE_INTEGER || 9007199254740991,
                l = {
                    millisecond: {
                        common: !0,
                        size: 1,
                        steps: [1, 2, 5, 10, 20, 50, 100, 250, 500]
                    },
                    second: {
                        common: !0,
                        size: 1e3,
                        steps: [1, 2, 5, 10, 30]
                    },
                    minute: {
                        common: !0,
                        size: 6e4,
                        steps: [1, 2, 5, 10, 30]
                    },
                    hour: {
                        common: !0,
                        size: 36e5,
                        steps: [1, 2, 3, 6, 12]
                    },
                    day: {
                        common: !0,
                        size: 864e5,
                        steps: [1, 2, 5]
                    },
                    week: {
                        common: !1,
                        size: 6048e5,
                        steps: [1, 2, 3, 4]
                    },
                    month: {
                        common: !0,
                        size: 2628e6,
                        steps: [1, 2, 3]
                    },
                    quarter: {
                        common: !1,
                        size: 7884e6,
                        steps: [1, 2, 3, 4]
                    },
                    year: {
                        common: !0,
                        size: 3154e7
                    }
                },
                h = Object.keys(l);

            function u(t, e) {
                return t - e
            }

            function d(t) {
                var e, i, n, a = {},
                    r = [];
                for (e = 0, i = t.length; e < i; ++e) a[n = t[e]] || (a[n] = !0, r.push(n));
                return r
            }

            function c(t, e, i, n) {
                var a = function(t, e, i) {
                        for (var n, a, r, o = 0, s = t.length - 1; o >= 0 && o <= s;) {
                            if (a = t[(n = o + s >> 1) - 1] || null, r = t[n], !a) return {
                                lo: null,
                                hi: r
                            };
                            if (r[e] < i) o = n + 1;
                            else {
                                if (!(a[e] > i)) return {
                                    lo: a,
                                    hi: r
                                };
                                s = n - 1
                            }
                        }
                        return {
                            lo: r,
                            hi: null
                        }
                    }(t, e, i),
                    r = a.lo ? a.hi ? a.lo : t[t.length - 2] : t[0],
                    o = a.lo ? a.hi ? a.hi : t[t.length - 1] : t[1],
                    s = o[e] - r[e],
                    l = s ? (i - r[e]) / s : 0,
                    h = (o[n] - r[n]) * l;
                return r[n] + h
            }

            function f(t, e) {
                var i = e.parser,
                    a = e.parser || e.format;
                return "function" == typeof i ? i(t) : "string" == typeof t && "string" == typeof a ? n(t, a) : (t instanceof n || (t = n(t)), t.isValid() ? t : "function" == typeof a ? a(t) : t)
            }

            function g(t, e) {
                if (r.isNullOrUndef(t)) return null;
                var i = e.options.time,
                    n = f(e.getRightValue(t), i);
                return n.isValid() ? (i.round && n.startOf(i.round), n.valueOf()) : null
            }

            function m(t) {
                for (var e = h.indexOf(t) + 1, i = h.length; e < i; ++e)
                    if (l[h[e]].common) return h[e]
            }

            function p(t, e, i, a) {
                var o, u = a.time,
                    d = u.unit || function(t, e, i, n) {
                        var a, r, o, u = h.length;
                        for (a = h.indexOf(t); a < u - 1; ++a)
                            if (o = (r = l[h[a]]).steps ? r.steps[r.steps.length - 1] : s, r.common && Math.ceil((i - e) / (o * r.size)) <= n) return h[a];
                        return h[u - 1]
                    }(u.minUnit, t, e, i),
                    c = m(d),
                    f = r.valueOrDefault(u.stepSize, u.unitStepSize),
                    g = "week" === d && u.isoWeekday,
                    p = a.ticks.major.enabled,
                    v = l[d],
                    y = n(t),
                    b = n(e),
                    x = [];
                for (f || (f = function(t, e, i, n) {
                        var a, r, o, s = e - t,
                            h = l[i],
                            u = h.size,
                            d = h.steps;
                        if (!d) return Math.ceil(s / (n * u));
                        for (a = 0, r = d.length; a < r && (o = d[a], !(Math.ceil(s / (u * o)) <= n)); ++a);
                        return o
                    }(t, e, d, i)), g && (y = y.isoWeekday(g), b = b.isoWeekday(g)), y = y.startOf(g ? "day" : d), (b = b.startOf(g ? "day" : d)) < e && b.add(1, d), o = n(y), p && c && !g && !u.round && (o.startOf(c), o.add(~~((y - o) / (v.size * f)) * f, d)); o < b; o.add(f, d)) x.push(+o);
                return x.push(+o), x
            }
            e.exports = function(t) {
                var e = t.Scale.extend({
                    initialize: function() {
                        if (!n) throw new Error("Chart.js - Moment.js could not be found! You must include it before Chart.js to use the time scale. Download at https://momentjs.com");
                        this.mergeTicksOptions(), t.Scale.prototype.initialize.call(this)
                    },
                    update: function() {
                        var e = this.options;
                        return e.time && e.time.format && console.warn("options.time.format is deprecated and replaced by options.time.parser."), t.Scale.prototype.update.apply(this, arguments)
                    },
                    getRightValue: function(e) {
                        return e && void 0 !== e.t && (e = e.t), t.Scale.prototype.getRightValue.call(this, e)
                    },
                    determineDataLimits: function() {
                        var t, e, i, a, l, h, c = this.chart,
                            f = this.options.time,
                            m = f.unit || "day",
                            p = s,
                            v = o,
                            y = [],
                            b = [],
                            x = [];
                        for (t = 0, i = c.data.labels.length; t < i; ++t) x.push(g(c.data.labels[t], this));
                        for (t = 0, i = (c.data.datasets || []).length; t < i; ++t)
                            if (c.isDatasetVisible(t))
                                if (l = c.data.datasets[t].data, r.isObject(l[0]))
                                    for (b[t] = [], e = 0, a = l.length; e < a; ++e) h = g(l[e], this), y.push(h), b[t][e] = h;
                                else y.push.apply(y, x), b[t] = x.slice(0);
                        else b[t] = [];
                        x.length && (x = d(x).sort(u), p = Math.min(p, x[0]), v = Math.max(v, x[x.length - 1])), y.length && (y = d(y).sort(u), p = Math.min(p, y[0]), v = Math.max(v, y[y.length - 1])), p = g(f.min, this) || p, v = g(f.max, this) || v, p = p === s ? +n().startOf(m) : p, v = v === o ? +n().endOf(m) + 1 : v, this.min = Math.min(p, v), this.max = Math.max(p + 1, v), this._horizontal = this.isHorizontal(), this._table = [], this._timestamps = {
                            data: y,
                            datasets: b,
                            labels: x
                        }
                    },
                    buildTicks: function() {
                        var t, e, i, a = this.min,
                            r = this.max,
                            o = this.options,
                            s = o.time,
                            u = [],
                            d = [];
                        switch (o.ticks.source) {
                            case "data":
                                u = this._timestamps.data;
                                break;
                            case "labels":
                                u = this._timestamps.labels;
                                break;
                            case "auto":
                            default:
                                u = p(a, r, this.getLabelCapacity(a), o)
                        }
                        for ("ticks" === o.bounds && u.length && (a = u[0], r = u[u.length - 1]), a = g(s.min, this) || a, r = g(s.max, this) || r, t = 0, e = u.length; t < e; ++t)(i = u[t]) >= a && i <= r && d.push(i);
                        return this.min = a, this.max = r, this._unit = s.unit || function(t, e, i, a) {
                                var r, o, s = n.duration(n(a).diff(n(i)));
                                for (r = h.length - 1; r >= h.indexOf(e); r--)
                                    if (o = h[r], l[o].common && s.as(o) >= t.length) return o;
                                return h[e ? h.indexOf(e) : 0]
                            }(d, s.minUnit, this.min, this.max), this._majorUnit = m(this._unit), this._table = function(t, e, i, n) {
                                if ("linear" === n || !t.length) return [{
                                    time: e,
                                    pos: 0
                                }, {
                                    time: i,
                                    pos: 1
                                }];
                                var a, r, o, s, l, h = [],
                                    u = [e];
                                for (a = 0, r = t.length; a < r; ++a)(s = t[a]) > e && s < i && u.push(s);
                                for (u.push(i), a = 0, r = u.length; a < r; ++a) l = u[a + 1], o = u[a - 1], s = u[a], void 0 !== o && void 0 !== l && Math.round((l + o) / 2) === s || h.push({
                                    time: s,
                                    pos: a / (r - 1)
                                });
                                return h
                            }(this._timestamps.data, a, r, o.distribution), this._offsets = function(t, e, i, n, a) {
                                var r, o, s = 0,
                                    l = 0;
                                return a.offset && e.length && (a.time.min || (r = e.length > 1 ? e[1] : n, o = e[0], s = (c(t, "time", r, "pos") - c(t, "time", o, "pos")) / 2), a.time.max || (r = e[e.length - 1], o = e.length > 1 ? e[e.length - 2] : i, l = (c(t, "time", r, "pos") - c(t, "time", o, "pos")) / 2)), {
                                    left: s,
                                    right: l
                                }
                            }(this._table, d, a, r, o), this._labelFormat = function(t, e) {
                                var i, n, a, r = t.length;
                                for (i = 0; i < r; i++) {
                                    if (0 !== (n = f(t[i], e)).millisecond()) return "MMM D, YYYY h:mm:ss.SSS a";
                                    0 === n.second() && 0 === n.minute() && 0 === n.hour() || (a = !0)
                                }
                                return a ? "MMM D, YYYY h:mm:ss a" : "MMM D, YYYY"
                            }(this._timestamps.data, s),
                            function(t, e) {
                                var i, a, r, o, s = [];
                                for (i = 0, a = t.length; i < a; ++i) r = t[i], o = !!e && r === +n(r).startOf(e), s.push({
                                    value: r,
                                    major: o
                                });
                                return s
                            }(d, this._majorUnit)
                    },
                    getLabelForIndex: function(t, e) {
                        var i = this.chart.data,
                            n = this.options.time,
                            a = i.labels && t < i.labels.length ? i.labels[t] : "",
                            o = i.datasets[e].data[t];
                        return r.isObject(o) && (a = this.getRightValue(o)), n.tooltipFormat ? f(a, n).format(n.tooltipFormat) : "string" == typeof a ? a : f(a, n).format(this._labelFormat)
                    },
                    tickFormatFunction: function(t, e, i, n) {
                        var a = this.options,
                            o = t.valueOf(),
                            s = a.time.displayFormats,
                            l = s[this._unit],
                            h = this._majorUnit,
                            u = s[h],
                            d = t.clone().startOf(h).valueOf(),
                            c = a.ticks.major,
                            f = c.enabled && h && u && o === d,
                            g = t.format(n || (f ? u : l)),
                            m = f ? c : a.ticks.minor,
                            p = r.valueOrDefault(m.callback, m.userCallback);
                        return p ? p(g, e, i) : g
                    },
                    convertTicksToLabels: function(t) {
                        var e, i, a = [];
                        for (e = 0, i = t.length; e < i; ++e) a.push(this.tickFormatFunction(n(t[e].value), e, t));
                        return a
                    },
                    getPixelForOffset: function(t) {
                        var e = this._horizontal ? this.width : this.height,
                            i = this._horizontal ? this.left : this.top,
                            n = c(this._table, "time", t, "pos");
                        return i + e * (this._offsets.left + n) / (this._offsets.left + 1 + this._offsets.right)
                    },
                    getPixelForValue: function(t, e, i) {
                        var n = null;
                        if (void 0 !== e && void 0 !== i && (n = this._timestamps.datasets[i][e]), null === n && (n = g(t, this)), null !== n) return this.getPixelForOffset(n)
                    },
                    getPixelForTick: function(t) {
                        var e = this.getTicks();
                        return t >= 0 && t < e.length ? this.getPixelForOffset(e[t].value) : null
                    },
                    getValueForPixel: function(t) {
                        var e = this._horizontal ? this.width : this.height,
                            i = this._horizontal ? this.left : this.top,
                            a = (e ? (t - i) / e : 0) * (this._offsets.left + 1 + this._offsets.left) - this._offsets.right,
                            r = c(this._table, "pos", a, "time");
                        return n(r)
                    },
                    getLabelWidth: function(t) {
                        var e = this.options.ticks,
                            i = this.ctx.measureText(t).width,
                            n = r.toRadians(e.maxRotation),
                            o = Math.cos(n),
                            s = Math.sin(n);
                        return i * o + r.valueOrDefault(e.fontSize, a.global.defaultFontSize) * s
                    },
                    getLabelCapacity: function(t) {
                        var e = this.options.time.displayFormats.millisecond,
                            i = this.tickFormatFunction(n(t), 0, [], e),
                            a = this.getLabelWidth(i),
                            r = this.isHorizontal() ? this.width : this.height,
                            o = Math.floor(r / a);
                        return o > 0 ? o : 1
                    }
                });
                t.scaleService.registerScaleType("time", e, {
                    position: "bottom",
                    distribution: "linear",
                    bounds: "data",
                    time: {
                        parser: !1,
                        format: !1,
                        unit: !1,
                        round: !1,
                        displayFormat: !1,
                        isoWeekday: !1,
                        minUnit: "millisecond",
                        displayFormats: {
                            millisecond: "h:mm:ss.SSS a",
                            second: "h:mm:ss a",
                            minute: "h:mm a",
                            hour: "hA",
                            day: "MMM D",
                            week: "ll",
                            month: "MMM YYYY",
                            quarter: "[Q]Q - YYYY",
                            year: "YYYY"
                        }
                    },
                    ticks: {
                        autoSkip: !1,
                        source: "auto",
                        major: {
                            enabled: !1
                        }
                    }
                })
            }
        }, {
            25: 25,
            45: 45,
            6: 6
        }]
    }, {}, [7])(7)
});
*/
/**************************************************************************************/


/****************************************jquery-3.3.1.js***************************/
/*
! function(e, t) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document) throw new Error("jQuery requires a window with a document");
        return t(e)
    } : t(e)
}("undefined" != typeof window ? window : this, function(e, t) {
    "use strict";
    var n = [],
        r = e.document,
        i = Object.getPrototypeOf,
        o = n.slice,
        a = n.concat,
        s = n.push,
        u = n.indexOf,
        l = {},
        c = l.toString,
        f = l.hasOwnProperty,
        p = f.toString,
        d = p.call(Object),
        h = {},
        g = function(e) {
            return "function" == typeof e && "number" != typeof e.nodeType
        },
        v = function(e) {
            return null != e && e === e.window
        },
        y = {
            type: !0,
            src: !0,
            noModule: !0
        };

    function m(e, t, n) {
        var i, o = (t = t || r).createElement("script");
        if (o.text = e, n)
            for (i in y) n[i] && (o[i] = n[i]);
        t.head.appendChild(o).parentNode.removeChild(o)
    }

    function x(e) {
        return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? l[c.call(e)] || "object" : typeof e
    }
    var b = function(e, t) {
            return new b.fn.init(e, t)
        },
        w = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    b.fn = b.prototype = {
        jquery: "3.3.1",
        constructor: b,
        length: 0,
        toArray: function() {
            return o.call(this)
        },
        get: function(e) {
            return null == e ? o.call(this) : e < 0 ? this[e + this.length] : this[e]
        },
        pushStack: function(e) {
            var t = b.merge(this.constructor(), e);
            return t.prevObject = this, t
        },
        each: function(e) {
            return b.each(this, e)
        },
        map: function(e) {
            return this.pushStack(b.map(this, function(t, n) {
                return e.call(t, n, t)
            }))
        },
        slice: function() {
            return this.pushStack(o.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(e) {
            var t = this.length,
                n = +e + (e < 0 ? t : 0);
            return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: s,
        sort: n.sort,
        splice: n.splice
    }, b.extend = b.fn.extend = function() {
        var e, t, n, r, i, o, a = arguments[0] || {},
            s = 1,
            u = arguments.length,
            l = !1;
        for ("boolean" == typeof a && (l = a, a = arguments[s] || {}, s++), "object" == typeof a || g(a) || (a = {}), s === u && (a = this, s--); s < u; s++)
            if (null != (e = arguments[s]))
                for (t in e) n = a[t], a !== (r = e[t]) && (l && r && (b.isPlainObject(r) || (i = Array.isArray(r))) ? (i ? (i = !1, o = n && Array.isArray(n) ? n : []) : o = n && b.isPlainObject(n) ? n : {}, a[t] = b.extend(l, o, r)) : void 0 !== r && (a[t] = r));
        return a
    }, b.extend({
        expando: "jQuery" + ("3.3.1" + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isPlainObject: function(e) {
            var t, n;
            return !(!e || "[object Object]" !== c.call(e)) && (!(t = i(e)) || "function" == typeof(n = f.call(t, "constructor") && t.constructor) && p.call(n) === d)
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return !1;
            return !0
        },
        globalEval: function(e) {
            m(e)
        },
        each: function(e, t) {
            var n, r = 0;
            if (T(e))
                for (n = e.length; r < n && !1 !== t.call(e[r], r, e[r]); r++);
            else
                for (r in e)
                    if (!1 === t.call(e[r], r, e[r])) break;
            return e
        },
        trim: function(e) {
            return null == e ? "" : (e + "").replace(w, "")
        },
        makeArray: function(e, t) {
            var n = t || [];
            return null != e && (T(Object(e)) ? b.merge(n, "string" == typeof e ? [e] : e) : s.call(n, e)), n
        },
        inArray: function(e, t, n) {
            return null == t ? -1 : u.call(t, e, n)
        },
        merge: function(e, t) {
            for (var n = +t.length, r = 0, i = e.length; r < n; r++) e[i++] = t[r];
            return e.length = i, e
        },
        grep: function(e, t, n) {
            for (var r = [], i = 0, o = e.length, a = !n; i < o; i++) !t(e[i], i) !== a && r.push(e[i]);
            return r
        },
        map: function(e, t, n) {
            var r, i, o = 0,
                s = [];
            if (T(e))
                for (r = e.length; o < r; o++) null != (i = t(e[o], o, n)) && s.push(i);
            else
                for (o in e) null != (i = t(e[o], o, n)) && s.push(i);
            return a.apply([], s)
        },
        guid: 1,
        support: h
    }), "function" == typeof Symbol && (b.fn[Symbol.iterator] = n[Symbol.iterator]), b.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
        l["[object " + t + "]"] = t.toLowerCase()
    });

    function T(e) {
        var t = !!e && "length" in e && e.length,
            n = x(e);
        return !g(e) && !v(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
    }
    var C = function(e) {
        var t, n, r, i, o, a, s, u, l, c, f, p, d, h, g, v, y, m, x, b = "sizzle" + 1 * new Date,
            w = e.document,
            T = 0,
            C = 0,
            E = ae(),
            k = ae(),
            S = ae(),
            D = function(e, t) {
                return e === t && (f = !0), 0
            },
            N = {}.hasOwnProperty,
            A = [],
            j = A.pop,
            q = A.push,
            L = A.push,
            H = A.slice,
            O = function(e, t) {
                for (var n = 0, r = e.length; n < r; n++)
                    if (e[n] === t) return n;
                return -1
            },
            P = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            M = "[\\x20\\t\\r\\n\\f]",
            R = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
            I = "\\[" + M + "*(" + R + ")(?:" + M + "*([*^$|!~]?=)" + M + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + R + "))|)" + M + "*\\]",
            W = ":(" + R + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + I + ")*)|.*)\\)|)",
            $ = new RegExp(M + "+", "g"),
            B = new RegExp("^" + M + "+|((?:^|[^\\\\])(?:\\\\.)*)" + M + "+$", "g"),
            F = new RegExp("^" + M + "*," + M + "*"),
            _ = new RegExp("^" + M + "*([>+~]|" + M + ")" + M + "*"),
            z = new RegExp("=" + M + "*([^\\]'\"]*?)" + M + "*\\]", "g"),
            X = new RegExp(W),
            U = new RegExp("^" + R + "$"),
            V = {
                ID: new RegExp("^#(" + R + ")"),
                CLASS: new RegExp("^\\.(" + R + ")"),
                TAG: new RegExp("^(" + R + "|[*])"),
                ATTR: new RegExp("^" + I),
                PSEUDO: new RegExp("^" + W),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + M + "*(even|odd|(([+-]|)(\\d*)n|)" + M + "*(?:([+-]|)" + M + "*(\\d+)|))" + M + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + P + ")$", "i"),
                needsContext: new RegExp("^" + M + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + M + "*((?:-\\d)?\\d*)" + M + "*\\)|)(?=[^-]|$)", "i")
            },
            G = /^(?:input|select|textarea|button)$/i,
            Y = /^h\d$/i,
            Q = /^[^{]+\{\s*\[native \w/,
            J = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            K = /[+~]/,
            Z = new RegExp("\\\\([\\da-f]{1,6}" + M + "?|(" + M + ")|.)", "ig"),
            ee = function(e, t, n) {
                var r = "0x" + t - 65536;
                return r != r || n ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
            },
            te = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
            ne = function(e, t) {
                return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
            },
            re = function() {
                p()
            },
            ie = me(function(e) {
                return !0 === e.disabled && ("form" in e || "label" in e)
            }, {
                dir: "parentNode",
                next: "legend"
            });
        try {
            L.apply(A = H.call(w.childNodes), w.childNodes), A[w.childNodes.length].nodeType
        } catch (e) {
            L = {
                apply: A.length ? function(e, t) {
                    q.apply(e, H.call(t))
                } : function(e, t) {
                    for (var n = e.length, r = 0; e[n++] = t[r++];);
                    e.length = n - 1
                }
            }
        }

        function oe(e, t, r, i) {
            var o, s, l, c, f, h, y, m = t && t.ownerDocument,
                T = t ? t.nodeType : 9;
            if (r = r || [], "string" != typeof e || !e || 1 !== T && 9 !== T && 11 !== T) return r;
            if (!i && ((t ? t.ownerDocument || t : w) !== d && p(t), t = t || d, g)) {
                if (11 !== T && (f = J.exec(e)))
                    if (o = f[1]) {
                        if (9 === T) {
                            if (!(l = t.getElementById(o))) return r;
                            if (l.id === o) return r.push(l), r
                        } else if (m && (l = m.getElementById(o)) && x(t, l) && l.id === o) return r.push(l), r
                    } else {
                        if (f[2]) return L.apply(r, t.getElementsByTagName(e)), r;
                        if ((o = f[3]) && n.getElementsByClassName && t.getElementsByClassName) return L.apply(r, t.getElementsByClassName(o)), r
                    } if (n.qsa && !S[e + " "] && (!v || !v.test(e))) {
                    if (1 !== T) m = t, y = e;
                    else if ("object" !== t.nodeName.toLowerCase()) {
                        for ((c = t.getAttribute("id")) ? c = c.replace(te, ne) : t.setAttribute("id", c = b), s = (h = a(e)).length; s--;) h[s] = "#" + c + " " + ye(h[s]);
                        y = h.join(","), m = K.test(e) && ge(t.parentNode) || t
                    }
                    if (y) try {
                        return L.apply(r, m.querySelectorAll(y)), r
                    } catch (e) {} finally {
                        c === b && t.removeAttribute("id")
                    }
                }
            }
            return u(e.replace(B, "$1"), t, r, i)
        }

        function ae() {
            var e = [];
            return function t(n, i) {
                return e.push(n + " ") > r.cacheLength && delete t[e.shift()], t[n + " "] = i
            }
        }

        function se(e) {
            return e[b] = !0, e
        }

        function ue(e) {
            var t = d.createElement("fieldset");
            try {
                return !!e(t)
            } catch (e) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function le(e, t) {
            for (var n = e.split("|"), i = n.length; i--;) r.attrHandle[n[i]] = t
        }

        function ce(e, t) {
            var n = t && e,
                r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
            if (r) return r;
            if (n)
                for (; n = n.nextSibling;)
                    if (n === t) return -1;
            return e ? 1 : -1
        }

        function fe(e) {
            return function(t) {
                return "input" === t.nodeName.toLowerCase() && t.type === e
            }
        }

        function pe(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }

        function de(e) {
            return function(t) {
                return "form" in t ? t.parentNode && !1 === t.disabled ? "label" in t ? "label" in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && ie(t) === e : t.disabled === e : "label" in t && t.disabled === e
            }
        }

        function he(e) {
            return se(function(t) {
                return t = +t, se(function(n, r) {
                    for (var i, o = e([], n.length, t), a = o.length; a--;) n[i = o[a]] && (n[i] = !(r[i] = n[i]))
                })
            })
        }

        function ge(e) {
            return e && void 0 !== e.getElementsByTagName && e
        }
        n = oe.support = {}, o = oe.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return !!t && "HTML" !== t.nodeName
        }, p = oe.setDocument = function(e) {
            var t, i, a = e ? e.ownerDocument || e : w;
            return a !== d && 9 === a.nodeType && a.documentElement ? (h = (d = a).documentElement, g = !o(d), w !== d && (i = d.defaultView) && i.top !== i && (i.addEventListener ? i.addEventListener("unload", re, !1) : i.attachEvent && i.attachEvent("onunload", re)), n.attributes = ue(function(e) {
                return e.className = "i", !e.getAttribute("className")
            }), n.getElementsByTagName = ue(function(e) {
                return e.appendChild(d.createComment("")), !e.getElementsByTagName("*").length
            }), n.getElementsByClassName = Q.test(d.getElementsByClassName), n.getById = ue(function(e) {
                return h.appendChild(e).id = b, !d.getElementsByName || !d.getElementsByName(b).length
            }), n.getById ? (r.filter.ID = function(e) {
                var t = e.replace(Z, ee);
                return function(e) {
                    return e.getAttribute("id") === t
                }
            }, r.find.ID = function(e, t) {
                if (void 0 !== t.getElementById && g) {
                    var n = t.getElementById(e);
                    return n ? [n] : []
                }
            }) : (r.filter.ID = function(e) {
                var t = e.replace(Z, ee);
                return function(e) {
                    var n = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }, r.find.ID = function(e, t) {
                if (void 0 !== t.getElementById && g) {
                    var n, r, i, o = t.getElementById(e);
                    if (o) {
                        if ((n = o.getAttributeNode("id")) && n.value === e) return [o];
                        for (i = t.getElementsByName(e), r = 0; o = i[r++];)
                            if ((n = o.getAttributeNode("id")) && n.value === e) return [o]
                    }
                    return []
                }
            }), r.find.TAG = n.getElementsByTagName ? function(e, t) {
                return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : n.qsa ? t.querySelectorAll(e) : void 0
            } : function(e, t) {
                var n, r = [],
                    i = 0,
                    o = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (; n = o[i++];) 1 === n.nodeType && r.push(n);
                    return r
                }
                return o
            }, r.find.CLASS = n.getElementsByClassName && function(e, t) {
                if (void 0 !== t.getElementsByClassName && g) return t.getElementsByClassName(e)
            }, y = [], v = [], (n.qsa = Q.test(d.querySelectorAll)) && (ue(function(e) {
                h.appendChild(e).innerHTML = "<a id='" + b + "'></a><select id='" + b + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && v.push("[*^$]=" + M + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || v.push("\\[" + M + "*(?:value|" + P + ")"), e.querySelectorAll("[id~=" + b + "-]").length || v.push("~="), e.querySelectorAll(":checked").length || v.push(":checked"), e.querySelectorAll("a#" + b + "+*").length || v.push(".#.+[+~]")
            }), ue(function(e) {
                e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                var t = d.createElement("input");
                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && v.push("name" + M + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && v.push(":enabled", ":disabled"), h.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && v.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), v.push(",.*:")
            })), (n.matchesSelector = Q.test(m = h.matches || h.webkitMatchesSelector || h.mozMatchesSelector || h.oMatchesSelector || h.msMatchesSelector)) && ue(function(e) {
                n.disconnectedMatch = m.call(e, "*"), m.call(e, "[s!='']:x"), y.push("!=", W)
            }), v = v.length && new RegExp(v.join("|")), y = y.length && new RegExp(y.join("|")), t = Q.test(h.compareDocumentPosition), x = t || Q.test(h.contains) ? function(e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e,
                    r = t && t.parentNode;
                return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
            } : function(e, t) {
                if (t)
                    for (; t = t.parentNode;)
                        if (t === e) return !0;
                return !1
            }, D = t ? function(e, t) {
                if (e === t) return f = !0, 0;
                var r = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return r || (1 & (r = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !n.sortDetached && t.compareDocumentPosition(e) === r ? e === d || e.ownerDocument === w && x(w, e) ? -1 : t === d || t.ownerDocument === w && x(w, t) ? 1 : c ? O(c, e) - O(c, t) : 0 : 4 & r ? -1 : 1)
            } : function(e, t) {
                if (e === t) return f = !0, 0;
                var n, r = 0,
                    i = e.parentNode,
                    o = t.parentNode,
                    a = [e],
                    s = [t];
                if (!i || !o) return e === d ? -1 : t === d ? 1 : i ? -1 : o ? 1 : c ? O(c, e) - O(c, t) : 0;
                if (i === o) return ce(e, t);
                for (n = e; n = n.parentNode;) a.unshift(n);
                for (n = t; n = n.parentNode;) s.unshift(n);
                for (; a[r] === s[r];) r++;
                return r ? ce(a[r], s[r]) : a[r] === w ? -1 : s[r] === w ? 1 : 0
            }, d) : d
        }, oe.matches = function(e, t) {
            return oe(e, null, null, t)
        }, oe.matchesSelector = function(e, t) {
            if ((e.ownerDocument || e) !== d && p(e), t = t.replace(z, "='$1']"), n.matchesSelector && g && !S[t + " "] && (!y || !y.test(t)) && (!v || !v.test(t))) try {
                var r = m.call(e, t);
                if (r || n.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r
            } catch (e) {}
            return oe(t, d, null, [e]).length > 0
        }, oe.contains = function(e, t) {
            return (e.ownerDocument || e) !== d && p(e), x(e, t)
        }, oe.attr = function(e, t) {
            (e.ownerDocument || e) !== d && p(e);
            var i = r.attrHandle[t.toLowerCase()],
                o = i && N.call(r.attrHandle, t.toLowerCase()) ? i(e, t, !g) : void 0;
            return void 0 !== o ? o : n.attributes || !g ? e.getAttribute(t) : (o = e.getAttributeNode(t)) && o.specified ? o.value : null
        }, oe.escape = function(e) {
            return (e + "").replace(te, ne)
        }, oe.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }, oe.uniqueSort = function(e) {
            var t, r = [],
                i = 0,
                o = 0;
            if (f = !n.detectDuplicates, c = !n.sortStable && e.slice(0), e.sort(D), f) {
                for (; t = e[o++];) t === e[o] && (i = r.push(o));
                for (; i--;) e.splice(r[i], 1)
            }
            return c = null, e
        }, i = oe.getText = function(e) {
            var t, n = "",
                r = 0,
                o = e.nodeType;
            if (o) {
                if (1 === o || 9 === o || 11 === o) {
                    if ("string" == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) n += i(e)
                } else if (3 === o || 4 === o) return e.nodeValue
            } else
                for (; t = e[r++];) n += i(t);
            return n
        }, (r = oe.selectors = {
            cacheLength: 50,
            createPseudo: se,
            match: V,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(Z, ee), e[3] = (e[3] || e[4] || e[5] || "").replace(Z, ee), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || oe.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && oe.error(e[0]), e
                },
                PSEUDO: function(e) {
                    var t, n = !e[6] && e[2];
                    return V.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && X.test(n) && (t = a(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(Z, ee).toLowerCase();
                    return "*" === e ? function() {
                        return !0
                    } : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function(e) {
                    var t = E[e + " "];
                    return t || (t = new RegExp("(^|" + M + ")" + e + "(" + M + "|$)")) && E(e, function(e) {
                        return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "")
                    })
                },
                ATTR: function(e, t, n) {
                    return function(r) {
                        var i = oe.attr(r, e);
                        return null == i ? "!=" === t : !t || (i += "", "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1 : "$=" === t ? n && i.slice(-n.length) === n : "~=" === t ? (" " + i.replace($, " ") + " ").indexOf(n) > -1 : "|=" === t && (i === n || i.slice(0, n.length + 1) === n + "-"))
                    }
                },
                CHILD: function(e, t, n, r, i) {
                    var o = "nth" !== e.slice(0, 3),
                        a = "last" !== e.slice(-4),
                        s = "of-type" === t;
                    return 1 === r && 0 === i ? function(e) {
                        return !!e.parentNode
                    } : function(t, n, u) {
                        var l, c, f, p, d, h, g = o !== a ? "nextSibling" : "previousSibling",
                            v = t.parentNode,
                            y = s && t.nodeName.toLowerCase(),
                            m = !u && !s,
                            x = !1;
                        if (v) {
                            if (o) {
                                for (; g;) {
                                    for (p = t; p = p[g];)
                                        if (s ? p.nodeName.toLowerCase() === y : 1 === p.nodeType) return !1;
                                    h = g = "only" === e && !h && "nextSibling"
                                }
                                return !0
                            }
                            if (h = [a ? v.firstChild : v.lastChild], a && m) {
                                for (x = (d = (l = (c = (f = (p = v)[b] || (p[b] = {}))[p.uniqueID] || (f[p.uniqueID] = {}))[e] || [])[0] === T && l[1]) && l[2], p = d && v.childNodes[d]; p = ++d && p && p[g] || (x = d = 0) || h.pop();)
                                    if (1 === p.nodeType && ++x && p === t) {
                                        c[e] = [T, d, x];
                                        break
                                    }
                            } else if (m && (x = d = (l = (c = (f = (p = t)[b] || (p[b] = {}))[p.uniqueID] || (f[p.uniqueID] = {}))[e] || [])[0] === T && l[1]), !1 === x)
                                for (;
                                    (p = ++d && p && p[g] || (x = d = 0) || h.pop()) && ((s ? p.nodeName.toLowerCase() !== y : 1 !== p.nodeType) || !++x || (m && ((c = (f = p[b] || (p[b] = {}))[p.uniqueID] || (f[p.uniqueID] = {}))[e] = [T, x]), p !== t)););
                            return (x -= i) === r || x % r == 0 && x / r >= 0
                        }
                    }
                },
                PSEUDO: function(e, t) {
                    var n, i = r.pseudos[e] || r.setFilters[e.toLowerCase()] || oe.error("unsupported pseudo: " + e);
                    return i[b] ? i(t) : i.length > 1 ? (n = [e, e, "", t], r.setFilters.hasOwnProperty(e.toLowerCase()) ? se(function(e, n) {
                        for (var r, o = i(e, t), a = o.length; a--;) e[r = O(e, o[a])] = !(n[r] = o[a])
                    }) : function(e) {
                        return i(e, 0, n)
                    }) : i
                }
            },
            pseudos: {
                not: se(function(e) {
                    var t = [],
                        n = [],
                        r = s(e.replace(B, "$1"));
                    return r[b] ? se(function(e, t, n, i) {
                        for (var o, a = r(e, null, i, []), s = e.length; s--;)(o = a[s]) && (e[s] = !(t[s] = o))
                    }) : function(e, i, o) {
                        return t[0] = e, r(t, null, o, n), t[0] = null, !n.pop()
                    }
                }),
                has: se(function(e) {
                    return function(t) {
                        return oe(e, t).length > 0
                    }
                }),
                contains: se(function(e) {
                    return e = e.replace(Z, ee),
                        function(t) {
                            return (t.textContent || t.innerText || i(t)).indexOf(e) > -1
                        }
                }),
                lang: se(function(e) {
                    return U.test(e || "") || oe.error("unsupported lang: " + e), e = e.replace(Z, ee).toLowerCase(),
                        function(t) {
                            var n;
                            do {
                                if (n = g ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-")
                            } while ((t = t.parentNode) && 1 === t.nodeType);
                            return !1
                        }
                }),
                target: function(t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                },
                root: function(e) {
                    return e === h
                },
                focus: function(e) {
                    return e === d.activeElement && (!d.hasFocus || d.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                },
                enabled: de(!1),
                disabled: de(!0),
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling)
                        if (e.nodeType < 6) return !1;
                    return !0
                },
                parent: function(e) {
                    return !r.pseudos.empty(e)
                },
                header: function(e) {
                    return Y.test(e.nodeName)
                },
                input: function(e) {
                    return G.test(e.nodeName)
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                },
                text: function(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                },
                first: he(function() {
                    return [0]
                }),
                last: he(function(e, t) {
                    return [t - 1]
                }),
                eq: he(function(e, t, n) {
                    return [n < 0 ? n + t : n]
                }),
                even: he(function(e, t) {
                    for (var n = 0; n < t; n += 2) e.push(n);
                    return e
                }),
                odd: he(function(e, t) {
                    for (var n = 1; n < t; n += 2) e.push(n);
                    return e
                }),
                lt: he(function(e, t, n) {
                    for (var r = n < 0 ? n + t : n; --r >= 0;) e.push(r);
                    return e
                }),
                gt: he(function(e, t, n) {
                    for (var r = n < 0 ? n + t : n; ++r < t;) e.push(r);
                    return e
                })
            }
        }).pseudos.nth = r.pseudos.eq;
        for (t in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) r.pseudos[t] = fe(t);
        for (t in {
                submit: !0,
                reset: !0
            }) r.pseudos[t] = pe(t);

        function ve() {}
        ve.prototype = r.filters = r.pseudos, r.setFilters = new ve, a = oe.tokenize = function(e, t) {
            var n, i, o, a, s, u, l, c = k[e + " "];
            if (c) return t ? 0 : c.slice(0);
            for (s = e, u = [], l = r.preFilter; s;) {
                n && !(i = F.exec(s)) || (i && (s = s.slice(i[0].length) || s), u.push(o = [])), n = !1, (i = _.exec(s)) && (n = i.shift(), o.push({
                    value: n,
                    type: i[0].replace(B, " ")
                }), s = s.slice(n.length));
                for (a in r.filter) !(i = V[a].exec(s)) || l[a] && !(i = l[a](i)) || (n = i.shift(), o.push({
                    value: n,
                    type: a,
                    matches: i
                }), s = s.slice(n.length));
                if (!n) break
            }
            return t ? s.length : s ? oe.error(e) : k(e, u).slice(0)
        };

        function ye(e) {
            for (var t = 0, n = e.length, r = ""; t < n; t++) r += e[t].value;
            return r
        }

        function me(e, t, n) {
            var r = t.dir,
                i = t.next,
                o = i || r,
                a = n && "parentNode" === o,
                s = C++;
            return t.first ? function(t, n, i) {
                for (; t = t[r];)
                    if (1 === t.nodeType || a) return e(t, n, i);
                return !1
            } : function(t, n, u) {
                var l, c, f, p = [T, s];
                if (u) {
                    for (; t = t[r];)
                        if ((1 === t.nodeType || a) && e(t, n, u)) return !0
                } else
                    for (; t = t[r];)
                        if (1 === t.nodeType || a)
                            if (c = (f = t[b] || (t[b] = {}))[t.uniqueID] || (f[t.uniqueID] = {}), i && i === t.nodeName.toLowerCase()) t = t[r] || t;
                            else {
                                if ((l = c[o]) && l[0] === T && l[1] === s) return p[2] = l[2];
                                if (c[o] = p, p[2] = e(t, n, u)) return !0
                            } return !1
            }
        }

        function xe(e) {
            return e.length > 1 ? function(t, n, r) {
                for (var i = e.length; i--;)
                    if (!e[i](t, n, r)) return !1;
                return !0
            } : e[0]
        }

        function be(e, t, n, r, i) {
            for (var o, a = [], s = 0, u = e.length, l = null != t; s < u; s++)(o = e[s]) && (n && !n(o, r, i) || (a.push(o), l && t.push(s)));
            return a
        }

        function we(e, t, n, r, i, o) {
            return r && !r[b] && (r = we(r)), i && !i[b] && (i = we(i, o)), se(function(o, a, s, u) {
                var l, c, f, p = [],
                    d = [],
                    h = a.length,
                    g = o || function(e, t, n) {
                        for (var r = 0, i = t.length; r < i; r++) oe(e, t[r], n);
                        return n
                    }(t || "*", s.nodeType ? [s] : s, []),
                    v = !e || !o && t ? g : be(g, p, e, s, u),
                    y = n ? i || (o ? e : h || r) ? [] : a : v;
                if (n && n(v, y, s, u), r)
                    for (l = be(y, d), r(l, [], s, u), c = l.length; c--;)(f = l[c]) && (y[d[c]] = !(v[d[c]] = f));
                if (o) {
                    if (i || e) {
                        if (i) {
                            for (l = [], c = y.length; c--;)(f = y[c]) && l.push(v[c] = f);
                            i(null, y = [], l, u)
                        }
                        for (c = y.length; c--;)(f = y[c]) && (l = i ? O(o, f) : p[c]) > -1 && (o[l] = !(a[l] = f))
                    }
                } else y = be(y === a ? y.splice(h, y.length) : y), i ? i(null, a, y, u) : L.apply(a, y)
            })
        }

        function Te(e) {
            for (var t, n, i, o = e.length, a = r.relative[e[0].type], s = a || r.relative[" "], u = a ? 1 : 0, c = me(function(e) {
                    return e === t
                }, s, !0), f = me(function(e) {
                    return O(t, e) > -1
                }, s, !0), p = [function(e, n, r) {
                    var i = !a && (r || n !== l) || ((t = n).nodeType ? c(e, n, r) : f(e, n, r));
                    return t = null, i
                }]; u < o; u++)
                if (n = r.relative[e[u].type]) p = [me(xe(p), n)];
                else {
                    if ((n = r.filter[e[u].type].apply(null, e[u].matches))[b]) {
                        for (i = ++u; i < o && !r.relative[e[i].type]; i++);
                        return we(u > 1 && xe(p), u > 1 && ye(e.slice(0, u - 1).concat({
                            value: " " === e[u - 2].type ? "*" : ""
                        })).replace(B, "$1"), n, u < i && Te(e.slice(u, i)), i < o && Te(e = e.slice(i)), i < o && ye(e))
                    }
                    p.push(n)
                } return xe(p)
        }
        return s = oe.compile = function(e, t) {
            var n, i = [],
                o = [],
                s = S[e + " "];
            if (!s) {
                for (t || (t = a(e)), n = t.length; n--;)(s = Te(t[n]))[b] ? i.push(s) : o.push(s);
                (s = S(e, function(e, t) {
                    var n = t.length > 0,
                        i = e.length > 0,
                        o = function(o, a, s, u, c) {
                            var f, h, v, y = 0,
                                m = "0",
                                x = o && [],
                                b = [],
                                w = l,
                                C = o || i && r.find.TAG("*", c),
                                E = T += null == w ? 1 : Math.random() || .1,
                                k = C.length;
                            for (c && (l = a === d || a || c); m !== k && null != (f = C[m]); m++) {
                                if (i && f) {
                                    for (h = 0, a || f.ownerDocument === d || (p(f), s = !g); v = e[h++];)
                                        if (v(f, a || d, s)) {
                                            u.push(f);
                                            break
                                        } c && (T = E)
                                }
                                n && ((f = !v && f) && y--, o && x.push(f))
                            }
                            if (y += m, n && m !== y) {
                                for (h = 0; v = t[h++];) v(x, b, a, s);
                                if (o) {
                                    if (y > 0)
                                        for (; m--;) x[m] || b[m] || (b[m] = j.call(u));
                                    b = be(b)
                                }
                                L.apply(u, b), c && !o && b.length > 0 && y + t.length > 1 && oe.uniqueSort(u)
                            }
                            return c && (T = E, l = w), x
                        };
                    return n ? se(o) : o
                }(o, i))).selector = e
            }
            return s
        }, u = oe.select = function(e, t, n, i) {
            var o, u, l, c, f, p = "function" == typeof e && e,
                d = !i && a(e = p.selector || e);
            if (n = n || [], 1 === d.length) {
                if ((u = d[0] = d[0].slice(0)).length > 2 && "ID" === (l = u[0]).type && 9 === t.nodeType && g && r.relative[u[1].type]) {
                    if (!(t = (r.find.ID(l.matches[0].replace(Z, ee), t) || [])[0])) return n;
                    p && (t = t.parentNode), e = e.slice(u.shift().value.length)
                }
                for (o = V.needsContext.test(e) ? 0 : u.length; o-- && (l = u[o], !r.relative[c = l.type]);)
                    if ((f = r.find[c]) && (i = f(l.matches[0].replace(Z, ee), K.test(u[0].type) && ge(t.parentNode) || t))) {
                        if (u.splice(o, 1), !(e = i.length && ye(u))) return L.apply(n, i), n;
                        break
                    }
            }
            return (p || s(e, d))(i, t, !g, n, !t || K.test(e) && ge(t.parentNode) || t), n
        }, n.sortStable = b.split("").sort(D).join("") === b, n.detectDuplicates = !!f, p(), n.sortDetached = ue(function(e) {
            return 1 & e.compareDocumentPosition(d.createElement("fieldset"))
        }), ue(function(e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
        }) || le("type|href|height|width", function(e, t, n) {
            if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }), n.attributes && ue(function(e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
        }) || le("value", function(e, t, n) {
            if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue
        }), ue(function(e) {
            return null == e.getAttribute("disabled")
        }) || le(P, function(e, t, n) {
            var r;
            if (!n) return !0 === e[t] ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }), oe
    }(e);
    b.find = C, b.expr = C.selectors, b.expr[":"] = b.expr.pseudos, b.uniqueSort = b.unique = C.uniqueSort, b.text = C.getText, b.isXMLDoc = C.isXML, b.contains = C.contains, b.escapeSelector = C.escape;
    var E = function(e, t, n) {
            for (var r = [], i = void 0 !== n;
                (e = e[t]) && 9 !== e.nodeType;)
                if (1 === e.nodeType) {
                    if (i && b(e).is(n)) break;
                    r.push(e)
                } return r
        },
        k = function(e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n
        },
        S = b.expr.match.needsContext;

    function D(e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
    }
    var N = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

    function A(e, t, n) {
        return g(t) ? b.grep(e, function(e, r) {
            return !!t.call(e, r, e) !== n
        }) : t.nodeType ? b.grep(e, function(e) {
            return e === t !== n
        }) : "string" != typeof t ? b.grep(e, function(e) {
            return u.call(t, e) > -1 !== n
        }) : b.filter(t, e, n)
    }
    b.filter = function(e, t, n) {
        var r = t[0];
        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? b.find.matchesSelector(r, e) ? [r] : [] : b.find.matches(e, b.grep(t, function(e) {
            return 1 === e.nodeType
        }))
    }, b.fn.extend({
        find: function(e) {
            var t, n, r = this.length,
                i = this;
            if ("string" != typeof e) return this.pushStack(b(e).filter(function() {
                for (t = 0; t < r; t++)
                    if (b.contains(i[t], this)) return !0
            }));
            for (n = this.pushStack([]), t = 0; t < r; t++) b.find(e, i[t], n);
            return r > 1 ? b.uniqueSort(n) : n
        },
        filter: function(e) {
            return this.pushStack(A(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(A(this, e || [], !0))
        },
        is: function(e) {
            return !!A(this, "string" == typeof e && S.test(e) ? b(e) : e || [], !1).length
        }
    });
    var j, q = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    (b.fn.init = function(e, t, n) {
        var i, o;
        if (!e) return this;
        if (n = n || j, "string" == typeof e) {
            if (!(i = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : q.exec(e)) || !i[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
            if (i[1]) {
                if (t = t instanceof b ? t[0] : t, b.merge(this, b.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : r, !0)), N.test(i[1]) && b.isPlainObject(t))
                    for (i in t) g(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
                return this
            }
            return (o = r.getElementById(i[2])) && (this[0] = o, this.length = 1), this
        }
        return e.nodeType ? (this[0] = e, this.length = 1, this) : g(e) ? void 0 !== n.ready ? n.ready(e) : e(b) : b.makeArray(e, this)
    }).prototype = b.fn, j = b(r);
    var L = /^(?:parents|prev(?:Until|All))/,
        H = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    b.fn.extend({
        has: function(e) {
            var t = b(e, this),
                n = t.length;
            return this.filter(function() {
                for (var e = 0; e < n; e++)
                    if (b.contains(this, t[e])) return !0
            })
        },
        closest: function(e, t) {
            var n, r = 0,
                i = this.length,
                o = [],
                a = "string" != typeof e && b(e);
            if (!S.test(e))
                for (; r < i; r++)
                    for (n = this[r]; n && n !== t; n = n.parentNode)
                        if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && b.find.matchesSelector(n, e))) {
                            o.push(n);
                            break
                        } return this.pushStack(o.length > 1 ? b.uniqueSort(o) : o)
        },
        index: function(e) {
            return e ? "string" == typeof e ? u.call(b(e), this[0]) : u.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            return this.pushStack(b.uniqueSort(b.merge(this.get(), b(e, t))))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    });

    function O(e, t) {
        for (;
            (e = e[t]) && 1 !== e.nodeType;);
        return e
    }
    b.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(e) {
            return E(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return E(e, "parentNode", n)
        },
        next: function(e) {
            return O(e, "nextSibling")
        },
        prev: function(e) {
            return O(e, "previousSibling")
        },
        nextAll: function(e) {
            return E(e, "nextSibling")
        },
        prevAll: function(e) {
            return E(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return E(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return E(e, "previousSibling", n)
        },
        siblings: function(e) {
            return k((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return k(e.firstChild)
        },
        contents: function(e) {
            return D(e, "iframe") ? e.contentDocument : (D(e, "template") && (e = e.content || e), b.merge([], e.childNodes))
        }
    }, function(e, t) {
        b.fn[e] = function(n, r) {
            var i = b.map(this, t, n);
            return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = b.filter(r, i)), this.length > 1 && (H[e] || b.uniqueSort(i), L.test(e) && i.reverse()), this.pushStack(i)
        }
    });
    var P = /[^\x20\t\r\n\f]+/g;
    b.Callbacks = function(e) {
        e = "string" == typeof e ? function(e) {
            var t = {};
            return b.each(e.match(P) || [], function(e, n) {
                t[n] = !0
            }), t
        }(e) : b.extend({}, e);
        var t, n, r, i, o = [],
            a = [],
            s = -1,
            u = function() {
                for (i = i || e.once, r = t = !0; a.length; s = -1)
                    for (n = a.shift(); ++s < o.length;) !1 === o[s].apply(n[0], n[1]) && e.stopOnFalse && (s = o.length, n = !1);
                e.memory || (n = !1), t = !1, i && (o = n ? [] : "")
            },
            l = {
                add: function() {
                    return o && (n && !t && (s = o.length - 1, a.push(n)), function t(n) {
                        b.each(n, function(n, r) {
                            g(r) ? e.unique && l.has(r) || o.push(r) : r && r.length && "string" !== x(r) && t(r)
                        })
                    }(arguments), n && !t && u()), this
                },
                remove: function() {
                    return b.each(arguments, function(e, t) {
                        for (var n;
                            (n = b.inArray(t, o, n)) > -1;) o.splice(n, 1), n <= s && s--
                    }), this
                },
                has: function(e) {
                    return e ? b.inArray(e, o) > -1 : o.length > 0
                },
                empty: function() {
                    return o && (o = []), this
                },
                disable: function() {
                    return i = a = [], o = n = "", this
                },
                disabled: function() {
                    return !o
                },
                lock: function() {
                    return i = a = [], n || t || (o = n = ""), this
                },
                locked: function() {
                    return !!i
                },
                fireWith: function(e, n) {
                    return i || (n = [e, (n = n || []).slice ? n.slice() : n], a.push(n), t || u()), this
                },
                fire: function() {
                    return l.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!r
                }
            };
        return l
    };

    function M(e) {
        return e
    }

    function R(e) {
        throw e
    }

    function I(e, t, n, r) {
        var i;
        try {
            e && g(i = e.promise) ? i.call(e).done(t).fail(n) : e && g(i = e.then) ? i.call(e, t, n) : t.apply(void 0, [e].slice(r))
        } catch (e) {
            n.apply(void 0, [e])
        }
    }
    b.extend({
        Deferred: function(t) {
            var n = [
                    ["notify", "progress", b.Callbacks("memory"), b.Callbacks("memory"), 2],
                    ["resolve", "done", b.Callbacks("once memory"), b.Callbacks("once memory"), 0, "resolved"],
                    ["reject", "fail", b.Callbacks("once memory"), b.Callbacks("once memory"), 1, "rejected"]
                ],
                r = "pending",
                i = {
                    state: function() {
                        return r
                    },
                    always: function() {
                        return o.done(arguments).fail(arguments), this
                    },
                    catch: function(e) {
                        return i.then(null, e)
                    },
                    pipe: function() {
                        var e = arguments;
                        return b.Deferred(function(t) {
                            b.each(n, function(n, r) {
                                var i = g(e[r[4]]) && e[r[4]];
                                o[r[1]](function() {
                                    var e = i && i.apply(this, arguments);
                                    e && g(e.promise) ? e.promise().progress(t.notify).done(t.resolve).fail(t.reject) : t[r[0] + "With"](this, i ? [e] : arguments)
                                })
                            }), e = null
                        }).promise()
                    },
                    then: function(t, r, i) {
                        var o = 0;

                        function a(t, n, r, i) {
                            return function() {
                                var s = this,
                                    u = arguments,
                                    l = function() {
                                        var e, l;
                                        if (!(t < o)) {
                                            if ((e = r.apply(s, u)) === n.promise()) throw new TypeError("Thenable self-resolution");
                                            l = e && ("object" == typeof e || "function" == typeof e) && e.then, g(l) ? i ? l.call(e, a(o, n, M, i), a(o, n, R, i)) : (o++, l.call(e, a(o, n, M, i), a(o, n, R, i), a(o, n, M, n.notifyWith))) : (r !== M && (s = void 0, u = [e]), (i || n.resolveWith)(s, u))
                                        }
                                    },
                                    c = i ? l : function() {
                                        try {
                                            l()
                                        } catch (e) {
                                            b.Deferred.exceptionHook && b.Deferred.exceptionHook(e, c.stackTrace), t + 1 >= o && (r !== R && (s = void 0, u = [e]), n.rejectWith(s, u))
                                        }
                                    };
                                t ? c() : (b.Deferred.getStackHook && (c.stackTrace = b.Deferred.getStackHook()), e.setTimeout(c))
                            }
                        }
                        return b.Deferred(function(e) {
                            n[0][3].add(a(0, e, g(i) ? i : M, e.notifyWith)), n[1][3].add(a(0, e, g(t) ? t : M)), n[2][3].add(a(0, e, g(r) ? r : R))
                        }).promise()
                    },
                    promise: function(e) {
                        return null != e ? b.extend(e, i) : i
                    }
                },
                o = {};
            return b.each(n, function(e, t) {
                var a = t[2],
                    s = t[5];
                i[t[1]] = a.add, s && a.add(function() {
                    r = s
                }, n[3 - e][2].disable, n[3 - e][3].disable, n[0][2].lock, n[0][3].lock), a.add(t[3].fire), o[t[0]] = function() {
                    return o[t[0] + "With"](this === o ? void 0 : this, arguments), this
                }, o[t[0] + "With"] = a.fireWith
            }), i.promise(o), t && t.call(o, o), o
        },
        when: function(e) {
            var t = arguments.length,
                n = t,
                r = Array(n),
                i = o.call(arguments),
                a = b.Deferred(),
                s = function(e) {
                    return function(n) {
                        r[e] = this, i[e] = arguments.length > 1 ? o.call(arguments) : n, --t || a.resolveWith(r, i)
                    }
                };
            if (t <= 1 && (I(e, a.done(s(n)).resolve, a.reject, !t), "pending" === a.state() || g(i[n] && i[n].then))) return a.then();
            for (; n--;) I(i[n], s(n), a.reject);
            return a.promise()
        }
    });
    var W = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    b.Deferred.exceptionHook = function(t, n) {
        e.console && e.console.warn && t && W.test(t.name) && e.console.warn("jQuery.Deferred exception: " + t.message, t.stack, n)
    }, b.readyException = function(t) {
        e.setTimeout(function() {
            throw t
        })
    };
    var $ = b.Deferred();
    b.fn.ready = function(e) {
        return $.then(e).catch(function(e) {
            b.readyException(e)
        }), this
    }, b.extend({
        isReady: !1,
        readyWait: 1,
        ready: function(e) {
            (!0 === e ? --b.readyWait : b.isReady) || (b.isReady = !0, !0 !== e && --b.readyWait > 0 || $.resolveWith(r, [b]))
        }
    }), b.ready.then = $.then;

    function B() {
        r.removeEventListener("DOMContentLoaded", B), e.removeEventListener("load", B), b.ready()
    }
    "complete" === r.readyState || "loading" !== r.readyState && !r.documentElement.doScroll ? e.setTimeout(b.ready) : (r.addEventListener("DOMContentLoaded", B), e.addEventListener("load", B));
    var F = function(e, t, n, r, i, o, a) {
            var s = 0,
                u = e.length,
                l = null == n;
            if ("object" === x(n)) {
                i = !0;
                for (s in n) F(e, t, s, n[s], !0, o, a)
            } else if (void 0 !== r && (i = !0, g(r) || (a = !0), l && (a ? (t.call(e, r), t = null) : (l = t, t = function(e, t, n) {
                    return l.call(b(e), n)
                })), t))
                for (; s < u; s++) t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
            return i ? e : l ? t.call(e) : u ? t(e[0], n) : o
        },
        _ = /^-ms-/,
        z = /-([a-z])/g;

    function X(e, t) {
        return t.toUpperCase()
    }

    function U(e) {
        return e.replace(_, "ms-").replace(z, X)
    }
    var V = function(e) {
        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
    };

    function G() {
        this.expando = b.expando + G.uid++
    }
    G.uid = 1, G.prototype = {
        cache: function(e) {
            var t = e[this.expando];
            return t || (t = {}, V(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                value: t,
                configurable: !0
            }))), t
        },
        set: function(e, t, n) {
            var r, i = this.cache(e);
            if ("string" == typeof t) i[U(t)] = n;
            else
                for (r in t) i[U(r)] = t[r];
            return i
        },
        get: function(e, t) {
            return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][U(t)]
        },
        access: function(e, t, n) {
            return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t)
        },
        remove: function(e, t) {
            var n, r = e[this.expando];
            if (void 0 !== r) {
                if (void 0 !== t) {
                    n = (t = Array.isArray(t) ? t.map(U) : (t = U(t)) in r ? [t] : t.match(P) || []).length;
                    for (; n--;) delete r[t[n]]
                }(void 0 === t || b.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
            }
        },
        hasData: function(e) {
            var t = e[this.expando];
            return void 0 !== t && !b.isEmptyObject(t)
        }
    };
    var Y = new G,
        Q = new G,
        J = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        K = /[A-Z]/g;

    function Z(e, t, n) {
        var r;
        if (void 0 === n && 1 === e.nodeType)
            if (r = "data-" + t.replace(K, "-$&").toLowerCase(), "string" == typeof(n = e.getAttribute(r))) {
                try {
                    n = "true" === (i = n) || "false" !== i && ("null" === i ? null : i === +i + "" ? +i : J.test(i) ? JSON.parse(i) : i)
                } catch (e) {}
                Q.set(e, t, n)
            } else n = void 0;
        var i;
        return n
    }
    b.extend({
        hasData: function(e) {
            return Q.hasData(e) || Y.hasData(e)
        },
        data: function(e, t, n) {
            return Q.access(e, t, n)
        },
        removeData: function(e, t) {
            Q.remove(e, t)
        },
        _data: function(e, t, n) {
            return Y.access(e, t, n)
        },
        _removeData: function(e, t) {
            Y.remove(e, t)
        }
    }), b.fn.extend({
        data: function(e, t) {
            var n, r, i, o = this[0],
                a = o && o.attributes;
            if (void 0 === e) {
                if (this.length && (i = Q.get(o), 1 === o.nodeType && !Y.get(o, "hasDataAttrs"))) {
                    for (n = a.length; n--;) a[n] && 0 === (r = a[n].name).indexOf("data-") && (r = U(r.slice(5)), Z(o, r, i[r]));
                    Y.set(o, "hasDataAttrs", !0)
                }
                return i
            }
            return "object" == typeof e ? this.each(function() {
                Q.set(this, e)
            }) : F(this, function(t) {
                var n;
                if (o && void 0 === t) {
                    if (void 0 !== (n = Q.get(o, e))) return n;
                    if (void 0 !== (n = Z(o, e))) return n
                } else this.each(function() {
                    Q.set(this, e, t)
                })
            }, null, t, arguments.length > 1, null, !0)
        },
        removeData: function(e) {
            return this.each(function() {
                Q.remove(this, e)
            })
        }
    }), b.extend({
        queue: function(e, t, n) {
            var r;
            if (e) return t = (t || "fx") + "queue", r = Y.get(e, t), n && (!r || Array.isArray(n) ? r = Y.access(e, t, b.makeArray(n)) : r.push(n)), r || []
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = b.queue(e, t),
                r = n.length,
                i = n.shift(),
                o = b._queueHooks(e, t),
                a = function() {
                    b.dequeue(e, t)
                };
            "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, a, o)), !r && o && o.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return Y.get(e, n) || Y.access(e, n, {
                empty: b.Callbacks("once memory").add(function() {
                    Y.remove(e, [t + "queue", n])
                })
            })
        }
    }), b.fn.extend({
        queue: function(e, t) {
            var n = 2;
            return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? b.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                var n = b.queue(this, e, t);
                b._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && b.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                b.dequeue(this, e)
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            var n, r = 1,
                i = b.Deferred(),
                o = this,
                a = this.length,
                s = function() {
                    --r || i.resolveWith(o, [o])
                };
            for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;)(n = Y.get(o[a], e + "queueHooks")) && n.empty && (r++, n.empty.add(s));
            return s(), i.promise(t)
        }
    });
    var ee = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        te = new RegExp("^(?:([+-])=|)(" + ee + ")([a-z%]*)$", "i"),
        ne = ["Top", "Right", "Bottom", "Left"],
        re = function(e, t) {
            return "none" === (e = t || e).style.display || "" === e.style.display && b.contains(e.ownerDocument, e) && "none" === b.css(e, "display")
        },
        ie = function(e, t, n, r) {
            var i, o, a = {};
            for (o in t) a[o] = e.style[o], e.style[o] = t[o];
            i = n.apply(e, r || []);
            for (o in t) e.style[o] = a[o];
            return i
        };

    function oe(e, t, n, r) {
        var i, o, a = 20,
            s = r ? function() {
                return r.cur()
            } : function() {
                return b.css(e, t, "")
            },
            u = s(),
            l = n && n[3] || (b.cssNumber[t] ? "" : "px"),
            c = (b.cssNumber[t] || "px" !== l && +u) && te.exec(b.css(e, t));
        if (c && c[3] !== l) {
            for (u /= 2, l = l || c[3], c = +u || 1; a--;) b.style(e, t, c + l), (1 - o) * (1 - (o = s() / u || .5)) <= 0 && (a = 0), c /= o;
            c *= 2, b.style(e, t, c + l), n = n || []
        }
        return n && (c = +c || +u || 0, i = n[1] ? c + (n[1] + 1) * n[2] : +n[2], r && (r.unit = l, r.start = c, r.end = i)), i
    }
    var ae = {};

    function se(e) {
        var t, n = e.ownerDocument,
            r = e.nodeName,
            i = ae[r];
        return i || (t = n.body.appendChild(n.createElement(r)), i = b.css(t, "display"), t.parentNode.removeChild(t), "none" === i && (i = "block"), ae[r] = i, i)
    }

    function ue(e, t) {
        for (var n, r, i = [], o = 0, a = e.length; o < a; o++)(r = e[o]).style && (n = r.style.display, t ? ("none" === n && (i[o] = Y.get(r, "display") || null, i[o] || (r.style.display = "")), "" === r.style.display && re(r) && (i[o] = se(r))) : "none" !== n && (i[o] = "none", Y.set(r, "display", n)));
        for (o = 0; o < a; o++) null != i[o] && (e[o].style.display = i[o]);
        return e
    }
    b.fn.extend({
        show: function() {
            return ue(this, !0)
        },
        hide: function() {
            return ue(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                re(this) ? b(this).show() : b(this).hide()
            })
        }
    });
    var le = /^(?:checkbox|radio)$/i,
        ce = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
        fe = /^$|^module$|\/(?:java|ecma)script/i,
        pe = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    pe.optgroup = pe.option, pe.tbody = pe.tfoot = pe.colgroup = pe.caption = pe.thead, pe.th = pe.td;

    function de(e, t) {
        var n;
        return n = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && D(e, t) ? b.merge([e], n) : n
    }

    function he(e, t) {
        for (var n = 0, r = e.length; n < r; n++) Y.set(e[n], "globalEval", !t || Y.get(t[n], "globalEval"))
    }
    var ge = /<|&#?\w+;/;

    function ve(e, t, n, r, i) {
        for (var o, a, s, u, l, c, f = t.createDocumentFragment(), p = [], d = 0, h = e.length; d < h; d++)
            if ((o = e[d]) || 0 === o)
                if ("object" === x(o)) b.merge(p, o.nodeType ? [o] : o);
                else if (ge.test(o)) {
            for (a = a || f.appendChild(t.createElement("div")), s = (ce.exec(o) || ["", ""])[1].toLowerCase(), u = pe[s] || pe._default, a.innerHTML = u[1] + b.htmlPrefilter(o) + u[2], c = u[0]; c--;) a = a.lastChild;
            b.merge(p, a.childNodes), (a = f.firstChild).textContent = ""
        } else p.push(t.createTextNode(o));
        for (f.textContent = "", d = 0; o = p[d++];)
            if (r && b.inArray(o, r) > -1) i && i.push(o);
            else if (l = b.contains(o.ownerDocument, o), a = de(f.appendChild(o), "script"), l && he(a), n)
            for (c = 0; o = a[c++];) fe.test(o.type || "") && n.push(o);
        return f
    }! function() {
        var e = r.createDocumentFragment().appendChild(r.createElement("div")),
            t = r.createElement("input");
        t.setAttribute("type", "radio"), t.setAttribute("checked", "checked"), t.setAttribute("name", "t"), e.appendChild(t), h.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, e.innerHTML = "<textarea>x</textarea>", h.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue
    }();
    var ye = r.documentElement,
        me = /^key/,
        xe = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        be = /^([^.]*)(?:\.(.+)|)/;

    function we() {
        return !0
    }

    function Te() {
        return !1
    }

    function Ce() {
        try {
            return r.activeElement
        } catch (e) {}
    }

    function Ee(e, t, n, r, i, o) {
        var a, s;
        if ("object" == typeof t) {
            "string" != typeof n && (r = r || n, n = void 0);
            for (s in t) Ee(e, s, n, r, t[s], o);
            return e
        }
        if (null == r && null == i ? (i = n, r = n = void 0) : null == i && ("string" == typeof n ? (i = r, r = void 0) : (i = r, r = n, n = void 0)), !1 === i) i = Te;
        else if (!i) return e;
        return 1 === o && (a = i, (i = function(e) {
            return b().off(e), a.apply(this, arguments)
        }).guid = a.guid || (a.guid = b.guid++)), e.each(function() {
            b.event.add(this, t, i, r, n)
        })
    }
    b.event = {
        global: {},
        add: function(e, t, n, r, i) {
            var o, a, s, u, l, c, f, p, d, h, g, v = Y.get(e);
            if (v)
                for (n.handler && (n = (o = n).handler, i = o.selector), i && b.find.matchesSelector(ye, i), n.guid || (n.guid = b.guid++), (u = v.events) || (u = v.events = {}), (a = v.handle) || (a = v.handle = function(t) {
                        return void 0 !== b && b.event.triggered !== t.type ? b.event.dispatch.apply(e, arguments) : void 0
                    }), l = (t = (t || "").match(P) || [""]).length; l--;) d = g = (s = be.exec(t[l]) || [])[1], h = (s[2] || "").split(".").sort(), d && (f = b.event.special[d] || {}, d = (i ? f.delegateType : f.bindType) || d, f = b.event.special[d] || {}, c = b.extend({
                    type: d,
                    origType: g,
                    data: r,
                    handler: n,
                    guid: n.guid,
                    selector: i,
                    needsContext: i && b.expr.match.needsContext.test(i),
                    namespace: h.join(".")
                }, o), (p = u[d]) || ((p = u[d] = []).delegateCount = 0, f.setup && !1 !== f.setup.call(e, r, h, a) || e.addEventListener && e.addEventListener(d, a)), f.add && (f.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)), i ? p.splice(p.delegateCount++, 0, c) : p.push(c), b.event.global[d] = !0)
        },
        remove: function(e, t, n, r, i) {
            var o, a, s, u, l, c, f, p, d, h, g, v = Y.hasData(e) && Y.get(e);
            if (v && (u = v.events)) {
                for (l = (t = (t || "").match(P) || [""]).length; l--;)
                    if (d = g = (s = be.exec(t[l]) || [])[1], h = (s[2] || "").split(".").sort(), d) {
                        for (f = b.event.special[d] || {}, p = u[d = (r ? f.delegateType : f.bindType) || d] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = p.length; o--;) c = p[o], !i && g !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (p.splice(o, 1), c.selector && p.delegateCount--, f.remove && f.remove.call(e, c));
                        a && !p.length && (f.teardown && !1 !== f.teardown.call(e, h, v.handle) || b.removeEvent(e, d, v.handle), delete u[d])
                    } else
                        for (d in u) b.event.remove(e, d + t[l], n, r, !0);
                b.isEmptyObject(u) && Y.remove(e, "handle events")
            }
        },
        dispatch: function(e) {
            var t, n, r, i, o, a, s = b.event.fix(e),
                u = new Array(arguments.length),
                l = (Y.get(this, "events") || {})[s.type] || [],
                c = b.event.special[s.type] || {};
            for (u[0] = s, t = 1; t < arguments.length; t++) u[t] = arguments[t];
            if (s.delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, s)) {
                for (a = b.event.handlers.call(this, s, l), t = 0;
                    (i = a[t++]) && !s.isPropagationStopped();)
                    for (s.currentTarget = i.elem, n = 0;
                        (o = i.handlers[n++]) && !s.isImmediatePropagationStopped();) s.rnamespace && !s.rnamespace.test(o.namespace) || (s.handleObj = o, s.data = o.data, void 0 !== (r = ((b.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, u)) && !1 === (s.result = r) && (s.preventDefault(), s.stopPropagation()));
                return c.postDispatch && c.postDispatch.call(this, s), s.result
            }
        },
        handlers: function(e, t) {
            var n, r, i, o, a, s = [],
                u = t.delegateCount,
                l = e.target;
            if (u && l.nodeType && !("click" === e.type && e.button >= 1))
                for (; l !== this; l = l.parentNode || this)
                    if (1 === l.nodeType && ("click" !== e.type || !0 !== l.disabled)) {
                        for (o = [], a = {}, n = 0; n < u; n++) void 0 === a[i = (r = t[n]).selector + " "] && (a[i] = r.needsContext ? b(i, this).index(l) > -1 : b.find(i, this, null, [l]).length), a[i] && o.push(r);
                        o.length && s.push({
                            elem: l,
                            handlers: o
                        })
                    } return l = this, u < t.length && s.push({
                elem: l,
                handlers: t.slice(u)
            }), s
        },
        addProp: function(e, t) {
            Object.defineProperty(b.Event.prototype, e, {
                enumerable: !0,
                configurable: !0,
                get: g(t) ? function() {
                    if (this.originalEvent) return t(this.originalEvent)
                } : function() {
                    if (this.originalEvent) return this.originalEvent[e]
                },
                set: function(t) {
                    Object.defineProperty(this, e, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: t
                    })
                }
            })
        },
        fix: function(e) {
            return e[b.expando] ? e : new b.Event(e)
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== Ce() && this.focus) return this.focus(), !1
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === Ce() && this.blur) return this.blur(), !1
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if ("checkbox" === this.type && this.click && D(this, "input")) return this.click(), !1
                },
                _default: function(e) {
                    return D(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        }
    }, b.removeEvent = function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n)
    }, b.Event = function(e, t) {
        if (!(this instanceof b.Event)) return new b.Event(e, t);
        e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? we : Te, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && b.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[b.expando] = !0
    }, b.Event.prototype = {
        constructor: b.Event,
        isDefaultPrevented: Te,
        isPropagationStopped: Te,
        isImmediatePropagationStopped: Te,
        isSimulated: !1,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = we, e && !this.isSimulated && e.preventDefault()
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = we, e && !this.isSimulated && e.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = we, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
        }
    }, b.each({
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        char: !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: function(e) {
            var t = e.button;
            return null == e.which && me.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && xe.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which
        }
    }, b.event.addProp), b.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(e, t) {
        b.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, r = e.relatedTarget,
                    i = e.handleObj;
                return r && (r === this || b.contains(this, r)) || (e.type = i.origType, n = i.handler.apply(this, arguments), e.type = t), n
            }
        }
    }), b.fn.extend({
        on: function(e, t, n, r) {
            return Ee(this, e, t, n, r)
        },
        one: function(e, t, n, r) {
            return Ee(this, e, t, n, r, 1)
        },
        off: function(e, t, n) {
            var r, i;
            if (e && e.preventDefault && e.handleObj) return r = e.handleObj, b(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
            if ("object" == typeof e) {
                for (i in e) this.off(i, t, e[i]);
                return this
            }
            return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = Te), this.each(function() {
                b.event.remove(this, e, n, t)
            })
        }
    });
    var ke = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
        Se = /<script|<style|<link/i,
        De = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Ne = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

    function Ae(e, t) {
        return D(e, "table") && D(11 !== t.nodeType ? t : t.firstChild, "tr") ? b(e).children("tbody")[0] || e : e
    }

    function je(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
    }

    function qe(e) {
        return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e
    }

    function Le(e, t) {
        var n, r, i, o, a, s, u, l;
        if (1 === t.nodeType) {
            if (Y.hasData(e) && (o = Y.access(e), a = Y.set(t, o), l = o.events)) {
                delete a.handle, a.events = {};
                for (i in l)
                    for (n = 0, r = l[i].length; n < r; n++) b.event.add(t, i, l[i][n])
            }
            Q.hasData(e) && (s = Q.access(e), u = b.extend({}, s), Q.set(t, u))
        }
    }

    function He(e, t) {
        var n = t.nodeName.toLowerCase();
        "input" === n && le.test(e.type) ? t.checked = e.checked : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
    }

    function Oe(e, t, n, r) {
        t = a.apply([], t);
        var i, o, s, u, l, c, f = 0,
            p = e.length,
            d = p - 1,
            v = t[0],
            y = g(v);
        if (y || p > 1 && "string" == typeof v && !h.checkClone && De.test(v)) return e.each(function(i) {
            var o = e.eq(i);
            y && (t[0] = v.call(this, i, o.html())), Oe(o, t, n, r)
        });
        if (p && (o = (i = ve(t, e[0].ownerDocument, !1, e, r)).firstChild, 1 === i.childNodes.length && (i = o), o || r)) {
            for (u = (s = b.map(de(i, "script"), je)).length; f < p; f++) l = i, f !== d && (l = b.clone(l, !0, !0), u && b.merge(s, de(l, "script"))), n.call(e[f], l, f);
            if (u)
                for (c = s[s.length - 1].ownerDocument, b.map(s, qe), f = 0; f < u; f++) l = s[f], fe.test(l.type || "") && !Y.access(l, "globalEval") && b.contains(c, l) && (l.src && "module" !== (l.type || "").toLowerCase() ? b._evalUrl && b._evalUrl(l.src) : m(l.textContent.replace(Ne, ""), c, l))
        }
        return e
    }

    function Pe(e, t, n) {
        for (var r, i = t ? b.filter(t, e) : e, o = 0; null != (r = i[o]); o++) n || 1 !== r.nodeType || b.cleanData(de(r)), r.parentNode && (n && b.contains(r.ownerDocument, r) && he(de(r, "script")), r.parentNode.removeChild(r));
        return e
    }
    b.extend({
        htmlPrefilter: function(e) {
            return e.replace(ke, "<$1></$2>")
        },
        clone: function(e, t, n) {
            var r, i, o, a, s = e.cloneNode(!0),
                u = b.contains(e.ownerDocument, e);
            if (!(h.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || b.isXMLDoc(e)))
                for (a = de(s), r = 0, i = (o = de(e)).length; r < i; r++) He(o[r], a[r]);
            if (t)
                if (n)
                    for (o = o || de(e), a = a || de(s), r = 0, i = o.length; r < i; r++) Le(o[r], a[r]);
                else Le(e, s);
            return (a = de(s, "script")).length > 0 && he(a, !u && de(e, "script")), s
        },
        cleanData: function(e) {
            for (var t, n, r, i = b.event.special, o = 0; void 0 !== (n = e[o]); o++)
                if (V(n)) {
                    if (t = n[Y.expando]) {
                        if (t.events)
                            for (r in t.events) i[r] ? b.event.remove(n, r) : b.removeEvent(n, r, t.handle);
                        n[Y.expando] = void 0
                    }
                    n[Q.expando] && (n[Q.expando] = void 0)
                }
        }
    }), b.fn.extend({
        detach: function(e) {
            return Pe(this, e, !0)
        },
        remove: function(e) {
            return Pe(this, e)
        },
        text: function(e) {
            return F(this, function(e) {
                return void 0 === e ? b.text(this) : this.empty().each(function() {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                })
            }, null, e, arguments.length)
        },
        append: function() {
            return Oe(this, arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    Ae(this, e).appendChild(e)
                }
            })
        },
        prepend: function() {
            return Oe(this, arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = Ae(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return Oe(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return Oe(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (b.cleanData(de(e, !1)), e.textContent = "");
            return this
        },
        clone: function(e, t) {
            return e = null != e && e, t = null == t ? e : t, this.map(function() {
                return b.clone(this, e, t)
            })
        },
        html: function(e) {
            return F(this, function(e) {
                var t = this[0] || {},
                    n = 0,
                    r = this.length;
                if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                if ("string" == typeof e && !Se.test(e) && !pe[(ce.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = b.htmlPrefilter(e);
                    try {
                        for (; n < r; n++) 1 === (t = this[n] || {}).nodeType && (b.cleanData(de(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (e) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var e = [];
            return Oe(this, arguments, function(t) {
                var n = this.parentNode;
                b.inArray(this, e) < 0 && (b.cleanData(de(this)), n && n.replaceChild(t, this))
            }, e)
        }
    }), b.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        b.fn[e] = function(e) {
            for (var n, r = [], i = b(e), o = i.length - 1, a = 0; a <= o; a++) n = a === o ? this : this.clone(!0), b(i[a])[t](n), s.apply(r, n.get());
            return this.pushStack(r)
        }
    });
    var Me = new RegExp("^(" + ee + ")(?!px)[a-z%]+$", "i"),
        Re = function(t) {
            var n = t.ownerDocument.defaultView;
            return n && n.opener || (n = e), n.getComputedStyle(t)
        },
        Ie = new RegExp(ne.join("|"), "i");
    ! function() {
        function t() {
            if (c) {
                l.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", c.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", ye.appendChild(l).appendChild(c);
                var t = e.getComputedStyle(c);
                i = "1%" !== t.top, u = 12 === n(t.marginLeft), c.style.right = "60%", s = 36 === n(t.right), o = 36 === n(t.width), c.style.position = "absolute", a = 36 === c.offsetWidth || "absolute", ye.removeChild(l), c = null
            }
        }

        function n(e) {
            return Math.round(parseFloat(e))
        }
        var i, o, a, s, u, l = r.createElement("div"),
            c = r.createElement("div");
        c.style && (c.style.backgroundClip = "content-box", c.cloneNode(!0).style.backgroundClip = "", h.clearCloneStyle = "content-box" === c.style.backgroundClip, b.extend(h, {
            boxSizingReliable: function() {
                return t(), o
            },
            pixelBoxStyles: function() {
                return t(), s
            },
            pixelPosition: function() {
                return t(), i
            },
            reliableMarginLeft: function() {
                return t(), u
            },
            scrollboxSize: function() {
                return t(), a
            }
        }))
    }();

    function We(e, t, n) {
        var r, i, o, a, s = e.style;
        return (n = n || Re(e)) && ("" !== (a = n.getPropertyValue(t) || n[t]) || b.contains(e.ownerDocument, e) || (a = b.style(e, t)), !h.pixelBoxStyles() && Me.test(a) && Ie.test(t) && (r = s.width, i = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = i, s.maxWidth = o)), void 0 !== a ? a + "" : a
    }

    function $e(e, t) {
        return {
            get: function() {
                if (!e()) return (this.get = t).apply(this, arguments);
                delete this.get
            }
        }
    }
    var Be = /^(none|table(?!-c[ea]).+)/,
        Fe = /^--/,
        _e = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        ze = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        Xe = ["Webkit", "Moz", "ms"],
        Ue = r.createElement("div").style;

    function Ve(e) {
        var t = b.cssProps[e];
        return t || (t = b.cssProps[e] = function(e) {
            if (e in Ue) return e;
            for (var t = e[0].toUpperCase() + e.slice(1), n = Xe.length; n--;)
                if ((e = Xe[n] + t) in Ue) return e
        }(e) || e), t
    }

    function Ge(e, t, n) {
        var r = te.exec(t);
        return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t
    }

    function Ye(e, t, n, r, i, o) {
        var a = "width" === t ? 1 : 0,
            s = 0,
            u = 0;
        if (n === (r ? "border" : "content")) return 0;
        for (; a < 4; a += 2) "margin" === n && (u += b.css(e, n + ne[a], !0, i)), r ? ("content" === n && (u -= b.css(e, "padding" + ne[a], !0, i)), "margin" !== n && (u -= b.css(e, "border" + ne[a] + "Width", !0, i))) : (u += b.css(e, "padding" + ne[a], !0, i), "padding" !== n ? u += b.css(e, "border" + ne[a] + "Width", !0, i) : s += b.css(e, "border" + ne[a] + "Width", !0, i));
        return !r && o >= 0 && (u += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - o - u - s - .5))), u
    }

    function Qe(e, t, n) {
        var r = Re(e),
            i = We(e, t, r),
            o = "border-box" === b.css(e, "boxSizing", !1, r),
            a = o;
        if (Me.test(i)) {
            if (!n) return i;
            i = "auto"
        }
        return a = a && (h.boxSizingReliable() || i === e.style[t]), ("auto" === i || !parseFloat(i) && "inline" === b.css(e, "display", !1, r)) && (i = e["offset" + t[0].toUpperCase() + t.slice(1)], a = !0), (i = parseFloat(i) || 0) + Ye(e, t, n || (o ? "border" : "content"), a, r, i) + "px"
    }
    b.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = We(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {},
        style: function(e, t, n, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i, o, a, s = U(t),
                    u = Fe.test(t),
                    l = e.style;
                if (u || (t = Ve(s)), a = b.cssHooks[t] || b.cssHooks[s], void 0 === n) return a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : l[t];
                "string" === (o = typeof n) && (i = te.exec(n)) && i[1] && (n = oe(e, t, i), o = "number"), null != n && n == n && ("number" === o && (n += i && i[3] || (b.cssNumber[s] ? "" : "px")), h.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, r)) || (u ? l.setProperty(t, n) : l[t] = n))
            }
        },
        css: function(e, t, n, r) {
            var i, o, a, s = U(t);
            return Fe.test(t) || (t = Ve(s)), (a = b.cssHooks[t] || b.cssHooks[s]) && "get" in a && (i = a.get(e, !0, n)), void 0 === i && (i = We(e, t, r)), "normal" === i && t in ze && (i = ze[t]), "" === n || n ? (o = parseFloat(i), !0 === n || isFinite(o) ? o || 0 : i) : i
        }
    }), b.each(["height", "width"], function(e, t) {
        b.cssHooks[t] = {
            get: function(e, n, r) {
                if (n) return !Be.test(b.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? Qe(e, t, r) : ie(e, _e, function() {
                    return Qe(e, t, r)
                })
            },
            set: function(e, n, r) {
                var i, o = Re(e),
                    a = "border-box" === b.css(e, "boxSizing", !1, o),
                    s = r && Ye(e, t, r, a, o);
                return a && h.scrollboxSize() === o.position && (s -= Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - parseFloat(o[t]) - Ye(e, t, "border", !1, o) - .5)), s && (i = te.exec(n)) && "px" !== (i[3] || "px") && (e.style[t] = n, n = b.css(e, t)), Ge(0, n, s)
            }
        }
    }), b.cssHooks.marginLeft = $e(h.reliableMarginLeft, function(e, t) {
        if (t) return (parseFloat(We(e, "marginLeft")) || e.getBoundingClientRect().left - ie(e, {
            marginLeft: 0
        }, function() {
            return e.getBoundingClientRect().left
        })) + "px"
    }), b.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        b.cssHooks[e + t] = {
            expand: function(n) {
                for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; r < 4; r++) i[e + ne[r] + t] = o[r] || o[r - 2] || o[0];
                return i
            }
        }, "margin" !== e && (b.cssHooks[e + t].set = Ge)
    }), b.fn.extend({
        css: function(e, t) {
            return F(this, function(e, t, n) {
                var r, i, o = {},
                    a = 0;
                if (Array.isArray(t)) {
                    for (r = Re(e), i = t.length; a < i; a++) o[t[a]] = b.css(e, t[a], !1, r);
                    return o
                }
                return void 0 !== n ? b.style(e, t, n) : b.css(e, t)
            }, e, t, arguments.length > 1)
        }
    });

    function Je(e, t, n, r, i) {
        return new Je.prototype.init(e, t, n, r, i)
    }
    b.Tween = Je, Je.prototype = {
        constructor: Je,
        init: function(e, t, n, r, i, o) {
            this.elem = e, this.prop = n, this.easing = i || b.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (b.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = Je.propHooks[this.prop];
            return e && e.get ? e.get(this) : Je.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = Je.propHooks[this.prop];
            return this.options.duration ? this.pos = t = b.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : Je.propHooks._default.set(this), this
        }
    }, Je.prototype.init.prototype = Je.prototype, Je.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = b.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
            },
            set: function(e) {
                b.fx.step[e.prop] ? b.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[b.cssProps[e.prop]] && !b.cssHooks[e.prop] ? e.elem[e.prop] = e.now : b.style(e.elem, e.prop, e.now + e.unit)
            }
        }
    }, Je.propHooks.scrollTop = Je.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, b.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        },
        _default: "swing"
    }, b.fx = Je.prototype.init, b.fx.step = {};
    var Ke, Ze, et = /^(?:toggle|show|hide)$/,
        tt = /queueHooks$/;

    function nt() {
        Ze && (!1 === r.hidden && e.requestAnimationFrame ? e.requestAnimationFrame(nt) : e.setTimeout(nt, b.fx.interval), b.fx.tick())
    }

    function rt() {
        return e.setTimeout(function() {
            Ke = void 0
        }), Ke = Date.now()
    }

    function it(e, t) {
        var n, r = 0,
            i = {
                height: e
            };
        for (t = t ? 1 : 0; r < 4; r += 2 - t) i["margin" + (n = ne[r])] = i["padding" + n] = e;
        return t && (i.opacity = i.width = e), i
    }

    function ot(e, t, n) {
        for (var r, i = (at.tweeners[t] || []).concat(at.tweeners["*"]), o = 0, a = i.length; o < a; o++)
            if (r = i[o].call(n, t, e)) return r
    }

    function at(e, t, n) {
        var r, i, o = 0,
            a = at.prefilters.length,
            s = b.Deferred().always(function() {
                delete u.elem
            }),
            u = function() {
                if (i) return !1;
                for (var t = Ke || rt(), n = Math.max(0, l.startTime + l.duration - t), r = 1 - (n / l.duration || 0), o = 0, a = l.tweens.length; o < a; o++) l.tweens[o].run(r);
                return s.notifyWith(e, [l, r, n]), r < 1 && a ? n : (a || s.notifyWith(e, [l, 1, 0]), s.resolveWith(e, [l]), !1)
            },
            l = s.promise({
                elem: e,
                props: b.extend({}, t),
                opts: b.extend(!0, {
                    specialEasing: {},
                    easing: b.easing._default
                }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: Ke || rt(),
                duration: n.duration,
                tweens: [],
                createTween: function(t, n) {
                    var r = b.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
                    return l.tweens.push(r), r
                },
                stop: function(t) {
                    var n = 0,
                        r = t ? l.tweens.length : 0;
                    if (i) return this;
                    for (i = !0; n < r; n++) l.tweens[n].run(1);
                    return t ? (s.notifyWith(e, [l, 1, 0]), s.resolveWith(e, [l, t])) : s.rejectWith(e, [l, t]), this
                }
            }),
            c = l.props;
        for (! function(e, t) {
                var n, r, i, o, a;
                for (n in e)
                    if (i = t[r = U(n)], o = e[n], Array.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), (a = b.cssHooks[r]) && "expand" in a) {
                        o = a.expand(o), delete e[r];
                        for (n in o) n in e || (e[n] = o[n], t[n] = i)
                    } else t[r] = i
            }(c, l.opts.specialEasing); o < a; o++)
            if (r = at.prefilters[o].call(l, e, c, l.opts)) return g(r.stop) && (b._queueHooks(l.elem, l.opts.queue).stop = r.stop.bind(r)), r;
        return b.map(c, ot, l), g(l.opts.start) && l.opts.start.call(e, l), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always), b.fx.timer(b.extend(u, {
            elem: e,
            anim: l,
            queue: l.opts.queue
        })), l
    }
    b.Animation = b.extend(at, {
            tweeners: {
                "*": [function(e, t) {
                    var n = this.createTween(e, t);
                    return oe(n.elem, e, te.exec(t), n), n
                }]
            },
            tweener: function(e, t) {
                g(e) ? (t = e, e = ["*"]) : e = e.match(P);
                for (var n, r = 0, i = e.length; r < i; r++) n = e[r], at.tweeners[n] = at.tweeners[n] || [], at.tweeners[n].unshift(t)
            },
            prefilters: [function(e, t, n) {
                var r, i, o, a, s, u, l, c, f = "width" in t || "height" in t,
                    p = this,
                    d = {},
                    h = e.style,
                    g = e.nodeType && re(e),
                    v = Y.get(e, "fxshow");
                n.queue || (null == (a = b._queueHooks(e, "fx")).unqueued && (a.unqueued = 0, s = a.empty.fire, a.empty.fire = function() {
                    a.unqueued || s()
                }), a.unqueued++, p.always(function() {
                    p.always(function() {
                        a.unqueued--, b.queue(e, "fx").length || a.empty.fire()
                    })
                }));
                for (r in t)
                    if (i = t[r], et.test(i)) {
                        if (delete t[r], o = o || "toggle" === i, i === (g ? "hide" : "show")) {
                            if ("show" !== i || !v || void 0 === v[r]) continue;
                            g = !0
                        }
                        d[r] = v && v[r] || b.style(e, r)
                    } if ((u = !b.isEmptyObject(t)) || !b.isEmptyObject(d)) {
                    f && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY], null == (l = v && v.display) && (l = Y.get(e, "display")), "none" === (c = b.css(e, "display")) && (l ? c = l : (ue([e], !0), l = e.style.display || l, c = b.css(e, "display"), ue([e]))), ("inline" === c || "inline-block" === c && null != l) && "none" === b.css(e, "float") && (u || (p.done(function() {
                        h.display = l
                    }), null == l && (c = h.display, l = "none" === c ? "" : c)), h.display = "inline-block")), n.overflow && (h.overflow = "hidden", p.always(function() {
                        h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2]
                    })), u = !1;
                    for (r in d) u || (v ? "hidden" in v && (g = v.hidden) : v = Y.access(e, "fxshow", {
                        display: l
                    }), o && (v.hidden = !g), g && ue([e], !0), p.done(function() {
                        g || ue([e]), Y.remove(e, "fxshow");
                        for (r in d) b.style(e, r, d[r])
                    })), u = ot(g ? v[r] : 0, r, p), r in v || (v[r] = u.start, g && (u.end = u.start, u.start = 0))
                }
            }],
            prefilter: function(e, t) {
                t ? at.prefilters.unshift(e) : at.prefilters.push(e)
            }
        }), b.speed = function(e, t, n) {
            var r = e && "object" == typeof e ? b.extend({}, e) : {
                complete: n || !n && t || g(e) && e,
                duration: e,
                easing: n && t || t && !g(t) && t
            };
            return b.fx.off ? r.duration = 0 : "number" != typeof r.duration && (r.duration in b.fx.speeds ? r.duration = b.fx.speeds[r.duration] : r.duration = b.fx.speeds._default), null != r.queue && !0 !== r.queue || (r.queue = "fx"), r.old = r.complete, r.complete = function() {
                g(r.old) && r.old.call(this), r.queue && b.dequeue(this, r.queue)
            }, r
        }, b.fn.extend({
            fadeTo: function(e, t, n, r) {
                return this.filter(re).css("opacity", 0).show().end().animate({
                    opacity: t
                }, e, n, r)
            },
            animate: function(e, t, n, r) {
                var i = b.isEmptyObject(e),
                    o = b.speed(t, n, r),
                    a = function() {
                        var t = at(this, b.extend({}, e), o);
                        (i || Y.get(this, "finish")) && t.stop(!0)
                    };
                return a.finish = a, i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a)
            },
            stop: function(e, t, n) {
                var r = function(e) {
                    var t = e.stop;
                    delete e.stop, t(n)
                };
                return "string" != typeof e && (n = t, t = e, e = void 0), t && !1 !== e && this.queue(e || "fx", []), this.each(function() {
                    var t = !0,
                        i = null != e && e + "queueHooks",
                        o = b.timers,
                        a = Y.get(this);
                    if (i) a[i] && a[i].stop && r(a[i]);
                    else
                        for (i in a) a[i] && a[i].stop && tt.test(i) && r(a[i]);
                    for (i = o.length; i--;) o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n), t = !1, o.splice(i, 1));
                    !t && n || b.dequeue(this, e)
                })
            },
            finish: function(e) {
                return !1 !== e && (e = e || "fx"), this.each(function() {
                    var t, n = Y.get(this),
                        r = n[e + "queue"],
                        i = n[e + "queueHooks"],
                        o = b.timers,
                        a = r ? r.length : 0;
                    for (n.finish = !0, b.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                    for (t = 0; t < a; t++) r[t] && r[t].finish && r[t].finish.call(this);
                    delete n.finish
                })
            }
        }), b.each(["toggle", "show", "hide"], function(e, t) {
            var n = b.fn[t];
            b.fn[t] = function(e, r, i) {
                return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(it(t, !0), e, r, i)
            }
        }), b.each({
            slideDown: it("show"),
            slideUp: it("hide"),
            slideToggle: it("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(e, t) {
            b.fn[e] = function(e, n, r) {
                return this.animate(t, e, n, r)
            }
        }), b.timers = [], b.fx.tick = function() {
            var e, t = 0,
                n = b.timers;
            for (Ke = Date.now(); t < n.length; t++)(e = n[t])() || n[t] !== e || n.splice(t--, 1);
            n.length || b.fx.stop(), Ke = void 0
        }, b.fx.timer = function(e) {
            b.timers.push(e), b.fx.start()
        }, b.fx.interval = 13, b.fx.start = function() {
            Ze || (Ze = !0, nt())
        }, b.fx.stop = function() {
            Ze = null
        }, b.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, b.fn.delay = function(t, n) {
            return t = b.fx ? b.fx.speeds[t] || t : t, n = n || "fx", this.queue(n, function(n, r) {
                var i = e.setTimeout(n, t);
                r.stop = function() {
                    e.clearTimeout(i)
                }
            })
        },
        function() {
            var e = r.createElement("input"),
                t = r.createElement("select").appendChild(r.createElement("option"));
            e.type = "checkbox", h.checkOn = "" !== e.value, h.optSelected = t.selected, (e = r.createElement("input")).value = "t", e.type = "radio", h.radioValue = "t" === e.value
        }();
    var st, ut = b.expr.attrHandle;
    b.fn.extend({
        attr: function(e, t) {
            return F(this, b.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                b.removeAttr(this, e)
            })
        }
    }), b.extend({
        attr: function(e, t, n) {
            var r, i, o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o) return void 0 === e.getAttribute ? b.prop(e, t, n) : (1 === o && b.isXMLDoc(e) || (i = b.attrHooks[t.toLowerCase()] || (b.expr.match.bool.test(t) ? st : void 0)), void 0 !== n ? null === n ? void b.removeAttr(e, t) : i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : i && "get" in i && null !== (r = i.get(e, t)) ? r : null == (r = b.find.attr(e, t)) ? void 0 : r)
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!h.radioValue && "radio" === t && D(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        },
        removeAttr: function(e, t) {
            var n, r = 0,
                i = t && t.match(P);
            if (i && 1 === e.nodeType)
                for (; n = i[r++];) e.removeAttribute(n)
        }
    }), st = {
        set: function(e, t, n) {
            return !1 === t ? b.removeAttr(e, n) : e.setAttribute(n, n), n
        }
    }, b.each(b.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var n = ut[t] || b.find.attr;
        ut[t] = function(e, t, r) {
            var i, o, a = t.toLowerCase();
            return r || (o = ut[a], ut[a] = i, i = null != n(e, t, r) ? a : null, ut[a] = o), i
        }
    });
    var lt = /^(?:input|select|textarea|button)$/i,
        ct = /^(?:a|area)$/i;
    b.fn.extend({
        prop: function(e, t) {
            return F(this, b.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return this.each(function() {
                delete this[b.propFix[e] || e]
            })
        }
    }), b.extend({
        prop: function(e, t, n) {
            var r, i, o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o) return 1 === o && b.isXMLDoc(e) || (t = b.propFix[t] || t, i = b.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = b.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : lt.test(e.nodeName) || ct.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        },
        propFix: {
            for: "htmlFor",
            class: "className"
        }
    }), h.optSelected || (b.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null
        },
        set: function(e) {
            var t = e.parentNode;
            t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
        }
    }), b.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        b.propFix[this.toLowerCase()] = this
    });

    function ft(e) {
        return (e.match(P) || []).join(" ")
    }

    function pt(e) {
        return e.getAttribute && e.getAttribute("class") || ""
    }

    function dt(e) {
        return Array.isArray(e) ? e : "string" == typeof e ? e.match(P) || [] : []
    }
    b.fn.extend({
        addClass: function(e) {
            var t, n, r, i, o, a, s, u = 0;
            if (g(e)) return this.each(function(t) {
                b(this).addClass(e.call(this, t, pt(this)))
            });
            if ((t = dt(e)).length)
                for (; n = this[u++];)
                    if (i = pt(n), r = 1 === n.nodeType && " " + ft(i) + " ") {
                        for (a = 0; o = t[a++];) r.indexOf(" " + o + " ") < 0 && (r += o + " ");
                        i !== (s = ft(r)) && n.setAttribute("class", s)
                    } return this
        },
        removeClass: function(e) {
            var t, n, r, i, o, a, s, u = 0;
            if (g(e)) return this.each(function(t) {
                b(this).removeClass(e.call(this, t, pt(this)))
            });
            if (!arguments.length) return this.attr("class", "");
            if ((t = dt(e)).length)
                for (; n = this[u++];)
                    if (i = pt(n), r = 1 === n.nodeType && " " + ft(i) + " ") {
                        for (a = 0; o = t[a++];)
                            for (; r.indexOf(" " + o + " ") > -1;) r = r.replace(" " + o + " ", " ");
                        i !== (s = ft(r)) && n.setAttribute("class", s)
                    } return this
        },
        toggleClass: function(e, t) {
            var n = typeof e,
                r = "string" === n || Array.isArray(e);
            return "boolean" == typeof t && r ? t ? this.addClass(e) : this.removeClass(e) : g(e) ? this.each(function(n) {
                b(this).toggleClass(e.call(this, n, pt(this), t), t)
            }) : this.each(function() {
                var t, i, o, a;
                if (r)
                    for (i = 0, o = b(this), a = dt(e); t = a[i++];) o.hasClass(t) ? o.removeClass(t) : o.addClass(t);
                else void 0 !== e && "boolean" !== n || ((t = pt(this)) && Y.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || !1 === e ? "" : Y.get(this, "__className__") || ""))
            })
        },
        hasClass: function(e) {
            var t, n, r = 0;
            for (t = " " + e + " "; n = this[r++];)
                if (1 === n.nodeType && (" " + ft(pt(n)) + " ").indexOf(t) > -1) return !0;
            return !1
        }
    });
    var ht = /\r/g;
    b.fn.extend({
        val: function(e) {
            var t, n, r, i = this[0];
            if (arguments.length) return r = g(e), this.each(function(n) {
                var i;
                1 === this.nodeType && (null == (i = r ? e.call(this, n, b(this).val()) : e) ? i = "" : "number" == typeof i ? i += "" : Array.isArray(i) && (i = b.map(i, function(e) {
                    return null == e ? "" : e + ""
                })), (t = b.valHooks[this.type] || b.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, i, "value") || (this.value = i))
            });
            if (i) return (t = b.valHooks[i.type] || b.valHooks[i.nodeName.toLowerCase()]) && "get" in t && void 0 !== (n = t.get(i, "value")) ? n : "string" == typeof(n = i.value) ? n.replace(ht, "") : null == n ? "" : n
        }
    }), b.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = b.find.attr(e, "value");
                    return null != t ? t : ft(b.text(e))
                }
            },
            select: {
                get: function(e) {
                    var t, n, r, i = e.options,
                        o = e.selectedIndex,
                        a = "select-one" === e.type,
                        s = a ? null : [],
                        u = a ? o + 1 : i.length;
                    for (r = o < 0 ? u : a ? o : 0; r < u; r++)
                        if (((n = i[r]).selected || r === o) && !n.disabled && (!n.parentNode.disabled || !D(n.parentNode, "optgroup"))) {
                            if (t = b(n).val(), a) return t;
                            s.push(t)
                        } return s
                },
                set: function(e, t) {
                    for (var n, r, i = e.options, o = b.makeArray(t), a = i.length; a--;)((r = i[a]).selected = b.inArray(b.valHooks.option.get(r), o) > -1) && (n = !0);
                    return n || (e.selectedIndex = -1), o
                }
            }
        }
    }), b.each(["radio", "checkbox"], function() {
        b.valHooks[this] = {
            set: function(e, t) {
                if (Array.isArray(t)) return e.checked = b.inArray(b(e).val(), t) > -1
            }
        }, h.checkOn || (b.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    }), h.focusin = "onfocusin" in e;
    var gt = /^(?:focusinfocus|focusoutblur)$/,
        vt = function(e) {
            e.stopPropagation()
        };
    b.extend(b.event, {
        trigger: function(t, n, i, o) {
            var a, s, u, l, c, p, d, h, y = [i || r],
                m = f.call(t, "type") ? t.type : t,
                x = f.call(t, "namespace") ? t.namespace.split(".") : [];
            if (s = h = u = i = i || r, 3 !== i.nodeType && 8 !== i.nodeType && !gt.test(m + b.event.triggered) && (m.indexOf(".") > -1 && (m = (x = m.split(".")).shift(), x.sort()), c = m.indexOf(":") < 0 && "on" + m, (t = t[b.expando] ? t : new b.Event(m, "object" == typeof t && t)).isTrigger = o ? 2 : 3, t.namespace = x.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + x.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = i), n = null == n ? [t] : b.makeArray(n, [t]), d = b.event.special[m] || {}, o || !d.trigger || !1 !== d.trigger.apply(i, n))) {
                if (!o && !d.noBubble && !v(i)) {
                    for (l = d.delegateType || m, gt.test(l + m) || (s = s.parentNode); s; s = s.parentNode) y.push(s), u = s;
                    u === (i.ownerDocument || r) && y.push(u.defaultView || u.parentWindow || e)
                }
                for (a = 0;
                    (s = y[a++]) && !t.isPropagationStopped();) h = s, t.type = a > 1 ? l : d.bindType || m, (p = (Y.get(s, "events") || {})[t.type] && Y.get(s, "handle")) && p.apply(s, n), (p = c && s[c]) && p.apply && V(s) && (t.result = p.apply(s, n), !1 === t.result && t.preventDefault());
                return t.type = m, o || t.isDefaultPrevented() || d._default && !1 !== d._default.apply(y.pop(), n) || !V(i) || c && g(i[m]) && !v(i) && ((u = i[c]) && (i[c] = null), b.event.triggered = m, t.isPropagationStopped() && h.addEventListener(m, vt), i[m](), t.isPropagationStopped() && h.removeEventListener(m, vt), b.event.triggered = void 0, u && (i[c] = u)), t.result
            }
        },
        simulate: function(e, t, n) {
            var r = b.extend(new b.Event, n, {
                type: e,
                isSimulated: !0
            });
            b.event.trigger(r, null, t)
        }
    }), b.fn.extend({
        trigger: function(e, t) {
            return this.each(function() {
                b.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            if (n) return b.event.trigger(e, t, n, !0)
        }
    }), h.focusin || b.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        var n = function(e) {
            b.event.simulate(t, e.target, b.event.fix(e))
        };
        b.event.special[t] = {
            setup: function() {
                var r = this.ownerDocument || this,
                    i = Y.access(r, t);
                i || r.addEventListener(e, n, !0), Y.access(r, t, (i || 0) + 1)
            },
            teardown: function() {
                var r = this.ownerDocument || this,
                    i = Y.access(r, t) - 1;
                i ? Y.access(r, t, i) : (r.removeEventListener(e, n, !0), Y.remove(r, t))
            }
        }
    });
    var yt = e.location,
        mt = Date.now(),
        xt = /\?/;
    b.parseXML = function(t) {
        var n;
        if (!t || "string" != typeof t) return null;
        try {
            n = (new e.DOMParser).parseFromString(t, "text/xml")
        } catch (e) {
            n = void 0
        }
        return n && !n.getElementsByTagName("parsererror").length || b.error("Invalid XML: " + t), n
    };
    var bt = /\[\]$/,
        wt = /\r?\n/g,
        Tt = /^(?:submit|button|image|reset|file)$/i,
        Ct = /^(?:input|select|textarea|keygen)/i;

    function Et(e, t, n, r) {
        var i;
        if (Array.isArray(t)) b.each(t, function(t, i) {
            n || bt.test(e) ? r(e, i) : Et(e + "[" + ("object" == typeof i && null != i ? t : "") + "]", i, n, r)
        });
        else if (n || "object" !== x(t)) r(e, t);
        else
            for (i in t) Et(e + "[" + i + "]", t[i], n, r)
    }
    b.param = function(e, t) {
        var n, r = [],
            i = function(e, t) {
                var n = g(t) ? t() : t;
                r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n)
            };
        if (Array.isArray(e) || e.jquery && !b.isPlainObject(e)) b.each(e, function() {
            i(this.name, this.value)
        });
        else
            for (n in e) Et(n, e[n], t, i);
        return r.join("&")
    }, b.fn.extend({
        serialize: function() {
            return b.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = b.prop(this, "elements");
                return e ? b.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !b(this).is(":disabled") && Ct.test(this.nodeName) && !Tt.test(e) && (this.checked || !le.test(e))
            }).map(function(e, t) {
                var n = b(this).val();
                return null == n ? null : Array.isArray(n) ? b.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(wt, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(wt, "\r\n")
                }
            }).get()
        }
    });
    var kt = /%20/g,
        St = /#.*$/,
        Dt = /([?&])_=[^&],
        Nt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        At = /^(?:GET|HEAD)$/,
        jt = /^\/\//,
        qt = {},
        Lt = {},
        Ht = "".concat("*"),
        Ot = r.createElement("a");
    Ot.href = yt.href;

    function Pt(e) {
        return function(t, n) {
            "string" != typeof t && (n = t, t = "*");
            var r, i = 0,
                o = t.toLowerCase().match(P) || [];
            if (g(n))
                for (; r = o[i++];) "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
        }
    }

    function Mt(e, t, n, r) {
        var i = {},
            o = e === Lt;

        function a(s) {
            var u;
            return i[s] = !0, b.each(e[s] || [], function(e, s) {
                var l = s(t, n, r);
                return "string" != typeof l || o || i[l] ? o ? !(u = l) : void 0 : (t.dataTypes.unshift(l), a(l), !1)
            }), u
        }
        return a(t.dataTypes[0]) || !i["*"] && a("*")
    }

    function Rt(e, t) {
        var n, r, i = b.ajaxSettings.flatOptions || {};
        for (n in t) void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
        return r && b.extend(!0, e, r), e
    }
    b.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: yt.href,
            type: "GET",
            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(yt.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Ht,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": JSON.parse,
                "text xml": b.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? Rt(Rt(e, b.ajaxSettings), t) : Rt(b.ajaxSettings, e)
        },
        ajaxPrefilter: Pt(qt),
        ajaxTransport: Pt(Lt),
        ajax: function(t, n) {
            "object" == typeof t && (n = t, t = void 0), n = n || {};
            var i, o, a, s, u, l, c, f, p, d, h = b.ajaxSetup({}, n),
                g = h.context || h,
                v = h.context && (g.nodeType || g.jquery) ? b(g) : b.event,
                y = b.Deferred(),
                m = b.Callbacks("once memory"),
                x = h.statusCode || {},
                w = {},
                T = {},
                C = "canceled",
                E = {
                    readyState: 0,
                    getResponseHeader: function(e) {
                        var t;
                        if (c) {
                            if (!s)
                                for (s = {}; t = Nt.exec(a);) s[t[1].toLowerCase()] = t[2];
                            t = s[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    },
                    getAllResponseHeaders: function() {
                        return c ? a : null
                    },
                    setRequestHeader: function(e, t) {
                        return null == c && (e = T[e.toLowerCase()] = T[e.toLowerCase()] || e, w[e] = t), this
                    },
                    overrideMimeType: function(e) {
                        return null == c && (h.mimeType = e), this
                    },
                    statusCode: function(e) {
                        var t;
                        if (e)
                            if (c) E.always(e[E.status]);
                            else
                                for (t in e) x[t] = [x[t], e[t]];
                        return this
                    },
                    abort: function(e) {
                        var t = e || C;
                        return i && i.abort(t), k(0, t), this
                    }
                };
            if (y.promise(E), h.url = ((t || h.url || yt.href) + "").replace(jt, yt.protocol + "//"), h.type = n.method || n.type || h.method || h.type, h.dataTypes = (h.dataType || "*").toLowerCase().match(P) || [""], null == h.crossDomain) {
                l = r.createElement("a");
                try {
                    l.href = h.url, l.href = l.href, h.crossDomain = Ot.protocol + "//" + Ot.host != l.protocol + "//" + l.host
                } catch (e) {
                    h.crossDomain = !0
                }
            }
            if (h.data && h.processData && "string" != typeof h.data && (h.data = b.param(h.data, h.traditional)), Mt(qt, h, n, E), c) return E;
            (f = b.event && h.global) && 0 == b.active++ && b.event.trigger("ajaxStart"), h.type = h.type.toUpperCase(), h.hasContent = !At.test(h.type), o = h.url.replace(St, ""), h.hasContent ? h.data && h.processData && 0 === (h.contentType || "").indexOf("application/x-www-form-urlencoded") && (h.data = h.data.replace(kt, "+")) : (d = h.url.slice(o.length), h.data && (h.processData || "string" == typeof h.data) && (o += (xt.test(o) ? "&" : "?") + h.data, delete h.data), !1 === h.cache && (o = o.replace(Dt, "$1"), d = (xt.test(o) ? "&" : "?") + "_=" + mt++ + d), h.url = o + d), h.ifModified && (b.lastModified[o] && E.setRequestHeader("If-Modified-Since", b.lastModified[o]), b.etag[o] && E.setRequestHeader("If-None-Match", b.etag[o])), (h.data && h.hasContent && !1 !== h.contentType || n.contentType) && E.setRequestHeader("Content-Type", h.contentType), E.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + ("*" !== h.dataTypes[0] ? ", " + Ht + "; q=0.01" : "") : h.accepts["*"]);
            for (p in h.headers) E.setRequestHeader(p, h.headers[p]);
            if (h.beforeSend && (!1 === h.beforeSend.call(g, E, h) || c)) return E.abort();
            if (C = "abort", m.add(h.complete), E.done(h.success), E.fail(h.error), i = Mt(Lt, h, n, E)) {
                if (E.readyState = 1, f && v.trigger("ajaxSend", [E, h]), c) return E;
                h.async && h.timeout > 0 && (u = e.setTimeout(function() {
                    E.abort("timeout")
                }, h.timeout));
                try {
                    c = !1, i.send(w, k)
                } catch (e) {
                    if (c) throw e;
                    k(-1, e)
                }
            } else k(-1, "No Transport");

            function k(t, n, r, s) {
                var l, p, d, w, T, C = n;
                c || (c = !0, u && e.clearTimeout(u), i = void 0, a = s || "", E.readyState = t > 0 ? 4 : 0, l = t >= 200 && t < 300 || 304 === t, r && (w = function(e, t, n) {
                    for (var r, i, o, a, s = e.contents, u = e.dataTypes;
                        "*" === u[0];) u.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
                    if (r)
                        for (i in s)
                            if (s[i] && s[i].test(r)) {
                                u.unshift(i);
                                break
                            } if (u[0] in n) o = u[0];
                    else {
                        for (i in n) {
                            if (!u[0] || e.converters[i + " " + u[0]]) {
                                o = i;
                                break
                            }
                            a || (a = i)
                        }
                        o = o || a
                    }
                    if (o) return o !== u[0] && u.unshift(o), n[o]
                }(h, E, r)), w = function(e, t, n, r) {
                    var i, o, a, s, u, l = {},
                        c = e.dataTypes.slice();
                    if (c[1])
                        for (a in e.converters) l[a.toLowerCase()] = e.converters[a];
                    for (o = c.shift(); o;)
                        if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift())
                            if ("*" === o) o = u;
                            else if ("*" !== u && u !== o) {
                        if (!(a = l[u + " " + o] || l["* " + o]))
                            for (i in l)
                                if ((s = i.split(" "))[1] === o && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
                                    !0 === a ? a = l[i] : !0 !== l[i] && (o = s[0], c.unshift(s[1]));
                                    break
                                } if (!0 !== a)
                            if (a && e.throws) t = a(t);
                            else try {
                                t = a(t)
                            } catch (e) {
                                return {
                                    state: "parsererror",
                                    error: a ? e : "No conversion from " + u + " to " + o
                                }
                            }
                    }
                    return {
                        state: "success",
                        data: t
                    }
                }(h, w, E, l), l ? (h.ifModified && ((T = E.getResponseHeader("Last-Modified")) && (b.lastModified[o] = T), (T = E.getResponseHeader("etag")) && (b.etag[o] = T)), 204 === t || "HEAD" === h.type ? C = "nocontent" : 304 === t ? C = "notmodified" : (C = w.state, p = w.data, l = !(d = w.error))) : (d = C, !t && C || (C = "error", t < 0 && (t = 0))), E.status = t, E.statusText = (n || C) + "", l ? y.resolveWith(g, [p, C, E]) : y.rejectWith(g, [E, C, d]), E.statusCode(x), x = void 0, f && v.trigger(l ? "ajaxSuccess" : "ajaxError", [E, h, l ? p : d]), m.fireWith(g, [E, C]), f && (v.trigger("ajaxComplete", [E, h]), --b.active || b.event.trigger("ajaxStop")))
            }
            return E
        },
        getJSON: function(e, t, n) {
            return b.get(e, t, n, "json")
        },
        getScript: function(e, t) {
            return b.get(e, void 0, t, "script")
        }
    }), b.each(["get", "post"], function(e, t) {
        b[t] = function(e, n, r, i) {
            return g(n) && (i = i || r, r = n, n = void 0), b.ajax(b.extend({
                url: e,
                type: t,
                dataType: i,
                data: n,
                success: r
            }, b.isPlainObject(e) && e))
        }
    }), b._evalUrl = function(e) {
        return b.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            throws: !0
        })
    }, b.fn.extend({
        wrapAll: function(e) {
            var t;
            return this[0] && (g(e) && (e = e.call(this[0])), t = b(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                return e
            }).append(this)), this
        },
        wrapInner: function(e) {
            return g(e) ? this.each(function(t) {
                b(this).wrapInner(e.call(this, t))
            }) : this.each(function() {
                var t = b(this),
                    n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            var t = g(e);
            return this.each(function(n) {
                b(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function(e) {
            return this.parent(e).not("body").each(function() {
                b(this).replaceWith(this.childNodes)
            }), this
        }
    }), b.expr.pseudos.hidden = function(e) {
        return !b.expr.pseudos.visible(e)
    }, b.expr.pseudos.visible = function(e) {
        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
    }, b.ajaxSettings.xhr = function() {
        try {
            return new e.XMLHttpRequest
        } catch (e) {}
    };
    var It = {
            0: 200,
            1223: 204
        },
        Wt = b.ajaxSettings.xhr();
    h.cors = !!Wt && "withCredentials" in Wt, h.ajax = Wt = !!Wt, b.ajaxTransport(function(t) {
        var n, r;
        if (h.cors || Wt && !t.crossDomain) return {
            send: function(i, o) {
                var a, s = t.xhr();
                if (s.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
                    for (a in t.xhrFields) s[a] = t.xhrFields[a];
                t.mimeType && s.overrideMimeType && s.overrideMimeType(t.mimeType), t.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                for (a in i) s.setRequestHeader(a, i[a]);
                n = function(e) {
                    return function() {
                        n && (n = r = s.onload = s.onerror = s.onabort = s.ontimeout = s.onreadystatechange = null, "abort" === e ? s.abort() : "error" === e ? "number" != typeof s.status ? o(0, "error") : o(s.status, s.statusText) : o(It[s.status] || s.status, s.statusText, "text" !== (s.responseType || "text") || "string" != typeof s.responseText ? {
                            binary: s.response
                        } : {
                            text: s.responseText
                        }, s.getAllResponseHeaders()))
                    }
                }, s.onload = n(), r = s.onerror = s.ontimeout = n("error"), void 0 !== s.onabort ? s.onabort = r : s.onreadystatechange = function() {
                    4 === s.readyState && e.setTimeout(function() {
                        n && r()
                    })
                }, n = n("abort");
                try {
                    s.send(t.hasContent && t.data || null)
                } catch (e) {
                    if (n) throw e
                }
            },
            abort: function() {
                n && n()
            }
        }
    }), b.ajaxPrefilter(function(e) {
        e.crossDomain && (e.contents.script = !1)
    }), b.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(e) {
                return b.globalEval(e), e
            }
        }
    }), b.ajaxPrefilter("script", function(e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
    }), b.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var t, n;
            return {
                send: function(i, o) {
                    t = b("<script>").prop({
                        charset: e.scriptCharset,
                        src: e.url
                    }).on("load error", n = function(e) {
                        t.remove(), n = null, e && o("error" === e.type ? 404 : 200, e.type)
                    }), r.head.appendChild(t[0])
                },
                abort: function() {
                    n && n()
                }
            }
        }
    });
    var $t = [],
        Bt = /(=)\?(?=&|$)|\?\?/;
    b.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = $t.pop() || b.expando + "_" + mt++;
            return this[e] = !0, e
        }
    }), b.ajaxPrefilter("json jsonp", function(t, n, r) {
        var i, o, a, s = !1 !== t.jsonp && (Bt.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && Bt.test(t.data) && "data");
        if (s || "jsonp" === t.dataTypes[0]) return i = t.jsonpCallback = g(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(Bt, "$1" + i) : !1 !== t.jsonp && (t.url += (xt.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function() {
            return a || b.error(i + " was not called"), a[0]
        }, t.dataTypes[0] = "json", o = e[i], e[i] = function() {
            a = arguments
        }, r.always(function() {
            void 0 === o ? b(e).removeProp(i) : e[i] = o, t[i] && (t.jsonpCallback = n.jsonpCallback, $t.push(i)), a && g(o) && o(a[0]), a = o = void 0
        }), "script"
    }), h.createHTMLDocument = function() {
        var e = r.implementation.createHTMLDocument("").body;
        return e.innerHTML = "<form></form><form></form>", 2 === e.childNodes.length
    }(), b.parseHTML = function(e, t, n) {
        if ("string" != typeof e) return [];
        "boolean" == typeof t && (n = t, t = !1);
        var i, o, a;
        return t || (h.createHTMLDocument ? ((i = (t = r.implementation.createHTMLDocument("")).createElement("base")).href = r.location.href, t.head.appendChild(i)) : t = r), o = N.exec(e), a = !n && [], o ? [t.createElement(o[1])] : (o = ve([e], t, a), a && a.length && b(a).remove(), b.merge([], o.childNodes))
    }, b.fn.load = function(e, t, n) {
        var r, i, o, a = this,
            s = e.indexOf(" ");
        return s > -1 && (r = ft(e.slice(s)), e = e.slice(0, s)), g(t) ? (n = t, t = void 0) : t && "object" == typeof t && (i = "POST"), a.length > 0 && b.ajax({
            url: e,
            type: i || "GET",
            dataType: "html",
            data: t
        }).done(function(e) {
            o = arguments, a.html(r ? b("<div>").append(b.parseHTML(e)).find(r) : e)
        }).always(n && function(e, t) {
            a.each(function() {
                n.apply(this, o || [e.responseText, t, e])
            })
        }), this
    }, b.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        b.fn[t] = function(e) {
            return this.on(t, e)
        }
    }), b.expr.pseudos.animated = function(e) {
        return b.grep(b.timers, function(t) {
            return e === t.elem
        }).length
    }, b.offset = {
        setOffset: function(e, t, n) {
            var r, i, o, a, s, u, l = b.css(e, "position"),
                c = b(e),
                f = {};
            "static" === l && (e.style.position = "relative"), s = c.offset(), o = b.css(e, "top"), u = b.css(e, "left"), ("absolute" === l || "fixed" === l) && (o + u).indexOf("auto") > -1 ? (a = (r = c.position()).top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(u) || 0), g(t) && (t = t.call(e, n, b.extend({}, s))), null != t.top && (f.top = t.top - s.top + a), null != t.left && (f.left = t.left - s.left + i), "using" in t ? t.using.call(e, f) : c.css(f)
        }
    }, b.fn.extend({
        offset: function(e) {
            if (arguments.length) return void 0 === e ? this : this.each(function(t) {
                b.offset.setOffset(this, e, t)
            });
            var t, n, r = this[0];
            if (r) return r.getClientRects().length ? (t = r.getBoundingClientRect(), n = r.ownerDocument.defaultView, {
                top: t.top + n.pageYOffset,
                left: t.left + n.pageXOffset
            }) : {
                top: 0,
                left: 0
            }
        },
        position: function() {
            if (this[0]) {
                var e, t, n, r = this[0],
                    i = {
                        top: 0,
                        left: 0
                    };
                if ("fixed" === b.css(r, "position")) t = r.getBoundingClientRect();
                else {
                    for (t = this.offset(), n = r.ownerDocument, e = r.offsetParent || n.documentElement; e && (e === n.body || e === n.documentElement) && "static" === b.css(e, "position");) e = e.parentNode;
                    e && e !== r && 1 === e.nodeType && ((i = b(e).offset()).top += b.css(e, "borderTopWidth", !0), i.left += b.css(e, "borderLeftWidth", !0))
                }
                return {
                    top: t.top - i.top - b.css(r, "marginTop", !0),
                    left: t.left - i.left - b.css(r, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent; e && "static" === b.css(e, "position");) e = e.offsetParent;
                return e || ye
            })
        }
    }), b.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(e, t) {
        var n = "pageYOffset" === t;
        b.fn[e] = function(r) {
            return F(this, function(e, r, i) {
                var o;
                if (v(e) ? o = e : 9 === e.nodeType && (o = e.defaultView), void 0 === i) return o ? o[t] : e[r];
                o ? o.scrollTo(n ? o.pageXOffset : i, n ? i : o.pageYOffset) : e[r] = i
            }, e, r, arguments.length)
        }
    }), b.each(["top", "left"], function(e, t) {
        b.cssHooks[t] = $e(h.pixelPosition, function(e, n) {
            if (n) return n = We(e, t), Me.test(n) ? b(e).position()[t] + "px" : n
        })
    }), b.each({
        Height: "height",
        Width: "width"
    }, function(e, t) {
        b.each({
            padding: "inner" + e,
            content: t,
            "": "outer" + e
        }, function(n, r) {
            b.fn[r] = function(i, o) {
                var a = arguments.length && (n || "boolean" != typeof i),
                    s = n || (!0 === i || !0 === o ? "margin" : "border");
                return F(this, function(t, n, i) {
                    var o;
                    return v(t) ? 0 === r.indexOf("outer") ? t["inner" + e] : t.document.documentElement["client" + e] : 9 === t.nodeType ? (o = t.documentElement, Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])) : void 0 === i ? b.css(t, n, s) : b.style(t, n, i, s)
                }, t, a ? i : void 0, a)
            }
        })
    }), b.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, t) {
        b.fn[t] = function(e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), b.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    }), b.fn.extend({
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    }), b.proxy = function(e, t) {
        var n, r, i;
        if ("string" == typeof t && (n = e[t], t = e, e = n), g(e)) return r = o.call(arguments, 2), (i = function() {
            return e.apply(t || this, r.concat(o.call(arguments)))
        }).guid = e.guid = e.guid || b.guid++, i
    }, b.holdReady = function(e) {
        e ? b.readyWait++ : b.ready(!0)
    }, b.isArray = Array.isArray, b.parseJSON = JSON.parse, b.nodeName = D, b.isFunction = g, b.isWindow = v, b.camelCase = U, b.type = x, b.now = Date.now, b.isNumeric = function(e) {
        var t = b.type(e);
        return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
    }, "function" == typeof define && define.amd && define("jquery", [], function() {
        return b
    });
    var Ft = e.jQuery,
        _t = e.$;
    return b.noConflict = function(t) {
        return e.$ === b && (e.$ = _t), t && e.jQuery === b && (e.jQuery = Ft), b
    }, t || (e.jQuery = e.$ = b), b
});
*/
/********************************************************/

/******************************old***************************/
/*
document.addEventListener('DOMContentLoaded', () => {
  const addTabButton = document.getElementById('addTabButton');
  const tabForm = document.getElementById('tabForm');
  const websiteUrlInput = document.getElementById('websiteUrl');
  const websiteNameInput = document.getElementById('websiteName');
  const closeButton = document.getElementById('closeButton');
  const openButton = document.getElementById('openButton');
  const savedTabsContainer = document.getElementById('savedTabsContainer');
  const openTabsContainer = document.getElementById('openTabsContainer');

  let closeEntries = [];
  let openEntries = [];

  // Retrieve tabs on page load
  getTabs();
  tabForm.style.display = 'block';
  websiteUrlInput.value = '';
  websiteNameInput.value = '';

  // save tabs
  function saveTabClose(websiteUrl, websiteName) {
    return new Promise((resolve, reject) => {
      closeEntries.push({ websiteUrl, websiteName });

      chrome.storage.sync.set({ closeEntries }, function() {
        resolve();
      });
      getTabs();
    });
  }

  function saveTabOpen(websiteUrl, websiteName) {
    return new Promise((resolve, reject) => {
      openEntries.push({ websiteUrl, websiteName });

      chrome.storage.sync.set({ openEntries }, function() {
        resolve();
      });
      displayOpenTabs();
    });
  }

  // get tabs
  function getTabs() {
    chrome.storage.sync.get("closeEntries", function(result) {
      if (result.closeEntries) {
        closeEntries = result.closeEntries;
        displayCloseTabs();
      }
      else {
        // Handle the case when no entries are found
      }
    });

    chrome.storage.sync.get("openEntries", function(result){
      if (result.openEntries) {
        openEntries = result.openEntries;
        displayOpenTabs();
      }
      else {
        // Handle the case when no entries are found
      }
    });
  }

  function displayCloseTabs() {
    savedTabsContainer.innerHTML = '';

    closeEntries.forEach((entry) => {
      const savedTab = document.createElement('div');
      savedTab.classList.add('saved-website', 'blocked');
      savedTab.innerText = entry.websiteName;

      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-button');
      deleteButton.innerHTML = 'x'; // Use "x" as the delete icon
      deleteButton.style.backgroundColor = 'transparent';

      savedTab.appendChild(deleteButton);
      savedTabsContainer.appendChild(savedTab);

    });
  }

  function displayOpenTabs() {
    openTabsContainer.innerHTML = '';

    openEntries.forEach((entry) => {
      const openTab = document.createElement('div');
      openTab.classList.add('saved-website', 'open');
      openTab.innerText = entry.websiteName;

      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-button');
      deleteButton.innerHTML = 'x'; // Use "x" as the delete icon
      deleteButton.style.backgroundColor = 'transparent';

      openTab.appendChild(deleteButton);
      openTabsContainer.appendChild(openTab);
    });
  }

  savedTabsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-button') || event.target.innerHTML === 'x') {
      const savedTab = event.target.closest('.saved-website');
      deleteCloseTab(savedTab);
    }
  });

  openTabsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-button') || event.target.innerHTML === 'x') {
      const openTab = event.target.closest('.saved-website');
      deleteOpenTab(openTab);
    }
  });

  function deleteCloseTab(savedTab) {
    const deleteName = savedTab.childNodes[0].nodeValue.trim();
    const deleteIndex = closeEntries.findIndex((entry) => {
      return entry.websiteName.toString() === deleteName.toString();
    });
    if (deleteIndex !== -1) {
      closeEntries.splice(deleteIndex, 1);
      chrome.storage.sync.set({ closeEntries }, function() {
        getTabs();
      });
    }
  }

  function deleteOpenTab(openTab) {
    const deleteName = openTab.childNodes[0].nodeValue.trim();
    const deleteIndex = openEntries.findIndex((entry) => {
      return entry.websiteName.toString() === deleteName.toString();
    });
    if (deleteIndex !== -1) {
      openEntries.splice(deleteIndex, 1);
      chrome.storage.sync.set({ openEntries }, function() {
        getTabs();
      });
    }
  }

  function isValidUrl(url) {
    const urlRegex = /^[^ "]+\..+$/;
    return urlRegex.test(url);
  }

  closeButton.addEventListener('click', () => {
    const websiteUrl = websiteUrlInput.value;
    const websiteName = websiteNameInput.value;

    if (websiteUrl.trim() === '' || websiteName.trim() === '') {
      return;
    }

    if (!isValidUrl(websiteUrl)) {
      urlErrorMessage.textContent = 'Please enter a valid URL.'; // Display error message
      return;
    }

    // Clear the error message
    urlErrorMessage.textContent = '';

    const savedTab = document.createElement('div');
    savedTab.classList.add('saved-website');
    savedTab.innerText = websiteName;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.innerHTML = 'x'; 
    deleteButton.style.backgroundColor = 'transparent';

    savedTab.appendChild(deleteButton);
    savedTabsContainer.appendChild(savedTab);

    websiteUrlInput.value = '';
    websiteNameInput.value = '';

    saveTabClose(websiteUrl, websiteName)
      .then(() => {
        
      })
      .catch((error) => {
        console.error('Error saving tab(block):', error);
      });
  });

  openButton.addEventListener('click', () => {
    const websiteUrl = websiteUrlInput.value;
    const websiteName = websiteNameInput.value;

    if (websiteUrl.trim() === '' || websiteName.trim() === '') {
      return;
    }

    if (!isValidUrl(websiteUrl)) {
      urlErrorMessage.textContent = 'Please enter a valid URL.'; // Display error message
      return;
    }

    // Clear the error message
    urlErrorMessage.textContent = '';

    const openTab = document.createElement('div');
    openTab.classList.add('saved-website');
    openTab.innerText = websiteName;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.innerHTML = 'x';
    deleteButton.style.backgroundColor = 'transparent';

    openTab.appendChild(deleteButton);
    openTabsContainer.appendChild(openTab);

    websiteUrlInput.value = '';
    websiteNameInput.value = '';

    saveTabOpen(websiteUrl, websiteName)
      .then(() => {
        
      })
      .catch((error) => {
        console.error('Error saving tab(Open):', error);
      });
  });

});

*/

/*********************************************************/

/***************************login.html*********************/
/*
<!--Authors: Derek Y, Hrishi P
    "Focus"
-->

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Focus</title>
  <link rel="stylesheet" href="../../styles/config.css">
  <style>
    main {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }

    section {
      margin-bottom: 20px;
      background-color: #fff;
      padding: 20px;
      border-radius: 5px;
      text-align: center;
    }

    h1 {
      font-size: 24px;
      margin-top: 0;
    }

    form {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .input-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 10px;
    }

    .input-container label {
      display: block;
      font-weight: bold;
      margin-bottom: 5px;
    }

    .input-container input {
      width: 100%;
      padding: 5px;
      border: 1px solid #ccc;
      border-radius: 3px;
      box-sizing: border-box;
    }

    .submit-button {
      font-family: cursive;
      padding: 10px 30px;
      background-color: lightblue;
      color: #fff;
      border: none;
      border-radius: 3px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <header>
    <h1 id="logo">Focus.</h1>
    <nav>
      <ul>
        <li><a href="home.html">Home</a></li>
        <li><a href="tabs.html">Tabs</a></li>
        <li><a href="schedule.html">Schedule</a></li>
       
      </ul>
    </nav>
  </header>

  <main>
    <section>
      <h1>Login</h1>
      <form>
        <div class="input-container">
          <label for="username">Username:</label>
          <input type="text" id="username" name="username" required>
        </div>
        <div class="input-container">
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" required>
        </div>
        <button class="submit-button" type="submit">Login</button>
      </form>
    </section>
  </main>

</body>
</html>

*/
/*********************************************************************/