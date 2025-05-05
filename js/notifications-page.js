// Import notifications data
import notifications from '../data/notifications.js';

// Function to render all notifications on the notifications page
function renderNotificationsPage() {
  const container = document.getElementById('notifications-list');
  const emptyState = document.getElementById('empty-notifications');
  
  if (!container) return;
  
  // Clear container
  container.innerHTML = '';
  
  if (notifications.length === 0) {
    // Show empty state
    if (emptyState) {
      emptyState.style.display = 'block';
    }
    return;
  }
  
  // Hide empty state
  if (emptyState) {
    emptyState.style.display = 'none';
  }
  
  // Sort notifications by date (newest first)
  const sortedNotifications = [...notifications].sort((a, b) => {
    // This is a simple sort based on ID, assuming higher ID = newer
    // In a real app, you would sort by actual date
    return b.id - a.id;
  });
  
  // Render each notification
  sortedNotifications.forEach(notification => {
    const notificationEl = document.createElement('div');
    notificationEl.className = notification.read ? 'notification-card' : 'notification-card unread';
    notificationEl.dataset.id = notification.id;
    notificationEl.dataset.type = getNotificationType(notification);
    
    notificationEl.innerHTML = `
      <div class="notification-title">${notification.title}</div>
      <div class="notification-message">${notification.message}</div>
      <div class="notification-meta">
        <span class="notification-time">${notification.time}</span>
        <div class="notification-actions">
          <button class="mark-read-btn">${notification.read ? 'Mark as unread' : 'Mark as read'}</button>
          <button class="delete-btn">Delete</button>
        </div>
      </div>
    `;
    
    container.appendChild(notificationEl);
  });
  
  // Add event listeners to buttons
  addEventListeners();
}

// Function to determine notification type based on content
function getNotificationType(notification) {
  const title = notification.title.toLowerCase();
  const message = notification.message.toLowerCase();
  
  if (title.includes('order') || message.includes('order')) {
    return 'orders';
  } else if (title.includes('appointment') || message.includes('appointment')) {
    return 'appointments';
  } else if (title.includes('sale') || title.includes('discount') || message.includes('off')) {
    return 'promotions';
  } else {
    return 'other';
  }
}

// Function to add event listeners to notification actions
function addEventListeners() {
  // Mark as read/unread buttons
  document.querySelectorAll('.mark-read-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const card = this.closest('.notification-card');
      const id = parseInt(card.dataset.id);
      const notification = notifications.find(n => n.id === id);
      
      if (notification) {
        notification.read = !notification.read;
        card.classList.toggle('unread');
        this.textContent = notification.read ? 'Mark as unread' : 'Mark as read';
        
        // Update notification count in header
        updateNotificationCount();
      }
    });
  });
  
  // Delete buttons
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const card = this.closest('.notification-card');
      const id = parseInt(card.dataset.id);
      
      // Find index of notification
      const index = notifications.findIndex(n => n.id === id);
      
      if (index !== -1) {
        // Remove from array
        notifications.splice(index, 1);
        
        // Remove from DOM
        card.remove();
        
        // Update notification count
        updateNotificationCount();
        
        // Show empty state if no notifications left
        if (notifications.length === 0) {
          const emptyState = document.getElementById('empty-notifications');
          if (emptyState) {
            emptyState.style.display = 'block';
          }
        }
      }
    });
  });
  
  // Mark all as read button
  const markAllReadBtn = document.getElementById('mark-all-read-btn');
  if (markAllReadBtn) {
    markAllReadBtn.addEventListener('click', function() {
      notifications.forEach(notification => {
        notification.read = true;
      });
      
      // Update UI
      document.querySelectorAll('.notification-card').forEach(card => {
        card.classList.remove('unread');
        const readBtn = card.querySelector('.mark-read-btn');
        if (readBtn) {
          readBtn.textContent = 'Mark as unread';
        }
      });
      
      // Update notification count
      updateNotificationCount();
    });
  }
  
  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('active');
      });
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get filter value
      const filter = this.dataset.filter;
      
      // Filter notifications
      filterNotifications(filter);
    });
  });
}

// Function to filter notifications
function filterNotifications(filter) {
  const cards = document.querySelectorAll('.notification-card');
  
  cards.forEach(card => {
    if (filter === 'all') {
      card.style.display = 'block';
    } else if (filter === 'unread') {
      card.style.display = card.classList.contains('unread') ? 'block' : 'none';
    } else {
      // Filter by type (orders, appointments, promotions)
      card.style.display = card.dataset.type === filter ? 'block' : 'none';
    }
  });
  
  // Check if any cards are visible
  let visibleCards = false;
  cards.forEach(card => {
    if (card.style.display === 'block') {
      visibleCards = true;
    }
  });
  
  // Show empty state if no cards are visible
  const emptyState = document.getElementById('empty-notifications');
  if (emptyState) {
    emptyState.style.display = visibleCards ? 'none' : 'block';
  }
}

// Function to update notification count in header
function updateNotificationCount() {
  const count = document.getElementById('notification-count');
  if (!count) return;
  
  const unreadCount = notifications.filter(notification => !notification.read).length;
  count.textContent = unreadCount;
  count.style.display = unreadCount > 0 ? 'inline-flex' : 'none';
}

// Initialize notifications page
document.addEventListener('DOMContentLoaded', () => {
  renderNotificationsPage();
});
