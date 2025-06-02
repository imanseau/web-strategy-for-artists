/* 
This JavaScript toggles the visibility of the dropdown menu.
It listens for a click on the "More" button and shows/hides the dropdown content.
*/

// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
  // Get references to the button and the dropdown container
  const button = document.getElementById("dropdownButton");
  const dropdown = document.getElementById("dropdownContent");

  // When the button is clicked...
  button.addEventListener("click", function () {
    // Toggle the "show" class on the dropdown container
    dropdown.classList.toggle("show");
  });

  // Optional: Close dropdown if clicking outside
  document.addEventListener("click", function (event) {
    if (!button.contains(event.target) && !dropdown.contains(event.target)) {
      dropdown.classList.remove("show");
    }
  });
});
