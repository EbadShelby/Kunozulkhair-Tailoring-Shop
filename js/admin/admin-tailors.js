// Admin Tailors JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Initialize sidebar toggle functionality
  initSidebarToggle();

  // Initialize stats
  initializeStats();

  // Load tailors data
  loadTailors();

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

// Function to initialize stats
function initializeStats() {
  // In a real app, these would be fetched from an API
  document.getElementById('total-tailors').textContent = '8';
  document.getElementById('active-tailors').textContent = '6';
  document.getElementById('avg-workload').textContent = '4.2 tasks';
  document.getElementById('avg-efficiency').textContent = '87%';
}

// Global variable to store tailors data
let tailors = [];

// Function to load tailors data
function loadTailors() {
  // In a real app, this would be fetched from an API
  tailors = getSampleTailors();

  // Render tailors
  renderTailors(tailors);
}

// Function to render tailors in the table
function renderTailors(tailorsList) {
  const tableBody = document.getElementById('tailors-table-body');

  if (!tableBody) return;

  // Clear existing rows
  tableBody.innerHTML = '';

  if (tailorsList.length === 0) {
    const emptyRow = document.createElement('tr');
    emptyRow.innerHTML = `
      <td colspan="7" class="empty-state">
        <p>No tailors found. Add a new tailor to get started.</p>
      </td>
    `;
    tableBody.appendChild(emptyRow);
    return;
  }

  // Add tailor rows
  tailorsList.forEach(tailor => {
    const row = document.createElement('tr');

    // Determine workload class
    let workloadClass = 'low';
    if (tailor.workload > 7) {
      workloadClass = 'high';
    } else if (tailor.workload > 4) {
      workloadClass = 'medium';
    }

    // Calculate workload percentage
    const workloadPercentage = (tailor.workload / 10) * 100;

    row.innerHTML = `
      <td>${tailor.id}</td>
      <td>
        <div class="tailor-info">
          <span class="tailor-name">${tailor.name}</span>
          <span class="tailor-email">${tailor.email}</span>
        </div>
      </td>
      <td>${tailor.specialization.join(', ')}</td>
      <td>
        <div>
          <span>${tailor.workload} tasks</span>
          <div class="progress-bar">
            <div class="progress-fill ${workloadClass}" style="width: ${workloadPercentage}%;"></div>
          </div>
        </div>
      </td>
      <td>${tailor.efficiency}%</td>
      <td><span class="status-badge ${tailor.status}">${formatStatus(tailor.status)}</span></td>
      <td>
        <button class="action-btn view" data-id="${tailor.id}" title="View Details">
          <i class="fas fa-eye"></i>
        </button>
        <button class="action-btn edit" data-id="${tailor.id}" title="Edit">
          <i class="fas fa-edit"></i>
        </button>
        <button class="action-btn delete" data-id="${tailor.id}" title="Delete">
          <i class="fas fa-trash-alt"></i>
        </button>
      </td>
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
  // Search functionality - header search bar
  const headerSearchInput = document.querySelector('.search-bar input');
  const headerSearchBtn = document.querySelector('.search-bar button');

  if (headerSearchInput && headerSearchBtn) {
    headerSearchBtn.addEventListener('click', function() {
      const searchTerm = headerSearchInput.value.trim();
      if (searchTerm) {
        // Set the filter search input to match the header search
        const filterSearchInput = document.getElementById('tailor-search');
        if (filterSearchInput) {
          filterSearchInput.value = searchTerm;
        }
        filterTailors(searchTerm);
      }
    });

    headerSearchInput.addEventListener('keyup', function(event) {
      if (event.key === 'Enter') {
        const searchTerm = headerSearchInput.value.trim();
        // Set the filter search input to match the header search
        const filterSearchInput = document.getElementById('tailor-search');
        if (filterSearchInput) {
          filterSearchInput.value = searchTerm;
        }
        filterTailors(searchTerm);
      }
    });
  }

  // Filter search functionality
  const searchInput = document.getElementById('tailor-search');
  const searchBtn = document.getElementById('search-btn');

  if (searchInput && searchBtn) {
    searchBtn.addEventListener('click', function() {
      filterTailors();
    });

    searchInput.addEventListener('keyup', function(event) {
      if (event.key === 'Enter') {
        filterTailors();
      }
    });
  }

  // Filter functionality
  const statusFilter = document.getElementById('status-filter');
  const specializationFilter = document.getElementById('specialization-filter');

  if (statusFilter) {
    statusFilter.addEventListener('change', filterTailors);
  }

  if (specializationFilter) {
    specializationFilter.addEventListener('change', filterTailors);
  }

  // Add new tailor button
  const addTailorBtn = document.getElementById('add-tailor-btn');
  if (addTailorBtn) {
    addTailorBtn.addEventListener('click', function() {
      openAddTailorModal();
    });
  }

  // View tailor details
  document.addEventListener('click', function(event) {
    if (event.target.closest('.action-btn.view')) {
      const button = event.target.closest('.action-btn.view');
      const tailorId = button.getAttribute('data-id');
      openTailorDetails(tailorId);
    }
  });

  // Edit tailor
  document.addEventListener('click', function(event) {
    if (event.target.closest('.action-btn.edit')) {
      const button = event.target.closest('.action-btn.edit');
      const tailorId = button.getAttribute('data-id');
      openEditTailorModal(tailorId);
    }
  });

  // Delete tailor
  document.addEventListener('click', function(event) {
    if (event.target.closest('.action-btn.delete')) {
      const button = event.target.closest('.action-btn.delete');
      const tailorId = button.getAttribute('data-id');
      confirmDeleteTailor(tailorId);
    }
  });

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

  // Close detail modal
  const closeDetailBtn = document.getElementById('close-detail-btn');
  if (closeDetailBtn) {
    closeDetailBtn.addEventListener('click', function() {
      const modal = document.getElementById('tailor-detail-modal');
      if (modal) {
        modal.style.display = 'none';
      }
    });
  }

  // Edit tailor from detail view
  const editTailorBtn = document.getElementById('edit-tailor-btn');
  if (editTailorBtn) {
    editTailorBtn.addEventListener('click', function() {
      const tailorId = editTailorBtn.getAttribute('data-id');
      if (tailorId) {
        // Close detail modal
        const detailModal = document.getElementById('tailor-detail-modal');
        if (detailModal) {
          detailModal.style.display = 'none';
        }

        // Open edit modal
        openEditTailorModal(tailorId);
      }
    });
  }

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
      saveTailor();
    });
  }

  // Close modals when clicking outside
  window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
      event.target.style.display = 'none';
    }
  });
}

// Function to filter tailors
function filterTailors(searchTermParam) {
  const searchInput = document.getElementById('tailor-search');
  const statusFilter = document.getElementById('status-filter');
  const specializationFilter = document.getElementById('specialization-filter');

  let filteredTailors = [...tailors];

  // Apply search filter
  let searchTerm = searchTermParam;

  // If no search term was passed, try to get it from the input
  if (!searchTerm && searchInput && searchInput.value.trim() !== '') {
    searchTerm = searchInput.value.trim().toLowerCase();
  }

  // Apply search if we have a term
  if (searchTerm) {
    searchTerm = searchTerm.toLowerCase();
    filteredTailors = filteredTailors.filter(tailor =>
      tailor.name.toLowerCase().includes(searchTerm) ||
      tailor.email.toLowerCase().includes(searchTerm) ||
      tailor.id.toLowerCase().includes(searchTerm)
    );
  }

  // Apply status filter
  if (statusFilter && statusFilter.value !== 'all') {
    filteredTailors = filteredTailors.filter(tailor =>
      tailor.status === statusFilter.value
    );
  }

  // Apply specialization filter
  if (specializationFilter && specializationFilter.value !== 'all') {
    filteredTailors = filteredTailors.filter(tailor =>
      tailor.specialization.includes(specializationFilter.value)
    );
  }

  // Render filtered tailors
  renderTailors(filteredTailors);
}

// Function to open tailor details modal
function openTailorDetails(tailorId) {
  const tailor = tailors.find(t => t.id === tailorId);
  if (!tailor) return;

  // Set tailor details
  document.getElementById('detail-name').textContent = tailor.name;
  document.getElementById('detail-email').textContent = tailor.email;
  document.getElementById('detail-phone').textContent = tailor.phone;
  document.getElementById('detail-joined').textContent = tailor.joined;
  document.getElementById('detail-specialization').textContent = tailor.specialization.join(', ');
  document.getElementById('detail-workload').textContent = `${tailor.workload} tasks`;
  document.getElementById('detail-efficiency').textContent = `${tailor.efficiency}%`;

  const statusBadge = document.getElementById('detail-status');
  statusBadge.textContent = formatStatus(tailor.status);
  statusBadge.className = `status-badge ${tailor.status}`;

  // Set data-id for edit button
  const editTailorBtn = document.getElementById('edit-tailor-btn');
  if (editTailorBtn) {
    editTailorBtn.setAttribute('data-id', tailorId);
  }

  // Render assignments
  renderAssignments(tailor.assignments);

  // Render appointments
  renderAppointments(tailor.appointments);

  // Show modal
  const modal = document.getElementById('tailor-detail-modal');
  if (modal) {
    modal.style.display = 'block';
  }
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
    row.innerHTML = `
      <td>${assignment.task}</td>
      <td>${assignment.customer}</td>
      <td>${assignment.dueDate}</td>
      <td>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${assignment.progress}%;"></div>
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

// Function to open add tailor modal
function openAddTailorModal() {
  // Reset form
  const form = document.getElementById('tailor-form');
  if (form) {
    form.reset();
  }

  // Set form title
  const formTitle = document.getElementById('form-title');
  if (formTitle) {
    formTitle.textContent = 'Add New Tailor';
  }

  // Show modal
  const modal = document.getElementById('tailor-form-modal');
  if (modal) {
    modal.style.display = 'block';
  }
}

// Function to open edit tailor modal
function openEditTailorModal(tailorId) {
  const tailor = tailors.find(t => t.id === tailorId);
  if (!tailor) return;

  // Set form title
  const formTitle = document.getElementById('form-title');
  if (formTitle) {
    formTitle.textContent = 'Edit Tailor';
  }

  // Fill form with tailor data
  const form = document.getElementById('tailor-form');
  if (form) {
    form.elements['name'].value = tailor.name;
    form.elements['email'].value = tailor.email;
    form.elements['phone'].value = tailor.phone;
    form.elements['status'].value = tailor.status;
    form.elements['notes'].value = tailor.notes || '';

    // Set specializations
    const specializationCheckboxes = form.querySelectorAll('input[name="specialization"]');
    specializationCheckboxes.forEach(checkbox => {
      checkbox.checked = tailor.specialization.includes(checkbox.value);
    });

    // Add tailor ID as data attribute
    form.setAttribute('data-id', tailorId);
  }

  // Show modal
  const modal = document.getElementById('tailor-form-modal');
  if (modal) {
    modal.style.display = 'block';
  }
}

// Function to save tailor
function saveTailor() {
  const form = document.getElementById('tailor-form');
  if (!form) return;

  // Get form data
  const formData = new FormData(form);
  const tailorData = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    status: formData.get('status'),
    notes: formData.get('notes'),
    specialization: formData.getAll('specialization')
  };

  // Check if editing or adding
  const tailorId = form.getAttribute('data-id');

  if (tailorId) {
    // Edit existing tailor
    const index = tailors.findIndex(t => t.id === tailorId);
    if (index !== -1) {
      // Preserve other properties
      const updatedTailor = {
        ...tailors[index],
        ...tailorData
      };

      tailors[index] = updatedTailor;
    }
  } else {
    // Add new tailor
    const newTailor = {
      id: `T-${Math.floor(1000 + Math.random() * 9000)}`,
      ...tailorData,
      joined: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      workload: Math.floor(Math.random() * 8) + 1,
      efficiency: Math.floor(Math.random() * 20) + 80,
      assignments: [],
      appointments: []
    };

    tailors.unshift(newTailor);
  }

  // Update UI
  renderTailors(tailors);

  // Close modal
  const modal = document.getElementById('tailor-form-modal');
  if (modal) {
    modal.style.display = 'none';
  }

  // Show success message (in a real app)
  console.log('Tailor saved successfully');
}

// Function to confirm delete tailor
function confirmDeleteTailor(tailorId) {
  // In a real app, you would show a confirmation dialog
  if (confirm('Are you sure you want to delete this tailor?')) {
    deleteTailor(tailorId);
  }
}

// Function to delete tailor
function deleteTailor(tailorId) {
  // Remove tailor from array
  tailors = tailors.filter(t => t.id !== tailorId);

  // Update UI
  renderTailors(tailors);

  // Show success message (in a real app)
  console.log('Tailor deleted successfully');
}

// Function to get sample tailors data
function getSampleTailors() {
  return [
    {
      id: 'T-1001',
      name: 'Maria Santos',
      email: 'maria.santos@example.com',
      phone: '+63 912 345 6789',
      specialization: ['Wedding', 'Formal Wear'],
      workload: 7,
      efficiency: 92,
      status: 'active',
      joined: 'January 15, 2022',
      notes: 'Specializes in wedding gowns and formal attire.',
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
    },
    {
      id: 'T-1002',
      name: 'John Reyes',
      email: 'john.reyes@example.com',
      phone: '+63 917 876 5432',
      specialization: ['Formal Wear', 'Casual Wear'],
      workload: 5,
      efficiency: 88,
      status: 'active',
      joined: 'March 10, 2022',
      notes: 'Experienced in men\'s formal wear and suits.',
      assignments: [
        {
          task: 'Suit Alteration',
          customer: 'Carlos Mendoza',
          dueDate: 'July 22, 2023',
          progress: 60
        }
      ],
      appointments: [
        {
          customer: 'Carlos Mendoza',
          service: 'Suit Measurement',
          datetime: 'July 21, 2023 - 2:30 PM'
        }
      ]
    },
    {
      id: 'T-1003',
      name: 'Ana Lim',
      email: 'ana.lim@example.com',
      phone: '+63 919 234 5678',
      specialization: ['Embroidery', 'Wedding'],
      workload: 8,
      efficiency: 95,
      status: 'active',
      joined: 'May 5, 2021',
      notes: 'Master embroiderer with over 10 years of experience.',
      assignments: [
        {
          task: 'Custom Embroidery - Wedding Veil',
          customer: 'Isabella Martinez',
          dueDate: 'July 30, 2023',
          progress: 30
        }
      ],
      appointments: [
        {
          customer: 'Isabella Martinez',
          service: 'Embroidery Consultation',
          datetime: 'July 24, 2023 - 1:00 PM'
        }
      ]
    },
    {
      id: 'T-1004',
      name: 'David Kim',
      email: 'david.kim@example.com',
      phone: '+63 915 987 6543',
      specialization: ['Casual Wear', 'Formal Wear'],
      workload: 3,
      efficiency: 85,
      status: 'on-leave',
      joined: 'August 20, 2022',
      notes: 'On leave until July 25, 2023.',
      assignments: [],
      appointments: []
    },
    {
      id: 'T-1005',
      name: 'Sofia Cruz',
      email: 'sofia.cruz@example.com',
      phone: '+63 918 765 4321',
      specialization: ['Wedding', 'Embroidery'],
      workload: 6,
      efficiency: 90,
      status: 'active',
      joined: 'October 15, 2021',
      notes: 'Specializes in wedding dress embellishments.',
      assignments: [
        {
          task: 'Wedding Dress Embellishment',
          customer: 'Maria Santos',
          dueDate: 'August 5, 2023',
          progress: 20
        }
      ],
      appointments: []
    },
    {
      id: 'T-1006',
      name: 'Miguel Tan',
      email: 'miguel.tan@example.com',
      phone: '+63 916 543 2109',
      specialization: ['Formal Wear'],
      workload: 2,
      efficiency: 82,
      status: 'active',
      joined: 'January 5, 2023',
      notes: 'New tailor, specializing in men\'s formal wear.',
      assignments: [
        {
          task: 'Formal Shirt Tailoring',
          customer: 'David Kim',
          dueDate: 'July 28, 2023',
          progress: 50
        }
      ],
      appointments: [
        {
          customer: 'David Kim',
          service: 'Custom Shirt Consultation',
          datetime: 'July 23, 2023 - 3:00 PM'
        }
      ]
    },
    {
      id: 'T-1007',
      name: 'Lisa Park',
      email: 'lisa.park@example.com',
      phone: '+63 914 321 0987',
      specialization: ['Casual Wear', 'Embroidery'],
      workload: 4,
      efficiency: 87,
      status: 'active',
      joined: 'April 12, 2022',
      notes: 'Specializes in casual wear with embroidery details.',
      assignments: [
        {
          task: 'Custom Embroidered Shirt',
          customer: 'Sarah Lee',
          dueDate: 'July 29, 2023',
          progress: 70
        }
      ],
      appointments: []
    },
    {
      id: 'T-1008',
      name: 'Roberto Gomez',
      email: 'roberto.gomez@example.com',
      phone: '+63 913 876 5432',
      specialization: ['Formal Wear', 'Wedding'],
      workload: 0,
      efficiency: 80,
      status: 'inactive',
      joined: 'February 28, 2021',
      notes: 'Currently inactive. Expected to return in August.',
      assignments: [],
      appointments: []
    }
  ];
}
