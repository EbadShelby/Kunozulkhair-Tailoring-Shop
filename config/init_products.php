<?php
/**
 * Products Table Initialization Script
 * 
 * This script creates the products table for inventory management.
 */

// Include database connection
require_once 'db_connect.php';

// Create products table
$products_table = "
CREATE TABLE IF NOT EXISTS `products` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `stock` INT NOT NULL DEFAULT 0,
  `fabric` VARCHAR(50),
  `color` VARCHAR(50),
  `sizes` VARCHAR(100),
  `description` TEXT,
  `image` VARCHAR(255),
  `reorder_level` INT DEFAULT 10,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
";

if (mysqli_query($conn, $products_table)) {
    echo "Products table created successfully<br>";
} else {
    echo "Error creating products table: " . mysqli_error($conn) . "<br>";
}

// Check if there are any products
$check_products = mysqli_query($conn, "SELECT COUNT(*) as count FROM `products`");
$row = mysqli_fetch_assoc($check_products);

// Insert sample products if the table is empty
if ($row['count'] == 0) {
    $sample_products = [
        [
            'name' => 'Verdant Belted Dress',
            'category' => 'casual',
            'price' => 1299.00,
            'stock' => 25,
            'fabric' => 'cotton',
            'color' => 'green',
            'sizes' => 's,m,l',
            'description' => 'Elegant mint green belted dress perfect for casual outings and summer occasions',
            'image' => 'assets/images/Verrdant-Belted-Dress.jpg',
            'reorder_level' => 5
        ],
        [
            'name' => 'Lavender Whisper Dress',
            'category' => 'formal',
            'price' => 1599.00,
            'stock' => 15,
            'fabric' => 'silk',
            'color' => 'purple',
            'sizes' => 'xs,s,m,l,xl',
            'description' => 'Stunning lavender silk dress with delicate details, perfect for formal events and special occasions',
            'image' => 'assets/images/Lavender-Whisper-Dress.jpg',
            'reorder_level' => 3
        ],
        [
            'name' => 'Crimson Evening Gown',
            'category' => 'evening',
            'price' => 2499.00,
            'stock' => 10,
            'fabric' => 'satin',
            'color' => 'red',
            'sizes' => 's,m,l',
            'description' => 'Elegant red evening gown with flowing design, perfect for formal events',
            'image' => 'assets/images/product-placeholder.jpg',
            'reorder_level' => 2
        ]
    ];

    $success_count = 0;
    foreach ($sample_products as $product) {
        $insert_product = "INSERT INTO `products` 
            (`name`, `category`, `price`, `stock`, `fabric`, `color`, `sizes`, `description`, `image`, `reorder_level`) 
            VALUES 
            ('{$product['name']}', '{$product['category']}', {$product['price']}, {$product['stock']}, 
            '{$product['fabric']}', '{$product['color']}', '{$product['sizes']}', '{$product['description']}', 
            '{$product['image']}', {$product['reorder_level']})";
        
        if (mysqli_query($conn, $insert_product)) {
            $success_count++;
        } else {
            echo "Error inserting product {$product['name']}: " . mysqli_error($conn) . "<br>";
        }
    }
    
    echo "Added $success_count sample products to the database<br>";
} else {
    echo "Products already exist in the database<br>";
}

echo "<br>Products table initialization completed!";

// Close connection
mysqli_close($conn);
?>
