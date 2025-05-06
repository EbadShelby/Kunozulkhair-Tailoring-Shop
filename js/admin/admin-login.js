document.addEventListener('DOMContentLoaded', function() {
  const adminLoginForm = document.getElementById('admin-login-form');
  const adminEmail = document.getElementById('admin-email');
  const adminPassword = document.getElementById('admin-password');
  const loginError = document.getElementById('login-error');
  const rememberMe = document.getElementById('remember');

  // Check if there are saved credentials
  checkSavedCredentials();

  // Handle form submission
  if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Clear previous error messages
      loginError.textContent = '';
      
      // Get form values
      const email = adminEmail.value.trim();
      const password = adminPassword.value.trim();
      
      // Validate inputs
      if (!email || !password) {
        loginError.textContent = 'Please enter both email and password';
        return;
      }
      
      // For demo purposes, we'll use hardcoded credentials
      // In a real application, this would be validated against a server
      authenticateAdmin(email, password);
    });
  }

  // Function to authenticate admin
  function authenticateAdmin(email, password) {
    // Demo credentials - in a real app, this would be a server request
    const validCredentials = [
      { email: 'admin@kunozulkhair.com', password: 'admin123', role: 'admin' },
      { email: 'tailor@kunozulkhair.com', password: 'tailor123', role: 'tailor' }
    ];
    
    const user = validCredentials.find(cred => cred.email === email && cred.password === password);
    
    if (user) {
      // Save credentials if remember me is checked
      if (rememberMe.checked) {
        saveCredentials(email, password);
      } else {
        // Clear any saved credentials
        localStorage.removeItem('adminCredentials');
      }
      
      // Save user info in session storage
      sessionStorage.setItem('currentUser', JSON.stringify({
        email: user.email,
        role: user.role,
        name: user.email.split('@')[0], // Simple name extraction for demo
        loggedIn: true,
        loginTime: new Date().toISOString()
      }));
      
      // Redirect based on role
      if (user.role === 'admin') {
        window.location.href = 'admin-dashboard.html';
      } else if (user.role === 'tailor') {
        window.location.href = 'tailor-dashboard.html';
      }
    } else {
      // Show error message
      loginError.textContent = 'Invalid email or password';
      
      // Shake effect for error
      adminLoginForm.classList.add('shake');
      setTimeout(() => {
        adminLoginForm.classList.remove('shake');
      }, 500);
    }
  }

  // Function to save credentials in local storage
  function saveCredentials(email, password) {
    // In a real app, you would never store passwords in plain text
    // This is just for demo purposes
    const credentials = {
      email: email,
      password: password // In reality, you'd use a token instead
    };
    
    localStorage.setItem('adminCredentials', JSON.stringify(credentials));
  }

  // Function to check for saved credentials
  function checkSavedCredentials() {
    const savedCredentials = localStorage.getItem('adminCredentials');
    
    if (savedCredentials) {
      const credentials = JSON.parse(savedCredentials);
      
      // Fill in the form
      adminEmail.value = credentials.email;
      adminPassword.value = credentials.password;
      rememberMe.checked = true;
    }
  }
});
