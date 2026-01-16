const menuIcon = document.getElementById("menu-icon");
const navList = document.getElementById("navigation-list");
const themeBtn = document.getElementById("mudartema");

menuIcon.addEventListener("click", toggleMenu);
themeBtn.addEventListener("click", tema)

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
function tema() {
  document.body.classList.toggle("escuro");

  if (document.body.classList.contains("escuro")) {
    themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
}