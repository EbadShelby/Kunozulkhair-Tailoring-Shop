// Import notifications data
import notifications from '../data/notifications.js';

// Function to render notifications
function renderNotifications() {
  const container = document.querySelector('.notification-list');
  if (!container) return;
  
  container.innerHTML = '';
  
  if (notifications.length === 0) {
    container.innerHTML = '<div class="empty-notification">No new notifications</div>';
    return;
  }
  
  notifications.forEach(notification => {
    const notificationEl = document.createElement('div');
    notificationEl.className = notification.read ? 'notification-item' : 'notification-item unread';
    notificationEl.dataset.id = notification.id;
    
    notificationEl.innerHTML = `
      <div class="notification-title">${notification.title}</div>
      <div class="notification-message">${notification.message}</div>
      <div class="notification-time">${notification.time}</div>
    `;
    
    container.appendChild(notificationEl);
  });
  
  // Update notification count
  updateNotificationCount();
}

// Function to update notification count
function updateNotificationCount() {
  const count = document.getElementById('notification-count');
  if (!count) return;
  
  const unreadCount = notifications.filter(notification => !notification.read).length;
  count.textContent = unreadCount;
  count.style.display = unreadCount > 0 ? 'inline-flex' : 'none';
}

// Function to mark all notifications as read
function markAllAsRead() {
  notifications.forEach(notification => {
    notification.read = true;
  });
  
  renderNotifications();
  updateNotificationCount();
}

// Initialize notifications
document.addEventListener('DOMContentLoaded', () => {
  // Render notifications
  renderNotifications();
  
  // Add event listener to "Mark all as read" button
  const markAllReadBtn = document.getElementById('mark-all-read');
  if (markAllReadBtn) {
    markAllReadBtn.addEventListener('click', markAllAsRead);
  }
  
  // Add event listeners to individual notification items
  document.addEventListener('click', (e) => {
    const notificationItem = e.target.closest('.notification-item');
    if (notificationItem) {
      const id = parseInt(notificationItem.dataset.id);
      const notification = notifications.find(n => n.id === id);
      if (notification) {
        notification.read = true;
        notificationItem.classList.remove('unread');
        updateNotificationCount();
      }
    }
  });
});

export { renderNotifications, markAllAsRead };