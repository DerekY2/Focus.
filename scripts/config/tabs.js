/* Authors: Derek Yu, Hrishi Paripati
 * Tab configuration page - back-end for managing user' URL selections.
 *
 *   saveTabClose(websiteUrl, websiteName): 
 *    Responsible for saving a closed tab. It takes the websiteUrl and websiteName as parameters and creates a new entry in the 
 *    closeEntries array. It saves the updated array to the Chrome storage and returns a promise.
 *
 *   saveTabOpen(websiteUrl, websiteName): 
 *    This function is similar to saveTabClose but is used for saving an open tab. It creates a new entry in the 
 *    openEntries array, saves the updated array to the Chrome storage, and returns a promise.
 *
 *   getTabs(): 
 *    Retrieves the saved tabs from the Chrome storage. It fetches the closeEntries and openEntries arrays from 
 *    the storage and updates the corresponding local arrays. It then calls the displayCloseTabs and displayOpenTabs functions to render 
 *    the saved tabs in the HTML document.
 *
 *   displayCloseTabs(): 
 *    Responsible for rendering the saved closed tabs in the HTML document. It clears the savedTabsContainer element and iterates over the 
 *    closeEntries array. For each entry, it creates a new div element with the website name and a delete button, and appends it to the savedTabsContainer.
 *
 *   displayOpenTabs(): 
 *    This function is similar to displayCloseTabs but is used to render the saved open tabs in the HTML document. It clears the 
 *    openTabsContainer element and iterates over the openEntries array. For each entry, it creates a new div element with the website name and 
 *    a delete button, and appends it to the openTabsContainer.
 *
 *   deleteCloseTab(savedTab): 
 *    This function is called when a delete button for a closed tab is clicked. It takes the savedTab element as a parameter and identifies 
 *    the corresponding tab to delete based on its website name. It removes the tab from the closeEntries array, saves the updated array to 
 *    the Chrome storage, and calls the getTabs function to refresh the displayed tabs.
 *
 *   deleteOpenTab(openTab): 
 *    This function is similar to deleteCloseTab but is used to delete an open tab. It takes the openTab element as a parameter and removes 
 *    the corresponding tab from the openEntries array. It then saves the updated array to the Chrome storage and calls the getTabs function 
 *    to refresh the displayed tabs.
 *
 *   isValidUrl(url): 
 *    This function is used to validate a URL. It takes a url as a parameter and uses a regular expression to check if the URL matches 
 *    the expected pattern. It returns true if the URL is valid and false otherwise.
 *
 */
document.addEventListener('DOMContentLoaded', () => {
  // Get references to various elements
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

  // Save tabs that are meant to be closed
  function saveTabClose(websiteUrl, websiteName) {
      return new Promise((resolve, reject) => {
          closeEntries.push({
              websiteUrl,
              websiteName
          });

          // Store the updated closeEntries array in chrome storage
          chrome.storage.sync.set({
              closeEntries
          }, function() {
              resolve();
          });

          // Update the displayed tabs
          getTabs();
      });
  }

  // Save tabs that are meant to be opened
  function saveTabOpen(websiteUrl, websiteName) {
      return new Promise((resolve, reject) => {
          openEntries.push({
              websiteUrl,
              websiteName
          });

          // Store the updated openEntries array in chrome storage
          chrome.storage.sync.set({
              openEntries
          }, function() {
              resolve();
          });

          // Update the displayed tabs
          displayOpenTabs();
      });
  }

  // Retrieve tabs from chrome storage
  function getTabs() {
      chrome.storage.sync.get("closeEntries", function(result) {
          if (result.closeEntries) {
              closeEntries = result.closeEntries;
              displayCloseTabs();
          } else {
              // Handle the case when no entries are found
          }
      });

      chrome.storage.sync.get("openEntries", function(result) {
          if (result.openEntries) {
              openEntries = result.openEntries;
              displayOpenTabs();
          } else {
              // Handle the case when no entries are found
          }
      });
  }

  function displayCloseTabs() {
    savedTabsContainer.innerHTML = '';
  
    // Display tabs meant to be closed
    closeEntries.forEach((entry) => {
      // Create a div element for each saved tab
      const savedTab = document.createElement('div');
      savedTab.classList.add('saved-website', 'blocked');
  
      // Create a span element for the website name
      const nameSpan = document.createElement('span');
      nameSpan.innerText = entry.websiteName;
      nameSpan.style.marginRight = '20px'; // Add some spacing between the URL and name
  
      // Create a span element for the website URL
      const urlSpan = document.createElement('span');
      urlSpan.innerText = entry.websiteUrl;
      urlSpan.classList.add('displayUrl');

      // Create a delete button for each saved tab
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-button');
      deleteButton.innerHTML = 'x'; // Use "x" as the delete icon
      deleteButton.style.backgroundColor = 'transparent';
  
      // Append the URL span, name span, and delete button to the saved tab
      savedTab.appendChild(nameSpan);
      savedTab.appendChild(urlSpan);
      savedTab.appendChild(deleteButton);
  
      // Append the saved tab to the savedTabsContainer
      savedTabsContainer.appendChild(savedTab);
    });
  }
  

  // Display tabs meant to be opened
  function displayOpenTabs() {
    openTabsContainer.innerHTML = '';
  
    // Display tabs meant to be opened
    openEntries.forEach((entry) => {
      // Create a div element for each open tab
      const openTab = document.createElement('div');
      openTab.classList.add('saved-website', 'open');
  
      // Create a span element for the website name
      const nameSpan = document.createElement('span');
      nameSpan.innerText = entry.websiteName;
      nameSpan.style.marginRight = '20px'; // Add some spacing between the URL and name
  
      // Create a span element for the website URL
      const urlSpan = document.createElement('span');
      urlSpan.innerText = entry.websiteUrl;
      urlSpan.classList.add('displayUrl');
  
      // Create a delete button for each open tab
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-button');
      deleteButton.innerHTML = 'x'; // Use "x" as the delete icon
      deleteButton.style.backgroundColor = 'transparent';
  
      // Append the URL span, name span, and delete button to the open tab
      openTab.appendChild(nameSpan);
      openTab.appendChild(urlSpan);
      openTab.appendChild(deleteButton);
  
      // Append the open tab to the openTabsContainer
      openTabsContainer.appendChild(openTab);
    });
  }
  

  // Event listener for deleting close tabs
  savedTabsContainer.addEventListener('click', (event) => {
      if (event.target.classList.contains('delete-button') || event.target.innerHTML === 'x') {
          const savedTab = event.target.closest('.saved-website');
          console.log(savedTab);
          deleteCloseTab(savedTab);
      }
  });

  // Event listener for deleting open tabs
  openTabsContainer.addEventListener('click', (event) => {
      if (event.target.classList.contains('delete-button') || event.target.innerHTML === 'x') {
          const openTab = event.target.closest('.saved-website');
          deleteOpenTab(openTab);
      }
  });

 // Delete a close tab
function deleteCloseTab(savedTab) {
  if (!savedTab) {
      return; // Exit the function if savedTab is null
  }

  const nameSpan = savedTab.querySelector('span:first-child');
  if (!nameSpan) {
      return; // Exit the function if nameSpan is null
  }

  const deleteName = nameSpan.textContent.trim();
  const deleteIndex = closeEntries.findIndex((entry) => {
      return entry.websiteName.toString() === deleteName.toString();
  });

  if (deleteIndex !== -1) {
      closeEntries.splice(deleteIndex, 1);

      // Store the updated closeEntries array in chrome storage
      chrome.storage.sync.set({
          closeEntries
      }, function() {
          // Update the displayed tabs
          getTabs();
      });
  }
}


// Delete an open tab
function deleteOpenTab(openTab) {
  if (!openTab) {
    return; // Exit the function if openTab is null
}

const nameSpan = openTab.querySelector('span:first-child');
if (!nameSpan) {
    return; // Exit the function if nameSpan is null
}

const deleteName = nameSpan.textContent.trim();
const deleteIndex = openEntries.findIndex((entry) => {
    return entry.websiteName.toString() === deleteName.toString();
});

if (deleteIndex !== -1) {
    openEntries.splice(deleteIndex, 1);

    // Store the updated closeEntries array in chrome storage
    chrome.storage.sync.set({
        openEntries
    }, function() {
        // Update the displayed tabs
        getTabs();
    });
}
}



  // Check if a URL is valid
  function isValidUrl(url) {
      const urlRegex = /^[^ "]+\..+$/;
      return urlRegex.test(url);
  }

  function isValidName(name) {
      return name.trim() !== "";
  }

  // Event listener for the close button
  closeButton.addEventListener('click', () => {
      const websiteUrl = websiteUrlInput.value;
      const websiteName = websiteNameInput.value;

      if (websiteUrl.trim() === '' || websiteName.trim() === '') {
          return;
      }

      if (!isValidUrl(websiteUrl)) {
          urlErrorMessage.textContent = 'Please enter a valid URL.'; // Display error message
          return;
      } else if (!isValidName(websiteName)) {
          nameErrorMessage.textContent = 'Please enter a website name.'; // Display error message
          return;
      }

      // Clear the error message
      urlErrorMessage.textContent = '';
      nameErrorMessage.textContent = '';

      // Create a div element for the saved tab
      const savedTab = document.createElement('div');
      savedTab.classList.add('saved-website');
      savedTab.innerText = websiteName; // Set the text content to the website name

      // Create a delete button for the saved tab
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-button');
      deleteButton.innerHTML = 'x'; // Use "x" as the delete icon
      deleteButton.style.backgroundColor = 'transparent';

      // Append the delete button to the saved tab
      savedTab.appendChild(deleteButton);

      // Append the saved tab to the savedTabsContainer
      savedTabsContainer.appendChild(savedTab);

      // Clear the input values
      websiteUrlInput.value = '';
      websiteNameInput.value = '';


      saveTabClose(websiteUrl, websiteName)
          .then(() => {
              // Handle success, if needed
          })
          .catch((error) => {
              console.error('Error saving tab (block):', error);
          });
  });

  // Event listener for the open button
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

      // Create a div element for the open tab
      const openTab = document.createElement('div');
      openTab.classList.add('saved-website');
      openTab.innerText = websiteName; // Set the text content to the website name

      // Create a delete button for the open tab
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-button');
      deleteButton.innerHTML = 'x'; // Use "x" as the delete icon
      deleteButton.style.backgroundColor = 'transparent';

      // Append the delete button to the open tab
      openTab.appendChild(deleteButton);

      // Append the open tab to the openTabsContainer
      openTabsContainer.appendChild(openTab);

      // Clear the input values
      websiteUrlInput.value = '';
      websiteNameInput.value = '';


      saveTabOpen(websiteUrl, websiteName)
          .then(() => {
              // Handle success, if needed
          })
          .catch((error) => {
              console.error('Error saving tab (Open):', error);
          });
  });
});