// set up the carousel
const track = document.querySelector(".ads-carousel__track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".ads-carousel__button--right");
const prevButton = document.querySelector(".ads-carousel__button--left");
const dotsNav = document.querySelector(".ads-carousel__nav");
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

// Arrange the slides next to one another
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
  if (!targetSlide) return;
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  currentSlide.classList.remove("ads-carousel__current-slide");
  targetSlide.classList.add("ads-carousel__current-slide");
};

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("ads-carousel__indicator--active");
  targetDot.classList.add("ads-carousel__indicator--active");
};

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add("is-hidden");
    nextButton.classList.remove("is-hidden");
  } else if (targetIndex === slides.length - 1) {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.add("is-hidden");
  } else {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.remove("is-hidden");
  }
};

// Move slides to the left
prevButton.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".ads-carousel__current-slide");
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector(".ads-carousel__indicator--active");
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex((slide) => slide === prevSlide);

  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  hideShowArrows(slides, prevButton, nextButton, prevIndex);
});

// Move slides to the right
nextButton.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".ads-carousel__current-slide");
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector(".ads-carousel__indicator--active");
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex((slide) => slide === nextSlide);

  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(slides, prevButton, nextButton, nextIndex);
});

// Move slides using dots
dotsNav.addEventListener("click", (e) => {
  const targetDot = e.target.closest("button");
  if (!targetDot) return;

  const currentSlide = track.querySelector(".ads-carousel__current-slide");
  const currentDot = dotsNav.querySelector(".ads-carousel__indicator--active");
  const targetIndex = dots.findIndex((dot) => dot === targetDot);

  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideShowArrows(slides, prevButton, nextButton, targetIndex);
});

// Initialize featured products carousel
document.addEventListener("DOMContentLoaded", () => {
  // Add event listeners to all "Add to Cart" buttons
  document.querySelectorAll(".btn-cart").forEach((button) => {
    button.addEventListener("click", (e) => {
      // Prevent the click from bubbling up to the product card
      e.stopPropagation();

      const productId = button.dataset.productId;

      // Use the cart.js addToCart function with product ID
      // Make sure the addToCart function is available from cart.js
      if (typeof addToCart === 'function') {
        addToCart(productId);
      } else {
        console.error('addToCart function not found. Make sure cart.js is loaded properly.');
      }

      // Add visual feedback
      const originalText = button.innerText;
      button.innerText = "Added!";
      button.classList.add("added-to-cart");

      // Reset button after 1.5 seconds
      setTimeout(() => {
        button.innerText = originalText;
        button.classList.remove("added-to-cart");
      }, 1500);
    });
  });

  // Make the entire product card clickable
  document.querySelectorAll(".featured-product-slide").forEach((card) => {
    card.addEventListener("click", (e) => {
      // Don't navigate if the click was on the Add to Cart button
      if (e.target.closest('.btn-cart')) return;

      const productId = card.dataset.productId;
      window.location.href = `product-detail.php?id=${productId}`;
    });
  });

  // Initialize featured products carousel
  const featuredTrack = document.querySelector(".featured-product-track");
  if (featuredTrack && featuredTrack.children.length > 0) {
    const featuredSlides = Array.from(featuredTrack.children);
    const featuredNextButton = document.querySelector(
      ".featured-product_carousel-button--right"
    );
    const featuredPrevButton = document.querySelector(
      ".featured-product_carousel-button--left"
    );

    let currentIndex = 0;
    const visibleSlides = 4; // Reduced from 6 to 4 for better visibility
    const totalSlides = featuredSlides.length;

    // Only proceed if we have slides
    if (totalSlides > 0) {
      const featuredSlideWidth = featuredSlides[0].getBoundingClientRect().width;
      const maxIndex = Math.ceil(totalSlides / visibleSlides) - 1;

      featuredNextButton.addEventListener("click", () => {
        if (currentIndex < maxIndex) {
          currentIndex++;
          moveFeaturedTrack();
        }
      });

      featuredPrevButton.addEventListener("click", () => {
        if (currentIndex > 0) {
          currentIndex--;
          moveFeaturedTrack();
        }
      });

      function moveFeaturedTrack() {
        const amountToMove = featuredSlideWidth * visibleSlides * currentIndex;
        featuredTrack.style.transform = `translateX(-${amountToMove}px)`;
      }
    }
  }
});
