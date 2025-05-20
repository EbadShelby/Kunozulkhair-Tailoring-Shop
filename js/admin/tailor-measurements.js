document.addEventListener('DOMContentLoaded', function() {
  // Initialize the measurements page
  initMeasurementsPage();

  // Event listeners for sidebar toggle and user dropdown
  document.getElementById('sidebar-toggle').addEventListener('click', toggleSidebar);

  const userBtn = document.querySelector('.user-btn');
  if (userBtn) {
    userBtn.addEventListener('click', toggleUserDropdown);
  }

  // Event listeners for logout buttons
  const logoutBtn = document.getElementById('logout-btn');
  const dropdownLogout = document.getElementById('dropdown-logout');

  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }

  if (dropdownLogout) {
    dropdownLogout.addEventListener('click', handleLogout);
  }

  // Event listeners for search and filters
  const searchBtn = document.getElementById('search-btn');
  const customerSearch = document.getElementById('customer-search');
  const customerFilter = document.getElementById('customer-filter');
  const orderTypeFilter = document.getElementById('order-type-filter');
  const dateFilter = document.getElementById('date-filter');

  if (searchBtn) {
    searchBtn.addEventListener('click', function() {
      filterMeasurements();
    });
  }

  if (customerSearch) {
    customerSearch.addEventListener('keyup', function(e) {
      if (e.key === 'Enter') {
        filterMeasurements();
      }
    });
  }

  if (customerFilter) {
    customerFilter.addEventListener('change', filterMeasurements);
  }

  if (orderTypeFilter) {
    orderTypeFilter.addEventListener('change', filterMeasurements);
  }

  if (dateFilter) {
    dateFilter.addEventListener('change', filterMeasurements);
  }

  // Close modal buttons
  const closeModalButtons = document.querySelectorAll('.close-modal');
  closeModalButtons.forEach(button => {
    button.addEventListener('click', function() {
      const modal = this.closest('.modal');
      if (modal) {
        modal.style.display = 'none';
      }
    });
  });

  // Close modals when clicking outside
  window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
      e.target.style.display = 'none';
    }
  });
});

// Toggle sidebar function
function toggleSidebar() {
  document.querySelector('.admin-container').classList.toggle('sidebar-collapsed');
}

// Toggle user dropdown function
function toggleUserDropdown() {
  const dropdown = document.querySelector('.dropdown-menu');
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

// Handle logout function
function handleLogout() {
  // Redirect to logout.php which will properly destroy the PHP session
  window.location.href = 'logout.php';
}

// Initialize the measurements page
function initMeasurementsPage() {
  // Load customer measurements data
  loadCustomerMeasurements();

  // Update stats
  updateStats();
}

// Load customer measurements data
function loadCustomerMeasurements() {
  // In a real app, this would fetch data from a server
  // For now, we'll use mock data
  const mockCustomers = [
    {
      id: 1,
      name: 'Elena Garcia',
      type: 'Regular',
      email: 'elena.garcia@example.com',
      phone: '+63 912 345 6789',
      lastUpdate: 'Jul 15, 2023',
      orderType: 'Custom',
      measurements: {
        bust: 36,
        waist: 28,
        hip: 38,
        shoulder: 15,
        sleeve: 24,
        inseam: 30
      }
    },
    {
      id: 2,
      name: 'Carlos Mendoza',
      type: 'Regular',
      email: 'carlos.mendoza@example.com',
      phone: '+63 923 456 7890',
      lastUpdate: 'Jul 14, 2023',
      orderType: 'Custom',
      measurements: {
        chest: 42,
        waist: 34,
        hip: 40,
        shoulder: 18,
        sleeve: 26,
        inseam: 32
      }
    },
    {
      id: 3,
      name: 'Sophia Lee',
      type: 'Regular',
      email: 'sophia.lee@example.com',
      phone: '+63 934 567 8901',
      lastUpdate: 'Jul 12, 2023',
      orderType: 'Alteration',
      measurements: {
        bust: 34,
        waist: 26,
        hip: 36,
        shoulder: 14,
        sleeve: 23,
        inseam: 29
      }
    },
    {
      id: 4,
      name: 'David Kim',
      type: 'New',
      email: 'david.kim@example.com',
      phone: '+63 945 678 9012',
      lastUpdate: 'Jul 10, 2023',
      orderType: 'Custom',
      measurements: {
        chest: 40,
        waist: 32,
        hip: 38,
        shoulder: 17,
        sleeve: 25,
        inseam: 31
      }
    },
    {
      id: 5,
      name: 'Maria Santos',
      type: 'Regular',
      email: 'maria.santos@example.com',
      phone: '+63 956 789 0123',
      lastUpdate: 'Jul 8, 2023',
      orderType: 'Custom',
      measurements: {
        bust: 38,
        waist: 30,
        hip: 40,
        shoulder: 16,
        sleeve: 24,
        inseam: 30
      }
    },
    {
      id: 6,
      name: 'Juan Dela Cruz',
      type: 'Regular',
      email: 'juan.delacruz@example.com',
      phone: '+63 967 890 1234',
      lastUpdate: 'Jul 5, 2023',
      orderType: 'Alteration',
      measurements: {
        chest: 38,
        waist: 30,
        hip: 36,
        shoulder: 16,
        sleeve: 24,
        inseam: 30
      }
    }
  ];

  renderCustomerCards(mockCustomers);
  setupCardEventListeners();
}

// Render customer cards
function renderCustomerCards(customers) {
  const container = document.getElementById('customer-measurements');
  if (!container) return;

  container.innerHTML = '';

  if (customers.length === 0) {
    container.innerHTML = '<div class="no-results">No measurement records found</div>';
    return;
  }

  customers.forEach(customer => {
    const card = createCustomerCard(customer);
    container.appendChild(card);
  });
}

// Create a customer card
function createCustomerCard(customer) {
  const card = document.createElement('div');
  card.className = 'customer-card';
  card.dataset.id = customer.id;

  const isMale = customer.measurements.chest !== undefined;
  const primaryMeasurement = isMale ? 'chest' : 'bust';
  const primaryValue = isMale ? customer.measurements.chest : customer.measurements.bust;

  card.innerHTML = `
    <div class="customer-card-header">
      <div class="customer-name">${customer.name}</div>
      <div class="customer-type">${customer.type}</div>
    </div>
    <div class="customer-card-body">
      <div class="customer-info">
        <div class="customer-info-item">
          <i class="fas fa-envelope"></i>
          <span>${customer.email}</span>
        </div>
        <div class="customer-info-item">
          <i class="fas fa-phone"></i>
          <span>${customer.phone}</span>
        </div>
        <div class="customer-info-item">
          <i class="fas fa-calendar-alt"></i>
          <span>Last updated: ${customer.lastUpdate}</span>
        </div>
        <div class="customer-info-item">
          <i class="fas fa-tag"></i>
          <span>Order type: ${customer.orderType}</span>
        </div>
      </div>
      <div class="measurement-summary">
        <div class="measurement-summary-title">Measurement Summary</div>
        <div class="measurement-preview">
          <div class="measurement-item">
            <span class="measurement-label">${isMale ? 'Chest' : 'Bust'}</span>
            <span class="measurement-value">${primaryValue} in</span>
          </div>
          <div class="measurement-item">
            <span class="measurement-label">Waist</span>
            <span class="measurement-value">${customer.measurements.waist} in</span>
          </div>
          <div class="measurement-item">
            <span class="measurement-label">Hip</span>
            <span class="measurement-value">${customer.measurements.hip} in</span>
          </div>
          <div class="measurement-item">
            <span class="measurement-label">Shoulder</span>
            <span class="measurement-value">${customer.measurements.shoulder} in</span>
          </div>
        </div>
      </div>
      <div class="customer-card-actions">
        <button class="card-btn view-btn" data-id="${customer.id}">
          <i class="fas fa-eye"></i> View Details
        </button>
        <button class="card-btn edit-btn" data-id="${customer.id}">
          <i class="fas fa-edit"></i> Edit
        </button>
      </div>
    </div>
  `;

  return card;
}

// Setup event listeners for card buttons
function setupCardEventListeners() {
  // View buttons
  document.querySelectorAll('.view-btn').forEach(button => {
    button.addEventListener('click', function() {
      const customerId = this.dataset.id;
      openMeasurementDetails(customerId);
    });
  });

  // Edit buttons
  document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', function() {
      const customerId = this.dataset.id;
      openEditMeasurementForm(customerId);
    });
  });
}

// Open measurement details modal
function openMeasurementDetails(customerId) {
  // In a real app, this would fetch the customer data
  // For now, we'll use mock data
  const customer = getMockCustomerById(customerId);
  if (!customer) return;

  const modal = document.getElementById('measurement-detail-modal');
  const modalTitle = document.getElementById('modal-customer-name');
  const detailsGrid = document.querySelector('.measurement-details-grid');

  modalTitle.textContent = `${customer.name}'s Measurements`;

  const isMale = customer.measurements.chest !== undefined;

  detailsGrid.innerHTML = `
    <div class="measurement-section customer-info-section">
      <h3>Customer Information</h3>
      <div class="measurement-group">
        <div class="measurement-detail">
          <div class="measurement-detail-label">Customer Type</div>
          <div class="measurement-detail-value">${customer.type}</div>
        </div>
        <div class="measurement-detail">
          <div class="measurement-detail-label">Email</div>
          <div class="measurement-detail-value">${customer.email}</div>
        </div>
        <div class="measurement-detail">
          <div class="measurement-detail-label">Phone</div>
          <div class="measurement-detail-value">${customer.phone}</div>
        </div>
        <div class="measurement-detail">
          <div class="measurement-detail-label">Last Updated</div>
          <div class="measurement-detail-value">${customer.lastUpdate}</div>
        </div>
      </div>
    </div>

    <div class="measurement-section order-info-section">
      <h3>Order Information</h3>
      <div class="measurement-group">
        <div class="measurement-detail">
          <div class="measurement-detail-label">Order Type</div>
          <div class="measurement-detail-value">${customer.orderType}</div>
        </div>
        <div class="measurement-detail">
          <div class="measurement-detail-label">Garment Type</div>
          <div class="measurement-detail-value">${isMale ? 'Formal Suit' : 'Evening Gown'}</div>
        </div>
        <div class="measurement-detail">
          <div class="measurement-detail-label">Fabric</div>
          <div class="measurement-detail-value">Premium Silk</div>
        </div>
        <div class="measurement-detail">
          <div class="measurement-detail-label">Color</div>
          <div class="measurement-detail-value">Navy Blue</div>
        </div>
      </div>
    </div>

    <div class="measurement-section body-measurements">
      <h3>Body Measurements</h3>
      <div class="measurement-group">
        ${isMale ?
          `<div class="measurement-detail">
            <div class="measurement-detail-label">Chest</div>
            <div class="measurement-detail-value">${customer.measurements.chest} inches</div>
          </div>` :
          `<div class="measurement-detail">
            <div class="measurement-detail-label">Bust</div>
            <div class="measurement-detail-value">${customer.measurements.bust} inches</div>
          </div>`
        }
        <div class="measurement-detail">
          <div class="measurement-detail-label">Waist</div>
          <div class="measurement-detail-value">${customer.measurements.waist} inches</div>
        </div>
        <div class="measurement-detail">
          <div class="measurement-detail-label">Hip</div>
          <div class="measurement-detail-value">${customer.measurements.hip} inches</div>
        </div>
        <div class="measurement-detail">
          <div class="measurement-detail-label">Shoulder</div>
          <div class="measurement-detail-value">${customer.measurements.shoulder} inches</div>
        </div>
        <div class="measurement-detail">
          <div class="measurement-detail-label">Sleeve Length</div>
          <div class="measurement-detail-value">${customer.measurements.sleeve} inches</div>
        </div>
        <div class="measurement-detail">
          <div class="measurement-detail-label">Inseam</div>
          <div class="measurement-detail-value">${customer.measurements.inseam} inches</div>
        </div>
      </div>
    </div>

    <div class="measurement-section measurement-notes">
      <h3>Notes</h3>
      <p>Customer prefers a slightly looser fit around the waist. Fabric has been pre-washed to account for shrinkage.</p>
    </div>

    <div class="measurement-section measurement-history">
      <h3>Measurement History</h3>
      <div class="history-item">
        <div class="history-date">Jul 15, 2023</div>
        <div class="history-changes">Initial measurements taken for custom order.</div>
      </div>
      <div class="history-item">
        <div class="history-date">Jul 10, 2023</div>
        <div class="history-changes">Updated waist measurement from 27 to 28 inches.</div>
      </div>
    </div>

    <div class="modal-actions">
      <button class="modal-btn secondary close-modal">Close</button>
      <button class="modal-btn primary" onclick="openEditMeasurementForm(${customer.id})">Edit Measurements</button>
    </div>
  `;

  modal.style.display = 'block';
}

// Open edit measurement form
function openEditMeasurementForm(customerId) {
  // In a real app, this would fetch the customer data
  // For now, we'll use mock data
  const customer = getMockCustomerById(customerId);
  if (!customer) return;

  const modal = document.getElementById('edit-measurement-modal');
  const modalTitle = document.getElementById('edit-modal-title');
  const form = document.getElementById('measurement-form');

  modalTitle.textContent = `Edit ${customer.name}'s Measurements`;

  const isMale = customer.measurements.chest !== undefined;

  form.innerHTML = `
    <div class="form-grid">
      <div class="form-section">
        <h3>Body Measurements</h3>
        <div class="form-group">
          <label for="measurement-${isMale ? 'chest' : 'bust'}">${isMale ? 'Chest' : 'Bust'}</label>
          <input type="number" id="measurement-${isMale ? 'chest' : 'bust'}" value="${isMale ? customer.measurements.chest : customer.measurements.bust}" step="0.5">
        </div>
        <div class="form-group">
          <label for="measurement-waist">Waist</label>
          <input type="number" id="measurement-waist" value="${customer.measurements.waist}" step="0.5">
        </div>
        <div class="form-group">
          <label for="measurement-hip">Hip</label>
          <input type="number" id="measurement-hip" value="${customer.measurements.hip}" step="0.5">
        </div>
        <div class="form-group">
          <label for="measurement-shoulder">Shoulder</label>
          <input type="number" id="measurement-shoulder" value="${customer.measurements.shoulder}" step="0.5">
        </div>
      </div>

      <div class="form-section">
        <h3>Additional Measurements</h3>
        <div class="form-group">
          <label for="measurement-sleeve">Sleeve Length</label>
          <input type="number" id="measurement-sleeve" value="${customer.measurements.sleeve}" step="0.5">
        </div>
        <div class="form-group">
          <label for="measurement-inseam">Inseam</label>
          <input type="number" id="measurement-inseam" value="${customer.measurements.inseam}" step="0.5">
        </div>
        <div class="form-group">
          <label for="measurement-neck">Neck</label>
          <input type="number" id="measurement-neck" value="16" step="0.5">
        </div>
        <div class="form-group">
          <label for="measurement-thigh">Thigh</label>
          <input type="number" id="measurement-thigh" value="22" step="0.5">
        </div>
      </div>

      <div class="form-section" style="grid-column: span 2;">
        <h3>Notes</h3>
        <div class="form-group">
          <textarea id="measurement-notes">Customer prefers a slightly looser fit around the waist. Fabric has been pre-washed to account for shrinkage.</textarea>
        </div>
      </div>
    </div>

    <div class="form-actions">
      <button type="button" class="modal-btn secondary close-modal">Cancel</button>
      <button type="button" class="modal-btn primary" onclick="saveMeasurements(${customer.id})">Save Changes</button>
    </div>
  `;

  // Close the details modal if it's open
  const detailModal = document.getElementById('measurement-detail-modal');
  if (detailModal) {
    detailModal.style.display = 'none';
  }

  modal.style.display = 'block';
}

// Save measurements
function saveMeasurements(customerId) {
  // In a real app, this would save the data to a server
  // For now, we'll just close the modal
  alert(`Measurements for customer #${customerId} have been saved.`);

  const modal = document.getElementById('edit-measurement-modal');
  if (modal) {
    modal.style.display = 'none';
  }
}

// Filter measurements
function filterMeasurements() {
  // In a real app, this would filter the data based on the selected filters
  // For now, we'll just reload the mock data
  loadCustomerMeasurements();
}

// Update stats
function updateStats() {
  // In a real app, this would update the stats based on the actual data
  // For now, we'll use mock data
  document.getElementById('total-records').textContent = '48';
  document.getElementById('recent-updates').textContent = '12';
  document.getElementById('custom-orders').textContent = '24';
  document.getElementById('alterations').textContent = '16';
}

// Helper function to get mock customer by ID
function getMockCustomerById(id) {
  // Convert id to number if it's a string
  id = parseInt(id);

  const mockCustomers = [
    {
      id: 1,
      name: 'Elena Garcia',
      type: 'Regular',
      email: 'elena.garcia@example.com',
      phone: '+63 912 345 6789',
      lastUpdate: 'Jul 15, 2023',
      orderType: 'Custom',
      measurements: {
        bust: 36,
        waist: 28,
        hip: 38,
        shoulder: 15,
        sleeve: 24,
        inseam: 30
      }
    },
    {
      id: 2,
      name: 'Carlos Mendoza',
      type: 'Regular',
      email: 'carlos.mendoza@example.com',
      phone: '+63 923 456 7890',
      lastUpdate: 'Jul 14, 2023',
      orderType: 'Custom',
      measurements: {
        chest: 42,
        waist: 34,
        hip: 40,
        shoulder: 18,
        sleeve: 26,
        inseam: 32
      }
    },
    {
      id: 3,
      name: 'Sophia Lee',
      type: 'Regular',
      email: 'sophia.lee@example.com',
      phone: '+63 934 567 8901',
      lastUpdate: 'Jul 12, 2023',
      orderType: 'Alteration',
      measurements: {
        bust: 34,
        waist: 26,
        hip: 36,
        shoulder: 14,
        sleeve: 23,
        inseam: 29
      }
    },
    {
      id: 4,
      name: 'David Kim',
      type: 'New',
      email: 'david.kim@example.com',
      phone: '+63 945 678 9012',
      lastUpdate: 'Jul 10, 2023',
      orderType: 'Custom',
      measurements: {
        chest: 40,
        waist: 32,
        hip: 38,
        shoulder: 17,
        sleeve: 25,
        inseam: 31
      }
    }
  ];

  return mockCustomers.find(customer => customer.id === id);
}
