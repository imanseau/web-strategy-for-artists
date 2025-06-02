// JavaScript for mobile navigation toggle

// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // Select the hamburger menu button and the navigation links container
    const hamburgerButton = document.querySelector('.hamburger-menu');
    const navLinksContainer = document.querySelector('.nav-links'); // This is the <ul>
    const navElement = document.querySelector('.sticky-nav'); // The main <nav> element

    // Check if both elements exist to prevent errors if HTML structure is missing
    if (hamburgerButton && navLinksContainer && navElement) {

        // Add a click event listener to the hamburger menu button
        hamburgerButton.addEventListener('click', () => {
            
            // Toggle the 'nav-open' class on the main <nav> element.
            // The CSS in nav.css uses .sticky-nav.nav-open .nav-links to show/hide links.
            navElement.classList.toggle('nav-open');

            // Check if the navigation is now open
            const isNavOpen = navElement.classList.contains('nav-open');

            // Update the aria-expanded attribute on the button
            hamburgerButton.setAttribute('aria-expanded', isNavOpen);

            // Optional: Change the hamburger icon to a close icon (X) and back
            if (isNavOpen) {
                hamburgerButton.innerHTML = '&#10005;'; // 'X' (close icon)
                hamburgerButton.setAttribute('aria-label', 'Close navigation menu');
            } else {
                hamburgerButton.innerHTML = '&#9776;'; // Hamburger icon
                hamburgerButton.setAttribute('aria-label', 'Open navigation menu');
            }
        });

    } else {
        // Log an error if essential elements are not found
        console.error('Mobile navigation elements not found. Hamburger menu functionality will not work.');
    }
});
