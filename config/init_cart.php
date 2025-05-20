<?php
/**
 * Cart Tables Initialization Script
 * 
 * This script creates the necessary tables for cart functionality.
 */

// Include database connection
require_once 'db_connect.php';

// Create cart_sessions table
$cart_sessions_table = "
CREATE TABLE IF NOT EXISTS `cart_sessions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `session_id` VARCHAR(255) NOT NULL UNIQUE,
  `customer_id` INT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
";

if (mysqli_query($conn, $cart_sessions_table)) {
    echo "Cart sessions table created successfully<br>";
} else {
    echo "Error creating cart sessions table: " . mysqli_error($conn) . "<br>";
}

// Create cart_items table
$cart_items_table = "
CREATE TABLE IF NOT EXISTS `cart_items` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `cart_session_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `quantity` INT NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`cart_session_id`) REFERENCES `cart_sessions`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
";

if (mysqli_query($conn, $cart_items_table)) {
    echo "Cart items table created successfully<br>";
} else {
    echo "Error creating cart items table: " . mysqli_error($conn) . "<br>";
}

echo "<br>Cart tables initialization completed!";

// Close connection
mysqli_close($conn);
?>
