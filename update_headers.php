<?php
/**
 * Script to update all PHP files to use the consistent header include
 */

// List of files to update
$files = [
    'about.php',
    'alterations-and-repair.php',
    'appointments.php',
    'casual-and-everydaydresses.php',
    'checkout.php',
    'contact.php',
    'custom-dressmaking.php',
    'notifications.php',
    'order-success.php',
    'orders.php',
    'product-detail.php',
    'product.php',
    'services.php',
    'shop.php'
];

// Function to update a file
function update_file($filename) {
    // Read the file content
    $content = file_get_contents($filename);
    
    // Check if the file already includes our header
    if (strpos($content, "include 'includes/header.php'") !== false) {
        echo "File $filename already updated.<br>";
        return;
    }
    
    // Pattern to match the header section
    $pattern = '/<body[^>]*>.*?<header class="header">.*?<\/header>\s*<!-- Notification Dropdown -->/s';
    
    // Replacement with our include
    $replacement = '<body>
    <?php include \'includes/header.php\'; ?>
    
    <!-- Notification Dropdown -->';
    
    // Replace the header section
    $new_content = preg_replace($pattern, $replacement, $content);
    
    // If the replacement was successful
    if ($new_content !== null && $new_content !== $content) {
        // Write the new content back to the file
        file_put_contents($filename, $new_content);
        echo "File $filename updated successfully.<br>";
    } else {
        echo "Failed to update $filename.<br>";
    }
}

// Update each file
echo "<h1>Updating header includes</h1>";
foreach ($files as $file) {
    update_file($file);
}
echo "<h2>Update completed</h2>";
?>
