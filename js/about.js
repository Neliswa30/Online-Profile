/* ==========================================================================
   Enhanced About page JavaScript
   ========================================================================== */

/* ---------- Animated Counter ---------- */
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
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
        });
        
        observer.observe(counter);
    });
}

/* ---------- Interactive Profile Card ---------- */
function initializeProfileInteractions() {
    const profileCard = document.querySelector('.profile-card');
    const profileImage = document.querySelector('.profile-image');
    
    if (profileCard && profileImage) {
        // Add tilt effect on mouse move
        profileCard.addEventListener('mousemove', (e) => {
            const rect = profileCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 25;
            const rotateX = (centerY - y) / 25;
            
            profileCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        profileCard.addEventListener('mouseleave', () => {
            profileCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
        
        // Profile image click effect
        profileImage.addEventListener('click', () => {
            profileImage.style.transform = 'scale(1.1)';
            setTimeout(() => {
                profileImage.style.transform = 'scale(1)';
            }, 300);
        });
    }
}

/* ---------- Skill Progress Bars ---------- */
function initializeSkillBars() {
    const skills = [
        { name: 'Web Development', level: 90 },
        { name: 'JavaScript/React', level: 85 },
        { name: 'Power BI & Reporting', level: 80 },
        { name: 'UI/UX Design', level: 75 },
        { name: 'Data Analysis', level: 85 },
        { name: 'Problem Solving', level: 90 }
    ];
    
    const skillsContainer = document.querySelector('.expertise-section');
    if (!skillsContainer) return;
    
    // You can add dynamic skill bars here in the future
    console.log('Skills data loaded:', skills);
}

/* ---------- Typewriter Effect for Hero ---------- */
function initializeTypewriter() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;
    
    const texts = [
        'Where Code Meets Creativity & Data Tells Stories',
        'Building Digital Solutions That Make an Impact',
        'Transforming Ideas into Exceptional Experiences',
        'Bridging Technology and Business Needs'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            // Deleting text
            subtitle.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Typing text
            subtitle.textContent = currentText.substring(0, charIndex + 1);
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

/* ---------- Parallax Scrolling Effects ---------- */
function initializeParallax() {
    const heroSection = document.querySelector('.about-hero');
    
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }
}

/* ---------- Interactive Elements ---------- */
function initializeInteractiveElements() {
    // Add click effects to cards
    const cards = document.querySelectorAll('.expertise-card, .hobby-card, .fact-card');
    
    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
        });
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 600ms linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation to CSS
    if (!document.querySelector('#ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            .btn {
                position: relative;
                overflow: hidden;
            }
        `;
        document.head.appendChild(style);
    }
}

/* ---------- Initialize Everything ---------- */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Enhanced About page loaded successfully');
    
    animateCounters();
    initializeProfileInteractions();
    initializeSkillBars();
    initializeTypewriter();
    initializeParallax();
    initializeInteractiveElements();
    
    // Add scroll-triggered animations
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
    
    // Observe all cards for scroll animations
    document.querySelectorAll('.expertise-card, .hobby-card, .fact-card, .testimonial-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

/* ---------- Export for Module Use ---------- */
// Uncomment if using ES6 modules
/*
export {
    animateCounters,
    initializeProfileInteractions,
    initializeTypewriter
};
*/

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

/* ---------- Initialize Everything ---------- */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Enhanced About page loaded successfully');
    
    animateCounters();
    initializeFloatingShapes();
    
    // Your existing about.js code...
    initializeProfileInteractions();
    initializeSkillBars();
    initializeInteractiveElements();
    
    // Add scroll-triggered animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all cards for scroll animations
    document.querySelectorAll('.expertise-card, .hobby-card, .fact-card, .testimonial-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});