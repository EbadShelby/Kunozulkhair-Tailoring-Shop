// Slideshow functionality
let slideIndex = 1;

// Initialize the slideshow when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add error handling for all images
  const slideImages = document.querySelectorAll('.slide img');
  slideImages.forEach(img => {
    // Use a placeholder if image fails to load
    img.onerror = function() {
      this.src = 'assets/images/logo.jpg'; // Fallback to the logo if image doesn't load
      this.onerror = null; // Prevent infinite loops
    };
  });
  
  showSlides(slideIndex);
  
  // Auto advance slides every 5 seconds
  setInterval(function() {
    changeSlide(1);
  }, 5000);
  
  // Improve arrow button accessibility and appearance
  const arrows = document.querySelectorAll('.prev, .next');
  arrows.forEach(arrow => {
    arrow.setAttribute('role', 'button');
    arrow.setAttribute('aria-label', arrow.classList.contains('prev') ? 'Previous slide' : 'Next slide');
    arrow.style.cursor = 'pointer';
  });
});

// Next/previous controls
function changeSlide(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName("slide");
  
  // Wrap around to first slide if we go past the end
  if (n > slides.length) {
    slideIndex = 1;
  }
  
  // Wrap around to last slide if we go before the beginning
  if (n < 1) {
    slideIndex = slides.length;
  }
  
  // Hide all slides
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  
  // Show the current slide
  slides[slideIndex-1].style.display = "block";
}

// Expose functions to the global scope for HTML onclick attributes
window.changeSlide = changeSlide;
window.currentSlide = currentSlide; 