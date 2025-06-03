// JavaScript for mobile navigation toggle

document.addEventListener('DOMContentLoaded', () => {
    // Select the hamburger menu button and the main navigation element
    const hamburgerButton = document.querySelector('.hamburger-menu');
    const navElement = document.querySelector('.sticky-nav'); // The main <nav> element

    // Check if essential elements for main navigation toggle exist
    if (hamburgerButton && navElement) {
        // Add a click event listener to the hamburger menu button
        hamburgerButton.addEventListener('click', () => {
            // Toggle the 'nav-open' class on the main <nav> element.
            // This class controls the visibility of the main .nav-links list.
            navElement.classList.toggle('nav-open');

            // Check if the navigation is now open
            const isNavOpen = navElement.classList.contains('nav-open');

            // Update the aria-expanded attribute on the hamburger button
            hamburgerButton.setAttribute('aria-expanded', isNavOpen);

            // Optional: Change the hamburger icon to a close icon (X) and back
            if (isNavOpen) {
                hamburgerButton.innerHTML = '&#10005;'; // 'X' (close icon)
                hamburgerButton.setAttribute('aria-label', 'Close navigation menu');
            } else {
                hamburgerButton.innerHTML = '&#9776;'; // Hamburger icon
                hamburgerButton.setAttribute('aria-label', 'Open navigation menu');
                // When closing the main nav, also ensure all submenus are closed
                closeAllSubmenus();
            }
        });
    } else {
        console.error('Main mobile navigation elements (hamburger or nav) not found.');
    }

    // Dropdown toggle functionality for mobile
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (event) => {
            // Only activate dropdown toggle on mobile view.
            // On desktop, hover will handle it, and we want the main link to be clickable.
            // Check if the hamburger menu is visible (indicative of mobile view)
            const isMobileView = getComputedStyle(hamburgerButton).display !== 'none';

            if (isMobileView) {
                event.preventDefault(); // Prevent link navigation on mobile when toggling submenu

                const parentDropdown = toggle.closest('.dropdown'); // Get the parent .dropdown element
                if (parentDropdown) {
                    parentDropdown.classList.toggle('submenu-open'); // Toggle class on .dropdown

                    // Update aria-expanded for the specific dropdown toggle
                    const isSubmenuOpen = parentDropdown.classList.contains('submenu-open');
                    toggle.setAttribute('aria-expanded', isSubmenuOpen);
                    
                    // Optional: Change arrow direction (if you have an arrow element)
                    // const arrow = toggle.querySelector('.arrow-char') || toggle; // Assuming arrow is part of the toggle or a specific class
                    // if (arrow) {
                    //    arrow.innerHTML = isSubmenuOpen ? '&#9652;' : '&#9662;'; // Up/Down arrow
                    // }
                }
            }
            // On desktop, the default link behavior will proceed.
        });
    });

    // Helper function to close all submenus (used when main nav is closed)
    function closeAllSubmenus() {
        dropdownToggles.forEach(toggle => {
            const parentDropdown = toggle.closest('.dropdown');
            if (parentDropdown && parentDropdown.classList.contains('submenu-open')) {
                parentDropdown.classList.remove('submenu-open');
                toggle.setAttribute('aria-expanded', 'false');
                // Reset arrow if used
                // const arrow = toggle.querySelector('.arrow-char') || toggle;
                // if (arrow) {
                //    arrow.innerHTML = '&#9662;'; // Down arrow
                // }
            }
        });
    }

});
