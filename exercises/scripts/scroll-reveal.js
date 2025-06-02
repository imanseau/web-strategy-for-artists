/*
  === scroll-reveal.js ===
  This script adds a 'visible' class to sections when they enter the viewport.
  We use the Intersection Observer API to detect visibility.
  Once a section is revealed, it's not re-hidden—this provides a smooth scroll experience.

  Step-by-step:
  1. Select all elements with the 'reveal' class.
  2. Create an IntersectionObserver with a threshold of 15% visibility.
  3. When an element becomes visible, add the 'visible' class.
  4. Stop observing once the animation has triggered.
*/

document.addEventListener("DOMContentLoaded", () => {
  // Select all target elements we want to animate
  const sections = document.querySelectorAll('.reveal');

  // Create observer to watch for visibility changes
  const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach(entry => {
      // If the element is in view
      if (entry.isIntersecting) {
        // Add 'visible' class to trigger CSS transition
        entry.target.classList.add('visible');

        // Stop watching this element—it has already animated
        observerInstance.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15 // Trigger when 15% of the element is visible
  });

  // Apply observer to each section
  sections.forEach(section => {
    observer.observe(section);
  });
});
