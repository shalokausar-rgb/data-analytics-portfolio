// ===============================
// Shehla Kausar Portfolio - script.js
// ===============================

// ---------- DOM ELEMENTS ----------
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const contactForm = document.getElementById("contactForm");

// ---------- MOBILE MENU ----------
function initMobileMenu() {
    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        menuToggle.innerHTML = navLinks.classList.contains("active")
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// ---------- CONTACT FORM ----------
function initContactForm() {
    if (!contactForm) return;

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Message sent successfully!");
        contactForm.reset();
    });
}

// ---------- ✅ FIXED COUNTER (IMPORTANT) ----------
function initCounterAnimation() {
    const counters = document.querySelectorAll(".stat-number");

    counters.forEach(counter => {
        const target = Number(counter.getAttribute("data-count"));
        let current = 0;

        const interval = setInterval(() => {
            current++;
            counter.textContent = current;

            if (current >= target) {
                counter.textContent = target + "+";
                clearInterval(interval);
            }
        }, 30); // speed
    });
}

// ---------- SMOOTH SCROLL ----------
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: "smooth"
                });
            }
        });
    });
}

// ---------- HEADER SHADOW ----------
function initHeaderScroll() {
    const header = document.querySelector("header");
    if (!header) return;

    window.addEventListener("scroll", () => {
        header.style.boxShadow =
            window.scrollY > 50
                ? "0 8px 20px rgba(106,13,173,0.2)"
                : "none";
    });
}

// ---------- INIT EVERYTHING ----------
function initPortfolio() {
    initMobileMenu();
    initContactForm();
    initSmoothScroll();
    initHeaderScroll();
    initCounterAnimation(); // 🔥 COUNTER RUNS HERE
}

// ---------- DOM READY ----------
document.addEventListener("DOMContentLoaded", initPortfolio)