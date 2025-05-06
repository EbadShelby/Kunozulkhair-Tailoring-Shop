// Tailor Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Initialize sidebar toggle functionality
  initSidebarToggle();
  
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

// Function to set up event listeners
function setupEventListeners() {
  // Add Note button
  const addNoteBtn = document.querySelector('.add-note-btn');
  if (addNoteBtn) {
    addNoteBtn.addEventListener('click', openAddNoteModal);
  }
  
  // Note Modal
  const addNoteModal = document.getElementById('add-note-modal');
  const closeModalButtons = document.querySelectorAll('.close-modal');
  const cancelNoteBtn = document.getElementById('cancel-note');
  const noteForm = document.getElementById('note-form');
  const isReminderCheckbox = document.getElementById('is-reminder');
  const reminderDateGroup = document.querySelector('.reminder-date-group');
  
  if (closeModalButtons) {
    closeModalButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Close the parent modal
        this.closest('.modal').style.display = 'none';
      });
    });
  }
  
  if (cancelNoteBtn) {
    cancelNoteBtn.addEventListener('click', function() {
      addNoteModal.style.display = 'none';
    });
  }
  
  if (isReminderCheckbox && reminderDateGroup) {
    isReminderCheckbox.addEventListener('change', function() {
      reminderDateGroup.style.display = this.checked ? 'block' : 'none';
    });
  }
  
  if (noteForm) {
    noteForm.addEventListener('submit', function(e) {
      e.preventDefault();
      saveNote();
    });
  }
  
  // Close modals when clicking outside
  window.addEventListener('click', function(e) {
    if (e.target === addNoteModal) {
      addNoteModal.style.display = 'none';
    }
  });
  
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

// Function to open Add Note modal
function openAddNoteModal() {
  const addNoteModal = document.getElementById('add-note-modal');
  const noteForm = document.getElementById('note-form');
  const reminderDateGroup = document.querySelector('.reminder-date-group');
  
  if (addNoteModal && noteForm) {
    // Reset form
    noteForm.reset();
    
    // Hide reminder date field
    if (reminderDateGroup) {
      reminderDateGroup.style.display = 'none';
    }
    
    // Set default date for reminder
    const reminderDateInput = document.getElementById('reminder-date');
    if (reminderDateInput) {
      const now = new Date();
      const localDatetime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16);
      
      reminderDateInput.value = localDatetime;
    }
    
    // Show modal
    addNoteModal.style.display = 'block';
  }
}

// Function to save note
function saveNote() {
  // Get form data
  const noteTitle = document.getElementById('note-title').value;
  const noteContent = document.getElementById('note-content').value;
  const isReminder = document.getElementById('is-reminder').checked;
  const reminderDate = document.getElementById('reminder-date').value;
  
  // Create note object
  const note = {
    id: Date.now(), // Use timestamp as ID
    title: noteTitle,
    content: noteContent,
    isReminder: isReminder,
    date: isReminder ? reminderDate : new Date().toISOString(),
    createdAt: new Date().toISOString()
  };
  
  // Get existing notes from localStorage
  let notes = JSON.parse(localStorage.getItem('tailorNotes') || '[]');
  
  // Add new note
  notes.unshift(note);
  
  // Save to localStorage
  localStorage.setItem('tailorNotes', JSON.stringify(notes));
  
  // Close modal
  document.getElementById('add-note-modal').style.display = 'none';
  
  // Add note to UI
  addNoteToUI(note);
}

// Function to add note to UI
function addNoteToUI(note) {
  const notesList = document.querySelector('.notes-list');
  
  if (notesList) {
    // Create note element
    const noteElement = document.createElement('div');
    noteElement.className = `note-item${note.isReminder ? ' reminder' : ''}`;
    
    // Format date for display
    let displayDate;
    if (note.isReminder) {
      const reminderDate = new Date(note.date);
      displayDate = `${reminderDate.toLocaleDateString()} - ${reminderDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      displayDate = new Date(note.date).toLocaleDateString();
    }
    
    // Set note content
    noteElement.innerHTML = `
      <div class="note-header">
        <div class="note-title">${note.title}</div>
        <div class="note-date">${displayDate}</div>
      </div>
      <div class="note-content">
        ${note.content}
      </div>
    `;
    
    // Add to beginning of list
    notesList.insertBefore(noteElement, notesList.firstChild);
  }
}

// Function to load notes from localStorage
function loadNotes() {
  const notesList = document.querySelector('.notes-list');
  
  if (notesList) {
    // Get notes from localStorage
    const notes = JSON.parse(localStorage.getItem('tailorNotes') || '[]');
    
    // Clear list
    notesList.innerHTML = '';
    
    // Add notes to UI
    notes.forEach(note => {
      addNoteToUI(note);
    });
  }
}

// Load notes when page loads
document.addEventListener('DOMContentLoaded', loadNotes);
