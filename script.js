document.addEventListener("DOMContentLoaded", () => {

    // --- Mobile Menu Toggle ---
    const menuButton = document.querySelector(".mobile-menu-button");
    const navLinks = document.querySelector(".nav-links");

    if (menuButton && navLinks) {
        menuButton.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            menuButton.classList.toggle("active"); 
        });

        navLinks.querySelectorAll("a").forEach(link => {
            if (link.getAttribute("href").startsWith("#") || link.getAttribute("href").includes("index.html#")) {
                link.addEventListener("click", () => {
                    if (navLinks.classList.contains("active")) {
                        navLinks.classList.remove("active");
                        menuButton.classList.remove("active");
                    }
                });
            }
        });
    }

    // --- Smooth Scrolling for internal links ---
    document.querySelectorAll("a[href^='#'], a[href*='index.html#']").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            const targetId = href.includes("#") ? "#" + href.split("#")[1] : null;

            if (!targetId) return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();
                const headerOffset = document.querySelector("header")?.offsetHeight || 75;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Update Copyright Year ---
    const yearSpan = document.getElementById("current-year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Enhanced Scroll Animations using Intersection Observer ---
    const observerOptions = {
        root: null, 
        rootMargin: "0px",
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.staggerDelay ? parseInt(entry.target.dataset.staggerDelay) * 100 : index * 100;
                
                setTimeout(() => {
                    entry.target.classList.add("is-visible");
                }, delay);

                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Corrected selector for service cards
    const elementsToAnimate = [
        { selector: ".service-cards .card, .service-card-grid .card", animation: "animate-fade-in-up" },
        { selector: ".features .feature", animation: "animate-zoom-in" },
        { selector: ".testimonials .testimonial-card", animation: "animate-fade-in-up" },
        { selector: ".contact-full form", animation: "animate-fade-in-left" },
        { selector: ".contact-info", animation: "animate-fade-in-right" },
        { selector: ".footer-col", animation: "animate-fade-in-up" },
        { selector: ".service-item", animation: "animate-fade-in-up" },
        { selector: ".about-text", animation: "animate-fade-in-left" },
        { selector: ".about-image", animation: "animate-fade-in-right" },
        { selector: ".testimonial-grid .testimonial-card", animation: "animate-zoom-in" }
    ];

    elementsToAnimate.forEach(config => {
        document.querySelectorAll(config.selector).forEach((el, index) => {
            el.classList.add("animate-on-scroll", config.animation);
            el.dataset.staggerDelay = index; 
            observer.observe(el);
        });
    });

    // --- Active Nav Link Highlighting (Basic) ---
    const currentPath = window.location.pathname.split("/").pop();
    const navLinksAnchors = navLinks?.querySelectorAll("a");

    navLinksAnchors?.forEach(link => {
        const linkPath = link.getAttribute("href").split("/").pop().split("#")[0];
        const isActive = (currentPath === linkPath) || (currentPath === "" && linkPath === "index.html");
        
        if (isActive) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

});
window.addEventListener("load", () => {
    const header = document.querySelector("header");
    if (header.classList.contains("fade-in-start")) {
      setTimeout(() => {
        header.classList.remove("fade-in-start");
      }, 800); // Matcher varigheten i animation
    }
  });
  window.addEventListener("load", () => {
    const hero = document.querySelector(".hero-section");
    if (hero) {
      setTimeout(() => {
        hero.classList.add("hero-visible");
      }, 200); // vent litt etter navbar
    }
  });
  