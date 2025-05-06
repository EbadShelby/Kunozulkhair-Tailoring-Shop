// Admin Orders JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Initialize sidebar toggle functionality
  initSidebarToggle();

  // Load orders data
  loadOrdersData();

  // Set up event listeners
  setupEventListeners();
});

// Function to initialize sidebar toggle
function initSidebarToggle() {
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const adminContainer = document.querySelector('.admin-container');

  if (sidebarToggle && adminContainer) {
    sidebarToggle.addEventListener('click', function() {
      adminContainer.classList.toggle('sidebar-collapsed');
    });
  }
}

// Function to load orders data
function loadOrdersData() {
  const ordersTableBody = document.getElementById('orders-table-body');
  if (!ordersTableBody) return;

  // Get orders from local storage or use default data
  let orders = [];

  try {
    // Try to get orders from localStorage
    const storedOrders = localStorage.getItem('adminOrders');
    if (storedOrders) {
      orders = JSON.parse(storedOrders);
    } else {
      // If no orders in localStorage, use sample data
      orders = getSampleOrders();

      // Save to localStorage for future use
      localStorage.setItem('adminOrders', JSON.stringify(orders));
    }
  } catch (error) {
    console.error('Error loading orders:', error);
    orders = getSampleOrders();
  }

  // Render orders
  if (orders.length > 0) {
    renderOrders(orders);
  } else {
    renderEmptyState(ordersTableBody);
  }
}

// Function to get sample orders data
function getSampleOrders() {
  return [
    {
      id: 'ORD-10045',
      customer: {
        name: 'Maria Santos',
        email: 'maria@example.com',
        phone: '+63 912 345 6789',
        address: '123 Main St, Cotabato City'
      },
      date: 'July 15, 2023',
      items: [
        {
          name: 'Custom Wedding Dress',
          details: 'White silk, embroidered bodice, A-line',
          quantity: 1,
          price: 35000,
          total: 35000
        }
      ],
      subtotal: 35000,
      shipping: 0,
      discount: 0,
      total: 35000,
      status: 'processing',
      paymentMethod: 'GCash',
      paymentStatus: 'paid',
      type: 'custom',
      notes: [
        'Customer requested delivery for wedding on August 20th.',
        'First fitting scheduled for July 25th.'
      ]
    },
    {
      id: 'ORD-10038',
      customer: {
        name: 'Juan Dela Cruz',
        email: 'juan@example.com',
        phone: '+63 917 123 4567',
        address: '456 Oak St, Cotabato City'
      },
      date: 'July 10, 2023',
      items: [
        {
          name: 'Embroidered Barong Tagalog',
          details: 'Piña fabric, traditional pattern',
          quantity: 1,
          price: 4500,
          total: 4500
        }
      ],
      subtotal: 4500,
      shipping: 40,
      discount: 0,
      total: 4540,
      status: 'ready',
      paymentMethod: 'GCash',
      paymentStatus: 'paid',
      type: 'custom',
      notes: [
        'Customer requested traditional embroidery pattern.',
        'Ready for pickup on July 20th.'
      ]
    },
    {
      id: 'ORD-10032',
      customer: {
        name: 'Ana Reyes',
        email: 'ana@example.com',
        phone: '+63 918 765 4321',
        address: '789 Pine St, Cotabato City'
      },
      date: 'July 5, 2023',
      items: [
        {
          name: 'Formal Evening Gown',
          details: 'Navy blue silk, mermaid cut',
          quantity: 1,
          price: 12800,
          total: 12800
        }
      ],
      subtotal: 12800,
      shipping: 0,
      discount: 0,
      total: 12800,
      status: 'processing',
      paymentMethod: 'Bank Transfer',
      paymentStatus: 'paid',
      type: 'custom',
      notes: [
        'Customer needs gown for charity gala on July 30th.',
        'Second fitting scheduled for July 15th.'
      ]
    },
    {
      id: 'ORD-10028',
      customer: {
        name: 'Mike Johnson',
        email: 'mike@example.com',
        phone: '+63 919 876 5432',
        address: '101 Maple St, Cotabato City'
      },
      date: 'July 1, 2023',
      items: [
        {
          name: 'Business Suit',
          details: 'Charcoal gray, slim fit',
          quantity: 1,
          price: 8500,
          total: 8500
        },
        {
          name: 'Dress Shirt',
          details: 'White cotton, French cuffs',
          quantity: 2,
          price: 1500,
          total: 3000
        }
      ],
      subtotal: 11500,
      shipping: 40,
      discount: 1000,
      total: 10540,
      status: 'completed',
      paymentMethod: 'Cash on Delivery',
      paymentStatus: 'paid',
      type: 'custom',
      notes: [
        'Customer very satisfied with the fit.',
        'Delivered on July 10th.'
      ]
    },
    {
      id: 'ORD-10025',
      customer: {
        name: 'Sarah Lee',
        email: 'sarah@example.com',
        phone: '+63 920 123 7890',
        address: '202 Cedar St, Cotabato City'
      },
      date: 'June 28, 2023',
      items: [
        {
          name: 'Casual Dress',
          details: 'Floral pattern, cotton blend',
          quantity: 2,
          price: 2500,
          total: 5000
        },
        {
          name: 'Blouse',
          details: 'White silk, short sleeve',
          quantity: 1,
          price: 1800,
          total: 1800
        }
      ],
      subtotal: 6800,
      shipping: 40,
      discount: 500,
      total: 6340,
      status: 'completed',
      paymentMethod: 'PayMaya',
      paymentStatus: 'paid',
      type: 'product',
      notes: [
        'Customer requested gift wrapping.',
        'Delivered on July 5th.'
      ]
    },
    {
      id: 'ORD-10020',
      customer: {
        name: 'David Kim',
        email: 'david@example.com',
        phone: '+63 921 234 5678',
        address: '303 Birch St, Cotabato City'
      },
      date: 'June 25, 2023',
      items: [
        {
          name: 'Suit Alteration',
          details: 'Jacket and pants adjustment',
          quantity: 1,
          price: 2500,
          total: 2500
        }
      ],
      subtotal: 2500,
      shipping: 0,
      discount: 0,
      total: 2500,
      status: 'cancelled',
      paymentMethod: 'Cash',
      paymentStatus: 'refunded',
      type: 'alteration',
      notes: [
        'Customer cancelled due to travel plans.',
        'Full refund processed on June 27th.'
      ]
    }
  ];
}

// Function to render orders to the table
function renderOrders(orders) {
  const ordersTableBody = document.getElementById('orders-table-body');
  if (!ordersTableBody) return;

  // Clear table
  ordersTableBody.innerHTML = '';

  // Apply filters
  const statusFilter = document.getElementById('status-filter');
  const dateFilter = document.getElementById('date-filter');
  const typeFilter = document.getElementById('type-filter');

  let filteredOrders = [...orders];

  // Apply status filter
  if (statusFilter && statusFilter.value !== 'all') {
    filteredOrders = filteredOrders.filter(order =>
      order.status === statusFilter.value
    );
  }

  // Apply date filter (simplified for demo)
  if (dateFilter && dateFilter.value !== 'all') {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    filteredOrders = filteredOrders.filter(order => {
      const orderDate = new Date(order.date);

      if (dateFilter.value === 'today') {
        return orderDate.toDateString() === today.toDateString();
      } else if (dateFilter.value === 'yesterday') {
        return orderDate.toDateString() === yesterday.toDateString();
      } else if (dateFilter.value === 'week') {
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        return orderDate >= weekAgo;
      } else if (dateFilter.value === 'month') {
        const monthAgo = new Date(today);
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        return orderDate >= monthAgo;
      }

      return true;
    });
  }

  // Apply type filter
  if (typeFilter && typeFilter.value !== 'all') {
    filteredOrders = filteredOrders.filter(order =>
      order.type === typeFilter.value
    );
  }

  // Add orders to table
  filteredOrders.forEach(order => {
    const row = document.createElement('tr');
    row.setAttribute('data-order-id', order.id);

    // Format items for display
    const itemsText = order.items.map(item => item.name).join(', ');

    // Create status badge
    const statusBadge = `<span class="status-badge status-${order.status}">${formatStatus(order.status)}</span>`;

    // Add cells
    row.innerHTML = `
      <td>${order.id}</td>
      <td>
        <div class="customer-info">
          <div class="customer-name">${order.customer.name}</div>
          <div class="customer-email">${order.customer.email}</div>
        </div>
      </td>
      <td>${order.date}</td>
      <td class="order-items">${itemsText}</td>
      <td class="order-total">₱${order.total.toLocaleString()}</td>
      <td class="order-status">${statusBadge}</td>
      <td>
        <div class="order-actions">
          <button class="action-btn view" data-order-id="${order.id}" title="View Order">
            <i class="fas fa-eye"></i>
          </button>
          <button class="action-btn edit" data-order-id="${order.id}" title="Edit Order">
            <i class="fas fa-edit"></i>
          </button>
          <button class="action-btn cancel" data-order-id="${order.id}" title="Cancel Order">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </td>
    `;

    // Add row to table
    ordersTableBody.appendChild(row);
  });

  // Add event listeners to action buttons
  addActionButtonListeners();
}

// Function to render empty state
function renderEmptyState(tableBody) {
  tableBody.innerHTML = `
    <tr>
      <td colspan="7" class="empty-state">
        <div class="empty-state-content">
          <i class="fas fa-shopping-cart"></i>
          <p>No orders found</p>
        </div>
      </td>
    </tr>
  `;
}

// Function to add event listeners to action buttons
function addActionButtonListeners() {
  // View buttons
  document.querySelectorAll('.action-btn.view').forEach(button => {
    button.addEventListener('click', function() {
      const orderId = this.getAttribute('data-order-id');
      openOrderDetailModal(orderId);
    });
  });

  // Edit buttons
  document.querySelectorAll('.action-btn.edit').forEach(button => {
    button.addEventListener('click', function() {
      const orderId = this.getAttribute('data-order-id');
      // In a real app, this would open an edit modal
      alert(`Edit order ${orderId} functionality would be implemented here.`);
    });
  });

  // Cancel buttons
  document.querySelectorAll('.action-btn.cancel').forEach(button => {
    button.addEventListener('click', function() {
      const orderId = this.getAttribute('data-order-id');
      // In a real app, this would open a confirmation modal
      if (confirm(`Are you sure you want to cancel order ${orderId}?`)) {
        cancelOrder(orderId);
      }
    });
  });
}

// Function to set up event listeners
function setupEventListeners() {
  // Filter change events
  const statusFilter = document.getElementById('status-filter');
  const dateFilter = document.getElementById('date-filter');
  const typeFilter = document.getElementById('type-filter');

  if (statusFilter) {
    statusFilter.addEventListener('change', loadOrdersData);
  }

  if (dateFilter) {
    dateFilter.addEventListener('change', loadOrdersData);
  }

  if (typeFilter) {
    typeFilter.addEventListener('change', loadOrdersData);
  }

  // Export button
  const exportBtn = document.getElementById('export-orders');
  if (exportBtn) {
    exportBtn.addEventListener('click', exportOrders);
  }

  // Order Detail Modal
  const orderDetailModal = document.getElementById('order-detail-modal');
  const closeModalButtons = document.querySelectorAll('.close-modal');
  const updateStatusBtn = document.getElementById('update-status-btn');

  if (closeModalButtons) {
    closeModalButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Close the parent modal
        this.closest('.modal').style.display = 'none';

        // Restore body scrolling
        document.body.style.overflow = '';
      });
    });
  }

  if (updateStatusBtn) {
    updateStatusBtn.addEventListener('click', updateOrderStatus);
  }

  // Close modals when clicking outside
  window.addEventListener('click', function(e) {
    if (e.target === orderDetailModal) {
      orderDetailModal.style.display = 'none';

      // Restore body scrolling
      document.body.style.overflow = '';
    }
  });
}

// Function to open order detail modal
function openOrderDetailModal(orderId) {
  const orderDetailModal = document.getElementById('order-detail-modal');
  const detailOrderId = document.getElementById('detail-order-id');

  if (orderDetailModal && detailOrderId) {
    // Set order ID
    detailOrderId.textContent = orderId;

    // Get order data
    const orders = JSON.parse(localStorage.getItem('adminOrders') || '[]');
    const order = orders.find(o => o.id === orderId);

    if (order) {
      // Fill order details
      fillOrderDetails(order);

      // Update status steps
      updateStatusSteps(order.status);

      // Show modal
      orderDetailModal.style.display = 'block';

      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';

      // Scroll to top of modal
      window.scrollTo(0, 0);
    }
  }
}

// Function to fill order details
function fillOrderDetails(order) {
  // Customer information
  document.getElementById('customer-name').textContent = order.customer.name;
  document.getElementById('customer-email').textContent = order.customer.email;
  document.getElementById('customer-phone').textContent = order.customer.phone;
  document.getElementById('customer-address').textContent = order.customer.address;

  // Order information
  document.getElementById('order-date').textContent = order.date;
  document.getElementById('order-type').textContent = formatOrderType(order.type);
  document.getElementById('payment-method').textContent = order.paymentMethod;

  // Payment status
  const paymentStatusElement = document.getElementById('payment-status');
  paymentStatusElement.innerHTML = `<span class="status-badge status-${order.paymentStatus}">${formatPaymentStatus(order.paymentStatus)}</span>`;

  // Order items
  const orderItemsBody = document.getElementById('order-items-body');
  orderItemsBody.innerHTML = '';

  order.items.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.details}</td>
      <td>${item.quantity}</td>
      <td>₱${item.price.toLocaleString()}</td>
      <td>₱${item.total.toLocaleString()}</td>
    `;
    orderItemsBody.appendChild(row);
  });

  // Order totals
  document.getElementById('order-subtotal').textContent = `₱${order.subtotal.toLocaleString()}`;
  document.getElementById('order-shipping').textContent = `₱${order.shipping.toLocaleString()}`;
  document.getElementById('order-discount').textContent = `-₱${order.discount.toLocaleString()}`;
  document.getElementById('order-total').textContent = `₱${order.total.toLocaleString()}`;

  // Order notes
  const orderNotesElement = document.getElementById('order-notes');
  orderNotesElement.innerHTML = '';

  if (order.notes && order.notes.length > 0) {
    order.notes.forEach(note => {
      const noteElement = document.createElement('p');
      noteElement.textContent = note;
      orderNotesElement.appendChild(noteElement);
    });
  } else {
    orderNotesElement.innerHTML = '<p>No notes for this order.</p>';
  }

  // Set current status in dropdown
  const newStatusSelect = document.getElementById('new-status');
  if (newStatusSelect) {
    newStatusSelect.value = order.status;
  }
}

// Function to update status steps
function updateStatusSteps(currentStatus) {
  const statusSteps = document.querySelectorAll('.status-step');

  // Define status order
  const statusOrder = ['new', 'processing', 'ready', 'completed'];
  const currentIndex = statusOrder.indexOf(currentStatus);

  statusSteps.forEach((step, index) => {
    // Remove all classes first
    step.classList.remove('active', 'completed');

    const stepStatus = step.getAttribute('data-status');
    const stepIndex = statusOrder.indexOf(stepStatus);

    if (stepIndex === currentIndex) {
      // Current status
      step.classList.add('active');
    } else if (stepIndex < currentIndex) {
      // Completed status
      step.classList.add('completed');
    }
  });
}

// Function to update order status
function updateOrderStatus() {
  const orderId = document.getElementById('detail-order-id').textContent;
  const newStatus = document.getElementById('new-status').value;
  const statusNote = document.getElementById('status-note').value;
  const notifyCustomer = document.getElementById('notify-customer').checked;

  // Get orders from localStorage
  let orders = JSON.parse(localStorage.getItem('adminOrders') || '[]');

  // Find order
  const orderIndex = orders.findIndex(o => o.id === orderId);

  if (orderIndex !== -1) {
    // Update order status
    orders[orderIndex].status = newStatus;

    // Add note if provided
    if (statusNote.trim()) {
      if (!orders[orderIndex].notes) {
        orders[orderIndex].notes = [];
      }

      const dateTime = new Date().toLocaleString();
      orders[orderIndex].notes.push(`[${dateTime}] Status updated to ${formatStatus(newStatus)}: ${statusNote}`);
    }

    // Save to localStorage
    localStorage.setItem('adminOrders', JSON.stringify(orders));

    // Update UI
    updateStatusSteps(newStatus);

    // Reload orders table
    loadOrdersData();

    // Show confirmation
    if (notifyCustomer) {
      alert(`Order status updated to ${formatStatus(newStatus)}. Customer has been notified.`);
    } else {
      alert(`Order status updated to ${formatStatus(newStatus)}.`);
    }
  }
}

// Function to cancel order
function cancelOrder(orderId) {
  // Get orders from localStorage
  let orders = JSON.parse(localStorage.getItem('adminOrders') || '[]');

  // Find order
  const orderIndex = orders.findIndex(o => o.id === orderId);

  if (orderIndex !== -1) {
    // Update order status
    orders[orderIndex].status = 'cancelled';

    // Add note
    if (!orders[orderIndex].notes) {
      orders[orderIndex].notes = [];
    }

    const dateTime = new Date().toLocaleString();
    orders[orderIndex].notes.push(`[${dateTime}] Order cancelled by admin.`);

    // Save to localStorage
    localStorage.setItem('adminOrders', JSON.stringify(orders));

    // Reload orders table
    loadOrdersData();

    // Show confirmation
    alert(`Order ${orderId} has been cancelled.`);
  }
}

// Function to export orders
function exportOrders() {
  // In a real app, this would generate a CSV or Excel file
  // For demo purposes, we'll just show an alert
  alert('Export functionality would generate a CSV or Excel file with the current orders data.');
}

// Helper function to format status
function formatStatus(status) {
  switch (status) {
    case 'new':
      return 'New';
    case 'processing':
      return 'Processing';
    case 'ready':
      return 'Ready for Pickup';
    case 'completed':
      return 'Completed';
    case 'cancelled':
      return 'Cancelled';
    default:
      return status.charAt(0).toUpperCase() + status.slice(1);
  }
}

// Helper function to format order type
function formatOrderType(type) {
  switch (type) {
    case 'product':
      return 'Product Order';
    case 'custom':
      return 'Custom Order';
    case 'alteration':
      return 'Alteration';
    default:
      return type.charAt(0).toUpperCase() + type.slice(1);
  }
}

// Helper function to format payment status
function formatPaymentStatus(status) {
  switch (status) {
    case 'paid':
      return 'Paid';
    case 'unpaid':
      return 'Unpaid';
    case 'partial':
      return 'Partially Paid';
    case 'refunded':
      return 'Refunded';
    default:
      return status.charAt(0).toUpperCase() + status.slice(1);
  }
}
