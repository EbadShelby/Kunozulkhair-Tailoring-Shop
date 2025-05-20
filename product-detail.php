<?php
// Include database connection
require_once 'config/db_connect.php';

// Get product ID from URL
$product_id = isset($_GET['id']) ? intval($_GET['id']) : 0;

// Fetch product data
$product = null;
$related_products = [];

if ($product_id > 0) {
    // Prepare and execute the query
    $stmt = mysqli_prepare($conn, "SELECT * FROM products WHERE id = ?");
    mysqli_stmt_bind_param($stmt, "i", $product_id);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    // Check if product exists
    if (mysqli_num_rows($result) > 0) {
        $product = mysqli_fetch_assoc($result);

        // Convert sizes string to array
        if (!empty($product['sizes'])) {
            $product['sizes'] = explode(',', $product['sizes']);
        } else {
            $product['sizes'] = [];
        }

        // Get related products (same category, excluding current product)
        $related_stmt = mysqli_prepare($conn,
            "SELECT * FROM products
            WHERE category = ? AND id != ?
            ORDER BY RAND()
            LIMIT 4");

        mysqli_stmt_bind_param($related_stmt, "si", $product['category'], $product_id);
        mysqli_stmt_execute($related_stmt);
        $related_result = mysqli_stmt_get_result($related_stmt);

        while ($row = mysqli_fetch_assoc($related_result)) {
            // Convert sizes string to array
            if (!empty($row['sizes'])) {
                $row['sizes'] = explode(',', $row['sizes']);
            } else {
                $row['sizes'] = [];
            }

            $related_products[] = $row;
        }
    }
}

// Set page title
$page_title = $product ? $product['name'] . ' - Kunozulkhair Tailoring Shop' : 'Product Not Found - Kunozulkhair Tailoring Shop';
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?php echo $page_title; ?></title>
    <link rel="stylesheet" href="css/pages/product-detail.css" />
    <link rel="stylesheet" href="css/shared/general.css" />
    <link rel="stylesheet" href="css/shared/header.css" />
    <link rel="stylesheet" href="css/shared/reset.css" />
    <link rel="stylesheet" href="css/shared/utils.css" />
    <link rel="stylesheet" href="css/shared/footer.css">
    <link rel="stylesheet" href="css/pages/shop.css" />
    <link rel="stylesheet" href="css/cart.css" />

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
      <!-- Breadcrumb Navigation -->
      <div class="breadcrumb inner-container">
        <div class="breadcrumb-path">
          <a href="index.php">Home</a> &gt;
          <a href="shop.php">Shop</a> &gt;
          <?php if ($product): ?>
          <a href="shop.php?category=<?php echo urlencode($product['category']); ?>"><?php echo ucfirst($product['category']); ?></a> &gt;
          <span id="product-breadcrumb"><?php echo $product['name']; ?></span>
          <?php else: ?>
          <span id="product-breadcrumb">Product Not Found</span>
          <?php endif; ?>
        </div>
        <a href="shop.php" class="back-to-shop">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Shop
        </a>
      </div>

      <!-- Product Detail Section -->
      <section class="product-detail inner-container">
        <?php if (!$product): ?>
        <div class="product-not-found">
          <h2>Product Not Found</h2>
          <p>Sorry, the product you are looking for does not exist or has been removed.</p>
          <a href="shop.php" class="btn-primary">Continue Shopping</a>
        </div>
        <?php else: ?>
        <div class="product-detail__content" id="product-content">
          <!-- Left Column: Product Images -->
          <div class="product-detail__images">
            <div class="product-detail__thumbnails">
              <!-- We'll just show the main image as a thumbnail for now -->
              <div class="thumbnail active" data-image="<?php echo $product['image']; ?>">
                <img src="<?php echo $product['image']; ?>" alt="<?php echo $product['name']; ?>" />
              </div>
            </div>
            <div class="product-detail__main-image">
              <img src="<?php echo $product['image']; ?>" alt="<?php echo $product['name']; ?>" id="main-product-image" />
            </div>
          </div>

          <!-- Right Column: Product Info -->
          <div class="product-detail__info">
            <h1 class="product-detail__title" id="product-title"><?php echo $product['name']; ?></h1>

            <div class="product-detail__meta">
              <div class="product-detail__rating">
                <span class="rating-stars">⭐⭐⭐⭐⭐</span>
                <span class="rating-value">4.5</span>
                <span class="rating-count">(10 reviews)</span>
              </div>
              <div class="product-detail__category" id="product-category">
                <a href="shop.php?category=<?php echo urlencode($product['category']); ?>"><?php echo ucfirst($product['category']); ?></a>
              </div>
            </div>

            <div class="product-detail__price" id="product-price">₱<?php echo number_format($product['price'], 2); ?></div>

            <?php if (!empty($product['fabric'])): ?>
            <div class="product-detail__fabric">
              <span class="label">Fabric:</span>
              <span id="product-fabric"><?php echo ucfirst($product['fabric']); ?></span>
            </div>
            <?php endif; ?>

            <?php if (!empty($product['color'])): ?>
            <div class="product-detail__color">
              <span class="label">Color:</span>
              <span id="product-color"><?php echo ucfirst($product['color']); ?></span>
            </div>
            <?php endif; ?>

            <?php if (!empty($product['sizes'])): ?>
            <div class="product-detail__sizes">
              <span class="label">Available Sizes:</span>
              <div class="size-options" id="product-sizes">
                <?php foreach ($product['sizes'] as $size): ?>
                <button class="size-btn" data-size="<?php echo $size; ?>"><?php echo strtoupper($size); ?></button>
                <?php endforeach; ?>
              </div>
            </div>
            <?php endif; ?>

            <div class="product-detail__quantity">
              <span class="label">Quantity:</span>
              <div class="quantity-control">
                <button id="decrease-quantity">-</button>
                <input type="number" id="quantity" value="1" min="1" max="<?php echo min(10, $product['stock']); ?>">
                <button id="increase-quantity">+</button>
              </div>
              <div class="stock-info">
                <?php if ($product['stock'] > 0): ?>
                <span class="in-stock">In Stock (<?php echo $product['stock']; ?> available)</span>
                <?php else: ?>
                <span class="out-of-stock">Out of Stock</span>
                <?php endif; ?>
              </div>
            </div>

            <div class="product-detail__actions">
              <button id="add-to-cart" class="btn-primary" <?php echo $product['stock'] <= 0 ? 'disabled' : ''; ?> data-product-id="<?php echo $product['id']; ?>">
                Add to Cart
              </button>
            </div>
            <div class="product-detail__buy-now">
              <button id="buy-now" class="btn-buy-now" <?php echo $product['stock'] <= 0 ? 'disabled' : ''; ?> data-product-id="<?php echo $product['id']; ?>">
                Buy Now
              </button>
            </div>
          </div>
        </div>

        <!-- Product Description Section -->
        <div class="product-detail__description">
          <h2>Product Description</h2>
          <div class="description-content" id="product-description">
            <?php if (!empty($product['description'])): ?>
              <?php echo nl2br($product['description']); ?>
            <?php else: ?>
              <p>No description available for this product.</p>
            <?php endif; ?>
          </div>
        </div>

        <?php if (count($related_products) > 0): ?>
        <!-- Related Products Section -->
        <div class="product-detail__related">
          <h2>You May Also Like</h2>
          <div class="related-products" id="related-products">
            <?php foreach ($related_products as $related): ?>
            <div class="product-card">
              <a href="product-detail.php?id=<?php echo $related['id']; ?>" class="product-image-link">
                <img src="<?php echo $related['image']; ?>" alt="<?php echo $related['name']; ?>" />
              </a>
              <div class="product-info">
                <a href="product-detail.php?id=<?php echo $related['id']; ?>" class="product-title-link">
                  <h3><?php echo $related['name']; ?></h3>
                </a>
                <div class="product-meta">
                  <div class="product-price">₱<?php echo number_format($related['price'], 2); ?></div>
                  <div class="product-rating">⭐4.5</div>
                </div>
                <button class="related-add-to-cart" data-product-id="<?php echo $related['id']; ?>">Add to Cart</button>
              </div>
            </div>
            <?php endforeach; ?>
          </div>
        </div>
        <?php endif; ?>
        <?php endif; ?>
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

    <!-- Image Viewer Modal -->
    <div class="image-viewer-modal" id="image-viewer">
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <img id="modal-image" src="" alt="Product image">
        <div class="modal-navigation">
          <button id="prev-image" class="nav-button">&lt;</button>
          <button id="next-image" class="nav-button">&gt;</button>
        </div>
      </div>
    </div>

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
    <script type="module" src="data/notifications.js"></script>
    <script type="module" src="js/notifications.js"></script>
    <script src="js/breakpoint-indicator.js"></script>
    <script>
      // Simple product detail page JavaScript
      document.addEventListener('DOMContentLoaded', function() {
        // Quantity controls
        const quantityInput = document.getElementById('quantity');
        const decreaseBtn = document.getElementById('decrease-quantity');
        const increaseBtn = document.getElementById('increase-quantity');

        if (decreaseBtn) {
          decreaseBtn.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
              quantityInput.value = currentValue - 1;
            }
          });
        }

        if (increaseBtn) {
          increaseBtn.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value);
            const maxValue = parseInt(quantityInput.getAttribute('max'));
            if (currentValue < maxValue) {
              quantityInput.value = currentValue + 1;
            }
          });
        }

        // Size selection
        const sizeButtons = document.querySelectorAll('.size-btn');
        let selectedSize = null;

        sizeButtons.forEach(button => {
          button.addEventListener('click', function() {
            // Remove active class from all buttons
            sizeButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Update selected size
            selectedSize = this.dataset.size;
          });
        });

        // Add to cart functionality
        const addToCartBtn = document.getElementById('add-to-cart');
        if (addToCartBtn) {
          addToCartBtn.addEventListener('click', function() {
            const productId = this.dataset.productId;
            const quantity = parseInt(quantityInput.value);

            // Check if size is selected (if sizes are available)
            if (sizeButtons.length > 0 && !selectedSize) {
              alert('Please select a size');
              return;
            }

            // Add to cart using the cart.js functionality
            addToCart(productId, quantity);

            // Show cart sidebar
            const cartSidebar = document.getElementById('cart-sidebar');
            if (cartSidebar) {
              cartSidebar.classList.add('open');
            }
          });
        }

        // Buy now functionality
        const buyNowBtn = document.getElementById('buy-now');
        if (buyNowBtn) {
          buyNowBtn.addEventListener('click', function() {
            const productId = this.dataset.productId;
            const quantity = parseInt(quantityInput.value);

            // Check if size is selected (if sizes are available)
            if (sizeButtons.length > 0 && !selectedSize) {
              alert('Please select a size');
              return;
            }

            // Add to cart and redirect to checkout
            addToCart(productId, quantity);
            window.location.href = 'checkout.php';
          });
        }

        // Related products "Add to Cart" buttons
        const relatedAddToCartButtons = document.querySelectorAll('.related-add-to-cart');
        if (relatedAddToCartButtons.length > 0) {
          relatedAddToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
              const productId = this.dataset.productId;

              // Add to cart using the cart.js functionality
              addToCart(productId, 1);

              // Show visual feedback
              const originalText = this.innerText;
              this.innerText = 'Added!';
              this.classList.add('added-to-cart');

              // Reset button after 1.5 seconds
              setTimeout(() => {
                this.innerText = originalText;
                this.classList.remove('added-to-cart');
              }, 1500);

              // Show cart sidebar
              const cartSidebar = document.getElementById('cart-sidebar');
              if (cartSidebar) {
                cartSidebar.classList.add('open');
              }
            });
          });
        }

        // Image viewer functionality
        const mainImage = document.getElementById('main-product-image');
        const thumbnails = document.querySelectorAll('.thumbnail');

        thumbnails.forEach(thumbnail => {
          thumbnail.addEventListener('click', function() {
            // Update main image
            if (mainImage) {
              mainImage.src = this.dataset.image;
            }

            // Update active thumbnail
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            this.classList.add('active');
          });
        });
      });
    </script>
  </body>
</html>





