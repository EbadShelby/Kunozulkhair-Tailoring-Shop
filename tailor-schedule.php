<?php
/**
 * Tailor Schedule
 *
 * Schedule management page for tailor users.
 */

// Include tailor authentication check
require_once 'tailor-check.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Schedule - Kunozulkhair Tailoring Shop</title>

  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Baskervville:ital@0;1&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">

  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">

  <!-- Custom CSS -->
  <link rel="stylesheet" href="css/admin/admin-dashboard.css">
  <link rel="stylesheet" href="css/admin/admin-dashboard-svg.css">
  <link rel="stylesheet" href="css/admin/tailor-dashboard.css">
  <link rel="stylesheet" href="css/admin/tailor-schedule.css">
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
          <li class="active">
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
          <h1>Schedule</h1>
          <p>Manage your appointments and fittings</p>
        </div>

        <!-- Stats Cards -->
        <div class="stats-cards">
          <div class="stat-card today">
            <div class="stat-card-header">
              <h3 class="stat-card-title">Today's Appointments</h3>
              <div class="stat-card-icon">
                <i class="fas fa-calendar-day"></i>
              </div>
            </div>
            <div class="stat-card-body">
              <p class="stat-value" id="today-appointments">5</p>
            </div>
          </div>

          <div class="stat-card week">
            <div class="stat-card-header">
              <h3 class="stat-card-title">This Week</h3>
              <div class="stat-card-icon">
                <i class="fas fa-calendar-week"></i>
              </div>
            </div>
            <div class="stat-card-body">
              <p class="stat-value" id="week-appointments">18</p>
            </div>
          </div>

          <div class="stat-card fittings">
            <div class="stat-card-header">
              <h3 class="stat-card-title">Fittings</h3>
              <div class="stat-card-icon">
                <i class="fas fa-user-tie"></i>
              </div>
            </div>
            <div class="stat-card-body">
              <p class="stat-value" id="fittings-count">12</p>
            </div>
          </div>

          <div class="stat-card consultations">
            <div class="stat-card-header">
              <h3 class="stat-card-title">Consultations</h3>
              <div class="stat-card-icon">
                <i class="fas fa-comments"></i>
              </div>
            </div>
            <div class="stat-card-body">
              <p class="stat-value" id="consultations-count">6</p>
            </div>
          </div>
        </div>

        <!-- Schedule Content -->
        <div class="schedule-container">
          <div class="schedule-header">
            <div class="date-navigation">
              <button id="prev-date" class="nav-btn">
                <i class="fas fa-chevron-left"></i>
              </button>
              <div class="current-date" id="current-date">July 19, 2023</div>
              <button id="today-btn" class="today-btn">Today</button>
              <button id="next-date" class="nav-btn">
                <i class="fas fa-chevron-right"></i>
              </button>
            </div>
            <div class="view-filters">
              <div class="filter-group">
                <label for="appointment-type">Type</label>
                <select id="appointment-type">
                  <option value="all">All Types</option>
                  <option value="fitting">Fitting</option>
                  <option value="consultation">Consultation</option>
                  <option value="measurement">Measurement</option>
                  <option value="pickup">Pickup</option>
                </select>
              </div>
            </div>
          </div>

          <div class="schedule-view">
            <div class="time-column">
              <div class="time-header">Time</div>
              <div class="time-slots">
                <div class="time-slot">8:00 AM</div>
                <div class="time-slot">9:00 AM</div>
                <div class="time-slot">10:00 AM</div>
                <div class="time-slot">11:00 AM</div>
                <div class="time-slot">12:00 PM</div>
                <div class="time-slot">1:00 PM</div>
                <div class="time-slot">2:00 PM</div>
                <div class="time-slot">3:00 PM</div>
                <div class="time-slot">4:00 PM</div>
                <div class="time-slot">5:00 PM</div>
                <div class="time-slot">6:00 PM</div>
              </div>
            </div>
            <div class="appointments-column" id="appointments-container">
              <!-- Appointments will be populated by JavaScript -->
            </div>
          </div>
        </div>

        <!-- Upcoming Appointments -->
        <div class="upcoming-appointments">
          <div class="section-header">
            <h2>Upcoming Appointments</h2>
            <div class="section-actions">
              <button class="refresh-btn">
                <i class="fas fa-sync-alt"></i>
                Refresh
              </button>
            </div>
          </div>
          <div class="appointments-list" id="upcoming-appointments-list">
            <!-- Upcoming appointments will be populated by JavaScript -->
          </div>
        </div>
      </div>
    </div>

    <!-- Appointment Detail Modal -->
    <div class="modal" id="appointment-detail-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2 id="modal-appointment-title">Appointment Details</h2>
          <button class="close-modal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="appointment-details-grid">
            <!-- Appointment details will be populated by JavaScript -->
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Scripts -->
  <script src="js/admin/admin-auth.js"></script>
  <script src="js/admin/tailor-schedule.js"></script>
  <script type="module" src="js/admin/tailor-notifications.js"></script>
  <script type="module" src="js/admin/tailor-messages.js"></script>
</body>
</html>

