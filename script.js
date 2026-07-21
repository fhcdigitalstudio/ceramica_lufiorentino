/* ===================================================================
   ARGILA ESTÚDIO — script.js
   =================================================================== */

// ============ CONFIGURAÇÃO DO WHATSAPP ============
// 1) Troque o número abaixo pelo número real (com código do país e DDD, só números).
//    Exemplo para (11) 91234-5678 -> "5511912345678"
const WHATSAPP_NUMERO = "5511999999999";

// 2) Mensagem que já vai preenchida quando o cliente clicar no botão.
const WHATSAPP_MENSAGEM =
  "Olá! Vim pelo site e gostaria de fazer uma encomenda personalizada de cerâmica. ✨";

function montarLinkWhatsapp(mensagem) {
  const texto = encodeURIComponent(mensagem);
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${texto}`;
}

document.addEventListener("DOMContentLoaded", () => {

  // ---------- aplica o link do WhatsApp em todos os botões relevantes ----------
  const linkPadrao = montarLinkWhatsapp(WHATSAPP_MENSAGEM);
  ["heroCta", "ctaFinalBtn", "footerWhats", "whatsFloat"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.setAttribute("href", linkPadrao);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    }
  });

  // ---------- menu mobile ----------
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const aberto = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(aberto));
    });

    // fecha o menu ao clicar em um link
    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---------- filtro da vitrine ----------
  const filterButtons = document.querySelectorAll(".filter-btn");
  const pieces = document.querySelectorAll(".piece");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      const filtro = btn.dataset.filter;
      pieces.forEach((piece) => {
        const mostrar = filtro === "todas" || piece.dataset.cat === filtro;
        piece.classList.toggle("is-hidden", !mostrar);
      });
    });
  });

  // ---------- clique numa peça da vitrine -> abre WhatsApp já com o nome dela ----------
  pieces.forEach((piece) => {
    piece.addEventListener("click", () => {
      const nome = piece.dataset.name || "uma peça da vitrine";
      const mensagem = `Olá! Vi a peça "${nome}" no site e gostaria de saber mais sobre como encomendar algo parecido. ✨`;
      window.open(montarLinkWhatsapp(mensagem), "_blank", "noopener");
    });
  });

  // ---------- ano automático no rodapé ----------
  const anoEl = document.getElementById("ano");
  if (anoEl) anoEl.textContent = new Date().getFullYear();

  // ---------- header muda de aparência ao rolar ----------
  const header = document.querySelector(".site-header");
  window.addEventListener("scroll", () => {
    if (header) header.style.boxShadow = window.scrollY > 12 ? "0 4px 14px rgba(43,38,32,.08)" : "none";
  });

  // ---------- animação de revelar ao rolar ----------
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }
});