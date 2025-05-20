<?php
/**
 * Customer Profile Page
 *
 * This page displays and allows editing of customer profile information.
 */

// Include database connection
require_once 'config/db_connect.php';

// Start session if not already started
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Check if user is logged in
if (!isset($_SESSION['customer_id'])) {
    // Redirect to login page if not logged in
    header("Location: login-form.php");
    exit;
}

// Initialize variables
$customer_id = $_SESSION['customer_id'];
$name = $_SESSION['customer_name'] ?? '';
$email = $_SESSION['customer_email'] ?? '';
$phone = '';
$address = '';
$error_message = '';
$success_message = '';

// Fetch customer details from database
$stmt = mysqli_prepare($conn, "SELECT name, email, phone, address FROM customers WHERE id = ?");
mysqli_stmt_bind_param($stmt, "i", $customer_id);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

if ($customer = mysqli_fetch_assoc($result)) {
    $name = $customer['name'];
    $email = $customer['email'];
    $phone = $customer['phone'] ?? '';
    $address = $customer['address'] ?? '';
}
mysqli_stmt_close($stmt);

// Process profile update form
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['update_profile'])) {
    // Get form data
    $new_name = trim($_POST['name'] ?? '');
    $new_phone = trim($_POST['phone'] ?? '');
    $new_address = trim($_POST['address'] ?? '');
    $current_password = $_POST['current_password'] ?? '';
    $new_password = $_POST['new_password'] ?? '';
    
    // Validate input
    if (empty($new_name) || empty($new_phone) || empty($new_address)) {
        $error_message = 'Please fill in all required fields';
    } else {
        // If changing password, verify current password
        if (!empty($new_password)) {
            // Get current password hash
            $pwd_stmt = mysqli_prepare($conn, "SELECT password FROM customers WHERE id = ?");
            mysqli_stmt_bind_param($pwd_stmt, "i", $customer_id);
            mysqli_stmt_execute($pwd_stmt);
            $pwd_result = mysqli_stmt_get_result($pwd_stmt);
            $pwd_row = mysqli_fetch_assoc($pwd_result);
            mysqli_stmt_close($pwd_stmt);
            
            // Verify current password
            if (!password_verify($current_password, $pwd_row['password'])) {
                $error_message = 'Current password is incorrect';
            } elseif (strlen($new_password) < 6) {
                $error_message = 'New password must be at least 6 characters long';
            }
        }
        
        // If no errors, update profile
        if (empty($error_message)) {
            if (!empty($new_password)) {
                // Update with new password
                $hashed_password = password_hash($new_password, PASSWORD_DEFAULT);
                $update_stmt = mysqli_prepare($conn, "UPDATE customers SET name = ?, phone = ?, address = ?, password = ? WHERE id = ?");
                mysqli_stmt_bind_param($update_stmt, "ssssi", $new_name, $new_phone, $new_address, $hashed_password, $customer_id);
            } else {
                // Update without changing password
                $update_stmt = mysqli_prepare($conn, "UPDATE customers SET name = ?, phone = ?, address = ? WHERE id = ?");
                mysqli_stmt_bind_param($update_stmt, "sssi", $new_name, $new_phone, $new_address, $customer_id);
            }
            
            if (mysqli_stmt_execute($update_stmt)) {
                // Update session variables
                $_SESSION['customer_name'] = $new_name;
                
                // Update local variables
                $name = $new_name;
                $phone = $new_phone;
                $address = $new_address;
                
                $success_message = 'Profile updated successfully';
            } else {
                $error_message = 'Failed to update profile. Please try again.';
            }
            
            mysqli_stmt_close($update_stmt);
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Profile - Kunozulkhair Tailoring Shop</title>

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

    <!-- link css -->
    <link rel="stylesheet" href="css/shared/general.css" />
    <link rel="stylesheet" href="css/shared/header.css" />
    <link rel="stylesheet" href="css/shared/reset.css" />
    <link rel="stylesheet" href="css/shared/utils.css" />
    <link rel="stylesheet" href="css/shared/footer.css" />
    <link rel="stylesheet" href="css/search.css" />
    <link rel="stylesheet" href="css/cart.css" />

    <!-- Create a new CSS file for profile page -->
    <style>
      /* Fix for mobile toggle visibility on PC screens */
      @media (min-width: 768px) {
        .header__menu-btn {
          display: none;
        }
      }
      
      .profile-container {
        max-width: 800px;
        margin: 2rem auto;
        padding: 2rem;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }
      
      .profile-header {
        display: flex;
        align-items: center;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #eee;
      }
      
      .profile-avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background-color: #f0f0f0;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 1.5rem;
        font-size: 2rem;
        color: #666;
      }
      
      .profile-title h1 {
        margin: 0;
        font-size: 1.8rem;
        color: #333;
      }
      
      .profile-title p {
        margin: 0.5rem 0 0;
        color: #666;
      }
      
      .profile-tabs {
        display: flex;
        margin-bottom: 1.5rem;
        border-bottom: 1px solid #eee;
      }
      
      .profile-tab {
        padding: 0.75rem 1.5rem;
        cursor: pointer;
        border-bottom: 2px solid transparent;
      }
      
      .profile-tab.active {
        border-bottom: 2px solid #4a90e2;
        font-weight: 600;
      }
      
      .profile-section {
        display: none;
      }
      
      .profile-section.active {
        display: block;
      }
      
      .form-group {
        margin-bottom: 1.5rem;
      }
      
      .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
      }
      
      .form-group input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #ddd;
        border-radius: 4px;
      }
      
      .password-section {
        margin-top: 2rem;
        padding-top: 1.5rem;
        border-top: 1px solid #eee;
      }
      
      .btn-update {
        background-color: #4a90e2;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 500;
      }
      
      .btn-update:hover {
        background-color: #3a7bc8;
      }
      
      .message {
        padding: 1rem;
        margin-bottom: 1.5rem;
        border-radius: 4px;
      }
      
      .error-message {
        background-color: #ffebee;
        color: #c62828;
      }
      
      .success-message {
        background-color: #e8f5e9;
        color: #2e7d32;
      }
      
      .order-card {
        padding: 1rem;
        margin-bottom: 1rem;
        border: 1px solid #eee;
        border-radius: 4px;
      }
      
      .order-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
      }
      
      .order-date {
        color: #666;
        font-size: 0.9rem;
      }
      
      .order-status {
        font-weight: 600;
      }
      
      .status-pending {
        color: #f57c00;
      }
      
      .status-completed {
        color: #388e3c;
      }
      
      .status-cancelled {
        color: #d32f2f;
      }
      
      .order-items {
        margin-top: 0.5rem;
        padding-top: 0.5rem;
        border-top: 1px solid #eee;
      }
      
      .no-orders {
        color: #666;
        text-align: center;
        padding: 2rem;
      }
    </style>

    <!-- linked google fonts  -->
    <link
      href="https://fonts.googleapis.com/css2?family=Baskervville:ital@0;1&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
      rel="stylesheet"
    />

    <link rel="icon" href="assets/images/logo.jpg" type="image/png">
  </head>
  <body>
    <?php include 'includes/header.php'; ?>

    <main>
      <div class="profile-container">
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

        <div class="profile-header">
          <div class="profile-avatar">
            <?php echo strtoupper(substr($name, 0, 1)); ?>
          </div>
          <div class="profile-title">
            <h1>Welcome, <?php echo htmlspecialchars($name); ?></h1>
            <p><?php echo htmlspecialchars($email); ?></p>
          </div>
        </div>

        <div class="profile-tabs">
          <div class="profile-tab active" data-tab="profile">My Profile</div>
        </div>

        <div class="profile-section active" id="profile-tab">
          <form method="POST" action="profile.php">
            <div class="form-group">
              <label for="name">Full Name</label>
              <input type="text" id="name" name="name" value="<?php echo htmlspecialchars($name); ?>" required>
            </div>
            
            <div class="form-group">
              <label for="email">Email (cannot be changed)</label>
              <input type="email" id="email" value="<?php echo htmlspecialchars($email); ?>" disabled>
            </div>
            
            <div class="form-group">
              <label for="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" value="<?php echo htmlspecialchars($phone); ?>" required>
            </div>
            
            <div class="form-group">
              <label for="address">Address</label>
              <input type="text" id="address" name="address" value="<?php echo htmlspecialchars($address); ?>" required>
            </div>
            
            <div class="password-section">
              <h3>Change Password</h3>
              <p>Leave blank if you don't want to change your password</p>
              
              <div class="form-group">
                <label for="current_password">Current Password</label>
                <input type="password" id="current_password" name="current_password">
              </div>
              
              <div class="form-group">
                <label for="new_password">New Password</label>
                <input type="password" id="new_password" name="new_password" minlength="6">
              </div>
            </div>
            
            <button type="submit" name="update_profile" class="btn-update">Update Profile</button>
          </form>
        </div>


      </div>
    </main>

    <footer class="site-footer">
      <div class="container footer-grid">
        <!-- Contact Info -->
        <div class="footer-section">
          <h3>Contact Us</h3>
          <p>📍 Datu Liwa Candao Street, Cotabato City</p>
          <p>📞 +639111111</p>
          <p>📧 KunoZulkhair@gmail.com</p>
          <p>⏰ Mon-Sat: 9am-6pm, Sun: 10am-4pm</p>
        </div>

        <!-- Quick Links -->
        <div class="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="shop.php">Shop</a></li>
            <li><a href="services.php">Services</a></li>
            <li><a href="appointments.php">Appointments</a></li>
            <li><a href="orders.php">Orders</a></li>
            <li><a href="contact.php">Contact</a></li>
            <li><a href="about.php">About Us</a></li>
          </ul>
        </div>

        <!-- Services Links -->
        <div class="footer-section">
          <h3>Our Services</h3>
          <ul>
            <li><a href="custom-dressmaking.php">Custom Dressmaking</a></li>
            <li><a href="alterations-and-repair.php">Alterations & Repairs</a></li>
            <li><a href="casual-and-everydaydresses.php">Casual and Everyday dresses</a></li>
          </ul>
        </div>

        <!-- Newsletter Section -->
        <div class="footer-section newsletter">
          <h3>Stay Updated</h3>
          <p>Subscribe to our newsletter for exclusive offers and updates</p>
          <div class="newsletter-form">
            <input type="email" placeholder="Your email address" />
            <button type="submit">Subscribe</button>
          </div>
          <div class="social-links">
            <a href="https://www.facebook.com/profile.php?id=61575972894049" target="_blank" title="Facebook">
              <img src="assets/images/Fb.jpg" alt="Facebook" />
            </a>
            <a href="https://www.instagram.com/tailorshopdresses?igsh=MWt1d3QxeWpkdGRiNA==" target="_blank" title="Instagram">
              <img src="assets/images/Instagram.jpg" alt="Instagram" />
            </a>
            <a href="https://x.com/Shopdress12?t=kadWcD_XQNlPQtjHQ&s=09" target="_blank" title="Twitter">
              <img src="assets/images/twitter.jpg" alt="Twitter" />
            </a>
          </div>
        </div>
      </div>

      <div class="container footer-bottom">
        <p>&copy; 2025 Kunozulkhair Tailoring Shop. All rights reserved.</p>
        <div class="footer-bottom-links">
          <a href="privacy-policy.php">Privacy Policy</a>
          <a href="terms-of-service.php">Terms of Service</a>
          <a href="faqs.php">FAQs</a>
          <a href="admin-login.php" class="admin-link">Shop Login</a>
        </div>
      </div>
    </footer>

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

    <script src="js/header.js"></script>
    <script src="js/cart.js"></script>
    <script type="module" src="data/notifications.js"></script>
    <script type="module" src="js/notifications.js"></script>
    <script type="module" src="js/search.js"></script>
    <script>
      // Profile tab functionality
      document.addEventListener('DOMContentLoaded', function() {
        const tabs = document.querySelectorAll('.profile-tab');
        const sections = document.querySelectorAll('.profile-section');
        
        tabs.forEach(tab => {
          tab.addEventListener('click', function() {
            // Remove active class from all tabs and sections
            tabs.forEach(t => t.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding section
            const tabName = this.getAttribute('data-tab');
            document.getElementById(tabName + '-tab').classList.add('active');
          });
        });
      });
    </script>
  </body>
</html>
