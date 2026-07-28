/* ==========================================================
   LU FIORENTINO
   Config
========================================================== */

class Config {

    static whatsappNumber = "5511977067642";

    static defaultMessage =
        "Olá! Vim pelo site e gostaria de fazer uma encomenda personalizada de cerâmica. ✨";

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

        this.header.classList.toggle(
            "is-scrolled",
            current > 20
        );

        this.header.classList.toggle(
            "is-hidden",
            current > this.lastScroll && current > 180
        );

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

        this.button.addEventListener(
            "click",
            () => this.toggle()
        );

        this.menu.addEventListener("click", (event) => {

            if (event.target.tagName === "A") {

                this.close();

            }

        });

        document.addEventListener("keydown", ({ key }) => {

            if (key === "Escape") {

                this.close();

            }

        });

    }

    toggle() {

        const opened =
            this.menu.classList.toggle("is-open");

        this.button.setAttribute(
            "aria-expanded",
            opened
        );

        document.body.classList.toggle(
            "menu-open",
            opened
        );

    }

    close() {

        this.menu.classList.remove("is-open");

        this.button.setAttribute(
            "aria-expanded",
            "false"
        );

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

        const observer = new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add(
                        "is-visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                });

            },

            {
                threshold: 0.15
            }

        );


        this.elements.forEach(element => {

            observer.observe(element);

        });

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

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;


        const progress =
            (window.scrollY / documentHeight) * 100;


        this.bar.style.width =
            `${progress}%`;

    }

}


/* ==========================================================
   GALERIA
========================================================== */

class Gallery {

    constructor() {

        this.pieces =
            Utils.$$(".piece");

        this.filters =
            Utils.$$(".filter-btn");

    }


    init() {

        if (!this.pieces.length) return;

        this.bindFilters();

    }


    bindFilters() {

        this.filters.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    this.filters.forEach(btn => {

                        btn.classList.remove(
                            "is-active"
                        );

                    });


                    button.classList.add(
                        "is-active"
                    );


                    this.filter(
                        button.dataset.filter
                    );

                }
            );

        });

    }


    filter(category) {


        this.pieces.forEach(piece => {


            const match =
                category === "todas" ||
                piece.dataset.cat === category;



            piece.classList.toggle(
                "is-hidden",
                !match
            );


        });


    }

}
/* ==========================================================
   MODAL GALERIA
========================================================== */

class GalleryModal {

    constructor() {

        this.modal =
            Utils.$("#galleryModal");

        this.image =
            Utils.$("#modalImage");

        this.title =
            Utils.$("#modalTitle");

        this.button =
            Utils.$("#modalWhatsapp");

        this.closeButton =
            Utils.$(".modal-close");

        this.pieces =
            Utils.$$(".piece");

    }


    init() {

        if (!this.modal) return;


        this.pieces.forEach(piece => {

            piece.addEventListener(
                "click",
                () => this.open(piece)
            );

        });


        this.closeButton?.addEventListener(
            "click",
            () => this.close()
        );


        this.modal.addEventListener(
            "click",
            event => {

                if(event.target === this.modal){

                    this.close();

                }

            }
        );


        document.addEventListener(
            "keydown",
            ({key}) => {

                if(key === "Escape"){

                    this.close();

                }

            }
        );

    }


    open(piece) {


        const image =
            piece.querySelector("img");


        this.image.src =
            image.src;


        this.image.alt =
            image.alt;


        this.title.textContent =
            piece.dataset.name;


        this.button.href =
            Utils.whatsappLink(

                `Olá! Vi a peça "${piece.dataset.name}" no site e gostaria de fazer uma semelhante. ✨`

            );


        document.body.style.overflow =
            "hidden";


        this.modal.showModal();

    }


    close() {


        if(!this.modal.open) return;


        this.modal.close();


        document.body.style.overflow =
            "";

    }

}


/* ==========================================================
   BACK TO TOP
========================================================== */

class BackToTop {

    constructor(){

        this.button =
            Utils.$("#backToTop");

    }


    init(){

        if(!this.button) return;


        this.button.addEventListener(
            "click",
            () => {

                window.scrollTo({

                    top:0,

                    behavior:"smooth"

                });

            }
        );

    }


    update(){

        if(!this.button) return;


        this.button.classList.toggle(

            "show",

            window.scrollY > 500

        );

    }

}


/* ==========================================================
   WHATSAPP
========================================================== */

class Whatsapp {


    constructor(){

        this.elements = [

            "ctaFinalBtn",

            "footerWhats",

            "whatsFloat"

        ];

    }


    init(){

        const link =
            Utils.whatsappLink();


        this.elements.forEach(id => {


            const element =
                document.getElementById(id);


            if(element){

                element.href = link;

            }


        });

    }

}


/* ==========================================================
   FOOTER
========================================================== */

class Footer {


    init(){

        const year =
            Utils.$("#ano");


        if(year){

            year.textContent =
                new Date()
                .getFullYear();

        }

    }

}


/* ==========================================================
   SCROLL MANAGER
========================================================== */

class ScrollManager {


    constructor(modules){

        this.modules = modules;

        this.ticking = false;

    }


    init(){


        window.addEventListener(
            "scroll",
            () => {


                if(this.ticking) return;


                this.ticking = true;


                requestAnimationFrame(()=>{


                    this.modules.forEach(
                        module => {

                            if(module.update){

                                module.update();

                            }

                        }
                    );


                    this.ticking = false;


                });


            }
        );

    }

}


/* ==========================================================
   APP
========================================================== */

class App {


    constructor(){


        this.header =
            new Header();


        this.backToTop =
            new BackToTop();


        this.modules = [

            this.header,

            new MobileMenu(),

            new Reveal(),

            new ScrollProgress(),

            new Gallery(),

            new GalleryModal(),

            this.backToTop,

            new Whatsapp(),

            new Footer()

        ];


    }


    init(){


        this.modules.forEach(
            module => {

                module.init();

            }
        );


        new ScrollManager([

            this.header,

            this.backToTop,

            this.modules[3]

        ]).init();


    }

}


/* ==========================================================
   START
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        new App().init();

    }

);