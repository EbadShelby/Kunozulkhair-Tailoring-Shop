document.addEventListener('DOMContentLoaded', function() {
  const shopLoginForm = document.getElementById('admin-login-form');
  const shopEmail = document.getElementById('admin-email');
  const shopPassword = document.getElementById('admin-password');
  const loginError = document.getElementById('login-error');
  const rememberMe = document.getElementById('remember');

  // Check if there are saved credentials
  checkSavedCredentials();

  // Handle form submission
  if (shopLoginForm) {
    shopLoginForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Clear previous error messages
      loginError.textContent = '';

      // Get form values
      const email = shopEmail.value.trim();
      const password = shopPassword.value.trim();

      // Validate inputs
      if (!email || !password) {
        loginError.textContent = 'Please enter both email and password';
        return;
      }

      // For demo purposes, we'll use hardcoded credentials
      // In a real application, this would be validated against a server
      authenticateUser(email, password);
    });
  }

  // Function to authenticate user (both admin and tailor)
  function authenticateUser(email, password) {
    // Demo credentials - in a real app, this would be a server request
    const validCredentials = [
      { email: 'admin@kunozulkhair.com', password: 'admin123', role: 'admin', name: 'Admin User' },
      { email: 'tailor@kunozulkhair.com', password: 'tailor123', role: 'tailor', name: 'Ryan Mentang' }
    ];

    const user = validCredentials.find(cred => cred.email === email && cred.password === password);

    if (user) {
      // Save credentials if remember me is checked
      if (rememberMe.checked) {
        saveCredentials(email, password);
      } else {
        // Clear any saved credentials
        localStorage.removeItem('shopCredentials');
      }

      // Save user info in session storage
      sessionStorage.setItem('currentUser', JSON.stringify({
        email: user.email,
        role: user.role,
        name: user.name, // Use the provided name
        loggedIn: true,
        loginTime: new Date().toISOString()
      }));

      // Redirect based on role
      if (user.role === 'admin') {
        window.location.href = 'admin-dashboard.php';
      } else if (user.role === 'tailor') {
        window.location.href = 'tailor-dashboard.php';
      }
    } else {
      // Show error message
      loginError.textContent = 'Invalid email or password';

      // Shake effect for error
      shopLoginForm.classList.add('shake');
      setTimeout(() => {
        shopLoginForm.classList.remove('shake');
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

    localStorage.setItem('shopCredentials', JSON.stringify(credentials));
  }

  // Function to check for saved credentials
  function checkSavedCredentials() {
    // Check both old credential storage locations for backward compatibility
    const savedCredentials = localStorage.getItem('shopCredentials') ||
                            localStorage.getItem('adminCredentials') ||
                            localStorage.getItem('tailorCredentials');

    if (savedCredentials) {
      try {
        const credentials = JSON.parse(savedCredentials);

        // Fill in the form
        shopEmail.value = credentials.email;
        shopPassword.value = credentials.password;
        rememberMe.checked = true;
      } catch (error) {
        console.error('Error parsing saved credentials:', error);
        // Clear invalid credentials
        localStorage.removeItem('shopCredentials');
        localStorage.removeItem('adminCredentials');
        localStorage.removeItem('tailorCredentials');
      }
    }
  }
});
