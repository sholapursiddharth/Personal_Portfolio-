// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initMobileMenu();
    initScrollSpy();
    initContactForm();
    initProjectModals();
    initResumeDownload();
    initAnimations();
    initTypingEffect();
});

// Navigation Functions
function initNavigation() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Update active navigation
                updateActiveNav(link);
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

function updateActiveNav(activeLink) {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    activeLink.classList.add('active');
}

// Mobile Menu Functions
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
}

function closeMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    if (navLinks && hamburger) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
}

// Scroll Spy Function
function initScrollSpy() {
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Contact Form Functions
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form elements
    const formData = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        subject: document.getElementById('subject'),
        message: document.getElementById('message')
    };
    
    // Clear previous errors
    clearFormErrors();
    
    // Validate form
    if (validateForm(formData)) {
        showSuccessMessage();
        resetForm();
    }
}

function validateForm(formData) {
    let isValid = true;
    
    // Validate name
    if (!formData.name.value.trim()) {
        showError('nameError');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.value.trim() || !emailRegex.test(formData.email.value)) {
        showError('emailError');
        isValid = false;
    }
    
    // Validate subject
    if (!formData.subject.value.trim()) {
        showError('subjectError');
        isValid = false;
    }
    
    // Validate message
    if (!formData.message.value.trim()) {
        showError('messageError');
        isValid = false;
    }
    
    return isValid;
}

function clearFormErrors() {
    document.querySelectorAll('.error').forEach(error => {
        error.style.display = 'none';
    });
}

function showError(errorId) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.style.display = 'block';
    }
}

function showSuccessMessage() {
    const successMessage = document.getElementById('success-message');
    if (successMessage) {
        successMessage.style.display = 'block';
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }
}

function resetForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.reset();
    }
}

// Project Modal Functions
function initProjectModals() {
    const modal = document.getElementById('projectModal');
    const closeModal = document.querySelector('.close');
    
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

function openProjectModal(projectName) {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    if (modal && modalTitle && modalContent) {
        modalTitle.textContent = projectName;
        
        // Project details
        const projectDetails = {
            'Career Guidance': ' A 
Students and parents can use the web app to find out everything they need to
know about institutions, including tuition and housing prices, eligibility
requirements, campus placement options, housing facilities, scholarship schemes,
campus support services, rules and regulations, and more. It assists students in
choosing engineering and management universities in India and overseas based
on aspects such as qualifying exam details, technical expertise, and other
information ',
            
            'Weather App': 'A responsive weather dashboard that provides current weather conditions, 5-day forecasts, and weather alerts. Features location-based weather data, search functionality for different cities, and beautiful weather visualizations with animated icons. Built with vanilla JavaScript and integrates with OpenWeatherMap API. Includes geolocation support, local storage for favorite cities, and dark/light theme toggle.',
            
            'Task Manager': 'A collaborative task management application with real-time updates using Socket.io. Features include drag-and-drop task organization, team collaboration, file attachments, due date reminders, and progress tracking. Built with React, Express, and MongoDB. The app supports multiple project boards, user roles and permissions, comment threads, and email notifications for task updates.'
        };
        
        modalContent.textContent = projectDetails[projectName] || 'Project details coming soon...';
        modal.style.display = 'block';
    }
}