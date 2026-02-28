/**
 * @file main.js
 * @description Core interactions for CR Concierge website, including Dark Mode 
 * management and responsive navigation logic.
 * @author CR Concierge Team
 * @version 1.1.0
 */

/**
 * Initializes all UI components when the DOM is fully loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initMobileNavigation();
});

// -------------------------------------------------------------------------
// DARK MODE MANAGEMENT
// -------------------------------------------------------------------------

/**
 * Handles the dark/light theme switching logic and persistence.
 * @function initDarkMode
 */
const initDarkMode = () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');

    /**
     * Toggles the 'dark' class on the document root and updates localStorage.
     * Includes a smooth transition effect applied to the body.
     */
    const toggleDarkMode = () => {
        // Apply smooth transition effect during theme switch
        document.body.classList.add('transition-colors', 'duration-500');
        
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('color-theme', isDark ? 'dark' : 'light');
    };

    // Attach event listeners if elements exist in the DOM
    [themeToggleBtn, themeToggleMobile].forEach(btn => {
        if (btn) btn.addEventListener('click', toggleDarkMode);
    });
};

// -------------------------------------------------------------------------
// MOBILE NAVIGATION
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
     * Toggles the main mobile menu visibility with a scale feedback animation.
     */
    const toggleMobileMenu = () => {
        mobileMenu.classList.toggle('hidden');
        
        // Haptic-like visual feedback
        mobileMenuButton.classList.add('scale-90');
        setTimeout(() => mobileMenuButton.classList.remove('scale-90'), 100);
    };

    /**
     * Toggles the services sub-menu and rotates the associated arrow icon.
     */
    const toggleServicesDropdown = () => {
        if (mobileServicesMenu) {
            mobileServicesMenu.classList.toggle('hidden');
        }
        if (mobileServicesArrow) {
            mobileServicesArrow.classList.toggle('rotate-180');
        }
    };

    // Event Listeners
    mobileMenuButton.addEventListener('click', toggleMobileMenu);

    if (mobileServicesButton) {
        mobileServicesButton.addEventListener('click', toggleServicesDropdown);
    }

    /**
     * Closes the mobile menu automatically when a link is clicked.
     * Enhances User Experience (UX) for single-page or internal navigation.
     */
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
};