import { products } from '../data/products.js';

// Function to render products to the shop page
document.addEventListener("DOMContentLoaded", () => {
  // Check URL parameters for category and sort
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  const sortParam = urlParams.get('sort');

  // State management
  const state = {
    filters: {
      category: categoryParam ? [categoryParam] : [],
      fabric: [],
      color: [],
      size: [],
      priceMin: 0,
      priceMax: 5000
    },
    sort: sortParam || "default",
    infiniteScroll: {
      currentIndex: 0,
      productsPerLoad: 12,
      isLoading: false,
      allLoaded: false
    },
  };

  // DOM Elements
  const productsContainer = document.getElementById("shop-products");
  const sortSelect = document.getElementById("sort-by");
  const scrollLoader = document.getElementById("scroll-loader");
  const priceRangeSlider = document.getElementById("price-range");
  const priceValueDisplay = document.getElementById("price-value");
  const minPriceInput = document.getElementById("min-price");
  const maxPriceInput = document.getElementById("max-price");
  const resetFiltersBtn = document.getElementById("reset-filters");
  const toggleFiltersBtn = document.getElementById("toggle-filters");
  const filtersContainer = document.querySelector(".shop-filters");

  // Initialize the shop
  init();

  function init() {
    // Setup event listeners
    setupEventListeners();

    // Check for URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search');
    const categoryParam = urlParams.get('category');
    const sortParam = urlParams.get('sort');

    // Update UI based on URL parameters
    if (searchTerm) {
      // Set search term in the header search input
      const headerSearchInput = document.querySelector('.header__search-input');
      if (headerSearchInput) {
        headerSearchInput.value = searchTerm;
      }

      // Create a search filter section at the top of the products
      createSearchFilterSection(searchTerm);
    }

    // Update category checkboxes based on URL parameter
    if (categoryParam) {
      const checkbox = document.getElementById(categoryParam);
      if (checkbox) {
        checkbox.checked = true;
      }
    }

    // Update sort dropdown based on URL parameter
    if (sortParam && sortSelect) {
      sortSelect.value = sortParam;
    }

    // Render initial products
    renderProducts();

    // Setup infinite scroll
    setupInfiniteScroll();
  }

  /**
   * Create a search filter section to show the search term and results
   * @param {string} searchTerm - The search term from the URL
   */
  function createSearchFilterSection(searchTerm) {
    // Create search filter section if it doesn't exist
    if (!document.getElementById('search-filter-section')) {
      const searchFilterSection = document.createElement('div');
      searchFilterSection.id = 'search-filter-section';
      searchFilterSection.className = 'search-filter-section';

      // Get filtered products count
      const filteredProducts = getFilteredProductsBySearch(searchTerm);

      searchFilterSection.innerHTML = `
        <div class="search-filter-header">
          <h3>Search results for: "${searchTerm}"</h3>
          <p>${filteredProducts.length} products found</p>
        </div>
        <button id="clear-search" class="clear-search-btn">Clear Search</button>
      `;

      // Insert before the shop-products div
      const shopProductsSection = document.querySelector('.shop-products-section');
      if (shopProductsSection) {
        shopProductsSection.insertBefore(searchFilterSection, shopProductsSection.firstChild);

        // Add event listener to clear search button
        document.getElementById('clear-search').addEventListener('click', () => {
          // Remove search parameter from URL without refreshing the page
          const url = new URL(window.location.href);
          url.searchParams.delete('search');
          window.history.pushState({}, '', url);

          // Remove search filter section
          searchFilterSection.remove();

          // Reset header search input
          const headerSearchInput = document.querySelector('.header__search-input');
          if (headerSearchInput) {
            headerSearchInput.value = '';
          }

          // Reset filters and re-render products
          resetFilters();
        });
      }
    }
  }


  function setupEventListeners() {

    // Sort change
    if (sortSelect) {
      sortSelect.addEventListener("change", () => {
        state.sort = sortSelect.value;
        resetInfiniteScroll();
        renderProducts();
      });
    }

    // Category filters
    document.querySelectorAll('input[name="category"]').forEach(checkbox => {
      checkbox.addEventListener("change", () => {
        updateFilterArray("category", checkbox.value, checkbox.checked);
        resetInfiniteScroll();
        renderProducts();
      });
    });

    // Fabric filters
    document.querySelectorAll('input[name="fabric"]').forEach(checkbox => {
      checkbox.addEventListener("change", () => {
        updateFilterArray("fabric", checkbox.value, checkbox.checked);
        resetInfiniteScroll();
        renderProducts();
      });
    });

    // Color filters
    document.querySelectorAll('input[name="color"]').forEach(checkbox => {
      checkbox.addEventListener("change", () => {
        updateFilterArray("color", checkbox.value, checkbox.checked);
        resetInfiniteScroll();
        renderProducts();
      });
    });

    // Size filters
    document.querySelectorAll('.size-btn').forEach(button => {
      button.addEventListener("click", () => {
        const size = button.dataset.size;
        if (button.classList.contains("active")) {
          button.classList.remove("active");
          state.filters.size = state.filters.size.filter(s => s !== size);
        } else {
          button.classList.add("active");
          state.filters.size.push(size);
        }
        resetInfiniteScroll();
        renderProducts();
      });
    });

    // Price slider
    if (priceRangeSlider) {
      priceRangeSlider.addEventListener("input", () => {
        const value = priceRangeSlider.value;
        if (priceValueDisplay) priceValueDisplay.textContent = value;
      });
      priceRangeSlider.addEventListener("change", () => {
        const value = priceRangeSlider.value;
        state.filters.priceMax = parseInt(value);
        resetInfiniteScroll();
        renderProducts();
      });
    }

    // Min/Max price inputs
    if (minPriceInput) {
      minPriceInput.addEventListener("change", () => {
        state.filters.priceMin = parseInt(minPriceInput.value) || 0;
        resetInfiniteScroll();
        renderProducts();
      });
    }

    if (maxPriceInput) {
      maxPriceInput.addEventListener("change", () => {
        state.filters.priceMax = parseInt(maxPriceInput.value) || 5000;
        resetInfiniteScroll();
        renderProducts();
      });
    }

    // Reset filters
    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener("click", resetFilters);
    }

    // Toggle filters on mobile
    if (toggleFiltersBtn) {
      toggleFiltersBtn.addEventListener("click", () => {
        filtersContainer.classList.toggle("open");
      });
    }

    // Filter header click to toggle on mobile
    const filterHeader = document.querySelector(".filter-header");
    if (filterHeader && window.innerWidth <= 768) {
      filterHeader.addEventListener("click", () => {
        filtersContainer.classList.toggle("open");
      });
    }
  }

  function updateFilterArray(filterType, value, isChecked) {
    if (isChecked) {
      if (!state.filters[filterType].includes(value)) {
        state.filters[filterType].push(value);
      }
    } else {
      state.filters[filterType] = state.filters[filterType].filter(item => item !== value);
    }
  }

  // No longer needed with infinite scroll

  function resetFilters() {
    // Reset filter state
    state.filters = {
      category: [],
      fabric: [],
      color: [],
      size: [],
      priceMin: 0,
      priceMax: 5000
    };

    // Reset UI
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      checkbox.checked = false;
    });

    document.querySelectorAll('.size-btn').forEach(button => {
      button.classList.remove("active");
    });

    if (minPriceInput) minPriceInput.value = "";
    if (maxPriceInput) maxPriceInput.value = "";
    if (priceRangeSlider) priceRangeSlider.value = 5000;
    if (priceValueDisplay) priceValueDisplay.textContent = "5000";

    // Reset infinite scroll
    resetInfiniteScroll();

    // Re-render
    renderProducts();
  }

  function resetInfiniteScroll() {
    state.infiniteScroll.currentIndex = 0;
    state.infiniteScroll.isLoading = false;
    state.infiniteScroll.allLoaded = false;

    if (scrollLoader) {
      scrollLoader.classList.remove('active');
    }
  }

  /**
   * Filter products by search term
   * @param {string} searchTerm - The search term to filter by
   * @returns {Array} - Array of products that match the search term
   */
  function getFilteredProductsBySearch(searchTerm) {
    if (!searchTerm) return products;

    searchTerm = searchTerm.toLowerCase();

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

  function getFilteredProducts() {
    // Get search term from URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search');

    // First filter by search term if present
    let filteredBySearch = searchTerm ? getFilteredProductsBySearch(searchTerm) : products;

    // Then apply other filters
    return filteredBySearch.filter(product => {
      const { category, fabric, color, size, priceMin, priceMax } = state.filters;
      const price = product.price;

      // Filter by price
      if (price < priceMin || price > priceMax) {
        return false;
      }

      // Filter by category (if categories are selected)
      if (category.length > 0 && !category.includes(product.category)) {
        return false;
      }

      // Filter by fabric (if fabrics are selected)
      if (fabric.length > 0 && !fabric.includes(product.fabric)) {
        return false;
      }

      // Filter by color (if colors are selected)
      if (color.length > 0 && !color.includes(product.color)) {
        return false;
      }

      // Filter by size (if sizes are selected)
      if (size.length > 0 && (!product.sizes || !size.some(s => product.sizes.includes(s)))) {
        return false;
      }

      return true;
    });
  }

  function getSortedProducts(filteredProducts) {
    const sorted = [...filteredProducts];

    switch (state.sort) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price);
      case "name-az":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "name-za":
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case "newest":
        // Assuming products have a date field
        return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
      case "popularity":
        // Sort by rating count
        return sorted.sort((a, b) => b.rating.count - a.rating.count);
      default:
        return sorted;
    }
  }

  function getProductsToShow() {
    const filteredProducts = getFilteredProducts();
    const sortedProducts = getSortedProducts(filteredProducts);

    // For initial load or filter/sort changes
    if (state.infiniteScroll.currentIndex === 0) {
      return {
        products: sortedProducts.slice(0, state.infiniteScroll.productsPerLoad),
        hasMore: sortedProducts.length > state.infiniteScroll.productsPerLoad
      };
    }

    // For loading more products
    const startIndex = state.infiniteScroll.currentIndex;
    const endIndex = startIndex + state.infiniteScroll.productsPerLoad;

    return {
      products: sortedProducts.slice(startIndex, endIndex),
      hasMore: sortedProducts.length > endIndex
    };
  }

  function renderProducts(append = false) {
    if (!productsContainer) return;

    const { products: productsToShow, hasMore } = getProductsToShow();

    // Update state
    state.infiniteScroll.allLoaded = !hasMore;

    // Clear container if not appending
    if (!append) {
      productsContainer.innerHTML = "";
    }

    if (productsToShow.length === 0 && !append) {
      productsContainer.innerHTML = `
        <div class="no-products">
          <p>No products match your filters. Please try different criteria.</p>
        </div>
      `;
      return;
    }

    // Generate HTML for products
    productsToShow.forEach(product => {
      const productEl = document.createElement("article");
      productEl.className = "product-card";
      productEl.dataset.productId = product.id;

      // Convert 5-star rating to 10-point scale
      const ratingOutOf10 = (product.rating.rate * 2).toFixed(1);

      productEl.innerHTML = `
          <a href="product-detail.php?id=${product.id}" class="product-image-link">
            <img src="${product.image}" alt="${product.name}" />
          </a>
        <div class="product-info">
          <a href="product-detail.php?id=${product.id}" class="product-title-link">
            <h3>${product.name}</h3>
          </a>
          <div class="product-meta">
            <div class="product-price">₱${product.price.toLocaleString()}</div>
            <div class="product-rating">
              ⭐${ratingOutOf10}
              <span class="rating-count">(${product.rating.count})</span>
            </div>
          </div>
          <button data-product-id="${product.id}">Add to Cart</button>
        </div>
        `;

      productsContainer.appendChild(productEl);
    });

    // Add event listeners to all "Add to Cart" buttons
    document.querySelectorAll(".product-card button").forEach((button) => {
      button.addEventListener("click", async () => {
        const productId = button.dataset.productId;

        // Add visual feedback immediately
        const originalText = button.innerText;
        button.innerText = "Adding...";
        button.disabled = true;

        try {
          // Use the global addToCart function from cart.js
          if (typeof window.addToCart === 'function') {
            const result = await window.addToCart(productId);

            if (result.success) {
              button.innerText = "Added!";
              button.classList.add("added-to-cart");
            } else {
              button.innerText = "Error";
              button.classList.add("error");
            }
          } else {
            console.error('addToCart function not found');
            button.innerText = "Error";
            button.classList.add("error");
          }
        } catch (error) {
          console.error('Error adding to cart:', error);
          button.innerText = "Error";
          button.classList.add("error");
        }

        // Reset button after 1.5 seconds
        setTimeout(() => {
          button.innerText = originalText;
          button.classList.remove("added-to-cart");
          button.classList.remove("error");
          button.disabled = false;
        }, 1500);
      });
    });

    // Update current index if appending
    if (append) {
      state.infiniteScroll.currentIndex += state.infiniteScroll.productsPerLoad;
    } else {
      state.infiniteScroll.currentIndex = productsToShow.length;
    }

    // Hide loader if all products are loaded
    if (state.infiniteScroll.allLoaded && scrollLoader) {
      scrollLoader.classList.remove('active');
    }

    // Set loading state to false
    state.infiniteScroll.isLoading = false;
  }

  function setupInfiniteScroll() {
    // Add scroll event listener for infinite scrolling
    window.addEventListener('scroll', () => {
      // If already loading or all products loaded, don't do anything
      if (state.infiniteScroll.isLoading || state.infiniteScroll.allLoaded) {
        return;
      }

      // Check if we're near the bottom of the page
      const scrollPosition = window.innerHeight + window.scrollY;
      const bodyHeight = document.body.offsetHeight;
      const scrollThreshold = bodyHeight - 500; // Load more when 500px from bottom

      if (scrollPosition >= scrollThreshold) {
        loadMoreProducts();
      }
    });

    // Function to load more products
    function loadMoreProducts() {
      // Set loading state
      state.infiniteScroll.isLoading = true;

      // Show loader
      if (scrollLoader) {
        scrollLoader.classList.add('active');
      }

      // Simulate network delay (can be removed in production)
      setTimeout(() => {
        // Append more products
        renderProducts(true);
      }, 500);
    }
  }
});
