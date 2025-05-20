<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Alterations & Repairs - Kunozulkhair Tailoring Shop</title>
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
      <section class="hero hero--alterations">
        <div class="hero__content container">
          <h1 class="hero__title">Dress Alterations & Repairs</h1>
          <p class="hero__description">Give your favorite dresses new life with our expert alterations and repair services.</p>
        </div>
      </section>

      <!-- Overview Section -->
      <section id="service-overview" class="service-overview container">
        <h2 class="service-overview__title">Expert Dress Alterations & Repairs</h2>
        <div class="service-overview__content">
          <div class="service-overview__text">
            <p>At Kunozulkhair Tailoring Shop, we understand that dresses aren't just about fashion—they're about fit, comfort, and preserving your favorite pieces.</p>
            <p>Our skilled tailor specializes in precise alterations to ensure your dresses fit perfectly, as well as expert repairs that extend the life of your wardrobe investments.</p>
            <p>From simple hemming and zipper replacements to complex resizing and structural repairs, we have the expertise to handle any dress alteration or repair need with meticulous attention to detail.</p>
          </div>
          <div class="service-overview__image">
            <img src="assets/images/Lavender-Whisper-Dress.jpg" alt="Dress alterations and repairs">
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="service-features">
        <div class="container">
          <h2 class="service-features__title">Why Choose Our Alteration Services</h2>
          <div class="service-features__grid">
            <div class="feature-card">
              <svg class="feature-card__icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
              <h3 class="feature-card__title">Precision Fitting</h3>
              <p class="feature-card__description">Expert tailor who understands how to adjust dresses to flatter your unique body shape.</p>
            </div>
            <div class="feature-card">
              <svg class="feature-card__icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              <h3 class="feature-card__title">Quality Repairs</h3>
              <p class="feature-card__description">Skilled craftsmanship to fix tears, replace zippers, and restore damaged dresses.</p>
            </div>
            <div class="feature-card">
              <svg class="feature-card__icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 class="feature-card__title">Quick Turnaround</h3>
              <p class="feature-card__description">Efficient service with many basic alterations completed within 3-5 business days.</p>
            </div>
            <div class="feature-card">
              <svg class="feature-card__icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h3 class="feature-card__title">All Dress Styles</h3>
              <p class="feature-card__description">Experience with all types of dress styles, from formal evening gowns to casual everyday dresses.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Process Section -->
      <section class="service-process">
        <div class="container">
          <h2 class="service-process__title">Our Alteration Process</h2>
          <div class="service-process__steps">
            <div class="process-step">
              <div class="process-step__number">1</div>
              <h3 class="process-step__title">Consultation</h3>
              <p class="process-step__description">Discuss your needs and assess the dress to determine the best approach.</p>
            </div>
            <div class="process-step">
              <div class="process-step__number">2</div>
              <h3 class="process-step__title">Fitting</h3>
              <p class="process-step__description">Try on the dress for precise measurements and marking of adjustments.</p>
            </div>
            <div class="process-step">
              <div class="process-step__number">3</div>
              <h3 class="process-step__title">Alteration</h3>
              <p class="process-step__description">Our skilled tailor performs the necessary alterations or repairs with precision.</p>
            </div>
            <div class="process-step">
              <div class="process-step__number">4</div>
              <h3 class="process-step__title">Final Fitting</h3>
              <p class="process-step__description">Try on the altered dress to ensure perfect fit and satisfaction.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Pricing Section -->
      <section class="service-pricing">
        <div class="container">
          <h2 class="service-pricing__title">Our Alteration & Repair Pricing</h2>
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
                <td>Hem Adjustment</td>
                <td>Shorten or lengthen dress hems</td>
                <td>₱300</td>
              </tr>
              <tr>
                <td>Waist Adjustment</td>
                <td>Take in or let out dress waistline</td>
                <td>₱400</td>
              </tr>
              <tr>
                <td>Zipper Replacement</td>
                <td>Replace broken or damaged zippers on dresses</td>
                <td>₱350</td>
              </tr>
              <tr>
                <td>Sleeve Adjustment</td>
                <td>Shorten or lengthen dress sleeves</td>
                <td>₱250</td>
              </tr>
              <tr>
                <td>Dress Resizing</td>
                <td>Adjust dress size (take in/let out)</td>
                <td>₱500</td>
              </tr>
              <tr>
                <td>Dress Repair</td>
                <td>Fix tears, holes, or damaged seams on dresses</td>
                <td>₱200</td>
              </tr>
              <tr>
                <td>Embellishment Repair</td>
                <td>Fix or replace beading, sequins, or other dress details</td>
                <td>₱300</td>
              </tr>
            </tbody>
          </table>
          <p style="text-align: center; margin-top: 20px; font-style: italic;">* Prices may vary based on fabric type, complexity, and time required. Additional fees may apply for rush services.</p>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="service-faq">
        <div class="container">
          <h2 class="service-faq__title">Frequently Asked Questions</h2>
          <div class="service-faq__list">
            <div class="faq-item">
              <button class="faq-question">
                How long do alterations take?
                <span class="faq-icon">+</span>
              </button>
              <div class="faq-answer">
                <p>Most basic alterations (hemming, simple repairs) are completed within 3-5 business days. More complex alterations like resizing formal wear or extensive repairs may take 7-10 days. Rush services are available for an additional fee.</p>
              </div>
            </div>
            <div class="faq-item">
              <button class="faq-question">
                Can you alter any type of dress?
                <span class="faq-icon">+</span>
              </button>
              <div class="faq-answer">
                <p>We can alter all types of dresses, including formal evening gowns, casual dresses, and delicate fabrics. However, some heavily structured dresses or those with extensive beading may have limitations. We'll honestly advise you if a particular alteration isn't feasible.</p>
              </div>
            </div>
            <div class="faq-item">
              <button class="faq-question">
                How many fittings will I need?
                <span class="faq-icon">+</span>
              </button>
              <div class="faq-answer">
                <p>Most dress alterations require an initial fitting for measurements and a final fitting when the work is complete. Complex alterations like formal dress resizing may require an intermediate fitting to ensure perfect results.</p>
              </div>
            </div>
            <div class="faq-item">
              <button class="faq-question">
                Can you repair vintage or delicate dresses?
                <span class="faq-icon">+</span>
              </button>
              <div class="faq-answer">
                <p>Yes, our tailor has experience with vintage and delicate dresses. We take extra care with these special items, using appropriate techniques and materials to preserve their character while making necessary repairs.</p>
              </div>
            </div>
            <div class="faq-item">
              <button class="faq-question">
                Do I need an appointment for alterations?
                <span class="faq-icon">+</span>
              </button>
              <div class="faq-answer">
                <p>While we accept walk-ins for simple alterations, we recommend scheduling an appointment for the best service, especially for complex alterations or multiple dresses. This ensures we can dedicate proper time for your fitting.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="service-cta">
        <div class="container">
          <h2 class="service-cta__title">Ready to Perfect Your Dress Fit?</h2>
          <p class="service-cta__text">Bring your dresses in today and let our expert tailor transform them to fit you perfectly!</p>
          <a href="appointments.php" class="service-cta__btn">Schedule an Alteration</a>
        </div>
      </section>
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
    <script src="js/service-detail.js"></script>
    <script type="module" src="data/notifications.js"></script>
    <script type="module" src="js/notifications.js"></script>
    <script type="module" src="js/search.js"></script>
    <script src="js/breakpoint-indicator.js"></script>
    <script type="module" src="data/products.js"></script>
    <script type="module" src="data/cart.js"></script>
  </body>
</html>





