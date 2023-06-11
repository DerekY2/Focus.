document.addEventListener('DOMContentLoaded', () => {
  const addTabButton = document.getElementById('addTabButton');
  const tabForm = document.getElementById('tabForm');
  const websiteUrlInput = document.getElementById('websiteUrl');
  const websiteNameInput = document.getElementById('websiteName');
  const saveButton = document.getElementById('saveButton');
  const closeTabsButton = document.getElementById('closeTabsButton');
  const savedTabsContainer = document.getElementById('savedTabsContainer');

  let isEditing = false;
  let urlEntries = [];

  // Retrieve tabs on page load
  getTabs();




  addTabButton.addEventListener('click', () => {
    if (!isEditing) {
      tabForm.style.display = 'block';
      isEditing = true;
      websiteUrlInput.value = '';
      websiteNameInput.value = '';
    }
  });




  // save tabs
  function saveTab(websiteUrl, websiteName) {
    console.log("Saving tab:", websiteUrl, websiteName);
    return new Promise((resolve, reject) => {
      // Push the new entry into the array
      urlEntries.push({ websiteUrl, websiteName });

      // Save the updated array to Chrome storage
      chrome.storage.sync.set({ urlEntries }, function() {
        // Resolve the promise to indicate successful saving
        resolve();
        console.log('New entry saved:', websiteName, '-', websiteUrl);
        //alert('New entry saved! websiteName: ' + websiteName + ', websiteUrl: ' + websiteUrl); // removing alert bc its annoying
      });
      getTabs();
    });
  }




  // get tabs 
  function getTabs() {
    console.log("Getting tabs");
    chrome.storage.sync.get("urlEntries", function(result) {
      var consoleUrlEntries = Array.from(result.urlEntries);
      console.log("Retrieved from storage:", consoleUrlEntries);
      if (result.urlEntries) {
        urlEntries = result.urlEntries; // Assign the retrieved entries to urlEntries
        displayTabs();
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


  savedTabsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-button')) {
      const savedTab = event.target.closest('.saved-website');
      deleteTab(savedTab);
    }
  });


  function deleteTab(savedTab) { //savedTab retrieved from whatever calls the function
    const deleteName = savedTab.childNodes[0].nodeValue.trim();
    console.log("Deleting tab:", deleteName);
    console.log("Deleting tab:", deleteName);
    // Find the index of the entry with the specified websiteName
    const deleteIndex = urlEntries.findIndex((entry) => {
      console.log("Searching Entry:", entry); // lots of logs for testing...
      console.log("entry.websiteUrl:", entry.websiteName);
      console.log("deleteName:", deleteName);
      return entry.websiteName.toString() === deleteName.toString();
    });
    var consoleUrlEntries = Array.from(urlEntries);
    console.log(consoleUrlEntries);
    console.log('deleteIndex: ' + deleteIndex); // return index
    if (deleteIndex !== -1) {
      // Remove the entry from the urlEntries array at the found index
      urlEntries.splice(deleteIndex, 1);
      console.log('urlEntries: ', consoleUrlEntries);
      // Save the updated array to Chrome storage
      chrome.storage.sync.set({ urlEntries }, function() {
        console.log("Entry deleted:", deleteName);
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
    var websiteUrl = websiteUrlInput.value;
    var websiteName = websiteNameInput.value;

    if (websiteUrl.trim() === '' || websiteName.trim() === '') {
      return;
    };
    
    if (!isValidUrl(websiteUrl)) {
      urlErrorMessage.textContent = 'Please enter a valid URL.'; // Display error message
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




  closeTabsButton.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      var activeTabUrl = tabs[0].url;
      console.log('active tab: ' + activeTabUrl);
    });
  });
});
