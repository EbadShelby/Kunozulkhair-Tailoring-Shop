-- Create users table for authentication
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

-- Insert default admin and tailor users
-- Note: In a real application, you would use password_hash() in PHP
-- For this example, we're using pre-hashed passwords for 'admin123' and 'tailor123'
INSERT INTO `users` (`username`, `email`, `password`, `role`, `name`) VALUES
('admin', 'admin@kunozulkhair.com', '$2y$10$YourHashedPasswordForAdmin123', 'admin', 'Admin User'),
('tailor', 'tailor@kunozulkhair.com', '$2y$10$YourHashedPasswordForTailor123', 'tailor', 'Ryan Mentang');
