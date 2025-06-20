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
        });

        // Hide hidden text elements (for accessibility)
        document.addEventListener('DOMContentLoaded', function() {
            const hiddenTexts = document.querySelectorAll('.hid-tex');
            hiddenTexts.forEach(text => {
                text.style.display = 'block';
                text.style.overflow = 'hidden';
                text.style.width = '0';
                text.style.height = '0';
            });
        });