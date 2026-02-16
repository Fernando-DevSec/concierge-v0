// Función para cambiar el modo
/*const toggleDarkMode = () => {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
}

// Lógica al cargar la página (Prevenir el "flash" de blanco)
if (localStorage.getItem('theme') === 'dark' || 
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
}*/


const themeToggle = document.querySelector('#theme-toggle');

// Al cargar: Sincronizar el estado del checkbox con la preferencia guardada
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    themeToggle.checked = true; // El switch se verá en modo oscuro
} else {
    document.documentElement.classList.remove('dark');
    themeToggle.checked = false;
}

// Evento al cambiar el switch
themeToggle.addEventListener('change', function() {
    if (this.checked) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
    }
});