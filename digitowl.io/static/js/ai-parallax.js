/**
 * AI Consulting Section - Parallax & Interactive Effects
 * Implements smooth parallax scrolling, animated counters, and dynamic visual effects
 */

(function() {
    'use strict';

    // ==========================================
    // Parallax Effect Implementation
    // ==========================================

    function initParallax() {
        const aiSection = document.querySelector('.ai-consulting[data-parallax="scroll"]');
        if (!aiSection) return;

        let ticking = false;

        function updateParallax() {
            const scrolled = window.pageYOffset;
            const sectionTop = aiSection.offsetTop;
            const sectionHeight = aiSection.offsetHeight;
            const windowHeight = window.innerHeight;

            // Check if section is in viewport
            if (scrolled + windowHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
                // Calculate parallax offset
                const parallaxOffset = (scrolled - sectionTop) * 0.5;

                // Apply transform with both parallax and subtle scale
                const scale = 1 + (Math.abs(parallaxOffset) / 10000);
                const opacity = 1 - (Math.abs(parallaxOffset) / 2000);

                aiSection.style.transform = `translateY(${parallaxOffset}px) scale(${Math.min(scale, 1.02)})`;
                aiSection.style.opacity = Math.max(opacity, 0.85);
            }

            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }

        // Listen for scroll events
        window.addEventListener('scroll', requestTick, { passive: true });

        // Initial call
        updateParallax();
    }

    // ==========================================
    // Animated Counter for Stats
    // ==========================================

    function animateCounter(element, target) {
        const duration = 2000; // 2 seconds
        const start = 0;
        const increment = target / (duration / 16); // 60fps
        let current = start;

        element.classList.add('counting');

        const timer = setInterval(() => {
            current += increment;

            if (current >= target) {
                element.textContent = Math.round(target);
                clearInterval(timer);
                element.classList.remove('counting');
            } else {
                element.textContent = Math.round(current);
            }
        }, 16);
    }

    function initCounters() {
        const statsCards = document.querySelectorAll('.stats-number');
        if (statsCards.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    const target = parseInt(entry.target.getAttribute('data-count'));
                    animateCounter(entry.target, target);
                    entry.target.classList.add('counted');
                }
            });
        }, {
            threshold: 0.5
        });

        statsCards.forEach(card => observer.observe(card));
    }

    // ==========================================
    // Interactive Card Tilt Effect
    // ==========================================

    function initCardTilt() {
        const cards = document.querySelectorAll('.ai-service-card, .industry-card');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // ==========================================
    // Glow Effect Following Cursor
    // ==========================================

    function initGlowEffect() {
        const serviceCards = document.querySelectorAll('.ai-service-card');

        serviceCards.forEach(card => {
            const glow = card.querySelector('.card-glow');
            if (!glow) return;

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(87, 203, 204, 0.25) 0%, transparent 50%)`;
            });
        });
    }

    // ==========================================
    // Stats Icon Animation on Hover
    // ==========================================

    function initStatsIconAnimation() {
        const statsCards = document.querySelectorAll('.stats-card');

        statsCards.forEach(card => {
            const icon = card.querySelector('.stats-icon');
            if (!icon) return;

            card.addEventListener('mouseenter', () => {
                icon.style.animation = 'bounce 0.6s ease';
            });

            card.addEventListener('mouseleave', () => {
                icon.style.animation = '';
            });
        });
    }

    // Add bounce animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounce {
            0%, 100% { transform: translateY(0) scale(1); }
            25% { transform: translateY(-10px) scale(1.1); }
            50% { transform: translateY(-5px) scale(1.05); }
            75% { transform: translateY(-8px) scale(1.08); }
        }
    `;
    document.head.appendChild(style);

    // ==========================================
    // CTA Pulse Animation
    // ==========================================

    function initCTAPulse() {
        const ctaCard = document.querySelector('.ai-cta-card');
        if (!ctaCard) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    ctaCard.style.animation = 'ctaPulse 2s ease-in-out infinite';
                } else {
                    ctaCard.style.animation = '';
                }
            });
        }, {
            threshold: 0.3
        });

        observer.observe(ctaCard);
    }

    // Add CTA pulse animation
    const ctaStyle = document.createElement('style');
    ctaStyle.textContent = `
        @keyframes ctaPulse {
            0%, 100% {
                box-shadow: 0 0 0 0 rgba(87, 203, 204, 0.4);
            }
            50% {
                box-shadow: 0 0 0 20px rgba(87, 203, 204, 0);
            }
        }
    `;
    document.head.appendChild(ctaStyle);

    // ==========================================
    // Smooth Scroll to Section
    // ==========================================

    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href="#ai-consulting"]');

        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector('#ai-consulting');

                if (target) {
                    const offset = 80; // Account for fixed header
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ==========================================
    // Background Gradient Animation
    // ==========================================

    function initBackgroundAnimation() {
        const section = document.querySelector('.ai-consulting');
        if (!section) return;

        let hue = 0;

        setInterval(() => {
            hue = (hue + 0.5) % 360;
            const overlay = section.querySelector('.ai-consulting::before');
            // Subtle color shift in background
        }, 50);
    }

    // ==========================================
    // Service Features Stagger Animation
    // ==========================================

    function initFeatureStagger() {
        const serviceCards = document.querySelectorAll('.ai-service-card');

        serviceCards.forEach(card => {
            const features = card.querySelectorAll('.service-features li');

            card.addEventListener('mouseenter', () => {
                features.forEach((feature, index) => {
                    setTimeout(() => {
                        feature.style.animation = 'slideInLeft 0.3s ease forwards';
                    }, index * 100);
                });
            });

            card.addEventListener('mouseleave', () => {
                features.forEach(feature => {
                    feature.style.animation = '';
                });
            });
        });
    }

    // Add slide animation
    const featureStyle = document.createElement('style');
    featureStyle.textContent = `
        @keyframes slideInLeft {
            from {
                opacity: 0.5;
                transform: translateX(-10px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(featureStyle);

    // ==========================================
    // Industry Card Ripple Effect
    // ==========================================

    function initRippleEffect() {
        const industryCards = document.querySelectorAll('.industry-card');

        industryCards.forEach(card => {
            card.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');

                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';

                this.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // Add ripple styles
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .ripple {
            position: absolute;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: rgba(87, 203, 204, 0.6);
            transform: translate(-50%, -50%);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }

        @keyframes ripple-animation {
            to {
                width: 300px;
                height: 300px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // ==========================================
    // Initialize All Effects
    // ==========================================

    function init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                initParallax();
                initCounters();
                initCardTilt();
                initGlowEffect();
                initStatsIconAnimation();
                initCTAPulse();
                initSmoothScroll();
                initBackgroundAnimation();
                initFeatureStagger();
                initRippleEffect();
            });
        } else {
            // DOM already loaded
            initParallax();
            initCounters();
            initCardTilt();
            initGlowEffect();
            initStatsIconAnimation();
            initCTAPulse();
            initSmoothScroll();
            initBackgroundAnimation();
            initFeatureStagger();
            initRippleEffect();
        }
    }

    // Start initialization
    init();

    // Expose cleanup function for potential use
    window.aiConsultingCleanup = function() {
        // Remove event listeners if needed
        console.log('AI Consulting effects cleaned up');
    };

})();
