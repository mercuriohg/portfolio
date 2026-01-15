const menuIcon = document.getElementById("menu-icon");
const navList = document.getElementById("navigation-list");

menuIcon.addEventListener("click", toggleMenu);

function toggleMenu() {
  navList.classList.toggle("active");
  menuIcon.classList.toggle("fa-bars");
  menuIcon.classList.toggle("fa-xmark");
}

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navList.classList.remove("active");
    menuIcon.classList.add("fa-bars");
    menuIcon.classList.remove("fa-xmark");
  }
});