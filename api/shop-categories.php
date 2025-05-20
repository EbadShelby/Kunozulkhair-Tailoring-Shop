<?php
/**
 * Shop Categories API
 *
 * Fetches unique categories, fabrics, colors, and price ranges for shop filters
 */

// Include database connection
require_once '../config/db_connect.php';

// Set content type to JSON
header('Content-Type: application/json');

// Get the request method
$method = $_SERVER['REQUEST_METHOD'];

// Handle the request based on the method
switch ($method) {
    case 'GET':
        getFilterOptions($conn);
        break;
    default:
        http_response_code(405); // Method Not Allowed
        echo json_encode(['error' => 'Method not allowed']);
        break;
}

/**
 * Get unique filter options for the shop page
 */
function getFilterOptions($conn) {
    // Get unique categories
    $categories = [];
    $category_result = mysqli_query($conn, "SELECT DISTINCT category FROM products ORDER BY category");
    while ($row = mysqli_fetch_assoc($category_result)) {
        $categories[] = $row['category'];
    }

    // Get unique fabrics
    $fabrics = [];
    $fabric_result = mysqli_query($conn, "SELECT DISTINCT fabric FROM products WHERE fabric IS NOT NULL AND fabric != '' ORDER BY fabric");
    while ($row = mysqli_fetch_assoc($fabric_result)) {
        $fabrics[] = $row['fabric'];
    }

    // Get unique colors
    $colors = [];
    $color_result = mysqli_query($conn, "SELECT DISTINCT color FROM products WHERE color IS NOT NULL AND color != '' ORDER BY color");
    while ($row = mysqli_fetch_assoc($color_result)) {
        $colors[] = $row['color'];
    }

    // Get price range
    $price_result = mysqli_query($conn, "SELECT MIN(price) as min_price, MAX(price) as max_price FROM products");
    $price_range = mysqli_fetch_assoc($price_result);

    // Return all filter options
    echo json_encode([
        'categories' => $categories,
        'fabrics' => $fabrics,
        'colors' => $colors,
        'price_range' => $price_range
    ]);
}
?>
