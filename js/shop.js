import { products } from '../data/products.js';
import { addToCart } from '../data/cart.js';


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
          addToCart(name, price);
        }
      });
    });
  }
});
