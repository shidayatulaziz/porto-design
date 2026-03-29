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

    // === Efek Muncul Saat Scroll & Animasi Skill Bar ===
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Animate skill bars (Dengan Efek Stagger/Berurutan)
                if (entry.target.id === 'skills' || entry.target.querySelector('.skill-fill')) {
                    entry.target.querySelectorAll('.skill-fill').forEach((bar, index) => {
                        setTimeout(() => {
                            bar.style.width = bar.dataset.width + '%';
                        }, index * 250); // Jeda 250 milidetik per baris
                    });
                }
            }
        });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal-section').forEach(s => observer.observe(s));

    // === MENU KIRI OTOMATIS MENYALA (Fix) ===
    const sections = document.querySelectorAll('section');
    const navPills = document.querySelectorAll('.nav-pill');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // Matikan semua warna menu
                navPills.forEach(pill => {
                    pill.classList.remove('active');
                    pill.style.background = 'rgba(255,255,255,0.05)';
                    pill.style.border = '1px solid rgba(255,255,255,0.08)';
                    const icon = pill.querySelector('i');
                    if(icon) icon.style.color = 'rgba(224,224,236,0.5)';
                });

                // Nyalakan menu yang sesuai dengan bagian yang sedang dibaca
                const activePill = document.querySelector(`.nav-pill[data-section="${id}"]`);
                if (activePill) {
                    activePill.classList.add('active');
                    activePill.style.background = 'rgba(0,242,254,0.2)';
                    activePill.style.border = '1px solid rgba(0,242,254,0.3)';
                    const icon = activePill.querySelector('i');
                    if(icon) icon.style.color = '#00f2fe';
                }
            }
        });
    }, { threshold: 0.4 }); // 0.4 artinya menyala saat bagian tsb 40% masuk ke layar

    sections.forEach(sec => navObserver.observe(sec));

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

    // === Form Kontak ===
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
});