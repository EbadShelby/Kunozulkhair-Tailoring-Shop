/**
 * Cart Toggle Test Script
 * 
 * This script helps test the cart toggle functionality across different pages.
 * It logs information about the cart toggle state and any potential issues.
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('Cart Toggle Test Script loaded');
  
  // Get DOM elements
  const cartIcon = document.getElementById('cart-icon');
  const cartSidebar = document.getElementById('cart-sidebar');
  
  // Log initial state
  console.log('Cart Icon exists:', !!cartIcon);
  console.log('Cart Sidebar exists:', !!cartSidebar);
  
  if (cartIcon && cartSidebar) {
    // Log current classes
    console.log('Cart Icon classes:', cartIcon.className);
    console.log('Cart Sidebar classes:', cartSidebar.className);
    console.log('Cart Sidebar is visible:', cartSidebar.classList.contains('open'));
    
    // Add test click handler
    cartIcon.addEventListener('click', () => {
      console.log('Cart Icon clicked');
      console.log('Cart Sidebar is now visible:', cartSidebar.classList.contains('open'));
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
    document.body.appendChild(testIndicator);
  }
});
