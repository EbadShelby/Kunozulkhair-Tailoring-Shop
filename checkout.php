<?php
/**
 * Checkout Page
 *
 * This page handles the checkout process for customer orders.
 */

// Start session
session_start();

// Include database connection and session management
require_once 'config/db_connect.php';
require_once 'config/session.php';

// Initialize variables
$error_message = '';
$success_message = '';
$order_id = '';
$redirect_to_success = false;

// Check if cart exists in session
if (!isset($_SESSION['cart_session_id'])) {
    // Redirect to cart page if no items in cart
    header("Location: shop.php");
    exit;
}

// Get cart session ID
$cartSessionId = $_SESSION['cart_session_id'];

// Get cart items
$cartQuery = "
    SELECT ci.id, ci.product_id, ci.quantity, p.name, p.price, p.image
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    WHERE ci.cart_session_id = ?
";
$stmt = mysqli_prepare($conn, $cartQuery);
mysqli_stmt_bind_param($stmt, "i", $cartSessionId);
mysqli_stmt_execute($stmt);
$cartResult = mysqli_stmt_get_result($stmt);

$cartItems = [];
$subtotal = 0;

while ($item = mysqli_fetch_assoc($cartResult)) {
    $itemTotal = $item['price'] * $item['quantity'];
    $subtotal += $itemTotal;

    $cartItems[] = [
        'id' => $item['id'],
        'product_id' => $item['product_id'],
        'name' => $item['name'],
        'price' => $item['price'],
        'quantity' => $item['quantity'],
        'image' => $item['image'],
        'total' => $itemTotal
    ];
}

// If cart is empty, redirect to shop
if (count($cartItems) === 0) {
    header("Location: shop.php");
    exit;
}

// Process checkout form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['place_order'])) {
    // Get form data
    $customerName = trim($_POST['customer_name'] ?? '');
    $customerPhone = trim($_POST['customer_phone'] ?? '');
    $customerAddress = trim($_POST['customer_address'] ?? '');
    $customerEmail = isset($_SESSION['customer_email']) ? $_SESSION['customer_email'] : trim($_POST['customer_email'] ?? '');
    $customerId = isset($_SESSION['customer_id']) ? $_SESSION['customer_id'] : null;
    $paymentMethod = $_POST['payment'] ?? 'cash';
    $deliveryOption = 'standard'; // Only standard delivery is available

    // Calculate costs
    $shippingCost = 40.00; // Standard delivery cost
    $fittingFee = 0.00;
    $discount = 0.00;

    // No fitting appointment functionality

    // No voucher discount functionality

    // Calculate total
    $total = $subtotal + $shippingCost;

    // Validate input
    if (empty($customerName) || empty($customerPhone) || empty($customerAddress) || empty($customerEmail)) {
        $error_message = 'Please fill in all required fields';
    } elseif (!filter_var($customerEmail, FILTER_VALIDATE_EMAIL)) {
        $error_message = 'Please enter a valid email address';
    } else {
        // Generate unique order number
        $orderNumber = 'ORD-' . strtoupper(substr(uniqid(), -5)) . date('ymd');

        // Begin transaction
        mysqli_begin_transaction($conn);

        try {
            // Insert order into database
            $orderQuery = "
                INSERT INTO orders (
                    order_number, customer_id, customer_name, customer_email,
                    customer_phone, shipping_address, subtotal, shipping_cost,
                    total, payment_method
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ";

            $orderStmt = mysqli_prepare($conn, $orderQuery);
            mysqli_stmt_bind_param(
                $orderStmt,
                "sissssdds",
                $orderNumber,
                $customerId,
                $customerName,
                $customerEmail,
                $customerPhone,
                $customerAddress,
                $subtotal,
                $shippingCost,
                $total,
                $paymentMethod
            );

            mysqli_stmt_execute($orderStmt);
            $orderId = mysqli_insert_id($conn);

            // Insert order items
            foreach ($cartItems as $item) {
                $itemQuery = "
                    INSERT INTO order_items (
                        order_id, product_id, product_name, quantity, price, total
                    ) VALUES (?, ?, ?, ?, ?, ?)
                ";

                $itemStmt = mysqli_prepare($conn, $itemQuery);
                mysqli_stmt_bind_param(
                    $itemStmt,
                    "iisidd",
                    $orderId,
                    $item['product_id'],
                    $item['name'],
                    $item['quantity'],
                    $item['price'],
                    $item['total']
                );

                mysqli_stmt_execute($itemStmt);
            }

            // Add initial status to order_status_history
            $statusQuery = "
                INSERT INTO order_status_history (
                    order_id, status, notes
                ) VALUES (?, 'new', 'Order placed by customer')
            ";

            $statusStmt = mysqli_prepare($conn, $statusQuery);
            mysqli_stmt_bind_param($statusStmt, "i", $orderId);
            mysqli_stmt_execute($statusStmt);

            // No fitting appointment functionality

            // Clear cart after successful order
            $clearCartQuery = "DELETE FROM cart_items WHERE cart_session_id = ?";
            $clearCartStmt = mysqli_prepare($conn, $clearCartQuery);
            mysqli_stmt_bind_param($clearCartStmt, "i", $cartSessionId);
            mysqli_stmt_execute($clearCartStmt);

            // Commit transaction
            mysqli_commit($conn);

            // Set success message and order ID for display
            $success_message = 'Order placed successfully!';
            $order_id = $orderNumber;

            // Set flag to redirect to success page
            $redirect_to_success = true;

            // Store order info in session for success page
            $_SESSION['last_order'] = [
                'id' => $orderId,
                'order_number' => $orderNumber,
                'total' => $total
            ];

        } catch (Exception $e) {
            // Rollback transaction on error
            mysqli_rollback($conn);
            $error_message = 'An error occurred while processing your order. Please try again.';
        }
    }

    // Redirect to success page if order was successful
    if ($redirect_to_success) {
        header("Location: order-success.php");
        exit;
    }
}

// Get customer info if logged in
$customerName = '';
$customerEmail = '';
$customerPhone = '';
$customerAddress = '';

if (isset($_SESSION['customer_id'])) {
    $customerId = $_SESSION['customer_id'];
    $customerQuery = "SELECT name, email, phone, address FROM customers WHERE id = ?";
    $customerStmt = mysqli_prepare($conn, $customerQuery);
    mysqli_stmt_bind_param($customerStmt, "i", $customerId);
    mysqli_stmt_execute($customerStmt);
    $customerResult = mysqli_stmt_get_result($customerStmt);

    if ($customer = mysqli_fetch_assoc($customerResult)) {
        $customerName = $customer['name'];
        $customerEmail = $customer['email'];
        $customerPhone = $customer['phone'] ?? '';
        $customerAddress = $customer['address'] ?? '';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Checkout - Kunozulkhair Tailoring Shop</title>
    <link rel="stylesheet" href="css/shared/general.css" />
    <link rel="stylesheet" href="css/shared/header.css" />
    <link rel="stylesheet" href="css/shared/reset.css" />
    <link rel="stylesheet" href="css/shared/utils.css" />
    <link rel="stylesheet" href="css/pages/checkout.css" />
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
        <div class="progress-step active">
          <div class="step-number">2</div>
          <div class="step-label">Checkout</div>
        </div>
        <div class="progress-step">
          <div class="step-number">3</div>
          <div class="step-label">Order Complete</div>
        </div>
      </div>
    </header>

    <main>
      <?php if (!empty($error_message)): ?>
      <div class="alert alert-error">
        <?php echo htmlspecialchars($error_message); ?>
      </div>
      <?php endif; ?>

      <?php if (!empty($success_message)): ?>
      <div class="alert alert-success">
        <?php echo htmlspecialchars($success_message); ?>
        <?php if (!empty($order_id)): ?>
        <p>Your order number is: <strong><?php echo htmlspecialchars($order_id); ?></strong></p>
        <?php endif; ?>
      </div>
      <?php endif; ?>

      <form method="POST" action="checkout.php" id="checkout-form">
        <div class="checkout-container">
          <!-- Left Column - Products Section -->
          <div class="left-column">
            <section class="checkout-section">
              <div class="section-header">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <h2>Products Ordered</h2>
              </div>
              <div class="products-list" id="products-list">
                <?php foreach ($cartItems as $item): ?>
                <div class="product-item">
                  <img src="<?php echo htmlspecialchars($item['image']); ?>" alt="<?php echo htmlspecialchars($item['name']); ?>" class="product-image">
                  <div class="product-details">
                    <h3 class="product-name"><?php echo htmlspecialchars($item['name']); ?></h3>
                    <p class="product-quantity">Quantity: <?php echo htmlspecialchars($item['quantity']); ?></p>
                  </div>
                  <div class="product-price">₱<?php echo number_format($item['price'], 2); ?></div>
                </div>
                <?php endforeach; ?>
              </div>

            </section>


        </div>

        <!-- Right Column - Checkout Details -->
        <div class="right-column">
          <!-- Delivery Address Section -->
          <section class="checkout-section">
            <div class="section-header">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <h2>Delivery Address</h2>
            </div>
            <div class="delivery-address" style="display: flex; justify-content: space-between; align-items: flex-start; padding: 1.25rem; background: #f9f7f1; border-radius: 10px; border: 1px solid #E8E8E8; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);">
              <?php if (isset($_SESSION['customer_id']) && !empty($customerName)): ?>
              <!-- Display saved address for logged-in customer -->
              <div class="address-details" style="flex: 1;">
                <h3 style="font-weight: 600; margin-bottom: 0.75rem; color: #4A4A4A; font-size: 1.1rem;"><span id="customer-name"><?php echo htmlspecialchars($customerName); ?></span> | <span id="customer-phone"><?php echo htmlspecialchars($customerPhone); ?></span></h3>
                <p id="customer-address" style="color: #555; line-height: 1.5; font-size: 0.95rem;"><?php echo htmlspecialchars($customerAddress); ?></p>
                <input type="hidden" name="customer_name" value="<?php echo htmlspecialchars($customerName); ?>">
                <input type="hidden" name="customer_phone" value="<?php echo htmlspecialchars($customerPhone); ?>">
                <input type="hidden" name="customer_address" value="<?php echo htmlspecialchars($customerAddress); ?>">
                <input type="hidden" name="customer_email" value="<?php echo htmlspecialchars($customerEmail); ?>">
              </div>
              <button type="button" class="change-btn" id="edit-address-btn" style="color: #D4AF37; background: none; border: 1px solid #D4AF37; cursor: pointer; font-weight: 500; padding: 0.6rem 1.2rem; border-radius: 6px; font-size: 0.95rem;">Edit</button>
              <?php else: ?>
              <!-- Address form for guest checkout -->
              <div class="address-form" style="width: 100%;">
                <div class="form-group" style="margin-bottom: 1.25rem;">
                  <label for="customer_name" style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #4A4A4A; font-size: 0.95rem;">Full Name</label>
                  <input type="text" id="customer_name" name="customer_name" required value="<?php echo htmlspecialchars($customerName); ?>" style="width: 100%; padding: 0.85rem; border: 1px solid #E8E8E8; border-radius: 6px; font-size: 1rem; background-color: #fff;">
                </div>
                <div class="form-group" style="margin-bottom: 1.25rem;">
                  <label for="customer_email" style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #4A4A4A; font-size: 0.95rem;">Email</label>
                  <input type="email" id="customer_email" name="customer_email" required value="<?php echo htmlspecialchars($customerEmail); ?>" style="width: 100%; padding: 0.85rem; border: 1px solid #E8E8E8; border-radius: 6px; font-size: 1rem; background-color: #fff;">
                </div>
                <div class="form-group" style="margin-bottom: 1.25rem;">
                  <label for="customer_phone" style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #4A4A4A; font-size: 0.95rem;">Phone Number</label>
                  <input type="tel" id="customer_phone" name="customer_phone" required value="<?php echo htmlspecialchars($customerPhone); ?>" style="width: 100%; padding: 0.85rem; border: 1px solid #E8E8E8; border-radius: 6px; font-size: 1rem; background-color: #fff;">
                </div>
                <div class="form-group" style="margin-bottom: 1.25rem;">
                  <label for="customer_address" style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #4A4A4A; font-size: 0.95rem;">Complete Address</label>
                  <textarea id="customer_address" name="customer_address" rows="3" required style="width: 100%; padding: 0.85rem; border: 1px solid #E8E8E8; border-radius: 6px; font-size: 1rem; background-color: #fff;"><?php echo htmlspecialchars($customerAddress); ?></textarea>
                </div>
              </div>
              <?php endif; ?>

              <!-- Hidden address form for editing (initially hidden) -->
              <div class="address-form" id="edit-address-form" style="display: none; width: 100%;">
                <div class="form-group" style="margin-bottom: 1.25rem;">
                  <label for="edit_customer_name" style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #4A4A4A; font-size: 0.95rem;">Full Name</label>
                  <input type="text" id="edit_customer_name" name="customer_name" required value="<?php echo htmlspecialchars($customerName); ?>" style="width: 100%; padding: 0.85rem; border: 1px solid #E8E8E8; border-radius: 6px; font-size: 1rem; background-color: #fff;">
                </div>
                <div class="form-group" style="margin-bottom: 1.25rem;">
                  <label for="edit_customer_email" style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #4A4A4A; font-size: 0.95rem;">Email</label>
                  <input type="email" id="edit_customer_email" name="customer_email" required value="<?php echo htmlspecialchars($customerEmail); ?>" style="width: 100%; padding: 0.85rem; border: 1px solid #E8E8E8; border-radius: 6px; font-size: 1rem; background-color: #fff;">
                </div>
                <div class="form-group" style="margin-bottom: 1.25rem;">
                  <label for="edit_customer_phone" style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #4A4A4A; font-size: 0.95rem;">Phone Number</label>
                  <input type="tel" id="edit_customer_phone" name="customer_phone" required value="<?php echo htmlspecialchars($customerPhone); ?>" style="width: 100%; padding: 0.85rem; border: 1px solid #E8E8E8; border-radius: 6px; font-size: 1rem; background-color: #fff;">
                </div>
                <div class="form-group" style="margin-bottom: 1.25rem;">
                  <label for="edit_customer_address" style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #4A4A4A; font-size: 0.95rem;">Complete Address</label>
                  <textarea id="edit_customer_address" name="customer_address" rows="3" required style="width: 100%; padding: 0.85rem; border: 1px solid #E8E8E8; border-radius: 6px; font-size: 1rem; background-color: #fff;"><?php echo htmlspecialchars($customerAddress); ?></textarea>
                </div>
                <button type="button" class="save-address-btn" id="save-address-btn" style="background-color: #D4AF37; color: white; border: none; cursor: pointer; font-weight: 500; padding: 0.75rem 1.5rem; border-radius: 6px; font-size: 1rem; margin-top: 1rem; box-shadow: 0 2px 4px rgba(212, 175, 55, 0.2);">Save Address</button>
              </div>
            </div>
          </section>

          <!-- Shipping Section (Updated) -->
          <section class="checkout-section">
            <div class="section-header">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
              <h2>Delivery Information</h2>
            </div>

            <div class="delivery-options">
              <div class="delivery-option">
                <input type="hidden" name="delivery" value="standard">
                <div class="option-content">
                  <div>
                    <div class="option-name">Standard Delivery</div>
                    <div class="option-description">Receive in 3-5 business days</div>
                  </div>
                  <div class="option-price">₱40</div>
                </div>
              </div>
            </div>
          </section>



          <!-- Payment Method Section -->
          <section class="checkout-section">
            <div class="section-header">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
              </svg>
              <h2>Payment Method</h2>
            </div>
            <div class="payment-methods">
              <label class="payment-method">
                <input type="radio" name="payment" value="cash" checked>
                <div class="payment-method-details">
                  <div class="method-icon cash-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                    </svg>
                  </div>
                  <div>Cash on Delivery</div>
                </div>
              </label>

              <label class="payment-method">
                <input type="radio" name="payment" value="gcash">
                <div class="payment-method-details">
                  <div class="method-icon gcash-icon">
                    <img src="assets/images/gcash.png" alt="GCash" onerror="this.src='assets/images/logo.jpg'; this.style.opacity='0.5';">
                  </div>
                  <div>GCash</div>
                </div>
              </label>
            </div>
          </section>

          <!-- Order Summary Section (Updated) -->
          <section class="summary-section">
            <h3>Order Summary</h3>
            <div id="cart-items">
              <?php foreach ($cartItems as $item): ?>
              <div class="summary-item">
                <span><?php echo htmlspecialchars($item['name']); ?> x <?php echo htmlspecialchars($item['quantity']); ?></span>
                <span>₱<?php echo number_format($item['total'], 2); ?></span>
              </div>
              <?php endforeach; ?>
            </div>

            <div class="summary-row">
              <span>Subtotal:</span>
              <span id="subtotal">₱<?php echo number_format($subtotal, 2); ?></span>
            </div>
            <div class="summary-row">
              <span>Shipping:</span>
              <span id="shipping">₱40.00</span>
            </div>

            <div class="summary-row total">
              <span>Total Payment:</span>
              <span id="total">₱<?php echo number_format($subtotal + 40.00, 2); ?></span>
            </div>
            <div class="delivery-estimate">
              <div class="estimate-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              </div>
              <div class="estimate-details">
                <div class="estimate-label">Estimated Completion:</div>
                <div class="estimate-date" id="estimate-date"><?php echo date('F d, Y', strtotime('+7 days')); ?></div>
              </div>
            </div>
            <button type="submit" name="place_order" class="place-order-btn" id="place-order-btn">Place Order</button>

            <div class="order-note">
              <p>By placing your order, you agree to our <a href="#">Terms & Conditions</a> and <a href="#">Privacy Policy</a>.</p>
            </div>
          </section>
        </div>
      </div>
    </form>
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
            <li><a href="embroidery-services.php">Embroidery Services</a></li>
            <li><a href="custom-dressmaking.php">Custom Dressmaking</a></li>
            <li><a href="alterations-and-repair.php">Alterations & Repairs</a></li>
            <li><a href="bridal-and-formalwear.php">Bridal & Formal Wear</a></li>
            <li><a href="curtains-and-hometextiles.php">Home Textiles</a></li>
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
    <script type="module" src="js/checkout.js"></script>
    <script src="js/breakpoint-indicator.js"></script>

    <!-- Add custom styles for animations -->
    <style>
      @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.6; }
        100% { opacity: 1; }
      }

      .updated {
        animation: pulse 1s ease;
        font-weight: bold;
        color: #D4AF37;
      }

      /* Progress bar animation */
      .checkout-progress::after {
        content: "";
        position: absolute;
        top: 16px;
        left: 5%;
        width: 45%; /* Position it between step 1 and 2 for checkout page */
        height: 2px;
        background-color: #D4AF37;
        z-index: 0;
        transition: width 0.5s ease;
      }
    </style>
  </body>
</html>




