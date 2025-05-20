<?php
/**
 * Shop Products API
 *
 * Fetches products for the shop page without requiring admin authentication
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
        getProducts($conn);
        break;
    default:
        http_response_code(405); // Method Not Allowed
        echo json_encode(['error' => 'Method not allowed']);
        break;
}

/**
 * Get products with optional filtering
 */
function getProducts($conn) {
    // Initialize query parts
    $query = "SELECT * FROM products";
    $where_clauses = [];
    $params = [];
    $types = "";

    // Check for category filter
    if (isset($_GET['category']) && !empty($_GET['category'])) {
        $where_clauses[] = "category = ?";
        $params[] = $_GET['category'];
        $types .= "s";
    }

    // Check for fabric filter
    if (isset($_GET['fabric']) && !empty($_GET['fabric'])) {
        $where_clauses[] = "fabric = ?";
        $params[] = $_GET['fabric'];
        $types .= "s";
    }

    // Check for color filter
    if (isset($_GET['color']) && !empty($_GET['color'])) {
        $where_clauses[] = "color = ?";
        $params[] = $_GET['color'];
        $types .= "s";
    }

    // Check for size filter
    if (isset($_GET['size']) && !empty($_GET['size'])) {
        $size = $_GET['size'];
        $where_clauses[] = "sizes LIKE ?";
        $params[] = "%$size%"; // Using LIKE to find the size in the comma-separated list
        $types .= "s";
    }

    // Check for price range filter
    if (isset($_GET['min_price']) && is_numeric($_GET['min_price'])) {
        $where_clauses[] = "price >= ?";
        $params[] = floatval($_GET['min_price']);
        $types .= "d";
    }

    if (isset($_GET['max_price']) && is_numeric($_GET['max_price'])) {
        $where_clauses[] = "price <= ?";
        $params[] = floatval($_GET['max_price']);
        $types .= "d";
    }

    // Check for search term
    if (isset($_GET['search']) && !empty($_GET['search'])) {
        $where_clauses[] = "(name LIKE ? OR description LIKE ?)";
        $search_term = "%" . $_GET['search'] . "%";
        $params[] = $search_term;
        $params[] = $search_term;
        $types .= "ss";
    }

    // Add WHERE clause if any filters are applied
    if (!empty($where_clauses)) {
        $query .= " WHERE " . implode(" AND ", $where_clauses);
    }

    // Add sorting
    if (isset($_GET['sort']) && !empty($_GET['sort'])) {
        switch ($_GET['sort']) {
            case 'price-low':
                $query .= " ORDER BY price ASC";
                break;
            case 'price-high':
                $query .= " ORDER BY price DESC";
                break;
            case 'name-az':
                $query .= " ORDER BY name ASC";
                break;
            case 'name-za':
                $query .= " ORDER BY name DESC";
                break;
            case 'newest':
                $query .= " ORDER BY created_at DESC";
                break;
            default:
                $query .= " ORDER BY id ASC"; // Default sorting
                break;
        }
    } else {
        $query .= " ORDER BY id ASC"; // Default sorting
    }

    // Add pagination
    $page = isset($_GET['page']) && is_numeric($_GET['page']) ? intval($_GET['page']) : 1;
    $limit = isset($_GET['limit']) && is_numeric($_GET['limit']) ? intval($_GET['limit']) : 12;
    $offset = ($page - 1) * $limit;

    $query .= " LIMIT ?, ?";
    $params[] = $offset;
    $params[] = $limit;
    $types .= "ii";

    // Prepare and execute the query
    $stmt = mysqli_prepare($conn, $query);

    if (!empty($params)) {
        mysqli_stmt_bind_param($stmt, $types, ...$params);
    }

    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    // Fetch products
    $products = [];
    while ($row = mysqli_fetch_assoc($result)) {
        // Convert sizes string to array
        if (!empty($row['sizes'])) {
            $row['sizes'] = explode(',', $row['sizes']);
        } else {
            $row['sizes'] = [];
        }

        // Add rating information (since we don't have a ratings table yet)
        $row['rating'] = [
            'rate' => 4.5, // Default rating
            'count' => 10  // Default count
        ];

        $products[] = $row;
    }

    // Get total count for pagination
    $count_query = "SELECT COUNT(*) as total FROM products";
    $count_where_clauses = $where_clauses; // Copy the where clauses

    if (!empty($count_where_clauses)) {
        $count_query .= " WHERE " . implode(" AND ", $count_where_clauses);
    }

    $count_stmt = mysqli_prepare($conn, $count_query);

    if (!empty($params)) {
        // Remove the last two parameters which were for LIMIT
        array_pop($params);
        array_pop($params);
        $count_types = substr($types, 0, -2);

        if (!empty($count_types)) {
            mysqli_stmt_bind_param($count_stmt, $count_types, ...$params);
        }
    }

    mysqli_stmt_execute($count_stmt);
    $count_result = mysqli_stmt_get_result($count_stmt);
    $count_row = mysqli_fetch_assoc($count_result);
    $total = $count_row['total'];

    // Return the products with pagination info
    echo json_encode([
        'products' => $products,
        'pagination' => [
            'total' => $total,
            'page' => $page,
            'limit' => $limit,
            'pages' => ceil($total / $limit)
        ]
    ]);
}
?>
