// Import admin notifications data and functions
import { adminNotifications, updateNotificationCount } from './admin-notifications.js';

// Function to render notifications on the page
function renderNotificationsPage() {
  const container = document.getElementById('admin-notifications-list');
  if (!container) return;

  container.innerHTML = '';

  if (adminNotifications.length === 0) {
    document.getElementById('empty-notifications').style.display = 'flex';
    return;
  }

  // Get filter values
  const typeFilter = document.getElementById('type-filter').value;
  const readFilter = document.getElementById('read-filter').value;

  // Filter notifications
  let filteredNotifications = [...adminNotifications];

  if (typeFilter !== 'all') {
    filteredNotifications = filteredNotifications.filter(notification => notification.type === typeFilter);
  }

  if (readFilter !== 'all') {
    const isRead = readFilter === 'read';
    filteredNotifications = filteredNotifications.filter(notification => notification.read === isRead);
  }

  // Show empty state if no notifications match filters
  if (filteredNotifications.length === 0) {
    document.getElementById('empty-notifications').style.display = 'flex';
    return;
  } else {
    document.getElementById('empty-notifications').style.display = 'none';
  }

  // Render filtered notifications
  filteredNotifications.forEach(notification => {
    const notificationEl = document.createElement('div');
    notificationEl.className = notification.read ? 'notification-item' : 'notification-item unread';
    notificationEl.dataset.id = notification.id;

    // Add icon based on notification type
    let iconClass = 'fa-bell';

    switch(notification.type) {
      case 'order':
        iconClass = 'fa-shopping-cart';
        break;
      case 'inventory':
        iconClass = 'fa-box';
        break;
      case 'appointment':
        iconClass = 'fa-calendar-alt';
        break;
      case 'tailor':
        iconClass = 'fa-user-tie';
        break;
    }

    notificationEl.innerHTML = `
      <div class="notification-icon">
        <i class="fas ${iconClass}"></i>
      </div>
      <div class="notification-content">
        <div class="notification-title">${notification.title}</div>
        <div class="notification-message">${notification.message}</div>
        <div class="notification-time">${notification.time}</div>
        <div class="notification-actions">
          <button class="toggle-read-btn">${notification.read ? 'Mark as unread' : 'Mark as read'}</button>
        </div>
      </div>
    `;

    container.appendChild(notificationEl);
  });

  // Add event listeners to toggle read buttons
  document.querySelectorAll('.toggle-read-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const notificationItem = e.target.closest('.notification-item');
      const id = parseInt(notificationItem.dataset.id);
      const notification = adminNotifications.find(n => n.id === id);

      if (notification) {
        notification.read = !notification.read;
        renderNotificationsPage();
        updateNotificationCount();
      }
    });
  });
}

// Function to mark all notifications as read
function markAllAsRead() {
  adminNotifications.forEach(notification => {
    notification.read = true;
  });

  renderNotificationsPage();
  updateNotificationCount();
}

// Note: updateNotificationCount is now imported from admin-notifications.js

// Initialize notifications page
document.addEventListener('DOMContentLoaded', () => {
  // Render notifications
  renderNotificationsPage();

  // Add event listener to "Mark all as read" button
  const markAllReadBtn = document.getElementById('mark-all-read-btn');
  if (markAllReadBtn) {
    markAllReadBtn.addEventListener('click', markAllAsRead);
  }

  // Add event listeners to filter controls
  const typeFilter = document.getElementById('type-filter');
  const readFilter = document.getElementById('read-filter');

  if (typeFilter) {
    typeFilter.addEventListener('change', renderNotificationsPage);
  }

  if (readFilter) {
    readFilter.addEventListener('change', renderNotificationsPage);
  }
});
