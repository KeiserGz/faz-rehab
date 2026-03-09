// ── AOS initialisation ───────────────────────────────────────────
AOS.init({
    duration: 700,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80,
});

// ── EmailJS initialisation ───────────────────────────────────────
emailjs.init('YOUR_PUBLIC_KEY_HERE');

// ── Slideshow ────────────────────────────────────────────────────
let slideIndex = 1;
let slideshowTimer;

function changeSlide(n) {
    clearTimeout(slideshowTimer);
    showSlide(slideIndex += n);
    autoSlideshow();
}

function currentSlide(n) {
    clearTimeout(slideshowTimer);
    showSlide(slideIndex = n);
    autoSlideshow();
}

function showSlide(n) {
    const slides = document.querySelectorAll('.slide');
    const dots   = document.querySelectorAll('.dot');

    if (n > slides.length) slideIndex = 1;
    if (n < 1)             slideIndex = slides.length;

    slides.forEach(s => s.style.display = 'none');
    dots.forEach(d => d.classList.remove('active'));

    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].classList.add('active');
}

function autoSlideshow() {
    slideshowTimer = setTimeout(() => {
        showSlide(slideIndex += 1);
        autoSlideshow();
    }, 5000);
}

if (document.querySelectorAll('.slide').length > 0) {
    showSlide(slideIndex);
    autoSlideshow();
}

// ── Smooth scroll ────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

function scrollToSection(sectionId) {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── Contact form ─────────────────────────────────────────────────
// Submission and UI state are handled by Alpine.js in index.html.
// EmailJS is initialised above so it is available to the Alpine handler.

// ── Active nav-link on scroll ────────────────────────────────────
window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section').forEach(section => {
        if (pageYOffset >= section.offsetTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href ? href.slice(1) === current : false);
    });
});

