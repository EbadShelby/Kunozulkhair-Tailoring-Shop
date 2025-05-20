<?php
/**
 * Customer Login and Registration Page
 *
 * This page handles customer login and registration.
 */

// Include database connection
require_once 'config/db_connect.php';

// Initialize variables
$name = '';
$email = '';
$password = '';
$login_email = '';
$error_message = '';
$success_message = '';
$show_signup = false;

// Process registration form
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['register'])) {
    // Get form data
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    // Validate input
    if (empty($name) || empty($email) || empty($password)) {
        $error_message = 'Please fill in all fields';
        $show_signup = true;
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error_message = 'Please enter a valid email address';
        $show_signup = true;
    } elseif (strlen($password) < 6) {
        $error_message = 'Password must be at least 6 characters long';
        $show_signup = true;
    } else {
        // Check if email already exists
        $stmt = mysqli_prepare($conn, "SELECT id FROM customers WHERE email = ?");
        mysqli_stmt_bind_param($stmt, "s", $email);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_store_result($stmt);

        if (mysqli_stmt_num_rows($stmt) > 0) {
            $error_message = 'Email already exists. Please use a different email or login.';
            $show_signup = true;
        } else {
            // Hash password
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);

            // Insert new customer
            $insert_stmt = mysqli_prepare($conn, "INSERT INTO customers (name, email, password) VALUES (?, ?, ?)");
            mysqli_stmt_bind_param($insert_stmt, "sss", $name, $email, $hashed_password);

            if (mysqli_stmt_execute($insert_stmt)) {
                $success_message = 'Registration successful! You can now login.';
                // Clear form data
                $name = '';
                $email = '';
            } else {
                $error_message = 'Registration failed. Please try again later.';
                $show_signup = true;
            }

            mysqli_stmt_close($insert_stmt);
        }

        mysqli_stmt_close($stmt);
    }
}

// Process login form
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login'])) {
    // Get form data
    $login_email = trim($_POST['login_email'] ?? '');
    $login_password = $_POST['login_password'] ?? '';

    // Validate input
    if (empty($login_email) || empty($login_password)) {
        $error_message = 'Please enter both email and password';
    } else {
        // Check credentials
        $stmt = mysqli_prepare($conn, "SELECT id, name, email, password FROM customers WHERE email = ?");
        mysqli_stmt_bind_param($stmt, "s", $login_email);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        if ($customer = mysqli_fetch_assoc($result)) {
            // Verify password
            if (password_verify($login_password, $customer['password'])) {
                // Start session if not already started
                if (session_status() == PHP_SESSION_NONE) {
                    session_start();
                }

                // Set session variables
                $_SESSION['customer_id'] = $customer['id'];
                $_SESSION['customer_name'] = $customer['name'];
                $_SESSION['customer_email'] = $customer['email'];
                $_SESSION['login_time'] = time();

                // Redirect to home page
                header("Location: index.php");
                exit;
            } else {
                $error_message = 'Invalid email or password';
            }
        } else {
            $error_message = 'Invalid email or password';
        }

        mysqli_stmt_close($stmt);
    }
}

// Check URL parameters for signup flag
if (isset($_GET['signup']) && $_GET['signup'] === 'true') {
    $show_signup = true;
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

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

    <!-- link css -->
    <link rel="stylesheet" href="css/pages/checkout.css" />
    <link rel="stylesheet" href="css/pages/custom.css" />
    <link rel="stylesheet" href="css/pages/embroidery.css" />
    <link rel="stylesheet" href="css/pages/shop.css" />
    <link rel="stylesheet" href="css/pages/main.css" />

    <link rel="stylesheet" href="css/shared/general.css" />
    <link rel="stylesheet" href="css/shared/header.css" />
    <link rel="stylesheet" href="css/shared/reset.css" />
    <link rel="stylesheet" href="css/shared/utils.css" />
    <link rel="stylesheet" href="css/search.css" />

    <!-- linked google fonts  -->
    <link
      href="https://fonts.googleapis.com/css2?family=Baskervville:ital@0;1&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
      rel="stylesheet"
    />

    <link rel="icon" href="assets/images/logo.jpg" type="image/png">

     <link rel="stylesheet" href="css/shared/login-form.css" />

     <title>Sign Up/In - Kunozulkhair Tailoring Shop </title>
  </head>


  <body class="login-page">
    <header class="header">
      <div class="header__top container">
        <a class="header__logo" href="#">
          <img
            class="header__logo-img"
            src="assets/images/logo.jpg"
            alt="logo"
          />
          <p class="header__logo-text">
            <span>KunoZulkhair</span> Tailoring & Dress Shop
          </p>
        </a>
        <div class="header__search">
          <input
            type="search"
            name="search"
            id="search"
            class="header__search-input"
            placeholder="Search for products"
          />
          <button class="header__search--btn">
            <svg
              class="icon header__search-icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>

        <div class="header__icons">
          <div class="header__icon" id="cart-icon">
            <button class="header__icon cart">
              <svg
                class="icon cart"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              <span class="cart-count" id="cart-count">0</span>
            </button>
          </div>
          <button class="header__icon notification" id="notification-icon">
            <svg
              class="icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>
            <span class="notification-count" id="notification-count">3</span>
          </button>
          <button class="header__icon help" id="help-icon">
            <svg
              class="icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
              />
            </svg>
          </button>
          <a href="login-form.php" class="header__icon">
            <svg
              class="icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </a>
        </div>
      </div>

      <!-- Cart Sidebar -->
      <div class="cart-sidebar" id="cart-sidebar">
        <div class="cart-header">
          <h2>Your Cart</h2>
          <button id="close-cart">&times;</button>
        </div>
        <div class="cart-items" id="cart-items"></div>
        <div class="cart-footer">
          <p>Total: ₱<span id="cart-total">0</span></p>
          <button class="checkout-btn">Checkout</button>
        </div>
      </div>

      <nav class="header__nav container">
        <ul class="header__nav-links">
          <li><a class="header__link active" href="index.php">Home</a></li>
          <li><a class="header__link" href="shop.php">Shop</a></li>
          <li class="header__dropdown">
            <a class="header__link" href="services.php">Services</a>
            <ul class="header__dropdown-menu">
              <li><a href="embroidery-services.php">Embroidery Services</a></li>
              <li><a href="custom-dressmaking.php">Custom Dressmaking</a></li>
              <li><a href="alterations-and-repair.php">Alterations & Repairs</a></li>
              <li><a href="casual-and-everydaydresses.php">Casual & Everyday Dresses</a></li>
            </ul>
          </li>
          <li>
            <a class="header__link" href="appointments.php">Appointments</a>
          </li>
          <li><a class="header__link" href="orders.php">Orders</a></li>
          <li><a class="header__link" href="about.php">About Us</a></li>
          <li><a class="header__link" href="contact.php">Contact</a></li>
        </ul>
        <button class="header__nav--toggle">
          <svg
            class="icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </nav>
    </header>

    <!-- Notification Dropdown -->
    <div class="notification-dropdown" id="notification-dropdown">
      <div class="notification-header">
        <h3>Notifications</h3>
        <button id="mark-all-read">Mark all as read</button>
      </div>
      <div class="notification-list">
        <!-- Notifications will be dynamically inserted here -->
      </div>
      <div class="notification-footer">
        <a href="notifications.php">View all notifications</a>
      </div>
    </div>

    <!-- Help Tooltip -->
        <div class="help-tooltip" id="help-tooltip">
      <p>Need help with something? Try these quick options:</p>
      <div class="quick-help-buttons">
        <button class="quick-help-button" id="help-sizing">Sizing Guide</button>
        <button class="quick-help-button" id="help-orders">FAQs</button>
      </div>
    </div>

    <main class="login-main">
    <div class="container_lf <?php echo $show_signup ? 'active' : ''; ?>" id="container">
      <?php if (!empty($error_message)): ?>
        <div class="message error-message">
          <?php echo htmlspecialchars($error_message); ?>
        </div>
      <?php endif; ?>

      <?php if (!empty($success_message)): ?>
        <div class="message success-message">
          <?php echo htmlspecialchars($success_message); ?>
        </div>
      <?php endif; ?>

      <div class="form-container sign-up">
        <form method="POST" action="login-form.php">
          <h1>Create Account</h1>
          <input type="text" name="name" placeholder="Name" value="<?php echo htmlspecialchars($name); ?>" required />
          <input type="email" name="email" placeholder="Email" value="<?php echo htmlspecialchars($email); ?>" required />
          <input type="password" name="password" placeholder="Password" minlength="6" required />
          <button type="submit" name="register">Sign Up</button>
        </form>
      </div>
      <div class="form-container sign-in">
        <form method="POST" action="login-form.php">
          <h1>Sign In</h1>
          <input type="email" name="login_email" placeholder="Email" value="<?php echo htmlspecialchars($login_email); ?>" required />
          <input type="password" name="login_password" placeholder="Password" required />
          <a href="#">Forget Your Password?</a>
          <button type="submit" name="login">Sign In</button>
        </form>
      </div>
      <div class="toggle-container">
        <div class="toggle">
          <div class="toggle-panel toggle-left">
            <h1>Welcome to your Perfect Fit!</h1>
            <p>
             Register with your personal details to use all of site features
            </p>
            <button class="hidden" id="login">Sign In</button>
            <h6>
             <br>
             Already have an account? Sign In Now!
            </h6>
          </div>
          <div class="toggle-panel toggle-right">
            <h1>Welcome Back, Trendsetter!</h1>
            <p>
              Enter your personal details to use all of site features
            </p>
            <button class="hidden" id="register">Sign Up</button>
            <h6>
             <br>
             Don't have an account? Sign Up Now!
            </h6>
          </div>
        </div>
      </div>
    </div>
    </main>

    <script src="js/login-form.js"></script>
    <script src="js/header.js"></script>
    <!-- <script type="module" src="js/shop.js"></script> -->
    <!-- <script type="module" src="data/products.js"></script> -->
    <script type="module" src="data/notifications.js"></script>
    <script type="module" src="js/notifications.js"></script>
    <script type="module" src="js/search.js"></script>
    <script src="js/breakpoint-indicator.js"></script>
  </body>
</html>



