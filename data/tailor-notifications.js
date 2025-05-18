// Sample tailor notifications data
const tailorNotifications = [
  {
    id: 1,
    type: 'order',
    title: "New Order",
    message: "New Order #ORD-10050 for a wedding dress alteration is ready for your attention.",
    time: "10 minutes ago",
    read: false
  },
  {
    id: 2,
    type: 'appointment',
    title: "Upcoming Appointment",
    message: "Reminder: You have a fitting appointment with Elena Garcia tomorrow at 10:00 AM.",
    time: "1 hour ago",
    read: false
  },
  {
    id: 3,
    type: 'task',
    title: "Task Due Soon",
    message: "The wedding dress for Elena Garcia (Order #ORD-10045) is due in 2 days.",
    time: "3 hours ago",
    read: false
  },
  {
    id: 4,
    type: 'schedule',
    title: "Schedule Update",
    message: "Your schedule for next week has been updated with 3 new appointments.",
    time: "5 hours ago",
    read: false
  },
  {
    id: 5,
    type: 'message',
    title: "Message from Admin",
    message: "Please check the measurements for Sophia Lee's dress (Order #ORD-10042) before proceeding.",
    time: "1 day ago",
    read: true
  }
];

// Export the notifications
export default tailorNotifications;
