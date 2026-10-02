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
   GOOGLE SHEET + WHATSAPP ORDER
================================ */

const orderForm = document.getElementById("orderForm");

if (orderForm) {

    orderForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const address =
            document.getElementById("address").value.trim();

        const quantity =
            document.getElementById("quantity").value;

        const couponElement =
            document.getElementById("couponCode");

        const couponCode =
            couponElement
                ? couponElement.value.trim()
                : "";


        /*
         * CHANGE THESE
         */

        const whatsappNumber = "8801601824990";

        const googleScriptURL =
            "https://script.google.com/macros/s/AKfycbw3fe0M5ZjkUcVIqOajdNo33Te2boTXxQQRy9MHpRqSLoeRHwRLs3kYSkuXQwUMcymS/exec";


        /*
         * PRODUCT PRICE
         */

        const productPrice = 0;

        const orderValue =
            productPrice * Number(quantity);


        /*
         * SEND TO GOOGLE SHEET
         */

        const orderData = {

            name: name,
            phone: phone,
            address: address,
            quantity: quantity,
            orderValue: orderValue,
            couponCode: couponCode

        };


        const submitButton =
            orderForm.querySelector(".order-submit");

        submitButton.disabled = true;

        submitButton.textContent =
            "PROCESSING...";


        try {

            const response = await fetch(
                googleScriptURL,
                {
                    method: "POST",

                    body: JSON.stringify(orderData)
                }
            );


            const result =
                await response.json();


            if (!result.success) {

                throw new Error(
                    "Order could not be saved."
                );

            }


            /*
             * WHATSAPP MESSAGE
             */

            const message =
`🎴 CARDIEBUDDIE ORDER

Order No: ${result.orderNo}

Name: ${name}
Phone: ${phone}
Address: ${address}
Quantity: ${quantity}
Order Value: ৳${orderValue}

Coupon Code: ${couponCode || "None"}

Order Status: Pending

SAY IT. DO IT. SCORE IT.`;


            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;


            window.location.href = whatsappURL;


        } catch (error) {

            console.error(error);

            alert(
                "Something went wrong while placing your order. Please try again."
            );

            submitButton.disabled = false;

            submitButton.textContent =
                "ORDER VIA WHATSAPP →";

        }

    });

}


/* ================================
   PROMO POPUP — SHOW ONCE
================================ */

const promoPopup = document.getElementById("promoPopup");
const promoClose = document.getElementById("promoClose");

if (promoPopup && promoClose) {

    const promoSeen = localStorage.getItem("cardiebuddiePromoSeen");

    if (promoSeen === "true") {
        promoPopup.classList.add("hidden");
    }

    function closePromo() {
        promoPopup.classList.add("hidden");
        localStorage.setItem("cardiebuddiePromoSeen", "true");
    }

    promoClose.addEventListener("click", closePromo);

    promoPopup
        .querySelector(".promo-overlay")
        .addEventListener("click", closePromo);
}



/* ================================
   ORDER TRACKING
================================ */

const trackForm =
    document.getElementById("trackForm");


if (trackForm) {

    trackForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const orderId =
                document
                    .getElementById("trackOrderId")
                    .value
                    .trim();


            const phone =
                document
                    .getElementById("trackPhone")
                    .value
                    .trim();


            const resultBox =
                document.getElementById("trackResult");


            resultBox.className =
                "track-result loading";


            resultBox.innerHTML =
                "CHECKING ORDER...";


            const googleScriptURL =
                "https://script.google.com/macros/s/AKfycbyqIFcpr_djihag0dd7msidLLGkhN-y3r5srZ7mzHU02xnNnad_SqHnic4tYY2PaXh2/exec";


            const trackData = {

                action: "track",

                orderId: orderId,

                phone: phone

            };


            try {

                const response =
                    await fetch(
                        googleScriptURL,
                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "text/plain;charset=utf-8"
                            },

                            body:
                                JSON.stringify(trackData)

                        }
                    );


                const data =
                    await response.json();


                if (!data.success) {

                    resultBox.className =
                        "track-result error";


                    resultBox.innerHTML = `

                        <strong>
                            ORDER NOT FOUND
                        </strong>

                        <p>
                            ${data.message}
                        </p>

                    `;

                    return;

                }


                resultBox.className =
                    "track-result success";


                resultBox.innerHTML = `

                    <div class="track-success-title">
                        ORDER FOUND ✓
                    </div>


                    <div class="track-order-number">
                        ${data.orderNo}
                    </div>


                    <div class="track-status">

                        <span>STATUS</span>

                        <strong>
                            ${data.status}
                        </strong>

                    </div>


                    <div class="track-remarks">

                        <span>REMARKS</span>

                        <p>
                            ${data.remarks || "No remarks yet."}
                        </p>

                    </div>

                `;


            } catch (error) {

                console.error(
                    "TRACK ORDER ERROR:",
                    error
                );


                resultBox.className =
                    "track-result error";


                resultBox.innerHTML = `

                    <strong>
                        SOMETHING WENT WRONG
                    </strong>

                    <p>
                        Please try again later.
                    </p>

                `;

            }

        });

}