// Events Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeEventsPage();
    setupEventFiltering();
    setupRegistrationHandling();
    setupTimelineAnimations();
});

// Initialize events page functionality
function initializeEventsPage() {
    // Animate hero stats on load
    animateHeroStats();
    
    // Setup category card interactions
    setupCategoryCards();
    
    // Setup featured event interactions
    setupFeaturedEvents();
    
    // Initialize scroll animations
    setupScrollAnimations();
}

// Animate hero statistics
function animateHeroStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalValue = parseInt(stat.textContent);
        let currentValue = 0;
        const increment = finalValue / 50;
        const suffix = stat.textContent.includes('+') ? '+' : '';
        
        const updateStat = () => {
            if (currentValue < finalValue) {
                currentValue += increment;
                stat.textContent = Math.ceil(currentValue) + suffix;
                requestAnimationFrame(updateStat);
            } else {
                stat.textContent = finalValue + suffix;
            }
        };
        
        // Start animation after a delay
        setTimeout(updateStat, 500);
    });
}

// Setup category card interactions
function setupCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            filterEventsByCategory(category);
            
            // Add active state
            categoryCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            // Smooth scroll to events section
            document.querySelector('.featured-events').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Filter events by category
function filterEventsByCategory(category) {
    const events = document.querySelectorAll('.featured-event');
    
    events.forEach(event => {
        const eventCategory = event.querySelector('.event-category').textContent.toLowerCase();
        
        if (category === 'all' || eventCategory.includes(category)) {
            event.style.display = 'block';
            event.style.animation = 'fadeInUp 0.5s ease-out';
        } else {
            event.style.display = 'none';
        }
    });
}

// Setup featured event interactions
function setupFeaturedEvents() {
    const featuredEvents = document.querySelectorAll('.featured-event');
    
    featuredEvents.forEach(event => {
        const registerBtn = event.querySelector('.register-btn');
        
        registerBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const eventTitle = event.querySelector('h3').textContent;
            handleEventRegistration(eventTitle);
        });
        
        // Add parallax effect to event images
        const eventImage = event.querySelector('.event-image img');
        
        event.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            eventImage.style.transform = `scale(1.1) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        event.addEventListener('mouseleave', function() {
            eventImage.style.transform = 'scale(1)';
        });
    });
}

// Handle event registration
function handleEventRegistration(eventTitle) {
    // Create registration modal
    const modal = createRegistrationModal(eventTitle);
    document.body.appendChild(modal);
    
    // Show modal with animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Setup modal interactions
    setupModalInteractions(modal);
}

// Create registration modal
function createRegistrationModal(eventTitle) {
    const modal = document.createElement('div');
    modal.className = 'registration-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>Register for Event</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <h4>${eventTitle}</h4>
                <form class="registration-form">
                    <div class="form-group">
                        <label>Full Name</label>
                        <input type="text" required>
                    </div>
                    <div class="form-group">
                        <label>Email Address</label>
                        <input type="email" required>
                    </div>
                    <div class="form-group">
                        <label>Phone Number</label>
                        <input type="tel" required>
                    </div>
                    <div class="form-group">
                        <label>Institution/Hospital</label>
                        <input type="text" required>
                    </div>
                    <div class="form-group">
                        <label>Specialization</label>
                        <select required>
                            <option value="">Select Specialization</option>
                            <option value="orthopedic-surgery">Orthopedic Surgery</option>
                            <option value="sports-medicine">Sports Medicine</option>
                            <option value="arthroscopy">Arthroscopy</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="cancel-btn">Cancel</button>
                        <button type="submit" class="register-submit-btn">Register Now</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .registration-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .registration-modal.show {
            opacity: 1;
            visibility: visible;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(5px);
        }
        
        .modal-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.9);
            background: white;
            border-radius: 20px;
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            transition: transform 0.3s ease;
        }
        
        .registration-modal.show .modal-content {
            transform: translate(-50%, -50%) scale(1);
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 25px;
            border-bottom: 1px solid #f1f5f9;
        }
        
        .modal-header h3 {
            color: #1e3a8a;
            margin: 0;
        }
        
        .close-modal {
            background: none;
            border: none;
            font-size: 24px;
            color: #64748b;
            cursor: pointer;
            transition: color 0.3s ease;
        }
        
        .close-modal:hover {
            color: #1e3a8a;
        }
        
        .modal-body {
            padding: 25px;
        }
        
        .modal-body h4 {
            color: #0891b2;
            margin-bottom: 20px;
        }
        
        .registration-form .form-group {
            margin-bottom: 20px;
        }
        
        .registration-form label {
            display: block;
            margin-bottom: 8px;
            color: #1e3a8a;
            font-weight: 500;
        }
        
        .registration-form input,
        .registration-form select {
            width: 100%;
            padding: 12px 15px;
            border: 2px solid #f1f5f9;
            border-radius: 10px;
            font-size: 16px;
            transition: border-color 0.3s ease;
        }
        
        .registration-form input:focus,
        .registration-form select:focus {
            outline: none;
            border-color: #0891b2;
        }
        
        .form-actions {
            display: flex;
            gap: 15px;
            margin-top: 30px;
        }
        
        .cancel-btn,
        .register-submit-btn {
            flex: 1;
            padding: 12px 20px;
            border: none;
            border-radius: 50px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .cancel-btn {
            background: #f1f5f9;
            color: #64748b;
        }
        
        .cancel-btn:hover {
            background: #e2e8f0;
        }
        
        .register-submit-btn {
            background: linear-gradient(135deg, #0891b2, #1e3a8a);
            color: white;
        }
        
        .register-submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(8, 145, 178, 0.3);
        }
    `;
    
    document.head.appendChild(style);
    
    return modal;
}

// Setup modal interactions
function setupModalInteractions(modal) {
    const closeBtn = modal.querySelector('.close-modal');
    const cancelBtn = modal.querySelector('.cancel-btn');
    const overlay = modal.querySelector('.modal-overlay');
    const form = modal.querySelector('.registration-form');
    
    // Close modal handlers
    [closeBtn, cancelBtn, overlay].forEach(element => {
        element.addEventListener('click', () => {
            closeModal(modal);
        });
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleRegistrationSubmission(modal, form);
    });
    
    // Prevent modal content clicks from closing modal
    modal.querySelector('.modal-content').addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// Close modal
function closeModal(modal) {
    modal.classList.remove('show');
    setTimeout(() => {
        document.body.removeChild(modal);
    }, 300);
}

// Handle registration form submission
function handleRegistrationSubmission(modal, form) {
    const formData = new FormData(form);
    const registrationData = {};
    
    formData.forEach((value, key) => {
        registrationData[key] = value;
    });
    
    // Show loading state
    const submitBtn = form.querySelector('.register-submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Registering...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        closeModal(modal);
        showNotification('Registration successful! You will receive a confirmation email shortly.', 'success');
    }, 2000);
}

// Setup timeline animations
function setupTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInFromLeft 0.6s ease-out forwards';
                
                // Animate timeline badge
                const badge = entry.target.querySelector('.timeline-badge');
                if (badge) {
                    setTimeout(() => {
                        badge.style.animation = 'pulse 0.5s ease-out';
                    }, 300);
                }
            }
        });
    }, {
        threshold: 0.3
    });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Setup scroll animations
function setupScrollAnimations() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(el => observer.observe(el));
}

// Add custom animations
const customAnimations = `
    @keyframes slideInFromLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.2);
        }
        100% {
            transform: scale(1);
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// Add animations to document
const styleSheet = document.createElement('style');
styleSheet.textContent = customAnimations;
document.head.appendChild(styleSheet);

// Enhanced floating elements animation
function enhanceFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        // Add random movement
        setInterval(() => {
            const randomX = Math.random() * 20 - 10;
            const randomY = Math.random() * 20 - 10;
            
            element.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${Math.random() * 360}deg)`;
        }, 3000 + index * 1000);
    });
}

// Initialize enhanced animations
document.addEventListener('DOMContentLoaded', enhanceFloatingElements);

// Smooth scroll for CTA buttons
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.textContent.includes('View All Events')) {
            e.preventDefault();
            document.querySelector('.featured-events').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation for page
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Stagger animations for better visual effect
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((element, index) => {
        element.style.transitionDelay = `${index * 0.1}s`;
    });
});