/**
 * High-performance parallax system using requestAnimationFrame.
 * Targets specific IDs and effector classes to create depth during scroll.
 * Optimized with 'passive: true' for scrolling performance.
 */
export const initParallaxEffects = () => {
    const parallaxTargets = document.querySelectorAll('#parallax-home, #parallax-nature, #parallax-wedding, #parallax-car, .parallax-effector');
    if (parallaxTargets.length === 0) return;

    let ticking = false;

    const updateParallax = () => {
        const windowHeight = window.innerHeight;

        parallaxTargets.forEach(target => {
            const parent = target.parentElement;
            if (!parent) return;
            const rect = parent.getBoundingClientRect();

            // Verifica si el elemento está en el viewport
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

/**
 * Uses IntersectionObserver API to trigger entrance animations 
 * for elements with the .reveal-on-scroll class.
 */
export const initScrollAnimations = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Elimina las clases de estado inicial y activa la visibilidad
                entry.target.classList.remove('opacity-0', 'translate-y-10');
                entry.target.classList.add('opacity-100', 'translate-y-0');
                // Deja de observar el elemento una vez animado para ahorrar recursos
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
};