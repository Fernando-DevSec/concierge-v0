/**
 * @file main.js
 * @description Core interactions for CR Concierge website.
 * Includes: Preloader, Dark Mode, Responsive Navigation, and Scroll Interactions.
 * @author CR Concierge Team
 * @version 1.3.0
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

    // Start progress bar animation shortly after DOM is ready
    setTimeout(() => {
        if (progressBar) progressBar.style.width = '100%';
    }, 100);

    /**
     * Fades out the preloader once the entire window (images/scripts) has loaded.
     */
    window.addEventListener('load', () => {
        setTimeout(() => {
            // Transition to transparent
            preloader.classList.add('opacity-0', 'pointer-events-none');
            
            // Clean up DOM after transition to save memory/resources
            setTimeout(() => {
                if (preloader.parentNode) preloader.remove();
            }, 700);
        }, 800); // Small delay to appreciate the luxury branding
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

    /**
     * Toggles the 'dark' class on the document root and updates localStorage.
     */
    const toggleDarkMode = () => {
        // Add a temporary transition to the body for a smooth color fade
        document.body.classList.add('transition-colors', 'duration-500');
        
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('color-theme', isDark ? 'dark' : 'light');
    };

    // Attach listeners to both desktop and mobile theme buttons
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

    /**
     * Toggles main mobile menu visibility with haptic-like scale feedback.
     */
    const toggleMobileMenu = () => {
        mobileMenu.classList.toggle('hidden');
        
        // Visual feedback on click
        mobileMenuButton.classList.add('scale-90');
        setTimeout(() => mobileMenuButton.classList.remove('scale-90'), 100);
    };

    /**
     * Toggles the services dropdown in the mobile view.
     */
    const toggleServicesDropdown = () => {
        if (mobileServicesMenu) mobileServicesMenu.classList.toggle('hidden');
        if (mobileServicesArrow) mobileServicesArrow.classList.toggle('rotate-180');
    };

    // Event listeners
    mobileMenuButton.addEventListener('click', toggleMobileMenu);

    if (mobileServicesButton) {
        mobileServicesButton.addEventListener('click', toggleServicesDropdown);
    }

    /**
     * UX Improvement: Auto-close the mobile menu when a link is clicked.
     */
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
};

// -------------------------------------------------------------------------
// 4. SCROLL INTERACTIONS
// -------------------------------------------------------------------------

/**
 * Manages the "Back to Top" button visibility and smooth scroll execution.
 * @function initBackToTop
 */
const initBackToTop = () => {
    const backToTopBtn = document.getElementById('back-to-top');

    if (!backToTopBtn) return;

    /**
     * Shows/hides the button based on the scroll threshold (400px).
     */
    const handleScroll = () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.remove('opacity-0', 'invisible');
            backToTopBtn.classList.add('opacity-100', 'visible');
        } else {
            backToTopBtn.classList.add('opacity-0', 'invisible');
            backToTopBtn.classList.remove('opacity-100', 'visible');
        }
    };

    /**
     * Executes the smooth scroll to the top of the page.
     */
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', handleScroll);
    backToTopBtn.addEventListener('click', scrollToTop);
};