const fs = require('fs');
const path = require('path');

const pages = [
    { file: 'index.html', active: 'Home 1', isDashboard: false },
    { file: 'home2.html', active: 'Home 2', isDashboard: false },
    { file: 'about.html', active: 'About', isDashboard: false },
    { file: 'services.html', active: 'Services', isDashboard: false },
    { file: 'pricing.html', active: 'Pricing', isDashboard: false },
    { file: 'blog.html', active: 'Blog', isDashboard: false },
    { file: 'contact.html', active: 'Contact', isDashboard: false },
    { file: 'dashboard.html', active: 'Dashboard', isDashboard: true }
];

const allLinks = [
    { name: 'Home 1', href: 'index.html' },
    { name: 'Home 2', href: 'home2.html' },
    { name: 'About', href: 'about.html' },
    { name: 'Services', href: 'services.html' },
    { name: 'Pricing', href: 'pricing.html' },
    { name: 'Blog', href: 'blog.html' },
    { name: 'Contact', href: 'contact.html' },
    { name: 'Dashboard', href: 'dashboard.html' }
];

pages.forEach(page => {
    const filePath = path.join(__dirname, page.file);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Handle Dashboard Icon in Header
    const dashboardIconHtml = `
                    <a href="dashboard.html" title="Dashboard" class="text-gray-300 hover:text-white transition-colors text-sm font-bold glass px-2 py-1.5 rounded flex items-center justify-center">
                        <i class="fas fa-th-large"></i>
                    </a>`;
    
    // In all pages except dashboard, ensure icon is in mobile header
    if (!page.isDashboard) {
        if (!content.includes('href="dashboard.html" title="Dashboard"')) {
            const mobileHeaderSection = '<div class="lg:hidden flex items-center gap-4">';
            content = content.replace(mobileHeaderSection, mobileHeaderSection + dashboardIconHtml);
        }
    } else {
        // In dashboard page, ensure icon is NOT in the header (if it was there)
        content = content.replace(/<a href="dashboard\.html" title="Dashboard" class="text-gray-300 hover:text-white transition-colors text-sm font-bold glass px-2 py-1\.5 rounded flex items-center justify-center">\s*<i class="fas fa-th-large"><\/i>\s*<\/a>/, '');
    }

    // 2. Handle Mobile Menu Overlay
    // In dashboard page, remove 'Dashboard' link from menu
    const filteredLinks = page.isDashboard 
        ? allLinks.filter(l => l.name !== 'Dashboard') 
        : allLinks;

    const menuLinksHtml = filteredLinks.map(link => {
        const isActive = link.name === page.active;
        const colorClass = isActive ? 'text-primary' : 'text-gray-300';
        return `            <a href="${link.href}" class="text-2xl font-bold ${colorClass}">${link.name}</a>`;
    }).join('\n');

    const overlayHtml = `    <!-- Mobile Menu Overlay -->
    <div id="mobile-menu" class="fixed inset-0 z-[60] bg-dark/95 backdrop-blur-xl transform translate-x-full transition-transform duration-300 lg:hidden flex flex-col">
        <div class="flex justify-end p-6">
            <button id="close-menu-btn" class="text-gray-400 hover:text-white">
                <i class="fas fa-times text-2xl"></i>
            </button>
        </div>
        <div class="flex flex-col items-center gap-6 px-4 py-8 overflow-y-auto">
${menuLinksHtml}
            
            <div class="flex gap-4 mt-8 w-full justify-center">
                <a href="login.html" class="bg-gradient-to-r from-primary to-secondary text-white font-bold px-8 py-3 rounded-lg w-full max-w-xs text-center btn-glow">Login</a>
            </div>
        </div>
    </div>`;

    // Replace existing overlay
    if (content.includes('<!-- Mobile Menu Overlay -->')) {
        content = content.replace(/<!-- Mobile Menu Overlay -->[\s\S]*?<\/div>\s*<\/div>/, overlayHtml);
    } else if (page.isDashboard) {
        // If dashboard page doesn't have an overlay yet, add one
        if (content.includes('</header>')) {
             content = content.replace('</header>', `</header>\n\n${overlayHtml}`);
        }
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated mobile components in ${page.file}`);
});
