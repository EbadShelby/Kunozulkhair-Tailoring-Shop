<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>About Us - Kunozulkhair Tailoring Shop</title>

    <link rel="stylesheet" href="css/shared/footer.css" />
    <link rel="stylesheet" href="css/pages/about.css" />
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
      <section class="hero hero--about">
        <div class="hero__content container">
          <h1 class="hero__title">Crafting Elegance, Stitch by Stitch</h1>
          <p class="hero__description">
            We create high-quality, custom-made dresses and offer expert
            tailoring services to bring your fashion dreams to life.
          </p>
          <a href="shop.php" class="hero__btn">Explore Our Collection</a>
        </div>
      </section>

      <section class="mission-values">
        <div class="mission">
          <h2 class="mission__title">Our Mission</h2>
          <p class="mission__description">
            At KunoZulkhair Tailoring & Dress Shop, our mission is to craft
            high-quality, custom-made dresses and provide expert tailoring
            services that empower confidence and self-expression.
          </p>
        </div>

        <div class="values">
          <h2 class="values__title">Our Core Values</h2>
          <div class="values__grid">
            <div class="value-card">
              <img
                src="assets/images/logo.jpg"
                alt="Quality Icon"
                class="value-card__icon"
              />
              <h3 class="value-card__title">Quality Craftsmanship</h3>
              <p class="value-card__description">
                Every stitch is made with precision and care.
              </p>
            </div>

            <div class="value-card">
              <img
                src="assets/images/logo.jpg"
                alt="Affordability Icon"
                class="value-card__icon"
              />
              <h3 class="value-card__title">Affordability</h3>
              <p class="value-card__description">
                Premium quality at prices that fit your budget.
              </p>
            </div>

            <div class="value-card">
              <img
                src="assets/images/logo.jpg"
                alt="Reliability Icon"
                class="value-card__icon"
              />
              <h3 class="value-card__title">Reliability</h3>
              <p class="value-card__description">
                Timely service you can count on.
              </p>
            </div>

            <div class="value-card">
              <img
                src="assets/images/logo.jpg"
                alt="Customer Satisfaction Icon"
                class="value-card__icon"
              />
              <h3 class="value-card__title">Customer Satisfaction</h3>
              <p class="value-card__description">
                We put our customers at the heart of everything.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Journey Slideshow Section -->
      <section class="journey-slideshow">
        <div class="container">
          <h2 class="journey-slideshow__title">Our Development Journey</h2>
          <p class="journey-slideshow__description">
            From concept to creation, follow our team's progress as we built Kunozulkhair Tailoring Shop.
          </p>

          <div class="slideshow-container">
            <!-- Slides -->
            <div class="slide fade">
              <div class="slide__number">1 / 19</div>
              <img src="assets/images/Journey/received_1829364240966750.png" alt="Development Journey - Initial Planning">
              <div class="slide__caption">Initial planning and brainstorming sessions</div>
            </div>

            <div class="slide fade">
              <div class="slide__number">2 / 19</div>
              <img src="assets/images/Journey/received_1744755076252572.png" alt="Development Journey - Design Phase">
              <div class="slide__caption">Design phase with our talented team</div>
            </div>

            <div class="slide fade">
              <div class="slide__number">3 / 19</div>
              <img src="assets/images/Journey/received_711488171309410.png" alt="Development Journey - First Prototype">
              <div class="slide__caption">Creating our first prototype designs</div>
            </div>

            <div class="slide fade">
              <div class="slide__number">4 / 19</div>
              <img src="assets/images/Journey/received_1128957998995334.jpeg" alt="Development Journey - Team Meeting">
              <div class="slide__caption">Team meeting to discuss project progress</div>
            </div>

            <div class="slide fade">
              <div class="slide__number">5 / 19</div>
              <img src="assets/images/Journey/received_1226767812397231.png" alt="Development Journey - Quality Testing">
              <div class="slide__caption">Quality testing our products</div>
            </div>

            <div class="slide fade">
              <div class="slide__number">6 / 19</div>
              <img src="assets/images/Journey/received_661530089973123.png" alt="Development Journey - User Feedback">
              <div class="slide__caption">Gathering and implementing user feedback</div>
            </div>

            <div class="slide fade">
              <div class="slide__number">7 / 19</div>
              <img src="assets/images/Journey/received_1350772079518090.png" alt="Development Journey - Final Touches">
              <div class="slide__caption">Adding the final touches to our project</div>
            </div>

            <div class="slide fade">
              <div class="slide__number">8 / 19</div>
              <img src="assets/images/Journey/received_1133706934929083.jpeg" alt="Development Journey - Launch Day">
              <div class="slide__caption">Celebrating our achievements as a team</div>
            </div>

            <div class="slide fade">
              <div class="slide__number">9 / 19</div>
              <img src="assets/images/Journey/12.jpeg" alt="Development Journey - Launch Day">
              <div class="slide__caption">Launch day - ready to serve our customers!</div>
            </div>
            <div class="slide fade">
              <div class="slide__number">10 / 19</div>
              <img src="assets/images/Journey/20.jpg" alt="Development Journey - Launch Day">
              <div class="slide__caption">Launch day - ready to serve our customers!</div>
            </div>
            <div class="slide fade">
              <div class="slide__number">11 / 19</div>
              <img src="assets/images/Journey/13.jpg" alt="Development Journey - Launch Day">
              <div class="slide__caption">Launch day - ready to serve our customers!</div>
            </div>
            <div class="slide fade">
              <div class="slide__number">12 / 19</div>
              <img src="assets/images/Journey/14.jpg" alt="Development Journey - Launch Day">
              <div class="slide__caption">Launch day - ready to serve our customers!</div>
            </div>
            <div class="slide fade">
              <div class="slide__number">13 / 19</div>
              <img src="assets/images/Journey/15.jpg" alt="Development Journey - Launch Day">
              <div class="slide__caption">Launch day - ready to serve our customers!</div>
            </div>
            <div class="slide fade">
              <div class="slide__number">14 / 19</div>
              <img src="assets/images/Journey/16.jpg" alt="Development Journey - Launch Day">
              <div class="slide__caption">Launch day - ready to serve our customers!</div>
            </div>
            <div class="slide fade">
              <div class="slide__number">15 / 19</div>
              <img src="assets/images/Journey/17.jpg" alt="Development Journey - Launch Day">
              <div class="slide__caption">Launch day - ready to serve our customers!</div>
            </div>
            <div class="slide fade">
              <div class="slide__number">16 / 19</div>
              <img src="assets/images/Journey/18.jpg" alt="Development Journey - Launch Day">
              <div class="slide__caption">Launch day - ready to serve our customers!</div>
            </div>
            <div class="slide fade">
              <div class="slide__number">17 / 19</div>
              <img src="assets/images/Journey/19.jpg" alt="Development Journey - Launch Day">
              <div class="slide__caption">Launch day - ready to serve our customers!</div>
            </div>
            <div class="slide fade">
              <div class="slide__number">18 / 19</div>
              <img src="assets/images/Journey/20.jpg" alt="Development Journey - Launch Day">
              <div class="slide__caption">Launch day - ready to serve our customers!</div>
            </div>
            <div class="slide fade">
              <div class="slide__number">19 / 19</div>
              <img src="assets/images/Journey/21.jpg" alt="Development Journey - Launch Day">
              <div class="slide__caption">Launch day - ready to serve our customers!</div>
            </div>

            <!-- Navigation arrows -->
            <a class="prev" onclick="changeSlide(-1)">&#10094;</a>
            <a class="next" onclick="changeSlide(1)">&#10095;</a>
          </div>
        </div>
      </section>

      <section class="contact-cta container">
        <div class="contact-cta__content">
          <h2 class="contact-cta__title">Ready to Get Started?</h2>
          <p class="contact-cta__text">
            Whether you need a custom dress or expert alterations, we're here
            to bring your vision to life. Let's create something amazing together!
          </p>
          <div class="contact-cta__buttons">
            <a href="contact.php" class="btn btn--primary">Contact Us</a>
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
    <script src="js/about.js"></script>
    <script type="module" src="data/products.js"></script>
    <script type="module" src="data/cart.js"></script>
    <script type="module" src="data/notifications.js"></script>
    <script type="module" src="js/notifications.js"></script>
    <script type="module" src="js/search.js"></script>
    <script src="js/breakpoint-indicator.js"></script>
  </body>
</html>





