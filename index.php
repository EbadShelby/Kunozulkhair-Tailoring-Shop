<?php
// Include database connection
require_once 'config/db_connect.php';

// Start session if not already started
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}


// Fetch featured products from the database (using latest products)
$featured_query = "SELECT * FROM products ORDER BY created_at DESC LIMIT 8";
$featured_result = mysqli_query($conn, $featured_query);
$featured_products = [];

if ($featured_result) {
  while ($row = mysqli_fetch_assoc($featured_result)) {
    // Convert sizes string to array
    if (!empty($row['sizes'])) {
      $row['sizes'] = explode(',', $row['sizes']);
    } else {
      $row['sizes'] = [];
    }

    // Add rating information
    $row['rating'] = [
      'rate' => 4.5, // Default rating
      'count' => 10  // Default count
    ];

    $featured_products[] = $row;
  }
}
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Home - Kunozulkhair Tailoring Shop</title>

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

    <!-- link css -->
    <link rel="stylesheet" href="css/pages/shop.css" />
    <link rel="stylesheet" href="css/pages/main.css" />

    <link rel="stylesheet" href="css/shared/general.css" />
    <link rel="stylesheet" href="css/shared/header.css" />
    <link rel="stylesheet" href="css/shared/reset.css" />
    <link rel="stylesheet" href="css/shared/utils.css" />
    <link rel="stylesheet" href="css/shared/footer.css" />
    <link rel="stylesheet" href="css/search.css" />
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
      <div class="container">
        <div class="ads-carousel">
          <button
            class="ads-carousel__button ads-carousel__button--left is-hidden"
          >
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
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <div class="ads-carousel__track-container">
            <ul class="ads-carousel__track">
              <li class="ads-carousel__slide ads-carousel__current-slide">
                <a href="#">
                  <img
                    class="ads-carousel__image"
                    src="assets\images\Journey\uw2zDaCDiZ.png"
                    alt=""
                  />
                </a>
              </li>
              <li class="ads-carousel__slide">
                <a href="#">
                  <img
                    class="ads-carousel__image"
                    src="assets/images/shop.jpg"
                    alt=""
                  />
                </a>
              </li>
              <li class="ads-carousel__slide">
                <a href="#">
                  <img
                    class="ads-carousel__image"
                    src="assets/images/Hero-home.jpg"
                    alt=""
                  />
                </a>
              </li>
            </ul>
          </div>

          <button class="ads-carousel__button ads-carousel__button--right">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>

          <div class="ads-carousel__nav">
            <button
              class="ads-carousel__indicator ads-carousel__indicator--active"
            ></button>
            <button class="ads-carousel__indicator"></button>
            <button class="ads-carousel__indicator"></button>
          </div>
        </div>
      </div>

      <!-- grind again -->
      <section class="featured-categories">
        <div class="container">
          <h2 class="section-title">Explore Our Dresses & Services</h2>
          <div class="categories-grid">
            <a href="shop.php?category=formal" class="category-card">
              <img src="assets\images\Formal.jpg" alt="Formal Dresses" />
              <span>Formal Dresses</span>
            </a>
            <a href="shop.php?category=casual" class="category-card">
              <img src="assets\images\Casual.jpg" alt="Casual Dresses" />
              <span>Casual Dresses</span>
            </a>
            <a href="appointments.php" class="category-card">
              <img src="assets\images\Book-appointment.jpg" alt="Book an Appointment" />
              <span>Book an Appointment</span>
            </a>
            <a href="shop.php?sort=newest" class="category-card">
              <img src="assets/images/New arrivals.jpg" alt="New Arrivals" />
              <span>New Arrivals</span>
            </a>
            <a href="shop.php?sort=popularity" class="category-card">
              <img src="assets/images/Popular Dresses.jpg" alt="Best Sellers" />
              <span>Popular Dresses</span>
            </a>
          </div>
        </div>
      </section>

      <section class="featured-products">
        <div class="container">
          <h2 class="section-title">Featured Products</h2>

          <div class="featured-product-carousel">
            <button
              class="featured-product_carousel-button featured-product_carousel-button--left"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>


            <div class="featured-product-track-container">
              <section class="featured-product-track">
                <?php if (empty($featured_products)): ?>
                  <div id="loading-products">No products available</div>
                <?php else: ?>
                  <?php foreach ($featured_products as $product): ?>
                    <?php
                      // Calculate rating display (out of 5 stars)
                      $ratingOutOf10 = isset($product['rating']) ? $product['rating']['rate'] : "N/A";
                    ?>
                    <article class="featured-product-slide" data-product-id="<?php echo $product['id']; ?>">
                      <a href="product-detail.php?id=<?php echo $product['id']; ?>" class="product-image-link">
                        <img src="<?php echo $product['image']; ?>" alt="<?php echo $product['name']; ?>" />
                      </a>
                      <div class="product-info">
                        <a href="product-detail.php?id=<?php echo $product['id']; ?>" class="product-title-link">
                          <h3><?php echo $product['name']; ?></h3>
                        </a>
                        <div class="product-meta">
                          <div class="product-price">₱<?php echo number_format($product['price'], 2); ?></div>
                          <div class="product-rating">
                            ⭐<?php echo $ratingOutOf10; ?>
                            <span class="rating-count">(<?php echo isset($product['rating']) ? $product['rating']['count'] : 0; ?>)</span>
                          </div>
                        </div>
                        <button class="btn-cart" data-product-id="<?php echo $product['id']; ?>">Add to Cart</button>
                      </div>
                    </article>
                  <?php endforeach; ?>
                <?php endif; ?>
              </section>
            </div>

            <button
              class="featured-product_carousel-button featured-product_carousel-button--right"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <section class="tailoring-services">
        <div class="container">
          <h2 class="section-title">Tailoring Services</h2>

          <div class="services-grid">
            <div class="service-card">
              <img src="assets/images/logo.jpg" alt="Custom Dressmaking" />
              <h3>Custom Dressmaking</h3>
              <p>Get a dress made just for you!</p>
              <a href="services.php" class="btn-learn">Learn More</a>
            </div>

            <div class="service-card">
              <img src="assets/images/logo.jpg" alt="Alterations & Repairs" />
              <h3>Alterations & Repairs</h3>
              <p>Make your old clothes fit perfectly again!</p>
              <a href="services.php" class="btn-learn">Learn More</a>
            </div>
          </div>
        </div>
      </section>

      <section class="why-choose-us">
        <div class="container">
          <h2 class="section-title">Why Choose Us?</h2>

          <div class="reasons-grid">
            <div class="reason-card">
              <img src="assets/images/logo.jpg" alt="Quality Craftsmanship" />
              <h3>Quality Craftsmanship</h3>
              <p>Skilled tailors with years of experience.</p>
            </div>

            <div class="reason-card">
              <img src="assets/images/logo.jpg" alt="Affordable Prices" />
              <h3>Affordable Prices</h3>
              <p>High-quality work without breaking the bank.</p>
            </div>

            <div class="reason-card">
              <img src="assets/images/logo.jpg" alt="Fast & Reliable" />
              <h3>Fast & Reliable</h3>
              <p>Quick turnaround time for custom orders.</p>
            </div>

            <div class="reason-card">
              <img src="assets/images/logo.jpg" alt="Customer Satisfaction" />
              <h3>Customer Satisfaction</h3>
              <p>Hundreds of happy customers.</p>
            </div>
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
    <script src="js/main.js"></script>
    <script type="module" src="data/notifications.js"></script>
    <script type="module" src="js/notifications.js"></script>
    <script type="module" src="js/search.js"></script>
    <script src="js/breakpoint-indicator.js"></script>
  </body>
</html>




