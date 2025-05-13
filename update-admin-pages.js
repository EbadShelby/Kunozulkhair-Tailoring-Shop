// This is a helper script to update all admin pages with the notification system
// You can run this script manually or use it as a reference for making the changes

const adminPages = [
  'admin-orders.html',
  'admin-appointments.html',
  'admin-customers.html',
  'admin-tailors.html',
  'admin-reports.html',
  'admin-profile.html'
];

// For each admin page:
// 1. Add the CSS link to the head section
// 2. Add the notification dropdown HTML to the notification button
// 3. Add the script tag to the end of the body

// Example for admin-orders.html:
/*
// Step 1: Add CSS link
<link rel="stylesheet" href="css/admin/admin-notifications.css">

// Step 2: Replace notification button with dropdown
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
      <a href="#">View all notifications</a>
    </div>
  </div>
</div>

// Step 3: Add script tag
<script type="module" src="js/admin/admin-notifications.js"></script>
*/
