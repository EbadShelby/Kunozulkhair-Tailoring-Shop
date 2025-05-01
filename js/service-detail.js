// FAQ Accordion and Cart Functionality
document.addEventListener('DOMContentLoaded', () => {
  // Cart functionality
  initializeCart();
  
  // FAQ Accordion functionality
  initializeFaqAccordion();
  
  // Gallery lightbox functionality (if exists)
  initializeGalleryLightbox();
});

function initializeCart() {
  const cartIconContainer = document.getElementById('cart-icon');
  const cartSidebar = document.getElementById('cart-sidebar');
  const closeCart = document.getElementById('close-cart');
  
  if (!cartIconContainer || !cartSidebar) return;
  
  // Make sure the cart sidebar has the right styles
  const style = document.createElement('style');
  style.textContent = `
    .cart-sidebar {
      position: fixed !important;
      top: 0 !important;
      right: -400px !important;
      width: 300px !important;
      height: 100% !important;
      background: white !important;
      box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1) !important;
      padding: 20px !important;
      transition: right 0.3s ease !important;
      z-index: 9999 !important;
    }
    .cart-sidebar.open {
      right: 0 !important;
    }
  `;
  document.head.appendChild(style);
  
  // Add click handler to cart icon using addEventListener for better compatibility
  cartIconContainer.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    cartSidebar.classList.toggle('open');
    console.log('Cart toggled:', cartSidebar.classList.contains('open'));
  });
  
  // Use event delegation to ensure clicks work everywhere on the cart icon
  const cartButton = cartIconContainer.querySelector('button');
  if (cartButton) {
    cartButton.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      cartSidebar.classList.toggle('open');
    });
  }
  
  // Add click handler to close button
  if (closeCart) {
    closeCart.addEventListener('click', function() {
      cartSidebar.classList.remove('open');
    });
  }
  
  // Close cart when clicking outside
  document.addEventListener('click', function(e) {
    if (cartSidebar.classList.contains('open') && 
        !cartSidebar.contains(e.target) && 
        !cartIconContainer.contains(e.target)) {
      cartSidebar.classList.remove('open');
    }
  });
}

function initializeFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;
    
    question.addEventListener('click', () => {
      // Toggle active class on the clicked item
      item.classList.toggle('active');
      
      // Close other FAQ items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });
    });
  });
}

function initializeGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item img');
  
  if (galleryItems.length > 0) {
    galleryItems.forEach(img => {
      img.addEventListener('click', () => {
        // Create lightbox
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        
        // Create lightbox content
        const lightboxContent = document.createElement('div');
        lightboxContent.className = 'lightbox-content';
        
        // Create image
        const lightboxImg = document.createElement('img');
        lightboxImg.src = img.src;
        
        // Create close button
        const closeBtn = document.createElement('span');
        closeBtn.className = 'lightbox-close';
        closeBtn.innerHTML = '&times;';
        
        // Append elements
        lightboxContent.appendChild(lightboxImg);
        lightboxContent.appendChild(closeBtn);
        lightbox.appendChild(lightboxContent);
        document.body.appendChild(lightbox);
        
        // Add active class to show lightbox
        setTimeout(() => {
          lightbox.classList.add('active');
        }, 10);
        
        // Close lightbox on click
        lightbox.addEventListener('click', (e) => {
          if (e.target === lightbox || e.target === closeBtn) {
            lightbox.classList.remove('active');
            setTimeout(() => {
              document.body.removeChild(lightbox);
            }, 300);
          }
        });
      });
    });
    
    // Add lightbox styles
    const style = document.createElement('style');
    style.textContent = `
      .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .lightbox.active {
        opacity: 1;
      }
      
      .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
      }
      
      .lightbox-content img {
        max-width: 100%;
        max-height: 90vh;
        display: block;
        margin: 0 auto;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
      }
      
      .lightbox-close {
        position: absolute;
        top: -30px;
        right: 0;
        color: white;
        font-size: 30px;
        cursor: pointer;
      }
    `;
    document.head.appendChild(style);
  }
} 