<?php
/**
 * Export Inventory
 * 
 * Exports inventory data to CSV format
 */

// Include admin authentication check
require_once 'admin-check.php';

// Include database connection
require_once 'config/db_connect.php';

// Set headers for CSV download
header('Content-Type: text/csv');
header('Content-Disposition: attachment; filename="inventory_export_' . date('Y-m-d') . '.csv"');

// Create output stream
$output = fopen('php://output', 'w');

// Add CSV header
fputcsv($output, [
    'ID', 
    'Name', 
    'Category', 
    'Price', 
    'Stock', 
    'Fabric', 
    'Color', 
    'Sizes', 
    'Description', 
    'Reorder Level', 
    'Created At'
]);

// Get products from database
$query = "SELECT * FROM products ORDER BY id";
$result = mysqli_query($conn, $query);

if ($result) {
    // Output each product as a CSV row
    while ($row = mysqli_fetch_assoc($result)) {
        fputcsv($output, [
            $row['id'],
            $row['name'],
            $row['category'],
            $row['price'],
            $row['stock'],
            $row['fabric'],
            $row['color'],
            $row['sizes'],
            $row['description'],
            $row['reorder_level'],
            $row['created_at']
        ]);
    }
}

// Close the output stream
fclose($output);
exit;
?>
