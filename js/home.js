/* ==========================================================================
   Enhanced Home page JavaScript
   ========================================================================== */

/* ---------- Typewriter Effect ---------- */
function initializeTypewriter() {
    const typedElement = document.getElementById('typed');
    if (!typedElement) return;
    
    const texts = [
        'Digital Solutions',
        'Web Experiences', 
        'Data Insights',
        'User Interfaces',
        'Business Value',
        'Innovative Ideas'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            // Deleting text
            typedElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Typing text
            typedElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            // Pause at the end of typing
            isPaused = true;
            setTimeout(() => {
                isPaused = false;
                isDeleting = true;
                type();
            }, 2000);
            return;
        }
        
        if (isDeleting && charIndex === 0) {
            // Move to next text when deleting is complete
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
        
        if (!isPaused) {
            const speed = isDeleting ? 50 : 100;
            setTimeout(type, speed);
        }
    }
    
    // Start typing after a short delay
    setTimeout(type, 1000);
}

/* ---------- Animated Counter ---------- */
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start animation when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

/* ---------- Floating Shapes Animation ---------- */
function initializeFloatingShapes() {
    const shapes = document.querySelectorAll('.floating-shape');
    
    shapes.forEach((shape, index) => {
        // Randomize initial positions and animations
        const randomX = Math.random() * 20 - 10;
        const randomY = Math.random() * 20 - 10;
        const randomDuration = 6 + Math.random() * 4;
        const randomDelay = Math.random() * 2;
        
        shape.style.setProperty('--random-x', `${randomX}px`);
        shape.style.setProperty('--random-y', `${randomY}px`);
        shape.style.animationDuration = `${randomDuration}s`;
        shape.style.animationDelay = `${randomDelay}s`;
    });
}

/* ---------- Scroll Animations ---------- */
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .project-card, .testimonial-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

/* ---------- Interactive Tech Icons ---------- */
function initializeTechIcons() {
    const techIcons = document.querySelectorAll('.tech-icon');
    
    techIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.2)';
            icon.style.filter = 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = '';
            icon.style.filter = 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))';
        });
    });
}

/* ---------- Smooth Scrolling ---------- */
function initializeSmoothScroll() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ---------- Parallax Effect ---------- */
function initializeParallax() {
    const heroSection = document.querySelector('.hero');
    const shapes = document.querySelectorAll('.floating-shape');
    
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            
            heroSection.style.transform = `translateY(${rate}px)`;
            
            // Parallax for shapes
            shapes.forEach((shape, index) => {
                const speed = 0.1 + (index * 0.05);
                shape.style.transform = `translateY(${rate * speed}px)`;
            });
        });
    }
}

/* ---------- Cursor Trail Effect ---------- */
function initializeCursorTrail() {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    document.body.appendChild(trail);
    
    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateTrail() {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        
        trail.style.left = trailX + 'px';
        trail.style.top = trailY + 'px';
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
    
    // Add trail styles
    const style = document.createElement('style');
    style.textContent = `
        .cursor-trail {
            position: fixed;
            width: 6px;
            height: 6px;
            background: var(--accent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0.7;
            transition: width 0.2s, height 0.2s;
        }
        .cursor-trail:hover {
            width: 12px;
            height: 12px;
        }
    `;
    document.head.appendChild(style);
}

/* ---------- Page Load Animations ---------- */
function initializePageLoad() {
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
    
    // Animate hero elements sequentially
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-description, .hero-stats, .hero-actions');
    
    heroElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
    });
}

/* ---------- Initialize Everything ---------- */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Enhanced Home page loaded successfully');
    
    initializeTypewriter();
    animateCounters();
    initializeFloatingShapes();
    initializeScrollAnimations();
    initializeTechIcons();
    initializeSmoothScroll();
    initializeParallax();
    initializeCursorTrail();
    initializePageLoad();
    
    // Add loading state
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-spinner"></div>
        <div class="loader-text">Loading awesome experience...</div>
    `;
    document.body.appendChild(loader);
    
    // Remove loader after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1000);
    });
    
    // Add loader styles
    const loaderStyle = document.createElement('style');
    loaderStyle.textContent = `
        .page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--bg);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        }
        .loader-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(11,132,255,0.3);
            border-top: 3px solid var(--accent);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 1rem;
        }
        .loader-text {
            color: var(--muted);
            font-size: 0.9rem;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(loaderStyle);
});

/* ---------- Export for Module Use ---------- */
// Uncomment if using ES6 modules
/*
export {
    initializeTypewriter,
    animateCounters,
    initializeScrollAnimations
};
*/