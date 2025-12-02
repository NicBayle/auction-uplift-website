// ===========================
// Lenis Smooth Scroll
// ===========================

const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Update Lenis on window resize
window.addEventListener('resize', () => {
    lenis.resize();
});

// ===========================
// Navigation Functionality
// ===========================

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ===========================
// FAQ Accordion
// ===========================

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all FAQ items
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ===========================
// Contact Form Handling
// ===========================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Basic validation
    if (!data.name || !data.organization || !data.email || !data.message) {
        showFormMessage('Please fill in all required fields.', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
    }

    // Simulate form submission (replace with actual backend endpoint)
    try {
        // In production, replace this with actual API call
        // const response = await fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // });

        // Simulate successful submission
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Show success message
        showFormMessage(
            'Thank you for your inquiry! We will get back to you within 24 hours.',
            'success'
        );

        // Reset form
        contactForm.reset();

        // Log form data to console (for demonstration)
        console.log('Form submitted with data:', data);

    } catch (error) {
        showFormMessage(
            'An error occurred. Please try again or contact us directly at info@auctionuplift.com',
            'error'
        );
        console.error('Form submission error:', error);
    }
});

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';

    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);

    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ===========================
// Smooth Scroll for Anchor Links (Lenis Integration)
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Only prevent default for internal links
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                lenis.scrollTo(offsetTop, {
                    duration: 1.5,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
            }
        }
    });
});

// ===========================
// Intersection Observer for Animations (Scroll direction aware)
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

// Separate observer for portfolio items - triggers earlier
const portfolioObserverOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px 100px 0px'  // Triggers 100px before entering viewport
};

// Track scroll direction
let lastScrollY = window.pageYOffset;
let scrollingDown = true;

window.addEventListener('scroll', () => {
    const currentScrollY = window.pageYOffset;
    scrollingDown = currentScrollY > lastScrollY;
    lastScrollY = currentScrollY;
}, { passive: true });

// Observer that only animates when scrolling down
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const rect = entry.target.getBoundingClientRect();
        const isAboveViewport = rect.bottom < 0;

        if (entry.isIntersecting && scrollingDown) {
            // Animate when entering viewport while scrolling down
            entry.target.classList.remove('scrolled-past');
            entry.target.classList.add('animate-in');
        } else if (!entry.isIntersecting && !scrollingDown && isAboveViewport) {
            // Only reset when scrolling up AND element is above viewport
            entry.target.classList.remove('animate-in');
            entry.target.classList.add('scrolled-past');
        } else if (!entry.isIntersecting && entry.target.classList.contains('animate-in')) {
            // When element leaves viewport (any direction), mark as scrolled-past
            entry.target.classList.add('scrolled-past');
        }
    });
}, observerOptions);

const portfolioObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const rect = entry.target.getBoundingClientRect();
        const isAboveViewport = rect.bottom < 0;

        if (entry.isIntersecting && scrollingDown) {
            // Animate when entering viewport while scrolling down
            entry.target.classList.remove('scrolled-past');
            entry.target.classList.add('animate-in');
        } else if (!entry.isIntersecting && !scrollingDown && isAboveViewport) {
            // Only reset when scrolling up AND element is above viewport
            entry.target.classList.remove('animate-in');
            entry.target.classList.add('scrolled-past');
        } else if (!entry.isIntersecting && entry.target.classList.contains('animate-in')) {
            // When element leaves viewport (any direction), mark as scrolled-past
            entry.target.classList.add('scrolled-past');
        }
    });
}, portfolioObserverOptions);

// Observe elements for animation
const serviceCards = document.querySelectorAll('.service-card');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const timelineItems = document.querySelectorAll('.timeline-item');
const testimonialCards = document.querySelectorAll('.testimonial-card');

serviceCards.forEach(el => observer.observe(el));
portfolioItems.forEach(el => portfolioObserver.observe(el));  // Use faster observer
timelineItems.forEach(el => observer.observe(el));
testimonialCards.forEach(el => observer.observe(el));

// ===========================
// Dynamic Year in Footer
// ===========================

const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    footerYear.innerHTML = `&copy; ${currentYear} Auction Uplift. All rights reserved.`;
}

// ===========================
// Image Lazy Loading Fallback
// ===========================

if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ===========================
// Placeholder Images
// ===========================

// Create placeholder images for portfolio and about sections
function createPlaceholderImage(element, width, height, text) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#e04f9a');
    gradient.addColorStop(1, '#8bc4ff');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Text
    ctx.fillStyle = '#1f2f4a';
    ctx.font = 'bold 24px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, height / 2);

    return canvas.toDataURL();
}

// Set placeholder images on page load
window.addEventListener('DOMContentLoaded', () => {
    const portfolioImages = document.querySelectorAll('.portfolio-image img');
    portfolioImages.forEach((img, index) => {
        if (!img.src || img.src.includes('portfolio-')) {
            img.src = createPlaceholderImage(img, 800, 600, `Portfolio ${index + 1}`);
        }
    });

    const aboutImage = document.querySelector('.about-image img');
    if (aboutImage && (!aboutImage.src || aboutImage.src.includes('miranda.jpg'))) {
        aboutImage.src = createPlaceholderImage(aboutImage, 600, 800, 'Miranda Bayle');
    }
});

// ===========================
// Performance Monitoring
// ===========================

// Log page performance
window.addEventListener('load', () => {
    if ('performance' in window) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page load time: ${pageLoadTime}ms`);
    }
});

// ===========================
// Accessibility Enhancements
// ===========================

// Add keyboard navigation for FAQ
faqItems.forEach((item, index) => {
    const question = item.querySelector('.faq-question');
    question.setAttribute('role', 'button');
    question.setAttribute('aria-expanded', 'false');
    question.setAttribute('tabindex', '0');

    question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            question.click();
        }
    });

    // Update aria-expanded
    const observer = new MutationObserver(() => {
        const isExpanded = item.classList.contains('active');
        question.setAttribute('aria-expanded', isExpanded);
    });

    observer.observe(item, { attributes: true, attributeFilter: ['class'] });
});

// ===========================
// Console Message
// ===========================

console.log('%c Auction Uplift ', 'background: #e04f9a; color: #0d182a; font-size: 20px; padding: 10px;');
console.log('%c Website built to deliver exceptional fundraising experiences ', 'color: #8bc4ff; font-size: 12px;');



