/*
  Accordion functionality script
  ------------------------------
  - Adds click event listeners to all accordion buttons
  - Uses aria-expanded to reflect open/closed state
  - Shows/hides content panels using 'hidden' attribute
  - Ensures only one section is open at any time
*/

document.addEventListener('DOMContentLoaded', () => {
  // Select all buttons that toggle accordion sections
  const toggles = document.querySelectorAll('.accordion-toggle');

  toggles.forEach(button => {
    button.addEventListener('click', () => {
      // Get the ID of the associated panel from aria-controls
      const panelId = button.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);
      const isExpanded = button.getAttribute('aria-expanded') === 'true';

      // Close all panels and set aria-expanded to false
      toggles.forEach(btn => {
        btn.setAttribute('aria-expanded', 'false');
        const otherPanel = document.getElementById(btn.getAttribute('aria-controls'));
        otherPanel.hidden = true;
      });

      // If the clicked button was not already expanded, open its panel
      if (!isExpanded) {
        button.setAttribute('aria-expanded', 'true');
        panel.hidden = false;
      }
    });
  });
});
