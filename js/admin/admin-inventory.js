// Admin Inventory JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Initialize sidebar toggle functionality
  initSidebarToggle();
  
  // Load inventory data
  loadInventoryData();
  
  // Set up event listeners
  setupEventListeners();
});

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

// Function to load inventory data
function loadInventoryData() {
  const inventoryTableBody = document.getElementById('inventory-table-body');
  if (!inventoryTableBody) return;
  
  // Get products from local storage or use default data
  let products = [];
  
  try {
    // Try to get products from localStorage
    const storedProducts = localStorage.getItem('adminProducts');
    if (storedProducts) {
      products = JSON.parse(storedProducts);
    } else {
      // If no products in localStorage, use the ones from products.js
      // For demo purposes, we'll import them dynamically
      import('../data/products.js')
        .then(module => {
          products = module.products;
          
          // Add stock and reorder level properties for demo
          products = products.map(product => ({
            ...product,
            stock: Math.floor(Math.random() * 50), // Random stock between 0-49
            reorderLevel: 10 // Default reorder level
          }));
          
          // Save to localStorage for future use
          localStorage.setItem('adminProducts', JSON.stringify(products));
          
          // Render products
          renderProducts(products);
        })
        .catch(error => {
          console.error('Error loading products:', error);
          // Render empty state
          renderEmptyState(inventoryTableBody);
        });
      return;
    }
  } catch (error) {
    console.error('Error loading products:', error);
    products = [];
  }
  
  // Render products
  if (products.length > 0) {
    renderProducts(products);
  } else {
    renderEmptyState(inventoryTableBody);
  }
}

// Function to render products to the table
function renderProducts(products) {
  const inventoryTableBody = document.getElementById('inventory-table-body');
  if (!inventoryTableBody) return;
  
  // Clear table
  inventoryTableBody.innerHTML = '';
  
  // Apply filters
  const categoryFilter = document.getElementById('category-filter');
  const stockFilter = document.getElementById('stock-filter');
  
  let filteredProducts = [...products];
  
  // Apply category filter
  if (categoryFilter && categoryFilter.value !== 'all') {
    filteredProducts = filteredProducts.filter(product => 
      product.category === categoryFilter.value
    );
  }
  
  // Apply stock filter
  if (stockFilter && stockFilter.value !== 'all') {
    filteredProducts = filteredProducts.filter(product => {
      if (stockFilter.value === 'in-stock') {
        return product.stock > product.reorderLevel;
      } else if (stockFilter.value === 'low-stock') {
        return product.stock > 0 && product.stock <= product.reorderLevel;
      } else if (stockFilter.value === 'out-of-stock') {
        return product.stock === 0;
      }
      return true;
    });
  }
  
  // Add products to table
  filteredProducts.forEach(product => {
    const row = document.createElement('tr');
    row.setAttribute('data-product-id', product.id);
    
    // Determine stock status
    let stockStatus, stockBadgeClass;
    if (product.stock === 0) {
      stockStatus = 'Out of Stock';
      stockBadgeClass = 'out-of-stock';
    } else if (product.stock <= product.reorderLevel) {
      stockStatus = 'Low Stock';
      stockBadgeClass = 'low-stock';
    } else {
      stockStatus = 'In Stock';
      stockBadgeClass = 'in-stock';
    }
    
    // Create stock badge
    const stockBadge = `<span class="stock-badge ${stockBadgeClass}">${stockStatus}</span>`;
    
    // Add cells
    row.innerHTML = `
      <td><input type="checkbox" class="product-checkbox" data-product-id="${product.id}"></td>
      <td>${product.id}</td>
      <td><img src="${product.image}" alt="${product.name}" class="product-image"></td>
      <td>
        <div class="product-name">${product.name}</div>
        <div class="product-category">${product.category}</div>
      </td>
      <td>${product.fabric || 'N/A'}</td>
      <td class="product-price">₱${product.price.toLocaleString()}</td>
      <td>${product.stock}</td>
      <td class="stock-status">${stockBadge}</td>
      <td>
        <div class="product-actions">
          <button class="action-btn view" data-product-id="${product.id}" title="View Product">
            <i class="fas fa-eye"></i>
          </button>
          <button class="action-btn edit" data-product-id="${product.id}" title="Edit Product">
            <i class="fas fa-edit"></i>
          </button>
          <button class="action-btn delete" data-product-id="${product.id}" title="Delete Product">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </td>
    `;
    
    // Add row to table
    inventoryTableBody.appendChild(row);
  });
  
  // Add event listeners to action buttons
  addActionButtonListeners();
}

// Function to render empty state
function renderEmptyState(tableBody) {
  tableBody.innerHTML = `
    <tr>
      <td colspan="9" class="empty-state">
        <div class="empty-state-content">
          <i class="fas fa-box-open"></i>
          <p>No products found</p>
          <button id="add-first-product" class="btn-primary">
            <i class="fas fa-plus"></i> Add Your First Product
          </button>
        </div>
      </td>
    </tr>
  `;
  
  // Add event listener to the "Add Your First Product" button
  const addFirstProductBtn = document.getElementById('add-first-product');
  if (addFirstProductBtn) {
    addFirstProductBtn.addEventListener('click', openAddProductModal);
  }
}

// Function to add event listeners to action buttons
function addActionButtonListeners() {
  // View buttons
  document.querySelectorAll('.action-btn.view').forEach(button => {
    button.addEventListener('click', function() {
      const productId = this.getAttribute('data-product-id');
      viewProduct(productId);
    });
  });
  
  // Edit buttons
  document.querySelectorAll('.action-btn.edit').forEach(button => {
    button.addEventListener('click', function() {
      const productId = this.getAttribute('data-product-id');
      openEditProductModal(productId);
    });
  });
  
  // Delete buttons
  document.querySelectorAll('.action-btn.delete').forEach(button => {
    button.addEventListener('click', function() {
      const productId = this.getAttribute('data-product-id');
      openDeleteModal(productId);
    });
  });
}

// Function to set up event listeners
function setupEventListeners() {
  // Add Product button
  const addProductBtn = document.getElementById('add-product-btn');
  if (addProductBtn) {
    addProductBtn.addEventListener('click', openAddProductModal);
  }
  
  // Filter change events
  const categoryFilter = document.getElementById('category-filter');
  const stockFilter = document.getElementById('stock-filter');
  
  if (categoryFilter) {
    categoryFilter.addEventListener('change', loadInventoryData);
  }
  
  if (stockFilter) {
    stockFilter.addEventListener('change', loadInventoryData);
  }
  
  // Select All checkbox
  const selectAllCheckbox = document.getElementById('select-all-products');
  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener('change', function() {
      const checkboxes = document.querySelectorAll('.product-checkbox');
      checkboxes.forEach(checkbox => {
        checkbox.checked = this.checked;
      });
    });
  }
  
  // Export button
  const exportBtn = document.getElementById('export-inventory');
  if (exportBtn) {
    exportBtn.addEventListener('click', exportInventory);
  }
  
  // Product Modal
  const productModal = document.getElementById('product-modal');
  const closeModalButtons = document.querySelectorAll('.close-modal');
  const cancelProductBtn = document.getElementById('cancel-product');
  const productForm = document.getElementById('product-form');
  const selectImageBtn = document.getElementById('select-image-btn');
  const productImageInput = document.getElementById('product-image');
  
  if (closeModalButtons) {
    closeModalButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Close the parent modal
        this.closest('.modal').style.display = 'none';
      });
    });
  }
  
  if (cancelProductBtn) {
    cancelProductBtn.addEventListener('click', function() {
      productModal.style.display = 'none';
    });
  }
  
  if (productForm) {
    productForm.addEventListener('submit', function(e) {
      e.preventDefault();
      saveProduct();
    });
  }
  
  if (selectImageBtn && productImageInput) {
    selectImageBtn.addEventListener('click', function() {
      productImageInput.click();
    });
    
    productImageInput.addEventListener('change', function() {
      previewImage(this);
    });
  }
  
  // Delete Modal
  const deleteModal = document.getElementById('delete-modal');
  const cancelDeleteBtn = document.getElementById('cancel-delete');
  const confirmDeleteBtn = document.getElementById('confirm-delete');
  
  if (cancelDeleteBtn) {
    cancelDeleteBtn.addEventListener('click', function() {
      deleteModal.style.display = 'none';
    });
  }
  
  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener('click', deleteProduct);
  }
  
  // Close modals when clicking outside
  window.addEventListener('click', function(e) {
    if (e.target === productModal) {
      productModal.style.display = 'none';
    }
    
    if (e.target === deleteModal) {
      deleteModal.style.display = 'none';
    }
  });
}

// Function to open Add Product modal
function openAddProductModal() {
  const productModal = document.getElementById('product-modal');
  const modalTitle = document.getElementById('modal-title');
  const productForm = document.getElementById('product-form');
  const imagePreview = document.getElementById('image-preview');
  
  if (productModal && modalTitle && productForm && imagePreview) {
    // Set modal title
    modalTitle.textContent = 'Add New Product';
    
    // Reset form
    productForm.reset();
    
    // Clear product ID
    document.getElementById('product-id').value = '';
    
    // Reset image preview
    imagePreview.innerHTML = `
      <i class="fas fa-image"></i>
      <span>No image selected</span>
    `;
    
    // Show modal
    productModal.style.display = 'block';
  }
}

// Function to open Edit Product modal
function openEditProductModal(productId) {
  const productModal = document.getElementById('product-modal');
  const modalTitle = document.getElementById('modal-title');
  const productForm = document.getElementById('product-form');
  const imagePreview = document.getElementById('image-preview');
  
  if (productModal && modalTitle && productForm && imagePreview) {
    // Set modal title
    modalTitle.textContent = 'Edit Product';
    
    // Get product data
    const products = JSON.parse(localStorage.getItem('adminProducts') || '[]');
    const product = products.find(p => p.id == productId);
    
    if (product) {
      // Fill form with product data
      document.getElementById('product-id').value = product.id;
      document.getElementById('product-name').value = product.name;
      document.getElementById('product-category').value = product.category;
      document.getElementById('product-price').value = product.price;
      document.getElementById('product-stock').value = product.stock || 0;
      document.getElementById('product-fabric').value = product.fabric || '';
      document.getElementById('product-color').value = product.color || '';
      document.getElementById('product-description').value = product.description || '';
      document.getElementById('reorder-level').value = product.reorderLevel || 10;
      
      // Set sizes
      if (product.sizes && product.sizes.length > 0) {
        const sizeCheckboxes = document.querySelectorAll('input[name="sizes"]');
        sizeCheckboxes.forEach(checkbox => {
          checkbox.checked = product.sizes.includes(checkbox.value);
        });
      }
      
      // Set image preview
      imagePreview.innerHTML = `<img src="${product.image}" alt="${product.name}">`;
    }
    
    // Show modal
    productModal.style.display = 'block';
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
  const sizes = Array.from(sizeCheckboxes).map(checkbox => checkbox.value);
  
  // Get image
  const imagePreview = document.getElementById('image-preview');
  const imageElement = imagePreview.querySelector('img');
  const imageSrc = imageElement ? imageElement.src : 'assets/images/logo.jpg';
  
  // Get products from localStorage
  let products = JSON.parse(localStorage.getItem('adminProducts') || '[]');
  
  if (productId) {
    // Update existing product
    const index = products.findIndex(p => p.id == productId);
    if (index !== -1) {
      products[index] = {
        ...products[index],
        name: productName,
        category: productCategory,
        price: productPrice,
        stock: productStock,
        fabric: productFabric,
        color: productColor,
        description: productDescription,
        sizes: sizes,
        reorderLevel: reorderLevel,
        image: imageSrc
      };
    }
  } else {
    // Add new product
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    
    products.push({
      id: newId,
      name: productName,
      category: productCategory,
      price: productPrice,
      stock: productStock,
      fabric: productFabric,
      color: productColor,
      description: productDescription,
      sizes: sizes,
      reorderLevel: reorderLevel,
      image: imageSrc,
      date: new Date().toISOString().split('T')[0],
      rating: { rate: 0, count: 0 }
    });
  }
  
  // Save to localStorage
  localStorage.setItem('adminProducts', JSON.stringify(products));
  
  // Close modal
  document.getElementById('product-modal').style.display = 'none';
  
  // Reload inventory data
  loadInventoryData();
}

// Function to preview image
function previewImage(input) {
  const imagePreview = document.getElementById('image-preview');
  
  if (input.files && input.files[0] && imagePreview) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
      imagePreview.innerHTML = `<img src="${e.target.result}" alt="Product Image">`;
    };
    
    reader.readAsDataURL(input.files[0]);
  }
}

// Function to open delete modal
function openDeleteModal(productId) {
  const deleteModal = document.getElementById('delete-modal');
  const deleteProductName = document.getElementById('delete-product-name');
  const deleteProductId = document.getElementById('delete-product-id');
  const confirmDeleteBtn = document.getElementById('confirm-delete');
  
  if (deleteModal && deleteProductName && deleteProductId && confirmDeleteBtn) {
    // Get product data
    const products = JSON.parse(localStorage.getItem('adminProducts') || '[]');
    const product = products.find(p => p.id == productId);
    
    if (product) {
      // Set product info
      deleteProductName.textContent = product.name;
      deleteProductId.textContent = `ID: ${product.id}`;
      
      // Set product ID to delete button
      confirmDeleteBtn.setAttribute('data-product-id', product.id);
      
      // Show modal
      deleteModal.style.display = 'block';
    }
  }
}

// Function to delete product
function deleteProduct() {
  const confirmDeleteBtn = document.getElementById('confirm-delete');
  const productId = confirmDeleteBtn.getAttribute('data-product-id');
  
  if (productId) {
    // Get products from localStorage
    let products = JSON.parse(localStorage.getItem('adminProducts') || '[]');
    
    // Remove product
    products = products.filter(p => p.id != productId);
    
    // Save to localStorage
    localStorage.setItem('adminProducts', JSON.stringify(products));
    
    // Close modal
    document.getElementById('delete-modal').style.display = 'none';
    
    // Reload inventory data
    loadInventoryData();
  }
}

// Function to view product
function viewProduct(productId) {
  // In a real app, this would open a detailed view or redirect to the product page
  // For demo purposes, we'll just open the product in a new tab
  window.open(`product-detail.php?id=${productId}`, '_blank');
}

// Function to export inventory
function exportInventory() {
  // In a real app, this would generate a CSV or Excel file
  // For demo purposes, we'll just show an alert
  alert('Export functionality would generate a CSV or Excel file with the current inventory data.');
}
