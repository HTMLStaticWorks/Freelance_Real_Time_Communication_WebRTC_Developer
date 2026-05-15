import os
import re

def update_page(filename):
    if not os.path.exists(filename):
        return

    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Define the new header and mobile menu structure
    # We will adjust the active class based on the filename
    
    pages = [
        ('index.html', 'Home 1'),
        ('home2.html', 'Home 2'),
        ('about.html', 'About'),
        ('services.html', 'Services'),
        ('pricing.html', 'Pricing'),
        ('blog.html', 'Blog'),
        ('contact.html', 'Contact'),
        ('dashboard.html', 'Dashboard')
    ]

    desktop_links = ""
    for href, label in pages:
        if href == 'dashboard.html': continue # Dashboard is usually in actions
        active_class = "text-primary font-medium hover:text-primary transition-colors" if filename == href else "text-gray-300 hover:text-white transition-colors"
        desktop_links += f'                    <a href="{href}" class="{active_class}">{label}</a>\n'

    mobile_links = ""
    for href, label in pages:
        active_class = "text-2xl font-bold text-primary" if filename == href else "text-2xl font-bold text-gray-300"
        mobile_links += f'            <a href="{href}" class="{active_class}">{label}</a>\n'

    header_replacement = f"""<!-- Header -->
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
{desktop_links.rstrip()}
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
    </header>"""

    mobile_menu_replacement = f"""<!-- Mobile Menu Overlay -->
    <div id="mobile-menu" class="fixed inset-0 z-[60] bg-dark/95 backdrop-blur-xl transform translate-x-full transition-transform duration-300 lg:hidden flex flex-col">
        <div class="flex justify-end p-6">
            <button id="close-menu-btn" class="text-gray-400 hover:text-white">
                <i class="fas fa-times text-2xl"></i>
            </button>
        </div>
        <div class="flex flex-col items-center gap-6 px-4 py-8 overflow-y-auto">
{mobile_links.rstrip()}
            
            <div class="flex gap-4 mt-8 w-full justify-center">
                <a href="login.html" class="bg-gradient-to-r from-primary to-secondary text-white font-bold px-8 py-3 rounded-lg w-full max-w-xs text-center btn-glow">Login</a>
            </div>
        </div>
    </div>"""

    # Perform replacements
    new_content = re.sub(r'<!-- Header -->\s*<header id="header".*?</header>', header_replacement, content, flags=re.DOTALL)
    new_content = re.sub(r'<!-- Mobile Menu Overlay -->\s*<div id="mobile-menu".*?<!-- Mobile Menu Overlay -->', mobile_menu_replacement, new_content, flags=re.DOTALL)
    # If the mobile menu doesn't have the closing comment, try to find it by its structure
    if new_content == content or 'mobile-menu' not in new_content:
         new_content = re.sub(r'<!-- Mobile Menu Overlay -->\s*<div id="mobile-menu".*?</div>\s*</div>', mobile_menu_replacement, content, flags=re.DOTALL)
         # Re-apply header if it was missed in the first step (though it shouldn't be if it exists)
         new_content = re.sub(r'<!-- Header -->\s*<header id="header".*?</header>', header_replacement, new_content, flags=re.DOTALL)

    if new_content != content:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filename}")
    else:
        print(f"No changes for {filename}")

files_to_update = [
    'index.html', 'home2.html', 'about.html', 'services.html', 
    'pricing.html', 'blog.html', 'contact.html', 'dashboard.html',
    'login.html', 'register.html', '404.html'
]

for f in files_to_update:
    update_page(f)
