const products = [
  {
    id: 1,
    name: "Light blue dress",
    price: 749,
    rating: { rate: 4.5, count: 100 },
    image: "assets/images/dress 1.jpeg",
    description: "Elegant light blue dress perfect for summer occasions",
  },
  {
    id: 2,
    name: "Red dress",
    price: 749,
    rating: { rate: 4.5, count: 100 },
    image: "assets/images/dress 2.jpeg",
    description: "Stunning red dress for formal events",
  },
  {
    id: 3,
    name: "Floral summer dress",
    price: 599,
    rating: { rate: 4.2, count: 78 },
    image: "assets/images/logo.jpg",
    description: "Light and breezy floral pattern dress for summer",
  },
  {
    id: 4,
    name: "Evening gown",
    price: 1299,
    rating: { rate: 4.8, count: 56 },
    image: "assets/images/logo.jpg",
    description: "Elegant evening gown for special occasions",
  },
  {
    id: 5,
    name: "Casual denim dress",
    price: 499,
    rating: { rate: 4.0, count: 122 },
    image: "assets/images/logo.jpg",
    description: "Comfortable denim dress for everyday wear",
  },
  {
    id: 6,
    name: "Office pencil dress",
    price: 899,
    rating: { rate: 4.6, count: 87 },
    image: "assets/images/logo.jpg",
    description: "Professional pencil dress for office wear",
  },
  {
    id: 7,
    name: "Wedding dress",
    price: 2499,
    rating: { rate: 4.9, count: 43 },
    image: "assets/images/logo.jpg",
    description: "Beautiful white wedding dress with lace details",
  },
  {
    id: 8,
    name: "Cocktail dress",
    price: 899,
    rating: { rate: 4.3, count: 65 },
    image: "assets/images/logo.jpg",
    description: "Stylish cocktail dress for parties and events",
  },
];

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
          <button>Add to Cart</button>
        </article>
        `;

      productsContainer.innerHTML += html;
    });

    // Add event listeners to all "Add to Cart" buttons
    // document.querySelectorAll(".product-card button").forEach((button) => {
    //   button.addEventListener("click", () => {
    //     const product = button.closest(".product-card");
    //     const productId = product.dataset.productId;
    //     const foundProduct = products.find((p) => p.id == productId);

    //     if (foundProduct) {
    //       const name = foundProduct.name;
    //       const price = foundProduct.price;

    //       // Call the addToCart function from shop.js
    //       if (typeof addToCart === "function") {
    //         addToCart(name, price);
    //       } else {
    //         console.error("addToCart function not found");
    //       }
    //     }
    //   });
    // });
  }
});
