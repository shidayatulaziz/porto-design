document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Inisialisasi Ikon Lucide
    lucide.createIcons();

    // 2. Efek Cahaya Mengikuti Kursor
    document.addEventListener('mousemove', (e) => {
        const glow = document.getElementById('cursorGlow');
        if (glow) {
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';
        }
    });

    // 3. Menu HP (Mobile Toggle)
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if(mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // 4. Efek Elemen Muncul Saat Di-Scroll (Reveal Section)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal-section').forEach(s => observer.observe(s));

    // 5. Ubah Background Navigasi Saat Di-Scroll
    const nav = document.getElementById('mainNav');
    const appRoot = document.getElementById('app-root');
    
    appRoot.addEventListener('scroll', () => {
        if (appRoot.scrollTop > 50) {
            nav.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
            nav.style.background = 'rgba(8,8,14,0.9)';
        } else {
            nav.style.borderBottom = 'none';
            nav.style.background = 'rgba(8,8,14,0.7)';
        }
    });

});