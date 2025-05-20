document.addEventListener('DOMContentLoaded', () => {
  const subtotalElement = document.getElementById('subtotal');
  const shippingElement = document.getElementById('shipping');
  const totalElement = document.getElementById('total');

  // Initial state variables
  const shippingCost = 40; // Standard shipping cost
  let subtotalAmount = 0;

  // Initialize custom elements
  initializeCustomElements();

  function initializeCustomElements() {

    // Setup edit address button
    const editAddressBtn = document.getElementById('edit-address-btn');
    const addressDetails = document.querySelector('.address-details');
    const editAddressForm = document.getElementById('edit-address-form');

    if (editAddressBtn && addressDetails && editAddressForm) {
      editAddressBtn.addEventListener('click', () => {
        addressDetails.style.display = 'none';
        editAddressForm.style.display = 'block';
      });
    }

    // Setup save address button
    const saveAddressBtn = document.getElementById('save-address-btn');

    if (saveAddressBtn && addressDetails && editAddressForm) {
      saveAddressBtn.addEventListener('click', () => {
        // Get values from form
        const name = document.getElementById('edit_customer_name').value;
        const phone = document.getElementById('edit_customer_phone').value;
        const address = document.getElementById('edit_customer_address').value;

        // Update displayed values
        document.getElementById('customer-name').textContent = name;
        document.getElementById('customer-phone').textContent = phone;
        document.getElementById('customer-address').textContent = address;

        // Update hidden inputs
        document.querySelector('input[name="customer_name"]').value = name;
        document.querySelector('input[name="customer_phone"]').value = phone;
        document.querySelector('input[name="customer_address"]').value = address;

        // Hide form, show details
        editAddressForm.style.display = 'none';
        addressDetails.style.display = 'block';

        showToast('Address updated successfully', 'success');
      });
    }
  }

  function updateOrderSummary() {
    // Get subtotal from the page
    const subtotalText = subtotalElement.textContent;
    subtotalAmount = parseFloat(subtotalText.replace('₱', '').replace(',', ''));

    // Calculate total with shipping
    const total = subtotalAmount + shippingCost;

    // Update summary values
    shippingElement.textContent = `₱${shippingCost.toFixed(2)}`;
    totalElement.textContent = `₱${total.toFixed(2)}`;

    // Update estimated completion date
    updateEstimatedCompletion();
  }

  function updateEstimatedCompletion() {
    const estimateDateElement = document.getElementById('estimate-date');

    // Base completion time is ~10 days from now
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() + 10);

    // Format the date
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = baseDate.toLocaleDateString('en-US', options);

    if (estimateDateElement) {
      estimateDateElement.textContent = formattedDate;

      // Add animation to highlight the updated date
      estimateDateElement.classList.add('updated');
      setTimeout(() => {
        estimateDateElement.classList.remove('updated');
      }, 1000);
    }
  }

  function showToast(message, type = 'info') {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');

    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);

      // Add styles for the toast container
      const style = document.createElement('style');
      style.textContent = `
        .toast-container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1000;
        }
        .toast {
          padding: 12px 20px;
          margin-bottom: 10px;
          border-radius: 5px;
          color: white;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-width: 250px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          animation: slide-in 0.3s ease-out, fade-out 0.5s ease-out 2.5s forwards;
          transition: transform 0.2s ease;
        }
        .toast:hover {
          transform: translateY(-3px);
        }
        .toast.success {
          background-color: #0F9D58;
        }
        .toast.error {
          background-color: #D93025;
        }
        .toast.info {
          background-color: #1A73E8;
        }
        .toast.warning {
          background-color: #F5A623;
        }
        .toast-close {
          background: none;
          border: none;
          color: white;
          font-size: 16px;
          cursor: pointer;
          margin-left: 10px;
        }
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fade-out {
          from { opacity: 1; }
          to { opacity: 0; visibility: hidden; }
        }
      `;
      document.head.appendChild(style);
    }

    // Create the toast
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span>${message}</span>
      <button class="toast-close">&times;</button>
    `;

    // Add close button functionality
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
      toast.remove();
    });

    // Auto-remove after 3 seconds
    setTimeout(() => {
      toast.remove();
    }, 3000);

    // Add to container
    toastContainer.appendChild(toast);
  }

  // Initial render
  updateOrderSummary();
});
