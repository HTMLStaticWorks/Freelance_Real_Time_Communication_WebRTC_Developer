const fs = require('fs');
const path = require('path');

const filesToUpdate = [
    'home2.html',
    'about.html',
    'services.html',
    'pricing.html',
    'blog.html',
    'contact.html',
    '404.html'
];

const targetPattern = /<div class="flex items-center gap-3 mb-6">\s*<div class="w-8 h-8 rounded bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">\s*<i class="fas fa-network-wired"><\/i>\s*<\/div>\s*<span class="font-bold text-xl tracking-tight text-white" style="font-family: 'Space Grotesk', sans-serif;">RTC<span class="text-primary">Forge<\/span><\/span>\s*<\/div>/;

const replacement = `<div class="flex items-center gap-3 mb-6">
                        <div class="w-10 h-10 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-xl neon-border">
                            <i class="fas fa-network-wired"></i>
                        </div>
                        <span class="font-bold text-xl tracking-tight text-white dark-text-light" style="font-family: 'Space Grotesk', sans-serif;">RTC<span class="text-primary">Forge</span></span>
                    </div>`;

filesToUpdate.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        const newContent = content.replace(targetPattern, replacement);
        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`Updated ${file}`);
        } else {
            console.log(`Pattern not found in ${file}`);
        }
    }
});
