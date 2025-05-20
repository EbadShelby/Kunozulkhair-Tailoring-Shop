/**
 * Search functionality for KunoZulkhair Tailoring & Dress Shop
 * This file handles the search functionality for the website
 * It's designed to be ready for future backend integration with PHP and MySQL
 */

import { products } from '../data/products.js';

// DOM Elements
let searchInput;
let searchButton;
let searchResultsContainer;
let searchModal;
let closeSearchModal;

// Initialize search functionality
document.addEventListener('DOMContentLoaded', () => {
  // Get DOM elements
  searchInput = document.querySelector('.header__search-input');
  searchButton = document.querySelector('.header__search--btn');

  // Create search results modal if it doesn't exist
  if (!document.getElementById('search-results-modal')) {
    createSearchModal();
  }

  searchModal = document.getElementById('search-results-modal');
  searchResultsContainer = document.getElementById('search-results-container');
  closeSearchModal = document.getElementById('close-search-modal');

  // Add event listeners
  if (searchButton) {
    searchButton.addEventListener('click', handleSearch);
  }

  if (searchInput) {
    searchInput.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        handleSearch();
      }
    });
  }

  if (closeSearchModal) {
    closeSearchModal.addEventListener('click', () => {
      searchModal.style.display = 'none';
    });
  }

  // Close modal when clicking outside
  window.addEventListener('click', (event) => {
    if (event.target === searchModal) {
      searchModal.style.display = 'none';
    }
  });
});

/**
 * Handle search functionality
 * This function will be called when the user clicks the search button or presses Enter
 */
function handleSearch() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  if (!searchTerm) {
    return; // Don't search if the input is empty
  }

  // Redirect to shop page with search query parameter
  window.location.href = `shop.php?search=${encodeURIComponent(searchTerm)}`;
}

/**
 * Search products based on search term
 * @param {string} searchTerm - The search term entered by the user
 * @returns {Array} - Array of products that match the search term
 */
function searchProducts(searchTerm) {
  // This function would be replaced with an API call in a real backend implementation
  return products.filter(product => {
    // Search in product name
    if (product.name.toLowerCase().includes(searchTerm)) {
      return true;
    }

    // Search in product description
    if (product.description.toLowerCase().includes(searchTerm)) {
      return true;
    }

    // Search in product category
    if (product.category.toLowerCase().includes(searchTerm)) {
      return true;
    }

    // Search in product fabric
    if (product.fabric.toLowerCase().includes(searchTerm)) {
      return true;
    }

    // Search in product color
    if (product.color.toLowerCase().includes(searchTerm)) {
      return true;
    }

    return false;
  });
}

/**
 * Display search results in the modal
 * @param {Array} results - Array of products that match the search term
 * @param {string} searchTerm - The search term entered by the user
 */
function displaySearchResults(results, searchTerm) {
  // Clear previous results
  searchResultsContainer.innerHTML = '';

  // Show the modal
  searchModal.style.display = 'block';

  // Display search term
  const searchTermElement = document.createElement('h3');
  searchTermElement.textContent = `Search results for: "${searchTerm}"`;
  searchResultsContainer.appendChild(searchTermElement);

  // Display number of results
  const resultsCountElement = document.createElement('p');
  resultsCountElement.textContent = `${results.length} results found`;
  searchResultsContainer.appendChild(resultsCountElement);

  // If no results found
  if (results.length === 0) {
    const noResultsElement = document.createElement('div');
    noResultsElement.className = 'no-results';
    noResultsElement.innerHTML = `
      <p>No products match your search. Please try a different search term.</p>
    `;
    searchResultsContainer.appendChild(noResultsElement);
    return;
  }

  // Create results grid
  const resultsGrid = document.createElement('div');
  resultsGrid.className = 'search-results-grid';

  // Add each product to the grid
  results.forEach(product => {
    const productCard = createProductCard(product);
    resultsGrid.appendChild(productCard);
  });

  searchResultsContainer.appendChild(resultsGrid);
}

/**
 * Create a product card element
 * @param {Object} product - Product object
 * @returns {HTMLElement} - Product card element
 */
function createProductCard(product) {
  const productCard = document.createElement('div');
  productCard.className = 'search-product-card';

  // Convert 5-star rating to 10-point scale
  const ratingOutOf10 = (product.rating.rate * 2).toFixed(1);

  productCard.innerHTML = `
    <a href="product-detail.php?id=${product.id}" class="search-product-link">
      <img src="${product.image}" alt="${product.name}" class="search-product-image">
      <div class="search-product-info">
        <h4 class="search-product-name">${product.name}</h4>
        <div class="search-product-meta">
          <div class="search-product-price">₱${product.price.toLocaleString()}</div>
          <div class="search-product-rating">
            ⭐${ratingOutOf10}
            <span class="rating-count">(${product.rating.count})</span>
          </div>
        </div>
        <button class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
      </div>
    </a>
  `;

  // Add event listener to the Add to Cart button after the card is created
  setTimeout(() => {
    const addToCartBtn = productCard.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        addToCart(product);
        addToCartBtn.textContent = 'Added to Cart';
        addToCartBtn.classList.add('added-to-cart');

        // Reset button after 2 seconds
        setTimeout(() => {
          addToCartBtn.textContent = 'Add to Cart';
          addToCartBtn.classList.remove('added-to-cart');
        }, 2000);
      });
    }
  }, 0);

  return productCard;
}

/**
 * Add product to cart
 * @param {Object} product - Product to add to cart
 */
function addToCart(product) {
  // This function would be replaced with an actual cart implementation
  // For now, we'll just log to the console
  console.log('Added to cart:', product);

  // If there's an existing cart implementation, use it
  if (typeof window.addToCart === 'function') {
    window.addToCart(product.id, 1);
  } else {
    // Try to find the cart in localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if product is already in cart
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
      // Increment quantity if product already exists
      cart[existingProductIndex].quantity += 1;
    } else {
      // Add new product to cart
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }

    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count if the function exists
    if (typeof updateCartCount === 'function') {
      updateCartCount();
    }
  }
}

/**
 * Create search modal
 * This function creates the search modal that will display search results
 */
function createSearchModal() {
  const modal = document.createElement('div');
  modal.id = 'search-results-modal';
  modal.className = 'search-modal';

  modal.innerHTML = `
    <div class="search-modal-content">
      <div class="search-modal-header">
        <h2>Search Results</h2>
        <button id="close-search-modal" class="close-search-modal">&times;</button>
      </div>
      <div id="search-results-container" class="search-results-container"></div>
    </div>
  `;

  document.body.appendChild(modal);
}

/**
 * Truncate text to a specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length of the text
 * @returns {string} - Truncated text
 */
function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }

  return text.substring(0, maxLength) + '...';
}
