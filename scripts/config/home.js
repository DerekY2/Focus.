/*Authors: Derek Yu, Hrishi Paripati
 *Home page - back-end; front-end in-line js has been moved here to comply with Chrome's policies
 *
 *  The code here mainly works alongside the front-end, and doesn’t provide anything much towards the back-end of the software.
 *
 *  introBtn.addEventListener(): 
 *    This event listener is attached to the intro button. It listens for a click event and executes 
 *    the callback function when the button is clicked. Inside the callback function, the code toggles the visibility of the tutorial 
 *    section, making it either visible or hidden.
 *
 *  tabsBtn.addEventListener(): 
 *    This event listener is attached to the tabs button. It listens for a click event and executes the callback function when the button 
 *    is clicked. Inside the callback function, the code redirects the user to the "tabs.html" page.
 *
 *  bgImage.onload(): 
 *    This line attaches an onload event handler to the bgImage object. It is triggered when the background image has 
 *    finished loading. Inside the callback function, the code removes the preloadBg element from the DOM, effectively 
 *    removing the preloading element from the page.
 */

// Preload the background image
window.addEventListener('DOMContentLoaded', function() {
  var preloadBg = document.getElementById('preload-bg');
  var bgImage = new Image();
  var tutorialSection = document.getElementById('intro');
  var introBtn = document.getElementById('introBtn');
  var tabsBtn = document.getElementById('tabsButton');

  introBtn.addEventListener('click', function() {
      // Toggle the visibility of the intro section
      tutorialSection.style.display = 'block';
  });

  tabsBtn.addEventListener('click', function() {
      window.location.href = 'tabs.html';
  });

  bgImage.src = preloadBg.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, "$1");
  bgImage.onload = function() {
      // Remove the preloading element once the image is loaded
      preloadBg.parentNode.removeChild(preloadBg);
  };
});