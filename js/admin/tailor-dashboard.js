// Tailor Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Initialize sidebar toggle functionality
  initSidebarToggle();

  // Set up event listeners
  setupEventListeners();

  // Set tailor name in UI
  setTailorName();
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
  // View measurement buttons
  document.querySelectorAll('.recent-measurements .action-btn.view').forEach(button => {
    button.addEventListener('click', function() {
      const customerName = this.closest('tr').querySelector('td:first-child').textContent;
      const measurementType = this.closest('tr').querySelector('td:nth-child(3)').textContent;

      // In a real app, this would open a detailed view
      alert(`Viewing measurements for ${customerName} (${measurementType})`);
    });
  });
}



// Function to set tailor name in UI
function setTailorName() {
  // Set the tailor name in the sidebar and dropdown
  const userNameElements = document.querySelectorAll('#user-name, #dropdown-user-name');
  userNameElements.forEach(element => {
    if (element) {
      element.textContent = 'Ryan Mentang';
    }
  });

  // Set the role
  const userRoleElement = document.getElementById('user-role');
  if (userRoleElement) {
    userRoleElement.textContent = 'Tailor';
  }
}


