// ARGILA / LU FIORENTINO — script.js
const WHATSAPP_NUMERO = "5511977067642";
const WHATSAPP_MENSAGEM = "Olá! Vim pelo site e gostaria de fazer uma encomenda personalizada de cerâmica. ✨";

const linkWhatsapp = (mensagem) => `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;

document.addEventListener("DOMContentLoaded", () => {
  // Botões de WhatsApp (hero, CTA final, rodapé, flutuante)
  const link = linkWhatsapp(WHATSAPP_MENSAGEM);
  ["heroCta", "ctaFinalBtn", "footerWhats", "whatsFloat"].forEach((id) => {
    document.getElementById(id)?.setAttribute("href", link);
  });

  // Menu mobile
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");
  navToggle?.addEventListener("click", () => {
    const aberto = mainNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", aberto);
  });
  mainNav?.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    })
  );

  // Filtro da vitrine
  const pieces = document.querySelectorAll(".piece");
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelector(".filter-btn.is-active")?.classList.remove("is-active");
      btn.classList.add("is-active");
      pieces.forEach((p) => p.classList.toggle("is-hidden", btn.dataset.filter !== "todas" && p.dataset.cat !== btn.dataset.filter));
    });
  });

  // Clique numa peça -> WhatsApp com o nome dela
  pieces.forEach((piece) => {
    piece.addEventListener("click", () => {
      const mensagem = `Olá! Vi a peça "${piece.dataset.name}" no site e gostaria de saber mais sobre como encomendar algo parecido. ✨`;
      window.open(linkWhatsapp(mensagem), "_blank", "noopener");
    });
  });

  // Ano no rodapé
  const anoEl = document.getElementById("ano");
  if (anoEl) anoEl.textContent = new Date().getFullYear();

  // Sombra no header ao rolar
  const header = document.querySelector(".site-header");
  window.addEventListener("scroll", () => {
    header.style.boxShadow = window.scrollY > 12 ? "0 4px 14px rgba(43,38,32,.08)" : "none";
  });

  // Animação de revelar ao rolar
  const observer = new IntersectionObserver(
    (entries, obs) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target); }
    }),
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
});