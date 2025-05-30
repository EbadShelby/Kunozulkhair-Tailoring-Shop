<?php
/**
 * Tailor Measurements
 *
 * Measurements management page for tailor users.
 */

// Include tailor authentication check
require_once 'tailor-check.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Measurements - Kunozulkhair Tailoring Shop</title>

  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Baskervville:ital@0;1&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">

  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">

  <!-- Custom CSS -->
  <link rel="stylesheet" href="css/admin/admin-dashboard.css">
  <link rel="stylesheet" href="css/admin/admin-dashboard-svg.css">
  <link rel="stylesheet" href="css/admin/tailor-dashboard.css">
  <link rel="stylesheet" href="css/admin/tailor-measurements.css">
  <link rel="stylesheet" href="css/admin/tailor-notifications.css">
  <link rel="stylesheet" href="css/admin/admin-messages.css">

  <link rel="icon" href="assets/images/logo.jpg" type="image/png">
</head>
<body data-php-auth="true">
  <div class="admin-container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <img src="assets/images/logo.jpg" alt="Kunozulkhair Logo" class="logo">
        <h2>Tailor Panel</h2>
      </div>

      <div class="sidebar-user">
        <div class="user-avatar">
          <i class="fas fa-user-circle"></i>
        </div>
        <div class="user-info">
          <p class="user-name" id="user-name">Ryan Mentang</p>
          <p class="user-role" id="user-role">Tailor</p>
        </div>
      </div>

      <nav class="sidebar-nav">
        <ul>
          <li>
            <a href="tailor-dashboard.php">
              <i class="fas fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a href="tailor-work-queue.php">
              <i class="fas fa-tasks"></i>
              <span>Work Queue</span>
            </a>
          </li>
          <li>
            <a href="tailor-schedule.php">
              <i class="fas fa-calendar-alt"></i>
              <span>Schedule</span>
            </a>
          </li>
          <li class="active">
            <a href="tailor-measurements.php">
              <i class="fas fa-ruler-combined"></i>
              <span>Measurements</span>
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
    <div class="main-content">
      <!-- Header -->
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
              <span class="badge">2</span>
            </button>
            <!-- Tailor Notification Dropdown -->
            <div class="tailor-notification-dropdown">
              <div class="tailor-notification-header">
                <h3>Notifications</h3>
                <button id="tailor-mark-all-read">Mark all as read</button>
              </div>
              <div class="tailor-notification-list">
                <!-- Notifications will be dynamically inserted here -->
              </div>
              <div class="tailor-notification-footer">
                <a href="tailor-notifications.php">View all notifications</a>
              </div>
            </div>
          </div>
          <div class="nav-item">
            <button class="message-btn">
              <i class="fas fa-envelope"></i>
              <span class="badge">3</span>
            </button>
            <!-- Tailor Message Dropdown -->
            <div class="admin-message-dropdown">
              <div class="admin-message-header">
                <h3>Messages</h3>
                <button id="admin-mark-all-read-messages">Mark all as read</button>
              </div>
              <div class="admin-message-list">
                <!-- Messages will be dynamically inserted here -->
              </div>
              <div class="admin-message-footer">
                <a href="tailor-messages.php">View all messages</a>
              </div>
            </div>
          </div>
          <div class="nav-item user-dropdown">
            <button class="user-btn">
              <i class="fas fa-user-circle"></i>
              <span id="dropdown-user-name">Ryan Mentang</span>
              <i class="fas fa-chevron-down"></i>
            </button>
            <div class="dropdown-menu">
              <a href="tailor-profile.php"><i class="fas fa-user"></i> Profile</a>
              <a href="#" id="dropdown-logout"><i class="fas fa-sign-out-alt"></i> Logout</a>
            </div>
          </div>
        </div>
      </header>

      <!-- Dashboard Content -->
      <div class="dashboard-content">
        <div class="page-header">
          <h1>Customer Measurements</h1>
          <p>View and manage customer measurement records</p>
        </div>

        <!-- Stats Cards -->
        <div class="stats-cards">
          <div class="stat-card total">
            <div class="stat-card-header">
              <h3 class="stat-card-title">Total Records</h3>
              <div class="stat-card-icon">
                <i class="fas fa-ruler-combined"></i>
              </div>
            </div>
            <div class="stat-card-body">
              <p class="stat-value" id="total-records">48</p>
            </div>
          </div>

          <div class="stat-card recent">
            <div class="stat-card-header">
              <h3 class="stat-card-title">Recent Updates</h3>
              <div class="stat-card-icon">
                <i class="fas fa-clock"></i>
              </div>
            </div>
            <div class="stat-card-body">
              <p class="stat-value" id="recent-updates">12</p>
            </div>
          </div>

          <div class="stat-card custom">
            <div class="stat-card-header">
              <h3 class="stat-card-title">Custom Orders</h3>
              <div class="stat-card-icon">
                <i class="fas fa-tshirt"></i>
              </div>
            </div>
            <div class="stat-card-body">
              <p class="stat-value" id="custom-orders">24</p>
            </div>
          </div>

          <div class="stat-card alterations">
            <div class="stat-card-header">
              <h3 class="stat-card-title">Alterations</h3>
              <div class="stat-card-icon">
                <i class="fas fa-cut"></i>
              </div>
            </div>
            <div class="stat-card-body">
              <p class="stat-value" id="alterations">16</p>
            </div>
          </div>
        </div>

        <!-- Measurements Content -->
        <div class="measurements-container">
          <div class="measurements-header">
            <div class="filters">
              <div class="filter-group">
                <label for="customer-filter">Customer Type</label>
                <select id="customer-filter">
                  <option value="all">All Customers</option>
                  <option value="regular">Regular</option>
                  <option value="new">New</option>
                </select>
              </div>
              <div class="filter-group">
                <label for="order-type-filter">Order Type</label>
                <select id="order-type-filter">
                  <option value="all">All Types</option>
                  <option value="custom">Custom</option>
                  <option value="alteration">Alteration</option>
                  <option value="repair">Repair</option>
                </select>
              </div>
              <div class="filter-group">
                <label for="date-filter">Date Range</label>
                <select id="date-filter">
                  <option value="all">All Time</option>
                  <option value="this-month">This Month</option>
                  <option value="last-month">Last Month</option>
                  <option value="this-year">This Year</option>
                </select>
              </div>
            </div>
            <div class="search-container">
              <input type="text" id="customer-search" placeholder="Search customers...">
              <button id="search-btn"><i class="fas fa-search"></i></button>
            </div>
          </div>

          <div class="customer-measurements-list" id="customer-measurements">
            <!-- Customer measurements will be populated by JavaScript -->
          </div>
        </div>
      </div>
    </div>

    <!-- Measurement Detail Modal -->
    <div class="modal" id="measurement-detail-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2 id="modal-customer-name">Customer Measurements</h2>
          <button class="close-modal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="measurement-details-grid">
            <!-- Measurement details will be populated by JavaScript -->
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Measurement Modal -->
    <div class="modal" id="edit-measurement-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2 id="edit-modal-title">Edit Measurements</h2>
          <button class="close-modal">&times;</button>
        </div>
        <div class="modal-body">
          <form id="measurement-form">
            <!-- Form fields will be populated by JavaScript -->
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- Scripts -->
  <script src="js/admin/admin-auth.js"></script>
  <script src="js/admin/tailor-measurements.js"></script>
  <script type="module" src="js/admin/tailor-notifications.js"></script>
  <script type="module" src="js/admin/tailor-messages.js"></script>
</body>
</html>

