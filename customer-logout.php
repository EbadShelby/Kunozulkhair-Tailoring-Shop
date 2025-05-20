<?php
/**
 * Customer Logout Script
 * 
 * This script handles customer logout by destroying the session.
 */

// Start session if not already started
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Unset customer session variables
unset($_SESSION['customer_id']);
unset($_SESSION['customer_name']);
unset($_SESSION['customer_email']);
unset($_SESSION['login_time']);

// If it's desired to kill the session, also delete the session cookie
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// Destroy the session
session_destroy();

// Start a new session for the message
session_start();
$_SESSION['success_message'] = 'You have been successfully logged out.';

// Redirect to login page
header("Location: login-form.php");
exit;
?>
