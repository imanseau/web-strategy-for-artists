/*
  scroll-reveal.js
  ----------------
  This script uses the Intersection Observer API to detect when each .reveal-section enters the viewport.
  When an element is observed (intersecting), we add the class `.visible` to trigger a CSS transition.
  Only applies the class once to prevent jarring reanimations on scroll-back.
*/

document.addEventListener("DOMContentLoaded", () => {
  // Step 1: Select all elements with the class 'reveal-section'
  const sections = document.querySelectorAll('.reveal-section');

  // Step 2: Create a new IntersectionObserver instance
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      // Check if the element is intersecting (visible in the viewport)
      if (entry.isIntersecting) {
        // Add the 'visible' class to trigger CSS animation
        entry.target.classList.add('visible');

        // Optional: Unobserve after animation to prevent repeat triggers
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1 // Trigger when at least 10% of the section is visible
  });

  // Step 3: Observe each section
  sections.forEach(section => {
    observer.observe(section);
  });
});
