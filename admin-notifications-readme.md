# Admin Notifications Implementation Guide

This guide explains how to implement the notification system for all admin pages.

## Files Created

1. `data/admin-notifications.js` - Sample admin notification data
2. `js/admin/admin-notifications.js` - JavaScript for admin notifications
3. `css/admin/admin-notifications.css` - CSS for admin notifications
4. `admin-notifications.html` - Notifications page for viewing all notifications
5. `js/admin/admin-notifications-page.js` - JavaScript for the notifications page
6. `css/admin/admin-notifications-page.css` - CSS for the notifications page

## Pages Already Updated

1. `admin-dashboard.html`
2. `admin-inventory.html`
3. `admin-orders.html`

## Pages That Need to Be Updated

1. `admin-appointments.html`
2. `admin-customers.html`
3. `admin-tailors.html`
4. `admin-reports.html`
5. `admin-profile.html`

## How to Update Each Page

For each page that needs to be updated, follow these steps:

### Step 1: Add CSS Link

Add the following line to the head section, after the other CSS links:

```html
<link rel="stylesheet" href="css/admin/admin-notifications.css">
```

### Step 2: Add Notification Dropdown

Replace the notification button with the following code:

```html
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
      <a href="#">View all notifications</a>
    </div>
  </div>
</div>
```

### Step 3: Add Script Tag

Add the following line to the end of the body, after the other script tags:

```html
<script type="module" src="js/admin/admin-notifications.js"></script>
```

## Extending to Tailor Pages

Once the admin pages are updated, the same notification system can be applied to tailor pages by:

1. Creating a `data/tailor-notifications.js` file with tailor-specific notifications
2. Creating a `js/tailor/tailor-notifications.js` file based on the admin notifications JS
3. Adding the notification dropdown to all tailor pages
4. Adding the CSS and script tags to all tailor pages

## Notifications Page

The notifications page (`admin-notifications.html`) provides a dedicated interface for viewing and managing all notifications. It includes:

1. Filters for notification type (orders, inventory, appointments, tailors)
2. Filters for read/unread status
3. A "Mark All as Read" button
4. Individual controls to toggle the read status of each notification

## Future Enhancements

1. Add real-time notification updates using WebSockets
2. Implement notification preferences for different types of notifications
3. Add notification sounds or browser notifications
4. Add pagination for large numbers of notifications
5. Implement notification deletion functionality
