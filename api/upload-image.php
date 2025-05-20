<?php
/**
 * Image Upload API
 * 
 * Handles product image uploads
 */

// Include admin authentication check
require_once '../admin-check.php';

// Set content type to JSON
header('Content-Type: application/json');

// Check if file was uploaded
if (!isset($_FILES['image']) || $_FILES['image']['error'] != 0) {
    http_response_code(400);
    echo json_encode(['error' => 'No image uploaded or upload error']);
    exit;
}

// Define allowed file types
$allowed_types = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

// Validate file type
if (!in_array($_FILES['image']['type'], $allowed_types)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid file type. Only JPG, PNG, GIF, and WEBP are allowed']);
    exit;
}

// Validate file size (max 5MB)
if ($_FILES['image']['size'] > 5 * 1024 * 1024) {
    http_response_code(400);
    echo json_encode(['error' => 'File too large. Maximum size is 5MB']);
    exit;
}

// Set upload directory
$upload_dir = '../assets/images/products/';

// Create directory if it doesn't exist
if (!file_exists($upload_dir)) {
    mkdir($upload_dir, 0777, true);
}

// Generate unique filename
$filename = uniqid() . '_' . basename($_FILES['image']['name']);
$target_path = $upload_dir . $filename;

// Move uploaded file
if (move_uploaded_file($_FILES['image']['tmp_name'], $target_path)) {
    // Return success response with image path
    echo json_encode([
        'success' => true,
        'message' => 'Image uploaded successfully',
        'image_path' => 'assets/images/products/' . $filename
    ]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to upload image']);
}
?>
