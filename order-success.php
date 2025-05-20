<?php
/**
 * Order Success Page
 * 
 * This page is displayed after a successful order.
 */

// Start session
session_start();

// Include database connection
require_once 'config/db_connect.php';

// Check if there's an order in session
if (!isset($_SESSION['last_order'])) {
    // Redirect to home if no order
    header("Location: index.php");
    exit;
}

// Get order details from session
$orderNumber = $_SESSION['last_order']['order_number'];
$orderTotal = $_SESSION['last_order']['total'];
$orderId = $_SESSION['last_order']['id'];

// Get order details from database
$orderQuery = "
    SELECT o.*, os.status, os.created_at as status_date
    FROM orders o
    JOIN order_status_history os ON o.id = os.order_id
    WHERE o.id = ? 
    ORDER BY os.created_at DESC 
    LIMIT 1
";

$orderStmt = mysqli_prepare($conn, $orderQuery);
mysqli_stmt_bind_param($orderStmt, "i", $orderId);
mysqli_stmt_execute($orderStmt);
$orderResult = mysqli_stmt_get_result($orderStmt);
$order = mysqli_fetch_assoc($orderResult);

// Get order items
$itemsQuery = "
    SELECT oi.*, p.image
    FROM order_items oi
    LEFT JOIN products p ON oi.product_id = p.id
    WHERE oi.order_id = ?
";

$itemsStmt = mysqli_prepare($conn, $itemsQuery);
mysqli_stmt_bind_param($itemsStmt, "i", $orderId);
mysqli_stmt_execute($itemsStmt);
$itemsResult = mysqli_stmt_get_result($itemsStmt);

$orderItems = [];
while ($item = mysqli_fetch_assoc($itemsResult)) {
    $orderItems[] = $item;
}

// Check if there's a fitting appointment
$fittingQuery = "
    SELECT * FROM fitting_appointments WHERE order_id = ? LIMIT 1
";

$fittingStmt = mysqli_prepare($conn, $fittingQuery);
mysqli_stmt_bind_param($fittingStmt, "i", $orderId);
mysqli_stmt_execute($fittingStmt);
$fittingResult = mysqli_stmt_get_result($fittingStmt);
$fittingAppointment = mysqli_fetch_assoc($fittingResult);

// Clear the order from session after displaying
// We'll keep it for this page load but remove it after
// $_SESSION['last_order'] = null;
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Order Successful - Kunozulkhair Tailoring Shop</title>
    <link rel="stylesheet" href="css/shared/general.css" />
    <link rel="stylesheet" href="css/shared/header.css" />
    <link rel="stylesheet" href="css/shared/reset.css" />
    <link rel="stylesheet" href="css/shared/utils.css" />
    <link rel="stylesheet" href="css/pages/order-success.css" />
    <link rel="stylesheet" href="css/shared/footer.css" />

    <!-- linked google fonts  -->
    <link
      href="https://fonts.googleapis.com/css2?family=Baskervville:ital@0;1&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
      rel="stylesheet"
    />

    <link rel="icon" href="assets/images/logo.jpg" type="image/png">
  </head>
  <body>
    <header class="header">
      <a class="header__logo" href="index.php">
        <img
          class="header__logo-img"
          src="assets/images/logo.jpg"
          alt="logo"
        />
        <p class="header__logo-text">
          <span>KunoZulkhair</span> Tailoring & Dress Shop
        </p>
      </a>

      <!-- Checkout Progress Indicator -->
      <div class="checkout-progress">
        <div class="progress-step completed">
          <div class="step-number">1</div>
          <div class="step-label">Shopping Cart</div>
        </div>
        <div class="progress-step completed">
          <div class="step-number">2</div>
          <div class="step-label">Checkout</div>
        </div>
        <div class="progress-step completed active">
          <div class="step-number">3</div>
          <div class="step-label">Order Complete</div>
        </div>
      </div>
    </header>

    <main>
      <div class="success-container">
        <div class="success-header">
          <div class="success-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1>Order Placed Successfully!</h1>
          <p>Thank you for your order. We've received your request and will process it shortly.</p>
        </div>

        <div class="order-details">
          <div class="order-info">
            <div class="info-item">
              <span class="info-label">Order Number:</span>
              <span class="info-value"><?php echo htmlspecialchars($orderNumber); ?></span>
            </div>
            <div class="info-item">
              <span class="info-label">Order Date:</span>
              <span class="info-value"><?php echo date('F d, Y', strtotime($order['created_at'])); ?></span>
            </div>
            <div class="info-item">
              <span class="info-label">Payment Method:</span>
              <span class="info-value"><?php echo ucfirst(htmlspecialchars($order['payment_method'])); ?></span>
            </div>
            <div class="info-item">
              <span class="info-label">Order Status:</span>
              <span class="info-value status-badge status-<?php echo htmlspecialchars($order['status']); ?>">
                <?php echo ucfirst(htmlspecialchars($order['status'])); ?>
              </span>
            </div>
            <div class="info-item">
              <span class="info-label">Total Amount:</span>
              <span class="info-value">₱<?php echo number_format($order['total'], 2); ?></span>
            </div>
          </div>

          <div class="order-summary">
            <h2>Order Summary</h2>
            <div class="order-items">
              <?php foreach ($orderItems as $item): ?>
              <div class="order-item">
                <div class="item-image">
                  <img src="<?php echo htmlspecialchars($item['image']); ?>" alt="<?php echo htmlspecialchars($item['product_name']); ?>">
                </div>
                <div class="item-details">
                  <h3><?php echo htmlspecialchars($item['product_name']); ?></h3>
                  <p>Quantity: <?php echo htmlspecialchars($item['quantity']); ?></p>
                  <p>Price: ₱<?php echo number_format($item['price'], 2); ?></p>
                </div>
                <div class="item-total">
                  ₱<?php echo number_format($item['total'], 2); ?>
                </div>
              </div>
              <?php endforeach; ?>
            </div>

            <div class="order-totals">
              <div class="total-row">
                <span>Subtotal:</span>
                <span>₱<?php echo number_format($order['subtotal'], 2); ?></span>
              </div>
              <div class="total-row">
                <span>Shipping:</span>
                <span>₱<?php echo number_format($order['shipping_cost'], 2); ?></span>
              </div>
              <?php if ($order['fitting_fee'] > 0): ?>
              <div class="total-row">
                <span>Fitting Fee:</span>
                <span>₱<?php echo number_format($order['fitting_fee'], 2); ?></span>
              </div>
              <?php endif; ?>
              <?php if ($order['discount'] > 0): ?>
              <div class="total-row">
                <span>Discount:</span>
                <span>-₱<?php echo number_format($order['discount'], 2); ?></span>
              </div>
              <?php endif; ?>
              <div class="total-row grand-total">
                <span>Total:</span>
                <span>₱<?php echo number_format($order['total'], 2); ?></span>
              </div>
            </div>
          </div>

          <?php if ($fittingAppointment): ?>
          <div class="fitting-appointment">
            <h2>Fitting Appointment</h2>
            <div class="appointment-details">
              <div class="appointment-date">
                <div class="date-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                </div>
                <div>
                  <span class="date-label">Date:</span>
                  <span class="date-value"><?php echo date('l, F d, Y', strtotime($fittingAppointment['appointment_date'])); ?></span>
                </div>
              </div>
              <div class="appointment-time">
                <div class="time-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <span class="time-label">Time:</span>
                  <span class="time-value"><?php echo date('h:i A', strtotime($fittingAppointment['appointment_time'])); ?></span>
                </div>
              </div>
            </div>
          </div>
          <?php endif; ?>

          <div class="shipping-address">
            <h2>Shipping Address</h2>
            <div class="address-details">
              <p class="customer-name"><?php echo htmlspecialchars($order['customer_name']); ?></p>
              <p class="customer-phone"><?php echo htmlspecialchars($order['customer_phone']); ?></p>
              <p class="customer-address"><?php echo htmlspecialchars($order['shipping_address']); ?></p>
            </div>
          </div>

          <div class="next-steps">
            <h2>What's Next?</h2>
            <div class="steps-list">
              <div class="step">
                <div class="step-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div class="step-content">
                  <h3>Order Confirmation</h3>
                  <p>You will receive an order confirmation email with details of your order.</p>
                </div>
              </div>
              <div class="step">
                <div class="step-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                </div>
                <div class="step-content">
                  <h3>Order Processing</h3>
                  <p>We will begin processing your order and notify you when it's ready.</p>
                </div>
              </div>
              <div class="step">
                <div class="step-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="step-content">
                  <h3>Order Complete</h3>
                  <p>Your order will be delivered or ready for pickup as per your selection.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="action-buttons">
            <a href="orders.php" class="btn-primary">View My Orders</a>
            <a href="shop.php" class="btn-secondary">Continue Shopping</a>
          </div>
        </div>
      </div>
    </main>

    <?php include 'includes/footer.php'; ?>

    <script>
      // Progress bar animation
      document.addEventListener('DOMContentLoaded', function() {
        const progressBar = document.querySelector('.checkout-progress::after');
        if (progressBar) {
          progressBar.style.width = '100%';
        }
      });
    </script>
  </body>
</html>
