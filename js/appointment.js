// appointments.js

document.getElementById('appointment-form').addEventListener('submit', function (e) {
  e.preventDefault();

  // You can gather form data here
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const service = document.getElementById('service').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const notes = document.getElementById('notes').value.trim();

  // Show a confirmation message (you can later send this data to a server or service)
  alert(`Appointment Booked!\n\nName: ${name}\nService: ${service}\nDate: ${date} at ${time}`);

  // Optional: Reset the form
  this.reset();
});