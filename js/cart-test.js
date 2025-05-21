/**
 * Cart Toggle Test Script
 *
 * This script helps test the cart toggle functionality across different pages.
 * It logs information about the cart toggle state and any potential issues.
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('Cart Toggle Test Script loaded on page:', window.location.pathname);

  // Get DOM elements
  const cartIcon = document.getElementById('cart-icon');
  const cartSidebar = document.getElementById('cart-sidebar');
  const closeCart = document.getElementById('close-cart');

  // Log initial state
  console.log('Cart Icon exists:', !!cartIcon);
  console.log('Cart Sidebar exists:', !!cartSidebar);
  console.log('Close Cart Button exists:', !!closeCart);

  if (cartIcon) {
    console.log('Cart Icon HTML:', cartIcon.outerHTML);

    // Check for nested elements
    const cartButton = cartIcon.querySelector('button');
    const cartSvg = cartIcon.querySelector('svg');
    const cartCount = cartIcon.querySelector('.cart-count');

    console.log('Cart Button exists:', !!cartButton);
    console.log('Cart SVG exists:', !!cartSvg);
    console.log('Cart Count exists:', !!cartCount);
  }

  if (cartSidebar) {
    // Log current classes
    console.log('Cart Sidebar classes:', cartSidebar.className);
    console.log('Cart Sidebar is visible:', cartSidebar.classList.contains('open'));
    console.log('Cart Sidebar CSS:', window.getComputedStyle(cartSidebar).right);
  }

  if (cartIcon && cartSidebar) {
    // Add test click handler
    cartIcon.addEventListener('click', () => {
      console.log('Cart Icon clicked');
      console.log('Cart Sidebar is now visible:', cartSidebar.classList.contains('open'));
      console.log('Cart Sidebar CSS right value:', window.getComputedStyle(cartSidebar).right);
    });

    // Add visual indicator
    const testIndicator = document.createElement('div');
    testIndicator.style.position = 'fixed';
    testIndicator.style.bottom = '10px';
    testIndicator.style.right = '10px';
    testIndicator.style.backgroundColor = 'green';
    testIndicator.style.color = 'white';
    testIndicator.style.padding = '5px 10px';
    testIndicator.style.borderRadius = '5px';
    testIndicator.style.zIndex = '10000';
    testIndicator.style.fontSize = '12px';
    testIndicator.textContent = 'Cart Test Active';

    // Add click handler to test indicator to force toggle
    testIndicator.addEventListener('click', () => {
      console.log('Test indicator clicked, forcing cart toggle');
      cartSidebar.classList.toggle('open');
      console.log('Cart Sidebar is now visible:', cartSidebar.classList.contains('open'));
      console.log('Cart Sidebar CSS right value:', window.getComputedStyle(cartSidebar).right);
    });

    document.body.appendChild(testIndicator);
  } else {
    // Add error indicator
    const errorIndicator = document.createElement('div');
    errorIndicator.style.position = 'fixed';
    errorIndicator.style.bottom = '10px';
    errorIndicator.style.right = '10px';
    errorIndicator.style.backgroundColor = 'red';
    errorIndicator.style.color = 'white';
    errorIndicator.style.padding = '5px 10px';
    errorIndicator.style.borderRadius = '5px';
    errorIndicator.style.zIndex = '10000';
    errorIndicator.style.fontSize = '12px';
    errorIndicator.textContent = cartIcon ? 'Cart Sidebar Missing' : 'Cart Icon Missing';
    document.body.appendChild(errorIndicator);
  }
});
