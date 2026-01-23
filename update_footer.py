
import os
import re

def standardize_footer():
    files = [f for f in os.listdir('.') if f.endswith('.html')]
    
    # The source footer content from index.html (lines 587-707)
    # We'll use a string that exactly matches the structure we want in all files
    new_footer_content = """<footer class="footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-grid">
          <!-- Column 1: Brand & About -->
          <div class="footer-column brand-column">
            <a href="index.html" class="footer-logo">
              <img src="images/logo-new-2026.png" alt="Take My Trip Tourism">
            </a>
            <p class="footer-tagline">Your trusted partner for curated Arabian adventures. Creating unforgettable
              memories since 2020.</p>
            <div class="social-icons">
              <a href="#" aria-label="Facebook"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg></a>
              <a href="#" aria-label="Instagram"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg></a>
              <a href="#" aria-label="Twitter"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2">
                  <path
                    d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z">
                  </path>
                </svg></a>
              <a href="#" aria-label="LinkedIn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg></a>
            </div>
          </div>

          <!-- Column 2: Quick Links -->
          <div class="footer-column">
            <h4 class="footer-heading">Quick Links</h4>
            <ul class="footer-links">
              <li><a href="index.html">Home</a></li>
              <li><a href="packages.html">Packages</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="contact.html">Contact</a></li>
              <li><a href="#" data-whatsapp>WhatsApp</a></li>
            </ul>
          </div>

          <!-- Column 3: Popular Tours -->
          <div class="footer-column">
            <h4 class="footer-heading">Popular Tours</h4>
            <ul class="footer-links">
              <li><a href="tour-desert-safari.html">Desert Safari</a></li>
              <li><a href="tour-city-lights.html">City Tours</a></li>
              <li><a href="tour-dubai-frame.html">Dubai Frame</a></li>
              <li><a href="tour-burj-khalifa.html">Burj Khalifa</a></li>
              <li><a href="tour-grand-mosque.html">Grand Mosque</a></li>
              <li><a href="packages.html">View All Tours →</a></li>
            </ul>
          </div>

          <!-- Column 4: Contact -->
          <div class="footer-column">
            <h4 class="footer-heading">Contact Us</h4>
            <ul class="contact-list">
              <li>
                <div class="contact-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg></div>
                <a href="mailto:info@takemytriptourism.com">info@takemytriptourism.com</a>
              </li>
              <li>
                <div class="contact-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2">
                    <path
                      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z">
                    </path>
                  </svg></div>
                <div class="contact-text">
                  <a href="tel:+971564083282">+971 56 408 3282</a>
                  <span class="badge-success">WhatsApp Available</span>
                </div>
              </li>
              <li>
                <div class="contact-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg></div>
                <span>Dubai, UAE</span>
              </li>
              <li>
                <div class="contact-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg></div>
                <div class="contact-text">
                  <span>Mon-Sat: 9AM - 8PM</span>
                  <span>Sunday: 10AM - 6PM</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-bottom-grid">
          <p class="copyright">&copy; 2025 Take My Trip Tourism. All rights reserved.</p>
          <div class="footer-legal-links">
            <a href="privacy-policy.html">Privacy Policy</a>
            <a href="terms.html">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </div>
  </footer>"""
    
    for file in files:
        if file == 'index.html':
            continue 
            
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Regex to find <footer class="footer">...</footer>
        pattern = re.compile(r'<footer class="footer">(.*?)</footer>', re.DOTALL)
        match = pattern.search(content)
        
        if match:
            # We want to replace the entire MATCH with our new content footer
            # Note: We need to be careful with indentation if we want perfect code,
            # but usually for HTML replacing the block is enough.
            
            # The pattern captures content INSIDE footer tags, but I want to replace tags too 
            # or just content? My new_footer_content HAS tags.
            # So I should match content WITH tags.
            
            # Re-compiling to include tags
            pattern_full = re.compile(r'<footer class="footer">.*?</footer>', re.DOTALL)
            
            if pattern_full.search(content):
                new_content = pattern_full.sub(new_footer_content, content, count=1)
                
                if new_content != content:
                    with open(file, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Updated footer in {file}")
                else:
                    print(f"No footer change needed for {file}")
            else:
                 print(f"Could not fully match footer in {file}")
        else:
            print(f"No footer found in {file}")

if __name__ == "__main__":
    standardize_footer()
