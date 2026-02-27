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
/*const mobileMenuBtn = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});*/


// RESPONSIVE DESIGN MENU
// Toggle Menú Móvil
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Dropdown de Servicios en Móvil
const mobileServicesButton = document.getElementById('mobile-services-button');
const mobileServicesMenu = document.getElementById('mobile-services-menu');
const mobileServicesArrow = document.getElementById('mobile-services-arrow');

mobileServicesButton.addEventListener('click', () => {
    mobileServicesMenu.classList.toggle('hidden');
    // Rotar la flecha cuando esté abierto
    mobileServicesArrow.classList.toggle('rotate-180');
});

// Sincronizar el botón de Dark Mode Móvil
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
themeToggleMobile.addEventListener('click', () => {
    // Disparar el click del botón principal para no repetir lógica
    document.getElementById('theme-toggle').click();
});