/**Authors: Derek Yu, Hrishi Paripati
 * Schedule configuration page - back-end, manage  user's schedule(task, time entries)
 * 
 *   handleSubmit(): 
 *     This function is called when the user submits the form to add a new task. It retrieves the task name and selected time from the form, 
 *     creates a new table row with cells for the task name, time, and delete button, appends the row to the tasks body, saves the updated 
 *     tasks to Chrome storage, and clears the form input fields.
 *
 *   handleSort(): 
 *     This function is called when the user clicks the sort button. It retrieves the tasks rows, converts the NodeList to an array, sorts the 
 *     array based on the time value, removes the existing tasks rows from the tasks body, and appends the sorted tasks rows back to the tasks body. 
 *     It then saves the updated tasks order to Chrome storage.
 *
 *   handleDelete(): 
 *     This function is called when the user clicks the delete button for a task. It removes the corresponding row from the tasks body and saves 
 *     the updated tasks to Chrome storage.
 *
 *   saveTasks():
 *     This function saves the tasks array to Chrome storage. It retrieves the tasks rows, iterates through them to extract the task and time
 *      values, creates an object representing a task entry, pushes the entry to the tasks array, and saves the tasks array to Chrome storage using 
 *     the chrome.storage.sync.set() function.
 *
 *   loadTasks(): 
 *     This function loads the tasks from Chrome storage. It retrieves the tasks array from Chrome storage using the chrome.storage.sync.get() 
 *     function, creates table rows and cells for each task entry, appends them to the tasks body, and resolves a promise with the loaded tasks array.
 *
 */

document.addEventListener('DOMContentLoaded', () => {
  // Get the select elements
  var taskSelect = document.getElementById('tasks');
  var timeSelect = document.getElementById('time');

  // Get the tasks body element
  var tasksBody = document.getElementById('tasks-body');

  //runs when user clicks "submit"
  function handleSubmit(event) {
    event.preventDefault();
  
    // Get the entered task name
    var taskNameInput = document.getElementById('taskName');
    var taskName = taskNameInput.value.trim(); // Trim leading/trailing spaces
    //console.log('New entry taskName: ' + taskName);
  
    // Check if the task name is empty
    if (taskName === '') {
      var errorMessage = document.getElementById('error-message');
      errorMessage.textContent = 'Please enter a task name!';
      return; // Stop execution if task name is empty
    }
  
    // Get the selected time option
    var selectedTime = timeSelect.value;
  
    // Create a new table row
    var newRow = document.createElement('tr');
  
    // Create task cell
    var taskCell = document.createElement('td');
    taskCell.textContent = taskName;
    //console.log('taskCell.textContent: ' + taskCell.textContent);
  
    // Create time cell
    var timeCell = document.createElement('td');
    timeCell.textContent = selectedTime;
    //console.log('timeCell.textContent: ' + timeCell.textContent);
  
    // Create action cell
    var actionCell = document.createElement('td');
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener('click', handleDelete);
    actionCell.appendChild(deleteButton);
  
    // Append cells to the new row
    newRow.appendChild(taskCell);
    newRow.appendChild(timeCell);
    newRow.appendChild(actionCell);
  
    // Append the new row to the tasks body
    tasksBody.appendChild(newRow);
  
    // Save the updated tasks to Chrome storage
    saveTasks();
    //console.log('called saveTasks');
  
    // Clear the form input fields
    taskNameInput.value = '';
    timeSelect.selectedIndex = 0;
  
    // Clear the error message
    var errorMessage = document.getElementById('error-message');
    errorMessage.textContent = '';
  }
  


  // Function to handle sort button click
  function handleSort() {
    // Get the tasks rows
    var tasksRows = tasksBody.querySelectorAll("tr");

    // Convert the tasks rows NodeList to an array for easier manipulation
    var tasksArray = Array.from(tasksRows);

    // Sort the tasks array based on the time value
    tasksArray.sort(function (a, b) {
      var timeCellA = a.querySelector("td:nth-child(2)").textContent;
      var timeCellB = b.querySelector("td:nth-child(2)").textContent;
      
      // Convert time strings to date objects for comparison
      var timeA = new Date("2000-01-01 " + timeCellA);
      var timeB = new Date("2000-01-01 " + timeCellB);
      
      return timeA - timeB;
    });

    // Remove existing tasks rows from the tasks body
    tasksArray.forEach(function (row) {
      row.remove();
    });

    // Append the sorted tasks rows to the tasks body
    tasksArray.forEach(function (row) {
      tasksBody.appendChild(row);
    });

    // Save the updated tasks order to Chrome storage
    saveTasks();
  }


  // Function to handle delete button click
  function handleDelete(event) {
    var row = event.target.closest('tr');
    row.remove();

    // Save the updated tasks to Chrome storage
    saveTasks();
  }

  // Function to save the tasks array to Chrome storage
  function saveTasks() {
    return new Promise((resolve, reject) => {
      // Get the tasks rows
      var tasksRows = tasksBody.querySelectorAll("tr");
  
      // Create an array to store the tasks
      var tasks = [];
  
      // Iterate through the rows and extract the task and time values
      tasksRows.forEach((row) => {
        var taskCell = row.querySelector("td:first-child");
        var timeCell = row.querySelector("td:nth-child(2)");
  
        var taskValue = taskCell.textContent;
        var timeValue = timeCell.textContent;
  
        // Create an object representing a task entry
        var taskEntry = {
          task: taskValue,
          time: timeValue
        };
  
        // Push the entry to the tasks array
        tasks.push(taskEntry);
      });
  
      // Save the tasks array to Chrome storage
      chrome.storage.sync.set({ tasks: tasks }, function() {
        // Resolve the promise to indicate successful saving
        resolve();
        //console.log("Task saved: ", tasks);
      });
    });
  }
  

/*
  function clearTasks(){
    chrome.storage.sync.get("tasks", function(result) {
      delete result.tasks; // Remove the tasks array from the data object
      chrome.storage.sync.set(result, function() {
        //console.log("Tasks array cleared from Chrome storage. ");
      });
    });
    loadTasks();
  }
*/


  // load the tasks onto the page
  function loadTasks() {
    //console.log("Loading tasks...");
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get("tasks", function(result) {
        var tasks = result.tasks;
        var consoleTasks = Array.from(result.tasks);
        if (tasks && tasks.length > 0) {
          tasks.forEach((entry) => {
            var newRow = document.createElement("tr");
            var taskCell = document.createElement("td");
            taskCell.textContent = entry.task;
  
            var timeCell = document.createElement("td");
            timeCell.textContent = entry.time;
  
            var actionCell = document.createElement("td");
            var deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "delete-button";
            deleteButton.addEventListener("click", handleDelete);
            actionCell.appendChild(deleteButton);
  
            newRow.appendChild(taskCell);
            newRow.appendChild(timeCell);
            newRow.appendChild(actionCell);
  
            tasksBody.appendChild(newRow);
            //console.log('Tasks: Loaded tasks:', consoleTasks);
          });
  
          //console.log("Tasks loaded:", tasks);
          resolve(tasks); // Resolve the promise with the loaded tasks
        } else {
          //console.log("No tasks found.");
          resolve([]); // Resolve the promise with an empty array if no tasks are found
        }
      });
    });
  }
  

  loadTasks(); // Load user's tasks

  // Attach the event listener to the form
  var tasksForm = document.getElementById('tasks-form');
  if (tasksForm) {
    tasksForm.addEventListener('submit', handleSubmit);
  }

  // Attach the event listener to the sort button
  var sortButton = document.getElementById('sortButton');
  if (sortButton) {
    sortButton.addEventListener('click', handleSort);
  }

});
