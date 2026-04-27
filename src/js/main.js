/**
 * @file main.js
 * @description Core interactions and UI logic for Concierge VIP Costa Rica.
 * Handles the high-end hero slider, responsive navigation, parallax effects, 
 * language switching, and scroll-triggered animations.
 * @author Fernando (DevSec)
 * @version 3.8.0
 */

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initDarkMode();
    initMobileNavigation(); 
    initLanguageSelector(); 
    initBackToTop();
    initCustomHeroSlider(); 
    initParallaxEffects();
    initScrollAnimations();
});

// -------------------------------------------------------------------------
// 1. NAVIGATION & LANGUAGE LOCALIZATION
// -------------------------------------------------------------------------

/**
 * Manages mobile menu visibility, dropdown behaviors, and icon rotations.
 * Ensures the menu closes upon link selection (excluding dropdown triggers).
 */
const initMobileNavigation = () => {
    const btn = document.getElementById('mobile-menu-button');
    const menu = document.getElementById('mobile-menu');
    const srvBtn = document.getElementById('mobile-services-button');
    const srvMenu = document.getElementById('mobile-services-menu');
    const arrow = document.getElementById('mobile-services-arrow');

    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
        btn.classList.toggle('rotate-90');
    });

    if (srvBtn) {
        srvBtn.addEventListener('click', (e) => {
            if (window.innerWidth < 1024) {
                e.preventDefault();
                e.stopPropagation();
                srvMenu?.classList.toggle('hidden');
                arrow?.classList.toggle('rotate-180');
            }
        });
    }

    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (link !== srvBtn) {
                menu.classList.add('hidden');
                btn.classList.remove('rotate-90');
            }
        });
    });
};

/**
 * Handles dynamic language switching based on URL path segments.
 * Expected URL pattern: domain.com/{lang}/path/
 * @requires data-lang attribute on .language-link elements
 */
const initLanguageSelector = () => {
    const langLinks = document.querySelectorAll('.language-link');
    
    langLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetLang = link.getAttribute('data-lang');
            const currentPath = window.location.pathname;
            const pathSegments = currentPath.split('/').filter(segment => segment.length > 0);

            if (pathSegments.length > 0) {
                pathSegments[0] = targetLang;
                window.location.href = '/' + pathSegments.join('/') + '/';
            } else {
                window.location.href = '/' + targetLang + '/';
            }
        });
    });
};

// -------------------------------------------------------------------------
// 2. HERO SLIDER ENGINE
// -------------------------------------------------------------------------

/**
 * Orchestrates the luxury fade-in slider.
 * Manages active states, thumbnail rotation (desktop), and DOM reflow 
 * triggers to restart CSS animations on slide change.
 * @param {number} index - Target slide index
 * @param {string} direction - Movement direction ('next'|'prev') for thumbnail shifting
 */
const initCustomHeroSlider = () => {
    const items = document.querySelectorAll('.slider-item');
    const thumbContainer = document.getElementById('thumbnail-container');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    
    if (items.length === 0 || !nextBtn || !prevBtn) return;

    let currentIndex = 0;

    const updateSlider = (index, direction = 'next') => {
        // Toggle active classes for CSS visibility transitions
        items.forEach((item, i) => {
            item.classList.remove('active');
            if (i === index) item.classList.add('active');
        });

        // Handle thumbnail reordering for infinite-loop visual effect
        const thumbs = document.querySelectorAll('.thumb-item');
        if (thumbs.length > 0 && thumbContainer && window.getComputedStyle(thumbContainer).display !== 'none') {
            if (direction === 'next') {
                thumbContainer.appendChild(thumbs[0]);
            } else {
                thumbContainer.prepend(thumbs[thumbs.length - 1]);
            }
        }

        // Force DOM reflow to restart CSS keyframe animations
        const activeSlide = items[index];
        const elementsToReset = activeSlide.querySelectorAll('.animate-title-in, .animate-text-in, img');
        elementsToReset.forEach(el => {
            el.style.animation = 'none';
            el.offsetHeight; 
            el.style.animation = null;
        });
    };

    // Manual navigation event listeners
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % items.length;
        updateSlider(currentIndex, 'next');
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateSlider(currentIndex, 'prev');
    });

    // Automatic transition interval (10000ms)
    let sliderInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        updateSlider(currentIndex, 'next');
    }, 10000);

    // Performance optimization: Pause execution when tab is inactive
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) clearInterval(sliderInterval);
        else sliderInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % items.length;
            updateSlider(currentIndex, 'next');
        }, 10000);
    });

    // Set initial state
    items[0].classList.add('active');
};

// -------------------------------------------------------------------------
// 3. MOTION & PARALLAX SYSTEMS
// -------------------------------------------------------------------------

/**
 * High-performance parallax system using requestAnimationFrame.
 * Targets specific IDs and effector classes to create depth during scroll.
 * Optimized with 'passive: true' for scrolling performance.
 */
const initParallaxEffects = () => {
    const parallaxTargets = document.querySelectorAll('#parallax-home, #parallax-nature, #parallax-wedding, #parallax-car, .parallax-effector');
    if (parallaxTargets.length === 0) return;

    let ticking = false;

    const updateParallax = () => {
        const windowHeight = window.innerHeight;

        parallaxTargets.forEach(target => {
            const parent = target.parentElement;
            if (!parent) return;
            const rect = parent.getBoundingClientRect();

            if (rect.top < windowHeight && rect.bottom > 0) {
                const speed = 0.15;
                const shift = (rect.top - windowHeight) * speed;
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

// -------------------------------------------------------------------------
// 4. UI UTILITIES (Preloader, Dark Mode, Reveal)
// -------------------------------------------------------------------------

/**
 * Handles site entry animation. Waits for font readiness and window load.
 * Includes a safety timeout to prevent infinite loading screens.
 */
const initPreloader = async () => {
    const p = document.getElementById('preloader');
    const bar = document.getElementById('preloader-bar');
    if (!p) return;

    try {
        await document.fonts.ready;
        document.documentElement.classList.add('fonts-loaded');
    } catch (err) {
        console.warn("Font loading notification failed:", err);
    }

    if (bar) bar.style.width = '80%';

    const hidePreloader = () => {
        if (bar) bar.style.width = '100%';
        setTimeout(() => {
            p.classList.add('opacity-0', 'pointer-events-none');
            setTimeout(() => p.remove(), 700); 
        }, 500);
    };

    const safetyTimeout = setTimeout(hidePreloader, 5000);

    window.addEventListener('load', async () => {
        await document.fonts.ready;
        clearTimeout(safetyTimeout);
        hidePreloader();
    });
};

/**
 * Toggles dark mode state and persists preference in localStorage.
 */
const initDarkMode = () => {
    const btns = [document.getElementById('theme-toggle'), document.getElementById('theme-toggle-mobile')];
    btns.forEach(b => b?.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem('color-theme', isDark ? 'dark' : 'light');
    }));
};

/**
 * Controls visibility and behavior of the 'Back to Top' button.
 */
const initBackToTop = () => {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        const show = window.scrollY > 400;
        btn.classList.toggle('opacity-100', show);
        btn.classList.toggle('visible', show);
        btn.classList.toggle('opacity-0', !show);
        btn.classList.toggle('invisible', !show);
    }, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
};

/**
 * Uses IntersectionObserver API to trigger entrance animations 
 * for elements with the .reveal-on-scroll class.
 */
const initScrollAnimations = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('opacity-0', 'translate-y-10');
                entry.target.classList.add('opacity-100', 'translate-y-0');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
};