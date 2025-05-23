<?php
/**
 * Admin Tailor Management
 *
 * Tailor management page for admin users.
 */

// Include admin authentication check
require_once 'admin-check.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tailor Profile - Kunozulkhair Tailoring Shop</title>

  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Baskervville:ital@0;1&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">

  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">

  <!-- Custom CSS -->
  <link rel="stylesheet" href="css/admin/admin-dashboard.css">
  <link rel="stylesheet" href="css/admin/admin-tailor.css">
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
          <li class="active">
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
          <h1>Tailor Profile</h1>
          <p>View and manage the shop's tailor</p>
        </div>

        <!-- Tailor Profile -->
        <div class="tailor-profile">
          <div class="profile-header">
            <div class="profile-avatar">
              <i class="fas fa-user-circle"></i>
            </div>
            <div class="profile-info">
              <h2 id="tailor-name">Ryan Mentang</h2>
              <p id="tailor-role">Tailor</p>
            </div>
            <div class="profile-actions">
              <button id="edit-tailor-btn" class="btn-primary">
                <i class="fas fa-edit"></i> Edit Profile
              </button>
            </div>
          </div>

          <!-- Tailor Stats -->
          <div class="stats-cards">
            <div class="stat-card workload">
              <div class="stat-card-header">
                <h3 class="stat-card-title">Current Workload</h3>
                <div class="stat-card-icon">
                  <i class="fas fa-tasks"></i>
                </div>
              </div>
              <div class="stat-card-body">
                <p class="stat-value" id="current-workload">7 tasks</p>
              </div>
            </div>



            <div class="stat-card appointments">
              <div class="stat-card-header">
                <h3 class="stat-card-title">Upcoming Appointments</h3>
                <div class="stat-card-icon">
                  <i class="fas fa-calendar-check"></i>
                </div>
              </div>
              <div class="stat-card-body">
                <p class="stat-value" id="upcoming-appointments">2</p>
              </div>
            </div>

            <div class="stat-card completed">
              <div class="stat-card-header">
                <h3 class="stat-card-title">Completed Orders</h3>
                <div class="stat-card-icon">
                  <i class="fas fa-check-circle"></i>
                </div>
              </div>
              <div class="stat-card-body">
                <p class="stat-value" id="completed-orders">124</p>
              </div>
            </div>
          </div>

          <!-- Tailor Details -->
          <div class="tailor-details">
            <!-- Current Assignments -->
            <div class="detail-section assignments">
              <div class="detail-header">
                <h3>Current Assignments</h3>
                <a href="admin-orders.php" class="view-all">View All</a>
              </div>
              <div class="detail-content">
                <table class="detail-table">
                  <thead>
                    <tr>
                      <th>Order/Task</th>
                      <th>Customer</th>
                      <th>Due Date</th>
                      <th>Progress</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody id="tailor-assignments-table">
                    <!-- Will be populated by JavaScript -->
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Upcoming Appointments -->
            <div class="detail-section appointments">
              <div class="detail-header">
                <h3>Upcoming Appointments</h3>
                <a href="admin-appointments.php" class="view-all">View All</a>
              </div>
              <div class="detail-content">
                <table class="detail-table">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Service</th>
                      <th>Date & Time</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody id="tailor-appointments-table">
                    <!-- Will be populated by JavaScript -->
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>

  <!-- Edit Tailor Modal -->
  <div id="tailor-form-modal" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Edit Tailor Profile</h2>
        <button class="close-modal">&times;</button>
      </div>
      <div class="modal-body">
        <form id="tailor-form">
          <div class="form-grid">
            <div class="form-group">
              <label for="tailor-name-input">Full Name</label>
              <input type="text" id="tailor-name-input" name="name" required>
            </div>


            <div class="form-group full-width">
              <label>Specializations</label>
              <div class="checkbox-group-container">
                <div class="checkbox-group">
                  <input type="checkbox" id="spec-wedding" name="specialization" value="wedding">
                  <label for="spec-wedding">Wedding</label>
                </div>
                <div class="checkbox-group">
                  <input type="checkbox" id="spec-formal" name="specialization" value="formal">
                  <label for="spec-formal">Formal Wear</label>
                </div>
                <div class="checkbox-group">
                  <input type="checkbox" id="spec-casual" name="specialization" value="casual">
                  <label for="spec-casual">Casual Wear</label>
                </div>
              </div>
            </div>
            <div class="form-group full-width">
              <label for="tailor-notes">Notes</label>
              <textarea id="tailor-notes" name="notes" rows="3"></textarea>
            </div>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn-primary">Save Changes</button>
            <button type="button" id="cancel-form" class="btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- Scripts -->
  <script src="js/admin/admin-auth.js"></script>
  <script src="js/admin/admin-tailor.js"></script>
  <script type="module" src="js/admin/admin-notifications.js"></script>
  <script type="module" src="js/admin/admin-messages.js"></script>
</body>
</html>


