document.addEventListener('DOMContentLoaded', function() {
  const tailorLoginForm = document.getElementById('tailor-login-form');
  const tailorEmail = document.getElementById('tailor-email');
  const tailorPassword = document.getElementById('tailor-password');
  const loginError = document.getElementById('login-error');
  const rememberMe = document.getElementById('remember');

  // Check if there are saved credentials
  checkSavedCredentials();

  // Handle form submission
  if (tailorLoginForm) {
    tailorLoginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Clear previous error messages
      loginError.textContent = '';
      
      // Get form values
      const email = tailorEmail.value.trim();
      const password = tailorPassword.value.trim();
      
      // Validate inputs
      if (!email || !password) {
        loginError.textContent = 'Please enter both email and password';
        return;
      }
      
      // For demo purposes, we'll use hardcoded credentials
      // In a real application, this would be validated against a server
      authenticateTailor(email, password);
    });
  }

  // Function to authenticate tailor
  function authenticateTailor(email, password) {
    // Demo credentials - in a real app, this would be a server request
    const validCredentials = [
      { email: 'tailor@kunozulkhair.com', password: 'tailor123', role: 'tailor' }
    ];
    
    const user = validCredentials.find(cred => cred.email === email && cred.password === password);
    
    if (user) {
      // Save credentials if remember me is checked
      if (rememberMe.checked) {
        saveCredentials(email, password);
      } else {
        // Clear any saved credentials
        localStorage.removeItem('tailorCredentials');
      }
      
      // Save user info in session storage
      sessionStorage.setItem('currentUser', JSON.stringify({
        email: user.email,
        role: user.role,
        name: user.email.split('@')[0], // Simple name extraction for demo
        loggedIn: true,
        loginTime: new Date().toISOString()
      }));
      
      // Redirect to tailor dashboard
      window.location.href = 'tailor-dashboard.html';
    } else {
      // Show error message
      loginError.textContent = 'Invalid email or password';
      
      // Shake effect for error
      tailorLoginForm.classList.add('shake');
      setTimeout(() => {
        tailorLoginForm.classList.remove('shake');
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
    
    localStorage.setItem('tailorCredentials', JSON.stringify(credentials));
  }

  // Function to check if there are saved credentials
  function checkSavedCredentials() {
    const savedCredentials = localStorage.getItem('tailorCredentials');
    
    if (savedCredentials) {
      try {
        const credentials = JSON.parse(savedCredentials);
        
        if (credentials.email && credentials.password) {
          tailorEmail.value = credentials.email;
          tailorPassword.value = credentials.password;
          rememberMe.checked = true;
        }
      } catch (error) {
        console.error('Error parsing saved credentials:', error);
        localStorage.removeItem('tailorCredentials');
      }
    }
  }
});
