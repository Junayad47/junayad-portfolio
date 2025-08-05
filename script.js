// Loading screen
window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.style.opacity = '0';
        setTimeout(() => {
            loading.style.display = 'none';
        }, 500);
    }, 1000);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
    }
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Skill bars animation with improved precision
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const targetWidth = bar.getAttribute('data-width');
            
            // Reset width
            bar.style.width = '0%';
            
            // Animate to target width
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, 200);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// Mobile menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Contact form submission - Simple mailto approach
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const subject = formData.get('subject').trim();
    const message = formData.get('message').trim();
    
    // Validate form
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Create mailto link with better formatting
    const emailBody = `Name: ${name}
Email: ${email}

Message:
${message}

---
Sent from Portfolio Contact Form`;
    
    const mailtoLink = `mailto:Junayadjnd47@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    showNotification('Thank you for your message! Your email client should open now.', 'success');
    
    // Reset form after a delay
    setTimeout(() => {
        contactForm.reset();
    }, 1000);
});

// Notification system
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Typing animation for hero subtitle
const subtitle = document.querySelector('.hero .subtitle');
if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    setTimeout(typeWriter, 2000);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Dynamic stats counter animation
const statsNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const target = element.textContent;
            const isPercentage = target.includes('%');
            const numericValue = parseInt(target.replace(/\D/g, ''));
            
            // Animate counter
            let current = 0;
            const increment = numericValue / 50; // 50 steps
            const timer = setInterval(() => {
                current += increment;
                if (current >= numericValue) {
                    current = numericValue;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current) + (isPercentage ? '%' : '+');
            }, 40);
            
            // Unobserve after animation
            statsObserver.unobserve(element);
        }
    });
}, { threshold: 0.5 });

statsNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// Add active navigation highlighting
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Add CSS for active nav items
const navActiveStyle = document.createElement('style');
navActiveStyle.textContent = `
    .nav-links a.active {
        color: var(--primary-color);
    }
    
    .nav-links a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(navActiveStyle);

// Smooth reveal animations for project cards
const projectCards = document.querySelectorAll('.project-card');
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    projectObserver.observe(card);
});

// Form input enhancements
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
formInputs.forEach(input => {
    // Add floating labels effect
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
    
    // Real-time validation feedback
    input.addEventListener('input', () => {
        validateField(input);
    });
});

// Form field validation
function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error styling
    field.classList.remove('error');
    const existingError = field.parentElement.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Validation rules
    switch(fieldType) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value && !emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
        case 'text':
            if (field.hasAttribute('required') && !value) {
                isValid = false;
                errorMessage = 'This field is required';
            }
            break;
        default:
            if (field.hasAttribute('required') && !value) {
                isValid = false;
                errorMessage = 'This field is required';
            }
    }
    
    // Show error if invalid
    if (!isValid) {
        field.classList.add('error');
        const errorElement = document.createElement('span');
        errorElement.className = 'field-error';
        errorElement.textContent = errorMessage;
        errorElement.style.cssText = `
            color: #ff6b6b;
            font-size: 0.8rem;
            margin-top: 0.25rem;
            display: block;
        `;
        field.parentElement.appendChild(errorElement);
    }
    
    return isValid;
}

// Add error styling to CSS
const errorStyles = document.createElement('style');
errorStyles.textContent = `
    .form-group input.error,
    .form-group textarea.error {
        border: 2px solid #ff6b6b;
        background: rgba(255, 107, 107, 0.1);
    }
    
    .form-group.focused label {
        color: var(--primary-color);
        transform: translateY(-5px);
        font-size: 0.9rem;
    }
`;
document.head.appendChild(errorStyles);

// Dynamic copyright year
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer p');
if (footerText) {
    footerText.innerHTML = `&copy; ${currentYear} Junayad Bin Forhad. All rights reserved. Built with passion and dedication.`;
}

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        navLinks.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
    
    // Enter key on buttons
    if (e.key === 'Enter' && e.target.classList.contains('btn')) {
        e.target.click();
    }
});

// Add accessibility improvements
function initAccessibility() {
    // Add ARIA labels to social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        const title = link.getAttribute('title');
        if (title) {
            link.setAttribute('aria-label', title);
        }
    });
    
    // Add focus indicators
    const focusableElements = document.querySelectorAll('a, button, input, textarea, [tabindex]');
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid var(--primary-color)';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = '';
            element.style.outlineOffset = '';
        });
    });
}

// Initialize accessibility features
initAccessibility();

// Performance optimization - Lazy load animations
const performanceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add staggered animation for skill items
            if (entry.target.classList.contains('skill-category')) {
                const skillItems = entry.target.querySelectorAll('.skill-item');
                skillItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, index * 100);
                });
            }
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-category').forEach(category => {
    const skillItems = category.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.5s ease';
    });
    performanceObserver.observe(category);
});

// Add smooth page transitions
function initPageTransitions() {
    // Add loading state for external links
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', (e) => {
            // Add loading indicator for external links
            const icon = link.querySelector('i');
            if (icon) {
                const originalClass = icon.className;
                icon.className = 'fas fa-spinner fa-spin';
                setTimeout(() => {
                    icon.className = originalClass;
                }, 2000);
            }
        });
    });
}

initPageTransitions();

// Add theme support (for future enhancement)
function initThemeSupport() {
    // Detect system theme preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Store theme preference
    const currentTheme = localStorage.getItem('theme') || (prefersDark.matches ? 'dark' : 'light');
    
    // Apply theme class to body (for future dark mode implementation)
    document.body.classList.add(`theme-${currentTheme}`);
}

// Initialize theme support (commented out for now, but ready for future use)
// initThemeSupport();

// Error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
        // Replace broken images with placeholder
        img.style.display = 'none';
        const placeholder = document.createElement('div');
        placeholder.className = 'image-placeholder';
        placeholder.innerHTML = '<i class="fas fa-image"></i>';
        placeholder.style.cssText = `
            width: 100%;
            height: 200px;
            background: var(--bg-light);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ccc;
            font-size: 2rem;
            border-radius: 10px;
        `;
        img.parentNode.insertBefore(placeholder, img);
    });
});

// Initialize all features when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully!');
    
    // Add a subtle entrance animation to the page
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Service Worker registration for offline support (future enhancement)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when service worker is implemented
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}