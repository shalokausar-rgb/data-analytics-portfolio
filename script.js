// script.js - Shehla Kausar Portfolio

// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const contactForm = document.getElementById('contactForm');
const statNumbers = document.querySelectorAll('.stat-number');
const skillBars = document.querySelectorAll('.skill-level');

// Mobile Menu Toggle
function initMobileMenu() {
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.innerHTML = navLinks.classList.contains('active')
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
}

// Contact Form Submission
function initContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = contactForm.querySelector('input[type="text"]').value.trim();
            const email = contactForm.querySelector('input[type="email"]').value.trim();
            const service = contactForm.querySelector('select').value;
            const message = contactForm.querySelector('textarea').value.trim();

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!name || !email || !service || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }

            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                showNotification(Thank you ${name}! Your message has been sent. I'll contact you within 24 hours., 'success');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Notification System
function showNotification(message, type = 'success') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) existingNotification.remove();

    const notification = document.createElement('div');
    notification.className = notification notification-${type};
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;

    document.body.appendChild(notification);

    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });

    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) notification.remove();
            }, 300);
        }
    }, 5000);
}

// Animated Statistics Counter
function initCounterAnimation() {
    if (statNumbers.length === 0) return;

    const animateCounter = (element, suffix = '+') => {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + suffix;
            }
        };
        updateCounter();
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(animateCounter);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsCard = document.querySelector('.stats-card');
    if (statsCard) observer.observe(statsCard);
}

// Animate Skill Bars
function initSkillBarsAnimation() {
    if (skillBars.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.transition = 'width 1.5s ease-in-out';
                    bar.style.width = width;
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const skillsSection = document.getElementById('skills');
    if (skillsSection) observer.observe(skillsSection);
}

// Smooth Scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    let scrollTimeout;
    const updateHeader = () => {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 10px 30px rgba(106, 13, 173, 0.15)';
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(15px)';
        } else {
            header.style.boxShadow = '0 5px 15px rgba(106, 13, 173, 0.1)';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
    };

    window.addEventListener('scroll', () => {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateHeader, 50);
    });
}

// Project Card Hover Effect
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.project-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.transition = 'all 0.3s ease';
            }
        });
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.project-icon');
            if (icon) icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Service Card Hover Effect
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'translateY(-10px)';
                icon.style.boxShadow = '0 15px 30px rgba(106, 13, 173, 0.3)';
            }
        });
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'translateY(0)';
                icon.style.boxShadow = 'none';
            }
        });
    });
}

// Initialize Portfolio
function initPortfolio() {
    console.log('Shehla Kausar Portfolio - Purple Theme Initializing...');
    initMobileMenu();
    initContactForm();
    initSmoothScroll();
    initCounterAnimation();
    initSkillBarsAnimation();
    initHeaderScroll();
    initProjectCards();
    initServiceCards();

    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    setTimeout(() => { document.body.style.opacity = '1'; }, 100);

    console.log('%c✨ Shehla Kausar - Data Analyst & Mathematician ✨', 'color: #6A0DAD; font-size: 16px; font-weight: bold;');
    console.log('%cPurple Theme Portfolio | Analytics Excellence | Mathematical Precision', 'color: #8A2BE2; font-size: 14px;');
}

// DOM Ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
    initPortfolio();
}