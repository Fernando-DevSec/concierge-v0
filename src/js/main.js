/**
 * @file main.js
 * @description Core interactions for CR Concierge website.
 * Includes: Preloader, Dark Mode, Responsive Navigation, Scroll Interactions, Parallax, and Reveal Animations.
 * @author CR Concierge Team
 * @version 1.5.0
 */

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initDarkMode();
    initMobileNavigation();
    initBackToTop();
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
// 4. SCROLL & VISUAL EFFECTS
// -------------------------------------------------------------------------

/**
 * Manages the "Back to Top" button visibility.
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
 * Hardware-accelerated parallax effect for home images.
 */
const initParallaxEffects = () => {
    const parallaxImage = document.getElementById('parallax-home');
    if (!parallaxImage) return;

    let ticking = false;

    const updateParallax = () => {
        const rect = parallaxImage.parentElement.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight && rect.bottom > 0) {
            const speed = 0.15;
            const shift = (rect.top - windowHeight) * speed;
            parallaxImage.style.transform = `translate3d(0, ${shift}px, 0) scale(1.1)`;
        }
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
};

/**
 * Intersection Observer for reveal animations on scroll.
 */
const initScrollAnimations = () => {
    const observerOptions = { threshold: 0.15 };

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