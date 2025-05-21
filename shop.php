<?php
// Include database connection
require_once 'config/db_connect.php';

// Get filter options from database
$categories = [];
$category_result = mysqli_query($conn, "SELECT DISTINCT category FROM products ORDER BY category");
while ($row = mysqli_fetch_assoc($category_result)) {
    $categories[] = $row['category'];
}

$fabrics = [];
$fabric_result = mysqli_query($conn, "SELECT DISTINCT fabric FROM products WHERE fabric IS NOT NULL AND fabric != '' ORDER BY fabric");
while ($row = mysqli_fetch_assoc($fabric_result)) {
    $fabrics[] = $row['fabric'];
}

$colors = [];
$color_result = mysqli_query($conn, "SELECT DISTINCT color FROM products WHERE color IS NOT NULL AND color != '' ORDER BY color");
while ($row = mysqli_fetch_assoc($color_result)) {
    $colors[] = $row['color'];
}

// Get price range
$price_result = mysqli_query($conn, "SELECT MIN(price) as min_price, MAX(price) as max_price FROM products");
$price_range = mysqli_fetch_assoc($price_result);
$min_price = floor($price_range['min_price'] ?? 0);
$max_price = ceil($price_range['max_price'] ?? 5000);
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Shop - Kunozulkhair Tailoring Shop </title>
    <link rel="stylesheet" href="css/pages/shop.css" />
    <link rel="stylesheet" href="css/shared/general.css" />
    <link rel="stylesheet" href="css/shared/header.css" />
    <link rel="stylesheet" href="css/shared/reset.css" />
    <link rel="stylesheet" href="css/shared/utils.css" />
    <link rel="stylesheet" href="css/shared/footer.css">
    <link rel="stylesheet" href="css/search.css">
    <link rel="stylesheet" href="css/shared/hero.css">
    <link rel="stylesheet" href="css/cart.css">

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
      <!-- Shop Hero Section -->
      <section class="hero hero--shop">
        <div class="hero__content container">
          <h1 class="hero__title">Discover Your Perfect Outfit!</h1>
          <p class="hero__description">
            Handcrafted clothing with precision and care.
          </p>
        </div>
      </section>


      <!-- working on filters -->
      <!-- Shop Layout (Filters + Products) -->
      <section class="shop-layout container">
        <aside class="shop-filters">
          <div class="filter-header">
            <h3>Filter Products</h3>
            <button id="toggle-filters" class="filter-toggle">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="4" y1="21" x2="4" y2="14"></line>
                <line x1="4" y1="10" x2="4" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12" y2="3"></line>
                <line x1="20" y1="21" x2="20" y2="16"></line>
                <line x1="20" y1="12" x2="20" y2="3"></line>
                <line x1="1" y1="14" x2="7" y2="14"></line>
                <line x1="9" y1="8" x2="15" y2="8"></line>
                <line x1="17" y1="16" x2="23" y2="16"></line>
              </svg>
            </button>
          </div>

          <div class="filter-content">
            <!-- Dress Type Filter -->
            <div class="filter-group">
              <h4>Dress Type</h4>
              <ul>
                <?php foreach ($categories as $category): ?>
                <li>
                  <input type="checkbox" id="<?php echo $category; ?>" name="category" value="<?php echo $category; ?>" />
                  <label for="<?php echo $category; ?>"><?php echo ucfirst($category); ?> Dresses</label>
                </li>
                <?php endforeach; ?>
              </ul>
            </div>

            <!-- Fabric Filter -->
            <div class="filter-group">
              <h4>Fabric Type</h4>
              <ul>
                <?php foreach ($fabrics as $fabric): ?>
                <li>
                  <input type="checkbox" id="<?php echo $fabric; ?>" name="fabric" value="<?php echo $fabric; ?>" />
                  <label for="<?php echo $fabric; ?>"><?php echo ucfirst($fabric); ?></label>
                </li>
                <?php endforeach; ?>
              </ul>
            </div>

            <!-- Color Filter -->
            <div class="filter-group">
              <h4>Color</h4>
              <div class="color-options">
                <?php
                // Define color codes for common colors
                $colorCodes = [
                    'black' => '#000',
                    'white' => '#fff; border: 1px solid #ddd',
                    'red' => '#e74c3c',
                    'blue' => '#3498db',
                    'green' => '#2ecc71',
                    'yellow' => '#f1c40f',
                    'purple' => '#9b59b6',
                    'pink' => '#e84393',
                    'orange' => '#e67e22',
                    'brown' => '#795548',
                    'gray' => '#95a5a6',
                    'multi' => 'linear-gradient(45deg, #e74c3c, #3498db, #2ecc71, #f1c40f, #9b59b6, #e84393)'
                ];

                foreach ($colors as $color):
                    // Default to gray if color code not defined
                    $colorStyle = isset($colorCodes[$color]) ? $colorCodes[$color] : '#95a5a6';
                    $backgroundStyle = strpos($colorStyle, 'linear-gradient') !== false ?
                        "background: $colorStyle" : "background-color: $colorStyle";
                ?>
                <div class="color-option">
                  <input type="checkbox" id="<?php echo $color; ?>" name="color" value="<?php echo $color; ?>" />
                  <label for="<?php echo $color; ?>" style="<?php echo $backgroundStyle; ?>"></label>
                  <span><?php echo ucfirst($color); ?></span>
                </div>
                <?php endforeach; ?>
              </div>
            </div>

            <!-- Size Filter -->
            <div class="filter-group">
              <h4>Size</h4>
              <div class="size-options">
                <button class="size-btn" data-size="xs">XS</button>
                <button class="size-btn" data-size="s">S</button>
                <button class="size-btn" data-size="m">M</button>
                <button class="size-btn" data-size="l">L</button>
                <button class="size-btn" data-size="xl">XL</button>
                <button class="size-btn" data-size="xxl">XXL</button>
              </div>
            </div>

            <!-- Price Filter -->
            <div class="filter-group price-filter">
              <h4>Price Range</h4>
              <div class="price-inputs">
                <div class="price-input">
                  <span>₱</span>
                  <input type="number" id="min-price" placeholder="Min" min="<?php echo $min_price; ?>" value="<?php echo $min_price; ?>" />
                </div>
                <div class="price-separator">-</div>
                <div class="price-input">
                  <span>₱</span>
                  <input type="number" id="max-price" placeholder="Max" min="<?php echo $min_price; ?>" max="<?php echo $max_price; ?>" value="<?php echo $max_price; ?>" />
                </div>
              </div>
              <div class="price-slider">
                <input type="range" id="price-range" min="<?php echo $min_price; ?>" max="<?php echo $max_price; ?>" step="100" value="<?php echo floor($max_price/2); ?>" />
                <div class="price-value">Up to: ₱<span id="price-value"><?php echo floor($max_price/2); ?></span></div>
              </div>
            </div>

            <!-- Reset button -->
            <button id="reset-filters" class="reset-filters">Reset All Filters</button>
          </div>
        </aside>

        <!-- Right: Products Section -->
        <section class="shop-products-section">
          <div class="shop-controls">
            <div class="controls-row">
              <div class="shop-sorting">
                <label for="sort-by">Sort By:</label>
                <select id="sort-by" class="sort-select">
                  <option value="default">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name-az">Name: A to Z</option>
                  <option value="name-za">Name: Z to A</option>
                  <option value="newest">Newest First</option>
                  <option value="popularity">Popularity</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Products Grid -->
          <div class="shop-products" id="shop-products">
            <div id="loading-products">Loading products...</div>
          </div>

          <!-- Loading Indicator for Infinite Scroll -->
          <div class="scroll-loader" id="scroll-loader">
            <div class="loader-spinner"></div>
            <p>Loading more products...</p>
          </div>
        </section>
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
    <script type="module" src="js/shop.js"></script>
    <script type="module" src="data/notifications.js"></script>
    <script type="module" src="js/notifications.js"></script>
    <script type="module" src="js/search.js"></script>
    <script src="js/breakpoint-indicator.js"></script>
  </body>
</html>





