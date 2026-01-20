document.addEventListener('DOMContentLoaded', () => {
    // Destination Data
    const destinations = [
        {
            id: 1,
            name: "DUBAI",
            description: "Dubai is a city and emirate in the United Arab Emirates known for luxury shopping, ultramodern architecture and a lively nightlife scene. Burj Khalifa dominates the skyscraper-filled skyline.",
            bgImage: "images/dubai-hero-new.png",
            cardImage: "images/card-dubai.png",
            location: "UAE",
            rating: 5
        },
        {
            id: 2,
            name: "DESERT SAFARI",
            description: "Experience the thrill of dune bashing, camel rides, and traditional entertainment in the golden sands of Arabia.",
            bgImage: "images/desert-safari.avif",
            cardImage: "images/desert-safari-jeep.png",
            location: "Dubai Desert",
            rating: 5
        },
        {
            id: 3,
            name: "PALM JUMEIRAH",
            description: "Explore the world-famous artificial archipelago tailored for luxury living and relaxation.",
            bgImage: "images/palm-jumeirah.avif",
            cardImage: "images/palm-jumeirah.avif",
            location: "Palm Jumeirah",
            rating: 5
        }
    ];

    let currentIndex = 0;
    const slideIntervalTime = 2000;
    let slideInterval;

    // DOM Elements
    const bgContainer = document.querySelector('.hero-bg-container');
    const nameEl = document.querySelector('.hero-destination-name');
    const descEl = document.querySelector('.hero-description');
    const paginationCurrent = document.querySelector('.pagination-current');
    const paginationBar = document.querySelector('.pagination-bar');
    const cardsContainer = document.querySelector('.hero-cards-container');

    // Initialize
    function init() {
        renderBackgrounds();
        renderCards();
        updateSlide(0);
        startAutoPlay();
    }

    // Render all backgrounds (opacity 0)
    function renderBackgrounds() {
        bgContainer.innerHTML = destinations.map((dest, index) => `
      <img src="${dest.bgImage}" class="hero-bg ${index === 0 ? 'active' : ''}" data-index="${index}" alt="${dest.name}">
    `).join('');
    }

    // Render cards
    function renderCards() {
        // We render based on current index logic in update, but initial DOM:
        // We just create placeholders or dynamic rendering in updateCards()
    }

    function updateSlide(index) {
        // Update Indices
        currentIndex = index;

        // Update Backgrounds
        document.querySelectorAll('.hero-bg').forEach((bg, i) => {
            if (i === currentIndex) {
                bg.classList.add('active');
                // Reset transform animation
            } else {
                bg.classList.remove('active');
            }
        });

        // Update Text with Animation Reset
        animateText(nameEl, destinations[currentIndex].name);
        animateText(descEl, destinations[currentIndex].description);

        // Update Pagination
        paginationCurrent.textContent = `0${currentIndex + 1}`;

        // Reset Progress Bar
        paginationBar.style.transition = 'none';
        paginationBar.style.width = '0%';
        setTimeout(() => {
            paginationBar.style.transition = `width ${slideIntervalTime}ms linear`;
            paginationBar.style.width = '100%';
        }, 50);

        // Update Cards
        updateCards(currentIndex);
    }

    function animateText(element, newText) {
        element.style.animation = 'none';
        element.offsetHeight; /* trigger reflow */
        element.style.opacity = '0';
        element.textContent = newText;
        element.style.animation = 'fadeInUp 0.8s forwards';
    }

    function updateCards(activeIndex) {
        // Logic: 
        // Card 1 (Active): destinations[activeIndex]
        // Card 2 (Next): destinations[activeIndex + 1] (loop)
        // Card 3 (Next Next): destinations[activeIndex + 2]

        const count = destinations.length;
        const activeDest = destinations[activeIndex];
        const nextDest = destinations[(activeIndex + 1) % count];
        const nextNextDest = destinations[(activeIndex + 2) % count];

        const cardsHTML = `
      <div class="hero-card active" style="z-index: 3;">
        ${getCardContent(activeDest)}
      </div>
      <div class="hero-card next" style="z-index: 2;">
        ${getCardContent(nextDest)}
      </div>
       <div class="hero-card prev" style="z-index: 1; transform: translateX(120px) scale(0.8) rotate(10deg); opacity: 0.5;">
        ${getCardContent(nextNextDest)}
      </div>
    `;

        cardsContainer.innerHTML = cardsHTML;
    }

    function getCardContent(dest) {
        return `
      <div class="card-image-wrapper">
        <img src="${dest.cardImage}" class="card-image" alt="${dest.name}">
        <div class="card-bookmark">
           <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
        </div>
      </div>
      <div class="card-info">
        <h3 class="card-title">${formatName(dest.name)}</h3>
        <div class="card-location">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/></svg>
          ${dest.location}
        </div>
        <div class="card-rating">
          ${'★'.repeat(Math.floor(dest.rating))}
        </div>
      </div>
    `;
    }

    function formatName(name) {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }

    function startAutoPlay() {
        slideInterval = setInterval(() => {
            let nextIndex = (currentIndex + 1) % destinations.length;
            updateSlide(nextIndex);
        }, slideIntervalTime);
    }

    // Pause on hover
    document.querySelector('.hero-content').addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
        paginationBar.style.transition = 'none'; // Freeze progress? Or just pause
    });

    document.querySelector('.hero-content').addEventListener('mouseleave', () => {
        startAutoPlay();
    });

    // Run
    init();
});
