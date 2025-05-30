<?php
/**
 * Admin Order Management
 *
 * Order management page for admin users.
 */

// Include admin authentication check
require_once 'admin-check.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Management - Kunozulkhair Tailoring Shop</title>

  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Baskervville:ital@0;1&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">

  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">

  <!-- Custom CSS -->
  <link rel="stylesheet" href="css/admin/admin-dashboard.css">
  <link rel="stylesheet" href="css/admin/admin-orders.css">
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
          <p class="user-role" id="user-role">Administrator</p>
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
          <li class="active">
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
          <li>
            <a href="admin-customers.php">
              <i class="fas fa-users"></i>
              <span>Customers</span>
            </a>
          </li>
          <li>
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
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Top Navigation -->
      <header class="top-nav">
        <button id="sidebar-toggle">
          <i class="fas fa-bars"></i>
        </button>

        <div class="search-bar">
          <input type="text" placeholder="Search orders...">
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

      <!-- Orders Content -->
      <div class="dashboard-content">
        <div class="page-header">
          <h1>Order Management</h1>
          <p>View and manage customer orders</p>
        </div>

        <!-- Order Stats -->
        <div class="stats-cards">
          <div class="stat-card orders">
            <div class="stat-card-header">
              <h3 class="stat-card-title">New Orders</h3>
              <div class="stat-card-icon">
                <i class="fas fa-shopping-bag"></i>
              </div>
            </div>
            <div class="stat-card-body">
              <p class="stat-value">18</p>
            </div>
          </div>

          <div class="stat-card processing">
            <div class="stat-card-header">
              <h3 class="stat-card-title">Processing</h3>
              <div class="stat-card-icon">
                <i class="fas fa-spinner"></i>
              </div>
            </div>
            <div class="stat-card-body">
              <p class="stat-value">32</p>
            </div>
          </div>

          <div class="stat-card ready">
            <div class="stat-card-header">
              <h3 class="stat-card-title">Ready for Pickup</h3>
              <div class="stat-card-icon">
                <i class="fas fa-check-circle"></i>
              </div>
            </div>
            <div class="stat-card-body">
              <p class="stat-value">15</p>
            </div>
          </div>

          <div class="stat-card completed">
            <div class="stat-card-header">
              <h3 class="stat-card-title">Completed</h3>
              <div class="stat-card-icon">
                <i class="fas fa-flag-checkered"></i>
              </div>
            </div>
            <div class="stat-card-body">
              <p class="stat-value">189</p>
            </div>
          </div>
        </div>

        <!-- Order Filters -->
        <div class="order-filters">
          <div class="filter-group">
            <label for="status-filter">Status:</label>
            <select id="status-filter">
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="processing">Processing</option>
              <option value="ready">Ready for Pickup</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div class="filter-group">
            <label for="date-filter">Date Range:</label>
            <select id="date-filter">
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          <div class="filter-group">
            <label for="type-filter">Order Type:</label>
            <select id="type-filter">
              <option value="all">All Types</option>
              <option value="product">Products</option>
              <option value="custom">Custom Orders</option>
              <option value="alteration">Alterations</option>
            </select>
          </div>

          <button id="export-orders" class="btn-secondary">
            <i class="fas fa-file-export"></i> Export
          </button>
        </div>

        <!-- Orders Table -->
        <div class="orders-table-container">
          <table class="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="orders-table-body">
              <!-- Will be populated by JavaScript -->
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="orders-pagination">
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

  <!-- Order Detail Modal -->
  <div id="order-detail-modal" class="modal">
    <div class="modal-content order-modal-content">
      <div class="modal-header">
        <h2>Order Details <span id="detail-order-id">ORD-10045</span></h2>
        <button class="close-modal">&times;</button>
      </div>
      <div class="modal-body">
        <div class="order-status-bar">
          <div class="status-step" data-status="new">
            <div class="status-icon">
              <i class="fas fa-shopping-cart"></i>
            </div>
            <div class="status-label">New</div>
          </div>
          <div class="status-step" data-status="processing">
            <div class="status-icon">
              <i class="fas fa-cogs"></i>
            </div>
            <div class="status-label">Processing</div>
          </div>
          <div class="status-step" data-status="ready">
            <div class="status-icon">
              <i class="fas fa-box"></i>
            </div>
            <div class="status-label">Ready</div>
          </div>
          <div class="status-step" data-status="completed">
            <div class="status-icon">
              <i class="fas fa-check-circle"></i>
            </div>
            <div class="status-label">Completed</div>
          </div>
        </div>

        <div class="order-detail-grid">
          <!-- Customer Information -->
          <div class="order-detail-section">
            <h3>Customer Information</h3>
            <div class="detail-row">
              <div class="detail-label">Name:</div>
              <div class="detail-value" id="customer-name">Maria Santos</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Email:</div>
              <div class="detail-value" id="customer-email">maria@example.com</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Phone:</div>
              <div class="detail-value" id="customer-phone">+63 912 345 6789</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Address:</div>
              <div class="detail-value" id="customer-address">123 Main St, Cotabato City</div>
            </div>
          </div>

          <!-- Order Information -->
          <div class="order-detail-section">
            <h3>Order Information</h3>
            <div class="detail-row">
              <div class="detail-label">Order Date:</div>
              <div class="detail-value" id="order-date">July 15, 2023</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Order Type:</div>
              <div class="detail-value" id="order-type">Custom Order</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Payment Method:</div>
              <div class="detail-value" id="payment-method">GCash</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Payment Status:</div>
              <div class="detail-value" id="payment-status">
                <span class="status-badge status-paid">Paid</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Items -->
        <div class="order-items-section">
          <h3>Order Items</h3>
          <table class="order-items-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Details</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody id="order-items-body">
              <!-- Will be populated by JavaScript -->
            </tbody>
            <tfoot>
              <tr>
                <td colspan="4" class="text-right">Subtotal:</td>
                <td id="order-subtotal">₱35,000.00</td>
              </tr>
              <tr>
                <td colspan="4" class="text-right">Shipping:</td>
                <td id="order-shipping">₱0.00</td>
              </tr>
              <tr>
                <td colspan="4" class="text-right">Discount:</td>
                <td id="order-discount">-₱0.00</td>
              </tr>
              <tr class="order-total-row">
                <td colspan="4" class="text-right">Total:</td>
                <td id="order-total">₱35,000.00</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <!-- Order Notes -->
        <div class="order-notes-section">
          <h3>Order Notes</h3>
          <div class="order-notes" id="order-notes">
            <p>Customer requested delivery for wedding on August 20th.</p>
            <p>First fitting scheduled for July 25th.</p>
          </div>
        </div>

        <!-- Update Order Status -->
        <div class="update-status-section">
          <h3>Update Order Status</h3>
          <div class="status-update-form">
            <div class="form-group">
              <label for="new-status">Status:</label>
              <select id="new-status">
                <option value="new">New</option>
                <option value="processing" selected>Processing</option>
                <option value="ready">Ready for Pickup</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div class="form-group">
              <label for="status-note">Add Note:</label>
              <textarea id="status-note" rows="3" placeholder="Add a note about this status update"></textarea>
            </div>
            <div class="form-group">
              <label for="notify-customer">
                <input type="checkbox" id="notify-customer" checked>
                Notify Customer
              </label>
            </div>
            <button id="update-status-btn" class="btn-primary">Update Status</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Scripts -->
  <script src="js/admin/admin-auth.js"></script>
  <script src="js/admin/admin-orders.js"></script>
  <script type="module" src="js/admin/admin-notifications.js"></script>
  <script type="module" src="js/admin/admin-messages.js"></script>
</body>
</html>


