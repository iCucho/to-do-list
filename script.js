// This waits for the entire content of the webpage to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Event listener for adding a task when the add button is clicked
  document.querySelector(".add-button").addEventListener("click", function () {
    // Get the task text from the input field
    const task = document.querySelector(".task-input").value;
    // Add the new task to the task list
    addTasks(task);
    // Update the displayed count of remaining tasks
    updateRemainingTasks();
  });

  // Event listener for clearing all tasks when the clear all button is clicked
  document
    .querySelector(".clear-all-btn")
    .addEventListener("click", function () {
      // Remove each task element from the task list
      document.querySelectorAll(".task").forEach((task) => {
        task.remove();
      });
      // Update the displayed count of remaining tasks
      updateRemainingTasks();
    });

  // Function to add a new task
  function addTasks(task) {
    // Trim removes whitespace from the start/end of a string; so if the task is only whitespace, alert the user
    if (task.trim() === "") {
      alert("Please enter a task!");
      return;
    }

    // Reference to the container where tasks are displayed
    const taskContainer = document.querySelector(".task-container");

    // Try to select a placeholder task element
    const placeholderTaskElement = taskContainer.querySelector(".placeholder");

    // If a placeholder element exists, modify it to become a new task
    if (placeholderTaskElement) {
      // Change placeholder task text to the entered task
      placeholderTaskElement.querySelector("p").textContent = task;
      // Remove the placeholder class so it becomes a normal task
      placeholderTaskElement.classList.remove("placeholder");

      // Select the check button and assign functionality
      const checkButton = placeholderTaskElement.querySelector(".check-button");
      checkButton.onclick = function () {
        // Toggle the 'completed' class, marking or unmarking the task as complete
        placeholderTaskElement.classList.toggle("completed");
        // Update the displayed count of remaining tasks
        updateRemainingTasks();
      };

      // Select the remove button and assign functionality
      const removeButton =
        placeholderTaskElement.querySelector(".remove-button");
      removeButton.onclick = function () {
        // Remove this task element from the DOM
        placeholderTaskElement.remove();
        // Update the displayed count of remaining tasks
        updateRemainingTasks();
      };
    }
    // If there isn't a placeholder available, create a new task element from scratch
    else {
      // Create a new task element and set up its children and functionality
      const newTask = document.createElement("div");
      newTask.className = "task";

      // Create a check button and assign functionality
      const checkButton = document.createElement("button");
      checkButton.textContent = "✓";
      checkButton.className = "check-button";
      checkButton.onclick = function () {
        newTask.classList.toggle("completed");
        updateRemainingTasks();
      };
      newTask.appendChild(checkButton);

      // Create a paragraph to hold the task text
      const taskDescription = document.createElement("p");
      taskDescription.textContent = task;
      newTask.appendChild(taskDescription);

      // Create a remove button and assign functionality
      const removeButton = document.createElement("button");
      removeButton.textContent = "✕";
      removeButton.className = "remove-button";
      removeButton.onclick = function () {
        newTask.remove();
        updateRemainingTasks();
      };
      newTask.appendChild(removeButton);

      // Add the fully constructed task element to the task list
      taskContainer.appendChild(newTask);
    }

    // Clear the input field
    document.querySelector(".task-input").value = "";
  }

  // Function to update the displayed count of remaining tasks
  function updateRemainingTasks() {
    // Count tasks that aren't placeholders or marked as completed
    const remainingTasks = document.querySelectorAll(
      ".task:not(.placeholder):not(.completed)"
    ).length;
    // Display the count in the designated paragraph
    document.querySelector(
      ".remaining-tasks"
    ).textContent = `You have ${remainingTasks} remaining tasks`;
  }
});
