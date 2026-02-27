const themeToggleBtn = document.getElementById('theme-toggle');

// Función para cambiar el modo
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function() {
        // Si el modo oscuro está activo, quitarlo y guardar preferencia
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    });
}

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});