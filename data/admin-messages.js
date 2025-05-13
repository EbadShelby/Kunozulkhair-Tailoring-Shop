// Sample admin messages data
const adminMessages = [
  {
    id: 1,
    sender: "Maria Santos",
    avatar: null, // Will use initials if null
    subject: "Question about my order",
    message: "Hello, I was wondering if I could change the fabric for my order #ORD-10050?",
    time: "10 minutes ago",
    read: false
  },
  {
    id: 2,
    sender: "Elena Garcia",
    avatar: null,
    subject: "Appointment Rescheduling",
    message: "I need to reschedule my fitting appointment on July 20. Is there availability on July 22?",
    time: "1 hour ago",
    read: false
  },
  {
    id: 3,
    sender: "John Doe",
    avatar: null,
    subject: "Custom Embroidery Request",
    message: "I'd like to add a custom embroidery to my order. Can you please provide a quote?",
    time: "3 hours ago",
    read: false
  },
  {
    id: 4,
    sender: "Sarah Johnson",
    avatar: null,
    subject: "Payment Confirmation",
    message: "I just made a payment for order #ORD-10048. Could you confirm if it was received?",
    time: "5 hours ago",
    read: false
  },
  {
    id: 5,
    sender: "Michael Brown",
    avatar: null,
    subject: "Return Policy Question",
    message: "What is your return policy for custom-made items? I'm considering placing an order.",
    time: "1 day ago",
    read: true
  }
];

// Export the messages
export default adminMessages;
