// Preload the background image
window.addEventListener('DOMContentLoaded', function() {
  var preloadBg = document.getElementById('preload-bg');
  var bgImage = new Image();
  bgImage.src = preloadBg.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, "$1");
  bgImage.onload = function() {
    // Remove the preloading element once the image is loaded
    preloadBg.parentNode.removeChild(preloadBg);
  };
});

// Toggle background function
function toggleBackground() {
  var body = document.querySelector('body');
  var isBackgroundEnabled = body.classList.toggle('background-enabled');

  // Save the background status in localStorage
  localStorage.setItem('backgroundStatus', isBackgroundEnabled ? 'enabled' : 'disabled');
}

// Initialize the toggle switch based on the background status in localStorage
window.addEventListener('DOMContentLoaded', function () {
  var backgroundStatus = localStorage.getItem('backgroundStatus');

  if (backgroundStatus === 'enabled') {
    document.querySelector('#background-toggle').checked = true;
    document.querySelector('body').classList.add('background-enabled');
  }
});