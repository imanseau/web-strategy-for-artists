/*
  This script handles all modal (lightbox) functionality for the advanced gallery page.
  It enables users to click on any gallery image to view a larger version in a modal overlay,
  and provides multiple ways to close the modal for accessibility and usability.
*/

// Select all gallery images that should trigger the modal
const galleryImages = document.querySelectorAll('.gallery-image');

// Select modal elements for manipulation
const modal = document.getElementById('modal');
const modalImage = document.querySelector('.modal-image');
const closeButton = document.querySelector('.close-button');
const modalOverlay = document.querySelector('.modal-overlay');

// Helper function to open the modal with the correct image
function openModal(imgSrc, imgAlt) {
  // Set the modal image's src and alt attributes to match the clicked image
  modalImage.src = imgSrc;
  modalImage.alt = imgAlt;
  // Add the 'active' class to display the modal (handled by CSS)
  modal.classList.add('active');
  // Prevent background scrolling when modal is open
  document.body.style.overflow = 'hidden';
}

// Helper function to close the modal and reset state
function closeModal() {
  // Remove the 'active' class to hide the modal
  modal.classList.remove('active');
  // Remove the image src to avoid loading unnecessary images
  modalImage.src = '';
  // Restore background scrolling
  document.body.style.overflow = '';
}

// Add click event listeners to all gallery images
galleryImages.forEach(function(img) {
  img.addEventListener('click', function(event) {
    // When an image is clicked, open the modal with the correct image
    openModal(img.src, img.alt);
  });
});

// Add click event listener to the close button (the "X")
closeButton.addEventListener('click', function(event) {
  closeModal();
});

// Add click event listener to the modal overlay (background)
// Clicking outside the modal content closes the modal
modalOverlay.addEventListener('click', function(event) {
  closeModal();
});

// Optional: Allow closing modal with Escape key for accessibility
document.addEventListener('keydown', function(event) {
  if (modal.classList.contains('active') && (event.key === 'Escape' || event.key === 'Esc')) {
    closeModal();
  }
});

/*
  Notes:
  - All event listeners are attached after DOMContentLoaded by default since this script is loaded at the end of <body>.
  - The modal is accessible: it can be closed by close button, overlay click, or Escape key.
  - The modal image src is cleared on close to avoid unnecessary network usage.
  - The body's overflow is set to 'hidden' while modal is open to prevent background scrolling.
*/
