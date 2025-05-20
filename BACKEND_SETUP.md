# Backend Setup Instructions

This document provides instructions on how to set up the backend for the Kunozulkhair Tailoring Shop website.

## Database Setup

1. Make sure XAMPP is installed and running.
2. Open phpMyAdmin by navigating to `http://localhost/phpmyadmin` in your browser.
3. Create a new database named `kunozulkhair_db` with the collation `utf8mb4_general_ci`.
4. You don't need to create tables manually as they will be created by the initialization script.

## Initialize the Database

1. Navigate to `http://localhost/Kunozulkhair-Tailoring-Shop/config/init_db.php` in your browser.
2. This script will create the necessary tables and insert default users.
3. You should see a success message indicating that the tables were created and default users were added.

## Default Login Credentials

The initialization script creates two default users:

### Admin User
- Email: admin@kunozulkhair.com
- Password: admin123
- Role: admin

### Tailor User
- Email: tailor@kunozulkhair.com
- Password: tailor123
- Role: tailor

## File Structure

- `config/db_connect.php` - Database connection configuration
- `config/session.php` - Session management functions
- `config/init_db.php` - Database initialization script
- `admin-login.php` - Login page for both admin and tailor users
- `logout.php` - Script to handle user logout
- `admin-check.php` - Authentication check for admin pages
- `tailor-check.php` - Authentication check for tailor pages

## Securing Admin and Tailor Pages

To secure admin and tailor pages, include the appropriate check file at the top of each page:

### For Admin Pages
```php
<?php
require_once 'admin-check.php';
?>
```

### For Tailor Pages
```php
<?php
require_once 'tailor-check.php';
?>
```

## Converting HTML Pages to PHP

To convert existing HTML dashboard pages to PHP:

1. Rename the file from `.html` to `.php`
2. Add the appropriate check at the top of the file
3. Update any links to other pages to use `.php` extension

Example for converting `admin-dashboard.html` to `admin-dashboard.php`:

```php
<?php
require_once 'admin-check.php';
?>
<!DOCTYPE html>
<html lang="en">
<!-- Rest of your HTML code -->
```

## Next Steps

After setting up the basic authentication system, you can:

1. Convert dashboard HTML pages to PHP
2. Implement database operations for products, orders, etc.
3. Create API endpoints for AJAX requests
4. Implement more advanced security features

## Troubleshooting

- If you encounter database connection issues, check the credentials in `config/db_connect.php`
- If login doesn't work, make sure the database was initialized correctly
- For session-related issues, check that `session_start()` is called before any output
