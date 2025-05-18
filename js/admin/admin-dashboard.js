// Admin Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Initialize sidebar toggle functionality
  initSidebarToggle();

  // Load dashboard data
  loadDashboardData();
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

// Function to load dashboard data
function loadDashboardData() {
  // Load recent orders
  loadRecentOrders();

  // Load upcoming appointments
  loadUpcomingAppointments();

  // Load low stock items
  loadLowStockItems();


}

// Function to load recent orders
function loadRecentOrders() {
  const recentOrdersTable = document.getElementById('recent-orders-table');
  if (!recentOrdersTable) return;

  // Sample data - in a real app, this would come from an API
  const recentOrders = [
    {
      id: 'ORD-10045',
      customer: 'Maria Santos',
      date: 'July 15, 2023',
      amount: '₱2,899.00',
      status: 'Processing'
    },
    {
      id: 'ORD-10038',
      customer: 'Juan Dela Cruz',
      date: 'July 10, 2023',
      amount: '₱2,499.00',
      status: 'Ready'
    },
    {
      id: 'ORD-10032',
      customer: 'Ana Reyes',
      date: 'July 5, 2023',
      amount: '₱1,599.00',
      status: 'Processing'
    },
    {
      id: 'ORD-10028',
      customer: 'Mike Johnson',
      date: 'July 1, 2023',
      amount: '₱1,899.00',
      status: 'Completed'
    },
    {
      id: 'ORD-10025',
      customer: 'Sarah Lee',
      date: 'June 28, 2023',
      amount: '₱1,799.00',
      status: 'Completed'
    }
  ];

  // Clear table
  recentOrdersTable.innerHTML = '';

  // Add orders to table
  recentOrders.forEach(order => {
    const row = document.createElement('tr');

    // Create status badge
    const statusBadge = document.createElement('span');
    statusBadge.className = `status-badge status-${order.status.toLowerCase()}`;
    statusBadge.textContent = order.status;

    // Add cells
    row.innerHTML = `
      <td>${order.id}</td>
      <td>${order.customer}</td>
      <td>${order.date}</td>
      <td>${order.amount}</td>
      <td></td>
    `;

    // Add status badge to last cell
    row.querySelector('td:last-child').appendChild(statusBadge);

    // Add row to table
    recentOrdersTable.appendChild(row);
  });
}

// Function to load upcoming appointments
function loadUpcomingAppointments() {
  const appointmentsTable = document.getElementById('upcoming-appointments-table');
  if (!appointmentsTable) return;

  // Sample data - in a real app, this would come from an API
  const appointments = [
    {
      customer: 'Elena Garcia',
      service: 'Peach Lace Velvet Bloom Dress Fitting',
      datetime: 'July 20, 2023 - 10:00 AM'
    },
    {
      customer: 'Maria Santos',
      service: 'Duchess Blue Ballgown Fitting',
      datetime: 'July 21, 2023 - 2:30 PM'
    },
    {
      customer: 'Sophia Lee',
      service: 'Lavender Whisper Dress Alteration',
      datetime: 'July 22, 2023 - 11:00 AM'
    },
    {
      customer: 'Anna Johnson',
      service: 'Verdant Belted Dress Consultation',
      datetime: 'July 23, 2023 - 3:00 PM'
    },
    {
      customer: 'Isabella Martinez',
      service: 'Emerald Bloom Dress Measurement',
      datetime: 'July 24, 2023 - 1:00 PM'
    }
  ];

  // Clear table
  appointmentsTable.innerHTML = '';

  // Add appointments to table
  appointments.forEach(appointment => {
    const row = document.createElement('tr');

    // Add cells
    row.innerHTML = `
      <td>${appointment.customer}</td>
      <td>${appointment.service}</td>
      <td>${appointment.datetime}</td>
    `;

    // Add row to table
    appointmentsTable.appendChild(row);
  });
}

// Function to load low stock items
function loadLowStockItems() {
  const lowStockTable = document.getElementById('low-stock-table');
  if (!lowStockTable) return;

  // Sample data - in a real app, this would come from an API
  const lowStockItems = [
    {
      product: 'Verrdant Belted Dress',
      category: 'Casual Dresses',
      currentStock: 5,
      reorderLevel: 10
    },
    {
      product: 'Lavender Whisper Dress',
      category: 'Formal Dresses',
      currentStock: 3,
      reorderLevel: 8
    },
    {
      product: 'Ivory Blossom Dress',
      category: 'Evening Dresses',
      currentStock: 2,
      reorderLevel: 5
    },
    {
      product: 'Duchess Blue Ballgown',
      category: 'Formal Dresses',
      currentStock: 4,
      reorderLevel: 10
    },
    {
      product: 'Crimson Bloom Dress',
      category: 'Everyday Dresses',
      currentStock: 6,
      reorderLevel: 15
    }
  ];

  // Clear table
  lowStockTable.innerHTML = '';

  // Add items to table
  lowStockItems.forEach(item => {
    const row = document.createElement('tr');

    // Create stock indicator
    const stockIndicator = document.createElement('div');
    stockIndicator.className = 'stock-indicator';

    // Calculate percentage of stock remaining
    const stockPercentage = (item.currentStock / item.reorderLevel) * 100;

    // Set indicator color based on percentage
    let indicatorColor;
    if (stockPercentage <= 25) {
      indicatorColor = 'var(--danger-color)';
    } else if (stockPercentage <= 50) {
      indicatorColor = 'var(--warning-color)';
    } else {
      indicatorColor = 'var(--info-color)';
    }

    // Create stock level display
    const stockLevel = document.createElement('div');
    stockLevel.className = 'stock-level';
    stockLevel.innerHTML = `
      <span>${item.currentStock}</span>/<span>${item.reorderLevel}</span>
    `;

    // Create stock bar
    const stockBar = document.createElement('div');
    stockBar.className = 'stock-bar';
    stockBar.style.width = '100%';
    stockBar.style.height = '4px';
    stockBar.style.backgroundColor = '#e0e0e0';
    stockBar.style.borderRadius = '2px';
    stockBar.style.overflow = 'hidden';

    // Create stock fill
    const stockFill = document.createElement('div');
    stockFill.style.width = `${stockPercentage}%`;
    stockFill.style.height = '100%';
    stockFill.style.backgroundColor = indicatorColor;

    // Assemble stock indicator
    stockBar.appendChild(stockFill);
    stockIndicator.appendChild(stockLevel);
    stockIndicator.appendChild(stockBar);

    // Add cells
    row.innerHTML = `
      <td>${item.product}</td>
      <td>${item.category}</td>
      <td colspan="2"></td>
    `;

    // Add stock indicator to last cell
    row.querySelector('td:last-child').appendChild(stockIndicator);

    // Add row to table
    lowStockTable.appendChild(row);
  });
}


