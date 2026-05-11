/**
 * Manages mobile menu visibility, dropdown behaviors, and icon rotations.
 * Ensures the menu closes upon link selection (excluding dropdown triggers).
 */
export const initMobileNavigation = () => {
    const btn = document.getElementById("mobile-menu-button");
    const menu = document.getElementById("mobile-menu");
    const srvBtn = document.getElementById("mobile-services-button");
    const srvMenu = document.getElementById("mobile-services-menu");
    const arrow = document.getElementById("mobile-services-arrow");

    if (!btn || !menu) return;

    btn.addEventListener("click", () => {
        menu.classList.toggle("hidden");
        btn.classList.toggle("rotate-90");
    });

    if (srvBtn) {
        srvBtn.addEventListener("click", (e) => {
            if (window.innerWidth < 1024) {
                e.preventDefault();
                e.stopPropagation();
                srvMenu?.classList.toggle("hidden");
                arrow?.classList.toggle("rotate-180");
            }
        });
    }

    menu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            if (link !== srvBtn) {
                menu.classList.add("hidden");
                btn.classList.remove("rotate-90");
            }
        });
    });
};

/**
 * Handles dynamic language switching based on URL path segments.
 * Expected URL pattern: domain.com/{lang}/path/
 * @requires data-lang attribute on .language-link elements
 */
export const initLanguageSelector = () => {
    const langLinks = document.querySelectorAll(".language-link");

    langLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetLang = link.getAttribute("data-lang");
            const currentPath = window.location.pathname;
            const pathSegments = currentPath
                .split("/")
                .filter((segment) => segment.length > 0);

            if (pathSegments.length > 0) {
                pathSegments[0] = targetLang;
                window.location.href = "/" + pathSegments.join("/") + "/";
            } else {
                window.location.href = "/" + targetLang + "/";
            }
        });
    });
};
