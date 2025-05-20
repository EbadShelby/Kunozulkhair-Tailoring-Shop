<?php
/**
 * Customer Login and Registration Page
 *
 * This page handles customer login and registration.
 */

// Include database connection
require_once 'config/db_connect.php';

// Start session if not already started
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Initialize variables
$name = '';
$email = '';
$password = '';
$phone = '';
$address = '';
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
    $phone = trim($_POST['phone'] ?? '');
    $address = trim($_POST['address'] ?? '');

    // Validate input
    if (empty($name) || empty($email) || empty($password) || empty($phone) || empty($address)) {
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
            $insert_stmt = mysqli_prepare($conn, "INSERT INTO customers (name, email, password, phone, address) VALUES (?, ?, ?, ?, ?)");
            mysqli_stmt_bind_param($insert_stmt, "sssss", $name, $email, $hashed_password, $phone, $address);

            if (mysqli_stmt_execute($insert_stmt)) {
                $success_message = 'Registration successful! You can now login.';
                // Clear form data
                $name = '';
                $email = '';
                $phone = '';
                $address = '';
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

                // Redirect to profile page
                header("Location: profile.php");
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
    <link rel="stylesheet" href="css/cart.css" />

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
    <?php include 'includes/header.php'; ?>

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
          <input type="tel" name="phone" placeholder="Phone Number" value="<?php echo htmlspecialchars($phone); ?>" required />
          <input type="text" name="address" placeholder="Address" value="<?php echo htmlspecialchars($address); ?>" required />
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
    <script src="js/cart.js"></script>
    <!-- <script type="module" src="js/shop.js"></script> -->
    <!-- <script type="module" src="data/products.js"></script> -->
    <script type="module" src="data/notifications.js"></script>
    <script type="module" src="js/notifications.js"></script>
    <script type="module" src="js/search.js"></script>
    <script src="js/breakpoint-indicator.js"></script>
  </body>
</html>



