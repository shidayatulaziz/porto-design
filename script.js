document.addEventListener("DOMContentLoaded", () => {
    // === Inisialisasi Ikon Lucide ===
    lucide.createIcons();

    // === Cahaya Kursor ===
    document.addEventListener('mousemove', (e) => {
        const glow = document.getElementById('cursorGlow');
        if (glow) {
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';
        }
    });

    // === Menu Mobile ===
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if(mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => { mobileMenu.classList.toggle('hidden'); });
    }

    // === Efek Muncul Saat Scroll & Animasi Skill Bar ===
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Animate skill bars
                if (entry.target.id === 'skills' || entry.target.querySelector('.skill-fill')) {
                    entry.target.querySelectorAll('.skill-fill').forEach(bar => {
                        bar.style.width = bar.dataset.width + '%';
                    });
                }
            }
        });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal-section').forEach(s => observer.observe(s));

    // === Tab Filter Proyek ===
    const filterTabs = document.getElementById('filterTabs');
    if(filterTabs){
        filterTabs.addEventListener('click', (e) => {
            const btn = e.target.closest('.filter-btn');
            if (!btn) return;
            const filter = btn.dataset.filter;

            // Update active state
            document.querySelectorAll('.filter-btn').forEach(b => {
                b.style.background = 'rgba(255,255,255,0.05)';
                b.style.color = 'rgba(224,224,236,0.5)';
                b.style.border = '1px solid rgba(255,255,255,0.08)';
            });
            btn.style.background = '#00f2fe';
            btn.style.color = '#000';
            btn.style.border = 'none';

            // Filter projects
            document.querySelectorAll('.card-project').forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = '';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    requestAnimationFrame(() => {
                        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    });
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // === Form Kontak Mockup ===
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('nameInput').value.trim();
            const email = document.getElementById('emailInput').value.trim();
            const msg = document.getElementById('msgInput').value.trim();
            const formMsg = document.getElementById('formMsg');

            if (!name || !email || !msg) {
                formMsg.textContent = 'Please fill all fields ✍️';
                formMsg.style.background = 'rgba(239,68,68,0.1)';
                formMsg.style.color = '#f87171';
                formMsg.classList.remove('hidden');
                return;
            }

            formMsg.textContent = 'Message sent! Thank you ' + name + ' ✨';
            formMsg.style.background = 'rgba(110,231,183,0.1)';
            formMsg.style.color = '#6ee7b7';
            formMsg.classList.remove('hidden');

            document.getElementById('nameInput').value = '';
            document.getElementById('emailInput').value = '';
            document.getElementById('msgInput').value = '';
            setTimeout(() => formMsg.classList.add('hidden'), 4000);
        });
    }

    // === Efek Scroll Navigasi Atas & Floating Pills ===
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

        const sections = ['hero', 'about', 'work', 'awards', 'process', 'skills', 'contact'];
        sections.forEach(section => {
            const el = document.getElementById(section);
            const navPill = document.querySelector(`[data-section="${section}"]`);
            if (!el || !navPill) return;

            const rect = el.getBoundingClientRect();
            const isInView = rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.5;

            if (isInView) {
                document.querySelectorAll('.nav-pill').forEach(p => {
                    p.classList.remove('active');
                    p.style.background = 'rgba(255,255,255,0.05)';
                    p.style.border = '1px solid rgba(255,255,255,0.08)';
                    p.querySelector('i').style.color = 'rgba(224,224,236,0.5)';
                });
                navPill.classList.add('active');
                navPill.style.background = 'rgba(0,242,254,0.2)';
                navPill.style.border = '1px solid rgba(0,242,254,0.3)';
                navPill.querySelector('i').style.color = '#00f2fe';
            }
        });
    });
});