// Sample tailor messages data
const tailorMessages = [
  {
    id: 1,
    sender: "Admin",
    avatar: null, // Will use initials if null
    subject: "New Assignment",
    message: "You have been assigned to work on Order #ORD-10050 for Elena Garcia.",
    time: "10 minutes ago",
    read: false
  },
  {
    id: 2,
    sender: "Elena Garcia",
    avatar: null,
    subject: "Wedding Dress Fitting",
    message: "I have some questions about my upcoming fitting appointment on July 20.",
    time: "1 hour ago",
    read: false
  },
  {
    id: 3,
    sender: "Admin",
    avatar: null,
    subject: "Schedule Update",
    message: "Your schedule has been updated for next week. Please review the changes.",
    time: "3 hours ago",
    read: false
  },
  {
    id: 4,
    sender: "Sarah Johnson",
    avatar: null,
    subject: "Custom Beading",
    message: "Can you provide more details about the beading options for my formal dress?",
    time: "5 hours ago",
    read: false
  },
  {
    id: 5,
    sender: "Admin",
    avatar: null,
    subject: "Performance Review",
    message: "Your quarterly performance review is scheduled for next Friday.",
    time: "1 day ago",
    read: true
  }
];

// Export the messages
export default tailorMessages;
