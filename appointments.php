<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Appointments - Kunozulkhair Tailoring Shop</title>
    <link rel="stylesheet" href="css/shared/general.css" />
    <link rel="stylesheet" href="css/shared/header.css" />
    <link rel="stylesheet" href="css/shared/reset.css" />
    <link rel="stylesheet" href="css/shared/utils.css" />
    <link rel="stylesheet" href="css/pages/shop.css">
    <link rel="stylesheet" href="css/pages/appointment.css">
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
      <section class="hero hero--appointments">
        <div class="hero__content container">
          <h1 class="hero__title">Book Your Tailoring Appointment</h1>
          <p class="hero__description">Schedule a visit with our expert tailors to discuss your custom clothing needs</p>
        </div>
      </section>

      <div class="appointment-container container">
        <!-- Appointment Flow Steps -->
        <div class="appointment-steps">
          <div class="step active" data-step="1">
            <div class="step-number">1</div>
            <div class="step-title">Service Selection</div>
          </div>
          <div class="step" data-step="2">
            <div class="step-number">2</div>
            <div class="step-title">Date & Time</div>
          </div>
          <div class="step" data-step="3">
            <div class="step-number">3</div>
            <div class="step-title">Your Details</div>
          </div>
          <div class="step" data-step="4">
            <div class="step-number">4</div>
            <div class="step-title">Measurements</div>
          </div>
          <div class="step" data-step="5">
            <div class="step-number">5</div>
            <div class="step-title">Confirmation</div>
          </div>
        </div>

        <!-- Multi-step Form -->
          <form class="appointment-form" id="appointment-form">
          <!-- Step 1: Service Selection -->
          <div class="form-step active" id="step-1">
            <h2>Select Your Service</h2>

            <div class="service-cards">
              <div class="service-card">
                <div class="service-icon">
                  <img src="assets/images/icons/custom-dress.svg" alt="Custom Dressmaking" onerror="this.src='assets/images/logo.jpg'">
                </div>
                <h3>Custom Dressmaking</h3>
                <p>From concept to creation, we'll craft your dream outfit</p>
                <label class="service-select">
                  <input type="radio" name="service" value="custom-dressmaking" required>
                  <span class="checkmark"></span>
                  <span>Select</span>
                </label>
              </div>

              <div class="service-card">
                <div class="service-icon">
                  <img src="assets/images/icons/alterations.svg" alt="Alterations" onerror="this.src='assets/images/logo.jpg'">
                </div>
                <h3>Alterations & Repairs</h3>
                <p>Perfect fit adjustments and skilled clothing repairs</p>
                <label class="service-select">
                  <input type="radio" name="service" value="alterations">
                  <span class="checkmark"></span>
                  <span>Select</span>
                </label>
              </div>





              <div class="service-card">
                <div class="service-icon">
                  <img src="assets/images/icons/casual.svg" alt="Casual Wear" onerror="this.src='assets/images/logo.jpg'">
                </div>
                <h3>Casual & Everyday Dresses</h3>
                <p>Comfortable and stylish everyday clothing options</p>
                <label class="service-select">
                  <input type="radio" name="service" value="casual">
                  <span class="checkmark"></span>
                  <span>Select</span>
                </label>
              </div>
            </div>

            <div class="appointment-consultation">
              <h3>Not sure what you need?</h3>
              <p>Book a free consultation with our expert tailors</p>
              <label class="consultation-select">
                <input type="radio" name="service" value="consultation">
                <span>Book Consultation</span>
              </label>
            </div>

            <div class="form-buttons">
              <button type="button" class="next-btn">Continue</button>
            </div>
          </div>

          <!-- Step 2: Date & Time Selection -->
          <div class="form-step" id="step-2">
            <h2>Choose Date & Time</h2>

            <div class="calendar-section">
              <div class="calendar-container" id="appointment-calendar">
                <!-- Calendar will be rendered by JavaScript -->
              </div>

              <div class="timeslots-container">
                <h3>Available Time Slots</h3>
                <p class="selected-date">Please select a date first</p>

                <div class="timeslots" id="available-timeslots">
                  <!-- Time slots will be populated by JavaScript -->
                  <div class="timeslot-placeholder">Select a date to see available times</div>
                </div>
              </div>
            </div>

            <input type="hidden" name="appointment_date" id="appointment_date">
            <input type="hidden" name="appointment_time" id="appointment_time">

            <div class="form-buttons">
              <button type="button" class="prev-btn">Previous</button>
              <button type="button" class="next-btn">Continue</button>
            </div>
          </div>

          <!-- Step 3: Personal Details -->
          <div class="form-step" id="step-3">
            <h2>Your Contact Information</h2>

            <div class="form-row">
              <div class="form-group">
            <label for="name">Full Name:</label>
                <input type="text" id="name" name="name" placeholder="Enter your full name" required>
              </div>
            </div>

            <div class="form-row two-columns">
              <div class="form-group">
            <label for="email">Email Address:</label>
                <input type="email" id="email" name="email" placeholder="Enter your email address" required>
              </div>

              <div class="form-group">
              <label for="phone">Phone Number:</label>
                <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" required>
              </div>
            </div>

            <div class="form-group">
              <label for="address">Address (optional):</label>
              <input type="text" id="address" name="address" placeholder="Enter your address">
            </div>

            <div class="form-group">
              <label for="garment_description">Please describe what you need:</label>
              <textarea id="garment_description" name="garment_description" rows="4" placeholder="Describe your garment requirements, style preferences, or any specific details you'd like to discuss..."></textarea>
            </div>

            <div class="form-group">
              <label for="reference_images">Reference Images (optional):</label>
              <div class="file-upload">
                <input type="file" id="reference_images" name="reference_images" multiple accept="image/*">
                <div class="upload-label">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                  <span>Upload Images</span>
                </div>
              </div>
              <div id="file-preview" class="file-preview"></div>
            </div>

            <div class="form-buttons">
              <button type="button" class="prev-btn">Previous</button>
              <button type="button" class="next-btn">Continue</button>
            </div>
          </div>

          <!-- Step 4: Measurements -->
          <div class="form-step" id="step-4">
            <h2>Measurements</h2>
            <p class="measurements-info">Please provide your measurements if available. Don't worry if you're unsure – our tailors can take your measurements during your appointment.</p>

            <div class="measurement-toggle">
              <label class="toggle-label">
                <input type="checkbox" id="provide-measurements" name="provide_measurements">
                <span class="toggle-text">I want to provide my measurements now</span>
              </label>
            </div>

            <div class="measurements-container" id="measurements-fields" style="display: none;">
              <div class="measurement-section">
                <h3>Upper Body</h3>
                <div class="measurement-grid">
                  <div class="measurement-field">
                    <label for="measurement_chest">Chest (inches):</label>
                    <input type="number" id="measurement_chest" name="measurement_chest" step="0.25" min="20" max="70">
                  </div>
                  <div class="measurement-field">
                    <label for="measurement_waist">Waist (inches):</label>
                    <input type="number" id="measurement_waist" name="measurement_waist" step="0.25" min="20" max="70">
                  </div>
                  <div class="measurement-field">
                    <label for="measurement_hip">Hip (inches):</label>
                    <input type="number" id="measurement_hip" name="measurement_hip" step="0.25" min="20" max="70">
                  </div>
                  <div class="measurement-field">
                    <label for="measurement_shoulder">Shoulder Width (inches):</label>
                    <input type="number" id="measurement_shoulder" name="measurement_shoulder" step="0.25" min="10" max="30">
                  </div>
                  <div class="measurement-field">
                    <label for="measurement_sleeve">Sleeve Length (inches):</label>
                    <input type="number" id="measurement_sleeve" name="measurement_sleeve" step="0.25" min="15" max="40">
                  </div>
                </div>
              </div>

              <div class="measurement-section">
                <h3>Lower Body</h3>
                <div class="measurement-grid">
                  <div class="measurement-field">
                    <label for="measurement_inseam">Inseam (inches):</label>
                    <input type="number" id="measurement_inseam" name="measurement_inseam" step="0.25" min="20" max="40">
                  </div>
                  <div class="measurement-field">
                    <label for="measurement_outseam">Outseam (inches):</label>
                    <input type="number" id="measurement_outseam" name="measurement_outseam" step="0.25" min="25" max="50">
                  </div>
                  <div class="measurement-field">
                    <label for="measurement_thigh">Thigh (inches):</label>
                    <input type="number" id="measurement_thigh" name="measurement_thigh" step="0.25" min="15" max="40">
                  </div>
                </div>
              </div>

              <div class="measurement-guide">
                <h4>Not sure how to measure?</h4>
                <a href="#" class="measurement-guide-link" id="show-measurement-guide">View Measurement Guide</a>
              </div>
            </div>



            <div class="form-buttons">
              <button type="button" class="prev-btn">Previous</button>
              <button type="button" class="next-btn">Continue</button>
            </div>
          </div>

          <!-- Step 5: Confirmation -->
          <div class="form-step" id="step-5">
            <h2>Appointment Summary</h2>

            <div class="appointment-summary">
              <div class="summary-section">
                <h3>Service</h3>
                <p id="summary-service">Custom Dressmaking</p>
              </div>

              <div class="summary-section">
                <h3>Date & Time</h3>
                <p id="summary-datetime">May 15, 2023 at 10:30 AM</p>
              </div>

              <div class="summary-section">
                <h3>Your Information</h3>
                <p id="summary-name">John Doe</p>
                <p id="summary-email">john@example.com</p>
                <p id="summary-phone">(123) 456-7890</p>
              </div>

              <div class="summary-section">
                <h3>Your Request</h3>
                <p id="summary-description">Custom wedding dress with lace details...</p>
              </div>
            </div>

            <div class="appointment-policies">
              <h3>Appointment Policies</h3>
              <div class="policy-item">
                <strong>Cancellation Policy:</strong> Please notify us at least 24 hours in advance to cancel or reschedule your appointment.
              </div>
              <div class="policy-item">
                <strong>Consultation Fee:</strong> Initial consultations are free. Measurement services are ₱300, which will be credited toward your order.
              </div>


              <div class="consent-checkbox">
                <input type="checkbox" id="policy-agreement" name="policy_agreement" required>
                <label for="policy-agreement">I agree to the appointment policies and terms of service</label>
              </div>
            </div>

            <div class="form-buttons">
              <button type="button" class="prev-btn">Previous</button>
              <button type="submit" class="submit-btn">Confirm Appointment</button>
            </div>
          </div>
          </form>

        <!-- Appointment Success Message (Hidden by default) -->
        <div class="appointment-success" style="display: none;">
          <div class="success-icon">✓</div>
          <h2>Appointment Booked Successfully!</h2>
          <p>We've sent a confirmation email to <span id="confirmation-email">your email</span></p>
          <div class="appointment-details">
            <div class="detail-item">
              <strong>Appointment ID:</strong> <span id="appointment-id">AP12345</span>
            </div>
            <div class="detail-item">
              <strong>Date & Time:</strong> <span id="appointment-datetime">May 15, 2023 at 10:30 AM</span>
            </div>
            <div class="detail-item">
              <strong>Service:</strong> <span id="appointment-service">Custom Dressmaking</span>
            </div>
          </div>
          <div class="success-actions">
            <a href="appointments.php" class="btn">Book Another Appointment</a>
            <a href="index.php" class="btn secondary">Return to Home</a>
          </div>
        </div>
      </div>

      <!-- Measurement Guide Modal -->
      <div class="modal" id="measurement-modal">
        <div class="modal-content">
          <span class="close-modal">&times;</span>
          <h2>How to Take Your Measurements</h2>
          <div class="measurement-guide-content">
            <div class="measurement-item">
              <h3>Chest/Bust</h3>
              <p>Measure around the fullest part of your chest/bust, keeping the tape parallel to the floor.</p>
              <img src="assets/images/measurement-chest.jpg" alt="Chest measurement" class="measurement-img">
            </div>

            <div class="measurement-item">
              <h3>Waist</h3>
              <p>Measure around your natural waistline, keeping the tape comfortably loose.</p>
              <img src="assets/images/measurement-waist.jpg" alt="Waist measurement" class="measurement-img">
            </div>

            <div class="measurement-item">
              <h3>Hip</h3>
              <p>Measure around the fullest part of your hips, keeping the tape parallel to the floor.</p>
              <img src="assets/images/measurement-hip.jpg" alt="Hip measurement" class="measurement-img">
            </div>

            <!-- More measurement instructions can be added here -->
          </div>
        </div>
      </div>

      <!-- View Previous Appointments Section -->
      <div class="previous-appointments container">
        <h2>Your Previous Appointments</h2>
        <p class="login-prompt">Please <a href="login-form.php">login</a> to view your appointment history</p>

        <!-- This section would be shown when logged in -->
        <div class="appointments-list" style="display: none;">
          <!-- Appointment cards would be populated here -->
        </div>
      </div>
    </main>
    <footer class="site-footer">
      <div class="container footer-grid">
        <!-- Contact Info -->
        <div class="footer-section">
          <h3>Contact Us</h3>
          <p>📍 Datu Liwa Candao Street, Cotabato City</p>
          <p>📞 +63 936 312 9673</p>
          <p>📧 kunozulkhairtailoring@gmail.com</p>
          <p>⏰ Mon-Sat: 9am-6pm, Sun: Close</p>
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
    <script type="module" src="data/products.js"></script>
    <script type="module" src="data/cart.js"></script>
    <script src="js/appointment.js"></script>
    <script type="module" src="data/notifications.js"></script>
    <script type="module" src="js/notifications.js"></script>
    <script type="module" src="js/search.js"></script>
    <script src="js/breakpoint-indicator.js"></script>
  </body>
</html>





