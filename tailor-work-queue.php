<?php
/**
 * Tailor Work Queue
 *
 * Work queue management page for tailor users.
 */

// Include tailor authentication check
require_once 'tailor-check.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Work Queue - Kunozulkhair Tailoring Shop</title>

  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Baskervville:ital@0;1&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">

  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">

  <!-- Custom CSS -->
  <link rel="stylesheet" href="css/admin/admin-dashboard.css">
  <link rel="stylesheet" href="css/admin/admin-dashboard-svg.css">
  <link rel="stylesheet" href="css/admin/tailor-dashboard.css">
  <link rel="stylesheet" href="css/admin/tailor-work-queue.css">
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
          <li class="active">
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
          <li>
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
          <h1>Work Queue</h1>
          <p>Manage your assigned tasks and track progress</p>
        </div>

        <!-- Stats Cards -->
        <div class="stats-cards">
          <div class="stat-card tasks">
            <div class="stat-card-header">
              <h3 class="stat-card-title">Total Tasks</h3>
              <div class="stat-card-icon">
                <i class="fas fa-tasks"></i>
              </div>
            </div>
            <div class="stat-card-body">
              <p class="stat-value" id="total-tasks">12</p>
            </div>
          </div>

          <div class="stat-card urgent">
            <div class="stat-card-header">
              <h3 class="stat-card-title">Urgent</h3>
              <div class="stat-card-icon">
                <i class="fas fa-exclamation-circle"></i>
              </div>
            </div>
            <div class="stat-card-body">
              <p class="stat-value" id="urgent-tasks">3</p>
            </div>
          </div>

          <div class="stat-card in-progress">
            <div class="stat-card-header">
              <h3 class="stat-card-title">In Progress</h3>
              <div class="stat-card-icon">
                <i class="fas fa-spinner"></i>
              </div>
            </div>
            <div class="stat-card-body">
              <p class="stat-value" id="in-progress-tasks">7</p>
            </div>
          </div>

          <div class="stat-card completed">
            <div class="stat-card-header">
              <h3 class="stat-card-title">Completed Today</h3>
              <div class="stat-card-icon">
                <i class="fas fa-check-circle"></i>
              </div>
            </div>
            <div class="stat-card-body">
              <p class="stat-value" id="completed-tasks">2</p>
            </div>
          </div>
        </div>

        <!-- Work Queue Content -->
        <div class="work-queue-container">
          <div class="work-queue-header">
            <div class="filters">
              <div class="filter-group">
                <label for="status-filter">Status</label>
                <select id="status-filter">
                  <option value="all">All Status</option>
                  <option value="not-started">Not Started</option>
                  <option value="in-progress">In Progress</option>
                  <option value="on-hold">On Hold</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div class="filter-group">
                <label for="priority-filter">Priority</label>
                <select id="priority-filter">
                  <option value="all">All Priorities</option>
                  <option value="urgent">Urgent</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div class="filter-group">
                <label for="sort-by">Sort By</label>
                <select id="sort-by">
                  <option value="due-date-asc">Due Date (Earliest)</option>
                  <option value="due-date-desc">Due Date (Latest)</option>
                  <option value="priority-desc">Priority (Highest)</option>
                  <option value="priority-asc">Priority (Lowest)</option>
                  <option value="progress-asc">Progress (Lowest)</option>
                  <option value="progress-desc">Progress (Highest)</option>
                </select>
              </div>
            </div>
            <div class="search-container">
              <input type="text" id="task-search" placeholder="Search tasks...">
              <button id="search-btn"><i class="fas fa-search"></i></button>
            </div>
          </div>

          <div class="task-list-container">
            <div class="task-list" id="work-queue-tasks">
              <!-- Tasks will be populated by JavaScript -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Task Detail Modal -->
    <div class="modal" id="task-detail-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2 id="modal-task-title">Task Details</h2>
          <button class="close-modal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="task-details-grid">
            <!-- Task details will be populated by JavaScript -->
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Scripts -->
  <script src="js/admin/admin-auth.js"></script>
  <script src="js/admin/tailor-work-queue.js"></script>
  <script type="module" src="js/admin/tailor-notifications.js"></script>
  <script type="module" src="js/admin/tailor-messages.js"></script>
</body>
</html>

