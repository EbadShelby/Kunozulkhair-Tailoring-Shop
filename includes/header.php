<?php
// Start session if not already started
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
?>
<header class="header">
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
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
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
            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
          />
        </svg>
      </button>

      <?php if (isset($_SESSION['customer_id'])): ?>
        <div class="header__icon account-dropdown">
          <button class="header__icon account-btn">
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
          </button>
          <div class="account-menu">
            <a href="profile.php">My Profile</a>
            <a href="logout.php">Sign Out</a>
          </div>
        </div>
      <?php else: ?>
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
      <?php endif; ?>
    </div>
  </div>
  <nav class="header__nav container">
    <ul class="header__nav-links">
      <li><a class="header__link <?php echo basename($_SERVER['PHP_SELF']) == 'index.php' ? 'active' : ''; ?>" href="index.php">Home</a></li>
      <li><a class="header__link <?php echo basename($_SERVER['PHP_SELF']) == 'shop.php' ? 'active' : ''; ?>" href="shop.php">Shop</a></li>
      <li class="header__dropdown">
        <a class="header__link <?php echo basename($_SERVER['PHP_SELF']) == 'services.php' ? 'active' : ''; ?>" href="services.php">Services</a>
        <ul class="header__dropdown-menu">
          <li><a href="custom-dressmaking.php">Custom Dressmaking</a></li>
          <li><a href="alterations-and-repair.php">Alterations & Repairs</a></li>
          <li><a href="casual-and-everydaydresses.php">Casual & Everyday dresses</a></li>
        </ul>
      </li>
      <li><a class="header__link <?php echo basename($_SERVER['PHP_SELF']) == 'appointments.php' ? 'active' : ''; ?>" href="appointments.php">Appointments</a></li>
      <li><a class="header__link <?php echo basename($_SERVER['PHP_SELF']) == 'orders.php' ? 'active' : ''; ?>" href="orders.php">Orders</a></li>
      <li><a class="header__link <?php echo basename($_SERVER['PHP_SELF']) == 'contact.php' ? 'active' : ''; ?>" href="contact.php">Contact</a></li>
      <li><a class="header__link <?php echo basename($_SERVER['PHP_SELF']) == 'about.php' ? 'active' : ''; ?>" href="about.php">About</a></li>
    </ul>
    <button class="header__menu-btn">
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

<!-- Add CSS for mobile toggle fix and account dropdown -->
<style>
  @media (min-width: 768px) {
    .header__menu-btn {
      display: none;
    }
  }
  
  /* Account dropdown styles */
  .account-dropdown {
    position: relative;
  }
  
  .account-menu {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    border-radius: 4px;
    width: 150px;
    display: none;
    z-index: 1000;
  }
  
  .account-menu a {
    display: block;
    padding: 10px 15px;
    text-decoration: none;
    color: #333;
    transition: background-color 0.2s;
  }
  
  .account-menu a:hover {
    background-color: #f5f5f5;
  }
  
  .account-dropdown.active .account-menu {
    display: block;
  }
</style>

<!-- Add JavaScript for account dropdown -->
<script>
  document.addEventListener('DOMContentLoaded', function() {
    const accountBtn = document.querySelector('.account-btn');
    const accountDropdown = document.querySelector('.account-dropdown');
    
    if (accountBtn) {
      accountBtn.addEventListener('click', function(e) {
        e.preventDefault();
        accountDropdown.classList.toggle('active');
      });
      
      // Close dropdown when clicking outside
      document.addEventListener('click', function(e) {
        if (!accountDropdown.contains(e.target)) {
          accountDropdown.classList.remove('active');
        }
      });
    }
  });
</script>
