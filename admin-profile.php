<?php
/**
 * Admin Profile
 *
 * Profile management page for admin users.
 */

// Include admin authentication check
require_once 'admin-check.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Profile - Kunozulkhair Tailoring Shop</title>

  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Baskervville:ital@0;1&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">

  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">

  <!-- Custom CSS -->
  <link rel="stylesheet" href="css/admin/admin-dashboard.css">
  <link rel="stylesheet" href="css/admin/admin-profile.css">
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
          <li>
            <a href="admin-tailor.php">
              <i class="fas fa-user-tie"></i>
              <span>Tailor</span>
            </a>
          </li>
        </ul>
      </nav>

      <div class="sidebar-footer">
        <button id="sidebar-toggle">
          <i class="fas fa-chevron-left"></i>
        </button>
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
          <h1>My Profile</h1>
          <p>Manage your personal information and account settings</p>
        </div>
        <div class="profile-container">
          <!-- Profile Header -->
          <div class="profile-header">
            <div class="profile-avatar">
              <div class="avatar-container">
                <i class="fas fa-user-circle"></i>
                <div class="avatar-overlay">
                  <i class="fas fa-camera"></i>
                  <span>Change Photo</span>
                </div>
              </div>
            </div>
            <div class="profile-info">
              <h2 id="profile-name">Admin User</h2>
              <p id="profile-role">Administrator</p>
              <p id="profile-email">admin@kunozulkhair.com</p>
            </div>
            <div class="profile-actions">
              <button class="btn-primary" id="edit-profile-btn">
                <i class="fas fa-edit"></i> Edit Profile
              </button>
            </div>
          </div>

          <!-- Profile Details -->
          <div class="profile-details">
            <div class="profile-section">
              <h3>Personal Information</h3>
              <div class="profile-fields">
                <div class="profile-field">
                  <label>Full Name</label>
                  <p id="full-name">Admin User</p>
                </div>
                <div class="profile-field">
                  <label>Email Address</label>
                  <p id="email">admin@kunozulkhair.com</p>
                </div>
                <div class="profile-field">
                  <label>Phone Number</label>
                  <p id="phone">+63 912 345 6789</p>
                </div>
              </div>
            </div>

            <div class="profile-section">
              <h3>Account Information</h3>
              <div class="profile-fields">
                <div class="profile-field">
                  <label>Username</label>
                  <p id="username">admin</p>
                </div>
                <div class="profile-field">
                  <label>Last Login</label>
                  <p id="last-login">Today at 9:30 AM</p>
                </div>
                <div class="profile-field">
                  <label>Account Created</label>
                  <p id="account-created">January 1, 2023</p>
                </div>
              </div>
            </div>

            <div class="profile-section">
              <h3>Security</h3>
              <div class="profile-fields">
                <div class="profile-field">
                  <label>Password</label>
                  <p>••••••••</p>
                  <button class="btn-secondary" id="change-password-btn">
                    <i class="fas fa-key"></i> Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>

  <!-- Edit Profile Modal -->
  <div id="edit-profile-modal" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Edit Profile</h2>
        <button class="close-modal">&times;</button>
      </div>
      <div class="modal-body">
        <form id="edit-profile-form">
          <div class="form-group">
            <label for="edit-full-name">Full Name</label>
            <input type="text" id="edit-full-name" name="full-name" value="Admin User">
          </div>
          <div class="form-group">
            <label for="edit-email">Email Address</label>
            <input type="email" id="edit-email" name="email" value="admin@kunozulkhair.com">
          </div>
          <div class="form-group">
            <label for="edit-phone">Phone Number</label>
            <input type="tel" id="edit-phone" name="phone" value="+63 912 345 6789">
          </div>
          <div class="form-group">
            <label for="edit-username">Username</label>
            <input type="text" id="edit-username" name="username" value="admin">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button id="save-profile-btn" class="btn-primary">Save Changes</button>
        <button id="cancel-edit-btn" class="btn-secondary">Cancel</button>
      </div>
    </div>
  </div>

  <!-- Change Password Modal -->
  <div id="change-password-modal" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Change Password</h2>
        <button class="close-modal">&times;</button>
      </div>
      <div class="modal-body">
        <form id="change-password-form">
          <div class="form-group">
            <label for="current-password">Current Password</label>
            <input type="password" id="current-password" name="current-password">
          </div>
          <div class="form-group">
            <label for="new-password">New Password</label>
            <input type="password" id="new-password" name="new-password">
          </div>
          <div class="form-group">
            <label for="confirm-password">Confirm New Password</label>
            <input type="password" id="confirm-password" name="confirm-password">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button id="save-password-btn" class="btn-primary">Update Password</button>
        <button id="cancel-password-btn" class="btn-secondary">Cancel</button>
      </div>
    </div>
  </div>

  <!-- Scripts -->
  <script src="js/admin/admin-auth.js"></script>
  <script src="js/admin/admin-profile.js"></script>
  <script type="module" src="js/admin/admin-notifications.js"></script>
  <script type="module" src="js/admin/admin-messages.js"></script>
</body>
</html>


