/**
 * Orchestrates the luxury fade-in slider.
 * Manages active states, thumbnail rotation (desktop), and DOM reflow
 * triggers to restart CSS animations on slide change.
 * @param {number} index - Target slide index
 * @param {string} direction - Movement direction ('next'|'prev') for thumbnail shifting
 */
export const initCustomHeroSlider = () => {
    const items = document.querySelectorAll(".slider-item");
    const thumbContainer = document.getElementById("thumbnail-container");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");

    // Safety check: Exit if slider elements are not present in the current page
    if (items.length === 0 || !nextBtn || !prevBtn) return;

    let currentIndex = 0;

    const updateSlider = (index, direction = "next") => {
        // Toggle active classes for CSS visibility transitions
        items.forEach((item, i) => {
            item.classList.remove("active");
            if (i === index) item.classList.add("active");
        });

        // Handle thumbnail reordering for infinite-loop visual effect
        const thumbs = document.querySelectorAll(".thumb-item");
        if (
            thumbs.length > 0 &&
            thumbContainer &&
            window.getComputedStyle(thumbContainer).display !== "none"
        ) {
            if (direction === "next") {
                thumbContainer.appendChild(thumbs[0]);
            } else {
                thumbContainer.prepend(thumbs[thumbs.length - 1]);
            }
        }

        // Force DOM reflow to restart CSS keyframe animations
        const activeSlide = items[index];
        const elementsToReset = activeSlide.querySelectorAll(
            ".animate-title-in, .animate-text-in, img",
        );
        elementsToReset.forEach((el) => {
            el.style.animation = "none";
            el.offsetHeight;
            el.style.animation = null;
        });
    };

    // Manual navigation event listeners
    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % items.length;
        updateSlider(currentIndex, "next");
    });

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateSlider(currentIndex, "prev");
    });

    // Automatic transition interval (10000ms)
    let sliderInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        updateSlider(currentIndex, "next");
    }, 10000);

    // Performance optimization: Pause execution when tab is inactive
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) clearInterval(sliderInterval);
        else
            sliderInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % items.length;
                updateSlider(currentIndex, "next");
            }, 10000);
    });

    // Set initial state
    items[0].classList.add("active");
};
