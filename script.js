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
    
    // Initialize form message animations
    addMessageAnimations();
    
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

// Form message display function
function showFormMessage(message, type = 'info') {
    // Remove any existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message form-message-${type}`;
    messageElement.textContent = message;
    
    // Style the message
    messageElement.style.cssText = `
        padding: 1rem 1.5rem;
        border-radius: 12px;
        margin-bottom: 2rem;
        font-weight: 500;
        font-size: 0.95rem;
        line-height: 1.5;
        animation: slideInFadeIn 0.3s ease-out;
        border: 1px solid;
        backdrop-filter: var(--backdrop-blur);
        -webkit-backdrop-filter: var(--backdrop-blur);
    `;
    
    // Set colors based on type
    if (type === 'success') {
        messageElement.style.backgroundColor = 'rgba(34, 197, 94, 0.1)';
        messageElement.style.borderColor = 'rgba(34, 197, 94, 0.3)';
        messageElement.style.color = 'var(--text-color)';
    } else if (type === 'error') {
        messageElement.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
        messageElement.style.borderColor = 'rgba(239, 68, 68, 0.3)';
        messageElement.style.color = 'var(--text-color)';
    } else {
        messageElement.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
        messageElement.style.borderColor = 'rgba(59, 130, 246, 0.3)';
        messageElement.style.color = 'var(--text-color)';
    }
    
    // Find form and insert message
    const form = document.querySelector('.partnership-form');
    if (form) {
        const formHeader = form.parentElement.querySelector('.form-header');
        if (formHeader) {
            formHeader.insertAdjacentElement('afterend', messageElement);
        } else {
            form.insertAdjacentElement('beforebegin', messageElement);
        }
    }
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            messageElement.style.animation = 'slideOutFadeOut 0.3s ease-in forwards';
            setTimeout(() => {
                if (messageElement.parentElement) {
                    messageElement.remove();
                }
            }, 300);
        }, 5000);
    }
}

// Success popup modal function
function showSuccessPopup(title, message, onClose = null) {
    // Remove any existing popup
    const existingPopup = document.querySelector('.success-popup-overlay');
    if (existingPopup) {
        existingPopup.remove();
    }
    
    // Create popup overlay
    const overlay = document.createElement('div');
    overlay.className = 'success-popup-overlay';
    
    // Create popup content
    const popup = document.createElement('div');
    popup.className = 'success-popup';
    
    popup.innerHTML = `
        <div class="success-popup-header">
            <div class="success-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="#22C55B" fill-opacity="0.1" stroke="#22C55B" stroke-width="2"/>
                    <path d="m9 12 2 2 4-4" stroke="#22C55B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <h3 class="success-title">${title}</h3>
            <button class="success-popup-close" aria-label="Close popup">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </button>
        </div>
        <div class="success-popup-body">
            <p class="success-message">${message}</p>
            <div class="success-popup-actions">
                <button class="success-popup-btn success-popup-primary">Got it!</button>
            </div>
        </div>
    `;
    
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
    
    // Add popup styles
    addPopupStyles();
    
    // Show popup with animation
    requestAnimationFrame(() => {
        overlay.classList.add('show');
    });
    
    // Close popup function
    const closePopup = () => {
        overlay.classList.remove('show');
        setTimeout(() => {
            if (overlay.parentElement) {
                overlay.remove();
            }
            if (onClose) onClose();
        }, 300);
    };
    
    // Event listeners
    const closeBtn = popup.querySelector('.success-popup-close');
    const primaryBtn = popup.querySelector('.success-popup-primary');
    const secondaryBtn = popup.querySelector('.success-popup-secondary');
    
    closeBtn.addEventListener('click', closePopup);
    primaryBtn.addEventListener('click', closePopup);
    
    // Only add event listener if secondary button exists
    if (secondaryBtn) {
        secondaryBtn.addEventListener('click', () => {
            closePopup();
            // Scroll to contact section
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closePopup();
        }
    });
    
    // Close on escape key
    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            closePopup();
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
    
    // Focus management for accessibility
    const firstButton = popup.querySelector('.success-popup-primary');
    if (firstButton) {
        firstButton.focus();
    }
    
    // Track popup display
    trackEvent('success_popup_shown', { title: title });
}

// Add popup styles
function addPopupStyles() {
    if (!document.querySelector('#success-popup-styles')) {
        const style = document.createElement('style');
        style.id = 'success-popup-styles';
        style.textContent = `
            .success-popup-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(8px);
                -webkit-backdrop-filter: blur(8px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                padding: 1rem;
            }
            
            .success-popup-overlay.show {
                opacity: 1;
                visibility: visible;
            }
            
            .success-popup {
                background: var(--card-bg);
                border: 1px solid var(--border-color);
                border-radius: 16px;
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
                max-width: 500px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                transform: scale(0.9) translateY(20px);
                transition: transform 0.3s ease;
                position: relative;
            }
            
            .success-popup-overlay.show .success-popup {
                transform: scale(1) translateY(0);
            }
            
            .success-popup-header {
                padding: 2rem 2rem 1rem;
                text-align: center;
                position: relative;
                border-bottom: 1px solid var(--border-color);
            }
            
            .success-icon {
                margin-bottom: 1rem;
                display: flex;
                justify-content: center;
            }
            
            .success-title {
                font-size: 1.5rem;
                font-weight: 700;
                color: var(--text-color);
                margin: 0;
                line-height: 1.3;
            }
            
            .success-popup-close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: none;
                border: none;
                padding: 0.5rem;
                cursor: pointer;
                color: var(--text-secondary);
                border-radius: 8px;
                transition: all 0.2s ease;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .success-popup-close:hover {
                background: var(--hover-bg);
                color: var(--text-color);
            }
            
            .success-popup-body {
                padding: 1.5rem 2rem 2rem;
            }
            
            .success-message {
                font-size: 1rem;
                line-height: 1.6;
                color: var(--text-secondary);
                margin: 0 0 2rem;
                text-align: center;
            }
            
            .success-popup-actions {
                display: flex;
                gap: 1rem;
                flex-direction: column;
            }
            
            .success-popup-btn {
                padding: 0.875rem 1.5rem;
                border-radius: 12px;
                font-weight: 600;
                font-size: 0.95rem;
                cursor: pointer;
                transition: all 0.2s ease;
                border: none;
                display: flex;
                align-items: center;
                justify-content: center;
                text-decoration: none;
                min-height: 48px;
            }
            
            .success-popup-primary {
                background: linear-gradient(135deg, var(--accent-color), #667eea);
                color: white;
                box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
            }
            
            .success-popup-primary:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
            }
            
            .success-popup-secondary {
                background: var(--card-bg);
                color: var(--text-color);
                border: 1px solid var(--border-color);
            }
            
            .success-popup-secondary:hover {
                background: var(--hover-bg);
                border-color: var(--accent-color);
            }
            
            @media (min-width: 480px) {
                .success-popup-actions {
                    flex-direction: row;
                }
                
                .success-popup-btn {
                    flex: 1;
                }
            }
            
            @media (max-width: 480px) {
                .success-popup {
                    margin: 1rem;
                    border-radius: 12px;
                }
                
                .success-popup-header {
                    padding: 1.5rem 1.5rem 1rem;
                }
                
                .success-popup-body {
                    padding: 1rem 1.5rem 1.5rem;
                }
                
                .success-title {
                    font-size: 1.25rem;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Add CSS animation keyframes for form messages
function addMessageAnimations() {
    if (!document.querySelector('#form-message-animations')) {
        const style = document.createElement('style');
        style.id = 'form-message-animations';
        style.textContent = `
            @keyframes slideInFadeIn {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes slideOutFadeOut {
                from {
                    opacity: 1;
                    transform: translateY(0);
                }
                to {
                    opacity: 0;
                    transform: translateY(-10px);
                }
            }
        `;
        document.head.appendChild(style);
    }
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


 