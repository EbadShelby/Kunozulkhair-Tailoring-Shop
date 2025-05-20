<?php
/**
 * Database Connection
 * 
 * This file establishes a connection to the MySQL database.
 */

// Database configuration
$db_host = 'localhost';     // Database host (usually localhost for XAMPP)
$db_name = 'kunozulkhair_db'; // Database name
$db_user = 'root';          // Database username (default for XAMPP is root)
$db_pass = '';              // Database password (default for XAMPP is empty)

// Create connection
$conn = mysqli_connect($db_host, $db_user, $db_pass, $db_name);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Set character set to UTF-8
mysqli_set_charset($conn, "utf8mb4");
?>
