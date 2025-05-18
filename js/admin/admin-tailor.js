// Admin Tailor JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Initialize sidebar toggle functionality
  initSidebarToggle();

  // Load tailor data
  loadTailorData();

  // Set up event listeners
  setupEventListeners();
});

// Function to initialize sidebar toggle
function initSidebarToggle() {
  const sidebarToggles = document.querySelectorAll('#sidebar-toggle');
  const adminContainer = document.querySelector('.admin-container');

  if (sidebarToggles.length > 0 && adminContainer) {
    sidebarToggles.forEach(toggle => {
      toggle.addEventListener('click', function() {
        adminContainer.classList.toggle('sidebar-collapsed');
      });
    });
  }
}

// Global variable to store tailor data
let tailorData = null;

// Function to load tailor data
function loadTailorData() {
  // In a real app, this would be fetched from an API
  tailorData = getSampleTailorData();

  // Update UI with tailor data
  updateTailorProfile(tailorData);
  renderAssignments(tailorData.assignments);
  renderAppointments(tailorData.appointments);
}

// Function to update tailor profile in the UI
function updateTailorProfile(tailor) {
  // Update profile header
  document.getElementById('tailor-name').textContent = tailor.name;

  // Update status badge
  const statusBadge = document.getElementById('tailor-status');
  statusBadge.textContent = formatStatus(tailor.status);
  statusBadge.className = `status-badge ${tailor.status}`;

  // Update stats
  document.getElementById('current-workload').textContent = `${tailor.workload} tasks`;
  document.getElementById('tailor-efficiency').textContent = `${tailor.efficiency}%`;
  document.getElementById('upcoming-appointments').textContent = tailor.appointments.length;
  document.getElementById('completed-orders').textContent = tailor.completedOrders;

  // Update personal info
  document.getElementById('detail-name').textContent = tailor.name;
  document.getElementById('detail-email').textContent = tailor.email;
  document.getElementById('detail-phone').textContent = tailor.phone;
  document.getElementById('detail-joined').textContent = tailor.joined;
  document.getElementById('detail-specialization').textContent = tailor.specialization.join(', ');
}

// Function to render assignments
function renderAssignments(assignments) {
  const tableBody = document.getElementById('tailor-assignments-table');
  if (!tableBody) return;

  // Clear existing rows
  tableBody.innerHTML = '';

  if (assignments.length === 0) {
    const emptyRow = document.createElement('tr');
    emptyRow.innerHTML = `
      <td colspan="4" class="empty-state">
        <p>No current assignments.</p>
      </td>
    `;
    tableBody.appendChild(emptyRow);
    return;
  }

  // Add assignment rows
  assignments.forEach(assignment => {
    const row = document.createElement('tr');

    // Determine progress class
    let progressClass = 'low';
    if (assignment.progress > 75) {
      progressClass = 'high';
    } else if (assignment.progress > 40) {
      progressClass = 'medium';
    }

    row.innerHTML = `
      <td>${assignment.task}</td>
      <td>${assignment.customer}</td>
      <td>${assignment.dueDate}</td>
      <td>
        <div class="progress-bar">
          <div class="progress-fill ${progressClass}" style="width: ${assignment.progress}%;"></div>
        </div>
        <span>${assignment.progress}%</span>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Function to render appointments
function renderAppointments(appointments) {
  const tableBody = document.getElementById('tailor-appointments-table');
  if (!tableBody) return;

  // Clear existing rows
  tableBody.innerHTML = '';

  if (appointments.length === 0) {
    const emptyRow = document.createElement('tr');
    emptyRow.innerHTML = `
      <td colspan="3" class="empty-state">
        <p>No upcoming appointments.</p>
      </td>
    `;
    tableBody.appendChild(emptyRow);
    return;
  }

  // Add appointment rows
  appointments.forEach(appointment => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${appointment.customer}</td>
      <td>${appointment.service}</td>
      <td>${appointment.datetime}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Function to format status text
function formatStatus(status) {
  switch (status) {
    case 'active':
      return 'Active';
    case 'on-leave':
      return 'On Leave';
    case 'inactive':
      return 'Inactive';
    default:
      return status;
  }
}

// Function to set up event listeners
function setupEventListeners() {
  // Edit tailor button
  const editTailorBtn = document.getElementById('edit-tailor-btn');
  if (editTailorBtn) {
    editTailorBtn.addEventListener('click', function() {
      openEditTailorModal();
    });
  }

  // Close modals
  const closeButtons = document.querySelectorAll('.close-modal');
  closeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const modal = button.closest('.modal');
      if (modal) {
        modal.style.display = 'none';
      }
    });
  });

  // Cancel form
  const cancelFormBtn = document.getElementById('cancel-form');
  if (cancelFormBtn) {
    cancelFormBtn.addEventListener('click', function() {
      const modal = document.getElementById('tailor-form-modal');
      if (modal) {
        modal.style.display = 'none';
      }
    });
  }

  // Submit form
  const tailorForm = document.getElementById('tailor-form');
  if (tailorForm) {
    tailorForm.addEventListener('submit', function(event) {
      event.preventDefault();
      saveTailorChanges();
    });
  }

  // Close modals when clicking outside
  window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
      event.target.style.display = 'none';
    }
  });
}

// Function to open edit tailor modal
function openEditTailorModal() {
  if (!tailorData) return;

  // Fill form with tailor data
  const form = document.getElementById('tailor-form');
  if (form) {
    form.elements['name'].value = tailorData.name;
    form.elements['email'].value = tailorData.email;
    form.elements['phone'].value = tailorData.phone;
    form.elements['status'].value = tailorData.status;
    form.elements['notes'].value = tailorData.notes || '';

    // Set specializations
    const specializationCheckboxes = form.querySelectorAll('input[name="specialization"]');
    specializationCheckboxes.forEach(checkbox => {
      checkbox.checked = tailorData.specialization.map(s => s.toLowerCase()).includes(checkbox.value);
    });
  }

  // Show modal
  const modal = document.getElementById('tailor-form-modal');
  if (modal) {
    modal.style.display = 'block';
  }
}

// Function to save tailor changes
function saveTailorChanges() {
  const form = document.getElementById('tailor-form');
  if (!form) return;

  // Get form data
  const formData = new FormData(form);

  // Update tailor data
  tailorData.name = formData.get('name');
  tailorData.email = formData.get('email');
  tailorData.phone = formData.get('phone');
  tailorData.status = formData.get('status');
  tailorData.notes = formData.get('notes');
  tailorData.specialization = formData.getAll('specialization').map(s => {
    // Capitalize first letter
    return s.charAt(0).toUpperCase() + s.slice(1);
  });

  // Update UI
  updateTailorProfile(tailorData);

  // Close modal
  const modal = document.getElementById('tailor-form-modal');
  if (modal) {
    modal.style.display = 'none';
  }

  // Show success message (in a real app)
  console.log('Tailor profile updated successfully');
}

// Function to get sample tailor data
function getSampleTailorData() {
  return {
    id: 'T-1001',
    name: 'Ryan Mentang',
    email: 'ryan.mentang@example.com',
    phone: '+63 912 345 6789',
    specialization: ['Wedding', 'Formal Wear'],
    workload: 7,
    efficiency: 92,
    status: 'active',
    joined: 'January 15, 2022',
    notes: 'Specializes in wedding gowns and formal attire.',
    completedOrders: 124,
    assignments: [
      {
        task: 'Wedding Dress - Final Touches',
        customer: 'Elena Garcia',
        dueDate: 'July 20, 2023',
        progress: 80
      },
      {
        task: 'Evening Gown Alteration',
        customer: 'Sophia Lee',
        dueDate: 'July 25, 2023',
        progress: 40
      },
      {
        task: 'Formal Suit Tailoring',
        customer: 'James Wilson',
        dueDate: 'July 28, 2023',
        progress: 25
      }
    ],
    appointments: [
      {
        customer: 'Elena Garcia',
        service: 'Wedding Dress Fitting',
        datetime: 'July 20, 2023 - 10:00 AM'
      },
      {
        customer: 'Sophia Lee',
        service: 'Dress Alteration',
        datetime: 'July 22, 2023 - 11:00 AM'
      }
    ]
  };
}
