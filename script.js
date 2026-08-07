/* ==========================================================
   LU FIORENTINO
   Config
========================================================== */

class Config {
    static whatsappNumber = "5511977067642";
    static defaultMessage = "Olá! Vim pelo site e gostaria de fazer uma encomenda personalizada de cerâmica. ✨";
}

/* ==========================================================
   UTILS
========================================================== */

class Utils {
    static $(selector, parent = document) {
        return parent.querySelector(selector);
    }

    static $$(selector, parent = document) {
        return [...parent.querySelectorAll(selector)];
    }

    static whatsappLink(message = Config.defaultMessage) {
        return `https://wa.me/${Config.whatsappNumber}?text=${encodeURIComponent(message)}`;
    }
}

/* ==========================================================
   HEADER
========================================================== */

class Header {
    constructor() {
        this.header = Utils.$(".site-header");
        this.lastScroll = 0;
        this.ticking = false;
    }

    init() {
        if (!this.header) return;

        window.addEventListener("scroll", () => {
            if (this.ticking) return;
            this.ticking = true;

            requestAnimationFrame(() => {
                this.update();
                this.ticking = false;
            });
        });

        this.update();
    }

    update() {
        const current = window.scrollY;

        this.header.classList.toggle("is-scrolled", current > 20);
        this.header.classList.toggle("is-hidden", current > this.lastScroll && current > 180);

        this.lastScroll = current;
    }
}

/* ==========================================================
   MENU MOBILE
========================================================== */

class MobileMenu {
    constructor() {
        this.button = Utils.$("#navToggle");
        this.menu = Utils.$("#mainNav");
    }

    init() {
        if (!this.button || !this.menu) return;

        this.button.addEventListener("click", () => this.toggle());

        this.menu.addEventListener("click", (event) => {
            if (event.target.tagName === "A") this.close();
        });

        document.addEventListener("keydown", ({ key }) => {
            if (key === "Escape") this.close();
        });
    }

    toggle() {
        const opened = this.menu.classList.toggle("is-open");
        this.button.setAttribute("aria-expanded", opened);
        document.body.classList.toggle("menu-open", opened);
    }

    close() {
        this.menu.classList.remove("is-open");
        this.button.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
    }
}

/* ==========================================================
   REVEAL ANIMATION
========================================================== */

class Reveal {
    constructor() {
        this.elements = Utils.$$(".reveal");
    }

    init() {
        if (!this.elements.length) return;

        // Sem suporte a IntersectionObserver, ou com "reduzir movimento" ativado: mostra tudo direto
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (!("IntersectionObserver" in window) || prefersReducedMotion) {
            this.elements.forEach(el => el.classList.add("is-visible"));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.15 });

        this.elements.forEach(element => observer.observe(element));
    }
}

/* ==========================================================
   SCROLL PROGRESS
========================================================== */

class ScrollProgress {
    constructor() {
        this.bar = Utils.$("#scrollProgress");
    }

    init() {
        if (!this.bar) return;
        this.update();
    }

    update() {
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / Math.max(documentHeight, 1)) * 100;

        this.bar.style.width = `${progress}%`;
    }
}

/* ==========================================================
   CARROSSEL MOBILE
========================================================== */

class Carousel {
    constructor() {
        this.section = Utils.$(".mobile-carousel");
        this.track = Utils.$("#carouselTrack");
        this.dotsContainer = Utils.$("#carouselDots");
        this.slides = this.track ? Utils.$$(".carousel-slide", this.track) : [];
        this.dots = [];

        this.index = 0;
        this.autoplayDelay = 4000;
        this.timer = null;

        this.touchStartX = 0;
        this.touchDeltaX = 0;
    }

    init() {
        if (!this.section || !this.track || !this.slides.length) return;

        this.buildDots();
        this.goTo(0);
        this.bindTouch();
        this.startAutoplay();

        // Pausa o autoplay quando o carrossel não está visível na tela
        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    entry.isIntersecting ? this.startAutoplay() : this.stopAutoplay();
                });
            }, { threshold: 0.2 });

            observer.observe(this.section);
        }
    }

    buildDots() {
        this.slides.forEach((_, i) => {
            const dot = document.createElement("button");
            dot.className = "carousel-dot";
            dot.setAttribute("aria-label", `Ir para a foto ${i + 1}`);
            dot.addEventListener("click", () => {
                this.goTo(i);
                this.restartAutoplay();
            });

            this.dotsContainer.appendChild(dot);
            this.dots.push(dot);
        });
    }

    goTo(index) {
        this.index = (index + this.slides.length) % this.slides.length;
        this.track.style.transform = `translateX(-${this.index * 100}%)`;

        this.dots.forEach((dot, i) => {
            dot.classList.toggle("is-active", i === this.index);
        });
    }

    next() {
        this.goTo(this.index + 1);
    }

    startAutoplay() {
        this.stopAutoplay();
        this.timer = setInterval(() => this.next(), this.autoplayDelay);
    }

    stopAutoplay() {
        if (this.timer) clearInterval(this.timer);
        this.timer = null;
    }

    restartAutoplay() {
        if (this.timer) this.startAutoplay();
    }

    bindTouch() {
        this.track.addEventListener("touchstart", (event) => {
            this.touchStartX = event.touches[0].clientX;
            this.touchDeltaX = 0;
            this.stopAutoplay();
        }, { passive: true });

        this.track.addEventListener("touchmove", (event) => {
            this.touchDeltaX = event.touches[0].clientX - this.touchStartX;
        }, { passive: true });

        this.track.addEventListener("touchend", () => {
            const threshold = 40;

            if (this.touchDeltaX > threshold) {
                this.goTo(this.index - 1);
            } else if (this.touchDeltaX < -threshold) {
                this.goTo(this.index + 1);
            }

            this.startAutoplay();
        });
    }
}

/* ==========================================================
   GALERIA
========================================================== */

class Gallery {
    constructor() {
        this.pieces = Utils.$$(".piece");
        this.filters = Utils.$$(".filter-btn");
    }

    init() {
        if (!this.pieces.length) return;
        this.bindFilters();
    }

    bindFilters() {
        this.filters.forEach(button => {
            button.addEventListener("click", () => {
                this.filters.forEach(btn => btn.classList.remove("is-active"));
                button.classList.add("is-active");
                this.filter(button.dataset.filter);
            });
        });
    }

    filter(category) {
        this.pieces.forEach(piece => {
            const match = category === "todas" || piece.dataset.cat === category;
            piece.classList.toggle("is-hidden", !match);
        });
    }
}

/* ==========================================================
   MODAL GALERIA
========================================================== */

class GalleryModal {
    static defaultDescription =
        "Cada peça pode servir de inspiração para uma nova criação. Cores, formatos, dimensões e acabamentos podem ser adaptados conforme sua necessidade.";

    constructor() {
        this.modal = Utils.$("#galleryModal");
        this.image = Utils.$("#modalImage");
        this.title = Utils.$("#modalTitle");
        this.description = Utils.$("#modalDescription");
        this.button = Utils.$("#modalWhatsapp");
        this.closeButton = Utils.$(".modal-close");
        this.pieces = Utils.$$(".piece");
    }

    init() {
        if (!this.modal) return;

        this.pieces.forEach(piece => {
            piece.addEventListener("click", () => this.open(piece));
        });

        this.closeButton?.addEventListener("click", () => this.close());

        this.modal.addEventListener("click", (event) => {
            if (event.target === this.modal) this.close();
        });

        document.addEventListener("keydown", ({ key }) => {
            if (key === "Escape") this.close();
        });
    }

    open(piece) {
        const image = piece.querySelector("img");

        this.image.src = image.src;
        this.image.alt = image.alt;
        this.title.textContent = piece.dataset.name;
        this.description.textContent = piece.dataset.desc || GalleryModal.defaultDescription;
        this.button.href = Utils.whatsappLink(
            `Olá! Vi a peça "${piece.dataset.name}" no site e gostaria de fazer uma semelhante. ✨`
        );

        document.body.style.overflow = "hidden";
        this.modal.showModal();
    }

    close() {
        if (!this.modal.open) return;
        this.modal.close();
        document.body.style.overflow = "";
    }
}

/* ==========================================================
   BACK TO TOP
========================================================== */

class BackToTop {
    constructor() {
        this.button = Utils.$("#backToTop");
    }

    init() {
        if (!this.button) return;
        this.button.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    update() {
        if (!this.button) return;
        this.button.classList.toggle("show", window.scrollY > 500);
    }
}

/* ==========================================================
   WHATSAPP
========================================================== */

class Whatsapp {
    constructor() {
        this.elements = ["ctaFinalBtn", "footerWhats", "whatsFloat"];
    }

    init() {
        const link = Utils.whatsappLink();

        this.elements.forEach(id => {
            const element = document.getElementById(id);
            if (element) element.href = link;
        });
    }
}

/* ==========================================================
   FORMULÁRIO DE ENCOMENDA
========================================================== */

class OrderForm {
    constructor() {
        this.form = Utils.$("#orderForm");
        this.nameInput = Utils.$("#orderName");
        this.ideaInput = Utils.$("#orderIdea");
    }

    init() {
        if (!this.form) return;

        this.form.addEventListener("submit", (event) => {
            event.preventDefault();

            if (!this.form.checkValidity()) {
                this.form.reportValidity();
                return;
            }

            this.submit();
        });
    }

    submit() {
        const name = this.nameInput.value.trim();
        const idea = this.ideaInput.value.trim();

        const message =
            `Olá! Meu nome é ${name} e gostaria de fazer uma encomenda personalizada de cerâmica. ` +
            `Minha ideia: ${idea} ✨`;

        window.open(Utils.whatsappLink(message), "_blank", "noopener");
    }
}

/* ==========================================================
   FOOTER
========================================================== */

class Footer {
    init() {
        const year = Utils.$("#ano");
        if (year) year.textContent = new Date().getFullYear();
    }
}

/* ==========================================================
   SCROLL MANAGER
========================================================== */

class ScrollManager {
    constructor(modules) {
        this.modules = modules;
        this.ticking = false;
    }

    init() {
        window.addEventListener("scroll", () => {
            if (this.ticking) return;
            this.ticking = true;

            requestAnimationFrame(() => {
                this.modules.forEach(module => module.update?.());
                this.ticking = false;
            });
        });
    }
}

/* ==========================================================
   APP
========================================================== */

class App {
    constructor() {
        this.header = new Header();
        this.backToTop = new BackToTop();
        this.scrollProgress = new ScrollProgress();

        this.modules = [
            this.header,
            new MobileMenu(),
            new Reveal(),
            this.scrollProgress,
            new Carousel(),
            new Gallery(),
            new GalleryModal(),
            new OrderForm(),
            this.backToTop,
            new Whatsapp(),
            new Footer()
        ];
    }

    init() {
        this.modules.forEach(module => module.init());

        // Referenciados pelo nome (não pelo índice) para não quebrar se a lista de módulos mudar
        new ScrollManager([this.header, this.backToTop, this.scrollProgress]).init();
    }
}

/* ==========================================================
   START
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    new App().init();
});
