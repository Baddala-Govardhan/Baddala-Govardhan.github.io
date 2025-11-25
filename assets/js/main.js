// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling
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

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
const toggleNavbarBackground = () => {
    if (!navbar) return;
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
};

window.addEventListener('scroll', toggleNavbarBackground);
toggleNavbarBackground();

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // You can integrate with a form service like Formspree, EmailJS, etc.
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const initPageAnimations = () => {
    const animateElements = document.querySelectorAll('.project-card, .skill-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Hero typing effect
    const typingElement = document.querySelector('.hero-typing');
    if (typingElement) {
        const roles = [
            'Software Engineer',
            'Machine Learning Engineer',
            'Data Scientist'
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            const currentRole = roles[roleIndex];

            if (!isDeleting && charIndex <= currentRole.length) {
                typingElement.textContent = currentRole.substring(0, charIndex);
                charIndex++;
            } else if (isDeleting && charIndex >= 0) {
                typingElement.textContent = currentRole.substring(0, charIndex);
                charIndex--;
            }

            if (!isDeleting && charIndex === currentRole.length + 1) {
                isDeleting = true;
                setTimeout(type, pauseDuration);
                return;
            }

            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }

            const typingSpeed = isDeleting ? deletingSpeed : typingSpeedFast;
            setTimeout(type, typingSpeed);
        };

        const pauseDuration = 1200;
        const typingSpeedFast = 140;
        const deletingSpeed = 80;

        type();
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPageAnimations);
} else {
    initPageAnimations();
}
