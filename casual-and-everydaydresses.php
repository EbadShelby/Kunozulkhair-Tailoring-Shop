<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Casual & Everyday Dresses - Kunozulkhair Tailoring Shop</title>
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
      <section class="hero hero--casual">
        <div class="hero__content container">
          <h1 class="hero__title">Casual & Everyday Dresses</h1>
          <p class="hero__description">Stylish, comfortable, and versatile dresses for your everyday wardrobe, designed to fit perfectly and suit your lifestyle.</p>
        </div>
      </section>

      <!-- Overview Section -->
      <section id="service-overview" class="service-overview container">
        <h2 class="service-overview__title">Our Casual Dressmaking Services</h2>
        <div class="service-overview__content">
          <div class="service-overview__text">
            <p>At Kunozulkhair Tailoring Shop, we create comfortable yet stylish casual dresses that are perfect for everyday wear, from office to leisure activities.</p>
            <p>Our skilled tailor crafts casual dresses that fit your unique body shape, ensuring both comfort and style without compromising on quality or durability.</p>
            <p>Whether you need versatile dresses for work, weekend outings, or casual gatherings, our everyday dress collection offers practical, comfortable options that adapt to your lifestyle.</p>
          </div>
          <div class="service-overview__image">
            <img src="assets/images/Rose-Whisper-Dress.jpg" alt="Casual dress designs">
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="service-features">
        <div class="container">
          <h2 class="service-features__title">Why Choose Our Casual Dresses</h2>
          <div class="service-features__grid">
            <div class="feature-card">
              <svg class="feature-card__icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <h3 class="feature-card__title">Comfort-First Design</h3>
              <p class="feature-card__description">Easy-to-wear dresses that prioritize comfort without sacrificing style for your everyday activities.</p>
            </div>
            <div class="feature-card">
              <svg class="feature-card__icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <h3 class="feature-card__title">Versatile Styles</h3>
              <p class="feature-card__description">Adaptable designs that transition seamlessly from casual to semi-formal occasions.</p>
            </div>
            <div class="feature-card">
              <svg class="feature-card__icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <h3 class="feature-card__title">Durable Materials</h3>
              <p class="feature-card__description">Quality fabrics selected for everyday wear and easy maintenance.</p>
            </div>
            <div class="feature-card">
              <svg class="feature-card__icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <h3 class="feature-card__title">Customizable Options</h3>
              <p class="feature-card__description">Personalize necklines, sleeves, lengths, and details to suit your personal style.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Process Section -->
      <section class="service-process">
        <div class="container">
          <h2 class="service-process__title">Our Casual Dress Creation Process</h2>
          <div class="service-process__steps">
            <div class="process-step">
              <div class="process-step__number">1</div>
              <h3 class="process-step__title">Style Consultation</h3>
              <p class="process-step__description">Discuss your lifestyle, preferences, and wardrobe needs with our style experts.</p>
            </div>
            <div class="process-step">
              <div class="process-step__number">2</div>
              <h3 class="process-step__title">Design Selection</h3>
              <p class="process-step__description">Choose from our dress designs or customize your own with our guidance.</p>
            </div>
            <div class="process-step">
              <div class="process-step__number">3</div>
              <h3 class="process-step__title">Measurements</h3>
              <p class="process-step__description">Precise measurements taken to ensure your dress fits perfectly.</p>
            </div>
            <div class="process-step">
              <div class="process-step__number">4</div>
              <h3 class="process-step__title">Fitting & Delivery</h3>
              <p class="process-step__description">Final fitting to ensure comfort and proper fit before delivery.</p>
            </div>
          </div>
        </div>
      </section>



      <!-- Pricing Section -->
      <section class="service-pricing">
        <div class="container">
          <h2 class="service-pricing__title">Casual Dress Pricing</h2>
          <table class="service-pricing__table">
            <thead>
              <tr>
                <th>Style</th>
                <th>Description</th>
                <th>Starting Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Simple A-line Dress</td>
                <td>Versatile, flattering silhouette for everyday wear</td>
                <td>₱1,299</td>
              </tr>
              <tr>
                <td>Shift Dress</td>
                <td>Comfortable, straight-cut dress for work or casual events</td>
                <td>₱1,199</td>
              </tr>
              <tr>
                <td>Wrap Dress</td>
                <td>Adjustable fit, flattering for all body types</td>
                <td>₱1,249</td>
              </tr>
              <tr>
                <td>Shirt Dress</td>
                <td>Classic button-down style, versatile for office or casual wear</td>
                <td>₱1,349</td>
              </tr>
              <tr>
                <td>Casual Maxi Dress</td>
                <td>Floor-length comfort for elegant everyday style</td>
                <td>₱1,599</td>
              </tr>
              <tr>
                <td>Custom Design</td>
                <td>Your unique design with personalized details</td>
                <td>₱1,999+</td>
              </tr>
            </tbody>
          </table>
          <p style="text-align: center; margin-top: 20px; font-style: italic;">* Prices vary based on design complexity, fabric choice, and additional details. Quantity discounts available.</p>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="service-faq">
        <div class="container">
          <h2 class="service-faq__title">Frequently Asked Questions</h2>
          <div class="service-faq__list">
            <div class="faq-item">
              <button class="faq-question">
                How long does it take to make a casual dress?
                <span class="faq-icon">+</span>
              </button>
              <div class="faq-answer">
                <p>Most casual dresses take 1-2 weeks to complete from consultation to final delivery. Simple designs may be completed faster, while more complex styles might require additional time. We'll provide you with a specific timeline during your consultation.</p>
              </div>
            </div>
            <div class="faq-item">
              <button class="faq-question">
                Can I wash my custom casual dresses at home?
                <span class="faq-icon">+</span>
              </button>
              <div class="faq-answer">
                <p>Yes! We select fabrics for our casual dresses that are easy to care for. Most can be machine washed on a gentle cycle with mild detergent. We'll provide specific care instructions for your garment based on the fabric and design details.</p>
              </div>
            </div>
            <div class="faq-item">
              <button class="faq-question">
                Do you offer ready-made casual dresses or only custom-made?
                <span class="faq-icon">+</span>
              </button>
              <div class="faq-answer">
                <p>We offer both options. We have a selection of ready-made casual dresses in our shop in standard sizes that you can purchase immediately. We also provide fully custom dresses tailored to your measurements and style preferences.</p>
              </div>
            </div>
            <div class="faq-item">
              <button class="faq-question">
                Can I bring pictures of styles I like?
                <span class="faq-icon">+</span>
              </button>
              <div class="faq-answer">
                <p>Absolutely! We encourage you to bring pictures from magazines, social media, or websites that show styles you like. Our tailor can use these as inspiration to create a dress that captures the elements you love while ensuring it's perfectly fitted to you.</p>
              </div>
            </div>
            <div class="faq-item">
              <button class="faq-question">
                Do you offer adjustments after the dress is made?
                <span class="faq-icon">+</span>
              </button>
              <div class="faq-answer">
                <p>Yes, we provide minor adjustments within 14 days of delivery at no extra cost. We want to ensure your dress fits perfectly and you're completely satisfied with your purchase.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="service-cta">
        <div class="container">
          <h2 class="service-cta__title">Ready for Your Perfect Everyday Dress?</h2>
          <p class="service-cta__text">Schedule an appointment with our expert tailor to create comfortable, flattering casual dresses tailored just for you.</p>
          <a href="appointments.php" class="service-cta__btn">Book Your Consultation</a>
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

    <script src="js/header.js"></script>
    <script src="js/cart.js"></script>
    <script src="js/service-detail.js"></script>
    <script type="module" src="data/notifications.js"></script>
    <script type="module" src="js/notifications.js"></script>
    <script type="module" src="js/search.js"></script>
    <script src="js/breakpoint-indicator.js"></script>
    <script type="module" src="data/products.js"></script>
    <script type="module" src="data/cart.js"></script>
  </body>
</html>





