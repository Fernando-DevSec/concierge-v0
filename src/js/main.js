/**
 * @file main.js
 * @description Core interactions for Concierge VIP Costa Rica.
 * Includes: Preloader, Dark Mode, Responsive Navigation, Scroll Interactions, 
 * Stable Hero Slider (No-overlap), Scalable Parallax, and Reveal Animations.
 * @author CR Concierge Team
 * @version 1.9.0
 */

/**
 * Single entry point for UI initialization.
 */
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initDarkMode();
    initMobileNavigation();
    initBackToTop();
    initHeroSlider();      // Slider corregido (Transición suave 3-1 y Responsive)
    initParallaxEffects();
    initScrollAnimations();
});

// -------------------------------------------------------------------------
// 1. PRELOADER SYSTEM
// -------------------------------------------------------------------------

const initPreloader = () => {
    const preloader = document.getElementById('preloader');
    const progressBar = document.getElementById('preloader-bar');
    if (!preloader) return;

    setTimeout(() => {
        if (progressBar) progressBar.style.width = '100%';
    }, 100);

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('opacity-0', 'pointer-events-none');
            setTimeout(() => {
                if (preloader.parentNode) preloader.remove();
            }, 700);
        }, 800);
    });
};

// -------------------------------------------------------------------------
// 2. DARK MODE MANAGEMENT
// -------------------------------------------------------------------------

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
// 4. HERO SLIDER (GLIDE.JS)
// -------------------------------------------------------------------------

/**
 * Initializes the Hero Slider.
 * Fixes: Transition glitch from slide 3 to 1 by using 'carousel' type, gap 0,
 * and a refined cubic-bezier for high-speed frame recovery.
 */
const initHeroSlider = () => {
    const heroSlider = document.querySelector('.hero-slider');
    if (!heroSlider) return;

    const glide = new Glide(heroSlider, {
        type: 'carousel',
        startAt: 0,
        perView: 1,
        autoplay: 6000,
        hoverpause: false,
        gap: 0, 
        dragThreshold: 80,
        animationDuration: 1000,
        // Easing premium que suaviza el retorno del loop infinito
        animationTimingFunc: 'cubic-bezier(0.165, 0.84, 0.44, 1)' 
    });

    // Asegura que los clones del carrusel se rendericen correctamente
    glide.mount();
};

// -------------------------------------------------------------------------
// 5. SCROLL & VISUAL EFFECTS
// -------------------------------------------------------------------------

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

    window.addEventListener('scroll', handleScroll, { passive: true });
    backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
};

/**
 * Hardware-accelerated parallax effect for tagged elements.
 */
const initParallaxEffects = () => {
    const parallaxTargets = document.querySelectorAll('#parallax-home, #parallax-nature, #parallax-wedding, #parallax-car, .parallax-effector');
    
    if (parallaxTargets.length === 0) return;

    let ticking = false;

    const updateParallax = () => {
        const windowHeight = window.innerHeight;

        parallaxTargets.forEach(target => {
            const rect = target.parentElement.getBoundingClientRect();

            if (rect.top < windowHeight && rect.bottom > 0) {
                const speed = 0.15;
                const shift = (rect.top - windowHeight) * speed;
                // Force GPU rendering via translate3d
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
    }, { passive: true });
};

/**
 * Intersection Observer for scroll-triggered reveal animations.
 */
const initScrollAnimations = () => {
    const observerOptions = { 
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px' 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('opacity-0', 'translate-y-10');
                entry.target.classList.add('opacity-100', 'translate-y-0');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
};