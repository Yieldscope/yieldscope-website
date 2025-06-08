// Global navigation highlighting function
let highlightNavLink;

// Theme Management
function initTheme() {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update theme toggle button state
    updateThemeToggle(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update theme toggle button state
    updateThemeToggle(newTheme);
    
    // Refresh navigation highlighting with new theme
    if (highlightNavLink) {
        highlightNavLink();
    }
    
    // Track theme change
    trackEvent('theme_change', { theme: newTheme });
}

function updateThemeToggle(theme) {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
        themeBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
    }
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initTheme();
    
    // Theme toggle event listener
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
    
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    for (const link of links) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Handle contact form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email) {
                alert('Please fill in your name and email address.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Track form submission
            trackEvent('contact_form_submit', { 
                name: name, 
                email: email, 
                theme: document.documentElement.getAttribute('data-theme') 
            });
            
            // For now, just show a success message
            // In production, you would send this to a backend service
            alert('Thank you for your interest! We\'ll be in touch soon about early access to YieldScope.');
            
            // Reset form
            this.reset();
        });
    }
    
    // Add animation on scroll (simple fade-in effect)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe feature cards and other elements
    const animatedElements = document.querySelectorAll('.feature-card, .about-content, .contact-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add active nav link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    highlightNavLink = function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            // Remove any active class and inline styles
            link.classList.remove('nav-active');
            link.style.color = '';
            if (link.getAttribute('href') === `#${current}`) {
                // Add active class instead of inline styles
                link.classList.add('nav-active');
            }
        });
    };

    window.addEventListener('scroll', highlightNavLink);
    
    // Call once initially to set proper state
    highlightNavLink();
    
    // Clear any problematic inline styles on navigation links
    navLinks.forEach(link => {
        link.style.color = '';
    });
    
    // Logo error handling
    const logoLight = document.getElementById('logo-light');
    const logoDark = document.getElementById('logo-dark');
    
    if (logoLight) {
        logoLight.addEventListener('error', function() {
            console.warn('Light logo failed to load');
            // Fallback to text logo
            this.style.display = 'none';
            this.parentElement.innerHTML += '<h2 style="color: var(--accent-color); font-size: 1.8rem; font-weight: 700;">YieldScope</h2>';
        });
    }
    
    if (logoDark) {
        logoDark.addEventListener('error', function() {
            console.warn('Dark logo failed to load');
            // Fallback handled by light logo error handler
        });
    }
    
    // Keyboard accessibility for theme toggle
    document.addEventListener('keydown', function(e) {
        // Alt + T to toggle theme
        if (e.altKey && e.key === 't') {
            e.preventDefault();
            toggleTheme();
        }
    });
    
    // System theme preference detection
    if (window.matchMedia && !localStorage.getItem('theme')) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        
        if (prefersDark.matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
            updateThemeToggle('dark');
        }
        
        // Listen for changes in system preference
        prefersDark.addEventListener('change', function(e) {
            if (!localStorage.getItem('theme')) {
                const newTheme = e.matches ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', newTheme);
                updateThemeToggle(newTheme);
            }
        });
    }
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
});

// Newsletter signup functionality (placeholder)
function subscribeNewsletter(email) {
    // This would connect to your email service provider
    console.log('Newsletter signup for:', email);
    trackEvent('newsletter_signup', { email: email });
    return Promise.resolve('Success');
}

// Analytics tracking (placeholder for Google Analytics)
function trackEvent(eventName, eventData) {
    // Google Analytics tracking would go here
    console.log('Event tracked:', eventName, eventData);
    
    // Example: gtag('event', eventName, eventData);
}

// Performance monitoring
window.addEventListener('load', function() {
    // Track page load time
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log('Page load time:', loadTime + 'ms');
    
    // Track to analytics
    trackEvent('page_load_time', { 
        value: loadTime,
        theme: document.documentElement.getAttribute('data-theme')
    });
}); 