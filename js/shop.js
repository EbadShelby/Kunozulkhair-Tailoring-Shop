import { products } from '../data/products.js';
import { addToCart } from '../data/cart.js';

document.querySelector('.cart-toggle-btn')?.addEventListener('click', function () {
  document.querySelector('.cart')?.classList.toggle('show-cart');
});

// Function to render products to the shop page
document.addEventListener("DOMContentLoaded", () => {
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
    pagination: {
      currentPage: 1,
      productsPerPage: 12,
      totalPages: 1
    }
  };

  // DOM Elements
  const productsContainer = document.getElementById("shop-products");
  const sortSelect = document.getElementById("sort-by");
  const prevPageBtn = document.getElementById("prev-page");
  const nextPageBtn = document.getElementById("next-page");
  const pageNumbersContainer = document.getElementById("page-numbers");
  const priceRangeSlider = document.getElementById("price-range");
  const priceValueDisplay = document.getElementById("price-value");
  const minPriceInput = document.getElementById("min-price");
  const maxPriceInput = document.getElementById("max-price");
  const resetFiltersBtn = document.getElementById("reset-filters");
  const toggleFiltersBtn = document.getElementById("toggle-filters");
  const filtersContainer = document.querySelector(".shop-filters");
  const shopLayoutSection = document.querySelector('.shop-layout');
  
  // Initialize the shop
  init();
  
  function init() {
    // Setup event listeners
    setupEventListeners();
    
    // Calculate total pages
    updateTotalPages();
    
    // Render initial products
    renderProducts();
    
    // Render pagination
    renderPagination();
  }
  
  function setupEventListeners() {
    // Sort change
    if (sortSelect) {
      sortSelect.addEventListener("change", () => {
        state.sort = sortSelect.value;
        state.pagination.currentPage = 1;
        renderProducts();
        renderPagination();
      });
    }
    
    // Pagination
    if (prevPageBtn) {
      prevPageBtn.addEventListener("click", () => {
        if (state.pagination.currentPage > 1) {
          state.pagination.currentPage--;
          renderProducts();
          renderPagination();
          if (shopLayoutSection) shopLayoutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }
    
    if (nextPageBtn) {
      nextPageBtn.addEventListener("click", () => {
        if (state.pagination.currentPage < state.pagination.totalPages) {
          state.pagination.currentPage++;
          renderProducts();
          renderPagination();
          if (shopLayoutSection) shopLayoutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }
    
    // Category filters
    document.querySelectorAll('input[name="category"]').forEach(checkbox => {
      checkbox.addEventListener("change", () => {
        updateFilterArray("category", checkbox.value, checkbox.checked);
        state.pagination.currentPage = 1;
        renderProducts();
        renderPagination();
      });
    });
    
    // Fabric filters
    document.querySelectorAll('input[name="fabric"]').forEach(checkbox => {
      checkbox.addEventListener("change", () => {
        updateFilterArray("fabric", checkbox.value, checkbox.checked);
        state.pagination.currentPage = 1;
        renderProducts();
        renderPagination();
      });
    });
    
    // Color filters
    document.querySelectorAll('input[name="color"]').forEach(checkbox => {
      checkbox.addEventListener("change", () => {
        updateFilterArray("color", checkbox.value, checkbox.checked);
        state.pagination.currentPage = 1;
        renderProducts();
        renderPagination();
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
        state.pagination.currentPage = 1;
        renderProducts();
        renderPagination();
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
        state.pagination.currentPage = 1;
        renderProducts();
        renderPagination();
      });
    }
    
    // Min/Max price inputs
    if (minPriceInput) {
      minPriceInput.addEventListener("change", () => {
        state.filters.priceMin = parseInt(minPriceInput.value) || 0;
        state.pagination.currentPage = 1;
        renderProducts();
        renderPagination();
      });
    }
    
    if (maxPriceInput) {
      maxPriceInput.addEventListener("change", () => {
        state.filters.priceMax = parseInt(maxPriceInput.value) || 5000;
        state.pagination.currentPage = 1;
        renderProducts();
        renderPagination();
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
  
  function updateTotalPages() {
    const filteredProducts = getFilteredProducts();
    state.pagination.totalPages = Math.ceil(filteredProducts.length / state.pagination.productsPerPage);
  }
  
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
    
    // Reset pagination
    state.pagination.currentPage = 1;
    
    // Re-render
    renderProducts();
    renderPagination();
  }
  
  function getFilteredProducts() {
    return products.filter(product => {
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
  
  function getCurrentPageProducts() {
    const filteredProducts = getFilteredProducts();
    const sortedProducts = getSortedProducts(filteredProducts);
    
    // Update total pages
    updateTotalPages();
    
    // Get current page products
    const startIndex = (state.pagination.currentPage - 1) * state.pagination.productsPerPage;
    const endIndex = startIndex + state.pagination.productsPerPage;
    
    return sortedProducts.slice(startIndex, endIndex);
  }
  
  function renderProducts() {
    if (!productsContainer) return;
    
    const productsToShow = getCurrentPageProducts();
    
    // Clear container
    productsContainer.innerHTML = "";

    if (productsToShow.length === 0) {
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
          <img src="${product.image}" alt="${product.name}" />
        <div class="product-info">
          <h3>${product.name}</h3>
          <div class="product-price">₱${product.price.toLocaleString()}</div>
          <div class="product-meta">
            <div class="product-rating">
              ⭐${ratingOutOf10}
            </div>
          <button data-product-id="${product.id}">Add to Cart</button>
          </div>
        </div>
        `;

      productsContainer.appendChild(productEl);
    });

    // Add event listeners to all "Add to Cart" buttons
    document.querySelectorAll(".product-card button").forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = button.dataset.productId;
        const foundProduct = products.find((p) => p.id == productId);

        if (foundProduct) {
          const name = foundProduct.name;
          const price = foundProduct.price;
          addToCart(name, price);
          
          // Add visual feedback
          const originalText = button.innerText;
          button.innerText = "Added!";
          button.classList.add("added-to-cart");
          
          // Reset button after 1.5 seconds
          setTimeout(() => {
            button.innerText = originalText;
            button.classList.remove("added-to-cart");
          }, 1500);
        }
      });
    });
  }
  
  function renderPagination() {
    if (!pageNumbersContainer) return;
    
    // Update prev/next buttons
    if (prevPageBtn) {
      prevPageBtn.disabled = state.pagination.currentPage === 1;
    }
    
    if (nextPageBtn) {
      nextPageBtn.disabled = state.pagination.currentPage === state.pagination.totalPages || state.pagination.totalPages === 0;
    }
    
    // Render page numbers
    pageNumbersContainer.innerHTML = "";
    
    if (state.pagination.totalPages <= 1) {
      return;
    }
    
    // Determine which page numbers to show
    let startPage = Math.max(1, state.pagination.currentPage - 2);
    let endPage = Math.min(state.pagination.totalPages, startPage + 4);
    
    // Adjust start page if needed
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }
    
    // Add first page if needed
    if (startPage > 1) {
      addPageNumber(1);
      if (startPage > 2) {
        addEllipsis();
      }
    }
    
    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
      addPageNumber(i);
    }
    
    // Add last page if needed
    if (endPage < state.pagination.totalPages) {
      if (endPage < state.pagination.totalPages - 1) {
        addEllipsis();
      }
      addPageNumber(state.pagination.totalPages);
    }
    
    function addPageNumber(pageNum) {
      const button = document.createElement("button");
      button.className = `page-number ${pageNum === state.pagination.currentPage ? 'active' : ''}`;
      button.textContent = pageNum;
      button.addEventListener("click", () => {
        state.pagination.currentPage = pageNum;
        renderProducts();
        renderPagination();
        if (shopLayoutSection) shopLayoutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      pageNumbersContainer.appendChild(button);
    }
    
    function addEllipsis() {
      const span = document.createElement("span");
      span.className = "page-ellipsis";
      span.textContent = "...";
      pageNumbersContainer.appendChild(span);
    }
  }
});
