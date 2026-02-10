// ==========================
// ELEMENTOS BASE
// ==========================
const menuIcon = document.getElementById("menu-icon");
const navList = document.getElementById("navigation-list");
const mainContent = document.getElementById("main-content");
const themeBtn = document.getElementById("mudartema");

// ==========================
// MENU MOBILE
// ==========================
if (menuIcon) {
  menuIcon.addEventListener("click", toggleMenu);
}

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

// ==========================
// TEMA (CLARO / ESCURO)
// ==========================
if (themeBtn) {
  themeBtn.addEventListener("click", alternarTema);
}

function alternarTema(e) {
  e.preventDefault();

  const novo = document.body.classList.contains("escuro") ? "claro" : "escuro";
  document.body.className = novo;
  localStorage.setItem("tema", novo);

  atualizarIconeTema();
}

function aplicarTemaSalvo() {
  const tema = localStorage.getItem("tema") || "claro";
  document.body.className = tema;
  atualizarIconeTema();
}

function atualizarIconeTema() {
  if (!themeBtn) return;

  themeBtn.innerHTML = document.body.classList.contains("escuro")
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
}

// ==========================
// SPA - NAVEGAÇÃO SEM RELOAD
// ==========================
function carregarPagina(page) {
  fetch(page)
    .then(res => {
      if (!res.ok) throw new Error("Erro ao buscar página");
      return res.text();
    })
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const newMain = doc.querySelector("#main-content");

      if (!newMain) {
        mainContent.innerHTML = "<h2>Erro: <main> não encontrado</h2>";
        return;
      }

      mainContent.innerHTML = newMain.innerHTML;
      aplicarTemaSalvo();
    })
    .catch(err => {
      console.error(err);
      mainContent.innerHTML = "<h2>Erro ao carregar página</h2>";
    });
}

// Intercepta cliques nos links do menu
document.querySelectorAll('#navigation-list a[data-page]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const page = link.dataset.page;

    carregarPagina(page);
    history.pushState({ page }, "", page);
  });
});

// Botões Voltar / Avançar do navegador
window.addEventListener("popstate", e => {
  const page = e.state?.page || "index.html";
  carregarPagina(page);
});

// ==========================
// INICIALIZAÇÃO
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  aplicarTemaSalvo();

  // Se entrar direto numa rota (ex: /pages/sociais.html)
  const path = location.pathname.split("/").pop();
  if (path && path !== "" && path !== "index.html") {
    carregarPagina(path);
  }
});
