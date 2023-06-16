document.addEventListener('DOMContentLoaded', () => {
  const addTabButton = document.getElementById('addTabButton');
  const tabForm = document.getElementById('tabForm');
  const websiteUrlInput = document.getElementById('websiteUrl');
  const websiteNameInput = document.getElementById('websiteName');
  const saveButton = document.getElementById('saveButton');
  const openButton = document.getElementById('openButton');
  const savedTabsContainer = document.getElementById('savedTabsContainer');
  const openTabsContainer = document.getElementById('openTabsContainer');

  let isEditing = true;
  let urlEntries = [];
  let openEntries = []; // Corrected variable name

  // Retrieve tabs on page load
  getTabs();
  tabForm.style.display = 'block';
  websiteUrlInput.value = '';
  websiteNameInput.value = '';




  // save tabs
  function saveTab(websiteUrl, websiteName) {
    //console.log("Saving tab:", websiteUrl, websiteName);
    return new Promise((resolve, reject) => {
      // Push the new entry into the array
      urlEntries.push({ websiteUrl, websiteName });

      // Save the updated array to Chrome storage
      chrome.storage.sync.set({ urlEntries }, function() {
        // Resolve the promise to indicate successful saving
        resolve();
        //console.log('New entry saved:', websiteName, '-', websiteUrl);
      });
      getTabs();
    });
  }

  function saveTabOpen(websiteUrl, websiteName) {
    //console.log("Saving tab open:", websiteUrl, websiteName);
    return new Promise((resolve, reject) => {
      // Push the new entry into the array
      openEntries.push({ websiteUrl, websiteName }); // Corrected variable name

      // Save the updated array to Chrome storage
      chrome.storage.sync.set({ openEntries }, function() {
        // Resolve the promise to indicate successful saving
        resolve();
        //console.log('New entry saved (Open):', websiteName, '-', websiteUrl);
      });
      displayOpenTabs();
    });
  }

  // get tabs
  function getTabs() {
    //console.log("Getting tabs");
    chrome.storage.sync.get("urlEntries", function(result) {
      //console.log("Retrieved from storage:", result.urlEntries);
      if (result.urlEntries) {
        urlEntries = result.urlEntries;
        displayTabs();
      }
      else {
        // Handle the case when no entries are found
      }
    });

    chrome.storage.sync.get("openEntries", function(result){
      //console.log("Retrieved from storage:", result.openEntries);
      if (result.openEntries) {
        openEntries = result.openEntries; // Corrected variable name
        displayOpenTabs();
      }
      else {
        // Handle the case when no entries are found
      }
    });
  }

  function displayTabs() {
    savedTabsContainer.innerHTML = '';

    urlEntries.forEach((entry) => {
      const savedTab = document.createElement('div');
      savedTab.classList.add('saved-website');
      savedTab.innerText = entry.websiteName;

      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-button');
      deleteButton.innerText = 'Delete';

      savedTab.appendChild(deleteButton);
      savedTabsContainer.appendChild(savedTab);
    });
  }

  function displayOpenTabs() {
    openTabsContainer.innerHTML = '';

    openEntries.forEach((entry) => { // Corrected variable name
      const openTab = document.createElement('div');
      openTab.classList.add('saved-website');
      openTab.innerText = entry.websiteName;

      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-button');
      deleteButton.innerText = 'Delete';

      openTab.appendChild(deleteButton);
      openTabsContainer.appendChild(openTab);
    });
  }

  savedTabsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-button')) {
      const savedTab = event.target.closest('.saved-website');
      deleteTab(savedTab);
    }
  });

  openTabsContainer.addEventListener('click', (event) => { // Added event listener for open tabs container
    if (event.target.classList.contains('delete-button')) {
      const openTab = event.target.closest('.saved-website');
      deleteOpenTab(openTab);
    }
  });

  function deleteTab(savedTab) {
    const deleteName = savedTab.childNodes[0].nodeValue.trim();
    //console.log("Deleting tab:", deleteName);
    const deleteIndex = urlEntries.findIndex((entry) => {
      return entry.websiteName.toString() === deleteName.toString();
    });
    if (deleteIndex !== -1) {
      urlEntries.splice(deleteIndex, 1);
      chrome.storage.sync.set({ urlEntries }, function() {
        //console.log("Entry deleted:", deleteName);
        getTabs();
      });
    }
  }

  function deleteOpenTab(openTab) {
    const deleteName = openTab.childNodes[0].nodeValue.trim();    
    //console.log("Deleting tab:", deleteName);
    const deleteIndex = openEntries.findIndex((entry) => {
      return entry.websiteName.toString() === deleteName.toString();
    });
    if (deleteIndex !== -1) {
      openEntries.splice(deleteIndex, 1);
      chrome.storage.sync.set({ openEntries }, function() {
        //console.log("Entry deleted:", deleteName);
        getTabs();
      });
    }
  }

  function isValidUrl(url) {
    // Basic URL validation using regular expression
    const urlRegex = /^[^ "]+\..+$/;
    return urlRegex.test(url);
  }

  saveButton.addEventListener('click', () => {
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
    deleteButton.innerText = 'Delete';
  
    savedTab.appendChild(deleteButton);
    savedTabsContainer.appendChild(savedTab);
  
    websiteUrlInput.value = '';
    websiteNameInput.value = '';
  
    saveTab(websiteUrl, websiteName)
      .then(() => {
        alert('Tab saved successfully! - Block');
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
    deleteButton.innerText = 'Delete';
  
    openTab.appendChild(deleteButton);
    openTabsContainer.appendChild(openTab);
  
    websiteUrlInput.value = '';
    websiteNameInput.value = '';
  
    saveTabOpen(websiteUrl, websiteName)
      .then(() => {
        alert('Tab saved successfully! - Open');
      })
      .catch((error) => {
        console.error('Error saving tab(Open):', error);
      });
  });

});

