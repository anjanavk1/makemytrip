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
    const heroHeader = document.querySelector('.hero-header');

    // Check if header should always be solid (e.g. on subpages)
    // We check this BEFORE any scroll logic runs to capture the HTML state
    const isAlwaysSolid = header && header.classList.contains('solid');

    if (!header && !heroHeader) return;

    const handleScroll = () => {
        if (window.scrollY > 100) {
            if (header) {
                header.classList.remove('transparent');
                header.classList.add('solid');
            }
            if (heroHeader) {
                heroHeader.classList.add('solid');
            }
        } else {
            if (header && !isAlwaysSolid) {
                header.classList.add('transparent');
                header.classList.remove('solid');
            }
            if (heroHeader) {
                heroHeader.classList.remove('solid');
            }
        }
    };

    // Initial state
    if (window.scrollY > 100) {
        if (header) header.classList.add('solid');
        if (heroHeader) heroHeader.classList.add('solid');
    } else {
        if (header && !isAlwaysSolid) header.classList.add('transparent');
        // heroHeader doesn't need explicit transparent class as it's default styling
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

    let message = 'Hi Take My Trip Tourism, I\'m interested in ';

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

// === FLOATING BUTTONS INJECTION ===
function initFloatingButtons() {
    // Prevent duplicates
    if (document.querySelector('.floating-buttons-container')) return;

    const container = document.createElement('div');
    container.className = 'floating-buttons-container';

    // WhatsApp Button
    const waLink = generateWhatsAppLink();
    const waBtn = document.createElement('a');
    waBtn.href = waLink;
    waBtn.className = 'floating-btn floating-btn-whatsapp';
    waBtn.target = '_blank';
    waBtn.setAttribute('aria-label', 'Chat on WhatsApp');
    waBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;

    // Call Button
    const callBtn = document.createElement('a');
    callBtn.href = 'tel:+971564083282';
    callBtn.className = 'floating-btn floating-btn-call';
    callBtn.setAttribute('aria-label', 'Call Us');
    callBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.49-5.15-3.8-6.62-6.62l1.97-1.57c.23-.23.33-.55.27-.85a11.41 11.41 0 01-.57-3.52C8.94 3.55 8.1 2.71 7.07 2.71H4.07C3.04 2.71 2.2 3.55 2.2 4.58c0 10.18 8.24 18.42 18.42 18.42 1.03 0 1.87-.84 1.87-1.87v-3.01c0-1.03-.84-1.87-1.87-1.87z"/></svg>`;

    container.appendChild(waBtn);
    container.appendChild(callBtn);
    document.body.appendChild(container);
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
    initFloatingButtons(); // Inject floating buttons

    console.log('🚀 Take My Trip Tourism initialized');
}

// Start initialization
init();

// === EXPORT FOR USE IN OTHER FILES ===
window.TakeMyTripTourism = {
    generateWhatsAppLink,
    initScrollReveal,
    debounce
};
