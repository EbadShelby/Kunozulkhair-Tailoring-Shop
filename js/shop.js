import { cart } from '../data/cart.js';
import { products } from '../data/products.js';

const cartIcon = document.getElementById('cart-icon');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.getElementById('close-cart');
const cartCount = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

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
export function addToCart(productName, price) {
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
      <span>${item.name} (₱${item.price})</span>
      <div class="quantity-control">
        <button class="decrease-btn" data-product="${item.name}">−</button>
        <span>${item.quantity}</span>
        <button class="increase-btn" data-product="${item.name}">+</button>
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

document.querySelector('.cart-toggle-btn')?.addEventListener('click', function () {
  document.querySelector('.cart')?.classList.toggle('show-cart');
});

// Function to render products to the shop page
document.addEventListener("DOMContentLoaded", () => {
  const productsContainer = document.querySelector(".shop-products");
  let html = "";
  
  // Clear any existing products
  if (productsContainer) {
    productsContainer.innerHTML = "";

    // Render each product
    products.forEach((product) => {
      html = `
        <article class="product-card" data-product-id="${product.id}">
          <img src="${product.image}" alt="${product.name}" />
          <h3>${product.name}</h3>
          <p>₱${product.price}</p>
          <button data-product-id="${product.id}">Add to Cart</button>
        </article>
        `;

      productsContainer.innerHTML += html;
    });

    // Add event listeners to all "Add to Cart" buttons
    document.querySelectorAll(".product-card button").forEach((button) => {
      button.addEventListener("click", () => {
        const product = button.closest(".product-card");
        const productId = product.dataset.productId;
        const foundProduct = products.find((p) => p.id == productId);

        if (foundProduct) {
          const name = foundProduct.name;
          const price = foundProduct.price;

          // Call the addToCart function from shop.js
          if (typeof addToCart === "function") {
            addToCart(name, price);
          } else {
            console.error("addToCart function not found");
          }
        }
      });
    });
  }
});
