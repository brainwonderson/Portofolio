const PROJECTS_DATA = [
    {
        id: 6,
        title: "SILAMPAS - Sistem Informasi Ticketing Layanan Masyarakat Loka POM Toba",
        category: "web",
        description: "SILAMPAS adalah platform digital untuk meningkatkan efisiensi pencatatan dan pengelolaan layanan masyarakat di Loka POM Toba. Sistem ini mendukung pencatatan layanan secara sistematis, pengelolaan pertemuan online dengan pembuatan tautan Zoom dan pengiriman otomatis melalui WhatsApp, serta survei kepuasan untuk membantu meningkatkan kualitas layanan. Dengan Laravel, SQL Server, dan integrasi API Zoom serta WhatsApp, SILAMPAS membantu mempercepat respons terhadap pengaduan dan permintaan masyarakat secara akurat dan transparan.",
        image: "assets/silampas.png",
        images: ["assets/silampas.png"],
        tech: ["Laravel", "SQL Server", "Zoom API", "WhatsApp API"],
        github: "https://github.com/proyek-mahasiswa/psi-2425ge-02-silampas",
        demo: "https://youtu.be/KpP4CvtkwjI",
        documents: {
            fsd: "document/PIP_Silampas.pdf",
            uml: "document/SyRS_Silampas.pdf",
            testingCase: "document/STD_Silampas.pdf"
        },
        flow: ["Masyarakat mengajukan layanan", "Petugas mencatat dan mengelola ticketing", "Pertemuan online melalui Zoom", "Tautan dikirim otomatis via WhatsApp", "Survei kepuasan layanan"],
        userStories: [
            "Sebagai petugas, saya ingin mencatat dan mengelola permintaan layanan secara sistematis agar setiap pengaduan dapat ditindaklanjuti.",
            "Sebagai petugas, saya ingin membuat tautan pertemuan Zoom dan mengirimkannya melalui WhatsApp agar koordinasi dengan masyarakat lebih mudah.",
            "Sebagai masyarakat, saya ingin mengisi survei kepuasan agar kualitas layanan dapat terus ditingkatkan."
        ],
        highlights: ["Pencatatan dan pengelolaan ticketing layanan masyarakat", "Generate tautan Zoom dan pengiriman otomatis melalui WhatsApp", "Survei kepuasan untuk mendukung peningkatan kualitas layanan"]
    },
    {
        id: 5,
        title: "SmartFood AI 🍕 - AI-Powered Food Delivery & Recommendation Platform",
        category: "web",
        description: "Platform pemesanan dan pengantaran makanan modern yang mengintegrasikan AI (Google Gemini API) untuk chatbot kuliner interaktif, prediksi penjualan, rekomendasi stok bahan baku, dan menu viral bagi mitra restoran.",
        image: "assets/smartfood_ai.png",
        images: ["assets/smartfood_ai.png", "assets/project_dashboard.png"],
        tech: ["React.js", "Laravel", "Tailwind CSS", "MySQL", "Gemini API"],
        github: "https://github.com/brainwonderson/AI-Powered-Food-Delivery-Recommendation-Platform",
        demo: "https://example.com",
        flow: ["Pelanggan / Mitra", "Aplikasi SmartFood", "API Laravel", "MySQL + Gemini AI"],
        userStories: [
            "Sebagai pelanggan, saya ingin meminta rekomendasi makanan melalui chatbot agar lebih mudah menemukan menu yang sesuai.",
            "Sebagai mitra restoran, saya ingin melihat prediksi penjualan dan rekomendasi stok agar dapat menyiapkan bahan dengan lebih baik."
        ],
        highlights: ["Pemesanan dan pengantaran makanan", "Chatbot kuliner berbasis Gemini", "Prediksi penjualan dan rekomendasi stok"]
    },
    {
        id: 1,
        title: "E-Commerce modern (ECOMART)",
        category: "web",
        description: "Platform e-commerce modern berbasis web dan mobile dengan arsitektur multi-role (Buyer, Seller, Admin), integrasi payment gateway, manajemen inventaris dinamis, serta dashboard analitik real-time",
        image: "assets/ecomart_proyek.png",
        images: ["assets/ecomart_proyek.png", "assets/project_ecommerce.png"],
        tech: ["React.js", "Next.js", "Express", "MYSQL"],
        github: "https://github.com/brainwonderson/realtimeecomart",
        demo: "https://example.com",
        flow: ["Buyer / Seller / Admin", "Web & Mobile App", "Express API", "Database + Payment Gateway"],
        userStories: [
            "Sebagai buyer, saya ingin menelusuri produk dan menyelesaikan pembayaran agar dapat berbelanja dalam satu platform.",
            "Sebagai seller, saya ingin mengelola produk dan stok agar informasi inventaris selalu terbaru.",
            "Sebagai admin, saya ingin melihat analitik transaksi agar dapat memantau aktivitas platform."
        ],
        highlights: ["Akses multi-role: Buyer, Seller, dan Admin", "Manajemen inventaris dinamis", "Payment gateway dan analitik real-time"]
    },
    {
        id: 2,
        title: "AeroRAG 🚀 - AI PDF Assistant & Vector Search Inspector",
        category: "web",
        description: "AeroRAG adalah aplikasi RAG (Retrieval-Augmented Generation) modern berbasis web yang memungkinkan Anda untuk mengunggah satu atau banyak dokumen PDF sekaligus, mengindeksnya ke dalam basis data vektor lokal, serta melakukan tanya jawab interaktif dengan visualisasi pencarian vektor secara langsung.",
        image: "assets/ProyekRag.png",
        images: ["assets/ProyekRag.png", "assets/project_design.png"],
        tech: ["Pyhton", "JavaScript", "HTML5", "CSS3", "FAISS", "API GEMINI"],
        github: "https://github.com/brainwonderson/AeroRAG-AI-PDF-Assistant-Vector-Search-Inspector",
        demo: "https://example.com",
        flow: ["Pengguna", "Upload PDF", "Chunking + FAISS", "Gemini AI + Jawaban"],
        userStories: [
            "Sebagai pengguna, saya ingin mengunggah beberapa PDF agar dokumen dapat dicari dalam satu tempat.",
            "Sebagai pengguna, saya ingin bertanya berdasarkan dokumen dan melihat chunk yang relevan agar jawaban lebih mudah ditelusuri."
        ],
        highlights: ["Unggah satu atau banyak PDF", "Pencarian vektor dengan FAISS", "Tanya jawab dokumen dan inspector chunk"]
    },
    {
        id: 3,
        title: "Text-to-SQL Translator & AI Data Analyst",
        category: "web",
        description: "Aplikasi berbasis web yang menggunakan kecerdasan buatan (Generative AI) dari Google Gemini untuk menerjemahkan pertanyaan bahasa alami (Bahasa Indonesia) menjadi query MySQL secara otomatis, mengeksekusinya ke database lokal, dan menyajikan hasilnya beserta penjelasan analisis data yang komunikatif.",
        image: "assets/proyekTXTtoSQL.png",
        images: ["assets/proyekTXTtoSQL.png", "assets/project_dashboard.png"],
        tech: ["HTML5", "CSS Grid", "JavaScript", "WebSockets"],
        github: "https://github.com/brainwonderson/TEXT-SQL",
        demo: "https://example.com",
        flow: ["Pertanyaan Bahasa Indonesia", "Gemini AI", "Query MySQL", "Hasil + Analisis"],
        userStories: [
            "Sebagai pengguna, saya ingin bertanya tentang data dengan bahasa sehari-hari agar tidak perlu menulis SQL secara manual.",
            "Sebagai pengguna, saya ingin melihat hasil query beserta penjelasannya agar dapat memahami data dengan cepat."
        ],
        highlights: ["Pertanyaan bahasa alami dalam Bahasa Indonesia", "Generasi dan eksekusi query MySQL", "Hasil query dengan penjelasan analisis"]
    },
    {
        id: 4,
        title: "Lapor Kita - Aplikasi Layanan Pengaduan Masyarakat Berbasis Web",
        category: "web",
        description: "LaporKita adalah platform pengaduan publik berbasis web yang dirancang untuk memudahkan warga dalam melaporkan berbagai masalah terkait lingkungan dan fasilitas umum—seperti jalan rusak, penumpukan sampah, banjir, atau lampu jalan yang mati. Sistem ini menghubungkan masyarakat, administrator platform, administrator instansi, dan petugas lapangan ke dalam alur kerja pengelolaan pengaduan yang terpadu. Proses ini mencakup berbagai tahapan, mulai dari pengajuan, verifikasi, dan penugasan, hingga pemantauan perkembangan serta penyelesaian akhir, yang semuanya dilakukan secara transparan.",
        image: "assets/laporkita.png",
        images: ["assets/laporkita.png", "assets/laporkitaa.png"],
        tech: ["HTML5", "Next.JS", "React.Js"],
        github: "https://github.com/brainwonderson/LaporKita",
        demo: "https://example.com",
        documents: {
            fsd: "document/LaporKita_FSD.pdf",
            uml: "document/LaporKita_UML.pdf",
            testingCase: "document/Testing case.pdf"
        },
        flow: ["Warga mengirim laporan", "Admin memverifikasi", "Dinas / petugas ditugaskan", "Progres dan penyelesaian"],
        userStories: [
            "Sebagai warga, saya ingin mengirim laporan kerusakan fasilitas umum beserta detailnya agar masalah dapat ditindaklanjuti.",
            "Sebagai warga, saya ingin memantau status laporan agar mengetahui perkembangan penanganannya.",
            "Sebagai admin, saya ingin memverifikasi laporan dan menugaskannya ke dinas atau petugas terkait agar laporan ditangani dengan tepat.",
            "Sebagai petugas lapangan, saya ingin memperbarui progres dan hasil penanganan agar warga dan admin mendapat informasi terbaru."
        ],
        highlights: ["Pelaporan masalah lingkungan dan fasilitas umum", "Verifikasi serta penugasan laporan ke pihak terkait", "Pemantauan progres hingga laporan selesai"]
    }
];
