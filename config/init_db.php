<?php
/**
 * Database Initialization Script
 * 
 * This script creates the necessary tables and inserts default users.
 * Run this script once to set up your database.
 */

// Include database connection
require_once 'db_connect.php';

// Create users table
$users_table = "
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('admin', 'tailor') NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
";

if (mysqli_query($conn, $users_table)) {
    echo "Users table created successfully<br>";
} else {
    echo "Error creating users table: " . mysqli_error($conn) . "<br>";
}

// Check if default users already exist
$check_admin = mysqli_query($conn, "SELECT * FROM `users` WHERE email = 'admin@kunozulkhair.com'");
$check_tailor = mysqli_query($conn, "SELECT * FROM `users` WHERE email = 'tailor@kunozulkhair.com'");

// Insert default admin if not exists
if (mysqli_num_rows($check_admin) == 0) {
    $admin_password = password_hash('admin123', PASSWORD_DEFAULT);
    $insert_admin = "INSERT INTO `users` (`username`, `email`, `password`, `role`, `name`) VALUES
    ('admin', 'admin@kunozulkhair.com', '$admin_password', 'admin', 'Admin User')";
    
    if (mysqli_query($conn, $insert_admin)) {
        echo "Default admin user created successfully<br>";
    } else {
        echo "Error creating admin user: " . mysqli_error($conn) . "<br>";
    }
} else {
    echo "Admin user already exists<br>";
}

// Insert default tailor if not exists
if (mysqli_num_rows($check_tailor) == 0) {
    $tailor_password = password_hash('tailor123', PASSWORD_DEFAULT);
    $insert_tailor = "INSERT INTO `users` (`username`, `email`, `password`, `role`, `name`) VALUES
    ('tailor', 'tailor@kunozulkhair.com', '$tailor_password', 'tailor', 'Ryan Mentang')";
    
    if (mysqli_query($conn, $insert_tailor)) {
        echo "Default tailor user created successfully<br>";
    } else {
        echo "Error creating tailor user: " . mysqli_error($conn) . "<br>";
    }
} else {
    echo "Tailor user already exists<br>";
}

echo "<br>Database initialization completed!";

// Close connection
mysqli_close($conn);
?>
