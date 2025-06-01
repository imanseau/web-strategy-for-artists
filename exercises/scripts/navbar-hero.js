// 
// This simple script toggles the visibility of the "More" dropdown menu
// when the user clicks on the "More" link in the navbar.
//
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('dropdownToggle');
  const menu = document.querySelector('.dropdown-menu');

  toggle.addEventListener('click', (e) => {
    e.preventDefault(); // prevent default link behavior
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  });

  // Optional: hide dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      menu.style.display = 'none';
    }
  });
});
