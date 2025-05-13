// Admin Reports JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Initialize sidebar toggle functionality
  initSidebarToggle();
  
  // Set default date range (last 30 days)
  setDefaultDateRange();
  
  // Initialize report type selection
  initReportTypeSelection();
  
  // Load initial report data (Sales Report by default)
  loadReportData('sales');
  
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

// Function to set default date range (last 30 days)
function setDefaultDateRange() {
  const dateFrom = document.getElementById('date-from');
  const dateTo = document.getElementById('date-to');
  
  if (dateFrom && dateTo) {
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);
    
    dateFrom.valueAsDate = thirtyDaysAgo;
    dateTo.valueAsDate = today;
  }
}

// Function to initialize report type selection
function initReportTypeSelection() {
  const reportTypeCards = document.querySelectorAll('.report-type-card');
  
  reportTypeCards.forEach(card => {
    card.addEventListener('click', function() {
      // Remove active class from all cards
      reportTypeCards.forEach(c => c.classList.remove('active'));
      
      // Add active class to clicked card
      this.classList.add('active');
      
      // Load report data for selected type
      const reportType = this.getAttribute('data-report');
      loadReportData(reportType);
    });
  });
}

// Function to set up event listeners
function setupEventListeners() {
  // Generate Report Button
  const generateReportBtn = document.getElementById('generate-report');
  if (generateReportBtn) {
    generateReportBtn.addEventListener('click', function() {
      const activeReportType = document.querySelector('.report-type-card.active');
      if (activeReportType) {
        const reportType = activeReportType.getAttribute('data-report');
        loadReportData(reportType);
      }
    });
  }
  
  // Export Report Button
  const exportReportBtn = document.getElementById('export-report');
  if (exportReportBtn) {
    exportReportBtn.addEventListener('click', function() {
      alert('Export functionality will be implemented in the future.');
    });
  }
  
  // Print Report Button
  const printReportBtn = document.getElementById('print-report');
  if (printReportBtn) {
    printReportBtn.addEventListener('click', function() {
      window.print();
    });
  }
  
  // Chart Period Buttons
  const chartPeriodButtons = document.querySelectorAll('.chart-period button');
  chartPeriodButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons in the same group
      const buttons = this.parentElement.querySelectorAll('button');
      buttons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // In a real app, you would update the chart data based on the selected period
      // For now, we'll just show a message
      const activeReportType = document.querySelector('.report-type-card.active');
      if (activeReportType) {
        const reportType = activeReportType.getAttribute('data-report');
        loadReportData(reportType);
      }
    });
  });
}

// Function to load report data based on type
function loadReportData(reportType) {
  // Clear existing report content
  clearReportContent();
  
  // Show loading state
  showLoadingState();
  
  // In a real app, you would fetch data from an API
  // For this demo, we'll use sample data
  setTimeout(() => {
    switch (reportType) {
      case 'sales':
        loadSalesReport();
        break;
      case 'inventory':
        loadInventoryReport();
        break;
      case 'customers':
        loadCustomersReport();
        break;
      case 'tailors':
        loadTailorsReport();
        break;
      default:
        loadSalesReport();
    }
    
    // Hide loading state
    hideLoadingState();
  }, 500); // Simulate API delay
}

// Function to clear report content
function clearReportContent() {
  const reportContent = document.querySelector('.report-content');
  if (reportContent) {
    // Keep the existing elements but hide them
    const reportSections = reportContent.querySelectorAll('.report-section');
    reportSections.forEach(section => {
      section.style.display = 'none';
    });
  }
}

// Function to show loading state
function showLoadingState() {
  const chartPlaceholders = document.querySelectorAll('.chart-placeholder');
  chartPlaceholders.forEach(placeholder => {
    placeholder.innerHTML = '<p>Loading data...</p>';
  });
}

// Function to hide loading state
function hideLoadingState() {
  const chartPlaceholders = document.querySelectorAll('.chart-placeholder');
  chartPlaceholders.forEach(placeholder => {
    placeholder.innerHTML = '<p>Chart will be displayed here</p>';
  });
}

// Function to load sales report
function loadSalesReport() {
  // Show sales report section
  const salesReportSection = document.getElementById('sales-report');
  if (salesReportSection) {
    salesReportSection.style.display = 'block';
  }
  
  // Load top selling products
  loadTopSellingProducts();
  
  // In a real app, you would initialize charts with real data
  // For this demo, we'll just show placeholders
}

// Function to load inventory report
function loadInventoryReport() {
  // Create inventory report section if it doesn't exist
  let inventoryReportSection = document.getElementById('inventory-report');
  
  if (!inventoryReportSection) {
    inventoryReportSection = createInventoryReportSection();
    const reportContent = document.querySelector('.report-content');
    if (reportContent) {
      reportContent.appendChild(inventoryReportSection);
    }
  }
  
  // Show inventory report section
  inventoryReportSection.style.display = 'block';
  
  // Load inventory data
  loadInventoryData();
}

// Function to load customers report
function loadCustomersReport() {
  // Create customers report section if it doesn't exist
  let customersReportSection = document.getElementById('customers-report');
  
  if (!customersReportSection) {
    customersReportSection = createCustomersReportSection();
    const reportContent = document.querySelector('.report-content');
    if (reportContent) {
      reportContent.appendChild(customersReportSection);
    }
  }
  
  // Show customers report section
  customersReportSection.style.display = 'block';
  
  // Load customer data
  loadCustomerData();
}

// Function to load tailors report
function loadTailorsReport() {
  // Create tailors report section if it doesn't exist
  let tailorsReportSection = document.getElementById('tailors-report');
  
  if (!tailorsReportSection) {
    tailorsReportSection = createTailorsReportSection();
    const reportContent = document.querySelector('.report-content');
    if (reportContent) {
      reportContent.appendChild(tailorsReportSection);
    }
  }
  
  // Show tailors report section
  tailorsReportSection.style.display = 'block';
  
  // Load tailor performance data
  loadTailorPerformanceData();
}

// Function to load top selling products
function loadTopSellingProducts() {
  const topProductsTable = document.getElementById('top-products-table');
  if (!topProductsTable) return;
  
  // Sample data for top selling products
  const topProducts = [
    { name: 'Custom Dress', category: 'Dressmaking', unitsSold: 42, revenue: '₱84,000' },
    { name: 'Embroidered Blouse', category: 'Embroidery', unitsSold: 38, revenue: '₱57,000' },
    { name: 'Formal Suit', category: 'Tailoring', unitsSold: 35, revenue: '₱105,000' },
    { name: 'Wedding Dress', category: 'Bridal', unitsSold: 28, revenue: '₱140,000' },
    { name: 'Casual Shirt', category: 'Casual Wear', unitsSold: 25, revenue: '₱37,500' }
  ];
  
  // Clear existing table rows
  topProductsTable.innerHTML = '';
  
  // Add new rows
  topProducts.forEach(product => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.category}</td>
      <td>${product.unitsSold}</td>
      <td>${product.revenue}</td>
    `;
    topProductsTable.appendChild(row);
  });
}

// Helper functions to create report sections
function createInventoryReportSection() {
  const section = document.createElement('div');
  section.id = 'inventory-report';
  section.className = 'report-section';
  section.style.display = 'none';
  
  section.innerHTML = `
    <!-- Inventory Status -->
    <div class="report-card">
      <div class="card-header">
        <h2>Inventory Status</h2>
      </div>
      <div class="card-content">
        <div class="chart-container" id="inventory-status-chart">
          <div class="chart-placeholder">
            <p>Inventory status chart will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Inventory Details -->
    <div class="report-grid">
      <div class="report-card">
        <div class="card-header">
          <h2>Low Stock Items</h2>
        </div>
        <div class="card-content">
          <table class="data-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Current Stock</th>
                <th>Reorder Level</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody id="low-stock-table">
              <!-- Will be populated by JavaScript -->
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="report-card">
        <div class="card-header">
          <h2>Stock Movement</h2>
        </div>
        <div class="card-content">
          <div class="chart-container" id="stock-movement-chart">
            <div class="chart-placeholder">
              <p>Stock movement chart will be displayed here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  return section;
}

function createCustomersReportSection() {
  const section = document.createElement('div');
  section.id = 'customers-report';
  section.className = 'report-section';
  section.style.display = 'none';
  
  section.innerHTML = `
    <!-- Customer Growth -->
    <div class="report-card">
      <div class="card-header">
        <h2>Customer Growth</h2>
        <div class="chart-period">
          <button class="active">Monthly</button>
          <button>Quarterly</button>
          <button>Yearly</button>
        </div>
      </div>
      <div class="card-content">
        <div class="chart-container" id="customer-growth-chart">
          <div class="chart-placeholder">
            <p>Customer growth chart will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Customer Details -->
    <div class="report-grid">
      <div class="report-card">
        <div class="card-header">
          <h2>Customer Segments</h2>
        </div>
        <div class="card-content">
          <div class="chart-container" id="customer-segments-chart">
            <div class="chart-placeholder">
              <p>Customer segments chart will be displayed here</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="report-card">
        <div class="card-header">
          <h2>Top Customers</h2>
        </div>
        <div class="card-content">
          <table class="data-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Orders</th>
                <th>Total Spent</th>
                <th>Last Order</th>
              </tr>
            </thead>
            <tbody id="top-customers-table">
              <!-- Will be populated by JavaScript -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
  
  return section;
}

function createTailorsReportSection() {
  const section = document.createElement('div');
  section.id = 'tailors-report';
  section.className = 'report-section';
  section.style.display = 'none';
  
  section.innerHTML = `
    <!-- Tailor Performance Overview -->
    <div class="report-card">
      <div class="card-header">
        <h2>Tailor Performance Overview</h2>
      </div>
      <div class="card-content">
        <div class="chart-container" id="tailor-performance-chart">
          <div class="chart-placeholder">
            <p>Tailor performance chart will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Tailor Details -->
    <div class="report-grid">
      <div class="report-card">
        <div class="card-header">
          <h2>Workload Distribution</h2>
        </div>
        <div class="card-content">
          <div class="chart-container" id="workload-chart">
            <div class="chart-placeholder">
              <p>Workload distribution chart will be displayed here</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="report-card">
        <div class="card-header">
          <h2>Tailor Efficiency</h2>
        </div>
        <div class="card-content">
          <table class="data-table">
            <thead>
              <tr>
                <th>Tailor</th>
                <th>Completed Tasks</th>
                <th>On-Time Rate</th>
                <th>Efficiency</th>
              </tr>
            </thead>
            <tbody id="tailor-efficiency-table">
              <!-- Will be populated by JavaScript -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
  
  return section;
}

// Functions to load data for different report types
function loadInventoryData() {
  const lowStockTable = document.getElementById('low-stock-table');
  if (!lowStockTable) return;
  
  // Sample data for low stock items
  const lowStockItems = [
    { name: 'Black Cotton Fabric', category: 'Fabric', currentStock: 5, reorderLevel: 10, status: 'low-stock' },
    { name: 'Gold Buttons', category: 'Accessories', currentStock: 2, reorderLevel: 15, status: 'low-stock' },
    { name: 'Silk Thread (White)', category: 'Thread', currentStock: 0, reorderLevel: 8, status: 'out-of-stock' },
    { name: 'Lace Trim', category: 'Accessories', currentStock: 3, reorderLevel: 12, status: 'low-stock' },
    { name: 'Denim Fabric', category: 'Fabric', currentStock: 0, reorderLevel: 5, status: 'out-of-stock' }
  ];
  
  // Clear existing table rows
  lowStockTable.innerHTML = '';
  
  // Add new rows
  lowStockItems.forEach(item => {
    const row = document.createElement('tr');
    
    let statusText = '';
    if (item.status === 'low-stock') {
      statusText = 'Low Stock';
    } else if (item.status === 'out-of-stock') {
      statusText = 'Out of Stock';
    }
    
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.category}</td>
      <td>${item.currentStock}</td>
      <td>${item.reorderLevel}</td>
      <td>
        <div class="inventory-status">
          <span class="status-indicator ${item.status}"></span>
          ${statusText}
        </div>
      </td>
    `;
    lowStockTable.appendChild(row);
  });
}

function loadCustomerData() {
  const topCustomersTable = document.getElementById('top-customers-table');
  if (!topCustomersTable) return;
  
  // Sample data for top customers
  const topCustomers = [
    { name: 'Maria Santos', orders: 12, totalSpent: '₱45,600', lastOrder: '2023-10-15' },
    { name: 'Juan Dela Cruz', orders: 8, totalSpent: '₱32,400', lastOrder: '2023-10-22' },
    { name: 'Ana Reyes', orders: 7, totalSpent: '₱28,900', lastOrder: '2023-10-18' },
    { name: 'Pedro Lim', orders: 6, totalSpent: '₱24,500', lastOrder: '2023-10-10' },
    { name: 'Sofia Garcia', orders: 5, totalSpent: '₱21,200', lastOrder: '2023-10-05' }
  ];
  
  // Clear existing table rows
  topCustomersTable.innerHTML = '';
  
  // Add new rows
  topCustomers.forEach(customer => {
    const row = document.createElement('tr');
    
    // Format date
    const orderDate = new Date(customer.lastOrder);
    const formattedDate = orderDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
    
    row.innerHTML = `
      <td>${customer.name}</td>
      <td>${customer.orders}</td>
      <td>${customer.totalSpent}</td>
      <td>${formattedDate}</td>
    `;
    topCustomersTable.appendChild(row);
  });
}

function loadTailorPerformanceData() {
  const tailorEfficiencyTable = document.getElementById('tailor-efficiency-table');
  if (!tailorEfficiencyTable) return;
  
  // Sample data for tailor efficiency
  const tailorEfficiency = [
    { name: 'Miguel Ramos', completedTasks: 45, onTimeRate: '95%', efficiency: 92 },
    { name: 'Isabella Cruz', completedTasks: 38, onTimeRate: '92%', efficiency: 88 },
    { name: 'Gabriel Santos', completedTasks: 42, onTimeRate: '90%', efficiency: 85 },
    { name: 'Sofia Mendoza', completedTasks: 36, onTimeRate: '88%', efficiency: 82 },
    { name: 'Rafael Tan', completedTasks: 40, onTimeRate: '85%', efficiency: 80 }
  ];
  
  // Clear existing table rows
  tailorEfficiencyTable.innerHTML = '';
  
  // Add new rows
  tailorEfficiency.forEach(tailor => {
    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td>${tailor.name}</td>
      <td>${tailor.completedTasks}</td>
      <td>${tailor.onTimeRate}</td>
      <td>
        <div class="performance-metric">
          <div class="performance-bar">
            <div class="performance-value" style="width: ${tailor.efficiency}%"></div>
          </div>
          <span>${tailor.efficiency}%</span>
        </div>
      </td>
    `;
    tailorEfficiencyTable.appendChild(row);
  });
}
