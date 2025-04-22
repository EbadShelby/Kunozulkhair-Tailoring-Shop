const cartIcon = document.getElementById('cart-icon');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.getElementById('close-cart');
const cartCount = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

let cart = [];

// Make sure the DOM is loaded before adding event listeners
document.addEventListener('DOMContentLoaded', () => {
  if (cartIcon) {
    cartIcon.addEventListener('click', (e) => {
      e.preventDefault();
      cartSidebar.classList.toggle('open');
    });
  }

  if (closeCart) {
    closeCart.addEventListener('click', () => {
      cartSidebar.classList.remove('open');
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

// Function to add product to cart - now exposed globally so products.js can access it
function addToCart(productName, price) {
  // Convert price to number if it's a string
  const priceValue = typeof price === 'string' ? parseFloat(price.replace('₱', '')) : price;
  
  const existing = cart.find(item => item.name === productName);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ name: productName, price: priceValue, quantity: 1 });
  }
  updateCart();
}

function updateCart() {
  cartItemsContainer.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';
    itemEl.innerHTML = `
      <span>${item.name} (₱${item.price})</span>
      <div class="quantity-control">
        <button onclick="decreaseQuantity('${item.name}')">−</button>
        <span>${item.quantity}</span>
        <button onclick="increaseQuantity('${item.name}')">+</button>
      </div>
    `;

    cartItemsContainer.appendChild(itemEl);
  });

  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartTotal.textContent = total.toFixed(2);
}

function increaseQuantity(name) {
  const item = cart.find(i => i.name === name);
  if (item) {
    item.quantity++;
    updateCart();
  }
}

function decreaseQuantity(name) {
  const item = cart.find(i => i.name === name);
  if (item && item.quantity > 1) {
    item.quantity--;
    updateCart();
  } else if (item && item.quantity === 1) {
    cart = cart.filter(i => i.name !== name); // remove item if quantity = 1
    updateCart();
  }
}

document.querySelector('.cart-toggle-btn')?.addEventListener('click', function () {
  document.querySelector('.cart')?.classList.toggle('show-cart');
});


