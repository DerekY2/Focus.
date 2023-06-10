var startButton = document.getElementById("startTimer");
var durationSelect = document.getElementById("duration");
var scheduleButton = document.getElementById("scheduleBreak");
var scheduleDurationSelect = document.getElementById("scheduleDuration");
var timeToBreakElement = document.getElementById("left-timer");
var breakCountdownElement = document.getElementById("right-timer");
var breakTimeoutId;
var startTime;

function showBreakNotification() {
  alert("Break time!");
}

function startBreakTimer(duration) {
  var durationInMillis = duration * 60 * 1000;
  startTime = Date.now() + durationInMillis;

  breakTimeoutId = setTimeout(function() {
    showBreakNotification();
    startBreakCountdown(durationInMillis);
  }, durationInMillis);

  startTimerCountdown(startTime);
}

function startTimerCountdown(startTime) {
  var intervalId = setInterval(function() {
    var remainingTime = startTime - Date.now();
    var minutes = Math.floor(remainingTime / (1000 * 60));
    var seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
    timeToBreakElement.textContent = formatTime(minutes) + ":" + formatTime(seconds);
    
    if (remainingTime <= 0) {
      clearInterval(intervalId);
      startBreakCountdown(parseInt(durationSelect.value) * 60 * 1000);
    }
  }, 1000);
}

function formatTime(time) {
  return time.toString().padStart(2, '0');
}

function startBreakCountdown(durationInMillis) {
  startTime = Date.now();

  var intervalId = setInterval(function() {
    var remainingTime = startTime + durationInMillis - Date.now();
    var minutes = Math.floor(remainingTime / (1000 * 60));
    var seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
    breakCountdownElement.textContent = formatTime(minutes) + ":" + formatTime(seconds);
    
    if (remainingTime <= 0) {
      clearInterval(intervalId);
      startTimerCountdown(Date.now() + parseInt(durationSelect.value) * 60 * 1000);
    }
  }, 1000);
}

function scheduleBreak() {
  var scheduleDuration = parseInt(scheduleDurationSelect.value);
  var scheduleDurationInMillis = scheduleDuration * 60 * 60 * 1000;

  clearTimeout(breakTimeoutId);

  var remainingTime = startTime - Date.now();
  if (remainingTime > 0) {
    startBreakCountdown(remainingTime);
  } else {
    startBreakTimer(scheduleDuration);
  }
}

startButton.addEventListener("click", function() {
  var duration = parseInt(durationSelect.value);
  startBreakTimer(duration);
});

scheduleButton.addEventListener("click", scheduleBreak);
