document.addEventListener('DOMContentLoaded', () => {
    // Theme Switch
    const themeBtn = document.getElementById('theme-toggle');
    const mobileThemeBtn = document.getElementById('mobile-theme-toggle');
    const header = document.getElementById('header');
    const body = document.body;
    
    // Check local storage for theme
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        if (themeBtn) themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
        if (mobileThemeBtn) mobileThemeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }

    const updateHeader = () => {
        const isLight = body.classList.contains('light-mode');
        if (window.scrollY > 50) {
            if (isLight) {
                header.classList.add('bg-white/90', 'backdrop-blur-md', 'shadow-xl', 'border-b', 'border-slate-200');
                header.classList.remove('bg-transparent', 'bg-slate-900/90');
            } else {
                header.classList.add('bg-slate-900/90', 'backdrop-blur-md', 'shadow-lg');
                header.classList.remove('bg-transparent', 'bg-white/90', 'border-b', 'border-slate-200');
            }
        } else {
            header.classList.remove('bg-slate-900/90', 'bg-white/90', 'backdrop-blur-md', 'shadow-lg', 'shadow-xl', 'border-b', 'border-slate-200');
            header.classList.add('bg-transparent');
        }
    };

    const toggleTheme = () => {
        body.classList.toggle('light-mode');
        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
            if (themeBtn) themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
            if (mobileThemeBtn) mobileThemeBtn.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            localStorage.setItem('theme', 'dark');
            if (themeBtn) themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
            if (mobileThemeBtn) mobileThemeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }
        if (header) updateHeader();
    };

    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
    if (mobileThemeBtn) mobileThemeBtn.addEventListener('click', toggleTheme);

    // RTL Toggle
    const rtlBtn = document.getElementById('rtl-toggle');
    const mobileRtlBtn = document.getElementById('mobile-rtl-toggle');
    
    const toggleRTL = () => {
        const dir = document.documentElement.getAttribute('dir');
        if (dir === 'rtl') {
            document.documentElement.setAttribute('dir', 'ltr');
        } else {
            document.documentElement.setAttribute('dir', 'rtl');
        }
    };

    if (rtlBtn) rtlBtn.addEventListener('click', toggleRTL);
    if (mobileRtlBtn) mobileRtlBtn.addEventListener('click', toggleRTL);

    // Mobile Menu
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenuBtn = document.getElementById('close-menu-btn');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeMenuBtn && mobileMenu) {
        closeMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = '';
        });
    }
    
    // Auto close mobile menu on click
    const mobileLinks = document.querySelectorAll('#mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu) {
                mobileMenu.classList.add('translate-x-full');
                document.body.style.overflow = '';
            }
        });
    });

    // Sticky Header
    if (header) {
        window.addEventListener('scroll', updateHeader);
        updateHeader(); // Initial check
    }
});
