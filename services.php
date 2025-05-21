<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Services - Kunozulkhair Tailoring Shop</title>

    <link rel="stylesheet" href="css/shared/footer.css" />
    <link rel="stylesheet" href="css/pages/services.css" />
    <link rel="stylesheet" href="css/shared/general.css" />
    <link rel="stylesheet" href="css/shared/header.css" />
    <link rel="stylesheet" href="css/shared/reset.css" />
    <link rel="stylesheet" href="css/shared/utils.css" />
    <link rel="stylesheet" href="css/cart.css" />
    <link rel="stylesheet" href="css/search.css">
    <link rel="stylesheet" href="css/shared/hero.css">

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
      <section class="hero hero--services">
        <div class="hero__content container">
          <h1 class="hero__title">
            Tailoring Services – Crafted Just for You!
          </h1>
          <p class="hero__description">
            Get high-quality custom dressmaking and alterations
            services tailored to your needs.
          </p>
          <a href="appointments.php" class="hero__btn">Book an Appointment</a>
        </div>
      </section>

      <section class="services-overview container">
        <h2 class="services-overview__title">Our Tailoring Services</h2>
        <div class="services-overview__grid">
          <div class="service-card">
            <img
              src="assets/images/Sample1.png"
              alt="Custom Dressmaking"
              class="service-card__img"
            />
            <h3 class="service-card__title">Custom Dressmaking</h3>
            <p class="service-card__description">
              Get a dress made just for you with the perfect fit and design.
            </p>
            <a href="custom-dressmaking.php" class="service-card__btn"
              >Learn More</a
            >
          </div>

          <div class="service-card">
            <img
              src="assets/images/Sample2.png"
              alt="Alterations & Repairs"
              class="service-card__img"
            />
            <h3 class="service-card__title">Alterations & Repairs</h3>
            <p class="service-card__description">
              Make your old clothes fit perfectly again with our expert
              tailoring.
            </p>
            <a href="alterations-and-repair.php" class="service-card__btn"
              >Learn More</a
            >
          </div>





          <div class="service-card">
            <img
              src="assets/images/Sample4.png"
              alt="Casual & Everyday Dresses"
              class="service-card__img"
            />
            <h3 class="service-card__title">Casual & Everyday Dresses</h3>
            <p class="service-card__description">
              Stay stylish and comfortable every day with our custom-made dresses.
            </p>
            <a href="casual-and-everydaydresses.php" class="service-card__btn"
              >Learn More</a
            >
          </div>
        </div>
      </section>

      <section class="how-it-works container">
        <h2 class="how-it-works__title">How It Works</h2>
        <div class="how-it-works__steps">
          <div class="step-card">
            <div class="step-card__number">1</div>
            <h3 class="step-card__title">Choose Your Service</h3>
            <p class="step-card__description">
              Select from custom dressmaking or alterations services.
            </p>
          </div>

          <div class="step-card">
            <div class="step-card__number">2</div>
            <h3 class="step-card__title">Book an Appointment</h3>
            <p class="step-card__description">
              Schedule a fitting or consultation online or visit our shop.
            </p>
          </div>

          <div class="step-card">
            <div class="step-card__number">3</div>
            <h3 class="step-card__title">Get Your Perfect Fit</h3>
            <p class="step-card__description">
              Our skilled tailors will craft or alter your clothes to
              perfection.
            </p>
          </div>
        </div>
      </section>

      <section class="faq container">
        <h2 class="faq__title">Frequently Asked Questions</h2>
        <div class="faq__list">
          <div class="faq__item">
            <button class="faq__question">
              How long does a custom dress take?
              <span class="faq__icon">+</span>
            </button>
            <div class="faq__answer">
              <p>
                Custom dresses typically take 2-4 weeks, depending on design
                complexity and fabric availability.
              </p>
            </div>
          </div>

          <div class="faq__item">
            <button class="faq__question">
              Do you accept rush orders? <span class="faq__icon">+</span>
            </button>
            <div class="faq__answer">
              <p>
                Yes, we offer rush services for custom dresses for an additional fee. Please
                contact us for availability.
              </p>
            </div>
          </div>

          <div class="faq__item">
            <button class="faq__question">
              Can I bring my own fabric? <span class="faq__icon">+</span>
            </button>
            <div class="faq__answer">
              <p>
                Absolutely! You can bring your own fabric, and our skilled tailor will craft your
                dress accordingly.
              </p>
            </div>
          </div>

          <div class="faq__item">
            <button class="faq__question">
              What types of alterations do you offer?
              <span class="faq__icon">+</span>
            </button>
            <div class="faq__answer">
              <p>
                We offer resizing, hemming, zipper replacements, and other
                alterations to make your dresses fit perfectly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="contact-cta container">
        <div class="contact-cta__content">
          <h2 class="contact-cta__title">Ready to Get Started?</h2>
          <p class="contact-cta__text">
            Have questions or need a custom dress made? Contact our tailor today or book
            an appointment to get started!
          </p>
          <div class="contact-cta__buttons">
            <a href="contact.php" class="btn btn--primary">Contact Us</a>
            <a href="appointments.php" class="btn btn--secondary"
              >Book an Appointment</a
            >
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
    <script src="js/services.js"></script>
    <script type="module" src="data/notifications.js"></script>
    <script type="module" src="js/notifications.js"></script>
    <script type="module" src="js/search.js"></script>
    <script src="js/breakpoint-indicator.js"></script>
    <script type="module" src="data/products.js"></script>
    <script src="js/cart-test.js"></script>
  </body>
</html>





