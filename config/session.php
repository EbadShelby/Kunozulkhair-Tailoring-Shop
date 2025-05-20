<?php
/**
 * Session Management
 * 
 * This file handles session initialization and management.
 */

// Start session if not already started
if (session_status() == PHP_SESSION_NONE) {
    // Set secure session parameters
    ini_set('session.use_only_cookies', 1);
    ini_set('session.use_strict_mode', 1);
    
    session_start();
}

/**
 * Check if user is logged in
 * 
 * @return bool True if user is logged in, false otherwise
 */
function is_logged_in() {
    return isset($_SESSION['user_id']) && !empty($_SESSION['user_id']);
}

/**
 * Check if user has admin role
 * 
 * @return bool True if user is an admin, false otherwise
 */
function is_admin() {
    return is_logged_in() && isset($_SESSION['user_role']) && $_SESSION['user_role'] === 'admin';
}

/**
 * Check if user has tailor role
 * 
 * @return bool True if user is a tailor, false otherwise
 */
function is_tailor() {
    return is_logged_in() && isset($_SESSION['user_role']) && $_SESSION['user_role'] === 'tailor';
}

/**
 * Redirect if user is not logged in
 * 
 * @param string $redirect_url URL to redirect to if not logged in
 */
function require_login($redirect_url = 'admin-login.php') {
    if (!is_logged_in()) {
        $_SESSION['error_message'] = 'You must be logged in to access this page.';
        header("Location: $redirect_url");
        exit;
    }
}

/**
 * Redirect if user is not an admin
 * 
 * @param string $redirect_url URL to redirect to if not an admin
 */
function require_admin($redirect_url = 'admin-login.php') {
    if (!is_admin()) {
        $_SESSION['error_message'] = 'You must be an admin to access this page.';
        header("Location: $redirect_url");
        exit;
    }
}

/**
 * Redirect if user is not a tailor
 * 
 * @param string $redirect_url URL to redirect to if not a tailor
 */
function require_tailor($redirect_url = 'admin-login.php') {
    if (!is_tailor() && !is_admin()) {
        $_SESSION['error_message'] = 'You must be a tailor to access this page.';
        header("Location: $redirect_url");
        exit;
    }
}
?>
