// Mobile-First JavaScript for Mahalingeshwara Temple Website

// ======================
// MOBILE NAVIGATION
// ======================

function toggleNav() {
    const navLinks = document.getElementById('nav-links');
    const navToggle = document.querySelector('.nav-toggle');
    
    navLinks.classList.toggle('active');
    
    // Animate hamburger icon
    if (navLinks.classList.contains('active')) {
        navToggle.innerHTML = '✕';
        navToggle.style.transform = 'rotate(180deg)';
        // Prevent body scroll when menu is open on mobile
        document.body.style.overflow = 'hidden';
    } else {
        navToggle.innerHTML = '☰';
        navToggle.style.transform = 'rotate(0deg)';
        document.body.style.overflow = 'auto';
    }
}

function closeNav() {
    const navLinks = document.getElementById('nav-links');
    const navToggle = document.querySelector('.nav-toggle');
    
    navLinks.classList.remove('active');
    navToggle.innerHTML = '☰';
    navToggle.style.transform = 'rotate(0deg)';
    document.body.style.overflow = 'auto';
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.getElementById('nav-links');
    
    if (!navbar.contains(event.target) && navLinks.classList.contains('active')) {
        closeNav();
    }
});

// Close mobile menu on window resize (when switching to desktop)
window.addEventListener('resize', function() {
    if (window.innerWidth >= 768) {
        closeNav();
    }
});

// ======================
// RITUAL CARDS TOGGLE
// ======================

function toggleRitual(card) {
    const details = card.querySelector('.ritual-details');
    const allCards = document.querySelectorAll('.ritual-card');
    
    // Close all other ritual cards
    allCards.forEach(otherCard => {
        if (otherCard !== card) {
            const otherDetails = otherCard.querySelector('.ritual-details');
            otherDetails.classList.remove('active');
            otherCard.classList.remove('expanded');
        }
    });
    
    // Toggle current card
    details.classList.toggle('active');
    card.classList.toggle('expanded');
    
    // Smooth scroll to card on mobile
    if (details.classList.contains('active') && window.innerWidth < 768) {
        setTimeout(() => {
            card.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 100);
    }
}

// ======================
// SMOOTH SCROLLING
// ======================

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                // Close mobile menu if open
                closeNav();
                
                // Smooth scroll with mobile optimization
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ======================
// VIDEO BACKGROUND OPTIMIZATION
// ======================

document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.video-background video');
    
    if (video) {
        // Mobile video optimization
        if (window.innerWidth < 768) {
            video.style.objectPosition = 'center center';
        }
        
        // Handle video loading errors
        video.addEventListener('error', function() {
            console.log('Video failed to load, applying fallback background');
            document.querySelector('.video-background').style.background = 
                'linear-gradient(135deg, #8b4513, #a0522d)';
        });
        
        // Pause video when not visible (performance optimization)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play().catch(e => console.log('Video autoplay failed'));
                } else if (window.innerWidth < 768) {
                    // Only pause on mobile to save battery
                    video.pause();
                }
            });
        });
        
        observer.observe(video);
        
        // Mobile battery optimization - pause video after 30 seconds on mobile
        if (window.innerWidth < 768) {
            setTimeout(() => {
                video.pause();
                video.style.opacity = '0.7';
            }, 30000);
        }
    }
});

// ======================
// SCROLL ANIMATIONS
// ======================

// Intersection Observer for fade-in animations
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

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set initial state for fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });
    
    // Staggered animation for stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
});

// ======================
// NAVBAR SCROLL BEHAVIOR
// ======================

let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add background opacity on scroll
    if (scrollTop > 50) {
        navbar.style.background = 'rgba(139, 69, 19, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
    } else {
        navbar.style.background = 'rgba(139, 69, 19, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    // Hide/show navbar on mobile scroll (optional)
    if (window.innerWidth < 768) {
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
    }
    
    lastScrollTop = scrollTop;
}, { passive: true });

// ======================
// TOUCH INTERACTIONS (Mobile)
// ======================

// Add touch feedback for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    const interactiveElements = document.querySelectorAll('.ritual-card, .stat-card, .info-card, .btn');
    
    interactiveElements.forEach(element => {
        // Touch start
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
            this.style.transition = 'transform 0.1s ease';
        }, { passive: true });
        
        // Touch end
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
                this.style.transition = 'all 0.3s ease';
            }, 100);
        }, { passive: true });
    });
});

// ======================
// LAZY LOADING IMAGES
// ======================

document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Trigger loading
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
});

// ======================
// PERFORMANCE OPTIMIZATIONS
// ======================

// Debounce function for scroll events
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

// Throttle function for resize events
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

// ======================
// ACCESSIBILITY ENHANCEMENTS
// ======================

document.addEventListener('DOMContentLoaded', function() {
    // Keyboard navigation for ritual cards
    const ritualCards = document.querySelectorAll('.ritual-card');
    
    ritualCards.forEach(card => {
        // Make cards focusable
        card.setAttribute('tabindex', '0');
        
        // Keyboard event listener
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleRitual(this);
            }
        });
    });
    
    // Skip to main content link (for screen readers)
    const skipLink = document.createElement('a');
    skipLink.href = '#about';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #8b4513;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1001;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
});

// ======================
// ERROR HANDLING & FALLBACKS
// ======================

// Handle JavaScript errors gracefully
window.addEventListener('error', function(e) {
    console.log('JavaScript error:', e.error);
    // Ensure basic functionality still works
    const navToggle = document.querySelector('.nav-toggle');
    if (navToggle && !navToggle.onclick) {
        navToggle.onclick = function() {
            const navLinks = document.getElementById('nav-links');
            navLinks.style.display = navLinks.style.display === 'block' ? 'none' : 'block';
        };
    }
});

// ======================
// INITIALIZATION
// ======================

// Initialize everything when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🕉️ Mahalingeshwara Temple website loaded successfully');
    
    // Add loaded class to body for CSS animations
    document.body.classList.add('js-loaded');
    
    // Initialize any additional mobile-specific features
    if (window.innerWidth < 768) {
        // Mobile-specific initializations
        console.log('📱 Mobile optimizations active');
        
        // Reduce motion for users who prefer it
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.classList.add('reduce-motion');
        }
    }
});

// ======================
// SERVICE WORKER (Optional)
// ======================

// Register service worker for offline functionality (uncomment if needed)
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
*/