// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
}

// Read More Functionality
document.addEventListener('DOMContentLoaded', function() {
    const readMoreBtn = document.querySelector('.read-more-btn');
    const expandableContent = document.querySelector('.expandable-content');

    if (readMoreBtn && expandableContent) {
        readMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            expandableContent.classList.toggle('active');

            if (expandableContent.classList.contains('active')) {
                this.textContent = 'Read less about us';
            } else {
                this.textContent = 'Read more about us';
            }
        });
    }

    // Trigger counter animation when section comes into view
    const welcomeSection = document.querySelector('.welcome-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    });

    if (welcomeSection) {
        observer.observe(welcomeSection);
    }

    // Services Animation Observer
    const serviceCards = document.querySelectorAll('.ser-wrapper');
    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, {
        threshold: 0.1
    });

    serviceCards.forEach(card => {
        serviceObserver.observe(card);
    });

    // Hide hidden text elements (for accessibility)
    const hiddenTexts = document.querySelectorAll('.hid-tex');
    hiddenTexts.forEach(text => {
        text.style.display = 'block';
        text.style.overflow = 'hidden';
        text.style.width = '0';
        text.style.height = '0';
    });
});

// Insurance Carousel Functionality (No Auto-play)
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.section.insurance-sec .logo-carousel');
    const items = document.querySelectorAll('.section.insurance-sec .logo-slider .item');
    const prevBtn = document.querySelector('.section.insurance-sec .carousel-prev');
    const nextBtn = document.querySelector('.section.insurance-sec .carousel-next');
    const dots = document.querySelectorAll('.section.insurance-sec .carousel-dots .dot');

    if (!carousel || !items.length) return;

    let currentIndex = 0;
    const itemWidth = items[0].offsetWidth + 30; // item width + gap
    const visibleItems = Math.floor(carousel.offsetWidth / itemWidth);
    const maxIndex = Math.max(0, items.length - visibleItems);

    function updateCarousel() {
        const translateX = -(currentIndex * itemWidth);
        carousel.style.transform = `translateX(${translateX}px)`;

        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === Math.floor(currentIndex / visibleItems));
        });
    }

    function nextSlide() {
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = maxIndex;
        }
        updateCarousel();
    }

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index * visibleItems;
            if (currentIndex > maxIndex) currentIndex = maxIndex;
            updateCarousel();
        });
    });

    // Auto-play REMOVED - carousel only moves on user interaction

    // Handle window resize
    window.addEventListener('resize', () => {
        const newItemWidth = items[0].offsetWidth + 30;
        const newVisibleItems = Math.floor(carousel.offsetWidth / newItemWidth);
        if (newVisibleItems !== visibleItems) {
            currentIndex = 0;
            updateCarousel();
        }
    });

    // Initial setup
    updateCarousel();
});

// Associations Carousel Functionality (No Auto-play)
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.section.association-sec .associations-carousel');
    const items = document.querySelectorAll('.section.association-sec .association-item');
    const prevBtn = document.querySelector('.section.association-sec .associations-prev');
    const nextBtn = document.querySelector('.section.association-sec .associations-next');
    const dots = document.querySelectorAll('.section.association-sec .associations-dots .association-dot');

    if (!carousel || !items.length) return;

    let currentIndex = 0;
    const itemWidth = items[0].offsetWidth + 40; // item width + gap
    const visibleItems = Math.floor(carousel.offsetWidth / itemWidth);
    const maxIndex = Math.max(0, items.length - visibleItems);

    function updateCarousel() {
        const translateX = -(currentIndex * itemWidth);
        carousel.style.transform = `translateX(${translateX}px)`;

        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === Math.floor(currentIndex / Math.max(1, visibleItems)));
        });
    }

    function nextSlide() {
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = maxIndex;
        }
        updateCarousel();
    }

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index * Math.max(1, visibleItems);
            if (currentIndex > maxIndex) currentIndex = maxIndex;
            updateCarousel();
        });
    });

    // Auto-play REMOVED - carousel only moves on user interaction

    // Handle window resize
    window.addEventListener('resize', () => {
        const newItemWidth = items[0].offsetWidth + 40;
        const newVisibleItems = Math.floor(carousel.offsetWidth / newItemWidth);
        if (newVisibleItems !== visibleItems) {
            currentIndex = 0;
            updateCarousel();
        }
    });

    // Initial setup
    updateCarousel();
});