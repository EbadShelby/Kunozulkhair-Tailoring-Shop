// Import tailor notifications data
import tailorNotifications from '../../data/tailor-notifications.js';

// Function to render notifications in dropdown
function renderTailorNotifications() {
  const container = document.querySelector('.tailor-notification-list');
  if (!container) return;
  
  container.innerHTML = '';
  
  if (tailorNotifications.length === 0) {
    container.innerHTML = '<div class="empty-notification">No new notifications</div>';
    return;
  }
  
  tailorNotifications.forEach(notification => {
    const notificationEl = document.createElement('div');
    notificationEl.className = notification.read ? 'notification-item' : 'notification-item unread';
    notificationEl.dataset.id = notification.id;
    
    // Add icon based on notification type
    let iconClass = 'fa-bell';
    
    switch(notification.type) {
      case 'order':
        iconClass = 'fa-shopping-cart';
        break;
      case 'appointment':
        iconClass = 'fa-calendar-alt';
        break;
      case 'task':
        iconClass = 'fa-tasks';
        break;
      case 'schedule':
        iconClass = 'fa-clock';
        break;
      case 'message':
        iconClass = 'fa-envelope';
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
  updateTailorNotificationCount();
}

// Function to update notification count
function updateTailorNotificationCount() {
  const counts = document.querySelectorAll('.notification-btn .badge');
  if (!counts.length) return;
  
  const unreadCount = tailorNotifications.filter(notification => !notification.read).length;
  
  counts.forEach(count => {
    count.textContent = unreadCount;
    count.style.display = unreadCount > 0 ? 'flex' : 'none';
  });
}

// Function to mark all notifications as read
function markAllAsRead() {
  tailorNotifications.forEach(notification => {
    notification.read = true;
  });
  
  renderTailorNotifications();
  updateTailorNotificationCount();
}

// Function to toggle notification dropdown
function toggleNotificationDropdown() {
  const dropdown = document.querySelector('.tailor-notification-dropdown');
  if (!dropdown) return;
  
  const isVisible = dropdown.classList.contains('show');
  
  // Close any open dropdowns first
  document.querySelectorAll('.dropdown-menu, .tailor-notification-dropdown').forEach(el => {
    el.classList.remove('show');
  });
  
  if (!isVisible) {
    dropdown.classList.add('show');
  }
}

// Initialize notifications
document.addEventListener('DOMContentLoaded', () => {
  // Render notifications
  renderTailorNotifications();
  
  // Add event listener to notification button
  const notificationBtn = document.querySelector('.notification-btn');
  if (notificationBtn) {
    notificationBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleNotificationDropdown();
    });
  }
  
  // Add event listener to "Mark all as read" button
  const markAllReadBtn = document.getElementById('tailor-mark-all-read');
  if (markAllReadBtn) {
    markAllReadBtn.addEventListener('click', markAllAsRead);
  }
  
  // Add event listeners to individual notification items
  document.addEventListener('click', (e) => {
    const notificationItem = e.target.closest('.notification-item');
    if (notificationItem) {
      const id = parseInt(notificationItem.dataset.id);
      const notification = tailorNotifications.find(n => n.id === id);
      if (notification) {
        notification.read = true;
        notificationItem.classList.remove('unread');
        updateTailorNotificationCount();
      }
    }
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.tailor-notification-dropdown') && 
        !e.target.closest('.notification-btn')) {
      const dropdown = document.querySelector('.tailor-notification-dropdown');
      if (dropdown) {
        dropdown.classList.remove('show');
      }
    }
  });
});

// Export functions for use in other files
export { 
  renderTailorNotifications, 
  updateTailorNotificationCount, 
  markAllAsRead,
  tailorNotifications
};
