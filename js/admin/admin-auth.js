// Shop Authentication Module

document.addEventListener('DOMContentLoaded', function() {
  // Check if user is logged in
  checkAuth();

  // Set up logout functionality
  setupLogout();

  // Update user info in the UI
  updateUserInfo();
});

// Function to check if user is authenticated
function checkAuth() {
  const currentUser = getCurrentUser();

  // If not logged in and not on login page, redirect to login
  if (!currentUser && !window.location.href.includes('admin-login.php')) {
    window.location.href = 'admin-login.php';
    return;
  }

  // If logged in but on login page, redirect to dashboard based on role
  if (currentUser && window.location.href.includes('admin-login.php')) {
    if (currentUser.role === 'admin') {
      window.location.href = 'admin-dashboard.php';
    } else if (currentUser.role === 'tailor') {
      window.location.href = 'tailor-dashboard.php';
    }
    return;
  }

  // Check if user has the right role for the page
  if (currentUser) {
    const role = currentUser.role;

    // If on admin pages but not admin role
    if (window.location.href.includes('admin-') &&
        !window.location.href.includes('admin-login.php') &&
        role !== 'admin') {
      // Redirect to appropriate dashboard based on role
      if (role === 'tailor') {
        window.location.href = 'tailor-dashboard.php';
      } else {
        // For any other role, log out and redirect to login
        logout();
      }
    }

    // If on tailor pages but not tailor role
    if (window.location.href.includes('tailor-') && role !== 'tailor') {
      // Redirect to appropriate dashboard based on role
      if (role === 'admin') {
        window.location.href = 'admin-dashboard.php';
      } else {
        // For any other role, log out and redirect to login
        logout();
      }
    }
  }
}

// Function to get current user from session storage
function getCurrentUser() {
  const userJson = sessionStorage.getItem('currentUser');
  if (!userJson) return null;

  try {
    const user = JSON.parse(userJson);
    return user.loggedIn ? user : null;
  } catch (e) {
    console.error('Error parsing user data:', e);
    return null;
  }
}

// Function to set up logout functionality
function setupLogout() {
  // Main logout button in sidebar
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  }

  // Logout in dropdown menu
  const dropdownLogout = document.getElementById('dropdown-logout');
  if (dropdownLogout) {
    dropdownLogout.addEventListener('click', function(e) {
      e.preventDefault();
      logout();
    });
  }
}

// Function to handle logout
function logout() {
  // Clear session storage
  sessionStorage.removeItem('currentUser');

  // Redirect to login page
  window.location.href = 'admin-login.php';
}

// Function to update user info in the UI
function updateUserInfo() {
  const currentUser = getCurrentUser();
  if (!currentUser) return;

  // Update sidebar user info
  const userNameElement = document.getElementById('user-name');
  const userRoleElement = document.getElementById('user-role');

  if (userNameElement) {
    userNameElement.textContent = formatName(currentUser.name);
  }

  if (userRoleElement) {
    userRoleElement.textContent = formatRole(currentUser.role);
  }

  // Update dropdown user name
  const dropdownUserName = document.getElementById('dropdown-user-name');
  if (dropdownUserName) {
    dropdownUserName.textContent = formatName(currentUser.name);
  }
}

// Helper function to format name
function formatName(name) {
  if (!name) return 'User';

  // Capitalize first letter of each word
  return name.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Helper function to format role
function formatRole(role) {
  if (!role) return 'User';

  // Capitalize first letter
  return role.charAt(0).toUpperCase() + role.slice(1);
}
