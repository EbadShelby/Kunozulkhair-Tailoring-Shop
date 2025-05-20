<?php
/**
 * Admin Login Page
 *
 * This page handles the login for both admin and tailor users.
 */

// Include necessary files
require_once 'config/db_connect.php';
require_once 'config/session.php';

// Initialize variables
$email = '';
$password = '';
$remember = false;
$error = '';
$success = '';

// Check if user is already logged in
if (is_logged_in()) {
    // Redirect based on role
    if (is_admin()) {
        header("Location: admin-dashboard.php");
        exit;
    } elseif (is_tailor()) {
        header("Location: tailor-dashboard.php");
        exit;
    }
}

// Check for messages
if (isset($_SESSION['error_message'])) {
    $error = $_SESSION['error_message'];
    unset($_SESSION['error_message']);
}

if (isset($_SESSION['success_message'])) {
    $success = $_SESSION['success_message'];
    unset($_SESSION['success_message']);
}

// Process form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $remember = isset($_POST['remember']);

    // Validate input
    if (empty($email) || empty($password)) {
        $error = 'Please enter both email and password';
    } else {
        // Prepare SQL statement to prevent SQL injection
        $stmt = mysqli_prepare($conn, "SELECT id, username, email, password, role, name FROM users WHERE email = ?");
        mysqli_stmt_bind_param($stmt, "s", $email);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        if ($user = mysqli_fetch_assoc($result)) {
            // Verify password
            if (password_verify($password, $user['password'])) {
                // Set session variables
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['username'] = $user['username'];
                $_SESSION['user_email'] = $user['email'];
                $_SESSION['user_role'] = $user['role'];
                $_SESSION['user_name'] = $user['name'];
                $_SESSION['login_time'] = time();

                // Set remember me cookie if checked
                if ($remember) {
                    // Generate a secure token
                    $token = bin2hex(random_bytes(32));

                    // Store token in database (in a real app, you'd have a separate table for this)
                    // For simplicity, we're just setting a cookie here
                    setcookie('remember_token', $token, time() + (86400 * 30), "/"); // 30 days
                }

                // Redirect based on role
                if ($user['role'] === 'admin') {
                    header("Location: admin-dashboard.php");
                    exit;
                } else {
                    header("Location: tailor-dashboard.php");
                    exit;
                }
            } else {
                $error = 'Invalid email or password';
            }
        } else {
            $error = 'Invalid email or password';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
    />

    <!-- linked google fonts  -->
    <link
      href="https://fonts.googleapis.com/css2?family=Baskervville:ital@0;1&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
      rel="stylesheet"
    />

    <link rel="icon" href="assets/images/logo.jpg" type="image/png">

    <link rel="stylesheet" href="css/shared/login-form.css" />
    <link rel="stylesheet" href="css/admin/admin-login.css" />

    <title>Shop Login - Kunozulkhair Tailoring Shop</title>
  </head>

  <body class="admin-login-page">
    <div class="login-wrapper">
      <header class="header admin-header">
        <div class="header__top container">
          <a class="header__logo" href="index.php">
            <img
              class="header__logo-img"
              src="assets/images/logo.jpg"
              alt="logo"
            />
            <p class="header__logo-text">
              <span>KunoZulkhair</span> Tailoring & Dress Shop
            </p>
          </a>
        </div>
      </header>

      <main class="login-main">
        <div class="login-container">
          <div class="login-card">
            <div class="login-card-header">
              <div class="login-icon">
                <i class="fas fa-user-shield"></i>
              </div>
              <h1>Shop Login</h1>
              <p class="login-desc">Access your shop dashboard</p>
              <p class="login-note">For both admin and tailor access</p>
            </div>

            <div class="login-card-body">
              <?php if (!empty($success)): ?>
                <div class="success-message"><?php echo htmlspecialchars($success); ?></div>
              <?php endif; ?>

              <?php if (!empty($error)): ?>
                <div class="error-message"><?php echo htmlspecialchars($error); ?></div>
              <?php endif; ?>

              <form id="admin-login-form" method="POST" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>">
                <div class="input-group">
                  <div class="input-icon">
                    <i class="fas fa-envelope"></i>
                  </div>
                  <input type="email" id="admin-email" name="email" placeholder="Email Address" value="<?php echo htmlspecialchars($email); ?>" required />
                </div>

                <div class="input-group">
                  <div class="input-icon">
                    <i class="fas fa-lock"></i>
                  </div>
                  <input type="password" id="admin-password" name="password" placeholder="Password" required />
                  <button type="button" class="password-toggle" tabindex="-1">
                    <i class="fas fa-eye"></i>
                  </button>
                </div>

                <div class="form-options">
                  <div class="remember-me">
                    <input type="checkbox" id="remember" name="remember" <?php echo $remember ? 'checked' : ''; ?> />
                    <label for="remember">Remember me</label>
                  </div>
                  <a href="#" class="forgot-password">Forgot Password?</a>
                </div>

                <button type="submit" class="login-btn">
                  <span>Login</span>
                  <i class="fas fa-arrow-right"></i>
                </button>
              </form>
            </div>

            <div class="login-card-footer">
              <div class="login-options">
                <a href="index.php" class="back-to-site">
                  <i class="fas fa-home"></i> Back to Website
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer class="admin-login-footer">
        <p>&copy; 2025 Kunozulkhair Tailoring Shop. All rights reserved.</p>
      </footer>
    </div>

    <script>
      // Password visibility toggle
      document.querySelector('.password-toggle').addEventListener('click', function() {
        const passwordInput = document.getElementById('admin-password');
        const icon = this.querySelector('i');

        if (passwordInput.type === 'password') {
          passwordInput.type = 'text';
          icon.classList.remove('fa-eye');
          icon.classList.add('fa-eye-slash');
        } else {
          passwordInput.type = 'password';
          icon.classList.remove('fa-eye-slash');
          icon.classList.add('fa-eye');
        }
      });

      // Add shake effect for error messages
      document.addEventListener('DOMContentLoaded', function() {
        const errorMessage = document.querySelector('.error-message');
        const loginForm = document.getElementById('admin-login-form');

        if (errorMessage && errorMessage.textContent.trim() !== '') {
          loginForm.classList.add('shake');
          setTimeout(() => {
            loginForm.classList.remove('shake');
          }, 500);
        }
      });
    </script>
    <script src="js/breakpoint-indicator.js"></script>
  </body>
</html>

