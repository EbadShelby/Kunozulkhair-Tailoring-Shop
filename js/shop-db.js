// Shop database functionality

// State management
const state = {
  filters: {
    category: [],
    fabric: [],
    color: [],
    size: [],
    priceMin: 0,
    priceMax: 5000
  },
  sort: "default",
  infiniteScroll: {
    currentPage: 1,
    productsPerPage: 12,
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
const loadingProducts = document.getElementById("loading-products");

// Initialize the shop
document.addEventListener("DOMContentLoaded", () => {
  init();
});

function init() {
  // Setup event listeners
  setupEventListeners();

  // Check for URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const searchTerm = urlParams.get('search');
  const categoryParam = urlParams.get('category');
  const sortParam = urlParams.get('sort');

  // Update state based on URL parameters
  if (categoryParam) {
    state.filters.category = [categoryParam];
    // Check the corresponding checkbox
    const categoryCheckbox = document.getElementById(categoryParam);
    if (categoryCheckbox) {
      categoryCheckbox.checked = true;
    }
  }

  if (sortParam) {
    state.sort = sortParam;
    // Update sort select
    if (sortSelect) {
      sortSelect.value = sortParam;
    }
  }

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

  // Load initial products
  loadProducts();
}

function setupEventListeners() {
  // Sort select
  if (sortSelect) {
    sortSelect.addEventListener("change", handleSortChange);
  }

  // Category filters
  document.querySelectorAll('input[name="category"]').forEach(checkbox => {
    checkbox.addEventListener("change", handleCategoryFilterChange);
  });

  // Fabric filters
  document.querySelectorAll('input[name="fabric"]').forEach(checkbox => {
    checkbox.addEventListener("change", handleFabricFilterChange);
  });

  // Color filters
  document.querySelectorAll('input[name="color"]').forEach(checkbox => {
    checkbox.addEventListener("change", handleColorFilterChange);
  });

  // Size filters
  document.querySelectorAll('.size-btn').forEach(button => {
    button.addEventListener("click", handleSizeFilterChange);
  });

  // Price range slider
  if (priceRangeSlider) {
    priceRangeSlider.addEventListener("input", handlePriceRangeChange);
  }

  // Min price input
  if (minPriceInput) {
    minPriceInput.addEventListener("change", handleMinPriceChange);
  }

  // Max price input
  if (maxPriceInput) {
    maxPriceInput.addEventListener("change", handleMaxPriceChange);
  }

  // Reset filters button
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener("click", resetFilters);
  }

  // Toggle filters button (mobile)
  if (toggleFiltersBtn) {
    toggleFiltersBtn.addEventListener("click", toggleFilters);
  }

  // Infinite scroll
  window.addEventListener("scroll", handleScroll);
}

// Event Handlers
function handleSortChange(e) {
  state.sort = e.target.value;
  resetProductsAndLoad();
}

function handleCategoryFilterChange(e) {
  const { value, checked } = e.target;

  if (checked) {
    state.filters.category.push(value);
  } else {
    state.filters.category = state.filters.category.filter(cat => cat !== value);
  }

  resetProductsAndLoad();
}

function handleFabricFilterChange(e) {
  const { value, checked } = e.target;

  if (checked) {
    state.filters.fabric.push(value);
  } else {
    state.filters.fabric = state.filters.fabric.filter(fab => fab !== value);
  }

  resetProductsAndLoad();
}

function handleColorFilterChange(e) {
  const { value, checked } = e.target;

  if (checked) {
    state.filters.color.push(value);
  } else {
    state.filters.color = state.filters.color.filter(col => col !== value);
  }

  resetProductsAndLoad();
}

function handleSizeFilterChange(e) {
  const sizeBtn = e.target;
  const size = sizeBtn.dataset.size;

  sizeBtn.classList.toggle("active");

  if (sizeBtn.classList.contains("active")) {
    state.filters.size.push(size);
  } else {
    state.filters.size = state.filters.size.filter(s => s !== size);
  }

  resetProductsAndLoad();
}

function handlePriceRangeChange(e) {
  const value = parseInt(e.target.value);
  state.filters.priceMax = value;

  if (priceValueDisplay) {
    priceValueDisplay.textContent = value.toLocaleString();
  }

  if (maxPriceInput) {
    maxPriceInput.value = value;
  }

  resetProductsAndLoad();
}

function handleMinPriceChange(e) {
  const value = parseInt(e.target.value);
  state.filters.priceMin = value;
  resetProductsAndLoad();
}

function handleMaxPriceChange(e) {
  const value = parseInt(e.target.value);
  state.filters.priceMax = value;

  if (priceRangeSlider) {
    priceRangeSlider.value = value;
  }

  if (priceValueDisplay) {
    priceValueDisplay.textContent = value.toLocaleString();
  }

  resetProductsAndLoad();
}

function resetFilters() {
  // Reset state
  state.filters = {
    category: [],
    fabric: [],
    color: [],
    size: [],
    priceMin: parseInt(priceRangeSlider.min),
    priceMax: parseInt(priceRangeSlider.max)
  };

  // Reset UI
  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.checked = false;
  });

  document.querySelectorAll('.size-btn').forEach(button => {
    button.classList.remove("active");
  });

  if (priceRangeSlider) {
    priceRangeSlider.value = priceRangeSlider.max;
    if (priceValueDisplay) {
      priceValueDisplay.textContent = parseInt(priceRangeSlider.max).toLocaleString();
    }
  }

  if (minPriceInput) {
    minPriceInput.value = priceRangeSlider.min;
  }

  if (maxPriceInput) {
    maxPriceInput.value = priceRangeSlider.max;
  }

  resetProductsAndLoad();
}

function toggleFilters() {
  if (filtersContainer) {
    filtersContainer.classList.toggle("show-filters");
  }
}

function handleScroll() {
  if (state.infiniteScroll.isLoading || state.infiniteScroll.allLoaded) return;

  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  // Load more products when user scrolls to bottom of page
  if (scrollY + windowHeight >= documentHeight - 300) {
    loadMoreProducts();
  }
}

function createSearchFilterSection(searchTerm) {
  const searchFilterSection = document.createElement("div");
  searchFilterSection.className = "search-filter-section";
  searchFilterSection.innerHTML = `
    <p>Showing results for: <strong>"${searchTerm}"</strong></p>
    <button class="clear-search">Clear Search</button>
  `;

  // Insert before the products grid
  if (productsContainer && productsContainer.parentNode) {
    productsContainer.parentNode.insertBefore(searchFilterSection, productsContainer);
  }

  // Add event listener to clear search button
  const clearSearchBtn = searchFilterSection.querySelector(".clear-search");
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      // Remove search parameter from URL and reload page
      const url = new URL(window.location);
      url.searchParams.delete("search");
      window.location.href = url.toString();
    });
  }
}

// API Functions
function loadProducts() {
  if (loadingProducts) {
    loadingProducts.style.display = "block";
  }

  if (productsContainer) {
    productsContainer.innerHTML = "";
  }

  state.infiniteScroll.currentPage = 1;
  state.infiniteScroll.allLoaded = false;

  fetchProducts();
}

function loadMoreProducts() {
  state.infiniteScroll.currentPage++;
  fetchProducts(true);
}

function resetProductsAndLoad() {
  if (productsContainer) {
    productsContainer.innerHTML = "";
  }

  state.infiniteScroll.currentPage = 1;
  state.infiniteScroll.allLoaded = false;

  fetchProducts();
}

function fetchProducts(append = false) {
  // Show loading state
  state.infiniteScroll.isLoading = true;

  if (scrollLoader && !append) {
    scrollLoader.style.display = "none";
  } else if (scrollLoader) {
    scrollLoader.style.display = "flex";
  }

  // Build query parameters
  const params = new URLSearchParams();

  // Add pagination
  params.append("page", state.infiniteScroll.currentPage);
  params.append("limit", state.infiniteScroll.productsPerPage);

  // Add sort
  if (state.sort) {
    params.append("sort", state.sort);
  }

  // Add category filters
  if (state.filters.category.length > 0) {
    params.append("category", state.filters.category[0]); // API currently supports only one category
  }

  // Add fabric filters
  if (state.filters.fabric.length > 0) {
    params.append("fabric", state.filters.fabric[0]); // API currently supports only one fabric
  }

  // Add color filters
  if (state.filters.color.length > 0) {
    params.append("color", state.filters.color[0]); // API currently supports only one color
  }

  // Add size filters
  if (state.filters.size.length > 0) {
    params.append("size", state.filters.size[0]); // API currently supports only one size
  }

  // Add price range
  if (state.filters.priceMin > 0) {
    params.append("min_price", state.filters.priceMin);
  }

  if (state.filters.priceMax > 0) {
    params.append("max_price", state.filters.priceMax);
  }

  // Add search term from URL if present
  const urlParams = new URLSearchParams(window.location.search);
  const searchTerm = urlParams.get('search');
  if (searchTerm) {
    params.append("search", searchTerm);
  }

  // Fetch products from API
  fetch(`api/shop-products.php?${params.toString()}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Hide loading states
      state.infiniteScroll.isLoading = false;

      if (loadingProducts) {
        loadingProducts.style.display = "none";
      }

      if (scrollLoader) {
        scrollLoader.style.display = "none";
      }

      // Check if all products are loaded
      if (data.products.length < state.infiniteScroll.productsPerPage) {
        state.infiniteScroll.allLoaded = true;
      }

      // Render products
      renderProducts(data.products, append);
    })
    .catch(error => {
      console.error("Error fetching products:", error);

      // Hide loading states
      state.infiniteScroll.isLoading = false;

      if (loadingProducts) {
        loadingProducts.style.display = "none";
      }

      if (scrollLoader) {
        scrollLoader.style.display = "none";
      }

      // Show error message
      if (productsContainer) {
        productsContainer.innerHTML = `
          <div class="error-message">
            <p>Failed to load products. Please try again later.</p>
            <button class="retry-btn">Retry</button>
          </div>
        `;

        // Add event listener to retry button
        const retryBtn = productsContainer.querySelector(".retry-btn");
        if (retryBtn) {
          retryBtn.addEventListener("click", resetProductsAndLoad);
        }
      }
    });
}

function renderProducts(products, append = false) {
  if (!productsContainer) return;

  // If no products found
  if (products.length === 0 && !append) {
    productsContainer.innerHTML = `
      <div class="no-products-message">
        <p>No products found matching your criteria.</p>
        <button class="reset-filters-btn">Reset Filters</button>
      </div>
    `;

    // Add event listener to reset filters button
    const resetFiltersBtn = productsContainer.querySelector(".reset-filters-btn");
    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener("click", resetFilters);
    }

    return;
  }

  // If appending, keep existing products
  if (!append) {
    productsContainer.innerHTML = "";
  }

  // Create product elements
  products.forEach(product => {
    const productEl = document.createElement("div");
    productEl.className = "product-card";

    // Calculate rating display (out of 5 stars)
    const ratingOutOf10 = product.rating ? product.rating.rate.toFixed(1) : "N/A";

    productEl.innerHTML = `
      <a href="product-detail.php?id=${product.id}" class="product-image-link">
        <img src="${product.image}" alt="${product.name}" />
      </a>
      <div class="product-info">
        <a href="product-detail.php?id=${product.id}" class="product-title-link">
          <h3>${product.name}</h3>
        </a>
        <div class="product-meta">
          <div class="product-price">₱${parseFloat(product.price).toLocaleString()}</div>
          <div class="product-rating">
            ⭐${ratingOutOf10}
            <span class="rating-count">(${product.rating ? product.rating.count : 0})</span>
          </div>
        </div>
        <button data-product-id="${product.id}">Add to Cart</button>
      </div>
    `;

    productsContainer.appendChild(productEl);

    // Add event listener to Add to Cart button
    const addToCartBtn = productEl.querySelector("button");
    if (addToCartBtn) {
      addToCartBtn.addEventListener("click", () => {
        // Call the addToCart function from cart.js
        addToCart(product.id);

        // Add visual feedback
        const originalText = addToCartBtn.innerText;
        addToCartBtn.innerText = "Added!";
        addToCartBtn.classList.add("added-to-cart");

        // Reset button after 1.5 seconds
        setTimeout(() => {
          addToCartBtn.innerText = originalText;
          addToCartBtn.classList.remove("added-to-cart");
        }, 1500);
      });
    }
  });

  // Show scroll loader if not all products are loaded
  if (scrollLoader) {
    scrollLoader.style.display = state.infiniteScroll.allLoaded ? "none" : "flex";
  }
}
