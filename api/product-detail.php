<?php
/**
 * Product Detail API
 *
 * Fetches a single product by ID for the product detail page
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
        getProductById($conn);
        break;
    default:
        http_response_code(405); // Method Not Allowed
        echo json_encode(['error' => 'Method not allowed']);
        break;
}

/**
 * Get a single product by ID
 */
function getProductById($conn) {
    // Check if ID is provided
    if (!isset($_GET['id']) || empty($_GET['id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Product ID is required']);
        return;
    }

    $id = intval($_GET['id']);

    // Prepare and execute the query
    $stmt = mysqli_prepare($conn, "SELECT * FROM products WHERE id = ?");
    mysqli_stmt_bind_param($stmt, "i", $id);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    // Check if product exists
    if (mysqli_num_rows($result) === 0) {
        http_response_code(404);
        echo json_encode(['error' => 'Product not found']);
        return;
    }

    // Fetch product data
    $product = mysqli_fetch_assoc($result);

    // Convert sizes string to array
    if (!empty($product['sizes'])) {
        $product['sizes'] = explode(',', $product['sizes']);
    } else {
        $product['sizes'] = [];
    }

    // Add rating information (since we don't have a ratings table yet)
    $product['rating'] = [
        'rate' => 4.5, // Default rating
        'count' => 10  // Default count
    ];

    // Get related products (same category, excluding current product)
    $related_stmt = mysqli_prepare($conn, 
        "SELECT * FROM products 
        WHERE category = ? AND id != ? 
        ORDER BY RAND() 
        LIMIT 4");
    
    mysqli_stmt_bind_param($related_stmt, "si", $product['category'], $id);
    mysqli_stmt_execute($related_stmt);
    $related_result = mysqli_stmt_get_result($related_stmt);
    
    $related_products = [];
    while ($row = mysqli_fetch_assoc($related_result)) {
        // Convert sizes string to array
        if (!empty($row['sizes'])) {
            $row['sizes'] = explode(',', $row['sizes']);
        } else {
            $row['sizes'] = [];
        }
        
        // Add rating information
        $row['rating'] = [
            'rate' => 4.5, // Default rating
            'count' => 10  // Default count
        ];
        
        $related_products[] = $row;
    }

    // Return the product with related products
    echo json_encode([
        'product' => $product,
        'related_products' => $related_products
    ]);
}
?>
