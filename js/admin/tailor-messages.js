// Import tailor messages data
import tailorMessages from '../../data/tailor-messages.js';

// Function to get initials from a name
function getInitials(name) {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase();
}

// Function to render messages in dropdown
function renderTailorMessages() {
  const container = document.querySelector('.admin-message-list');
  if (!container) return;

  container.innerHTML = '';

  if (tailorMessages.length === 0) {
    container.innerHTML = '<div class="empty-message">No new messages</div>';
    return;
  }

  tailorMessages.forEach(message => {
    const messageEl = document.createElement('div');
    messageEl.className = message.read ? 'message-item' : 'message-item unread';
    messageEl.dataset.id = message.id;

    // Create initials for avatar if no image is provided
    const initials = getInitials(message.sender);

    messageEl.innerHTML = `
      <div class="message-avatar">
        ${message.avatar ? `<img src="${message.avatar}" alt="${message.sender}">` : initials}
      </div>
      <div class="message-content">
        <div class="message-sender">
          ${message.sender}
          <span class="message-time">${message.time}</span>
        </div>
        <div class="message-subject">${message.subject}</div>
        <div class="message-preview">${message.message}</div>
      </div>
    `;

    container.appendChild(messageEl);
  });

  // Update message count
  updateTailorMessageCount();
}

// Function to update message count
function updateTailorMessageCount() {
  const counts = document.querySelectorAll('.message-btn .badge');
  if (!counts.length) return;

  const unreadCount = tailorMessages.filter(message => !message.read).length;

  counts.forEach(count => {
    count.textContent = unreadCount;
    count.style.display = unreadCount > 0 ? 'flex' : 'none';
  });
}

// Function to mark all messages as read
function markAllAsRead() {
  tailorMessages.forEach(message => {
    message.read = true;
  });

  renderTailorMessages();
  updateTailorMessageCount();
}

// Function to toggle message dropdown
function toggleMessageDropdown() {
  const dropdown = document.querySelector('.admin-message-dropdown');
  if (!dropdown) return;

  const isVisible = dropdown.classList.contains('show');

  // Close any open dropdowns first
  document.querySelectorAll('.dropdown-menu, .admin-notification-dropdown, .admin-message-dropdown').forEach(el => {
    el.classList.remove('show');
  });

  if (!isVisible) {
    dropdown.classList.add('show');
  }
}

// Initialize messages
document.addEventListener('DOMContentLoaded', () => {
  // Render messages
  renderTailorMessages();

  // Add event listener to message button
  const messageBtn = document.querySelector('.message-btn');
  if (messageBtn) {
    messageBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMessageDropdown();
    });
  }

  // Add event listener to "Mark all as read" button
  const markAllReadBtn = document.getElementById('admin-mark-all-read-messages');
  if (markAllReadBtn) {
    markAllReadBtn.addEventListener('click', markAllAsRead);
  }

  // Add event listeners to individual message items
  document.addEventListener('click', (e) => {
    const messageItem = e.target.closest('.message-item');
    if (messageItem) {
      const id = parseInt(messageItem.dataset.id);
      const message = tailorMessages.find(m => m.id === id);
      if (message) {
        message.read = true;
        messageItem.classList.remove('unread');
        updateTailorMessageCount();
        
        // In a real application, you would redirect to a message detail page
        // For now, we'll just mark it as read
        console.log(`Message ${id} marked as read`);
      }
    }
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.admin-message-dropdown') &&
        !e.target.closest('.message-btn')) {
      const dropdown = document.querySelector('.admin-message-dropdown');
      if (dropdown) {
        dropdown.classList.remove('show');
      }
    }
  });
});

// Export functions for use in other files
export {
  renderTailorMessages,
  updateTailorMessageCount,
  markAllAsRead,
  tailorMessages
};
