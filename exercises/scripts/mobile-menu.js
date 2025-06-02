/*
  JavaScript to handle the mobile menu toggle behavior.

  When the hamburger button is clicked, we toggle the 'show' class
  on the mobile navigation menu to show or hide it.
*/

document.addEventListener('DOMContentLoaded', () => {
  // Select the toggle button and navigation menu
  const toggleButton = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('mobile-nav');

  // Add a click event to toggle the menu visibility
  toggleButton.addEventListener('click', () => {
    navMenu.classList.toggle('show');
  });
});
