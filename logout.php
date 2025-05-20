<?php
/**
 * Logout Script
 *
 * This script handles user logout by destroying the session.
 */

// Start session if not already started
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Unset all session variables
$_SESSION = array();

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

// Set a logout message
session_start();
$_SESSION['success_message'] = 'You have been successfully logged out.';

// Create a page that clears sessionStorage and redirects
?>
<!DOCTYPE html>
<html>
<head>
    <title>Logging out...</title>
</head>
<body>
    <p>Logging out...</p>
    <script>
        // Clear sessionStorage
        sessionStorage.removeItem('currentUser');
        // Redirect to customer login page
        window.location.href = 'login-form.php';
    </script>
</body>
</html>
<?php
exit;
?>
