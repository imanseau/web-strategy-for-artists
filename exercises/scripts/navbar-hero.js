// Wait for the DOM to fully load before attaching listeners
document.addEventListener('DOMContentLoaded', function () {
  // Get reference to the dropdown button
  const button = document.getElementById('dropdown-button');

  // Get reference to the dropdown menu
  const menu = document.getElementById('dropdown-menu');

  // When the button is clicked, toggle the visibility of the dropdown menu
  button.addEventListener('click', function () {
    // Check current display style and toggle accordingly
    if (menu.style.display === 'block') {
      menu.style.display = 'none'; // Hide if already visible
    } else {
      menu.style.display = 'block'; // Show if hidden
    }
  });

  // Optional: hide dropdown if user clicks outside
  document.addEventListener('click', function (event) {
    // Only close if the click is outside the dropdown area
    if (!event.target.closest('.dropdown')) {
      menu.style.display = 'none';
    }
  });
});
