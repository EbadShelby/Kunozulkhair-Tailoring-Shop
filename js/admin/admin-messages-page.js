// Import admin messages data
import adminMessages from '../../data/admin-messages.js';

// Function to get initials from a name
function getInitials(name) {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase();
}

// Function to render messages in the messages page
function renderAdminMessagesPage() {
  const container = document.getElementById('admin-messages-list');
  if (!container) return;

  container.innerHTML = '';

  if (adminMessages.length === 0) {
    document.getElementById('empty-messages').style.display = 'flex';
    return;
  }

  document.getElementById('empty-messages').style.display = 'none';

  adminMessages.forEach(message => {
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
          <div class="message-status">
            <div class="status-indicator ${message.read ? '' : 'unread'}"></div>
            ${message.sender}
          </div>
          <span class="message-time">${message.time}</span>
        </div>
        <div class="message-subject">${message.subject}</div>
        <div class="message-preview">${message.message}</div>
      </div>
    `;

    // Add click event to open message detail
    messageEl.addEventListener('click', () => {
      openMessageDetail(message);
      // Mark as read when opened
      if (!message.read) {
        message.read = true;
        renderAdminMessagesPage();
        updateAdminMessageCount();
      }
    });

    container.appendChild(messageEl);
  });
}

// Function to open message detail modal
function openMessageDetail(message) {
  const modal = document.getElementById('message-detail-modal');
  const subject = document.getElementById('message-detail-subject');
  const sender = document.getElementById('message-detail-sender-name');
  const time = document.getElementById('message-detail-time');
  const body = document.getElementById('message-detail-body');
  
  if (!modal || !subject || !sender || !time || !body) return;
  
  subject.textContent = message.subject;
  sender.textContent = message.sender;
  time.textContent = message.time;
  body.textContent = message.message;
  
  modal.style.display = 'block';
}

// Function to close message detail modal
function closeMessageDetail() {
  const modal = document.getElementById('message-detail-modal');
  if (!modal) return;
  
  modal.style.display = 'none';
}

// Function to update message count in the header
function updateAdminMessageCount() {
  const counts = document.querySelectorAll('.message-btn .badge');
  if (!counts.length) return;

  const unreadCount = adminMessages.filter(message => !message.read).length;

  counts.forEach(count => {
    count.textContent = unreadCount;
    count.style.display = unreadCount > 0 ? 'flex' : 'none';
  });
  
  // Update unread count in the page header
  const unreadCountEl = document.getElementById('unread-count');
  if (unreadCountEl) {
    unreadCountEl.textContent = unreadCount;
  }
}

// Function to mark all messages as read
function markAllAsRead() {
  adminMessages.forEach(message => {
    message.read = true;
  });

  renderAdminMessagesPage();
  updateAdminMessageCount();
}

// Function to filter messages
function filterMessages() {
  const statusFilter = document.getElementById('status-filter').value;
  
  let filteredMessages = [...adminMessages];
  
  // Filter by read status
  if (statusFilter === 'unread') {
    filteredMessages = filteredMessages.filter(message => !message.read);
  } else if (statusFilter === 'read') {
    filteredMessages = filteredMessages.filter(message => message.read);
  }
  
  // Render filtered messages
  const container = document.getElementById('admin-messages-list');
  if (!container) return;

  container.innerHTML = '';

  if (filteredMessages.length === 0) {
    document.getElementById('empty-messages').style.display = 'flex';
    return;
  }

  document.getElementById('empty-messages').style.display = 'none';

  filteredMessages.forEach(message => {
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
          <div class="message-status">
            <div class="status-indicator ${message.read ? '' : 'unread'}"></div>
            ${message.sender}
          </div>
          <span class="message-time">${message.time}</span>
        </div>
        <div class="message-subject">${message.subject}</div>
        <div class="message-preview">${message.message}</div>
      </div>
    `;

    // Add click event to open message detail
    messageEl.addEventListener('click', () => {
      openMessageDetail(message);
      // Mark as read when opened
      if (!message.read) {
        message.read = true;
        renderAdminMessagesPage();
        updateAdminMessageCount();
      }
    });

    container.appendChild(messageEl);
  });
}

// Initialize messages page
document.addEventListener('DOMContentLoaded', () => {
  // Render messages
  renderAdminMessagesPage();
  
  // Update message count
  updateAdminMessageCount();

  // Add event listener to "Mark all as read" button
  const markAllReadBtn = document.getElementById('mark-all-read-btn');
  if (markAllReadBtn) {
    markAllReadBtn.addEventListener('click', markAllAsRead);
  }
  
  // Add event listener to close modal button
  const closeModalBtn = document.getElementById('message-detail-close');
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeMessageDetail);
  }
  
  // Add event listener to status filter
  const statusFilter = document.getElementById('status-filter');
  if (statusFilter) {
    statusFilter.addEventListener('change', filterMessages);
  }
  
  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    const modal = document.getElementById('message-detail-modal');
    if (e.target === modal) {
      closeMessageDetail();
    }
  });
});
