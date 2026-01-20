// ===================================
// ZORX TRAVEL AGENCY - MAIN JAVASCRIPT
// Core functionality and interactions
// ===================================

// === UTILITY FUNCTIONS ===

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// === STICKY HEADER ===
function initStickyHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    const handleScroll = () => {
        if (window.scrollY > 100) {
            header.classList.remove('transparent');
            header.classList.add('solid');
        } else {
            header.classList.add('transparent');
            header.classList.remove('solid');
        }
    };

    // Initial state
    if (window.scrollY > 100) {
        header.classList.add('solid');
    } else {
        header.classList.add('transparent');
    }

    window.addEventListener('scroll', debounce(handleScroll, 10));
}

// === MOBILE MENU TOGGLE ===
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
}

// === SCROLL REVEAL ANIMATIONS ===
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-stagger');

    if (!revealElements.length) return;

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optionally unobserve after revealing
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        observer.observe(element);
    });
}

// === SMOOTH SCROLL ===
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// === WHATSAPP LINK GENERATOR ===
function generateWhatsAppLink(tourName = '') {
    // Replace with actual WhatsApp number
    const phoneNumber = '971564083282';

    let message = 'Hi Zorx, I\'m interested in ';

    if (tourName) {
        message += `the ${tourName}. `;
    } else {
        message += 'your services. ';
    }

    message += 'Please send details.';

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

// === WHATSAPP BUTTONS ===
function initWhatsAppButtons() {
    const whatsappButtons = document.querySelectorAll('[data-whatsapp]');

    whatsappButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const tourName = button.getAttribute('data-tour-name') || '';
            const whatsappUrl = generateWhatsAppLink(tourName);
            window.open(whatsappUrl, '_blank');
        });
    });
}

// === CARD HOVER EFFECTS ===
function initCardEffects() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
}

// === LAZY LOADING IMAGES ===
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// === FORM VALIDATION ===
function initFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Basic validation
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });

            if (isValid) {
                // Handle form submission (e.g., send to WhatsApp or email)
                const message = `New enquiry from ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nMessage: ${data.message}`;
                const whatsappUrl = generateWhatsAppLink('Custom Enquiry');
                window.open(whatsappUrl, '_blank');
                form.reset();
            }
        });
    });
}

// === INITIALIZE ALL ===
function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAll);
    } else {
        initAll();
    }
}

function initAll() {
    initStickyHeader();
    initMobileMenu();
    initScrollReveal();
    initSmoothScroll();
    initWhatsAppButtons();
    initCardEffects();
    initLazyLoading();
    initFormValidation();

    console.log('🚀 Zorx Travel Agency initialized');
}

// Start initialization
init();

// === EXPORT FOR USE IN OTHER FILES ===
window.ZorxTravel = {
    generateWhatsAppLink,
    initScrollReveal,
    debounce
};
