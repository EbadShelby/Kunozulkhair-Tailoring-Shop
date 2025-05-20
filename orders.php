<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Orders - Kunozulkhair Tailoring Shop</title>
    <link rel="stylesheet" href="css/shared/general.css" />
    <link rel="stylesheet" href="css/shared/header.css" />
    <link rel="stylesheet" href="css/shared/reset.css" />
    <link rel="stylesheet" href="css/shared/utils.css" />
    <link rel="stylesheet" href="css/pages/shop.css">
    <link rel="stylesheet" href="css/pages/orders.css">
    <link rel="stylesheet" href="css/shared/footer.css">
    <link rel="stylesheet" href="css/search.css">
    <link rel="stylesheet" href="css/shared/hero.css">
    <link rel="stylesheet" href="css/cart.css">

    <!-- linked google fonts  -->
    <link
      href="https://fonts.googleapis.com/css2?family=Baskervville:ital@0;1&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
      rel="stylesheet"
    />

    <link rel="icon" href="assets/images/logo.jpg" type="image/png">
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
      <section class="hero hero--orders">
        <div class="hero__content container">
          <h1 class="hero__title">Your Orders</h1>
          <p class="hero__description">Track the status of your orders and view order history</p>
        </div>
      </section>

      <div class="orders-container container">
        <!-- Login prompt for non-logged-in users -->
        <div class="login-prompt" id="login-prompt">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
          <h2>Login to View Your Orders</h2>
          <p>Please log in to view your order history and track current orders.</p>
          <a href="login-form.php" class="login-btn">Login</a>
          <p class="register-prompt">Don't have an account? <a href="login-form.php?signup=true">Register here</a></p>
        </div>

        <!-- Orders dashboard (displayed after login) -->
        <div class="orders-dashboard" id="orders-dashboard" style="display: none;">
          <!-- Orders stats -->
          <div class="orders-stats">
            <div class="stat-card">
              <div class="stat-number">3</div>
              <div class="stat-label">Active Orders</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">2</div>
              <div class="stat-label">Ready for Pickup</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">0</div>
              <div class="stat-label">Pending Approval</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">12</div>
              <div class="stat-label">Completed Orders</div>
            </div>
          </div>

          <!-- Order filters and search -->
          <div class="orders-controls">
            <div class="orders-search">
              <input type="text" id="order-search" placeholder="Search by order ID or item name">
              <button type="button" id="search-btn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>
            </div>

            <div class="orders-filters">
              <div class="filter">
                <label for="filter-status">Status:</label>
                <select id="filter-status">
                  <option value="all">All Statuses</option>
                  <option value="processing">Processing</option>
                  <option value="ready">Ready for Pickup</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div class="filter">
                <label for="filter-date">Time Period:</label>
                <select id="filter-date">
                  <option value="all">All Time</option>
                  <option value="30">Last 30 Days</option>
                  <option value="90">Last 90 Days</option>
                  <option value="365">Last Year</option>
                </select>
              </div>

              <div class="filter">
                <label for="filter-type">Order Type:</label>
                <select id="filter-type">
                  <option value="all">All Types</option>
                  <option value="product">Product Purchase</option>
                  <option value="custom">Custom Order</option>
                  <option value="alteration">Alteration</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Orders table -->
          <div class="orders-table-container">
            <table class="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr data-order-id="ORD-10045">
                  <td>ORD-10045</td>
                  <td>July 15, 2023</td>
                  <td>Peach Lace Velvet Bloom Dress</td>
                  <td>₱2,899.00</td>
                  <td><span class="status-badge status-processing">In Progress</span></td>
                  <td>
                    <button class="view-order-btn" data-order-id="ORD-10045">View Details</button>
                  </td>
                </tr>
                <tr data-order-id="ORD-10038">
                  <td>ORD-10038</td>
                  <td>July 10, 2023</td>
                  <td>Duchess Blue Ballgown</td>
                  <td>₱2,499.00</td>
                  <td><span class="status-badge status-ready">Ready for Pickup</span></td>
                  <td>
                    <button class="view-order-btn" data-order-id="ORD-10038">View Details</button>
                  </td>
                </tr>
                <tr data-order-id="ORD-10032">
                  <td>ORD-10032</td>
                  <td>July 5, 2023</td>
                  <td>Lavender Whisper Dress (Alteration)</td>
                  <td>₱1,200.00</td>
                  <td><span class="status-badge status-ready">Ready for Pickup</span></td>
                  <td>
                    <button class="view-order-btn" data-order-id="ORD-10032">View Details</button>
                  </td>
                </tr>
                <tr data-order-id="ORD-10025">
                  <td>ORD-10025</td>
                  <td>June 28, 2023</td>
                  <td>Emerald Bloom Dress</td>
                  <td>₱1,899.00</td>
                  <td><span class="status-badge status-processing">Fitting Stage</span></td>
                  <td>
                    <button class="view-order-btn" data-order-id="ORD-10025">View Details</button>
                  </td>
                </tr>
                <tr data-order-id="ORD-10018">
                  <td>ORD-10018</td>
                  <td>June 15, 2023</td>
                  <td>Verdant Belted Dress, Rose Whisper Dress</td>
                  <td>₱2,548.00</td>
                  <td><span class="status-badge status-completed">Completed</span></td>
                  <td>
                    <button class="view-order-btn" data-order-id="ORD-10018">View Details</button>
                  </td>
                </tr>
                <tr data-order-id="ORD-10010">
                  <td>ORD-10010</td>
                  <td>June 2, 2023</td>
                  <td>Crimson Bloom Dress</td>
                  <td>₱1,799.00</td>
                  <td><span class="status-badge status-completed">Completed</span></td>
                  <td>
                    <button class="view-order-btn" data-order-id="ORD-10010">View Details</button>
                  </td>
                </tr>
                <tr data-order-id="ORD-9985">
                  <td>ORD-9985</td>
                  <td>May 20, 2023</td>
                  <td>Watercolor Garden Dress (Alteration)</td>
                  <td>₱1,200.00</td>
                  <td><span class="status-badge status-cancelled">Cancelled</span></td>
                  <td>
                    <button class="view-order-btn" data-order-id="ORD-9985">View Details</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="orders-pagination">
            <button class="pagination-btn" disabled>&laquo; Previous</button>
            <div class="page-numbers">
              <button class="page-number active">1</button>
              <button class="page-number">2</button>
              <button class="page-number">3</button>
            </div>
            <button class="pagination-btn">Next &raquo;</button>
          </div>
        </div>

        <!-- Order detail modal -->
        <div class="order-detail-modal" id="order-detail-modal">
          <div class="modal-content">
            <div class="modal-header">
              <h2>Order Details <span id="detail-order-id">ORD-10045</span></h2>
              <button class="close-modal">&times;</button>
            </div>

            <div class="modal-body">
              <div class="order-progress">
                <div class="progress-step completed">
                  <div class="step-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                  </div>
                  <div class="step-label">Order Placed</div>
                  <div class="step-date">July 15, 2023</div>
                </div>
                <div class="progress-step completed">
                  <div class="step-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </div>
                  <div class="step-label">Order Confirmed</div>
                  <div class="step-date">July 16, 2023</div>
                </div>
                <div class="progress-step active">
                  <div class="step-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
                    </svg>
                  </div>
                  <div class="step-label">In Production</div>
                  <div class="step-date">July 18, 2023</div>
                </div>
                <div class="progress-step">
                  <div class="step-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
                    </svg>
                  </div>
                  <div class="step-label">Ready for Fitting</div>
                  <div class="step-date">Expected: Aug 5, 2023</div>
                </div>
                <div class="progress-step">
                  <div class="step-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                    </svg>
                  </div>
                  <div class="step-label">Completed</div>
                  <div class="step-date">Expected: Aug 15, 2023</div>
                </div>
              </div>

              <div class="order-info-grid">
                <div class="order-info-section">
                  <h3>Order Information</h3>
                  <div class="info-row">
                    <div class="info-label">Order Date:</div>
                    <div class="info-value">July 15, 2023</div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">Order Type:</div>
                    <div class="info-value">Custom Order</div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">Payment Method:</div>
                    <div class="info-value">Credit Card (Visa ending in 4567)</div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">Estimated Completion:</div>
                    <div class="info-value">August 15, 2023</div>
                  </div>
                </div>

                <div class="order-info-section">
                  <h3>Contact Information</h3>
                  <div class="info-row">
                    <div class="info-label">Name:</div>
                    <div class="info-value">Maria Santos</div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">Email:</div>
                    <div class="info-value">maria.santos@example.com</div>
                  </div>
                  <div class="info-row">
                    <div class="info-label">Phone:</div>
                    <div class="info-value">+63 912 345 6789</div>
                  </div>
                </div>
              </div>

              <div class="order-items">
                <h3>Order Items</h3>
                <div class="order-item">
                  <div class="item-image">
                    <img src="assets/images/Peach-Lace-Velvet-Bloom-Dress.jpg" alt="Peach Lace Velvet Bloom Dress">
                  </div>
                  <div class="item-details">
                    <h4>Peach Lace Velvet Bloom Dress</h4>
                    <p class="item-description">Exquisite peach-colored gown with delicate lace and velvet details, perfect for weddings, galas, and luxury formal events.</p>
                    <div class="item-specifics">
                      <div class="item-specific">
                        <span class="specific-label">Fabric:</span>
                        <span class="specific-value">Silk</span>
                      </div>
                      <div class="item-specific">
                        <span class="specific-label">Color:</span>
                        <span class="specific-value">Pink</span>
                      </div>
                      <div class="item-specific">
                        <span class="specific-label">Customizations:</span>
                        <span class="specific-value">Extended train, Custom beading</span>
                      </div>
                    </div>
                  </div>
                  <div class="item-price">
                    <div class="price">₱2,899.00</div>
                    <div class="quantity">Qty: 1</div>
                  </div>
                </div>
              </div>

              <div class="order-summary">
                <h3>Order Summary</h3>
                <div class="summary-row">
                  <div class="summary-label">Subtotal:</div>
                  <div class="summary-value">₱2,899.00</div>
                </div>
                <div class="summary-row">
                  <div class="summary-label">Deposit Paid:</div>
                  <div class="summary-value">₱1,450.00</div>
                </div>
                <div class="summary-row">
                  <div class="summary-label">Balance Due:</div>
                  <div class="summary-value">₱1,449.00</div>
                </div>
                <div class="summary-row total">
                  <div class="summary-label">Total:</div>
                  <div class="summary-value">₱2,899.00</div>
                </div>
              </div>

              <div class="order-upcoming-events">
                <h3>Upcoming Events</h3>
                <div class="event">
                  <div class="event-date">August 5, 2023</div>
                  <div class="event-name">First Fitting Appointment</div>
                  <div class="event-time">2:00 PM</div>
                </div>
              </div>

              <div class="order-actions">
                <button class="action-btn schedule-btn">Schedule Fitting</button>
                <button class="action-btn contact-btn">Contact Tailor</button>
                <button class="action-btn cancel-btn">Request Changes</button>
              </div>
            </div>
          </div>
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
    <script src="js/cart.js"></script>
    <script src="js/orders.js"></script>
    <script type="module" src="data/products.js"></script>
    <script type="module" src="data/cart.js"></script>
    <script type="module" src="data/notifications.js"></script>
    <script type="module" src="js/notifications.js"></script>
    <script type="module" src="js/search.js"></script>
    <script src="js/breakpoint-indicator.js"></script>
  </body>
</html>





