document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       MOBILE MENU
    ========================= */

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {

            navLinks.classList.toggle("active");

            if (navLinks.classList.contains("active")) {
                menuToggle.innerHTML = "✕";
            } else {
                menuToggle.innerHTML = "☰";
            }

        });


        /* Close menu after clicking a link */

        const links = navLinks.querySelectorAll("a");

        links.forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("active");

                menuToggle.innerHTML = "☰";

            });

        });

    }


    /* =========================
       WHATSAPP ORDER
    ========================= */

    const orderForm = document.getElementById("orderForm");

    if (orderForm) {

        orderForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name =
                document.getElementById("customerName").value;

            const phone =
                document.getElementById("phone").value;

            const address =
                document.getElementById("address").value;

            const quantity =
                document.getElementById("quantity").value;


            const message =
                "Hello Cardiebuddie!%0A%0A" +
                "I want to order TRUTH & DARE.%0A%0A" +
                "Name: " +
                encodeURIComponent(name) +
                "%0A" +

                "Phone: " +
                encodeURIComponent(phone) +
                "%0A" +

                "Address: " +
                encodeURIComponent(address) +
                "%0A" +

                "Quantity: " +
                quantity;


            /*
             * PUT YOUR REAL WHATSAPP NUMBER HERE
             */

            const whatsappNumber = "8801XXXXXXXXX";


            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                message;


            window.open(
                whatsappURL,
                "_blank"
            );

        });

    }

});



/* =========================
   GALLERY LIGHTBOX
========================= */

const galleryItems =
    document.querySelectorAll(".gallery-item img");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxClose =
    document.getElementById("lightboxClose");

const lightboxPrev =
    document.getElementById("lightboxPrev");

const lightboxNext =
    document.getElementById("lightboxNext");

let currentImage = 0;


if (
    galleryItems.length &&
    lightbox
) {

    function showImage(index) {

        currentImage =
            (index + galleryItems.length)
            % galleryItems.length;

        lightboxImage.src =
            galleryItems[currentImage].src;

        lightboxImage.alt =
            galleryItems[currentImage].alt;

        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";
    }


    galleryItems.forEach(function (image, index) {

        image.addEventListener("click", function () {

            showImage(index);

        });

    });


    lightboxNext.addEventListener(
        "click",
        function () {

            showImage(currentImage + 1);

        }
    );


    lightboxPrev.addEventListener(
        "click",
        function () {

            showImage(currentImage - 1);

        }
    );


    lightboxClose.addEventListener(
        "click",
        function () {

            lightbox.classList.remove("active");

            document.body.style.overflow = "";

        }
    );


    lightbox.addEventListener(
        "click",
        function (event) {

            if (event.target === lightbox) {

                lightbox.classList.remove("active");

                document.body.style.overflow = "";

            }

        }
    );


    document.addEventListener(
        "keydown",
        function (event) {

            if (!lightbox.classList.contains("active")) {
                return;
            }

            if (event.key === "Escape") {

                lightbox.classList.remove("active");

                document.body.style.overflow = "";

            }

            if (event.key === "ArrowRight") {
                showImage(currentImage + 1);
            }

            if (event.key === "ArrowLeft") {
                showImage(currentImage - 1);
            }

        }
    );

}

/* ================================
   SITE LOADER
================================ */

window.addEventListener("load", function () {

    const loader = document.getElementById("siteLoader");

    if (loader) {
        loader.classList.add("loaded");
    }

});



/* ================================
   WHATSAPP ORDER
================================ */

const orderForm = document.getElementById("orderForm");

if (orderForm) {

    orderForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value;

        const phone =
            document.getElementById("phone").value;

        const address =
            document.getElementById("address").value;

        const quantity =
            document.getElementById("quantity").value;


        const whatsappNumber = "8801601824990";


        const message =
`🎴 CARDIEBUDDIE ORDER

Name: ${name}
Phone: ${phone}
Address: ${address}
Quantity: ${quantity}

TRUTH & DARE
SAY IT. DO IT. SCORE IT.`;


        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;


        window.open(whatsappURL, "_blank");

    });

}