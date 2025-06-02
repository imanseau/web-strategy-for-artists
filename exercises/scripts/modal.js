// ------------------------------------------------------------
// JavaScript to control modal popup behavior
// ------------------------------------------------------------
// This script enables:
// 1. Opening the modal when the thumbnail is clicked
// 2. Closing the modal when the "X" button is clicked
// 3. Closing the modal when the background overlay is clicked
// ------------------------------------------------------------

// Get references to important DOM elements
const thumbnail = document.querySelector('.thumbnail');  // The small image
const modal = document.getElementById('modal');          // Modal container
const overlay = document.querySelector('.modal-overlay'); // The dark background
const closeBtn = document.querySelector('.close-button'); // The close "X" button

// When thumbnail is clicked, show the modal
thumbnail.addEventListener('click', () => {
  modal.style.display = 'block'; // Make modal visible
});

// When "X" is clicked, hide the modal
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none'; // Hide modal
});

// When overlay (outside the image) is clicked, also hide the modal
overlay.addEventListener('click', () => {
  modal.style.display = 'none'; // Hide modal
});
