<?php
/**
 * Admin Inventory Management
 *
 * Inventory management page for admin users.
 */

// Include admin authentication check
require_once 'admin-check.php';

// Include database connection
require_once 'config/db_connect.php';

// Function to get stock status
function getStockStatus($stock, $reorder_level) {
    if ($stock <= 0) {
        return 'out-of-stock';
    } elseif ($stock <= $reorder_level) {
        return 'low-stock';
    } else {
        return 'in-stock';
    }
}

// Handle filters
$category = isset($_GET['category']) ? $_GET['category'] : 'all';
$stock_status = isset($_GET['stock_status']) ? $_GET['stock_status'] : 'all';

// Build query with filters
$query = "SELECT * FROM products";
$where_clauses = [];

if ($category != 'all') {
    $category = mysqli_real_escape_string($conn, $category);
    $where_clauses[] = "category = '$category'";
}

if ($stock_status != 'all') {
    if ($stock_status == 'in-stock') {
        $where_clauses[] = "stock > reorder_level";
    } elseif ($stock_status == 'low-stock') {
        $where_clauses[] = "stock <= reorder_level AND stock > 0";
    } elseif ($stock_status == 'out-of-stock') {
        $where_clauses[] = "stock = 0";
    }
}

if (!empty($where_clauses)) {
    $query .= " WHERE " . implode(" AND ", $where_clauses);
}

$query .= " ORDER BY id DESC";
$result = mysqli_query($conn, $query);

// Check if products table exists
if (!$result) {
    // Table might not exist, redirect to initialization
    header('Location: config/init_products.php');
    exit;
}

$products = [];
while ($row = mysqli_fetch_assoc($result)) {
    $row['stock_status'] = getStockStatus($row['stock'], $row['reorder_level']);
    $products[] = $row;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inventory Management - Kunozulkhair Tailoring Shop</title>

  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Baskervville:ital@0;1&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">

  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">

  <!-- Custom CSS -->
  <link rel="stylesheet" href="css/admin/admin-dashboard.css">
  <link rel="stylesheet" href="css/admin/admin-inventory.css">
  <link rel="stylesheet" href="css/admin/admin-notifications.css">
  <link rel="stylesheet" href="css/admin/admin-messages.css">

  <link rel="icon" href="assets/images/logo.jpg" type="image/png">
</head>
<body data-php-auth="true">
  <div class="admin-container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <img src="assets/images/logo.jpg" alt="Kunozulkhair Logo" class="logo">
        <h2>Admin Panel</h2>
      </div>

      <div class="sidebar-user">
        <div class="user-avatar">
          <i class="fas fa-user-circle"></i>
        </div>
        <div class="user-info">
          <p class="user-name" id="user-name">Admin User</p>
          <p class="user-role" id="user-role">Administrator</p>
        </div>
      </div>

      <nav class="sidebar-nav">
        <ul>
          <li>
            <a href="admin-dashboard.php">
              <i class="fas fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </a>
          </li>
          <li class="active">
            <a href="admin-inventory.php">
              <i class="fas fa-box"></i>
              <span>Inventory</span>
            </a>
          </li>
          <li>
            <a href="admin-orders.php">
              <i class="fas fa-shopping-cart"></i>
              <span>Orders</span>
            </a>
          </li>
          <li>
            <a href="admin-appointments.php">
              <i class="fas fa-calendar-alt"></i>
              <span>Appointments</span>
            </a>
          </li>
          <li>
            <a href="admin-customers.php">
              <i class="fas fa-users"></i>
              <span>Customers</span>
            </a>
          </li>
          <li>
            <a href="admin-tailor.php">
              <i class="fas fa-user-tie"></i>
              <span>Tailor</span>
            </a>
          </li>

        </ul>
      </nav>

      <div class="sidebar-footer">
        <button id="logout-btn">
          <i class="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Top Navigation -->
      <header class="top-nav">
        <button id="sidebar-toggle">
          <i class="fas fa-bars"></i>
        </button>

        <div class="search-bar">
          <input type="text" placeholder="Search inventory...">
          <button>
            <i class="fas fa-search"></i>
          </button>
        </div>

        <div class="nav-actions">
          <div class="nav-item">
            <button class="notification-btn">
              <i class="fas fa-bell"></i>
              <span class="badge">3</span>
            </button>
            <!-- Admin Notification Dropdown -->
            <div class="admin-notification-dropdown">
              <div class="admin-notification-header">
                <h3>Notifications</h3>
                <button id="admin-mark-all-read">Mark all as read</button>
              </div>
              <div class="admin-notification-list">
                <!-- Notifications will be dynamically inserted here -->
              </div>
              <div class="admin-notification-footer">
                <a href="admin-notifications.php">View all notifications</a>
              </div>
            </div>
          </div>
          <div class="nav-item">
            <button class="message-btn">
              <i class="fas fa-envelope"></i>
              <span class="badge">5</span>
            </button>
            <!-- Admin Message Dropdown -->
            <div class="admin-message-dropdown">
              <div class="admin-message-header">
                <h3>Messages</h3>
                <button id="admin-mark-all-read-messages">Mark all as read</button>
              </div>
              <div class="admin-message-list">
                <!-- Messages will be dynamically inserted here -->
              </div>
              <div class="admin-message-footer">
                <a href="admin-messages.php">View all messages</a>
              </div>
            </div>
          </div>
          <div class="nav-item user-dropdown">
            <button class="user-btn">
              <i class="fas fa-user-circle"></i>
              <span id="dropdown-user-name">Admin</span>
              <i class="fas fa-chevron-down"></i>
            </button>
            <div class="dropdown-menu">
              <a href="admin-profile.php"><i class="fas fa-user"></i> Profile</a>
              <a href="#" id="dropdown-logout"><i class="fas fa-sign-out-alt"></i> Logout</a>
            </div>
          </div>
        </div>
      </header>

      <!-- Inventory Content -->
      <div class="dashboard-content">
        <div class="page-header">
          <h1>Inventory Management</h1>
          <p>Manage products, stock levels, and inventory</p>
        </div>

        <!-- Inventory Actions -->
        <div class="inventory-actions">
          <button id="add-product-btn" class="btn-primary">
            <i class="fas fa-plus"></i> Add New Product
          </button>

          <div class="inventory-filters">
            <div class="filter-group">
              <label for="category-filter">Category:</label>
              <select id="category-filter">
                <option value="all" <?php echo $category == 'all' ? 'selected' : ''; ?>>All Categories</option>
                <option value="casual" <?php echo $category == 'casual' ? 'selected' : ''; ?>>Casual Dresses</option>
                <option value="formal" <?php echo $category == 'formal' ? 'selected' : ''; ?>>Formal Dresses</option>
                <option value="evening" <?php echo $category == 'evening' ? 'selected' : ''; ?>>Evening Dresses</option>
                <option value="everyday" <?php echo $category == 'everyday' ? 'selected' : ''; ?>>Everyday Dresses</option>
              </select>
            </div>

            <div class="filter-group">
              <label for="stock-filter">Stock Status:</label>
              <select id="stock-filter">
                <option value="all" <?php echo $stock_status == 'all' ? 'selected' : ''; ?>>All</option>
                <option value="in-stock" <?php echo $stock_status == 'in-stock' ? 'selected' : ''; ?>>In Stock</option>
                <option value="low-stock" <?php echo $stock_status == 'low-stock' ? 'selected' : ''; ?>>Low Stock</option>
                <option value="out-of-stock" <?php echo $stock_status == 'out-of-stock' ? 'selected' : ''; ?>>Out of Stock</option>
              </select>
            </div>

            <a href="export-inventory.php" class="btn-secondary" id="export-inventory">
              <i class="fas fa-file-export"></i> Export
            </a>
          </div>
        </div>

        <!-- Inventory Table -->
        <div class="inventory-table-container">
          <table class="inventory-table">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" id="select-all-products">
                </th>
                <th>Product ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Fabric</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="inventory-table-body">
              <?php if (empty($products)): ?>
                <tr>
                  <td colspan="9" class="text-center">No products found</td>
                </tr>
              <?php else: ?>
                <?php foreach ($products as $product): ?>
                  <?php
                    // Determine stock status class
                    $status_class = '';
                    $status_text = '';

                    if ($product['stock_status'] == 'in-stock') {
                      $status_class = 'status-in-stock';
                      $status_text = 'In Stock';
                    } elseif ($product['stock_status'] == 'low-stock') {
                      $status_class = 'status-low-stock';
                      $status_text = 'Low Stock';
                    } else {
                      $status_class = 'status-out-of-stock';
                      $status_text = 'Out of Stock';
                    }
                  ?>
                  <tr data-product-id="<?php echo $product['id']; ?>">
                    <td>
                      <input type="checkbox" class="product-checkbox" data-product-id="<?php echo $product['id']; ?>">
                    </td>
                    <td><?php echo $product['id']; ?></td>
                    <td>
                      <img src="<?php echo $product['image'] ?: 'assets/images/product-placeholder.jpg'; ?>" alt="<?php echo htmlspecialchars($product['name']); ?>" class="product-image">
                    </td>
                    <td>
                      <div class="product-name"><?php echo htmlspecialchars($product['name']); ?></div>
                      <div class="product-category"><?php echo htmlspecialchars($product['category']); ?></div>
                    </td>
                    <td><?php echo htmlspecialchars($product['fabric'] ?: 'N/A'); ?></td>
                    <td class="product-price">₱<?php echo number_format($product['price'], 2); ?></td>
                    <td><?php echo $product['stock']; ?></td>
                    <td>
                      <span class="stock-badge <?php echo $status_class; ?>"><?php echo $status_text; ?></span>
                    </td>
                    <td>
                      <div class="product-actions">
                        <button class="action-btn view" data-product-id="<?php echo $product['id']; ?>" title="View Product">
                          <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn edit" data-product-id="<?php echo $product['id']; ?>" title="Edit Product" onclick="editProduct(<?php echo $product['id']; ?>)">
                          <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn delete" data-product-id="<?php echo $product['id']; ?>"
                                data-product-name="<?php echo htmlspecialchars($product['name']); ?>" title="Delete Product"
                                onclick="openDeleteModal(<?php echo $product['id']; ?>, '<?php echo htmlspecialchars(addslashes($product['name'])); ?>')">
                          <i class="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                <?php endforeach; ?>
              <?php endif; ?>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="inventory-pagination">
          <button class="pagination-btn" disabled>&laquo; Previous</button>
          <div class="page-numbers">
            <button class="page-number active">1</button>
            <button class="page-number">2</button>
            <button class="page-number">3</button>
          </div>
          <button class="pagination-btn">Next &raquo;</button>
        </div>
      </div>
    </main>
  </div>

  <!-- Add/Edit Product Modal -->
  <div id="product-modal" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2 id="modal-title">Add New Product</h2>
        <button class="close-modal">&times;</button>
      </div>
      <div class="modal-body">
        <form id="product-form">
          <input type="hidden" id="product-id">

          <div class="form-grid">
            <div class="form-group">
              <label for="product-name">Product Name</label>
              <input type="text" id="product-name" required>
            </div>

            <div class="form-group">
              <label for="product-category">Category</label>
              <select id="product-category" required>
                <option value="">Select Category</option>
                <option value="casual">Casual Dresses</option>
                <option value="formal">Formal Dresses</option>
                <option value="evening">Evening Dresses</option>
                <option value="everyday">Everyday Dresses</option>
              </select>
            </div>

            <div class="form-group">
              <label for="product-price">Price (₱)</label>
              <input type="number" id="product-price" min="0" step="0.01" required>
            </div>

            <div class="form-group">
              <label for="product-stock">Stock Quantity</label>
              <input type="number" id="product-stock" min="0" required>
            </div>

            <div class="form-group">
              <label for="product-fabric">Fabric</label>
              <select id="product-fabric">
                <option value="">Select Fabric</option>
                <option value="cotton">Cotton</option>
                <option value="silk">Silk</option>
                <option value="linen">Linen</option>
                <option value="polyester">Polyester</option>
                <option value="wool">Wool</option>
              </select>
            </div>

            <div class="form-group">
              <label for="product-color">Color</label>
              <input type="text" id="product-color">
            </div>
          </div>

          <div class="form-group">
            <label for="product-sizes">Available Sizes</label>
            <div class="size-checkboxes">
              <label><input type="checkbox" name="sizes" value="xs"> XS</label>
              <label><input type="checkbox" name="sizes" value="s"> S</label>
              <label><input type="checkbox" name="sizes" value="m"> M</label>
              <label><input type="checkbox" name="sizes" value="l"> L</label>
              <label><input type="checkbox" name="sizes" value="xl"> XL</label>
              <label><input type="checkbox" name="sizes" value="xxl"> XXL</label>
              <label><input type="checkbox" name="sizes" value="one-size"> One Size</label>
            </div>
          </div>

          <div class="form-group">
            <label for="product-description">Description</label>
            <textarea id="product-description" rows="4"></textarea>
          </div>

          <div class="form-group">
            <label for="product-image">Product Image</label>
            <div class="image-upload">
              <div class="image-preview" id="image-preview">
                <i class="fas fa-image"></i>
                <span>No image selected</span>
              </div>
              <input type="file" id="product-image" accept="image/*">
              <button type="button" class="btn-secondary" id="select-image-btn">Select Image</button>
            </div>
          </div>

          <div class="form-group">
            <label for="reorder-level">Reorder Level</label>
            <input type="number" id="reorder-level" min="0">
            <small>Set the minimum stock level before reordering</small>
          </div>

          <div class="form-actions">
            <button type="button" class="btn-secondary" id="cancel-product">Cancel</button>
            <button type="submit" class="btn-primary" id="save-product">Save Product</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- Delete Confirmation Modal -->
  <div id="delete-modal" class="modal">
    <div class="modal-content delete-modal-content">
      <div class="modal-header">
        <h2>Confirm Delete</h2>
        <button class="close-modal">&times;</button>
      </div>
      <div class="modal-body">
        <p>Are you sure you want to delete this product? This action cannot be undone.</p>
        <div class="delete-product-info">
          <span id="delete-product-name">Product Name</span>
          <span id="delete-product-id">ID: 123</span>
        </div>
        <div class="form-actions">
          <button class="btn-secondary" id="cancel-delete">Cancel</button>
          <button class="btn-danger" id="confirm-delete">Delete</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Scripts -->
  <script src="js/admin/admin-auth.js"></script>
  <script src="js/admin/admin-inventory-ajax.js"></script>
  <script type="module" src="js/admin/admin-notifications.js"></script>
  <script type="module" src="js/admin/admin-messages.js"></script>
</body>
</html>


