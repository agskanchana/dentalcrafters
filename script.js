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

document.addEventListener('DOMContentLoaded', function() {

    // FAQ Accordion Functionality
    function initFAQAccordion() {
        const accordionTriggers = document.querySelectorAll('.accordion-trigger');

        accordionTriggers.forEach(trigger => {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();

                const targetId = this.getAttribute('data-target');
                const targetContent = document.querySelector(targetId);
                const isCurrentlyActive = this.classList.contains('active');

                // Close all other accordions
                accordionTriggers.forEach(otherTrigger => {
                    if (otherTrigger !== this) {
                        const otherTargetId = otherTrigger.getAttribute('data-target');
                        const otherTargetContent = document.querySelector(otherTargetId);

                        otherTrigger.classList.remove('active');
                        otherTrigger.setAttribute('aria-expanded', 'false');

                        if (otherTargetContent) {
                            otherTargetContent.classList.remove('active');
                            otherTargetContent.style.maxHeight = '0px';
                        }
                    }
                });

                // Toggle current accordion
                if (isCurrentlyActive) {
                    // Close current
                    this.classList.remove('active');
                    this.setAttribute('aria-expanded', 'false');

                    if (targetContent) {
                        targetContent.classList.remove('active');
                        targetContent.style.maxHeight = '0px';
                    }
                } else {
                    // Open current
                    this.classList.add('active');
                    this.setAttribute('aria-expanded', 'true');

                    if (targetContent) {
                        targetContent.classList.add('active');
                        targetContent.style.maxHeight = targetContent.scrollHeight + 'px';

                        // Smooth scroll to accordion if needed
                        setTimeout(() => {
                            const rect = this.getBoundingClientRect();
                            const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

                            if (!isVisible) {
                                this.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'nearest'
                                });
                            }
                        }, 300);
                    }
                }

                // Update icon rotation with animation
                const iconBox = this.querySelector('.icon-box');
                if (iconBox) {
                    if (this.classList.contains('active')) {
                        iconBox.style.transform = 'rotate(45deg)';
                    } else {
                        iconBox.style.transform = 'rotate(0deg)';
                    }
                }
            });

            // Keyboard accessibility
            trigger.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }

    // Intersection Observer for FAQ animations
    function initFAQAnimations() {
        const faqPanels = document.querySelectorAll('.accordion_design_one .panel');

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        faqPanels.forEach(panel => {
            observer.observe(panel);
        });
    }

    // Auto-resize accordion content on window resize
    function handleAccordionResize() {
        const activeContents = document.querySelectorAll('.accordion-content.active');

        activeContents.forEach(content => {
            content.style.maxHeight = content.scrollHeight + 'px';
        });
    }

    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        const anchors = document.querySelectorAll('a[href^="#"]');

        anchors.forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    e.preventDefault();

                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Enhanced parallax effect for FAQ image
    function initFAQParallax() {
        const faqImage = document.querySelector('.faq-image-section img');

        if (!faqImage) return;

        let ticking = false;

        function updateParallax() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;

            if (faqImage) {
                faqImage.style.transform = `translateY(${rate}px) scale(1.1)`;
            }

            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestTick);
    }

    // FAQ search functionality (bonus feature)
    function initFAQSearch() {
        const searchInput = document.querySelector('#faq-search');

        if (!searchInput) return;

        const faqPanels = document.querySelectorAll('.accordion_design_one .panel');

        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();

            faqPanels.forEach(panel => {
                const questionText = panel.querySelector('.title-text').textContent.toLowerCase();
                const answerText = panel.querySelector('.accordion-body').textContent.toLowerCase();

                if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
                    panel.style.display = 'block';

                    // Highlight matching text
                    if (searchTerm.length > 2) {
                        highlightText(panel, searchTerm);
                    }
                } else {
                    panel.style.display = 'none';
                }
            });
        });
    }

    // Text highlighting function
    function highlightText(element, searchTerm) {
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        const textNodes = [];
        let node;

        while (node = walker.nextNode()) {
            textNodes.push(node);
        }

        textNodes.forEach(textNode => {
            const text = textNode.textContent;
            const regex = new RegExp(`(${searchTerm})`, 'gi');

            if (regex.test(text)) {
                const highlightedText = text.replace(regex, '<mark>$1</mark>');
                const span = document.createElement('span');
                span.innerHTML = highlightedText;
                textNode.parentNode.replaceChild(span, textNode);
            }
        });
    }

    // Initialize all FAQ functionality
    initFAQAccordion();
    initFAQAnimations();
    initSmoothScrolling();
    initFAQParallax();
    initFAQSearch();

    // Handle window resize
    window.addEventListener('resize', debounce(handleAccordionResize, 250));

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

    // FAQ Analytics (optional)
    function trackFAQInteraction(question, action) {
        // Add your analytics tracking here
        console.log(`FAQ ${action}: ${question}`);

        // Example: Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', 'faq_interaction', {
                'event_category': 'FAQ',
                'event_label': question,
                'custom_parameter': action
            });
        }
    }

    // Add click tracking to FAQ items
    accordionTriggers.forEach(trigger => {
        const originalClickHandler = trigger.onclick;

        trigger.addEventListener('click', function() {
            const questionText = this.querySelector('.title-text').textContent;
            const action = this.classList.contains('active') ? 'close' : 'open';

            trackFAQInteraction(questionText, action);
        });
    });
});

// Additional utility functions for FAQ section
class FAQManager {
    constructor() {
        this.activePanel = null;
        this.panels = document.querySelectorAll('.accordion_design_one .panel');
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupKeyboardNavigation();
    }

    bindEvents() {
        this.panels.forEach((panel, index) => {
            const trigger = panel.querySelector('.accordion-trigger');

            trigger.addEventListener('click', (e) => {
                this.togglePanel(panel, index);
            });
        });
    }

    togglePanel(panel, index) {
        const trigger = panel.querySelector('.accordion-trigger');
        const content = panel.querySelector('.accordion-content');
        const isActive = trigger.classList.contains('active');

        // Close all panels
        this.closeAllPanels();

        // Open clicked panel if it wasn't active
        if (!isActive) {
            this.openPanel(panel);
            this.activePanel = index;
        } else {
            this.activePanel = null;
        }
    }

    openPanel(panel) {
        const trigger = panel.querySelector('.accordion-trigger');
        const content = panel.querySelector('.accordion-content');

        trigger.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
        content.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
    }

    closePanel(panel) {
        const trigger = panel.querySelector('.accordion-trigger');
        const content = panel.querySelector('.accordion-content');

        trigger.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
        content.classList.remove('active');
        content.style.maxHeight = '0px';
    }

    closeAllPanels() {
        this.panels.forEach(panel => {
            this.closePanel(panel);
        });
    }

    setupKeyboardNavigation() {
        this.panels.forEach((panel, index) => {
            const trigger = panel.querySelector('.accordion-trigger');

            trigger.addEventListener('keydown', (e) => {
                switch(e.key) {
                    case 'ArrowDown':
                        e.preventDefault();
                        this.focusNext(index);
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        this.focusPrevious(index);
                        break;
                    case 'Home':
                        e.preventDefault();
                        this.focusFirst();
                        break;
                    case 'End':
                        e.preventDefault();
                        this.focusLast();
                        break;
                }
            });
        });
    }

    focusNext(currentIndex) {
        const nextIndex = (currentIndex + 1) % this.panels.length;
        this.panels[nextIndex].querySelector('.accordion-trigger').focus();
    }

    focusPrevious(currentIndex) {
        const prevIndex = currentIndex === 0 ? this.panels.length - 1 : currentIndex - 1;
        this.panels[prevIndex].querySelector('.accordion-trigger').focus();
    }

    focusFirst() {
        this.panels[0].querySelector('.accordion-trigger').focus();
    }

    focusLast() {
        this.panels[this.panels.length - 1].querySelector('.accordion-trigger').focus();
    }
}

// Initialize FAQ Manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FAQManager();
});

// Override any existing parallax functions
(function() {
    'use strict';

    // Disable any parallax on FAQ images
    const disableParallax = () => {
        const faqImages = document.querySelectorAll('.faq-image-section img, .section.faq-sec img');

        faqImages.forEach(img => {
            // Remove any transform styles
            img.style.removeProperty('transform');
            img.style.transform = 'none';
            img.style.willChange = 'auto';

            // Remove any CSS transform classes
            if (img.style.transform && img.style.transform !== 'none') {
                img.style.transform = 'none';
            }
        });
    };

    // Run immediately
    disableParallax();

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', disableParallax);
    }

    // Run on window load
    window.addEventListener('load', disableParallax);

    // Run on scroll (to override any parallax effects)
    let scrollTicking = false;
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            requestAnimationFrame(() => {
                disableParallax();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }, { passive: true });

    // Override any existing parallax initialization
    const originalRAF = window.requestAnimationFrame;
    window.requestAnimationFrame = function(callback) {
        return originalRAF.call(this, function() {
            const result = callback.apply(this, arguments);
            disableParallax(); // Reset after any animation frame
            return result;
        });
    };

})();

// Add this to your existing script.js file

// Share toggle functionality
function shareToggle() {
    const shareToggle = document.getElementById("share-toggle");
    if (shareToggle) {
        shareToggle.classList.toggle("active");
    }
}

// Close share menu when clicking outside
document.addEventListener('click', function(event) {
    const shareButton = document.querySelector('.share-button');
    const shareToggle = document.getElementById("share-toggle");

    if (shareToggle && shareButton && !shareButton.contains(event.target)) {
        shareToggle.classList.remove("active");
    }
});

// Add smooth scrolling for footer navigation
document.addEventListener('DOMContentLoaded', function() {
    // Animate footer elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease forwards';
            }
        });
    }, observerOptions);

    // Observe footer columns
    const footerColumns = document.querySelectorAll('.footer-column');
    footerColumns.forEach((column, index) => {
        column.style.opacity = '0';
        column.style.transform = 'translateY(30px)';
        column.style.animationDelay = `${index * 0.2}s`;
        observer.observe(column);
    });
});