<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Notifications - Kunozulkhair Tailoring Shop</title>
    <link rel="stylesheet" href="css/shared/general.css" />
    <link rel="stylesheet" href="css/shared/header.css" />
    <link rel="stylesheet" href="css/shared/reset.css" />
    <link rel="stylesheet" href="css/shared/utils.css" />
    <link rel="stylesheet" href="css/shared/footer.css">

    <!-- linked google fonts  -->
    <link
      href="https://fonts.googleapis.com/css2?family=Baskervville:ital@0;1&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
      rel="stylesheet"
    />

    <link rel="icon" href="assets/images/logo.jpg" type="image/png">
    <style>
      /* Notifications Page Specific Styles */
      .notifications-hero {
        background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('assets/images/logo.jpg') center/cover no-repeat;
        color: #fff;
        padding: 5rem 0;
        text-align: center;
        margin-bottom: 3rem;
      }

      .notifications-hero h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }

      .notifications-hero p {
        font-size: 1.2rem;
        max-width: 600px;
        margin: 0 auto;
      }

      .notifications-container {
        max-width: 800px;
        margin: 0 auto 4rem;
        padding: 0 1rem;
      }

      .notifications-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
      }

      .notifications-header h2 {
        font-size: 1.8rem;
        color: var(--clr-neutral-900);
      }

      .mark-all-read-btn {
        background-color: var(--clr-primary);
        color: var(--clr-neutral-900);
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        font-weight: var(--fw-medium);
      }

      .notifications-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .notification-card {
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        padding: 1.5rem;
        transition: all 0.3s ease;
      }

      .notification-card.unread {
        background-color: #f0f7ff;
        border-left: 3px solid var(--clr-primary);
      }

      .notification-card:hover {
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      }

      .notification-title {
        font-weight: var(--fw-bold);
        font-size: 1.1rem;
        margin-bottom: 0.5rem;
        color: var(--clr-neutral-900);
      }

      .notification-message {
        color: #555;
        margin-bottom: 0.75rem;
        line-height: 1.5;
      }

      .notification-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.85rem;
        color: #777;
      }

      .notification-time {
        font-style: italic;
      }

      .notification-actions button {
        background: none;
        border: none;
        color: var(--clr-primary);
        cursor: pointer;
        text-decoration: underline;
        padding: 0;
        margin-left: 1rem;
      }

      .empty-notifications {
        text-align: center;
        padding: 3rem 0;
        color: #777;
      }

      .empty-notifications p {
        margin-bottom: 1.5rem;
      }

      .empty-notifications .btn {
        display: inline-block;
        background-color: var(--clr-primary);
        color: var(--clr-neutral-900);
        padding: 0.75rem 1.5rem;
        border-radius: 4px;
        text-decoration: none;
        font-weight: var(--fw-medium);
      }

      /* Filter Controls */
      .filter-controls {
        display: flex;
        gap: 1rem;
        margin-bottom: 1.5rem;
      }

      .filter-btn {
        background-color: #f0f0f0;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
      }

      .filter-btn.active {
        background-color: var(--clr-primary);
        color: var(--clr-neutral-900);
      }

      /* Responsive Design */
      @media (max-width: 768px) {
        .notifications-header {
          flex-direction: column;
          align-items: flex-start;
          gap: 1rem;
        }

        .filter-controls {
          flex-wrap: wrap;
        }
      }
    </style>
  </head>
  <body>
    <?php include 'includes/header.php'; ?>
    
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

    <main>
      <div class="notifications-hero">
        <div class="container">
          <h1>Your Notifications</h1>
          <p>Stay updated with your orders, appointments, and special offers</p>
        </div>
      </div>

      <div class="notifications-container">
        <div class="notifications-header">
          <h2>All Notifications</h2>
          <button class="mark-all-read-btn" id="mark-all-read-btn">Mark All as Read</button>
        </div>

        <div class="filter-controls">
          <button class="filter-btn active" data-filter="all">All</button>
          <button class="filter-btn" data-filter="unread">Unread</button>
          <button class="filter-btn" data-filter="orders">Orders</button>
          <button class="filter-btn" data-filter="appointments">Appointments</button>
          <button class="filter-btn" data-filter="promotions">Promotions</button>
        </div>

        <div class="notifications-list" id="notifications-list">
          <!-- Notifications will be dynamically inserted here by JavaScript -->
        </div>

        <!-- Empty state (will be shown when there are no notifications) -->
        <div class="empty-notifications" id="empty-notifications" style="display: none;">
          <p>You don't have any notifications yet.</p>
          <a href="shop.php" class="btn">Browse Our Products</a>
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
            <a href="https://x.com/Shopdress12?t=kadWcD_XQNlPQtizwPtjHQ&s=09" target="_blank" title="Twitter">
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
          <a href="admin-login.php" class="admin-link">Admin/Tailor Login</a>
        </div>
      </div>
    </footer>

    <script src="js/header.js"></script>
    <script type="module" src="data/products.js"></script>
    <script type="module" src="js/shop.js"></script>
    <script type="module" src="data/notifications.js"></script>
    <script type="module" src="js/notifications.js"></script>
    <script type="module" src="js/notifications-page.js"></script>
  </body>
</html>





