<?php
/**
 * Admin Authentication Check
 * 
 * This file checks if the user is logged in and has admin privileges.
 * Include this file at the top of admin-only pages.
 */

// Include session management
require_once 'config/session.php';

// Check if user is logged in and is an admin
require_admin();
?>
