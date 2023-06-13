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
