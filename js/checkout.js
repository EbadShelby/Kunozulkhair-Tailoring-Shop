import { cart } from '../data/cart.js';

document.addEventListener('DOMContentLoaded', () => {
  const cartItemsContainer = document.getElementById('cart-items');
  const subtotalElement = document.getElementById('subtotal');
  const shippingElement = document.getElementById('shipping');
  const fittingFeeElement = document.getElementById('fitting-fee');
  const totalElement = document.getElementById('total');
  const discountElement = document.getElementById('discount');
  const discountRow = document.querySelector('.discount-row');
  const placeOrderBtn = document.getElementById('place-order-btn');
  const deliveryOptions = document.getElementsByName('delivery');
  const scheduleFittingToggle = document.getElementById('schedule-fitting');
  const appointmentDetails = document.getElementById('appointment-details');
  const voucherInput = document.getElementById('voucher-code');
  const applyVoucherBtn = document.querySelector('.apply-btn');
  const useVoucherBtns = document.querySelectorAll('.use-voucher-btn');
  const toggleCustomizations = document.getElementById('toggle-customizations');
  const customizationContent = document.getElementById('customization-content');
  const toggleMeasurements = document.getElementById('toggle-measurements');
  const measurementsContent = document.getElementById('measurements-content');

  // Initial state variables
  let shippingCost = 40; // Standard shipping is default
  let fittingFee = 0;
  let subtotalAmount = 0;
  let appliedDiscount = 0;
  let appliedVoucher = null;

  // Sample product data
  const sampleProduct = {
    name: 'Traditional Filipino Dress',
    price: 2499.00,
    quantity: 1,
    size: 'Medium',
    color: 'Royal Blue'
  };

  // Initialize custom elements
  initializeCustomElements();

  function initializeCustomElements() {
    // Set up toggle functionality for customization details
    if (toggleCustomizations && customizationContent) {
      customizationContent.style.display = 'none';
      toggleCustomizations.addEventListener('click', () => {
        const chevron = toggleCustomizations.querySelector('.chevron');
        if (customizationContent.style.display === 'none') {
          customizationContent.style.display = 'block';
          chevron.classList.add('active');
        } else {
          customizationContent.style.display = 'none';
          chevron.classList.remove('active');
        }
      });
    }

    // Set up toggle functionality for measurements
    if (toggleMeasurements && measurementsContent) {
      measurementsContent.style.display = 'none';
      toggleMeasurements.addEventListener('click', () => {
        const chevron = toggleMeasurements.querySelector('.chevron');
        if (measurementsContent.style.display === 'none') {
          measurementsContent.style.display = 'block';
          chevron.classList.add('active');
        } else {
          measurementsContent.style.display = 'none';
          chevron.classList.remove('active');
        }
      });
    }

    // Setup fitting appointment toggle
    if (scheduleFittingToggle && appointmentDetails) {
      scheduleFittingToggle.addEventListener('change', (e) => {
        appointmentDetails.style.display = e.target.checked ? 'block' : 'none';
        fittingFee = e.target.checked ? 150 : 0;
        updateOrderSummary();
      });
    }

    // Set up date and time selection for fitting appointment
    const dateOptions = document.querySelectorAll('input[name="fitting-date"]');
    const timeOptions = document.querySelectorAll('input[name="fitting-time"]');

    dateOptions.forEach(option => {
      option.addEventListener('change', () => {
        updateEstimatedCompletion();
      });
    });

    timeOptions.forEach(option => {
      option.addEventListener('change', () => {
        updateEstimatedCompletion();
      });
    });

    // Setup voucher application
    if (applyVoucherBtn && voucherInput) {
      applyVoucherBtn.addEventListener('click', () => {
        applyVoucher(voucherInput.value);
      });
    }

    // Setup "Use" buttons for available vouchers
    if (useVoucherBtns) {
      useVoucherBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const voucherCode = e.target.dataset.code;
          if (voucherCode) {
            voucherInput.value = voucherCode;
            applyVoucher(voucherCode);
          }
        });
      });
    }

    // Setup edit measurements button
    const editMeasurementsBtn = document.querySelector('.edit-measurements-btn');
    if (editMeasurementsBtn) {
      editMeasurementsBtn.addEventListener('click', () => {
        showMeasurementsModal();
      });
    }

    // Setup schedule professional measurement button
    const scheduleMeasurementBtn = document.querySelector('.schedule-measurement-btn');
    if (scheduleMeasurementBtn) {
      scheduleMeasurementBtn.addEventListener('click', () => {
        showScheduleMeasurementModal();
      });
    }
  }

  function updateOrderSummary() {
    // Clear existing items
    cartItemsContainer.innerHTML = '';

    // Calculate subtotal from sample product
    subtotalAmount = sampleProduct.price * sampleProduct.quantity;

    // Add sample product to the summary
    const itemElement = document.createElement('div');
    itemElement.className = 'summary-item';
    itemElement.innerHTML = `
      <span>${sampleProduct.name} x ${sampleProduct.quantity}</span>
      <span>₱${subtotalAmount.toFixed(2)}</span>
    `;
    cartItemsContainer.appendChild(itemElement);

    // Calculate total with shipping and fitting fee
    const total = subtotalAmount + shippingCost + fittingFee - appliedDiscount;

    // Update summary values
    subtotalElement.textContent = `₱${subtotalAmount.toFixed(2)}`;
    shippingElement.textContent = `₱${shippingCost.toFixed(2)}`;
    fittingFeeElement.textContent = `₱${fittingFee.toFixed(2)}`;
    totalElement.textContent = `₱${total.toFixed(2)}`;

    // Show or hide discount row
    if (appliedDiscount > 0) {
      discountRow.style.display = 'flex';
      discountElement.textContent = `-₱${appliedDiscount.toFixed(2)}`;
    } else {
      discountRow.style.display = 'none';
    }

    // Update estimated completion date based on current selections
    updateEstimatedCompletion();
  }

  function updateEstimatedCompletion() {
    const estimateDateElement = document.getElementById('estimate-date');
    const selectedDate = document.querySelector('input[name="fitting-date"]:checked');

    // Base completion time is ~10 days from now
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() + 10);

    // If fitting is scheduled, add 4 more days to account for alterations
    if (scheduleFittingToggle && scheduleFittingToggle.checked && selectedDate) {
      baseDate.setDate(baseDate.getDate() + 4);
    }

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

  function applyVoucher(code) {
    // If code is empty, clear any applied voucher
    if (!code) {
      showToast('Please enter a voucher code', 'error');
      return;
    }

    // Check for valid voucher codes
    code = code.trim().toUpperCase();

    if (code === 'NEW10') {
      appliedDiscount = subtotalAmount * 0.1; // 10% discount
      appliedVoucher = 'NEW10';
      showToast('10% discount applied successfully!', 'success');
    } else if (code === 'WEDDING50') {
      appliedDiscount = 50; // Fixed ₱50 off
      appliedVoucher = 'WEDDING50';
      showToast('₱50 off applied successfully!', 'success');
    } else {
      showToast('Invalid voucher code', 'error');
      appliedDiscount = 0;
      appliedVoucher = null;
    }

    // Update the summary with the applied discount
    updateOrderSummary();
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

  function showMeasurementsModal() {
    // Create modal for editing measurements
    const modalHTML = `
      <div class="modal-backdrop"></div>
      <div class="modal-content">
        <div class="modal-header">
          <h3>Edit Measurements</h3>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <div class="measurement-form">
            <div class="measurement-input">
              <label for="measurement-bust">Bust</label>
              <input type="number" id="measurement-bust" value="36" step="0.5"> inches
            </div>
            <div class="measurement-input">
              <label for="measurement-waist">Waist</label>
              <input type="number" id="measurement-waist" value="28" step="0.5"> inches
            </div>
            <div class="measurement-input">
              <label for="measurement-hip">Hip</label>
              <input type="number" id="measurement-hip" value="38" step="0.5"> inches
            </div>
            <div class="measurement-input">
              <label for="measurement-shoulder">Shoulder</label>
              <input type="number" id="measurement-shoulder" value="15" step="0.5"> inches
            </div>
            <div class="measurement-input">
              <label for="measurement-length">Length</label>
              <input type="number" id="measurement-length" value="42" step="0.5"> inches
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="modal-cancel">Cancel</button>
          <button class="modal-save">Save Changes</button>
        </div>
      </div>
    `;

    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer);

    // Add modal styles
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
      .modal-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      }
      .modal-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
      }
      .modal-content {
        background-color: white;
        border-radius: 8px;
        width: 90%;
        max-width: 500px;
        z-index: 1001;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        animation: modal-in 0.3s ease-out;
      }
      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 20px;
        border-bottom: 1px solid #E8E8E8;
      }
      .modal-header h3 {
        margin: 0;
        color: #4A4A4A;
      }
      .modal-close {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #888;
      }
      .modal-body {
        padding: 20px;
      }
      .modal-footer {
        padding: 15px 20px;
        border-top: 1px solid #E8E8E8;
        display: flex;
        justify-content: flex-end;
        gap: 10px;
      }
      .modal-cancel, .modal-save {
        padding: 8px 16px;
        border-radius: 4px;
        font-weight: 500;
        cursor: pointer;
      }
      .modal-cancel {
        background-color: white;
        border: 1px solid #E8E8E8;
      }
      .modal-save {
        background-color: #D4AF37;
        border: none;
        color: #4A4A4A;
      }
      .measurement-form {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
      }
      .measurement-input {
        display: flex;
        flex-direction: column;
        gap: 5px;
      }
      .measurement-input label {
        font-weight: 500;
        color: #4A4A4A;
      }
      .measurement-input input {
        padding: 8px;
        border: 1px solid #E8E8E8;
        border-radius: 4px;
      }
      @keyframes modal-in {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      @media (max-width: 600px) {
        .measurement-form {
          grid-template-columns: 1fr;
        }
      }
    `;
    document.head.appendChild(modalStyle);

    // Modal functionality
    const closeBtn = modalContainer.querySelector('.modal-close');
    const cancelBtn = modalContainer.querySelector('.modal-cancel');
    const saveBtn = modalContainer.querySelector('.modal-save');
    const backdrop = modalContainer.querySelector('.modal-backdrop');

    const closeModal = () => {
      modalContainer.remove();
      modalStyle.remove();
    };

    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);

    saveBtn.addEventListener('click', () => {
      // Get values from inputs
      const bust = document.getElementById('measurement-bust').value;
      const waist = document.getElementById('measurement-waist').value;
      const hip = document.getElementById('measurement-hip').value;
      const shoulder = document.getElementById('measurement-shoulder').value;
      const length = document.getElementById('measurement-length').value;

      // Update the displayed measurements
      document.querySelector('.measurement-item:nth-child(1) .measurement-value').textContent = `${bust} inches`;
      document.querySelector('.measurement-item:nth-child(2) .measurement-value').textContent = `${waist} inches`;
      document.querySelector('.measurement-item:nth-child(3) .measurement-value').textContent = `${hip} inches`;
      document.querySelector('.measurement-item:nth-child(4) .measurement-value').textContent = `${shoulder} inches`;
      document.querySelector('.measurement-item:nth-child(5) .measurement-value').textContent = `${length} inches`;

      // Show success toast
      showToast('Measurements updated successfully', 'success');

      closeModal();
    });
  }

  function showScheduleMeasurementModal() {
    // Show toast notification
    showToast('Professional measurement scheduling coming soon!', 'info');
  }

  // Handle delivery option changes
  deliveryOptions.forEach(option => {
    option.addEventListener('change', (e) => {
      if (e.target.value === 'standard') {
        shippingCost = 40;
      } else {
        shippingCost = 0; // Free for pickup
      }
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
      showToast('Please fill in your delivery details before placing the order.', 'error');
      return;
    }

    // Get fitting information if selected
    let fittingInfo = null;
    if (scheduleFittingToggle && scheduleFittingToggle.checked) {
      const selectedDate = document.querySelector('input[name="fitting-date"]:checked');
      const selectedTime = document.querySelector('input[name="fitting-time"]:checked');

      if (!selectedDate || !selectedTime) {
        showToast('Please select a date and time for your fitting appointment.', 'error');
        return;
      }

      fittingInfo = {
        date: selectedDate.value,
        time: selectedTime.value
      };
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
        subtotal: subtotalAmount,
        shipping: shippingCost,
        fittingFee: fittingFee,
        discount: appliedDiscount,
        voucher: appliedVoucher,
        total: subtotalAmount + shippingCost + fittingFee - appliedDiscount,
        paymentMethod: document.querySelector('input[name="payment"]:checked').value
      },
      fittingAppointment: fittingInfo,
      orderDate: new Date().toISOString()
    };

    // Log the order (in a real app, this would be sent to a server)
    console.log('Order placed:', order);

    // Show success message and redirect to confirmation page
    setTimeout(() => {
      showToast('Order placed successfully! Redirecting to confirmation page...', 'success');

      // In a real app, this would redirect to an order confirmation page
      // For now, just reload the page after 2 seconds
      setTimeout(() => {
        // window.location.href = 'order-confirmation.php?orderId=12345';
        alert('Order placed successfully! Thank you for your purchase.');
      }, 2000);
    }, 500);
  });

  // Initial render
  updateOrderSummary();
});
