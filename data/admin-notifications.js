// Sample admin notifications data
const adminNotifications = [
  {
    id: 1,
    type: 'order',
    title: "New Order Received",
    message: "Order #ORD-10050 has been placed by Maria Santos.",
    time: "10 minutes ago",
    read: false
  },
  {
    id: 2,
    type: 'inventory',
    title: "Low Stock Alert",
    message: "Blue Cotton Fabric is running low (5 units remaining).",
    time: "1 hour ago",
    read: false
  },
  {
    id: 3,
    type: 'appointment',
    title: "New Appointment Scheduled",
    message: "Elena Garcia booked a Wedding Dress Fitting for July 20.",
    time: "3 hours ago",
    read: false
  },
  {
    id: 4,
    type: 'order',
    title: "Order Status Updated",
    message: "Order #ORD-10045 has been marked as 'Ready for Pickup'.",
    time: "5 hours ago",
    read: false
  },
  {
    id: 5,
    type: 'tailor',
    title: "Tailor Update",
    message: "Ryan Mentang is working on Order #ORD-10045.",
    time: "1 day ago",
    read: true
  }
];

// Export the notifications
export default adminNotifications;
