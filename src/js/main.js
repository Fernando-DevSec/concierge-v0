/**
 * @file main.js
 * @description Core interactions for CR Concierge website.
 * Includes: Preloader, Dark Mode, Responsive Navigation, Scroll Interactions, 
 * Scalable Parallax, and Reveal Animations.
 * @author CR Concierge Team
 * @version 1.6.0
 */

/**
 * Single entry point for UI initialization.
 * Starts all components after the DOM is fully interactive.
 */
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initDarkMode();
    initMobileNavigation();
    initBackToTop();
    initParallaxEffects(); // Refactorizado para múltiples elementos
    initScrollAnimations();
});

// -------------------------------------------------------------------------
// 1. PRELOADER SYSTEM
// -------------------------------------------------------------------------

/**
 * Manages the initial loading screen, progress bar, and smooth exit.
 * @function initPreloader
 */
const initPreloader = () => {
    const preloader = document.getElementById('preloader');
    const progressBar = document.getElementById('preloader-bar');
    if (!preloader) return;

    // Start progress bar animation
    setTimeout(() => {
        if (progressBar) progressBar.style.width = '100%';
    }, 100);

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('opacity-0', 'pointer-events-none');
            setTimeout(() => {
                if (preloader.parentNode) preloader.remove();
            }, 700);
        }, 800); // Luxury delay
    });
};

// -------------------------------------------------------------------------
// 2. DARK MODE MANAGEMENT
// -------------------------------------------------------------------------

/**
 * Handles the dark/light theme switching logic and persistence.
 * @function initDarkMode
 */
const initDarkMode = () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    if (!themeToggleBtn && !themeToggleMobile) return;

    const toggleDarkMode = () => {
        document.body.classList.add('transition-colors', 'duration-500');
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('color-theme', isDark ? 'dark' : 'light');
    };

    [themeToggleBtn, themeToggleMobile].forEach(btn => {
        if (btn) btn.addEventListener('click', toggleDarkMode);
    });
};

// -------------------------------------------------------------------------
// 3. MOBILE NAVIGATION
// -------------------------------------------------------------------------

/**
 * Manages mobile menu visibility and sub-menu interactions.
 * @function initMobileNavigation
 */
const initMobileNavigation = () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileServicesButton = document.getElementById('mobile-services-button');
    const mobileServicesMenu = document.getElementById('mobile-services-menu');
    const mobileServicesArrow = document.getElementById('mobile-services-arrow');

    if (!mobileMenuButton || !mobileMenu) return;

    const toggleMobileMenu = () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenuButton.classList.add('scale-90');
        setTimeout(() => mobileMenuButton.classList.remove('scale-90'), 100);
    };

    const toggleServicesDropdown = () => {
        if (mobileServicesMenu) mobileServicesMenu.classList.toggle('hidden');
        if (mobileServicesArrow) mobileServicesArrow.classList.toggle('rotate-180');
    };

    mobileMenuButton.addEventListener('click', toggleMobileMenu);
    if (mobileServicesButton) mobileServicesButton.addEventListener('click', toggleServicesDropdown);

    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
};

// -------------------------------------------------------------------------
// 4. SCROLL & VISUAL EFFECTS
// -------------------------------------------------------------------------

/**
 * Manages the "Back to Top" button visibility and execution.
 * @function initBackToTop
 */
const initBackToTop = () => {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;

    const handleScroll = () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.replace('opacity-0', 'opacity-100');
            backToTopBtn.classList.replace('invisible', 'visible');
        } else {
            backToTopBtn.classList.replace('opacity-100', 'opacity-0');
            backToTopBtn.classList.replace('visible', 'invisible');
        }
    };

    window.addEventListener('scroll', handleScroll);
    backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
};

/**
 * Hardware-accelerated parallax effect for multiple elements.
 * Uses a class-based selector for scalability and RequestAnimationFrame for performance.
 * @function initParallaxEffects
 */
const initParallaxEffects = () => {
    // Targets both specific IDs and any element with the parallax class
    const parallaxTargets = document.querySelectorAll('#parallax-home, #parallax-nature, .parallax-effector');
    
    if (parallaxTargets.length === 0) return;

    let ticking = false;

    const updateParallax = () => {
        const windowHeight = window.innerHeight;

        parallaxTargets.forEach(target => {
            const rect = target.parentElement.getBoundingClientRect();

            // Only calculate if the element is visible in viewport
            if (rect.top < windowHeight && rect.bottom > 0) {
                const speed = 0.15;
                const shift = (rect.top - windowHeight) * speed;
                
                // transform3d forces GPU layer composition
                target.style.transform = `translate3d(0, ${shift}px, 0) scale(1.1)`;
            }
        });
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true }); // Improved scroll performance
};

/**
 * Intersection Observer for reveal animations on scroll.
 * Applies to elements with 'reveal-on-scroll' class.
 * @function initScrollAnimations
 */
const initScrollAnimations = () => {
    const observerOptions = { 
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px' // Slight offset for better UX
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('opacity-0', 'translate-y-10');
                entry.target.classList.add('opacity-100', 'translate-y-0');
                
                // Memory management: stop observing once animation is done
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
};