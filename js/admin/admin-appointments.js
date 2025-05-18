// Admin Appointments JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Initialize sidebar toggle functionality
  initSidebarToggle();

  // Load appointments data
  loadAppointmentsData();

  // Set up event listeners
  setupEventListeners();
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



// Function to load appointments data
function loadAppointmentsData() {
  // Get appointments from localStorage or initialize empty array
  let appointments = JSON.parse(localStorage.getItem('adminAppointments') || '[]');

  // If no appointments exist, create sample data
  if (appointments.length === 0) {
    appointments = createSampleAppointments();
    localStorage.setItem('adminAppointments', JSON.stringify(appointments));
  }

  // Update stats
  updateAppointmentStats(appointments);

  // Apply filters
  appointments = filterAppointments(appointments);

  // Populate table
  populateAppointmentsTable(appointments);
}

// Function to create sample appointments
function createSampleAppointments() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);

  return [
    {
      id: 'AP12345',
      customer: {
        name: 'Elena Garcia',
        email: 'elena.garcia@example.com',
        phone: '+1234567890'
      },
      service: 'Fitting',
      description: 'Wedding Dress Fitting - Second session',
      date: formatDateForStorage(today),
      time: '10:00',
      assignedTo: 'Ryan Mentang',
      status: 'confirmed',
      notes: [
        {
          text: 'Customer confirmed appointment via email',
          timestamp: new Date(today).setHours(today.getHours() - 24),
          author: 'System'
        }
      ],
      createdAt: new Date(today).setHours(today.getHours() - 48)
    },
    {
      id: 'AP12346',
      customer: {
        name: 'Carlos Mendoza',
        email: 'carlos.mendoza@example.com',
        phone: '+1234567891'
      },
      service: 'Measurement',
      description: 'Suit Measurement for wedding',
      date: formatDateForStorage(tomorrow),
      time: '14:30',
      assignedTo: 'Ryan Mentang',
      status: 'pending',
      notes: [],
      createdAt: new Date(today).setHours(today.getHours() - 24)
    },
    {
      id: 'AP12347',
      customer: {
        name: 'Sophia Lee',
        email: 'sophia.lee@example.com',
        phone: '+1234567892'
      },
      service: 'Alteration',
      description: 'Dress Alteration - Hemming and taking in waist',
      date: formatDateForStorage(nextWeek),
      time: '11:00',
      assignedTo: 'Ryan Mentang',
      status: 'pending',
      notes: [],
      createdAt: new Date(today).setHours(today.getHours() - 72)
    },
    {
      id: 'AP12348',
      customer: {
        name: 'David Kim',
        email: 'david.kim@example.com',
        phone: '+1234567893'
      },
      service: 'Consultation',
      description: 'Custom Shirt Consultation',
      date: formatDateForStorage(nextWeek),
      time: '15:00',
      assignedTo: '',
      status: 'pending',
      notes: [],
      createdAt: new Date(today).setHours(today.getHours() - 96)
    },
    {
      id: 'AP12349',
      customer: {
        name: 'Isabella Martinez',
        email: 'isabella.martinez@example.com',
        phone: '+1234567894'
      },
      service: 'Consultation',
      description: 'Embroidery Consultation',
      date: formatDateForStorage(nextWeek),
      time: '13:00',
      assignedTo: 'Ryan Mentang',
      status: 'cancelled',
      notes: [
        {
          text: 'Customer cancelled due to scheduling conflict',
          timestamp: new Date(today).setHours(today.getHours() - 12),
          author: 'Admin'
        }
      ],
      createdAt: new Date(today).setHours(today.getHours() - 120)
    }
  ];
}

// Function to update appointment stats
function updateAppointmentStats(appointments) {
  const totalAppointments = appointments.length;
  const pendingAppointments = appointments.filter(a => a.status === 'pending').length;
  const confirmedAppointments = appointments.filter(a => a.status === 'confirmed').length;
  const completedAppointments = appointments.filter(a => a.status === 'completed').length;

  document.getElementById('total-appointments').textContent = totalAppointments;
  document.getElementById('pending-appointments').textContent = pendingAppointments;
  document.getElementById('confirmed-appointments').textContent = confirmedAppointments;
  document.getElementById('completed-appointments').textContent = completedAppointments;
}

// Function to filter appointments based on selected filters
function filterAppointments(appointments) {
  const statusFilter = document.getElementById('status-filter').value;
  const serviceFilter = document.getElementById('service-filter').value;
  const dateFilter = document.getElementById('date-filter').value;
  const tailorFilter = document.getElementById('tailor-filter').value;
  const searchTerm = document.getElementById('appointment-search').value.toLowerCase();

  return appointments.filter(appointment => {
    // Status filter
    if (statusFilter !== 'all' && appointment.status !== statusFilter) {
      return false;
    }

    // Service filter
    if (serviceFilter !== 'all' && appointment.service.toLowerCase() !== serviceFilter) {
      return false;
    }

    // Tailor filter
    if (tailorFilter === 'unassigned' && appointment.assignedTo) {
      return false;
    } else if (tailorFilter === 'Ryan Mentang' && appointment.assignedTo !== 'Ryan Mentang') {
      return false;
    }

    // Date filter
    if (dateFilter !== 'all') {
      const appointmentDate = new Date(appointment.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);

      const thisMonth = new Date(today);
      thisMonth.setMonth(thisMonth.getMonth() + 1);

      if (dateFilter === 'today' && appointmentDate.getTime() !== today.getTime()) {
        return false;
      } else if (dateFilter === 'tomorrow' && appointmentDate.getTime() !== tomorrow.getTime()) {
        return false;
      } else if (dateFilter === 'this-week') {
        const endOfWeek = new Date(today);
        endOfWeek.setDate(endOfWeek.getDate() + (6 - today.getDay()));

        if (appointmentDate < today || appointmentDate > endOfWeek) {
          return false;
        }
      } else if (dateFilter === 'next-week') {
        const startOfNextWeek = new Date(today);
        startOfNextWeek.setDate(startOfNextWeek.getDate() + (7 - today.getDay() + 1));

        const endOfNextWeek = new Date(startOfNextWeek);
        endOfNextWeek.setDate(endOfNextWeek.getDate() + 6);

        if (appointmentDate < startOfNextWeek || appointmentDate > endOfNextWeek) {
          return false;
        }
      } else if (dateFilter === 'this-month') {
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        if (appointmentDate < startOfMonth || appointmentDate > endOfMonth) {
          return false;
        }
      }
    }

    // Search term
    if (searchTerm) {
      const customerName = appointment.customer.name.toLowerCase();
      const customerEmail = appointment.customer.email.toLowerCase();
      const service = appointment.service.toLowerCase();
      const description = appointment.description.toLowerCase();

      if (!customerName.includes(searchTerm) &&
          !customerEmail.includes(searchTerm) &&
          !service.includes(searchTerm) &&
          !description.includes(searchTerm) &&
          !appointment.id.toLowerCase().includes(searchTerm)) {
        return false;
      }
    }

    return true;
  });
}

// Function to populate appointments table
function populateAppointmentsTable(appointments) {
  const tableBody = document.getElementById('appointments-table-body');

  // Clear table
  tableBody.innerHTML = '';

  // Add appointments to table
  appointments.forEach(appointment => {
    const row = document.createElement('tr');

    // Format date and time
    const formattedDate = formatDateForDisplay(appointment.date);
    const formattedTime = formatTimeForDisplay(appointment.time);

    // Create status badge
    const statusBadge = document.createElement('span');
    statusBadge.className = `status-badge ${appointment.status}`;
    statusBadge.textContent = formatStatus(appointment.status);

    // Create assigned badge
    const assignedBadge = document.createElement('span');
    assignedBadge.className = `assigned-badge ${!appointment.assignedTo ? 'unassigned' : ''}`;
    assignedBadge.textContent = appointment.assignedTo || 'Unassigned';

    // Add cells
    row.innerHTML = `
      <td>${appointment.id}</td>
      <td>${appointment.customer.name}</td>
      <td>${appointment.service}</td>
      <td>${formattedDate} - ${formattedTime}</td>
      <td></td>
      <td></td>
      <td>
        <button class="action-btn view" data-appointment-id="${appointment.id}" title="View Details">
          <i class="fas fa-eye"></i>
        </button>
        <button class="action-btn edit" data-appointment-id="${appointment.id}" title="Edit">
          <i class="fas fa-edit"></i>
        </button>
        <button class="action-btn delete" data-appointment-id="${appointment.id}" title="Delete">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    `;

    // Add status badge to status cell
    row.querySelector('td:nth-child(6)').appendChild(statusBadge);

    // Add assigned badge to assigned cell
    row.querySelector('td:nth-child(5)').appendChild(assignedBadge);

    // Add row to table
    tableBody.appendChild(row);
  });

  // Add action button listeners
  addActionButtonListeners();
}

// Function to add event listeners to action buttons
function addActionButtonListeners() {
  // View buttons
  document.querySelectorAll('.action-btn.view').forEach(button => {
    button.addEventListener('click', function() {
      const appointmentId = this.getAttribute('data-appointment-id');
      openAppointmentDetailModal(appointmentId);
    });
  });

  // Edit buttons
  document.querySelectorAll('.action-btn.edit').forEach(button => {
    button.addEventListener('click', function() {
      const appointmentId = this.getAttribute('data-appointment-id');
      openEditAppointmentModal(appointmentId);
    });
  });

  // Delete buttons
  document.querySelectorAll('.action-btn.delete').forEach(button => {
    button.addEventListener('click', function() {
      const appointmentId = this.getAttribute('data-appointment-id');
      if (confirm(`Are you sure you want to delete appointment ${appointmentId}?`)) {
        deleteAppointment(appointmentId);
      }
    });
  });
}

// Function to set up event listeners
function setupEventListeners() {
  // Filter change events
  const statusFilter = document.getElementById('status-filter');
  const serviceFilter = document.getElementById('service-filter');
  const dateFilter = document.getElementById('date-filter');
  const tailorFilter = document.getElementById('tailor-filter');
  const searchInput = document.getElementById('appointment-search');
  const searchBtn = document.getElementById('search-btn');

  if (statusFilter) statusFilter.addEventListener('change', loadAppointmentsData);
  if (serviceFilter) serviceFilter.addEventListener('change', loadAppointmentsData);
  if (dateFilter) dateFilter.addEventListener('change', loadAppointmentsData);
  if (tailorFilter) tailorFilter.addEventListener('change', loadAppointmentsData);

  if (searchBtn) {
    searchBtn.addEventListener('click', loadAppointmentsData);
  }

  if (searchInput) {
    searchInput.addEventListener('keyup', function(e) {
      if (e.key === 'Enter') {
        loadAppointmentsData();
      }
    });
  }

  // Add appointment button
  const addAppointmentBtn = document.getElementById('add-appointment-btn');
  if (addAppointmentBtn) {
    addAppointmentBtn.addEventListener('click', openAddAppointmentModal);
  }

  // Export button
  const exportBtn = document.getElementById('export-appointments');
  if (exportBtn) {
    exportBtn.addEventListener('click', exportAppointments);
  }



  // Modal close buttons
  document.querySelectorAll('.close-modal, #cancel-appointment-form, #cancel-status-update').forEach(button => {
    button.addEventListener('click', function() {
      const modal = this.closest('.modal');
      if (modal) {
        modal.style.display = 'none';
      }
    });
  });

  // Save appointment button
  const saveAppointmentBtn = document.getElementById('save-appointment');
  if (saveAppointmentBtn) {
    saveAppointmentBtn.addEventListener('click', saveAppointment);
  }

  // Update status button in detail modal
  const updateStatusBtn = document.getElementById('update-status-btn');
  if (updateStatusBtn) {
    updateStatusBtn.addEventListener('click', function() {
      const appointmentId = this.getAttribute('data-appointment-id');
      openStatusUpdateModal(appointmentId);
    });
  }

  // Confirm status update button
  const confirmStatusUpdateBtn = document.getElementById('confirm-status-update');
  if (confirmStatusUpdateBtn) {
    confirmStatusUpdateBtn.addEventListener('click', function() {
      const appointmentId = this.getAttribute('data-appointment-id');
      updateAppointmentStatus(appointmentId);
    });
  }

  // Add note button
  const addNoteBtn = document.getElementById('add-note-btn');
  if (addNoteBtn) {
    addNoteBtn.addEventListener('click', function() {
      const appointmentId = this.getAttribute('data-appointment-id');
      addAppointmentNote(appointmentId);
    });
  }

  // Edit appointment button in detail modal
  const editAppointmentBtn = document.getElementById('edit-appointment-btn');
  if (editAppointmentBtn) {
    editAppointmentBtn.addEventListener('click', function() {
      const appointmentId = this.getAttribute('data-appointment-id');
      document.getElementById('appointment-detail-modal').style.display = 'none';
      openEditAppointmentModal(appointmentId);
    });
  }
}

// Helper functions for date and time formatting
function formatDateForStorage(date) {
  return date.toISOString().split('T')[0];
}

function formatDateForDisplay(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

function formatTimeForDisplay(timeString) {
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
}

function formatStatus(status) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}



// Function to open appointment detail modal
function openAppointmentDetailModal(appointmentId) {
  // Get appointments from localStorage
  const appointments = JSON.parse(localStorage.getItem('adminAppointments') || '[]');

  // Find appointment
  const appointment = appointments.find(a => a.id === appointmentId);

  if (!appointment) return;

  // Populate modal with appointment details
  document.getElementById('detail-appointment-id').textContent = appointment.id;
  document.getElementById('detail-status-badge').className = `status-badge ${appointment.status}`;
  document.getElementById('detail-status-badge').textContent = formatStatus(appointment.status);

  document.getElementById('detail-customer-name').textContent = appointment.customer.name;
  document.getElementById('detail-customer-email').textContent = appointment.customer.email;
  document.getElementById('detail-customer-phone').textContent = appointment.customer.phone;

  document.getElementById('detail-service').textContent = appointment.service;
  document.getElementById('detail-datetime').textContent = `${formatDateForDisplay(appointment.date)} at ${formatTimeForDisplay(appointment.time)}`;
  document.getElementById('detail-assigned').textContent = appointment.assignedTo || 'Unassigned';

  document.getElementById('detail-description').textContent = appointment.description || 'No description provided';

  // Populate notes
  const notesContainer = document.getElementById('detail-notes');
  notesContainer.innerHTML = '';

  if (appointment.notes && appointment.notes.length > 0) {
    appointment.notes.forEach(note => {
      const noteElement = document.createElement('div');
      noteElement.className = 'note-item';

      const noteDate = new Date(note.timestamp);
      const formattedDate = noteDate.toLocaleString();

      noteElement.innerHTML = `
        <p class="note-text">${note.text}</p>
        <p class="note-meta">By ${note.author} on ${formattedDate}</p>
      `;

      notesContainer.appendChild(noteElement);
    });
  } else {
    notesContainer.innerHTML = '<p>No notes yet</p>';
  }

  // Set appointment ID for buttons
  document.getElementById('update-status-btn').setAttribute('data-appointment-id', appointmentId);
  document.getElementById('edit-appointment-btn').setAttribute('data-appointment-id', appointmentId);
  document.getElementById('add-note-btn').setAttribute('data-appointment-id', appointmentId);

  // Show modal
  document.getElementById('appointment-detail-modal').style.display = 'block';
}

// Function to open add appointment modal
function openAddAppointmentModal() {
  // Reset form
  document.getElementById('appointment-form').reset();
  document.getElementById('appointment-id').value = '';

  // Set default date to today
  const today = new Date();
  document.getElementById('appointment-date').value = formatDateForStorage(today);

  // Set default status to pending
  document.getElementById('appointment-status').value = 'pending';

  // Update modal title
  document.getElementById('appointment-form-title').textContent = 'New Appointment';

  // Show modal
  document.getElementById('appointment-form-modal').style.display = 'block';
}

// Function to open edit appointment modal
function openEditAppointmentModal(appointmentId) {
  // Get appointments from localStorage
  const appointments = JSON.parse(localStorage.getItem('adminAppointments') || '[]');

  // Find appointment
  const appointment = appointments.find(a => a.id === appointmentId);

  if (!appointment) return;

  // Populate form with appointment details
  document.getElementById('appointment-id').value = appointment.id;
  document.getElementById('customer-name').value = appointment.customer.name;
  document.getElementById('customer-email').value = appointment.customer.email;
  document.getElementById('customer-phone').value = appointment.customer.phone;

  document.getElementById('appointment-service').value = appointment.service.toLowerCase();
  document.getElementById('appointment-date').value = appointment.date;
  document.getElementById('appointment-time').value = appointment.time;
  document.getElementById('appointment-assigned').value = appointment.assignedTo || '';
  document.getElementById('appointment-status').value = appointment.status;
  document.getElementById('appointment-description').value = appointment.description || '';

  // Update modal title
  document.getElementById('appointment-form-title').textContent = 'Edit Appointment';

  // Show modal
  document.getElementById('appointment-form-modal').style.display = 'block';
}

// Function to save appointment
function saveAppointment() {
  // Get form data
  const appointmentId = document.getElementById('appointment-id').value;
  const customerName = document.getElementById('customer-name').value;
  const customerEmail = document.getElementById('customer-email').value;
  const customerPhone = document.getElementById('customer-phone').value;
  const service = document.getElementById('appointment-service').value;
  const date = document.getElementById('appointment-date').value;
  const time = document.getElementById('appointment-time').value;
  const assignedTo = document.getElementById('appointment-assigned').value;
  const status = document.getElementById('appointment-status').value;
  const description = document.getElementById('appointment-description').value;

  // Validate required fields
  if (!customerName || !customerEmail || !customerPhone || !service || !date || !time || !status) {
    alert('Please fill in all required fields');
    return;
  }

  // Get appointments from localStorage
  let appointments = JSON.parse(localStorage.getItem('adminAppointments') || '[]');

  if (appointmentId) {
    // Update existing appointment
    const appointmentIndex = appointments.findIndex(a => a.id === appointmentId);

    if (appointmentIndex !== -1) {
      // Preserve notes and created date
      const notes = appointments[appointmentIndex].notes || [];
      const createdAt = appointments[appointmentIndex].createdAt;

      appointments[appointmentIndex] = {
        id: appointmentId,
        customer: {
          name: customerName,
          email: customerEmail,
          phone: customerPhone
        },
        service: service.charAt(0).toUpperCase() + service.slice(1),
        description: description,
        date: date,
        time: time,
        assignedTo: assignedTo,
        status: status,
        notes: notes,
        createdAt: createdAt,
        updatedAt: new Date().getTime()
      };
    }
  } else {
    // Create new appointment
    const newId = 'AP' + Math.floor(Math.random() * 100000);

    appointments.push({
      id: newId,
      customer: {
        name: customerName,
        email: customerEmail,
        phone: customerPhone
      },
      service: service.charAt(0).toUpperCase() + service.slice(1),
      description: description,
      date: date,
      time: time,
      assignedTo: assignedTo,
      status: status,
      notes: [],
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime()
    });
  }

  // Save to localStorage
  localStorage.setItem('adminAppointments', JSON.stringify(appointments));

  // Close modal
  document.getElementById('appointment-form-modal').style.display = 'none';

  // Reload appointments data
  loadAppointmentsData();

  // Show confirmation
  alert(appointmentId ? 'Appointment updated successfully' : 'Appointment created successfully');
}

// Function to delete appointment
function deleteAppointment(appointmentId) {
  // Get appointments from localStorage
  let appointments = JSON.parse(localStorage.getItem('adminAppointments') || '[]');

  // Filter out the appointment to delete
  appointments = appointments.filter(a => a.id !== appointmentId);

  // Save to localStorage
  localStorage.setItem('adminAppointments', JSON.stringify(appointments));

  // Reload appointments data
  loadAppointmentsData();

  // Show confirmation
  alert(`Appointment ${appointmentId} deleted successfully`);
}

// Function to open status update modal
function openStatusUpdateModal(appointmentId) {
  // Get appointments from localStorage
  const appointments = JSON.parse(localStorage.getItem('adminAppointments') || '[]');

  // Find appointment
  const appointment = appointments.find(a => a.id === appointmentId);

  if (!appointment) return;

  // Set current status
  document.getElementById('new-status').value = appointment.status;

  // Clear note
  document.getElementById('status-note').value = '';

  // Set appointment ID for confirm button
  document.getElementById('confirm-status-update').setAttribute('data-appointment-id', appointmentId);

  // Show modal
  document.getElementById('status-update-modal').style.display = 'block';
}

// Function to update appointment status
function updateAppointmentStatus(appointmentId) {
  const newStatus = document.getElementById('new-status').value;
  const statusNote = document.getElementById('status-note').value;
  const notifyCustomer = document.getElementById('notify-customer').checked;

  // Get appointments from localStorage
  let appointments = JSON.parse(localStorage.getItem('adminAppointments') || '[]');

  // Find appointment
  const appointmentIndex = appointments.findIndex(a => a.id === appointmentId);

  if (appointmentIndex !== -1) {
    // Update appointment status
    appointments[appointmentIndex].status = newStatus;
    appointments[appointmentIndex].updatedAt = new Date().getTime();

    // Add note if provided
    if (statusNote.trim()) {
      if (!appointments[appointmentIndex].notes) {
        appointments[appointmentIndex].notes = [];
      }

      appointments[appointmentIndex].notes.push({
        text: `Status updated to ${formatStatus(newStatus)}: ${statusNote}`,
        timestamp: new Date().getTime(),
        author: 'Admin'
      });
    }

    // Save to localStorage
    localStorage.setItem('adminAppointments', JSON.stringify(appointments));

    // Close modal
    document.getElementById('status-update-modal').style.display = 'none';

    // Close detail modal
    document.getElementById('appointment-detail-modal').style.display = 'none';

    // Reload appointments data
    loadAppointmentsData();

    // Show confirmation
    if (notifyCustomer) {
      alert(`Appointment status updated to ${formatStatus(newStatus)}. Customer has been notified.`);
    } else {
      alert(`Appointment status updated to ${formatStatus(newStatus)}.`);
    }
  }
}

// Function to add appointment note
function addAppointmentNote(appointmentId) {
  const noteText = document.getElementById('new-note').value.trim();

  if (!noteText) {
    alert('Please enter a note');
    return;
  }

  // Get appointments from localStorage
  let appointments = JSON.parse(localStorage.getItem('adminAppointments') || '[]');

  // Find appointment
  const appointmentIndex = appointments.findIndex(a => a.id === appointmentId);

  if (appointmentIndex !== -1) {
    // Add note
    if (!appointments[appointmentIndex].notes) {
      appointments[appointmentIndex].notes = [];
    }

    appointments[appointmentIndex].notes.push({
      text: noteText,
      timestamp: new Date().getTime(),
      author: 'Admin'
    });

    // Save to localStorage
    localStorage.setItem('adminAppointments', JSON.stringify(appointments));

    // Clear note input
    document.getElementById('new-note').value = '';

    // Reload appointment details
    openAppointmentDetailModal(appointmentId);
  }
}

// Function to export appointments
function exportAppointments() {
  // Get filtered appointments
  const appointments = filterAppointments(JSON.parse(localStorage.getItem('adminAppointments') || '[]'));

  // Create CSV content
  let csvContent = 'ID,Customer,Email,Phone,Service,Date,Time,Assigned To,Status,Description\n';

  appointments.forEach(appointment => {
    const row = [
      appointment.id,
      appointment.customer.name,
      appointment.customer.email,
      appointment.customer.phone,
      appointment.service,
      appointment.date,
      appointment.time,
      appointment.assignedTo || 'Unassigned',
      appointment.status,
      appointment.description || ''
    ].map(cell => `"${cell}"`).join(',');

    csvContent += row + '\n';
  });

  // Create download link
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'appointments.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
