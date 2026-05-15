const fs = require('fs');
const path = require('path');

const pages = [
    { file: 'about.html', active: 'About' },
    { file: 'services.html', active: 'Services' },
    { file: 'pricing.html', active: 'Pricing' },
    { file: 'blog.html', active: 'Blog' },
    { file: 'contact.html', active: 'Contact' },
    { file: 'home2.html', active: 'Home 2' }
];

const links = [
    { name: 'Home 1', href: 'index.html' },
    { name: 'Home 2', href: 'home2.html' },
    { name: 'About', href: 'about.html' },
    { name: 'Services', href: 'services.html' },
    { name: 'Pricing', href: 'pricing.html' },
    { name: 'Blog', href: 'blog.html' },
    { name: 'Contact', href: 'contact.html' },
    { name: 'Dashboard', href: 'dashboard.html', special: true }
];

pages.forEach(page => {
    const filePath = path.join(__dirname, page.file);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');

    // Remove existing mobile-menu if present
    content = content.replace(/<!-- Mobile Menu Overlay -->[\s\S]*?<div id="mobile-menu"[\s\S]*?<\/div>\s*<\/div>/, '');
    
    // Construct the overlay
    const menuLinks = links.map(link => {
        const isActive = link.name === page.active;
        const colorClass = isActive ? 'text-primary' : 'text-gray-300';
        if (link.special) {
            return `            <a href="${link.href}" class="text-2xl font-bold ${colorClass} mt-4 border-t border-white/10 pt-4 w-full text-center">${link.name}</a>`;
        }
        return `            <a href="${link.href}" class="text-2xl font-bold ${colorClass}">${link.name}</a>`;
    }).join('\n');

    const overlayHtml = `    <!-- Mobile Menu Overlay -->
    <div id="mobile-menu" class="fixed inset-0 z-[60] bg-dark/95 backdrop-blur-xl transform translate-x-full transition-transform duration-300 xl:hidden flex flex-col">
        <div class="flex justify-end p-6">
            <button id="close-menu-btn" class="text-gray-400 hover:text-white">
                <i class="fas fa-times text-2xl"></i>
            </button>
        </div>
        <div class="flex flex-col items-center justify-start gap-6 px-4 py-8 overflow-y-auto flex-grow">
${menuLinks}
            
            <div class="flex gap-4 mt-8 w-full justify-center">
                <a href="login.html" class="bg-gradient-to-r from-primary to-secondary text-white font-bold px-8 py-3 rounded-lg w-full max-w-xs text-center btn-glow">Login</a>
            </div>
        </div>
    </div>`;

    // Insert after </header>
    if (content.includes('</header>')) {
        content = content.replace('</header>', `</header>\n\n${overlayHtml}`);
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Injected mobile menu into ${page.file}`);
});
