/*
This JavaScript file makes the dropdown work.
When the "More" button is clicked, it shows or hides the dropdown menu.
*/

function toggleDropdown() {
  // Find the dropdown menu by its ID
  const menu = document.getElementById("dropdown-menu");

  // Toggle the dropdown between visible and hidden
  if (menu.style.display === "block") {
    menu.style.display = "none"; // Hide it if it's already shown
  } else {
    menu.style.display = "block"; // Show it if it's hidden
  }
}
