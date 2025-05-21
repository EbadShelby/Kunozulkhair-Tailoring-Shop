export const cart = [];

// These DOM elements will be accessed in the updateCart function
let cartItemsContainer;
let cartCount;
let cartTotal;

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
  // Get DOM elements if they haven't been set yet
  if (!cartItemsContainer) cartItemsContainer = document.getElementById('cart-items');
  if (!cartCount) cartCount = document.getElementById('cart-count');
  if (!cartTotal) cartTotal = document.getElementById('cart-total');

  // Guard clause if cart items container doesn't exist
  if (!cartItemsContainer) return;

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

// Make sure the DOM is loaded before initializing
document.addEventListener('DOMContentLoaded', () => {
  // Initialize cart elements
  updateCart();
});