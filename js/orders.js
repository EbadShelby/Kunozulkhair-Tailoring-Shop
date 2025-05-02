document.addEventListener('DOMContentLoaded', function() {
  // Demo mode toggle (in a real app, this would be based on authentication)
  const loginPrompt = document.getElementById('login-prompt');
  const ordersDashboard = document.getElementById('orders-dashboard');
  const demoModeBtn = document.createElement('button');
  
  demoModeBtn.textContent = 'View Demo';
  demoModeBtn.className = 'login-btn';
  demoModeBtn.style.marginLeft = '1rem';
  
  // Add demo button after login button
  document.querySelector('.login-btn').after(demoModeBtn);
  
  // Demo mode toggle
  demoModeBtn.addEventListener('click', function() {
    loginPrompt.style.display = 'none';
    ordersDashboard.style.display = 'block';
  });
  
  // Order detail modal functionality
  const orderDetailModal = document.getElementById('order-detail-modal');
  const closeModalBtn = document.querySelector('.close-modal');
  const viewOrderBtns = document.querySelectorAll('.view-order-btn');
  
  // Open modal when view details button is clicked
  viewOrderBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const orderId = this.getAttribute('data-order-id');
      openOrderDetail(orderId);
    });
  });
  
  // Close modal when close button is clicked
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', function() {
      orderDetailModal.style.display = 'none';
    });
  }
  
  // Close modal when clicking outside
  window.addEventListener('click', function(event) {
    if (event.target === orderDetailModal) {
      orderDetailModal.style.display = 'none';
    }
  });
  
  // Open order detail modal and load order data
  function openOrderDetail(orderId) {
    // Update order ID in the modal
    document.getElementById('detail-order-id').textContent = orderId;
    
    // In a real app, you would fetch order details from a server
    // For demo purposes, we're just displaying the modal with sample data
    
    // If you had real data, you would update the modal content here based on the orderId
    // updateOrderDetailContent(orderData);
    
    // Show the modal
    orderDetailModal.style.display = 'block';
  }
  
  // Search functionality
  const orderSearch = document.getElementById('order-search');
  const searchBtn = document.getElementById('search-btn');
  
  if (searchBtn) {
    searchBtn.addEventListener('click', function() {
      searchOrders();
    });
  }
  
  if (orderSearch) {
    orderSearch.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        searchOrders();
      }
    });
  }
  
  function searchOrders() {
    const searchTerm = orderSearch.value.toLowerCase();
    const orderRows = document.querySelectorAll('.orders-table tbody tr');
    
    orderRows.forEach(row => {
      const orderId = row.getAttribute('data-order-id').toLowerCase();
      const orderText = row.textContent.toLowerCase();
      
      if (orderId.includes(searchTerm) || orderText.includes(searchTerm)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }
  
  // Filters functionality
  const statusFilter = document.getElementById('filter-status');
  const dateFilter = document.getElementById('filter-date');
  const typeFilter = document.getElementById('filter-type');
  
  // Add event listeners to all filters
  [statusFilter, dateFilter, typeFilter].forEach(filter => {
    if (filter) {
      filter.addEventListener('change', applyFilters);
    }
  });
  
  function applyFilters() {
    const statusValue = statusFilter.value;
    const dateValue = dateFilter.value;
    const typeValue = typeFilter.value;
    
    const orderRows = document.querySelectorAll('.orders-table tbody tr');
    
    orderRows.forEach(row => {
      let showRow = true;
      
      // Status filter
      if (statusValue !== 'all') {
        const statusBadge = row.querySelector('.status-badge');
        const rowStatus = statusBadge.textContent.toLowerCase();
        
        // Map filter values to actual status texts
        const statusMap = {
          'processing': ['in progress', 'fitting stage'],
          'ready': ['ready for pickup'],
          'completed': ['completed'],
          'cancelled': ['cancelled']
        };
        
        if (!statusMap[statusValue].some(status => rowStatus.includes(status))) {
          showRow = false;
        }
      }
      
      // Date filter (simplified for demo)
      if (dateValue !== 'all' && showRow) {
        const orderDate = new Date(row.querySelector('td:nth-child(2)').textContent);
        const today = new Date();
        const daysDiff = Math.floor((today - orderDate) / (1000 * 60 * 60 * 24));
        
        if (daysDiff > parseInt(dateValue)) {
          showRow = false;
        }
      }
      
      // Type filter (simplified for demo)
      if (typeValue !== 'all' && showRow) {
        const orderItems = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
        
        // Simple string matching for demo purposes
        const typeMatches = {
          'product': ['dress', 'barong', 'dresses'],
          'custom': ['custom', 'wedding'],
          'alteration': ['alteration', 'repair']
        };
        
        if (!typeMatches[typeValue].some(keyword => orderItems.includes(keyword))) {
          showRow = false;
        }
      }
      
      // Show or hide row based on filter results
      row.style.display = showRow ? '' : 'none';
    });
  }
  
  // Pagination functionality (simplified for demo)
  const pageButtons = document.querySelectorAll('.page-number');
  const prevBtn = document.querySelector('.pagination-btn:first-child');
  const nextBtn = document.querySelector('.pagination-btn:last-child');
  
  if (pageButtons.length > 0) {
    pageButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all buttons
        pageButtons.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Update prev/next button states
        updatePaginationButtons();
        
        // In a real app, you would load the data for the selected page here
        // For demo purposes, we're just updating the active state
      });
    });
  }
  
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', function() {
      if (this.disabled) return;
      
      const activePage = document.querySelector('.page-number.active');
      const prevPage = activePage.previousElementSibling;
      
      if (prevPage) {
        activePage.classList.remove('active');
        prevPage.classList.add('active');
        updatePaginationButtons();
      }
    });
    
    nextBtn.addEventListener('click', function() {
      if (this.disabled) return;
      
      const activePage = document.querySelector('.page-number.active');
      const nextPage = activePage.nextElementSibling;
      
      if (nextPage) {
        activePage.classList.remove('active');
        nextPage.classList.add('active');
        updatePaginationButtons();
      }
    });
  }
  
  function updatePaginationButtons() {
    const activePage = document.querySelector('.page-number.active');
    
    if (prevBtn) {
      prevBtn.disabled = !activePage.previousElementSibling;
    }
    
    if (nextBtn) {
      nextBtn.disabled = !activePage.nextElementSibling;
    }
  }
  
  // Order action buttons in modal
  const actionButtons = document.querySelectorAll('.order-actions .action-btn');
  
  actionButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const action = this.className.split(' ')[1].split('-')[0]; // Extract action type
      
      // Show appropriate confirmation or form based on action type
      switch (action) {
        case 'schedule':
          alert('Schedule Fitting: In a real app, this would open a scheduling calendar.');
          break;
        case 'contact':
          alert('Contact Tailor: In a real app, this would open a messaging interface.');
          break;
        case 'cancel':
          alert('Request Changes: In a real app, this would open a form to request changes.');
          break;
      }
    });
  });
  
  // Initialize page state
  updatePaginationButtons();
}); 