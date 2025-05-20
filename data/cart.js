export const cart = [];

// Get DOM elements
const cartIcon = document.getElementById('cart-icon');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.getElementById('close-cart');
const cartCount = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

// Function to add product to cart
export function addToCart(productName, price, image = 'assets/images/logo.jpg') {
  // Convert price to number if it's a string
  const priceValue = typeof price === 'string' ? parseFloat(price.replace('₱', '')) : price;

  const existing = cart.find(item => item.name === productName);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      name: productName,
      price: priceValue,
      quantity: 1,
      image: image
    });
  }
  updateCart();
}

// Export these functions so they can be used globally
export function increaseQuantity(name) {
  const item = cart.find(i => i.name === name);
  if (item) {
    item.quantity++;
    updateCart();
  }
}

export function decreaseQuantity(name) {
  const item = cart.find(i => i.name === name);
  if (item && item.quantity > 1) {
    item.quantity--;
    updateCart();
  } else if (item && item.quantity === 1) {
    const index = cart.findIndex(i => i.name === name);
    if (index > -1) {
      cart.splice(index, 1); // Remove item if quantity = 1
    }
    updateCart();
  }
}

function updateCart() {
  if (!cartItemsContainer) return; // Guard clause if element doesn't exist

  cartItemsContainer.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';
    itemEl.innerHTML = `
      <div class="cart-item-image">
        <img src="${item.image || 'assets/images/logo.jpg'}" alt="${item.name}">
      </div>
      <div class="cart-item-details">
        <span class="cart-item-name">${item.name}</span>
        <span class="cart-item-price">₱${item.price.toLocaleString()}</span>
        <div class="quantity-control">
          <button class="decrease-btn" data-product="${item.name}">−</button>
          <span>${item.quantity}</span>
          <button class="increase-btn" data-product="${item.name}">+</button>
        </div>
      </div>
    `;

    // Add event listeners to the buttons
    const decreaseBtn = itemEl.querySelector('.decrease-btn');
    const increaseBtn = itemEl.querySelector('.increase-btn');

    decreaseBtn.addEventListener('click', () => decreaseQuantity(item.name));
    increaseBtn.addEventListener('click', () => increaseQuantity(item.name));

    cartItemsContainer.appendChild(itemEl);
  });

  if (cartCount) cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartTotal) cartTotal.textContent = total.toFixed(2);
}

// Make sure the DOM is loaded before adding event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Enhanced cart icon click handling
  if (cartIcon) {
    // Make the entire cart icon clickable
    cartIcon.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      cartSidebar.classList.toggle('open');
      console.log('Cart toggled:', cartSidebar.classList.contains('open'));
    });

    // Also make sure clicks on SVG and other elements inside the cart icon work
    const cartSvg = cartIcon.querySelector('svg');
    if (cartSvg) {
      cartSvg.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        cartSidebar.classList.toggle('open');
      });
    }

    const cartCount = cartIcon.querySelector('.cart-count');
    if (cartCount) {
      cartCount.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        cartSidebar.classList.toggle('open');
      });
    }
  }

  if (closeCart) {
    closeCart.addEventListener('click', () => {
      cartSidebar.classList.remove('open');
    });
  }

  // Close cart when clicking outside
  document.addEventListener('click', function(e) {
    if (cartSidebar && cartSidebar.classList.contains('open') &&
        !cartSidebar.contains(e.target) &&
        !cartIcon.contains(e.target)) {
      cartSidebar.classList.remove('open');
    }
  });

  const checkoutBtn = document.querySelector('.checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      location.href = 'checkout.php';
    });
  }

  // Attach to all product buttons
  document.querySelectorAll('.product-card button').forEach(button => {
    button.addEventListener('click', () => {
      const product = button.closest('.product-card');
      const name = product.querySelector('h3').textContent;
      const price = product.querySelector('p').textContent.replace('₱', '');
      addToCart(name, price);
    });
  });
});