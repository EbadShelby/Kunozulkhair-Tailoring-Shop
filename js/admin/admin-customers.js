// Admin Customers JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const customersTableBody = document.getElementById('customers-table-body');
  const customerSearch = document.getElementById('customer-search');
  const addCustomerBtn = document.getElementById('add-customer-btn');
  const exportCustomersBtn = document.getElementById('export-customers');

  // Customer Detail Modal Elements
  const customerModal = document.getElementById('customer-modal');
  const closeDetailBtn = document.getElementById('close-detail-btn');
  const editCustomerBtn = document.getElementById('edit-customer-btn');

  // Edit Customer Modal Elements
  const editCustomerModal = document.getElementById('edit-customer-modal');
  const customerForm = document.getElementById('customer-form');
  const saveCustomerBtn = document.getElementById('save-customer-btn');
  const cancelEditBtn = document.getElementById('cancel-edit-btn');

  // Delete Modal Elements
  const deleteModal = document.getElementById('delete-modal');
  const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
  const cancelDeleteBtn = document.getElementById('cancel-delete-btn');

  // Close Modal Buttons
  const closeModalButtons = document.querySelectorAll('.close-modal');

  // Initialize customers data
  let customers = [];
  let currentCustomerId = null;

  // Initialize stats
  initializeStats();

  // Load customers data
  loadCustomers();

  // Event Listeners
  customerSearch.addEventListener('input', filterCustomers);
  addCustomerBtn.addEventListener('click', showAddCustomerModal);
  exportCustomersBtn.addEventListener('click', exportCustomers);

  closeDetailBtn.addEventListener('click', () => {
    customerModal.style.display = 'none';
  });

  editCustomerBtn.addEventListener('click', () => {
    customerModal.style.display = 'none';
    showEditCustomerModal(currentCustomerId);
  });

  saveCustomerBtn.addEventListener('click', saveCustomer);
  cancelEditBtn.addEventListener('click', () => {
    editCustomerModal.style.display = 'none';
  });

  confirmDeleteBtn.addEventListener('click', deleteCustomer);
  cancelDeleteBtn.addEventListener('click', () => {
    deleteModal.style.display = 'none';
  });

  // Close modals when clicking on X button
  closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      customerModal.style.display = 'none';
      editCustomerModal.style.display = 'none';
      deleteModal.style.display = 'none';
    });
  });

  // Close modals when clicking outside
  window.addEventListener('click', (event) => {
    if (event.target === customerModal) {
      customerModal.style.display = 'none';
    }
    if (event.target === editCustomerModal) {
      editCustomerModal.style.display = 'none';
    }
    if (event.target === deleteModal) {
      deleteModal.style.display = 'none';
    }
  });

  // Functions
  function initializeStats() {
    // In a real app, these would be fetched from an API
    document.getElementById('total-customers').textContent = '125';
    document.getElementById('new-customers').textContent = '18';
    document.getElementById('returning-customers').textContent = '65';
  }

  function loadCustomers() {
    // In a real app, this would be fetched from an API
    customers = getSampleCustomers();

    // Render customers
    renderCustomers(customers);
  }

  function renderCustomers(customersToRender) {
    // Clear table
    customersTableBody.innerHTML = '';

    if (customersToRender.length === 0) {
      const emptyRow = document.createElement('tr');
      emptyRow.innerHTML = `
        <td colspan="6" class="empty-table-message">
          <i class="fas fa-search"></i>
          <p>No customers found</p>
        </td>
      `;
      customersTableBody.appendChild(emptyRow);
      return;
    }

    // Add customers to table
    customersToRender.forEach(customer => {
      const row = document.createElement('tr');
      row.dataset.customerId = customer.id;

      // Create activity badges
      const ordersBadge = `<span class="stat-badge orders"><i class="fas fa-shopping-cart"></i> ${customer.orders.length}</span>`;
      const appointmentsBadge = `<span class="stat-badge appointments"><i class="fas fa-calendar-check"></i> ${customer.appointments.length}</span>`;

      // Add cells
      row.innerHTML = `
        <td>${customer.id}</td>
        <td>
          <div class="customer-info">
            <div class="customer-name">${customer.name}</div>
            <div class="customer-email">${customer.email}</div>
          </div>
        </td>
        <td class="customer-phone">${customer.phone}</td>
        <td class="customer-address">${customer.address}</td>
        <td class="customer-stats">
          ${ordersBadge}
          ${appointmentsBadge}
        </td>
        <td>
          <div class="customer-actions">
            <button class="action-btn view" data-customer-id="${customer.id}" title="View Customer">
              <i class="fas fa-eye"></i>
            </button>
            <button class="action-btn edit" data-customer-id="${customer.id}" title="Edit Customer">
              <i class="fas fa-edit"></i>
            </button>
            <button class="action-btn delete" data-customer-id="${customer.id}" title="Delete Customer">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </td>
      `;

      // Add event listeners to action buttons
      row.querySelector('.action-btn.view').addEventListener('click', () => {
        showCustomerDetails(customer.id);
      });

      row.querySelector('.action-btn.edit').addEventListener('click', () => {
        showEditCustomerModal(customer.id);
      });

      row.querySelector('.action-btn.delete').addEventListener('click', () => {
        showDeleteConfirmation(customer.id);
      });

      // Add row to table
      customersTableBody.appendChild(row);
    });
  }

  function filterCustomers() {
    const searchTerm = customerSearch.value.toLowerCase();

    const filteredCustomers = customers.filter(customer => {
      // Search filter
      const matchesSearch =
        customer.name.toLowerCase().includes(searchTerm) ||
        customer.email.toLowerCase().includes(searchTerm) ||
        customer.phone.toLowerCase().includes(searchTerm);

      return matchesSearch;
    });

    renderCustomers(filteredCustomers);
  }

  function showCustomerDetails(customerId) {
    const customer = customers.find(c => c.id === customerId);
    if (!customer) return;

    currentCustomerId = customerId;

    // Populate customer details
    document.getElementById('detail-customer-name').textContent = customer.name;
    document.getElementById('detail-customer-email').textContent = customer.email;
    document.getElementById('detail-customer-phone').textContent = customer.phone;
    document.getElementById('detail-customer-address').textContent = customer.address;
    document.getElementById('detail-customer-registered').textContent = customer.registered;

    // Populate activity summary
    document.getElementById('detail-customer-orders').textContent = customer.orders.length;

    // Calculate total spent
    const totalSpent = customer.orders.reduce((sum, order) => sum + order.total, 0);
    document.getElementById('detail-customer-spent').textContent = `₱${totalSpent.toLocaleString()}`;

    // Get last order date
    const lastOrder = customer.orders.length > 0 ? customer.orders[0].date : 'N/A';
    document.getElementById('detail-customer-last-order').textContent = lastOrder;

    document.getElementById('detail-customer-appointments').textContent = customer.appointments.length;

    // Get last appointment date
    const lastAppointment = customer.appointments.length > 0 ? customer.appointments[0].date : 'N/A';
    document.getElementById('detail-customer-last-appointment').textContent = lastAppointment;

    // Populate orders table
    const ordersTable = document.getElementById('customer-orders-table');
    ordersTable.innerHTML = '';

    if (customer.orders.length === 0) {
      const emptyRow = document.createElement('tr');
      emptyRow.innerHTML = '<td colspan="5" class="empty-table-message">No orders found</td>';
      ordersTable.appendChild(emptyRow);
    } else {
      customer.orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${order.id}</td>
          <td>${order.date}</td>
          <td>${order.items}</td>
          <td>₱${order.total.toLocaleString()}</td>
          <td><span class="status-badge status-${order.status}">${order.statusText}</span></td>
        `;
        ordersTable.appendChild(row);
      });
    }

    // Populate appointments table
    const appointmentsTable = document.getElementById('customer-appointments-table');
    appointmentsTable.innerHTML = '';

    if (customer.appointments.length === 0) {
      const emptyRow = document.createElement('tr');
      emptyRow.innerHTML = '<td colspan="4" class="empty-table-message">No appointments found</td>';
      appointmentsTable.appendChild(emptyRow);
    } else {
      customer.appointments.forEach(appointment => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${appointment.id}</td>
          <td>${appointment.service}</td>
          <td>${appointment.date} - ${appointment.time}</td>
          <td><span class="status-badge ${appointment.status}">${appointment.statusText}</span></td>
        `;
        appointmentsTable.appendChild(row);
      });
    }

    // Show modal
    customerModal.style.display = 'block';
  }

  function showAddCustomerModal() {
    // Reset form
    customerForm.reset();
    document.getElementById('customer-id').value = '';
    document.getElementById('edit-modal-title').textContent = 'Add New Customer';

    // Show modal
    editCustomerModal.style.display = 'block';
  }

  function showEditCustomerModal(customerId) {
    const customer = customers.find(c => c.id === customerId);
    if (!customer) return;

    // Populate form
    document.getElementById('customer-id').value = customer.id;
    document.getElementById('customer-name').value = customer.name;
    document.getElementById('customer-email').value = customer.email;
    document.getElementById('customer-phone').value = customer.phone;
    document.getElementById('customer-address-input').value = customer.address;
    document.getElementById('customer-notes').value = customer.notes || '';

    document.getElementById('edit-modal-title').textContent = 'Edit Customer';

    // Show modal
    editCustomerModal.style.display = 'block';
  }

  function saveCustomer() {
    // Get form values
    const customerId = document.getElementById('customer-id').value;
    const name = document.getElementById('customer-name').value;
    const email = document.getElementById('customer-email').value;
    const phone = document.getElementById('customer-phone').value;
    const address = document.getElementById('customer-address-input').value;
    const notes = document.getElementById('customer-notes').value;

    // Validate form
    if (!name || !email || !phone || !address) {
      alert('Please fill in all required fields');
      return;
    }

    // In a real app, this would send data to an API
    if (customerId) {
      // Update existing customer
      const customerIndex = customers.findIndex(c => c.id === customerId);
      if (customerIndex !== -1) {
        customers[customerIndex] = {
          ...customers[customerIndex],
          name,
          email,
          phone,
          address,
          notes
        };
      }
    } else {
      // Add new customer
      const newCustomer = {
        id: `CUST-${Math.floor(10000 + Math.random() * 90000)}`,
        name,
        email,
        phone,
        address,
        notes,
        registered: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        orders: [],
        appointments: []
      };

      customers.unshift(newCustomer);
    }

    // Close modal and refresh table
    editCustomerModal.style.display = 'none';
    renderCustomers(customers);
  }

  function showDeleteConfirmation(customerId) {
    const customer = customers.find(c => c.id === customerId);
    if (!customer) return;

    document.getElementById('delete-customer-name').textContent = customer.name;
    currentCustomerId = customerId;

    deleteModal.style.display = 'block';
  }

  function deleteCustomer() {
    // In a real app, this would send a request to an API
    customers = customers.filter(c => c.id !== currentCustomerId);

    // Close modal and refresh table
    deleteModal.style.display = 'none';
    renderCustomers(customers);
  }

  function exportCustomers() {
    // In a real app, this would generate a CSV file
    alert('Exporting customers data...');
  }

  // Function to get sample customers data
  function getSampleCustomers() {
    return [
      {
        id: 'CUST-10045',
        name: 'Maria Santos',
        email: 'maria@example.com',
        phone: '+63 912 345 6789',
        address: '123 Main St, Cotabato City',
        registered: 'July 15, 2023',
        orders: [
          {
            id: 'ORD-10045',
            date: 'July 15, 2023',
            items: 'Custom Wedding Dress',
            total: 35000,
            status: 'processing',
            statusText: 'In Progress'
          }
        ],
        appointments: [
          {
            id: 'APT-10032',
            service: 'Wedding Dress Fitting',
            date: 'July 25, 2023',
            time: '10:00 AM',
            status: 'confirmed',
            statusText: 'Confirmed'
          }
        ]
      },
      {
        id: 'CUST-10038',
        name: 'Juan Dela Cruz',
        email: 'juan@example.com',
        phone: '+63 917 123 4567',
        address: '456 Oak St, Cotabato City',
        registered: 'July 10, 2023',
        orders: [
          {
            id: 'ORD-10038',
            date: 'July 10, 2023',
            items: 'Embroidered Barong Tagalog',
            total: 4500,
            status: 'ready',
            statusText: 'Ready for Pickup'
          }
        ],
        appointments: [
          {
            id: 'APT-10025',
            service: 'Barong Tagalog Measurement',
            date: 'July 5, 2023',
            time: '2:30 PM',
            status: 'completed',
            statusText: 'Completed'
          }
        ]
      },
      {
        id: 'CUST-10032',
        name: 'Ana Reyes',
        email: 'ana@example.com',
        phone: '+63 918 765 4321',
        address: '789 Pine St, Cotabato City',
        registered: 'July 5, 2023',
        orders: [
          {
            id: 'ORD-10032',
            date: 'July 5, 2023',
            items: 'Formal Evening Gown',
            total: 12800,
            status: 'processing',
            statusText: 'In Progress'
          }
        ],
        appointments: [
          {
            id: 'APT-10018',
            service: 'Evening Gown Consultation',
            date: 'July 1, 2023',
            time: '11:00 AM',
            status: 'completed',
            statusText: 'Completed'
          },
          {
            id: 'APT-10028',
            service: 'Evening Gown Fitting',
            date: 'July 15, 2023',
            time: '3:00 PM',
            status: 'completed',
            statusText: 'Completed'
          }
        ]
      },
      {
        id: 'CUST-10028',
        name: 'Mike Johnson',
        email: 'mike@example.com',
        phone: '+63 919 876 5432',
        address: '101 Maple St, Cotabato City',
        registered: 'July 1, 2023',
        orders: [
          {
            id: 'ORD-10028',
            date: 'July 1, 2023',
            items: 'Business Suit, Dress Shirt (2)',
            total: 11500,
            status: 'completed',
            statusText: 'Completed'
          }
        ],
        appointments: []
      },
      {
        id: 'CUST-10025',
        name: 'Sarah Lee',
        email: 'sarah@example.com',
        phone: '+63 920 123 7890',
        address: '202 Cedar St, Cotabato City',
        registered: 'June 28, 2023',
        orders: [
          {
            id: 'ORD-10025',
            date: 'June 28, 2023',
            items: 'Casual Dress (2), Blouse',
            total: 6800,
            status: 'completed',
            statusText: 'Completed'
          }
        ],
        appointments: []
      },
      {
        id: 'CUST-10020',
        name: 'David Kim',
        email: 'david@example.com',
        phone: '+63 921 234 5678',
        address: '303 Birch St, Cotabato City',
        registered: 'June 25, 2023',
        orders: [
          {
            id: 'ORD-10020',
            date: 'June 25, 2023',
            items: 'Suit Alteration',
            total: 2500,
            status: 'cancelled',
            statusText: 'Cancelled'
          }
        ],
        appointments: [
          {
            id: 'APT-10015',
            service: 'Suit Alteration Consultation',
            date: 'June 23, 2023',
            time: '1:00 PM',
            status: 'cancelled',
            statusText: 'Cancelled'
          }
        ]
      }
    ];
  }
});
