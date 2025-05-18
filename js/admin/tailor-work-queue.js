// Tailor Work Queue JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Initialize sidebar toggle functionality
  initSidebarToggle();

  // Load tasks data
  loadTasks();

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

// Global variable to store tasks data
let tasks = [];

// Function to load tasks data
function loadTasks() {
  // In a real app, this would be fetched from an API
  tasks = getSampleTasks();

  // Update stats
  updateTaskStats();

  // Render tasks
  renderTasks(tasks);
}

// Function to update task statistics
function updateTaskStats() {
  const totalTasks = tasks.length;
  const urgentTasks = tasks.filter(task => task.priority === 'urgent').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const completedToday = tasks.filter(task => {
    return task.status === 'completed' &&
           new Date(task.completedDate).toDateString() === new Date().toDateString();
  }).length;

  document.getElementById('total-tasks').textContent = totalTasks;
  document.getElementById('urgent-tasks').textContent = urgentTasks;
  document.getElementById('in-progress-tasks').textContent = inProgressTasks;
  document.getElementById('completed-tasks').textContent = completedToday;
}

// Function to render tasks
function renderTasks(tasksList) {
  const taskListContainer = document.getElementById('work-queue-tasks');

  if (!taskListContainer) return;

  // Clear existing tasks
  taskListContainer.innerHTML = '';

  if (tasksList.length === 0) {
    taskListContainer.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-tasks"></i>
        <p>No tasks found in your work queue.</p>
      </div>
    `;
    return;
  }

  // Add task items
  tasksList.forEach(task => {
    const taskItem = document.createElement('div');
    taskItem.className = `task-item ${task.priority}`;
    if (task.status === 'completed') {
      taskItem.classList.add('completed');
    }

    // Format due date
    const dueDate = new Date(task.dueDate);
    const formattedDueDate = dueDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    // Calculate days remaining
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const daysRemaining = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

    let daysRemainingText = '';
    if (daysRemaining < 0) {
      daysRemainingText = `<span style="color: var(--danger-color);">${Math.abs(daysRemaining)} days overdue</span>`;
    } else if (daysRemaining === 0) {
      daysRemainingText = '<span style="color: var(--warning-color);">Due today</span>';
    } else if (daysRemaining === 1) {
      daysRemainingText = '<span style="color: var(--warning-color);">Due tomorrow</span>';
    } else {
      daysRemainingText = `${daysRemaining} days remaining`;
    }

    // Determine progress class
    let progressClass = 'low';
    if (task.progress > 70) {
      progressClass = 'high';
    } else if (task.progress > 30) {
      progressClass = 'medium';
    }

    // Format status for display
    const statusMap = {
      'not-started': 'Not Started',
      'in-progress': 'In Progress',
      'on-hold': 'On Hold',
      'completed': 'Completed'
    };

    taskItem.innerHTML = `
      <div class="task-content">
        <div class="task-main-info">
          <div class="task-header">
            <h3 class="task-title">${task.title}</h3>
            <span class="task-priority ${task.priority}">${task.priority}</span>
          </div>
          <div class="task-details">
            <div class="task-detail">
              <i class="fas fa-user"></i>
              <span>${task.customer}</span>
            </div>
            <div class="task-detail">
              <i class="fas fa-calendar-alt"></i>
              <span>${formattedDueDate} (${daysRemainingText})</span>
            </div>
            <div class="task-detail">
              <i class="fas fa-tag"></i>
              <span>${task.type}</span>
            </div>
            <div class="task-detail">
              <span class="status-badge ${task.status}">${statusMap[task.status]}</span>
            </div>
          </div>
          <div class="task-progress-container">
            <div class="progress-bar">
              <div class="progress-fill ${progressClass}" style="width: ${task.progress}%;"></div>
            </div>
            <span class="progress-text">${task.progress}%</span>
          </div>
        </div>
        <div class="task-actions-column">
          <div class="task-actions">
            <button class="task-action-btn view-task" data-id="${task.id}">
              <i class="fas fa-eye"></i>
              <span>View Details</span>
            </button>
            <button class="task-action-btn update-progress" data-id="${task.id}">
              <i class="fas fa-edit"></i>
              <span>Update Progress</span>
            </button>
            ${task.status !== 'completed' ? `
              <button class="task-action-btn primary mark-complete" data-id="${task.id}">
                <i class="fas fa-check"></i>
                <span>Mark Complete</span>
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    `;

    taskListContainer.appendChild(taskItem);
  });

  // Add event listeners to task action buttons
  document.querySelectorAll('.view-task').forEach(button => {
    button.addEventListener('click', function() {
      const taskId = this.getAttribute('data-id');
      openTaskDetailModal(taskId);
    });
  });

  document.querySelectorAll('.update-progress').forEach(button => {
    button.addEventListener('click', function() {
      const taskId = this.getAttribute('data-id');
      openUpdateProgressModal(taskId);
    });
  });

  document.querySelectorAll('.mark-complete').forEach(button => {
    button.addEventListener('click', function() {
      const taskId = this.getAttribute('data-id');
      markTaskComplete(taskId);
    });
  });
}

// Function to set up event listeners
function setupEventListeners() {
  // Status filter
  const statusFilter = document.getElementById('status-filter');
  if (statusFilter) {
    statusFilter.addEventListener('change', filterTasks);
  }

  // Priority filter
  const priorityFilter = document.getElementById('priority-filter');
  if (priorityFilter) {
    priorityFilter.addEventListener('change', filterTasks);
  }

  // Sort by
  const sortBy = document.getElementById('sort-by');
  if (sortBy) {
    sortBy.addEventListener('change', filterTasks);
  }

  // Search
  const searchInput = document.getElementById('task-search');
  const searchBtn = document.getElementById('search-btn');

  if (searchInput && searchBtn) {
    searchBtn.addEventListener('click', filterTasks);
    searchInput.addEventListener('keyup', function(event) {
      if (event.key === 'Enter') {
        filterTasks();
      }
    });
  }

  // Close modal
  const closeModalBtn = document.querySelector('.close-modal');
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  // Close modal when clicking outside
  window.addEventListener('click', function(event) {
    const modal = document.getElementById('task-detail-modal');
    if (event.target === modal) {
      closeModal();
    }
  });
}

// Function to filter tasks
function filterTasks() {
  const statusValue = document.getElementById('status-filter').value;
  const priorityValue = document.getElementById('priority-filter').value;
  const sortValue = document.getElementById('sort-by').value;
  const searchValue = document.getElementById('task-search').value.toLowerCase();

  let filteredTasks = tasks.filter(task => {
    // Status filter
    if (statusValue !== 'all' && task.status !== statusValue) {
      return false;
    }

    // Priority filter
    if (priorityValue !== 'all' && task.priority !== priorityValue) {
      return false;
    }

    // Search filter
    if (searchValue) {
      return (
        task.title.toLowerCase().includes(searchValue) ||
        task.customer.toLowerCase().includes(searchValue) ||
        task.type.toLowerCase().includes(searchValue)
      );
    }

    return true;
  });

  // Sort tasks
  filteredTasks = sortTasks(filteredTasks, sortValue);

  // Render filtered tasks
  renderTasks(filteredTasks);
}

// Function to sort tasks
function sortTasks(tasksList, sortValue) {
  switch (sortValue) {
    case 'due-date-asc':
      return tasksList.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    case 'due-date-desc':
      return tasksList.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
    case 'priority-desc':
      return tasksList.sort((a, b) => getPriorityValue(b.priority) - getPriorityValue(a.priority));
    case 'priority-asc':
      return tasksList.sort((a, b) => getPriorityValue(a.priority) - getPriorityValue(b.priority));
    case 'progress-asc':
      return tasksList.sort((a, b) => a.progress - b.progress);
    case 'progress-desc':
      return tasksList.sort((a, b) => b.progress - a.progress);
    default:
      return tasksList;
  }
}

// Helper function to get priority value for sorting
function getPriorityValue(priority) {
  switch (priority) {
    case 'urgent': return 4;
    case 'high': return 3;
    case 'medium': return 2;
    case 'low': return 1;
    default: return 0;
  }
}

// Function to open task detail modal
function openTaskDetailModal(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (!task) return;

  const modal = document.getElementById('task-detail-modal');
  const modalTitle = document.getElementById('modal-task-title');
  const modalBody = document.querySelector('.task-details-grid');

  modalTitle.textContent = task.title;

  // Format dates
  const dueDate = new Date(task.dueDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const assignedDate = new Date(task.assignedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Format status for display
  const statusMap = {
    'not-started': 'Not Started',
    'in-progress': 'In Progress',
    'on-hold': 'On Hold',
    'completed': 'Completed'
  };

  modalBody.innerHTML = `
    <div class="task-detail-section">
      <h3>Task Information</h3>
      <div class="detail-item">
        <div class="detail-label">Customer</div>
        <div class="detail-value">${task.customer}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Type</div>
        <div class="detail-value">${task.type}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Priority</div>
        <div class="detail-value">
          <span class="task-priority ${task.priority}">${task.priority}</span>
        </div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Status</div>
        <div class="detail-value">
          <span class="status-badge ${task.status}">${statusMap[task.status]}</span>
        </div>
      </div>
    </div>

    <div class="task-detail-section">
      <h3>Timeline</h3>
      <div class="detail-item">
        <div class="detail-label">Assigned Date</div>
        <div class="detail-value">${assignedDate}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Due Date</div>
        <div class="detail-value">${dueDate}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Progress</div>
        <div class="detail-value">
          <div class="task-progress-container">
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${task.progress}%;"></div>
            </div>
            <span class="progress-text">${task.progress}%</span>
          </div>
        </div>
      </div>
    </div>

    <div class="task-detail-section task-description">
      <h3>Description</h3>
      <div class="detail-item">
        <div class="detail-value">${task.description}</div>
      </div>
    </div>

    <div class="task-actions-section">
      <button class="task-action-btn" onclick="closeModal()">
        <i class="fas fa-times"></i>
        <span>Close</span>
      </button>
      <button class="task-action-btn primary" onclick="openUpdateProgressModal('${task.id}')">
        <i class="fas fa-edit"></i>
        <span>Update Progress</span>
      </button>
      ${task.status !== 'completed' ? `
        <button class="task-action-btn success" onclick="markTaskComplete('${task.id}')">
          <i class="fas fa-check"></i>
          <span>Mark Complete</span>
        </button>
      ` : ''}
    </div>
  `;

  modal.style.display = 'block';
}

// Function to close modal
function closeModal() {
  const modal = document.getElementById('task-detail-modal');
  modal.style.display = 'none';
}

// Function to open update progress modal
function openUpdateProgressModal(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (!task) return;

  // In a real app, this would open a modal with a form to update progress
  const newProgress = prompt(`Update progress for "${task.title}" (Current: ${task.progress}%)`, task.progress);

  if (newProgress !== null) {
    const progress = parseInt(newProgress);
    if (!isNaN(progress) && progress >= 0 && progress <= 100) {
      updateTaskProgress(taskId, progress);
    } else {
      alert('Please enter a valid progress value between 0 and 100.');
    }
  }
}

// Function to update task progress
function updateTaskProgress(taskId, progress) {
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  if (taskIndex === -1) return;

  tasks[taskIndex].progress = progress;

  // If progress is 100%, ask if the task should be marked as complete
  if (progress === 100 && tasks[taskIndex].status !== 'completed') {
    if (confirm('Progress is 100%. Would you like to mark this task as complete?')) {
      markTaskComplete(taskId);
      return;
    }
  }

  // Update UI
  renderTasks(getFilteredTasks());

  // Close modal if open
  closeModal();
}

// Function to mark task as complete
function markTaskComplete(taskId) {
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  if (taskIndex === -1) return;

  tasks[taskIndex].status = 'completed';
  tasks[taskIndex].progress = 100;
  tasks[taskIndex].completedDate = new Date().toISOString();

  // Update stats
  updateTaskStats();

  // Update UI
  renderTasks(getFilteredTasks());

  // Close modal if open
  closeModal();
}

// Function to get filtered tasks based on current filter settings
function getFilteredTasks() {
  const statusValue = document.getElementById('status-filter').value;
  const priorityValue = document.getElementById('priority-filter').value;
  const sortValue = document.getElementById('sort-by').value;
  const searchValue = document.getElementById('task-search').value.toLowerCase();

  let filteredTasks = tasks.filter(task => {
    // Status filter
    if (statusValue !== 'all' && task.status !== statusValue) {
      return false;
    }

    // Priority filter
    if (priorityValue !== 'all' && task.priority !== priorityValue) {
      return false;
    }

    // Search filter
    if (searchValue) {
      return (
        task.title.toLowerCase().includes(searchValue) ||
        task.customer.toLowerCase().includes(searchValue) ||
        task.type.toLowerCase().includes(searchValue)
      );
    }

    return true;
  });

  // Sort tasks
  return sortTasks(filteredTasks, sortValue);
}

// Function to get sample tasks data
function getSampleTasks() {
  return [
    {
      id: 'T1',
      title: 'Formal Dress - Final Touches',
      customer: 'Maria Santos',
      type: 'Formal Dress',
      priority: 'urgent',
      status: 'in-progress',
      progress: 80,
      assignedDate: '2023-07-15',
      dueDate: '2023-07-20',
      completedDate: null,
      description: 'Complete the final touches on Maria\'s formal dress. Add pearl embellishments to the bodice and hem the skirt to the final length after the last fitting. Ensure all seams are properly finished and the dress is pressed before delivery.'
    },
    {
      id: 'T2',
      title: 'Formal Dress Alterations',
      customer: 'Carlos Mendoza',
      type: 'Formal Dress',
      priority: 'high',
      status: 'not-started',
      progress: 0,
      assignedDate: '2023-07-16',
      dueDate: '2023-07-25',
      completedDate: null,
      description: 'Alter Carlos\'s formal dress for his special event. Take in the waist by 1 inch, adjust the length, and ensure proper fit. Ensure the dress is properly pressed before delivery.'
    },
    {
      id: 'T3',
      title: 'Evening Dress Repair',
      customer: 'Sophia Lee',
      type: 'Evening Dress',
      priority: 'medium',
      status: 'in-progress',
      progress: 50,
      assignedDate: '2023-07-14',
      dueDate: '2023-07-22',
      completedDate: null,
      description: 'Repair the torn seam on Sophia\'s evening dress and replace the broken zipper. Check all other seams for potential issues and reinforce as needed. Steam the dress before delivery.'
    },
    {
      id: 'T4',
      title: 'Casual Dress - Initial Fitting',
      customer: 'James Wilson',
      type: 'Casual Dress',
      priority: 'low',
      status: 'completed',
      progress: 100,
      assignedDate: '2023-07-10',
      dueDate: '2023-07-17',
      completedDate: '2023-07-16',
      description: 'Create a custom casual dress for James based on his measurements. Use the blue cotton fabric selected. Include the requested design elements and ensure proper fit.'
    },
    {
      id: 'T5',
      title: 'Bridesmaid Dresses - Group Order',
      customer: 'Elena Garcia',
      type: 'Bridesmaid Dresses',
      priority: 'high',
      status: 'in-progress',
      progress: 30,
      assignedDate: '2023-07-12',
      dueDate: '2023-08-05',
      completedDate: null,
      description: 'Complete alterations for 4 bridesmaid dresses for Elena\'s wedding party. Each dress needs to be hemmed and taken in at the waist according to individual measurements. All dresses should be identical in length when worn with the specified shoes.'
    },
    {
      id: 'T6',
      title: 'Traditional Outfit Customization',
      customer: 'Ahmed Hassan',
      type: 'Traditional Outfit',
      priority: 'medium',
      status: 'on-hold',
      progress: 20,
      assignedDate: '2023-07-08',
      dueDate: '2023-07-28',
      completedDate: null,
      description: 'Customize Ahmed\'s traditional outfit for his family celebration. Add the specified embroidery pattern to the collar and cuffs. Waiting for the special thread to arrive before continuing.'
    },
    {
      id: 'T7',
      title: 'Evening Dress Alterations',
      customer: 'Lily Chen',
      type: 'Evening Dress',
      priority: 'urgent',
      status: 'not-started',
      progress: 0,
      assignedDate: '2023-07-17',
      dueDate: '2023-07-21',
      completedDate: null,
      description: 'Alter Lily\'s evening dress. Take in the bodice, adjust the straps, and hem the dress to the appropriate length. Add the requested beading to the waistline.'
    },
    {
      id: 'T8',
      title: 'Formal Dress - New Client',
      customer: 'Robert Johnson',
      type: 'Formal Dress',
      priority: 'low',
      status: 'in-progress',
      progress: 40,
      assignedDate: '2023-07-13',
      dueDate: '2023-07-30',
      completedDate: null,
      description: 'Create a custom formal dress for Robert\'s partner based on measurements and preferences. Using the charcoal gray fabric with subtle design elements. Include the requested accessories.'
    },
    {
      id: 'T9',
      title: 'Costume Repair - Theater Group',
      customer: 'Community Theater',
      type: 'Costume Repair',
      priority: 'medium',
      status: 'completed',
      progress: 100,
      assignedDate: '2023-07-11',
      dueDate: '2023-07-18',
      completedDate: '2023-07-17',
      description: 'Repair various costumes for the community theater production. Fix tears, replace missing buttons, and reinforce seams on the historical costumes for their upcoming performance.'
    },
    {
      id: 'T10',
      title: 'Uniform Alterations - School Band',
      customer: 'Lincoln High School',
      type: 'Uniform Alterations',
      priority: 'high',
      status: 'not-started',
      progress: 0,
      assignedDate: '2023-07-16',
      dueDate: '2023-07-26',
      completedDate: null,
      description: 'Alter 15 band uniforms for Lincoln High School. Each uniform needs to be adjusted according to the measurements provided. Ensure consistent appearance across all uniforms.'
    },
    {
      id: 'T11',
      title: 'Curtain Hemming - Home Decor',
      customer: 'Isabella Martinez',
      type: 'Home Decor',
      priority: 'low',
      status: 'on-hold',
      progress: 10,
      assignedDate: '2023-07-14',
      dueDate: '2023-07-29',
      completedDate: null,
      description: 'Hem 6 panels of curtains for Isabella\'s living room. Each panel should be hemmed to exactly 84 inches in length. Waiting for customer to confirm the exact length after checking her windows again.'
    },
    {
      id: 'T12',
      title: 'Leather Jacket Repair',
      customer: 'David Kim',
      type: 'Leather Repair',
      priority: 'medium',
      status: 'in-progress',
      progress: 60,
      assignedDate: '2023-07-15',
      dueDate: '2023-07-23',
      completedDate: null,
      description: 'Repair David\'s vintage leather jacket. Replace the worn-out lining, fix the torn pocket, and replace the broken zipper. Clean and condition the leather before returning to the customer.'
    }
  ];
}
