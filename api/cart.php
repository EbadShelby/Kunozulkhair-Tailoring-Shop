<?php
/**
 * Cart API
 *
 * This file handles all cart-related operations:
 * - Get cart items
 * - Add item to cart
 * - Update item quantity
 * - Remove item from cart
 */

// Start session
session_start();

// Include database connection
require_once '../config/db_connect.php';

// Set content type to JSON
header('Content-Type: application/json');

// Function to get or create a cart session
function getOrCreateCartSession($conn) {
    // Generate a unique session ID if not exists
    if (!isset($_SESSION['cart_session_id'])) {
        $_SESSION['cart_session_id'] = session_id();
    }

    $sessionId = $_SESSION['cart_session_id'];
    $customerId = isset($_SESSION['customer_id']) ? $_SESSION['customer_id'] : null;

    // Check if cart session exists
    $query = "SELECT id FROM cart_sessions WHERE session_id = ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "s", $sessionId);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        return $row['id'];
    } else {
        // Create new cart session
        $query = "INSERT INTO cart_sessions (session_id, customer_id) VALUES (?, ?)";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "si", $sessionId, $customerId);
        mysqli_stmt_execute($stmt);
        return mysqli_insert_id($conn);
    }
}

// Function to get cart items
function getCartItems($conn, $cartSessionId) {
    $query = "
        SELECT ci.id, ci.product_id, ci.quantity, p.name, p.price, p.image
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.id
        WHERE ci.cart_session_id = ?
    ";

    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "i", $cartSessionId);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    $items = [];
    $total = 0;

    while ($row = mysqli_fetch_assoc($result)) {
        $itemTotal = $row['price'] * $row['quantity'];
        $total += $itemTotal;

        $items[] = [
            'id' => $row['id'],
            'product_id' => $row['product_id'],
            'name' => $row['name'],
            'price' => $row['price'],
            'quantity' => $row['quantity'],
            'image' => $row['image'],
            'item_total' => $itemTotal
        ];
    }

    return [
        'items' => $items,
        'total' => $total,
        'count' => count($items)
    ];
}

// Function to add item to cart
function addToCart($conn, $cartSessionId, $productId, $quantity = 1) {
    // Check if product exists and get stock information
    $query = "SELECT id, name, stock FROM products WHERE id = ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "i", $productId);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if (mysqli_num_rows($result) == 0) {
        return ['success' => false, 'message' => 'Product not found'];
    }

    // Get product details
    $product = mysqli_fetch_assoc($result);

    // Check if product is in stock
    if ($product['stock'] <= 0) {
        return ['success' => false, 'message' => 'Product is out of stock'];
    }

    // Check if item already exists in cart
    $query = "SELECT id, quantity FROM cart_items WHERE cart_session_id = ? AND product_id = ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "ii", $cartSessionId, $productId);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if (mysqli_num_rows($result) > 0) {
        // Update quantity
        $row = mysqli_fetch_assoc($result);
        $newQuantity = $row['quantity'] + $quantity;

        // Check if requested quantity exceeds available stock
        if ($newQuantity > $product['stock']) {
            return [
                'success' => false,
                'message' => 'Not enough stock available. Only ' . $product['stock'] . ' items left.',
                'available_stock' => $product['stock'],
                'current_cart_quantity' => $row['quantity']
            ];
        }

        $query = "UPDATE cart_items SET quantity = ? WHERE id = ?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "ii", $newQuantity, $row['id']);
        mysqli_stmt_execute($stmt);
    } else {
        // Check if requested quantity exceeds available stock
        if ($quantity > $product['stock']) {
            return [
                'success' => false,
                'message' => 'Not enough stock available. Only ' . $product['stock'] . ' items left.',
                'available_stock' => $product['stock']
            ];
        }

        // Add new item
        $query = "INSERT INTO cart_items (cart_session_id, product_id, quantity) VALUES (?, ?, ?)";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "iii", $cartSessionId, $productId, $quantity);
        mysqli_stmt_execute($stmt);
    }

    return [
        'success' => true,
        'message' => 'Item added to cart',
        'product_name' => $product['name']
    ];
}

// Function to update item quantity
function updateCartItem($conn, $cartItemId, $quantity) {
    if ($quantity <= 0) {
        // Remove item if quantity is 0 or negative
        $query = "DELETE FROM cart_items WHERE id = ?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "i", $cartItemId);
        mysqli_stmt_execute($stmt);
        return ['success' => true, 'message' => 'Item removed from cart'];
    } else {
        // Get product ID from cart item
        $query = "SELECT product_id FROM cart_items WHERE id = ?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "i", $cartItemId);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        if (mysqli_num_rows($result) == 0) {
            return ['success' => false, 'message' => 'Cart item not found'];
        }

        $cartItem = mysqli_fetch_assoc($result);
        $productId = $cartItem['product_id'];

        // Check product stock
        $query = "SELECT stock, name FROM products WHERE id = ?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "i", $productId);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        if (mysqli_num_rows($result) == 0) {
            return ['success' => false, 'message' => 'Product not found'];
        }

        $product = mysqli_fetch_assoc($result);

        // Check if requested quantity exceeds available stock
        if ($quantity > $product['stock']) {
            return [
                'success' => false,
                'message' => 'Not enough stock available. Only ' . $product['stock'] . ' items left.',
                'available_stock' => $product['stock']
            ];
        }

        // Update quantity
        $query = "UPDATE cart_items SET quantity = ? WHERE id = ?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "ii", $quantity, $cartItemId);
        mysqli_stmt_execute($stmt);

        return [
            'success' => true,
            'message' => 'Item quantity updated',
            'product_name' => $product['name']
        ];
    }
}

// Function to remove item from cart
function removeCartItem($conn, $cartItemId) {
    $query = "DELETE FROM cart_items WHERE id = ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "i", $cartItemId);
    mysqli_stmt_execute($stmt);
    return ['success' => true, 'message' => 'Item removed from cart'];
}

// Handle API requests
$action = isset($_GET['action']) ? $_GET['action'] : '';
$cartSessionId = getOrCreateCartSession($conn);
$response = ['success' => false, 'message' => 'Invalid action'];

switch ($action) {
    case 'get':
        $response = getCartItems($conn, $cartSessionId);
        break;

    case 'add':
        $productId = isset($_POST['product_id']) ? intval($_POST['product_id']) : 0;
        $quantity = isset($_POST['quantity']) ? intval($_POST['quantity']) : 1;

        if ($productId > 0) {
            $response = addToCart($conn, $cartSessionId, $productId, $quantity);
        } else {
            $response = ['success' => false, 'message' => 'Invalid product ID'];
        }
        break;

    case 'update':
        $cartItemId = isset($_POST['cart_item_id']) ? intval($_POST['cart_item_id']) : 0;
        $quantity = isset($_POST['quantity']) ? intval($_POST['quantity']) : 0;

        if ($cartItemId > 0) {
            $response = updateCartItem($conn, $cartItemId, $quantity);
        } else {
            $response = ['success' => false, 'message' => 'Invalid cart item ID'];
        }
        break;

    case 'remove':
        $cartItemId = isset($_POST['cart_item_id']) ? intval($_POST['cart_item_id']) : 0;

        if ($cartItemId > 0) {
            $response = removeCartItem($conn, $cartItemId);
        } else {
            $response = ['success' => false, 'message' => 'Invalid cart item ID'];
        }
        break;
}

// Return JSON response
echo json_encode($response);

// Close connection
mysqli_close($conn);
?>
