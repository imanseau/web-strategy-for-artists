// =========================
// Hamburger Menu Functionality
// =========================

// Get references to the hamburger button and mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

// Function to toggle the mobile menu open/closed
function toggleMobileMenu() {
  // Check if menu is currently open
  const isOpen = mobileMenu.classList.contains('open');
  // Toggle the 'open' class to show/hide the menu
  mobileMenu.classList.toggle('open');
  // Update aria-expanded for accessibility
  hamburger.setAttribute('aria-expanded', !isOpen);
}

// Add click event listener to hamburger button
hamburger.addEventListener('click', toggleMobileMenu);

// Optional: Close mobile menu when a link is clicked (for better UX)
mobileMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// =========================
// Scroll Reveal Animation
// =========================

// Select all elements with the 'reveal' class
const revealSections = document.querySelectorAll('.reveal');

// Function to check if an element is in the viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  // Returns true if the element is at least partially visible
  return (
    rect.top < window.innerHeight - 60 && // 60px offset for header
    rect.bottom > 0
  );
}

// Function to add 'active' class to reveal elements in view
function revealOnScroll() {
  revealSections.forEach(section => {
    if (isInViewport(section)) {
      section.classList.add('active');
    }
  });
}

// Run on scroll and on page load
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);
