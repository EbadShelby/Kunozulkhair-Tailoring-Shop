import { products } from '../data/products.js';
import { addToCart } from '../data/cart.js';

document.addEventListener('DOMContentLoaded', () => {
  // Get product ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  // DOM elements
  const productLoading = document.getElementById('product-loading');
  const productContent = document.getElementById('product-content');
  const productBreadcrumb = document.getElementById('product-breadcrumb');
  const productTitle = document.getElementById('product-title');
  const productPrice = document.getElementById('product-price');
  const productCategory = document.getElementById('product-category');
  const productFabric = document.getElementById('product-fabric');
  const productColor = document.getElementById('product-color');
  const productSizes = document.getElementById('product-sizes');
  const productDescription = document.getElementById('product-description');
  const productGallery = document.getElementById('product-gallery');
  const relatedProducts = document.getElementById('related-products');
  const ratingStars = document.getElementById('rating-stars');
  const ratingValue = document.getElementById('rating-value');
  const ratingCount = document.getElementById('rating-count');
  const thumbnailsContainer = document.querySelector('.product-detail__thumbnails');
  const mainImageContainer = document.querySelector('.product-detail__main-image');

  // Quantity controls
  const quantityInput = document.getElementById('quantity');
  const decreaseBtn = document.getElementById('decrease-quantity');
  const increaseBtn = document.getElementById('increase-quantity');

  // Action buttons
  const addToCartBtn = document.getElementById('add-to-cart');
  const buyNowBtn = document.getElementById('buy-now');

  // Modal elements
  const imageViewer = document.getElementById('image-viewer');
  const modalImage = document.getElementById('modal-image');
  const closeModal = document.querySelector('.close-modal');
  const prevButton = document.getElementById('prev-image');
  const nextButton = document.getElementById('next-image');

  // State
  let currentProduct = null;
  let selectedSize = null;
  let currentImageIndex = 0;
  let productImages = [];

  // Initialize
  init();

  function init() {
    if (!productId) {
      showError('Product not found');
      return;
    }

    loadProductDetails(productId);
    setupEventListeners();
  }

  function setupEventListeners() {
    // Quantity controls
    if (decreaseBtn) {
      decreaseBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
          quantityInput.value = currentValue - 1;
        }
      });
    }

    if (increaseBtn) {
      increaseBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue < 10) {
          quantityInput.value = currentValue + 1;
        }
      });
    }

    if (quantityInput) {
      quantityInput.addEventListener('change', () => {
        let value = parseInt(quantityInput.value);
        if (isNaN(value) || value < 1) {
          value = 1;
        } else if (value > 10) {
          value = 10;
        }
        quantityInput.value = value;
      });
    }

    // Add to cart button
    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', handleAddToCart);
    }

    // Buy now button
    if (buyNowBtn) {
      buyNowBtn.addEventListener('click', handleBuyNow);
    }

    // We don't need to add cart sidebar functionality here
    // as it's already handled in cart.js which is imported

    // Modal controls
    if (closeModal) {
      closeModal.addEventListener('click', () => {
        imageViewer.style.display = 'none';
      });
    }

    if (prevButton) {
      prevButton.addEventListener('click', showPreviousImage);
    }

    if (nextButton) {
      nextButton.addEventListener('click', showNextImage);
    }

    // Close modal when clicking outside the image
    window.addEventListener('click', (e) => {
      if (e.target === imageViewer) {
        imageViewer.style.display = 'none';
      }
    });

    // Keyboard navigation for modal
    window.addEventListener('keydown', (e) => {
      if (imageViewer.style.display === 'block') {
        if (e.key === 'ArrowLeft') {
          showPreviousImage();
        } else if (e.key === 'ArrowRight') {
          showNextImage();
        } else if (e.key === 'Escape') {
          imageViewer.style.display = 'none';
        }
      }
    });
  }

  function loadProductDetails(id) {
    // Show loading state
    if (productLoading) {
      productLoading.style.display = 'flex';
    }
    if (productContent) {
      productContent.style.display = 'none';
    }

    // Find product by ID
    const product = products.find(p => p.id == id);

    if (!product) {
      showError('Product not found');
      return;
    }

    currentProduct = product;

    // Just use the actual product image
    // In a real application with multiple product images, you would use those
    productImages = [product.image];

    // Update page title
    document.title = `${product.name} - Kunozulkhair Tailoring Shop`;

    // Update breadcrumb
    if (productBreadcrumb) {
      productBreadcrumb.textContent = product.name;
    }

    // Render product details
    renderProductDetails(product);

    // Load related products
    loadRelatedProducts(product);

    // Hide loading state
    if (productLoading) {
      productLoading.style.display = 'none';
    }
    if (productContent) {
      productContent.style.display = 'grid';
    }
  }

  function renderProductDetails(product) {
    // Set product title
    if (productTitle) {
      productTitle.textContent = product.name;
    }

    // Set product price
    if (productPrice) {
      productPrice.textContent = `₱${product.price.toLocaleString()}`;
    }

    // Set product category
    if (productCategory) {
      productCategory.textContent = `Category: ${product.category}`;
    }

    // Set product fabric
    if (productFabric) {
      productFabric.textContent = product.fabric;
    }

    // Set product color
    if (productColor) {
      // Clear previous content
      productColor.innerHTML = '<span class="label">Color:</span>';

      // Create color options container
      const colorOptionsContainer = document.createElement('div');
      colorOptionsContainer.className = 'color-options';

      // Only show the actual product color
      const colors = [
        { name: product.color, image: product.image }
      ];

      // Create color options
      colors.forEach((color, index) => {
        const colorOption = document.createElement('div');
        colorOption.className = `color-option ${index === 0 ? 'active' : ''}`;
        colorOption.dataset.color = color.name;

        const colorImage = document.createElement('div');
        colorImage.className = 'color-image';

        const img = document.createElement('img');
        img.src = color.image;
        img.alt = color.name;

        const colorName = document.createElement('span');
        colorName.className = 'color-name';
        colorName.textContent = color.name;

        colorImage.appendChild(img);
        colorOption.appendChild(colorImage);
        colorOption.appendChild(colorName);

        // Add click event
        colorOption.addEventListener('click', () => {
          // Remove active class from all color options
          document.querySelectorAll('.color-option').forEach(option => {
            option.classList.remove('active');
          });

          // Add active class to clicked option
          colorOption.classList.add('active');
        });

        colorOptionsContainer.appendChild(colorOption);
      });

      productColor.appendChild(colorOptionsContainer);
    }

    // Set product sizes
    if (productSizes) {
      productSizes.innerHTML = '';

      if (product.sizes && product.sizes.length > 0) {
        product.sizes.forEach(size => {
          const sizeBtn = document.createElement('button');
          sizeBtn.className = 'size-btn';
          sizeBtn.textContent = size;
          sizeBtn.dataset.size = size;

          sizeBtn.addEventListener('click', () => {
            // Remove active class from all size buttons
            document.querySelectorAll('.size-btn').forEach(btn => {
              btn.classList.remove('active');
            });

            // Add active class to clicked button
            sizeBtn.classList.add('active');

            // Update selected size
            selectedSize = size;
          });

          productSizes.appendChild(sizeBtn);
        });
      } else {
        productSizes.innerHTML = '<p>No sizes available</p>';
      }
    }

    // Set product description
    if (productDescription) {
      // Create a more detailed description based on the product category and type
      let categoryDescription = '';

      if (product.category === 'formal') {
        categoryDescription = `
          <p>This elegant formal dress is perfect for special occasions, galas, weddings, and formal events.
          The exquisite design and premium materials make it a standout piece in any formal setting.</p>
          <p>The tailoring is done with precision to ensure a perfect fit and elegant silhouette.
          Each detail has been carefully crafted to create a stunning and sophisticated look.</p>
        `;
      } else if (product.category === 'casual') {
        categoryDescription = `
          <p>This comfortable casual dress is perfect for everyday wear, casual outings, and relaxed gatherings.
          The versatile design makes it easy to dress up or down depending on the occasion.</p>
          <p>The relaxed fit and breathable fabric ensure all-day comfort without compromising on style.
          This piece is designed to be both practical and fashionable for your everyday wardrobe.</p>
        `;
      } else {
        categoryDescription = `
          <p>This beautiful ${product.name.toLowerCase()} is designed to make you look and feel your best.
          The thoughtful design elements and quality construction ensure a flattering fit and lasting wear.</p>
          <p>Available in various sizes, this piece is designed to provide both comfort and fashion.
          The tailoring is done with precision to ensure a perfect fit.</p>
        `;
      }

      const detailedDescription = `
        <p>${product.description}</p>
        ${categoryDescription}
        <ul>
          <li>Material: Premium ${product.fabric}</li>
          <li>Color: ${product.color}</li>
          <li>Available Sizes: ${product.sizes.map(s => s.toUpperCase()).join(', ')}</li>
          <li>Care Instructions: Hand wash or gentle machine wash</li>
          <li>Made in the Philippines</li>
        </ul>
      `;

      productDescription.innerHTML = detailedDescription;
    }

    // Set product rating
    if (ratingStars && ratingValue && ratingCount) {
      const rating = product.rating.rate;
      const count = product.rating.count;

      // Convert rating to stars
      const fullStars = Math.floor(rating);
      const hasHalfStar = rating % 1 >= 0.5;
      let starsHTML = '';

      for (let i = 0; i < fullStars; i++) {
        starsHTML += '★';
      }

      if (hasHalfStar) {
        starsHTML += '★';
      }

      const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
      for (let i = 0; i < emptyStars; i++) {
        starsHTML += '☆';
      }

      ratingStars.textContent = starsHTML;
      ratingValue.textContent = rating.toFixed(1);
      ratingCount.textContent = `(${count} reviews)`;
    }

    // Render product images
    renderProductImages(productImages);

    // Render product gallery
    renderProductGallery(productImages);
  }

  function renderProductImages(images) {
    if (!thumbnailsContainer || !mainImageContainer) return;

    // Clear containers
    thumbnailsContainer.innerHTML = '';
    mainImageContainer.innerHTML = '';

    // Add main image
    const mainImg = document.createElement('img');
    mainImg.src = images[0];
    mainImg.alt = currentProduct.name;
    mainImg.addEventListener('click', () => {
      openImageViewer(0);
    });
    mainImageContainer.appendChild(mainImg);

    // Since we only have one image, just add it as a thumbnail
    const thumbnailItem = document.createElement('div');
    thumbnailItem.className = 'thumbnail-item active';
    thumbnailItem.dataset.index = 0;

    const thumbnailImg = document.createElement('img');
    thumbnailImg.src = images[0];
    thumbnailImg.alt = `${currentProduct.name} - Thumbnail`;

    thumbnailItem.appendChild(thumbnailImg);
    thumbnailsContainer.appendChild(thumbnailItem);
  }

  function renderProductGallery(images) {
    if (!productGallery) return;

    // Clear container
    productGallery.innerHTML = '';

    // Since we only have one image, just add it to the gallery
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';

    const galleryImg = document.createElement('img');
    galleryImg.src = images[0];
    galleryImg.alt = `${currentProduct.name}`;

    galleryItem.appendChild(galleryImg);
    productGallery.appendChild(galleryItem);

    // Add click event to gallery item
    galleryItem.addEventListener('click', () => {
      openImageViewer(0);
    });
  }

  function loadRelatedProducts(product) {
    if (!relatedProducts) return;

    // Clear container
    relatedProducts.innerHTML = '';

    // Find related products (same category, excluding current product)
    const related = products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4); // Limit to 4 related products

    if (related.length === 0) {
      relatedProducts.innerHTML = '<p>No related products found</p>';
      return;
    }

    // Render related products
    related.forEach(relatedProduct => {
      const productCard = document.createElement('article');
      productCard.className = 'product-card';

      // Convert 5-star rating to 10-point scale
      const ratingOutOf10 = (relatedProduct.rating.rate * 2).toFixed(1);

      productCard.innerHTML = `
        <a href="product-detail.php?id=${relatedProduct.id}" class="product-image-link">
          <img src="${relatedProduct.image}" alt="${relatedProduct.name}" />
        </a>
        <div class="product-info">
          <a href="product-detail.php?id=${relatedProduct.id}" class="product-title-link">
            <h3>${relatedProduct.name}</h3>
          </a>
          <div class="product-meta">
            <div class="product-price">₱${relatedProduct.price.toLocaleString()}</div>
            <div class="product-rating">
              ⭐${ratingOutOf10}
              <span class="rating-count">(${relatedProduct.rating.count})</span>
            </div>
          </div>
          <button class="btn-cart" data-product-id="${relatedProduct.id}">View Details</button>
        </div>
      `;

      relatedProducts.appendChild(productCard);

      // Add click event to "View Details" button
      const viewDetailsBtn = productCard.querySelector('button');
      viewDetailsBtn.addEventListener('click', () => {
        window.location.href = `product-detail.php?id=${relatedProduct.id}`;
      });

      // Make the entire card clickable
      productCard.addEventListener('click', (e) => {
        if (e.target !== viewDetailsBtn) {
          window.location.href = `product-detail.php?id=${relatedProduct.id}`;
        }
      });
    });
  }

  function openImageViewer(index) {
    if (!imageViewer || !modalImage) return;

    // Set current image index
    currentImageIndex = index;

    // Set modal image
    modalImage.src = productImages[index];
    modalImage.alt = `${currentProduct.name}`;

    // Show modal
    imageViewer.style.display = 'block';
  }

  function showPreviousImage() {
    // Since we only have one image, this function doesn't need to do anything
    // but we'll keep it for future expansion
    modalImage.src = productImages[0];
    modalImage.alt = `${currentProduct.name}`;
  }

  function showNextImage() {
    // Since we only have one image, this function doesn't need to do anything
    // but we'll keep it for future expansion
    modalImage.src = productImages[0];
    modalImage.alt = `${currentProduct.name}`;
  }

  function handleAddToCart() {
    if (!currentProduct) return;

    // Check if size is selected (if product has sizes)
    if (currentProduct.sizes && currentProduct.sizes.length > 0 && !selectedSize) {
      alert('Please select a size');
      return;
    }

    // Get quantity
    const quantity = parseInt(quantityInput.value) || 1;

    // Add to cart with product details
    for (let i = 0; i < quantity; i++) {
      addToCart(currentProduct.name, currentProduct.price, currentProduct.image);
    }

    // Show success message
    const originalText = addToCartBtn.textContent;
    addToCartBtn.textContent = 'Added to Cart!';
    addToCartBtn.style.backgroundColor = '#4CAF50';

    // Open cart sidebar
    const cartSidebar = document.getElementById('cart-sidebar');
    if (cartSidebar) {
      cartSidebar.classList.add('open');
    }

    // Reset button after 1.5 seconds
    setTimeout(() => {
      addToCartBtn.textContent = originalText;
      addToCartBtn.style.backgroundColor = '';
    }, 1500);
  }

  function handleBuyNow() {
    if (!currentProduct) return;

    // Check if size is selected (if product has sizes)
    if (currentProduct.sizes && currentProduct.sizes.length > 0 && !selectedSize) {
      alert('Please select a size');
      return;
    }

    // Get quantity
    const quantity = parseInt(quantityInput.value) || 1;

    // Add to cart with product details
    for (let i = 0; i < quantity; i++) {
      addToCart(currentProduct.name, currentProduct.price, currentProduct.image);
    }

    // Store selected product details for checkout page
    const checkoutDetails = {
      productId: currentProduct.id,
      productName: currentProduct.name,
      productImage: currentProduct.image,
      productPrice: currentProduct.price,
      quantity: quantity,
      size: selectedSize || (currentProduct.sizes ? currentProduct.sizes[0] : null),
      color: currentProduct.color
    };

    // Store in sessionStorage for checkout page to access
    sessionStorage.setItem('checkoutDetails', JSON.stringify(checkoutDetails));

    // Redirect to checkout page
    window.location.href = 'checkout.php';
  }

  function showError(message) {
    if (productLoading) {
      productLoading.style.display = 'none';
    }

    if (productContent) {
      productContent.innerHTML = `
        <div class="error-message">
          <h2>Oops! Something went wrong</h2>
          <p>${message}</p>
          <a href="shop.php" class="btn-primary">Back to Shop</a>
        </div>
      `;
      productContent.style.display = 'block';
    }
  }
});
