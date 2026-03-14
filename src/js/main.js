/**
 * @file main.js
 * @description Core interactions for Concierge VIP Costa Rica.
 * Includes: Custom Ping-Pong Slider (10s), Stable Parallax (v1.9.0 logic), 
 * Mobile Nav with Dropdowns, and Reveal Animations.
 * @version 3.7.0
 */

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initDarkMode();
    initMobileNavigation(); 
    initBackToTop();
    initCustomHeroSlider(); 
    initParallaxEffects(); // Usando la lógica estable de la v1.9.0
    initScrollAnimations();
});

// -------------------------------------------------------------------------
// 1. NAVIGATION (Desktop Hover Safe & Mobile Dropdown)
// -------------------------------------------------------------------------
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

// -------------------------------------------------------------------------
// 2. CUSTOM HERO SLIDER (Ping-Pong: 1-2-3-2-1 | 10s)
// -------------------------------------------------------------------------
const initCustomHeroSlider = () => {
    const track = document.getElementById('slider-track');
    if (!track) return;

    const slides = track.children;
    const totalSlides = slides.length;
    let currentIndex = 0;
    let movingForward = true;

    const updateSlider = () => {
        if (movingForward) {
            if (currentIndex < totalSlides - 1) currentIndex++;
            else { movingForward = false; currentIndex--; }
        } else {
            if (currentIndex > 0) currentIndex--;
            else { movingForward = true; currentIndex++; }
        }

        track.style.transform = `translateX(${currentIndex * -100}%)`;

        const activeSlide = slides[currentIndex];
        const elementsToReset = activeSlide.querySelectorAll('.reveal-content, img, .animate-grow-line');

        elementsToReset.forEach(el => {
            el.style.animation = 'none';
            el.offsetHeight; 
            el.style.animation = null;
        });
    };

    let sliderInterval = setInterval(updateSlider, 10000);
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) clearInterval(sliderInterval);
        else sliderInterval = setInterval(updateSlider, 10000);
    });
};

// -------------------------------------------------------------------------
// 3. STABLE PARALLAX SYSTEM (Lógica v1.9.0)
// -------------------------------------------------------------------------
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

            // Solo actúa si el padre es visible en el viewport
            if (rect.top < windowHeight && rect.bottom > 0) {
                const speed = 0.15;
                // Lógica v1.9.0: Cálculo basado en la distancia al borde inferior
                const shift = (rect.top - windowHeight) * speed;
                
                // Renderizado por GPU
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
// 4. DARK MODE, PRELOADER & REVEAL
// -------------------------------------------------------------------------
const initPreloader = () => {
    const p = document.getElementById('preloader');
    const bar = document.getElementById('preloader-bar');
    if (!p) return;

    // Animamos la barra a un 80% inmediatamente
    if (bar) bar.style.width = '80%';

    const hidePreloader = () => {
        if (bar) bar.style.width = '100%';
        setTimeout(() => {
            p.classList.add('opacity-0', 'pointer-events-none');
            // Eliminamos del DOM después de la transición
            setTimeout(() => p.remove(), 700); 
        }, 500);
    };

    // Si la página tarda más de 5 segundos, forzamos la salida
    const safetyTimeout = setTimeout(hidePreloader, 5000);

    window.addEventListener('load', () => {
        clearTimeout(safetyTimeout);
        hidePreloader();
    });
};

const initDarkMode = () => {
    const btns = [document.getElementById('theme-toggle'), document.getElementById('theme-toggle-mobile')];
    btns.forEach(b => b?.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem('color-theme', isDark ? 'dark' : 'light');
    }));
};

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