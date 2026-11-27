document.addEventListener("DOMContentLoaded", () => {
    const projectId = new URLSearchParams(window.location.search).get("id");
    const project = PROJECTS_DATA.find(item => String(item.id) === projectId);
    const projectDetail = document.getElementById("projectDetail");
    const projectNotFound = document.getElementById("projectNotFound");
    const themeToggle = document.getElementById("detailThemeToggle");

    const currentTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", currentTheme);
    themeToggle.addEventListener("click", () => {
        const newTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    });

    if (!project) {
        projectNotFound.hidden = false;
        lucide.createIcons();
        return;
    }

    projectDetail.hidden = false;
    document.title = `${project.title} | Brain Wonderson`;
    document.getElementById("detailTitle").textContent = project.title;
    document.getElementById("detailDescription").textContent = project.description;
    if (project.github) {
        document.getElementById("detailSource").href = project.github;
        document.getElementById("detailSourceBottom").href = project.github;
    } else {
        document.getElementById("detailSource").hidden = true;
        document.getElementById("detailSourceBottom").closest(".detail-resource-card").hidden = true;
    }

    const galleryImages = project.images && project.images.length ? project.images : [project.image];
    const gallery = document.querySelector(".detail-hero-image-wrap");
    const previewImage = document.getElementById("detailImage");
    const imageCount = document.getElementById("detailImageCount");
    const imageDots = document.getElementById("detailImageDots");
    const previousButton = document.getElementById("detailPrevImage");
    const nextButton = document.getElementById("detailNextImage");
    let activeImageIndex = 0;
    let autoplayTimer;
    let touchStartX = 0;

    function showImage(index) {
        activeImageIndex = (index + galleryImages.length) % galleryImages.length;
        previewImage.classList.add("is-changing");
        previewImage.src = galleryImages[activeImageIndex];
        previewImage.alt = `Preview ${project.title} ${activeImageIndex + 1}`;
        imageCount.textContent = `${activeImageIndex + 1} / ${galleryImages.length}`;
        imageDots.querySelectorAll("button").forEach((dot, dotIndex) => {
            dot.classList.toggle("active", dotIndex === activeImageIndex);
            dot.setAttribute("aria-current", dotIndex === activeImageIndex ? "true" : "false");
        });
        window.requestAnimationFrame(() => {
            previewImage.classList.remove("is-changing");
        });
    }

    function stopAutoplay() {
        window.clearInterval(autoplayTimer);
    }

    function startAutoplay() {
        stopAutoplay();
        if (
            galleryImages.length < 2 ||
            document.hidden ||
            gallery.matches(":hover") ||
            gallery.contains(document.activeElement) ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) return;

        autoplayTimer = window.setInterval(() => {
            showImage(activeImageIndex + 1);
        }, 5000);
    }

    if (galleryImages.length > 1) {
        previousButton.hidden = false;
        nextButton.hidden = false;
        imageCount.hidden = false;
        imageDots.hidden = false;

        galleryImages.forEach((_, index) => {
            const dot = document.createElement("button");
            dot.type = "button";
            dot.className = "detail-image-dot";
            dot.setAttribute("aria-label", `Tampilkan gambar ${index + 1}`);
            dot.addEventListener("click", () => {
                showImage(index);
                startAutoplay();
            });
            imageDots.appendChild(dot);
        });

        previousButton.addEventListener("click", () => {
            showImage(activeImageIndex - 1);
            startAutoplay();
        });
        nextButton.addEventListener("click", () => {
            showImage(activeImageIndex + 1);
            startAutoplay();
        });
        gallery.addEventListener("mouseenter", stopAutoplay);
        gallery.addEventListener("mouseleave", startAutoplay);
        gallery.addEventListener("focusin", stopAutoplay);
        gallery.addEventListener("focusout", startAutoplay);
        gallery.addEventListener("touchstart", event => {
            touchStartX = event.changedTouches[0].clientX;
        }, { passive: true });
        gallery.addEventListener("touchend", event => {
            const distance = event.changedTouches[0].clientX - touchStartX;
            if (Math.abs(distance) < 50) return;
            showImage(activeImageIndex + (distance < 0 ? 1 : -1));
            startAutoplay();
        }, { passive: true });
        document.addEventListener("visibilitychange", () => {
            if (document.hidden) stopAutoplay();
            else startAutoplay();
        });
    }

    galleryImages.forEach(source => {
        const image = new Image();
        image.src = source;
    });
    showImage(0);
    startAutoplay();

    const techContainer = document.getElementById("detailTech");
    project.tech.forEach(technology => {
        const tag = document.createElement("span");
        tag.className = "tech-tag";
        tag.textContent = technology;
        techContainer.appendChild(tag);
    });

    const highlightsContainer = document.getElementById("detailHighlights");
    project.highlights.forEach((highlight, index) => {
        const item = document.createElement("div");
        item.className = "detail-highlight-card";
        const number = document.createElement("span");
        number.className = "detail-highlight-number";
        number.textContent = `0${index + 1}`;
        const text = document.createElement("p");
        text.textContent = highlight;
        item.append(number, text);
        highlightsContainer.appendChild(item);
    });

    const documentTabs = Array.from(document.querySelectorAll(".detail-document-tab"));
    const documentPanel = document.getElementById("documentPreview");
    const documentStatus = document.getElementById("documentStatus");
    const documentPdf = document.getElementById("detailDocumentPdf");
    const documentOpenLink = document.getElementById("detailDocumentOpen");
    const documentLabels = {
        fsd: "FSD",
        uml: "UML",
        testingCase: "Testing Case"
    };

    function showProjectDocument(type) {
        const documentPath = project.documents && project.documents[type];
        const activeTab = documentTabs.find(tab => tab.dataset.documentType === type);

        documentTabs.forEach(tab => {
            const isActive = tab === activeTab;
            tab.classList.toggle("active", isActive);
            tab.setAttribute("aria-selected", String(isActive));
            tab.tabIndex = isActive ? 0 : -1;
        });
        documentPanel.setAttribute("aria-labelledby", activeTab.id);

        if (documentPath) {
            documentPdf.src = documentPath;
            documentPdf.hidden = false;
            documentStatus.hidden = true;
            documentOpenLink.href = documentPath;
            documentOpenLink.hidden = false;
            return;
        }

        documentPdf.removeAttribute("src");
        documentPdf.hidden = true;
        documentStatus.textContent = `Dokumen ${documentLabels[type]} untuk proyek ini belum tersedia.`;
        documentStatus.hidden = false;
        documentOpenLink.removeAttribute("href");
        documentOpenLink.hidden = true;
    }

    documentTabs.forEach((tab, index) => {
        tab.addEventListener("click", () => showProjectDocument(tab.dataset.documentType));
        tab.addEventListener("keydown", event => {
            if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
            event.preventDefault();
            const direction = event.key === "ArrowRight" ? 1 : -1;
            const nextTab = documentTabs[(index + direction + documentTabs.length) % documentTabs.length];
            nextTab.focus();
            showProjectDocument(nextTab.dataset.documentType);
        });
    });
    showProjectDocument("fsd");

    const demoLink = document.getElementById("detailDemo");
    const demoStatus = document.getElementById("detailDemoStatus");
    const hasDemo = project.demo && project.demo !== "https://example.com";
    if (hasDemo) {
        demoLink.href = project.demo;
        demoLink.hidden = false;
        demoStatus.textContent = "Demo proyek dapat dibuka melalui tautan berikut.";
    } else {
        demoStatus.textContent = project.github
            ? "Demo online belum tersedia. Silakan lihat screenshot dan kode sumber proyek."
            : "Demo online dan tautan kode sumber belum tersedia. Lihat ringkasan fitur proyek di atas.";
    }

    lucide.createIcons();
});
