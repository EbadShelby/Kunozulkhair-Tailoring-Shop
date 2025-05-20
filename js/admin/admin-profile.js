// Admin Profile JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Initialize sidebar toggle functionality
  initSidebarToggle();
  
  // Set up event listeners
  setupEventListeners();
  
  // Load profile data
  loadProfileData();
});

// Function to initialize sidebar toggle
function initSidebarToggle() {
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const adminContainer = document.querySelector('.admin-container');
  
  if (sidebarToggle && adminContainer) {
    sidebarToggle.addEventListener('click', function() {
      adminContainer.classList.toggle('sidebar-collapsed');
    });
  }
}

// Function to set up event listeners
function setupEventListeners() {
  // Edit profile button
  const editProfileBtn = document.getElementById('edit-profile-btn');
  const editProfileModal = document.getElementById('edit-profile-modal');
  const closeModalBtns = document.querySelectorAll('.close-modal');
  const cancelEditBtn = document.getElementById('cancel-edit-btn');
  const saveProfileBtn = document.getElementById('save-profile-btn');
  
  // Change password button
  const changePasswordBtn = document.getElementById('change-password-btn');
  const changePasswordModal = document.getElementById('change-password-modal');
  const cancelPasswordBtn = document.getElementById('cancel-password-btn');
  const savePasswordBtn = document.getElementById('save-password-btn');
  
  // Logout button
  const logoutBtn = document.getElementById('logout-btn');
  const dropdownLogoutBtn = document.getElementById('dropdown-logout');
  
  // Edit profile modal
  if (editProfileBtn && editProfileModal) {
    editProfileBtn.addEventListener('click', function() {
      editProfileModal.style.display = 'block';
    });
  }
  
  // Change password modal
  if (changePasswordBtn && changePasswordModal) {
    changePasswordBtn.addEventListener('click', function() {
      changePasswordModal.style.display = 'block';
    });
  }
  
  // Close modals
  if (closeModalBtns) {
    closeModalBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        if (editProfileModal) editProfileModal.style.display = 'none';
        if (changePasswordModal) changePasswordModal.style.display = 'none';
      });
    });
  }
  
  // Cancel edit profile
  if (cancelEditBtn && editProfileModal) {
    cancelEditBtn.addEventListener('click', function() {
      editProfileModal.style.display = 'none';
    });
  }
  
  // Cancel change password
  if (cancelPasswordBtn && changePasswordModal) {
    cancelPasswordBtn.addEventListener('click', function() {
      changePasswordModal.style.display = 'none';
    });
  }
  
  // Save profile changes
  if (saveProfileBtn && editProfileModal) {
    saveProfileBtn.addEventListener('click', function() {
      saveProfileChanges();
      editProfileModal.style.display = 'none';
    });
  }
  
  // Save password changes
  if (savePasswordBtn && changePasswordModal) {
    savePasswordBtn.addEventListener('click', function() {
      savePasswordChanges();
      changePasswordModal.style.display = 'none';
    });
  }
  
  // Logout functionality
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      logout();
    });
  }
  
  if (dropdownLogoutBtn) {
    dropdownLogoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      logout();
    });
  }
  
  // Close modal when clicking outside
  window.addEventListener('click', function(event) {
    if (event.target === editProfileModal) {
      editProfileModal.style.display = 'none';
    }
    if (event.target === changePasswordModal) {
      changePasswordModal.style.display = 'none';
    }
  });
}

// Function to load profile data
function loadProfileData() {
  // In a real application, this would fetch data from a server
  // For now, we'll use placeholder data
  
  // This is where you would make an API call to get the user's profile data
  // For demonstration purposes, we're using static data
  
  // Update profile header
  document.getElementById('profile-name').textContent = 'Admin User';
  document.getElementById('profile-role').textContent = 'Administrator';
  document.getElementById('profile-email').textContent = 'admin@kunozulkhair.com';
  
  // Update profile details
  document.getElementById('full-name').textContent = 'Admin User';
  document.getElementById('email').textContent = 'admin@kunozulkhair.com';
  document.getElementById('phone').textContent = '+63 912 345 6789';
  document.getElementById('role').textContent = 'Administrator';
  document.getElementById('username').textContent = 'admin';
  document.getElementById('last-login').textContent = 'Today at 9:30 AM';
  document.getElementById('account-created').textContent = 'January 1, 2023';
  
  // Update sidebar user info
  document.getElementById('user-name').textContent = 'Admin User';
  document.getElementById('user-role').textContent = 'Administrator';
  
  // Update dropdown user name
  document.getElementById('dropdown-user-name').textContent = 'Admin';
}

// Function to save profile changes
function saveProfileChanges() {
  // Get form values
  const fullName = document.getElementById('edit-full-name').value;
  const email = document.getElementById('edit-email').value;
  const phone = document.getElementById('edit-phone').value;
  const username = document.getElementById('edit-username').value;
  
  // In a real application, this would send data to a server
  // For now, we'll just update the UI
  
  // Update profile header
  document.getElementById('profile-name').textContent = fullName;
  document.getElementById('profile-email').textContent = email;
  
  // Update profile details
  document.getElementById('full-name').textContent = fullName;
  document.getElementById('email').textContent = email;
  document.getElementById('phone').textContent = phone;
  document.getElementById('username').textContent = username;
  
  // Update sidebar user info
  document.getElementById('user-name').textContent = fullName;
  
  // Update dropdown user name
  document.getElementById('dropdown-user-name').textContent = fullName.split(' ')[0];
  
  // Show success message
  showNotification('Profile updated successfully!', 'success');
}

// Function to save password changes
function savePasswordChanges() {
  // Get form values
  const currentPassword = document.getElementById('current-password').value;
  const newPassword = document.getElementById('new-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  
  // Validate passwords
  if (!currentPassword || !newPassword || !confirmPassword) {
    showNotification('Please fill in all password fields', 'error');
    return;
  }
  
  if (newPassword !== confirmPassword) {
    showNotification('New passwords do not match', 'error');
    return;
  }
  
  // In a real application, this would send data to a server
  // For now, we'll just show a success message
  
  // Reset form
  document.getElementById('current-password').value = '';
  document.getElementById('new-password').value = '';
  document.getElementById('confirm-password').value = '';
  
  // Show success message
  showNotification('Password updated successfully!', 'success');
}

// Function to show notification
function showNotification(message, type) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  // Add to document
  document.body.appendChild(notification);
  
  // Show notification
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Function to handle logout
function logout() {
  // In a real application, this would clear session data and redirect to login
  window.location.href = 'admin-login.php';
}
