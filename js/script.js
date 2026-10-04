async function loadSection(containerId, filePath) {
    try {
        const response = await fetch(filePath);

        if (!response.ok) {
            throw new Error(`Gagal memuat ${filePath}`);
        }

        const html = await response.text();

        document.getElementById(containerId).innerHTML = html;

    } catch (error) {
        console.error(error);
    }
}

// Load semua section
Promise.all([
    loadSection("navbar-container", "sections/navbar.html"),
    loadSection("home-container", "sections/home.html"),
    loadSection("about-container", "sections/about.html"),
    loadSection("services-container", "sections/services.html"),
    loadSection("portfolio-container", "sections/portfolio.html"),
    loadSection("certifications-container","sections/certifications.html"),
    loadSection("testimonials-container", "sections/testimonials.html"),
    loadSection("contact-container", "sections/contact.html")
]);

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if(entry.isIntersecting){

            entry.target.classList.add('show');
        }

    });

});

setTimeout(() => {

    document
    .querySelectorAll('section')
    .forEach((el) => {

        el.classList.add('hidden');

        observer.observe(el);

    });

}, 500);

/* =========================
   SCROLL TO TOP
========================= */

const scrollBtn =
document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {

    if(window.scrollY > 500){

        scrollBtn.classList.add("show-btn");

    }else{

        scrollBtn.classList.remove("show-btn");
    }

});

scrollBtn.addEventListener("click", () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"
    });

});

/* =========================
   ACTIVE NAVBAR
========================= */

const sections =
document.querySelectorAll("section");

const navLinks =
document.querySelectorAll(".navbar nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach((section) => {

        const sectionTop =
        section.offsetTop - 200;

        if(window.scrollY >= sectionTop){

            current = section.getAttribute("id");
        }

    });

    navLinks.forEach((link) => {

        link.classList.remove("active");

        if(
            link.getAttribute("href")
            === `#${current}`
        ){

            link.classList.add("active");
        }

    });

});

/* =========================
   CERTIFICATE LIGHTBOX
========================= */

setTimeout(() => {

    const modal =
    document.getElementById("certificateModal");

    const modalImage =
    document.getElementById("modalImage");

    const images =
    document.querySelectorAll(".certificate-image");

    const closeBtn =
    document.querySelector(".close-modal");

    images.forEach((img) => {

        img.addEventListener("click", () => {

            modal.style.display = "flex";

            modalImage.src = img.src;

        });

    });

    closeBtn.addEventListener("click", () => {

        modal.style.display = "none";

    });

    modal.addEventListener("click", (e) => {

        if(e.target === modal){

            modal.style.display = "none";

        }

    });

}, 500);

/* =========================
   MORE CERTIFICATIONS
========================= */

setTimeout(() => {

    const toggleButton =
        document.getElementById("toggleCertificates");

    const hiddenCertificates =
        document.querySelectorAll(".extra-certificate");

    if (!toggleButton) return;

    let isExpanded = false;

    toggleButton.addEventListener("click", () => {

        isExpanded = !isExpanded;

        hiddenCertificates.forEach((card) => {

            card.style.display = isExpanded ? "block" : "none";

        });

        toggleButton.innerHTML = isExpanded
            ? '<i class="fas fa-chevron-up"></i> Show Less'
            : '<i class="fas fa-chevron-down"></i> More Certifications';

    });

}, 500);