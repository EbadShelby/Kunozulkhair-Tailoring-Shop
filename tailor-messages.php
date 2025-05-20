<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Messages - Kunozulkhair Tailoring Shop</title>

  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Baskervville:ital@0;1&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">

  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">

  <!-- Custom CSS -->
  <link rel="stylesheet" href="css/admin/admin-dashboard.css">
  <link rel="stylesheet" href="css/admin/tailor-dashboard.css">
  <link rel="stylesheet" href="css/admin/tailor-notifications.css">
  <link rel="stylesheet" href="css/admin/admin-messages.css">
  <link rel="stylesheet" href="css/admin/admin-messages-page.css">

  <link rel="icon" href="assets/images/logo.jpg" type="image/png">
</head>
<body>
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

      <!-- Messages Content -->
      <div class="dashboard-content">
        <div class="page-header">
          <h1>Messages</h1>
          <p>View and manage your messages (<span id="unread-count">0</span> unread)</p>
        </div>

        <!-- Message Actions -->
        <div class="message-actions">
          <button id="mark-all-read-btn" class="btn-primary">
            <i class="fas fa-check-double"></i> Mark All as Read
          </button>

          <div class="message-filters">
            <div class="filter-group">
              <label for="status-filter">Status:</label>
              <select id="status-filter">
                <option value="all">All Messages</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Messages List -->
        <div class="messages-container">
          <div id="tailor-messages-list" class="admin-messages-page-list">
            <!-- Messages will be dynamically inserted here -->
          </div>
          <div class="empty-state" id="empty-messages" style="display: none;">
            <i class="fas fa-envelope-open"></i>
            <p>No messages found</p>
          </div>
        </div>
      </div>
    </main>
  </div>

  <!-- Message Detail Modal -->
  <div id="message-detail-modal" class="message-detail-modal">
    <div class="message-detail-content">
      <div class="message-detail-header">
        <div>
          <h2 id="message-detail-subject" class="message-detail-subject">Message Subject</h2>
          <div class="message-detail-sender">
            <span>From:</span>
            <span id="message-detail-sender-name" class="message-detail-sender-name">Sender Name</span>
            <span id="message-detail-time" class="message-detail-time">Time</span>
          </div>
        </div>
        <button id="message-detail-close" class="message-detail-close">&times;</button>
      </div>
      <div id="message-detail-body" class="message-detail-body">
        Message content will appear here.
      </div>
      <div class="message-detail-footer">
        <button class="btn-primary">
          <i class="fas fa-reply"></i> Reply
        </button>
      </div>
    </div>
  </div>

  <!-- Scripts -->
  <script src="js/admin/admin-auth.js"></script>
  <script type="module" src="js/admin/tailor-notifications.js"></script>
  <script type="module" src="js/admin/tailor-messages.js"></script>
  <script type="module" src="js/admin/tailor-messages-page.js"></script>
</body>
</html>

