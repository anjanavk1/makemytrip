
const testimonials = [
    {
        name: "Mohammad Madhu",
        role: "CEO of XYZ Company",
        quote: "A fantastic experience from start to finish! The team made our trip effortless and memorable with their excellent service and attention to detail. Highly recommend for hassle-free travel planning!",
        image: "images/traveler-luggage.png",
        stars: 5
    },
    {
        name: "Sarah Johnson",
        role: "Marketing Director",
        quote: "Incredible service! They handled every detail of our family vacation perfectly. The destinations were breathtaking and the accommodations exceeded our expectations.",
        image: "images/kayaker-lake.png", // Using available asset
        stars: 5
    },
    {
        name: "David & Emily Chen",
        role: "Travel Enthusiasts",
        quote: "Best travel agency we've ever worked with. Seamless booking, amazing prices, and 24/7 support made our honeymoon absolutely perfect!",
        image: "images/couple-landmark.png",
        stars: 5
    },
    {
        name: "Alex Rivera",
        role: "Adventure Blogger",
        quote: "As a frequent traveler, I appreciate their attention to detail and personalized recommendations. They truly understand what makes a trip unforgettable.",
        image: "images/mountain-hiker.png",
        stars: 5
    }
];

document.addEventListener('DOMContentLoaded', () => {
    let currentIndex = 0;
    let intervalId;
    const slideDuration = 5000; // 5 seconds

    const imageEl = document.getElementById('testimonial-image');
    const quoteEl = document.getElementById('testimonial-quote');
    const nameEl = document.getElementById('client-name');
    const roleEl = document.getElementById('client-role');
    const starsEl = document.getElementById('star-rating');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    function updateTestimonial(index) {
        // Fade out
        imageEl.style.opacity = '0';
        quoteEl.style.opacity = '0';
        document.querySelector('.client-info-row').style.opacity = '0';

        setTimeout(() => {
            const data = testimonials[index];

            imageEl.src = data.image;
            quoteEl.textContent = `"${data.quote}"`;
            nameEl.textContent = data.name;
            roleEl.textContent = data.role;

            // Update stars
            let starsHtml = '';
            for (let i = 0; i < 5; i++) {
                starsHtml += i < data.stars ? '⭐' : '☆';
            }
            starsEl.innerHTML = starsHtml; // Or proper SVG icons

            // Fade in
            imageEl.style.opacity = '1';
            quoteEl.style.opacity = '1';
            document.querySelector('.client-info-row').style.opacity = '1';
        }, 600);
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateTestimonial(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        updateTestimonial(currentIndex);
    }

    function startAutoSlide() {
        stopAutoSlide();
        intervalId = setInterval(nextSlide, slideDuration);
    }

    function stopAutoSlide() {
        if (intervalId) clearInterval(intervalId);
    }

    // Event Listeners
    nextBtn.addEventListener('click', () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });

    // Pause on hover
    const container = document.querySelector('.testimonial-wrapper');
    container.addEventListener('mouseenter', stopAutoSlide);
    container.addEventListener('mouseleave', startAutoSlide);

    // Initialize
    startAutoSlide();
});
