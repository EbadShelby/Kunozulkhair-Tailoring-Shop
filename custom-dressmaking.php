<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Custom Dressmaking - Kunozulkhair Tailoring Shop</title>
    <link rel="stylesheet" href="css/shared/general.css" />
    <link rel="stylesheet" href="css/shared/header.css" />
    <link rel="stylesheet" href="css/shared/reset.css" />
    <link rel="stylesheet" href="css/shared/utils.css" />
    <link rel="stylesheet" href="css/shared/footer.css" />
    <link rel="stylesheet" href="css/pages/service-detail.css" />
    <link rel="stylesheet" href="css/search.css" />
    <link rel="stylesheet" href="css/shared/hero.css" />
    <link rel="stylesheet" href="css/cart.css" />

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
      <!-- Hero Section -->
      <section class="hero hero--custom-dressmaking">
        <div class="hero__content container">
          <h1 class="hero__title">Custom Dressmaking</h1>
          <p class="hero__description">Experience the luxury of perfectly fitted, one-of-a-kind dresses designed and tailored specifically for you.</p>
        </div>
      </section>

      <!-- Overview Section -->
      <section id="service-overview" class="service-overview container">
        <h2 class="service-overview__title">Our Custom Dressmaking Services</h2>
        <div class="service-overview__content">
          <div class="service-overview__text">
            <p>At Kunozulkhair Tailoring Shop, we pride ourselves on creating bespoke dresses that fit your body perfectly and reflect your personal style.</p>
            <p>Our experienced tailor combines traditional craftsmanship with modern design techniques to create dresses that are uniquely yours.</p>
            <p>Whether you're looking for a special occasion dress, formal evening gown, or everyday dress that fits just right, our custom dressmaking services ensure you'll look and feel your best.</p>
          </div>
          <div class="service-overview__image">
            <img src="assets/images/Peach-Lace-Velvet-Bloom-Dress.jpg" alt="Custom dressmaking process">
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="service-features">
        <div class="container">
          <h2 class="service-features__title">Why Choose Our Custom Dressmaking</h2>
          <div class="service-features__grid">
            <div class="feature-card">
              <svg class="feature-card__icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
              <h3 class="feature-card__title">Perfect Fit</h3>
              <p class="feature-card__description">Dresses designed for your unique body measurements, ensuring comfort and flattering silhouettes.</p>
            </div>
            <div class="feature-card">
              <svg class="feature-card__icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
              </svg>
              <h3 class="feature-card__title">Unique Designs</h3>
              <p class="feature-card__description">Express your personal style with one-of-a-kind designs that you won't find in stores.</p>
            </div>
            <div class="feature-card">
              <svg class="feature-card__icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              <h3 class="feature-card__title">Quality Fabrics</h3>
              <p class="feature-card__description">Choose from our selection of high-quality fabrics or bring your own for a truly personalized creation.</p>
            </div>
            <div class="feature-card">
              <svg class="feature-card__icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <h3 class="feature-card__title">Expert Craftsmanship</h3>
              <p class="feature-card__description">Skilled tailor with years of experience ensuring every detail is perfect from start to finish.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Process Section -->
      <section class="service-process">
        <div class="container">
          <h2 class="service-process__title">Our Dressmaking Process</h2>
          <div class="service-process__steps">
            <div class="process-step">
              <div class="process-step__number">1</div>
              <h3 class="process-step__title">Consultation</h3>
              <p class="process-step__description">Discuss your vision, preferences, style needs, and occasion requirements.</p>
            </div>
            <div class="process-step">
              <div class="process-step__number">2</div>
              <h3 class="process-step__title">Design & Fabric</h3>
              <p class="process-step__description">Create design sketches and select the perfect fabric for your garment.</p>
            </div>
            <div class="process-step">
              <div class="process-step__number">3</div>
              <h3 class="process-step__title">Measurements</h3>
              <p class="process-step__description">Precise body measurements taken to ensure a perfect, custom fit.</p>
            </div>
            <div class="process-step">
              <div class="process-step__number">4</div>
              <h3 class="process-step__title">Fitting</h3>
              <p class="process-step__description">Try on and make adjustments to perfect the fit of your garment.</p>
            </div>
          </div>
        </div>
      </section>



      <!-- Pricing Section -->
      <section class="service-pricing">
        <div class="container">
          <h2 class="service-pricing__title">Our Pricing</h2>
          <table class="service-pricing__table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Description</th>
                <th>Starting Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Simple Dress</td>
                <td>Made-to-measure casual dress in your choice of design and fabric</td>
                <td>₱1,999</td>
              </tr>
              <tr>
                <td>Semi-Formal Dress</td>
                <td>Custom-designed dress for semi-formal occasions</td>
                <td>₱2,199</td>
              </tr>
              <tr>
                <td>Formal Dress</td>
                <td>Custom formal dress for special events</td>
                <td>₱2,499</td>
              </tr>
              <tr>
                <td>Evening Gown</td>
                <td>Elegant evening gown for formal occasions</td>
                <td>₱2,899</td>
              </tr>
              <tr>
                <td>Luxury Gown</td>
                <td>Premium evening gown with detailed embellishments</td>
                <td>₱3,499</td>
              </tr>
              <tr>
                <td>Design Consultation</td>
                <td>Professional styling and design advice</td>
                <td>₱300</td>
              </tr>
            </tbody>
          </table>
          <p style="text-align: center; margin-top: 20px; font-style: italic;">* Prices may vary based on design complexity, fabric selection, and embellishments.</p>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="service-faq">
        <div class="container">
          <h2 class="service-faq__title">Frequently Asked Questions</h2>
          <div class="service-faq__list">
            <div class="faq-item">
              <button class="faq-question">
                How long does the custom dressmaking process take?
                <span class="faq-icon">+</span>
              </button>
              <div class="faq-answer">
                <p>The timeline for custom dressmaking typically ranges from 2-4 weeks, depending on the complexity of the design, fabric availability, and our current workload. For rush orders or special occasions, please consult with us in advance to ensure we can accommodate your timeline.</p>
              </div>
            </div>
            <div class="faq-item">
              <button class="faq-question">
                Can I bring my own fabric?
                <span class="faq-icon">+</span>
              </button>
              <div class="faq-answer">
                <p>Absolutely! You're welcome to bring your own fabric. We'll advise you on the amount needed based on your design. If you're unsure about fabric selection, we're happy to provide guidance on suitable fabric types for your specific garment.</p>
              </div>
            </div>
            <div class="faq-item">
              <button class="faq-question">
                How many fittings are typically required?
                <span class="faq-icon">+</span>
              </button>
              <div class="faq-answer">
                <p>Most dresses require 2-3 fittings: an initial fitting after the basic construction, a second fitting for fine-tuning, and sometimes a final fitting to ensure everything is perfect. Complex designs or formal dresses may require additional fittings.</p>
              </div>
            </div>
            <div class="faq-item">
              <button class="faq-question">
                Can you copy a design from a photo or magazine?
                <span class="faq-icon">+</span>
              </button>
              <div class="faq-answer">
                <p>Yes, we can create dresses inspired by designs you've seen in photos, magazines, or online. Our tailor will discuss any modifications needed to ensure the design flatters your body type and meets your specific needs.</p>
              </div>
            </div>
            <div class="faq-item">
              <button class="faq-question">
                Do you offer design advice?
                <span class="faq-icon">+</span>
              </button>
              <div class="faq-answer">
                <p>Yes! Our professional tailor can provide advice on styles, silhouettes, fabrics, and details that will best suit your body type, personal style, and the occasion. We're here to help you create a dress you'll love to wear.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="service-cta">
        <div class="container">
          <h2 class="service-cta__title">Ready for a Custom-Made Dress?</h2>
          <p class="service-cta__text">Book an appointment with our expert tailor today and start creating your perfect, made-to-measure dress.</p>
          <a href="appointments.php" class="service-cta__btn">Schedule a Consultation</a>
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
    <script src="js/service-detail.js"></script>
    <script type="module" src="data/notifications.js"></script>
    <script type="module" src="js/notifications.js"></script>
    <script type="module" src="js/search.js"></script>
    <script src="js/breakpoint-indicator.js"></script>
    <script type="module" src="data/products.js"></script>
    <script src="js/cart-test.js"></script>
  </body>
</html>





