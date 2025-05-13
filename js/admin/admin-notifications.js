// Import admin notifications data
import adminNotifications from '../../data/admin-notifications.js';

// Function to render notifications in dropdown
function renderAdminNotifications() {
  const container = document.querySelector('.admin-notification-list');
  if (!container) return;

  container.innerHTML = '';

  if (adminNotifications.length === 0) {
    container.innerHTML = '<div class="empty-notification">No new notifications</div>';
    return;
  }

  adminNotifications.forEach(notification => {
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
      </div>
    `;

    container.appendChild(notificationEl);
  });

  // Update notification count
  updateAdminNotificationCount();
}

// Function to update notification count
function updateAdminNotificationCount() {
  const counts = document.querySelectorAll('.notification-btn .badge');
  if (!counts.length) return;

  const unreadCount = adminNotifications.filter(notification => !notification.read).length;

  counts.forEach(count => {
    count.textContent = unreadCount;
    count.style.display = unreadCount > 0 ? 'flex' : 'none';
  });
}

// Function to mark all notifications as read
function markAllAsRead() {
  adminNotifications.forEach(notification => {
    notification.read = true;
  });

  renderAdminNotifications();
  updateAdminNotificationCount();
}

// Function to toggle notification dropdown
function toggleNotificationDropdown() {
  const dropdown = document.querySelector('.admin-notification-dropdown');
  if (!dropdown) return;

  const isVisible = dropdown.classList.contains('show');

  // Close any open dropdowns first
  document.querySelectorAll('.dropdown-menu, .admin-notification-dropdown').forEach(el => {
    el.classList.remove('show');
  });

  if (!isVisible) {
    dropdown.classList.add('show');
  }
}

// Initialize notifications
document.addEventListener('DOMContentLoaded', () => {
  // Render notifications
  renderAdminNotifications();

  // Add event listener to notification button
  const notificationBtn = document.querySelector('.notification-btn');
  if (notificationBtn) {
    notificationBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleNotificationDropdown();
    });
  }

  // Add event listener to "Mark all as read" button
  const markAllReadBtn = document.getElementById('admin-mark-all-read');
  if (markAllReadBtn) {
    markAllReadBtn.addEventListener('click', markAllAsRead);
  }

  // Add event listeners to individual notification items
  document.addEventListener('click', (e) => {
    const notificationItem = e.target.closest('.notification-item');
    if (notificationItem) {
      const id = parseInt(notificationItem.dataset.id);
      const notification = adminNotifications.find(n => n.id === id);
      if (notification) {
        notification.read = true;
        notificationItem.classList.remove('unread');
        updateAdminNotificationCount();
      }
    }
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.admin-notification-dropdown') &&
        !e.target.closest('.notification-btn')) {
      const dropdown = document.querySelector('.admin-notification-dropdown');
      if (dropdown) {
        dropdown.classList.remove('show');
      }
    }
  });
});

// Export functions for use in other files
export {
  renderAdminNotifications,
  updateAdminNotificationCount as updateNotificationCount,
  markAllAsRead,
  adminNotifications
};
