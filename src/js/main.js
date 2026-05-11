import { initPreloader, initDarkMode, initBackToTop } from './modules/utils.js';
import { initMobileNavigation, initLanguageSelector } from './modules/navigation.js';
import { initCustomHeroSlider } from './modules/slider.js';
import { initParallaxEffects, initScrollAnimations } from './modules/animations.js';

document.addEventListener('DOMContentLoaded', () => {
    // Inicialización de módulos
    initPreloader();
    initDarkMode();
    initBackToTop();
    initMobileNavigation();
    initLanguageSelector();
    initCustomHeroSlider();
    initParallaxEffects();
    initScrollAnimations();
});