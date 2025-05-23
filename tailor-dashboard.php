<?php
/**
 * Tailor Dashboard
 *
 * Main dashboard for tailor users.
 */

// Include tailor authentication check
require_once 'tailor-check.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tailor Dashboard - Kunozulkhair Tailoring Shop</title>

  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Baskervville:ital@0;1&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">

  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">

  <!-- Custom CSS -->
  <link rel="stylesheet" href="css/admin/admin-dashboard.css">
  <link rel="stylesheet" href="css/admin/admin-dashboard-svg.css">
  <link rel="stylesheet" href="css/admin/tailor-dashboard.css">
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
          <li class="active">
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
          <h1>Tailor Dashboard</h1>
          <p>Welcome to your tailor workspace</p>
        </div>

        <!-- Stats Cards -->
        <div class="stats-cards">
          <div class="stat-card tasks">
            <div class="stat-card-header">
              <h3 class="stat-card-title">Assigned Tasks</h3>
              <div class="stat-card-icon">
                <i class="fas fa-tasks"></i>
              </div>
            </div>
            <div class="stat-card-body">
              <p class="stat-value">12</p>
            </div>
          </div>

          <div class="stat-card appointments">
            <div class="stat-card-header">
              <h3 class="stat-card-title">Today's Appointments</h3>
              <div class="stat-card-icon">
                <i class="fas fa-calendar-check"></i>
              </div>
            </div>
            <div class="stat-card-body">
              <p class="stat-value">5</p>
            </div>
          </div>

          <div class="stat-card completed">
            <div class="stat-card-header">
              <h3 class="stat-card-title">Completed Tasks</h3>
              <div class="stat-card-icon">
                <i class="fas fa-check-circle"></i>
              </div>
            </div>
            <div class="stat-card-body">
              <p class="stat-value">8</p>
            </div>
          </div>

          <div class="stat-card pending">
            <div class="stat-card-header">
              <h3 class="stat-card-title">Pending Approvals</h3>
              <div class="stat-card-icon">
                <i class="fas fa-hourglass-half"></i>
              </div>
            </div>
            <div class="stat-card-body">
              <p class="stat-value">3</p>
            </div>
          </div>
        </div>

        <!-- Today's Schedule & Work Queue -->
        <div class="dashboard-grid">
          <!-- Today's Schedule -->
          <div class="dashboard-card today-schedule">
            <div class="card-header">
              <h2>Today's Schedule</h2>
              <a href="tailor-schedule.php" class="view-all">View Full Schedule</a>
            </div>
            <div class="card-content">
              <div class="schedule-timeline">
                <div class="timeline-item">
                  <div class="timeline-time">9:00 AM</div>
                  <div class="timeline-content">
                    <div class="timeline-title">Fitting Appointment</div>
                    <div class="timeline-details">
                      <span class="customer-name">Elena Garcia</span>
                      <span class="appointment-type">Formal Dress Fitting</span>
                    </div>
                  </div>
                </div>

                <div class="timeline-item">
                  <div class="timeline-time">11:30 AM</div>
                  <div class="timeline-content">
                    <div class="timeline-title">Measurement Session</div>
                    <div class="timeline-details">
                      <span class="customer-name">Carlos Mendoza</span>
                      <span class="appointment-type">Formal Dress Measurement</span>
                    </div>
                  </div>
                </div>

                <div class="timeline-item">
                  <div class="timeline-time">2:00 PM</div>
                  <div class="timeline-content">
                    <div class="timeline-title">Fitting Appointment</div>
                    <div class="timeline-details">
                      <span class="customer-name">Sophia Lee</span>
                      <span class="appointment-type">Dress Alteration</span>
                    </div>
                  </div>
                </div>

                <div class="timeline-item">
                  <div class="timeline-time">4:30 PM</div>
                  <div class="timeline-content">
                    <div class="timeline-title">Consultation</div>
                    <div class="timeline-details">
                      <span class="customer-name">David Kim</span>
                      <span class="appointment-type">Casual Dress Consultation</span>
                    </div>
                  </div>
                </div>

                <div class="timeline-item">
                  <div class="timeline-time">5:45 PM</div>
                  <div class="timeline-content">
                    <div class="timeline-title">Final Pickup</div>
                    <div class="timeline-details">
                      <span class="customer-name">Isabella Martinez</span>
                      <span class="appointment-type">Formal Dress</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Work Queue -->
          <div class="dashboard-card work-queue">
            <div class="card-header">
              <h2>Work Queue</h2>
              <a href="tailor-work-queue.php" class="view-all">View All Tasks</a>
            </div>
            <div class="card-content">
              <div class="task-list">
                <div class="task-item">
                  <div class="task-status urgent"></div>
                  <div class="task-content">
                    <div class="task-title">Wedding Dress - Final Touches</div>
                    <div class="task-details">
                      <span class="customer-name">Elena Garcia</span>
                      <span class="due-date">Due: Jul 20, 2023</span>
                    </div>
                    <div class="task-progress">
                      <div class="progress-bar">
                        <div class="progress-fill" style="width: 80%;"></div>
                      </div>
                      <span class="progress-text">80%</span>
                    </div>
                  </div>
                </div>

                <div class="task-item">
                  <div class="task-status high"></div>
                  <div class="task-content">
                    <div class="task-title">Evening Dress - Hemming</div>
                    <div class="task-details">
                      <span class="customer-name">Ana Reyes</span>
                      <span class="due-date">Due: Jul 22, 2023</span>
                    </div>
                    <div class="task-progress">
                      <div class="progress-bar">
                        <div class="progress-fill" style="width: 65%;"></div>
                      </div>
                      <span class="progress-text">65%</span>
                    </div>
                  </div>
                </div>

                <div class="task-item">
                  <div class="task-status medium"></div>
                  <div class="task-content">
                    <div class="task-title">Formal Dress - Alterations</div>
                    <div class="task-details">
                      <span class="customer-name">Sophia Lee</span>
                      <span class="due-date">Due: Jul 25, 2023</span>
                    </div>
                    <div class="task-progress">
                      <div class="progress-bar">
                        <div class="progress-fill" style="width: 40%;"></div>
                      </div>
                      <span class="progress-text">40%</span>
                    </div>
                  </div>
                </div>

                <div class="task-item">
                  <div class="task-status medium"></div>
                  <div class="task-content">
                    <div class="task-title">Business Suit - Alterations</div>
                    <div class="task-details">
                      <span class="customer-name">Mike Johnson</span>
                      <span class="due-date">Due: Jul 28, 2023</span>
                    </div>
                    <div class="task-progress">
                      <div class="progress-bar">
                        <div class="progress-fill" style="width: 25%;"></div>
                      </div>
                      <span class="progress-text">25%</span>
                    </div>
                  </div>
                </div>

                <div class="task-item">
                  <div class="task-status low"></div>
                  <div class="task-content">
                    <div class="task-title">Casual Dress - Adjustment</div>
                    <div class="task-details">
                      <span class="customer-name">Sarah Lee</span>
                      <span class="due-date">Due: Aug 2, 2023</span>
                    </div>
                    <div class="task-progress">
                      <div class="progress-bar">
                        <div class="progress-fill" style="width: 10%;"></div>
                      </div>
                      <span class="progress-text">10%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Measurements & Notes -->
        <div class="dashboard-grid">
          <!-- Recent Measurements -->
          <div class="dashboard-card recent-measurements">
            <div class="card-header">
              <h2>Recent Measurements</h2>
              <a href="tailor-measurements.php" class="view-all">View All</a>
            </div>
            <div class="card-content">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Elena Garcia</td>
                    <td>Jul 15, 2023</td>
                    <td>Formal Dress</td>
                    <td>
                      <button class="action-btn view">
                        <i class="fas fa-eye"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>Carlos Mendoza</td>
                    <td>Jul 14, 2023</td>
                    <td>Formal Dress</td>
                    <td>
                      <button class="action-btn view">
                        <i class="fas fa-eye"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>Sophia Lee</td>
                    <td>Jul 12, 2023</td>
                    <td>Evening Dress</td>
                    <td>
                      <button class="action-btn view">
                        <i class="fas fa-eye"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>David Kim</td>
                    <td>Jul 10, 2023</td>
                    <td>Casual Dress</td>
                    <td>
                      <button class="action-btn view">
                        <i class="fas fa-eye"></i>
                      </button>
                    </td>
                  </tr>
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
  <script src="js/admin/tailor-dashboard.js"></script>
  <script type="module" src="js/admin/tailor-notifications.js"></script>
  <script type="module" src="js/admin/tailor-messages.js"></script>
</body>
</html>

