const fs = require('fs');
const path = require('path');

function updatePage(filename) {
    const filePath = path.join(__dirname, filename);
    if (!fs.existsSync(filePath)) {
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    const pages = [
        ['index.html', 'Home 1'],
        ['home2.html', 'Home 2'],
        ['about.html', 'About'],
        ['services.html', 'Services'],
        ['pricing.html', 'Pricing'],
        ['blog.html', 'Blog'],
        ['contact.html', 'Contact'],
        ['dashboard.html', 'Dashboard']
    ];

    let desktopLinks = "";
    for (const [href, label] of pages) {
        if (href === 'dashboard.html') continue;
        const activeClass = (filename === href) ? "text-primary font-medium hover:text-primary transition-colors" : "text-gray-300 hover:text-white transition-colors";
        desktopLinks += `                    <a href="${href}" class="${activeClass}">${label}</a>\n`;
    }

    let mobileLinks = "";
    for (const [href, label] of pages) {
        const activeClass = (filename === href) ? "text-2xl font-bold text-primary" : "text-2xl font-bold text-gray-300";
        mobileLinks += `            <a href="${href}" class="${activeClass}">${label}</a>\n`;
    }

    const headerReplacement = `<!-- Header -->
    <header id="header" class="fixed w-full top-0 z-50 transition-all duration-300 bg-transparent">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-20">
                <!-- Logo -->
                <div class="flex-shrink-0 flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-xl neon-border">
                        <i class="fas fa-network-wired"></i>
                    </div>
                    <span class="font-bold text-xl tracking-tight text-white dark-text-light" style="font-family: 'Space Grotesk', sans-serif;">RTC<span class="text-primary">Forge</span></span>
                </div>

                <!-- Desktop Menu -->
                <nav class="hidden lg:flex space-x-8 desktop-menu items-center">
${desktopLinks.trimEnd()}
                </nav>

                <!-- Right Side Actions -->
                <div class="hidden lg:flex items-center space-x-4">
                    <a href="dashboard.html" title="Dashboard" class="text-gray-300 hover:text-white transition-colors text-sm font-bold glass px-3 py-2 rounded-lg flex items-center justify-center">
                        <i class="fas fa-th-large"></i>
                    </a>
                    <button id="theme-toggle" class="text-gray-300 hover:text-white transition-colors text-sm font-bold glass px-3 py-2 rounded-lg flex items-center justify-center">
                        <i class="fas fa-sun"></i>
                    </button>
                    <button id="rtl-toggle" class="text-gray-300 hover:text-white transition-colors text-sm font-bold glass px-3 py-2 rounded-lg">
                        RTL
                    </button>
                    <a href="login.html" class="text-gray-300 hover:text-white transition-colors glass px-6 py-2 rounded-lg font-medium">Login</a>
                </div>

                <!-- Mobile menu button -->
                <div class="lg:hidden flex items-center gap-4">
                    <button id="mobile-rtl-toggle" class="text-gray-300 hover:text-white text-xs font-bold glass px-2 py-1 rounded">
                        RTL
                    </button>
                    <button id="mobile-theme-toggle" class="text-gray-300 hover:text-white w-8 h-8 rounded-full glass flex items-center justify-center">
                        <i class="fas fa-sun"></i>
                    </button>
                    <button id="mobile-menu-btn" class="text-gray-300 hover:text-white focus:outline-none p-2">
                        <i class="fas fa-bars text-2xl"></i>
                    </button>
                </div>
            </div>
        </div>
    </header>`;

    const mobileMenuReplacement = `<!-- Mobile Menu Overlay -->
    <div id="mobile-menu" class="fixed inset-0 z-[60] bg-dark/95 backdrop-blur-xl transform translate-x-full transition-transform duration-300 lg:hidden flex flex-col">
        <div class="flex justify-end p-6">
            <button id="close-menu-btn" class="text-gray-400 hover:text-white">
                <i class="fas fa-times text-2xl"></i>
            </button>
        </div>
        <div class="flex flex-col items-center gap-6 px-4 py-8 overflow-y-auto">
${mobileLinks.trimEnd()}
            
            <div class="flex gap-4 mt-8 w-full justify-center">
                <a href="login.html" class="bg-gradient-to-r from-primary to-secondary text-white font-bold px-8 py-3 rounded-lg w-full max-w-xs text-center btn-glow">Login</a>
            </div>
        </div>
    </div>`;

    // Perform replacements
    let newContent = content.replace(/<!-- Header -->\s*<header id="header">[\s\S]*?<\/header>/, headerReplacement);
    
    // Try other possible header comments if the first one fails
    if (newContent === content) {
        newContent = content.replace(/<header id="header"[\s\S]*?<\/header>/, headerReplacement);
    }

    newContent = newContent.replace(/<!-- Mobile Menu Overlay -->\s*<div id="mobile-menu">[\s\S]*?<\/div>\s*<\/div>/, mobileMenuReplacement);
    if (newContent === content || !newContent.includes('mobile-menu')) {
        // Fallback for mobile menu if comments are missing or different
        newContent = newContent.replace(/<div id="mobile-menu"[\s\S]*?<\/div>\s*<\/div>/, mobileMenuReplacement);
    }

    if (newContent !== content) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Updated ${filename}`);
    } else {
        console.log(`No changes for ${filename}`);
    }
}

const filesToUpdate = [
    'index.html', 'home2.html', 'about.html', 'services.html', 
    'pricing.html', 'blog.html', 'contact.html', 'dashboard.html',
    'login.html', 'register.html', '404.html'
];

filesToUpdate.forEach(updatePage);
