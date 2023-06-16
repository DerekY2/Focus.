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
  let openEntries = [];

  // Retrieve tabs on page load
  getTabs();
  tabForm.style.display = 'block';
  websiteUrlInput.value = '';
  websiteNameInput.value = '';

  // save tabs
  function saveTab(websiteUrl, websiteName) {
    return new Promise((resolve, reject) => {
      urlEntries.push({ websiteUrl, websiteName });

      chrome.storage.sync.set({ urlEntries }, function() {
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
    chrome.storage.sync.get("urlEntries", function(result) {
      if (result.urlEntries) {
        urlEntries = result.urlEntries;
        displayTabs();
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

  function displayTabs() {
    savedTabsContainer.innerHTML = '';

    urlEntries.forEach((entry) => {
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
      deleteTab(savedTab);
    }
  });

  openTabsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-button') || event.target.innerHTML === 'x') {
      const openTab = event.target.closest('.saved-website');
      deleteOpenTab(openTab);
    }
  });

  function deleteTab(savedTab) {
    const deleteName = savedTab.childNodes[0].nodeValue.trim();
    const deleteIndex = urlEntries.findIndex((entry) => {
      return entry.websiteName.toString() === deleteName.toString();
    });
    if (deleteIndex !== -1) {
      urlEntries.splice(deleteIndex, 1);
      chrome.storage.sync.set({ urlEntries }, function() {
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
    deleteButton.innerHTML = 'x'; 
    deleteButton.style.backgroundColor = 'transparent';

    savedTab.appendChild(deleteButton);
    savedTabsContainer.appendChild(savedTab);

    websiteUrlInput.value = '';
    websiteNameInput.value = '';

    saveTab(websiteUrl, websiteName)
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
