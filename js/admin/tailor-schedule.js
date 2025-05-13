// Tailor Schedule JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Initialize sidebar toggle functionality
  initSidebarToggle();
  
  // Initialize date navigation
  initDateNavigation();
  
  // Load appointments data
  loadAppointments();
  
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

// Current date for the schedule view
let currentDate = new Date();

// Function to initialize date navigation
function initDateNavigation() {
  const prevDateBtn = document.getElementById('prev-date');
  const nextDateBtn = document.getElementById('next-date');
  const todayBtn = document.getElementById('today-btn');
  const currentDateElement = document.getElementById('current-date');
  
  // Update the displayed date
  updateDisplayedDate();
  
  // Previous date button
  if (prevDateBtn) {
    prevDateBtn.addEventListener('click', function() {
      currentDate.setDate(currentDate.getDate() - 1);
      updateDisplayedDate();
      loadDailyAppointments();
    });
  }
  
  // Next date button
  if (nextDateBtn) {
    nextDateBtn.addEventListener('click', function() {
      currentDate.setDate(currentDate.getDate() + 1);
      updateDisplayedDate();
      loadDailyAppointments();
    });
  }
  
  // Today button
  if (todayBtn) {
    todayBtn.addEventListener('click', function() {
      currentDate = new Date();
      updateDisplayedDate();
      loadDailyAppointments();
    });
  }
}

// Function to update the displayed date
function updateDisplayedDate() {
  const currentDateElement = document.getElementById('current-date');
  if (currentDateElement) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDateElement.textContent = currentDate.toLocaleDateString('en-US', options);
  }
}

// Global variable to store appointments data
let appointments = [];

// Function to load appointments data
function loadAppointments() {
  // In a real app, this would be fetched from an API
  appointments = getSampleAppointments();
  
  // Update stats
  updateAppointmentStats();
  
  // Load daily appointments
  loadDailyAppointments();
  
  // Render upcoming appointments
  renderUpcomingAppointments();
}

// Function to update appointment statistics
function updateAppointmentStats() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + (6 - today.getDay()));
  endOfWeek.setHours(23, 59, 59, 999);
  
  const todayAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.date);
    appointmentDate.setHours(0, 0, 0, 0);
    return appointmentDate.getTime() === today.getTime();
  }).length;
  
  const weekAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.date);
    return appointmentDate >= today && appointmentDate <= endOfWeek;
  }).length;
  
  const fittingAppointments = appointments.filter(appointment => 
    appointment.type === 'fitting'
  ).length;
  
  const consultationAppointments = appointments.filter(appointment => 
    appointment.type === 'consultation'
  ).length;
  
  document.getElementById('today-appointments').textContent = todayAppointments;
  document.getElementById('week-appointments').textContent = weekAppointments;
  document.getElementById('fittings-count').textContent = fittingAppointments;
  document.getElementById('consultations-count').textContent = consultationAppointments;
}

// Function to load daily appointments
function loadDailyAppointments() {
  const appointmentsContainer = document.getElementById('appointments-container');
  const appointmentTypeFilter = document.getElementById('appointment-type').value;
  
  if (!appointmentsContainer) return;
  
  // Clear existing appointments
  appointmentsContainer.innerHTML = '';
  
  // Filter appointments for the current date
  const currentDateStr = formatDate(currentDate);
  let filteredAppointments = appointments.filter(appointment => 
    appointment.date === currentDateStr
  );
  
  // Apply type filter if not 'all'
  if (appointmentTypeFilter !== 'all') {
    filteredAppointments = filteredAppointments.filter(appointment => 
      appointment.type === appointmentTypeFilter
    );
  }
  
  // Render appointments
  filteredAppointments.forEach(appointment => {
    const startTime = parseTime(appointment.startTime);
    const endTime = parseTime(appointment.endTime);
    
    // Calculate position and height
    const startMinutes = startTime.hours * 60 + startTime.minutes;
    const endMinutes = endTime.hours * 60 + endTime.minutes;
    const duration = endMinutes - startMinutes;
    
    const top = (startMinutes - 8 * 60) / 60 * 60; // 8:00 AM is the start time (0px)
    const height = duration / 60 * 60; // 60px per hour
    
    const appointmentElement = document.createElement('div');
    appointmentElement.className = `appointment ${appointment.type}`;
    appointmentElement.style.top = `${top}px`;
    appointmentElement.style.height = `${height}px`;
    
    appointmentElement.innerHTML = `
      <div class="appointment-time">${appointment.startTime} - ${appointment.endTime}</div>
      <div class="appointment-title">${appointment.title}</div>
      <div class="appointment-customer">${appointment.customer}</div>
    `;
    
    appointmentElement.addEventListener('click', () => {
      openAppointmentDetailModal(appointment.id);
    });
    
    appointmentsContainer.appendChild(appointmentElement);
  });
}

// Function to render upcoming appointments
function renderUpcomingAppointments() {
  const upcomingAppointmentsList = document.getElementById('upcoming-appointments-list');
  
  if (!upcomingAppointmentsList) return;
  
  // Clear existing appointments
  upcomingAppointmentsList.innerHTML = '';
  
  // Get today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Get date 7 days from now
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  nextWeek.setHours(23, 59, 59, 999);
  
  // Filter upcoming appointments (next 7 days)
  const upcomingAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.date);
    return appointmentDate >= today && appointmentDate <= nextWeek;
  });
  
  // Sort by date and time
  upcomingAppointments.sort((a, b) => {
    const dateA = new Date(a.date + 'T' + a.startTime);
    const dateB = new Date(b.date + 'T' + b.startTime);
    return dateA - dateB;
  });
  
  // Limit to 6 appointments
  const limitedAppointments = upcomingAppointments.slice(0, 6);
  
  if (limitedAppointments.length === 0) {
    upcomingAppointmentsList.innerHTML = `
      <div class="empty-state">
        <p>No upcoming appointments for the next 7 days.</p>
      </div>
    `;
    return;
  }
  
  // Render appointment cards
  limitedAppointments.forEach(appointment => {
    const appointmentDate = new Date(appointment.date);
    const formattedDate = appointmentDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
    
    const appointmentCard = document.createElement('div');
    appointmentCard.className = `appointment-card ${appointment.type}`;
    
    appointmentCard.innerHTML = `
      <div class="appointment-card-header">
        <div class="appointment-card-title">${appointment.title}</div>
        <div class="appointment-card-type ${appointment.type}">${capitalizeFirstLetter(appointment.type)}</div>
      </div>
      <div class="appointment-card-details">
        <div class="appointment-card-detail">
          <i class="fas fa-user"></i>
          <span>${appointment.customer}</span>
        </div>
        <div class="appointment-card-detail">
          <i class="fas fa-calendar-alt"></i>
          <span>${formattedDate}</span>
        </div>
        <div class="appointment-card-detail">
          <i class="fas fa-clock"></i>
          <span>${appointment.startTime} - ${appointment.endTime}</span>
        </div>
      </div>
      <div class="appointment-card-actions">
        <button class="appointment-card-btn view-appointment" data-id="${appointment.id}">
          View Details
        </button>
      </div>
    `;
    
    upcomingAppointmentsList.appendChild(appointmentCard);
  });
  
  // Add event listeners to view buttons
  document.querySelectorAll('.view-appointment').forEach(button => {
    button.addEventListener('click', function() {
      const appointmentId = this.getAttribute('data-id');
      openAppointmentDetailModal(appointmentId);
    });
  });
}

// Function to set up event listeners
function setupEventListeners() {
  // Appointment type filter
  const appointmentTypeFilter = document.getElementById('appointment-type');
  if (appointmentTypeFilter) {
    appointmentTypeFilter.addEventListener('change', loadDailyAppointments);
  }
  
  // Refresh button
  const refreshBtn = document.querySelector('.refresh-btn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', function() {
      loadAppointments();
    });
  }
  
  // Close modal
  const closeModalBtn = document.querySelector('.close-modal');
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }
  
  // Close modal when clicking outside
  window.addEventListener('click', function(event) {
    const modal = document.getElementById('appointment-detail-modal');
    if (event.target === modal) {
      closeModal();
    }
  });
}

// Function to open appointment detail modal
function openAppointmentDetailModal(appointmentId) {
  const appointment = appointments.find(a => a.id === appointmentId);
  if (!appointment) return;
  
  const modal = document.getElementById('appointment-detail-modal');
  const modalTitle = document.getElementById('modal-appointment-title');
  const modalBody = document.querySelector('.appointment-details-grid');
  
  modalTitle.textContent = appointment.title;
  
  // Format date
  const appointmentDate = new Date(appointment.date);
  const formattedDate = appointmentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  modalBody.innerHTML = `
    <div class="appointment-detail-section">
      <h3>Appointment Information</h3>
      <div class="detail-item">
        <div class="detail-label">Type</div>
        <div class="detail-value">
          <span class="appointment-card-type ${appointment.type}">${capitalizeFirstLetter(appointment.type)}</span>
        </div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Date</div>
        <div class="detail-value">${formattedDate}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Time</div>
        <div class="detail-value">${appointment.startTime} - ${appointment.endTime}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Duration</div>
        <div class="detail-value">${appointment.duration} minutes</div>
      </div>
    </div>
    
    <div class="appointment-detail-section">
      <h3>Customer Information</h3>
      <div class="detail-item">
        <div class="detail-label">Name</div>
        <div class="detail-value">${appointment.customer}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Phone</div>
        <div class="detail-value">${appointment.phone}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Email</div>
        <div class="detail-value">${appointment.email}</div>
      </div>
    </div>
    
    <div class="appointment-detail-section appointment-notes">
      <h3>Notes</h3>
      <div class="detail-item">
        <div class="detail-value">${appointment.notes || 'No notes available.'}</div>
      </div>
    </div>
    
    <div class="appointment-actions">
      <button class="appointment-card-btn" onclick="closeModal()">
        Close
      </button>
      <button class="appointment-card-btn primary" onclick="markAppointmentComplete('${appointment.id}')">
        Mark as Completed
      </button>
    </div>
  `;
  
  modal.style.display = 'block';
}

// Function to close modal
function closeModal() {
  const modal = document.getElementById('appointment-detail-modal');
  modal.style.display = 'none';
}

// Function to mark appointment as complete
function markAppointmentComplete(appointmentId) {
  const appointmentIndex = appointments.findIndex(a => a.id === appointmentId);
  if (appointmentIndex === -1) return;
  
  appointments[appointmentIndex].status = 'completed';
  
  // In a real app, this would send an API request to update the appointment
  
  // Close modal
  closeModal();
  
  // Refresh appointments
  loadDailyAppointments();
  renderUpcomingAppointments();
}

// Helper function to format date as YYYY-MM-DD
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Helper function to parse time string (HH:MM AM/PM)
function parseTime(timeString) {
  const [time, period] = timeString.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  
  if (period === 'PM' && hours < 12) {
    hours += 12;
  } else if (period === 'AM' && hours === 12) {
    hours = 0;
  }
  
  return { hours, minutes };
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to get sample appointments data
function getSampleAppointments() {
  return [
    {
      id: 'A1',
      title: 'Wedding Dress Fitting',
      type: 'fitting',
      customer: 'Elena Garcia',
      date: '2023-07-19',
      startTime: '9:00 AM',
      endTime: '10:00 AM',
      duration: 60,
      status: 'scheduled',
      phone: '(555) 123-4567',
      email: 'elena.garcia@example.com',
      notes: 'Final fitting for wedding dress. Bring the shoes and accessories for the complete look.'
    },
    {
      id: 'A2',
      title: 'Suit Measurement',
      type: 'measurement',
      customer: 'Carlos Mendoza',
      date: '2023-07-19',
      startTime: '11:30 AM',
      endTime: '12:30 PM',
      duration: 60,
      status: 'scheduled',
      phone: '(555) 234-5678',
      email: 'carlos.mendoza@example.com',
      notes: 'Initial measurements for business suit. Customer prefers dark navy color.'
    },
    {
      id: 'A3',
      title: 'Dress Alteration Consultation',
      type: 'consultation',
      customer: 'Sophia Lee',
      date: '2023-07-19',
      startTime: '2:00 PM',
      endTime: '3:00 PM',
      duration: 60,
      status: 'scheduled',
      phone: '(555) 345-6789',
      email: 'sophia.lee@example.com',
      notes: 'Customer wants to discuss options for altering a vintage dress.'
    },
    {
      id: 'A4',
      title: 'Custom Shirt Consultation',
      type: 'consultation',
      customer: 'David Kim',
      date: '2023-07-19',
      startTime: '4:30 PM',
      endTime: '5:30 PM',
      duration: 60,
      status: 'scheduled',
      phone: '(555) 456-7890',
      email: 'david.kim@example.com',
      notes: 'Customer interested in custom dress shirts for work. Bring fabric samples.'
    },
    {
      id: 'A5',
      title: 'Barong Tagalog Pickup',
      type: 'pickup',
      customer: 'Isabella Martinez',
      date: '2023-07-19',
      startTime: '5:45 PM',
      endTime: '6:15 PM',
      duration: 30,
      status: 'scheduled',
      phone: '(555) 567-8901',
      email: 'isabella.martinez@example.com',
      notes: 'Final pickup for embroidered Barong Tagalog. Ensure all packaging is complete.'
    },
    {
      id: 'A6',
      title: 'Evening Gown Fitting',
      type: 'fitting',
      customer: 'Ana Reyes',
      date: '2023-07-20',
      startTime: '10:00 AM',
      endTime: '11:00 AM',
      duration: 60,
      status: 'scheduled',
      phone: '(555) 678-9012',
      email: 'ana.reyes@example.com',
      notes: 'Second fitting for evening gown. Need to check hemline and fit around shoulders.'
    },
    {
      id: 'A7',
      title: 'Barong Tagalog Consultation',
      type: 'consultation',
      customer: 'Juan Dela Cruz',
      date: '2023-07-20',
      startTime: '1:00 PM',
      endTime: '2:00 PM',
      duration: 60,
      status: 'scheduled',
      phone: '(555) 789-0123',
      email: 'juan.delacruz@example.com',
      notes: 'Customer wants to discuss custom embroidery options for Barong Tagalog.'
    },
    {
      id: 'A8',
      title: 'Suit Fitting',
      type: 'fitting',
      customer: 'Mike Johnson',
      date: '2023-07-21',
      startTime: '11:00 AM',
      endTime: '12:00 PM',
      duration: 60,
      status: 'scheduled',
      phone: '(555) 890-1234',
      email: 'mike.johnson@example.com',
      notes: 'First fitting for business suit. Check sleeve length and trouser hem.'
    },
    {
      id: 'A9',
      title: 'Dress Measurement',
      type: 'measurement',
      customer: 'Sarah Lee',
      date: '2023-07-21',
      startTime: '3:00 PM',
      endTime: '4:00 PM',
      duration: 60,
      status: 'scheduled',
      phone: '(555) 901-2345',
      email: 'sarah.lee@example.com',
      notes: 'Initial measurements for casual dress. Customer prefers natural fabrics.'
    },
    {
      id: 'A10',
      title: 'Wedding Suit Consultation',
      type: 'consultation',
      customer: 'Robert Chen',
      date: '2023-07-22',
      startTime: '10:30 AM',
      endTime: '11:30 AM',
      duration: 60,
      status: 'scheduled',
      phone: '(555) 012-3456',
      email: 'robert.chen@example.com',
      notes: 'Consultation for wedding suit. Bring fabric samples and style options.'
    },
    {
      id: 'A11',
      title: 'Formal Dress Fitting',
      type: 'fitting',
      customer: 'Maria Rodriguez',
      date: '2023-07-22',
      startTime: '2:00 PM',
      endTime: '3:00 PM',
      duration: 60,
      status: 'scheduled',
      phone: '(555) 123-4567',
      email: 'maria.rodriguez@example.com',
      notes: 'Final fitting for formal dress. Check beading and hemline.'
    },
    {
      id: 'A12',
      title: 'Custom Shirt Pickup',
      type: 'pickup',
      customer: 'James Wilson',
      date: '2023-07-23',
      startTime: '11:00 AM',
      endTime: '11:30 AM',
      duration: 30,
      status: 'scheduled',
      phone: '(555) 234-5678',
      email: 'james.wilson@example.com',
      notes: 'Pickup for custom dress shirts. Ensure all packaging is complete.'
    }
  ];
}
