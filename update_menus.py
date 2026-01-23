
import os
import re

def standardize_menu():
    files = [f for f in os.listdir('.') if f.endswith('.html')]
    
    # Standard menu items
    # We will determine 'active' based on filename
    
    for file in files:
        if file == 'index.html':
            continue # index.html has a different header structure (hero-nav), handled manually
        
        # Skip files in 'Zorx Travel Agency' if I was traversing recursively, 
        # but os.listdir('.') only does current dir.
        
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Regex to find the <ul class="nav-menu">...</ul> block
        # We look for <ul class="nav-menu"> and capture everything until </ul>
        pattern = re.compile(r'<ul class="nav-menu">(.*?)</ul>', re.DOTALL)
        match = pattern.search(content)
        
        if match:
            # Determine active page
            active_home = ' active' if file == 'index.html' else '' # unlikely for index in this loop
            active_packages = ' active' if (file == 'packages.html' or file.startswith('package-') or file.startswith('tour-')) else ''
            active_blog = ' active' if file == 'blog.html' else ''
            active_contact = ' active' if file == 'contact.html' else ''
            
            # Construct new menu
            new_menu_content = f"""
                <li><a href="index.html" class="nav-link{active_home}">Home</a></li>
                <li><a href="packages.html" class="nav-link{active_packages}">Packages</a></li>
                <li><a href="blog.html" class="nav-link{active_blog}">Blog</a></li>
                <li><a href="contact.html" class="nav-link{active_contact}">Contact</a></li>
                <li><a href="#" class="btn btn-primary btn-whatsapp" data-whatsapp
                        style="display: flex; align-items: center; gap: 8px;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                        Chat with Us
                    </a></li>"""
            
            # Indentation adjustment might be needed, but usually browser handles whitespace fine.
            # However, for cleanliness, let's try to match existing indent (16 spaces based on previous view)
            
            # Replace
            new_content = content.replace(match.group(0), f'<ul class="nav-menu">{new_menu_content}\n            </ul>')
            
            if new_content != content:
                with open(file, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {file}")
            else:
                 print(f"No changes needed for {file}")

if __name__ == "__main__":
    standardize_menu()
