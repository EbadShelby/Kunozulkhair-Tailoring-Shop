<?php
/**
 * Tailor Authentication Check
 * 
 * This file checks if the user is logged in and has tailor privileges.
 * Include this file at the top of tailor-only pages.
 * Note: Admins can also access tailor pages.
 */

// Include session management
require_once 'config/session.php';

// Check if user is logged in and is a tailor or admin
require_tailor();
?>
