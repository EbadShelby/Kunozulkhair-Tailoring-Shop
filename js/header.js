const navLinks = document.querySelectorAll(".header__link");
const currentPage = window.location.pathname;

navLinks.forEach(link => {
  if (link.href.includes(`${currentPage}`)) {
    link.classList.add("active");
  }
});