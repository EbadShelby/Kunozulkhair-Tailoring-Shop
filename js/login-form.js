document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("container");
  const registerBtn = document.getElementById("register");
  const loginBtn = document.getElementById("login");

  // Check URL parameters for signup flag
  const urlParams = new URLSearchParams(window.location.search);
  const showSignup = urlParams.get('signup');

  // If signup parameter is present, show the signup form
  if (showSignup === 'true') {
    container.classList.add("active");
  }

  registerBtn.addEventListener("click", () => {
    container.classList.add("active");
  });

  loginBtn.addEventListener("click", () => {
    container.classList.remove("active");
  });
});