/**
 * Handles site entry animation. Waits for font readiness and window load.
 * Includes a safety timeout to prevent infinite loading screens.
 */
export const initPreloader = async () => {
    const p = document.getElementById('preloader');
    const bar = document.getElementById('preloader-bar');
    if (!p) return;

    try {
        // Espera a que las fuentes locales (Montserrat/Pinyon) carguen
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
export const initDarkMode = () => {
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
export const initBackToTop = () => {
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