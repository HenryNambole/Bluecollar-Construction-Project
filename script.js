// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const nav = document.getElementById('nav');

mobileMenuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});

// FAQ Toggle Function
function toggleFAQ(button) {
    const answer = button.nextElementSibling;
    const isActive = button.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-question').forEach(q => {
        q.classList.remove('active');
        q.nextElementSibling.classList.remove('active');
    });
    
    // If this item wasn't active, open it
    if (!isActive) {
        button.classList.add('active');
        answer.classList.add('active');
    }
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        company: formData.get('company')
    };
    
    // Validate form
    if (!validateForm(data)) {
        return;
    }
    
    // Simulate form submission
    submitForm(data);
});

function validateForm(data) {
    const errors = [];
    
    // Name validation
    if (!data.name || data.name.length < 2) {
        errors.push('Please enter a valid name (at least 2 characters)');
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    // Phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!data.phone || !phoneRegex.test(data.phone.replace(/\s/g, ''))) {
        errors.push('Please enter a valid phone number');
    }
    
    if (errors.length > 0) {
        alert('Please fix the following errors:\n' + errors.join('\n'));
        return false;
    }
    
    return true;
}

function submitForm(data) {
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Show success message
        alert('Thank you for your inquiry! We will get back to you within 24 hours.');
        
        // In a real application, you would send the data to your server
        console.log('Form submitted with data:', data);
    }, 2000);
}

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

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = 'white';
        header.style.backdropFilter = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.service-card, .testimonial-card, .legacy-text, .hero-text'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Call to action buttons
document.querySelectorAll('.btn-primary, .btn-cta').forEach(button => {
    if (button.textContent.includes('Schedule') || button.textContent.includes('Consultation')) {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            // Scroll to contact form
            document.getElementById('contact').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
});

// Phone number formatting
const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 10) {
            value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        }
        e.target.value = value;
    });
});

// Testimonial slider functionality (if needed for mobile)
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

function showTestimonial(index) {
    if (window.innerWidth <= 768) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }
}

// Initialize testimonial display for mobile
function initTestimonials() {
    if (window.innerWidth <= 768) {
        showTestimonial(0);
        
        // Add navigation dots
        const testimonialsSection = document.querySelector('.testimonials-section');
        const dots = document.createElement('div');
        dots.className = 'testimonial-dots';
        dots.style.textAlign = 'center';
        dots.style.marginTop = '2rem';
        
        testimonials.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'testimonial-dot';
            dot.style.cssText = `
                width: 12px; height: 12px; border-radius: 50%;
                border: none; margin: 0 5px; cursor: pointer;
                background-color: ${i === 0 ? 'var(--primary-orange)' : '#ccc'};
                transition: background-color 0.3s ease;
            `;
            dot.addEventListener('click', () => {
                showTestimonial(i);
                currentTestimonial = i;
                updateDots();
            });
            dots.appendChild(dot);
        });
        
        testimonialsSection.appendChild(dots);
    }
}

function updateDots() {
    const dots = document.querySelectorAll('.testimonial-dot');
    dots.forEach((dot, i) => {
        dot.style.backgroundColor = i === currentTestimonial ? 'var(--primary-orange)' : '#ccc';
    });
}

// Auto-advance testimonials on mobile
setInterval(() => {
    if (window.innerWidth <= 768) {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
        updateDots();
    }
}, 5000);

// Initialize on load and resize
window.addEventListener('load', initTestimonials);
window.addEventListener('resize', initTestimonials);

// Performance optimization: Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Error handling for missing elements
function safeQuerySelector(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        console.warn(`Element not found: ${selector}`);
    }
    return element;
}

// Use safe query selector for critical elements
const criticalElements = ['#contactForm', '#nav', '#mobileMenuToggle'];
criticalElements.forEach(selector => {
    const element = safeQuerySelector(selector);
    if (!element) {
        console.error(`Critical element missing: ${selector}`);
    }
});

// Service worker registration for offline capability (if needed)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Register service worker when available
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Analytics tracking (placeholder for real implementation)
function trackEvent(eventName, eventData) {
    // Replace with your analytics implementation
    console.log('Event tracked:', eventName, eventData);
}

// Track important user interactions
document.addEventListener('click', (e) => {
    if (e.target.matches('.btn-primary, .btn-cta')) {
        trackEvent('cta_click', {
            button_text: e.target.textContent,
            section: e.target.closest('section')?.className || 'unknown'
        });
    }
});

// Track form submissions
contactForm?.addEventListener('submit', () => {
    trackEvent('form_submission', {
        form: 'contact_form'
    });
});

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('BlueCollar website loaded successfully');
    
    // Add any initialization code here
    initTestimonials();
    
    // Add loading animation to elements
    const elementsToAnimate = document.querySelectorAll(
        '.hero-text, .service-card, .testimonial-card'
    );
    
    elementsToAnimate.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });
});


 
function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('active');
}
