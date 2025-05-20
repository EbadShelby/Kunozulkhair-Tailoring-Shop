<?php
/**
 * Customer Authentication Check
 * 
 * This file checks if the customer is logged in.
 * Include this file at the top of customer-only pages.
 */

// Start session if not already started
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

/**
 * Check if customer is logged in
 * 
 * @return bool True if customer is logged in, false otherwise
 */
function is_customer_logged_in() {
    return isset($_SESSION['customer_id']) && !empty($_SESSION['customer_id']);
}

/**
 * Redirect if customer is not logged in
 * 
 * @param string $redirect_url URL to redirect to if not logged in
 */
function require_customer_login($redirect_url = 'login-form.php') {
    if (!is_customer_logged_in()) {
        $_SESSION['error_message'] = 'You must be logged in to access this page.';
        header("Location: $redirect_url");
        exit;
    }
}

// Get customer information if logged in
$customer_id = $_SESSION['customer_id'] ?? null;
$customer_name = $_SESSION['customer_name'] ?? null;
$customer_email = $_SESSION['customer_email'] ?? null;
?>
