import os
import re

header_content = """<!-- Header -->
    <header id="header" class="fixed w-full top-0 z-50 bg-slate-900/90 backdrop-blur-md shadow-lg border-b border-white/5">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-20">
                <div class="flex-shrink-0 flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-xl neon-border">
                        <i class="fas fa-network-wired"></i>
                    </div>
                    <span class="font-bold text-xl tracking-tight text-white dark-text-light" style="font-family: 'Space Grotesk', sans-serif;">RTC<span class="text-primary">Forge</span></span>
                </div>

                <nav class="hidden lg:flex space-x-8 desktop-menu items-center">
                    <a href="index.html" class="text-gray-300 hover:text-white transition-colors">Home</a>
                    <a href="about.html" class="text-gray-300 hover:text-white transition-colors">About</a>
                    <a href="services.html" class="text-gray-300 hover:text-white transition-colors">Services</a>
                    <a href="pricing.html" class="text-gray-300 hover:text-white transition-colors">Pricing</a>
                    <a href="blog.html" class="text-gray-300 hover:text-white transition-colors">Blog</a>
                    <a href="contact.html" class="text-gray-300 hover:text-white transition-colors">Contact</a>
                </nav>

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

                <div class="lg:hidden flex items-center gap-4">
                    <button id="mobile-theme-toggle" class="text-gray-300 hover:text-white w-8 h-8 rounded-full glass flex items-center justify-center">
                        <i class="fas fa-sun"></i>
                    </button>
                    <button id="mobile-menu-btn" class="text-gray-300 hover:text-white focus:outline-none p-2">
                        <i class="fas fa-bars text-2xl"></i>
                    </button>
                </div>
            </div>
        </div>
    </header>"""

files = ['home2.html', 'about.html', 'services.html', 'pricing.html', 'blog.html', 'contact.html', '404.html']

for f in files:
    if os.path.exists(f):
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Replace existing header
        if 'id="header"' in content:
            new_content = re.sub(r'<!-- Header -->\s*<header id="header".*?</header>', header_content, content, flags=re.DOTALL)
        elif '<!-- Header (Simple) -->' in content:
            new_content = re.sub(r'<!-- Header \(Simple\) -->\s*<header .*?</header>', header_content, content, flags=re.DOTALL)
        else:
            continue
            
        with open(f, 'w', encoding='utf-8') as file:
            file.write(new_content)
        print(f"Updated {f}")
