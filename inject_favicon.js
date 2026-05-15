const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(file => file.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove existing favicon if any
    content = content.replace(/<link rel="icon"[\s\S]*?>/g, '');

    const faviconHtml = '    <link rel="icon" type="image/png" href="assets/images/favicon.png">';

    if (content.includes('</head>')) {
        content = content.replace('</head>', `${faviconHtml}\n</head>`);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Injected favicon into ${file}`);
    }
});
