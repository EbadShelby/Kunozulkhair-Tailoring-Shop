import { cart } from '../data/cart.js';

document.addEventListener('DOMContentLoaded', () => {
  const cartItemsContainer = document.getElementById('cart-items');
  const subtotalElement = document.getElementById('subtotal');
  const shippingElement = document.getElementById('shipping');
  const totalElement = document.getElementById('total');
  const placeOrderBtn = document.getElementById('place-order-btn');
  const deliveryOptions = document.getElementsByName('delivery');

  let shippingCost = 0;

  // Sample product data
  const sampleProduct = {
    name: 'Traditional Filipino Dress',
    price: 2499.00,
    quantity: 1,
    size: 'Medium',
    color: 'Royal Blue'
  };

  function updateOrderSummary() {
    // Clear existing items
    cartItemsContainer.innerHTML = '';
    
    // Calculate totals
    const subtotal = sampleProduct.price * sampleProduct.quantity;
    const shipping = 40; // Standard shipping cost
    const total = subtotal + shipping;
    
    // Add each cart item to the summary
    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;
      
      const itemElement = document.createElement('div');
      itemElement.className = 'summary-item';
      itemElement.innerHTML = `
        <span>${item.name} x ${item.quantity}</span>
        <span>₱${itemTotal.toFixed(2)}</span>
      `;
      cartItemsContainer.appendChild(itemElement);
    });
    
    // Update summary values
    subtotalElement.textContent = `₱${subtotal.toFixed(2)}`;
    shippingElement.textContent = `₱${shipping.toFixed(2)}`;
    totalElement.textContent = `₱${total.toFixed(2)}`;
  }

  // Handle delivery option changes
  deliveryOptions.forEach(option => {
    option.addEventListener('change', (e) => {
      shippingCost = e.target.value === 'express' ? 150 : 0;
      updateOrderSummary();
    });
  });

  // Handle place order button click
  placeOrderBtn.addEventListener('click', () => {
    // Get customer details from the form (if they exist)
    const customerName = document.getElementById('customer-name');
    const customerPhone = document.getElementById('customer-phone');
    const customerAddress = document.getElementById('customer-address');

    // Basic validation
    if (customerName.textContent === 'Your Name' || 
        customerPhone.textContent === 'Your Phone' || 
        customerAddress.textContent === 'Your complete address will appear here') {
      alert('Please fill in your delivery details before placing the order.');
      return;
    }

    // Create order object
    const order = {
      product: sampleProduct,
      customerInfo: {
        name: customerName.textContent,
        phone: customerPhone.textContent,
        address: customerAddress.textContent
      },
      orderDetails: {
        subtotal: sampleProduct.price * sampleProduct.quantity,
        shipping: 40,
        total: (sampleProduct.price * sampleProduct.quantity) + 40,
        paymentMethod: document.querySelector('input[name="payment"]:checked').value
      },
      orderDate: new Date().toISOString()
    };

    // Log the order (in a real app, this would be sent to a server)
    console.log('Order placed:', order);
    
    // Show success message
    alert('Order placed successfully! Thank you for your purchase.');
    // In a real app, you might redirect to an order confirmation page
  });

  // Initial render
  updateOrderSummary();
});
