<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Contact - Kunozulkhair Tailoring Shop</title>

    <link rel="stylesheet" href="css/shared/footer.css" />
    <link rel="stylesheet" href="css/pages/contact.css" />
    <link rel="stylesheet" href="css/shared/general.css" />
    <link rel="stylesheet" href="css/shared/header.css" />
    <link rel="stylesheet" href="css/shared/reset.css" />
    <link rel="stylesheet" href="css/shared/utils.css" />
    <link rel="stylesheet" href="css/pages/shop.css">
    <link rel="stylesheet" href="css/search.css">
    <link rel="stylesheet" href="css/shared/hero.css">
    <link rel="stylesheet" href="css/pages/services.css">
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
      <section class="hero hero--contact">
        <div class="hero__content container">
          <h1 class="hero__title">Get in Touch</h1>
          <p class="hero__description">
            Have a question or need assistance? We're here to help! Contact us
            for inquiries, custom orders, or any tailoring needs.
          </p>
        </div>
      </section>

      <section class="contact-info">
        <div class="container">
          <div class="contact-info__grid">
            <div class="contact-info__item">
              <h3 class="contact-info__title">📍 Our Address</h3>
              <p class="contact-info__text">Datu Liwa Candao Street, Cotabato City</p>
            </div>
            <div class="contact-info__item">
              <h3 class="contact-info__title">📞 Call Us</h3>
              <p class="contact-info__text">
                <a href="tel:+639363129673">+63 936 312 9673</a>
              </p>
            </div>
            <div class="contact-info__item">
              <h3 class="contact-info__title">📧 Email Us</h3>
              <p class="contact-info__text">
                <a href="mailto:kunozulkhairtailoring@gmail.com"
                  >kunozulkhairtailoring@gmail.com</a
                >
              </p>
            </div>
            <div class="contact-info__item">
              <h3 class="contact-info__title">📱 Follow Us</h3>
              <div class="contact-info__socials">
                <a href="#" aria-label="Facebook">Facebook</a>
                <a href="#" aria-label="Instagram">Instagram</a>
                <a href="#" aria-label="Twitter">Twitter</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="contact-form">
        <div class="container">
          <h2 class="contact-form__title">Get in Touch</h2>
          <p class="contact-form__subtitle">
            Have questions or need a custom order? Send us a message!
          </p>
          <form action="#" method="POST" class="contact-form__form">
            <div class="contact-form__group">
              <label for="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                required
              />
            </div>
            <div class="contact-form__group">
              <label for="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div class="contact-form__group">
              <label for="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Type your message here..."
                rows="5"
                required
              ></textarea>
            </div>
            <button type="submit" class="contact-form__button">
              Send Message
            </button>
          </form>
        </div>
      </section>

      <section class="contact-location">
        <div class="container">
          <h2 class="contact-location__title">Our Location</h2>
          <p class="contact-location__subtitle">
            Visit us in Datu Liwa Candao Street, Cotabato City, Philippines
          </p>
          <div class="contact-location__map">
              <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d223.87600080495332!2d124.2529917248385!3d7.211548033587534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32563a2d44ec4363%3A0xc963d76a9dc44d2d!2sDatu%20Liwa%20Candao%20St%2C%20Cotabato%20City%2C%20Maguindanao!5e1!3m2!1sen!2sph!4v1742522263035!5m2!1sen!2sph"
              width="600"
              height="450"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </section>

      <section class="contact-cta container">
        <div class="contact-cta__content">
          <h2 class="contact-cta__title">Ready to Get Started?</h2>
          <p class="contact-cta__text">
            Have questions or need custom tailoring services? We're here to
            help you bring your fashion vision to life!
          </p>
          <div class="contact-cta__buttons">
            <a href="appointments.php" class="btn btn--primary">Book an Appointment</a>
            <a href="services.php" class="btn btn--secondary">Our Services</a>
          </div>
        </div>
      </section>
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
    <script type="module" src="data/products.js"></script>
    <script type="module" src="js/shop.js"></script>
    <script type="module" src="data/notifications.js"></script>
    <script type="module" src="js/notifications.js"></script>
    <script type="module" src="js/search.js"></script>
    <script src="js/breakpoint-indicator.js"></script>
  </body>
</html>





