<?php
/**
 * Customer Table Initialization Script
 * 
 * This script creates the customers table for the website.
 * Run this script once to set up the customers table.
 */

// Include database connection
require_once 'db_connect.php';

// Create customers table
$customers_table = "
CREATE TABLE IF NOT EXISTS `customers` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(20) DEFAULT NULL,
  `address` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
";

if (mysqli_query($conn, $customers_table)) {
    echo "Customers table created successfully<br>";
} else {
    echo "Error creating customers table: " . mysqli_error($conn) . "<br>";
}

echo "<br>Customer table initialization completed!";

// Close connection
mysqli_close($conn);
?>
