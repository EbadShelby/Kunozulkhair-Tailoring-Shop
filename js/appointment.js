// appointments.js

document.addEventListener('DOMContentLoaded', function() {
  // Multi-step form functionality
  const appointmentForm = document.getElementById('appointment-form');
  const formSteps = document.querySelectorAll('.form-step');
  const stepIndicators = document.querySelectorAll('.step');
  const nextButtons = document.querySelectorAll('.next-btn');
  const prevButtons = document.querySelectorAll('.prev-btn');
  const submitButton = document.querySelector('.submit-btn');
  
  // Get current active step
  function getCurrentStep() {
    let currentStep = 1;
    formSteps.forEach((step, index) => {
      if (step.classList.contains('active')) {
        currentStep = index + 1;
      }
    });
    return currentStep;
  }
  
  // Navigate to specific step
  function goToStep(stepNumber) {
    formSteps.forEach((step, index) => {
      step.classList.remove('active');
      if (index + 1 === stepNumber) {
        step.classList.add('active');
      }
    });
    
    stepIndicators.forEach((indicator, index) => {
      indicator.classList.remove('active');
      if (index + 1 <= stepNumber) {
        indicator.classList.add('active');
      }
    });
    
    // Scroll to top of form
    appointmentForm.scrollIntoView({ behavior: 'smooth' });
  }
  
  // Next button click event
  nextButtons.forEach(button => {
    button.addEventListener('click', () => {
      const currentStep = getCurrentStep();
      
      // Validate current step before proceeding
      if (validateStep(currentStep)) {
        goToStep(currentStep + 1);
        
        // If moving to confirmation step, populate summary
        if (currentStep + 1 === 5) {
          populateSummary();
        }
      }
    });
  });
  
  // Previous button click event
  prevButtons.forEach(button => {
    button.addEventListener('click', () => {
      const currentStep = getCurrentStep();
      goToStep(currentStep - 1);
    });
  });
  
  // Step validation logic
  function validateStep(stepNumber) {
    switch(stepNumber) {
      case 1:
        // Check if a service is selected
        return document.querySelector('input[name="service"]:checked') !== null;
      case 2:
        // Check if date and time are selected
        return document.getElementById('appointment_date').value !== '' && 
               document.getElementById('appointment_time').value !== '';
      case 3:
        // Check required fields in personal info
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        return name !== '' && email !== '' && phone !== '';
      case 4:
        // No required fields in measurements step
        return true;
      default:
        return true;
    }
  }
  
  // Calendar functionality
  const calendarContainer = document.getElementById('appointment-calendar');
  const timeslotsContainer = document.getElementById('available-timeslots');
  const selectedDateElement = document.querySelector('.selected-date');
  const appointmentDateInput = document.getElementById('appointment_date');
  const appointmentTimeInput = document.getElementById('appointment_time');
  
  // Initialize calendar 
  if (calendarContainer) {
    initCalendar();
  }
  
  function initCalendar() {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    renderCalendar(currentMonth, currentYear);
  }
  
  function renderCalendar(month, year) {
    const today = new Date();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    // Clear previous calendar
    calendarContainer.innerHTML = '';
    
    // Create calendar header
    const calendarHeader = document.createElement('div');
    calendarHeader.className = 'calendar-header';
    
    // Previous month button
    const prevMonthBtn = document.createElement('button');
    prevMonthBtn.innerHTML = '&laquo;';
    prevMonthBtn.className = 'calendar-nav-btn';
    prevMonthBtn.addEventListener('click', () => {
      let newMonth = month - 1;
      let newYear = year;
      if (newMonth < 0) {
        newMonth = 11;
        newYear--;
      }
      renderCalendar(newMonth, newYear);
    });
    
    // Current month and year display
    const monthYearDisplay = document.createElement('div');
    monthYearDisplay.className = 'month-year';
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                        'July', 'August', 'September', 'October', 'November', 'December'];
    monthYearDisplay.textContent = `${monthNames[month]} ${year}`;
    
    // Next month button
    const nextMonthBtn = document.createElement('button');
    nextMonthBtn.innerHTML = '&raquo;';
    nextMonthBtn.className = 'calendar-nav-btn';
    nextMonthBtn.addEventListener('click', () => {
      let newMonth = month + 1;
      let newYear = year;
      if (newMonth > 11) {
        newMonth = 0;
        newYear++;
      }
      renderCalendar(newMonth, newYear);
    });
    
    calendarHeader.appendChild(prevMonthBtn);
    calendarHeader.appendChild(monthYearDisplay);
    calendarHeader.appendChild(nextMonthBtn);
    calendarContainer.appendChild(calendarHeader);
    
    // Create weekday headers
    const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weekdaysRow = document.createElement('div');
    weekdaysRow.className = 'weekdays';
    
    weekdayNames.forEach(day => {
      const dayElement = document.createElement('div');
      dayElement.className = 'weekday';
      dayElement.textContent = day;
      weekdaysRow.appendChild(dayElement);
    });
    
    calendarContainer.appendChild(weekdaysRow);
    
    // Create days grid
    const daysGrid = document.createElement('div');
    daysGrid.className = 'days-grid';
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      const emptyDay = document.createElement('div');
      emptyDay.className = 'day empty';
      daysGrid.appendChild(emptyDay);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = document.createElement('div');
      const currentDate = new Date(year, month, day);
      dayElement.className = 'day';
      dayElement.textContent = day;
      
      // Check if day is in the past
      if (currentDate < today.setHours(0, 0, 0, 0)) {
        dayElement.classList.add('past');
      } else {
        // Check if day is Sunday or Saturday (weekend)
        const dayOfWeek = currentDate.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          dayElement.classList.add('weekend');
        } else {
          dayElement.classList.add('selectable');
          
          // Make day selectable
          dayElement.addEventListener('click', () => {
            // Remove selected class from all days
            document.querySelectorAll('.day').forEach(day => {
              day.classList.remove('selected');
            });
            
            // Add selected class to clicked day
            dayElement.classList.add('selected');
            
            // Format date for display and input
            const formattedDate = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            const displayDate = `${monthNames[month]} ${day}, ${year}`;
            
            // Update displayed selected date
            selectedDateElement.textContent = displayDate;
            
            // Update hidden input
            appointmentDateInput.value = formattedDate;
            
            // Generate time slots for selected date
            generateTimeSlots(currentDate);
          });
        }
      }
      
      daysGrid.appendChild(dayElement);
    }
    
    calendarContainer.appendChild(daysGrid);
  }
  
  function generateTimeSlots(selectedDate) {
    // Clear previous time slots
    timeslotsContainer.innerHTML = '';
    
    // Generate time slots from 9 AM to 5 PM (adjust as needed)
    const startHour = 9;
    const endHour = 17;
    const slotDuration = 60; // minutes
    
    // Mock unavailable slots (in a real app, these would come from the backend)
    const unavailableSlots = [
      '10:00', // 10 AM is booked
      '14:00', // 2 PM is booked
    ];
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += slotDuration) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = formatTimeForDisplay(timeString);
        
        const timeSlot = document.createElement('div');
        timeSlot.className = 'timeslot';
        timeSlot.textContent = displayTime;
        
        // Check if slot is unavailable
        if (unavailableSlots.includes(timeString)) {
          timeSlot.classList.add('unavailable');
        } else {
          timeSlot.addEventListener('click', () => {
            // Remove selected class from all timeslots
            document.querySelectorAll('.timeslot').forEach(slot => {
              slot.classList.remove('selected');
            });
            
            // Add selected class to clicked timeslot
            timeSlot.classList.add('selected');
            
            // Update hidden input
            appointmentTimeInput.value = timeString;
          });
        }
        
        timeslotsContainer.appendChild(timeSlot);
      }
    }
  }
  
  // Format time for display (e.g. 14:00 -> 2:00 PM)
  function formatTimeForDisplay(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  }
  
  // Measurements toggle functionality
  const provideMeasurementsCheckbox = document.getElementById('provide-measurements');
  const measurementsFields = document.getElementById('measurements-fields');
  
  if (provideMeasurementsCheckbox) {
    provideMeasurementsCheckbox.addEventListener('change', () => {
      measurementsFields.style.display = provideMeasurementsCheckbox.checked ? 'block' : 'none';
    });
  }
  
  // Measurement guide modal functionality
  const showMeasurementGuideBtn = document.getElementById('show-measurement-guide');
  const measurementModal = document.getElementById('measurement-modal');
  const closeModalBtn = document.querySelector('.close-modal');
  
  if (showMeasurementGuideBtn) {
    showMeasurementGuideBtn.addEventListener('click', (e) => {
      e.preventDefault();
      measurementModal.style.display = 'block';
    });
  }
  
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      measurementModal.style.display = 'none';
    });
  }
  
  // Close modal if clicked outside
  window.addEventListener('click', (e) => {
    if (e.target === measurementModal) {
      measurementModal.style.display = 'none';
    }
  });
  
  // File upload preview functionality
  const fileInput = document.getElementById('reference_images');
  const filePreview = document.getElementById('file-preview');
  
  if (fileInput) {
    fileInput.addEventListener('change', previewFiles);
  }
  
  function previewFiles() {
    if (!filePreview) return;
    
    // Clear preview
    filePreview.innerHTML = '';
    
    if (fileInput.files.length > 0) {
      // Loop through all selected files
      for (const file of fileInput.files) {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          
          reader.onload = function(e) {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'file-thumbnail';
            
            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = file.name;
            
            const removeBtn = document.createElement('span');
            removeBtn.className = 'remove-file';
            removeBtn.innerHTML = '&times;';
            removeBtn.addEventListener('click', () => {
              // In a real app, you'd need to update the FileList
              // Here we just remove the preview
              thumbnail.remove();
            });
            
            thumbnail.appendChild(img);
            thumbnail.appendChild(removeBtn);
            filePreview.appendChild(thumbnail);
          };
          
          reader.readAsDataURL(file);
        }
      }
    }
  }
  
  // Populate summary in confirmation step
  function populateSummary() {
    const serviceValue = document.querySelector('input[name="service"]:checked').value;
    const serviceName = document.querySelector(`input[value="${serviceValue}"]`).closest('.service-card')?.querySelector('h3')?.textContent || 'Consultation';
    
    const appointmentDate = document.getElementById('appointment_date').value;
    const appointmentTime = document.getElementById('appointment_time').value;
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const description = document.getElementById('garment_description').value;
    
    // Format date and time for display
    const formattedDate = formatDateForDisplay(appointmentDate);
    const formattedTime = formatTimeForDisplay(appointmentTime);
    
    // Update summary elements
    document.getElementById('summary-service').textContent = serviceName;
    document.getElementById('summary-datetime').textContent = `${formattedDate} at ${formattedTime}`;
    document.getElementById('summary-name').textContent = name;
    document.getElementById('summary-email').textContent = email;
    document.getElementById('summary-phone').textContent = phone;
    document.getElementById('summary-description').textContent = description || 'No specific details provided';
  }
  
  // Format date for display (e.g. 2023-05-15 -> May 15, 2023)
  function formatDateForDisplay(dateString) {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
  
  // Form submission
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
  e.preventDefault();

      // In a real app, you would send the form data to the server here
      // For demo purposes, we'll just show the success message
      const formData = new FormData(appointmentForm);
      
      // Hide form and show success message
      appointmentForm.style.display = 'none';
      document.querySelector('.appointment-success').style.display = 'block';
      
      // Populate confirmation details
      document.getElementById('confirmation-email').textContent = formData.get('email');
      document.getElementById('appointment-id').textContent = 'AP' + Math.floor(Math.random() * 100000);
      
      const appointmentDatetime = `${formatDateForDisplay(formData.get('appointment_date'))} at ${formatTimeForDisplay(formData.get('appointment_time'))}`;
      document.getElementById('appointment-datetime').textContent = appointmentDatetime;
      
      const serviceValue = formData.get('service');
      const serviceName = document.querySelector(`input[value="${serviceValue}"]`).closest('.service-card')?.querySelector('h3')?.textContent || 'Consultation';
      document.getElementById('appointment-service').textContent = serviceName;
      
      // Scroll to success message
      document.querySelector('.appointment-success').scrollIntoView({ behavior: 'smooth' });
    });
  }
});