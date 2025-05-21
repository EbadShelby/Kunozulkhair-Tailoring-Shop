/**
 * Cart functionality
 *
 * This file handles all cart-related operations on the client side:
 * - Loading cart items
 * - Adding items to cart
 * - Updating item quantities
 * - Removing items from cart
 * - Displaying cart in sidebar
 * - Toggling cart visibility
 */

// Cart state
let cart = {
  items: [],
  total: 0,
  count: 0
};

// Debug flag - set to true to enable console logging
const DEBUG = true;

// Load cart items from server
async function loadCart() {
  try {
    const response = await fetch('api/cart.php?action=get');
    const data = await response.json();

    cart = data;
    updateCartUI();

    return data;
  } catch (error) {
    console.error('Error loading cart:', error);
    return { items: [], total: 0, count: 0 };
  }
}

// Add item to cart
// Make this function globally available
window.addToCart = async function(productId, quantity = 1) {
  try {
    const formData = new FormData();
    formData.append('product_id', productId);
    formData.append('quantity', quantity);

    const response = await fetch('api/cart.php?action=add', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      // Reload cart to get updated items
      await loadCart();

      // Show success feedback
      showAddedToCartFeedback(data.product_name || 'Item');

      // Open cart sidebar
      if (cartSidebar) {
        cartSidebar.classList.add('open');
      }
    } else {
      // Show error feedback
      showErrorFeedback(data.message || 'Failed to add item to cart');
    }

    return data;
  } catch (error) {
    console.error('Error adding item to cart:', error);
    showErrorFeedback('Failed to add item to cart');
    return { success: false, message: 'Failed to add item to cart' };
  }
}

// Update item quantity
async function updateCartItem(cartItemId, quantity) {
  try {
    const formData = new FormData();
    formData.append('cart_item_id', cartItemId);
    formData.append('quantity', quantity);

    const response = await fetch('api/cart.php?action=update', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      // Reload cart to get updated items
      await loadCart();

      // Show success message
      if (data.product_name) {
        showNotification(`Updated ${data.product_name} quantity`);
      }
    } else {
      // Show error message
      showErrorFeedback(data.message || 'Failed to update cart item');

      // Reload cart to reset UI to current state
      await loadCart();
    }

    return data;
  } catch (error) {
    console.error('Error updating cart item:', error);
    showErrorFeedback('Failed to update cart item');
    return { success: false, message: 'Failed to update cart item' };
  }
}

// Remove item from cart
async function removeCartItem(cartItemId) {
  try {
    const formData = new FormData();
    formData.append('cart_item_id', cartItemId);

    const response = await fetch('api/cart.php?action=remove', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      // Reload cart to get updated items
      await loadCart();

      // Show success message
      showNotification('Item removed from cart');
    } else {
      // Show error message
      showErrorFeedback(data.message || 'Failed to remove cart item');
    }

    return data;
  } catch (error) {
    console.error('Error removing cart item:', error);
    showErrorFeedback('Failed to remove cart item');
    return { success: false, message: 'Failed to remove cart item' };
  }
}

// Update cart UI
function updateCartUI() {
  // Update cart count
  if (cartCount) {
    cartCount.textContent = cart.count;
  }

  // Update cart items
  if (cartItemsContainer) {
    cartItemsContainer.innerHTML = '';

    if (cart.items.length === 0) {
      cartItemsContainer.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
    } else {
      cart.items.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
          <div class="cart-item-image">
            <img src="${item.image || 'assets/images/logo.jpg'}" alt="${item.name}">
          </div>
          <div class="cart-item-details">
            <span class="cart-item-name">${item.name}</span>
            <span class="cart-item-price">₱${parseFloat(item.price).toLocaleString()}</span>
            <div class="quantity-control">
              <button class="decrease-btn" data-item-id="${item.id}">−</button>
              <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="99" data-item-id="${item.id}">
              <button class="increase-btn" data-item-id="${item.id}">+</button>
              <button class="remove-btn" data-item-id="${item.id}">×</button>
            </div>
          </div>
        `;

        cartItemsContainer.appendChild(itemEl);

        // Add event listeners to buttons
        const decreaseBtn = itemEl.querySelector('.decrease-btn');
        const increaseBtn = itemEl.querySelector('.increase-btn');
        const quantityInput = itemEl.querySelector('.quantity-input');
        const removeBtn = itemEl.querySelector('.remove-btn');

        decreaseBtn.addEventListener('click', () => {
          const newQuantity = Math.max(1, item.quantity - 1);
          updateCartItem(item.id, newQuantity);
        });

        increaseBtn.addEventListener('click', () => {
          const newQuantity = item.quantity + 1;
          updateCartItem(item.id, newQuantity);
        });

        quantityInput.addEventListener('change', (e) => {
          const newQuantity = parseInt(e.target.value) || 1;
          updateCartItem(item.id, newQuantity);
        });

        removeBtn.addEventListener('click', () => {
          removeCartItem(item.id);
        });
      });
    }
  }

  // Update cart total
  if (cartTotal) {
    cartTotal.textContent = parseFloat(cart.total).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
}

// Show visual feedback when item is added to cart
function showAddedToCartFeedback(productName = 'Item') {
  showNotification(`${productName} added to cart!`, 'success');
}

// Show error feedback
function showErrorFeedback(message) {
  showNotification(message, 'error');
}

// Generic notification function
function showNotification(message, type = 'success') {
  // Create a floating notification
  const notification = document.createElement('div');
  notification.className = `cart-notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);

  // Remove notification after animation
  setTimeout(() => {
    notification.classList.add('show');
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 2000);
  }, 10);
}

// Initialize cart functionality
document.addEventListener('DOMContentLoaded', () => {
  if (DEBUG) console.log('Cart.js: DOM loaded, initializing cart functionality');

  // Get DOM elements
  const cartIcon = document.getElementById('cart-icon');
  const cartSidebar = document.getElementById('cart-sidebar');
  const closeCart = document.getElementById('close-cart');
  const cartCount = document.getElementById('cart-count');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const checkoutBtn = document.querySelector('.checkout-btn');

  // Debug element existence
  if (DEBUG) {
    console.log('Cart.js: Elements found:');
    console.log('- cartIcon:', !!cartIcon);
    console.log('- cartSidebar:', !!cartSidebar);
    console.log('- closeCart:', !!closeCart);
    console.log('- cartCount:', !!cartCount);
    console.log('- cartItemsContainer:', !!cartItemsContainer);
    console.log('- cartTotal:', !!cartTotal);
    console.log('- checkoutBtn:', !!checkoutBtn);
  }

  // Load cart items
  loadCart();

  // Cart icon click event - using event delegation for all elements inside the cart icon
  if (cartIcon) {
    // Make the entire cart icon clickable
    cartIcon.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (cartSidebar) {
        cartSidebar.classList.toggle('open');
        if (DEBUG) console.log('Cart.js: Cart toggled by cartIcon, open =', cartSidebar.classList.contains('open'));
      } else {
        if (DEBUG) console.error('Cart.js: cartSidebar not found when clicking cartIcon');
      }
    });

    // Also make sure clicks on SVG and other elements inside the cart icon work
    const cartButton = cartIcon.querySelector('button');
    if (cartButton) {
      cartButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (cartSidebar) {
          cartSidebar.classList.toggle('open');
          if (DEBUG) console.log('Cart.js: Cart toggled by button inside cartIcon, open =', cartSidebar.classList.contains('open'));
        }
      });
    }

    const cartSvg = cartIcon.querySelector('svg');
    if (cartSvg) {
      cartSvg.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (cartSidebar) {
          cartSidebar.classList.toggle('open');
          if (DEBUG) console.log('Cart.js: Cart toggled by SVG inside cartIcon, open =', cartSidebar.classList.contains('open'));
        }
      });
    }

    const cartCountElement = cartIcon.querySelector('.cart-count');
    if (cartCountElement) {
      cartCountElement.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (cartSidebar) {
          cartSidebar.classList.toggle('open');
          if (DEBUG) console.log('Cart.js: Cart toggled by cartCount inside cartIcon, open =', cartSidebar.classList.contains('open'));
        }
      });
    }
  } else {
    if (DEBUG) console.error('Cart.js: cartIcon element not found');
  }

  // Close cart button click event
  if (closeCart) {
    closeCart.addEventListener('click', () => {
      if (cartSidebar) {
        cartSidebar.classList.remove('open');
        if (DEBUG) console.log('Cart.js: Cart closed by closeCart button');
      }
    });
  }

  // Close cart when clicking outside
  document.addEventListener('click', (e) => {
    if (cartSidebar && cartSidebar.classList.contains('open') &&
        !cartSidebar.contains(e.target) &&
        (cartIcon && !cartIcon.contains(e.target))) {
      cartSidebar.classList.remove('open');
      if (DEBUG) console.log('Cart.js: Cart closed by clicking outside');
    }
  });

  // Checkout button click event
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      window.location.href = 'checkout.php';
      if (DEBUG) console.log('Cart.js: Checkout button clicked, redirecting to checkout.php');
    });
  }

  // Add to cart buttons on product cards
  const addToCartButtons = document.querySelectorAll('.product-card button[data-product-id]');
  if (DEBUG) console.log('Cart.js: Found', addToCartButtons.length, 'add to cart buttons');

  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      addToCart(productId);
      if (DEBUG) console.log('Cart.js: Product added to cart, ID:', productId);

      // Add visual feedback
      const originalText = button.innerText;
      button.innerText = 'Added!';
      button.classList.add('added-to-cart');

      // Reset button after 1.5 seconds
      setTimeout(() => {
        button.innerText = originalText;
        button.classList.remove('added-to-cart');
      }, 1500);
    });
  });
});
