<?php
/**
 * Products API
 *
 * Handles CRUD operations for products
 */

// Include database connection
require_once '../config/db_connect.php';

// Include admin authentication check
require_once '../admin-check.php';

// Set content type to JSON
header('Content-Type: application/json');

// Get the request method
$method = $_SERVER['REQUEST_METHOD'];

// Check for method override in POST requests
if ($method === 'POST' && isset($_POST['_method'])) {
    $method = strtoupper($_POST['_method']);
}

// Handle different request methods
switch ($method) {
    case 'GET':
        getProducts($conn);
        break;
    case 'POST':
        addProduct($conn);
        break;
    case 'PUT':
        updateProduct($conn);
        break;
    case 'DELETE':
        deleteProduct($conn);
        break;
    default:
        http_response_code(405); // Method Not Allowed
        echo json_encode(['error' => 'Method not allowed']);
        break;
}

/**
 * Get all products or a specific product
 */
function getProducts($conn) {
    // Check if a specific product ID is requested
    if (isset($_GET['id'])) {
        $id = mysqli_real_escape_string($conn, $_GET['id']);
        $query = "SELECT * FROM products WHERE id = $id";
    } else {
        // Apply filters if provided
        $where_clauses = [];

        if (isset($_GET['category']) && $_GET['category'] != 'all') {
            $category = mysqli_real_escape_string($conn, $_GET['category']);
            $where_clauses[] = "category = '$category'";
        }

        if (isset($_GET['stock_status'])) {
            $stock_status = $_GET['stock_status'];
            if ($stock_status == 'in-stock') {
                $where_clauses[] = "stock > reorder_level";
            } elseif ($stock_status == 'low-stock') {
                $where_clauses[] = "stock <= reorder_level AND stock > 0";
            } elseif ($stock_status == 'out-of-stock') {
                $where_clauses[] = "stock = 0";
            }
        }

        // Build the query
        $query = "SELECT * FROM products";
        if (!empty($where_clauses)) {
            $query .= " WHERE " . implode(" AND ", $where_clauses);
        }
        $query .= " ORDER BY id DESC";
    }

    $result = mysqli_query($conn, $query);

    if (!$result) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . mysqli_error($conn)]);
        return;
    }

    $products = [];
    while ($row = mysqli_fetch_assoc($result)) {
        // Convert sizes string to array
        $row['sizes'] = explode(',', $row['sizes']);
        $products[] = $row;
    }

    echo json_encode(['products' => $products]);
}

/**
 * Add a new product
 */
function addProduct($conn) {
    // Get JSON data
    $data = json_decode(file_get_contents('php://input'), true);

    // If no JSON data, try POST data
    if (!$data) {
        $data = $_POST;
    }

    // Validate required fields
    $required_fields = ['name', 'category', 'price', 'stock'];
    foreach ($required_fields as $field) {
        if (!isset($data[$field]) || empty($data[$field])) {
            http_response_code(400);
            echo json_encode(['error' => "Missing required field: $field"]);
            return;
        }
    }

    // Handle image upload if present
    $image_path = '';
    if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
        $image_path = handleImageUpload($_FILES['image']);
        if (!$image_path) {
            http_response_code(400);
            echo json_encode(['error' => 'Failed to upload image']);
            return;
        }
    } elseif (isset($data['image'])) {
        $image_path = $data['image'];
    }

    // Convert sizes array to string if present
    $sizes = '';
    if (isset($data['sizes']) && is_array($data['sizes'])) {
        $sizes = implode(',', $data['sizes']);
    } elseif (isset($data['sizes'])) {
        $sizes = $data['sizes'];
    }

    // Prepare data for insertion
    $name = mysqli_real_escape_string($conn, $data['name']);
    $category = mysqli_real_escape_string($conn, $data['category']);
    $price = floatval($data['price']);
    $stock = intval($data['stock']);
    $fabric = isset($data['fabric']) ? mysqli_real_escape_string($conn, $data['fabric']) : '';
    $color = isset($data['color']) ? mysqli_real_escape_string($conn, $data['color']) : '';
    $description = isset($data['description']) ? mysqli_real_escape_string($conn, $data['description']) : '';
    $reorder_level = isset($data['reorder_level']) ? intval($data['reorder_level']) : 10;

    // Insert product
    $query = "INSERT INTO products (name, category, price, stock, fabric, color, sizes, description, image, reorder_level)
              VALUES ('$name', '$category', $price, $stock, '$fabric', '$color', '$sizes', '$description', '$image_path', $reorder_level)";

    if (mysqli_query($conn, $query)) {
        $id = mysqli_insert_id($conn);
        echo json_encode(['success' => true, 'message' => 'Product added successfully', 'id' => $id]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to add product: ' . mysqli_error($conn)]);
    }
}

/**
 * Update an existing product
 */
function updateProduct($conn) {
    // Use POST data for updates
    $data = $_POST;

    // Validate product ID
    if (!isset($data['id']) || empty($data['id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Product ID is required']);
        return;
    }

    $id = intval($data['id']);

    // Handle image upload if present
    if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
        $image_path = handleImageUpload($_FILES['image']);
        if ($image_path) {
            $data['image'] = $image_path;
        }
    }

    // Remove _method from data if present
    if (isset($data['_method'])) {
        unset($data['_method']);
    }

    // Build update query
    $updates = [];
    $fields = ['name', 'category', 'price', 'stock', 'fabric', 'color', 'sizes', 'description', 'image', 'reorder_level'];

    foreach ($fields as $field) {
        if (isset($data[$field])) {
            if (in_array($field, ['price', 'stock', 'reorder_level'])) {
                // Numeric fields
                $updates[] = "$field = " . floatval($data[$field]);
            } else {
                // String fields
                $updates[] = "$field = '" . mysqli_real_escape_string($conn, $data[$field]) . "'";
            }
        }
    }

    if (empty($updates)) {
        http_response_code(400);
        echo json_encode(['error' => 'No fields to update']);
        return;
    }

    $query = "UPDATE products SET " . implode(', ', $updates) . " WHERE id = $id";

    if (mysqli_query($conn, $query)) {
        echo json_encode(['success' => true, 'message' => 'Product updated successfully']);
    } else {
        http_response_code(500);
        echo json_encode([
            'error' => 'Failed to update product: ' . mysqli_error($conn),
            'query' => $query,
            'data' => $data
        ]);
    }
}

/**
 * Delete a product
 */
function deleteProduct($conn) {
    // Get JSON data
    $data = json_decode(file_get_contents('php://input'), true);

    // If no JSON data, try GET data
    if (!$data && isset($_GET['id'])) {
        $data = ['id' => $_GET['id']];
    }

    // Validate product ID
    if (!isset($data['id']) || empty($data['id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Product ID is required']);
        return;
    }

    $id = intval($data['id']);

    // Delete product
    $query = "DELETE FROM products WHERE id = $id";

    if (mysqli_query($conn, $query)) {
        echo json_encode(['success' => true, 'message' => 'Product deleted successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to delete product: ' . mysqli_error($conn)]);
    }
}

/**
 * Handle image upload
 */
function handleImageUpload($file) {
    $upload_dir = '../assets/images/products/';

    // Create directory if it doesn't exist
    if (!file_exists($upload_dir)) {
        mkdir($upload_dir, 0777, true);
    }

    // Generate unique filename
    $filename = uniqid() . '_' . basename($file['name']);
    $target_path = $upload_dir . $filename;

    // Move uploaded file
    if (move_uploaded_file($file['tmp_name'], $target_path)) {
        return 'assets/images/products/' . $filename;
    }

    return false;
}
?>
