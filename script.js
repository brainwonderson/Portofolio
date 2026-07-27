/* ==========================================================================
   DYNAMIC PROJECT DATA
   ========================================================================== */

const PROJECTS_DATA = [
    {
        id: 1,
        title: "E-Commerce modern (ECOMART)",
        category: "web",
        description: "Platform e-commerce modern berbasis web dan mobile dengan arsitektur multi-role (Buyer, Seller, Admin), integrasi payment gateway, manajemen inventaris dinamis, serta dashboard analitik real-time",
        image: "assets/ecomart_proyek.png",
        tech: ["React.js", "Next.js", "Express", "MYSQL"],
        github: "https://github.com/brainwonderson/realtimeecomart",
        demo: "https://example.com"
    },
    {
        id: 2,
        title: "AeroRAG 🚀 - AI PDF Assistant & Vector Search Inspector",
        category: "web",
        description: "AeroRAG adalah aplikasi RAG (Retrieval-Augmented Generation) modern berbasis web yang memungkinkan Anda untuk mengunggah satu atau banyak dokumen PDF sekaligus, mengindeksnya ke dalam basis data vektor lokal, serta melakukan tanya jawab interaktif dengan visualisasi pencarian vektor secara langsung.",
        image: "assets/ProyekRag.png",
        tech: ["Pyhton", "JavaScript", "HTML5", "CSS3", "FAISS", "API GEMINI"],
        github: "https://github.com/brainwonderson/AeroRAG-AI-PDF-Assistant-Vector-Search-Inspector",
        demo: "https://example.com"
    },
    {
        id: 3,
        title: "Text-to-SQL Translator & AI Data Analyst",
        category: "web",
        description: "Aplikasi berbasis web yang menggunakan kecerdasan buatan (Generative AI) dari Google Gemini untuk menerjemahkan pertanyaan bahasa alami (Bahasa Indonesia) menjadi query MySQL secara otomatis, mengeksekusinya ke database lokal, dan menyajikan hasilnya beserta penjelasan analisis data yang komunikatif.",
        image: "assets/proyekTXTtoSQL.png",
        tech: ["HTML5", "CSS Grid", "JavaScript", "WebSockets"],
        github: "https://github.com/brainwonderson/TEXT-SQL",
        demo: "https://example.com"
    },
    {
        id: 4,
        title: "Redesain UI/UX Landing Page SaaS",
        category: "design",
        description: "Studi kasus perancangan antarmuka pengguna untuk aplikasi manajemen keuangan SaaS, berfokus pada kemudahan alur onboarding pengguna baru.",
        image: "assets/project_design.png",
        tech: ["Figma", "User Research", "Wireframing", "Prototyping"],
        github: "https://github.com",
        demo: "https://example.com"
    }
];

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
    const filterButtons = document.querySelectorAll(".filter-btn");
    
    // Contact Form Elements
    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");
    const submitBtn = document.getElementById("submitBtn");

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
        const icon = menuToggle.querySelector("i");
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
            const icon = menuToggle.querySelector("i");
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
            const card = document.createElement("div");
            card.className = "project-card";
            card.style.opacity = "0";
            card.style.transform = "translateY(15px)";
            card.style.transition = "opacity 0.4s ease, transform 0.4s ease";

            // Generate tech tags HTML
            const techHTML = project.tech.map(tag => `<span class="tech-tag">${tag}</span>`).join("");

            card.innerHTML = `
                <div class="project-image-box">
                    <span class="project-category-badge">${project.category}</span>
                    <img src="${project.image}" alt="${project.title}" class="project-img" onerror="this.src='https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop'">
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech-tags">
                        ${techHTML}
                    </div>
                    <div class="project-links">
                        <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github" style="margin-right: 4px; display: inline-block; vertical-align: text-bottom;"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>Kode Sumber
                        </a>
                        <a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="project-link">
                            <i data-lucide="external-link"></i> Demo Live
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

    // Filter Buttons events
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Remove active from all
            filterButtons.forEach(b => b.classList.remove("active"));
            
            // Add active to current
            btn.classList.add("active");
            
            // Render with filter
            const filterValue = btn.getAttribute("data-filter");
            
            // Add slight fadeout effect to grid before loading
            projectsGrid.style.opacity = "0.5";
            projectsGrid.style.transform = "scale(0.98)";
            projectsGrid.style.transition = "all 0.25s ease";
            
            setTimeout(() => {
                renderProjects(filterValue);
                projectsGrid.style.opacity = "1";
                projectsGrid.style.transform = "scale(1)";
            }, 250);
        });
    });

    /* ==========================================================================
       CONTACT FORM SUBMISSION (VALIDATION & FEEDBACK)
       ========================================================================== */

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Pastikan SDK EmailJS telah dimuat
            if (typeof emailjs === 'undefined') {
                formStatus.textContent = "Gagal mengirim pesan: SDK EmailJS tidak termuat. Silakan periksa koneksi internet Anda.";
                formStatus.className = "form-status error";
                formStatus.style.opacity = "1";
                return;
            }

            // Disable submit button
            submitBtn.disabled = true;
            submitBtn.classList.add("disabled");
            const originalBtnHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = `<span>Mengirim...</span> <i data-lucide="loader" class="spin"></i>`;
            lucide.createIcons();

            // Ganti "YOUR_SERVICE_ID" dan "YOUR_TEMPLATE_ID" dengan ID dari dashboard EmailJS Anda
            const serviceID = "service_9l6puht";
            const templateID = "template_0kbf1zr";

            emailjs.sendForm(serviceID, templateID, contactForm)
                .then(() => {
                    // Tampilkan status sukses
                    formStatus.textContent = "Pesan Anda berhasil dikirim! Terima kasih telah menghubungi saya.";
                    formStatus.className = "form-status success";
                    formStatus.style.opacity = "1";
                    
                    // Reset isi Form
                    contactForm.reset();
                })
                .catch((error) => {
                    // Tampilkan status error
                    formStatus.textContent = "Gagal mengirim pesan. Silakan coba lagi atau hubungi langsung via email.";
                    formStatus.className = "form-status error";
                    formStatus.style.opacity = "1";
                    console.error("EmailJS Error:", error);
                })
                .finally(() => {
                    // Kembalikan tombol submit ke kondisi semula
                    submitBtn.disabled = false;
                    submitBtn.classList.remove("disabled");
                    submitBtn.innerHTML = originalBtnHTML;
                    lucide.createIcons();

                    // Hilangkan pesan status setelah 5 detik
                    setTimeout(() => {
                        formStatus.style.opacity = "0";
                        formStatus.style.transition = "opacity 1s ease";
                        setTimeout(() => {
                            formStatus.textContent = "";
                            formStatus.style.opacity = "1";
                            formStatus.className = "form-status";
                        }, 1000);
                    }, 5000);
                });
        });
    }

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
