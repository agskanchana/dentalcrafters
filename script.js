
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
});
