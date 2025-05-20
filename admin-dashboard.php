<?php
/**
 * Admin Dashboard
 *
 * Main dashboard for admin users.
 */

// Include admin authentication check
require_once 'admin-check.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Dashboard - Kunozulkhair Tailoring Shop</title>

  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Baskervville:ital@0;1&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">

  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">

  <!-- Custom CSS -->
  <link rel="stylesheet" href="css/admin/admin-dashboard.css">
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
          <li class="active">
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
          <li>
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
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Top Navigation -->
      <header class="top-nav">
        <button id="sidebar-toggle">
          <i class="fas fa-bars"></i>
        </button>

        <div class="search-bar">
          <input type="text" placeholder="Search...">
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

      <!-- Dashboard Content -->
      <div class="dashboard-content">
        <div class="page-header">
          <h1>Dashboard</h1>
          <p>Yo admin, this is your dashboard</p>
        </div>

        <!-- Stats Cards -->
        <div class="stats-cards">
          <div class="stat-card orders">
            <div class="stat-card-header">
              <h3 class="stat-card-title">Total Orders</h3>
              <div class="stat-card-icon">
                <i class="fas fa-shopping-bag"></i>
              </div>
            </div>
            <div class="stat-card-body">
              <p class="stat-value">254</p>
            </div>
          </div>

          <div class="stat-card revenue">
            <div class="stat-card-header">
              <h3 class="stat-card-title">Revenue</h3>
              <div class="stat-card-icon">
                <i class="fas fa-money-bill-wave"></i>
              </div>
            </div>
            <div class="stat-card-body">
              <p class="stat-value">₱125,400</p>
            </div>
          </div>

          <div class="stat-card appointments">
            <div class="stat-card-header">
              <h3 class="stat-card-title">Appointments</h3>
              <div class="stat-card-icon">
                <i class="fas fa-calendar-check"></i>
              </div>
            </div>
            <div class="stat-card-body">
              <p class="stat-value">42</p>
            </div>
          </div>

          <div class="stat-card inventory">
            <div class="stat-card-header">
              <h3 class="stat-card-title">Low Stock Dresses</h3>
              <div class="stat-card-icon">
                <i class="fas fa-tshirt"></i>
              </div>
            </div>
            <div class="stat-card-body">
              <p class="stat-value">8</p>
            </div>
          </div>
        </div>

        <!-- Recent Orders & Appointments -->
        <div class="dashboard-grid">
          <!-- Recent Orders -->
          <div class="dashboard-card recent-orders">
            <div class="card-header">
              <h2>Recent Orders</h2>
              <a href="admin-orders.php" class="view-all">View All</a>
            </div>
            <div class="card-content">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody id="recent-orders-table">
                  <!-- Will be populated by JavaScript -->
                </tbody>
              </table>
            </div>
          </div>

          <!-- Upcoming Appointments -->
          <div class="dashboard-card upcoming-appointments">
            <div class="card-header">
              <h2>Upcoming Appointments</h2>
              <a href="admin-appointments.php" class="view-all">View All</a>
            </div>
            <div class="card-content">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Service</th>
                    <th>Date & Time</th>
                  </tr>
                </thead>
                <tbody id="upcoming-appointments-table">
                  <!-- Will be populated by JavaScript -->
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Inventory Status & Sales Chart -->
        <div class="dashboard-grid">
          <!-- Low Stock Items -->
          <div class="dashboard-card low-stock">
            <div class="card-header">
              <h2>Low Stock Dresses</h2>
              <a href="admin-inventory.php" class="view-all">View All</a>
            </div>
            <div class="card-content">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Dress</th>
                    <th>Type</th>
                    <th>Current Stock</th>
                    <th>Reorder Level</th>
                  </tr>
                </thead>
                <tbody id="low-stock-table">
                  <!-- Will be populated by JavaScript -->
                </tbody>
              </table>
            </div>
          </div>


        </div>
      </div>
    </main>
  </div>

  <!-- Scripts -->
  <script src="js/admin/admin-auth.js"></script>
  <script src="js/admin/admin-dashboard.js"></script>
  <script type="module" src="js/admin/admin-notifications.js"></script>
  <script type="module" src="js/admin/admin-messages.js"></script>
</body>
</html>


