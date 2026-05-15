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

const footerHtml = `    <!-- Footer -->
    <footer class="bg-slate-900 border-t border-white/10 pt-16 pb-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div class="col-span-1 md:col-span-2">
                    <div class="flex items-center gap-3 mb-6">
                        <div class="w-10 h-10 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-xl neon-border">
                            <i class="fas fa-network-wired"></i>
                        </div>
                        <span class="font-bold text-xl tracking-tight text-white dark-text-light" style="font-family: 'Space Grotesk', sans-serif;">RTC<span class="text-primary">Forge</span></span>
                    </div>
                    <p class="text-gray-400 mb-6 max-w-sm">Premium freelance WebRTC engineering and SaaS analytics for enterprise real-time communication platforms.</p>
                    <div class="flex space-x-4">
                        <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-white/10 transition-all"><i class="fab fa-github"></i></a>
                        <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-secondary hover:bg-white/10 transition-all"><i class="fab fa-twitter"></i></a>
                        <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-white/10 transition-all"><i class="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
                
                <div>
                    <h4 class="text-white font-bold mb-6">Services</h4>
                    <ul class="space-y-3">
                        <li><a href="services.html" class="text-gray-400 hover:text-primary transition-colors">SFU Development</a></li>
                        <li><a href="services.html" class="text-gray-400 hover:text-primary transition-colors">TURN/STUN Deployment</a></li>
                        <li><a href="services.html" class="text-gray-400 hover:text-primary transition-colors">WebSocket Signaling</a></li>
                        <li><a href="services.html" class="text-gray-400 hover:text-primary transition-colors">Live Dashboards</a></li>
                    </ul>
                </div>
                
                <div>
                    <h4 class="text-white font-bold mb-6">Company</h4>
                    <ul class="space-y-3">
                        <li><a href="about.html" class="text-gray-400 hover:text-primary transition-colors">About Me</a></li>
                        <li><a href="pricing.html" class="text-gray-400 hover:text-primary transition-colors">Pricing</a></li>
                        <li><a href="blog.html" class="text-gray-400 hover:text-primary transition-colors">Engineering Blog</a></li>
                        <li><a href="contact.html" class="text-gray-400 hover:text-primary transition-colors">Contact</a></li>
                    </ul>
                </div>
            </div>
            
            <div class="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p class="text-gray-500 text-sm">© 2026 RTCForge Engineering. All rights reserved.</p>
                <div class="flex space-x-6 text-sm text-gray-500">
                    <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" class="hover:text-white transition-colors">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>`;

filesToUpdate.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Remove existing footer if present
        content = content.replace(/<!-- Footer -->[\s\S]*?<\/footer>/, '');
        
        // Insert new footer before scripts or before </body>
        if (content.includes('<!-- Scripts -->')) {
            content = content.replace('<!-- Scripts -->', `${footerHtml}\n\n    <!-- Scripts -->`);
        } else {
            content = content.replace('</body>', `${footerHtml}\n</body>`);
        }
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated footer in ${file}`);
    }
});
