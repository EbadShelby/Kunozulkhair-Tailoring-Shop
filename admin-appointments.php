<?php
/**
 * Admin Appointment Management
 *
 * Appointment management page for admin users.
 */

// Include admin authentication check
require_once 'admin-check.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Appointment Management - Kunozulkhair Tailoring Shop</title>

  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Baskervville:ital@0;1&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">

  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">

  <!-- Custom CSS -->
  <link rel="stylesheet" href="css/admin/admin-dashboard.css">
  <link rel="stylesheet" href="css/admin/admin-appointments.css">
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
          <li>
            <a href="admin-orders.php">
              <i class="fas fa-shopping-cart"></i>
              <span>Orders</span>
            </a>
          </li>
          <li class="active">
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
        <button id="logout-btn" class="logout-btn">
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
          <input type="text" placeholder="Search appointments...">
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
          <h1>Appointment Management</h1>
          <p>Manage customer appointments and scheduling</p>
        </div>
        <!-- Stats Cards -->
        <div class="stats-cards">
          <div class="stat-card appointments">
            <div class="stat-card-header">
              <h3 class="stat-card-title">Total Appointments</h3>
              <div class="stat-card-icon">
                <i class="fas fa-calendar-check"></i>
              </div>
            </div>
            <div class="stat-card-body">
              <p class="stat-value" id="total-appointments">0</p>
            </div>
          </div>

          <div class="stat-card pending">
            <div class="stat-card-header">
              <h3 class="stat-card-title">Pending</h3>
              <div class="stat-card-icon">
                <i class="fas fa-clock"></i>
              </div>
            </div>
            <div class="stat-card-body">
              <p class="stat-value" id="pending-appointments">0</p>
            </div>
          </div>

          <div class="stat-card confirmed">
            <div class="stat-card-header">
              <h3 class="stat-card-title">Confirmed</h3>
              <div class="stat-card-icon">
                <i class="fas fa-check-circle"></i>
              </div>
            </div>
            <div class="stat-card-body">
              <p class="stat-value" id="confirmed-appointments">0</p>
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
              <p class="stat-value" id="completed-appointments">0</p>
            </div>
          </div>
        </div>

        <!-- Appointment List View -->
        <div class="view-container active" id="list-view">
          <!-- Filters and Actions -->
          <div class="filters-container">
            <div class="filters">
              <div class="filter-group">
                <label for="status-filter">Status</label>
                <select id="status-filter" class="filter-select">
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div class="filter-group">
                <label for="service-filter">Service</label>
                <select id="service-filter" class="filter-select">
                  <option value="all">All Services</option>
                  <option value="measurement">Measurement</option>
                  <option value="fitting">Fitting</option>
                  <option value="consultation">Consultation</option>
                  <option value="alteration">Alteration</option>
                </select>
              </div>

              <div class="filter-group">
                <label for="date-filter">Date Range</label>
                <select id="date-filter" class="filter-select">
                  <option value="all">All Dates</option>
                  <option value="today">Today</option>
                  <option value="tomorrow">Tomorrow</option>
                  <option value="this-week">This Week</option>
                  <option value="next-week">Next Week</option>
                  <option value="this-month">This Month</option>
                </select>
              </div>


            </div>

            <div class="actions">
              <div class="search-container">
                <input type="text" id="appointment-search" placeholder="Search appointments...">
                <button id="search-btn"><i class="fas fa-search"></i></button>
              </div>

              <button id="add-appointment-btn" class="btn-primary">
                <i class="fas fa-plus"></i> New Appointment
              </button>

              <button id="export-appointments" class="btn-secondary">
                <i class="fas fa-file-export"></i> Export
              </button>
            </div>
          </div>

          <!-- Appointments Table -->
          <div class="appointments-table-container">
            <table class="appointments-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Service</th>
                  <th>Date & Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id="appointments-table-body">
                <!-- Will be populated by JavaScript -->
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="appointments-pagination">
            <button class="pagination-btn" disabled>&laquo; Previous</button>
            <div class="page-numbers">
              <button class="page-number active">1</button>
              <button class="page-number">2</button>
              <button class="page-number">3</button>
            </div>
            <button class="pagination-btn">Next &raquo;</button>
          </div>
        </div>


      </div>
    </main>
  </div>

  <!-- Appointment Detail Modal -->
  <div id="appointment-detail-modal" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Appointment Details</h2>
        <button class="close-modal">&times;</button>
      </div>
      <div class="modal-body">
        <div class="appointment-detail-header">
          <div class="appointment-id">
            <span class="label">Appointment ID:</span>
            <span id="detail-appointment-id">AP12345</span>
          </div>
          <div class="appointment-status">
            <span id="detail-status-badge" class="status-badge pending">Pending</span>
          </div>
        </div>

        <div class="appointment-details-grid">
          <div class="detail-section">
            <h3>Customer Information</h3>
            <div class="detail-item">
              <span class="label">Name:</span>
              <span id="detail-customer-name">John Doe</span>
            </div>
            <div class="detail-item">
              <span class="label">Email:</span>
              <span id="detail-customer-email">john.doe@example.com</span>
            </div>
            <div class="detail-item">
              <span class="label">Phone:</span>
              <span id="detail-customer-phone">+1234567890</span>
            </div>
          </div>

          <div class="detail-section">
            <h3>Appointment Information</h3>
            <div class="detail-item">
              <span class="label">Service:</span>
              <span id="detail-service">Wedding Dress Fitting</span>
            </div>
            <div class="detail-item">
              <span class="label">Date & Time:</span>
              <span id="detail-datetime">July 20, 2023 - 10:00 AM</span>
            </div>

          </div>
        </div>

        <div class="detail-section">
          <h3>Description</h3>
          <p id="detail-description">Customer needs fitting for wedding dress. Second fitting session.</p>
        </div>

        <div class="detail-section">
          <h3>Notes</h3>
          <div id="detail-notes">
            <!-- Will be populated by JavaScript -->
          </div>
          <div class="add-note-form">
            <textarea id="new-note" placeholder="Add a note..."></textarea>
            <button id="add-note-btn" class="btn-primary">Add Note</button>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button id="edit-appointment-btn" class="btn-secondary">Edit</button>
        <button id="update-status-btn" class="btn-primary">Update Status</button>
      </div>
    </div>
  </div>

  <!-- Add/Edit Appointment Modal -->
  <div id="appointment-form-modal" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2 id="appointment-form-title">New Appointment</h2>
        <button class="close-modal">&times;</button>
      </div>
      <div class="modal-body">
        <form id="appointment-form">
          <input type="hidden" id="appointment-id" name="appointment-id">

          <div class="form-grid">
            <div class="form-group">
              <label for="customer-name">Customer Name*</label>
              <input type="text" id="customer-name" name="customer-name" required>
            </div>

            <div class="form-group">
              <label for="customer-email">Email*</label>
              <input type="email" id="customer-email" name="customer-email" required>
            </div>

            <div class="form-group">
              <label for="customer-phone">Phone*</label>
              <input type="tel" id="customer-phone" name="customer-phone" required>
            </div>

            <div class="form-group">
              <label for="appointment-service">Service*</label>
              <select id="appointment-service" name="appointment-service" required>
                <option value="">Select a service</option>
                <option value="measurement">Measurement</option>
                <option value="fitting">Fitting</option>
                <option value="consultation">Consultation</option>
                <option value="alteration">Alteration</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            <div class="form-group">
              <label for="appointment-date">Date*</label>
              <input type="date" id="appointment-date" name="appointment-date" required>
            </div>

            <div class="form-group">
              <label for="appointment-time">Time*</label>
              <input type="time" id="appointment-time" name="appointment-time" required>
            </div>



            <div class="form-group">
              <label for="appointment-status">Status*</label>
              <select id="appointment-status" name="appointment-status" required>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div class="form-group full-width">
            <label for="appointment-description">Description</label>
            <textarea id="appointment-description" name="appointment-description" rows="3"></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn-secondary" id="cancel-appointment-form">Cancel</button>
        <button type="button" class="btn-primary" id="save-appointment">Save Appointment</button>
      </div>
    </div>
  </div>

  <!-- Status Update Modal -->
  <div id="status-update-modal" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Update Appointment Status</h2>
        <button class="close-modal">&times;</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="new-status">New Status</label>
          <select id="new-status" name="new-status">
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div class="form-group">
          <label for="status-note">Add a note (optional)</label>
          <textarea id="status-note" name="status-note" rows="3"></textarea>
        </div>

        <div class="form-group checkbox-group">
          <input type="checkbox" id="notify-customer" name="notify-customer" checked>
          <label for="notify-customer">Notify customer about this update</label>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn-secondary" id="cancel-status-update">Cancel</button>
        <button type="button" class="btn-primary" id="confirm-status-update">Update Status</button>
      </div>
    </div>
  </div>

  <!-- Scripts -->
  <script src="js/admin/admin-auth.js"></script>
  <script src="js/admin/admin-appointments.js"></script>
  <script type="module" src="js/admin/admin-notifications.js"></script>
  <script type="module" src="js/admin/admin-messages.js"></script>
</body>
</html>


