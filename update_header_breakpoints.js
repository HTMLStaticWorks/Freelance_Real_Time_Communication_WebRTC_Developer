const fs = require('fs');
const path = require('path');

const pages = [
    'index.html',
    'home2.html',
    'about.html',
    'services.html',
    'pricing.html',
    'blog.html',
    'contact.html'
];

pages.forEach(page => {
    const filePath = path.join(__dirname, page);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Desktop Menu: hidden lg:flex -> hidden xl:flex
    content = content.replace('hidden lg:flex space-x-8 desktop-menu items-center', 'hidden xl:flex space-x-8 desktop-menu items-center');
    
    // 2. Right Side Actions (Desktop): hidden lg:flex items-center space-x-4 -> hidden xl:flex items-center space-x-4
    content = content.replace('hidden lg:flex items-center space-x-4', 'hidden xl:flex items-center space-x-4');
    
    // 3. Mobile Trigger: lg:hidden flex items-center gap-4 -> xl:hidden flex items-center gap-4
    content = content.replace('lg:hidden flex items-center gap-4', 'xl:hidden flex items-center gap-4');
    
    // 4. Mobile Overlay: lg:hidden flex flex-col -> xl:hidden flex flex-col
    content = content.replace('lg:hidden flex flex-col', 'xl:hidden flex flex-col');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated breakpoint for ${page}`);
});
