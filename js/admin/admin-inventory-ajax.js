// Admin Inventory AJAX JavaScript

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM content loaded');

  // Initialize sidebar toggle functionality
  initSidebarToggle();

  // Set up event listeners
  setupEventListeners();

  // Initialize page
  initPage();
});

// Function to initialize the page
function initPage() {
  console.log('Initializing page');

  // Set up edit and delete buttons
  setupEditButtons();
  setupDeleteButtons();
}

// Function to initialize sidebar toggle
function initSidebarToggle() {
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const adminContainer = document.querySelector('.admin-container');

  if (sidebarToggle && adminContainer) {
    sidebarToggle.addEventListener('click', function() {
      adminContainer.classList.toggle('sidebar-collapsed');
    });
  }
}

// Function to set up event listeners
function setupEventListeners() {
  console.log('Setting up event listeners');

  // Add product button
  const addProductBtn = document.getElementById('add-product-btn');
  if (addProductBtn) {
    addProductBtn.addEventListener('click', function() {
      openProductModal();
    });
  }

  // Close modal buttons
  const closeButtons = document.querySelectorAll('.close-modal');
  closeButtons.forEach(button => {
    button.addEventListener('click', function() {
      closeAllModals();
    });
  });

  // Cancel buttons
  const cancelProductBtn = document.getElementById('cancel-product');
  if (cancelProductBtn) {
    cancelProductBtn.addEventListener('click', function() {
      closeAllModals();
    });
  }

  const cancelDeleteBtn = document.getElementById('cancel-delete');
  if (cancelDeleteBtn) {
    cancelDeleteBtn.addEventListener('click', function() {
      closeAllModals();
    });
  }

  // Select image button
  const selectImageBtn = document.getElementById('select-image-btn');
  const productImageInput = document.getElementById('product-image');

  if (selectImageBtn && productImageInput) {
    selectImageBtn.addEventListener('click', function() {
      productImageInput.click();
    });

    productImageInput.addEventListener('change', function() {
      previewImage(this);
    });
  }

  // Product form submission
  const productForm = document.getElementById('product-form');
  if (productForm) {
    productForm.addEventListener('submit', function(e) {
      e.preventDefault();
      saveProduct();
    });
  }

  // Set up edit buttons
  setupEditButtons();

  // Set up delete buttons
  setupDeleteButtons();

  // Category filter
  const categoryFilter = document.getElementById('category-filter');
  if (categoryFilter) {
    categoryFilter.addEventListener('change', function() {
      applyFilters();
    });
  }

  // Stock filter
  const stockFilter = document.getElementById('stock-filter');
  if (stockFilter) {
    stockFilter.addEventListener('change', function() {
      applyFilters();
    });
  }

  // Select all products checkbox
  const selectAllCheckbox = document.getElementById('select-all-products');
  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener('change', function() {
      const checkboxes = document.querySelectorAll('.product-checkbox');
      checkboxes.forEach(checkbox => {
        checkbox.checked = this.checked;
      });
    });
  }
}

// Function to set up edit buttons
function setupEditButtons() {
  console.log('Setting up edit buttons');
  const editButtons = document.querySelectorAll('.action-btn.edit');
  console.log('Found', editButtons.length, 'edit buttons');

  editButtons.forEach(button => {
    button.addEventListener('click', function() {
      const productId = this.getAttribute('data-product-id');
      console.log('Edit button clicked for product ID:', productId);
      editProduct(productId);
    });
  });
}

// Function to set up delete buttons
function setupDeleteButtons() {
  const deleteButtons = document.querySelectorAll('.action-btn.delete');

  deleteButtons.forEach(button => {
    button.addEventListener('click', function() {
      const productId = this.getAttribute('data-product-id');
      const productName = this.getAttribute('data-product-name');
      openDeleteModal(productId, productName);
    });
  });

  // Confirm delete button
  const confirmDeleteBtn = document.getElementById('confirm-delete');
  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener('click', function() {
      const productId = this.getAttribute('data-product-id');
      deleteProduct(productId);
    });
  }
}

// Function to open product modal for adding a new product
function openProductModal(product = null) {
  const modal = document.getElementById('product-modal');
  const modalTitle = document.getElementById('modal-title');
  const productForm = document.getElementById('product-form');

  if (modal && modalTitle && productForm) {
    // Reset form
    productForm.reset();

    // Clear image preview
    const imagePreview = document.getElementById('image-preview');
    if (imagePreview) {
      imagePreview.innerHTML = '<i class="fas fa-image"></i><span>No image selected</span>';
    }

    // Set modal title and product ID
    if (product) {
      modalTitle.textContent = 'Edit Product';
      document.getElementById('product-id').value = product.id;

      // Fill form with product data
      document.getElementById('product-name').value = product.name;
      document.getElementById('product-category').value = product.category;
      document.getElementById('product-price').value = product.price;
      document.getElementById('product-stock').value = product.stock;
      document.getElementById('product-fabric').value = product.fabric || '';
      document.getElementById('product-color').value = product.color || '';
      document.getElementById('product-description').value = product.description || '';
      document.getElementById('reorder-level').value = product.reorder_level || 10;

      // Set sizes
      let sizes = [];
      if (typeof product.sizes === 'string') {
        sizes = product.sizes.split(',');
      } else if (Array.isArray(product.sizes)) {
        sizes = product.sizes;
      }

      const sizeCheckboxes = document.querySelectorAll('input[name="sizes"]');
      sizeCheckboxes.forEach(checkbox => {
        checkbox.checked = sizes.includes(checkbox.value);
      });

      // Set image preview if available
      if (product.image) {
        imagePreview.innerHTML = `<img src="${product.image}" alt="${product.name}" style="max-width: 100%; max-height: 150px;">`;
      }
    } else {
      modalTitle.textContent = 'Add New Product';
      document.getElementById('product-id').value = '';
    }

    // Show modal
    modal.style.display = 'block';
  }
}

// Function to close all modals
function closeAllModals() {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    modal.style.display = 'none';
  });
}

// Function to preview selected image
function previewImage(input) {
  const imagePreview = document.getElementById('image-preview');

  if (input.files && input.files[0] && imagePreview) {
    const reader = new FileReader();

    reader.onload = function(e) {
      imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview" style="max-width: 100%; max-height: 150px;">`;
    };

    reader.readAsDataURL(input.files[0]);
  }
}

// Function to save product
function saveProduct() {
  // Get form data
  const productId = document.getElementById('product-id').value;
  const productName = document.getElementById('product-name').value;
  const productCategory = document.getElementById('product-category').value;
  const productPrice = parseFloat(document.getElementById('product-price').value);
  const productStock = parseInt(document.getElementById('product-stock').value);
  const productFabric = document.getElementById('product-fabric').value;
  const productColor = document.getElementById('product-color').value;
  const productDescription = document.getElementById('product-description').value;
  const reorderLevel = parseInt(document.getElementById('reorder-level').value) || 10;

  // Get selected sizes
  const sizeCheckboxes = document.querySelectorAll('input[name="sizes"]:checked');
  const sizes = Array.from(sizeCheckboxes).map(checkbox => checkbox.value).join(',');

  // Create FormData object
  const formData = new FormData();
  formData.append('name', productName);
  formData.append('category', productCategory);
  formData.append('price', productPrice);
  formData.append('stock', productStock);
  formData.append('fabric', productFabric);
  formData.append('color', productColor);
  formData.append('description', productDescription);
  formData.append('reorder_level', reorderLevel);
  formData.append('sizes', sizes);

  // Add product ID if editing
  if (productId) {
    formData.append('id', productId);
  }

  // Add image if selected
  const productImage = document.getElementById('product-image');
  if (productImage.files && productImage.files[0]) {
    formData.append('image', productImage.files[0]);
  }

  // Send request to server
  const url = 'api/products.php';

  // Add a method parameter to indicate if this is an update
  if (productId) {
    formData.append('_method', 'PUT'); // This will tell the server it's an update
  }

  fetch(url, {
    method: 'POST', // Always use POST for form data
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    console.log('Server response:', data);

    if (data.success) {
      // Close modal
      closeAllModals();

      // Reload page to show updated data
      window.location.reload();
    } else {
      console.error('Error details:', data);
      alert('Error: ' + (data.error || 'Failed to save product'));
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred while saving the product');
  });
}

// Function to edit product
function editProduct(productId) {
  console.log('Editing product with ID:', productId);

  // Fetch product data
  fetch(`api/products.php?id=${productId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Product data received:', data);

      if (data.products && data.products.length > 0) {
        openProductModal(data.products[0]);
      } else {
        alert('Product not found');
      }
    })
    .catch(error => {
      console.error('Error fetching product:', error);
      alert('An error occurred while fetching product data');
    });
}

// Function to open delete confirmation modal
function openDeleteModal(productId, productName) {
  const modal = document.getElementById('delete-modal');
  const deleteProductName = document.getElementById('delete-product-name');
  const deleteProductId = document.getElementById('delete-product-id');
  const confirmDeleteBtn = document.getElementById('confirm-delete');

  if (modal && deleteProductName && deleteProductId && confirmDeleteBtn) {
    deleteProductName.textContent = productName;
    deleteProductId.textContent = `ID: ${productId}`;
    confirmDeleteBtn.setAttribute('data-product-id', productId);

    modal.style.display = 'block';
  }
}

// Function to delete product
function deleteProduct(productId) {
  fetch(`api/products.php?id=${productId}`, {
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // Close modal
      closeAllModals();

      // Reload page to show updated data
      window.location.reload();
    } else {
      alert('Error: ' + (data.error || 'Failed to delete product'));
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred while deleting the product');
  });
}

// Function to apply filters
function applyFilters() {
  const category = document.getElementById('category-filter').value;
  const stockStatus = document.getElementById('stock-filter').value;

  // Redirect with query parameters
  window.location.href = `admin-inventory.php?category=${category}&stock_status=${stockStatus}`;
}
