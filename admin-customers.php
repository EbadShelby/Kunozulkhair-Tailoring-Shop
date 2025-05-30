<?php
/**
 * Admin Customer Management
 *
 * Customer management page for admin users.
 */

// Include admin authentication check
require_once 'admin-check.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Customer Management - Kunozulkhair Tailoring Shop</title>

  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Baskervville:ital@0;1&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">

  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">

  <!-- Custom CSS -->
  <link rel="stylesheet" href="css/admin/admin-dashboard.css">
  <link rel="stylesheet" href="css/admin/admin-customers.css">
  <link rel="stylesheet" href="css/admin/admin-notifications.css">
  <link rel="stylesheet" href="css/admin/admin-messages.css">

  <link rel="icon" href="assets/images/logo.jpg" type="image/png">
</head>
<body data-php-auth="true">
  <div class="admin-container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <img src="assets/images/logo.jpg" alt="Kunozulkhair Logo" class="logo">
        <h2>Admin Panel</h2>
      </div>

      <div class="sidebar-user">
        <div class="user-avatar">
          <i class="fas fa-user-circle"></i>
        </div>
        <div class="user-info">
          <p class="user-name" id="user-name">Admin User</p>
          <p class="user-role" id="user-role">Admin</p>
        </div>
      </div>

      <nav class="sidebar-nav">
        <ul>
          <li>
            <a href="admin-dashboard.php">
              <i class="fas fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a href="admin-inventory.php">
              <i class="fas fa-box"></i>
              <span>Inventory</span>
            </a>
          </li>
          <li>
            <a href="admin-orders.php">
              <i class="fas fa-shopping-cart"></i>
              <span>Orders</span>
            </a>
          </li>
          <li>
            <a href="admin-appointments.php">
              <i class="fas fa-calendar-alt"></i>
              <span>Appointments</span>
            </a>
          </li>
          <li class="active">
            <a href="admin-customers.php">
              <i class="fas fa-users"></i>
              <span>Customers</span>
            </a>
          </li>          <li>
            <a href="admin-tailor.php">
              <i class="fas fa-user-tie"></i>
              <span>Tailor</span>
            </a>
          </li>
        </ul>
      </nav>

      <div class="sidebar-footer">
        <button id="logout-btn">
          <i class="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </button>
      </div>

      <button id="sidebar-toggle" class="sidebar-toggle">
        <i class="fas fa-chevron-left"></i>
      </button>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Top Navigation -->
      <header class="top-nav">
        <button id="sidebar-toggle">
          <i class="fas fa-bars"></i>
        </button>

        <div class="search-bar">
          <input type="text" placeholder="Search customers...">
          <button>
            <i class="fas fa-search"></i>
          </button>
        </div>

        <div class="nav-actions">
          <div class="nav-item">
            <button class="notification-btn">
              <i class="fas fa-bell"></i>
              <span class="badge">3</span>
            </button>
            <!-- Admin Notification Dropdown -->
            <div class="admin-notification-dropdown">
              <div class="admin-notification-header">
                <h3>Notifications</h3>
                <button id="admin-mark-all-read">Mark all as read</button>
              </div>
              <div class="admin-notification-list">
                <!-- Notifications will be dynamically inserted here -->
              </div>
              <div class="admin-notification-footer">
                <a href="admin-notifications.php">View all notifications</a>
              </div>
            </div>
          </div>
          <div class="nav-item">
            <button class="message-btn">
              <i class="fas fa-envelope"></i>
              <span class="badge">5</span>
            </button>
            <!-- Admin Message Dropdown -->
            <div class="admin-message-dropdown">
              <div class="admin-message-header">
                <h3>Messages</h3>
                <button id="admin-mark-all-read-messages">Mark all as read</button>
              </div>
              <div class="admin-message-list">
                <!-- Messages will be dynamically inserted here -->
              </div>
              <div class="admin-message-footer">
                <a href="admin-messages.php">View all messages</a>
              </div>
            </div>
          </div>
          <div class="nav-item user-dropdown">
            <button class="user-btn">
              <i class="fas fa-user-circle"></i>
              <span id="dropdown-user-name">Admin</span>
              <i class="fas fa-chevron-down"></i>
            </button>
            <div class="dropdown-menu">
              <a href="admin-profile.php"><i class="fas fa-user"></i> Profile</a>
              <a href="#" id="dropdown-logout"><i class="fas fa-sign-out-alt"></i> Logout</a>
            </div>
          </div>
        </div>
      </header>

      <!-- Customers Content -->
      <div class="dashboard-content">
        <div class="page-header">
          <h1>Customer Management</h1>
          <p>Manage customer accounts, profiles, and information</p>
        </div>

        <!-- Stats Cards -->
        <div class="stats-cards">
          <div class="stat-card customers">
            <div class="stat-card-header">
              <h3 class="stat-card-title">Total Customers</h3>
              <div class="stat-card-icon">
                <i class="fas fa-users"></i>
              </div>
            </div>
            <div class="stat-card-body">
              <p class="stat-value" id="total-customers">0</p>
            </div>
          </div>

          <div class="stat-card new-customers">
            <div class="stat-card-header">
              <h3 class="stat-card-title">New Customers</h3>
              <div class="stat-card-icon">
                <i class="fas fa-user-plus"></i>
              </div>
            </div>
            <div class="stat-card-body">
              <p class="stat-value" id="new-customers">0</p>
            </div>
          </div>



          <div class="stat-card returning-customers">
            <div class="stat-card-header">
              <h3 class="stat-card-title">Returning Customers</h3>
              <div class="stat-card-icon">
                <i class="fas fa-user-clock"></i>
              </div>
            </div>
            <div class="stat-card-body">
              <p class="stat-value" id="returning-customers">0</p>
            </div>
          </div>
        </div>

        <!-- Customer Filters -->
        <div class="customer-filters">


          <div class="search-container">
            <i class="fas fa-search"></i>
            <input type="text" id="customer-search" placeholder="Search customers by name, email, or phone...">
          </div>

          <button id="add-customer-btn" class="btn-primary">
            <i class="fas fa-plus"></i> Add Customer
          </button>

          <button id="export-customers" class="btn-secondary">
            <i class="fas fa-download"></i> Export
          </button>
        </div>

        <!-- Customers Table -->
        <div class="customers-table-container">
          <table class="customers-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Activity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="customers-table-body">
              <!-- Will be populated by JavaScript -->
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="customers-pagination">
          <button class="pagination-btn" disabled>&laquo; Previous</button>
          <div class="page-numbers">
            <button class="page-number active">1</button>
            <button class="page-number">2</button>
            <button class="page-number">3</button>
          </div>
          <button class="pagination-btn">Next &raquo;</button>
        </div>
      </div>
    </main>
  </div>

  <!-- Customer Detail Modal -->
  <div id="customer-modal" class="modal">
    <div class="modal-content customer-modal-content">
      <div class="modal-header">
        <h2 id="modal-title">Customer Details</h2>
        <button class="close-modal">&times;</button>
      </div>
      <div class="modal-body">
        <div class="customer-detail-grid">
          <!-- Customer Information -->
          <div class="customer-detail-section">
            <h3>Personal Information</h3>
            <div class="detail-row">
              <div class="detail-label">Name:</div>
              <div class="detail-value" id="detail-customer-name">John Doe</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Email:</div>
              <div class="detail-value" id="detail-customer-email">john@example.com</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Phone:</div>
              <div class="detail-value" id="detail-customer-phone">+63 912 345 6789</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Address:</div>
              <div class="detail-value" id="detail-customer-address">123 Main St, Cotabato City</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Registered:</div>
              <div class="detail-value" id="detail-customer-registered">July 15, 2023</div>
            </div>

          </div>

          <!-- Customer Activity -->
          <div class="customer-detail-section">
            <h3>Activity Summary</h3>
            <div class="detail-row">
              <div class="detail-label">Total Orders:</div>
              <div class="detail-value" id="detail-customer-orders">5</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Total Spent:</div>
              <div class="detail-value" id="detail-customer-spent">₱25,000</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Last Order:</div>
              <div class="detail-value" id="detail-customer-last-order">July 10, 2023</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Appointments:</div>
              <div class="detail-value" id="detail-customer-appointments">3</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Last Appointment:</div>
              <div class="detail-value" id="detail-customer-last-appointment">July 20, 2023</div>
            </div>
          </div>
        </div>

        <!-- Customer Orders -->
        <div class="customer-detail-section">
          <h3>Recent Orders</h3>
          <table class="detail-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody id="customer-orders-table">
              <!-- Will be populated by JavaScript -->
            </tbody>
          </table>
        </div>

        <!-- Customer Appointments -->
        <div class="customer-detail-section">
          <h3>Recent Appointments</h3>
          <table class="detail-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Service</th>
                <th>Date & Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody id="customer-appointments-table">
              <!-- Will be populated by JavaScript -->
            </tbody>
          </table>
        </div>
      </div>
      <div class="modal-footer">
        <button id="edit-customer-btn" class="btn-primary">
          <i class="fas fa-edit"></i> Edit Customer
        </button>
        <button id="close-detail-btn" class="btn-secondary">Close</button>
      </div>
    </div>
  </div>

  <!-- Add/Edit Customer Modal -->
  <div id="edit-customer-modal" class="modal">
    <div class="modal-content customer-modal-content">
      <div class="modal-header">
        <h2 id="edit-modal-title">Add New Customer</h2>
        <button class="close-modal">&times;</button>
      </div>
      <div class="modal-body">
        <form id="customer-form">
          <input type="hidden" id="customer-id">
          <div class="form-grid">
            <div class="form-group">
              <label for="customer-name">Full Name</label>
              <input type="text" id="customer-name" required>
            </div>
            <div class="form-group">
              <label for="customer-email">Email Address</label>
              <input type="email" id="customer-email" required>
            </div>
            <div class="form-group">
              <label for="customer-phone">Phone Number</label>
              <input type="tel" id="customer-phone" required>
            </div>

            <div class="form-group full-width">
              <label for="customer-address-input">Address</label>
              <input type="text" id="customer-address-input" required>
            </div>
            <div class="form-group full-width">
              <label for="customer-notes">Notes</label>
              <textarea id="customer-notes" rows="3"></textarea>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button id="save-customer-btn" class="btn-primary">Save Customer</button>
        <button id="cancel-edit-btn" class="btn-secondary">Cancel</button>
      </div>
    </div>
  </div>

  <!-- Delete Confirmation Modal -->
  <div id="delete-modal" class="modal">
    <div class="modal-content delete-modal-content">
      <div class="modal-header">
        <h2>Confirm Deletion</h2>
        <button class="close-modal">&times;</button>
      </div>
      <div class="modal-body">
        <p>Are you sure you want to delete this customer? This action cannot be undone.</p>
        <p><strong>Customer:</strong> <span id="delete-customer-name">John Doe</span></p>
      </div>
      <div class="modal-footer">
        <button id="confirm-delete-btn" class="btn-danger">Delete</button>
        <button id="cancel-delete-btn" class="btn-secondary">Cancel</button>
      </div>
    </div>
  </div>

  <!-- JavaScript -->
  <script src="js/admin/admin-dashboard.js"></script>
  <script src="js/admin/admin-customers.js"></script>
  <script type="module" src="js/admin/admin-notifications.js"></script>
  <script type="module" src="js/admin/admin-messages.js"></script>
</body>
</html>


