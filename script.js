/* ==========================================================================
   DOM ELEMENTS & APP STATE
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // Icons
    lucide.createIcons();

    // Initialize EmailJS (Replace with your own Public Key)
    if (typeof emailjs !== 'undefined') {
        emailjs.init({
            publicKey: "yOpbRF7Dlw7RhE-kx",
        });
    } else {
        console.warn("EmailJS SDK is not loaded.");
    }

    // Theme Toggle Elements
    const themeToggle = document.getElementById("themeToggle");
    
    // Navbar Elements
    const navbar = document.querySelector(".navbar");
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");
    
    // Cursor Glow Element
    const cursorGlow = document.getElementById("cursorGlow");
    
    // Typewriter Elements
    const typewriterElement = document.getElementById("typewriter");
    
    // Project Grid Elements
    const projectsGrid = document.getElementById("projectsGrid");
    


    /* ==========================================================================
       THEME CONTROLLER (DARK / LIGHT)
       ========================================================================== */
    
    const currentTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", currentTheme);

    themeToggle.addEventListener("click", () => {
        const activeTheme = document.documentElement.getAttribute("data-theme");
        let newTheme = "dark";
        if (activeTheme === "dark") {
            newTheme = "light";
        }
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    });

    /* ==========================================================================
       MOUSE MOVE GLOW EFFECT
       ========================================================================== */
    
    document.addEventListener("mousemove", (e) => {
        // Use requestAnimationFrame to optimize rendering on scroll/mouse moves
        window.requestAnimationFrame(() => {
            if (cursorGlow) {
                cursorGlow.style.left = `${e.clientX}px`;
                cursorGlow.style.top = `${e.clientY}px`;
            }
        });
    });

    /* ==========================================================================
       SCROLL EFFECTS & NAV HIGHLIGHT
       ========================================================================== */
    
    // Navbar Shrink on Scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
        highlightActiveLink();
    });

    // Active Section Link Highlight
    const sections = document.querySelectorAll("section");
    function highlightActiveLink() {
        let scrollPosition = window.scrollY + 150; // offset for nav height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    /* ==========================================================================
       MOBILE RESPONSIVE NAV MENU
       ========================================================================== */

    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        
        // Toggle lucide menu icon
        const icon = menuToggle.querySelector("i, svg");
        if (navMenu.classList.contains("active")) {
            icon.setAttribute("data-lucide", "x");
        } else {
            icon.setAttribute("data-lucide", "menu");
        }
        lucide.createIcons();
    });

    // Close Menu when clicking a Link
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            const icon = menuToggle.querySelector("i, svg");
            icon.setAttribute("data-lucide", "menu");
            lucide.createIcons();
        });
    });

    /* ==========================================================================
       TYPEWRITER SUBTITLE EFFECT
       ========================================================================== */
    
    const titles = ["Full-Stack Developer", "UI/UX Designer", "Software Engineer", "Problem Solver"];
    let titleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function handleTypewriter() {
        if (!typewriterElement) return;

        const currentText = titles[titleIdx];
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIdx - 1);
            charIdx--;
            typingSpeed = 50; // faster deleting
        } else {
            typewriterElement.textContent = currentText.substring(0, charIdx + 1);
            charIdx++;
            typingSpeed = 150; // standard typing speed
        }

        // Handle states transition
        if (!isDeleting && charIdx === currentText.length) {
            // Full title is typed, pause before deleting
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            // Title is fully deleted, move to the next title
            isDeleting = false;
            titleIdx = (titleIdx + 1) % titles.length;
            typingSpeed = 500; // brief pause before writing next title
        }

        setTimeout(handleTypewriter, typingSpeed);
    }
    
    // Start writing
    setTimeout(handleTypewriter, 1000);

    /* ==========================================================================
       DYNAMIC PROJECTS GALLERY & FILTERING
       ========================================================================== */

    function renderProjects(filter = "all") {
        if (!projectsGrid) return;
        
        // Empty container
        projectsGrid.innerHTML = "";

        const filtered = PROJECTS_DATA.filter(project => {
            return filter === "all" || project.category === filter;
        });

        if (filtered.length === 0) {
            projectsGrid.innerHTML = `<div class="no-projects">Tidak ada proyek yang sesuai dengan kategori ini.</div>`;
            return;
        }

        filtered.forEach(project => {
            // Create card HTML element
            const card = document.createElement("article");
            card.className = "project-card";
            card.style.opacity = "0";
            card.style.transform = "translateY(15px)";
            card.style.transition = "opacity 0.4s ease, transform 0.4s ease";

            // Generate tech tags HTML
            const techHTML = project.tech.map(tag => `<span class="tech-tag">${tag}</span>`).join("");

            card.innerHTML = `
                <a class="project-detail-link" href="project-detail.html?id=${project.id}" aria-label="Lihat detail ${project.title}">
                <div class="project-image-box">
                    <img src="${project.image}" alt="${project.title}" class="project-img" onerror="this.src='https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop'">
                </div>
                </a>
                <div class="project-content">
                    <h3 class="project-title"><a href="project-detail.html?id=${project.id}">${project.title}</a></h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech-tags">
                        ${techHTML}
                    </div>
                    <div class="project-links">
                        <a href="project-detail.html?id=${project.id}" class="project-link">
                            <i data-lucide="arrow-up-right"></i>Detail Proyek
                        </a>
                        <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github" style="margin-right: 4px; display: inline-block; vertical-align: text-bottom;"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>Kode Sumber
                        </a>
                    </div>
                </div>
            `;

            projectsGrid.appendChild(card);
            
            // Re-draw lucide icons for inside card elements
            lucide.createIcons();

            // Trigger animation on separate frame
            setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
            }, 50);
        });
    }

    // Initialize rendering
    renderProjects();

    /* ==========================================================================
       REVEAL-ON-SCROLL OBSERVATION
       ========================================================================== */

    const revealItems = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealItems.forEach(item => {
        revealObserver.observe(item);
    });
});
