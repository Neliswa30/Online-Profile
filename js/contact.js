/* ==========================================================================
   Contact page specific JavaScript
   ========================================================================== */

// DOM Elements
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const submitBtn = document.getElementById('submitBtn');

// Form fields
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

// Error elements
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

/* ---------- Form Validation ---------- */
function validateForm() {
    let isValid = true;
    
    // Clear previous errors
    clearErrors();
    
    // Validate Name
    if (!nameInput.value.trim()) {
        showError(nameInput, nameError, 'Please enter your full name');
        isValid = false;
    } else if (nameInput.value.trim().length < 2) {
        showError(nameInput, nameError, 'Name must be at least 2 characters long');
        isValid = false;
    } else {
        showSuccess(nameInput);
    }
    
    // Validate Email
    if (!emailInput.value.trim()) {
        showError(emailInput, emailError, 'Please enter your email address');
        isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, emailError, 'Please enter a valid email address');
        isValid = false;
    } else {
        showSuccess(emailInput);
    }
    
    // Validate Message
    if (!messageInput.value.trim()) {
        showError(messageInput, messageError, 'Please enter your message');
        isValid = false;
    } else if (messageInput.value.trim().length < 10) {
        showError(messageInput, messageError, 'Message must be at least 10 characters long');
        isValid = false;
    } else {
        showSuccess(messageInput);
    }
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(input, errorElement, message) {
    input.classList.add('error');
    input.classList.remove('success');
    errorElement.textContent = message;
}

function showSuccess(input) {
    input.classList.add('success');
    input.classList.remove('error');
}

function clearErrors() {
    // Clear error messages
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    
    // Remove error/success classes
    [nameInput, emailInput, messageInput].forEach(input => {
        input.classList.remove('error', 'success');
    });
}

/* ---------- Form Submission ---------- */
function handleFormSubmit(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    // Get form data
    const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        message: messageInput.value.trim(),
        timestamp: new Date().toISOString()
    };
    
    // Show loading state
    setLoadingState(true);
    
    // Clear any previous messages
    hideFormMessage();
    
    // Simulate form submission (replace with actual API call)
    simulateFormSubmission(formData);
}

function simulateFormSubmission(formData) {
    console.log('Form submitted:', formData);
    
    // Simulate API call delay
    setTimeout(() => {
        // For demo purposes, we'll always show success
        // In a real application, you would handle the actual response
        
        setLoadingState(false);
        showSuccessMessage();
        resetForm();
        
        // In a real application, you would do something like:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(formData)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     setLoadingState(false);
        //     if (data.success) {
        //         showSuccessMessage();
        //         resetForm();
        //     } else {
        //         showErrorMessage(data.message || 'Something went wrong');
        //     }
        // })
        // .catch(error => {
        //     setLoadingState(false);
        //     showErrorMessage('Failed to send message. Please try again.');
        //     console.error('Form submission error:', error);
        // });
        
    }, 2000);
}

/* ---------- UI State Management ---------- */
function setLoadingState(isLoading) {
    if (isLoading) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
    } else {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
}

function showSuccessMessage() {
    formMessage.textContent = '✅ Message sent successfully! Thank you for reaching out. I\'ll get back to you soon.';
    formMessage.className = 'form-message success';
    
    // Auto-hide message after 5 seconds
    setTimeout(() => {
        hideFormMessage();
    }, 5000);
}

function showErrorMessage(message) {
    formMessage.textContent = message || '❌ Failed to send message. Please try again.';
    formMessage.className = 'form-message error';
}

function hideFormMessage() {
    formMessage.className = 'form-message hidden';
}

function resetForm() {
    contactForm.reset();
    clearErrors();
}

/* ---------- Real-time Validation ---------- */
function initializeRealTimeValidation() {
    // Validate on input change
    nameInput.addEventListener('blur', () => validateField(nameInput, nameError, validateName));
    emailInput.addEventListener('blur', () => validateField(emailInput, emailError, validateEmail));
    messageInput.addEventListener('blur', () => validateField(messageInput, messageError, validateMessage));
    
    // Clear errors when user starts typing
    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                input.classList.remove('error');
                const errorId = input.id + 'Error';
                const errorElement = document.getElementById(errorId);
                if (errorElement) {
                    errorElement.textContent = '';
                }
            }
        });
    });
}

function validateField(input, errorElement, validationFn) {
    const value = input.value.trim();
    const error = validationFn(value);
    
    if (error) {
        showError(input, errorElement, error);
    } else {
        showSuccess(input);
    }
}

function validateName(name) {
    if (!name) return 'Please enter your full name';
    if (name.length < 2) return 'Name must be at least 2 characters long';
    return null;
}

function validateEmail(email) {
    if (!email) return 'Please enter your email address';
    if (!isValidEmail(email)) return 'Please enter a valid email address';
    return null;
}

function validateMessage(message) {
    if (!message) return 'Please enter your message';
    if (message.length < 10) return 'Message must be at least 10 characters long';
    return null;
}

/* ---------- Initialize Contact Page ---------- */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Contact page loaded successfully');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        initializeRealTimeValidation();
    }
    
    // Add animation to form elements
    animateFormElements();
});

/* ---------- Form Animations ---------- */
function animateFormElements() {
    const formElements = document.querySelectorAll('.input-group, .submit-btn');
    
    formElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s forwards`;
    });
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

/* ==========================================================================
   Enhanced Contact page JavaScript
   ========================================================================== */

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
    const animatedElements = document.querySelectorAll('.faq-card, .contact-method');
    
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

/* ---------- Initialize Everything ---------- */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Enhanced Contact page loaded successfully');
    
    animateCounters();
    initializeFloatingShapes();
    initializeScrollAnimations();
    
    // Your existing contact.js form functionality...
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        initializeRealTimeValidation();
    }
    
    // Add animation to form elements
    animateFormElements();
});

// Your existing contact.js functions remain the same...
// validateForm, handleFormSubmit, initializeRealTimeValidation, etc.