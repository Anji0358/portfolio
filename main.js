// ================================
// Portfolio Main JavaScript
// ================================

document.addEventListener("DOMContentLoaded", () => {
    setupHeaderScroll();
    setupActiveNavigation();
    setupSmoothScroll();
    setupImageFallback();
});

// ================================
// Header scroll effect
// ================================

const setupHeaderScroll = () => {
    const header = document.querySelector(".site-header");

    if (!header) return;

    const updateHeaderStyle = () => {
        if (window.scrollY > 16) {
            header.classList.add("is-scrolled");
        } else {
            header.classList.remove("is-scrolled");
        }
    };

    updateHeaderStyle();

    window.addEventListener("scroll", updateHeaderStyle);
};

// ================================
// Active navigation
// ================================

const setupActiveNavigation = () => {
    const navLinks = document.querySelectorAll(".global-nav a");
    const sections = [...navLinks]
        .map((link) => {
            const href = link.getAttribute("href");

            if (!href || !href.startsWith("#")) return null;

            const section = document.querySelector(href);

            if (!section) return null;

            return {
                link,
                section,
            };
        })
        .filter(Boolean);

    if (sections.length === 0) return;

    const activateCurrentSection = () => {
        const scrollPosition = window.scrollY + 120;

        let currentSection = sections[0];

        sections.forEach((item) => {
            const sectionTop = item.section.offsetTop;

            if (scrollPosition >= sectionTop) {
                currentSection = item;
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("is-active");
        });

        currentSection.link.classList.add("is-active");
    };

    activateCurrentSection();

    window.addEventListener("scroll", activateCurrentSection);
};

// ================================
// Smooth scroll
// ================================

const setupSmoothScroll = () => {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");

            if (!href || href === "#") return;

            const target = document.querySelector(href);

            if (!target) return;

            event.preventDefault();

            const headerHeight =
                document.querySelector(".site-header")?.offsetHeight ?? 0;

            const targetPosition =
                target.getBoundingClientRect().top + window.scrollY - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth",
            });
        });
    });
};

// ================================
// Image fallback
// ================================

const setupImageFallback = () => {
    const projectImages = document.querySelectorAll(".project-image img");

    projectImages.forEach((image) => {
        image.addEventListener("error", () => {
            const wrapper = image.closest(".project-image");

            if (!wrapper) return;

            image.remove();

            const placeholder = document.createElement("div");
            placeholder.className = "image-placeholder";
            placeholder.innerHTML = `
        <span>Shift Manager Screenshot</span>
        <small>images/shift-manager.png を追加すると画像が表示されます</small>
      `;

            wrapper.appendChild(placeholder);
        });
    });
};