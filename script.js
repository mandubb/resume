// Modern Resume JavaScript Functions - Enhanced & Mobile Optimized

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize all website functionality
function initializeWebsite() {
    setupSmoothScrolling();
    setupMobileMenu();
    setupSkillAnimations();
    setupNavbarEffects();
    setupScrollAnimations();
    setupFormHandling();
    setupButtonEffects();
    setupHeroAnimations();
    setupParallaxEffects();
    logWelcomeMessage();
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                const hamburger = document.querySelector('.hamburger');
                if (navMenu && hamburger) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
                
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Mobile menu toggle with enhanced functionality
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Enhanced skill bar animations with intersection observer
function setupSkillAnimations() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    if (skillBars.length === 0) return;

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                if (width) {
                    // Add a small delay for better visual effect
                    setTimeout(() => {
                        skillBar.style.width = width + '%';
                    }, 200);
                }
                skillObserver.unobserve(skillBar);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Enhanced navbar effects with scroll direction detection
function setupNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScrollY = window.scrollY;
    let scrollTimeout;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Background and shadow effects
        if (currentScrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }

        // Hide/show navbar on scroll (desktop only)
        if (window.innerWidth > 768) {
            clearTimeout(scrollTimeout);
            
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }

            scrollTimeout = setTimeout(() => {
                navbar.style.transform = 'translateY(0)';
            }, 1000);
        }

        lastScrollY = currentScrollY;
    });
}

// Enhanced scroll animations with better performance
function setupScrollAnimations() {
    const animateElements = document.querySelectorAll('.skill, .soft-skill, .timeline-item, .contact-card, .reference-card, .strength-item, .info-item');
    
    if (animateElements.length === 0) return;

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animations for better visual effect
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animationObserver.observe(el);
    });
}

// Enhanced form handling with better validation
function setupFormHandling() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const resetLoading = addButtonLoading(submitBtn);
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name')?.trim();
        const email = formData.get('email')?.trim();
        const subject = formData.get('subject')?.trim();
        const message = formData.get('message')?.trim();
        
        // Enhanced validation
        const validation = validateContactForm(name, email, subject, message);
        if (!validation.isValid) {
            resetLoading();
            showNotification(validation.message, 'error');
            return;
        }
        
        // Simulate form submission with realistic delay
        setTimeout(() => {
            resetLoading();
            showNotification('Message sent successfully! I will get back to you soon.', 'success');
            this.reset();
            
            // Optional: Send to actual backend
            // sendFormData({ name, email, subject, message });
        }, 2000);
    });
}

// Enhanced form validation
function validateContactForm(name, email, subject, message) {
    if (!name || name.length < 2) {
        return { isValid: false, message: 'Please enter a valid name (minimum 2 characters)' };
    }
    
    if (!email) {
        return { isValid: false, message: 'Please enter your email address' };
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { isValid: false, message: 'Please enter a valid email address' };
    }
    
    if (!subject || subject.length < 3) {
        return { isValid: false, message: 'Please enter a subject (minimum 3 characters)' };
    }
    
    if (!message || message.length < 10) {
        return { isValid: false, message: 'Please enter a message (minimum 10 characters)' };
    }
    
    return { isValid: true, message: 'Valid' };
}

// Enhanced button effects
function setupButtonEffects() {
    const buttons = document.querySelectorAll('.btn, .contact-btn');
    
    buttons.forEach(button => {
        // Add ripple effect
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                z-index: 1;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        });
    });
    
    // Add ripple animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Enhanced hero animations
function setupHeroAnimations() {
    const heroTitle = document.querySelector('.hero-left h1');
    if (!heroTitle) return;

    // Typing effect with better performance
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        } else {
            // Add cursor blink effect
            const cursor = document.createElement('span');
            cursor.textContent = '|';
            cursor.style.animation = 'blink 1s infinite';
            heroTitle.appendChild(cursor);
            
            // Remove cursor after 3 seconds
            setTimeout(() => {
                if (cursor.parentNode) {
                    cursor.remove();
                }
            }, 3000);
        }
    };
    
    // Start typing after page load
    setTimeout(typeWriter, 1000);
    
    // Add blink animation
    const blinkStyle = document.createElement('style');
    blinkStyle.textContent = `
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
    `;
    document.head.appendChild(blinkStyle);
}

// Enhanced parallax effects with performance optimization
function setupParallaxEffects() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    // Only enable parallax on desktop
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', requestTick);
    }
    
    // Disable parallax on mobile for better performance
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            window.removeEventListener('scroll', requestTick);
            hero.style.transform = 'none';
        } else {
            window.addEventListener('scroll', requestTick);
        }
    });
}

// Hero button functions
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function scrollToAbout() {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        aboutSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function downloadResume() {
    const link = document.createElement('a');
    link.href = '#'; // Replace with actual PDF URL
    link.download = 'Christian_Angelo_Arias_Resume.pdf';
    
    showNotification('Resume download will be available soon! Please contact me directly.', 'info');
    
    // Uncomment when you have an actual PDF file:
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
}

// Contact button functions
function sendEmail() {
    const email = 'angeloarias007@gmail.com';
    const subject = 'Job Opportunity - Christian Angelo Arias';
    const body = 'Hello Christian Angelo,\n\nI am interested in discussing a potential opportunity with you.\n\nBest regards,';
    
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    try {
        window.location.href = mailtoLink;
        showNotification('Opening email client...', 'info');
    } catch (error) {
        // Fallback for mobile devices
        showNotification('Please email me at: angeloarias007@gmail.com', 'info');
    }
}

function callNow() {
    const phoneNumber = '+639483651112';
    
    try {
        window.location.href = `tel:${phoneNumber}`;
        showNotification('Initiating phone call...', 'info');
    } catch (error) {
        showNotification('Please call: +63 948 365 1112', 'info');
    }
}

function openLinkedIn() {
    const url = 'https://www.linkedin.com/in/christian-angelo-arias-1177862b6/';
    window.open(url, '_blank', 'noopener,noreferrer');
}

function openGitHub() {
    const url = 'https://github.com/mandubb';
    window.open(url, '_blank', 'noopener,noreferrer');
}

function viewLocation() {
    const address = 'Legazpi Compound, Sampaloc III, Dasmariñas, Cavite, Philippines';
    const encodedAddress = encodeURIComponent(address);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(mapsUrl, '_blank', 'noopener,noreferrer');
}

// Footer functions
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Enhanced loading animation for buttons
function addButtonLoading(button) {
    if (!button) return () => {};
    
    const originalContent = button.innerHTML;
    const originalDisabled = button.disabled;
    
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Loading...</span>';
    button.disabled = true;
    button.style.pointerEvents = 'none';
    
    return function resetLoading() {
        button.innerHTML = originalContent;
        button.disabled = originalDisabled;
        button.style.pointerEvents = '';
    };
}

// Enhanced notification system with better UX
function showNotification(message, type = 'info', duration = 5000) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Icon based on type
    let icon = 'fas fa-info-circle';
    if (type === 'success') icon = 'fas fa-check-circle';
    if (type === 'error') icon = 'fas fa-exclamation-circle';
    if (type === 'warning') icon = 'fas fa-exclamation-triangle';
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="${icon}"></i>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="notification-progress"></div>
    `;
    
    // Enhanced styles
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease, fadeOut 0.3s ease ${duration - 300}ms forwards;
        max-width: 400px;
        min-width: 280px;
        font-family: 'Poppins', sans-serif;
        overflow: hidden;
    `;
    
    // Add enhanced styles
    const style = document.createElement('style');
    style.textContent = `
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        .notification-content i:first-child {
            font-size: 1.1rem;
            flex-shrink: 0;
        }
        .notification-message {
            flex: 1;
            font-size: 0.9rem;
            line-height: 1.4;
        }
        .notification-close {
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s;
            flex-shrink: 0;
        }
        .notification-close:hover {
            background: rgba(255, 255, 255, 0.3);
        }
        .notification-progress {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 3px;
            background: rgba(255, 255, 255, 0.3);
            animation: progress ${duration}ms linear forwards;
        }
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes fadeOut {
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }
        @keyframes progress {
            from { width: 100%; }
            to { width: 0%; }
        }
    `;
    
    if (!document.querySelector('#notification-styles')) {
        style.id = 'notification-styles';
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, duration);
    
    // Handle mobile positioning
    if (window.innerWidth <= 480) {
        notification.style.cssText += `
            top: 10px;
            right: 10px;
            left: 10px;
            max-width: none;
        `;
    }
}

// Performance optimization: Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Enhanced error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // Don't show error notifications to users, but log for debugging
});

// Handle offline/online status
window.addEventListener('online', function() {
    showNotification('Connection restored!', 'success', 3000);
});

window.addEventListener('offline', function() {
    showNotification('You are currently offline', 'warning', 5000);
});

// Lazy loading for images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Console welcome message
function logWelcomeMessage() {
    console.log(`
🌟 Welcome to Christian Angelo's Resume Website! 🌟
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👨‍💻 Software Developer & IT Professional
📧 angeloarias007@gmail.com
📱 +639483651112
🎓 TUP Cavite

This website features:
• Fully Responsive Design
• Modern Animations & Interactions
• Progressive Enhancement
• Accessibility Features
• Performance Optimizations

Built with ❤️ using vanilla JavaScript
Feel free to explore and get in touch! 🚀

Version: 2.0 - Enhanced & Mobile Optimized
    `);
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setupLazyLoading();
});

// Export functions for external use (if needed)
window.resumeApp = {
    scrollToContact,
    scrollToAbout,
    downloadResume,
    sendEmail,
    callNow,
    openLinkedIn,
    openGitHub,
    viewLocation,
    scrollToTop,
    showNotification
};
